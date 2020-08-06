package cn.com.oims.service.impl;

import cn.com.oims.common.CommonFunction;
import cn.com.oims.common.Utils;
import cn.com.oims.dao.IBuMenDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IOperationDictDao;
import cn.com.oims.dao.IQuGuangDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.QgErSsjl;
import cn.com.oims.dao.pojo.QgJtssjl;
import cn.com.oims.dao.pojo.QgSgConf;
import cn.com.oims.dao.pojo.QgShfc;
import cn.com.oims.dao.pojo.QgShfcEr;
import cn.com.oims.dao.pojo.QgShjl;
import cn.com.oims.dao.pojo.QgSsjl;
import cn.com.oims.dao.pojo.QgYy;
import cn.com.oims.dao.pojo.Qgbl;
import cn.com.oims.dao.pojo.QgblEr;
import cn.com.oims.dao.pojo.Qglc;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IOperationService;
import cn.com.oims.service.IQuGuangService;
import cn.com.oims.web.form.QgSearchForm;
import cn.com.oims.web.form.QgtjConditionForm;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.pojo.his.Operaton;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuGuangServiceImpl implements IQuGuangService {
  private static final Logger LOG = Logger.getLogger(QuGuangServiceImpl.class);
  
  @Autowired
  private IQuGuangDao emrQuGuangDao;
  
  @Autowired
  private IYuanGongDao ygDao;
  
  @Autowired
  private IOperationDictDao dictDao;
  
  @Autowired
  private IBuMenDao bumenDao;
  
  @Autowired
  private IHuanZheXinXiDao hzDao;
  
  @Autowired
  private IOperationService operationService;
  
  @Autowired
  private HisWebService hisWebService;
  
  String sendMsg_l = "";
  
  String sendMsg_r = "";

  /**
   * @description:保存屈光手术病历
   * @param qgss
   * @return:
   * @author: Mason
   * @time: 2020/5/21 16:43
   */
  @Transactional
  public Serializable saveQuss(QgSsjl qgss) {
    synchronized (QuGuangServiceImpl.class) {
      //1、同步屈光手术到HIS端
      toHisZfzOperation(qgss);
      LOG.info("手术医生-左眼:" + qgss.getSsys_l());
      //2、手术医生-左眼（不为空） 且 不为空字符串--->屈光手术对象设置左眼发送消息不，否则设置左眼手术日期为空
      if (qgss.getSsys_l() != null && !qgss.getSsys_l().trim().isEmpty() && !qgss.getSsys_l().trim().equals("")) {
        LOG.info("saveQuss设置sendMsg_l" + this.sendMsg_l);
        qgss.setSendMsg_l(this.sendMsg_l);
      } else {
        LOG.error("saveQuss设置sendMsg_l为空");
        qgss.setSsrq_l(null);
      }
      //3、手术医生-右眼（不为空） 且 不为空字符串--->屈光手术对象设置右眼发送消息不，否则设置右眼手术日期为空
      if (qgss.getSsys_r() != null && !qgss.getSsys_r().trim().isEmpty() && !qgss.getSsys_r().trim().equals("")) {
        LOG.info("saveQuss设置sendMsg_r" + this.sendMsg_r);
        qgss.setSendMsg_r(this.sendMsg_r);
      } else {
        LOG.error("saveQuss设置setSsrq_r为空");
        qgss.setSsrq_r(null);
      } 
    } 
    return this.emrQuGuangDao.saveQuss(qgss);
  }
  
  @Transactional
  public void updateQuss(QgSsjl qgss) {
    QgSsjl qg1 = this.emrQuGuangDao.getQgssById(qgss.getId());
    String sl = qg1.getSendMsg_l();
    String sr = qg1.getSendMsg_r();
    BeanUtils.copyProperties(qgss, qg1);
    if (qgss.getSsys_l() != null && !qgss.getSsys_l().trim().isEmpty() && !qgss.getSsys_l().trim().equals("")) {
      qg1.setSendMsg_l(sl);
    } else {
      qg1.setSsrq_l(null);
    } 
    if (qgss.getSsys_r() != null && !qgss.getSsys_r().trim().isEmpty() && !qgss.getSsys_r().trim().equals("")) {
      qg1.setSendMsg_r(sr);
    } else {
      qg1.setSsrq_r(null);
    } 
    toHisZfzOperation(qg1);
    this.emrQuGuangDao.updateQuss(qg1);
  }

  /**
   * @description:同步屈光手术记录到HIS前的操作
   * @param qgss 屈光手术对象
   * @return:
   * @author: Mason
   * @time: 2020/5/21 16:51
   */
  @Transactional
  private void toHisZfzOperation(QgSsjl qgss) {
    LOG.info("执行toHisZfzOperation-同步屈光手术记录到HIS前的操作，病历号：" + qgss.getBlh());
    LOG.info("矫正度数3左眼:" + qgss.getJzds3_l()+",矫正度数2左眼:" + qgss.getJzds2_l() + ",矫正度数左眼:"+qgss.getJzds_l() + ",手术医生-左眼:"+qgss.getSsys_l());
    LOG.info("矫正度数3右眼:" + qgss.getJzds3_l()+",矫正度数2右眼:" + qgss.getJzds2_l() + ",矫正度数右眼:"+qgss.getJzds_l() + ",手术医生-右眼:"+qgss.getSsys_l());
    //1、((矫正度数3左眼不为空) 或 (矫正度数2左眼不为空) 或 (矫正度数左眼不为空)) 且 (手术医生-左眼不为空)
    if (((qgss.getJzds3_l() != null && !qgss.getJzds3_l().trim().isEmpty() && !qgss.getJzds3_l().trim().equals("")) || (qgss.getJzds2_l() != null && !qgss.getJzds2_l().trim().isEmpty() && !qgss.getJzds2_l().trim().equals("")) || (qgss.getJzds_l() != null && !qgss.getJzds_l().trim().isEmpty() && !qgss.getJzds_l().trim().equals(""))) && 
      qgss.getSsys_l() != null && !qgss.getSsys_l().trim().isEmpty() && !qgss.getSsys_l().trim().equals(""))
      LOG.info("执行toHisZfzOperation_l");
      toHisZfzOperation_l(qgss);
    //2、((矫正度数3右眼不为空) 或 (矫正度数2右眼不为空) 或 (矫正度数右眼不为空)) 且 (手术医生-右眼不为空)
    if (((qgss.getJzds3_r() != null && !qgss.getJzds3_r().trim().isEmpty() && !qgss.getJzds3_r().trim().equals("")) || (qgss.getJzds2_r() != null && !qgss.getJzds2_r().trim().isEmpty() && !qgss.getJzds2_r().trim().equals("")) || (qgss.getJzds_r() != null && !qgss.getJzds_r().trim().isEmpty() && !qgss.getJzds_r().trim().equals(""))) && 
      qgss.getSsys_r() != null && !qgss.getSsys_r().trim().isEmpty() && !qgss.getSsys_r().trim().equals(""))
      LOG.info("执行toHisZfzOperation_r");
      toHisZfzOperation_r(qgss); 
  }

  /**
   * @description:保存左眼-屈光手术记录到HIS
   * @param qgss 屈光手术记录对象
   * @return: void
   * @author: Mason
   * @time: 2020/5/21 16:59
   */
  private void toHisZfzOperation_l(QgSsjl qgss) {
    LOG.info("开始调用toHisZfzOperation_l方法");
    LOG.info("手术医生：" + qgss.getSsys_l());
    //1、如果手术医生为空，直接返回
    if (qgss.getSsys_l() == null)
      return;
    //2、新建手术对象
    Operaton o = new Operaton();
    //3、获取手术记录人的员工信息
    YuanGong yg = this.ygDao.getYuanGongByGH(qgss.getRecorder());
    LOG.info("获取手术记录人的员工信息：" + yg);
    //4、获取手术医生的级别
    Integer doctor_level_l = this.dictDao.findDoctorLevelByGonghao(qgss.getSsys_l());
    LOG.info("获取手术医生的级别doctor_level_l：" + doctor_level_l);
    //5、设置手术级别
    o.setDoctor_level((doctor_level_l != null) ? Integer.valueOf(doctor_level_l.intValue() + 1) : null);
    //6、获取手术记录人的姓名
    String recorder = yg.getXingming();
    //7、获取手术记录人的所属部门
    BuMen bm = this.bumenDao.getBuMenById(yg.getBumenId());
    LOG.info("获取手术记录人的所属部门：" + bm.getBmmc());
    //8、根据病历号获取患者信息
    HuanZheXinXi hzxx = this.hzDao.getHuanzhexinxiByBLH(qgss.getBlh());
    LOG.info("根据病历号获取患者信息：" + hzxx.getXingming());
    //9、手术对象设置病历号
    o.setPatientId(hzxx.getBinglihao());
    //10、手术对象设置部门编码
    o.setOperationRoomDept(bm.getBmbm());
    //11、手术对象设置手术室编号为1号
    o.setOperationRoomNo("1");
    //12、手术对象设置手术大小
    o.setOperationSize(this.operationService.getOperationSizeTitle(Integer.valueOf(0)));
    //13、手术对象设置是否紧急
    o.setUrgent(Integer.valueOf(0));
    //14、手术对象设置是否隔离
    o.setIsolation(Integer.valueOf(0));
    //15、手术对象设置手术医生
    o.setSurgeon(this.ygDao.getYuanGongByGH(qgss.getSsys_l()).getXingming());
    //16、手术对象设置第一助手
    if (qgss.getPths_l() != null && !qgss.getPths_l().isEmpty()) {
      yg = this.ygDao.getYuanGongByGH(qgss.getPths_l());
      o.setFirstAssistant(yg.getXingming());
      LOG.info("手术对象设置第一助手：" + yg.getXingming());
    }
    //17、设置麻醉方式
    o.setAnesthesia(this.operationService.getAnesthesiaName(Integer.valueOf(2)));
    Date randomDate = CommonFunction.randomDate(new Date(qgss.getSsrq_l().getTime()), new Date(qgss.getSsrq_l().getTime() + 43200000L));
    Date date = new Date();
    Calendar c = Calendar.getInstance();
    c.setTime(date);
    int weekday = c.get(7);
    if (weekday == 1 || weekday == 7) {
      randomDate = CommonFunction.randomDate(new Date(Utils.todayToDateStart().getTime() + 32400000L), new Date(Utils.todayToDateStart().getTime() + 46800000L));
    } else {
      randomDate = CommonFunction.randomDate(new Date(Utils.todayToDateStart().getTime() + 32400000L), new Date(Utils.todayToDateStart().getTime() + 54000000L));
    }
    //18、设置手术开始日期为七天内的任意时间
    o.setStartDate(randomDate);
    //19、设置手术结束日期为随机日期的十八天后
    o.setEndDate(new Date(randomDate.getTime() + 1560000L));
    //30、设置手术记录人姓名
    o.setRecoder(recorder);
    //31、设置手术预约时间为手术日期-左眼
    o.setAppointmentTime(qgss.getSsrq_l());
    //32、设置手术大小
    o.setOperationSize("1,1");
    //33、设置手术名称
    o.setOperationNames("[左眼]" + getZfzOperationName(qgss.getSsfs_l().split(">")[1]));
    //34、设置手术备注
    o.setNote("11.7102");
    //35、如果屈光手术对象id不为空--->更新HIS上的手术记录
    if (qgss.getId() != null) {
      o.setId(qgss.getSendMsg_l());
      LOG.info("调用hisWebService.updateOperationRecord，更新【左眼】屈光手术记录到HIS");
      this.hisWebService.updateOperationRecord(o);
    } else {
      //36、如果屈光手术对象id为空，新增手术对象到HIS，并返回消息
      LOG.info("调用hisWebService.saveOperationRecord，新增【左眼】屈光手术记录到HIS");
      String msg = this.hisWebService.saveOperationRecord(o);
      if (msg == null)
        return; 
      this.sendMsg_l = msg;
    } 
  }

  /**
   * @description:保存右眼-屈光手术记录到HIS
   * @param qgss 屈光手术记录对象
   * @return: void
   * @author: Mason
   * @time: 2020/5/21 16:59
   */
  private void toHisZfzOperation_r(QgSsjl qgss) {
    if (qgss.getSsys_r() == null)
      return; 
    Operaton o = new Operaton();
    YuanGong yg = this.ygDao.getYuanGongByGH(qgss.getRecorder());
    Integer doctor_level = this.dictDao.findDoctorLevelByGonghao(qgss.getSsys_r());
    o.setDoctor_level((doctor_level != null) ? Integer.valueOf(doctor_level.intValue() + 1) : null);
    String recorder = yg.getXingming();
    BuMen bm = this.bumenDao.getBuMenById(yg.getBumenId());
    HuanZheXinXi hzxx = this.hzDao.getHuanzhexinxiByBLH(qgss.getBlh());
    o.setPatientId(hzxx.getBinglihao());
    o.setOperationRoomDept(bm.getBmbm());
    o.setOperationRoomNo("1");
    o.setOperationSize(this.operationService.getOperationSizeTitle(Integer.valueOf(0)));
    o.setUrgent(Integer.valueOf(0));
    o.setIsolation(Integer.valueOf(0));
    o.setSurgeon(this.ygDao.getYuanGongByGH(qgss.getSsys_r()).getXingming());
    if (qgss.getPths_r() != null && !qgss.getPths_r().isEmpty()) {
      yg = this.ygDao.getYuanGongByGH(qgss.getPths_r());
      o.setFirstAssistant(yg.getXingming());
    } 
    o.setAnesthesia(this.operationService.getAnesthesiaName(Integer.valueOf(2)));
    Date randomDate = CommonFunction.randomDate(new Date(qgss.getSsrq_r().getTime()), new Date(qgss.getSsrq_r().getTime() + 43200000L));
    Date date = new Date();
    Calendar c = Calendar.getInstance();
    c.setTime(date);
    int weekday = c.get(7);
    if (weekday == 1 || weekday == 7) {
      randomDate = CommonFunction.randomDate(new Date(Utils.todayToDateStart().getTime() + 32400000L), new Date(Utils.todayToDateStart().getTime() + 46800000L));
    } else {
      randomDate = CommonFunction.randomDate(new Date(Utils.todayToDateStart().getTime() + 32400000L), new Date(Utils.todayToDateStart().getTime() + 54000000L));
    } 
    o.setStartDate(randomDate);
    o.setEndDate(new Date(randomDate.getTime() + 1620000L));
    o.setRecoder(recorder);
    o.setAppointmentTime(qgss.getSsrq_r());
    o.setOperationSize("1,1");
    o.setOperationNames("[右眼]" + getZfzOperationName(qgss.getSsfs_r().split(">")[1]));
    o.setNote("11.7102");
    if (qgss.getId() != null) {
      o.setId(qgss.getSendMsg_r());
      LOG.info("调用hisWebService.updateOperationRecord，更新【右眼】屈光手术记录到HIS");
      this.hisWebService.updateOperationRecord(o);
    } else {
      LOG.info("调用hisWebService.saveOperationRecord，新增【右眼】屈光手术记录到HIS");
      String msg = this.hisWebService.saveOperationRecord(o);
      if (msg == null)
        return; 
      this.sendMsg_r = msg;
    } 
  }
  
  private String getZfzOperationName(String string) {
    System.out.println("准本子手术方式：" + string + "\t" + string.indexOf("飞秒"));
    if (string != null && string.indexOf("lasik") != -1)
      return "激光原位角膜磨镶术（LASIK）"; 
    if (string != null && string.indexOf("PRK") != -1)
      return "跨上皮准分子激光屈光性角膜矫正术（TPRK）"; 
    if (string != null && string.indexOf("飞秒") != -1)
      return "飞秒激光屈光手术"; 
    throw new RuntimeException("没有发现对应手术名称");
  }
  
  public Map<String, Object> findQuss4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQuss4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findQuss4page(Page page, Long lc_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQuss4page(page, lc_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public QgSsjl getQussById(Long id) {
    return this.emrQuGuangDao.getQgssById(id);
  }
  
  public void saveShjl(QgShjl shjl) {
    this.emrQuGuangDao.saveShjl(shjl);
  }
  
  public void updateShjl(QgShjl shjl) {
    this.emrQuGuangDao.updateShjl(shjl);
  }
  
  public Map<String, Object> findShjl4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findShjl4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findShjl4page(Page page, Long lc_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findShjl4page(page, lc_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public QgShjl getShjlById(Long id) {
    return this.emrQuGuangDao.getShjlById(id);
  }
  
  public List<QgShjl> findShjlAll(String blh) {
    return this.emrQuGuangDao.findShjlAll(blh);
  }
  
  public void saveYy(QgYy qgyy) {
    this.emrQuGuangDao.saveYy(qgyy);
  }
  
  public void updateQgyy(QgYy qgyy) {
    this.emrQuGuangDao.updateQgyy(qgyy);
  }
  
  public QgYy getQgYyById(Long id) {
    return this.emrQuGuangDao.getQgYyById(id);
  }
  
  public Map<String, Object> findQgYy4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQgYy4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findQgYy4page(Page page, Long lc_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQgYy4page(page, lc_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findQgYyAll4page(Page page) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQgYyAll4page(page);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public void saveQgbl(Qgbl qgbl) {
    String number = null;
    if (qgbl.getBingliNumber() == null || qgbl.getBingliNumber().equals("")) {
      number = this.emrQuGuangDao.getBingliNumber();
    } else if (this.emrQuGuangDao.bingliNumberExists(qgbl.getBingliNumber())) {
      number = this.emrQuGuangDao.getBingliNumber();
    } 
    if (number != null)
      qgbl.setBingliNumber(number); 
    if (qgbl.getJzrq() == null)
      qgbl.setJzrq(new Date()); 
    this.emrQuGuangDao.saveQgbl(qgbl);
  }
  
  public void updateQgbl(Qgbl qgbl) {
    Qgbl old = this.emrQuGuangDao.getQgblById(qgbl.getId());
    if (qgbl.getBingliNumber() == null || qgbl.getBingliNumber().isEmpty()) {
      qgbl.setBingliNumber(this.emrQuGuangDao.getBingliNumber());
    } else if (!qgbl.getBingliNumber().equals(old.getBingliNumber()) && 
      this.emrQuGuangDao.bingliNumberExists(qgbl.getBingliNumber())) {
      qgbl.setBingliNumber(this.emrQuGuangDao.getBingliNumber());
    } 
    BeanUtils.copyProperties(qgbl, old);
    this.emrQuGuangDao.updateQgbl(old);
  }
  
  public Qgbl getQgblById(Long id) {
    return this.emrQuGuangDao.getQgblById(id);
  }
  
  public Map<String, Object> findQgbl4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQgbl4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Serializable saveJtssjl(QgJtssjl jt) {
    jt.setCzrq(new Date());
    return this.emrQuGuangDao.saveJtssjl(jt);
  }
  
  public void updateJtssjl(QgJtssjl jt) {
    jt.setCzrq(new Date());
    this.emrQuGuangDao.updateJtssjl(jt);
  }
  
  public QgJtssjl getJtssjlById(Long id) {
    return this.emrQuGuangDao.getJtssjlById(id);
  }
  
  public Map<String, Object> findJtssjl4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findJtssjl4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findJtssjl4page(Page page, Long lc_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findJtssjl4page(page, lc_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public void saveShfc(QgShfc fc) {
    this.emrQuGuangDao.saveShfc(fc);
  }
  
  public void updateShfc(QgShfc fc) {
    this.emrQuGuangDao.updateShfc(fc);
  }
  
  public QgShfc getShfcById(Long id) {
    return this.emrQuGuangDao.getShfcById(id);
  }
  
  public Map<String, Object> findShfc4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findShfc4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findShfc4page(Page page, Long lc_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findShfc4page(page, lc_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Serializable saveErSsjl(QgErSsjl ssjl) {
    return this.emrQuGuangDao.saveErSsjl(ssjl);
  }
  
  public void updateErSsjl(QgErSsjl ssjl) {
    this.emrQuGuangDao.updateErSsjl(ssjl);
  }
  
  public QgErSsjl getErSsjlById(Long id) {
    return this.emrQuGuangDao.getErSsjlById(id);
  }
  
  public Map<String, Object> findErSsjl4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findErSsjl4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findErSsjl4page(Page page, Long lc_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findErSsjl4page(page, lc_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public void saveQgblEr(QgblEr er) {
    String number = null;
    if (er.getBingliNumber() == null || er.getBingliNumber().equals("")) {
      number = this.emrQuGuangDao.getBingliNumber();
    } else if (this.emrQuGuangDao.bingliNumberExists(er.getBingliNumber())) {
      number = this.emrQuGuangDao.getBingliNumber();
    } 
    if (number != null)
      er.setBingliNumber(number); 
    if (er.getJzrq() == null)
      er.setJzrq(new Date()); 
    this.emrQuGuangDao.saveBler(er);
  }
  
  public void updateQgblEr(QgblEr er) {
    this.emrQuGuangDao.updateBler(er);
  }
  
  public QgblEr getQgblErById(Long id) {
    return this.emrQuGuangDao.getBlerById(id);
  }
  
  public Map<String, Object> findQgblEr4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findBler4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public void saveShfcEr(QgShfcEr fc) {
    this.emrQuGuangDao.saveShfcEr(fc);
  }
  
  public void updateShfcEr(QgShfcEr fc) {
    this.emrQuGuangDao.updateShfcEr(fc);
  }
  
  public QgShfcEr getShfcErById(Long id) {
    return this.emrQuGuangDao.getShfcErById(id);
  }
  
  public Map<String, Object> findShfcEr4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findShfcEr4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findShfcEr4page(Page page, Long lc_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findShfcEr4page(page, lc_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public void saveQglc(Qglc lc) {
    if (lc.getBl_id() == null)
      if ("儿童屈光".equals(lc.getSsfs1())) {
        QgblEr bl = getQgblErLastOne(lc.getBlh());
        lc.setBl_id(bl.getId());
      } else {
        Qgbl bl = getQgblLastOne(lc.getBlh());
        lc.setBl_id(bl.getId());
      }  
    this.emrQuGuangDao.saveQglc(lc);
  }
  
  public void updateQglc(Qglc lc) {
    if (lc.getBl_id() == null)
      if ("儿童屈光".equals(lc.getSsfs1())) {
        QgblEr bl = getQgblErLastOne(lc.getBlh());
        lc.setBl_id(bl.getId());
      } else {
        Qgbl bl = getQgblLastOne(lc.getBlh());
        lc.setBl_id(bl.getId());
      }  
    this.emrQuGuangDao.updateQglc(lc);
  }
  
  public Qglc getQglcById(Long id) {
    return this.emrQuGuangDao.getQglcById(id);
  }
  
  public Map<String, Object> findQglc4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQglc4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Qglc findQglcByIdWwc(String blh) {
    List<Qglc> list = this.emrQuGuangDao.findQglcByBlhWwc(blh);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public Qgbl getQgblLastOne(String blh) {
    List<Qgbl> list = this.emrQuGuangDao.getQgblLastOne(blh);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public QgblEr getQgblErLastOne(String blh) {
    List<QgblEr> list = this.emrQuGuangDao.getQgblErLastOne(blh);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public QgSsjl getQussByLc_id(Long lc_id) {
    List<QgSsjl> list = this.emrQuGuangDao.findQgssByLc_id(lc_id);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public QgShjl getQgShjlByLc_id(Long lc_id) {
    List<QgShjl> list = this.emrQuGuangDao.findQgShjlByLc_id(lc_id);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public QgYy getQgYyByLc_id(Long lc_id) {
    List<QgYy> list = this.emrQuGuangDao.findQgYyByLc_id(lc_id);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public Qgbl getQgblByLc_id(Long lc_id) {
    Qglc qc = this.emrQuGuangDao.getQglcById(lc_id);
    if (qc != null && qc.getBl_id() != null)
      return this.emrQuGuangDao.getQgblById(qc.getBl_id()); 
    return null;
  }
  
  public QgJtssjl getJtssjlByLc_id(Long lc_id, String yanbie) {
    List<QgJtssjl> list = this.emrQuGuangDao.findJtssjlByLc_id(lc_id);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public QgShfc getShfcByLc_id(Long lc_id) {
    List<QgShfc> list = this.emrQuGuangDao.findShfcByLc_id(lc_id);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public QgErSsjl getErSsjlByLc_id(Long lc_id) {
    List<QgErSsjl> list = this.emrQuGuangDao.findQgErSsjlBylc_id(lc_id);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public QgblEr getQgblErByLc_id(Long lc_id) {
    Qglc qc = this.emrQuGuangDao.getQglcById(lc_id);
    if (qc != null && qc.getBl_id() != null)
      return this.emrQuGuangDao.getBlerById(qc.getBl_id()); 
    return null;
  }
  
  public QgShfcEr getShfcErByLc_id(Long lc_id) {
    List<QgShfcEr> list = this.emrQuGuangDao.findShfcByLc_id(lc_id);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public Qglc getQglcByBl_id(Long bl_id) {
    List<Qglc> list = this.emrQuGuangDao.findQglcBybl_id(bl_id);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public String autoCreateBinglihao(String id) {
    return this.emrQuGuangDao.getBingliNumber();
  }
  
  public List<YuanGong> findYuanGong(Integer role1, Integer role2) {
    return this.emrQuGuangDao.getQgYuanGong(role1, role2);
  }
  
  public List<QgSgConf> findQgSgConf(String tag) {
    return this.emrQuGuangDao.findQgSgConf(tag);
  }
  
  public Map<String, Object> findQuss4page_look(Page page, String str) {
    return null;
  }
  
  public Map<String, Object> findQgbl(Page page, QgSearchForm form) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQgbl(page, form);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findQgYY(Page page, QgSearchForm form) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQgYY(page, form);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findQgSsjl(Page page, QgSearchForm form) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQgSsjl(page, form);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Map<String, Object> findQgShjl(Page page, QgSearchForm form) {
    Map<String, Object> m = new HashMap<>();
    List list = this.emrQuGuangDao.findQgShjl(page, form);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public List<QgSearchForm> findQgbl(QgSearchForm form) {
    return this.emrQuGuangDao.findQgbl(form);
  }
  
  public List<QgSearchForm> findQgYY(QgSearchForm form) {
    return this.emrQuGuangDao.findQgYY(form);
  }
  
  public List<QgSearchForm> findQgSsjl(QgSearchForm form) {
    return this.emrQuGuangDao.findQgSsjl(form);
  }
  
  public List<QgSearchForm> findQgShjl(QgSearchForm form) {
    return this.emrQuGuangDao.findQgShjl(form);
  }
  
  public Integer getCountByTj(String realPath) {
    QgtjConditionForm form = null;
    return this.emrQuGuangDao.getCountByTj(realPath, form);
  }
  
  public List<Map<String, String>> getAllYs(String realPath, QgtjConditionForm form) {
    return this.emrQuGuangDao.getAllYs(realPath, form);
  }
  
  public List<String> getAllJcxm(String realPath, QgtjConditionForm form) {
    return this.emrQuGuangDao.getAllJcxm(realPath, form);
  }
  
  public List<ArrayList> getAllYsAndCount(String realPath, QgtjConditionForm form) {
    if (form == null)
      form = new QgtjConditionForm(); 
    List<ArrayList> list_arr = null;
    if (form.getYsqz() != null && !form.getYsqz().equals("")) {
      String[] ysqzs = form.getYsqz().split("@");
      if (ysqzs.length > 0) {
        list_arr = new ArrayList<>();
        for (int i = 0; i < ysqzs.length; i++) {
          if (!ysqzs[i].equals("")) {
            String[] strs = ysqzs[i].split("[(]");
            String xingming = strs[0];
            String[] strs1 = strs[1].split("[)]");
            String gonghao = strs1[0];
            String nameAndId = "";
            nameAndId = String.valueOf(xingming) + "(" + gonghao + ")";
            form.setYsqz(gonghao);
            Integer count = this.emrQuGuangDao.getCountByTj(realPath, form);
            ArrayList<String> strsList = new ArrayList();
            strsList.add(nameAndId);
            strsList.add(count + "");
            list_arr.add(strsList);
          } 
        } 
      } 
    } else {
      List<Map<String, String>> list = getAllYs(realPath, form);
      if (list != null) {
        list_arr = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
          Map map = list.get(i);
          String gonghao = map.get("gonghao").toString();
          String xingming = map.get("xingming").toString();
          String nameAndId = "";
          if (gonghao.equals("")) {
            nameAndId = "未签名(null)";
            form.setYsqz("null");
          } else {
            nameAndId = String.valueOf(xingming) + "(" + gonghao + ")";
            form.setYsqz(gonghao);
          } 
          Integer count = this.emrQuGuangDao.getCountByTj(realPath, form);
          ArrayList<String> strs = new ArrayList();
          strs.add(nameAndId);
          strs.add(count + "");
          list_arr.add(strs);
        } 
      } 
    } 
    return list_arr;
  }
  
  public List<ArrayList> getAllJcxmAndCount(String realPath, QgtjConditionForm form) {
    if (form == null)
      form = new QgtjConditionForm(); 
    List<ArrayList> list_arr = null;
    if (form.getJcxm() != null && !form.getJcxm().equals("")) {
      String[] jcxms = form.getJcxm().split("@");
      if (jcxms.length > 0) {
        list_arr = new ArrayList<>();
        for (int i = 0; i < jcxms.length; i++) {
          String jcxm = jcxms[i];
          form.setJcxm(jcxm);
          Integer count = this.emrQuGuangDao.getCountByTj(realPath, form);
          ArrayList<String> strs = new ArrayList();
          strs.add(jcxm);
          strs.add(count + "");
          list_arr.add(strs);
        } 
      } 
    } else {
      List<String> list = getAllJcxm(realPath, form);
      if (list != null) {
        list_arr = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
          String jcxm = list.get(i);
          form.setJcxm(jcxm);
          Integer count = this.emrQuGuangDao.getCountByTj(realPath, form);
          ArrayList<String> strs = new ArrayList();
          strs.add(jcxm);
          strs.add(count + "");
          list_arr.add(strs);
        } 
      } 
    } 
    return list_arr;
  }
  
  public Integer getCountByTjss(String realPath) {
    QgtjConditionForm form = null;
    return this.emrQuGuangDao.getCountByTjss(form);
  }
  
  public List<Map<String, String>> getAllSsYs(QgtjConditionForm form, String biaoshi) {
    return this.emrQuGuangDao.getAllSsYs(form, biaoshi);
  }
  
  public List<ArrayList> getAllYsAndCount_ss(QgtjConditionForm form, String biaoshi) {
    if (form == null)
      form = new QgtjConditionForm(); 
    List<ArrayList> list_arr = null;
    if (form.getYsqz() != null && !form.getYsqz().equals("")) {
      String[] ysqzs = form.getYsqz().split("@");
      if (ysqzs.length > 0) {
        list_arr = new ArrayList<>();
        for (int i = 0; i < ysqzs.length; i++) {
          if (!ysqzs[i].equals("")) {
            String[] strs = ysqzs[i].split("[(]");
            String xingming = strs[0];
            String[] strs1 = strs[1].split("[)]");
            String gonghao = strs1[0];
            String nameAndId = "";
            nameAndId = String.valueOf(xingming) + "(" + gonghao + ")";
            form.setYsqz(gonghao);
            Integer count = this.emrQuGuangDao.getCountByTjss(form);
            ArrayList<String> strsList = new ArrayList();
            strsList.add(nameAndId);
            strsList.add(count + "");
            list_arr.add(strsList);
          } 
        } 
      } 
    } else {
      List<Map<String, String>> list = getAllSsYs(form, biaoshi);
      if (list != null) {
        list_arr = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
          Map map = list.get(i);
          String gonghao = map.get("gonghao").toString();
          String xingming = map.get("xingming").toString();
          String nameAndId = "";
          if (gonghao.equals("")) {
            nameAndId = "未签名(null)";
            form.setYsqz("null");
          } else {
            nameAndId = String.valueOf(xingming) + "(" + gonghao + ")";
            form.setYsqz(gonghao);
          } 
          Integer count = this.emrQuGuangDao.getCountByTjss(form);
          ArrayList<String> strs = new ArrayList();
          strs.add(nameAndId);
          strs.add(count + "");
          list_arr.add(strs);
        } 
      } 
    } 
    return list_arr;
  }
}
