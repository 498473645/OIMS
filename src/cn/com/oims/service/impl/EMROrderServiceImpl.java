package cn.com.oims.service.impl;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.IBanGongShiDao;
import cn.com.oims.dao.IBuMenDao;
import cn.com.oims.dao.IDoctorsWorkstationDao;
import cn.com.oims.dao.IEMROrderDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJcxmDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.jdbc.IEyeDao;
import cn.com.oims.dao.jdbc.IMiddleControlFskDao;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.EMRJcxmFushu;
import cn.com.oims.dao.pojo.EMRLisSample;
import cn.com.oims.dao.pojo.EMROrder;
import cn.com.oims.dao.pojo.EMROrderDetail;
import cn.com.oims.dao.pojo.EyeInfoOutpClinic;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IEMROrderService;
import cn.com.oims.service.IEMRService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.utils.DateUtils;
import cn.com.oims.web.form.EMROrderForm;
import cn.com.oims.webservice.ExamWebService;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.LisWebService;
import cn.com.oims.webservice.pojo.Patient;
import cn.com.oims.webservice.pojo.PatientVistInfomation;
import cn.com.oims.webservice.pojo.ResponseObj;
import cn.com.oims.webservice.pojo.exam.ExamItem;
import cn.com.oims.webservice.pojo.exam.ExamResult;
import cn.com.oims.webservice.pojo.his.PriceItem;
import cn.com.oims.webservice.pojo.lis.Sample;
import cn.com.oims.webservice.pojo.lis.TestItem;
import cn.com.oims.webservice.pojo.lis.TestResult;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class EMROrderServiceImpl implements IEMROrderService {
  private static final Logger LOG = LoggerFactory.getLogger(EMROrderServiceImpl.class);


  @Autowired
  IJiuzhenDao jiuzhenDao;
  
  @Autowired
  IJcxmDao jcxmDao;
  
  @Autowired
  IBuMenDao bumenDao;
  
  @Autowired
  IYuanGongDao ygDao;
  
  @Autowired
  IJcdService jcdService;
  
  @Autowired
  IEMROrderDao orderDao;
  
  @Autowired
  HisWebService hisWebService;
  
  @Autowired
  LisWebService lisWebService;
  
  @Autowired
  ExamWebService examWebService;
  
  @Autowired
  IHuanZheXinXiDao huanZheXinXiDao;
  
  @Autowired
  IEMROrderDao iemrOrderDao;
  
  @Autowired
  IDoctorsWorkstationDao doctorsWorkstationDao;
  
  @Autowired
  IEyeDao eyeDao;
  
  @Autowired
  IEMRService iemrService;
  
  @Autowired
  IBanGongShiDao banGongShiDao;
  
  @Autowired
  IMiddleControlFskDao middleControlFskDao;
  
  private String language = "ISO-8859-1";
  
  private Float order_money = Float.valueOf(0.0F);

  /**
   * 保存处置开单（眼科检查、全院检查、化验、处方、治疗、随访、屈光手术、门诊手术）
   * 医生工作站-处置-保存时调用
   * @param list 开单集合
   * @param jiuzhenId 就诊id
   * @param huanzheId 患者id
   * @param gonghao 医生工号
   * @param printFlag 是否打印
   * @return
   */
  @Transactional
  public List<Map<String, Object>> saveOrder(List<EMROrderForm> list, Long jiuzhenId, Long huanzheId, String gonghao, boolean printFlag) {
    LOG.info("保存申请单信息开始[jiuzhenId: {}, huanzheId: {}, gonghao: {}]", 
        new Object[] { jiuzhenId, huanzheId, gonghao });
    long time = System.currentTimeMillis();
    List<Map<String, Object>> list_notransfer = new ArrayList<>();
    //1、根据患者id查询患者信息
    HuanZheXinXi hzxx = this.huanZheXinXiDao.findHuanZheById(huanzheId);
    //2、根据就诊id查询就诊信息
    Jiuzhen jz = this.jiuzhenDao.findJiuzhenById(jiuzhenId);
    //3、根据就诊id、开单集合中第一个的类型，查询数据库【已开出】的处置单
    List<EMROrder> oldList = this.orderDao.findOrders(jiuzhenId, ((EMROrderForm)list.get(0)).getCategoryId());
    //4、【新开】的处置单的迭代器
    Iterator<EMROrderForm> itr = list.iterator();
    //5、判断是否已挂号
    boolean flag = (StringUtils.hasLength(jz.getHaoma()) && !jz.getHaoma().startsWith("OIMS"));
    //6、如果新开处置单集合不为空，循环【新开】处置单
    while (itr.hasNext()) {
      //6-1、单个处置单接收对象为【of】
      EMROrderForm of = itr.next();
      //6-2、是否同步HIS标识为transferFlag，依据是就诊信息是否有挂号号码且不以OIMS开头
      boolean transferFlag = flag;
      //6-3、历史开出的处置单迭代器【itr0】
      Iterator<EMROrder> itr0 = oldList.iterator();
      //6-4、循环历史开出的处置单集合
      while (itr0.hasNext()) {
        //6-4-1、历史处置单接收对象【o】
        EMROrder o = itr0.next();
        //6-4-2、如果当前操作医生的工号与历史开单的医生不相符->从历史开单集合中移除当前开单，继续循环
        if (!gonghao.equals(o.getKdys())) {
          itr0.remove();
          continue;
        }
        //6-4-3、如果历史开单的检查项目id 等于 新开单的检查项目id
        if (o.getJcxmId().intValue() == of.getJcxmId().intValue()) {
          //6-4-4、如果当前就诊有HIS挂号信息->HIS同步标识设置为与历史开单的同步标识相反
          if (flag){
            transferFlag = !o.isTransferFlag();
          }
          /**
           * 6-4-5、如果历史处置单 HIS同步标识为true 且 当前处置单的计费状态【不等于】已收费
           * 且 （
           *      历史处置单的数量【不等于】新开处置单的数量
           *      或 历史处置单的执行科室【不等于】新开处置单的执行科室
           *      或 历史处置单的眼别(part) 【不等于】 新开处置单的眼别
           *      或 历史处置单的 是否紧急 【不等于】 新开处置单的 是否紧急
           *      或 历史处置单的 是否院前检查【为】null 且 新开处置单的是否院前检查【不为】null
           *      或 历史处置单的 是否院前检查【不为】null 且 新开处置单的是否院前检查【为】null
           *      或 历史处置单的 是否院前检查【不等于】新开处置单的是否院前检查
           *   ）===》1、删除HIS中的历史处置单，2、是否同步标识等于flag
           */
          if (o.isTransferFlag() && o.getJifeiFlag() != IEMROrderService.ORDER_JIFEI_FLAG_YJF && (
            !o.getShuliang().equals(of.getCount()) || 
            !o.getExcutiveDept().equals(of.getExcutiveDept()) || (
            o.getPart() != null && !o.getPart().equals(Integer.valueOf(Integer.parseInt(of.getPart())))) || 
            !o.getUrgent().equals(of.getUrgent()) || (
            o.getPreExam() == null && of.getPreExam() != null) || (
            o.getPreExam() != null && of.getPreExam() == null) || 
            o.getPreExam().compareTo(of.getPreExam()) != 0)) {
            deleteHisUpdate(o);
            transferFlag = flag;
          }
          //6-4-6、设置新的处置单的id为历史处置单的id
          of.setId(o.getId());
          //6-4-7、历史处置单迭代器中删除当前历史处置单
          itr0.remove();
        } 
      } 
      EMROrder order = null;

      //6-5、如果新开处置单的id不为null（即从历史处置单中找到了重复的处置单并将历史处置单的id设置进新开处置单的id中）
      if (of.getId() != null) {
        //6-5-1、根据新处置单的id查询处置单详情 并 设置进 order对象
        order = this.orderDao.getEMROrder(of.getId());
        //6-5-2、如果查询到的处置单为空==》抛出异常
        if (order == null)
          throw new RuntimeException("未找到相应单据！");
        //6-5-3、如果查询到的处置单的计费标识为【已计费】 或者 （处置单已同步HIS 且 在HIS中已收费）
        if (order.getJifeiFlag() == ORDER_JIFEI_FLAG_YJF || (order.isTransferFlag()
                && this.hisWebService.getSpecialHospitalTreatFlag(order.getOrderNo()).booleanValue()))
          continue; 
      } else {//6-6、新建处置单对象，并设置就诊id
        order = new EMROrder();
        order.setJiuzhenId(jiuzhenId);
      }
      //7、如果打印标识为true
      if (printFlag) {
        //7-1、获取打印的质量
        Integer q = order.getPrintQuantity();
        if (q == null)
          q = Integer.valueOf(0); 
        if (q.intValue() == 0)
          order.setPrintDate(new Date()); 
        order.setPrintLastDate(new Date());
        order.setPrintQuantity(Integer.valueOf(q.intValue() + 1));
      }
      //8、根据新开处置单的检查项目id查询检查项目详情
      Jcxm jcxm = this.jcxmDao.findJcxmById(of.getJcxmId());
      //9、获取处置单的类型id设置进categoryId
      int categoryId = of.getCategoryId().intValue();
      //10、检查单设置类型（眼科检查/全院检查/化验等）
      order.setCategoryId(Integer.valueOf(categoryId));
      //11、检查单设置执行科室
      order.setExcutiveDept(of.getExcutiveDept());
      //12、检查单设置是否有详情
      order.setHaveDetails((of.getOrderDetails() != null));
      //13、检查单设置检查项目编号
      order.setItemCode(jcxm.getBianma());
      //14、检查单设置检查项目名称
      order.setItemName(jcxm.getXmmc());
      //15、检查单设置检查项目id
      order.setJcxmId(jcxm.getId());
      //16、检查单设置开单医生
      order.setKdys(gonghao);
      //17、检查单设置开单时间
      order.setKdTime(new Date());
      //18、检查单设置备注
      order.setNote(of.getNote());
      //19、检查单设置眼别
      if (StringUtils.hasLength(of.getPart()))
        order.setPart(Integer.valueOf(Integer.parseInt(of.getPart().trim())));
      //20、检查单设置数量
      order.setShuliang(of.getCount());
      //21、检查单设置是否紧急
      order.setUrgent(of.getUrgent());
      //22、检查单设置价格
      order.setPrice(of.getMoney());
      //23、检查单设置是否院前检查
      order.setPreExam(of.getPreExam());
      //24、根据当前登录医生的工号查询员工信息
      YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
      //25、检查单设置开单科室为开单医生的部门id
      order.setKdks(yg.getBumenId());
      /**
       * 26、如果处置单的类型为：
       * 13（眼科检查） 或 9（特殊检查） 或 8（常规检查）
       * 或 （ 5（作废） 且 检查单执行科室为 128（眼科激光室）
       * 或 检查项目为 1970（泪道冲洗）
       * ）==》新增或保存检查单
       */
      if (categoryId == 13 || categoryId == 9 || categoryId == 8
              || (categoryId == 5 && of.getExcutiveDept().intValue() == 128)
              || jcxm.getId().intValue() == 1970){
        saveOrUpdateJcd(of, order, jcxm, yg, jiuzhenId, huanzheId);
      }
      //27、处置单设置计费标识-未计费
      order.setJifeiFlag(IEMROrderService.ORDER_JIFEI_FLAG_WJF);
      //28、如果处置单的id为null（标识之前没有数据库记录）==》新增处置单
      if (order.getId() == null){
        order.setId(this.orderDao.saveOrder(order));
      }
      //29、根据处置单id查询数据库现有的处置单详情集合
      List<EMROrderDetail> oldDl = this.orderDao.findOrderDetails(order.getId());
      List<EMROrderDetail> dl = new ArrayList<>();
      //30、获取现有处置单详情集合
      if (order.isHaveDetails()) {
        dl = getOrderDetails(order.getId(), of.getOrderDetails());
        boolean bool = synchOrderDetail(dl, oldDl, jcxm, jiuzhenId);
      }
      //31、如果旧的处置单详情集合不为空==》删除就得处置单详情
      if (oldDl.size() > 0){
        delteOrderDetails(oldDl, order.getCategoryId());
      }
      //32、如果同步标识为true==》传输处置单到his
      if (transferFlag){
        try {
          String[] result = transfer(order, dl, hzxx, jz, jcxm, yg);
          if (result != null) {
            order.setBillNo(result[1]);
            order.setOrderNo(result[0]);
            order.setCallbackMessage(result[2]);
            order.setTransferFlag(StringUtils.hasLength(result[0]));
            if (!order.isTransferFlag()) {
              Map<String, Object> map_notransfer = new HashMap<>();
              map_notransfer.put("jcxmId", jcxm.getId());
              list_notransfer.add(map_notransfer);
            }
          }
        } catch (Exception e) {
          LOG.error("向HIS发送申请单信息失败[patientId:{}, Msg:{}]", hzxx.getBinglihao(), e.getMessage());
          e.printStackTrace();
        }
      }

      //33、如果处置单类型不等于【项目类别】==》处置单设置价格，更新处置单
      if (categoryId != 7) {
        order.setPrice(this.order_money);
        this.orderDao.updateOrder(order);
        this.order_money = Float.valueOf(0.0F);
      } 
    }

    //34、如果数据库已开出的处置单不为空
    if (!oldList.isEmpty()) {
      //34-1、迭代器
      Iterator<EMROrder> olditr = oldList.iterator();
      while (olditr.hasNext()) {
        EMROrder order = olditr.next();
        /**
         * 34-2、如果该处置单
         * 计费标识 等于 已计费
         * 或 （处置单同步标识为true 且 该处置单已缴费）
         * ==》进入下一个处置单
         */
        if (order.getJifeiFlag() == ORDER_JIFEI_FLAG_YJF || (order.isTransferFlag() && this.hisWebService.getSpecialHospitalTreatFlag(order.getOrderNo()).booleanValue())){
          continue;
        }
        //34-3、如果处置单的检查单id不为空
        if (order.getJcdId() != null) {
          //34-4、根据处置单id查询检查单id
          Jcd jcd = this.jcdService.getJcdById(order.getJcdId());
          //34-5、如果检查单的状态为 （待检查 或 已过号） 且 检查单未缴费 ==》删除检查单
          if ((jcd.getBiaoshi().intValue() == 50 || 
            jcd.getBiaoshi().intValue() == 53) && !jcd.isJfbs()) {
            this.jcdService.deleteJcd(jcd);
          } else {
            continue;
          } 
        }
        //34-6、根据处置单id查询数据库中的处置单详情
        List<EMROrderDetail> oldDl = this.orderDao.findOrderDetails(order.getId());
        //34-7、删除处置单详情
        this.orderDao.deleteOrderDetail(oldDl);
        //34-8、删除处置单
        this.orderDao.deleteOrder(order);
        //34-9、删除HIS上的处置单
        deleteHisUpdate(order);
      } 
    }

    LOG.info("为患者[patientID:{}]保存开单信息共花费了{}秒", hzxx.getBinglihao(), Long.valueOf((System.currentTimeMillis() - time) / 1000L));
    return list_notransfer;
  }

  /**
   * 删除处置单对象
   * 根据处置单类型不同，删除HIS或LIS上的数据
   * @param eo 处置单对象
   */
  private void deleteHisUpdate(EMROrder eo) {
    int i;
    //1、如果处置单的HIS同步标识为false--》直接结束
    if (!eo.isTransferFlag())
      return;
    //2、如果处置单中的开单编号为null--》直接结束
    if (eo.getOrderNo() == null)
      return;
    //3.根据逗号拆分处置单开单编号为数组nos
    String[] nos = eo.getOrderNo().split(",");
    //4、根据方法参数中的处置单的就诊id查询就诊信息
    Jiuzhen jz = this.jiuzhenDao.findJiuzhenById(eo.getJiuzhenId());
    //5、条件判断处置单的 类别 id
    switch (eo.getCategoryId().intValue()) {
      case 5://作废
      case 7://项目类别
      case 11://按病种
      case 13://眼科检查==》删除his上的检查单
        for (i = 0; i < nos.length; i++)
          this.hisWebService.deleteOutpTreatRec(nos[i]); 
        break;
      case 15://化验==》删除LIS上的化验单
        for (i = 0; i < nos.length; i++)
          this.lisWebService.deleteTestItem(nos[i]); 
        break;
      case 14://全院检查
        for (i = 0; i < nos.length; i++) {
          //如果非免费挂号==》删除HIS上的检查项目
          if (!jz.getHaoma().startsWith("OIMS")) {
            this.examWebService.deleteExamItem(nos[i]);
          } else {
            //如果挂的收费号==》删除HIS上的检查项目
            this.examWebService.deleteExamItemNoFee(nos[i]);
          } 
        } 
        break;
    } 
  }
  
  private void saveOrUpdateOrderToEyeInfoOutpClinic(Long jiuzhenId, Integer categoryId) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(jiuzhenId);
    YuanGong yg = this.ygDao.obtainYuanGongByGonghao(visit.getFzys());
    HuanZheXinXi patient = this.huanZheXinXiDao.findHuanZheById(visit.getHuanzheId());
    SimpleDateFormat format = new SimpleDateFormat("yyMMddHHmmss");
    EyeInfoOutpClinic eioc = null;
    List<EMROrder> list = this.iemrOrderDao.findOrders(jiuzhenId, categoryId, null);
    try {
      eioc = this.eyeDao.getEyeInfoOutpClinic(patient.getBinglihao(), (
          new SimpleDateFormat("yyyy-MM-dd"))
          .parse((new SimpleDateFormat("yyyy-MM-dd")).format(visit.getCaozuoTime())), 
          new String(yg.getXingming().getBytes(), this.language));
      StringBuffer sb = new StringBuffer("");
      for (EMROrder eo : list)
        sb.append(String.valueOf(eo.getItemName()) + " "); 
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
        String s = null;
        if (categoryId.intValue() == 13) {
          s = "special";
        } else if (categoryId.intValue() == 14) {
          s = "hospital";
        } else if (categoryId.intValue() == 15) {
          s = "lis";
        } else if (categoryId.intValue() == 5) {
          s = "treat";
        } 
        String statement = this.iemrService.createTreatmentInfo(map, sb.toString(), s, visit);
        eioc.setTreatment_info((statement == null) ? null : new String(statement.getBytes(), this.language));
        this.eyeDao.updateEyeInfoOutpClinic(eioc);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  private void deleteHisRecord(List<EMROrder> hisoldList) {
    for (EMROrder eo : hisoldList) {
      int i;
      String[] nos = eo.getOrderNo().split(",");
      switch (eo.getCategoryId().intValue()) {
        case 13:
          for (i = 0; i < nos.length; i++)
            this.hisWebService.deleteOutpTreatRec(nos[i]); 
        case 15:
          for (i = 0; i < nos.length; i++)
            this.lisWebService.deleteTestItem(nos[i]); 
        case 14:
          for (i = 0; i < nos.length; i++)
            this.examWebService.deleteExamItem(nos[i]); 
        case 5:
          for (i = 0; i < nos.length; i++)
            this.hisWebService.deleteOutpTreatRec(nos[i]); 
      } 
    } 
  }
  
  private void saveOrUpdateJcd(EMROrderForm of, EMROrder order, Jcxm jcxm, YuanGong yg, Long jiuzhenId, Long huanzheId) {
    Jcd jcd;
    if (order.getJcdId() != null) {
      jcd = this.jcdService.getJcdById(order.getJcdId());
      if (jcd == null)
        throw new RuntimeException("未找到相应检查单！"); 
      if (jcd.getBiaoshi().intValue() != 50 && 
        jcd.getBiaoshi().intValue() != 53)
        return; 
    } else {
      jcd = new Jcd();
      jcd.setJfbs(false);
      jcd.setBiaoshi(Integer.valueOf(50));
      jcd.setHuanzheId(huanzheId);
      jcd.setBiaoti(jcxm.getXmmc());
      jcd.setJiuzhenId(jiuzhenId);
      jcd.setJcxmIds(jcxm.getId().toString());
      jcd.setKdksId(yg.getBumenId());
      jcd.setKdTime(new Date());
      jcd.setKdys(yg.getGonghao());
      jcd.setInsertUser(yg.getGonghao());
      jcd.setInsertDate(new Date());
    } 
    jcd.setJcyq(order.getNote());
    if (StringUtils.hasLength(of.getPart()))
      jcd.setYanbie(Integer.valueOf(Integer.parseInt(of.getPart().trim()))); 
    if (StringUtils.hasLength(of.getOther())) {
      String[] paths = of.getOther().split(",");
      if (paths.length == 2) {
        if (!paths[0].isEmpty())
          jcd.setRightPic(paths[0]); 
        if (!paths[1].isEmpty())
          jcd.setLeftPic(paths[1]); 
      } 
    } 
    if (order.getJcdId() != null) {
      this.jcdService.updateJcd(jcd);
    } else {
      Long id = (Long)this.jcdService.saveJcd(jcd);
      order.setJcdId(id);
    } 
  }


  private String[] transfer(EMROrder order, List<EMROrderDetail> eod, HuanZheXinXi hzxx, Jiuzhen jz, Jcxm jcxm, YuanGong yg) {
    List<PriceItem> list_eye;
    BanGongShi bgs_eye;
    ExamItem ei_special;
    List<PriceItem> list_treat;
    BanGongShi bgs_treat;
    ExamItem ei_treat;
    List<PriceItem> list_qg_operation;
    BanGongShi bgs_qg;
    ExamItem ei_qg_operation;
    List<PriceItem> list_operation;
    BanGongShi bgs_oper;
    ExamItem ei_operation;
    TestItem ti;
    BanGongShi bgs;
    Sample sample;
    ExamItem ei;
    EMRLisSample els;
    List<PriceItem> list;
    boolean jifei;
    int j;
    long time = System.currentTimeMillis();
    Date date = jz.getCaozuoTime();
    if (!jz.getHaoma().startsWith("OIMS")) {
      date = this.hisWebService.findLastTimeByBlhAndHaoma(hzxx.getBinglihao(), jz.getHaoma());
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      try {
        date = sdf.parse(sdf.format(date));
      } catch (ParseException e1) {
        e1.printStackTrace();
      } 
    } 
    String billNo = "";
    String orderNo = "";
    String note = null;
    PatientVistInfomation pvi = new PatientVistInfomation();
    Patient p = new Patient();
    p.setPatientId(hzxx.getBinglihao());
    p.setName(hzxx.getXingming());
    p.setSex(hzxx.isXingbie() ? "男" : "女");
    p.setBirthday(hzxx.getShengri());
    pvi.setPatient(p);
    pvi.setPatientSource(jz.getZhenbie().intValue());
    pvi.setMailingAddress(hzxx.getJtdz());
    pvi.setReqDateTime(new Date());
    BuMen bumen = this.bumenDao.findBuMenById(Integer.valueOf(jz.getJzks()));
    pvi.setReqDept(bumen.getBmbm());
    pvi.setReqPhysician(yg.getXingming());
    pvi.setVisitDate(date);
    pvi.setVisitNo(jz.getHaoma());
    pvi.setChargeTypeChineseName(hzxx.getCharge_type());
    pvi.setUrgent(order.getUrgent());
    if (order.getPreExam() != null && order.getPreExam().intValue() == 1) {
      pvi.setPreExam(Integer.valueOf(1));
    } else {
      pvi.setPreExam(Integer.valueOf(0));
    } 
    Jzjl jl = this.doctorsWorkstationDao.getJzjlByVisitIdAndCategoryId(jz.getId().toString(), (
        new Integer(30100)).toString());
    String pattern = "(<\\s*([a-z]|[A-Z]|_|\\d|=|\"|'|\\s*)+>)|<\\s*/\\s*([a-z]|[A-Z]|=|\"|'|\\s*)+>";
    String v = null;
    if (jl != null && jl.getJilu() != null) {
      v = jl.getJilu().toString().replaceAll(pattern, "");
      v = v.replaceAll("&nbsp;", "");
    } 
    pvi.setClinSYMP(v);
    List<Map<String, Object>> jzzd = this.jiuzhenDao.getZhenDuanList(jz.getId().toString());
    String clinDiag = "";
    for (int i = 0; i < jzzd.size(); i++) {
      clinDiag = String.valueOf(clinDiag) + ((((Map)jzzd.get(i)).get("eye") == null) ? "" : (
        (String.valueOf(((Map)jzzd.get(i)).get("eye").toString()) + ((Map)jzzd.get(i)).get("zdflname") == null) ? "" : (
        (Map)jzzd.get(i)).get("zdflname").toString()));
      if (i != jzzd.size() - 1)
        clinDiag = String.valueOf(clinDiag) + ","; 
    } 
    pvi.setClinDiag(clinDiag);
    ResponseObj obj = null;
    switch (order.getCategoryId().intValue()) {
      case 13:
        if (eod == null || eod.size() == 0) {
          orderNo = null;
          break;
        } 
        list_eye = new ArrayList<>();
        bgs_eye = this.banGongShiDao.findBanGongShiById(order.getExcutiveDept());
        pvi.setDeptCode((bgs_eye.getBgsBm() == null) ? "230320" : bgs_eye.getBgsBm());
        for (EMROrderDetail e : eod) {
          PriceItem pi = new PriceItem();
          pi.setAmount(Float.valueOf(e.getSuliang().floatValue() * order.getShuliang().floatValue()));
          pi.setItemPrice(e.getPrice());
          EMRJcxmFushu ejf = this.iemrOrderDao.getEMRJcxmFushu(e.getFushuJcxmId());
          pi.setItemCode(ejf.getPricecode());
          pi.setItemName(ejf.getXmmc());
          pi.setConcessionalPrice(e.getPrice());
          list_eye.add(pi);
        } 
        ei_special = new ExamItem();
        ei_special.setName(order.getItemName());
        ei_special.setItemCode(order.getItemCode());
        ei_special.setPriceList(list_eye);
        if (order.getOrderNo() != null)
          deleteHisUpdate(order); 
        obj = this.hisWebService.addNEWOutp(ei_special, pvi, Integer.valueOf(13));
        break;
      case 5:
        list_treat = new ArrayList<>();
        bgs_treat = this.banGongShiDao.findBanGongShiById(order.getExcutiveDept());
        pvi.setDeptCode((bgs_treat.getBgsBm() == null) ? "230320" : bgs_treat.getBgsBm());
        for (EMROrderDetail e : eod) {
          PriceItem pi = new PriceItem();
          pi.setAmount(Float.valueOf(e.getSuliang().floatValue() * order.getShuliang().floatValue()));
          pi.setItemPrice(e.getPrice());
          EMRJcxmFushu ejf = this.iemrOrderDao.getEMRJcxmFushu(e.getFushuJcxmId());
          pi.setItemCode(ejf.getPricecode());
          pi.setItemName(ejf.getXmmc());
          pi.setConcessionalPrice(e.getPrice());
          list_treat.add(pi);
        } 
        ei_treat = new ExamItem();
        ei_treat.setName(order.getItemName());
        ei_treat.setItemCode(order.getItemCode());
        ei_treat.setPriceList(list_treat);
        if (order.getOrderNo() != null)
          deleteHisUpdate(order); 
        obj = this.hisWebService.addNEWOutp(ei_treat, pvi, Integer.valueOf(5));
        break;
      case 7:
        list_qg_operation = new ArrayList<>();
        bgs_qg = this.banGongShiDao.findBanGongShiById(order.getExcutiveDept());
        pvi.setDeptCode((bgs_qg.getBgsBm() == null) ? "230320" : bgs_qg.getBgsBm());
        for (EMROrderDetail e : eod) {
          PriceItem pi = new PriceItem();
          pi.setAmount(Float.valueOf(e.getSuliang().floatValue() * order.getShuliang().floatValue()));
          if (jcxm.getId().intValue() == 1000405) {
            pi.setItemPrice(e.getPrice());
            pi.setConcessionalPrice(e.getPrice());
          } else {
            pi.setItemPrice(order.getPrice());
            pi.setConcessionalPrice(order.getPrice());
          } 
          EMRJcxmFushu ejf = this.iemrOrderDao.getEMRJcxmFushu(e.getFushuJcxmId());
          pi.setItemCode(ejf.getPricecode());
          pi.setItemName(ejf.getXmmc());
          list_qg_operation.add(pi);
        } 
        ei_qg_operation = new ExamItem();
        ei_qg_operation.setName(order.getItemName());
        ei_qg_operation.setItemCode(order.getItemCode());
        ei_qg_operation.setPriceList(list_qg_operation);
        if (order.getOrderNo() != null)
          deleteHisUpdate(order); 
        obj = this.hisWebService.addNEWOutp(ei_qg_operation, pvi, Integer.valueOf(7));
        break;
      case 11:
        list_operation = new ArrayList<>();
        bgs_oper = this.banGongShiDao.findBanGongShiById(order.getExcutiveDept());
        pvi.setDeptCode((bgs_oper.getBgsBm() == null) ? "230320" : bgs_oper.getBgsBm());
        for (EMROrderDetail e : eod) {
          PriceItem pi = new PriceItem();
          pi.setAmount(Float.valueOf(e.getSuliang().floatValue() * order.getShuliang().floatValue()));
          pi.setItemPrice(e.getPrice());
          EMRJcxmFushu ejf = this.iemrOrderDao.getEMRJcxmFushu(e.getFushuJcxmId());
          pi.setItemCode(ejf.getPricecode());
          pi.setItemName(ejf.getXmmc());
          pi.setConcessionalPrice(e.getPrice());
          list_operation.add(pi);
        } 
        ei_operation = new ExamItem();
        ei_operation.setName(order.getItemName());
        ei_operation.setItemCode(order.getItemCode());
        ei_operation.setPriceList(list_operation);
        if (order.getOrderNo() != null)
          deleteHisUpdate(order); 
        obj = this.hisWebService.addNEWOutp(ei_operation, pvi, Integer.valueOf(11));
        break;
      case 15:
        if (pvi.getClinDiag().length() >= 50)
          pvi.setClinDiag(pvi.getClinDiag().substring(0, 50)); 
        if (order.isHaveDetails()) {
          boolean bool = true;
          for (int k = 0; k < eod.size(); k++) {
            TestItem testItem = new TestItem();
            EMRJcxmFushu ejfs = this.jcxmDao.findEMRJcxmFushuLis(((EMROrderDetail)eod.get(k)).getFushuJcxmId());
            testItem.setItemCode(ejfs.getBianma());
            Sample sample1 = new Sample();
            EMRLisSample eMRLisSample = this.jcxmDao.getEMRLisSample(order.getPart());
            sample1.setChineseName(eMRLisSample.getSampleName());
            sample1.setId(eMRLisSample.getSampleCode());
            if (order.getOrderNo() != null)
              deleteHisUpdate(order); 
            ResponseObj ro = this.lisWebService.addTestItem(testItem, pvi, null, null, sample1);
            if (ro.getPaymentFlag() != 1)
              bool = false; 
            if (ro.getResponseNo() != null) {
              orderNo = String.valueOf(orderNo) + ro.getResponseNo();
              if (k != eod.size() - 1)
                orderNo = String.valueOf(orderNo) + ","; 
            } 
          } 
          if (bool)
            order.setJifeiFlag(Integer.valueOf(1)); 
          break;
        } 
        ti = new TestItem();
        ti.setItemCode(jcxm.getBianma().substring(3));
        sample = new Sample();
        els = this.jcxmDao.getEMRLisSample(order.getPart());
        sample.setChineseName(els.getSampleName());
        sample.setId(els.getSampleCode());
        jifei = true;
        for (j = 0; j < order.getShuliang().floatValue(); j++) {
          if (order.getOrderNo() != null)
            deleteHisUpdate(order); 
          ResponseObj ro = this.lisWebService.addTestItem(ti, pvi, null, null, sample);
          if (ro.getResponseNo() != null) {
            orderNo = String.valueOf(orderNo) + ro.getResponseNo();
            if (j != order.getShuliang().floatValue() - 1.0F)
              orderNo = String.valueOf(orderNo) + ","; 
          } 
          if (ro.getPaymentFlag() != 1)
            jifei = false; 
        } 
        if (jifei)
          order.setJifeiFlag(Integer.valueOf(1)); 
        break;
      case 14:
        bgs = this.banGongShiDao.findBanGongShiById(order.getExcutiveDept());
        pvi.setReqDept("230320");
        pvi.setDeptCode(bgs.getBgsBm());
        ei = new ExamItem();
        ei.setName(order.getItemName());
        ei.setItemCode(order.getItemCode().substring(4));
        ei.setInfo(order.getNote());
        list = new ArrayList<>();
        for (EMROrderDetail e : eod) {
          PriceItem pi = new PriceItem();
          pi.setAmount(Float.valueOf(e.getSuliang().floatValue() * order.getShuliang().floatValue()));
          pi.setItemPrice(e.getPrice());
          EMRJcxmFushu ejf = this.iemrOrderDao.getEMRJcxmFushu(e.getFushuJcxmId());
          pi.setItemCode(ejf.getPricecode());
          pi.setItemName(ejf.getXmmc());
          pi.setConcessionalPrice(e.getPrice());
          list.add(pi);
        } 
        ei.setPriceList(list);
        if (order.getOrderNo() != null)
          deleteHisUpdate(order); 
        obj = this.hisWebService.addNEWOutp(ei, pvi, Integer.valueOf(14));
        note = obj.getMessage();
        break;
    } 
    if (obj != null) {
      orderNo = obj.getResponseNo();
      order.setJifeiFlag(Integer.valueOf(obj.getPaymentFlag()));
    } else {
      LOG.error("HIS返回的开单结果为空");
    }
    LOG.info("向HIS传送开单信息本次花费了{}秒[patientId:{}, itemCode:{}, itemName:{}]", 
        new Object[] { Long.valueOf((System.currentTimeMillis() - time) / 1000L), pvi.getPatient().getPatientId(), 
          order.getItemCode(), order.getItemName() });
    return new String[] { orderNo, billNo, note };
  }
  
  private void delteOrderDetails(List<EMROrderDetail> oldDl, Integer categoryId) {
    this.orderDao.deleteOrderDetail(oldDl);
    switch (categoryId.intValue()) {
    
    } 
  }
  
  private boolean synchOrderDetail(List<EMROrderDetail> dl, List<EMROrderDetail> oldDl, Jcxm jcxm, Long jiuzhenId) {
    Iterator<EMROrderDetail> itr = dl.iterator();
    boolean re = false;
    while (itr.hasNext()) {
      EMROrderDetail d = itr.next();
      boolean x = false;
      for (EMROrderDetail o : oldDl) {
        if (d.getFushuJcxmId().intValue() == o.getFushuJcxmId().intValue()) {
          if (d.getSuliang().intValue() != o.getSuliang().intValue()) {
            o.setSuliang(d.getSuliang());
            this.orderDao.updateOrderDetail(o);
            re = true;
          } 
          x = true;
          oldDl.remove(o);
          break;
        } 
      } 
      if (!x) {
        this.orderDao.saveOrderDetail(d);
        re = true;
      } 
    } 
    return re;
  }
  
  private List<EMROrderDetail> getOrderDetails(Long orderId, String details) {
    String[] ds = details.split(",");
    List<EMROrderDetail> dl = new ArrayList<>();
    byte b;
    int i;
    String[] arrayOfString1;
    for (i = (arrayOfString1 = ds).length, b = 0; b < i; ) {
      String d = arrayOfString1[b];
      String[] x = d.split("=");
      Integer id = Integer.valueOf(Integer.parseInt(x[0]));
      Float count = Float.valueOf(Float.parseFloat(x[1]));
      EMRJcxmFushu fushu = this.orderDao.getEMRJcxmFushu(id);
      Integer categoryId = this.orderDao.getEMROrder(orderId).getCategoryId();
      if (categoryId.intValue() != 13 && 
        categoryId.intValue() != 5 && 
        categoryId.intValue() != 8 && 
        categoryId.intValue() != 9 && 
        categoryId.intValue() != 11 &&
        categoryId.intValue() != 7)
        if (!count.equals(fushu.getDefaultNum()) && !fushu.isDefaultNumChangeEnable())
          throw new RuntimeException("附属项目数量被设置为不允许改变！");
      Float m = fushu.getPrice();
      m = Float.valueOf((m == null) ? 0.0F : (m.floatValue() * count.floatValue()));
      this.order_money = Float.valueOf(this.order_money.floatValue() + m.floatValue());
      EMROrderDetail od = new EMROrderDetail();
      od.setFushuJcxmId(id);
      od.setItemName(fushu.getXmmc());
      od.setOrderId(orderId);
      od.setPrice(fushu.getPrice());
      od.setSuliang(count);
      dl.add(od);
      b++;
    } 
    return dl;
  }

  /**
   * 医生工作站-【处置】加载时根据类型查询已开出的处置单
   * @param jiuzhenId 就诊id
   * @param categoryId 检验检查或手术等类型id
   * @param jifeiFlag 计费标识
   * @return
   */
  public List<Map<String, Object>> findOrders(Long jiuzhenId, Integer categoryId, Integer jifeiFlag) {
    List<Map<String, Object>> ml = new ArrayList<>();
    List<EMROrder> list = this.orderDao.findOrders(jiuzhenId, categoryId, jifeiFlag);
    Iterator<EMROrder> itr = list.iterator();
    while (itr.hasNext()) {
      EMROrder order = itr.next();
      Jcxm jcxm = this.jcxmDao.findJcxmById(order.getJcxmId());
      Map<String, Object> map = new HashMap<>();
      map.put("order", order);
      map.put("jcxm", jcxm);
      ml.add(map);
    } 
    list.clear();
    list = null;
    return ml;
  }
  
  @Transactional
  public void deleteOrders(String id) {
    String[] str = id.split(",");
    byte b;
    int i;
    String[] arrayOfString1;
    for (i = (arrayOfString1 = str).length, b = 0; b < i; ) {
      String s = arrayOfString1[b];
      Long long_ = Long.valueOf(Long.parseLong(s));
      EMROrder order = this.orderDao.getEMROrder(long_);
      if (StringUtils.hasLength(order.getOrderNo()) && this.hisWebService.getSpecialHospitalTreatFlag(order.getOrderNo()).booleanValue()) {
        order.setJifeiFlag(IEMROrderService.ORDER_JIFEI_FLAG_YJF);
        this.orderDao.updateOrder(order);
      } else {
        List<EMROrderDetail> oldDl = this.orderDao.findOrderDetails(long_);
        this.orderDao.deleteOrderDetail(oldDl);
        this.orderDao.deleteOrder(order);
      } 
      b++;
    } 
  }
  
  private void deleteOrders(List<EMROrder> list) {
    Iterator<EMROrder> itr = list.iterator();
    while (itr.hasNext()) {
      EMROrder order = itr.next();
      List<EMROrderDetail> oldDl = this.orderDao.findOrderDetails(order.getId());
      this.orderDao.deleteOrderDetail(oldDl);
      this.orderDao.deleteOrder(order);
      if (order.getJcdId() != null) {
        Jcd jcd = this.jcdService.getJcdById(order.getJcdId());
        if ((jcd.getBiaoshi().intValue() == 50 || 
          jcd.getBiaoshi().intValue() == 53) && !jcd.isJfbs()) {
          this.jcdService.deleteJcd(jcd);
          continue;
        } 
        throw new RuntimeException("当前申请单已被处理：" + jcd.getBiaoti());
      } 
    } 
  }
  
  public List<EMROrderDetail> findOrderDetails(Long id) {
    return this.orderDao.findOrderDetails(id);
  }
  
  public void deleteAllOrderByCategory(Integer categoryId, Long jiuzhenId, Long huanzheId, String gonghao) {
    List<EMROrder> oldList = this.orderDao.findOrders(jiuzhenId, categoryId, ORDER_JIFEI_FLAG_WJF);
    if (oldList != null && oldList.size() > 0) {
      deleteOrders(oldList);
      for (EMROrder eo : oldList)
        deleteHisUpdate(eo); 
    } 
  }
  
  public void saveOrUpdateSpecialTreat(Long jiuzhenId, Integer st) {
    Jiuzhen jz = this.jiuzhenDao.findJiuzhenById(jiuzhenId);
    jz.setTreatMethod(st);
    this.jiuzhenDao.updateJiuzhen(jz);
  }
  
  public String getExamAppointsNo(Integer jcxmId, Long jiuzhenId) {
    String order_no = this.orderDao.getEMROrder(jcxmId, jiuzhenId);
    if (order_no != null) {
      Jiuzhen jz = this.jiuzhenDao.findJiuzhenById(jiuzhenId);
      if (!jz.getHaoma().startsWith("OIMS")) {
        String[] outporders = order_no.split(",");
        String[] appoint = this.examWebService.findExamNo(outporders[0]);
        return appoint[0];
      } 
      String[] s = order_no.split("@");
      return s[0];
    } 
    return null;
  }
  
  public Map<String, Object> getZYSX(Integer jcxmId, Long jiuzhenId, Integer dept, Integer listType) {
    Map<String, Object> map = new HashMap<>();
    Date date = null;
    String address = null;
    EMROrder eo = this.orderDao.findEMROrderByJcxmidAndJiuzhenid(jiuzhenId, jcxmId);
    if (StringUtils.hasLength(eo.getCallbackMessage())) {
      LOG.info("order infomation[id:{}, call back message:{}]", eo.getId(), eo.getCallbackMessage());
      String[] temp = eo.getCallbackMessage().split("\\$");
      address = this.middleControlFskDao.findMiddleControlFskAddress(temp[0]);
      map.put("address", address);
      if (temp.length > 1) {
        try {
          date = (new SimpleDateFormat("yyyy-MM-dd")).parse(temp[1].substring(0, 11));
        } catch (ParseException e) {
          LOG.error("visit date parse exception:[order id:{}, callback message:{}, msg:{}]", 
              new Object[] { eo.getId(), eo.getCallbackMessage(), e.getMessage() });
        } 
        map.put("scheduledDate", date);
      } 
    } 
    return map;
  }
  
  public ExamResult getExamReport(String examNo) {
    List<ExamResult> ers = this.examWebService.findExamItemResult(examNo);
    return (ers != null && ers.size() > 0) ? ers.get(0) : null;
  }
  
  public List<TestResult> getLisReport(String orderNo) {
    String lisNos = orderNo;
    List<TestResult> trs = this.lisWebService.findTestItemResult(lisNos);
    return trs;
  }
  
  public String getExamNo(String orderNo) {
    String[] examNos = orderNo.split(",");
    String[] args = this.examWebService.findExamNo(examNos[0]);
    return args[0];
  }
  
  public void updateTreatResult(Long jiuzhenId, String result) {
    Jiuzhen jz = this.jiuzhenDao.findJiuzhenById(jiuzhenId);
    jz.setTreatResult(result);
    this.jiuzhenDao.updateJiuzhen(jz);
  }
  
  public EMROrder findEMROrderByJcxmidAndJiuzhenid(Long jiuzhenId, Integer jcxmId) {
    return this.orderDao.findEMROrderByJcxmidAndJiuzhenid(jiuzhenId, jcxmId);
  }
  
  public int setOrderPrintQuantity(Long jiuzhenId, EMROrderForm form) {
    EMROrder order;
    Long id = form.getId();
    if (id == null) {
      order = this.orderDao.findEMROrderByJcxmidAndJiuzhenid(jiuzhenId, form.getJcxmId());
    } else {
      order = this.orderDao.getEMROrder(id);
    } 
    Integer q = order.getPrintQuantity();
    if (q == null)
      q = Integer.valueOf(0); 
    if (q.intValue() == 0)
      order.setPrintDate(new Date()); 
    order.setPrintLastDate(new Date());
    q = Integer.valueOf(q.intValue() + 1);
    order.setPrintQuantity(q);
    return q.intValue();
  }
  
  public void deleteEMROrders(Long jiuzhenId, Integer jcxmId) {
    EMROrder eo = findEMROrderByJcxmidAndJiuzhenid(jiuzhenId, jcxmId);
    if (eo != null) {
      List<EMROrder> list = new ArrayList<>();
      list.add(eo);
      deleteOrders(list);
      deleteHisUpdate(eo);
    } 
  }

  /**
   * @description:根据id查询EMROrder数据
   * @param id
   * @return:
   * @author: Mason
   * @time: 2020/5/9 17:36
   */
  @Override
  public EMROrder getEMROrder(Long id) {
    return this.orderDao.getEMROrder(id);
  }

  /**
   * @description:根据EMROrder查询该检查单在HIS/LIS上的缴费状态
   * @param order
   * @return:
   * @author: Mason
   * @time: 2020/5/9 18:09
   */
  @Override
  @Transactional
  public boolean checkOrderHisJiFeiStatus(EMROrder order) {
    //1、缴费标识，默认false
    boolean flag = false;
    //2、保存开单信息时从HIS返回的单号
    String orderNo = order.getOrderNo();
    //3、开单的类型：眼科检查/其他检查/化验...等
    Integer categoryId = order.getCategoryId();
    //4、化验查询LIS的查询方法
    if (categoryId == OimsCategoryConfig.JCXM_CATEGORY_LAB_TEST){
      flag = this.hisWebService.getLisFlag(orderNo);
    }else if (categoryId == OimsCategoryConfig.JCXM_CATEGORY_EYE
            || categoryId == OimsCategoryConfig.JCXM_CATEGORY_OTHER
            || categoryId == OimsCategoryConfig.JCXM_CATEGORY_TREAT){
      //5、如果时眼科检查、其他检查、治疗，则调用HIS的查询放啊
      flag = this.hisWebService.getSpecialHospitalTreatFlag(orderNo);
    }
    return flag;
  }
}
