package cn.com.oims.dao.impl;

import cn.com.oims.dao.IArticleDao;
import cn.com.oims.dao.pojo.Article;
import cn.com.oims.dao.pojo.ArticleAttachment;
import cn.com.oims.dao.pojo.ArticleReader;
import cn.com.oims.web.form.ArticleSearchForm;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class ArticleDaoImpl extends BaseDaoImpl implements IArticleDao {
  @Override
  public Long saveArticle(Article article) {
    return (Long)this.hibernateTemplate.save(article);
  }
  
  @Override
  public void updateArticle(Article article) {
    this.hibernateTemplate.update(article);
  }
  
  @Override
  public void deleteArticle(Long id) {
    this.hibernateTemplate.delete(getArticle(id));
  }
  
  @Override
  public Article getArticle(Long id) {
    return (Article)this.hibernateTemplate.get(Article.class, id);
  }
  
  @Override
  public List<ArticleAttachment> findArticleAttachment(Long id) {
    return this.hibernateTemplate.find("from ArticleAttachment where articleId=" + id + " order by id");
  }
  
  @Override
  public List<Article> findArticle(Page page, ArticleSearchForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = " from Article a where a.categoryId=:categoryId";
    map.put("categoryId", form.getCategoryId());
    if (form.getAuthor() != null && !form.getAuthor().isEmpty()) {
      hql = String.valueOf(hql) + " and a.author like :author";
      map.put("author", "%" + form.getAuthor() + "%");
    } 
    if (form.getISSN() != null && !form.getISSN().isEmpty()) {
      hql = String.valueOf(hql) + " and a.ISSN=:ISSN";
      map.put("ISSN", form.getISSN());
    } 
    if (form.getKeyword() != null && !form.getKeyword().isEmpty()) {
      hql = String.valueOf(hql) + " and (a.title like :keyword or a.keyword like :keyword)";
      map.put("keyword", "%" + form.getKeyword() + "%");
    } 
    if (form.getRead() != null) {
      if (form.getRead().booleanValue()) {
        hql = String.valueOf(hql) + " and (select count(*) from ArticleReader r where r.articleId=a.id and r.gonghao=:reader)>0";
      } else {
        hql = String.valueOf(hql) + " and (select count(*) from ArticleReader r where r.articleId=a.id and r.gonghao=:reader)<0";
      } 
      map.put("reader", form.getReader());
    } 
    if (form.getPublish() != null) {
      hql = String.valueOf(hql) + " and a.publish=:publish";
      map.put("publish", form.getPublish());
    } 
    if (form.getAuthorWorkNo() != null) {
      hql = String.valueOf(hql) + " and a.authorWorkNo=:authorWorkNo";
      map.put("authorWorkNo", form.getAuthorWorkNo());
    } 
    page.setRowsCount(Integer.valueOf(counts("select count(*)" + hql, map)));
    page.init();
    return getListForPage(String.valueOf(hql) + " order by a.insertTime desc", page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }
  
  @Override
  public void deleteArticleAttchment(Collection<ArticleAttachment> list) {
    this.hibernateTemplate.deleteAll(list);
  }
  
  @Override
  public Long saveArticleAttachment(ArticleAttachment aa) {
    return (Long)this.hibernateTemplate.save(aa);
  }
  
  @Override
  public void deleteArticleAttchment(ArticleAttachment aa) {
    this.hibernateTemplate.delete(aa);
  }
  
  @Override
  public ArticleAttachment getArticleAttachment(Long id) {
    return (ArticleAttachment)this.hibernateTemplate.get(ArticleAttachment.class, id);
  }
  
  @Override
  public ArticleReader getArticleReader(Long id, String gonghao) {
    List<ArticleReader> list = this.hibernateTemplate.find("from ArticleReader where articleId=" + id + " and gonghao='" + gonghao + "'");
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public void saveOrUpdate(Object ar) {
    this.hibernateTemplate.saveOrUpdate(ar);
  }
  
  @Override
  public List findArticleListByCategoryId(int categoryId, Integer max, String gonghao) {
    String hql = "select new map(c.category as category, a.id as id, a.title as title,a.insertTime as insertTime,(select count(*) from ArticleReader r where r.articleId=a.id and r.gonghao='" + gonghao + "') as read) from Article a, Category c where a.categoryId=c.id and a.publish=true and a.categoryId in(select id from Category where fatherid=" + categoryId + ")";
    hql = String.valueOf(hql) + " order by insertTime desc";
    return getListForPage(hql, 0, max.intValue());
  }
}
