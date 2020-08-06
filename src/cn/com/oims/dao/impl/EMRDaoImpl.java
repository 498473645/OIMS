package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEMRDao;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.ShiLi;
import cn.com.oims.dao.pojo.Suifang;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EMRDaoImpl extends BaseDaoEx implements IEMRDao {
  private int instate = 0;
  
  public List<HuanZheXinXi> showPatient(String gonghao) {
    this.instate = 27;
    String hql = "select h from HuanZheXinXi h,Jiuzhen j where h.id=j.huanzheId and h.jilvren=10002 and j.caozuoTime>=current_date and j.state= " + 
      this.instate + 
      " order by j.caozuoTime";
    Object[] obj = { gonghao };
    List<HuanZheXinXi> list = showByPage(hql, 1, 1);
    return list;
  }
  
  public List<ShiLi> showVision(Long jzid) {
    List<ShiLi> list = null;
    String hql = "from ShiLi where jiuzhen_id=?";
    Object[] obj = { jzid };
    list = listshow(hql, obj);
    return list;
  }
  
  public List<Jiuzhen> showJiuzhen_id(String gonghao) {
    this.instate = 27;
    String hql = "select id from Jiuzhen where caozuoren=? and caozuoTime > current_date and state= " + 
      this.instate;
    Object[] obj = { gonghao };
    List<Jiuzhen> list = null;
    list = listshow(hql, obj);
    return list;
  }
  
  public List<Jiuzhen> showReceptionCount() {
    List<Jiuzhen> list = null;
    String hql = "from Jiuzhen where caozuoTime > current_date";
    list = getuniqbyhql(hql);
    return list;
  }
  
  public List<Jiuzhen> showForClinical() {
    this.instate = 27;
    List<Jiuzhen> list = null;
    String hql = "from Jiuzhen where caozuoTime > current_date and state= " + 
      this.instate;
    list = getuniqbyhql(hql);
    return list;
  }
  
  public List<Jiuzhen> showReturnvisit() {
    this.instate = 28;
    List<Jiuzhen> list = null;
    String hql = "from Jiuzhen where caozuoTime > current_date and state= " + 
      this.instate;
    list = getuniqbyhql(hql);
    return list;
  }
  
  public List<Jiuzhen> showHaspassed() {
    this.instate = 30;
    List<Jiuzhen> list = null;
    String hql = "from Jiuzhen where caozuoTime > current_date and state= " + 
      this.instate;
    list = getuniqbyhql(hql);
    return list;
  }
  
  public List<Jiuzhen> showCompleted() {
    this.instate = 29;
    List<Jiuzhen> list = null;
    String hql = "from Jiuzhen where caozuoTime > current_date and state= " + 
      this.instate;
    list = getuniqbyhql(hql);
    return list;
  }
  
  public boolean saveMedicalresult(Jzjl jzjl) {
    boolean flag = save(jzjl);
    return flag;
  }
  
  public Long saveOrUpdate_Inquiry(Jzjl jzjl) {
    return null;
  }
  
  public void saveOrUpdate(Suifang suifang) {
    this.hibernateTemplate.saveOrUpdate(suifang);
  }
  
  public Suifang getSuifang(Long jiuzhenId) {
    return (Suifang)this.hibernateTemplate.get(Suifang.class, jiuzhenId);
  }
  
  public void save(Suifang suifang) {
    this.hibernateTemplate.save(suifang);
  }
  
  public List<BanGongShi> findEYEJianchashi() {
    String hql = " from BanGongShi where id in (select bgsId from SheBei where qiyong=true)";
    return this.hibernateTemplate.find(hql);
  }
}
