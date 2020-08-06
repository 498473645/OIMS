package cn.com.oims.service;

import cn.com.oims.dao.pojo.OperationGroup;
import cn.com.oims.dao.pojo.OperationGroupMember;
import cn.com.oims.web.form.OperationGroupForm;
import cn.com.oims.web.form.OperationGroupMemberForm;
import cn.com.oims.web.form.OperationGroupSearchForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;
import java.util.Vector;

public interface IOperationDictService {
  OperationGroup saveOrUpdateOperationGroup(OperationGroupForm paramOperationGroupForm, String paramString);
  
  void deleteOperationGroup(String[] paramArrayOfString);
  
  Map<String, Object> findOperationGroupPageList(OperationGroupSearchForm paramOperationGroupSearchForm, Page paramPage);
  
  void saveOrUpdateGroupMember(OperationGroupMemberForm paramOperationGroupMemberForm, String paramString);
  
  List<OperationGroupMember> findGroupMemberList(String paramString);
  
  void saveOrUpdateGroupMembers(Vector<OperationGroupMemberForm> paramVector, String paramString);
  
  List<Map<String, Object>> findOperationGroupInforByGonghao(String paramString);
}
