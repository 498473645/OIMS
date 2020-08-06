package cn.com.oims.dao;

import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.web.form.BuMenSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public interface IBuMenDao extends BaseDao {
  int counts();
  
  List<BuMen> findAllBuMen();
  
  void delBuMen(Serializable paramSerializable);
  
  Serializable saveBuMen(BuMen paramBuMen);
  
  void saveOrUpdateBuMen(BuMen paramBuMen);
  
  void updateBuMen(BuMen paramBuMen);
  
  BuMen findBuMenById(Serializable paramSerializable);
  
  List getBumenList(Page paramPage, BuMenSearchForm paramBuMenSearchForm);
  
  BuMen getBuMenByName(String paramString);
  
  List findBuMenByBanGongShiID(Serializable paramSerializable);
  
  List<Map<String, Object>> getBuMenListInfo(BuMenSearchForm paramBuMenSearchForm);
  
  List<BuMen> getShebeiList(BuMen paramBuMen);
  
  BuMen getBuMenByBmbm(String paramString);
  
  BuMen getBuMenById(Integer paramInteger);
}
