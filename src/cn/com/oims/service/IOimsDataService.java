package cn.com.oims.service;

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
import org.springframework.stereotype.Service;

@Service
public interface IOimsDataService {
  List<Map<String, Object>> getUserInfoList(UserSearchForm paramUserSearchForm);
  
  List<Map<String, Object>> getSheBeiInfoList(SheBeiSearchForm paramSheBeiSearchForm);
  
  List<Map<String, Object>> getHuanZheInfoList(HzXxSearchForm paramHzXxSearchForm);
  
  List<Map<String, Object>> getJcXmInfoList(JcXmSearchForm paramJcXmSearchForm);
  
  List<Map<String, Object>> getSrMbInfoList(SrMbSearchForm paramSrMbSearchForm);
  
  List<Map<String, Object>> getBgMbInfoList(BgMbSearchForm paramBgMbSearchForm);
  
  List<Map<String, Object>> getJcdInfoList(JcdSearchForm paramJcdSearchForm);
  
  List getDoctorHasCheckList(int paramInt);
  
  List<Map<String, Object>> getbgxxInfoList(BaogaoXinxiSearchForm paramBaogaoXinxiSearchForm);
  
  List getBuMenBaoGaoInfo();
  
  List<SheBei> getSheBeisInBuMen(String paramString);
  
  List getJcxmsInSheBei(String paramString);
  
  List<User> getUserList(User paramUser);
  
  List<YuanGong> getYuanGongList(YuanGong paramYuanGong);
  
  List<BuMen> getBuMenList(BuMen paramBuMen);
  
  List<SheBei> getSheBeiList(SheBei paramSheBei);
  
  List<HuanZheXinXi> getHuanZheXinXiList(HuanZheXinXi paramHuanZheXinXi);
  
  List<Jcxm> getJcXmiList(Jcxm paramJcxm);
  
  List<Jcd> getJcdList(Jcd paramJcd);
  
  List<Baogao> getBaogaoList(Baogao paramBaogao);
  
  List<ShuruMoban> getSrMbiList(ShuruMoban paramShuruMoban);
  
  List<OimsLog> getOimsLogiList(OimsLog paramOimsLog);
  
  List<BaogaoMoban> getBaogaoMobaniList(BaogaoMoban paramBaogaoMoban);
}
