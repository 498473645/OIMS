package cn.com.oims.dao.impl;

import cn.com.oims.dao.IJiBingDao;
import cn.com.oims.dao.pojo.JiBing;
import cn.com.oims.web.form.DiseaseForm;
import cn.com.oims.web.form.JiBingSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class JiBingDaoImpl extends BaseDaoImpl implements IJiBingDao {
  private String clazzName = JiBing.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(JiBing.class);
  }
  
  @Override
  public int counts() {
    Long l = (Long)this.hibernateTemplate.findByCriteria(this.getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }
  
  @Override
  public List<JiBing> findAllJiBing4Page(Page page, JiBingSearchForm jbsf) {
    String factorSql = " 1=1 ";
    if (jbsf.getSearch() != null && !jbsf.getSearch().trim().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and (jb.icd_code ='" + jbsf.getSearch().trim() +
        "' or jb.disease like '%" + jbsf.getSearch().trim() + "%')";
    }
    if (jbsf.getCategoryId() != null) {
      factorSql = String.valueOf(factorSql) + " and categoryId = " + jbsf.getCategoryId();
    }
    int size = count("select count(*) from JiBing jb where " + 
        factorSql);
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String hql = " from JiBing jb where " + factorSql;
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    List<JiBing> list = getListForPage(hql, startRow, pageSize);
    return list;
  }
  
  @Override
  public void delJiBing(Serializable id) {
    this.hibernateTemplate.delete(findJiBingById(id));
  }
  
  @Override
  public Serializable saveJiBing(JiBing jb) {
    return this.hibernateTemplate.save(jb);
  }
  
  @Override
  public void updateJiBing(JiBing jb) {
    this.hibernateTemplate.update(jb);
  }
  
  @Override
  public JiBing findJiBingById(Serializable id) {
    return (JiBing)this.hibernateTemplate.get(JiBing.class, id);
  }
  
  @Override
  public List<JiBing> findAllJiBing() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  @Override
  public List<JiBing> findDiseaseByFather(Integer fatherId) {
    JiBing jb = new JiBing();
    jb.setFather_id((fatherId == null) ? null : fatherId);
    return this.hibernateTemplate.findByExample(jb);
  }
  
  @Override
  public List<JiBing> compositeTemplateSearchDiseasesByPY(String fatherId, String pinyin) {
    String hql = "from JiBing where father_id=" + fatherId + " and pinyin like '" + pinyin + "'";
    List<JiBing> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public List<JiBing> getDiseasesBySearch(String search) {
    StringBuilder hql = new StringBuilder();
    hql.append("from ").append(this.clazzName).append(" where 1=1 ");
    hql.append("and (pinyin like '%").append(search.toLowerCase()).append("%' ");
    hql.append("or disease like '%").append(search).append("%') ");
    hql.append("and isParent is null");
    return this.hibernateTemplate.find(hql.toString());
  }
  
  @Override
  public List<JiBing> findDiseases(String categoryIds, String diseases, String search) {
    String hql = " from JiBing where (isParent=0 or isParent is null)";
    if (diseases != null) {
      hql = String.valueOf(hql) + " and (id in (" + diseases + ") or father_id in (" + diseases + "))";
    } else if (search != null && !search.isEmpty()) {
      hql = String.valueOf(hql) + " and(icd_code like '%" + search.toUpperCase() + "%' or pinyin like '%" + search.toUpperCase() + "%' or disease like '%" + search + "%')";
    } 
    if (categoryIds != null) {
      hql = String.valueOf(hql) + " and categoryId in (" + categoryIds + ")";
    }
    return getListForPage(hql, 0, 120);
  }
  
  @Override
  public List<JiBing> findDiseaseByCategory(Integer categoryId) {
    JiBing jb = new JiBing();
    jb.setCategoryId((categoryId == null) ? null : categoryId);
    return this.hibernateTemplate.findByExample(jb);
  }
  
  @Override
  public List<Map<String, Object>> tjDiseaseTop10ByDiseaseForm(DiseaseForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    StringBuilder sb = new StringBuilder();
    sb.append("select new map( jzzd.zdfl_id as jzzdId,(select disease from JiBing where id = jzzd.zdfl_id) as name, count(*) as y");
    sb.append(" ) from JzZhenduan jzzd");
    sb.append(" where 1=1 ");
    sb.append(createSelectForDiseaseForm(form, map));
    sb.append(" group by jzzd.zdfl_id ");
    sb.append(" order by count(*) desc");
    return getListForPage(sb.toString(), 0, 10, map);
  }
  
  @Override
  public long tjDiseaseOtherByDiseaseForm(String notDiseaseId, DiseaseForm form) {
    StringBuilder builder = new StringBuilder("select count(*) from JzZhenduan jzzd where 1=1");
    if (notDiseaseId != null && !notDiseaseId.isEmpty()) {
      builder.append(" and jzzd.zdfl_id not in (" + notDiseaseId + ")");
    }
    Map<String, Object> map = new HashMap<String, Object>();
    builder.append(createSelectForDiseaseForm(form, map));
    return Long.parseLong(findList(builder.toString(), map).get(0).toString());
  }
  
  private String createSelectForDiseaseForm(DiseaseForm form, Map<String, Object> map) {
    String hql = " ";
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
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
        hql = String.valueOf(hql) + " and jzzd.zd_time between :startTime and :endTime";
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
        hql = String.valueOf(hql) + " and jzzd.zd_time between :startTime and :endTime";
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
        hql = String.valueOf(hql) + " and jzzd.zd_time between :startTime and :endTime";
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
        hql = String.valueOf(hql) + " and jzzd.zd_time between :startTime and :endTime";
      } catch (ParseException e) {
        e.printStackTrace();
      } 
    } 
    if (form.getMzDoctors() != null && !form.getMzDoctors().isEmpty()) {
      String[] str = form.getMzDoctors().split(",");
      StringBuffer buffer = new StringBuffer();
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and jzzd.zdys = '" + str[0] + "'";
      } else {
        for (int i = 0; i < str.length; i++) {
          if (i == 0) {
            buffer.append("'" + str[i] + "'");
          } else {
            buffer.append(",'" + str[i] + "'");
          } 
        } 
        hql = String.valueOf(hql) + " and jzzd.zdys in(" + buffer + ")";
      } 
    } 
    return hql;
  }
  
  @Override
  public boolean jibingExists(String disease) {
    String hql = "select count(*) from JiBing where disease=?";
    return (count(hql, new Object[] { disease }) > 0);
  }
  
  @Override
  public boolean jibingIsUse(Serializable id) {
    String hql = "select count(*) from JzZhenduan where zdfl_id=" + id;
    return (count(hql) > 0);
  }
}
