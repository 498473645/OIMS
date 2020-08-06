package cn.com.oims.dao.impl;

import cn.com.oims.dao.ICategoryDao;
import cn.com.oims.dao.pojo.Category;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class CategoryDaoImpl extends BaseDaoImpl implements ICategoryDao {
  private String clazzName = Category.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Category.class);
  }
  
  public int counts() {
    int i = ((Integer)this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0)).intValue();
    return i;
  }
  
  public List<Category> findAllCategory4Page(Page p) {
    p.setRowsCount(Integer.valueOf(counts()));
    p.init();
    return this.hibernateTemplate.findByCriteria(getDC(), p.getStartRow().intValue(), 
        p.getPageSize().intValue());
  }
  
  public List<Category> findAllCategory() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public Serializable saveCategory(Category category) {
    return this.hibernateTemplate.save(category);
  }
  
  public void delCategory(Serializable id) {
    this.hibernateTemplate.delete(findCategoryById(id));
  }
  
  public void saveOrUpdateCategory(Category o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public Category findCategoryById(Serializable id) {
    return (Category)this.hibernateTemplate.get(Category.class, id);
  }
  
  public void updateCategory(Category category) {
    this.hibernateTemplate.update(category);
  }
  
  public List findCategorysByFatherId(Serializable fatherid) {
    String hql = "select new map(categoryObj.id as categoryid,categoryObj.category as category,categoryObj.fatherid as fatherid,categoryObj.intr as intr) from Category as categoryObj where categoryObj.fatherid=" + 
      fatherid;
    return this.hibernateTemplate.find(hql);
  }
  
  public List findCategoriesOfJcxmflByPageAndCategory(Page page, Category category) {
    String hql_count = "select count(oimscategory.id) from Category as oimscategory,Category as oimscategory_fatherid";
    String hql_map = "select new map(oimscategory.id as oimscategoryid,oimscategory.fatherid as fatherid,oimscategory_fatherid.category as fatherName,oimscategory.category as category,oimscategory.intr as intr)from Category as oimscategory,Category as oimscategory_fatherid ";
    String strWhere = " where 1=1 ";
    strWhere = String.valueOf(strWhere) + " and oimscategory_fatherid.fatherid=10";
    strWhere = String.valueOf(strWhere) + " and oimscategory.fatherid=oimscategory_fatherid.id ";
    if (category.getCategory() != null && 
      !"".equals(category.getCategory()))
      strWhere = String.valueOf(strWhere) + " and oimscategory.category like '%" + 
        category.getCategory() + "%' "; 
    strWhere = String.valueOf(strWhere) + " order by oimscategory.id desc";
    hql_count = String.valueOf(hql_count) + strWhere;
    hql_map = String.valueOf(hql_map) + strWhere;
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  public List<Category> findCategorysByFather(Serializable fatherId) {
    String hql = " from Category where fatherid=" + fatherId + " order by id";
    return this.hibernateTemplate.find(hql);
  }
  
  public Category getCategoryByIntr(String string) {
    String hql = " from Category where intr = '" + string + "'";
    List<Category> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  public boolean haveChildren(Integer id) {
    String hql = "select count(*) from Category where fatherid=" + id;
    return (count(hql) > 0);
  }
  
  public List<Category> findCategories(Integer categoryId, String search) {
    String hql = "from Category where fatherid=" + categoryId;
    if (search != null && !search.isEmpty())
      hql = String.valueOf(hql) + " and (category like '%" + search + "%' or intr like '%" + search.toUpperCase() + "%'"; 
    return this.hibernateTemplate.find(hql);
  }
}
