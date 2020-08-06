package cn.com.oims.service;

import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.web.form.BuMenSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IBuMenService {
  BuMen getBuMenById(Serializable paramSerializable);
  
  Serializable saveBuMen(BuMen paramBuMen);
  
  void delBuMenById(Serializable paramSerializable);
  
  void saveOrUpdateBuMen(BuMen paramBuMen);
  
  void updateBuMen(BuMen paramBuMen);
  
  List<BuMen> findAllBuMen();
  
  List getBumenList(Page paramPage, BuMenSearchForm paramBuMenSearchForm);
  
  BuMen GetBuMenByName(String paramString);
  
  List<Map<String, Object>> getBuMenList(BuMenSearchForm paramBuMenSearchForm);
  
  List<BuMen> getShebeiList(BuMen paramBuMen);
  
  Map<String, Object> bumenValidate(String paramString1, String paramString2);
}
