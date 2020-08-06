package cn.com.oims.service;

import cn.com.oims.dao.pojo.DeptGroup;
import cn.com.oims.dao.pojo.GroupMember;
import cn.com.oims.web.form.ArticleSearchForm;
import cn.com.oims.web.form.DeptGroupForm;
import cn.com.oims.web.form.GrooupPatientMsgForm;
import cn.com.oims.web.form.GroupArticleForm;
import cn.com.oims.web.form.PatientSearchForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;
import java.util.Vector;

public interface IDeptGroupService {
  List<GroupMember> findGoupMember(Integer paramInteger);
  
  void saveOrUpdateGroupMember(Vector<GroupMember> paramVector);
  
  void deleteGroupMember(Integer paramInteger);
  
  void saveOrUpdateDeptGroup(DeptGroupForm paramDeptGroupForm, String paramString);
  
  void deleteDeptGroup(Integer paramInteger);
  
  List<DeptGroup> findDeptGroupList(String paramString);
  
  void saveOrUpdateGroupArticle(GroupArticleForm paramGroupArticleForm, String paramString);
  
  void addDeptGroupArticle(Long paramLong, Integer paramInteger, String paramString);
  
  void deleteDeptGroupArticle(Integer paramInteger, Long paramLong, Boolean paramBoolean, String paramString);
  
  Map<String, Object> findDeptGroupArticles(Integer paramInteger, ArticleSearchForm paramArticleSearchForm, Page paramPage);
  
  void deleteDeptGroupPatient(Integer paramInteger, Long paramLong, String paramString);
  
  void addDeptGroupPatient(Integer paramInteger, Long paramLong, String paramString);
  
  Map<String, Object> findDeptGroupPatients(Integer paramInteger, PatientSearchForm paramPatientSearchForm, Page paramPage);
  
  Map<String, Object> findDeptGroupPatientMsgs(Integer paramInteger, Long paramLong, Page paramPage);
  
  void addDeptGroupPatientMsg(GrooupPatientMsgForm paramGrooupPatientMsgForm, String paramString);
  
  void deleteDeptGroupPatientMsg(Long paramLong, String paramString);
}
