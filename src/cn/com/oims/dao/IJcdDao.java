package cn.com.oims.dao;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.web.form.JcdSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public interface IJcdDao extends BaseDao {
  int counts();
  
  List<Jcd> findAllJcd4Page(Page paramPage);
  
  List<Jcd> findAllJcd();
  
  void delJcd(Serializable paramSerializable);
  
  Serializable saveJcd(Jcd paramJcd);
  
  void saveOrUpdateJcd(Jcd paramJcd);
  
  void updateJcd(Jcd paramJcd);
  
  Jcd findJcdById(Serializable paramSerializable);
  
  Long getMaxJcdId();
  
  boolean isBumenByIdToJcd(Integer paramInteger);
  
  boolean isYuanGongByGonghaoToJcd(String paramString);
  
  List getOneExcuteJcdByJcdid(String paramString1, int paramInt, String paramString2);
  
  List getExecuteJcdNoPaiduiList(Page paramPage, String paramString, JcdSearchForm paramJcdSearchForm);
  
  List getExecuteJcdList(Page paramPage, String paramString, int paramInt, JcdSearchForm paramJcdSearchForm);
  
  List getJcdListByJcdSearchForm(Page paramPage, JcdSearchForm paramJcdSearchForm);
  
  List getJcdListByJcdSearchFormPaidui(Page paramPage, JcdSearchForm paramJcdSearchForm);
  
  List getListOfWatchJcdByJcdSearchForm(JcdSearchForm paramJcdSearchForm);
  
  List getDengJiJcdList(Page paramPage, String paramString, int paramInt, JcdSearchForm paramJcdSearchForm);
  
  List findJcdsByPageAndJcdAndHuanZheXinXi(Page paramPage, JcdSearchForm paramJcdSearchForm, HuanZheXinXi paramHuanZheXinXi, Integer paramInteger);
  
  List<String> getHzxxJcsjList(Long paramLong, Integer paramInteger);
  
  List<String> getHuanzheJcsjList(Long paramLong, Integer paramInteger);
  
  List getHuanzheJcdList(Long paramLong, int paramInt, String paramString);
  
  List<Jcxm> getFinishHuanzheJcxmListByHzid(Long paramLong);
  
  List<Jcxm> getFinishHuanzheJcxmByHzidAndDateList(Long paramLong, String paramString);
  
  List getFinishHzxxJcxmByHzidAndDateList(Long paramLong, String paramString);
  
  List<Jcd> getJcdListByJcxmidAndDate(Long paramLong, Date paramDate, int paramInt);
  
  List<Jcd> getJcdByHzidAndJiuzhenIdAndJcxmId(Long paramLong1, Long paramLong2, Integer paramInteger);
  
  List getOneWJCjcd(int paramInt1, int paramInt2);
  
  List findJCDByPage(Page paramPage);
  
  List<Jcd> getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(Long paramLong1, Long paramLong2, Integer paramInteger);
  
  void deleteJcd(Jcd paramJcd);
  
  List<Map<String, Object>> findJCDInfoByjcdhForCapture(String paramString);
  
  Jcd findJcdByJCDH(String paramString);
  
  int getTodayJcdCount();
  
  List<Jcd> findJcdByJcd(Long paramLong, String paramString);
  
  List<Jcd> findJcdByHuanzheId(long paramLong);
}
