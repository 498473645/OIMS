package cn.com.oims.dao;

import cn.com.oims.dao.pojo.OutpOrders;
import java.util.Date;
import java.util.List;

public interface IOutpOrdersDao {
  void save(Object paramObject);
  
  void saveOrUpdate(Object paramObject);
  
  void delete(Object paramObject);
  
  List<OutpOrders> getOutpOrdersByPatient(Date paramDate, String paramString);
}
