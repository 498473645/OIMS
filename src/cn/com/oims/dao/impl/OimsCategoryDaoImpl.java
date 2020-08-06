package cn.com.oims.dao.impl;

import cn.com.oims.dao.OimsCategoryDao;
import cn.com.oims.dao.pojo.Category;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class OimsCategoryDaoImpl extends BaseDaoImpl implements OimsCategoryDao {
  @Override
  public List<Category> findCategories(Integer fatherId) {
    return this.hibernateTemplate.find("from Category where fatherId=" + fatherId);
  }
  
  @Override
  public Category getCategoryById(Integer cateid) {
    String hql = "select new map(a.id as id,a.category as category , a.fatherid as fatherid , a.intr as intr) from  Category a where a.id = :id";
    Map<String, Object> map = new HashMap<String, Object>();
    Map<String, Object> param = new HashMap<String, Object>();
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Category c = new Category();
    param.put("id", cateid);
    list = findList(hql, param);
    if (list.size() > 0) {
      map = list.get(0);
      c.setId((map.get("id") != null) ? Integer.valueOf(Integer.parseInt(map.get("id").toString())) : null);
      c.setFatherid((map.get("fatherid") != null) ? Integer.valueOf(Integer.parseInt(map.get("fatherid").toString())) : null);
      c.setCategory((map.get("category") != null) ? map.get("category").toString() : null);
      c.setIntr((map.get("intr") != null) ? map.get("intr").toString() : null);
    } 
    return c;
  }
}
