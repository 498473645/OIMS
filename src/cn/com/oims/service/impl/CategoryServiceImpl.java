package cn.com.oims.service.impl;

import cn.com.oims.dao.ICategoryDao;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.service.ICategoryService;
import com.codesnet.common.Page;
import com.codesnet.common.PinyinUtils;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements ICategoryService {
  ICategoryDao dao = null;
  
  @Autowired
  public void setDao(ICategoryDao dao) {
    this.dao = dao;
  }
  
  @Override
  public Serializable saveCategory(Category category) {
    String py = category.getPinyin();
    if (py == null || py.isEmpty()) {
      category.setPinyin(getJianpin(category.getCategory()));
    }
    return this.dao.saveCategory(category);
  }
  
  private String getJianpin(String category) {
    PinyinUtils pu = new PinyinUtils();
    char[] cs = category.toCharArray();
    StringBuffer sb = new StringBuffer();
    byte b;
    int i;
    char[] arrayOfChar1;
    for (i = (arrayOfChar1 = cs).length, b = 0; b < i; ) {
      char c = arrayOfChar1[b];
      try {
        sb.append(pu.getPinyinByChar(c).substring(0, 1));
      } catch (BadHanyuPinyinOutputFormatCombination e) {
        sb.append(c);
      } 
      b++;
    } 
    return sb.toString();
  }
  
  @Override
  public void delCategoryById(Serializable id) {
    this.dao.delCategory(id);
  }
  
  @Override
  public void saveOrUpdateCategory(Category o) {
    String py = o.getPinyin();
    if (py == null || py.isEmpty()) {
      o.setPinyin(getJianpin(o.getCategory()));
    }
    this.dao.saveOrUpdateCategory(o);
  }
  
  @Override
  public List<Category> findAllCategory() {
    return this.dao.findAllCategory();
  }
  
  @Override
  public Map<String, Object> findAllCategory4Page(Page p) {
    Map<String, Object> m = new HashMap<String, Object>();
    m.put("list", this.dao.findAllCategory4Page(p));
    m.put("page", p);
    return m;
  }
  
  @Override
  public Category getCategoryById(Serializable id) {
    return this.dao.findCategoryById(id);
  }
  
  @Override
  public void updateCategory(Category category) {
    String py = category.getPinyin();
    if (py == null || py.isEmpty()) {
      category.setPinyin(getJianpin(category.getCategory()));
    }
    this.dao.updateCategory(category);
  }
  
  @Override
  public List findCategorysByFatherId(Serializable fatherid) {
    return this.dao.findCategorysByFatherId(fatherid);
  }
  
  @Override
  public Map<String, Object> findCategoriesOfJcxmflByPageAndCategory(Page page, Category category) {
    Map<String, Object> map = new HashMap<String, Object>();
    List list = this.dao.findCategoriesOfJcxmflByPageAndCategory(page, category);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  @Override
  public List<Category> findCategorysByFather(Serializable fatherId) {
    return this.dao.findCategorysByFather(fatherId);
  }
  
  @Override
  public List<Map<String, Object>> findCategoryByFatherId(Long fatherId) {
    List<Category> list = this.dao.findCategorysByFather(fatherId);
    Iterator<Category> itr = list.iterator();
    List<Map<String, Object>> rl = new ArrayList<Map<String, Object>>();
    while (itr.hasNext()) {
      Category c = itr.next();
      Map<String, Object> map = new HashMap<String, Object>();
      map.put("id", c.getId());
      map.put("category", c.getCategory());
      map.put("intr", c.getIntr());
      map.put("haveChildren", Boolean.valueOf(this.dao.haveChildren(c.getId())));
      rl.add(map);
    } 
    return rl;
  }
  
  @Override
  public List<Category> findCategories(Integer categoryId, String search) {
    List<Category> list = this.dao.findCategories(categoryId, search);
    return list;
  }
}
