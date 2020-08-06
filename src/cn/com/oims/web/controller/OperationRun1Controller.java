package cn.com.oims.web.controller;

import cn.com.oims.dao.IBuMenDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IOperationDao;
import cn.com.oims.dao.IOperationDictDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Operation;
import cn.com.oims.dao.pojo.OperationDetail;
import cn.com.oims.dao.pojo.OperationDict;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.web.form.OperationSearchForm;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.pojo.his.Operaton;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"run1"})
public class OperationRun1Controller {
  @Autowired
  private IOperationDao dao;
  
  @Autowired
  private IYuanGongDao ygDao;
  
  @Autowired
  private IOperationDictDao dictDao;
  
  @Autowired
  private IHuanZheXinXiDao hzDao;
  
  @Autowired
  private HisWebService hisWebService;
  
  @Autowired
  private IBuMenDao bumenDao;
  
  @RequestMapping(value = {"updateOperationList.htm"}, method = {RequestMethod.GET})
  public void findOperationList(HttpServletRequest request, HttpServletResponse response) {
    OperationSearchForm form = new OperationSearchForm();
    form.setProcess("3");
    Page page = new Page();
    page.setCurrentPage(Integer.valueOf(1));
    page.setPageSize(Integer.valueOf(100));
    while (true) {
      List<Map<String, Object>> list = this.dao.findOperationList(page, form);
      for (Map<String, Object> map : list) {
        try {
          processOperation(map);
        } catch (Exception e) {
          e.printStackTrace();
        } 
      } 
      if (page.getPageCount().intValue() > page.getCurrentPage().intValue()) {
        page.setCurrentPage(Integer.valueOf(page.getCurrentPage().intValue() + 1));
        continue;
      } 
      break;
    } 
    JSONWriterUtils.writeState(1, response);
  }
  
  private void processOperation(Map<String, Object> map) {
    Operation operation = this.dao.getOperation((Long)map.get("id"));
    Operaton o = new Operaton();
    YuanGong yg = this.ygDao.getYuanGongByGH(operation.getRecorder());
    Integer doctor_level = this.dictDao.findDoctorLevelByGonghao(operation.getDoctor());
    o.setDoctor_level((doctor_level != null) ? Integer.valueOf(doctor_level.intValue() + 1) : null);
    String recorder = yg.getXingming();
    BuMen bm = this.bumenDao.getBuMenById(yg.getBumenId());
    HuanZheXinXi hzxx = this.hzDao.getPatientById(operation.getPatientId());
    o.setPatientId(hzxx.getBinglihao());
    o.setDeptId(operation.getAreaCode());
    o.setOperationRoomDept(bm.getBmbm());
    o.setOperationRoomNo(operation.getOperationRoomId() + "");
    o.setMedical(operation.getMedical());
    o.setCondition(operation.getCondition());
    o.setOperationSize(getOperationSizeTitle(operation.getOperationSize()));
    o.setMedicalAfter(operation.getMedicalAfter());
    o.setUrgent(Integer.valueOf((operation.getUrgent() == null) ? 0 : 1));
    o.setIsolation(operation.getIsolation());
    yg = this.ygDao.getYuanGongByGH(operation.getDoctor());
    bm = this.bumenDao.getBuMenById(yg.getBumenId());
    o.setOperationDeptId(bm.getBmbm());
    o.setSurgeon(yg.getXingming());
    if (operation.getFirstAssistant() != null && !operation.getFirstAssistant().isEmpty()) {
      yg = this.ygDao.getYuanGongByGH(operation.getFirstAssistant());
      o.setFirstAssistant(yg.getXingming());
    } 
    if (operation.getSecondAssistant() != null && !operation.getSecondAssistant().isEmpty()) {
      yg = this.ygDao.getYuanGongByGH(operation.getSecondAssistant());
      o.setSecondAssistant(yg.getXingming());
    } 
    o.setAnesthesia(getAnesthesiaName(operation.getAnesthesia()));
    o.setAnesthetist(operation.getAnesthetist());
    if (operation.getCircuitNurse() != null && !operation.getCircuitNurse().isEmpty()) {
      yg = this.ygDao.getYuanGongByGH(operation.getCircuitNurse());
      o.setCircuitNurse(yg.getXingming());
    } 
    if (operation.getInstrumentNurse() != null && !operation.getInstrumentNurse().isEmpty()) {
      yg = this.ygDao.getYuanGongByGH(operation.getInstrumentNurse());
      o.setInstrumentNurse(yg.getXingming());
    } 
    o.setStartDate(operation.getOperationTime());
    o.setEndDate(operation.getOperationCompleteTime());
    o.setRecoder(recorder);
    o.setAppointmentTime(operation.getAppointmentTime());
    List<OperationDetail> odList = this.dao.findOperationDetails(operation.getId());
    StringBuffer sb = new StringBuffer();
    Integer operation_level = Integer.valueOf(0);
    StringBuffer temp = new StringBuffer("");
    for (OperationDetail odt : odList) {
      if (sb.length() > 0) {
        sb.append(",");
        temp.append(",");
      } 
      OperationDict od = this.dao.getOperationDict(odt.getOperationDictId());
      sb.append(od.getName());
      temp.append(od.getLevelFlag().intValue() + 1);
      if (od.getLevelFlag().intValue() >= operation_level.intValue())
        operation_level = Integer.valueOf(od.getLevelFlag().intValue() + 1); 
    } 
    o.setOperationSize(String.valueOf(operation_level.toString()) + "," + temp.toString());
    o.setOperationNames(sb.toString());
    if (operation.getSend() != null && operation.getSend().booleanValue()) {
      o.setId(operation.getSendMsg());
      this.hisWebService.updateOperationRecord(o);
    } else {
      String msg = this.hisWebService.saveOperationRecord(o);
      if (msg == null)
        return; 
      operation.setSend(Boolean.valueOf(true));
      operation.setSendMsg(msg);
      this.dao.saveOrUpdate(operation);
    } 
  }
  
  private String getAnesthesiaName(Integer anesthesia) {
    String n = "";
    switch (anesthesia.intValue()) {
      case 0:
        n = "无麻醉";
        break;
      case 1:
        n = "表面麻醉";
        break;
      case 2:
        n = "局部麻醉";
        break;
      case 3:
        n = "吸入全麻";
        break;
      case 4:
        n = "静脉全麻";
        break;
    } 
    return n;
  }
  
  private String getOperationSizeTitle(Integer operationSize) {
    String t = "";
    switch (operationSize.intValue()) {
      case 0:
        t = "小";
        break;
      case 1:
        t = "中";
        break;
      case 2:
        t = "大";
        break;
    } 
    return t;
  }
}
