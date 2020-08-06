package cn.com.oims.service.impl;

import cn.com.oims.dao.IArticleDao;
import cn.com.oims.dao.pojo.Article;
import cn.com.oims.dao.pojo.ArticleAttachment;
import cn.com.oims.dao.pojo.ArticleReader;
import cn.com.oims.service.IArticleService;
import cn.com.oims.web.form.ArticleSearchForm;
import com.codesnet.common.Page;
import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArticleServiceImpl implements IArticleService {
  @Autowired
  private IArticleDao articleDao;
  
  @Override
  public void saveOrUpdate(Article article) {
    Long id = article.getId();
    if (id != null) {
      Article old = this.articleDao.getArticle(id);
      old.setAuthor(article.getAuthor());
      old.setContent(article.getContent());
      old.setInfomation(article.getInfomation());
      old.setISSN(article.getISSN());
      old.setPublication(article.getPublication());
      old.setRelease(article.isRelease());
      old.setReleaseTime(article.getReleaseTime());
      old.setTitle(article.getTitle());
      this.articleDao.updateArticle(article);
      return;
    } 
    this.articleDao.saveArticle(article);
  }
  
  @Override
  public Article getArtilce(Long id) {
    Article article = this.articleDao.getArticle(id);
    List<ArticleAttachment> list = this.articleDao.findArticleAttachment(id);
    article.setArticleAttachment(list);
    return article;
  }
  
  @Override
  public Map<String, Object> findArticleList(Page page, ArticleSearchForm form) {
    List<Article> list = this.articleDao.findArticle(page, form);
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  @Override
  public void setArticlePublishState(Long id, boolean publish) {
    Article article = this.articleDao.getArticle(id);
    article.setPublish(publish);
    this.articleDao.updateArticle(article);
  }
  
  @Override
  public void setArticleOrder(Long id, int order) {
    Article article = this.articleDao.getArticle(id);
    article.setOrderNum(order);
    this.articleDao.updateArticle(article);
  }
  
  @Override
  public Article showArticle(Long id, String gonghao) {
    Article article = this.articleDao.getArticle(id);
    article.setArticleAttachment(this.articleDao.findArticleAttachment(id));
    article.setVistCount(article.getVistCount() + 1);
    ArticleReader ar = this.articleDao.getArticleReader(id, gonghao);
    if (ar == null) {
      ar = new ArticleReader();
      ar.setArticleId(id);
      ar.setGonghao(gonghao);
      ar.setFirstReadTime(new Date());
    } 
    ar.setReadCount(ar.getReadCount() + 1);
    ar.setLastReadTime(new Date());
    this.articleDao.saveOrUpdate(ar);
    return article;
  }
  
  @Override
  @Transactional
  public void deleteArticle(String[] ids, HttpServletRequest request) {
    byte b;
    int i;
    String[] arrayOfString;
    for (i = (arrayOfString = ids).length, b = 0; b < i; ) {
      String str = arrayOfString[b];
      Long id = Long.valueOf(Long.parseLong(str));
      this.articleDao.deleteArticle(id);
      List<ArticleAttachment> list = this.articleDao.findArticleAttachment(id);
      Iterator<ArticleAttachment> itr = list.iterator();
      while (itr.hasNext())
        deleteArticleAttachment(itr.next(), request); 
      b++;
    } 
  }
  
  @Override
  public void saveArticleAttachment(ArticleAttachment aa) {
    this.articleDao.saveArticleAttachment(aa);
  }
  
  @Override
  @Transactional
  public void deleteArticleAttachment(String[] ids, HttpServletRequest request) {
    byte b;
    int i;
    String[] arrayOfString;
    for (i = (arrayOfString = ids).length, b = 0; b < i; ) {
      String str = arrayOfString[b];
      Long id = Long.valueOf(Long.parseLong(str));
      ArticleAttachment aa = this.articleDao.getArticleAttachment(id);
      if (aa != null)
        deleteArticleAttachment(aa, request); 
      b++;
    } 
  }
  
  private void deleteArticleAttachment(ArticleAttachment aa, HttpServletRequest request) {
    String realpath = request.getSession().getServletContext().getRealPath(aa.getDownloadLink());
    (new File(realpath)).delete();
    this.articleDao.deleteArticleAttchment(aa);
  }
  
  @Override
  public List<ArticleAttachment> findArticleAttachment(Long articleId) {
    return this.articleDao.findArticleAttachment(articleId);
  }
  
  @Override
  public List findArticleListByCategoryId(int categoryId, Integer max, String gonghao) {
    return this.articleDao.findArticleListByCategoryId(categoryId, max, gonghao);
  }
}
