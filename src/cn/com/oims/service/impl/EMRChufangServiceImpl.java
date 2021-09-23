package cn.com.oims.service.impl;

import cn.com.oims.common.GlobalConfig;
import cn.com.oims.dao.*;
import cn.com.oims.dao.jdbc.IEyeDao;
import cn.com.oims.dao.pojo.*;
import cn.com.oims.service.IEMRChufangService;
import cn.com.oims.service.IEMRService;
import cn.com.oims.utils.DateUtils;
import cn.com.oims.web.form.CommonSerchForm;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.MedicineWebService;
import cn.com.oims.webservice.pojo.Patient;
import cn.com.oims.webservice.pojo.PatientVistInfomation;
import cn.com.oims.webservice.pojo.medicine.Drug;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.jws.WebService;
import java.text.SimpleDateFormat;
import java.util.*;

//import org.springframework.beans.BeanUtils;

@Service
@WebService
public class EMRChufangServiceImpl implements IEMRChufangService {
  @Autowired
  private IYuanGongDao ygDao;

  @Autowired
  private IEMRChufangDao dao;

  @Autowired
  private HisWebService hisWebService;

  @Autowired
  private IHuanZheXinXiDao huanZheXinXiDao;

  @Autowired
  private IJiuzhenDao jiuzhenDao;

  @Autowired
  private MedicineWebService medicineWebService;

  @Autowired
  private IBuMenDao bumenDao;

  @Autowired
  private IEyeDao eyeDao;

  @Autowired
  private IEMRService iemrService;

  private String language = "ISO-8859-1";

  private EMRChufang e_c_f;

  public void setMedicineWebService(MedicineWebService medicineWebService) {
    this.medicineWebService = medicineWebService;
  }

  private Long getChufangId(EMRChufang chufang, HuanZheXinXi hzxx, Jiuzhen jz, YuanGong yg) {
    List<EMRChufang> list = this.dao.findChufangList(jz.getId());
    Iterator<EMRChufang> itr = list.iterator();
    Long cfId = null;
    EMRChufang cf = null;
    while (itr.hasNext()) {
      cf = itr.next();
      if (this.dao.countChufangQindan(cf.getId()) < 5 && chufang.getCfys().equals(cf.getCfys()) && chufang.getFyks().intValue() == cf.getFyks().intValue()) {
        cfId = cf.getId();
        chufang = cf;
        this.dao.updateChufang(chufang);
        break;
      }
    }
    if (cfId == null) {
      PatientVistInfomation pvi = new PatientVistInfomation();
      Patient p = new Patient();
      p.setPatientId(hzxx.getBinglihao());
      pvi.setPatient(p);
      pvi.setVisitDate(jz.getCaozuoTime());
      pvi.setVisitNo(jz.getHaoma());
      pvi.setReqDept("230320");
      pvi.setReqPhysician(yg.getXingming());
      String no = this.hisWebService.addOutpOrders(pvi);
      chufang.setCfdh(String.valueOf(no) + "_" + (list.size() + 1));
      cfId = this.dao.saveChufang(chufang);
    }
    this.e_c_f = chufang;
    return cfId;
  }

