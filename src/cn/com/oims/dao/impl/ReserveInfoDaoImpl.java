package cn.com.oims.dao.impl;

import cn.com.oims.dao.IReserveInfoDao;
import cn.com.oims.dao.pojo.ReserveInfo;
import cn.com.oims.web.form.RevInfoForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class ReserveInfoDaoImpl extends BaseDaoImpl implements IReserveInfoDao {
  private String countHql = "select count(*) from ReserveInfo ri";
  
  private String clazzName = ReserveInfo.class.getSimpleName();
  
  @Override
  public int curReserveNumAm(Long revprojId, String gonghao, String reservedt) {
    Map<String, Date> map = new HashMap<String, Date>();
    if (reservedt.indexOf(" ") == -1) {
      reservedt = String.valueOf(reservedt) + " 00:00:00";
    }
    try {
      map.put("reserveStartDate", MultiUtils.getStartTimeOfDay((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(reservedt)));
      map.put("reserveEndDate", MultiUtils.getMiddleOfDay((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(reservedt)));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    String hql = "select xmnum from ReserveInfo where ";
    String factorSql = " 1=1 ";
    String bmidSql = getBmidSqlByYyrgh(gonghao);
    if (!"".equals(bmidSql)) {
      factorSql = String.valueOf(factorSql) + " and jcbmid in (" + bmidSql + ")";
    } else {
      factorSql = " 1=0 ";
    } 
    hql = String.valueOf(hql) + factorSql + " and revprojId=" + revprojId + " and reservedt between :reserveStartDate and :reserveEndDate";
    List list = findList(hql, map);
    Iterator it = list.iterator();
    int count = 0;
    while (it.hasNext()) {
      count += Integer.parseInt(it.next().toString());
    }
    return count;
  }
  
  @Override
  public int curReserveNumPm(Long revprojId, String gonghao, String reservedt) {
    Map<String, Date> map = new HashMap<String, Date>();
    try {
      if (reservedt.indexOf(" ") == -1) {
        reservedt = String.valueOf(reservedt) + " 00:00:00";
      }
      map.put("reserveStartDate", MultiUtils.getMiddleOfDay((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(reservedt)));
      map.put("reserveEndDate", MultiUtils.getEndTimeOfDay((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(reservedt)));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    String hql = "select xmnum from ReserveInfo  where ";
    String factorSql = " 1=1 ";
    String bmidSql = getBmidSqlByYyrgh(gonghao);
    if (!"".equals(bmidSql)) {
      factorSql = String.valueOf(factorSql) + " and jcbmid in (" + bmidSql + ")";
    } else {
      factorSql = " 1=0 ";
    } 
    hql = String.valueOf(hql) + factorSql + " and revprojId=" + revprojId + " and reservedt between :reserveStartDate and :reserveEndDate";
    List list = findList(hql, map);
    Iterator it = list.iterator();
    int count = 0;
    while (it.hasNext()) {
      count += Integer.parseInt(it.next().toString());
    }
    return count;
  }
  
  private String getBmidSqlByYyrgh(String gonghao) {
    String hql = "select bumenId from RevProj where userId='" + gonghao + "'";
    String bmids = "";
    List list = this.hibernateTemplate.find(hql);
    int i;
    for (i = 0; i < list.size() - 1; i++) {
      bmids = String.valueOf(bmids) + list.get(i).toString() + ",";
    }
    if (i == list.size() - 1) {
      bmids = String.valueOf(bmids) + list.get(i);
    }
    return bmids;
  }
  
  @Override
  public List<Map<String, Object>> findRevInfoByForm(Page page, RevInfoForm form) {
    String factor = page.getFactor();
    Map<String, Date> map = new HashMap<String, Date>();
    String factorSql = getQueryCondition(form, map);
    if (factor == null || !factor.equals("all")) {
      map.put("startTime", MultiUtils.getStartTimeOfDay());
      map.put("endTime", MultiUtils.getEndTimeOfDay());
      factorSql = String.valueOf(factorSql) + " and ri.opertm between :startTime and :endTime";
    } 
    int size = 0;
    if (!map.isEmpty()) {
      size = counts(String.valueOf(this.countHql) + " ,HuanZheXinXi hz where hz.id=ri.huanzheId and " + factorSql, map);
    } else {
      size = count(String.valueOf(this.countHql) + " ,HuanZheXinXi hz where hz.id=ri.huanzheId  and " + factorSql);
    } 
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String hql = "select new map(hz.id as huanzheId,ri.jiuzhenId as jiuzhenId,hz.binglihao as pno, hz.xingming as pname,hz.jtdz as jtdz,hz.xingbie as psex,hz.shengri as pbirthday,hz.sfzh as idcard,hz.shouji as phone,ri.id as revInfoId,ri.jcyq as jcyq,ri.jcxmIds as jcxmIds,ri.jcxmmc as projName,ri.yanbie as eyetype,ri.reservedt as revdt,ri.revstate as revstate,ri.revprojId as revprojId) from HuanZheXinXi hz, ReserveInfo ri where hz.id=ri.huanzheId and ri.userId = '" + 
      
      form.getUid() + "' and " + factorSql + " order by ri.opertm desc";
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    List<Map<String, Object>> list = null;
    if (!map.isEmpty()) {
      list = getListForPage(hql, startRow, pageSize, map);
    } else {
      list = getListForPage(hql, startRow, pageSize);
    } 
    return list;
  }
  
  private String getQueryCondition(RevInfoForm searchForm, Map<String, Date> map) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String factorSql = " 1=1 ";
    if (searchForm.getSearch() != null && !searchForm.getSearch().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and (hz.binglihao like '%" + searchForm.getSearch() + "%' or hz.xingming like '%" + searchForm.getSearch() + "%')";
    }
    return factorSql;
  }
  
  @Override
  public Serializable saveReserveInfo(ReserveInfo o) {
    return this.hibernateTemplate.save(o);
  }
  
  @Override
  public void updateReserveInfo(ReserveInfo o) {
    this.hibernateTemplate.update(o);
  }
  
  @Override
  public void delReserveInfoById(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public ReserveInfo getReserveInfoById(Serializable id) {
    return (ReserveInfo)this.hibernateTemplate.get(ReserveInfo.class, id);
  }
  
  @Override
  public void saveOrUpdateReserveInfo(ReserveInfo o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
}
