package cn.com.oims.dao;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.web.form.BingliForm;
import cn.com.oims.web.form.HuanZheSearchExForm;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;

public interface IBingliDao {
  List<HuanZheXinXi> findByXmOrBl(BingliForm paramBingliForm, Page paramPage);
  
  List<HuanZheXinXi> findByZd(BingliForm paramBingliForm, Page paramPage);
  
  List<HuanZheXinXi> findByZdId(BingliForm paramBingliForm, Page paramPage);
  
  List<Map<String, Object>> findJzCs(List<HuanZheXinXi> paramList);
  
  String getLastCategory(Long paramLong);
  
  List<HuanZheXinXi> findEx(List<Long> paramList, Page paramPage);
  
  List<Map<String, Object>> findByCategory4Exprot(Long paramLong);
  
  List<Map<String, Object>> findBy4Exprot(String paramString);
  
  List<Map<String, Object>> findHuanZheBySearchForm(HuanZheSearchForm paramHuanZheSearchForm);
  
  List<Map<String, Object>> getHuanZheXinXiListByPage(Page paramPage, HuanZheSearchExForm paramHuanZheSearchExForm);
  
  List<Map<String, Object>> findBySeach(BingliForm paramBingliForm, Page paramPage);
  
  List<Map<String, Object>> findByCategory2(BingliForm paramBingliForm, Page paramPage);
  
  List<Map<String, Object>> findBySeachEx(HuanZheSearchExForm paramHuanZheSearchExForm, Page paramPage);
  
  Jiuzhen getDiagnosisPatientVisitInfo(String paramString);
  
  List<Map<String, Object>> findPatientZhenduan(Long paramLong);
  
  List<Jiuzhen> findPatientJiuzheByJiBingId(Long paramLong, Integer paramInteger);
  
  List<Map<String, Object>> findBySeachOld(BingliForm paramBingliForm, Page paramPage);
}
