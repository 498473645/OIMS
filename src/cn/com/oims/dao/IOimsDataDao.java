package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Baogao;
import cn.com.oims.dao.pojo.BaogaoMoban;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.OimsLog;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.web.form.BaogaoXinxiSearchForm;
import cn.com.oims.web.form.BgMbSearchForm;
import cn.com.oims.web.form.HzXxSearchForm;
import cn.com.oims.web.form.JcXmSearchForm;
import cn.com.oims.web.form.JcdSearchForm;
import cn.com.oims.web.form.SheBeiSearchForm;
import cn.com.oims.web.form.SrMbSearchForm;
import cn.com.oims.web.form.UserSearchForm;
import java.util.List;
import java.util.Map;

public interface IOimsDataDao extends BaseDao {
  int counts();
  
  List<Map<String, Object>> getUserInfoList(UserSearchForm paramUserSearchForm);
  
  List<Map<String, Object>> getSheBeiInfoList(SheBeiSearchForm paramSheBeiSearchForm);
  
  List<Map<String, Object>> getHuanZheInfoList(HzXxSearchForm paramHzXxSearchForm);
  
  List<Map<String, Object>> getJcXmInfoList(JcXmSearchForm paramJcXmSearchForm);
  
  List<Map<String, Object>> getSrMbInfoList(SrMbSearchForm paramSrMbSearchForm);
  
  List<Map<String, Object>> getBgMbInfoList(BgMbSearchForm paramBgMbSearchForm);
  
  List<Map<String, Object>> getJcdInfoList(JcdSearchForm paramJcdSearchForm);
  
  List<Map<String, Object>> getbgxxInfoList(BaogaoXinxiSearchForm paramBaogaoXinxiSearchForm);
  
  List getDoctorHasCheckList(int paramInt);
  
  List getBuMenBaoGaoInfo();
  
  List<SheBei> getSheBeisInBuMen(String paramString);
  
  List getJcxmsInSheBei(String paramString);
  
  List<User> getUserList(User paramUser);
  
  List<YuanGong> getYuanGongList(YuanGong paramYuanGong);
  
  List<BuMen> getBuMenList(BuMen paramBuMen);
  
  List<SheBei> getSheBeiList(SheBei paramSheBei);
  
  List<HuanZheXinXi> getHuanZheXinXiList(HuanZheXinXi paramHuanZheXinXi);
  
  List<Jcxm> getJcxmList(Jcxm paramJcxm);
  
  List<Jcd> getJcdList(Jcd paramJcd);
  
  List<Baogao> getBaogaoList(Baogao paramBaogao);
  
  List<ShuruMoban> getShuruMobanList(ShuruMoban paramShuruMoban);
  
  List<OimsLog> getOimsLogList(OimsLog paramOimsLog);
  
  List<BaogaoMoban> getBaogaoMobanList(BaogaoMoban paramBaogaoMoban);
}
