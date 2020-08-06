package cn.com.oims.service;

import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.web.form.HzjzForm;
import cn.com.oims.web.form.JiuZhenSearchform;
import cn.com.oims.web.form.MCForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public interface IJiuzhenService {
  Jiuzhen getJiuzhenById(Serializable paramSerializable);
  
  Serializable saveJiuzhen(Jiuzhen paramJiuzhen);
  
  void delJiuzhenById(Serializable paramSerializable);
  
  Serializable saveOrUpdateJiuzhen(Jiuzhen paramJiuzhen);
  
  void updateJiuzhen(Jiuzhen paramJiuzhen);
  
  List<Jiuzhen> findAllJiuzhen();
  
  Map<String, Object> findAllJiuzhen4Page(Page paramPage);
  
  List getJiuZhenHuanZheList(Page paramPage, JiuZhenSearchform paramJiuZhenSearchform);
  
  Long findJzcsByHuanzheId(Long paramLong, Integer paramInteger);
  
  List getPatientListToday(String paramString1, String paramString2, String paramString3, String paramString4);
  
  List getPatientStateCount(Integer paramInteger, String paramString);
  
  List getPatientListTodayByPage(String paramString1, String paramString2, Page paramPage, String paramString3, String paramString4);
  
  List getMedicalRecords(String paramString);
  
  List<Jzjl> getMC(String paramString1, String paramString2);
  
  String saveOrUpdateMC(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5);
  
  List getShiLiUrl(String paramString);
  
  List getYanGuangUrl(String paramString);
  
  List getStudyList(String paramString);
  
  List getYanYaUrl(String paramString);
  
  List getOnePatient(String paramString);
  
  List<Map<String, Object>> getShuruMoBan(String paramString);
  
  boolean isExistJiuZhenToHuanZheXinXi(Long paramLong);
  
  List<Map<String, Object>> getStudy(String paramString1, String paramString2);
  
  List<Map<String, Object>> getChangGuiList(String paramString);
  
  List<Map<String, Object>> getTeShuList(String paramString);
  
  List<Map<String, Object>> getTeShuListAll(String paramString);
  
  List getJiuZhenState(String paramString);
  
  List<Map<String, Object>> getZhenDuanList(String paramString);
  
  boolean saveJcdInfo(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5, String paramString6);
  
  boolean updateJiuZhenState(String paramString1, String paramString2, String paramString3);
  
  List<Map<String, Object>> getJiBingList(String paramString);
  
  boolean delZhenDuan(String paramString1, String paramString2);
  
  List<Map<String, Object>> matchJiBingName(String paramString);
  
  boolean saveZhenDuan(String paramString1, String paramString2, String paramString3, String paramString4);
  
  List<Map<String, Object>> getYanBieCategory(String paramString);
  
  Long saveOrUpdateMC(MCForm paramMCForm, String paramString);
  
  List<Map<String, Object>> getJiuZhenImage(String paramString);
  
  List<Map<String, Object>> getZhenDuanInfo(String paramString);
  
  List getJiBingIntrList(String paramString);
  
  Jiuzhen findLastJiuZhenByHuanZhe(Long paramLong);
  
  Long saveOrUpdateMC_New(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5, String paramString6);
  
  String getJcxmIntrUrl(String paramString);
  
  JiuZhenSearchform getJiuZhenByBlh(String paramString);
  
  List<Map<String, Object>> getDuiBiItemsInfoUrl(String paramString);
  
  List<Map<String, Object>> getCategoryInfoUrl(String paramString);
  
  List<Map<String, Object>> getHuaYanDanListUrl(String paramString);
  
  List<Map<String, Object>> getHuaYanDanDetailInfoUrl(String paramString);
  
  List<String> getSearchYaoPinNameUrl(String paramString);
  
  List<Map<String, Object>> getYaoPinInfoByNameUrl(String paramString);
  
  String saveChuFangInfoUrl(String paramString1, String paramString2, String paramString3, String paramString4);
  
  String delChuFangInfoUrl(String paramString);
  
  List<Map<String, Object>> getJiuZhenChuFangInfoUrl(String paramString);
  
  List<Map<String, Object>> getPrintBingLiDataUrl(String paramString);
  
  List<Map<String, Object>> getBingLiInfoUrl(String paramString1, String paramString2);
  
  List<Map<String, Object>> findOimsCategories(Integer paramInteger);
  
  Map<String, Object> getCategoryById(Integer paramInteger);
  
  Jiuzhen findAlljzjlByIDAndTimeAndGonghao(Long paramLong, Date paramDate, String paramString) throws DataAccessException, ParseException;
  
  List<Jiuzhen> findJiuzhenByHzidAndTimeGonghao(Long paramLong, Date paramDate, String paramString) throws DataAccessException, ParseException;
  
  Map<String, Object> getDoctorWorkstationIndexData(HzjzForm paramHzjzForm, String paramString);
  
  Jzjl getPatientMC(Jzjl paramJzjl);
  
  Jiuzhen findNextPatient(String paramString);
  
  boolean setPatientState(Long paramLong, Integer paramInteger);
  
  boolean isMyJiuzhen(String paramString, Long paramLong);
  
  void copyObjectJiuzhenInfo(Serializable paramSerializable, Long paramLong) throws IllegalAccessException, InvocationTargetException;
  
  void syncroPatientAndJiuzhen(String paramString1, String paramString2);
  
  List<Map<String, Object>> getPatientListFuChaByPage(String paramString1, String paramString2, Page paramPage, String paramString3, String paramString4, Integer paramInteger);
  
  Date stringToDate(String paramString);
  
  Date stringToDateTime(String paramString);
  
  Integer findJzByDoctorToday(String paramString, Long paramLong);
  
  Jiuzhen findLastJiuzhen(String paramString);
}
