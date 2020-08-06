package cn.com.oims.service.impl;

import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IYanYaDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.jdbc.IEyeDao;
import cn.com.oims.dao.pojo.EyeInfoOutpClinic;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IEMRService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IYanYaService;
import cn.com.oims.utils.DateUtils;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class YanYaServiceImpl implements IYanYaService {
  IYanYaDao dao = null;
  
  @Autowired
  IJcdService jcdService;
  
  @Autowired
  IJiuzhenDao jiuzhenDao;
  
  @Autowired
  IHuanZheXinXiDao huanZheXinXiDao;
  
  @Autowired
  IYuanGongDao yuanGongDao;
  
  @Autowired
  IEyeDao eyeDao;
  
  @Autowired
  IEMRService iemrService;
  
  private String language = "ISO-8859-1";
  
  @Autowired
  public void setDao(IYanYaDao dao) {
    this.dao = dao;
  }
  
  public Serializable saveYanYa(YanYa o) {
    if (o.getJcd_id() == null) {
      Jcd jcd = new Jcd();
      jcd.setBiaoshi(Integer.valueOf(56));
      jcd.setHuanzheId(o.getHuanzhe_id());
      jcd.setJcksTime(new Date());
      jcd.setJcjsTime(new Date());
      jcd.setBiaoti("眼压");
      jcd.setJcxmIds("2");
      jcd.setJcys(o.getJcys());
      o.setJcd_id((Long)this.jcdService.saveJcd(jcd));
    } 
    return this.dao.saveYanYa(o);
  }
  
  private void saveOrUpdateYanYaToEyeInfoOutpClinic(YanYa o) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(o.getJiuzhen_id());
    YuanGong yg = this.yuanGongDao.obtainYuanGongByGonghao(visit.getFzys());
    HuanZheXinXi patient = this.huanZheXinXiDao.findHuanZheById(visit.getHuanzheId());
    SimpleDateFormat format = new SimpleDateFormat("yyMMddHHmmss");
    EyeInfoOutpClinic eioc = null;
    try {
      eioc = this.eyeDao.getEyeInfoOutpClinic(patient.getBinglihao(), (new SimpleDateFormat("yyyy-MM-dd")).parse((new SimpleDateFormat("yyyy-MM-dd")).format(visit.getCaozuoTime())), new String(yg.getXingming().getBytes(), this.language));
      StringBuffer sb = new StringBuffer("");
      if (o != null) {
        String[] beizhu = o.getBeizhu().split(",");
        sb.append("眼压检查：");
        String methodOD = "";
        if (o.getMethodOD() != null)
          switch (o.getMethodOD().intValue()) {
            case 1:
              methodOD = "非接触";
              break;
            case 2:
              methodOD = "回弹式";
              break;
            case 3:
              methodOD = "修式";
              break;
            case 4:
              methodOD = "Goldman";
              break;
          }  
        String methodOS = "";
        if (o.getMethodOS() != null)
          switch (o.getMethodOS().intValue()) {
            case 1:
              methodOS = "非接触";
              break;
            case 2:
              methodOS = "回弹式";
              break;
            case 3:
              methodOS = "修式";
              break;
            case 4:
              methodOS = "Goldman";
              break;
          }  
        if (!(new Integer(1)).equals(o.getRefuse())) {
          sb.append(!"".equals((o.getOd() != null) ? (o.getOd() + "mmHg " + "(" + methodOD + ") ") : (beizhu[0].equals("null") ? "" : ("指测" + beizhu[0]))) ? ("R:" + ((o.getOd() != null) ? (o.getOd() + "mmHg " + "(" + methodOD + ") ") : (beizhu[0].equals("null") ? "" : ("指测" + beizhu[0])))) : "");
          sb.append(!"".equals((o.getOs() != null) ? (o.getOs() + "mmHg " + "(" + methodOS + ") ") : (beizhu[1].equals("null") ? "" : ("指测" + beizhu[1]))) ? ("L:" + ((o.getOs() != null) ? (o.getOs() + "mmHg " + "(" + methodOS + ") ") : (beizhu[1].equals("null") ? "" : ("指测" + beizhu[1])))) : "");
        } else {
          sb.append("患者拒查");
        } 
      } 
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
        eioc.setTreatment_info(new String(sb.toString().getBytes(), this.language));
        eioc.setVisit_no((visit.getHaoma().length() > 8) ? "0" : visit.getHaoma());
        this.eyeDao.saveEyeInfoOutpClinic(eioc);
      } else {
        eioc.setPatient_age(Integer.valueOf(DateUtils.calculateAge(visit.getCaozuoTime(), patient.getShengri())));
        Map<String, Object> map = this.iemrService.findCombineChuZhi(visit.getId());
        String statement = this.iemrService.createTreatmentInfo(map, sb.toString(), "yanya", visit);
        eioc.setTreatment_info((statement == null) ? null : new String(statement.getBytes(), this.language));
        this.eyeDao.updateEyeInfoOutpClinic(eioc);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  public void delYanYaById(Serializable id) {
    this.dao.delYanYa(id);
  }
  
  public void saveOrUpdateYanYa(YanYa o) {
    try {
      this.dao.updateYanYa(o);
    } catch (Exception e) {
      this.dao.saveYanYa(o);
    } 
  }
  
  public List<YanYa> findAllYanYa() {
    return this.dao.findAllYanYa();
  }
  
  public Map<String, Object> findAllYanYa4Page(Page p, HzXxSearchForm hzxx) {
    Map<String, Object> m = new HashMap<>();
    m.put("list", this.dao.findAllYanYa4Page(p, hzxx));
    m.put("page", p);
    return m;
  }
  
  public YanYa getYanYaById(Serializable id) {
    return this.dao.findYanYaById(id);
  }
  
  public void updateYanYa(YanYa o) {
    this.dao.updateYanYa(o);
  }
  
  public YanYa getYanYaByJcd(Serializable id) {
    return this.dao.findYanYaById(id);
  }
  
  public List<YanYa> getYanYaListByHzid(Long hzid) {
    List<YanYa> list = this.dao.getYanYaListByHzid(hzid);
    return list;
  }
  
  public List<YanYa> selectYanYasByYanYa(YanYa yanya) {
    return this.dao.selectYanYasByYanYa(yanya);
  }
  
  public YanYa getYanYaByJiuzheId(Long jiuzhenId) {
    return this.dao.getYanYaByJiuzhenId(jiuzhenId);
  }
  
  public YanYa getYanYaByHzId(Long hzId) {
    return this.dao.getYanYaByHzId(hzId);
  }
}
