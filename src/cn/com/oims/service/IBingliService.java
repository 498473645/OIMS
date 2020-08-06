package cn.com.oims.service;

import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.web.form.BingliForm;
import cn.com.oims.web.form.HuanZheSearchExForm;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONObject;

public interface IBingliService {
  Map<String, Object> findBy(BingliForm paramBingliForm, Page paramPage);
  
  Map<String, Object> findByCategory(BingliForm paramBingliForm, Page paramPage);
  
  Map<String, Object> findEx(HuanZheSearchExForm paramHuanZheSearchExForm, Page paramPage);
  
  List<Map<String, Object>> findEx4Export(HuanZheSearchForm paramHuanZheSearchForm);
  
  List<Map<String, Object>> findByCategory4Exprot(Long paramLong);
  
  List<Map<String, Object>> findBy4Exprot(String paramString);
  
  Map<String, Object> findBySeach(BingliForm paramBingliForm, Page paramPage);
  
  Map<String, Object> findByCategory2(BingliForm paramBingliForm, Page paramPage);
  
  Map<String, Object> findBySeachEx(HuanZheSearchExForm paramHuanZheSearchExForm, Page paramPage);
  
  JSONObject getDiagnosisPatientInfo(String paramString);
  
  List<Jiuzhen> findJiuzhenListByPatientIdAndJibingId(Long paramLong, Integer paramInteger);
}
