package cn.com.oims.service.impl;

import cn.com.oims.dao.IBuMenDao;
import cn.com.oims.dao.ICategoryDao;
import cn.com.oims.dao.IJiBingDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.JiBing;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IJiBingService;
import cn.com.oims.utils.Cn2Spell;
import cn.com.oims.web.form.JiBingSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JiBingServiceImpl implements IJiBingService {
  @Autowired
  private IJiBingDao dao = null;
  
  @Autowired
  private IYuanGongDao ygDao;
  
  @Autowired
  private IBuMenDao bmDao;
  
  @Autowired
  private ICategoryDao categoryDao;
  
  public Map<String, Object> findAllJiBing4Page(Page page, JiBingSearchForm jbsf) {
    Map<String, Object> map = new HashMap<>();
    map.put("list", this.dao.findAllJiBing4Page(page, jbsf));
    map.put("page", page);
    return map;
  }
  
  public void delJiBing(Serializable id) {
    if (this.dao.jibingIsUse(id))
      throw new RuntimeException("此疾病名已在诊断中被使用！"); 
    this.dao.delJiBing(id);
  }
  
  public void delJiBingById(Integer id) {
    List<JiBing> list = this.dao.findDiseaseByFather(id);
    if (list.size() > 0) {
      for (JiBing jiBing : list)
        delJiBingById(jiBing.getFather_id()); 
    } else {
      delJiBing(id);
    } 
  }
  
  public Serializable saveJiBing(JiBing jb) {
    if (this.dao.jibingExists(jb.getDisease()))
      throw new RuntimeException("病名已存在！"); 
    String pinyin = Cn2Spell.converterToFirstSpell(jb.getDisease()).toUpperCase();
    jb.setPinyin(pinyin);
    return this.dao.saveJiBing(jb);
  }
  
  public void updateJiBing(JiBing jb) {
    String pinyin = Cn2Spell.converterToFirstSpell(jb.getDisease()).toUpperCase();
    jb.setPinyin(pinyin);
    this.dao.updateJiBing(jb);
  }
  
  public JiBing findJiBingById(Serializable id) {
    return this.dao.findJiBingById(id);
  }
  
  public Map<String, Object> jiBingValidate(String father_id, String icd_code) {
    Map<String, Object> map = new HashMap<>();
    boolean b1 = isOkFather_Id(father_id);
    boolean b2 = isOkIcd_Code(icd_code);
    if (b1 && b2) {
      map.put("validate", "yes");
      return map;
    } 
    if (!b1) {
      map.put("validate", "no");
      map.put("reason", "父元素不存在");
      return map;
    } 
    map.put("validate", "no");
    map.put("reason", "国际编码重复");
    return map;
  }
  
  public boolean isOkFather_Id(String father_id) {
    List<JiBing> list = this.dao.findAllJiBing();
    for (JiBing l : list) {
      if (l.getId().toString().equals(father_id))
        return true; 
    } 
    return false;
  }
  
  public boolean isOkIcd_Code(String icd_code) {
    List<JiBing> list = this.dao.findAllJiBing();
    if (icd_code == "")
      return true; 
    for (JiBing l : list) {
      String icdCode = (l.getIcd_code() == null) ? "" : l.getIcd_code();
      if (icdCode.equals(icd_code))
        return false; 
    } 
    return true;
  }
  
  public Map<String, Object> jiBingValidate(String father_id, String icd_code, Integer id) {
    Map<String, Object> map = new HashMap<>();
    boolean b1 = isOkFather_Id(father_id);
    boolean b2 = isOkIcd_Code(icd_code);
    boolean b3 = ((findJiBingById(id).getIcd_code() == null) ? "" : 
      findJiBingById(id).getIcd_code()).equals(icd_code);
    if ((b1 && b2) || (b1 && b3)) {
      map.put("validate", "yes");
      return map;
    } 
    if (!b1) {
      map.put("validate", "no");
      map.put("reason", "父元素不存在");
      return map;
    } 
    map.put("validate", "no");
    map.put("reason", "国际编码重复");
    return map;
  }
  
  public List<JiBing> findDiseasesByFather(Integer fatherId) {
    return this.dao.findDiseaseByFather(fatherId);
  }
  
  public List<JiBing> compositeTemplateSearchDiseasesByPY(String fatherId, String pinyin) {
    char[] pinyinchar = pinyin.toCharArray();
    String s = "";
    if (pinyinchar.length != 0) {
      for (int i = 0; i < pinyinchar.length; i++) {
        s = String.valueOf(s) + "%" + Character.toLowerCase(pinyinchar[i]);
        if (i == pinyinchar.length - 1)
          s = String.valueOf(s) + "%"; 
      } 
    } else {
      s = "%%";
    } 
    return this.dao.compositeTemplateSearchDiseasesByPY(fatherId, s);
  }
  
  public List<JiBing> findAllDiseases() {
    return this.dao.findAllJiBing();
  }
  
  public List<JiBing> getDiseasesBySearch(String search) {
    return this.dao.getDiseasesBySearch(search);
  }
  
  public List<JiBing> findDiseaseByGonghao(String gonghao, Integer categoryId, String search) {
    String diseases = null;
    String categoryIds = null;
    if (categoryId != null) {
      categoryIds = this.dao.findIds("Category", "fatherid", categoryId);
      return this.dao.findDiseases(categoryIds, diseases, search);
    } 
    if (search == null || search.isEmpty()) {
      YuanGong yg = this.ygDao.obtainYuanGongByGonghao(gonghao);
      BuMen bm = this.bmDao.findBuMenById(yg.getBumenId());
      String[] d0 = null, d1 = null;
      if (yg.getDiseases() != null)
        d0 = yg.getDiseases().split(","); 
      if (bm != null && bm.getDiseases() != null)
        d1 = bm.getDiseases().split(","); 
      if (d0 != null || d1 != null)
        diseases = getDiseases(ArrayUtils.addAll((Object[])d0, (Object[])d1)); 
    } 
    return this.dao.findDiseases(categoryIds, diseases, search);
  }
  
  private String getDiseases(Object[] objs) {
    Set<Integer> set = new TreeSet<>();
    byte b;
    int j;
    Object[] arrayOfObject;
    for (j = (arrayOfObject = objs).length, b = 0; b < j; ) {
      Object o = arrayOfObject[b];
      try {
        int k = Integer.parseInt(o.toString());
        set.add(Integer.valueOf(k));
      } catch (Exception exception) {}
      b++;
    } 
    StringBuffer diseases = new StringBuffer();
    int i = 0;
    for (Integer id : set) {
      if (i > 0)
        diseases.append(","); 
      diseases.append(id);
      i++;
    } 
    return diseases.toString();
  }
  
  @Transactional
  public void delCategoryAndDiseaseById(Serializable id) {
    delCategory(id);
  }
  
  @Transactional
  public void delCategory(Serializable id) {
    List<Category> list = this.categoryDao.findCategorysByFather(id);
    if (list != null && list.size() > 0)
      for (Category category : list)
        delCategory(category.getId());  
    List<JiBing> jibings = this.dao.findDiseaseByCategory(
        Integer.valueOf(Integer.parseInt(id.toString())));
    for (JiBing jiBing : jibings)
      this.dao.delJiBing(jiBing.getId()); 
    this.categoryDao.delCategory(id);
  }
  
  public List<JiBing> findDiseasesByCategory(Integer categoryId) {
    return this.dao.findDiseaseByCategory(categoryId);
  }
}
