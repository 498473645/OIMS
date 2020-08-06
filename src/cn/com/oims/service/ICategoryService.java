package cn.com.oims.service;

import cn.com.oims.dao.pojo.Category;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface ICategoryService {
  Category getCategoryById(Serializable paramSerializable);
  
  Serializable saveCategory(Category paramCategory);
  
  void delCategoryById(Serializable paramSerializable);
  
  void saveOrUpdateCategory(Category paramCategory);
  
  void updateCategory(Category paramCategory);
  
  List<Category> findAllCategory();
  
  Map<String, Object> findAllCategory4Page(Page paramPage);
  
  List findCategorysByFatherId(Serializable paramSerializable);
  
  Map<String, Object> findCategoriesOfJcxmflByPageAndCategory(Page paramPage, Category paramCategory);
  
  List<Category> findCategorysByFather(Serializable paramSerializable);
  
  List<Map<String, Object>> findCategoryByFatherId(Long paramLong);
  
  List<Category> findCategories(Integer paramInteger, String paramString);
}
