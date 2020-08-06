package cn.com.oims.dao.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.dao.pojo.Yuangong_cgjl;
import cn.com.oims.dao.pojo.Yuangong_cykt;
import cn.com.oims.dao.pojo.Yuangong_fblw;
import cn.com.oims.dao.pojo.Yuangong_gzjl;
import cn.com.oims.dao.pojo.Yuangong_hdzl;
import cn.com.oims.dao.pojo.Yuangong_jtcy;
import cn.com.oims.dao.pojo.Yuangong_jypx;
import cn.com.oims.dao.pojo.Yuangong_qtry;
import cn.com.oims.dao.pojo.Yuangong_xwlw;
import cn.com.oims.utils.Cn2Spell;
import cn.com.oims.web.form.YuanGongSearchForm;
import cn.com.oims.web.form.YuangongJianliForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;

@Component
public class YuanGongDaoImpl extends BaseDaoImpl implements IYuanGongDao {
  private String clazzName = YuanGong.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(YuanGong.class);
  }
  
  @Override
  public int countsOfYuanGong() {
    Long l = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }
  
  @Override
  public List<YuanGong> findAllYuanGongs() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  @Override
  public void deleteYuanGongById(int id) {
    String sql = "delete from " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public Serializable saveYuanGong(YuanGong yuangong) {
    if (yuangong.getXingming() != null && !yuangong.getXingming().isEmpty()) {
      yuangong.setPinyin(Cn2Spell.converterToSpellByOneUpperCase(yuangong.getXingming()));
    }
    return this.hibernateTemplate.save(yuangong);
  }
  
  @Override
  public void saveOrUpdateYuanGong(YuanGong yuangong) {
    if (yuangong.getXingming() != null && !yuangong.getXingming().isEmpty()) {
      yuangong.setPinyin(Cn2Spell.converterToSpellByOneUpperCase(yuangong.getXingming()));
    }
    this.hibernateTemplate.saveOrUpdate(yuangong);
  }
  
  @Override
  public void updateYuanGong(YuanGong yuangong) {
    if (yuangong.getXingming() != null && !yuangong.getXingming().isEmpty()) {
      yuangong.setPinyin(Cn2Spell.converterToSpellByOneUpperCase(yuangong.getXingming()));
    }
    this.hibernateTemplate.update(yuangong);
  }
  
  @Override
  public YuanGong findYuanGongById(Serializable id) {
    return (YuanGong)this.hibernateTemplate.get(YuanGong.class, id);
  }
  
  @Override
  public YuanGong obtainYuanGongByGonghao(String gonghao) {
    YuanGong yuangong = null;
    List<YuanGong> list = this.hibernateTemplate.findByCriteria(getDC().add(
          (Criterion)Restrictions.eq("gonghao", gonghao)));
    if (list.size() > 0) {
      yuangong = list.get(0);
    }
    return yuangong;
  }
  
  @Override
  public List getDoctorByBumenAndQuanxian(int bumenid, String quanxian) {
    String factorSql = " and u.qiyong ='1' ";
    if (bumenid == -1) {
      factorSql = String.valueOf(factorSql) + " and 1=1";
    } else if (bumenid == 0) {
      factorSql = String.valueOf(factorSql) + " and 1=0";
    } else {
      factorSql = String.valueOf(factorSql) + " and y.bumenId=" + bumenid;
    } 
    String[] qx = null;
    if (quanxian.indexOf(",") != -1) {
      qx = quanxian.split(",");
      factorSql = String.valueOf(factorSql) + " and (";
      int i;
      for (i = 0; i < qx.length - 1; i++) {
        factorSql = String.valueOf(factorSql) + " u.quanxian like '" + qx[i] + ",%' " + 
          " or u.quanxian like '%," + qx[i] + ",%' " + 
          " or u.quanxian like '%," + qx[i] + "'" + 
          " or u.quanxian like '" + qx[i] + "'";
        factorSql = String.valueOf(factorSql) + " or r.quanxian like '" + qx[i] + ",%' " + 
          " or r.quanxian like '%," + qx[i] + ",%' " + 
          " or r.quanxian like '%," + qx[i] + "'" + 
          " or r.quanxian like '" + qx[i] + "'";
        factorSql = String.valueOf(factorSql) + " or ";
      } 
      if (qx.length > 1 && i == qx.length - 1) {
        factorSql = String.valueOf(factorSql) + "  u.quanxian like '" + qx[i] + ",%'" + 
          " or u.quanxian like '%," + qx[i] + ",%'" + 
          " or u.quanxian like '%," + qx[i] + "'" + 
          " or u.quanxian like '" + qx[i] + "' ";
        factorSql = String.valueOf(factorSql) + " or r.quanxian like '" + qx[i] + ",%' " + 
          " or r.quanxian like '%," + qx[i] + ",%' " + 
          " or r.quanxian like '%," + qx[i] + "'" + 
          " or r.quanxian like '" + qx[i] + "'";
      } 
      factorSql = String.valueOf(factorSql) + ")";
    } else {
      factorSql = String.valueOf(factorSql) + " and (u.quanxian like '%," + quanxian + ",%'" + 
        " or u.quanxian like '%," + quanxian + "'" + 
        " or u.quanxian like '" + quanxian + ",%'" + 
        " or u.quanxian like '" + quanxian + "' ";
      factorSql = String.valueOf(factorSql) + " or r.quanxian like '%," + quanxian + ",%'" + 
        " or r.quanxian like '%," + quanxian + "'" + 
        " or r.quanxian like '" + quanxian + ",%'" + 
        " or r.quanxian like '" + quanxian + "')";
    } 
    String hql = "select distinct y from YuanGong y,User u,Role r where y.gonghao = u.gonghao and u.jiaose=r.id " + 
      factorSql + " order by upper(y.pinyin)";
    System.out.println("getDoctorByBumenAndQuanxian:" + hql);
    List list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public void delYuanGongByGongHao(String gh) {
    String hql = "delete from " + YuanGong.class.getSimpleName() + 
      " as o where o.gonghao = '" + gh + "'";
    executeUpdate(hql);
  }
  
  @Override
  public List advsearchYuanGong(YuanGong o) {
    return null;
  }
  
  @Override
  public List findYuanGongsByPage(Page page, YuanGongSearchForm yuangongsearchfrom) {
    String factorSql = getQueryCondition(yuangongsearchfrom);
    int size = 
      count("select count(*) from YuanGong y ,Category c, BuMen b where " + 
        factorSql + " and y.bumenId=b.id and c.id=y.category ");
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String hql = "select new map(y.id as id,y.xingming as xingming,y.xingbie as xingbie ,y.zhiwu as zhiwu,y.dianhua as dianhua,y.title as title,y.xueli as xueli, c.category as category, b.bmmc as bumenId ,y.gonghao as gh,y.leaveOffice as leaveOffice, y.shengri as shengri,y.jcxmIds as jcxmIds) from YuanGong as y,BuMen as b, Category c where " + 
      
      factorSql + "and y.bumenId=b.id and y.category=c.id";
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    List list = getListForPage(hql, startRow, pageSize);
    return list;
  }
  
  private String getQueryCondition(YuanGongSearchForm yuangongsearchfrom) {
    String factorSql = " 1=1 ";
    if (yuangongsearchfrom.getSearch() != null && 
      !yuangongsearchfrom.getSearch().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and (y.zhiwu ='" + yuangongsearchfrom.getSearch() +
        "' or y.xingming like '%" +
        yuangongsearchfrom.getSearch() + "%')";
    }
    if (yuangongsearchfrom.getXingming() != null && 
      !yuangongsearchfrom.getXingming().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and y.xingming like '%" +
        yuangongsearchfrom.getXingming() + "%'";
    }
    if (yuangongsearchfrom.getSfzh() != null && 
      !yuangongsearchfrom.getSfzh().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and y.sfzh='" + yuangongsearchfrom.getSfzh() + "'";
    }
    if (yuangongsearchfrom.getDianhua() != null && 
      !yuangongsearchfrom.getDianhua().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and y.dianhua='" + yuangongsearchfrom.getDianhua() +
        "'";
    }
    if (yuangongsearchfrom.getZhiwu() != null && 
      !yuangongsearchfrom.getZhiwu().isEmpty()) {
      String s = "";
      String zhiwu = yuangongsearchfrom.getZhiwu();
      if (zhiwu.indexOf(",") == -1) {
        s = "'" + yuangongsearchfrom.getZhiwu() + "'";
      } else {
        String[] zhuwus = zhiwu.split(",");
        for (int i = 0; i < zhuwus.length; i++) {
          s = String.valueOf(s) + "'" + zhuwus[i] + "'" + ",";
        }
        s = s.substring(0, s.lastIndexOf(","));
      } 
      factorSql = String.valueOf(factorSql) + " and y.zhiwu in(" + s + ")";
    } 
    if (yuangongsearchfrom.getXingbie() != null && 
      !yuangongsearchfrom.getXingbie().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and y.xingbie='" + yuangongsearchfrom.getXingbie() +
        "'";
    }
    if (yuangongsearchfrom.getBumenId() != null && 
      !yuangongsearchfrom.getBumenId().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and y.bumenId in(" + yuangongsearchfrom.getBumenId() +
        ")";
    }
    if (yuangongsearchfrom.getXueli() != null && 
      !yuangongsearchfrom.getXueli().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and y.xueli like '%" + yuangongsearchfrom.getXueli() +
        "%'";
    }
    if (yuangongsearchfrom.getTitle() != null && 
      !yuangongsearchfrom.getTitle().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and y.title like '%" + yuangongsearchfrom.getTitle() +
        "%'";
    }
    if (yuangongsearchfrom.getLeaveOffice() != null) {
      factorSql = String.valueOf(factorSql) + " and y.leaveOffice = " + yuangongsearchfrom.getLeaveOffice() +
        " ";
    }
    return factorSql;
  }
  
  @Override
  public void delYuanGong(List<Long> ids) {
    for (int i = 0; i < ids.size(); i++) {
      String sql = "delete from " + this.clazzName + " as o where o.id=" + 
        ids.get(i);
      executeUpdate(sql);
    } 
  }
  
  @Override
  public List<YuanGong> findYuanGongsByYuanGong(YuanGong yuangong) {
    return this.hibernateTemplate.findByExample(yuangong);
  }
  
  @Override
  public List<Map<String, Object>> getYuanGongInfo(YuanGongSearchForm ygs) {
    String factorSql = getQueryCondition(ygs);
    String hql = "select new map(y.id as id,y.gonghao as gonghao ,y.bumenId as bumenId, b.bmmc as bumenValue ,y.bgsId as bgsId,c.category as category,y.xingming as xingming ,y.zhiwu as zhiwu  ,y.shengri as shengri ,y.diqu as diqu ,y.sfzh as sfzh,y.dianhua as dianhua ,y.shouji as shouji ,y.jtdz as jtdz ,y.email as email ,y.jianjie as jianjie , y.xingbie as xingbie, y.xueli as xueli, y.title as title  ) from YuanGong as y, BuMen as b,Category as c  where " + 
      
      factorSql + " and y.bumenId=b.id and y.category = c.id ";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public User obtainUserByGonghao(String gonghao) {
    User user = null;
    String sql = "from User u where u.gonghao='" + gonghao + "'";
    List<User> list = this.hibernateTemplate.find(sql);
    if (list.size() >= 1) {
      user = list.get(0);
    }
    return user;
  }
  
  @Override
  public List findJzjlByGongHao(String gonghao) {
    List<Jiuzhen> l = new ArrayList<Jiuzhen>();
    String hql = " from Jiuzhen as j where j.caozuoren ='" + gonghao + 
      "' or j.fzys= '" + gonghao + "'";
    l = this.hibernateTemplate.find(hql);
    return l;
  }
  
  @Override
  public List findSrMbByGongHao(String gonghao) {
    List<ShuruMoban> l = new ArrayList<ShuruMoban>();
    String hql = " from ShuruMoban as sr where sr.gonghao= '" + gonghao + 
      "'";
    l = this.hibernateTemplate.find(hql);
    return l;
  }
  
  @Override
  public List findBaoGaoByGongHao(YuanGong yg) {
    List l = new ArrayList();
    String hql = " from Baogao as bg where 1=1 ";
    if (yg.getXingming() != null && yg.getGonghao() != null) {
      hql = String.valueOf(hql) + " and bg.bgys='" + yg.getXingming() + "' or bg.bgys='" + 
        yg.getGonghao() + "'";
    } else {
      if (yg.getXingming() != null) {
        hql = String.valueOf(hql) + " and bg.bgys='" + yg.getXingming() + "'";
      }
      if (yg.getGonghao() != null) {
        hql = String.valueOf(hql) + " and bg.bgys='" + yg.getGonghao() + "'";
      }
    } 
    l = this.hibernateTemplate.find(hql);
    return l;
  }
  
  @Override
  public YuanGong getYuanGongByGH(String gonghao) {
    List<YuanGong> list = this.hibernateTemplate.find("from YuanGong where gonghao='" + gonghao + "'");
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public List<YuanGong> findYuanGongsByBuMenId(Integer buMenId) {
    return this.hibernateTemplate.findByCriteria(getDC().add((Criterion)Restrictions.eq("leaveOffice", Boolean.valueOf(false))).add((Criterion)Restrictions.eq("bumenId", buMenId)).addOrder(Order.asc("pinyin")));
  }
  
  @Override
  public String getDoctorByHuanZheId(Long huanzheId) {
    Date time = MultiUtils.getPreviousDay(MultiUtils.getStartTimeOfDay(), 7);
    List<String> list = this.hibernateTemplate.find("select fzys from Jiuzhen where huanzheId=" + huanzheId + " and caozuoTime>? order by caozuoTime desc", time);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public YuanGong getYuanGong(Integer id) {
    return (YuanGong)this.hibernateTemplate.get(YuanGong.class, id);
  }
  
  @Override
  public List<Yuangong_gzjl> findYuanGongJianli(String gonghao, String type) {
    return this.hibernateTemplate.find("from Yuangong_Jianli where gonghao='" + gonghao + "'");
  }
  
  @Override
  public void deleteAll(Collection list) {
    this.hibernateTemplate.deleteAll(list);
  }
  
  @Override
  public void saveAll(Collection ygjl) {
    this.hibernateTemplate.saveOrUpdateAll(ygjl);
  }
  
  @Override
  public Yuangong_gzjl getYuangJianli(Integer id) {
    return (Yuangong_gzjl)this.hibernateTemplate.get(Yuangong_gzjl.class, id);
  }
  
  @Override
  public void saveOrUpdate(Object obj) {
    this.hibernateTemplate.saveOrUpdate(obj);
  }
  
  @Override
  public void delete(Object obj) {
    this.hibernateTemplate.delete(obj);
  }
  
  @Override
  public List<Map<String, Object>> findKeYanZiLiaoByCondition(YuangongJianliForm zljs, Page page) {
    String select = "select new map( ";
    String from = "";
    String where = "";
    String str1;
    switch ((str1 = zljs.getType()).hashCode()) {
      case 3051686:
        if (!str1.equals("cgjl")) {
          break;
        }
        return findKeYanZiLiaoByCondition_cgjl(zljs, page);
      case 3069023:
        if (!str1.equals("cykt")) {
          break;
        }
        return findKeYanZiLiaoByCondition_cykt(zljs, page);
      case 3136327:
        if (!str1.equals("fblw")) {
          break;
        }
        return findKeYanZiLiaoByCondition_fblw(zljs, page);
      case 3198254:
        if (!str1.equals("hdzl")) {
          break;
        }
        return findKeYanZiLiaoByCondition_hdzl(zljs, page);
      case 3481514:
        if (!str1.equals("qtry")) {
          break;
        }
        return findKeYanZiLiaoByCondition_qtry(zljs, page);
      case 3692746:
        if (!str1.equals("xwlw")) {
          break;
        }
        return findKeYanZiLiaoByCondition_xwlw(zljs, page);
    } 
    return null;
  }
  
  private List<Map<String, Object>> findKeYanZiLiaoByCondition_qtry(YuangongJianliForm zljs, Page page) {
    List<Date> dp = new ArrayList<Date>();
    String select = "select new map( ";
    String from = " from Yuangong_qtry f , YuanGong y ";
    String where = " where f.gonghao = y.gonghao ";
    select = String.valueOf(select) + "f.jiBie as classType,f.name as project_name,f.filePath as fujian,f.content as content,f.c_time as finalTime,y.xingming as author) ";
    if (Utils.strIsNotEmpty(zljs.getAuthor())) {
      where = String.valueOf(where) + " and y.xingming = '" + zljs.getAuthor() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getClassType()) && !zljs.getClassType().equals("全部")) {
      where = String.valueOf(where) + " and f.jiBie='" + zljs.getClassType() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getProject_name())) {
      where = String.valueOf(where) + " and f.name = '" + zljs.getProject_name() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getJob())) {
      where = String.valueOf(where) + " and f.content = '" + zljs.getJob() + "' ";
    }
    if (zljs.getStartDate() != null) {
      where = String.valueOf(where) + " and f.c_time>?  ";
      dp.add(zljs.getStartDate());
    } 
    if (zljs.getEndDate() != null) {
      where = String.valueOf(where) + " and f.c_time<?  ";
      dp.add(zljs.getStartDate());
    } 
    String hql = String.valueOf(select) + from + where;
    Integer count = Integer.valueOf(count("select count(*) " + from + where, dp.toArray()));
    page.setRowsCount(count);
    page.init();
    return this.hibernateTemplate.find(hql, dp.toArray());
  }
  
  private List<Map<String, Object>> findKeYanZiLiaoByCondition_hdzl(YuangongJianliForm zljs, Page page) {
    List<Date> dp = new ArrayList<Date>();
    String select = "select new map( ";
    String from = " from Yuangong_hdzl f, YuanGong y ";
    String where = " where f.gonghao = y.gonghao ";
    select = String.valueOf(select) + "f.detailType as detailType,f.project_name as project_name,f.filePath as fujian,f.job as job,f.c_time as finalTime,y.xingming as author) ";
    if (Utils.strIsNotEmpty(zljs.getAuthor())) {
      where = String.valueOf(where) + " and y.xingming = '" + zljs.getAuthor() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getDetailType())) {
      where = String.valueOf(where) + " and f.detailType='" + zljs.getDetailType() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getProject_name())) {
      where = String.valueOf(where) + " and f.project_name = '" + zljs.getProject_name() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getJob())) {
      where = String.valueOf(where) + " and f.job = '" + zljs.getJob() + "' ";
    }
    if (zljs.getStartDate() != null) {
      where = String.valueOf(where) + " and f.c_time>?  ";
      dp.add(zljs.getStartDate());
    } 
    if (zljs.getEndDate() != null) {
      where = String.valueOf(where) + " and f.c_time<?  ";
      dp.add(zljs.getStartDate());
    } 
    String hql = String.valueOf(select) + from + where;
    Integer count = Integer.valueOf(count("select count(*) " + from + where, dp.toArray()));
    page.setRowsCount(count);
    page.init();
    return this.hibernateTemplate.find(hql, dp.toArray());
  }
  
  private List<Map<String, Object>> findKeYanZiLiaoByCondition_xwlw(YuangongJianliForm zljs, Page page) {
    List<Date> dp = new ArrayList<Date>();
    String select = "select new map( ";
    String from = " from Yuangong_xwlw f , YuanGong y ";
    String where = " where f.gonghao = y.gonghao ";
    select = String.valueOf(select) + "f.project_name as project_name,f.detailType as detailType,f.user_name as user_name,f.c_time as finalTime,f.filePath as fujian,y.xingming as author) ";
    if (Utils.strIsNotEmpty(zljs.getAuthor())) {
      where = String.valueOf(where) + " and y.xingming = '" + zljs.getAuthor() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getUser_name())) {
      where = String.valueOf(where) + " and f.user_name = '" + zljs.getUser_name() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getProject_name())) {
      where = String.valueOf(where) + " and f.project_name = '" + zljs.getProject_name() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getDetailType())) {
      where = String.valueOf(where) + " and f.detailType='" + zljs.getDetailType() + "' ";
    }
    if (zljs.getStartDate() != null) {
      where = String.valueOf(where) + " and f.c_time>?  ";
      dp.add(zljs.getStartDate());
    } 
    if (zljs.getEndDate() != null) {
      where = String.valueOf(where) + " and f.c_time<?  ";
      dp.add(zljs.getStartDate());
    } 
    String hql = String.valueOf(select) + from + where;
    Integer count = Integer.valueOf(count("select count(*) " + from + where, dp.toArray()));
    page.setRowsCount(count);
    page.init();
    return this.hibernateTemplate.find(hql, dp.toArray());
  }
  
  private List<Map<String, Object>> findKeYanZiLiaoByCondition_fblw(YuangongJianliForm zljs, Page page) {
    List<Date> dp = new ArrayList<Date>();
    String select = "select new map( ";
    String from = " from Yuangong_fblw f, YuanGong y ";
    String where = " where f.gonghao = y.gonghao ";
    select = String.valueOf(select) + "f.project_name as project_name,f.detailKind as detailKind,f.filePath as fujian,f.detailType as detailType,f.job as job,f.other as other,f.c_time as finalTime,y.xingming as author) ";
    if (Utils.strIsNotEmpty(zljs.getAuthor())) {
      where = String.valueOf(where) + " and y.xingming = '" + zljs.getAuthor() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getJob())) {
      where = String.valueOf(where) + " and f.job='" + zljs.getJob() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getOther())) {
      where = String.valueOf(where) + " and f.other='" + zljs.getOther() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getProject_name())) {
      where = String.valueOf(where) + " and f.project_name = '" + zljs.getProject_name() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getDetailType())) {
      where = String.valueOf(where) + " and f.detailType='" + zljs.getDetailType() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getDetailKind())) {
      where = String.valueOf(where) + " and f.detailKind='" + zljs.getDetailKind() + "' ";
    }
    if (zljs.getStartDate() != null) {
      where = String.valueOf(where) + " and f.c_time>?  ";
      dp.add(zljs.getStartDate());
    } 
    if (zljs.getEndDate() != null) {
      where = String.valueOf(where) + " and f.c_time<?  ";
      dp.add(zljs.getStartDate());
    } 
    String hql = String.valueOf(select) + from + where;
    Integer count = Integer.valueOf(count("select count(*) " + from + where, dp.toArray()));
    page.setRowsCount(count);
    page.init();
    return this.hibernateTemplate.find(hql, dp.toArray());
  }
  
  private List<Map<String, Object>> findKeYanZiLiaoByCondition_cykt(YuangongJianliForm zljs, Page page) {
    List<Date> dp = new ArrayList<Date>();
    String select = "select new map( ";
    String from = " from Yuangong_cykt f, YuanGong y ";
    String where = " where f.gonghao = y.gonghao ";
    select = String.valueOf(select) + "f.classType as classType,f.project_name as project_name,f.filePath as fujian,f.money as money,f.user_name as user_name,f.startTime as startTime,f.endTime as endTime,y.xingming as author) ";
    if (Utils.strIsNotEmpty(zljs.getAuthor())) {
      where = String.valueOf(where) + " and y.xingming = '" + zljs.getAuthor() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getClassType()) && !zljs.getClassType().equals("全部")) {
      where = String.valueOf(where) + " and f.classType='" + zljs.getClassType() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getProject_name())) {
      where = String.valueOf(where) + " and f.project_name = '" + zljs.getProject_name() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getUser_name())) {
      where = String.valueOf(where) + " and f.user_name='" + zljs.getUser_name() + "' ";
    }
    if (zljs.getStartDate() != null) {
      where = String.valueOf(where) + " and f.c_time>?  ";
      dp.add(zljs.getStartDate());
    } 
    if (zljs.getEndDate() != null) {
      where = String.valueOf(where) + " and f.c_time<?  ";
      dp.add(zljs.getStartDate());
    } 
    String hql = String.valueOf(select) + from + where;
    Integer count = Integer.valueOf(count("select count(*) " + from + where, dp.toArray()));
    page.setRowsCount(count);
    page.init();
    return this.hibernateTemplate.find(hql, dp.toArray());
  }
  
  private List<Map<String, Object>> findKeYanZiLiaoByCondition_cgjl(YuangongJianliForm zljs, Page page) {
    List<Date> dp = new ArrayList<Date>();
    String select = "select new map( ";
    String from = " from Yuangong_cgjl f, YuanGong y ";
    String where = " where f.gonghao = y.gonghao ";
    select = String.valueOf(select) + "f.classType as classType,f.project_name as project_name,f.filePath as fujian,y.xingming as author,f.detailType as detailType,f.c_time as finalTime) ";
    if (Utils.strIsNotEmpty(zljs.getAuthor())) {
      where = String.valueOf(where) + " and y.xingming = '" + zljs.getAuthor() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getClassType()) && !zljs.getClassType().equals("全部")) {
      where = String.valueOf(where) + " and f.classType='" + zljs.getClassType() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getProject_name())) {
      where = String.valueOf(where) + " and f.project_name = '" + zljs.getProject_name() + "' ";
    }
    if (Utils.strIsNotEmpty(zljs.getDetailType())) {
      where = String.valueOf(where) + " and f.detailType='" + zljs.getDetailType() + "' ";
    }
    if (zljs.getStartDate() != null) {
      where = String.valueOf(where) + " and f.c_time>?  ";
      dp.add(zljs.getStartDate());
    } 
    if (zljs.getEndDate() != null) {
      where = String.valueOf(where) + " and f.c_time<?  ";
      dp.add(zljs.getStartDate());
    } 
    String hql = String.valueOf(select) + from + where;
    Integer count = Integer.valueOf(count("select count(*) " + from + where, dp.toArray()));
    page.setRowsCount(count);
    page.init();
    return this.hibernateTemplate.find(hql, dp.toArray());
  }
  
  public List<Map<String, Object>> findKeYanZiLiaoByCondition2(YuangongJianliForm form, Page page) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map ( (select xingming from YuanGong where gonghao = li.gonghao) as author, li.type as type, li.chengwei as chengwei, ( li.project_name) as project_name, li.job as job, li.phone as phone, li.fujian as fujian, li.path as path, li.classType as classType, li.other as other, li.detailType as detailType, li.user_name as user_name, li.money as money, li.id as id, ";
    if (form.getType().equals("cykt")) {
      hql = String.valueOf(hql) + "((to_char(li.startTime,'yyyy-MM-dd')||'至'||to_char(li.endTime,'yyyy-MM-dd'))) as finalTime ";
    } else {
      hql = String.valueOf(hql) + "to_char(li.time,'yyyy-MM-dd') as finalTime ";
    } 
    String from = " ) from YuangongJianli li where 1=1 ";
    StringBuffer where = new StringBuffer();
    if (Utils.strIsNotEmpty(form.getName())) {
      where.append(" and li.name like '%" + form.getName() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getProject_name())) {
      where.append(" and li.project_name like '%" + form.getProject_name() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getType())) {
      where.append(" and li.type = '" + form.getType() + "'");
    }
    if (Utils.strIsNotEmpty(form.getChengwei())) {
      where.append(" and li.chengwei like '%" + form.getChengwei() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getZhiwu())) {
      where.append(" and li.zhiwu like '%" + form.getZhiwu() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getJob())) {
      where.append(" and li.job like '%" + form.getJob() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getPhone())) {
      where.append(" and li.phone like '%" + form.getPhone() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getFujian())) {
      where.append(" and li.fujian like '%" + form.getFujian() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getClassType()) && 
      !"全部".equals(form.getClassType())) {
      where.append(" and li.classType like '%" + form.getClassType() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getOther())) {
      where.append(" and li.other like '%" + form.getOther() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getDetailType())) {
      where.append(" and li.detailType like '%" + form.getDetailType() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getUser_name())) {
      where.append(" and li.user_name like '%" + form.getUser_name() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getAuthor())) {
      where.append(" and li.gonghao in (" + getYuanGongInfo((YuanGongSearchForm)null, form) + ")");
    }
    if (form.getStartTime() != null) {
      if (form.getType().equals("cykt")) {
        where.append(" and li.startTime >= :startTime");
      } else {
        where.append(" and li.time >= :startTime");
      } 
      map.put("startTime", form.getStartTime());
    } 
    if (form.getEndTime() != null) {
      if (form.getType().equals("cykt")) {
        where.append(" and li.endTime <= :endTime");
      } else {
        where.append(" and li.time <= :endTime");
      } 
      map.put("endTime", form.getEndTime());
    } 
    int size = 0;
    List<Map<String, Object>> list = null;
    if (!map.isEmpty()) {
      list = findList(String.valueOf(hql) + from + where, map);
      if (list != null) {
        size = list.size();
      }
    } else {
      list = this.hibernateTemplate.find(String.valueOf(hql) + from + where);
      if (list != null) {
        size = list.size();
      }
    } 
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    if (!map.isEmpty()) {
      list = getListForPage(String.valueOf(hql) + from + where, startRow, pageSize, map);
    } else {
      list = getListForPage(String.valueOf(hql) + from + where, startRow, pageSize);
    } 
    return list;
  }
  
  private String getYuanGongInfo(YuanGongSearchForm form, YuangongJianliForm jianliForm) {
    YuanGong yuangong = null;
    List<YuanGong> list = this.hibernateTemplate.findByCriteria(getDC().add(
          (Criterion)Restrictions.like("xingming", "%" + jianliForm.getAuthor() + "%")));
    String s = "";
    if (list.size() == 0) {
      throw new RuntimeException("没有获取到" + jianliForm.getAuthor() + "的相关信息,请确认名字是否填写正确");
    }
    for (YuanGong li : list) {
      s = String.valueOf(s) + "'" + li.getGonghao() + "'" + ",";
    }
    return s.substring(0, s.lastIndexOf(","));
  }
  
  @Override
  public List findKeYanZiLiaoByIDS(String ids, YuangongJianliForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map ( (select xingming from YuanGong where gonghao = li.gonghao) as author, li.type as type, li.chengwei as chengwei, ( li.project_name) as project_name, li.job as job, li.phone as phone, li.fujian as fujian, li.path as path, li.classType as classType, li.other as other, li.detailType as detailType, li.user_name as user_name, li.money as money, li.id as id, ";
    if (form.getType().equals("cykt")) {
      hql = String.valueOf(hql) + "((to_char(li.startTime,'yyyy-MM-dd')||'至'||to_char(li.endTime,'yyyy-MM-dd'))) as finalTime ";
    } else {
      hql = String.valueOf(hql) + "to_char(li.time,'yyyy-MM-dd') as finalTime ";
    } 
    String from = " ) from YuangongJianli li where 1=1 and id in (" + ids + ")";
    List list = this.hibernateTemplate.find(String.valueOf(hql) + from);
    return list;
  }
  
  @Override
  public List findExportKeYanZiLiaoByCondition(YuangongJianliForm form, Page page) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map ( (select xingming from YuanGong where gonghao = li.gonghao) as author, li.type as type, li.chengwei as chengwei, ( li.project_name) as project_name, li.job as job, li.phone as phone, li.fujian as fujian, li.path as path, li.classType as classType, li.other as other, li.detailType as detailType, li.user_name as user_name, li.money as money, li.id as id,to_char(li.time,'yyyy-MM-dd') as time, to_char(li.startTime,'yyyy-MM-dd') as startTime,to_char(li.endTime,'yyyy-MM-dd') as endTime ";
    String from = " ) from YuangongJianli li where 1=1 ";
    StringBuffer where = new StringBuffer();
    if (Utils.strIsNotEmpty(form.getName())) {
      where.append(" and li.name like '%" + form.getName() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getProject_name())) {
      where.append(" and li.project_name like '%" + form.getProject_name() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getType())) {
      where.append(" and li.type = '" + form.getType() + "'");
    }
    if (Utils.strIsNotEmpty(form.getChengwei())) {
      where.append(" and li.chengwei like '%" + form.getChengwei() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getZhiwu())) {
      where.append(" and li.zhiwu like '%" + form.getZhiwu() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getJob())) {
      where.append(" and li.job like '%" + form.getJob() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getPhone())) {
      where.append(" and li.phone like '%" + form.getPhone() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getFujian())) {
      where.append(" and li.fujian like '%" + form.getFujian() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getClassType()) && 
      !"全部".equals(form.getClassType())) {
      where.append(" and li.classType like '%" + form.getClassType() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getOther())) {
      where.append(" and li.other like '%" + form.getOther() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getDetailType())) {
      where.append(" and li.detailType like '%" + form.getDetailType() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getUser_name())) {
      where.append(" and li.user_name like '%" + form.getUser_name() + "%'");
    }
    if (Utils.strIsNotEmpty(form.getAuthor())) {
      where.append(" and li.gonghao in ('" + getYuanGongInfo((YuanGongSearchForm)null, form) + "')");
    }
    if (form.getStartTime() != null) {
      if (form.getType().equals("cykt")) {
        where.append(" and li.startTime >= :startTime");
      } else {
        where.append(" and li.time >= :startTime");
      } 
      map.put("startTime", form.getStartTime());
    } 
    if (form.getEndTime() != null) {
      if (form.getType().equals("cykt")) {
        where.append(" and li.endTime <= :endTime");
      } else {
        where.append(" and li.time <= :endTime");
      } 
      map.put("endTime", form.getEndTime());
    } 
    int size = 0;
    List list = null;
    if (!map.isEmpty()) {
      list = findList(String.valueOf(hql) + from + where, map);
      if (list != null) {
        size = list.size();
      }
    } else {
      list = this.hibernateTemplate.find(String.valueOf(hql) + from + where);
      if (list != null) {
        size = list.size();
      }
    } 
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    if (!map.isEmpty()) {
      list = getListForPage(String.valueOf(hql) + from + where, startRow, pageSize, map);
    } else {
      list = getListForPage(String.valueOf(hql) + from + where, startRow, pageSize);
    } 
    return list;
  }
  
  @Override
  public HibernateTemplate getHibernateTemplate() {
    return this.hibernateTemplate;
  }
  
  @Override
  public YuanGong findYuanGongByGongHao(String gonghao) {
    List<YuanGong> yuangGong = getHibernateTemplate().find(" select yg from YuanGong yg where yg.gonghao=?", gonghao);
    return yuangGong.get(0);
  }
  
  @Override
  public List<Object> find_jtcy(String gonghao) {
    return this.hibernateTemplate.find("from Yuangong_jtcy t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_dyxl(String gonghao) {
    return this.hibernateTemplate.find("from YuanGong t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_zgxl(String gonghao) {
    return this.hibernateTemplate.find("from YuanGong t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_xuewei(String gonghao) {
    return this.hibernateTemplate.find("from YuanGong t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_jypx(String gonghao) {
    return this.hibernateTemplate.find("from Yuangong_jypx t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_gzjl(String gonghao) {
    return this.hibernateTemplate.find("from Yuangong_gzjl t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_cgjl(String gonghao) {
    return this.hibernateTemplate.find("from Yuangong_cgjl t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_cykt(String gonghao) {
    return this.hibernateTemplate.find("from Yuangong_cykt t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_fblw(String gonghao) {
    return this.hibernateTemplate.find("from Yuangong_fblw t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_xwlw(String gonghao) {
    return this.hibernateTemplate.find("from Yuangong_xwlw t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_hdzl(String gonghao) {
    return this.hibernateTemplate.find("from Yuangong_hdzl t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_qtry(String gonghao) {
    return this.hibernateTemplate.find("from Yuangong_qtry t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Object> find_zwpj(String gonghao) {
    return this.hibernateTemplate.find("from YuanGong t where t.gonghao=?", gonghao);
  }
  
  @Override
  public List<Map<String, Object>> model_lw_find_fblw(String categoryId, String keyword, Page page) {
    List<String> params = new ArrayList<String>(10);
    params.add(categoryId);
    String hql = "select new map( lw.id as id , lw.c_time as c_time , lw.project_name as project_name , lw.job as job , lw.other as other , lw.infomation as infomation , lw.keywords as keywords , lw.c_content as c_content , lw.detailType as detailType , lw.detailKind as detailKind , lw.filePath as filePath , yg.xingming as author ) from Yuangong_fblw lw, YuanGong yg where lw.gonghao=yg.gonghao  and lw.detailKind=? ";
    if (keyword != null && !keyword.equals("")) {
      hql = String.valueOf(hql) + "and ( lw.detailType=? or lw.project_name=? or lw.job=? or lw.other=?)";
      params.add(keyword);
      params.add(keyword);
      params.add(keyword);
      params.add(keyword);
    } 
    String[] strs = new String[params.size()];
    params.toArray(strs);
    return getHibernateTemplate().find(hql, (Object[])strs);
  }
  
  @Override
  public void deleteYgjl(Integer id, String type) {
    Yuangong_jtcy obj;
    YuanGong obj1;
    YuanGong obj11;
    YuanGong obj111;
    Yuangong_jypx jypx;
    Yuangong_gzjl gzjl;
    Yuangong_cgjl cgjl;
    Yuangong_cykt cykt;
    Yuangong_fblw fblw;
    Yuangong_xwlw xwlw;
    Yuangong_hdzl hdzl;
    Yuangong_qtry qtry;
    YuanGong yg;
    String str;
    switch ((str = type).hashCode()) {
      case -748290733:
        if (!str.equals("xuewei")) {
          break;
        }
        obj111 = (YuanGong)this.hibernateTemplate.get(YuanGong.class, id);
        if (obj111 != null) {
          obj111.setXw_name("");
          obj111.setXw_level_name("");
          obj111.setXw_level_Time(null);
          obj111.setXw_ziGe_name("");
          obj111.setXw_ziGe_time(null);
          obj111.setXuewei_filePath("");
          this.hibernateTemplate.update(obj111);
        } 
        break;
      case 3051686:
        if (!str.equals("cgjl")) {
          break;
        }
        cgjl = (Yuangong_cgjl)this.hibernateTemplate.get(Yuangong_cgjl.class, id);
        if (cgjl != null) {
          this.hibernateTemplate.delete(cgjl);
        }
        break;
      case 3069023:
        if (!str.equals("cykt")) {
          break;
        }
        cykt = (Yuangong_cykt)this.hibernateTemplate.get(Yuangong_cykt.class, id);
        if (cykt != null) {
          this.hibernateTemplate.delete(cykt);
        }
        break;
      case 3099209:
        if (!str.equals("dyxl")) {
          break;
        }
        obj1 = (YuanGong)this.hibernateTemplate.get(YuanGong.class, id);
        if (obj1 != null) {
          obj1.setDyxl_job("");
          obj1.setDyxl_name("");
          obj1.setDyxl_school("");
          obj1.setDyxl_filePath("");
          this.hibernateTemplate.update(obj1);
        } 
        break;
      case 3136327:
        if (!str.equals("fblw")) {
          break;
        }
        fblw = (Yuangong_fblw)this.hibernateTemplate.get(Yuangong_fblw.class, id);
        if (fblw != null) {
          this.hibernateTemplate.delete(fblw);
        }
        break;
      case 3189109:
        if (!str.equals("gzjl")) {
          break;
        }
        gzjl = (Yuangong_gzjl)this.hibernateTemplate.get(Yuangong_gzjl.class, id);
        if (gzjl != null) {
          this.hibernateTemplate.delete(gzjl);
        }
        break;
      case 3198254:
        if (!str.equals("hdzl")) {
          break;
        }
        hdzl = (Yuangong_hdzl)this.hibernateTemplate.get(Yuangong_hdzl.class, id);
        if (hdzl != null) {
          this.hibernateTemplate.delete(hdzl);
        }
        break;
      case 3272512:
        if (!str.equals("jtcy")) {
          break;
        }
        obj = (Yuangong_jtcy)this.hibernateTemplate.get(Yuangong_jtcy.class, id);
        if (obj != null) {
          this.hibernateTemplate.delete(obj);
        }
        break;
      case 3277719:
        if (!str.equals("jypx")) {
          break;
        }
        jypx = (Yuangong_jypx)this.hibernateTemplate.get(Yuangong_jypx.class, id);
        if (jypx != null) {
          this.hibernateTemplate.delete(jypx);
        }
        break;
      case 3481514:
        if (!str.equals("qtry")) {
          break;
        }
        qtry = (Yuangong_qtry)this.hibernateTemplate.get(Yuangong_qtry.class, id);
        if (qtry != null) {
          this.hibernateTemplate.delete(qtry);
        }
        break;
      case 3692746:
        if (!str.equals("xwlw")) {
          break;
        }
        xwlw = (Yuangong_xwlw)this.hibernateTemplate.get(Yuangong_xwlw.class, id);
        if (xwlw != null) {
          this.hibernateTemplate.delete(xwlw);
        }
        break;
      case 3737313:
        if (!str.equals("zgxl")) {
          break;
        }
        obj11 = (YuanGong)this.hibernateTemplate.get(YuanGong.class, id);
        if (obj11 != null) {
          obj11.setZgxl_job("");
          obj11.setZgxl_name("");
          obj11.setZgxl_school("");
          obj11.setZgxl_filePath("");
          this.hibernateTemplate.update(obj11);
        } 
        break;
      case 3752439:
        if (!str.equals("zwpj")) {
          break;
        }
        yg = (YuanGong)this.hibernateTemplate.get(YuanGong.class, id);
        if (yg != null) {
          yg.setZwpj("");
          this.hibernateTemplate.update(yg);
        } 
        break;
      case 1107481983:
        if (!str.equals("sfzh_filePath")) {
          break;
        }
        yg = (YuanGong)this.hibernateTemplate.get(YuanGong.class, id);
        if (yg != null) {
          yg.setSfzh_filePath("");
          this.hibernateTemplate.update(yg);
        } 
        break;
      case 1403490978:
        if (!str.equals("zhicheng_filePath")) {
          break;
        }
        yg = (YuanGong)this.hibernateTemplate.get(YuanGong.class, id);
        if (yg != null) {
          yg.setZhicheng_filePath("");
          this.hibernateTemplate.update(yg);
        } 
        break;
    } 
  }
  
  @Override
  public List<Map<String, Object>> findYuangongByIds(String s) {
    String hql = "select new map(yg.gonghao as gonghao,yg.xingming as xingming,yg.xingbie as xingbie,yg.shengri as shengri,yg.title as zhicheng,yg.xueli as xueli,yg.dianhua as dianhua,yg.sfzh as sfzh) from YuanGong yg where id in " + s;
    return this.hibernateTemplate.find(hql);
  }
}
