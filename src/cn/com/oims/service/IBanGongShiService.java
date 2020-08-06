package cn.com.oims.service;

import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.web.form.BanGongShiSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IBanGongShiService {
  BanGongShi getBanGongShiById(Serializable paramSerializable);
  
  BanGongShi findBanGongShiByBgs(String paramString);
  
  Serializable saveBanGongShi(BanGongShi paramBanGongShi);
  
  void delBanGongShiById(Serializable paramSerializable);
  
  void saveOrUpdateBanGongShi(BanGongShi paramBanGongShi);
  
  void updateBanGongShi(BanGongShi paramBanGongShi);
  
  List<BanGongShi> findAllBanGongShi();
  
  Map<String, Object> findAllBanGongShi4Page(Page paramPage, BanGongShiSearchForm paramBanGongShiSearchForm);
  
  int findBangongshiId(String paramString);
  
  List findAllBanGongShiByBuMenID(int paramInt);
  
  List findBuMenByBanGongShiID(int paramInt);
  
  Boolean getValidate(String paramString);
}
