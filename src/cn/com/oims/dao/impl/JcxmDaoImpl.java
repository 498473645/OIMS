package cn.com.oims.dao.impl;

import cn.com.oims.dao.IJcxmDao;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.EMRJcxmFushu;
import cn.com.oims.dao.pojo.EMRJcxmZhixingkeshi;
import cn.com.oims.dao.pojo.EMRLisJcxmSample;
import cn.com.oims.dao.pojo.EMRLisSample;
import cn.com.oims.dao.pojo.HandleProject;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.JcxmPertainItem;
import cn.com.oims.dao.pojo.JcxmToHisItem;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.pojo.his.PriceItem;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class JcxmDaoImpl extends BaseDaoImpl implements IJcxmDao {
  private String clazzName = Jcxm.class.getSimpleName();
  
  @Autowired
  HisWebService hisWebService;
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Jcxm.class);
  }
  
  @Override
  public int counts() {
    int i = ((Integer)this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0)).intValue();
    return i;
  }
  
  @Override
  public List<Jcxm> findAllJcxm4Page(Page p) {
    p.setRowsCount(Integer.valueOf(counts()));
    p.init();
    return this.hibernateTemplate.findByCriteria(getDC(), p.getStartRow().intValue(), 
        p.getPageSize().intValue());
  }
  
  @Override
  public List<Jcxm> findAllJcxm(String categoryIds, String keyword, Page page) {
    String hql = "  from Jcxm where enableFlag=true and  categoryId in (" + categoryIds + ")";
    if (keyword != null && !keyword.isEmpty()) {
      keyword = keyword.replaceAll("'", "");
      hql = String.valueOf(hql) + " and ( input_code like '%" + keyword.toUpperCase() + "%' or  bianma like '%" + keyword + "%' or xmmc like '%" + keyword + "%')";
    } 
    page.setRowsCount(Integer.valueOf(counts("select count(*)" + hql)));
    page.init();
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public Serializable saveJcxm(Jcxm jcxm) {
    return this.hibernateTemplate.save(jcxm);
  }
  
  @Override
  public void delJcxm(Serializable id) {
    Jcxm jcxm = findJcxmById(id);
    this.hibernateTemplate.delete(jcxm);
  }
  
  @Override
  public void saveOrUpdateJcxm(Jcxm o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  @Override
  public Jcxm findJcxmById(Serializable id) {
    return (Jcxm)this.hibernateTemplate.get(Jcxm.class, id);
  }
  
  @Override
  public void updateJcxm(Jcxm jcxm) {
    this.hibernateTemplate.update(jcxm);
  }
  
  @Override
  public List findJcxmsByPageAndJcxm(Page page, Jcxm jcxm) {
    String hql_count = "select count(jcxm.id) from Jcxm as jcxm,Category as category_fatherId,Category as category_categoryId";
    String hql_map = "select new map(jcxm.id as jcxmid, jcxm.bianma as bianma, jcxm.xmmc as xmmc, jcxm.xmms as xmms, jcxm.fatherId as fatherId, category_fatherId.category as fatherName, jcxm.categoryId as categoryId, category_categoryId.category as categoryName, jcxm.leftPicPath as leftPicPath,jcxm.rightPicPath as rightPicPath ) from Jcxm as jcxm,Category as category_fatherId,Category as category_categoryId";
    String strWhere = " where 1=1 ";
    if (jcxm.getXmmc() != null && !"".equals(jcxm.getXmmc())) {
      strWhere = String.valueOf(strWhere) + " and jcxm.xmmc like '%" + jcxm.getXmmc() + "%'";
    }
    strWhere = String.valueOf(strWhere) + " and jcxm.fatherId=category_fatherId.id ";
    strWhere = String.valueOf(strWhere) + " and jcxm.categoryId=category_categoryId.id ";
    strWhere = String.valueOf(strWhere) + " order by jcxm.id desc";
    hql_count = String.valueOf(hql_count) + strWhere;
    hql_map = String.valueOf(hql_map) + strWhere;
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<Jcxm> findJcxmByCategory(Serializable categoryId) {
    return this.hibernateTemplate
      .findByNamedParam(
        "select j from Jcxm j,JcxmFenlei fl where j.id = fl.jcxmId and fl.jbflId=:categoryId order by xuhao", 
        "categoryId", categoryId);
  }
  
  @Override
  public List<Jcxm> getJcxmListByBmid(int bmid) {
    String jcxmSql = getJcxmStrToSheBeiByBmid(bmid);
    String hql = "from Jcxm where id in (" + jcxmSql + ")";
    return this.hibernateTemplate.find(hql);
  }
  
  private String getJcxmStrToSheBeiByBmid(int bmid) {
    String hql = "select jcxmIds from SheBei where bmId=" + bmid;
    String jcxmids = "";
    List list = this.hibernateTemplate.find(hql);
    for (int i = 0; i < list.size(); i++) {
      if (i != list.size() - 1) {
        if (list.get(i) != null && !"".equals(list.get(i).toString())) {
          jcxmids = String.valueOf(jcxmids) + list.get(i).toString() + ",";
        }
      } else if (list.get(i) != null && !"".equals(list.get(i).toString())) {
        jcxmids = String.valueOf(jcxmids) + list.get(i).toString();
      } else {
        jcxmids = String.valueOf(jcxmids) + "-1";
      } 
    } 
    return jcxmids;
  }
  
  @Override
  public List<Jcxm> findJcxmsByJcxm(Jcxm jcxm) {
    return this.hibernateTemplate.findByExample(jcxm);
  }
  
  @Override
  public List<Jcxm> findJcxmsByIds(String ids) {
    String hql = "from Jcxm as jcxm where jcxm.enableFlag=true and jcxm.id in (" + ids + ") order by jcxm.input_code";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<Jcxm> getJcxmListByBgsId(int bgsId) {
    String jcxmSql = getJcxmStrToSheBeiByBgsId(bgsId);
    if ("".equals(jcxmSql)) {
      return null;
    }
    String hql = "from Jcxm as jcxm where jcxm.id in (" + jcxmSql + ")";
    return this.hibernateTemplate.find(hql);
  }
  
  private String getJcxmStrToSheBeiByBgsId(int bgsId) {
    String hql = "select jcxmIds from SheBei where bgsId=" + bgsId;
    String jcxmids = "";
    List list = this.hibernateTemplate.find(hql);
    int i;
    for (i = 0; i < list.size() - 1; i++) {
      if (list.get(i) != null && !"".equals(list.get(i).toString())) {
        jcxmids = String.valueOf(jcxmids) + list.get(i).toString() + ",";
      }
    } 
    if (i == list.size() - 1) {
      if (list.get(i) != null && !"".equals(list.get(i).toString())) {
        jcxmids = String.valueOf(jcxmids) + list.get(i).toString();
      } else {
        jcxmids = jcxmids.substring(0, jcxmids.lastIndexOf(","));
      }
    }
    return jcxmids;
  }
  
  @Override
  public Jcxm getJcxmByBianma(String itemCode) {
    String hql = "from Jcxm where bianma=?";
    List<Jcxm> list = this.hibernateTemplate.find(hql, new Object[] { itemCode });
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public void deleteJcxmFushu(List<EMRJcxmFushu> list) {
    Iterator<EMRJcxmFushu> itr = list.iterator();
    while (itr.hasNext()) {
      EMRJcxmFushu fushu = itr.next();
      fushu.setEnableFlag(false);
      this.hibernateTemplate.update(fushu);
    } 
  }
  
  @Override
  public EMRJcxmFushu getEMRJcxmFushu(String itemCode) {
    List<EMRJcxmFushu> list = this.hibernateTemplate.find("from EMRJcxmFushu where bianma=?", new Object[] { itemCode });
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public void saveOrUpdateEMRJcxmFushu(EMRJcxmFushu fs) {
    this.hibernateTemplate.saveOrUpdate(fs);
  }
  
  @Override
  public List<EMRJcxmFushu> findEMRJcxmFushu(Integer id) {
    String hql = " from EMRJcxmFushu where enableFlag=true and jcxmId=" + id + " order by id asc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<EMRJcxmZhixingkeshi> findEMRJcxmZhixingkeshi(Integer id, String categoryIds) {
    if (id != null) {
      return this.hibernateTemplate.find("from EMRJcxmZhixingkeshi where jcxmId=" + id + " order by orderNum desc, id");
    }
    if (categoryIds != null) {
      return this.hibernateTemplate.find("from EMRJcxmZhixingkeshi  z where ( select count(*) from Jcxm where categoryId in(" + categoryIds + ") and id=z.jcxmId)>0 order by z.orderNum desc,z.id");
    }
    return new ArrayList<EMRJcxmZhixingkeshi>();
  }
  
  @Override
  public void saveEMRJcxmZhixingkeshi(EMRJcxmZhixingkeshi jczxks) {
    this.hibernateTemplate.saveOrUpdate(jczxks);
  }
  
  @Override
  public void deleteEMRJcxmZhixingkeshi(List<EMRJcxmZhixingkeshi> ksList) {
    this.hibernateTemplate.deleteAll(ksList);
  }
  
  @Override
  public List<EMRLisJcxmSample> findEMRLisJcxmSample(Integer id) {
    return this.hibernateTemplate.find("from EMRLisJcxmSample where jcxmId=" + id + " order by orderNum desc,id");
  }
  
  @Override
  public Integer saveEMRLisSample(EMRLisSample sample) {
    return (Integer)this.hibernateTemplate.save(sample);
  }
  
  @Override
  public void deleteEMRLisJcxmSample(List<EMRLisJcxmSample> list) {
    this.hibernateTemplate.deleteAll(list);
  }
  
  @Override
  public void updateEMRLisSample(EMRLisSample es) {
    this.hibernateTemplate.update(es);
  }
  
  @Override
  public void saveEMRLisJcxmSample(EMRLisJcxmSample sample) {
    this.hibernateTemplate.saveOrUpdate(sample);
  }
  
  @Override
  public EMRLisSample findSampleByCode(String id) {
    List<EMRLisSample> list = this.hibernateTemplate.find("from EMRLisSample where sampleCode='" + id + "'");
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public EMRLisSample getEMRLisSample(Integer id) {
    return (EMRLisSample)this.hibernateTemplate.get(EMRLisSample.class, id);
  }
  
  @Override
  public List<Jcxm> findAllJcxm(String categoryIds) {
    String hql = "  from Jcxm where enableFlag=true and  categoryId in (" + categoryIds + ")";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<Jcxm> findJcxmList(Page page, String categoryIds, Integer bgsId, String search, String cyxm) {
    String hql = " from Jcxm j where j.enableFlag=true and j.categoryId in (" + categoryIds + ")";
    if (bgsId != null) {
      String ids = getJcxmIds(bgsId);
      if (ids != null && Integer.parseInt(categoryIds) != 5) {
        hql = String.valueOf(hql) + " and  j.id in (" + ids + ")";
      } else {
        hql = String.valueOf(hql) + " and (select count(*) from EMRJcxmZhixingkeshi where bgsId=" + bgsId + " and j.id=jcxmId)>0";
      } 
    } 
    if (search != null && !search.isEmpty()) {
      search = search.replaceAll("'", "");
      hql = String.valueOf(hql) + " and (j.input_code like '%" + search.toUpperCase() + "%' or  j.bianma like '%" + search + "%' or j.xmmc like '%" + search + "%')";
    } 
    if (cyxm != null && !cyxm.isEmpty() && !cyxm.equals("0")) {
      hql = String.valueOf(hql) + " and j.cyxm =" + cyxm;
    }
    hql = String.valueOf(hql) + " order by j.id";
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  private String getJcxmIds(Integer bgsId) {
    String sbHql = "select jcxmIds from SheBei where qiyong=true and bgsId='" + bgsId + "'";
    List<String> list = this.hibernateTemplate.find(sbHql);
    if (list.size() == 0) {
      return null;
    }
    Iterator<String> itr = list.iterator();
    HashSet<String> set = new HashSet<String>();
    while (itr.hasNext()) {
      String jcxmIds = itr.next();
      if (jcxmIds == null) {
        continue;
      }
      String[] ids = jcxmIds.split(",");
      byte b;
      int j;
      String[] arrayOfString1;
      for (j = (arrayOfString1 = ids).length, b = 0; b < j; ) {
        String id = arrayOfString1[b];
        set.add(id);
        b++;
      } 
    } 
    if (set.size() == 0) {
      return null;
    }
    itr = set.iterator();
    StringBuffer sb = new StringBuffer();
    int i = 0;
    while (itr.hasNext()) {
      if (i > 0) {
        sb.append(",");
      }
      sb.append(itr.next());
      i++;
    } 
    return sb.toString();
  }
  
  @Override
  public List<BanGongShi> findBgsByCategoryId(String categoryIds) {
    String hql = "select distinct b from EMRJcxmZhixingkeshi jz, Jcxm j,BanGongShi b where jz.jcxmId=j.id and b.id=jz.bgsId and j.categoryId in(" + categoryIds + ")";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<Category> findJcxmCategoryByBgsId(Integer bgsId) {
    String hql = "select distinct c from Category c, EMRJcxmZhixingkeshi jz, Jcxm j where jz.jcxmId=j.id and j.categoryId=c.id";
    if (bgsId != null) {
      hql = String.valueOf(hql) + " and jz.bgsId=" + bgsId;
    }
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  @Transactional
  public void syncJcxmEYEFushu() {
    String hql = "from JcxmToHisItem";
    List<JcxmToHisItem> list = this.hibernateTemplate.find(hql);
    Iterator<JcxmToHisItem> itr = list.iterator();
    while (itr.hasNext()) {
      JcxmToHisItem item = itr.next();
      PriceItem pi = this.hisWebService.getPriceItemByCode("null," + item.getHis_item_code() + "," + item.getHis_item_spec() + "," + null);
      if (pi == null) {
        this.hibernateTemplate.delete(item);
        continue;
      } 
      Integer jcxmId = item.getJcxm_id();
      if (jcxmId == null || jcxmId.intValue() == 0) {
        System.out.println("id:" + item.getId() + ",未关联检查项目");
        continue;
      } 
      Jcxm jcxm = findJcxmById(jcxmId);
      if (jcxm == null) {
        System.out.println("id:" + item.getId() + ",未找到关联的检查项目");
        continue;
      } 
      EMRJcxmFushu fushu = getJcxmFushu(jcxmId, item.getHis_item_code());
      if (fushu != null) {
        if (item.getMultiple().doubleValue() == 2.0D) {
          fushu.setDefaultNum(Float.valueOf(2.0F));
        }
      } else {
        fushu = new EMRJcxmFushu();
        fushu.setDefaultNum(new Float(item.getMultiple().doubleValue()));
      } 
      fushu.setBianma(item.getHis_item_code());
      fushu.setChooseEnable(false);
      fushu.setDefaultNumChangeEnable(false);
      fushu.setEnableFlag(true);
      fushu.setJcxmId(jcxmId);
      try {
        fushu.setPrice(this.hisWebService.getPriceByPriceCode(String.valueOf(pi.getItemClass()) + "@" + pi.getItemCode() + "@" + pi.getSpec() + "@" + pi.getUnit(), null));
      } catch (Exception e) {
        System.out.println("item id:" + item.getId() + "获取价格失败！");
      } 
      fushu.setPricecode(String.valueOf(pi.getItemClass()) + "@" + pi.getItemCode() + "@" + pi.getSpec() + "@" + pi.getUnit());
      fushu.setTongbuShijian(new Date());
      fushu.setXmmc(item.getHis_item_name());
      this.hibernateTemplate.saveOrUpdate(fushu);
      jcxm.setHaveOption(true);
      this.hibernateTemplate.update(jcxm);
    } 
    hql = "from JcxmPertainItem";
    List<JcxmPertainItem> l = this.hibernateTemplate.find(hql);
    Iterator<JcxmPertainItem> itr1 = l.iterator();
    System.out.println("-------pertain----------");
    while (itr1.hasNext()) {
      JcxmPertainItem item1 = itr1.next();
      PriceItem pi = this.hisWebService.getPriceItemByCode(String.valueOf(item1.getItem_class()) + "," + item1.getItem_code() + ",null,null");
      if (pi == null) {
        System.out.println(String.valueOf(item1.getItem_class()) + "***" + item1.getItem_code());
        this.hibernateTemplate.delete(item1);
        continue;
      } 
      Integer jcxmId = item1.getJcxm_id();
      if (jcxmId == null || jcxmId.intValue() == 0) {
        System.out.println("JcxmPertainItem id:" + item1.getId() + ",未关联检查项目");
        continue;
      } 
      Jcxm jcxm = findJcxmById(jcxmId);
      if (jcxm == null) {
        System.out.println("JcxmPertainItem id:" + item1.getId() + ",未找到关联的检查项目");
        continue;
      } 
      EMRJcxmFushu fushu = getJcxmFushu(jcxmId, item1.getItem_code());
      if (fushu == null) {
        fushu = new EMRJcxmFushu();
      }
      fushu.setDefaultNum(Float.valueOf(2.0F * item1.getQuantity().floatValue()));
      fushu.setBianma(item1.getItem_code());
      fushu.setChooseEnable(false);
      fushu.setDefaultNumChangeEnable(false);
      fushu.setEnableFlag(true);
      fushu.setJcxmId(jcxmId);
      try {
        fushu.setPrice(this.hisWebService.getPriceByPriceCode(String.valueOf(pi.getItemClass()) + "@" + pi.getItemCode() + "@" + pi.getSpec() + "@" + pi.getUnit(), null));
      } catch (Exception e) {
        System.out.println("item1 id:" + item1.getId() + "获取价格失败！");
      } 
      fushu.setPricecode(String.valueOf(pi.getItemClass()) + "@" + pi.getItemCode() + "@" + pi.getSpec() + "@" + pi.getUnit());
      fushu.setTongbuShijian(new Date());
      fushu.setXmmc(item1.getItem_name());
      this.hibernateTemplate.saveOrUpdate(fushu);
      jcxm.setHaveOption(true);
      this.hibernateTemplate.update(jcxm);
    } 
    hql = "from HandleProject";
    List<HandleProject> l2 = this.hibernateTemplate.find(hql);
    Iterator<HandleProject> itr2 = l2.iterator();
    System.out.println("-------------treat------------");
    while (itr2.hasNext()) {
      HandleProject project = itr2.next();
      PriceItem pi = this.hisWebService.getPriceItemByCode("null," + project.getProject_code() + "," + project.getProject_spec() + "," + null);
      if (pi == null) {
        System.out.println(project.getProject_code());
      }
      Jcxm jcxm = findJcxmById(project.getId());
      if (jcxm == null) {
        System.out.println("id:" + jcxm.getId() + ",未找到关联的检查项目");
        continue;
      } 
      EMRJcxmFushu fushu = getJcxmFushu(project.getId(), project.getProject_code());
      if (fushu == null) {
        fushu = new EMRJcxmFushu();
      }
      fushu.setDefaultNum(Float.valueOf(1.0F));
      fushu.setBianma(project.getProject_code());
      fushu.setChooseEnable(false);
      fushu.setDefaultNumChangeEnable(false);
      fushu.setEnableFlag(true);
      fushu.setJcxmId(project.getId());
      try {
        fushu.setPrice(this.hisWebService.getPriceByPriceCode(String.valueOf(pi.getItemClass()) + "@" + pi.getItemCode() + "@" + pi.getSpec() + "@" + pi.getUnit(), null));
      } catch (Exception e) {
        System.out.println("item id:" + project.getId() + "获取价格失败！");
      } 
      fushu.setPricecode(String.valueOf(pi.getItemClass()) + "@" + pi.getItemCode() + "@" + pi.getSpec() + "@" + pi.getUnit());
      fushu.setTongbuShijian(new Date());
      fushu.setXmmc(project.getProject_name());
      this.hibernateTemplate.saveOrUpdate(fushu);
      jcxm.setHaveOption(true);
      this.hibernateTemplate.update(jcxm);
    } 
  }
  
  private EMRJcxmFushu getJcxmFushu(Integer jcxmId, String itemCode) {
    String hql = " from EMRJcxmFushu where jcxmId=" + jcxmId + " and bianma='" + itemCode + "'";
    List<EMRJcxmFushu> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public EMRJcxmFushu findEMRJcxmFushuLis(Integer fushuid) {
    return (EMRJcxmFushu)this.hibernateTemplate.get(EMRJcxmFushu.class, fushuid);
  }
  
  public List<Map<String, Object>> findJCXMExport() {
    String hql = "select new map(j.id as id,j.xmmc as xmmc,fs.xmmc as fushu_xmmc,fs.defaultNum as shuliang,fs.price as price) from Jcxm j,EMRJcxmFushu fs where j.id=fs.jcxmId and j.enableFlag=true and fs.enableFlag=true and j.categoryId in(5,7,9,11) order by id,fs.id";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return list;
  }
}
