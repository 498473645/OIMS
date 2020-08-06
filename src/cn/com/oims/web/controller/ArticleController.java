package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Article;
import cn.com.oims.dao.pojo.ArticleAttachment;
import cn.com.oims.service.IArticleService;
import cn.com.oims.web.form.ArticleForm;
import cn.com.oims.web.form.ArticleSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping({"article"})
public class ArticleController {
  @Autowired
  private IArticleService articleService;
  
  @RequestMapping(value = {"/findMyArticles.htm"}, method = {RequestMethod.POST})
  public void findMyArticles(Integer max, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("获取通知列表！");
    List list = this.articleService.findArticleListByCategoryId(8001, max, gonghao);
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveOrUpdateArticle.htm"}, method = {RequestMethod.POST})
  public void saveArticle(ArticleForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("保存文章！");
    try {
      result.setGonghao(gonghao);
      Article article = new Article();
      BeanUtils.copyProperties(form, article);
      article.setInsertUser(gonghao);
      article.setInsertTime(new Date());
      this.articleService.saveOrUpdate(article);
      result.setObj(article);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"getArticle.htm"}, method = {RequestMethod.GET})
  public void getArticle(Long id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("获取文章！");
    try {
      result.setGonghao(gonghao);
      Article article = this.articleService.getArtilce(id);
      result.setObj(article);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findArticle.htm"}, method = {RequestMethod.POST})
  public void findArticle(ArticleSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("获取文章列表！");
    try {
      result.setGonghao(gonghao);
      if (form.getRead() != null) {
        form.setReader(gonghao);
      } else {
        form.setRead(null);
      } 
      Map<String, Object> articleMap = this.articleService.findArticleList(page, form);
      result.setObj(articleMap);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result.getObj(), response);
  }
  
  @RequestMapping(value = {"setArticlePublishState.htm"}, method = {RequestMethod.POST})
  public void setArticlePublishState(Long id, boolean publish, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("设置文章发表状态！");
    try {
      result.setGonghao(gonghao);
      this.articleService.setArticlePublishState(id, publish);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"setArticleOrder.htm"}, method = {RequestMethod.POST})
  public void setArticlePublishState(Long id, int order, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("设置文章排序！");
    try {
      result.setGonghao(gonghao);
      this.articleService.setArticleOrder(id, order);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"showArticle.htm"}, method = {RequestMethod.POST})
  public void setArticleCount(Long id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("设置文章访问次数！");
    try {
      Article article;
      result.setGonghao(gonghao);
      boolean setCount = false;
      Cookie[] cookies = request.getCookies();
      byte b;
      int i;
      Cookie[] arrayOfCookie1;
      for (i = (arrayOfCookie1 = cookies).length, b = 0; b < i; ) {
        Cookie cookie = arrayOfCookie1[b];
        String name = cookie.getName();
        if (name.equals("setCount"))
          setCount = true; 
        b++;
      } 
      if (!setCount) {
        article = this.articleService.showArticle(id, gonghao);
        Cookie c = new Cookie("setCount", "true");
        c.setMaxAge(60);
        response.addCookie(c);
      } else {
        article = this.articleService.getArtilce(id);
      } 
      if (article.isPublish()) {
        result.setObj(article);
        result.setState(1);
      } 
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteArticles.htm"}, method = {RequestMethod.POST})
  public void deleteArticles(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("删除文章！");
    try {
      String[] ids = request.getParameterValues("id");
      result.setGonghao(gonghao);
      this.articleService.deleteArticle(ids, request);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findArticleAttachment.htm"}, method = {RequestMethod.GET})
  public void findArticleAttachment(Long articleId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("查找文章附件！");
    result.setGonghao(gonghao);
    try {
      List<ArticleAttachment> list = this.articleService.findArticleAttachment(articleId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"uploadArticleAttachment.htm"}, method = {RequestMethod.POST})
  public void uploadArticleAttachment(Long id, MultipartFile mf, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("上传文章附件！");
    try {
      String filename = mf.getOriginalFilename();
      int n = filename.lastIndexOf(".");
      String ext = (n == -1) ? "" : filename.substring(n);
      String newname = String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ext;
      String path = "/UploadFile/attachment/user/" + gonghao + "/";
      String realpath = session.getServletContext().getRealPath(path);
      File folder = new File(realpath);
      if (!folder.exists())
        folder.mkdirs(); 
      File file = new File(String.valueOf(realpath) + File.separator + newname);
      result.setGonghao(gonghao);
      mf.transferTo(file);
      ArticleAttachment aa = new ArticleAttachment();
      aa.setArticleId(id);
      aa.setAttachment(filename);
      aa.setDownloadLink(String.valueOf(path) + newname);
      this.articleService.saveArticleAttachment(aa);
      result.setState(1);
      result.setObj(aa);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteArticleAttachment.htm"}, method = {RequestMethod.POST})
  public void deleteArticleAttachment(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("删除文章附件！");
    try {
      String[] ids = request.getParameterValues("id");
      this.articleService.deleteArticleAttachment(ids, request);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
