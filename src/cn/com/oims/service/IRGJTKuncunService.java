package cn.com.oims.service;

import cn.com.oims.dao.pojo.RGJTCgmx;
import cn.com.oims.dao.pojo.RGJTChukusqmx;
import cn.com.oims.dao.pojo.RGJTCrkmx;
import cn.com.oims.web.form.RGJTBaobiaoForm;
import cn.com.oims.web.form.RGJTCaigouSearchForm;
import cn.com.oims.web.form.RGJTCgsqdForm;
import cn.com.oims.web.form.RGJTChukuForm;
import cn.com.oims.web.form.RGJTChukuSearchForm;
import cn.com.oims.web.form.RGJTKucunLSSearchForm;
import cn.com.oims.web.form.RGJTKucunSearchForm;
import cn.com.oims.web.form.RGJTRukuForm;
import com.codesnet.common.Page;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IRGJTKuncunService {
  Map<String, Object> findKucunPageList(RGJTKucunSearchForm paramRGJTKucunSearchForm, Page paramPage);
  
  boolean caigousq(RGJTCgsqdForm paramRGJTCgsqdForm, List<RGJTCgmx> paramList, String paramString);
  
  boolean caigouShenhe(Long paramLong, boolean paramBoolean, String paramString1, String paramString2);
  
  void caigouPifu(Long paramLong, boolean paramBoolean, String paramString1, String paramString2);
  
  void jingtiChRuku(RGJTRukuForm paramRGJTRukuForm, List<RGJTCrkmx> paramList, String paramString, Long paramLong);
  
  void chukuShenqing(RGJTChukuForm paramRGJTChukuForm, List<RGJTChukusqmx> paramList, String paramString);
  
  boolean chukuShenhe(Long paramLong, boolean paramBoolean, String paramString1, String paramString2);
  
  boolean chukuPifu(Long paramLong, boolean paramBoolean, String paramString1, String paramString2);
  
  boolean delCaigouShenqingdan(Long paramLong, String paramString);
  
  boolean delChukuShenqingdan(Long paramLong, String paramString);
  
  Map<String, Object> findCaigouPageList(RGJTCaigouSearchForm paramRGJTCaigouSearchForm, Page paramPage);
  
  Map<String, Object> findChukusqPageList(RGJTChukuSearchForm paramRGJTChukuSearchForm, Page paramPage);
  
  Map<String, Object> findCaigoumxPageList(Long paramLong, RGJTCaigouSearchForm paramRGJTCaigouSearchForm, Page paramPage);
  
  Map<String, Object> findChukusqmxPageList(Long paramLong, RGJTChukuSearchForm paramRGJTChukuSearchForm, Page paramPage);
  
  Map getRGJTKucunBaobiao(RGJTBaobiaoForm paramRGJTBaobiaoForm, Page paramPage);
  
  List<Map<String, Object>> findOperationPatient(String paramString);
  
  Map<String, Object> findRGJTBySN(String paramString);
  
  List<Map<String, Object>> findRGJTKucunMX(Long paramLong, Boolean paramBoolean);
  
  Map rgjtKucunMXPagelist(RGJTKucunSearchForm paramRGJTKucunSearchForm, Page paramPage);
  
  Map rgjtKucunLSPagelist(RGJTKucunLSSearchForm paramRGJTKucunLSSearchForm, Page paramPage);
  
  List<Map<String, Object>> findRGJTKucunLSMX(Long paramLong);
  
  Map<String, Object> findRGJTKucun(Long paramLong);
  
  Map<String, Object> findRGJTKucunByProId(Long paramLong);
  
  Map getRGJTMxBaobiao(RGJTBaobiaoForm paramRGJTBaobiaoForm, Page paramPage);
  
  List<Map<String, Object>> getDayNum(Integer paramInteger, Date paramDate1, Date paramDate2);
  
  List<Map<String, Object>> getJingTiDetalsByOperationId(Long paramLong);
  
  void deleteOperJingti(Long paramLong, String paramString);
  
  List<Map<String, Object>> getRGJTMxBaobiaoExport(RGJTBaobiaoForm paramRGJTBaobiaoForm);
}
