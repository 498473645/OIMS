package cn.com.oims.dao;

import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.web.form.BanGongShiSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IBanGongShiDao extends BaseDao {
  int counts();
  
  List findAllBanGongShi4Page(Page paramPage, BanGongShiSearchForm paramBanGongShiSearchForm);
  
  List<BanGongShi> findAllBanGongShi();
  
  void delBanGongShi(Serializable paramSerializable);
  
  BanGongShi findBangongshiId(String paramString);
  
  BanGongShi findBanGongShiByBgs(String paramString);
  
  Serializable saveBanGongShi(BanGongShi paramBanGongShi);
  
  void saveOrUpdateBanGongShi(BanGongShi paramBanGongShi);
  
  void updateBanGongShi(BanGongShi paramBanGongShi);
  
  BanGongShi findBanGongShiById(Serializable paramSerializable);
  
  List findAllBanGongShiByOfficeID(String paramString);
  
  BanGongShi findBanGongShiByBgsBm(String paramString);
}
