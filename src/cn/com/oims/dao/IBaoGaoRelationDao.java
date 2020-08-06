package cn.com.oims.dao;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.web.form.TongJiForm;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public interface IBaoGaoRelationDao {
  Serializable saveBaoGaoRelation(BaoGaoRelation paramBaoGaoRelation);
  
  void updateBaoGaoRelation(BaoGaoRelation paramBaoGaoRelation);
  
  List<BaoGaoRelation> getBaoGaoRelationByJcdId(String paramString);
  
  BaoGaoRelation getBaoGaoRelationById(Long paramLong);
  
  List<BaoGaoRelation> getBaoGaoRelationsByBaoGaoRelation(BaoGaoRelation paramBaoGaoRelation);
  
  List<BaoGaoRelation> getBaoGaoRelationByTongJiForm(TongJiForm paramTongJiForm);
  
  List groupBaoGaoRelationByTongJiForm(TongJiForm paramTongJiForm, String paramString);
  
  List<Map<String, Object>> groupDoctorByTongJiForm(TongJiForm paramTongJiForm);
  
  Long getCountByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupJcxmByTongJiForm(TongJiForm paramTongJiForm);
  
  List<Map<String, Object>> groupYuanGongByTongJiForm(TongJiForm paramTongJiForm);
  
  Long getBaoGaoCountByProperties(TongJiForm paramTongJiForm);
  
  Long getBaoGaoCountByProperties(String paramString, TongJiForm paramTongJiForm);
  
  void deleteBaogaoRelationByJcdId(Long paramLong);
  
  List<BaoGaoRelation> getBaoGaoRelation(Long paramLong, String paramString);
}
