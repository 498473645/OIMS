package cn.com.oims.web.controller;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.JiuZhenSearchform;
import cn.com.oims.webservice.HisWebService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"jiuzhen"})
public class JiuZhenController extends BaseController {
  private IJiuzhenService jiuzhenService;
  
  @Autowired
  private HisWebService hisWebService;
  
  @Autowired
  private IHuanZheXinXiService huanZheXinXiService;
  
  @Autowired
  private IJiuzhenDao jiuzhenDao;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  public void setJiuzhenService(IJiuzhenService jiuzhenService) {
    this.jiuzhenService = jiuzhenService;
  }
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @RequestMapping(value = {"/getJiuZhenHuanZheList.htm"}, method = {RequestMethod.POST})
  public void getJiuZhenHuanZheList(JiuZhenSearchform jzsf, Page page, HttpServletRequest request, HttpServletResponse response) {
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    String factor = request.getParameter("state");
    page.setFactor(factor);
    List list = this.jiuzhenService.getJiuZhenHuanZheList(page, jzsf);
    Map<Object, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"findJzcsByHuanzheId.htm"}, method = {RequestMethod.POST})
  public void findJzcsByHuanzheId(Long id, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("查询就诊次数", req);
    try {
      mrSuccess(mr, this.jiuzhenService.findJzcsByHuanzheId(id, Integer.valueOf(29)));
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeLog(mr, level_saveOrUpdate);
    writeObjectJson(mr, res);
  }
  
  @RequestMapping(value = {"/getJiuZhenByBlh.htm"}, method = {RequestMethod.POST})
  public void getJiuZhenByBlh(String binglihao, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("读取就诊患者信息");
    JiuZhenSearchform jzSf = null;
    try {
      jzSf = this.jiuzhenService.getJiuZhenByBlh(binglihao);
      if (jzSf != null) {
        re.setObj(jzSf);
        re.setState(1);
      } else {
        re.setMessage("未取到就诊患者信息！");
      } 
    } catch (Exception e) {
      re.setMessage("未取到就诊患者信息！");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }
  
  @RequestMapping(value = {"/findNextPatient.htm"}, method = {RequestMethod.POST})
  public void findNextPatient(HttpServletRequest request, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("读取下一个患者！");
    try {
      HttpSession session = request.getSession();
      Jiuzhen jiuzhen = this.jiuzhenService.findNextPatient(session.getAttribute("gonghao").toString());
      if (jiuzhen != null) {
        re.setObj(jiuzhen);
        re.setState(1);
      } else {
        re.setMessage("暂无待诊患者信息！");
      } 
    } catch (Exception e) {
      re.setMessage("未取到就诊患者信息！");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }
  
  @RequestMapping(value = {"/setPatientState.htm"}, method = {RequestMethod.POST})
  public void setPatientState(Integer state, Long jiuzhenId, HttpServletRequest request, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("设置患者就诊状态！");
    try {
      HttpSession session = request.getSession();
      if (this.jiuzhenService.setPatientState(jiuzhenId, state)) {
        re.setState(1);
      } else {
        re.setMessage("暂无待诊患者信息！");
      } 
    } catch (Exception e) {
      re.setMessage("未取到就诊患者信息！");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }

  /**
   * 患者接诊（接诊、转诊）
   * @param jiuzhen
   * @param request
   * @param response
   */
  @RequestMapping(value = {"/saveOrUpdateJiuzhen.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateJiuzhen(Jiuzhen jiuzhen, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Boolean b = Boolean.valueOf(false);
    Boolean c = Boolean.valueOf(false);
    //1、获取当前操作人的工号
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    String fznc = request.getParameter("fznc");
    this.doing = "保存就诊信息";
    Jiuzhen jiuzhenSelect = null;
    Jiuzhen beforeJiuzhen = null;
    try {
      HuanZheXinXi hzxx;
      //2、获取前台传过来的就诊对象，根据就诊对象中的患者id、分诊医生、当前日期查询就诊记录
      if (jiuzhen.getHuanzheId() != null){
        jiuzhenSelect = this.jiuzhenService.findAlljzjlByIDAndTimeAndGonghao(jiuzhen.getHuanzheId(), new Date(),
                jiuzhen.getFzys());
      }
      //3、根据前台传过来的就诊对象的id查询就诊信息，这个操作会覆盖之前的根据患者id查询出来的就诊信息
      if (jiuzhen.getId() != null){
        jiuzhenSelect = this.jiuzhenService.getJiuzhenById(jiuzhen.getId());
        beforeJiuzhen = jiuzhenSelect;
      }
      //4、如果就诊对象不为空，表示今天内有其他的眼科医生接诊过了该患者
      if (jiuzhenSelect != null) {
        //4.1、根据就诊信息中的患者id查询患者详情
        hzxx = this.huanZheXinXiService.findHuanZheById(jiuzhenSelect.getHuanzheId());
        //4.2、获取患者年龄
        int age = Utils.getAge(hzxx.getShengri()).intValue();
        //4.3、获取当前日期，不含时间
        Date l_time = sdf.parse(sdf.format(new Date()));
        //4.4、获取最近一次接诊的日期，不含时间
        Date js_time = sdf.parse(sdf.format(jiuzhenSelect.getCaozuoTime()));
        //4.5、判断：当前日期等于最近一次接诊的日期，并且 （ 就诊状态为27（未接诊）或者就诊状态为30已过号 ）
        //这种情况，不产生新的就诊记录，只更新了分诊医生数据
        if (js_time.equals(l_time) && (jiuzhenSelect.getState().intValue() == 27 || 
          jiuzhenSelect.getState().intValue() == 30)) {
          jiuzhenSelect.setFzys(gonghao);
        } else if (!js_time.equals(l_time) &&  (jiuzhenSelect.getState().intValue() == 28
                || jiuzhenSelect.getState().intValue() == 29
                || jiuzhenSelect.getState().intValue() == 94)){
          //复查的患者再次接诊不产生新的就诊记录即新病历
          jiuzhenSelect.setFzys(gonghao);
        } else {
          //4.6 其他情况。新建就诊对象
          jiuzhenSelect = new Jiuzhen();
          jiuzhenSelect.setAge(Integer.valueOf(age));
          jiuzhenSelect.setHuanzheId(hzxx.getId());
          jiuzhenSelect.setCaozuoren(gonghao);
          jiuzhenSelect.setCaozuoTime(new Date());
          jiuzhenSelect.setFzys(gonghao);
          jiuzhenSelect.setState(Integer.valueOf(27));
          jiuzhenSelect.setZhenbie(Integer.valueOf(2));
          jiuzhenSelect.setBeizhu(beforeJiuzhen.getBeizhu());
          c = Boolean.valueOf(true);
          b = Boolean.valueOf(true);
          //挂号的号码、排队序号、就诊科室可以沿用当天内之前医生接诊的就诊信息
          if (null != beforeJiuzhen){
            jiuzhenSelect.setHaoma(beforeJiuzhen.getHaoma());
            jiuzhenSelect.setSerialNo(beforeJiuzhen.getSerialNo());
            jiuzhenSelect.setJzks(beforeJiuzhen.getJzks());
            jiuzhenSelect.setBeizhu(beforeJiuzhen.getBeizhu());
          }
        } 
      } else {//5、如果就诊对象为空，表示该患者本次挂号还没有被眼科医生接诊，新建就诊对象
        jiuzhenSelect = new Jiuzhen();
        jiuzhenSelect.setHuanzheId(jiuzhen.getHuanzheId());
        jiuzhenSelect.setCaozuoren(gonghao);
        jiuzhenSelect.setCaozuoTime(new Date());
        jiuzhenSelect.setFzys(gonghao);
        jiuzhenSelect.setState(Integer.valueOf(27));
        jiuzhenSelect.setZhenbie(Integer.valueOf(2));
        hzxx = this.huanZheXinXiService.findHuanZheById(jiuzhen.getHuanzheId());
        int age = Utils.getAge(hzxx.getShengri()).intValue();
        jiuzhenSelect.setAge(Integer.valueOf(age));
        c = Boolean.valueOf(true);
      }

      //setSerialNo用之前的，差号码，就诊科室
//      if (GlobalConfig.MODEL_HIS_SYNC){
//        //6、获取挂号信息，因此无论该患者是否被接诊，对于转诊的病人，都会重新挂号
//        String[] reginfos = this.hisWebService.virtualRegistration(hzxx.getBinglihao());
//        if (reginfos == null)
//          throw new RuntimeException("患者未挂号，请先挂号！");
//        //7、设置挂号号码到就诊信息
//        jiuzhenSelect.setHaoma(reginfos[0]);
//        jiuzhenSelect.setSerialNo((reginfos[1] == null) ? null : Integer.valueOf(Integer.parseInt(reginfos[1])));
//      }

      //8、设置分诊医生到就诊信息
      if (jiuzhen.getFzys() != null) {
        jiuzhenSelect.setFzys(jiuzhen.getFzys());
      } else {
        jiuzhenSelect.setFzys(gonghao);
      }
      //9、查询就诊对象中分诊医生的员工信息
      YuanGong yuangong = this.yuanGongService.obtainYuanGongByGonghao(jiuzhenSelect.getFzys());
      //10、设置科室编码到就诊对象的就诊科室列中
      jiuzhenSelect.setJzks(yuangong.getBumenId().intValue());
      //11、判断：当前日期等于最近一次接诊的日期，并且 （ 就诊状态为27（未接诊）或者就诊状态为30已过号 ）
      //        //这种情况，不产数新的就诊记录，只更新就诊记录
      if (!c.booleanValue()) {
        Serializable jiuzhenId = this.jiuzhenService.saveOrUpdateJiuzhen(jiuzhenSelect);
        jiuzhenSelect.setId((Long)jiuzhenId);
      } else {//12、新增就诊记录
        Jiuzhen jz = null;
        //13、根据挂号号码查找就诊记录
        if (!b.booleanValue() && jiuzhenSelect.getHaoma() != null && !jiuzhenSelect.getHaoma().isEmpty())
          jz = this.jiuzhenDao.findJiuzhenByHaoma(jiuzhenSelect.getHaoma()); 
        if (jz == null) {
          jz = new Jiuzhen();
          BeanUtils.copyProperties(jiuzhenSelect, jz);
          jz.setCaozuoTime(new Date());
        } 
        jz.setCaozuoren(yuangong.getXingming());
        jz.setFzys(yuangong.getGonghao());
        Long jiuzhenId = (Long)this.jiuzhenService.saveOrUpdateJiuzhen(jz);
        if (b.booleanValue() && jiuzhen.getId() != null)
          this.jiuzhenService.copyObjectJiuzhenInfo(jiuzhenId, jiuzhen.getId()); 
        jiuzhenSelect = jz;
      } 
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(jiuzhenSelect);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/toDayJiuZhen.htm"}, method = {RequestMethod.POST})
  public void toDayJiuZhen(Long huanzheId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Jiuzhen jiuzhen = null;
    this.doing = "根据患者ID查询当天的就诊记录";
    try {
      jiuzhen = this.jiuzhenService.findAlljzjlByIDAndTimeAndGonghao(huanzheId, new Date(), null);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(jiuzhen);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/toDayJiuZhenByHzid.htm"}, method = {RequestMethod.POST})
  public void toDayJiuZhenByHzid(Long huanzheId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<Jiuzhen> list = null;
    this.doing = "根据患者ID查询当天的就诊记录";
    try {
      list = this.jiuzhenService.findJiuzhenByHzidAndTimeGonghao(huanzheId, new Date(), null);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(list);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJzByDoctorToday.htm"}, method = {RequestMethod.POST})
  public void findJzByDoctorToday(HttpServletRequest request, HttpServletResponse response, Long huanzheId) {
    MyResult mr = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    Integer b = null;
    try {
      b = this.jiuzhenService.findJzByDoctorToday(gonghao, huanzheId);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    mr.setObj(b);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
}
