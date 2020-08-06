package cn.com.oims.service;

import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.Suifang;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface IEMRService {
  Long saveOrUpdate_Inquiry(Jzjl paramJzjl);
  
  void synchDrug(HttpServletRequest paramHttpServletRequest);
  
  void saveOrUpdateSuifang(Suifang paramSuifang);
  
  Suifang getSuifang(Long paramLong);
  
  List<BanGongShi> findEYEJianchashi();
  
  Map<String, Object> findCombineChuZhi(Long paramLong);
  
  String createTreatmentInfo(Map<String, Object> paramMap, String paramString1, String paramString2, Jiuzhen paramJiuzhen);
}
