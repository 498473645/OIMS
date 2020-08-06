package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Article;
import cn.com.oims.dao.pojo.ArticleAttachment;
import cn.com.oims.dao.pojo.ArticleReader;
import cn.com.oims.web.form.ArticleSearchForm;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.List;

public interface IArticleDao extends BaseDao {
  Long saveArticle(Article paramArticle);
  
  void updateArticle(Article paramArticle);
  
  void deleteArticle(Long paramLong);
  
  Article getArticle(Long paramLong);
  
  List<ArticleAttachment> findArticleAttachment(Long paramLong);
  
  List<Article> findArticle(Page paramPage, ArticleSearchForm paramArticleSearchForm);
  
  void deleteArticleAttchment(Collection<ArticleAttachment> paramCollection);
  
  Long saveArticleAttachment(ArticleAttachment paramArticleAttachment);
  
  void deleteArticleAttchment(ArticleAttachment paramArticleAttachment);
  
  ArticleAttachment getArticleAttachment(Long paramLong);
  
  ArticleReader getArticleReader(Long paramLong, String paramString);
  
  void saveOrUpdate(Object paramObject);
  
  List findArticleListByCategoryId(int paramInt, Integer paramInteger, String paramString);
}
