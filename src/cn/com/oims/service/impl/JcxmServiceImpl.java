package cn.com.oims.service.impl;

import cn.com.oims.dao.*;
import cn.com.oims.dao.pojo.*;
import cn.com.oims.service.IJcxmService;
import cn.com.oims.webservice.ExamWebService;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.LisWebService;
import cn.com.oims.webservice.pojo.Dept;
import cn.com.oims.webservice.pojo.exam.ExamItem;
import cn.com.oims.webservice.pojo.exam.ExamItemClass;
import cn.com.oims.webservice.pojo.exam.ExamItemSubClass;
import cn.com.oims.webservice.pojo.his.PriceItem;
import cn.com.oims.webservice.pojo.lis.Sample;
import cn.com.oims.webservice.pojo.lis.TestItem;
import cn.com.oims.webservice.pojo.lis.TestItemClass;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import com.codesnet.common.PinyinUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Service
public class JcxmServiceImpl implements IJcxmService {
  IJcxmDao dao = null;

  private ExamWebService examWebService;

  private LisWebService lisWebService;

  private HisWebService hisWebService;

  private ICategoryDao categoryDao;

  private IBuMenDao bumenDao;

  private IBanGongShiDao bgsDao;

  private ISheBeiDao shebeiDao;

  private static Date synchTime;

  @Autowired
  public void setShebeiDao(ISheBeiDao shebeiDao) {
    this.shebeiDao = shebeiDao;
  }

  @Autowired
  public void setExamWebService(ExamWebService examWebService) {
    this.examWebService = examWebService;
  }

  @Autowired
  public void setLisWebService(LisWebService lisWebService) {
    this.lisWebService = lisWebService;
  }

  @Autowired
  public void setHisWebService(HisWebService hisWebService) {
    this.hisWebService = hisWebService;
  }

  @Autowired
  public void setBumenDao(IBuMenDao bumenDao) {
    this.bumenDao = bumenDao;
  }

  @Autowired
  public void setBgsDao(IBanGongShiDao bgsDao) {
    this.bgsDao = bgsDao;
  }

  public static void setSynchTime(Date synchTime) {
    JcxmServiceImpl.synchTime = synchTime;
  }

  @Autowired
  public void setDao(IJcxmDao dao) {
    this.dao = dao;
  }

  @Autowired
  public void setCategoryDao(ICategoryDao categoryDao) {
    this.categoryDao = categoryDao;
  }

  public Serializable saveJcxm(Jcxm jcxm) {
    return this.dao.saveJcxm(jcxm);
  }

  public void delJcxmById(Serializable id) {
    this.dao.delJcxm(id);
  }

  public void saveOrUpdateJcxm(Jcxm o) {
    this.dao.saveOrUpdateJcxm(o);
  }

  public List<Jcxm> findAllJcxm(Integer categoryId, Page page, String keyword) {
    List<Jcxm> list = null;
    if (categoryId == null) {
      categoryId = Integer.valueOf(13);
      String ids = this.categoryDao.findIds("Category", "fatherid", categoryId);
      list = this.dao.findAllJcxm(ids);
    } else {
      String ids = this.categoryDao.findIds("Category", "fatherid", categoryId);
      list = this.dao.findAllJcxm(ids.toString(), keyword, page);
    }
    return list;
  }

  public void synchJcxmItem() {
    System.out.println("------同步开始");
    Date today = MultiUtils.getStartTimeOfDay();
    if (synchTime == null || !synchTime.after(today)) {
      this.synchJcxmLabTest();
      this.synchJcxmOtherExam();
      synchTime = new Date();
      System.out.println("-------同步结束-------");
    }
  }

  private void synchJcxmLabTest() {
    this.synchTestItems();
  }

  private void synchTestItems() {
    int i = 1;

    while(true) {
      List<TestItem> list = this.findTestItems((String)null, (String)null, (String)null, i, 1000);
      Iterator itr = list.iterator();

      while(itr.hasNext()) {
        TestItem item = (TestItem)itr.next();
        String classCode = item.getItemClass();
        Category category = null;
        if (classCode != null) {
          //3、根据化验项目编码查询化验项目分类
          category = this.categoryDao.getCategoryByIntr("#lisCode_" + classCode);
          //4、如果类别不为空
          if (category == null) {
            TestItemClass itemClass = this.getTestItemClass(classCode);
            if (itemClass != null) {
              category = new Category();
              category.setCategory(itemClass.getName());
              category.setIntr("#lisCode_" + classCode);
              category.setFatherid(15);
              this.categoryDao.saveCategory(category);
            }
          }
        }
        Jcxm jcxm = this.dao.getJcxmByBianma("LIS" + item.getItemCode());

        try {
          if (jcxm == null) {
            jcxm = this.saveTestItem(item, category);
          } else {
            if (category != null) {
              jcxm.setCategoryId(category.getId());
            }

            this.updateTestItem(item, jcxm);
          }

          this.synchZhixingkeshi(jcxm, this.findDeptByItems(item.getItemCode()));
          this.synchSample(jcxm, item);
        } catch (Exception var9) {
          var9.printStackTrace();
        }
      }

      if (list.size() < 1000) {
        return;
      }

      ++i;
    }
  }

