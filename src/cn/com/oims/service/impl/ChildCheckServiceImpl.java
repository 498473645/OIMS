package cn.com.oims.service.impl;

import cn.com.oims.common.ChildExpImpUtils;
import cn.com.oims.dao.IChildCheckDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJcdDao;
import cn.com.oims.dao.IJcxmDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IJzjlDao;
import cn.com.oims.dao.IYanGuangDao;
import cn.com.oims.dao.IYanYaDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.AChao;
import cn.com.oims.dao.pojo.Fzyy;
import cn.com.oims.dao.pojo.Fzyyjl;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.Pcao;
import cn.com.oims.dao.pojo.XiaoErChuZhen;
import cn.com.oims.dao.pojo.YanGuang;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IChildCheckService;
import cn.com.oims.web.form.AChaoForm;
import cn.com.oims.web.form.ChildCheckPcaoForm;
import cn.com.oims.web.form.ChildSearchForm;
import cn.com.oims.web.form.ChildTiGeForm;
import cn.com.oims.web.form.ChileCheckYanYaForm;
import cn.com.oims.web.form.FzyyForm;
import cn.com.oims.web.form.FzyySearchForm;
import cn.com.oims.web.form.FzyyjlForm;
import cn.com.oims.web.form.FzyyjlSearchForm;
import cn.com.oims.web.form.HzXxSearchForm;
import cn.com.oims.web.form.QuGuangForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ChildCheckServiceImpl implements IChildCheckService {
  @Resource
  private IChildCheckDao iChildCheckDao;
  
  @Resource
  private IHuanZheXinXiDao iHuanZheXinXiDao;
  
  @Resource
  private IJiuzhenDao iJiuzhenDao;
  
  @Resource
  private IJcdDao iJcdDao;
  
  @Resource
  private IJcxmDao iJcxmDao;
  
  @Resource
  private IYuanGongDao iYuanGongDao;
  
  @Resource
  private IYanYaDao iYanYaDao;
  
  @Resource
  private IYanGuangDao iYanGuangDao;
  
  @Resource
  private IJzjlDao iJzjlDao;
  
  @Override
  public List<Map<String, Object>> findChildByPage(Page page, ChildSearchForm csf) {
    System.out.println("进入service");
    List<Map<String, Object>> map = this.iChildCheckDao.findChildByConditionAndPage(page, csf);
    for (Map<String, Object> item : map) {
      if (item.containsKey("age")) {
        break;
      }
      item.put("age", getAgeByString(item.get("birthday"), item.get("caozuo_Time")));
    } 
    return map;
  }
  
  private String getAgeByString(Object start, Object end) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String end1 = sdf.format(end);
    String start1 = sdf.format(start);
    long time = 0L;
    try {
      time = sdf.parse(end1).getTime() - sdf.parse(start1).getTime();
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    if (time <= 0L) {
      time = 0L;
    }
    if (time / 12L / 30L / 24L / 60L / 60L / 1000L > 1L) {
      return String.valueOf(time / 12L / 30L / 24L / 60L / 60L / 1000L) + "岁";
    }
    if (time / 30L / 24L / 60L / 60L / 1000L > 1L) {
      return String.valueOf(time / 30L / 24L / 60L / 60L / 1000L) + "月";
    }
    if (time / 24L / 60L / 60L / 1000L > 1L) {
      return String.valueOf(time / 24L / 60L / 60L / 1000L) + "天";
    }
    return null;
  }
  
  @Override
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public void addChildRegistration(HuanZheXinXi hzxx, Jiuzhen jz, XiaoErChuZhen xecz) {
    Serializable hzid = addHuanEr(hzxx);
    if (hzid != null) {
      jz.setHuanzheId((Long)hzid);
      addJiuZhen(jz);
      xecz.setHzid((Long)hzid);
      addChuZhen(xecz);
    } 
  }
  
  @Override
  public Serializable addHuanEr(HuanZheXinXi hzxx) {
    GregorianCalendar calendar = new GregorianCalendar();
    int year = calendar.get(1);
    int month = calendar.get(2) + 1;
    String month1 = (new StringBuilder(String.valueOf(month))).toString();
    if (month < 10) {
      month1 = "0" + month;
    }
    int day = calendar.get(5);
    String day1 = (new StringBuilder(String.valueOf(day))).toString();
    if (day < 10) {
      day1 = "0" + day;
    }
    String time = year + month1 + day1;
    String max = this.iHuanZheXinXiDao.findMaxXiaoErBinglihao(time);
    max = (max == null) ? "" : max;
    max = (max.length() > 8) ? max.substring(8) : "0";
    int a = Integer.parseInt(max) + 1;
    System.out.println(a);
    if ((new StringBuilder(String.valueOf(a))).toString().length() < 3) {
      for (int i = 0; i < 3 - (new StringBuilder(String.valueOf(a))).toString().length(); i++) {
        time = String.valueOf(time) + "0";
      }
    }
    time = String.valueOf(time) + a;
    hzxx.setBinglihao(time);
    Long huanzheId = (Long)this.iHuanZheXinXiDao.saveHuanZhe(hzxx);
    return huanzheId;
  }
  
  @Override
  public void addJiuZhen(Jiuzhen jz) {
    this.iJiuzhenDao.saveJiuzhen(jz);
  }
  
  @Override
  public void addChuZhen(XiaoErChuZhen xecz) {
    this.iChildCheckDao.saveChuZhen(xecz);
  }
  
  @Override
  public Map<String, Object> findXiaoErFUZhen(String blh) {
    HuanZheXinXi hzxx = this.iHuanZheXinXiDao.getHuanzhexinxiByBLH(blh);
    if (hzxx != null) {
      Map<String, Object> map = new HashMap<String, Object>();
      map.put("hzxx", hzxx);
      XiaoErChuZhen xecz = this.iChildCheckDao.getChuZhenByHzid(hzxx.getId());
      System.out.println(xecz.getYcrq() + "!!!!!");
      map.put("xecz", xecz);
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      String shengri = sdf.format(hzxx.getShengri());
      map.put("shengri", shengri);
      String ycrq = sdf.format(xecz.getYcrq());
      map.put("ycrq", ycrq);
      return map;
    } 
    return null;
  }
  
  @Override
  @Transactional
  public void addChildReexamination(HuanZheXinXi hzxx, Jiuzhen jz, XiaoErChuZhen xecz) {
    this.iHuanZheXinXiDao.updateHuanZhe(hzxx);
    this.iChildCheckDao.updateChuZhen(xecz);
    addJiuZhen(jz);
  }
  
  @Override
  public XiaoErChuZhen findChuZhenByHzid(Long hzid) {
    return this.iChildCheckDao.getChuZhenByHzid(hzid);
  }
  
  @Override
  @Transactional
  public void updateChildInfo(HuanZheXinXi hzxx, Jiuzhen jz, XiaoErChuZhen xecz) {
    this.iHuanZheXinXiDao.updateHuanZhe(hzxx);
    this.iChildCheckDao.updateChuZhen(xecz);
    this.iJiuzhenDao.updateJiuzhen(jz);
  }
  
  @Override
  @Transactional
  public boolean savePcaoAndjcd(ChildCheckPcaoForm childCheckPcaoForm) {
    Jcxm jcxm = new Jcxm();
    jcxm.setXmmc("p超");
    List<Jcxm> l = this.iJcxmDao.findJcxmsByJcxm(jcxm);
    if (l != null && l.size() > 0) {
      jcxm = l.get(0);
    }
    YuanGong y = new YuanGong();
    y.setGonghao(childCheckPcaoForm
        .getGonghao());
    List<YuanGong> list = this.iYuanGongDao.findYuanGongsByYuanGong(y);
    YuanGong yg = null;
    if (y != null) {
      yg = list.get(0);
    }
    Jcd jcd = new Jcd();
    jcd.setJcdh("1");
    jcd.setJiuzhenId(childCheckPcaoForm.getJiuzhenId());
    jcd.setBiaoti(jcxm.getXmmc());
    jcd.setJcsbId(childCheckPcaoForm.getShebeiId());
    jcd.setHuanzheId(childCheckPcaoForm.getHuanzheId());
    jcd.setJcxmIds(jcxm.getId().toString());
    jcd.setKdksId(yg.getBumenId());
    jcd.setKdys(yg.getXingming());
    jcd.setKdTime(new Date());
    jcd.setJcksId(yg.getBumenId());
    jcd.setJcys(yg.getXingming());
    jcd.setJfbs(true);
    jcd.setBiaoshi(Integer.valueOf(56));
    jcd.setYanbie(Integer.valueOf(48));
    Long jcdid = (Long)this.iJcdDao.saveJcd(jcd);
    jcd.setJcdh(jcdid.toString());
    this.iJcdDao.updateJcd(jcd);
    Jiuzhen jz = this.iJiuzhenDao.findJiuzhenById(childCheckPcaoForm.getJiuzhenId());
    jz.setState(Integer.valueOf(28));
    this.iJiuzhenDao.updateJiuzhen(jz);
    if (jcdid != null) {
      Pcao pcao = new Pcao(jcdid, childCheckPcaoForm.getOD1(), 
          childCheckPcaoForm.getOD2(), childCheckPcaoForm.getOD3(), 
          childCheckPcaoForm.getOS1(), childCheckPcaoForm.getOS2(), 
          childCheckPcaoForm.getOS3(), childCheckPcaoForm.getODave(), 
          childCheckPcaoForm.getOSave(), yg.getXingming(), new Date());
      Long pcaoId = (Long)this.iChildCheckDao.savePcao(pcao);
      if (pcaoId != null) {
        return true;
      }
      return false;
    } 
    return false;
  }
  
  @Override
  @Transactional
  public boolean saveYanYa(ChileCheckYanYaForm chileCheckYanYaForm) {
    Jcxm jcxm = new Jcxm();
    jcxm.setXmmc("眼压");
    List<Jcxm> l = this.iJcxmDao.findJcxmsByJcxm(jcxm);
    if (l != null && l.size() > 0) {
      jcxm = l.get(0);
    }
    YuanGong y = new YuanGong();
    y.setGonghao(chileCheckYanYaForm
        .getGonghao());
    List<YuanGong> list = this.iYuanGongDao.findYuanGongsByYuanGong(y);
    YuanGong yg = null;
    if (y != null) {
      yg = list.get(0);
    }
    Jcd jcd = new Jcd();
    jcd.setJcdh("NULL");
    jcd.setJiuzhenId(chileCheckYanYaForm.getJiuzhenId());
    jcd.setBiaoti(jcxm.getXmmc());
    jcd.setJcsbId(chileCheckYanYaForm.getShebeiId());
    jcd.setHuanzheId(chileCheckYanYaForm.getHuanzeId());
    jcd.setJcxmIds(jcxm.getId().toString());
    jcd.setKdksId(yg.getBumenId());
    jcd.setKdys(yg.getXingming());
    jcd.setKdTime(new Date());
    jcd.setJcksId(yg.getBumenId());
    jcd.setJcys(yg.getXingming());
    jcd.setJfbs(true);
    jcd.setBiaoshi(Integer.valueOf(56));
    jcd.setYanbie(Integer.valueOf(1));
    Long jcdid = (Long)this.iJcdDao.saveJcd(jcd);
    jcd.setJcdh(jcdid.toString());
    this.iJcdDao.updateJcd(jcd);
    Jiuzhen jz = this.iJiuzhenDao.findJiuzhenById(chileCheckYanYaForm.getJiuzhenId());
    jz.setState(Integer.valueOf(28));
    this.iJiuzhenDao.updateJiuzhen(jz);
    if (jcdid != null) {
      YanYa yanYa = new YanYa();
      yanYa.setOd(Float.valueOf(chileCheckYanYaForm.getOd()));
      yanYa.setOs(Float.valueOf(chileCheckYanYaForm.getOs()));
      yanYa.setHuanzhe_id(chileCheckYanYaForm.getHuanzeId());
      yanYa.setJiuzhen_id(chileCheckYanYaForm.getJiuzhenId());
      yanYa.setJcys(yg.getXingming());
      yanYa.setJcd_id(jcdid);
      yanYa.setYcsj(new Date());
      Long yanyaId = (Long)this.iYanYaDao.saveYanYa(yanYa);
      if (yanyaId != null) {
        return true;
      }
      return false;
    } 
    return false;
  }
  
  @Override
  public Map<String, Object> findAllAChao() {
    Map<String, Object> m = new HashMap<String, Object>();
    m.put("list", this.iChildCheckDao.findAllAChao());
    return m;
  }
  
  @Override
  public void updateAChao(AChao aChao) {
    this.iChildCheckDao.updateAChao(aChao);
  }
  
  @Override
  public AChao findAChaoByID(Serializable id) {
    return this.iChildCheckDao.findAChaoByID(id);
  }
  
  @Override
  @Transactional
  public Serializable saveAChao(AChaoForm aForm) {
    Jcxm xm = new Jcxm();
    xm.setXmmc("A超");
    xm = this.iJcxmDao.findJcxmsByJcxm(xm).get(0);
    YuanGong yGong = new YuanGong();
    yGong.setGonghao(aForm.getGonghao());
    YuanGong yg = this.iYuanGongDao.findYuanGongsByYuanGong(yGong).get(0);
    Jcd jcd = new Jcd();
    jcd.setJcdh("");
    jcd.setJcxmIds(xm.getId().toString());
    jcd.setBiaoti(xm.getXmmc());
    jcd.setJcsbId(aForm.getShebeiId());
    jcd.setKdys(yg.getXingming());
    jcd.setKdksId(yg.getBumenId());
    jcd.setJcksId(yg.getBumenId());
    jcd.setJcys(yg.getXingming());
    jcd.setJcksTime(new Date());
    jcd.setJfbs(true);
    jcd.setBiaoshi(Integer.valueOf(56));
    jcd.setYanbie(Integer.valueOf(48));
    jcd.setKdTime(new Date());
    System.out.println(aForm.getHuanzheId() + "!!!!");
    jcd.setHuanzheId(aForm.getHuanzheId());
    jcd.setJiuzhenId(aForm.getJiuzhenId());
    Long jcdid = (Long)this.iJcdDao.saveJcd(jcd);
    jcd.setJcdh(jcdid.toString());
    this.iJcdDao.updateJcd(jcd);
    Jiuzhen jz = this.iJiuzhenDao.findJiuzhenById(aForm.getJiuzhenId());
    jz.setState(Integer.valueOf(28));
    this.iJiuzhenDao.updateJiuzhen(jz);
    AChao aChao = new AChao();
    aChao.setJcdid(jcdid);
    aChao.setJcren(yg.getXingming());
    aChao.setJctime(new Date());
    aChao.setOd_a(aForm.getOd_a());
    aChao.setOd_l(aForm.getOd_l());
    aChao.setOd_v(aForm.getOd_v());
    aChao.setOd_al(aForm.getOd_al());
    aChao.setOs_a(aForm.getOs_a());
    aChao.setOs_l(aForm.getOs_l());
    aChao.setOs_v(aForm.getOs_v());
    aChao.setOs_al(aForm.getOs_al());
    return this.iChildCheckDao.saveAChao(aChao);
  }
  
  @Override
  public List<Jzjl> getshowAllTgjc() {
    return this.iChildCheckDao.showAllTgjc();
  }
  
  @Override
  public Object getupdateTgjc(Jzjl jzjl) {
    return this.iChildCheckDao.updateTgjc(jzjl);
  }
  
  @Override
  public Jzjl getshowById(Long id) {
    return this.iChildCheckDao.showById(id);
  }
  
  @Override
  public String findHuanZheLianXiRenByHuanZheID(Long huanzheID) {
    return this.iChildCheckDao.findHuanZheLianXiRenByHuanZheID(huanzheID);
  }
  
  @Override
  @Transactional
  public boolean getaddTgjc(Jzjl jzjl, ChildTiGeForm form) {
    try {
      Jzjl[] j = new Jzjl[12];
      for (int i = 0; i < j.length; i++) {
        j[i] = new Jzjl();
        j[i].setJiuzhenId(jzjl.getJiuzhenId());
        j[i].setJlren(jzjl.getJlren());
        j[i].setJlTime(jzjl.getJlTime());
      } 
      j[0].setCategoryId(Integer.valueOf(30313));
      j[0].setJilu(form.getJiaomoOD());
      this.iChildCheckDao.addTgjc(j[0], form);
      j[1].setCategoryId(Integer.valueOf(30309));
      j[1].setJilu(form.getJiemoOD());
      this.iChildCheckDao.addTgjc(j[1], form);
      j[2].setCategoryId(Integer.valueOf(30321));
      j[2].setJilu(form.getJingtiOD());
      this.iChildCheckDao.addTgjc(j[2], form);
      j[3].setCategoryId(Integer.valueOf(30323));
      j[3].setJilu(form.getBolitiOD());
      this.iChildCheckDao.addTgjc(j[3], form);
      j[4].setCategoryId(Integer.valueOf(60105));
      j[4].setJilu(form.getShiwangmoOD());
      this.iChildCheckDao.addTgjc(j[4], form);
      j[5].setCategoryId(Integer.valueOf(60106));
      j[5].setJilu(form.getShipanOD());
      this.iChildCheckDao.addTgjc(j[5], form);
      j[6].setCategoryId(Integer.valueOf(30314));
      j[6].setJilu(form.getJiaomoOS());
      this.iChildCheckDao.addTgjc(j[6], form);
      j[7].setCategoryId(Integer.valueOf(30310));
      j[7].setJilu(form.getJiemoOS());
      this.iChildCheckDao.addTgjc(j[7], form);
      j[8].setCategoryId(Integer.valueOf(30322));
      j[8].setJilu(form.getJingtiOS());
      this.iChildCheckDao.addTgjc(j[8], form);
      j[9].setCategoryId(Integer.valueOf(30324));
      j[9].setJilu(form.getBolitiOS());
      this.iChildCheckDao.addTgjc(j[9], form);
      j[10].setCategoryId(Integer.valueOf(60111));
      j[10].setJilu(form.getShiwangmoOS());
      this.iChildCheckDao.addTgjc(j[10], form);
      j[11].setCategoryId(Integer.valueOf(60112));
      j[11].setJilu(form.getShipanOS());
      this.iChildCheckDao.addTgjc(j[11], form);
      Jiuzhen jz = this.iJiuzhenDao.findJiuzhenById(jzjl.getJiuzhenId());
      jz.setState(Integer.valueOf(28));
      this.iJiuzhenDao.updateJiuzhen(jz);
      return true;
    } catch (Exception e) {
      return false;
    } 
  }
  
  @Override
  @Transactional
  public Serializable saveQuGuang(QuGuangForm qForm) {
    Jcxm xm = new Jcxm();
    xm.setXmmc("屈光");
    xm = this.iJcxmDao.findJcxmsByJcxm(xm).get(0);
    YuanGong yGong = new YuanGong();
    yGong.setGonghao(qForm.getGonghao());
    YuanGong yg = this.iYuanGongDao.findYuanGongsByYuanGong(yGong).get(0);
    Jcd jcd = new Jcd();
    jcd.setJcdh("");
    jcd.setJcxmIds(xm.getId().toString());
    jcd.setBiaoti(xm.getXmmc());
    jcd.setJcsbId(qForm.getShebeiId());
    jcd.setKdys(yg.getXingming());
    jcd.setKdksId(yg.getBumenId());
    jcd.setJcksId(yg.getBumenId());
    jcd.setJcys(yg.getXingming());
    jcd.setJcksTime(new Date());
    jcd.setJfbs(true);
    jcd.setBiaoshi(Integer.valueOf(56));
    jcd.setYanbie(Integer.valueOf(48));
    jcd.setKdTime(new Date());
    jcd.setHuanzheId(qForm.getHuanzheID());
    jcd.setJiuzhenId(qForm.getJiuzhenID());
    Long jcdid = (Long)this.iJcdDao.saveJcd(jcd);
    jcd.setJcdh(jcdid.toString());
    this.iJcdDao.updateJcd(jcd);
    Jiuzhen jz = this.iJiuzhenDao.findJiuzhenById(qForm.getJiuzhenID());
    jz.setState(Integer.valueOf(28));
    this.iJiuzhenDao.updateJiuzhen(jz);
    YanGuang yanGuang = new YanGuang();
    yanGuang.setJcdid(jcdid);
    yanGuang.setJiuzhenid(qForm.getJiuzhenID());
    yanGuang.setJcys(yg.getXingming());
    yanGuang.setJcsj(new Date());
    yanGuang.setRefLA(qForm.getRef_l_a());
    yanGuang.setRefLC(Float.valueOf(qForm.getRef_l_c()));
    yanGuang.setRefLS(Float.valueOf(qForm.getRef_l_s()));
    yanGuang.setRefRA(qForm.getRef_r_a());
    yanGuang.setRefRC(Float.valueOf(qForm.getRef_r_c()));
    yanGuang.setRefRS(Float.valueOf(qForm.getRef_r_s()));
    yanGuang.setKxd_l(qForm.getKxd_l());
    yanGuang.setKxd_r(qForm.getKxd_r());
    return this.iYanGuangDao.saveYanGuang(yanGuang);
  }
  
  @Override
  public Map<String, Object> findFzyy4Page(Page page, FzyySearchForm ff) {
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("list", this.iChildCheckDao.findFzyy4Page(page, ff));
    map.put("page", page);
    return map;
  }
  
  @Override
  public boolean addFzyyInfo(Fzyy fzyy, FzyyForm form) {
    fzyy.setAdd_time(new Date());
    fzyy.setJiuzhenid(Long.valueOf(Long.parseLong(form.getJiuzhenID())));
    fzyy.setHzid(Long.valueOf(Long.parseLong(form.getHuanzheID())));
    fzyy.setSsjl(form.getSsjl());
    String yjxm = "";
    if (form.getYjxm() != null && (form.getYjxm()).length > 0) {
      for (int i = 0; i < (form.getYjxm()).length; i++) {
        yjxm = String.valueOf(yjxm) + ((i != 0) ? "," : "") + form.getYjxm()[i];
      }
    }
    fzyy.setYjxm(yjxm);
    fzyy.setYyqk(form.getYyqk());
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    try {
      fzyy.setYyrq(sdf.parse(form.getYyrq()));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    fzyy.setYyzb(Integer.valueOf(Integer.parseInt(form.getYyzb())));
    fzyy.setZdjl(form.getZdjl());
    return !(this.iChildCheckDao.addFzyyInfo(fzyy) == null);
  }
  
  @Override
  public Fzyy findFzyyByJiuzhenid(String jiuzhenid) {
    return this.iChildCheckDao.findFzzByJiuzhenid(jiuzhenid);
  }
  
  @Override
  public void updateFzyyInfo(Fzyy fzyy, FzyyForm form) {
    fzyy.setAdd_time(new Date());
    fzyy.setSsjl(form.getSsjl());
    String yjxm = "";
    if (form.getYjxm() != null && (form.getYjxm()).length > 0) {
      for (int i = 0; i < (form.getYjxm()).length; i++) {
        yjxm = String.valueOf(yjxm) + ((i != 0) ? "," : "") + form.getYjxm()[i];
      }
    }
    fzyy.setYjxm(yjxm);
    fzyy.setYyqk(form.getYyqk());
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    try {
      fzyy.setYyrq(sdf.parse(form.getYyrq()));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    fzyy.setYyzb(Integer.valueOf(Integer.parseInt(form.getYyzb())));
    fzyy.setZdjl(form.getZdjl());
    this.iChildCheckDao.updateFzyy(fzyy);
  }
  
  @Override
  public Fzyyjl findSfjlByFzyyid(String fzyyid) {
    return this.iChildCheckDao.findSfjlByFzyyid(fzyyid);
  }
  
  @Override
  public void updateFzyyjl1Info(Fzyyjl fzyyjl, FzyyjlForm form) {
    fzyyjl.setAddTime(new Date());
    fzyyjl.setBeizhu(form.getBeizhu());
    fzyyjl.setSffs(Integer.valueOf(Integer.parseInt(form.getSffs())));
    this.iChildCheckDao.updateFzyyjl(fzyyjl);
  }
  
  @Override
  public void addFzyyjlInfo(Fzyyjl fzyyjl, FzyyjlForm form) {
    fzyyjl.setAddTime(new Date());
    fzyyjl.setBeizhu(form.getBeizhu());
    fzyyjl.setFzyyId(Long.valueOf(Long.parseLong(form.getFzyyID())));
    fzyyjl.setSffs(Integer.valueOf(Integer.parseInt(form.getSffs())));
    this.iChildCheckDao.saveFzyyjl(fzyyjl);
  }
  
  @Override
  public Fzyy findFzyyById(String fzyyID) {
    return this.iChildCheckDao.findFzyyById(fzyyID);
  }
  
  @Override
  public void updateFzyy(Fzyy fzyy) {
    this.iChildCheckDao.updateFzyy(fzyy);
  }
  
  @Override
  public AChao findAChaoByJcdID(Serializable id) {
    return this.iChildCheckDao.findAChaoByJcdID(id);
  }
  
  @Override
  public void updateQuGuang(YanGuang quGuang) {
    this.iYanGuangDao.updateYanGuang(quGuang);
  }
  
  @Override
  public YanGuang findYanGuangByJcdid(Serializable id) {
    return this.iYanGuangDao.findYanGuangById(id);
  }
  
  @Override
  public List<Map<String, Object>> findFzyyjlList(Page page, FzyyjlSearchForm ff) {
    List<Map<String, Object>> map = this.iChildCheckDao.findFzyyjlList(page, ff);
    return map;
  }
  
  @Override
  public void updatePChao(Pcao pCao) {
    this.iChildCheckDao.updatePcao(pCao);
  }
  
  @Override
  public Pcao findPcaoByJcdID(Serializable id) {
    return this.iChildCheckDao.findPcaoByJcdID(id);
  }
  
  @Override
  public Pcao findPcaoByID(Serializable id) {
    return this.iChildCheckDao.findPcaoByID(id);
  }
  
  @Override
  public List<Jzjl> findTGJC(long parseLong) {
    return this.iJzjlDao.findJzjlByJiuzhenid(parseLong);
  }
  
  @Override
  @Transactional
  public void updateTgjc(Jzjl jzjl, ChildTiGeForm form, Long parseLong) {
    Jzjl j = this.iJzjlDao.findTgjc(30313, parseLong);
    j.setJilu(form.getJiaomoOD());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(30309, parseLong);
    j.setJilu(form.getJiemoOD());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(30321, parseLong);
    j.setJilu(form.getJingtiOD());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(30323, parseLong);
    j.setJilu(form.getBolitiOD());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(60105, parseLong);
    j.setJilu(form.getShiwangmoOD());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(60106, parseLong);
    j.setJilu(form.getShipanOD());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(30314, parseLong);
    j.setJilu(form.getJiaomoOS());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(30310, parseLong);
    j.setJilu(form.getJiemoOS());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(30322, parseLong);
    j.setJilu(form.getJingtiOS());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(30324, parseLong);
    j.setJilu(form.getBolitiOS());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(60111, parseLong);
    j.setJilu(form.getShiwangmoOS());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
    j = this.iJzjlDao.findTgjc(60112, parseLong);
    j.setJilu(form.getShipanOS());
    j.setJlren(jzjl.getJlren());
    j.setJlTime(jzjl.getJlTime());
    this.iChildCheckDao.updateTgjc(j);
  }
  
  @Override
  public int calculateYq(String gestation) {
    int indexz = gestation.indexOf("周");
    int z = Integer.parseInt(gestation.substring(0, indexz));
    int indexr = gestation.indexOf("日");
    int r = Integer.parseInt(gestation.substring(indexz + 1, indexr));
    System.out.println(String.valueOf(z * 7 + r) + "###########");
    return z * 7 + r;
  }
  
  @Override
  public Map<String, Object> findAOrP(String id, String title) {
    Map<String, Object> map = new HashMap<String, Object>();
    if ("A超".equals(title)) {
      map.put("a", findAChaoByJcdID(id));
    } else if ("p超".equals(title)) {
      map.put("p", findPcaoByJcdID(id));
    } 
    return map;
  }
  
  @Override
  public Map findAllYanYa4Page(Page p, HzXxSearchForm hzxx) {
    Map<String, Object> m = new HashMap<String, Object>();
    m.put("list", this.iChildCheckDao.findAllYanYa4Page(p, hzxx));
    m.put("page", p);
    return m;
  }
  
  @Override
  public List<Map<String, Object>> exportXiaoErXinXi(ChildSearchForm form, String huanzheIDs) {
    List<Map<String, Object>> list = this.iChildCheckDao.findChildListNoPageByHuanzheIDs(form, huanzheIDs);
    for (Map<String, Object> map : list) {
      if (map.containsKey("age")) {
        break;
      }
      map.put("age", getAgeByString(map.get("shengri"), new Date()));
    } 
    return list;
  }
  
  @Override
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public int importXiaoErXinXiToApp(String path, String gonghao) {
    List<List<String>> list = ChildExpImpUtils.importChildCheckInfo(path);
    HuanZheXinXi huanZheXinXi = null;
    Jiuzhen jiuzhen = null;
    XiaoErChuZhen xiaoErChuZhen = null;
    Jcd jcd = null;
    YanYa yanYa = null;
    AChao aChao = null;
    Pcao pcao = null;
    YanGuang yanGuang = null;
    Jzjl jzjl = null;
    YuanGong gong1 = new YuanGong();
    gong1.setGonghao(gonghao);
    YuanGong gong = this.iYuanGongDao.findYuanGongsByYuanGong(gong1).get(0);
    int state = 0;
    if (list.size() <= 0) {
      state = 0;
    } else {
      for (int i = 0; i < list.size(); i++) {
        huanZheXinXi = new HuanZheXinXi();
        jiuzhen = new Jiuzhen();
        xiaoErChuZhen = new XiaoErChuZhen();
        jcd = new Jcd();
        yanYa = new YanYa();
        aChao = new AChao();
        pcao = new Pcao();
        yanGuang = new YanGuang();
        jzjl = new Jzjl();
        try {
          huanZheXinXi.setBinglihao(((List<String>)list.get(i)).get(0));
          huanZheXinXi.setXingming(((List<String>)list.get(i)).get(2));
          huanZheXinXi.setXingbie(ChildExpImpUtils.convertStringToBoolean(((List<String>)list.get(i)).get(4)).booleanValue());
          huanZheXinXi.setShouji(((List<String>)list.get(i)).get(15));
          huanZheXinXi.setShengri(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(5)));
          huanZheXinXi.setLaiyuan(Integer.valueOf(0));
          huanZheXinXi.setDiquId(Integer.valueOf(0));
          huanZheXinXi.setJilvren((((List)list.get(i)).get(20) == null || ((String)((List<String>)list.get(i)).get(20)).equals("")) ? gonghao : ((List<String>)list.get(i)).get(20));
          Long huanzheID = (Long)this.iHuanZheXinXiDao.saveHuanZhe(huanZheXinXi);
          xiaoErChuZhen.setCsqk(((List<String>)list.get(i)).get(11));
          if (!"".equals(((List)list.get(i)).get(7))) {
            xiaoErChuZhen.setCstz(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(7)));
          }
          if (!"".equals(((List)list.get(i)).get(8))) {
            xiaoErChuZhen.setCssg(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(8)));
          }
          xiaoErChuZhen.setDqqk(((List<String>)list.get(i)).get(12));
          xiaoErChuZhen.setKyycqk(((List<String>)list.get(i)).get(13));
          xiaoErChuZhen.setFmfs(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(16)));
          xiaoErChuZhen.setHzid(huanzheID);
          xiaoErChuZhen.setTaibie(Integer.valueOf(1));
          xiaoErChuZhen.setYunqi(Integer.valueOf(ChildExpImpUtils.calDays(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(3)), ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(5)))));
          xiaoErChuZhen.setYcrq(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(3)));
          this.iChildCheckDao.saveChuZhen(xiaoErChuZhen);
          jiuzhen.setCaozuoTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(14)));
          jiuzhen.setState(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(17)));
          jiuzhen.setZhenbie(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(18)));
          jiuzhen.setJzks(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(19)).intValue());
          jiuzhen.setHzlxr(((List<String>)list.get(i)).get(1));
          jiuzhen.setHuanzheId(huanzheID);
          if (!"".equals(((List)list.get(i)).get(9))) {
            jiuzhen.setShengao(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(9)));
          }
          if (!"".equals(((List)list.get(i)).get(10))) {
            jiuzhen.setTizhong(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(10)));
          }
          jiuzhen.setCaozuoren(((String)((List<String>)list.get(i)).get(20)).equals("") ? gonghao : ((List<String>)list.get(i)).get(20));
          Long jiuzhenID = (Long)this.iJiuzhenDao.saveJiuzhen(jiuzhen);
          if (!"".equals(((List)list.get(i)).get(23))) {
            jcd = new Jcd();
            jcd.setJcdh("");
            System.out.println("测试看看有没有进入眼压");
            jcd.setKdksId(gong.getBumenId());
            jcd.setKdys(gonghao);
            jcd.setJiuzhenId(jiuzhenID);
            jcd.setBiaoshi(Integer.valueOf(56));
            jcd.setBiaoti("眼压");
            jcd.setKdTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(23)));
            jcd.setJcsbId(Integer.valueOf(111));
            jcd.setHuanzheId(huanzheID);
            jcd.setJcxmIds("78");
            jcd.setJfbs(true);
            jcd.setYanbie(Integer.valueOf(48));
            Long yanyaJcdID = (Long)this.iJcdDao.saveJcd(jcd);
            jcd.setJcdh(yanyaJcdID.toString());
            this.iJcdDao.updateJcd(jcd);
            yanYa.setJcys(gonghao);
            yanYa.setYcsj(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(23)));
            yanYa.setOd(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(21)));
            yanYa.setOs(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(22)));
            yanYa.setHuanzhe_id(huanzheID);
            yanYa.setJcd_id(yanyaJcdID);
            yanYa.setJiuzhen_id(jiuzhenID);
            this.iYanYaDao.saveYanYa(yanYa);
          } 
          if (!"".equals(((List)list.get(i)).get(32))) {
            pcao.setOD1(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(24)).floatValue());
            pcao.setOD2(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(25)).floatValue());
            pcao.setOD3(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(26)).floatValue());
            pcao.setODave(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(27)).floatValue());
            pcao.setOS1(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(28)).floatValue());
            pcao.setOS2(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(29)).floatValue());
            pcao.setOS3(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(30)).floatValue());
            pcao.setOSave(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(31)).floatValue());
            pcao.setJcren(gonghao);
            pcao.setJcTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(32)));
            jcd = new Jcd();
            jcd.setJcdh("");
            jcd.setKdksId(gong.getBumenId());
            jcd.setKdys(gonghao);
            jcd.setJiuzhenId(jiuzhenID);
            jcd.setBiaoshi(Integer.valueOf(56));
            jcd.setBiaoti("P超");
            jcd.setJfbs(true);
            jcd.setYanbie(Integer.valueOf(48));
            jcd.setHuanzheId(huanzheID);
            jcd.setKdTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(32)));
            jcd.setJcsbId(Integer.valueOf(110));
            jcd.setJcxmIds("83");
            Long pchaoJcdID = (Long)this.iJcdDao.saveJcd(jcd);
            jcd.setJcdh(pchaoJcdID.toString());
            this.iJcdDao.updateJcd(jcd);
            pcao.setJcdId(pchaoJcdID);
            this.iChildCheckDao.savePcao(pcao);
          } 
          if (!"".equals(((List)list.get(i)).get(41))) {
            aChao.setOd_a(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(33)).floatValue());
            aChao.setOd_l(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(34)).floatValue());
            aChao.setOd_v(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(35)).floatValue());
            aChao.setOd_al(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(36)).floatValue());
            aChao.setOs_a(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(37)).floatValue());
            aChao.setOs_l(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(38)).floatValue());
            aChao.setOs_v(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(39)).floatValue());
            aChao.setOs_al(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(40)).floatValue());
            jcd = new Jcd();
            jcd.setJcdh("");
            jcd.setJfbs(true);
            jcd.setYanbie(Integer.valueOf(48));
            jcd.setHuanzheId(huanzheID);
            jcd.setKdksId(gong.getBumenId());
            jcd.setKdys(gonghao);
            jcd.setJiuzhenId(jiuzhenID);
            jcd.setBiaoshi(Integer.valueOf(56));
            jcd.setBiaoti("A超");
            aChao.setJcren(gonghao);
            aChao.setJctime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(41)));
            jcd.setKdTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(41)));
            jcd.setJcsbId(Integer.valueOf(112));
            jcd.setJcxmIds("56");
            Long achaoJcdID = (Long)this.iJcdDao.saveJcd(jcd);
            jcd.setJcdh(achaoJcdID.toString());
            this.iJcdDao.updateJcd(jcd);
            aChao.setJcdid(achaoJcdID);
            this.iChildCheckDao.saveAChao(aChao);
          } 
          if (!"".equals(((List)list.get(i)).get(50))) {
            yanGuang.setJiuzhenid(jiuzhenID);
            yanGuang.setRefLS(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(42)));
            yanGuang.setRefRS(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(46)));
            yanGuang.setRefLC(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(43)));
            yanGuang.setRefRC(ChildExpImpUtils.convertStringToFloat(((List<String>)list.get(i)).get(47)));
            yanGuang.setRefLA(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(44)));
            yanGuang.setRefRA(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(48)));
            yanGuang.setKxd_l(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(45)));
            yanGuang.setKxd_r(ChildExpImpUtils.convertStringToInteger(((List<String>)list.get(i)).get(49)));
            yanGuang.setJcsj(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(50)));
            jcd = new Jcd();
            jcd.setJcdh("");
            jcd.setJfbs(true);
            jcd.setYanbie(Integer.valueOf(48));
            jcd.setHuanzheId(huanzheID);
            jcd.setKdksId(gong.getBumenId());
            jcd.setKdys(gonghao);
            jcd.setJiuzhenId(jiuzhenID);
            jcd.setBiaoshi(Integer.valueOf(56));
            jcd.setBiaoti("屈光");
            yanGuang.setJcys(gonghao);
            yanGuang.setCjfs(Integer.valueOf(0));
            jcd.setKdTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(50)));
            jcd.setJcsbId(Integer.valueOf(113));
            jcd.setJcxmIds("84");
            Long quguangJcdID = (Long)this.iJcdDao.saveJcd(jcd);
            jcd.setJcdh(quguangJcdID.toString());
            this.iJcdDao.updateJcd(jcd);
            yanGuang.setJcdid(quguangJcdID);
            this.iYanGuangDao.saveOrUpdateYanGuang(yanGuang);
          } 
          if (!"".equals(((List)list.get(i)).get(63))) {
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60101));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(51));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60102));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(52));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60103));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(53));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60104));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(54));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60105));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(55));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60106));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(56));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60107));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(57));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60108));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(58));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60109));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(59));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60110));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(60));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60111));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(61));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
            jzjl = new Jzjl();
            jzjl.setCategoryId(Integer.valueOf(60112));
            jzjl.setJiuzhenId(jiuzhenID);
            jzjl.setJilu(((List<String>)list.get(i)).get(62));
            jzjl.setJlren(gonghao);
            jzjl.setJlTime(ChildExpImpUtils.convertStringToDate(((List<String>)list.get(i)).get(63)));
            this.iJzjlDao.saveJzjl(jzjl);
          } 
          state = 1;
        } catch (Exception e) {
          state = 0;
        } 
      } 
    } 
    return state;
  }
  
  @Override
  public Map<String, Object> findYanGuangList(Page p, Serializable id) {
    Map<String, Object> m = new HashMap<String, Object>();
    m.put("list", this.iYanGuangDao.findYanGuangList(p, id));
    m.put("page", p);
    return m;
  }
  
  @Override
  public Map<String, Object> findPChaoList(Page p, Serializable id) {
    Map<String, Object> m = new HashMap<String, Object>();
    System.out.println(this.iChildCheckDao.findPchaoList(p, id).size());
    m.put("list", this.iChildCheckDao.findPchaoList(p, id));
    m.put("page", p);
    return m;
  }
  
  @Override
  public Map<String, Object> findAChaoList(Page p, Serializable id) {
    Map<String, Object> m = new HashMap<String, Object>();
    m.put("list", this.iChildCheckDao.findAChaoList(p, id));
    m.put("page", p);
    return m;
  }
  
  @Override
  public Boolean isXiaoEr(String hzid) {
    return this.iChildCheckDao.isXiaoEr(hzid);
  }
}
