package cn.com.oims.service;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.web.form.HuanZheForm;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IHuanZheXinXiService {
  Map<String, Object> findHuanZhe(HuanZheForm paramHuanZheForm, Page paramPage);
  
  void saveHuanZhe(HuanZheForm paramHuanZheForm);
  
  Serializable saveHuanZhe(HuanZheXinXi paramHuanZheXinXi);
  
  String updateHuanZhe(HuanZheForm paramHuanZheForm);
  
  void updateHuanZheXingXi(HuanZheXinXi paramHuanZheXinXi);
  
  String delHuanZhe(List<Long> paramList);
  
  String deleteHuanZheXinXiByHzid(Serializable paramSerializable);
  
  HuanZheXinXi findHuanZheById(Long paramLong);
  
  boolean isHuanZheXinXiExist(HuanZheXinXi paramHuanZheXinXi);
  
  HuanZheXinXi getHuanzhexinxiByExample(HuanZheXinXi paramHuanZheXinXi);
  
  List<Map<String, Object>> getHuanZheXinXiListByPage(Page paramPage, HuanZheSearchForm paramHuanZheSearchForm);
  
  List<Map<String, Object>> findHuanZheToExaminedByPageList(Page paramPage, HuanZheSearchForm paramHuanZheSearchForm);
  
  List<Map<String, Object>> getHuanZheXinXiListByCondition(HuanZheSearchForm paramHuanZheSearchForm, String paramString);
  
  HuanZheXinXi getHuanZheXinXiBySearch(String paramString);
  
  List<HuanZheXinXi> getHuanZheXinXiListBySearch(String paramString);
  
  Long getOneExamedHzId();
  
  HuanZheXinXi getHuanzhexinxiByBLH(String paramString);
  
  Map<String, Object> getHuanZheXinXiMapByBLH(String paramString);
}
