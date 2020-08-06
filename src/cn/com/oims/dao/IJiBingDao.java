package cn.com.oims.dao;

import cn.com.oims.dao.pojo.JiBing;
import cn.com.oims.web.form.DiseaseForm;
import cn.com.oims.web.form.JiBingSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public interface IJiBingDao extends BaseDao {
  int counts();
  
  List<JiBing> findAllJiBing4Page(Page paramPage, JiBingSearchForm paramJiBingSearchForm);
  
  void delJiBing(Serializable paramSerializable);
  
  Serializable saveJiBing(JiBing paramJiBing);
  
  void updateJiBing(JiBing paramJiBing);
  
  JiBing findJiBingById(Serializable paramSerializable);
  
  List<JiBing> findAllJiBing();
  
  List<JiBing> findDiseaseByFather(Integer paramInteger);
  
  List<JiBing> findDiseaseByCategory(Integer paramInteger);
  
  List<JiBing> compositeTemplateSearchDiseasesByPY(String paramString1, String paramString2);
  
  List<JiBing> getDiseasesBySearch(String paramString);
  
  List<JiBing> findDiseases(String paramString1, String paramString2, String paramString3);
  
  List<Map<String, Object>> tjDiseaseTop10ByDiseaseForm(DiseaseForm paramDiseaseForm);
  
  long tjDiseaseOtherByDiseaseForm(String paramString, DiseaseForm paramDiseaseForm);
  
  boolean jibingExists(String paramString);
  
  boolean jibingIsUse(Serializable paramSerializable);
}