  private void synchSample(Jcxm jcxm, TestItem item) {
    List<Sample> list = this.findSampleByItemId(item.getItemCode());
    List<EMRLisJcxmSample> sl = this.dao.findEMRLisJcxmSample(jcxm.getId());
    if (list.size() == 0) {
      if (sl.size() > 0) {
        this.dao.deleteEMRLisJcxmSample(sl);
      }

      System.out.println(item.getItemCode() + "(" + item.getItemTitle() + ")  没有找到标本！");
    } else {
      Iterator itr = list.iterator();

      while(itr.hasNext()) {
        Sample s = (Sample)itr.next();
        EMRLisSample es = this.dao.findSampleByCode(s.getId());
        if (es == null) {
          es = new EMRLisSample();
          es.setSampleCode(s.getId());
          es.setSampleName(s.getChineseName());
          this.dao.saveEMRLisSample(es);
        } else {
          es.setSampleName(s.getChineseName());
          this.dao.updateEMRLisSample(es);
        }

        EMRLisJcxmSample ljs = new EMRLisJcxmSample();
        ljs.setJcxmId(jcxm.getId());
        ljs.setSampleId(es.getId());
        if (es.getSampleName().equals("静脉血")) {
          ljs.setOrderNum(1);
        }

        boolean x = false;
        Iterator var11 = sl.iterator();

        while(var11.hasNext()) {
          EMRLisJcxmSample js = (EMRLisJcxmSample)var11.next();
          if (js.getJcxmId() == ljs.getJcxmId() && js.getSampleId() == ljs.getSampleId()) {
            sl.remove(js);
            x = true;
            break;
          }
        }

        if (!x) {
          this.dao.saveEMRLisJcxmSample(ljs);
        }
      }

      if (sl.size() > 0) {
        this.dao.deleteEMRLisJcxmSample(sl);
      }

    }
  }

  /**
   * @description:同步检查项目到本地数据库
   * @param
   * @return:
   * @author: Mason
   * @time: 2020/6/24 10:53
   */
  private void synchJcxmOtherExam() {
    //1、获取医院开展的检查项目一级分类列表
    List<ExamItemClass> list = this.examWebService.findExamItemClass();
    Iterator<ExamItemClass> iic = list.iterator();
    //2、循环检查项目一级分类列表
    while (iic.hasNext()) {
      ExamItemClass eic = iic.next();
      //3、根据分类编码去oims_category表查询检查项目分类的详情
      Category category = this.categoryDao.getCategoryByIntr("#examCode_" + eic.getClassCode());
      //4、如果检查项目分类为空
      if (category == null){
        //4-1、新建一个检查项目类别
        category = new Category();
        //4-2、设置检查项目类别名称-从当前检查项目类别信息中获取名称
        category.setCategory(eic.getClassName());
        category.setFatherid(Integer.valueOf(14));
        category.setIntr("#examCode_" + eic.getClassCode());
        //4-3、新增检查项目类别
        category.setId((Integer)this.categoryDao.saveCategory(category));
      } else {
        //5、检查项目分类不为空
        category.setCategory(eic.getClassName());
        category.setFatherid(Integer.valueOf(14));
        //5-1、更新检查项目分类到oims_category表
        this.categoryDao.updateCategory(category);
      }
      //6、根据一级分类的分类编码获取医院开展的检查项目（2级分类）
      List<ExamItemSubClass> l = this.examWebService.findExamItemsSubClass(eic.getClassCode(), null, null, 1, 1000);
      Iterator<ExamItemSubClass> itr = l.iterator();
      //7、循环检查项目二级分类列表
      while (itr.hasNext()) {
        ExamItemSubClass eisc = itr.next();
        //8、根据检查项目二级分类编码再oims_category查询分类详情
        Category sc = this.categoryDao.getCategoryByIntr("#examCodeSub_" + eisc.getItemCode());
        //8-1、如果二级分类分类信息为空
        if (sc == null) {
          sc = new Category();
          sc.setCategory(eisc.getName());
          sc.setFatherid(category.getId());
          sc.setIntr("#examCodeSub_" + eisc.getItemCode());
          //8-1-1、在oims_categorybiao新增二级分类信息
          sc.setId((Integer)this.categoryDao.saveCategory(sc));
        } else {
          //8-2、如果二级分类信息不为空
          sc.setCategory(eisc.getName());
          sc.setFatherid(category.getId());
          //8-2-2、在oims_category表更新二级分类信息
          this.categoryDao.updateCategory(sc);
        }
        //9、在检查项目二级分类的循环下，同步HIS上的检查项目（参数包括一级分类编码、二级分类编码、二级分类id）
        synchExamItem(eic.getClassName(), eisc.getName(), sc.getId());
      }
    }
  }

