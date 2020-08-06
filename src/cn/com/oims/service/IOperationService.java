package cn.com.oims.service;

import cn.com.oims.dao.pojo.Operation;
import cn.com.oims.dao.pojo.OperationConsumable;
import cn.com.oims.dao.pojo.OperationDict;
import cn.com.oims.web.form.OperationApplicationForm;
import cn.com.oims.web.form.OperationAppointmentForm;
import cn.com.oims.web.form.OperationConsumableForm;
import cn.com.oims.web.form.OperationConsumableSearchForm;
import cn.com.oims.web.form.OperationPlanForm;
import cn.com.oims.web.form.OperationRecordForm;
import cn.com.oims.web.form.OperationSearchForm;
import cn.com.oims.web.form.OperationShowForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;
import java.util.Vector;

public interface IOperationService {
  void saveOrUpdateOperationDict(OperationDict paramOperationDict);
  
  List<OperationDict> findOperationDictList(String paramString, Page paramPage);
  
  void deleteOperationDict(Integer paramInteger);
  
  void saveOrUpdateOperation(OperationAppointmentForm paramOperationAppointmentForm, String paramString);
  
  Map<String, Object> findOperationList(Page paramPage, OperationSearchForm paramOperationSearchForm);
  
  void deleteOperation(Long paramLong);
  
  Operation getOperation(Long paramLong);
  
  OperationDict getOperationDict(Integer paramInteger);
  
  void saveOrUpdateOperationApplication(OperationApplicationForm paramOperationApplicationForm, String paramString);
  
  void saveOrUpdateOperationPlan(OperationPlanForm paramOperationPlanForm, String paramString);
  
  Map<String, Object> getOperationMap(String paramString);
  
  void saveOrUpdateOperationRecord(OperationRecordForm paramOperationRecordForm, String paramString);
  
  Map<String, Object> showOperationMap(OperationShowForm paramOperationShowForm);
  
  void setOperationProcessState(Long[] paramArrayOfLong, Integer paramInteger, String paramString);
  
  List<OperationConsumable> findOperationConsumable(Long paramLong);
  
  void saveOrUpdateOperationConsumable(Long paramLong, Boolean paramBoolean, Vector<OperationConsumableForm> paramVector, String paramString);
  
  Map<String, Object> findOperationConsumablePageList(OperationConsumableSearchForm paramOperationConsumableSearchForm, Page paramPage);
  
  List<Map<String, Object>> findOperationList(OperationSearchForm paramOperationSearchForm);
  
  String getOperationSizeTitle(Integer paramInteger);
  
  String getAnesthesiaName(Integer paramInteger);
}
