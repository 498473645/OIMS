package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Paiban;
import java.util.Date;
import java.util.List;

public interface IPaibanDao extends BaseDao {
  List<Paiban> findPaibanValues(Date paramDate1, Date paramDate2, Integer paramInteger1, Integer paramInteger2, Integer paramInteger3);
  
  Long savePaiban(Paiban paramPaiban);
  
  void deletePaiban(Long paramLong);
  
  boolean paibanExist(Paiban paramPaiban);
}