  /**
   * @description:同步HIS上的检查项目到本地业务库
   * @param classCode 检查项目一级分类编码
   * @param subClassCode 检查项目二级分类编码
   * @param categoryId 检查项目二级分类id
   * @return: void
   * @author: Mason
   * @time: 2020/6/24 15:30
   */
  private void synchExamItem(String classCode, String subClassCode, Integer categoryId) {
    //1、i、max为分页查询参数。i标识第几页、max代表每页条目数
    int i = 1, max = 200;
    while (true) {
      //2、根据检查项目一级编码、二级编码查询下面的检查项目列表
      List<ExamItem> l = this.examWebService.findExamItems(classCode, subClassCode, null, null, i, max);
      //3、如果检查项目列表为空-》退出循环
      if (l.size() == 0) {
        System.out.println(String.valueOf(classCode) + ">" + subClassCode + "下没有找到项目！");
        break;
      }
      //4、如果检查项目列表不为空-->循环检查项目列表
      Iterator<ExamItem> itr = l.iterator();
      while (itr.hasNext()) {
        ExamItem item = itr.next();
        //5、根据检查项目的编码查询本地库JCXM表中的检查项目信息
        Jcxm jcxm = this.dao.getJcxmByBianma("EXAM" + item.getItemCode());
        try {
          //6、如果本地库没有查询到该检查项目-->新增检查项目
          if (jcxm == null) {
            jcxm = saveExamItem(item, categoryId);
          } else {
            //7、如果本地库中有该检查项目-->更新检查项目
            updateExamItem(item, jcxm, categoryId);
          }
        } catch (Exception e) {
          e.printStackTrace();
        }
        //8、同步检查项目执行科室
        synchZhixingkeshi(jcxm, this.examWebService.findExamDept(item.getItemCode()));
      }
      if (l.size() < max)
        break;
      i++;
    }
  }

  private String getInputCode(String inputCode, String chineseStr) {
    if (inputCode != null && !inputCode.isEmpty())
      return inputCode;
    PinyinUtils pu = new PinyinUtils();
    String[] str = new String[chineseStr.length()];
    for (int i = 0; i < chineseStr.length(); i++) {
      char x = chineseStr.charAt(i);
      try {
        str[i] = pu.getPinyinByChar(x);
      } catch (Exception ex) {
        str[i] = "";
      }
    }
    StringBuffer sb = new StringBuffer();
    byte b;
    int j;
    String[] arrayOfString1;
    for (j = (arrayOfString1 = str).length, b = 0; b < j; ) {
      String p = arrayOfString1[b];
      if (p.length() > 0)
        sb.append(p.substring(0, 1));
      b++;
    }
    return sb.toString().toUpperCase();
  }

  @Transactional
  private void updateTestItem(TestItem item, Jcxm jcxm) {
    jcxm.setTongbuShijian(new Date());
    if (!jcxm.getXmmc().equals(item.getItemTitle())) {
      String inputCode = getInputCode(item.getInputCode(), item.getItemTitle());
      jcxm.setXmmc(item.getItemTitle());
      jcxm.setInput_code(inputCode);
    }
    jcxm.setXmms(item.getItemInfo());
    List<PriceItem> pl = item.getItemPriceList();
    if (pl == null) {
      List<EMRJcxmFushu> l = this.dao.findEMRJcxmFushu(jcxm.getId());
      if (l.size() > 0)
        this.dao.deleteJcxmFushu(l);
      this.dao.updateJcxm(jcxm);
      return;
    }
    if (pl.size() == 1) {
      if (jcxm.isHaveOption())
        this.dao.deleteJcxmFushu(this.dao.findEMRJcxmFushu(jcxm.getId()));
      PriceItem pi = pl.get(0);
      jcxm.setHaveOption(false);
      jcxm.setPrice(pi.getItemPrice());
      jcxm.setPriceCode(pi.getItemCode());
    } else {
      List<EMRJcxmFushu> fl = this.dao.findEMRJcxmFushu(jcxm.getId());
      jcxm.setHaveOption(true);
      for (PriceItem pi : pl) {
        EMRJcxmFushu fs = null;
        for (EMRJcxmFushu f : fl) {
          if (f.getBianma().equals(pi.getItemCode())) {
            fs = f;
            fl.remove(f);
            break;
          }
        }
        if (fs == null)
          fs = new EMRJcxmFushu();
        fs.setBianma(pi.getItemCode());
        fs.setPricecode(pi.getItemCode());
        fs.setDefaultNum(pi.getAmount());
        fs.setDefaultNumChangeEnable(false);
        fs.setChooseEnable(false);
        fs.setPrice(pi.getItemPrice());
        fs.setTongbuShijian(new Date());
        fs.setXmmc(pi.getItemName());
        fs.setEnableFlag(true);
        this.dao.saveOrUpdateEMRJcxmFushu(fs);
      }
      if (fl.size() > 0)
        this.dao.deleteJcxmFushu(fl);
    }
    jcxm.setEnableFlag(true);
    this.dao.updateJcxm(jcxm);
  }

