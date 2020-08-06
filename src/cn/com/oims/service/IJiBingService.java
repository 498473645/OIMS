package cn.com.oims.service;

import cn.com.oims.dao.pojo.JiBing;
import cn.com.oims.web.form.JiBingSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IJiBingService {
  Map<String, Object> findAllJiBing4Page(Page paramPage, JiBingSearchForm paramJiBingSearchForm);
  
  void delJiBing(Serializable paramSerializable);
  
  Serializable saveJiBing(JiBing paramJiBing);
  
  void updateJiBing(JiBing paramJiBing);
  
  JiBing findJiBingById(Serializable paramSerializable);
  
  Map<String, Object> jiBingValidate(String paramString1, String paramString2);
  
  boolean isOkFather_Id(String paramString);
  
  boolean isOkIcd_Code(String paramString);
  
  Map<String, Object> jiBingValidate(String paramString1, String paramString2, Integer paramInteger);
  
  List<JiBing> findDiseasesByFather(Integer paramInteger);
  
  List<JiBing> compositeTemplateSearchDiseasesByPY(String paramString1, String paramString2);
  
  List<JiBing> findAllDiseases();
  
  List<JiBing> getDiseasesBySearch(String paramString);
  
  List<JiBing> findDiseaseByGonghao(String paramString1, Integer paramInteger, String paramString2);
  
  void delCategoryAndDiseaseById(Serializable paramSerializable);
  
  List<JiBing> findDiseasesByCategory(Integer paramInteger);
}
