package cn.com.oims.service.impl;

import cn.com.oims.common.CommonFunction;
import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.common.Utils;
import cn.com.oims.dao.ICategoryDao;
import cn.com.oims.dao.IDoctorsWorkstationDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IJzjlDao;
import cn.com.oims.dao.IShiLiDao;
import cn.com.oims.dao.IYanYaDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.JzZhenduan;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.ShiLi;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IDoctorsWorkstationService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.web.form.HzjzForm;
import cn.com.oims.web.form.JiuZhenSearchform;
import cn.com.oims.web.form.MCForm;
import cn.com.oims.web.server.HisService;
import cn.com.oims.webservice.HisWebService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JiuzhenServiceImpl implements IJiuzhenService {
  private final String JIDONG = "机动";
  
  private final String JIZHEN = "急诊眼科";
  
  IJiuzhenDao dao = null;
  
  private IJzjlDao jzDao;
  
  ICategoryDao categoryDao = null;
  
  IHuanZheXinXiDao hzDao;
  
  IDoctorsWorkstationService doctorsWorkstationService;
  
  private IShiLiDao shiLiDao;
  
  private IYanYaDao yanYaDao;
  
  private IHuanZheXinXiDao huanZheXinXiDao;
  
  private IDoctorsWorkstationDao doctorsWorkstationDao;
  
  private IOimsLogService oimsLogService;
  
  private IYuanGongDao yuanGongDao;
  
  private HisService hisService;
  
  @Autowired
  private HisWebService hisWebService;
  
  @Autowired
  public void setYuanGongDao(IYuanGongDao yuanGongDao) {
    this.yuanGongDao = yuanGongDao;
  }
  
  @Autowired
  public void setHisService(HisService hisService) {
    this.hisService = hisService;
  }
  
  @Autowired
  public void setHuanZheXinXiDao(IHuanZheXinXiDao huanZheXinXiDao) {
    this.huanZheXinXiDao = huanZheXinXiDao;
  }
  
  @Autowired
  public void setOimsLogService(IOimsLogService oimsLogService) {
    this.oimsLogService = oimsLogService;
  }
  
  @Autowired
  public void setDoctorsWorkstationDao(IDoctorsWorkstationDao doctorsWorkstationDao) {
    this.doctorsWorkstationDao = doctorsWorkstationDao;
  }
  
  @Autowired
  public void setShiLiDao(IShiLiDao shiLiDao) {
    this.shiLiDao = shiLiDao;
  }
  
  @Autowired
  public void setYanYaDao(IYanYaDao yanYaDao) {
    this.yanYaDao = yanYaDao;
  }
  
  @Autowired
  public void setDoctorsWorkstationService(IDoctorsWorkstationService doctorsWorkstationService) {
    this.doctorsWorkstationService = doctorsWorkstationService;
  }
  
  @Autowired
  public void setHzDao(IHuanZheXinXiDao hzDao) {
    this.hzDao = hzDao;
  }
  
  @Autowired
  public void setDao(IJiuzhenDao dao) {
    this.dao = dao;
  }
  
  @Autowired
  public void setJzDao(IJzjlDao jzDao) {
    this.jzDao = jzDao;
  }
  
  @Autowired
  public void setCategoryDao(ICategoryDao categoryDao) {
    this.categoryDao = categoryDao;
  }
  
  public Serializable saveJiuzhen(Jiuzhen o) {
    return this.dao.saveJiuzhen(o);
  }
  
  public void delJiuzhenById(Serializable id) {
    this.dao.delJiuzhen(id);
  }
  
  public Serializable saveOrUpdateJiuzhen(Jiuzhen o) {
    if (o.getHaoma() == null || o.getHaoma().isEmpty()) {
      String haoma = "OIMS";
      int num = this.dao.getJiuzhenTodayCount();
      do {
        num++;
      } while (this.dao.findJiuzhenByHaoma(String.valueOf(haoma) + num) != null);
      o.setHaoma(String.valueOf(haoma) + num);
    } 
    if (o.getId() == null)
      return this.dao.saveJiuzhen(o); 
    this.dao.updateJiuzhen(o);
    return o.getId();
  }
  
  public List<Jiuzhen> findAllJiuzhen() {
    return this.dao.findAllJiuzhen();
  }
  
  public Map<String, Object> findAllJiuzhen4Page(Page p) {
    Map<String, Object> m = new HashMap<>();
    m.put("list", this.dao.findAllJiuzhen4Page(p));
    m.put("page", p);
    return m;
  }
  
  public Jiuzhen getJiuzhenById(Serializable id) {
    return this.dao.findJiuzhenById(id);
  }
  
  public void updateJiuzhen(Jiuzhen o) {
    this.dao.updateJiuzhen(o);
  }
  
  public List getJiuZhenHuanZheList(Page page, JiuZhenSearchform jzsf) {
    List list = this.dao.getJiuZhenHuanZheList(page, jzsf);
    convert(page, list);
    return list;
  }
  
  private void convert(Page page, List list) {
    Iterator itr = list.iterator();
    int i = (page.getCurrentPage().intValue() - 1) * page.getPageSize().intValue() + 1;
    while (itr.hasNext()) {
      Map map = (Map) itr.next();
      map.put("paihao", Integer.valueOf(i));
      i++;
      if (map.get("jiuzhenState") != null) {
        int state = 
          Integer.parseInt(map.get("jiuzhenState").toString());
        Category category = this.categoryDao.findCategoryById(Integer.valueOf(state));
        map.put("state", category.getCategory());
      } 
      if (map.get("caozuoTime") != null) {
        String caozuoTime = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"))
          .format(map.get("caozuoTime"));
        map.put("caozuoTime", caozuoTime);
      } 
      if (map.get("csrq") != null) {
        String csrq = (new SimpleDateFormat("yyyy-MM-dd")).format(map
            .get("csrq"));
        map.put("csrq", csrq);
        map.put("nianling", CommonFunction.getNianlingByCsrq(csrq));
      } else {
        map.put("csrq", "");
        map.put("nianling", "");
      } 
      if (map.get("hzxb") != null) {
        boolean xb = ((Boolean)map.get("hzxb")).booleanValue();
        String xbstr = xb ? "男" : "女";
        map.put("hzxb", xbstr);
      } 
      if (map.get("sfzh") == null)
        map.put("sfzh", " "); 
      if (map.get("huanzheid") != null) {
        Long huanzheid = 
          Long.valueOf(Long.parseLong(map.get("huanzheid").toString()));
        int state = 
          Integer.parseInt(map.get("jiuzhenState").toString());
        int times = this.dao.getJiuZhenTime(huanzheid, state);
        map.put("times", Integer.valueOf(times));
      } 
    } 
  }
  
  public Long findJzcsByHuanzheId(Long id, Integer state) {
    return this.dao.findJzcsByHuanzheId(id, state);
  }
  
  public List getPatientListToday(String state, String gonghao, String search, String path) {
    return this.dao.getPatientListToday(state, gonghao, search, path);
  }
  
  public List getPatientStateCount(Integer state, String gonghao) {
    return this.dao.getPatientStateCount(state, gonghao);
  }
  
  public List getMedicalRecords(String hzid) {
    return this.dao.getMedicalRecords(hzid);
  }
  
  public List<Jzjl> getMC(String jzid, String cid) {
    return this.dao.getMC(jzid, cid);
  }
  
  public String saveOrUpdateMC(String jlid, String jlr, String jzid, String cid, String info) {
    return this.dao.saveOrUpdateMC(jlid, jlr, jzid, cid, info);
  }
  
  public List getShiLiUrl(String jzid) {
    return this.dao.getShiLiUrl(jzid);
  }
  
  public List getStudyList(String jzid) {
    return this.dao.getStudyList(jzid);
  }
  
  public List getYanYaUrl(String jzid) {
    return this.dao.getYanYaUrl(jzid);
  }
  
  public List getOnePatient(String jzid) {
    return this.dao.getOnePatient(jzid);
  }
  
  public List<Map<String, Object>> getShuruMoBan(String cid) {
    return this.dao.getShuruMoBan(cid);
  }
  
  public boolean isExistJiuZhenToHuanZheXinXi(Long hzid) {
    return this.dao.isExistJiuZhenToHuanZheXinXi(hzid);
  }
  
  public List<Map<String, Object>> getStudy(String jcdid, String path) {
    return this.dao.getStudy(jcdid, path);
  }
  
  public List<Map<String, Object>> getChangGuiList(String cid) {
    return this.dao.getChangGuiList(cid);
  }
  
  public List<Map<String, Object>> getTeShuList(String cid) {
    return this.dao.getTeShuList(cid);
  }
  
  public List getJiuZhenState(String state) {
    return this.dao.getJiuZhenState(state);
  }
  
  public List<Map<String, Object>> getZhenDuanList(String jzid) {
    return this.dao.getZhenDuanList(jzid);
  }
  
  public boolean saveJcdInfo(String jzid, String hzid, String jcxmids, String kdys, String yb, String jcyq) {
    boolean bl = false;
    try {
      if (jcxmids.length() > 0) {
        String[] jcxms = jcxmids.split("x8x");
        for (int i = 0; i < jcxms.length; i++) {
          String[] jcxm = jcxms[i].split("v8v");
          String jcxm_id = jcxm[0];
          String jcxm_name = jcxm[1];
          String pic_path = jcxm[2];
          String jcxmyq = jcxm[3];
          String pic_1 = "";
          String pic_2 = "";
          if (!"tsjc".equals(pic_path) && !"cgjc".equals(pic_path)) {
            pic_1 = pic_path.split(",")[0];
            pic_2 = pic_path.split(",")[1];
          } 
          String str1 = this.dao.saveJcdInfo(jzid, hzid, jcxm_id, 
              jcxm_name, pic_1, pic_2, kdys, yb, jcxmyq);
        } 
      } 
      bl = true;
    } catch (Exception e) {
      bl = false;
      e.printStackTrace();
    } 
    return bl;
  }
  
  public boolean addPaiDuiInfo(String jcdh, String bgsid, int xh) {
    return this.dao.addPaiDuiInfo(jcdh, bgsid, xh);
  }
  
  public String getMaxPaiDuiXuHao() {
    return this.dao.getMaxPaiDuiXuHao();
  }
  
  public String getOfficeId(String jcxmid) {
    return this.dao.getOfficeId(jcxmid);
  }
  
  public boolean updateJiuZhenState(String jzid, String czys, String newstate) {
    return this.dao.updateJiuZhenState(jzid, czys, newstate);
  }
  
  public List<Map<String, Object>> getJiBingList(String jblb) {
    List<Map<String, Object>> list_result = new ArrayList<>();
    getjblist(jblb, list_result);
    return list_result;
  }
  
  public void getjblist(String jblb, List<Map<String, Object>> list_result) {
    List<Map<String, Object>> list_temp = new ArrayList<>();
    list_temp = this.dao.getJiBingList(jblb);
    if (list_temp.size() > 0)
      for (int i = 0; i < list_temp.size(); i++) {
        Map<String, Object> map = new HashMap<>();
        map = list_temp.get(i);
        list_result.add(map);
        try {
          getjblist(map.get("id").toString(), list_result);
        } catch (Exception e) {
          e.printStackTrace();
        } 
      }  
  }
  
  public boolean delZhenDuan(String zdflid, String jzid) {
    return this.dao.delZhenDuan(Integer.valueOf(Integer.parseInt(zdflid)), jzid);
  }
  
  public List<Map<String, Object>> matchJiBingName(String name) {
    return this.dao.matchJiBingName(name);
  }
  
  public boolean saveZhenDuan(String jbfl, String jzid, String confirm, String czys) {
    return this.dao.saveZhenDuan(Integer.valueOf(Integer.parseInt(jbfl)), jzid, confirm, czys);
  }
  
  public List<Map<String, Object>> getYanBieCategory(String fid) {
    return this.dao.getYanBieCategory(fid);
  }
  
  public Long saveOrUpdateMC(MCForm mcForm, String gonghao) {
    Long id = mcForm.getId();
    if (id == null) {
      Jzjl jzjl = new Jzjl();
      jzjl.setJilu(mcForm.getVal());
      jzjl.setCategoryId(mcForm.getCategoryId());
      jzjl.setJiuzhenId(mcForm.getMdId());
      jzjl.setJlTime(new Date());
      jzjl.setJlren(gonghao);
      jzjl.setPicPath(mcForm.getPath());
      return (Long)this.jzDao.saveJzjl(jzjl);
    } 
    Jzjl old = this.jzDao.findJzjlById(id);
    if (old == null)
      return null; 
    old.setJilu(mcForm.getVal());
    old.setPicPath(mcForm.getPath());
    this.jzDao.updateJzjl(old);
    return id;
  }
  
  public List<Map<String, Object>> getJiuZhenImage(String jzid) {
    return this.dao.getJiuZhenImage(jzid);
  }
  
  public List<Map<String, Object>> getZhenDuanInfo(String jzid) {
    return this.dao.getZhenDuanInfo(jzid);
  }
  
  public List getJiBingIntrList(String jblb) {
    return this.dao.getJiBingIntrList(jblb);
  }
  
  public List getPatientListTodayByPage(String state, String gonghao, Page p, String search, String path) {
    List list = this.dao.getPatientListTodayByPage(state, gonghao, p, search, 
        path);
    return list;
  }
  
  public Date stringToDate(String string) {
    if ("".equals(string))
      return null; 
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    Date date = null;
    try {
      date = simpleDateFormat.parse(string);
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    return date;
  }
  
  public Date stringToDateTime(String string) {
    if ("".equals(string))
      return null; 
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
        "yyyy-MM-dd HH:mm:ss");
    Date date = null;
    try {
      date = simpleDateFormat.parse(string);
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    return date;
  }
  
  private void createVisitInfo(Map<String, Object> map, HuanZheXinXi hzxx) {
    try {
      if (map.get("DOCTOR") == null)
        return; 
      String docName = map.get("DOCTOR").toString();
      docName = new String(docName.getBytes("iso-8859-1"), "GBK");
      YuanGong yg = new YuanGong();
      yg.setXingming(docName);
      List<YuanGong> ygs = this.yuanGongDao.findYuanGongsByYuanGong(yg);
      if (ygs == null || ygs.size() == 0)
        return; 
      yg = ygs.get(0);
      Jiuzhen visit = new Jiuzhen();
      visit.setJzChargeType((map.get("charge_type") == null) ? null : new String(map.get("charge_type").toString().getBytes("iso-8859-1"), "GBK"));
      visit.setHaoma(map.get("VISIT_NO").toString());
      visit.setHuanzheId(hzxx.getId());
      visit.setSerialNo(Integer.valueOf(Integer.parseInt(map.get("SERIAL_NO").toString())));
      String operator = (map.get("OPERATOR") == null) ? "" : map
        .get("OPERATOR").toString();
      visit.setCaozuoren(new String(operator.getBytes("iso-8859-1"), "GBK"));
      visit.setCaozuoTime((Date)map.get("VISIT_DATE"));
      visit.setFzys(yg.getGonghao());
      visit.setState(Integer.valueOf(27));
      String clinicLabel = (map.get("CLINIC_LABEL") != null) ? map.get(
          "CLINIC_LABEL").toString() : null;
      clinicLabel = new String(clinicLabel.getBytes("iso-8859-1"), "GBK");
      visit.setBeizhu(clinicLabel);
      if ("机动".equals(docName)) {
        if ("急诊眼科".equals(clinicLabel)) {
          visit.setZhenbie(Integer.valueOf(60100));
        } else {
          visit.setZhenbie(Integer.valueOf(2));
        } 
      } else {
        visit.setZhenbie(Integer.valueOf(2));
      } 
      visit.setJzks(yg.getBumenId().intValue());
      int age = Utils.getAge(hzxx.getShengri()).intValue();
      visit.setAge(Integer.valueOf(age));
      this.dao.saveJiuzhen(visit);
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  public Jiuzhen findLastJiuZhenByHuanZhe(Long hzid) {
    return this.dao.findLastJiuZhenByHuanZhe(hzid);
  }
  
  public Long saveOrUpdateMC_New(String jl_id, String jz_id, String category_id, String jl_info, String pic_path, String jlr) {
    return this.dao.saveOrUpdateMC_New(jl_id, jz_id, category_id, jl_info, 
        pic_path, jlr);
  }
  
  public String getJcxmIntrUrl(String jcxmid) {
    return this.dao.getJcxmIntrUrl(jcxmid);
  }
  
  public List<Map<String, Object>> getTeShuListAll(String cid) {
    return this.dao.getTeShuListAll(cid);
  }
  
  public List getYanGuangUrl(String jzid) {
    return this.dao.getYanGuangUrl(jzid);
  }
  
  public JiuZhenSearchform getJiuZhenByBlh(String blh) {
    List list = this.dao.getJiuZhenByBlh(blh);
    JiuZhenSearchform jzsf = null;
    Iterator<Map> itr = list.iterator();
    if (itr.hasNext()) {
      Map map = itr.next();
      jzsf = new JiuZhenSearchform();
      if (map.get("xingming") != null)
        jzsf.setXingming(map.get("xingming").toString()); 
      if (map.get("xingbie") != null)
        if (map.get("xingbie").toString().equals("true") || 
          map.get("xingbie").toString().equals("1")) {
          jzsf.setXingbie(Integer.valueOf(1));
        } else {
          jzsf.setXingbie(Integer.valueOf(0));
        }  
      if (map.get("shengri") != null)
        jzsf.setCsrq(map.get("shengri").toString().split(" ")[0]); 
      if (map.get("sfzh") != null)
        jzsf.setSfzh(map.get("sfzh").toString()); 
      if (map.get("shouji") != null && 
        map.get("shouji").toString().length() == 11 && 
        map.get("shouji").toString().startsWith("1"))
        jzsf.setShouji(map.get("shouji").toString()); 
      if (map.get("jtdz") != null)
        jzsf.setJtdz(map.get("jtdz").toString()); 
      if (map.get("jiuzhenId") != null)
        jzsf.setJiuzhenId(Long.valueOf(Long.parseLong(map.get("jiuzhenId")
                .toString()))); 
      if (map.get("huanzheId") != null)
        jzsf.setHuanzheId(Long.valueOf(Long.parseLong(map.get("huanzheId")
                .toString()))); 
    } 
    return jzsf;
  }
  
  public List<Map<String, Object>> getDuiBiItemsInfoUrl(String jzids) {
    return this.dao.getDuiBiItemsInfoUrl(jzids);
  }
  
  public List<Map<String, Object>> getCategoryInfoUrl(String db_items) {
    return this.dao.getCategoryInfoUrl(db_items);
  }
  
  public List<Map<String, Object>> getHuaYanDanListUrl(String jzid) {
    return this.dao.getHuaYanDanListUrl(jzid);
  }
  
  public List<Map<String, Object>> getHuaYanDanDetailInfoUrl(String hyid) {
    return this.dao.getHuaYanDanDetailInfoUrl(hyid);
  }
  
  public List<String> getSearchYaoPinNameUrl(String text) {
    return this.dao.getSearchYaoPinNameUrl(text);
  }
  
  public List<Map<String, Object>> getYaoPinInfoByNameUrl(String text) {
    return this.dao.getYaoPinInfoByNameUrl(text);
  }
  
  public String saveChuFangInfoUrl(String jzid, String ypid, String num, String cus_dir) {
    return this.dao.saveChuFangInfoUrl(jzid, ypid, num, cus_dir);
  }
  
  public String delChuFangInfoUrl(String cf_id) {
    return this.dao.delChuFangInfoUrl(cf_id);
  }
  
  public List<Map<String, Object>> getJiuZhenChuFangInfoUrl(String jzid) {
    return this.dao.getJiuZhenChuFangInfoUrl(jzid);
  }
  
  public List<Map<String, Object>> getPrintBingLiDataUrl(String mbid) {
    return this.dao.getPrintBingLiDataUrl(mbid);
  }
  
  public List<Map<String, Object>> getBingLiInfoUrl(String jzid, String hzid) {
    return this.dao.getBingLiInfoUrl(jzid, hzid);
  }
  
  public List<Map<String, Object>> findOimsCategories(Integer fatherId) {
    return this.dao.findOimsCategories(fatherId);
  }
  
  public Map<String, Object> getCategoryById(Integer cateid) {
    return this.dao.getCategoryById(cateid);
  }
  
  public Jiuzhen findAlljzjlByIDAndTimeAndGonghao(Long huanzheId, Date date, String gonghao) throws DataAccessException, ParseException {
    List<Jiuzhen> list = this.dao.getAlljzjlByIDAndTimeAndGonghao(huanzheId, date, gonghao);
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  public Map<String, Object> getDoctorWorkstationIndexData(HzjzForm form, String gonghao) {
    Map<String, Object> map = new HashMap<>();
    HuanZheXinXi hzxx = null;
    if (form.getJiuzhenId() != null) {
      Jiuzhen jiuzhen = this.dao.findJiuzhenById(form.getJiuzhenId());
      if (jiuzhen == null)
        throw new RuntimeException("未找到对应的就诊记录！"); 
      form.setHuanzheId(jiuzhen.getHuanzheId());
    } 
    if (form.getHuanzheId() != null) {
      hzxx = this.hzDao.getPatientById(form.getHuanzheId());
    } else if (form.getBinglihao() != null) {
      hzxx = this.hzDao.getHuanzhexinxiByBLH(form.getBinglihao());
    } else if (form.getSfzh() != null) {
      hzxx = this.hzDao.getHuanzhexinxiBySFZH(form.getSfzh());
    } 
    if (hzxx == null)
      throw new RuntimeException("未找到患者信息"); 
    List<Jiuzhen> list = new ArrayList<>();
    if ("1".equals(form.getFenzhenkaidan())) {
      list = this.dao.findFZJiuzhenList(hzxx.getId(), gonghao);
    } else {
      list = this.dao.findJiuzhenList(hzxx.getId(), gonghao);
    } 
    map.put("patient", hzxx);
    map.put("visitList", list);
    return map;
  }
  
  public Jzjl getPatientMC(Jzjl jzjlForm) {
    Integer categoryId = jzjlForm.getCategoryId();
    Jzjl jzjl = null;
    if (jzjlForm.getId() != null)
      return this.jzDao.findJzjlById(jzjlForm.getId()); 
    List<Jzjl> list = this.jzDao.findJzjlListByCategoryIdAndJiuzhenId(categoryId, jzjlForm.getJiuzhenId());
    if (list.size() > 0)
      return list.get(0); 
    if (categoryId.intValue() != 30105 && 
      categoryId != OimsCategoryConfig.WENZHEN_GUOMINSHI && 
      categoryId.intValue() != 30103)
      return jzjl; 
    Jiuzhen jz = this.dao.findJiuzhenById(jzjlForm.getJiuzhenId());
    Map<String, Object> lastJzjl = this.jzDao.getLastJzjl(categoryId, jz.getHuanzheId());
    if (lastJzjl == null || lastJzjl.get("jilu") == null || lastJzjl.get("jilu").toString().isEmpty())
      return jzjl; 
    jzjl = new Jzjl();
    jzjl.setCategoryId(categoryId);
    jzjl.setJlren(jzjlForm.getJlren());
    jzjl.setJlTime(new Date());
    jzjl.setJiuzhenId(jzjlForm.getJiuzhenId());
    String jilu = (String)lastJzjl.get("jilu");
    if (categoryId.intValue() == 30103) {
      Map<String, Object> lastXBS = this.jzDao.getLastJzjl(Integer.valueOf(30102), jz.getHuanzheId());
      if (lastXBS != null && lastXBS.get("jilu") != null && !lastXBS.get("jilu").toString().isEmpty())
        jilu = String.valueOf(jilu) + ";" + (String)lastXBS.get("jilu"); 
    } 
    jzjl.setJilu(jilu);
    jzjl.setId((Long)this.jzDao.saveJzjl(jzjl));
    return jzjl;
  }
  
  public Jiuzhen findNextPatient(String gonghao) {
    return this.dao.findNextPatient(gonghao);
  }
  
  @Transactional
  public boolean setPatientState(Long jiuzhenId, Integer state) {
    Jiuzhen jiuzhen = this.dao.findJiuzhenById(jiuzhenId);
    jiuzhen.setState(state);
    this.dao.updateJiuzhen(jiuzhen);
    return true;
  }
  
  public boolean isMyJiuzhen(String gonghao, Long jiuzhenId) {
    Jiuzhen jiuzhen = this.dao.findJiuzhenById(jiuzhenId);
    return gonghao.equals(jiuzhen.getFzys());
  }
  
  public void copyObjectJiuzhenInfo(Serializable jiuzhenId, Long id) throws IllegalAccessException, InvocationTargetException {
    List<Jzjl> jz_list_before = this.jzDao.findJzjlByJiuzhenid(id.longValue());
    if (jz_list_before != null && jz_list_before.size() > 0)
      for (Jzjl j : jz_list_before) {
        Jzjl jz = new Jzjl();
        BeanUtils.copyProperties(j, jz);
        jz.setId(null);
        jz.setJiuzhenId((Long)jiuzhenId);
        this.jzDao.saveJzjl(jz);
      }  
    ShiLi sl_before = this.shiLiDao.getShiliByJiuzhenId(id);
    if (sl_before != null) {
      ShiLi sl = new ShiLi();
      BeanUtils.copyProperties(sl_before, sl);
      sl.setId(null);
      sl.setJiuzhen_id((Long)jiuzhenId);
      this.shiLiDao.saveShiLi(sl);
    } 
    YanYa yy_before = this.yanYaDao.getYanYaByJiuzhenId(id);
    if (yy_before != null) {
      YanYa yy = new YanYa();
      BeanUtils.copyProperties(yy_before, yy);
      yy.setId(null);
      yy.setJiuzhen_id((Long)jiuzhenId);
      this.yanYaDao.saveYanYa(yy);
    } 
    List<JzZhenduan> jzzd_list_before = this.dao.findJzZhenList(id);
    if (jzzd_list_before != null && jzzd_list_before.size() > 0)
      for (JzZhenduan j : jzzd_list_before) {
        JzZhenduan jzzd = new JzZhenduan();
        BeanUtils.copyProperties(j, jzzd, new String[] { "cure_time" });
        jzzd.setJiuzhen_id((Long)jiuzhenId);
        this.doctorsWorkstationDao.save(jzzd);
      }  
  }
  
  public void syncroPatientAndJiuzhen(String jobNum, String state) {
    YuanGong yg = this.yuanGongDao.getYuanGongByGH(jobNum);
    StringBuilder hisSql = new StringBuilder();
    hisSql.append("select to_char(sysdate,'yyyy-MM-dd') CURRENTDATE from dual");
    List<Map<String, Object>> dateList = this.hisService.slectList(hisSql
        .toString());
    hisSql.setLength(0);
    String currentDate = ((Map)dateList.get(0)).get("CURRENTDATE").toString();
    hisSql.append("select * from clinic_master where 1=1 ");
    hisSql.append("and visit_date=to_date('").append(currentDate).append("','yyyy-MM-dd') ");
    hisSql.append("and visit_dept like '2303%' order by serial_no");
    List<Map<String, Object>> his_list = this.hisService
      .slectList(hisSql.toString());
    for (Map<String, Object> map : his_list) {
      String binglihao = (map.get("PATIENT_ID") == null) ? "" : map
        .get("PATIENT_ID").toString().trim();
      HuanZheXinXi hzxx = this.huanZheXinXiDao.getHuanzhexinxiByBLH(binglihao);
      if (hzxx != null) {
        boolean exists = this.dao.validateVisit(hzxx
            .getId().toString(), map.get("VISIT_NO").toString(), 
            (Date)map.get("VISIT_DATE"));
        if (exists)
          createVisitInfo(map, hzxx); 
        continue;
      } 
      String sql_pat_master_index = "select * from pat_master_index where 1=1 and patient_id='" + 
        binglihao + "'";
      List<Map<String, Object>> patients = this.hisService
        .slectList(sql_pat_master_index);
      if (patients.size() > 0) {
        try {
          Map<String, Object> map_pat_master_index = patients.get(0);
          String PATIENT_ID = (map_pat_master_index.get("PATIENT_ID") == null) ? "" : 
            map_pat_master_index.get("PATIENT_ID").toString()
            .trim();
          PATIENT_ID = new String(PATIENT_ID.getBytes("iso-8859-1"), 
              "GBK");
          String NAME = (map_pat_master_index.get("NAME") == null) ? "" : 
            map_pat_master_index.get("NAME").toString()
            .trim();
          NAME = new String(NAME.getBytes("iso-8859-1"), "GBK");
          String SEX = (map_pat_master_index.get("SEX") == null) ? "" : 
            map_pat_master_index.get("SEX").toString().trim();
          SEX = new String(SEX.getBytes("iso-8859-1"), "GBK");
          String charge_type = (map_pat_master_index.get("charge_type") == null) ? "" : map_pat_master_index.get("charge_type").toString().trim();
          charge_type = new String(charge_type.getBytes("iso-8859-1"), "GBK");
          String DATE_OF_BIRTH = (map_pat_master_index
            .get("DATE_OF_BIRTH") == null) ? "" : 
            map_pat_master_index.get("DATE_OF_BIRTH")
            .toString().trim();
          DATE_OF_BIRTH = new String(
              DATE_OF_BIRTH.getBytes("iso-8859-1"), "GBK");
          String MAILING_ADDRESS = (map_pat_master_index
            .get("MAILING_ADDRESS") == null) ? "" : 
            map_pat_master_index.get("MAILING_ADDRESS")
            .toString().trim();
          MAILING_ADDRESS = new String(
              MAILING_ADDRESS.getBytes("iso-8859-1"), "GBK");
          String CREATE_DATE = (map_pat_master_index
            .get("CREATE_DATE") == null) ? "" : 
            map_pat_master_index.get("CREATE_DATE")
            .toString().trim();
          CREATE_DATE = new String(
              CREATE_DATE.getBytes("iso-8859-1"), "GBK");
          String idno = (map_pat_master_index.get("ID_NO") == null) ? "" : map_pat_master_index.get("ID_NO").toString();
          String phone = (map_pat_master_index.get("PHONE_NUMBER_HOME") == null) ? "" : map_pat_master_index.get("PHONE_NUMBER_HOME").toString();
          String phone1 = (map_pat_master_index.get("PHONE_NUMBER_BUSINESS") == null) ? "" : map_pat_master_index.get("PHONE_NUMBER_BUSINESS").toString();
          String phone2 = (map_pat_master_index.get("NEXT_OF_KIN_PHONE") == null) ? "" : map_pat_master_index.get("NEXT_OF_KIN_PHONE").toString();
          List<String> phone_list = new ArrayList<>();
          if (!"".equals(phone))
            phone_list.add(phone); 
          if (!"".equals(phone1) && 
            !phone1.equals(phone))
            phone_list.add(phone1); 
          if (!"".equals(phone2) && 
            !phone2.equals(phone) && !phone2.equals(phone1))
            phone_list.add(phone2); 
          StringBuffer sb = new StringBuffer("");
          for (int i = 0; i < phone_list.size(); i++) {
            if (i == 0) {
              sb.append(phone_list.get(i));
            } else {
              sb.append("," + (String)phone_list.get(i));
            } 
          } 
          HuanZheXinXi huanzhexinxi = new HuanZheXinXi();
          huanzhexinxi.setBinglihao(PATIENT_ID);
          huanzhexinxi.setXingming(NAME);
          huanzhexinxi.setShouji(sb.toString());
          huanzhexinxi.setSfzh(idno);
          huanzhexinxi.setCharge_type(charge_type);
          if ("男".equals(SEX)) {
            huanzhexinxi.setXingbie(true);
          } else {
            huanzhexinxi.setXingbie(false);
          } 
          huanzhexinxi.setShengri(stringToDate(DATE_OF_BIRTH));
          huanzhexinxi.setDiqu(MAILING_ADDRESS);
          huanzhexinxi.setJtdz(MAILING_ADDRESS);
          huanzhexinxi.setJilvren("10002");
          huanzhexinxi.setLaiyuan(Integer.valueOf(1006));
          if (CREATE_DATE != null && !"".equals(CREATE_DATE)) {
            huanzhexinxi.setZcrq(stringToDateTime(CREATE_DATE));
          } else {
            huanzhexinxi.setZcrq(new Date());
          } 
          huanzhexinxi.setBeizhu("数据同步");
          Serializable id = this.huanZheXinXiDao.saveHuanZhe(huanzhexinxi);
          createVisitInfo(map, huanzhexinxi);
        } catch (Exception e) {
          e.printStackTrace();
        } 
        continue;
      } 
      System.out.println("oracle患者信息不存在");
    } 
  }
  
  public List<Map<String, Object>> getPatientListFuChaByPage(String state, String gonghao, Page p, String search, String path, Integer fenzhenkaidan) {
    List<Map<String, Object>> list = this.dao.getPatientListFuChaByPage(state, gonghao, p, search, 
        path, fenzhenkaidan);
    return list;
  }
  
  public Integer findJzByDoctorToday(String gonghao, Long huanzheId) {
    return this.dao.findJzByDoctorToday(gonghao, huanzheId);
  }
  
  public Jiuzhen findLastJiuzhen(String id) {
    return this.dao.findLastJiuzhen(id);
  }
  
  public List<Jiuzhen> findJiuzhenByHzidAndTimeGonghao(Long huanzheId, Date date, String gonghao) throws DataAccessException, ParseException {
    return this.dao.getAlljzjlByIDAndTimeAndGonghao(huanzheId, date, gonghao);
  }
}
