package cn.com.oims.dao;

import cn.com.oims.dao.pojo.MSG;
import cn.com.oims.dao.pojo.MSGAttachment;
import cn.com.oims.dao.pojo.MSGInbox;
import cn.com.oims.dao.pojo.MSGOutbox;
import cn.com.oims.dao.pojo.MSGReceiver;
import cn.com.oims.web.form.MSGSearchForm;
import cn.com.oims.web.form.UserSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface MSGDao extends BaseDao {
  Object getObj(Class paramClass, Serializable paramSerializable);
  
  void saveOrUpdate(Object paramObject);
  
  boolean msgReceiverExists(Long paramLong, String paramString1, String paramString2);
  
  List<MSGReceiver> findMSGReceivers(Long paramLong);
  
  void deleteCollection(Collection paramCollection);
  
  List<MSG> findDraftBox(Page paramPage, MSGSearchForm paramMSGSearchForm);
  
  List<MSG> findInBox(Page paramPage, MSGSearchForm paramMSGSearchForm);
  
  List<MSG> findOutBox(Page paramPage, MSGSearchForm paramMSGSearchForm);
  
  List<MSG> findDeleteMSG(Page paramPage, MSGSearchForm paramMSGSearchForm);
  
  void deleteObj(Object paramObject);
  
  MSGOutbox getMSGOutbox(String paramString, Long paramLong);
  
  MSGOutbox getMSGOutboxByid(Long paramLong);
  
  MSGInbox getMSGInbox(String paramString, Long paramLong);
  
  MSGInbox getMSGInboxByid(Long paramLong);
  
  boolean msgExistsInOutbox(Long paramLong);
  
  boolean msgExistsInInbox(Long paramLong);
  
  List<MSGAttachment> findMSGAttachment(Long paramLong);
  
  List<Map<String, Object>> findUser(UserSearchForm paramUserSearchForm, Page paramPage);
  
  List<MSG> findMSG(Page paramPage, String paramString1, String paramString2);
  
  List<MSG> findTodayMSG(String paramString1, String paramString2);
  
  List<Map<String, Object>> findMSGUserList(String paramString);
}
