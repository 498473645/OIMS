package cn.com.oims.service;

import cn.com.oims.dao.pojo.Category;
import java.util.List;

public interface IOimsCategoryService {
  List<Category> findOimsCategories(Integer paramInteger);
  
  List<Category> findAllOimsCategoriesByFatherId(Integer paramInteger);
  
  Category getOimsCategory(Integer paramInteger);
  
  Integer saveOimsCategory(Category paramCategory);
  
  void updateOimsCategory(Category paramCategory);
  
  Category getCategoryById(Integer paramInteger);
}
