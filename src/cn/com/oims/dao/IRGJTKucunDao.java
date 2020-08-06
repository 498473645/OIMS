package cn.com.oims.dao;

import cn.com.oims.dao.pojo.RGJTCgmx;
import cn.com.oims.dao.pojo.RGJTCgsq;
import cn.com.oims.dao.pojo.RGJTChukuSQ;
import cn.com.oims.dao.pojo.RGJTChukusqmx;
import cn.com.oims.dao.pojo.RGJTCrkls;
import cn.com.oims.dao.pojo.RGJTCrklx;
import cn.com.oims.dao.pojo.RGJTCrkmx;
import cn.com.oims.dao.pojo.RGJTKucun;
import cn.com.oims.dao.pojo.RGJTKucunMX;
import cn.com.oims.web.form.RGJTBaobiaoForm;
import cn.com.oims.web.form.RGJTCaigouSearchForm;
import cn.com.oims.web.form.RGJTChukuSearchForm;
import cn.com.oims.web.form.RGJTKucunLSSearchForm;
import cn.com.oims.web.form.RGJTKucunSearchForm;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IRGJTKucunDao extends BaseDao {
  List<Map<String, Object>> findKucunPageList(RGJTKucunSearchForm paramRGJTKucunSearchForm, Page paramPage);
  
  RGJTCgsq getCaigousq(Long paramLong);
  
  void saveOrUpdate(Object paramObject);
  
  List<RGJTCgmx> findCgmxList(Long paramLong);
  
  void deleteAll(Collection paramCollection);
  
  RGJTChukuSQ getRGJTChukuSQ(Long paramLong);
  
  List<RGJTChukusqmx> findRGJTChukusqmx(Long paramLong);
  
  void delete(Object paramObject);
  
  List<Map<String, Object>> findCGmxList(Long paramLong, RGJTCaigouSearchForm paramRGJTCaigouSearchForm, Page paramPage);
  
  List<RGJTCgsq> findGRJTCaigouPageList(RGJTCaigouSearchForm paramRGJTCaigouSearchForm, Page paramPage);
  
  List<RGJTChukuSQ> findChukuSQPageList(RGJTChukuSearchForm paramRGJTChukuSearchForm, Page paramPage);
  
  List<Map<String, Object>> findChukusqmxPageList(Long paramLong, RGJTChukuSearchForm paramRGJTChukuSearchForm, Page paramPage);
  
  RGJTCgmx getRGJTCgmx(RGJTCgmx paramRGJTCgmx);
  
  RGJTKucun getRGJTKucun(RGJTCrkmx paramRGJTCrkmx);
  
  int countRgjtkucun(Integer paramInteger1, Integer paramInteger2, Date paramDate1, Date paramDate2, Float paramFloat);
  
  List<Map<String, Object>> findRGJTCjtglx(RGJTBaobiaoForm paramRGJTBaobiaoForm, Page paramPage);
  
  List<RGJTCrklx> findCrklx();
  
  List<Map<String, Object>> findOperationPatient(String paramString);
  
  RGJTKucunMX findRGJKucunMXBySN(String paramString);
  
  Map<String, Object> findRGJTBySN(String paramString);
  
  List<Map<String, Object>> findRGJTKucunMX(Long paramLong, Boolean paramBoolean);
  
  List<Map<String, Object>> rgjtKucunMXPagelist(RGJTKucunSearchForm paramRGJTKucunSearchForm, Page paramPage);
  
  List<Map<String, Object>> rgjtKucunLSPagelist(RGJTKucunLSSearchForm paramRGJTKucunLSSearchForm, Page paramPage);
  
  List<Map<String, Object>> findRGJTKucunLSMX(Long paramLong);
  
  Map<String, Object> findRGJTKucun(Long paramLong);
  
  Map<String, Object> findRGJTKucunByProId(Long paramLong);
  
  List<Map<String, Object>> getRGJTMxBaobiao(RGJTBaobiaoForm paramRGJTBaobiaoForm, Page paramPage);
  
  List<Map<String, Object>> getDayNum(Integer paramInteger, Date paramDate1, Date paramDate2);
  
  List<Map<String, Object>> getJingTiDetalsByOperationId(Long paramLong);
  
  RGJTCrkmx findCrkmxById(Long paramLong);
  
  RGJTCrkls findCrklsById(Long paramLong);
  
  List<Map<String, Object>> getRGJTMxBaobiaoExport(RGJTBaobiaoForm paramRGJTBaobiaoForm);
}
