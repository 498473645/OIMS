package cn.com.oims.dao;

import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.EMRJcxmFushu;
import cn.com.oims.dao.pojo.EMRJcxmZhixingkeshi;
import cn.com.oims.dao.pojo.EMRLisJcxmSample;
import cn.com.oims.dao.pojo.EMRLisSample;
import cn.com.oims.dao.pojo.Jcxm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IJcxmDao extends BaseDao {
  int counts();
  
  List<Jcxm> findAllJcxm4Page(Page paramPage);
  
  List<Jcxm> findAllJcxm(String paramString1, String paramString2, Page paramPage);
  
  void delJcxm(Serializable paramSerializable);
  
  Serializable saveJcxm(Jcxm paramJcxm);
  
  void saveOrUpdateJcxm(Jcxm paramJcxm);
  
  void updateJcxm(Jcxm paramJcxm);
  
  Jcxm findJcxmById(Serializable paramSerializable);
  
  List findJcxmsByPageAndJcxm(Page paramPage, Jcxm paramJcxm);
  
  List<Jcxm> findJcxmByCategory(Serializable paramSerializable);
  
  List<Jcxm> getJcxmListByBmid(int paramInt);
  
  List<Jcxm> findJcxmsByJcxm(Jcxm paramJcxm);
  
  List<Jcxm> findJcxmsByIds(String paramString);
  
  List<Jcxm> getJcxmListByBgsId(int paramInt);
  
  Jcxm getJcxmByBianma(String paramString);
  
  void deleteJcxmFushu(List<EMRJcxmFushu> paramList);
  
  EMRJcxmFushu getEMRJcxmFushu(String paramString);
  
  void saveOrUpdateEMRJcxmFushu(EMRJcxmFushu paramEMRJcxmFushu);
  
  List<EMRJcxmFushu> findEMRJcxmFushu(Integer paramInteger);
  
  List<EMRJcxmZhixingkeshi> findEMRJcxmZhixingkeshi(Integer paramInteger, String paramString);
  
  void saveEMRJcxmZhixingkeshi(EMRJcxmZhixingkeshi paramEMRJcxmZhixingkeshi);
  
  void deleteEMRJcxmZhixingkeshi(List<EMRJcxmZhixingkeshi> paramList);
  
  List<EMRLisJcxmSample> findEMRLisJcxmSample(Integer paramInteger);
  
  Integer saveEMRLisSample(EMRLisSample paramEMRLisSample);
  
  void deleteEMRLisJcxmSample(List<EMRLisJcxmSample> paramList);
  
  void updateEMRLisSample(EMRLisSample paramEMRLisSample);
  
  void saveEMRLisJcxmSample(EMRLisJcxmSample paramEMRLisJcxmSample);
  
  EMRLisSample findSampleByCode(String paramString);
  
  EMRLisSample getEMRLisSample(Integer paramInteger);
  
  List<Jcxm> findAllJcxm(String paramString);
  
  List<Jcxm> findJcxmList(Page paramPage, String paramString1, Integer paramInteger, String paramString2, String paramString3);
  
  List<BanGongShi> findBgsByCategoryId(String paramString);
  
  List<Category> findJcxmCategoryByBgsId(Integer paramInteger);
  
  void syncJcxmEYEFushu();
  
  EMRJcxmFushu findEMRJcxmFushuLis(Integer paramInteger);
}
