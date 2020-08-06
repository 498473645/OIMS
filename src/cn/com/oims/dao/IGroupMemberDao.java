package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Article;
import cn.com.oims.dao.pojo.DeptGroup;
import cn.com.oims.dao.pojo.DeptGroupArticle;
import cn.com.oims.dao.pojo.GroupMember;
import cn.com.oims.dao.pojo.GroupPatientMsg;
import cn.com.oims.web.form.ArticleSearchForm;
import cn.com.oims.web.form.PatientSearchForm;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface IGroupMemberDao extends BaseDao {
  List<GroupMember> findGroupMember(Integer paramInteger);
  
  void saveOrUpdate(Object paramObject);
  
  void deleteGroupMember(Integer paramInteger);
  
  DeptGroup getDeptGroup(Integer paramInteger);
  
  List<DeptGroup> findDeptGroupList(String paramString);
  
  void deleteAll(Collection paramCollection);
  
  DeptGroupArticle getDeptGroupArticle(Integer paramInteger, Long paramLong);
  
  void deleteDeptGroupArticle(Integer paramInteger, Long paramLong);
  
  List<DeptGroupArticle> findDeptGroupArticles(Integer paramInteger, Page paramPage);
  
  List<Article> findDeptGroupArticles(Integer paramInteger, ArticleSearchForm paramArticleSearchForm, Page paramPage);
  
  void deleteDeptGroupPatient(Integer paramInteger, Long paramLong);
  
  List<Map<String, Object>> findDeptGroupPatients(Integer paramInteger, PatientSearchForm paramPatientSearchForm, Page paramPage);
  
  List<GroupPatientMsg> findDeptGroupPatientMsgs(Integer paramInteger, Long paramLong, Page paramPage);
  
  GroupPatientMsg getGroupPatientMsg(Long paramLong);
  
  void deleteDeptGroupPatientMsg(Long paramLong);
  
  void deleteDeptGroup(Integer paramInteger);
  
  boolean groupArticleExist(Integer paramInteger);
  
  boolean groupPatientExist(Integer paramInteger);
}
