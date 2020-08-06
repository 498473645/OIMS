package cn.com.oims.service;

import cn.com.oims.dao.pojo.DrugDict;
import cn.com.oims.dao.pojo.DrugStock;
import cn.com.oims.dao.pojo.EMRChufangQindan;
import cn.com.oims.web.form.CommonSerchForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;
import javax.jws.WebService;

@WebService
public interface IEMRChufangService {
  List<Long> saveChufang(List<EMRChufangQindan> paramList, Long paramLong1, Long paramLong2, String paramString);
  
  List<Map<String, Object>> findEMRChufang(Long paramLong);
  
  void deleteChufangAll(Long paramLong);
  
  List<Map<String, Object>> findEMRChufangQindan(Long paramLong);
  
  List<DrugDict> findDrugDictList(Page paramPage, Integer paramInteger, String paramString1, String paramString2);
  
  DrugDict getDrugDictInfo(Long paramLong);
  
  List<DrugStock> findDrugStockList(Long paramLong);
  
  void syncDrug();
  
  List<Long> deleteChufangQindan(List<EMRChufangQindan> paramList);
  
  List<EMRChufangQindan> findQINDANByJzAndYaoPin(Long paramLong1, Long paramLong2);
  
  Map<String, Object> findDrugDictPageList(Page paramPage, String paramString);
  
  Map<String, Object> findDrugTJPageList(Page paramPage, CommonSerchForm paramCommonSerchForm);
  
  Map<String, Object> findUseDocList(CommonSerchForm paramCommonSerchForm);
  
  void updateDrugUse(Long paramLong);
  
  DrugStock getDrugStockById(Long paramLong);
}