  @Transactional
  public List<Long> saveChufang(List<EMRChufangQindan> list, Long jiuzhenId, Long huanzheId, String gonghao) {
    List<Long> list_l = new ArrayList<Long>();
    List<Long> list_l1 = new ArrayList<Long>();
    List<EMRChufangQindan> oldList = this.dao.findChufangQindanByJiuzhenId(jiuzhenId);
    HuanZheXinXi hzxx = this.huanZheXinXiDao.findHuanZheById(huanzheId);
    Jiuzhen jz = this.jiuzhenDao.findJiuzhenById(jiuzhenId);
    YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
    Iterator<EMRChufangQindan> itr = list.iterator();
    Map<Long, List<OutpPresc>> map = new HashMap<Long, List<OutpPresc>>();
    while (itr.hasNext()) {
      EMRChufang chufang = new EMRChufang();
      chufang.setJiuzhenId(jiuzhenId);
      chufang.setHuanzheId(huanzheId);
      chufang.setCfys(gonghao);
      chufang.setCfks(yg.getBumenId());
      chufang.setCfsj(new Date());
      chufang.setCfjb(Integer.valueOf(0));
      EMRChufangQindan qd = itr.next();
      DrugStock drug = this.dao.getDrugStockById(qd.getYaopinId());
      boolean x = false;
      for (EMRChufangQindan oq : oldList) {
        if (oq.getYaopinId().intValue() == qd.getYaopinId().intValue()) {
          EMRChufang ecf = this.dao.getChufang(oq.getChufangId());
          OutpPresc op = new OutpPresc();
          op.setSerialNo(Long.valueOf(Long.parseLong(ecf.getCfdh().split("_")[0])));
          op.setDrugCode(drug.getDrugCode());
          op.setDrugSpec(drug.getPackageSpec());
          op.setUnits(drug.getPackageUnits());
          op.setCosts((drug.getPrice().floatValue() * qd.getShuliang().floatValue()));
          op.setCharges((drug.getPrice().floatValue() * qd.getShuliang().floatValue()));
          op.setAdministration(qd.getYongfa());
          op.setAmount(Integer.valueOf((int)qd.getShuliang().floatValue()));
          op.setDosage(Double.parseDouble(qd.getYongliang()));
          op.setFrequency(qd.getYongyaopinlv());
          Boolean b = this.medicineWebService.isDeleteOutpPresc(op);
          if (!b.booleanValue()) {
            list_l.add(oq.getYaopinId());
          } else {
            oq.setShuliang(qd.getShuliang());
            oq.setYongfa(qd.getYongfa());
            oq.setYongliang(qd.getYongliang());
            String unit = (drug.getDosageUnit().indexOf("滴眼液") != -1) ? "滴" : drug.getDosageUnit();
            op.setDosageUnits(unit);
            oq.setYongyaopinlv(qd.getYongyaopinlv());
            this.dao.updateEMRChufangQindan(oq);
            this.medicineWebService.updateOutpPresc(op);
          }
          oldList.remove(oq);
          x = true;
          break;
        }
      }
      if (x)
        continue;
      chufang.setFyks(drug.getBumenId());
      Long chufangId = getChufangId(chufang, hzxx, jz, yg);
      qd.setChufangId(chufangId);
      qd.setJiage(drug.getPrice());
      qd.setYaoming(drug.getDrugName());
      this.dao.saveChufangQindan(qd);
      List<OutpPresc> prescList = map.getOrDefault(chufangId, new ArrayList());
      OutpPresc presc = prescriptionToHis(jz, this.e_c_f, qd);
      if (!prescList.contains(presc)) {
        prescList.add(presc);
        map.put(chufangId, prescList);
      }
      updateChufangJiage(chufangId);
    }
    if (oldList.size() > 0)
      list_l1 = deleteChufangQindan(oldList);
    PatientVistInfomation pvi = new PatientVistInfomation();
    Patient p = new Patient();
    p.setPatientId(hzxx.getBinglihao());
    pvi.setPatient(p);
    pvi.setVisitDate(jz.getCaozuoTime());
    pvi.setVisitNo(jz.getHaoma());
    for (Long chufangId : map.keySet()) {
      EMRChufang chufang = this.dao.getChufang(chufangId);
      chufang.setJifeiFlag(this.medicineWebService.saveOutpPrescList(pvi, map.get(chufangId)));
      this.dao.updateChufang(chufang);
    }
    list_l.addAll(list_l1);
    return list_l;
  }

