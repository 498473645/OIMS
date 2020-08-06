package cn.com.oims.service;

import cn.com.oims.dao.pojo.Article;
import cn.com.oims.dao.pojo.ArticleAttachment;
import cn.com.oims.web.form.ArticleSearchForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

public interface IArticleService {
  void saveOrUpdate(Article paramArticle);
  
  Article getArtilce(Long paramLong);
  
  Map<String, Object> findArticleList(Page paramPage, ArticleSearchForm paramArticleSearchForm);
  
  void setArticlePublishState(Long paramLong, boolean paramBoolean);
  
  void setArticleOrder(Long paramLong, int paramInt);
  
  Article showArticle(Long paramLong, String paramString);
  
  void deleteArticle(String[] paramArrayOfString, HttpServletRequest paramHttpServletRequest);
  
  void saveArticleAttachment(ArticleAttachment paramArticleAttachment);
  
  void deleteArticleAttachment(String[] paramArrayOfString, HttpServletRequest paramHttpServletRequest);
  
  List<ArticleAttachment> findArticleAttachment(Long paramLong);
  
  List findArticleListByCategoryId(int paramInt, Integer paramInteger, String paramString);
}
