package cn.com.oims.dao;

import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.dao.pojo.Yuangong_gzjl;
import cn.com.oims.web.form.YuanGongSearchForm;
import cn.com.oims.web.form.YuangongJianliForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;

@Component
public interface IYuanGongDao extends BaseDao {
  HibernateTemplate getHibernateTemplate();
  
  int countsOfYuanGong();
  
  List<YuanGong> findYuanGongsByPage(Page paramPage, YuanGongSearchForm paramYuanGongSearchForm);
  
  List<YuanGong> findAllYuanGongs();
  
  void deleteYuanGongById(int paramInt);
  
  Serializable saveYuanGong(YuanGong paramYuanGong);
  
  void saveOrUpdateYuanGong(YuanGong paramYuanGong);
  
  void updateYuanGong(YuanGong paramYuanGong);
  
  YuanGong findYuanGongById(Serializable paramSerializable);
  
  YuanGong obtainYuanGongByGonghao(String paramString);
  
  List getDoctorByBumenAndQuanxian(int paramInt, String paramString);
  
  void delYuanGongByGongHao(String paramString);
  
  List advsearchYuanGong(YuanGong paramYuanGong);
  
  void delYuanGong(List<Long> paramList);
  
  List<YuanGong> findYuanGongsByYuanGong(YuanGong paramYuanGong);
  
  List<Map<String, Object>> getYuanGongInfo(YuanGongSearchForm paramYuanGongSearchForm);
  
  User obtainUserByGonghao(String paramString);
  
  List findJzjlByGongHao(String paramString);
  
  List findSrMbByGongHao(String paramString);
  
  List findBaoGaoByGongHao(YuanGong paramYuanGong);
  
  YuanGong getYuanGongByGH(String paramString);
  
  List<YuanGong> findYuanGongsByBuMenId(Integer paramInteger);
  
  String getDoctorByHuanZheId(Long paramLong);
  
  YuanGong getYuanGong(Integer paramInteger);
  
  List<Yuangong_gzjl> findYuanGongJianli(String paramString1, String paramString2);
  
  void deleteAll(Collection paramCollection);
  
  void saveAll(Collection paramCollection);
  
  Yuangong_gzjl getYuangJianli(Integer paramInteger);
  
  void saveOrUpdate(Object paramObject);
  
  void delete(Object paramObject);
  
  List<Map<String, Object>> findKeYanZiLiaoByCondition(YuangongJianliForm paramYuangongJianliForm, Page paramPage);
  
  List findKeYanZiLiaoByIDS(String paramString, YuangongJianliForm paramYuangongJianliForm);
  
  List findExportKeYanZiLiaoByCondition(YuangongJianliForm paramYuangongJianliForm, Page paramPage);
  
  YuanGong findYuanGongByGongHao(String paramString);
  
  List<Object> find_jtcy(String paramString);
  
  List<Object> find_dyxl(String paramString);
  
  List<Object> find_zgxl(String paramString);
  
  List<Object> find_xuewei(String paramString);
  
  List<Object> find_jypx(String paramString);
  
  List<Object> find_gzjl(String paramString);
  
  List<Object> find_cgjl(String paramString);
  
  List<Object> find_cykt(String paramString);
  
  List<Object> find_fblw(String paramString);
  
  List<Object> find_xwlw(String paramString);
  
  List<Object> find_hdzl(String paramString);
  
  List<Object> find_qtry(String paramString);
  
  List<Object> find_zwpj(String paramString);
  
  List<Map<String, Object>> model_lw_find_fblw(String paramString1, String paramString2, Page paramPage);
  
  void deleteYgjl(Integer paramInteger, String paramString);
  
  List<Map<String, Object>> findYuangongByIds(String paramString);
}
