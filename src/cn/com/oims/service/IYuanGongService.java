package cn.com.oims.service;

import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.dao.pojo.Yuangong_gzjl;
import cn.com.oims.web.form.Fblw_Form;
import cn.com.oims.web.form.UserForm;
import cn.com.oims.web.form.YgForm;
import cn.com.oims.web.form.YuanGongForm;
import cn.com.oims.web.form.YuanGongSearchForm;
import cn.com.oims.web.form.YuangGongDangAnForm;
import cn.com.oims.web.form.YuangongJianliForm;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IYuanGongService {
  int countsOfYuanGong();
  
  List<YuanGong> findYuanGongsByPage(Page paramPage, YuanGongSearchForm paramYuanGongSearchForm);
  
  List<YuanGong> findAllYuanGongs();
  
  void deleteYuanGongById(int paramInt);
  
  void addYuanGong(UserForm paramUserForm, YuanGongForm paramYuanGongForm);
  
  void addYuanGong(UserForm paramUserForm, YgForm paramYgForm);
  
  Serializable saveYuanGong(YuanGongForm paramYuanGongForm);
  
  Serializable saveYuanGong(YgForm paramYgForm);
  
  void saveOrUpdateYuanGong(YuanGong paramYuanGong);
  
  void updateYuanGong(YuanGongForm paramYuanGongForm, UserForm paramUserForm);
  
  void updateYg(YuanGong paramYuanGong);
  
  void updateYuanGong(YgForm paramYgForm, UserForm paramUserForm);
  
  YuanGong findYuanGongById(Serializable paramSerializable);
  
  YuanGong obtainYuanGongByGonghao(String paramString);
  
  List getDoctorByBumenAndQuanxian(int paramInt, String paramString);
  
  List advsearchYuanGong(YuanGong paramYuanGong);
  
  String delYuanGong(List<Long> paramList);
  
  MyResult saveUser(MyResult paramMyResult);
  
  List<YuanGong> findYuanGongsByYuanGong(YuanGong paramYuanGong);
  
  List<Map<String, Object>> getYuanGongList(YuanGongSearchForm paramYuanGongSearchForm);
  
  User obtainUserByGonghao(String paramString);
  
  List obtainJzjlByGonghao(String paramString);
  
  List obtainSrMbByGonghao(String paramString);
  
  List obtainBaoGaoByGonghao(YuanGong paramYuanGong);
  
  List<YuanGong> findYuanGongsByBuMenId(Integer paramInteger);
  
  String getDoctorByHuanZheId(Long paramLong);
  
  void setYuangGongLizhi(Integer paramInteger, boolean paramBoolean);
  
  Object saveOrUpdateYgjl(YuangGongDangAnForm paramYuangGongDangAnForm, User paramUser);
  
  List<Yuangong_gzjl> findYuanGongJianli(String paramString1, String paramString2);
  
  void deleteYgjl(Integer paramInteger, String paramString);
  
  Map<String, List<Object>> findAllYuanGongJianLi(String paramString);
  
  List<Map<String, Object>> findAllZiLiaoByCondition(YuangongJianliForm paramYuangongJianliForm, Page paramPage);
  
  List findExportDataByCondition(String paramString1, YuangongJianliForm paramYuangongJianliForm, String paramString2);
  
  Map<String, Object> findDownLoad_jianLi(String paramString, User paramUser);
  
  List<Map<String, Object>> model_lw_find_fblw(String paramString1, String paramString2, Page paramPage);
  
  void model_lw_save(Fblw_Form paramFblw_Form);
  
  void model_lw_update(Fblw_Form paramFblw_Form);
  
  void model_lw_del(Fblw_Form paramFblw_Form);
  
  void model_lw_publish(String paramString);
  
  List<Map<String, Object>> findYuangongByIds(String paramString);
  
  void updateJcxmsOfYuanGong(YuanGong paramYuanGong);
}