  @Transactional
  private void updateExamItem(ExamItem item, Jcxm jcxm, Integer categoryId) {
    jcxm.setTongbuShijian(new Date());
    if (!jcxm.getXmmc().equals(item.getName())) {
      jcxm.setInput_code(getInputCode(item.getItemCode(), item.getName()));
      jcxm.setXmmc(item.getName());
    }
    jcxm.setXmms(item.getInfo());
    jcxm.setCategoryId(categoryId);
    List<PriceItem> pl = item.getPriceList();
    if (pl == null) {
      this.dao.updateJcxm(jcxm);
      return;
    }
    List<EMRJcxmFushu> fl = this.dao.findEMRJcxmFushu(jcxm.getId());
    jcxm.setHaveOption(true);
    for (PriceItem pi : pl) {
      EMRJcxmFushu fs = null;
      for (EMRJcxmFushu f : fl) {
        if (f.getBianma().equals(pi.getItemCode())) {
          fs = f;
          fl.remove(f);
          break;
        }
      }
      if (fs == null)
        fs = new EMRJcxmFushu();
      fs.setJcxmId(jcxm.getId());
      fs.setBianma(pi.getItemCode());
      fs.setPricecode(String.valueOf(pi.getItemClass()) + "@" + pi.getItemCode() + "@" + pi.getSpec() + "@" + pi.getUnit());
      fs.setDefaultNum(pi.getAmount());
      fs.setDefaultNumChangeEnable(false);
      fs.setChooseEnable(false);
      fs.setPrice(pi.getItemPrice());
      fs.setTongbuShijian(new Date());
      fs.setXmmc(pi.getItemName());
      fs.setEnableFlag(true);
      this.dao.saveOrUpdateEMRJcxmFushu(fs);
    }
    if (fl.size() > 0)
      this.dao.deleteJcxmFushu(fl);
    jcxm.setPrice(null);
    jcxm.setPriceCode(null);
    jcxm.setEnableFlag(true);
    this.dao.updateJcxm(jcxm);
  }

  @Transactional
  private Jcxm saveTestItem(TestItem item, Category category) {
    Jcxm jcxm = new Jcxm();
    jcxm.setBianma("LIS" + item.getItemCode());
    jcxm.setEnableFlag(true);
    jcxm.setFatherId(Integer.valueOf(0));
    Integer categoryId = Integer.valueOf((category != null) ? category.getId().intValue() : 15);
    jcxm.setCategoryId(categoryId);
    jcxm.setInput_code(getInputCode(item.getInputCode(), item.getItemTitle()));
    jcxm.setXmmc(item.getItemTitle());
    jcxm.setXmms(item.getItemInfo());
    jcxm.setTongbuShijian(new Date());
    List<PriceItem> pl = item.getItemPriceList();
    if (pl != null && pl.size() == 1) {
      PriceItem pi = pl.get(0);
      jcxm.setHaveOption(false);
      jcxm.setPrice(pi.getItemPrice());
      jcxm.setPriceCode(pi.getItemCode());
    }
    jcxm.setId((Integer)this.dao.saveJcxm(jcxm));
    if (pl != null && pl.size() > 1) {
      jcxm.setHaveOption(true);
      for (PriceItem pi : pl) {
        EMRJcxmFushu fs = new EMRJcxmFushu();
        fs.setJcxmId(jcxm.getId());
        fs.setBianma(pi.getItemCode());
        fs.setPricecode(pi.getItemCode());
        fs.setDefaultNum(pi.getAmount());
        fs.setDefaultNumChangeEnable(false);
        fs.setChooseEnable(false);
        fs.setPrice(pi.getItemPrice());
        fs.setTongbuShijian(new Date());
        fs.setXmmc(pi.getItemName());
        fs.setEnableFlag(true);
        this.dao.saveOrUpdateEMRJcxmFushu(fs);
      }
      this.dao.updateJcxm(jcxm);
    }
    return jcxm;
  }

