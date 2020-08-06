package cn.com.oims.service.impl;

import cn.com.oims.dao.OimsCategoryDao;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.service.IOimsCategoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OimsCategoryServiceImpl implements IOimsCategoryService {
  private OimsCategoryDao categoryDao;
  
  @Autowired
  public void setCategoryDao(OimsCategoryDao categoryDao) {
    this.categoryDao = categoryDao;
  }
  
  public List<Category> findOimsCategories(Integer fatherId) {
    return this.categoryDao.findCategories(fatherId);
  }
  
  public Category getCategoryById(Integer cateid) {
    return this.categoryDao.getCategoryById(cateid);
  }
  
  public List<Category> findAllOimsCategoriesByFatherId(Integer fatherId) {
    return null;
  }
  
  public Category getOimsCategory(Integer id) {
    return null;
  }
  
  public Integer saveOimsCategory(Category category) {
    return null;
  }
  
  public void updateOimsCategory(Category category) {}
}
