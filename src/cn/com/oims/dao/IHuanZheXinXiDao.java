package cn.com.oims.dao;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.web.form.HuanZheSearchForm;
import cn.com.oims.web.form.HzTjForm;
import cn.com.oims.web.form.PatientSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IHuanZheXinXiDao {
  List<Map<String, Object>> findHuanZhe4Page(String paramString1, String paramString2, Page paramPage);
  
  Serializable saveHuanZhe(HuanZheXinXi paramHuanZheXinXi);
  
  void updateHuanZhe(HuanZheXinXi paramHuanZheXinXi);
  
  void delHuanZhe(List<Long> paramList);
  
  void delHuanZheXinXi(Serializable paramSerializable);
  
  void delHuanZheXinXi(HuanZheXinXi paramHuanZheXinXi);
  
  HuanZheXinXi findHuanZheById(Long paramLong);
  
  String findMaxBinglihao();
  
  List<Map<String, Object>> findHuanZheByBingLiHao(String paramString);
  
  HuanZheXinXi getPatientById(Long paramLong);
  
  List<Map<String, Object>> findPatients(Page paramPage, PatientSearchForm paramPatientSearchForm);
  
  boolean isHuanZheXinXiExist(HuanZheXinXi paramHuanZheXinXi);
  
  HuanZheXinXi getHuanzhexinxiByExample(HuanZheXinXi paramHuanZheXinXi);
  
  List<Map<String, Object>> getHuanZheXinXiListByPage(Page paramPage, HuanZheSearchForm paramHuanZheSearchForm);
  
  List<Map<String, Object>> findHuanZheToExaminedByPageList(Page paramPage, HuanZheSearchForm paramHuanZheSearchForm);
  
  List<Map<String, Object>> getHuanZheXinXiListByCondition(HuanZheSearchForm paramHuanZheSearchForm, String paramString);
  
  HuanZheXinXi getHuanzhexinxiBySFZH(String paramString);
  
  HuanZheXinXi getHuanzhexinxiByBLH(String paramString);
  
  List<HuanZheXinXi> getHuanZheXinXiListBySearch(String paramString);
  
  Long getOneExamedHzId();
  
  String findMaxXiaoErBinglihao(String paramString);
  
  Map<String, Object> getHuanZheXinXiMapByBLH(String paramString);
  
  void evictHibernateTemplate(Object paramObject);
  
  Long getHzxxCountByHzTjForm(HzTjForm paramHzTjForm);
}