  private void synchZhixingkeshi(Jcxm jcxm, List<Dept> list) {
    //1、根据检查项目id查询可以执行该检查的所有执行科室集合
    List<EMRJcxmZhixingkeshi> ksList = this.dao.findEMRJcxmZhixingkeshi(jcxm.getId(), null);
    //2-1、如果该检查项目没有执行科室（传过来的参数，通过HIS查询到的数据）
    if (list.size() == 0) {
      System.out.println(String.valueOf(jcxm.getBianma()) + "(" + jcxm.getXmmc() + ")未找到执行科室！");
      //2-2、如果本方法内查询到该检查项目有执行科室
      if (ksList.size() > 0){
        //2-3、删除本地执行科室
        this.dao.deleteEMRJcxmZhixingkeshi(ksList);
      }
      //2-4、删除检查项目
      this.dao.delJcxm(jcxm.getId());
      this.dao.deleteEMRLisJcxmSample(this.dao.findEMRLisJcxmSample(jcxm.getId()));
      //2-6、方法结束
      return;
    }
    //3、循环参数穿过来的执行科室集合
    Iterator<Dept> itr = list.iterator();
    while (itr.hasNext()) {
      Dept dept = itr.next();
      //3-1、根据执行科室编码查询办公室信息
      BanGongShi bgs = this.bgsDao.findBanGongShiByBgsBm(dept.getDeptCode());
      //3-2、如果办公室信息为空-->新增办公室
      if (bgs == null) {
        bgs = new BanGongShi();
        bgs.setBgsBm(dept.getDeptCode());
        bgs.setBgs(dept.getName());
        bgs.setWeizhi(dept.getLocation());
        bgs.setId((Integer)this.bgsDao.saveBanGongShi(bgs));
      } else {
        //3-3、如果办公室信息以存在，更新办公室信息
        bgs.setBgs(dept.getName());
        if (dept.getLocation() != null)
          bgs.setWeizhi(dept.getLocation());
        this.bgsDao.updateBanGongShi(bgs);
      }
      //3-3、新建检查项目执行科室对象
      EMRJcxmZhixingkeshi jczxks = new EMRJcxmZhixingkeshi();
      jczxks.setBgsId(bgs.getId());
      jczxks.setJcxmId(jcxm.getId());
      boolean h = false;
      //3-4、循环本地业务库查询到的检查项目执行科室
      for (EMRJcxmZhixingkeshi ks : ksList)
      {
        //3-4-1、如果本地查询到的办公室id等于HIS查询到的办公故事id 且 本地库的检查项目id等于HIS上的检查项目id
        if (ks.getBgsId().intValue() == jczxks.getBgsId().intValue() && ks.getJcxmId().intValue() == jczxks.getJcxmId().intValue()) {
          h = true;
          //3-4-2、本地执行科室列表已出执行科室
          ksList.remove(ks);
          break;
        }
      }
      if (!h){
        //3-5、新增执行科室、
        this.dao.saveEMRJcxmZhixingkeshi(jczxks);
      }
    }
    if (ksList.size() > 0){
      //4、删除执行科室
      this.dao.deleteEMRJcxmZhixingkeshi(ksList);
    }
  }

  @Transactional
  private Jcxm saveExamItem(ExamItem item, Integer categoryId) {
    Jcxm jcxm = new Jcxm();
    jcxm.setBianma("EXAM" + item.getItemCode());
    jcxm.setEnableFlag(true);
    jcxm.setInput_code(getInputCode(item.getItemCode(), item.getName()));
    jcxm.setFatherId(Integer.valueOf(0));
    jcxm.setCategoryId(categoryId);
    jcxm.setInput_code(item.getInputCode());
    jcxm.setXmmc(item.getName());
    jcxm.setXmms(item.getInfo());
    jcxm.setTongbuShijian(new Date());
    List<PriceItem> pl = item.getPriceList();
    jcxm.setId((Integer)this.dao.saveJcxm(jcxm));
    if (pl != null && pl.size() > 0) {
      jcxm.setHaveOption(true);
      for (PriceItem pi : pl) {
        EMRJcxmFushu fs = new EMRJcxmFushu();
        fs.setJcxmId(jcxm.getId());
        fs.setBianma(pi.getItemCode());
        fs.setPricecode(String.valueOf(pi.getItemClass()) + "@" + pi.getItemCode() + "@" + pi.getSpec() + "@" + pi.getUnit());
        fs.setDefaultNum(pi.getAmount());
        fs.setDefaultNumChangeEnable(false);
        fs.setChooseEnable(false);
        fs.setPrice(pi.getItemPrice());
        fs.setTongbuShijian(new Date());
        fs.setXmmc(pi.getItemName());
        fs.setEnableFlag(true);
        this.dao.saveOrUpdateEMRJcxmFushu(fs);
      }
      jcxm.setPrice(null);
      jcxm.setPriceCode(null);
      this.dao.updateJcxm(jcxm);
    }
    return jcxm;
  }

  public Map<String, Object> findAllJcxm4Page(Page p) {
    Map<String, Object> m = new HashMap<>();
    m.put("list", this.dao.findAllJcxm4Page(p));
    m.put("page", p);
    return m;
  }

  public Jcxm getJcxmById(Serializable id) {
    return this.dao.findJcxmById(id);
  }

  public void updateJcxm(Jcxm jcxm) {
    this.dao.updateJcxm(jcxm);
  }

  public Map<String, Object> findJcxmsByPageAndJcxm(Page page, Jcxm jcxm) {
    Map<String, Object> map = new HashMap<>();
    map.put("list", this.dao.findJcxmsByPageAndJcxm(page, jcxm));
    map.put("page", page);
    return map;
  }

  public List<Jcxm> findJcxmByCatetory(Serializable categoryId) {
    return this.dao.findJcxmByCategory(categoryId);
  }

  public List<Jcxm> getJcxmListByBmid(int bmid) {
    return this.dao.getJcxmListByBmid(bmid);
  }

  public List<Jcxm> findJcxmsByJcxm(Jcxm jcxm) {
    return this.dao.findJcxmsByJcxm(jcxm);
  }

  public List<Jcxm> findJcxmsByIds(String ids) {
    return this.dao.findJcxmsByIds(ids);
  }

  public List<Jcxm> getJcxmListByBgsId(int bgsId) {
    return this.dao.getJcxmListByBgsId(bgsId);
  }

