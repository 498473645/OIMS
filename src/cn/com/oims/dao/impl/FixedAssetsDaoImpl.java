package cn.com.oims.dao.impl;

import cn.com.oims.dao.IFixedAssetsDao;
import cn.com.oims.dao.pojo.FixedAssets;
import cn.com.oims.dao.pojo.MaintainRecord;
import cn.com.oims.web.form.FixedAssetsSearchForm;
import com.codesnet.common.Page;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class FixedAssetsDaoImpl extends BaseDaoImpl implements IFixedAssetsDao {
  @Override
  public List<FixedAssets> findFixedAssets(FixedAssetsSearchForm form, Page page) {
    StringBuffer hql = new StringBuffer(" from FixedAssets where 1=1");
    String order = " order by updateDate desc, id desc";
    Map<String, Object> map = new HashMap<String, Object>();
    if (form.getScrapFlag() != null) {
      hql.append(" and scrapFlag=:scrapFlag");
      map.put("scrapFlag", form.getScrapFlag());
    } 
    if (form.getContacts() != null && !form.getContacts().isEmpty()) {
      hql.append(" and contacts=:contacts");
      map.put("contacts", form.getContacts());
    } 
    if (form.getDeptId() != null) {
      hql.append(" and deptId=:deptId");
      map.put("deptId", form.getDeptId());
    } 
    if (form.getFax() != null && !form.getFax().isEmpty()) {
      hql.append(" and fax=:fax");
      map.put("fax", form.getFax());
    } 
    if (form.getFlowerNo() != null && !form.getFlowerNo().isEmpty()) {
      hql.append(" and flowerNo=:flowerNo");
      map.put("flowerNo", form.getFlowerNo());
    } 
    if (form.getMail() != null && !form.getMail().isEmpty()) {
      hql.append(" and mail=:mail");
      map.put("mail", form.getMail());
    } 
    if (form.getManufacturer() != null && !form.getManufacturer().isEmpty()) {
      hql.append(" and manufacturer=:manufacturer");
      map.put("manufacturer", form.getManufacturer());
    } 
    if (form.getMobile() != null && !form.getMobile().isEmpty()) {
      hql.append(" and mobile=:mobile");
      map.put("mobile", form.getMobile());
    } 
    if (form.getName() != null && !form.getName().isEmpty()) {
      hql.append(" and name=:name");
      map.put("name", form.getName());
    } 
    if (form.getNextMaintenanceDate() != null) {
      hql.append("  and nextMaintenanceDate<:nextMaintenanceDate");
      map.put("nextMaintenanceDate", form.getNextMaintenanceDate());
      order = " order by nextMaintenanceDate";
    } 
    if (form.getOperator() != null && !form.getOperator().isEmpty()) {
      hql.append(" and operator=:operator");
      map.put("operator", form.getOperator());
    } 
    if (form.getPriceMax() != null) {
      hql.append(" and price<=:priceMax");
      map.put("priceMax", form.getPriceMax());
    } 
    if (form.getPriceMin() != null) {
      hql.append(" and price>=:priceMin");
      map.put("priceMin", form.getPriceMin());
    } 
    if (form.getPurchaseOrderDateEnd() != null) {
      hql.append(" and purchaseOrderDate<=:purchaseOrderDateEnd");
      map.put("purchaseOrderDateEnd", form.getPurchaseOrderDateEnd());
    } 
    if (form.getPurchaseOrderDateStart() != null) {
      hql.append(" and purchaseOrderDate>=:purchaseOrderDateStart");
      map.put("purchaseOrderDateStart", form.getPurchaseOrderDateStart());
    } 
    if (form.getSn() != null && !form.getSn().isEmpty()) {
      hql.append(" and sn=:sn");
      map.put("sn", form.getSn());
    } 
    if (form.getTel() != null && !form.getTel().isEmpty()) {
      hql.append(" and tel=:tel");
      map.put("tel", form.getTel());
    } 
    if (form.getVoucherNo() != null && !form.getVoucherNo().isEmpty()) {
      hql.append(" and voucherNo=:voucherNo");
      map.put("voucherNo", form.getVoucherNo());
    } 
    if (form.getSearch() != null && !form.getSearch().isEmpty()) {
      hql.append(" and (name like :search0 or flowerNo=:search1 or sn=:search1)");
      map.put("search0", "%" + form.getSearch() + "%");
      map.put("search1", form.getSearch());
    } 
    if (form.getSysm() != null) {
      hql.append(" and expireDate <:expireDate");
      Calendar cal = Calendar.getInstance();
      cal.set(1, cal.get(1) + form.getSysm().intValue());
      map.put("expireDate", cal.getTime());
    } 
    String s = hql.toString();
    if (map.isEmpty()) {
      page.setRowsCount(Integer.valueOf(counts("select count(*)" + s)));
      page.init();
      return getListForPage(String.valueOf(s) + order, page.getStartRow().intValue(), page.getPageSize().intValue());
    } 
    page.setRowsCount(Integer.valueOf(counts("select count(*)" + s, map)));
    page.init();
    return getListForPage(String.valueOf(s) + order, page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }
  
  @Override
  public FixedAssets getFixedAssets(Integer id) {
    return (FixedAssets)this.hibernateTemplate.get(FixedAssets.class, id);
  }
  
  @Override
  public void delFixedAssets(FixedAssets fixedAssets) {
    this.hibernateTemplate.delete(fixedAssets);
  }
  
  @Override
  public void saveOrUpdateFixedAssets(FixedAssets fa) {
    this.hibernateTemplate.saveOrUpdate(fa);
  }
  
  @Override
  public MaintainRecord getMaintainRecord(Long id) {
    return (MaintainRecord)this.hibernateTemplate.get(MaintainRecord.class, id);
  }
  
  @Override
  public void saveOrUpdateMaintainRecord(MaintainRecord mr) {
    this.hibernateTemplate.saveOrUpdate(mr);
  }
  
  @Override
  public List<MaintainRecord> findMaintainRecords(Integer fixedAssetsId) {
    return this.hibernateTemplate.find("from MaintainRecord where fixedAssetsId=" + fixedAssetsId);
  }
  
  @Override
  public void delMaintainRecord(MaintainRecord maintainRecord) {
    this.hibernateTemplate.delete(maintainRecord);
  }
  
  @Override
  public void updateFixedAssets(FixedAssets fa) {
    this.hibernateTemplate.update(fa);
  }
  
  @Override
  public void saveFixedAssets(FixedAssets fa) {
    this.hibernateTemplate.save(fa);
  }
  
  @Override
  public List<FixedAssets> findFixedAssetsList(FixedAssetsSearchForm form, Page page) {
    StringBuffer hql = new StringBuffer(" from FixedAssets where 1=1");
    String order = " order by updateDate desc, id desc";
    Map<String, Object> map = new HashMap<String, Object>();
    if (form.getScrapFlag() != null) {
      hql.append(" and scrapFlag=:scrapFlag");
      map.put("scrapFlag", form.getScrapFlag());
    } 
    if (form.getContacts() != null && !form.getContacts().isEmpty()) {
      hql.append(" and contacts=:contacts");
      map.put("contacts", form.getContacts());
    } 
    if (form.getDeptId() != null) {
      hql.append(" and deptId=:deptId");
      map.put("deptId", form.getDeptId());
    } 
    if (form.getFax() != null && !form.getFax().isEmpty()) {
      hql.append(" and fax=:fax");
      map.put("fax", form.getFax());
    } 
    if (form.getFlowerNo() != null && !form.getFlowerNo().isEmpty()) {
      hql.append(" and flowerNo=:flowerNo");
      map.put("flowerNo", form.getFlowerNo());
    } 
    if (form.getMail() != null && !form.getMail().isEmpty()) {
      hql.append(" and mail=:mail");
      map.put("mail", form.getMail());
    } 
    if (form.getManufacturer() != null && !form.getManufacturer().isEmpty()) {
      hql.append(" and manufacturer=:manufacturer");
      map.put("manufacturer", form.getManufacturer());
    } 
    if (form.getMobile() != null && !form.getMobile().isEmpty()) {
      hql.append(" and mobile=:mobile");
      map.put("mobile", form.getMobile());
    } 
    if (form.getName() != null && !form.getName().isEmpty()) {
      hql.append(" and name=:name");
      map.put("name", form.getName());
    } 
    if (form.getNextMaintenanceDate() != null) {
      hql.append("  and nextMaintenanceDate<:nextMaintenanceDate");
      map.put("nextMaintenanceDate", form.getNextMaintenanceDate());
      order = " order by nextMaintenanceDate";
    } 
    if (form.getOperator() != null && !form.getOperator().isEmpty()) {
      hql.append(" and operator=:operator");
      map.put("operator", form.getOperator());
    } 
    if (form.getPriceMax() != null) {
      hql.append(" and price<=:priceMax");
      map.put("priceMax", form.getPriceMax());
    } 
    if (form.getPriceMin() != null) {
      hql.append(" and price>=:priceMin");
      map.put("priceMin", form.getPriceMin());
    } 
    if (form.getPurchaseOrderDateEnd() != null) {
      hql.append(" and purchaseOrderDate<=:purchaseOrderDateEnd");
      map.put("purchaseOrderDateEnd", form.getPurchaseOrderDateEnd());
    } 
    if (form.getPurchaseOrderDateStart() != null) {
      hql.append(" and purchaseOrderDate>=:purchaseOrderDateStart");
      map.put("purchaseOrderDateStart", form.getPurchaseOrderDateStart());
    } 
    if (form.getSn() != null && !form.getSn().isEmpty()) {
      hql.append(" and sn=:sn");
      map.put("sn", form.getSn());
    } 
    if (form.getTel() != null && !form.getTel().isEmpty()) {
      hql.append(" and tel=:tel");
      map.put("tel", form.getTel());
    } 
    if (form.getVoucherNo() != null && !form.getVoucherNo().isEmpty()) {
      hql.append(" and voucherNo=:voucherNo");
      map.put("voucherNo", form.getVoucherNo());
    } 
    if (form.getSearch() != null && !form.getSearch().isEmpty()) {
      hql.append(" and (name like :search0 or flowerNo=:search1 or sn=:search1)");
      map.put("search0", "%" + form.getSearch() + "%");
      map.put("search1", form.getSearch());
    } 
    String s = hql.toString();
    if (map.isEmpty()) {
      page.setRowsCount(Integer.valueOf(counts("select count(*)" + s)));
      page.init();
      return getListForPage(String.valueOf(s) + order, page.getStartRow().intValue(), 1000000);
    } 
    page.setRowsCount(Integer.valueOf(counts("select count(*)" + s, map)));
    page.init();
    return getListForPage(String.valueOf(s) + order, page.getStartRow().intValue(), 1000000, map);
  }
  
  @Override
  public FixedAssets getFixedAssetsByNo(String no) {
    String hql = " from FixedAssets where flowerNo=?";
    List<FixedAssets> list = this.hibernateTemplate.find(hql, no);
    return (list.size() > 0) ? list.get(0) : null;
  }
}
