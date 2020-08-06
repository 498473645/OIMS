package cn.com.oims.service;

import cn.com.oims.dao.pojo.Paiban;
import cn.com.oims.web.form.PaibanForm;
import java.util.Date;
import java.util.List;

public interface IPaibanService {
  List<Paiban> findPaibanValues(Date paramDate1, Date paramDate2, Integer paramInteger1, Integer paramInteger2, Integer paramInteger3);
  
  Long savePaiban(PaibanForm paramPaibanForm);
  
  void deletePaiban(Long paramLong);
}
