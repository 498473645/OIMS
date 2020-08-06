package cn.com.oims.service;

import cn.com.oims.dao.pojo.MSG;
import cn.com.oims.web.form.MSGForm;
import cn.com.oims.web.form.MSGOutboxForm;
import cn.com.oims.web.form.MSGSearchForm;
import cn.com.oims.web.form.UserSearchForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;

public interface MSGService {
  void saveOrUpdateMSG(MSGForm paramMSGForm);
  
  void sendMSG(MSGOutboxForm paramMSGOutboxForm);
  
  Map<String, Object> findDraftBox(Page paramPage, MSGSearchForm paramMSGSearchForm);
  
  Map<String, Object> findInBox(Page paramPage, MSGSearchForm paramMSGSearchForm);
  
  Map<String, Object> findOutBox(Page paramPage, MSGSearchForm paramMSGSearchForm);
  
  Map<String, Object> findDeleteMSG(Page paramPage, MSGSearchForm paramMSGSearchForm);
  
  boolean deleteMSG(Long paramLong, boolean paramBoolean, HttpSession paramHttpSession);
  
  boolean recoverMSG(Long paramLong, String paramString);
  
  Object getObj(Class paramClass, Long paramLong);
  
  void delete(Object paramObject);
  
  Map<String, Object> getMSG(Long paramLong, String paramString);
  
  Map<String, Object> findUser(UserSearchForm paramUserSearchForm, Page paramPage);
  
  Map<String, Object> findMSG(Page paramPage, String paramString1, String paramString2);
  
  List<MSG> findTodayMSG(String paramString1, String paramString2);
  
  List<Map<String, Object>> findMSGUser(String paramString);
}
