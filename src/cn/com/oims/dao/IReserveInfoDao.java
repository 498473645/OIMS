package cn.com.oims.dao;

import cn.com.oims.dao.pojo.ReserveInfo;
import cn.com.oims.web.form.RevInfoForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IReserveInfoDao {
  Serializable saveReserveInfo(ReserveInfo paramReserveInfo);
  
  void updateReserveInfo(ReserveInfo paramReserveInfo);
  
  void delReserveInfoById(Serializable paramSerializable);
  
  ReserveInfo getReserveInfoById(Serializable paramSerializable);
  
  void saveOrUpdateReserveInfo(ReserveInfo paramReserveInfo);
  
  int curReserveNumAm(Long paramLong, String paramString1, String paramString2);
  
  int curReserveNumPm(Long paramLong, String paramString1, String paramString2);
  
  List<Map<String, Object>> findRevInfoByForm(Page paramPage, RevInfoForm paramRevInfoForm);
}
