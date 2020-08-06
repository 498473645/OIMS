package cn.com.oims.service;

import cn.com.oims.dao.pojo.RGJTChangjia;
import cn.com.oims.dao.pojo.RGJTCjtglx;
import cn.com.oims.dao.pojo.RGJTCrklx;
import cn.com.oims.dao.pojo.RGJTPanleixing;
import cn.com.oims.dao.pojo.RGJTXinghao;
import cn.com.oims.web.form.RGJTSearchForm;
import com.codesnet.common.Page;
import java.util.Map;

public interface IRGJTDictService {
  void saveOrUpdateRGJChangjia(RGJTChangjia paramRGJTChangjia);
  
  Map<String, Object> findRGJTChangjia(String paramString, Page paramPage, Integer paramInteger);
  
  RGJTChangjia getRGJTChangjia(Integer paramInteger);
  
  void deleteRGJTChangjia(Integer paramInteger);
  
  void saveOrUpdateRGJTXinghao(RGJTXinghao paramRGJTXinghao);
  
  Map<String, Object> findRGJTXinhaoPageList(String paramString, Page paramPage);
  
  void deleteRGJTXinhao(Integer paramInteger);
  
  void saveOrUpdateRGJTPanleixing(RGJTPanleixing paramRGJTPanleixing);
  
  Map<String, Object> findRGJTPanleixingPageList(String paramString, Page paramPage);
  
  void deleteRGJTPanleixing(Integer paramInteger);
  
  void saveOrUpdateRGJTCjtglx(RGJTCjtglx paramRGJTCjtglx);
  
  Map<String, Object> findRGJTCjtglx(RGJTSearchForm paramRGJTSearchForm, Page paramPage);
  
  RGJTCjtglx getRGJTCjtglx(Integer paramInteger);
  
  void deleteRGJTCjtglx(Integer paramInteger);
  
  void saveOrUpdateRGJTCrklx(RGJTCrklx paramRGJTCrklx);
  
  Map<String, Object> findRGJTCrklxPageList(String paramString, Integer paramInteger, Page paramPage);
  
  void deleteRGJTCrklx(Integer paramInteger);
}
