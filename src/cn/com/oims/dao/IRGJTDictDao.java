package cn.com.oims.dao;

import cn.com.oims.dao.pojo.RGJTChangjia;
import cn.com.oims.dao.pojo.RGJTCjtglx;
import cn.com.oims.dao.pojo.RGJTCrklx;
import cn.com.oims.dao.pojo.RGJTPanleixing;
import cn.com.oims.dao.pojo.RGJTXinghao;
import cn.com.oims.web.form.RGJTSearchForm;
import com.codesnet.common.Page;
import java.util.List;

public interface IRGJTDictDao extends BaseDao {
  public static final Integer RGJT_CSLX_SCCJ_GHS = Integer.valueOf(0);
  
  public static final Integer RGJT_CSLX_GHS = Integer.valueOf(1);
  
  public static final Integer RGJT_CSLX_SCCJ = Integer.valueOf(2);
  
  void saveOrUpdate(Object paramObject);
  
  List<RGJTChangjia> findRGJTChangjia(Integer paramInteger, String paramString, Page paramPage);
  
  RGJTChangjia getRGJTChangjia(Integer paramInteger);
  
  void delete(Object paramObject);
  
  List<RGJTXinghao> findRGJTXinhaoPageList(String paramString, Page paramPage);
  
  RGJTXinghao getRGJTXinghao(Integer paramInteger);
  
  List<RGJTPanleixing> findRGJTPanleixing(String paramString, Page paramPage);
  
  RGJTPanleixing getRGJTPanleixing(Integer paramInteger);
  
  List<RGJTCjtglx> findRGJTCjtglx(RGJTSearchForm paramRGJTSearchForm, Page paramPage);
  
  RGJTCjtglx getRGJTCjtglx(Integer paramInteger);
  
  List<RGJTCrklx> findRGJTCrklxPageList(String paramString, Integer paramInteger, Page paramPage);
  
  RGJTCrklx getRGJTCrklx(Integer paramInteger);
}
