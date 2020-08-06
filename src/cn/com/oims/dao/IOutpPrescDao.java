package cn.com.oims.dao;

import cn.com.oims.dao.pojo.OutpPresc;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IOutpPrescDao {
  void save(Object paramObject);
  
  void saveOrUpdate(Object paramObject);
  
  void delete(Object paramObject);
  
  List<OutpPresc> getOutpPrescs(Date paramDate, String paramString);
  
  List<OutpPresc> getOutpPrescsByOrderId(Long paramLong);
  
  Map<String, Object> getPrescInfo(Date paramDate, String paramString);
}
