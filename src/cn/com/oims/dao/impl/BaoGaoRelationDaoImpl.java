package cn.com.oims.dao.impl;

import cn.com.oims.dao.IBaoGaoRelationDao;
import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.web.form.TongJiForm;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class BaoGaoRelationDaoImpl extends BaseDaoImpl implements IBaoGaoRelationDao {
  @Override
  public Serializable saveBaoGaoRelation(BaoGaoRelation baoGaoRelation) {
    return this.hibernateTemplate.save(baoGaoRelation);
  }
  
  @Override
  public void updateBaoGaoRelation(BaoGaoRelation baoGaoRelation) {
    this.hibernateTemplate.update(baoGaoRelation);
  }
  
  @Override
  public BaoGaoRelation getBaoGaoRelationById(Long id) {
    return (BaoGaoRelation)this.hibernateTemplate.get(BaoGaoRelation.class, id);
  }
  
  @Override
  public List<BaoGaoRelation> getBaoGaoRelationsByBaoGaoRelation(BaoGaoRelation baoGaoRelation) {
    return this.hibernateTemplate.findByExample(baoGaoRelation);
  }
  
  @Override
  public List<BaoGaoRelation> getBaoGaoRelationByTongJiForm(TongJiForm form) {
    String hql = "from BaoGaoRelation br where 1=1 ";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List groupBaoGaoRelationByTongJiForm(TongJiForm form, String groupName) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select br." + groupName + " from BaoGaoRelation br where 1=1 ";
    hql = String.valueOf(hql) + createSelectByTongJiForm(form, map);
    hql = String.valueOf(hql) + " group by br." + groupName;
    return findList(hql, map);
  }
  
  @Override
  public List<Map<String, Object>> groupJcxmByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(br.jcxmId as jcxmId,jcxm.xmmc as name,count(*) as y) from Jcxm jcxm ,";
    hql = String.valueOf(hql) + "BaoGaoRelation br where 1=1 ";
    hql = String.valueOf(hql) + createSelectByTongJiForm(form, map);
    hql = String.valueOf(hql) + " and br.jcxmId=jcxm.id ";
    hql = String.valueOf(hql) + " group by br.jcxmId,jcxm.xmmc";
    return findList(hql, map);
  }
  
  @Override
  public List<Map<String, Object>> groupYuanGongByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "";
    hql = String.valueOf(hql) + "select new map(br.insertUser as gonghao,yg.xingming as name) from YuanGong yg ,";
    hql = String.valueOf(hql) + "BaoGaoRelation br where 1=1";
    hql = String.valueOf(hql) + createSelectByTongJiForm(form, map);
    hql = String.valueOf(hql) + " and br.insertUser=yg.gonghao ";
    hql = String.valueOf(hql) + " group by br.insertUser,yg.xingming";
    return findList(hql, map);
  }
  
  @Override
  public List<Map<String, Object>> groupDoctorByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map( br.insertUser as gonghao,yg.xingming as name,count(*) as y) from BaoGaoRelation br,YuanGong yg where 1=1";
    hql = String.valueOf(hql) + createSelectByTongJiForm(form, map);
    hql = String.valueOf(hql) + " and yg.gonghao = br.insertUser ";
    hql = String.valueOf(hql) + " group by br.insertUser,yg.xingming";
    return findList(hql, map);
  }
  
  @Override
  public Long getBaoGaoCountByProperties(String sql, TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select count(*) from BaoGaoRelation br,";
    hql = String.valueOf(hql) + sql;
    hql = String.valueOf(hql) + createSelectByTongJiForm(form, map);
    List<Long> list = findList(hql, map);
    return list.get(0);
  }
  
  @Override
  public Long getBaoGaoCountByProperties(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select count(*) from BaoGaoRelation br where 1=1";
    hql = String.valueOf(hql) + createSelectByTongJiForm(form, map);
    List<Long> list = findList(hql, map);
    return list.get(0);
  }
  
  private String createSelectByTongJiForm(TongJiForm form, Map<String, Object> map) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String hql = " ";
    if ("sj".equals(form.getTimeType())) {
      if ((form.getfTime1() != null && !form.getfTime1().isEmpty()) || (
        form.getfTime2() != null && !form.getfTime2().isEmpty())) {
        try {
          map.put("startTime", 
              sdf.parse(String.valueOf(form.getfTime1()) + " 00:00:00"));
          map.put("endTime", 
              sdf.parse(String.valueOf(form.getfTime2()) + " 23:59:59"));
        } catch (ParseException e) {
          e.printStackTrace();
        } 
        hql = String.valueOf(hql) + " and br.insertDate between :startTime and :endTime";
      } else if (form.getfTime1() != null && !form.getfTime1().isEmpty() && (
        form.getfTime2() == null || form.getfTime2().isEmpty())) {
        try {
          map.put("startTime", 
              sdf.parse(String.valueOf(form.getfTime1()) + " 00:00:00"));
          map.put("endTime", 
              sdf.parse(String.valueOf(form.getfTime1()) + " 23:59:59"));
        } catch (ParseException e) {
          e.printStackTrace();
        } 
        hql = String.valueOf(hql) + " and br.insertDate between :startTime and :endTime";
      } else if (form.getfTime2() != null && !form.getfTime2().isEmpty() && (
        form.getfTime1() == null || form.getfTime1().isEmpty())) {
        try {
          map.put("startTime", 
              sdf.parse(String.valueOf(form.getfTime2()) + " 00:00:00"));
          map.put("endTime", 
              sdf.parse(String.valueOf(form.getfTime2()) + " 23:59:59"));
        } catch (ParseException e) {
          e.printStackTrace();
        } 
        hql = String.valueOf(hql) + " and br.insertDate between :startTime and :endTime";
      } 
    } else {
      SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
      Calendar c = Calendar.getInstance();
      c.set(1, Integer.parseInt(form.getfTime1()));
      c.set(2, Integer.parseInt(form.getfTime2()) - 1);
      c.set(5, c.getActualMinimum(5));
      String time1 = format.format(c.getTime());
      c.set(5, c.getActualMaximum(5));
      String time2 = format.format(c.getTime());
      try {
        map.put("startTime", sdf.parse(String.valueOf(time1) + " 00:00:00"));
        map.put("endTime", sdf.parse(String.valueOf(time2) + " 23:59:59"));
        hql = String.valueOf(hql) + " and br.insertDate between :startTime and :endTime";
      } catch (ParseException e) {
        e.printStackTrace();
      } 
    } 
    if (form.getJcxms() != null && !form.getJcxms().isEmpty()) {
      String[] str = form.getJcxms().split(",");
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and br.jcxmId =" + str[0];
      } else {
        hql = String.valueOf(hql) + " and br.jcxmId in(" + form.getJcxms() + ")";
      } 
    } 
    if (form.getDoctors() != null && !form.getDoctors().isEmpty()) {
      String[] str = form.getDoctors().split(",");
      StringBuffer buffer = new StringBuffer();
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and br.insertUser = '" + str[0] + "'";
      } else {
        for (int i = 0; i < str.length; i++) {
          if (i == 0) {
            buffer.append("'" + str[i] + "'");
          } else {
            buffer.append(",'" + str[i] + "'");
          } 
        } 
        hql = String.valueOf(hql) + " and br.insertUser in(" + buffer + ")";
      } 
    } 
    return hql;
  }
  
  @Override
  public Long getCountByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap();
    String hql = "select count(*) from BaoGaoRelation br  where 1=1 ";
    hql = hql + this.createSelectByTongJiForm(form, map);
    return (Long)this.findList(hql, map).get(0);
  }
  
  @Override
  public List<BaoGaoRelation> getBaoGaoRelationByJcdId(String jcdIds) {
    String hql = "from BaoGaoRelation where jcdId in(";
    hql = hql + jcdIds + ") order by insertDate desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public void deleteBaogaoRelationByJcdId(Long jcdId) {
    String hql = "delete from BaoGaoRelation where jcdId= " + jcdId;
    executeUpdate(hql);
  }
  
  @Override
  public List<BaoGaoRelation> getBaoGaoRelation(Long id, String jcxmId) {
    String hql = "from BaoGaoRelation where jcdId in(select id from Jcd where huanzheId='" + id + "' and jcxmIds='" + jcxmId + "' ) order by insertDate desc";
    return this.hibernateTemplate.find(hql);
  }
}