  public List<BanGongShi> findJcxmZhixingkeshi(Integer jcxmId, Integer categoryId) {
    String categoryIds = null;
    if (categoryId != null) {
      if (categoryId.intValue() == 15) {
        List<Dept> lisDepts = this.lisWebService.findTestDept(null);
        if (lisDepts != null) {
          List<BanGongShi> bgsList = new ArrayList<>();
          for (Dept dept : lisDepts) {
            BanGongShi bgs = this.bgsDao.findBanGongShiByBgsBm(dept.getDeptCode());
            if (bgsList != null)
              bgsList.add(bgs);
          }
          return bgsList;
        }
      }
      categoryIds = this.dao.findIds("Category", "fatherid", categoryId);
    }
    List<EMRJcxmZhixingkeshi> list = this.dao.findEMRJcxmZhixingkeshi(jcxmId, categoryIds);
    Iterator<EMRJcxmZhixingkeshi> itrbl = list.iterator();
    List<BanGongShi> bl2 = new ArrayList<>();
    while (itrbl.hasNext())
      bl2.add(this.bgsDao.findBanGongShiById(((EMRJcxmZhixingkeshi)itrbl.next()).getBgsId()));
    return bl2;
  }

  public List<EMRLisSample> findJcxmSample(Integer jcxmId) {
    List<EMRLisJcxmSample> list = this.dao.findEMRLisJcxmSample(jcxmId);
    List<EMRLisSample> sl = new ArrayList<>();
    Iterator<EMRLisJcxmSample> itr = list.iterator();
    while (itr.hasNext())
      sl.add(this.dao.getEMRLisSample(((EMRLisJcxmSample)itr.next()).getSampleId()));
    list.clear();
    return sl;
  }

  public List<EMRJcxmFushu> findJcxmOptions(Integer jcxmId) {
    return this.dao.findEMRJcxmFushu(jcxmId);
  }

  public List<Jcxm> findJcxmList(Page page, Integer categoryId, Integer bgsId, String search, String cyxm) {
    String categoryIds = this.dao.findIds("Category", "fatherid", categoryId);
    return this.dao.findJcxmList(page, categoryIds, bgsId, search, cyxm);
  }

  public List<BanGongShi> findBgsByCategoryId(Integer categoryId) {
    String categoryIds = this.dao.findIds("Category", "fatherid", categoryId);
    List<BanGongShi> list = this.dao.findBgsByCategoryId(categoryIds);
    return list;
  }

  public List<Category> findJcxmCategoryByBgsId(Integer bgsId) {
    return this.dao.findJcxmCategoryByBgsId(bgsId);
  }

  public void syncJcxmEYEFushu() {
    this.dao.syncJcxmEYEFushu();
  }

  public List<Jcxm> findJcxmsByGH(String gonghao) {
    List<SheBei> sbs = this.shebeiDao.findAllSheBeis();
    List<Integer> is = new ArrayList<>();
    List<Jcxm> ls = new ArrayList<>();
    for (SheBei sb : sbs) {
      String[] ghs = sb.getManageUser().split(",");
      if (ghs != null && ghs.length > 0) {
        byte b;
        int i;
        String[] arrayOfString;
        for (i = (arrayOfString = ghs).length, b = 0; b < i; ) {
          String gh = arrayOfString[b];
          if (gonghao.equals(gh)) {
            String[] jcxmIds = sb.getJcxmIds().split(",");
            if (jcxmIds != null && jcxmIds.length > 0) {
              byte b1;
              int j;
              String[] arrayOfString1;
              for (j = (arrayOfString1 = jcxmIds).length, b1 = 0; b1 < j; ) {
                String jcxmId = arrayOfString1[b1];
                if (!is.contains(Integer.valueOf(Integer.parseInt(jcxmId))))
                  is.add(Integer.valueOf(Integer.parseInt(jcxmId)));
                b1++;
              }
            }
            break;
          }
          b++;
        }
      }
    }
    is.sort(null);
    for (Integer i : is)
      ls.add(this.dao.findJcxmById(i));
    return ls;
  }

