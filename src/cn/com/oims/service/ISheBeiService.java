package cn.com.oims.service;

import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.SheBei;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface ISheBeiService {
  int countsOfSheBei();
  
  List<SheBei> findSheBeisByPage(Page paramPage);
  
  List<SheBei> findAllSheBeis();
  
  void deleteSheBeiById(Serializable paramSerializable);
  
  Serializable saveSheBei(SheBei paramSheBei);
  
  void saveOrUpdateSheBei(SheBei paramSheBei);
  
  void updateSheBei(SheBei paramSheBei);
  
  SheBei findSheBeiById(Serializable paramSerializable);
  
  List getShebeiListByManagerUser(String paramString);
  
  Map<String, Object> findAllSheBeisByPageAndSheBei(Page paramPage, SheBei paramSheBei);
  
  void updateSheBeiBySheBei(SheBei paramSheBei);
  
  List getShebeiListByManagerUserAndIp(String paramString1, String paramString2);
  
  SheBei getShebeiByLoginUserAndIp(String paramString1, String paramString2);
  
  List<SheBei> getShebeisBySheBei(SheBei paramSheBei);
  
  String getBgsIdByJcxmidAndBumenid(String paramString, int paramInt);
  
  List<SheBei> findSheBeiByJcxmIdAndIP(String paramString1, String paramString2);
  
  BanGongShi getSpecialLocation(Integer paramInteger);
}
