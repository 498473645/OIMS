package cn.com.oims.dao;

import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.ShiLi;
import cn.com.oims.dao.pojo.Suifang;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface IEMRDao {
  List<HuanZheXinXi> showPatient(String paramString);
  
  List<ShiLi> showVision(Long paramLong);
  
  List<Jiuzhen> showJiuzhen_id(String paramString);
  
  List<Jiuzhen> showReceptionCount();
  
  List<Jiuzhen> showForClinical();
  
  List<Jiuzhen> showReturnvisit();
  
  List<Jiuzhen> showHaspassed();
  
  List<Jiuzhen> showCompleted();
  
  boolean saveMedicalresult(Jzjl paramJzjl);
  
  Long saveOrUpdate_Inquiry(Jzjl paramJzjl);
  
  void saveOrUpdate(Suifang paramSuifang);
  
  Suifang getSuifang(Long paramLong);
  
  void save(Suifang paramSuifang);
  
  List<BanGongShi> findEYEJianchashi();
}
