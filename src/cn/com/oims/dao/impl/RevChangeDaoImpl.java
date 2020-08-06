package cn.com.oims.dao.impl;

import cn.com.oims.dao.IRevChangeDao;
import cn.com.oims.dao.pojo.RevChange;
import cn.com.oims.web.form.RevChgForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class RevChangeDaoImpl extends BaseDaoImpl implements IRevChangeDao {
  private String countHql = "select count(*) from RevChange rc";
  
  private String clazzName = RevChange.class.getSimpleName();
  
  @Override
  public List<RevChange> getReserveChgNumByResDateAndReprojId(int flag, String jcxmId, String revdt, Long jcbmid) {
    String hql = "";
    Map<String, Date> map = new HashMap<String, Date>();
    Date time = new Date();
    List<RevChange> list = null;
    try {
      if (revdt.indexOf(" ") == -1) {
        revdt = String.valueOf(revdt) + " 00:00:00";
      }
      time = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(revdt);
      if (flag == 0) {
        map.put("startTime", MultiUtils.getStartTimeOfDay(time));
        map.put("endTime", MultiUtils.getMiddleOfDay(time));
      } else if (flag == 1) {
        map.put("startTime", MultiUtils.getMiddleOfDay(time));
        map.put("endTime", MultiUtils.getEndTimeOfDay(time));
      } else {
        map.put("startTime", MultiUtils.getStartTimeOfDay(time));
        map.put("endTime", MultiUtils.getEndTimeOfDay(time));
      } 
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    hql = "from RevChange where jcxmId = '" + jcxmId + "' and bumenId=" + jcbmid + " and revdt between :startTime and :endTime";
    list = findList(hql, map);
    return list;
  }
  
  @Override
  public List<Map<String, Object>> findRevChgByForm(Page page, RevChgForm form) {
    Map<String, Date> map = new HashMap<String, Date>();
    String factorSql = "";
    map.put("startTime", MultiUtils.getStartTimeOfDay());
    factorSql = String.valueOf(factorSql) + " and rc.revdt >= :startTime ";
    int size = 0;
    if (!map.isEmpty()) {
      size = counts(String.valueOf(this.countHql) + " ,YuanGong yg,BuMen bm,RevProj rp where yg.gonghao=rc.userId and bm.id=rc.bumenId and rp.jcxmIds=rc.jcxmId " + factorSql, map);
    } else {
      size = count(String.valueOf(this.countHql) + " ,YuanGong yg,BuMen bm,RevProj rp where yg.gonghao=rc.userId  and bm.id=rc.bumenId and rp.jcxmIds=rc.jcxmId " + factorSql);
    } 
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String hql = "select new map(bm.bmmc as bmmc,rp.projName as projName,yg.xingming as xingming,rc.revdt as revdt,rc.chgnum as chgnum,rc.biaoshi as biaoshi,rc.jcxmId as jcxmId) from RevChange rc, RevProj rp,YuanGong yg,BuMen bm where yg.gonghao=rc.userId and bm.id =rc.bumenId and rp.jcxmIds=rc.jcxmId " + 
      
      factorSql + " order by rc.opertm desc";
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
  
  @Override
  public Serializable saveRevChange(RevChange t) {
    return this.hibernateTemplate.save(t);
  }
  
  @Override
  public void delRevChange(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public RevChange getRevChangeByForm(RevChgForm form) {
    Map<String, Date> map = new HashMap<String, Date>();
    try {
      String revdt = form.getRevdt();
      Date time = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(revdt);
      if ("02:00:00".equals(form.getTimeFlag())) {
        map.put("startTime", MultiUtils.getStartTimeOfDay(time));
        map.put("endTime", MultiUtils.getMiddleOfDay(time));
      } else if ("13:00:00".equals(form.getTimeFlag())) {
        map.put("startTime", MultiUtils.getMiddleOfDay(time));
        map.put("endTime", MultiUtils.getEndTimeOfDay(time));
      } 
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    RevChange revChange = null;
    String hql = "from RevChange where bumenId=" + form.getBmid() + " and jcxmId='" + form.getJcxmid() + "' and userId='" + form.getUid() + "' and revdt between :startTime and :endTime";
    List<RevChange> list = findList(hql, map);
    if (list.size() > 0) {
      revChange = list.get(0);
    }
    return revChange;
  }
}
