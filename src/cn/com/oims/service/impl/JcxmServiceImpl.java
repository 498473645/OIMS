package cn.com.oims.service.impl;

import cn.com.oims.dao.IBanGongShiDao;
import cn.com.oims.dao.IBuMenDao;
import cn.com.oims.dao.ICategoryDao;
import cn.com.oims.dao.IJcxmDao;
import cn.com.oims.dao.ISheBeiDao;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.EMRJcxmFushu;
import cn.com.oims.dao.pojo.EMRJcxmZhixingkeshi;
import cn.com.oims.dao.pojo.EMRLisJcxmSample;
import cn.com.oims.dao.pojo.EMRLisSample;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.SheBei;
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
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

  /**
   * @description:同步HIS检查项目信息到本地业务库
   * @param
   * @return:
   * @author: Mason
   * @time: 2020/6/24 10:52
   */
  public void synchJcxmItem() {
    System.out.println("------同步开始");
    Date today = MultiUtils.getStartTimeOfDay();
    if (synchTime != null && synchTime.after(today))
      return;
    //1、同步检查项目
    synchJcxmOtherExam();
    //2、同步化验项目
    synchJcxmLabTest();
    synchTime = new Date();
    System.out.println("-------同步结束-------");
  }
  
  private void synchJcxmLabTest() {
    synchTestItems();
  }

  /**
   * @description:同步HIS上的化验项目
   * @param
   * @return:
   * @author: Mason
   * @time: 2020/6/24 16:03
   */
  private void synchTestItems() {
    int i = 1;
    while (true) {
      //1、获取医院开展的化验项目
      List<TestItem> list = this.lisWebService.findTestItems(null, null, null, i, 1000);
      Iterator<TestItem> itr = list.iterator();
      //2、循环化验项目集合
      while (itr.hasNext()) {
        TestItem item = itr.next();
        String classCode = item.getItemClass();
        Category category = null;
        if (classCode != null) {
          //3、根据化验项目编码查询化验项目分类
          category = this.categoryDao.getCategoryByIntr("#lisCode_" + classCode);
          //4、如果类别不为空
          if (category == null) {
            //4-1、通过化验项目分类ID 获取化验项目分类
            TestItemClass itemClass = this.lisWebService.getTestItemClass(classCode);
            //4-2、化验项目分类不为空-->新增化验项目分类到oims_category表
            if (itemClass != null) {
              category = new Category();
              category.setCategory(itemClass.getName());
              category.setIntr("#lisCode_" + classCode);
              category.setFatherid(Integer.valueOf(15));
              this.categoryDao.saveCategory(category);
            } 
          } 
        }
        //5、根据检查项目编码查询本地检查项目
        Jcxm jcxm = this.dao.getJcxmByBianma("LIS" + item.getItemCode());
        try {
          if (jcxm == null) {
            //5-1、如果本地没有化验项目，新增
            jcxm = saveTestItem(item, category);
          } else {
            //5-2、如果该化验项目已存在，设置分类id、更新
            if (category != null)
              jcxm.setCategoryId(category.getId()); 
            updateTestItem(item, jcxm);
          }
          //6、同步执行科室
          synchZhixingkeshi(jcxm, this.lisWebService.findDeptByItems(item.getItemCode()));
          //7、同步化验标本表信息
          synchSample(jcxm, item);
        } catch (Exception e) {
          e.printStackTrace();
        } 
      } 
      if (list.size() < 1000)
        break; 
      i++;
    } 
  }

  /**
   * @description:
   * @param jcxm 检查项目
   * @param item 化验项目
   * @return: void
   * @author: Mason
   * @time: 2020/6/24 16:44
   */
  private void synchSample(Jcxm jcxm, TestItem item) {
    //1、根据化验项目编码查询HIS检验项目对应标本
    List<Sample> list = this.lisWebService.findSampleByItemId(item.getItemCode());
    //2、根据化验项目id查询业务库检验项目对应标本集合
    List<EMRLisJcxmSample> sl = this.dao.findEMRLisJcxmSample(jcxm.getId());
    //3、如果HIS没有查询到化验标本
    if (list == null) {
      //3-1、如果本地有化验标本-->删除本地化验标本
      if (sl.size() > 0)
        this.dao.deleteEMRLisJcxmSample(sl); 
      System.out.println(String.valueOf(item.getItemCode()) + "(" + item.getItemTitle() + ")  没有找到标本！");
      return;
    }
    //4、循环HIS上查询到的化验标本集合
    Iterator<Sample> itr = list.iterator();
    while (itr.hasNext()) {
      Sample s = itr.next();
      //5、根据化验标本id查询化验标本
      EMRLisSample es = this.dao.findSampleByCode(s.getId());
      //6、如果没有查询到化验标本-->新增
      if (es == null) {
        es = new EMRLisSample();
        es.setSampleCode(s.getId());
        es.setSampleName(s.getChineseName());
        this.dao.saveEMRLisSample(es);
      } else {
        //7、如果查询到了化验标本-->更新化验标本名称
        es.setSampleName(s.getChineseName());
        this.dao.updateEMRLisSample(es);
      } 
      EMRLisJcxmSample ljs = new EMRLisJcxmSample();
      ljs.setJcxmId(jcxm.getId());
      ljs.setSampleId(es.getId());
      if (es.getSampleName().equals("静脉血"))
        ljs.setOrderNum(1); 
      boolean x = false;
      for (EMRLisJcxmSample js : sl) {
        if (js.getJcxmId().intValue() == ljs.getJcxmId().intValue() && js.getSampleId().intValue() == ljs.getSampleId().intValue()) {
          sl.remove(js);
          x = true;
          break;
        } 
      } 
      if (!x)
        this.dao.saveEMRLisJcxmSample(ljs); 
    } 
    if (sl.size() > 0)
      this.dao.deleteEMRLisJcxmSample(sl); 
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
      if (l == null) {
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

  /**
   * @description:同步执行科室
   * @param jcxm 检查项目
   * @param list 执行科室集合
   * @return: void
   * @author: Mason
   * @time: 2020/6/24 15:39
   */
  private void synchZhixingkeshi(Jcxm jcxm, List<Dept> list) {
    //1、根据检查项目id查询可以执行该检查的所有执行科室集合
    List<EMRJcxmZhixingkeshi> ksList = this.dao.findEMRJcxmZhixingkeshi(jcxm.getId(), null);
    //2-1、如果该检查项目没有执行科室（传过来的参数，通过HIS查询到的数据）
    if (list == null) {
      System.out.println(String.valueOf(jcxm.getBianma()) + "(" + jcxm.getXmmc() + ")未找到执行科室！");
      //2-2、如果本方法内查询到该检查项目有执行科室
      if (ksList.size() > 0){
        //2-3、删除本地执行科室
        this.dao.deleteEMRJcxmZhixingkeshi(ksList);
      }
      //2-4、删除检查项目
      this.dao.delJcxm(jcxm.getId());
      //2-5、删除检查项目样本数据
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
}
