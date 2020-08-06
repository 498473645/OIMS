package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Category;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface ICategoryDao extends BaseDao {
  int counts();
  
  List<Category> findAllCategory4Page(Page paramPage);
  
  List<Category> findAllCategory();
  
  void delCategory(Serializable paramSerializable);
  
  Serializable saveCategory(Category paramCategory);
  
  void saveOrUpdateCategory(Category paramCategory);
  
  void updateCategory(Category paramCategory);
  
  Category findCategoryById(Serializable paramSerializable);
  
  List findCategorysByFatherId(Serializable paramSerializable);
  
  List findCategoriesOfJcxmflByPageAndCategory(Page paramPage, Category paramCategory);
  
  List<Category> findCategorysByFather(Serializable paramSerializable);
  
  Category getCategoryByIntr(String paramString);
  
  boolean haveChildren(Integer paramInteger);
  
  List<Category> findCategories(Integer paramInteger, String paramString);
}
