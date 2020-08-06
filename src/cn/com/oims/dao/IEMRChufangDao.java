package cn.com.oims.dao;

import cn.com.oims.dao.pojo.DrugDict;
import cn.com.oims.dao.pojo.DrugStock;
import cn.com.oims.dao.pojo.EMRChufang;
import cn.com.oims.dao.pojo.EMRChufangQindan;
import cn.com.oims.web.form.CommonSerchForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;

public interface IEMRChufangDao extends BaseDao {
  List<EMRChufangQindan> findChufangQindanByJiuzhenId(Long paramLong);
  
  DrugDict getEMRDrugDict(Long paramLong);
  
  void updateEMRChufangQindan(EMRChufangQindan paramEMRChufangQindan);
  
  Long saveChufang(EMRChufang paramEMRChufang);
  
  List<EMRChufang> findChufangList(Long paramLong);
  
  int countChufangQindan(Long paramLong);
  
  void saveChufangQindan(EMRChufangQindan paramEMRChufangQindan);
  
  List<EMRChufangQindan> findChufangQindanByChufangId(Long paramLong);
  
  EMRChufang getChufang(Long paramLong);
  
  void updateChufang(EMRChufang paramEMRChufang);
  
  void deleteChufangQindan(EMRChufangQindan paramEMRChufangQindan);
  
  void deleteChufang(EMRChufang paramEMRChufang);
  
  void deleteChufangQindanAll(List<EMRChufangQindan> paramList);
  
  List<EMRChufangQindan> findChufangQindan(Long paramLong);
  
  List<DrugDict> findDrugDictList(Page paramPage, String paramString1, String paramString2, String paramString3);
  
  List<DrugStock> findDrugStockList(Long paramLong, boolean paramBoolean);
  
  DrugDict getEMRDrugDictByCode(String paramString);
  
  DrugStock getDrugStock(String paramString);
  
  void saveOrUpdateDrug(DrugStock paramDrugStock);
  
  DrugStock getDrugStockById(Long paramLong);
  
  List<EMRChufangQindan> findQINDANByJzAndYaoPin(Long paramLong1, Long paramLong2);
  
  List<DrugDict> findDrugDictPageList(Page paramPage, String paramString);
  
  List<Map<String, Object>> findDrugTJPageList(Page paramPage, CommonSerchForm paramCommonSerchForm);
  
  List<Object> findUseDocList(CommonSerchForm paramCommonSerchForm);
  
  List<Map<String, Object>> findZdByGh(CommonSerchForm paramCommonSerchForm, String paramString);
}
