package cn.com.oims.dao;

import cn.com.oims.dao.pojo.GroupMemberId;
import cn.com.oims.dao.pojo.OperationGroup;
import cn.com.oims.dao.pojo.OperationGroupMember;
import cn.com.oims.web.form.OperationGroupSearchForm;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface IOperationDictDao extends BaseDao {
  OperationGroup getOperationGroup(Integer paramInteger);
  
  void saveOrUpdate(Object paramObject);
  
  List<OperationGroup> findOperationGroupPageList(OperationGroupSearchForm paramOperationGroupSearchForm, Page paramPage);
  
  List<OperationGroupMember> findOperationGroupMemberByGroupId(Integer paramInteger);
  
  void deleteAll(Collection paramCollection);
  
  void delete(Object paramObject);
  
  OperationGroupMember getOperationGroupMember(GroupMemberId paramGroupMemberId);
  
  boolean groupIsUse(Integer paramInteger);
  
  void deleteMember(String paramString);
  
  List<OperationGroupMember> findOperationGroupMembersByGroupIds(String paramString);
  
  List<Map<String, Object>> findOperationGroupInforByGonghao(String paramString);
  
  void deleteOtherGroupThisYuanGong(Integer paramInteger, String paramString);
  
  Integer findDoctorLevelByGonghao(String paramString);
}
