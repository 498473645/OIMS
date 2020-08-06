package cn.com.oims.dao;

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
import cn.com.oims.web.form.QgErSsjlForm;
import cn.com.oims.web.form.QgJtssjlForm;
import cn.com.oims.web.form.QgSearchForm;
import cn.com.oims.web.form.QgShfcErForm;
import cn.com.oims.web.form.QgShfcForm;
import cn.com.oims.web.form.QgShjlForm;
import cn.com.oims.web.form.QgYyForm;
import cn.com.oims.web.form.QgblErForm;
import cn.com.oims.web.form.QgblForm;
import cn.com.oims.web.form.QgtjConditionForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IQuGuangDao extends BaseDao {
  Serializable saveQuss(QgSsjl paramQgSsjl);
  
  void updateQuss(QgSsjl paramQgSsjl);
  
  List<QgSsjl> findQuss4page(Page paramPage, String paramString);
  
  List<QgSsjl> findQuss4page(Page paramPage, Long paramLong);
  
  QgSsjl getQgssById(Long paramLong);
  
  List findQgssByLc_id(Long paramLong);
  
  void saveShjl(QgShjl paramQgShjl);
  
  void updateShjl(QgShjl paramQgShjl);
  
  List<QgShjlForm> findShjl4page(Page paramPage, String paramString);
  
  List<QgShjlForm> findShjl4page(Page paramPage, Long paramLong);
  
  QgShjl getShjlById(Long paramLong);
  
  List<QgShjl> findShjlAll(String paramString);
  
  List findQgShjlByLc_id(Long paramLong);
  
  void saveYy(QgYy paramQgYy);
  
  void updateQgyy(QgYy paramQgYy);
  
  QgYy getQgYyById(Long paramLong);
  
  List<QgYyForm> findQgYy4page(Page paramPage, String paramString);
  
  List<QgYyForm> findQgYy4page(Page paramPage, Long paramLong);
  
  List findQgYyAll4page(Page paramPage);
  
  List findQgYyByLc_id(Long paramLong);
  
  void saveQgbl(Qgbl paramQgbl);
  
  void updateQgbl(Qgbl paramQgbl);
  
  Qgbl getQgblById(Long paramLong);
  
  List<QgblForm> findQgbl4page(Page paramPage, String paramString);
  
  List getQgblLastOne(String paramString);
  
  Qgbl getQgblLastOne(Integer paramInteger, String paramString);
  
  Serializable saveJtssjl(QgJtssjl paramQgJtssjl);
  
  void updateJtssjl(QgJtssjl paramQgJtssjl);
  
  QgJtssjl getJtssjlById(Long paramLong);
  
  List<QgJtssjlForm> findJtssjl4page(Page paramPage, String paramString);
  
  List<QgJtssjlForm> findJtssjl4page(Page paramPage, Long paramLong);
  
  List findJtssjlByLc_id(Long paramLong);
  
  void saveShfc(QgShfc paramQgShfc);
  
  void updateShfc(QgShfc paramQgShfc);
  
  QgShfc getShfcById(Long paramLong);
  
  List<QgShfcForm> findShfc4page(Page paramPage, String paramString);
  
  List<QgShfcForm> findShfc4page(Page paramPage, Long paramLong);
  
  List findShfcByLc_id(Long paramLong);
  
  Serializable saveErSsjl(QgErSsjl paramQgErSsjl);
  
  void updateErSsjl(QgErSsjl paramQgErSsjl);
  
  QgErSsjl getErSsjlById(Long paramLong);
  
  List<QgErSsjlForm> findErSsjl4page(Page paramPage, String paramString);
  
  List<QgErSsjlForm> findErSsjl4page(Page paramPage, Long paramLong);
  
  List findQgErSsjlBylc_id(Long paramLong);
  
  void saveBler(QgblEr paramQgblEr);
  
  void updateBler(QgblEr paramQgblEr);
  
  QgblEr getBlerById(Long paramLong);
  
  List<QgblErForm> findBler4page(Page paramPage, String paramString);
  
  List getQgblErLastOne(String paramString);
  
  QgblEr getQgblErLastOne(Integer paramInteger, String paramString);
  
  void saveShfcEr(QgShfcEr paramQgShfcEr);
  
  void updateShfcEr(QgShfcEr paramQgShfcEr);
  
  QgShfcEr getShfcErById(Long paramLong);
  
  List<QgShfcErForm> findShfcEr4page(Page paramPage, String paramString);
  
  List<QgShfcErForm> findShfcEr4page(Page paramPage, Long paramLong);
  
  List findShfcErBylc_id(Long paramLong);
  
  void saveQglc(Qglc paramQglc);
  
  void updateQglc(Qglc paramQglc);
  
  Qglc getQglcById(Long paramLong);
  
  List<Qglc> findQglc4page(Page paramPage, String paramString);
  
  List findQglcByBlhWwc(String paramString);
  
  List findQglcBybl_id(Long paramLong);
  
  List<YuanGong> getQgYuanGong(Integer paramInteger1, Integer paramInteger2);
  
  List<QgSgConf> findQgSgConf(String paramString);
  
  List<QgSearchForm> findQgbl(Page paramPage, QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgYY(Page paramPage, QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgSsjl(Page paramPage, QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgShjl(Page paramPage, QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgbl(QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgYY(QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgSsjl(QgSearchForm paramQgSearchForm);
  
  List<QgSearchForm> findQgShjl(QgSearchForm paramQgSearchForm);
  
  Integer getCountByTj(String paramString, QgtjConditionForm paramQgtjConditionForm);
  
  List<Map<String, String>> getAllYs(String paramString, QgtjConditionForm paramQgtjConditionForm);
  
  List<String> getAllJcxm(String paramString, QgtjConditionForm paramQgtjConditionForm);
  
  Integer getCountByTjss(QgtjConditionForm paramQgtjConditionForm);
  
  List<Map<String, String>> getAllSsYs(QgtjConditionForm paramQgtjConditionForm, String paramString);
  
  QgJtssjl getJtssjlByLc_id(Long paramLong, String paramString);
  
  String getBingliNumber();
  
  boolean bingliNumberExists(String paramString);
}