  //测试数据接口
  //提出的中文进行转换
  private String language="UTF-8";
  @Resource(name = "jdbcTemplate")
  private JdbcTemplate jdbcTemplate;
  private String sqlFindTestItems="select DISTINCT charge_item_id,charge_item_name,custom_code,spell_code,stroke_code,his_id,sample_class,patient_type,unite_flag,unite_flag2,charge_item_class,charge_item_sort,chinese_name_short,standart_id,chinese_name,inspection_time,charge_item_combine,length(standart_id) lenth,charge,'' as itemInfo from   vlischargeitem where  standart_id is not null  and patient_type <>'5'";
  private String keywordColumnName="CHARGE_ITEM_NAME,SPELL_CODE";//可以通过检验项目名称或首字母检索
  private String sqlFindTestItemsOrder=" order by charge_item_class,lenth,standart_id";//查找项目后排序
  private String tableTestResult="lab_result";//检验报告表
  private String sqlFindInPatientCount="select count(*) from pat_visit where patient_id=?";
  private String sqlFindTestResult="select test_no as testNo,print_order as printSerialCode,report_item_name as title,result as val,result_date_time as testTime,print_context as note,ABNORMAL_INDICATOR as flag,units as unit from "+tableTestResult+" where test_no=? order by printSerialCode asc";
  private String sqlFindSampleByItemId="SELECT DISTINCT A.charge_item_id as charge_item_id,A.sample_class as sample_class,B.chinese_name as chinese_name,B.custom_code as custom_code,B.spell_code as spell_code,B.stroke_code as stroke_code FROM lischargeitemsampleclass A, lis_base_data B WHERE (A.sample_class = B.base_data_id)and (A.charge_item_id = ?) ";
  //根据住院的paitent_id与visit_id找到病人的ward与bed
  private String sqlFindInPatientWardAndBed="select ward_code,bed_no from pats_in_hospital where patient_id=? and visit_id=?";
  //查找常用检查检查项目
  private String sqlFindUsualItemsCode="SELECT item_value  FROM dbo.lis_setup@xhlis WHERE item =?";
  private String sqlFindUsualItems="select DISTINCT charge_item_id,charge_item_name,custom_code,spell_code,stroke_code,his_id,sample_class,patient_type,unite_flag,unite_flag2,charge_item_class,charge_item_sort,chinese_name_short,standart_id,chinese_name,inspection_time,charge_item_combine,length(standart_id) lenth,charge,'' as itemInfo from vlischargeitem where CHARGE_ITEM_ID in (?) and standart_id is not null  order by charge_item_class,lenth,standart_id";
  public void setTableTestResult(String tableTestResult) {
    this.tableTestResult = tableTestResult;
  }
  public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }
  public void setSqlFindTestItems(String sqlFindTestItems) {
    this.sqlFindTestItems = sqlFindTestItems;
  }
  public void setKeywordColumnName(String keywordColumnName) {
    this.keywordColumnName = keywordColumnName;
  }
  public void setSqlFindTestItemsOrder(String sqlFindTestItemsOrder) {
    this.sqlFindTestItemsOrder = sqlFindTestItemsOrder;
  }

  public void setSqlFindTestResult(String sqlFindTestResult) {
    this.sqlFindTestResult = sqlFindTestResult;
  }

  public List<TestItem> findTestItems(
          String classId,
          String keyword,
          String doctorWorkNo,
          int page,
          int pageSize) {
    List<TestItem>list=null;
    try {
      list=this.findTestItemsdao(classId, keyword, doctorWorkNo, page, pageSize);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return list;
  }

  public List<TestItem> findTestItemsdao(String classId, String keyword,
                                         String doctorWorkNo, final int page, final int pageSize) {
    String sql = sqlFindTestItems;
    if(classId!=null && !"".equals(classId))  {
      sql += " and  charge_item_class = '"+classId+"'";
    }
    if(keyword!=null &&!"".equals(keyword)){
      String[] columns = keywordColumnName.split(",");
      for(int i=0; i<columns.length; i++){
        if(i==0)
          sql +=" and (";
        else
          sql += " or ";
        sql += columns[i] +" like '%"+keyword+"%'";
      }
      sql +=")";
    }

    if(sqlFindTestItemsOrder!=null){
      sql += sqlFindTestItemsOrder;
    }
    return jdbcTemplate.query(sql, new ResultSetExtractor<List<TestItem>>(){
      @Override
      public List<TestItem> extractData(ResultSet rs) throws SQLException,
              DataAccessException {
        int startRow = (page-1)*pageSize+1;
        List<TestItem> list = new ArrayList<TestItem>();
        int i=0;
        String classCode=null;
        while(rs.next()&&++i<startRow+pageSize){
          if(i<startRow)continue;
          String patientType=rs.getString("patient_type");
          if(patientType.equals("10")){
            classCode = rs.getString("charge_item_id");
            System.out.println(classCode);
            continue;
          }

          TestItem t = new TestItem();
          t.setItemCode(rs.getString("charge_item_id"));
          if(classCode==null){
            TestItemClass tic=null;
            try {
              tic = getTestItemClassByItemCodeAndChargeItemClass(t.getItemCode(),new String(rs.getBytes("charge_item_class"),language));
            } catch (UnsupportedEncodingException e) {
              e.printStackTrace();
            }
            if(tic!=null){
              classCode = tic.getClassCode();
            }
          }
          if(classCode!=null){
            t.setItemClass(classCode);
          }

          t.setHisId(rs.getString("his_id"));
          t.setInputCode(rs.getString("spell_code")==null?"":rs.getString("spell_code").toUpperCase());
          t.setPatientType(patientType);
          try {
            //TODO 差写一个检测当前数据列编码的方法
            String title = new String(rs.getBytes("chinese_name"),language);
            t.setItemTitle(title);
            String info = rs.getString("itemInfo");
            if(info!=null){
              info = new String(info.getBytes(),language);
              t.setItemInfo(info);
            }
            //此处为执行科室，并非分类
/*					String itemClass=rs.getString("charge_item_class");
						if(itemClass!=null){
							itemClass=new String(itemClass.getBytes(),language);
							t.setItemClass(itemClass);
						}*/

          } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
          }
          //t.setItemPriceCode(rs.getString("itemPriceCode"));
          String itemPrice = rs.getString("charge");
          if(itemPrice!=null && !itemPrice.isEmpty())t.setItemPrice(rs.getFloat("charge"));
          list.add(t);
        }
        return list;
      }
    });
  }

  private TestItemClass getTestItemClassByItemCodeAndChargeItemClass(final String itemCode, String chargeItemClass){
    String sql = sqlFindTestItems;
    if(chargeItemClass==null)
      sql += " and charge_item_class=(select charge_item_class from vlischargeitem where charge_item_id='"+itemCode+"') ";
    else
      sql += " and charge_item_class='"+chargeItemClass+"'";
    sql += this.sqlFindTestItemsOrder;

    return jdbcTemplate.query(sql, new ResultSetExtractor<TestItemClass>(){
      @Override
      public TestItemClass extractData(ResultSet rs)
              throws SQLException, DataAccessException {
        TestItemClass itemClass = null;
        boolean yes=false;
        while(rs.next()){
          String code = rs.getString("charge_item_id");
          if(code.equals(itemCode)){
            if(itemClass!=null){
              yes=true;
            }
            break;
          }
          String patientType=rs.getString("patient_type");
          if(!patientType.equals("10"))
            continue;
          itemClass = new TestItemClass();
          itemClass.setClassCode(code);
          String name=null;
          try {
            name = new String(rs.getBytes("charge_item_name"),language);
          } catch (UnsupportedEncodingException e) {
            name= rs.getString("charge_item_name");
          }
          itemClass.setName(name);
        }
        return yes ? itemClass : null;
      }
    });
  }

  public TestItemClass getTestItemClass(String classCode) {
    return this.getTestItemClassdao(classCode);
  }

  public TestItemClass getTestItemClassdao(String classCode) {
    String sql = "select charge_item_id,charge_item_name from vlischargeitem where charge_item_id='"+classCode+"'";
    return jdbcTemplate.queryForObject(sql, new RowMapper<TestItemClass>(){
      @Override
      public TestItemClass mapRow(ResultSet rs, int arg1)
              throws SQLException {
        TestItemClass itemClass = new TestItemClass();
        String code = rs.getString("charge_item_id");
        itemClass.setClassCode(code);
        String name=null;
        try {
          if(rs.getString("charge_item_name")!=null){
            name = new String(rs.getBytes("charge_item_name"), language);
          }
        } catch (UnsupportedEncodingException e) {
          name= rs.getString("charge_item_name");
        }
        itemClass.setName(name);
        return itemClass;
      }
    });
  }

  public List<Dept> findDeptByItems(String testCode) {
    return this.findDeptByItemsdao(testCode);
  }

  public List<Dept> findDeptByItemsdao(String testCode)  {
    String sql="select DISTINCT charge_item_id,charge_item_name,custom_code,spell_code,stroke_code,his_id,sample_class,patient_type,unite_flag,unite_flag2,charge_item_class,charge_item_sort,chinese_name_short,standart_id,chinese_name,inspection_time,charge_item_combine,length(standart_id) lenth,charge,'' as itemInfo from   vlischargeitem where  standart_id is not null  and patient_type <>'5' and charge_item_id='"+testCode+"' order by charge_item_class,lenth,standart_id";
    String dept= jdbcTemplate.queryForObject(sql, new RowMapper<String>(){
      @Override
      public String mapRow(ResultSet rs, int arg1) throws SQLException {
        if(rs.getString("charge_item_class")!=null){
          try {
            return new String(rs.getBytes("charge_item_class"),language);
          } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
          }
        }
        return null;
      }
    });
    if(dept!=null){
      String strSql = "SELECT DISTINCT B.base_data_sort, B.chinese_name  FROM lischargeitem A,"
              + " lis_base_data B WHERE A.charge_item_class = B.base_data_id and B.chinese_name='"+dept+"' order by b.base_data_sort";
      return jdbcTemplate.query(strSql, new ResultSetExtractor<List<Dept>>(){
        public List<Dept> extractData(ResultSet rs) throws SQLException,
                DataAccessException {
          List<Dept>list=new ArrayList<Dept>();
          while(rs.next()){
            Dept d=new Dept();
            d.setDeptCode(rs.getString("BASE_DATA_SORT"));
            try {
              d.setName(new String(rs.getBytes("CHINESE_NAME"),language));
            } catch (UnsupportedEncodingException e) {
            }
            list.add(d);
          }
          return list;
        }

      });
    }
    return null;
  }

  public List<Sample> findSampleByItemId(String itemCode) {
    return this.findSampleByItemIddao(itemCode);
  }

  public List<Sample> findSampleByItemIddao(String itemCode) {
    String sql=sqlFindSampleByItemId;
    return jdbcTemplate.query(sql, new Object[]{itemCode},new RowMapper<Sample>(){
      @Override
      public Sample mapRow(ResultSet rs, int arg1) throws SQLException {
        Sample s=new Sample();
        s.setId(rs.getString("sample_class"));
        s.setCustomCode(rs.getString("custom_code"));
        s.setSpellCode(rs.getString("spell_code"));
        s.setStrokeCode(rs.getString("stroke_code"));
        try {
          s.setChineseName(new String(rs.getBytes("chinese_name"),language));
        } catch (UnsupportedEncodingException e) {
        }
        return s;
      }

    });
  }
}
