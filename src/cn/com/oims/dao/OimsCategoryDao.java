package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Category;
import java.util.List;

public interface OimsCategoryDao extends BaseDao {
  List<Category> findCategories(Integer paramInteger);
  
  Category getCategoryById(Integer paramInteger);
}
