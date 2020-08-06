package cn.com.oims.dao.impl;

import cn.com.oims.dao.IGroupMemberDao;
import cn.com.oims.dao.pojo.Article;
import cn.com.oims.dao.pojo.DeptGroup;
import cn.com.oims.dao.pojo.DeptGroupArticle;
import cn.com.oims.dao.pojo.GroupArticleId;
import cn.com.oims.dao.pojo.GroupMember;
import cn.com.oims.dao.pojo.GroupPatient;
import cn.com.oims.dao.pojo.GroupPatientId;
import cn.com.oims.dao.pojo.GroupPatientMsg;
import cn.com.oims.web.form.ArticleSearchForm;
import cn.com.oims.web.form.PatientSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class GroupMemberImpl extends BaseDaoImpl implements IGroupMemberDao {

  @Override
  public List<GroupMember> findGroupMember(Integer categoryId) {
    String hql = " from GroupMember where groupMemberId.groupId=" + categoryId;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public void saveOrUpdate(Object dgc) {
    this.hibernateTemplate.saveOrUpdate(dgc);
  }
  
  @Override
  public void deleteGroupMember(Integer id) {
    this.hibernateTemplate.delete(this.hibernateTemplate.get(GroupMember.class, id));
  }
  
  @Override
  public DeptGroup getDeptGroup(Integer id) {
    return (DeptGroup)this.hibernateTemplate.get(DeptGroup.class, id);
  }
  
  @Override
  public List<DeptGroup> findDeptGroupList(String search) {
    DetachedCriteria criteria = DetachedCriteria.forClass(DeptGroup.class);
    if (search != null) {
      criteria.add((Criterion)Restrictions.like("name", search));
    }
    List<DeptGroup> list = this.hibernateTemplate.findByCriteria(criteria);
    return list;
  }
  
  @Override
  public void deleteAll(Collection col) {
    this.hibernateTemplate.deleteAll(col);
  }
  
  @Override
  public DeptGroupArticle getDeptGroupArticle(Integer deptGroupId, Long id) {
    GroupArticleId gai = new GroupArticleId(deptGroupId, id);
    return (DeptGroupArticle)this.hibernateTemplate.get(DeptGroupArticle.class, (Serializable)gai);
  }
  
  @Override
  public void deleteDeptGroupArticle(Integer groupId, Long articleId) {
    this.hibernateTemplate.delete(getDeptGroupArticle(groupId, articleId));
  }
  
  @Override
  public List<DeptGroupArticle> findDeptGroupArticles(Integer id, Page page) {
    String hql = " from DeptGroupArticle where groupArticleId.deptGroupId=" + id;
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<Article> findDeptGroupArticles(Integer groupId, ArticleSearchForm form, Page page) {
    List<Article> list;
    StringBuffer hqlBuffer = new StringBuffer(" from Article a, DeptGroupArticle d where a.id=d.groupArticleId.articleId and d.groupArticleId.deptGroupId=" + groupId);
    Map<String, Object> map = new HashMap<String, Object>();
    if (form.getPublish() != null) {
      hqlBuffer.append(" and a.publish=:publish");
      map.put("publish", form.getPublish());
    } 
    if (form.getAuthor() != null) {
      hqlBuffer.append(" and a.author=:author");
      map.put("author", form.getAuthor());
    } 
    if (form.getAuthorWorkNo() != null) {
      hqlBuffer.append(" and a.authorWorkNo=:authorWorkNo");
      map.put("authorWorkNo", form.getAuthorWorkNo());
    } 
    if (form.getCategoryId() != null) {
      hqlBuffer.append(" and a.categoryId=:categoryId");
      map.put("categoryId", form.getCategoryId());
    } 
    if (form.getISSN() != null) {
      hqlBuffer.append(" and a.ISSN=:ISSN");
      map.put("ISSN", form.getISSN());
    } 
    if (form.getKeyword() != null) {
      hqlBuffer.append(" and a.keyword=:keyword");
      map.put("keyword", form.getKeyword());
    } 
    if (form.getPublication() != null) {
      hqlBuffer.append(" and a.publication=:publication");
      map.put("publication", form.getPublication());
    } 
    String hql = hqlBuffer.toString();
    if (map.isEmpty()) {
      page.setRowsCount(Integer.valueOf(count("select count(*) " + hql)));
      page.init();
      list = getListForPage("select a " + hql, page.getPageCount().intValue(), page.getPageSize().intValue());
    } else {
      page.setRowsCount(Integer.valueOf(counts("select count(*) " + hql, map)));
      page.init();
      list = findList("select a" + hql, map);
    } 
    return list;
  }
  
  @Override
  public void deleteDeptGroupPatient(Integer groupId, Long patientId) {
    GroupPatientId gpi = new GroupPatientId(groupId, patientId);
    this.hibernateTemplate.delete(this.hibernateTemplate.get(GroupPatient.class, (Serializable)gpi));
  }
  
  @Override
  public List<Map<String, Object>> findDeptGroupPatients(Integer groupId, PatientSearchForm form, Page page) {
    String hql = " from HuanZheXinXi h, GroupPatient p, DeptGroup g where h.id=p.groupPatientId.patientId and p.groupPatientId.groupId=g.id";
    if (groupId != null) {
      hql = String.valueOf(hql) + "and p.groupPatientId.groupId=" + groupId;
    }
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage("select new map((select count(*) from GroupPatientMsg m where m.groupId=g.id and m.patientId=h.id) as msgCount,(select y.xingming from YuanGong y where y.gonghao=p.insertUser) as insertDoctor,g.name as name, g.id as groupId, p.insertDate as insertDate, p.insertUser as insertUser, h.xingming as xingming, h.xingbie as xingbie, h.shengri as shengri, h.shouji as shouji, h.dianhua as dianhua,h.binglihao as binglihao, h.id as patientId) " + 
        
        hql + " order by p.insertDate desc", page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<GroupPatientMsg> findDeptGroupPatientMsgs(Integer groupId, Long patientId, Page page) {
    String hql = " from GroupPatientMsg where groupId=" + groupId + " and patientId=" + patientId;
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage(String.valueOf(hql) + " order by insertDate desc", page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public GroupPatientMsg getGroupPatientMsg(Long id) {
    return (GroupPatientMsg)this.hibernateTemplate.get(GroupPatientMsg.class, id);
  }
  
  @Override
  public void deleteDeptGroupPatientMsg(Long id) {
    this.hibernateTemplate.delete(getGroupPatientMsg(id));
  }
  
  @Override
  public void deleteDeptGroup(Integer id) {
    this.hibernateTemplate.delete(getDeptGroup(id));
  }
  
  @Override
  public boolean groupArticleExist(Integer id) {
    return (count("select count(*) from DeptGroupArticle where groupArticleId.deptGroupId=" + id) > 0);
  }
  
  @Override
  public boolean groupPatientExist(Integer id) {
    return (count("select count(*) from GroupPatient where groupPatientId.groupId=" + id) > 0);
  }
}
