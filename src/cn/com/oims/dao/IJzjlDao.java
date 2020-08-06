package cn.com.oims.dao;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public interface IJzjlDao extends BaseDao {
  int counts();
  
  List<Jzjl> findAllJzjl4Page(Page paramPage);
  
  List<Jzjl> findAllJzjl();
  
  void delJzjl(Serializable paramSerializable);
  
  Serializable saveJzjl(Jzjl paramJzjl);
  
  void saveOrUpdateJzjl(Jzjl paramJzjl);
  
  void updateJzjl(Jzjl paramJzjl);
  
  Jzjl findJzjlById(Serializable paramSerializable);
  
  List<Jzjl> getJzjlListByJiuzhenId(String paramString);
  
  List<Jzjl> medicalRecords(Page paramPage, Integer paramInteger, Long paramLong);
  
  List<Jzjl> findJzjlListByCategoryIdAndJiuzhenId(Integer paramInteger, Long paramLong);
  
  List<HuanZheXinXi> findTodayHuanZhe(Page paramPage, HuanZheSearchForm paramHuanZheSearchForm) throws Exception;
  
  List<Jzjl> findJzjlByJiuzhenid(long paramLong);
  
  Jzjl findTgjc(int paramInt, Long paramLong);
  
  Map<String, Object> getLastJzjl(Integer paramInteger, Long paramLong);
}
