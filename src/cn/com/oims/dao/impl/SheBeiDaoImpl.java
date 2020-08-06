package cn.com.oims.dao.impl;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.ISheBeiDao;
import cn.com.oims.dao.pojo.EMRJcxmZhixingkeshi;
import cn.com.oims.dao.pojo.SheBei;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class SheBeiDaoImpl extends BaseDaoImpl implements ISheBeiDao {
  private String clazzName = SheBei.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(SheBei.class);
  }
  
  public int countsOfSheBei() {
    Long l = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }
  
  public List<SheBei> findSheBeisByPage(Page page) {
    page.setRowsCount(Integer.valueOf(countsOfSheBei()));
    page.init();
    return this.hibernateTemplate.findByCriteria(getDC(), 
        page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  public List<SheBei> findAllSheBeis() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public void deleteSheBeiById(Serializable id) {
    String sql = "delete from " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public Serializable saveSheBei(SheBei shebei) {
    return this.hibernateTemplate.save(shebei);
  }
  
  public void saveOrUpdateSheBei(SheBei shebei) {
    this.hibernateTemplate.saveOrUpdate(shebei);
  }
  
  public void updateSheBei(SheBei shebei) {
    this.hibernateTemplate.update(shebei);
  }
  
  public SheBei findSheBeiById(Serializable id) {
    return (SheBei)this.hibernateTemplate.get(SheBei.class, id);
  }
  
  public List getShebeiListByManagerUser(String gonghao) {
    String hql = "select new map(s.id as id,s.sbmc as smbc) from SheBei s where s.manageUser = '" + 
      gonghao + "' and s.qiyong=1";
    return this.hibernateTemplate.find(hql);
  }
  
  public List findAllSheBeisByPageAndSheBei(Page page, SheBei shebei) {
    String hql_count = "select count(shebei.id) from SheBei as shebei,BuMen as bumen,BanGongShi as bangongshi,Category as protocolcategory";
    String hql_map = "select new map(shebei.id as shebeiid,shebei.sbmc as sbmc,shebei.ggxh as ggxh,shebei.bmId as bmId,bumen.bmmc as bmmc,shebei.bgsId as bgsId,bangongshi.bgs as bsgName,shebei.ip as ip,shebei.smbUser as smbUser,shebei.smbName as smbName,shebei.smbPassword as smbPassword,shebei.online as online,shebei.manageUser as manageUser,shebei.protocol as protocol,shebei.jcxmIds as jcxmIds,shebei.qiyong as qiyong,shebei.xppath as xppath )from SheBei as shebei,BuMen as bumen,BanGongShi as bangongshi,Category as protocolcategory ";
    String strWhere = " where 1=1 ";
    if (shebei.isQiyong())
      strWhere = String.valueOf(strWhere) + " and shebei.qiyong= " + shebei.isQiyong(); 
    if (!shebei.isQiyong())
      strWhere = String.valueOf(strWhere) + " and shebei.qiyong= " + shebei.isQiyong(); 
    if (shebei.getSbmc() == null || !"".equals(shebei.getSbmc()));
    strWhere = String.valueOf(strWhere) + " and shebei.sbmc like '%" + shebei.getSbmc() + "%' ";
    strWhere = String.valueOf(strWhere) + " and shebei.bmId=bumen.id ";
    strWhere = String.valueOf(strWhere) + " and shebei.bgsId=bangongshi.id ";
    strWhere = String.valueOf(strWhere) + " and shebei.protocol=protocolcategory.id ";
    strWhere = String.valueOf(strWhere) + " order by shebei.id desc";
    hql_count = String.valueOf(hql_count) + strWhere;
    hql_map = String.valueOf(hql_map) + strWhere;
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    return getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
  }
  
  public List getShebeiListByManagerUserAndIp(String gonghao, String ip) {
    String hql = "select new map(s.id as id,s.sbmc as smbc,s.xppath as xppath) from SheBei s where (s.manageUser = '" + 
      
      gonghao + "'" + 
      " or s.manageUser like '" + gonghao + ",%'" + 
      " or s.manageUser like '%," + gonghao + ",%'" + 
      " or s.manageUser like '%," + gonghao + "')" + " and s.ip='" + 
      ip + "' and s.qiyong=1";
    return this.hibernateTemplate.find(hql);
  }
  
  public SheBei getShebeiByLoginUserAndIp(String gonghao, String ip) {
    String hql = "from SheBei where manageUser = '" + gonghao + 
      "' and ip='" + ip + "' and qiyong=1";
    List<SheBei> list = this.hibernateTemplate.find(hql);
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  public List<SheBei> getShebeisBySheBei(SheBei shebei) {
    String hql = "from SheBei as shebei where 1=1 ";
    if (shebei.getBmId() != null)
      hql = String.valueOf(hql) + " and shebei.bmId=" + shebei.getBmId(); 
    return this.hibernateTemplate.find(hql);
  }
  
  public String getBgsIdByJcxmidAndBumenid(String jcxmid, int bumenid) {
    String hql = "from EMRJcxmZhixingkeshi where jcxmId=" + jcxmid;
    List<EMRJcxmZhixingkeshi> list = this.hibernateTemplate.find(hql);
    String bgsid = null;
    if (list != null && list.size() > 0) {
      bgsid = ((EMRJcxmZhixingkeshi)list.get(0)).getBgsId().toString();
      return bgsid;
    } 
    return OimsCategoryConfig.WESTSOUTHHOSPITALAPARTMENT.toString();
  }
  
  public List<SheBei> findSheBeiByJcxmIdAndIP(String jcxmId, String ip) {
    String hql = "from SheBei where qiyong = 1 ";
    if (ip != null && !ip.isEmpty())
      hql = String.valueOf(hql) + " and ip= '" + ip + "'"; 
    if (jcxmId != null && !jcxmId.isEmpty())
      hql = String.valueOf(hql) + " and (jcxmIds like '%," + jcxmId + "' " + 
        "or jcxmIds like '%," + jcxmId + ",%' " + "or jcxmIds like '" + 
        jcxmId + ",%' " + "or jcxmIds like '" + jcxmId + "' )"; 
    System.out.println(hql);
    return this.hibernateTemplate.find(hql);
  }
}
