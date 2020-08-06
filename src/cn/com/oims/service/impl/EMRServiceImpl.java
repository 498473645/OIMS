package cn.com.oims.service.impl;

import cn.com.oims.dao.IDoctorsWorkstationDao;
import cn.com.oims.dao.IEMRDao;
import cn.com.oims.dao.IEMROrderDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IYanYaDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.jdbc.IEyeDao;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.DrugDict;
import cn.com.oims.dao.pojo.DrugStock;
import cn.com.oims.dao.pojo.EMRChufangQindan;
import cn.com.oims.dao.pojo.EMROrder;
import cn.com.oims.dao.pojo.EyeInfoOutpClinic;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.Suifang;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IEMRChufangService;
import cn.com.oims.service.IEMRService;
import cn.com.oims.utils.DateUtils;
import cn.com.oims.webservice.MedicineWebService;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EMRServiceImpl implements IEMRService {
  @Autowired
  private IEMRDao emrDao;
  
  @Autowired
  private MedicineWebService medicineWebService;
  
  @Autowired
  private IDoctorsWorkstationDao doctorsWorkstationDao;
  
  @Autowired
  private IYanYaDao yanYaDao;
  
  @Autowired
  private IEMRChufangService chufangService;
  
  @Autowired
  private IEMROrderDao iemrOrderDao;
  
  @Autowired
  private IJiuzhenDao jiuzhenDao;
  
  @Autowired
  private IHuanZheXinXiDao huanZheXinXiDao;
  
  @Autowired
  private IEyeDao eyeDao;
  
  @Autowired
  private IYuanGongDao yuanGongDao;
  
  private String language = "ISO-8859-1";
  
  public Long saveOrUpdate_Inquiry(Jzjl jzjl) {
    return this.emrDao.saveOrUpdate_Inquiry(jzjl);
  }
  
  @Transactional
  public void synchDrug(HttpServletRequest request) {
    try {
      HttpSession session = request.getSession();
      int max = 200, i = 1;
      while (true) {
        List<DrugDict> list = this.medicineWebService.findMedicine("", null, i, max);
        Iterator<DrugDict> itr = list.iterator();
        while (itr.hasNext()) {
          DrugDict dd = itr.next();
          List<DrugDict> ddList = this.doctorsWorkstationDao.getMedicineByKey(dd.getDrugCode(), dd.getDrugSpec());
          if (ddList != null && ddList.size() != 0) {
            dd.setId(((DrugDict)ddList.get(0)).getId());
            System.out.println(String.valueOf(dd.getDrugCode()) + "\t" + dd.getDrugSpec() + "\t" + dd.getDoseUnits());
            DrugDict ddLocal = ddList.get(0);
            ddLocal.setPrice(dd.getPrice());
            if (ddLocal.getDoseUnits().indexOf("滴眼液") != -1)
              ddLocal.setDoseUnits("滴"); 
            this.doctorsWorkstationDao.updateDrug(ddLocal);
            continue;
          } 
          if (dd.getDoseUnits().indexOf("滴眼液") != -1)
            dd.setDoseUnits("滴"); 
          this.doctorsWorkstationDao.save(dd);
        } 
        if (list.size() < max)
          break; 
        i++;
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  public void saveOrUpdateSuifang(Suifang suifang) {
    this.emrDao.saveOrUpdate(suifang);
  }
  
  private void saveOrUpdateSuifangToEyeInfoOutpClinic(Suifang suifang) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(suifang.getJiuzhenId());
    YuanGong yg = this.yuanGongDao.obtainYuanGongByGonghao(visit.getFzys());
    HuanZheXinXi patient = this.huanZheXinXiDao.findHuanZheById(visit.getHuanzheId());
    SimpleDateFormat format = new SimpleDateFormat("yyMMddHHmmss");
    EyeInfoOutpClinic eioc = null;
    try {
      eioc = this.eyeDao.getEyeInfoOutpClinic(patient.getBinglihao(), (new SimpleDateFormat("yyyy-MM-dd")).parse((new SimpleDateFormat("yyyy-MM-dd")).format(visit.getCaozuoTime())), new String(yg.getXingming().getBytes(), this.language));
      StringBuffer sb = new StringBuffer("");
      sb.append(String.valueOf((suifang.getYyrq() != null) ? ("随访时间:" + suifang.getYyrq()) : "") + ((suifang.getZhuyi() != null) ? suifang.getZhuyi() : ""));
      if (eioc == null) {
        Boolean b = this.eyeDao.findPatientById(patient.getBinglihao());
        if (!b.booleanValue())
          this.eyeDao.addPatientToEyeDatabase(patient); 
        eioc = new EyeInfoOutpClinic();
        eioc.setFlow_no(String.valueOf(patient.getBinglihao()) + format.format(visit.getCaozuoTime()));
        eioc.setCli_date((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date()));
        eioc.setPatient_id(patient.getBinglihao());
        eioc.setDoc_name(new String(yg.getXingming().getBytes(), this.language));
        eioc.setClinic_room("001");
        eioc.setPatient_age(Integer.valueOf(DateUtils.calculateAge(visit.getCaozuoTime(), patient.getShengri())));
        eioc.setTreatment_info(new String(sb.toString().getBytes(), this.language));
        eioc.setVisit_no((visit.getHaoma().length() > 8) ? "0" : visit.getHaoma());
        this.eyeDao.saveEyeInfoOutpClinic(eioc);
      } else {
        eioc.setPatient_age(Integer.valueOf(DateUtils.calculateAge(visit.getCaozuoTime(), patient.getShengri())));
        Map<String, Object> map = findCombineChuZhi(visit.getId());
        String statement = createTreatmentInfo(map, sb.toString(), "suifang", visit);
        eioc.setTreatment_info((statement == null) ? null : new String(statement.getBytes(), this.language));
        this.eyeDao.updateEyeInfoOutpClinic(eioc);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  public Suifang getSuifang(Long jiuzhenId) {
    return this.emrDao.getSuifang(jiuzhenId);
  }
  
  public List<BanGongShi> findEYEJianchashi() {
    return this.emrDao.findEYEJianchashi();
  }
  
  public Map<String, Object> findCombineChuZhi(Long id) {
    Map<String, Object> map = new HashMap<>();
    YanYa yy = this.yanYaDao.getYanYaByJiuzhenId(id);
    List<EMROrder> specical = this.iemrOrderDao.findOrders(id, Integer.valueOf(13), null);
    List<EMROrder> hospital = this.iemrOrderDao.findOrders(id, Integer.valueOf(14), null);
    List<EMROrder> lis = this.iemrOrderDao.findOrders(id, Integer.valueOf(15), null);
    List<EMROrder> treat = this.iemrOrderDao.findOrders(id, Integer.valueOf(5), null);
    Jiuzhen jz = this.jiuzhenDao.findJiuzhenById(id);
    Suifang sf = this.emrDao.getSuifang(id);
    List<Map<String, Object>> chufang_list = this.chufangService.findEMRChufangQindan(id);
    StringBuffer sb = new StringBuffer("");
    if (yy != null) {
      String[] beizhu = yy.getBeizhu().split(",");
      String methodOD = "";
      if (yy.getMethodOD() != null)
        switch (yy.getMethodOD().intValue()) {
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
      if (yy.getMethodOS() != null)
        switch (yy.getMethodOS().intValue()) {
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
      if (!(new Integer(1)).equals(yy.getRefuse())) {
        sb.append(!"".equals((yy.getOd() != null) ? (yy.getOd() + "mmHg(" + methodOD + ")") : (beizhu[0].equals("null") ? "" : ("指测" + beizhu[0]))) ? ("R:" + ((yy.getOd() != null) ? (yy.getOd() + "mmHg(" + methodOD + ")") : (beizhu[0].equals("null") ? "" : ("指测" + beizhu[0])))) : "");
        sb.append(!"".equals((yy.getOs() != null) ? (yy.getOs() + "mmHg(" + methodOS + ")") : (beizhu[1].equals("null") ? "" : ("指测" + beizhu[1]))) ? ("L:" + ((yy.getOs() != null) ? (yy.getOs() + "mmHg(" + methodOS + ")") : (beizhu[1].equals("null") ? "" : ("指测" + beizhu[1])))) : "");
      } else {
        sb.append("患者拒查");
      } 
    } 
    map.put("yanya", sb.toString());
    sb.setLength(0);
    for (EMROrder eo : specical)
      sb.append(String.valueOf(eo.getItemName()) + " "); 
    map.put("special", sb.toString());
    sb.setLength(0);
    for (EMROrder eo : hospital)
      sb.append(String.valueOf(eo.getItemName()) + " "); 
    map.put("hospital", sb.toString());
    sb.setLength(0);
    for (EMROrder eo : lis)
      sb.append(String.valueOf(eo.getItemName()) + " "); 
    map.put("lis", sb.toString());
    sb.setLength(0);
    for (EMROrder eo : treat)
      sb.append(String.valueOf(eo.getItemName()) + " "); 
    map.put("treat", String.valueOf(sb.toString()) + " " + ((jz.getTreatResult() == null) ? "" : jz.getTreatResult()));
    sb.setLength(0);
    for (Map<String, Object> m : chufang_list) {
      EMRChufangQindan cfqd = (EMRChufangQindan)m.get("cfqd");
      DrugStock dd = (DrugStock)m.get("yaopin");
      sb.append(String.valueOf(cfqd.getYaoming()) + " " + dd.getSpec() + " " + cfqd.getYongfa() + " " + cfqd.getYongyaopinlv() + cfqd.getYongliang() + dd.getDosageUnit() + ";");
    } 
    map.put("prescription", sb.toString());
    sb.setLength(0);
    sb.append((sf == null) ? "" : (String.valueOf((sf.getYyrq() != null) ? ("随访时间:" + (new SimpleDateFormat("yyyy-MM-dd")).format(sf.getYyrq())) : "") + ((sf.getZhuyi() != null) ? sf.getZhuyi() : "")));
    map.put("suifang", sb.toString());
    sb.setLength(0);
    return map;
  }
  
  public String createTreatmentInfo(Map<String, Object> map, String string, String category, Jiuzhen jz) {
    if (category != null)
      if (category.equals("yanya")) {
        map.put("yanya", string);
      } else if (category.equals("special")) {
        map.put("special", string);
      } else if (category.equals("hospital")) {
        map.put("hospital", string);
      } else if (category.equals("lis")) {
        map.put("lis", string);
      } else if (category.equals("treat")) {
        map.put("treat", string);
      } else if (category.equals("prescription")) {
        map.put("prescription", string);
      }  
    Set<String> set = map.keySet();
    StringBuffer sb = new StringBuffer("");
    for (String s : set) {
      if (map.get(s) == null || "".equals(map.get(s).toString().trim()) || "suifang".equals(s))
        continue; 
      sb.append(String.valueOf(map.get(s).toString()) + "。");
    } 
    if (map.get("suifang") != null)
      sb.append(map.get("suifang").toString()); 
    return sb.toString();
  }
  
  public Map<String, Object> findPatientList(String gonghao, Integer[] states, String search, int days, Page page) {
    if (days > 0) {
      Date date = new Date();
      Date startDate = MultiUtils.getStartTimeOfDay(MultiUtils.getPreviousDay(date, days));
      Date endDate = MultiUtils.getEndTimeOfDay(MultiUtils.getPreviousDay(date, 1));
    } else {
      Date startDate = MultiUtils.getStartTimeOfDay();
      Date endDate = MultiUtils.getEndTimeOfDay();
    } 
    List<Map<String, Object>> list = this.jiuzhenDao.findPatientList(gonghao, states, search, MultiUtils.getStartTimeOfDay(), MultiUtils.getEndTimeOfDay(), page);
    Map<String, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    return map;
  }
}
