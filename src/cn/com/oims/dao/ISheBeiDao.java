package cn.com.oims.dao;

import cn.com.oims.dao.pojo.SheBei;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface ISheBeiDao extends BaseDao {
  int countsOfSheBei();
  
  List<SheBei> findSheBeisByPage(Page paramPage);
  
  List<SheBei> findAllSheBeis();
  
  void deleteSheBeiById(Serializable paramSerializable);
  
  Serializable saveSheBei(SheBei paramSheBei);
  
  void saveOrUpdateSheBei(SheBei paramSheBei);
  
  void updateSheBei(SheBei paramSheBei);
  
  SheBei findSheBeiById(Serializable paramSerializable);
  
  List getShebeiListByManagerUser(String paramString);
  
  List findAllSheBeisByPageAndSheBei(Page paramPage, SheBei paramSheBei);
  
  List getShebeiListByManagerUserAndIp(String paramString1, String paramString2);
  
  SheBei getShebeiByLoginUserAndIp(String paramString1, String paramString2);
  
  List<SheBei> getShebeisBySheBei(SheBei paramSheBei);
  
  String getBgsIdByJcxmidAndBumenid(String paramString, int paramInt);
  
  List<SheBei> findSheBeiByJcxmIdAndIP(String paramString1, String paramString2);
}
