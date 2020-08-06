package cn.com.oims.service.impl;

import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IShiLiDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.jdbc.IEyeDao;
import cn.com.oims.dao.pojo.EyeInfoOutpClinic;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.ShiLi;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IShiLiService;
import cn.com.oims.utils.DateUtils;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShiLiServiceImpl implements IShiLiService {
  private String language = "ISO-8859-1";
  
  @Autowired
  IShiLiDao dao = null;
  
  @Autowired
  IJcdService jcdService;
  
  @Autowired
  IJiuzhenService jzService;
  
  @Autowired
  IJiuzhenDao jiuzhenDao;
  
  @Autowired
  IHuanZheXinXiDao huanZheXinXiDao;
  
  @Autowired
  IYuanGongDao yuanGongDao;
  
  @Autowired
  IEyeDao eyeDao;
  
  public void setDao(IShiLiDao dao) {
    this.dao = dao;
  }
  
  public Serializable saveShiLi(ShiLi o) {
    return this.dao.saveShiLi(o);
  }
  
  public void delShiLiById(Serializable id) {
    this.dao.delShiLi(id);
  }
  
  @Transactional
  public void saveOrUpdateShiLi(ShiLi o) {
    Date date = new Date();
    Long jcdId = o.getJcd_id();
    if (jcdId == null) {
      Jcd jcd = this.dao.findJcdByJiuzhenId(o.getJiuzhen_id());
      if (jcd == null) {
        jcd = new Jcd();
        jcd.setBiaoshi(Integer.valueOf(56));
        jcd.setBiaoti("视力检查");
        jcd.setHuanzheId(o.getHuanzhe_id());
        jcd.setJcjsTime(date);
        Jiuzhen jz = this.jzService.getJiuzhenById(o.getJiuzhen_id());
        jcd.setKdksId(Integer.valueOf(jz.getJzks()));
        jcd.setJcksTime(date);
        jcd.setJcxmIds("1");
        jcd.setJcys(o.getJcys());
        jcd.setJiuzhenId(o.getJiuzhen_id());
        jcd.setKdTime(jz.getCaozuoTime());
        jcd.setKdys(jz.getFzys());
        jcd.setId((Long)this.jcdService.saveJcd(jcd));
      } 
      o.setJcd_id(jcd.getId());
    } 
    if (o.getId() == null) {
      ShiLi s = this.dao.getShiLiByJcdId(o.getJcd_id());
      if (s != null) {
        o.setId(s.getId());
        BeanUtils.copyProperties(o, s);
        this.dao.updateShiLi(s);
        return;
      } 
    } 
    this.dao.saveOrUpdateShiLi(o);
  }
  
  private void saveOrUpdateShiLiToEyeInfoOutpClinic(ShiLi o) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(o.getJiuzhen_id());
    YuanGong yg = this.yuanGongDao.obtainYuanGongByGonghao(visit.getFzys());
    HuanZheXinXi patient = this.huanZheXinXiDao.findHuanZheById(visit.getHuanzheId());
    SimpleDateFormat format = new SimpleDateFormat("yyMMddHHmmss");
    EyeInfoOutpClinic eioc = null;
    try {
      eioc = this.eyeDao.getEyeInfoOutpClinic(patient.getBinglihao(), (new SimpleDateFormat("yyyy-MM-dd")).parse((new SimpleDateFormat("yyyy-MM-dd")).format(visit.getCaozuoTime())), new String(yg.getXingming().getBytes(), this.language));
      if (eioc == null) {
        Boolean b = this.eyeDao.findPatientById(patient.getBinglihao());
        if (!b.booleanValue())
          this.eyeDao.addPatientToEyeDatabase(patient); 
        eioc = new EyeInfoOutpClinic();
        eioc.setFlow_no(String.valueOf(patient.getBinglihao()) + format.format(visit.getCaozuoTime()));
        eioc.setCli_date((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date()));
        eioc.setPatient_id(patient.getBinglihao());
        eioc.setDoc_name((yg.getXingming() == null) ? null : new String(yg.getXingming().getBytes(), this.language));
        eioc.setClinic_room("001");
        eioc.setPatient_age(Integer.valueOf(DateUtils.calculateAge(visit.getCaozuoTime(), patient.getShengri())));
        eioc.setVisit_no((visit.getHaoma().length() > 8) ? "0" : visit.getHaoma());
        StringBuffer sb_l = new StringBuffer("");
        if (o.getLj() != null)
          sb_l.append("近视力").append("(" + getShiLiValue(o.getLj().floatValue()) + ")、"); 
        if (o.getLjz() != null)
          sb_l.append("矫正视力").append("(" + getShiLiValue(o.getLjz().floatValue()) + ")、"); 
        if (o.getLl() != null)
          sb_l.append("裸眼视力").append("(" + getShiLiValue(o.getLl().floatValue()) + ")、"); 
        if (o.getLedtrs() != null && !o.getLedtrs().equals(new Integer(0)))
          sb_l.append("EDTRS").append("(" + getShiLiValue(o.getLedtrs().intValue()) + ")、"); 
        StringBuffer sb_r = new StringBuffer("");
        if (o.getRj() != null)
          sb_r.append("近视力").append("(" + getShiLiValue(o.getRj().floatValue()) + ")、"); 
        if (o.getRjz() != null)
          sb_r.append("矫正视力").append("(" + getShiLiValue(o.getRjz().floatValue()) + ")、"); 
        if (o.getRl() != null)
          sb_r.append("裸眼视力").append("(" + getShiLiValue(o.getRl().floatValue()) + ")、"); 
        if (o.getRedtrs() != null && !o.getRedtrs().equals(new Integer(0)))
          sb_r.append("EDTRS").append("(" + getShiLiValue(o.getRedtrs().intValue()) + ")、"); 
        eioc.setEye_jc_r_sl((sb_r.toString() == null) ? null : new String(sb_r.toString().getBytes(), this.language));
        eioc.setEye_jc_l_sl((sb_l.toString() == null) ? null : new String(sb_l.toString().getBytes(), this.language));
        this.eyeDao.saveEyeInfoOutpClinic(eioc);
      } else {
        eioc.setCli_date((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date()));
        StringBuffer sb_l = new StringBuffer("");
        if (o.getLj() != null)
          sb_l.append("近视力").append("(" + getShiLiValue(o.getLj().floatValue()) + ")、"); 
        if (o.getLjz() != null)
          sb_l.append("矫正视力").append("(" + getShiLiValue(o.getLjz().floatValue()) + ")、"); 
        if (o.getLl() != null)
          sb_l.append("裸眼视力").append("(" + getShiLiValue(o.getLl().floatValue()) + ")、"); 
        if (o.getLedtrs() != null && !o.getLedtrs().equals(new Integer(0)))
          sb_l.append("EDTRS").append("(" + getShiLiValue(o.getLedtrs().intValue()) + ")、"); 
        StringBuffer sb_r = new StringBuffer("");
        if (o.getRj() != null)
          sb_r.append("近视力").append("(" + getShiLiValue(o.getRj().floatValue()) + ")、"); 
        if (o.getRjz() != null)
          sb_r.append("矫正视力").append("(" + getShiLiValue(o.getRjz().floatValue()) + ")、"); 
        if (o.getRl() != null)
          sb_r.append("裸眼视力").append("(" + getShiLiValue(o.getRl().floatValue()) + ")、"); 
        if (o.getRedtrs() != null && !o.getRedtrs().equals(new Integer(0)))
          sb_r.append("EDTRS").append("(" + getShiLiValue(o.getRedtrs().intValue()) + ")、"); 
        eioc.setEye_jc_r_sl((sb_r.toString() == null) ? null : new String(sb_r.toString().getBytes(), this.language));
        eioc.setEye_jc_l_sl((sb_l.toString() == null) ? null : new String(sb_l.toString().getBytes(), this.language));
        this.eyeDao.updateEyeInfoOutpClinic(eioc);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  public List<ShiLi> findAllShiLi() {
    return this.dao.findAllShiLi();
  }
  
  public Map<String, Object> findAllShiLi4Page(Page p) {
    Map<String, Object> m = new HashMap<>();
    m.put("list", this.dao.findAllShiLi4Page(p));
    m.put("page", p);
    return m;
  }
  
  public ShiLi getShiLiById(Serializable id) {
    return this.dao.findShiLiById(id);
  }
  
  public void updateShiLi(ShiLi o) {
    this.dao.updateShiLi(o);
  }
  
  public void updateJcdBiaoShi(Jcd o) {
    this.dao.updateJcdBiaoShi(o);
  }
  
  public List<Map<String, Object>> findShiLiByJcdId(Serializable jcd_id) {
    return this.dao.findShiLiByJcd(jcd_id);
  }
  
  public List<ShiLi> getShiLiListByHzid(Long hzid) {
    List<ShiLi> list = this.dao.getShiLiListByHzid(hzid);
    return list;
  }
  
  public Map<String, Object> findAllShiLi4Page(Page p, HzXxSearchForm hzxx) {
    Map<String, Object> m = new HashMap<>();
    m.put("list", this.dao.findAllShiLi4Page(p, hzxx));
    m.put("page", p);
    return m;
  }
  
  public List<ShiLi> findShiLi(Long patientId, Integer max) {
    List<ShiLi> list = this.dao.findShiLi(patientId, max);
    List<ShiLi> l = new ArrayList<>();
    for (int i = list.size(); i > 0; i--)
      l.add(list.get(i - 1)); 
    list.clear();
    list = null;
    return l;
  }
  
  public ShiLi getShiliByJcdId(Long jcdId) {
    return this.dao.getShiLiByJcdId(jcdId);
  }
  
  public ShiLi getShiliByJiuzhenId(Long jiuzhenId) {
    return this.dao.getShiliByJiuzhenId(jiuzhenId);
  }
  
  public String getShiLiValue(float f) {
    if (f < 0.0F) {
      String result = "";
      if (f == -1.0F)
        result = "数指"; 
      if (f == -2.0F)
        result = "手动"; 
      if (f == -3.0F)
        result = "光感"; 
      if (f == -4.0F)
        result = "无光感"; 
      if (f == -11.0F)
        result = "患者拒查"; 
      if (f == -12.0F)
        result = "患者不能配合检查"; 
      if (f == -13.0F)
        result = "可追光"; 
      if (f == -14.0F)
        result = "可追物"; 
      if (f == -15.0F)
        result = "义眼"; 
      return result;
    } 
    return (new Float(f)).toString();
  }
  
  public ShiLi getShiliByHzId(Long hzId) {
    return this.dao.getShiliByHzId(hzId);
  }
}
