package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.JzZhenduan;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.web.form.BlTjForm;
import cn.com.oims.web.form.JiuZhenSearchform;
import cn.com.oims.web.form.TongJiForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

@Component
public interface IJiuzhenDao extends BaseDao {
  int counts();
  
  List<Jiuzhen> findAllJiuzhen4Page(Page paramPage);
  
  List<Jiuzhen> findAllJiuzhen();
  
  void delJiuzhen(Serializable paramSerializable);
  
  Serializable saveJiuzhen(Jiuzhen paramJiuzhen);
  
  void saveOrUpdateJiuzhen(Jiuzhen paramJiuzhen);
  
  void updateJiuzhen(Jiuzhen paramJiuzhen);
  
  Jiuzhen findJiuzhenById(Serializable paramSerializable);
  
  List getJiuZhenHuanZheList(Page paramPage, JiuZhenSearchform paramJiuZhenSearchform);
  
  int getJiuZhenTime(Long paramLong, int paramInt);
  
  Long findJzcsByHuanzheId(Long paramLong, Integer paramInteger);
  
  List getPatientListToday(String paramString1, String paramString2, String paramString3, String paramString4);
  
  List getPatientStateCount(Integer paramInteger, String paramString);
  
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
  
  List getJiuZhenState(String paramString);
  
  List<Map<String, Object>> getZhenDuanList(String paramString);
  
  String saveJcdInfo(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5, String paramString6, String paramString7, String paramString8, String paramString9);
  
  boolean updateJiuZhenState(String paramString1, String paramString2, String paramString3);
  
  List<Map<String, Object>> getJiBingList(String paramString);
  
  boolean delZhenDuan(Integer paramInteger, String paramString);
  
  List<Map<String, Object>> matchJiBingName(String paramString);
  
  boolean saveZhenDuan(Integer paramInteger, String paramString1, String paramString2, String paramString3);
  
  List<Map<String, Object>> getYanBieCategory(String paramString);
  
  List<Map<String, Object>> getJiuZhenImage(String paramString);
  
  List<Map<String, Object>> getZhenDuanInfo(String paramString);
  
  List getJiBingIntrList(String paramString);
  
  String getOfficeId(String paramString);
  
  String getMaxPaiDuiXuHao();
  
  boolean addPaiDuiInfo(String paramString1, String paramString2, int paramInt);
  
  List getPatientListTodayByPage(String paramString1, String paramString2, Page paramPage, String paramString3, String paramString4);
  
  Jiuzhen findLastJiuZhenByHuanZhe(Long paramLong);
  
  Long saveOrUpdateMC_New(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5, String paramString6);
  
  String getJcxmIntrUrl(String paramString);
  
  List<Map<String, Object>> getTeShuListAll(String paramString);
  
  List getJiuZhenByBlh(String paramString);
  
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
  
  int getMinVisitNoOfCurrentDate(Date paramDate);
  
  List<Jiuzhen> getAlljzjlByIDAndTimeAndGonghao(Long paramLong, Date paramDate, String paramString) throws DataAccessException, ParseException;
  
  List<Jiuzhen> findJiuzhenList(Long paramLong, String paramString);
  
  Jiuzhen getPrevJiuzhen(Long paramLong1, Long paramLong2);
  
  Jiuzhen findNextPatient(String paramString);
  
  int getJiuzhenTodayCount();
  
  Jiuzhen findJiuzhenByHaoma(String paramString);
  
  List<JzZhenduan> findJzZhenList(Long paramLong);
  
  List<Map<String, Object>> findJzZhenduanList(Long paramLong);
  
  List<Map<String, Object>> groupDoctorByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupJieZhenNumByTongJiForm(TongJiForm paramTongJiForm);
  
  Long groupBLFinish(TongJiForm paramTongJiForm);
  
  Long groupJiuZhen(TongJiForm paramTongJiForm, Integer paramInteger);
  
  List<Map<String, Object>> groupJiuZhenFzysByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> tjXingBieByJiBingId(String paramString);
  
  List<Map<String, Object>> tjdrugDictTop10ByJiBingId(String paramString);
  
  long tjdrugDictOtherByJiBingId(String paramString1, String paramString2);
  
  long getCountByJiBingIdAndJiuZhenAge(String paramString1, String paramString2, String paramString3);
  
  boolean validateVisit(String paramString1, String paramString2, Date paramDate);
  
  List getPatientListFuChaByPage(String paramString1, String paramString2, Page paramPage, String paramString3, String paramString4, Integer paramInteger);
  
  List<Map<String, Object>> findPatientList(String paramString1, Integer[] paramArrayOfInteger, String paramString2, Date paramDate1, Date paramDate2, Page paramPage);
  
  Integer findJzByDoctorToday(String paramString, Long paramLong);
  
  Jiuzhen findLastJiuzhen(String paramString);
  
  List<Map<String, Object>> tjfinishStateByCateogryId(String paramString, BlTjForm paramBlTjForm);
  
  Integer getJzjlNumByCategoryId(String paramString, BlTjForm paramBlTjForm);
  
  Integer getJiuZhenNumByCategoryId(BlTjForm paramBlTjForm);
  
  Integer getShiLiNumByTlTjForm(BlTjForm paramBlTjForm);
  
  Integer getYanYaNumByTlTjForm(BlTjForm paramBlTjForm);
  
  Integer getJzZhenNumDuanByTlTjForm(BlTjForm paramBlTjForm);
  
  Integer getSuifangNumDuanByTlTjForm(BlTjForm paramBlTjForm);
  
  List<Jiuzhen> findFZJiuzhenList(Long paramLong, String paramString);
}
