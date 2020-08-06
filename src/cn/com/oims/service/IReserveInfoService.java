package cn.com.oims.service;

import cn.com.oims.dao.pojo.ReserveInfo;
import cn.com.oims.web.form.RevInfoForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IReserveInfoService {
  ReserveInfo getReserveInfoById(Serializable paramSerializable);
  
  Serializable saveReserveInfo(ReserveInfo paramReserveInfo);
  
  void delReserveInfoById(Serializable paramSerializable);
  
  void saveOrUpdateReserveInfo(ReserveInfo paramReserveInfo);
  
  void updateReserveInfo(ReserveInfo paramReserveInfo);
  
  List<Map<String, Object>> findRevInfoByForm(Page paramPage, RevInfoForm paramRevInfoForm);
  
  int curReserveNumAm(Long paramLong, String paramString1, String paramString2);
  
  int curReserveNumPm(Long paramLong, String paramString1, String paramString2);
  
  String getWeiYueManYyDateByXmid(String paramString, Long paramLong);
}
