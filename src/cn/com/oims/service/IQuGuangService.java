package cn.com.oims.service;

import cn.com.oims.dao.pojo.QgErSsjl;
import cn.com.oims.dao.pojo.QgJtssjl;
import cn.com.oims.dao.pojo.QgSgConf;
import cn.com.oims.dao.pojo.QgShfc;
import cn.com.oims.dao.pojo.QgShfcEr;
import cn.com.oims.dao.pojo.QgShjl;
import cn.com.oims.dao.pojo.QgSsjl;
import cn.com.oims.dao.pojo.QgYy;
import cn.com.oims.dao.pojo.Qgbl;
import cn.com.oims.dao.pojo.QgblEr;
import cn.com.oims.dao.pojo.Qglc;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.web.form.QgSearchForm;
import cn.com.oims.web.form.QgtjConditionForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IQuGuangService {
  Serializable saveQuss(QgSsjl paramQgSsjl);
  
  void updateQuss(QgSsjl paramQgSsjl);
  
  Map<String, Object> findQuss4page(Page paramPage, String paramString);
  
  Map<String, Object> findQuss4page(Page paramPage, Long paramLong);
  
  Map<String, Object> findQuss4page_look(Page paramPage, String paramString);
  
  QgSsjl getQussById(Long paramLong);
  
  QgSsjl getQussByLc_id(Long paramLong);
  
  void saveShjl(QgShjl paramQgShjl);
  
  void updateShjl(QgShjl paramQgShjl);
  
  Map<String, Object> findShjl4page(Page paramPage, String paramString);
  
  Map<String, Object> findShjl4page(Page paramPage, Long paramLong);
  
  QgShjl getShjlById(Long paramLong);
  
  List<QgShjl> findShjlAll(String paramString);
  
  QgShjl getQgShjlByLc_id(Long paramLong);
  
  void saveYy(QgYy paramQgYy);
  
  void updateQgyy(QgYy paramQgYy);
  
  QgYy getQgYyById(Long paramLong);
  
  Map<String, Object> findQgYy4page(Page paramPage, String paramString);
  
  Map<String, Object> findQgYy4page(Page paramPage, Long paramLong);
  
  Map<String, Object> findQgYyAll4page(Page paramPage);
  
  QgYy getQgYyByLc_id(Long paramLong);
  
  void saveQgbl(Qgbl paramQgbl);
  
  void updateQgbl(Qgbl paramQgbl);
  
  Qgbl getQgblById(Long paramLong);
  
  Map<String, Object> findQgbl4page(Page paramPage, String paramString);
  
  Qgbl getQgblByLc_id(Long paramLong);
  
  Serializable saveJtssjl(QgJtssjl paramQgJtssjl);
  
  void updateJtssjl(QgJtssjl paramQgJtssjl);
  
  QgJtssjl getJtssjlById(Long paramLong);
  
  Map<String, Object> findJtssjl4page(Page paramPage, String paramString);
  
  Map<String, Object> findJtssjl4page(Page paramPage, Long paramLong);
  
  QgJtssjl getJtssjlByLc_id(Long paramLong, String paramString);
  
  void saveShfc(QgShfc paramQgShfc);
  
  void updateShfc(QgShfc paramQgShfc);
  
  QgShfc getShfcById(Long paramLong);
  
  Map<String, Object> findShfc4page(Page paramPage, String paramString);
  
  Map<String, Object> findShfc4page(Page paramPage, Long paramLong);
  
  QgShfc getShfcByLc_id(Long paramLong);
  
  Serializable saveErSsjl(QgErSsjl paramQgErSsjl);
  
  void updateErSsjl(QgErSsjl paramQgErSsjl);
  
  QgErSsjl getErSsjlById(Long paramLong);
  
  Map<String, Object> findErSsjl4page(Page paramPage, String paramString);
  
  Map<String, Object> findErSsjl4page(Page paramPage, Long paramLong);
  
  QgErSsjl getErSsjlByLc_id(Long paramLong);
  
  void saveQgblEr(QgblEr paramQgblEr);
  
  void updateQgblEr(QgblEr paramQgblEr);
  
  QgblEr getQgblErById(Long paramLong);
  
  Map<String, Object> findQgblEr4page(Page paramPage, String paramString);
  
  QgblEr getQgblErByLc_id(Long paramLong);
  
  void saveShfcEr(QgShfcEr paramQgShfcEr);
  
  void updateShfcEr(QgShfcEr paramQgShfcEr);
  
  QgShfcEr getShfcErById(Long paramLong);
  
  Map<String, Object> findShfcEr4page(Page paramPage, String paramString);
  
  Map<String, Object> findShfcEr4page(Page paramPage, Long paramLong);
  
  QgShfcEr getShfcErByLc_id(Long paramLong);
  
  void saveQglc(Qglc paramQglc);
  
  void updateQglc(Qglc paramQglc);
  
  Qglc getQglcById(Long paramLong);
  
  Map<String, Object> findQglc4page(Page paramPage, String paramString);
  
  Qglc findQglcByIdWwc(String paramString);
  
  Qgbl getQgblLastOne(String paramString);
  
  QgblEr getQgblErLastOne(String paramString);
  
  Qglc getQglcByBl_id(Long paramLong);
  
  String autoCreateBinglihao(String paramString);
  
  List<YuanGong> findYuanGong(Integer paramInteger1, Integer paramInteger2);
  
  List<QgSgConf> findQgSgConf(String paramString);
  
  Map<String, Object> findQgbl(Page paramPage, QgSearchForm paramQgSearchForm);
  
  Map<String, Object> findQgYY(Page paramPage, QgSearchForm paramQgSearchForm);
  
  Map<String, Object> findQgSsjl(Page paramPage, QgSearchForm paramQgSearchForm);
  
  Map<String, Object> findQgShjl(Page paramPage, QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgbl(QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgYY(QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgSsjl(QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgShjl(QgSearchForm paramQgSearchForm);
  
  Integer getCountByTj(String paramString);
  
  List<Map<String, String>> getAllYs(String paramString, QgtjConditionForm paramQgtjConditionForm);
  
  List<String> getAllJcxm(String paramString, QgtjConditionForm paramQgtjConditionForm);
  
  List<ArrayList> getAllYsAndCount(String paramString, QgtjConditionForm paramQgtjConditionForm);
  
  List<ArrayList> getAllJcxmAndCount(String paramString, QgtjConditionForm paramQgtjConditionForm);
  
  Integer getCountByTjss(String paramString);
  
  List<Map<String, String>> getAllSsYs(QgtjConditionForm paramQgtjConditionForm, String paramString);
  
  List<ArrayList> getAllYsAndCount_ss(QgtjConditionForm paramQgtjConditionForm, String paramString);
}
