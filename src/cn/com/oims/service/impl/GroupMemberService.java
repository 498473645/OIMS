package cn.com.oims.service.impl;

import cn.com.oims.dao.IArticleDao;
import cn.com.oims.dao.IGroupMemberDao;
import cn.com.oims.dao.pojo.Article;
import cn.com.oims.dao.pojo.DeptGroup;
import cn.com.oims.dao.pojo.DeptGroupArticle;
import cn.com.oims.dao.pojo.GroupMember;
import cn.com.oims.dao.pojo.GroupPatient;
import cn.com.oims.dao.pojo.GroupPatientMsg;
import cn.com.oims.service.IDeptGroupService;
import cn.com.oims.web.form.ArticleSearchForm;
import cn.com.oims.web.form.DeptGroupForm;
import cn.com.oims.web.form.GrooupPatientMsgForm;
import cn.com.oims.web.form.GroupArticleForm;
import cn.com.oims.web.form.PatientSearchForm;
import com.codesnet.common.Page;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GroupMemberService implements IDeptGroupService {
  @Autowired
  private IGroupMemberDao groupDao;
  
  @Autowired
  private IArticleDao articleDao;
  
  public List<GroupMember> findGoupMember(Integer categoryId) {
    return this.groupDao.findGroupMember(categoryId);
  }
  
  @Transactional
  public void saveOrUpdateGroupMember(Vector<GroupMember> vg) {
    List<GroupMember> list = this.groupDao.findGroupMember(((GroupMember)vg.get(0)).getGroupMemberId().getGroupId());
    for (GroupMember gm : vg) {
      Iterator<GroupMember> itr = list.iterator();
      boolean x = true;
      while (itr.hasNext()) {
        GroupMember _gm = itr.next();
        if (_gm.getGroupMemberId().getGroupId().intValue() == gm.getGroupMemberId().getGroupId().intValue() && 
          _gm.getGroupMemberId().getWorkNo().equals(gm.getGroupMemberId().getWorkNo())) {
          BeanUtils.copyProperties(gm, _gm);
          this.groupDao.saveOrUpdate(_gm);
          list.remove(_gm);
          x = false;
          break;
        } 
      } 
      if (x)
        this.groupDao.saveOrUpdate(gm); 
    } 
    if (list.size() > 0)
      this.groupDao.deleteAll(list); 
  }
  
  public void deleteGroupMember(Integer id) {
    this.groupDao.deleteGroupMember(id);
  }
  
  public void saveOrUpdateDeptGroup(DeptGroupForm form, String gonghao) {
    DeptGroup dg;
    if (form.getId() != null) {
      dg = this.groupDao.getDeptGroup(form.getId());
      if (dg == null)
        throw new RuntimeException("部门分组未找到！"); 
      dg.setUpdateDate(new Date());
      dg.setUpdateUser(gonghao);
    } else {
      dg = new DeptGroup();
      dg.setInsertDate(new Date());
      dg.setInsertUser(gonghao);
    } 
    BeanUtils.copyProperties(form, dg);
    this.groupDao.saveOrUpdate(dg);
    form.setId(dg.getId());
  }
  
  @Transactional
  public void deleteDeptGroup(Integer id) {
    if (this.groupDao.groupArticleExist(id) || this.groupDao.groupPatientExist(id))
      throw new RuntimeException("该课题组下有患者资料或科研资料！"); 
    List<GroupMember> list = this.groupDao.findGroupMember(id);
    if (list.size() > 0)
      this.groupDao.deleteAll(list); 
    this.groupDao.deleteDeptGroup(id);
  }
  
  public List<DeptGroup> findDeptGroupList(String search) {
    return this.groupDao.findDeptGroupList(search);
  }
  
  @Transactional
  public void saveOrUpdateGroupArticle(GroupArticleForm form, String gonghao) {
    Article article;
    if (form.getId() != null) {
      article = this.articleDao.getArticle(form.getId());
      if (article == null)
        throw new RuntimeException("文章不存在，ID:" + form.getId()); 
      if (!article.getInsertUser().equals(gonghao))
        throw new RuntimeException("不是你添加的文章！"); 
      article.setUpdateDate(new Date());
      article.setUpdateUser(gonghao);
    } else {
      article = new Article();
      article.setInsertTime(new Date());
      article.setInsertUser(gonghao);
    } 
    BeanUtils.copyProperties(form, article);
    this.articleDao.saveOrUpdate(article);
    DeptGroupArticle ga = this.groupDao.getDeptGroupArticle(form.getDeptGroupId(), article.getId());
    if (ga == null) {
      ga = new DeptGroupArticle(form.getDeptGroupId(), article.getId());
      ga.setInsertUser(gonghao);
      ga.setInsertDate(new Date());
    } 
    BeanUtils.copyProperties(form, ga);
    this.groupDao.saveOrUpdate(ga);
  }
  
  @Transactional
  public void addDeptGroupArticle(Long articleId, Integer groupId, String gonghao) {
    Article article = this.articleDao.getArticle(articleId);
    if (article == null)
      throw new RuntimeException("文章不存在，ID:" + articleId); 
    DeptGroupArticle ga = this.groupDao.getDeptGroupArticle(groupId, article.getId());
    if (ga == null) {
      ga = new DeptGroupArticle(groupId, article.getId());
      ga.setInsertUser(gonghao);
      ga.setInsertDate(new Date());
    } 
    this.groupDao.saveOrUpdate(ga);
  }
  
  @Transactional
  public void deleteDeptGroupArticle(Integer groupId, Long articleId, Boolean deleteArticle, String gonghao) {
    this.groupDao.deleteDeptGroupArticle(groupId, articleId);
    if (deleteArticle != null && deleteArticle.booleanValue()) {
      Article article = this.articleDao.getArticle(articleId);
      if (!article.getInsertUser().equals(gonghao))
        throw new RuntimeException("不是你添加的文章,不能被删除！"); 
      this.articleDao.deleteArticle(articleId);
    } 
  }
  
  public Map<String, Object> findDeptGroupArticles(Integer groupId, ArticleSearchForm form, Page page) {
    List<Article> list = this.groupDao.findDeptGroupArticles(groupId, form, page);
    Map<String, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public void deleteDeptGroupPatient(Integer groupId, Long patientId, String gonghao) {
    this.groupDao.deleteDeptGroupPatient(groupId, patientId);
    Page page = new Page();
    page.setCurrentPage(Integer.valueOf(1));
    page.setPageSize(Integer.valueOf(100));
    do {
      List<GroupPatientMsg> list = this.groupDao.findDeptGroupPatientMsgs(groupId, patientId, page);
      this.groupDao.deleteAll(list);
    } while (page.getPageCount().intValue() != 1);
  }
  
  public void addDeptGroupPatient(Integer groupId, Long patientId, String gonghao) {
    GroupPatient gp = new GroupPatient(groupId, patientId);
    gp.setInsertDate(new Date());
    gp.setInsertUser(gonghao);
    this.groupDao.saveOrUpdate(gp);
  }
  
  public Map<String, Object> findDeptGroupPatients(Integer groupId, PatientSearchForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = this.groupDao.findDeptGroupPatients(groupId, form, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public Map<String, Object> findDeptGroupPatientMsgs(Integer groupId, Long patientId, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<GroupPatientMsg> list = this.groupDao.findDeptGroupPatientMsgs(groupId, patientId, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public void addDeptGroupPatientMsg(GrooupPatientMsgForm form, String gonghao) {
    GroupPatientMsg msg;
    if (form.getId() != null) {
      msg = this.groupDao.getGroupPatientMsg(form.getId());
      if (msg == null)
        throw new RuntimeException("评论未找到，可能被删除！"); 
      msg.setUpdateDate(new Date());
    } else {
      msg = new GroupPatientMsg();
      msg.setInsertDate(new Date());
      msg.setInsertUser(gonghao);
    } 
    BeanUtils.copyProperties(form, msg);
    this.groupDao.saveOrUpdate(msg);
  }
  
  public void deleteDeptGroupPatientMsg(Long id, String gonghao) {
    this.groupDao.deleteDeptGroupPatientMsg(id);
  }
}
