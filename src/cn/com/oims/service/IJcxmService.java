package cn.com.oims.service;

import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.EMRJcxmFushu;
import cn.com.oims.dao.pojo.EMRLisSample;
import cn.com.oims.dao.pojo.Jcxm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IJcxmService {
  Jcxm getJcxmById(Serializable paramSerializable);
  
  Serializable saveJcxm(Jcxm paramJcxm);
  
  void delJcxmById(Serializable paramSerializable);
  
  void saveOrUpdateJcxm(Jcxm paramJcxm);
  
  void updateJcxm(Jcxm paramJcxm);
  
  List<Jcxm> findAllJcxm(Integer paramInteger, Page paramPage, String paramString);
  
  Map<String, Object> findAllJcxm4Page(Page paramPage);
  
  Map<String, Object> findJcxmsByPageAndJcxm(Page paramPage, Jcxm paramJcxm);
  
  List<Jcxm> findJcxmByCatetory(Serializable paramSerializable);
  
  List<Jcxm> getJcxmListByBmid(int paramInt);
  
  List<Jcxm> findJcxmsByJcxm(Jcxm paramJcxm);
  
  List<Jcxm> findJcxmsByIds(String paramString);
  
  List<Jcxm> getJcxmListByBgsId(int paramInt);
  
  void synchJcxmItem();
  
  List<BanGongShi> findJcxmZhixingkeshi(Integer paramInteger1, Integer paramInteger2);
  
  List<EMRLisSample> findJcxmSample(Integer paramInteger);
  
  List<EMRJcxmFushu> findJcxmOptions(Integer paramInteger);
  
  List<Jcxm> findJcxmList(Page paramPage, Integer paramInteger1, Integer paramInteger2, String paramString1, String paramString2);
  
  List<BanGongShi> findBgsByCategoryId(Integer paramInteger);
  
  List<Category> findJcxmCategoryByBgsId(Integer paramInteger);
  
  void syncJcxmEYEFushu();
  
  List<Jcxm> findJcxmsByGH(String paramString);
}
