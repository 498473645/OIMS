package cn.com.oims.service;

import cn.com.oims.common.XLSHead;
import cn.com.oims.web.form.BlTjForm;
import cn.com.oims.web.form.DiseaseForm;
import cn.com.oims.web.form.HzTjForm;
import cn.com.oims.web.form.TJForm;
import cn.com.oims.web.form.TongJiForm;
import com.codesnet.common.Page;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Vector;

public interface ITJService {
  List<Map<String, Object>> chart(TJForm paramTJForm);
  
  List<Map<String, Object>> chartEx(TJForm paramTJForm);
  
  Map<String, Object> list(TJForm paramTJForm, Page paramPage);
  
  List<Map<String, Object>> pro(TJForm paramTJForm);
  
  Vector<XLSHead> headVector(TJForm paramTJForm);
  
  List<Map<String, Object>> findSheBieByBumen(String paramString1, String paramString2);
  
  List<Map<String, Object>> findYuanGongByBumen(String paramString);
  
  List<Map<String, Object>> tjBaoGaoNumByDoctor(TongJiForm paramTongJiForm);
  
  Map<String, Object> tjBaoGaoNumByJcxm(TongJiForm paramTongJiForm);
  
  Map<String, Object> tjBaoGaoNumAndJcxm(TongJiForm paramTongJiForm);
  
  void expBaoGaoCountByTongJiForm(String paramString1, String paramString2, TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> tjJiuZhenNumByTongJi(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> tjBLFinishNumByTongJi(TongJiForm paramTongJiForm);
  
  void exportMzysExecel(String paramString, TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupJcdStrateByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupJcdTypeByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupCheckDoctorByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupCheckJcxmByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupCheckDeviceByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> tjDiseaseByDiseaseForm(DiseaseForm paramDiseaseForm);
  
  List<Map<String, Object>> tjXingBieByJiBingId(String paramString);
  
  List<Map<String, Object>> tjdrugDictByJiBingId(String paramString);
  
  List<Map<String, Object>> tjJiuZhenAgeByJiBingId(String paramString, List<Map<String, Object>> paramList);
  
  List<Map<String, Object>> tjHuanZheXinXiByHzTjForm(HzTjForm paramHzTjForm);
  
  List<List<String>> showWenZhenByBlTjForm(BlTjForm paramBlTjForm);
  
  void exportWenZhenExcel(String paramString, BlTjForm paramBlTjForm);
  
  List<List<String>> showZKJCByBlTjForm(BlTjForm paramBlTjForm);
  
  void exportZKJCExcel(String paramString, BlTjForm paramBlTjForm);
  
  List<List<String>> showJzZhenDuanByBlTjForm(BlTjForm paramBlTjForm);
  
  void exportJzZhenDuanExcel(String paramString, BlTjForm paramBlTjForm);
  
  List<List<String>> showChuZhiByBlTjForm(BlTjForm paramBlTjForm);
  
  void exportChuZhiExcel(String paramString, BlTjForm paramBlTjForm);
  
  Map<String, Object> tjPersonalTJ(String paramString, Date paramDate1, Date paramDate2);
  
  void exportMzysExecel(String paramString1, String paramString2, String paramString3);
}
