package cn.com.oims.service;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.web.form.JcdExecuteForm;
import cn.com.oims.web.form.JcdSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IJcdService {
  String getJcdhstr(int paramInt);
  
  Jcd getJcdById(Serializable paramSerializable);
  
  Long getMaxJcdId();
  
  Serializable saveJcd(Jcd paramJcd);
  
  void delJcdById(Serializable paramSerializable);
  
  void saveOrUpdateJcd(Jcd paramJcd);
  
  void updateJcd(Jcd paramJcd);
  
  List<Jcd> findAllJcd();
  
  Map<String, Object> findAllJcd4Page(Page paramPage);
  
  boolean isBumenByIdToJcd(Integer paramInteger);
  
  boolean isYuanGongByGonghaoToJcd(String paramString);
  
  JcdExecuteForm getJcdExecuteFormByJcd(Jcd paramJcd);
  
  JcdExecuteForm getOneExcuteJcdByJcdid(String paramString1, int paramInt, String paramString2);
  
  List getExecuteJcdList(Page paramPage, String paramString, int paramInt, JcdSearchForm paramJcdSearchForm);
  
  List getJcdListByJcdSearchForm(Page paramPage, JcdSearchForm paramJcdSearchForm);
  
  List getJcdListByJcdSearchFormPaidui(Page paramPage, JcdSearchForm paramJcdSearchForm);
  
  List getDengJiJcdList(Page paramPage, String paramString, int paramInt, JcdSearchForm paramJcdSearchForm);
  
  List getJcdFileList(Long paramLong1, Long paramLong2, Long paramLong3, String paramString1, String paramString2);
  
  List getJcdPDFList(Long paramLong1, Long paramLong2, Long paramLong3, String paramString1, String paramString2);
  
  Map<String, Object> findJcdsByPageAndJcdAndHuanZheXinXi(Page paramPage, JcdSearchForm paramJcdSearchForm, HuanZheXinXi paramHuanZheXinXi, Integer paramInteger);
  
  List<Map> getHzxxJcsjList(Long paramLong, Integer paramInteger);
  
  List getListOfWatchJcdByJcdSearchForm(JcdSearchForm paramJcdSearchForm);
  
  List<Map> getHuanzheJcsjList(Long paramLong, Integer paramInteger);
  
  List getHuanzheJcjgList(String paramString1, String paramString2, String paramString3, Long paramLong, int paramInt, String paramString4);
  
  List getHuanzhePDFJcjgList(String paramString1, String paramString2, Long paramLong, int paramInt, String paramString3);
  
  List getFinishHuanzheJcxmListByHzid(Long paramLong);
  
  List getFinishHuanzheJcxmByHzidAndDateList(Long paramLong, String paramString);
  
  List getFinishHzxxJcxmByHzidAndDateList(Long paramLong, String paramString);
  
  List<Jcd> getJcdListByJcxmidAndDate(Long paramLong, Date paramDate, int paramInt);
  
  Jcd getJcdByHzidAndJiuzhenIdAndJcxmId(Long paramLong1, Long paramLong2, Integer paramInteger);
  
  JcdExecuteForm getOneWJCjcd(int paramInt1, int paramInt2);
  
  Map<String, Object> findJcdByPage(Page paramPage);
  
  Jcd getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(Long paramLong1, Long paramLong2, Integer paramInteger);
  
  void deleteJcd(Jcd paramJcd);
  
  List<Map<String, Object>> findJCDInfoByjcdhForCapture(String paramString);
  
  Jcd findJcdByJCDH(String paramString);
  
  List<Jcd> findJcdByHuanzheId(long paramLong);
  
  Map getTreatResult(String paramString);
}
