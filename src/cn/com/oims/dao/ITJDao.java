package cn.com.oims.dao;

import cn.com.oims.web.form.TJForm;
import cn.com.oims.web.form.TongJiForm;
import com.codesnet.common.Page;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface ITJDao {
  List<Map<String, Object>> chart(TJForm paramTJForm);
  
  List<Map<String, Object>> chartEx(TJForm paramTJForm);
  
  List<Map<String, Object>> list(TJForm paramTJForm, Page paramPage);
  
  List<Map<String, Object>> pro(TJForm paramTJForm);
  
  List<Map<String, Object>> findYuanGongByBumen(String paramString);
  
  List<Map<String, Object>> findSheBieByBumen(String paramString1, String paramString2);
  
  List<Map<String, Object>> groupJcdTypeByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupCheckDoctorByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupCheckJcxmByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupCheckDeviceByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupJcdStrateByTongJiForm(TongJiForm paramTongJiForm);
  
  int getPersonalMzQuantity(String paramString1, String paramString2, Date paramDate1, Date paramDate2);
  
  List<Map<String, Object>> getPersonalSsQuantity(String paramString, Date paramDate1, Date paramDate2);
}