  private void saveOrUpdateChufangToEyeInfoOutpClinic(Long jiuzhenId) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(jiuzhenId);
    YuanGong yg = this.ygDao.obtainYuanGongByGonghao(visit.getFzys());
    HuanZheXinXi patient = this.huanZheXinXiDao.findHuanZheById(visit.getHuanzheId());
    SimpleDateFormat format = new SimpleDateFormat("yyMMddHHmmss");
    EyeInfoOutpClinic eioc = null;
    List<Map<String, Object>> chufangList = findEMRChufangQindan(jiuzhenId);
    try {
      eioc = this.eyeDao.getEyeInfoOutpClinic(patient.getBinglihao(), (new SimpleDateFormat("yyyy-MM-dd")).parse((new SimpleDateFormat("yyyy-MM-dd")).format(visit.getCaozuoTime())), new String(yg.getXingming().getBytes(), this.language));
      StringBuffer sb = new StringBuffer("");
      for (Map<String, Object> m : chufangList) {
        EMRChufangQindan cfqd = (EMRChufangQindan)m.get("cfqd");
        DrugStock dd = (DrugStock)m.get("yaopin");
        sb.append(String.valueOf(dd.getDrugName()) + cfqd.getYongliang() + dd.getDosageUnit() + cfqd.getYongfa() + cfqd.getYongyaopinlv() + " ");
      }
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
        this.eyeDao.saveEyeInfoOutpClinic(eioc);
      } else {
        eioc.setPatient_age(Integer.valueOf(DateUtils.calculateAge(visit.getCaozuoTime(), patient.getShengri())));
        Map<String, Object> map = this.iemrService.findCombineChuZhi(visit.getId());
        String statement = this.iemrService.createTreatmentInfo(map, sb.toString(), "prescription", visit);
        eioc.setTreatment_info((statement == null) ? null : new String(statement.getBytes(), this.language));
        this.eyeDao.updateEyeInfoOutpClinic(eioc);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public int getPrescriptionItemNoFromHis(OutpPresc op) {
    for (int i = 0; i < 3; i++) {
      Integer k = this.hisWebService.findOutpPrescByPK(op);
      if (k != null && k.intValue() > 0) {
        op.setItemNo(Integer.valueOf(op.getItemNo().intValue() + 1));
        if (i > 1)
          System.out.println("getPrescriptionItemNoFromHis:" + op.getSerialNo());
      }
    }
    return op.getItemNo().intValue();
  }

  private OutpPresc prescriptionToHis(Jiuzhen jz, EMRChufang chufang, EMRChufangQindan qd) {
    OutpPresc op = new OutpPresc();
    op.setVisitDate(jz.getCaozuoTime());
    op.setVisitNo(jz.getHaoma());
    String serialNo = chufang.getCfdh().split("_")[0];
    op.setSerialNo(Long.valueOf(Long.parseLong(chufang.getCfdh().split("_")[0])));
    op.setPrescNo(Integer.valueOf(Integer.parseInt(chufang.getCfdh().split("_")[1])));
    op.setItemClass("A");
    DrugStock ds = this.dao.getDrugStockById(qd.getYaopinId());
    op.setDrugCode(ds.getDrugCode());
    op.setDrugName(ds.getDrugName());
    op.setDrugSpec(ds.getPackageSpec());
    op.setUnits(ds.getPackageUnits());
    op.setAmount(Integer.valueOf((int)qd.getShuliang().floatValue()));
    op.setDosage(Double.parseDouble(qd.getYongliang()));
    op.setAdministration(qd.getYongfa());
    op.setFrequency(qd.getYongyaopinlv());
    op.setFirmId(ds.getFirmId());
    op.setCosts((qd.getJiage().floatValue() * qd.getShuliang().floatValue()));
    op.setCharges((qd.getJiage().floatValue() * qd.getShuliang().floatValue()));
    op.setDispensary(ds.getDrugStockId().split("@")[5]);
    String unit = (ds.getDosageUnit().indexOf("滴眼液") != -1) ? "滴" : ds.getDosageUnit();
    op.setDosageUnits(unit);
    return op;
  }

  @Transactional
  public List<Long> deleteChufangQindan(List<EMRChufangQindan> oldList) {
    List<Long> list_l = new ArrayList<Long>();
    Iterator<EMRChufangQindan> itr = oldList.iterator();
    while (itr.hasNext()) {
      EMRChufangQindan qindan = itr.next();
      Long chufangId = qindan.getChufangId();
      EMRChufang ecf = this.dao.getChufang(chufangId);
      DrugStock ds = this.dao.getDrugStockById(qindan.getYaopinId());
      OutpPresc op = new OutpPresc();
      op.setSerialNo(Long.valueOf(Long.parseLong(ecf.getCfdh().split("_")[0])));
      op.setDrugCode(ds.getDrugCode());
      op.setDrugSpec(ds.getPackageSpec());
      op.setUnits(ds.getPackageUnits());
      Boolean b = this.medicineWebService.isDeleteOutpPresc(op);
      if (!b.booleanValue()) {
        list_l.add(qindan.getYaopinId());
        continue;
      }
      this.medicineWebService.deleteOutpPresc(op);
      this.dao.deleteChufangQindan(qindan);
      List<EMRChufangQindan> list = this.dao.findChufangQindanByChufangId(chufangId);
      if (list.size() == 0) {
        this.dao.deleteChufang(this.dao.getChufang(chufangId));
        continue;
      }
      updateChufangJiage(chufangId);
    }
    return list_l;
  }

  private void updateChufangJiage(Long chufangId) {
    List<EMRChufangQindan> list = this.dao.findChufangQindanByChufangId(chufangId);
    Iterator<EMRChufangQindan> itr = list.iterator();
    float money = 0.0F;
    while (itr.hasNext()) {
      EMRChufangQindan qd = itr.next();
      if (qd.getJiage() != null)
        money += qd.getJiage().floatValue() * qd.getShuliang().floatValue();
    }
    EMRChufang chufang = this.dao.getChufang(chufangId);
    chufang.setZongjia(Float.valueOf(money));
    this.dao.updateChufang(chufang);
  }

  public List<Map<String, Object>> findEMRChufang(Long jiuzhenId) {
    List<EMRChufang> list = this.dao.findChufangList(jiuzhenId);
    Iterator<EMRChufang> itr = list.iterator();
    List<Map<String, Object>> nl = new ArrayList<Map<String, Object>>();
    while (itr.hasNext()) {
      EMRChufang cf = itr.next();
      Map<String, Object> map = new HashMap<String, Object>();
      map.put("chufang", cf);
      List<EMRChufangQindan> ql = this.dao.findChufangQindanByChufangId(cf.getId());
      map.put("qindan", ql);
      nl.add(map);
    }
    list.clear();
    list = null;
    return nl;
  }

  public void deleteChufangAll(Long jiuzhenId) {
    List<EMRChufang> list = this.dao.findChufangList(jiuzhenId);
    Iterator<EMRChufang> itr = list.iterator();
    while (itr.hasNext()) {
      EMRChufang cf = itr.next();
      List<EMRChufangQindan> ql = this.dao.findChufangQindanByChufangId(cf.getId());
      this.dao.deleteChufangQindanAll(ql);
      this.dao.deleteChufang(cf);
    }
  }

  public List<Map<String, Object>> findEMRChufangQindan(Long jiuzhenId) {
    List<Map<String, Object>> nl = new ArrayList<Map<String, Object>>();
    List<EMRChufangQindan> list = this.dao.findChufangQindan(jiuzhenId);
    Iterator<EMRChufangQindan> itr = list.iterator();
    while (itr.hasNext()) {
      EMRChufangQindan chufang = itr.next();
      DrugStock dd = this.dao.getDrugStockById(chufang.getYaopinId());
      Long chufangId = chufang.getChufangId();
      OutpPresc op = new OutpPresc();
      EMRChufang ecf = this.dao.getChufang(chufangId);
      if (ecf == null)
        continue;
      DrugStock ds = this.dao.getDrugStockById(chufang.getYaopinId());
      try {
        if (ecf.getCfdh() != null)
          op.setSerialNo(Long.valueOf(Long.parseLong(ecf.getCfdh().split("_")[0])));
      } catch (Exception exception) {}
      op.setDrugCode(ds.getDrugCode());
      op.setDrugSpec(ds.getPackageSpec());
      op.setUnits(ds.getPackageUnits());
      Boolean b = this.medicineWebService.isDeleteOutpPresc(op);
      if (!b.booleanValue())
        chufang.setJifeiFlag(Integer.valueOf(1));
      Map<String, Object> map = new HashMap<String, Object>();
      map.put("cfqd", chufang);
      map.put("yaopin", dd);
      nl.add(map);
    }
    list.clear();
    list = null;
    return nl;
  }

  public List<DrugDict> findDrugDictList(Page page, Integer categoryId, String search, String storename) {
    String categoryIds = null;
    List<DrugDict> list = this.dao.findDrugDictList(page, categoryIds, search, storename);
    if (list.size() == 0) {
      syncDrugList(search.toUpperCase());
      list = this.dao.findDrugDictList(page, categoryIds, search, storename);
    }
    return list;
  }

  public DrugDict getDrugDictInfo(Long id) {
    DrugDict dict = this.dao.getEMRDrugDict(id);
    if (dict.getUpdateTime() == null || dict.getUpdateTime().before(MultiUtils.getStartTimeOfDay())) {
      Float price = this.medicineWebService.getMedicinePrice(dict.getDrugCode());
      dict.setPrice(price);
      dict.setUpdateTime(new Date());
      this.dao.update("DrugDict", dict);
    }
    Float storage = this.medicineWebService.getMedicineStorage(dict.getDrugCode());
    dict.setStore(storage);
    this.dao.update("DrugDict", dict);
    return dict;
  }

  public List<DrugStock> findDrugStockList(Long drugDictId) {
    List<DrugStock> list = this.dao.findDrugStockList(drugDictId, true);
    List<DrugStock> returnList = new ArrayList<DrugStock>();
    for (DrugStock stock : list) {
      if (stock.getUpdateTime() == null || stock.getUpdateTime().before(MultiUtils.getStartTimeOfDay())) {
        Float price = this.medicineWebService.getMedicinePrice(stock.getDrugStockId());
        stock.setPrice(price);
        stock.setUpdateTime(new Date());
        this.dao.update("DrugStock", stock);
      }
      Float storage = this.medicineWebService.getMedicineStorage(stock.getDrugStockId());
      stock.setStore(storage);
      this.dao.update("DrugStock", stock);
      if (storage != null && storage.floatValue() > 0.0F)
        returnList.add(stock);
    }
    list.clear();
    list = null;
    return returnList;
  }

  public void syncDrug() {
    syncDrugList(null);
  }

  private void syncDrugList(String search){///同步药品字典表
    if(!GlobalConfig.MODEL_DRUG_SYNC)return;
    int page=1;
    int pageSize=1000;
    while(true){
      List<DrugDict> list = medicineWebService.findMedicine(search, null, page, pageSize);//选择his中有库存的药品，也可能没有对应价表
      if(list==null||list.size()==0)break;
      Iterator<DrugDict> itr = list.iterator();
      while(itr.hasNext()){
        DrugDict dict = itr.next();
        DrugDict old = this.dao.getEMRDrugDictByCode(dict.getDrugCode());
        if(old==null){
          dao.save("DrugDict", dict);
          syncDrugStock (dict);
        }else{
          Long id = old.getId();
          org.springframework.beans.BeanUtils.copyProperties(dict, old,new String[]{"enableFlag"} );
          old.setId(id);
          dao.update("DrugDict", old);
          syncDrugStock(old);
        }
      }
      page++;
      if(list.size()<pageSize)break;
    }
  }

  private void syncDrugStock(DrugDict dict) {
    List<Drug> list = this.medicineWebService.findDrugStock(dict.getDrugCode());
    if (list == null || list.size() == 0) {
      System.out.println("code:" + dict.getDrugCode() + " 没有找到对应的药品库存");
      return;
    }
    Iterator<Drug> itr = list.iterator();
    while (itr.hasNext()) {
      Drug drug = itr.next();
      DrugStock stock = this.dao.getDrugStock(drug.getId());
      Long id = null;
      if (stock == null) {
        stock = new DrugStock();
        stock.setInsertTime(new Date());
      } else {
        id = stock.getId();
      }
      try {
        BeanUtils.copyProperties(stock, drug);
      } catch (Exception e) {
        e.printStackTrace();
      }
      stock.setId(id);
      stock.setDrugDictId(dict.getId());
      stock.setDrugStockId(drug.getId());
      BuMen bumen = this.bumenDao.getBuMenByBmbm(drug.getDept().getDeptCode());
      if (bumen == null) {
        bumen = new BuMen();
        bumen.setDwid(Integer.valueOf(1));
        bumen.setBmbm(drug.getDept().getDeptCode());
      }
      bumen.setBmmc(drug.getDept().getName());
      this.bumenDao.saveOrUpdateBuMen(bumen);
      stock.setBumenId(bumen.getId());
      stock.setStoreName(bumen.getBmmc());
      stock.setUpdateTime(new Date());
      if (stock.getDosageUnit().indexOf("滴眼液") != -1)
        stock.setDosageUnit("滴");
      this.dao.saveOrUpdateDrug(stock);
      DrugDict old = this.dao.getEMRDrugDictByCode(dict.getDrugCode());
      old.setPackageSpec(stock.getPackageSpec());
      this.dao.update("DrugDict", old);
    }
  }

  public List<EMRChufangQindan> findQINDANByJzAndYaoPin(Long jiuzhenId, Long yaopinId) {
    List<EMRChufang> list = this.dao.findChufangList(jiuzhenId);
    List<EMRChufangQindan> list_qindan = new ArrayList<EMRChufangQindan>();
    for (EMRChufang ecf : list) {
      List<EMRChufangQindan> list_qindan_temp = this.dao.findQINDANByJzAndYaoPin(ecf.getId(), yaopinId);
      if (list_qindan_temp != null && list_qindan_temp.size() > 0)
        list_qindan.addAll(list_qindan_temp);
    }
    return list_qindan;
  }

  public Map<String, Object> findDrugDictPageList(Page page, String search) {
    Map<String, Object> m = new HashMap<String, Object>();
    m.put("list", this.dao.findDrugDictPageList(page, search));
    m.put("page", page);
    return m;
  }

  public Map<String, Object> findDrugTJPageList(Page page, CommonSerchForm searchform) {
    List<Map<String, Object>> list = this.dao.findDrugTJPageList(page, searchform);
    Map<String, Object> m = new HashMap<String, Object>();
    m.put("list", list);
    m.put("page", page);
    return m;
  }

  public Map<String, Object> findUseDocList(CommonSerchForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    List<Object> list = this.dao.findUseDocList(form);
    Iterator<Object> itr = list.iterator();
    Object[] arg = new Object[5];
    while (itr.hasNext()) {
      arg = (Object[])itr.next();
      String gonghao = (String)arg[3];
      List jbList = this.dao.findZdByGh(form, gonghao);
      StringBuffer buf = new StringBuffer();
      for (int i = 0, loop = jbList.size(); i < loop; i++) {
        if (i == loop - 1) {
          buf.append(jbList.get(i));
        } else {
          buf.append((new StringBuilder()).append(jbList.get(i)).append("、").toString());
        }
      }
      arg[3] = buf.toString();
    }
    map.put("list", list);
    return map;
  }

  public void updateDrugUse(Long id) {
    DrugDict dd = this.dao.getEMRDrugDict(id);
    if (dd.isEnableFlag()) {
      dd.setEnableFlag(Boolean.valueOf(false));
    } else {
      dd.setEnableFlag(Boolean.valueOf(true));
    }
    this.dao.update("DrugDict", dd);
  }

  public DrugStock getDrugStockById(Long id) {
    return this.dao.getDrugStockById(id);
  }
}
