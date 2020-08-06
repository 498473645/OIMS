package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.EMROrder;
import cn.com.oims.dao.pojo.EMROrderDetail;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.service.IEMROrderService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.impl.JcxmServiceImpl;
import cn.com.oims.web.form.EMROrderForm;
import cn.com.oims.webservice.ExamWebService;
import cn.com.oims.webservice.pojo.exam.ExamResult;
import cn.com.oims.webservice.pojo.lis.TestResult;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"emrOrder"})
public class EMROrderController {
  @Autowired
  private IEMROrderService orderService;
  
  @Autowired
  private ExamWebService examWebService;
  
  @Autowired
  private JcxmServiceImpl jcxmServiceImpl;
  
  @Autowired
  private IJiuzhenService jiuzhenService;
  
  @RequestMapping(value = {"/saveOrder.htm"}, method = {RequestMethod.POST})
  public void saveEYEOrder(Long huanzheId, Long jiuzhenId, Integer listType, HttpServletRequest request, HttpServletResponse response, Integer fenzhenkaidan) {
    MyResult result = new MyResult();
    result.setDoing("保存开单信息！");
    HttpSession session = request.getSession();
    boolean printFlag = false;
    try {
      String print = request.getParameter("printFlag");
      if (print != null && !print.isEmpty())
        printFlag = Boolean.parseBoolean(print); 
      String gonghao = session.getAttribute("gonghao").toString();
      String[] preExam = request.getParameterValues("preExam");
      String[] ids = request.getParameterValues("id");
      String[] jcxmIds = request.getParameterValues("jcxmId");
      String[] categoryIds = request.getParameterValues("categoryId");
      String[] excutiveDept = request.getParameterValues("excutiveDept");
      String[] count = request.getParameterValues("count");
      String[] orderDetail = request.getParameterValues("orderDetail");
      String[] part = request.getParameterValues("part");
      String[] note = request.getParameterValues("note");
      String[] other = request.getParameterValues("other");
      String[] urgent = request.getParameterValues("urgent");
      String[] money = request.getParameterValues("money");
      List<EMROrderForm> list = new ArrayList<>();
      if (jcxmIds != null && jcxmIds.length > 0) {
        for (int i = 0; i < jcxmIds.length; i++) {
          EMROrderForm order = new EMROrderForm();
          Integer id = Integer.valueOf(Integer.parseInt(jcxmIds[i]));
          order.setJcxmId(id);
          if (!excutiveDept[i].isEmpty())
            order.setExcutiveDept(Integer.valueOf(Integer.parseInt(excutiveDept[i]))); 
          order.setCount(Float.valueOf(Float.parseFloat(count[i])));
          order.setCategoryId(Integer.valueOf(Integer.parseInt(categoryIds[i])));
          order.setPart(part[i]);
          order.setNote(note[i]);
          order.setOther(other[i]);
          order.setUrgent(Boolean.valueOf(urgent[i].equals("true")));
          order.setMoney((money == null) ? null : Float.valueOf(Float.parseFloat(money[i])));
          if (!ids[i].isEmpty())
            order.setId(Long.valueOf(Long.parseLong(ids[i]))); 
          String detail = orderDetail[i];
          if (detail.isEmpty())
            detail = null; 
          order.setOrderDetails(detail);
          if (preExam != null && preExam.length > 0 && !preExam[i].isEmpty()) {
            order.setPreExam(Integer.valueOf(Integer.parseInt(preExam[i])));
          } else {
            order.setPreExam(Integer.valueOf(0));
          } 
          list.add(order);
        } 
        List<Map<String, Object>> notrasfers = this.orderService.saveOrder(list, jiuzhenId, huanzheId, gonghao, printFlag);
        if (fenzhenkaidan == null || fenzhenkaidan.intValue() == 0)
          this.jiuzhenService.setPatientState(jiuzhenId, Integer.valueOf(28)); 
        result.setState(1);
        result.setObj(notrasfers);
      } else {
        this.orderService.deleteAllOrderByCategory(listType, jiuzhenId, huanzheId, gonghao);
        result.setState(1);
      } 
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findOrder.htm"}, method = {RequestMethod.POST})
  public void findOrders(Long visitId, Integer categoryId, Integer jiaofei, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("查询开单信息！");
    try {
      List list = this.orderService.findOrders(visitId, categoryId, jiaofei);
      result.setState(1);
      result.setObj(list);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/deleteOrders.htm"}, method = {RequestMethod.POST})
  public void deleteOrder(String id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存开单信息！");
    try {
      this.orderService.deleteOrders(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/deleteEMROrders.htm"}, method = {RequestMethod.POST})
  public void deleteEMROrders(Long jiuzhenId, Integer jcxmId, HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    try {
      this.orderService.deleteEMROrders(jiuzhenId, jcxmId);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findOrderDetails.htm"}, method = {RequestMethod.POST})
  public void findOrderDetails(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存开单信息！");
    try {
      List<EMROrderDetail> list = this.orderService.findOrderDetails(id);
      result.setState(1);
      result.setObj(list);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveOrUpdateSpecialTreat.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateSpecialTreat(HttpServletRequest request, HttpServletResponse response, Integer st, Long jiuzhenId) {
    MyResult mr = new MyResult();
    try {
      this.orderService.saveOrUpdateSpecialTreat(jiuzhenId, st);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/getExamAppointsNo.htm"}, method = {RequestMethod.POST})
  public void getExamAppointsNo(HttpServletRequest request, HttpServletResponse response, Integer jcxmId, Long jiuzhenId) {
    MyResult mr = new MyResult();
    try {
      String exam_no = this.orderService.getExamAppointsNo(jcxmId, jiuzhenId);
      mr.setObj(exam_no);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/getZYSX.htm"}, method = {RequestMethod.POST})
  public void getZYSX(HttpServletRequest request, HttpServletResponse response, Integer jcxmId, Long jiuzhenId, Integer dept, Integer listType) {
    MyResult mr = new MyResult();
    try {
      Map<String, Object> map = this.orderService.getZYSX(jcxmId, jiuzhenId, dept, listType);
      mr.setObj(map);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/getExamNo.htm"}, method = {RequestMethod.POST})
  public void getExamNo(HttpServletRequest request, HttpServletResponse response, String orderNo) {
    MyResult mr = new MyResult();
    try {
      String er = this.orderService.getExamNo(orderNo);
      mr.setObj(er);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/getExamReport.htm"}, method = {RequestMethod.POST})
  public void getExamReport(HttpServletRequest request, HttpServletResponse response, String examNo) {
    MyResult mr = new MyResult();
    try {
      ExamResult er = this.orderService.getExamReport(examNo);
      mr.setObj(er);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/getLisReport.htm"}, method = {RequestMethod.POST})
  public void getLisReport(HttpServletRequest request, HttpServletResponse response, String orderNo) {
    MyResult mr = new MyResult();
    try {
      List<TestResult> tr = this.orderService.getLisReport(orderNo);
      mr.setObj(tr);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/updateTreatResult.htm"}, method = {RequestMethod.POST})
  public void updateTreatResult(HttpServletRequest request, HttpServletResponse response, String result, Long jiuzhenId) {
    MyResult mr = new MyResult();
    try {
      this.orderService.updateTreatResult(jiuzhenId, result);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findClassAndSubClass.htm"}, method = {RequestMethod.POST})
  public void findClassAndSubClass(HttpServletRequest request, HttpServletResponse response, String jcxmId) {
    MyResult mr = new MyResult();
    String[] ary = new String[2];
    try {
      List<Jcxm> list = this.jcxmServiceImpl.findJcxmsByIds(jcxmId);
      if (list != null && list.size() > 0)
        ary = this.examWebService.findClassAndSubClass(((Jcxm)list.get(0)).getBianma().substring(4)); 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    mr.setObj(ary);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findEMROrderByJcxmidAndJiuzhenid.htm"}, method = {RequestMethod.POST})
  public void findEMROrderByJcxmidAndJiuzhenid(HttpServletRequest request, HttpServletResponse response, Integer jcxmId, Long jiuzhenId) {
    MyResult mr = new MyResult();
    try {
      EMROrder eo = this.orderService.findEMROrderByJcxmidAndJiuzhenid(jiuzhenId, jcxmId);
      mr.setObj(eo);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/setPrintQuantity.htm"}, method = {RequestMethod.POST})
  public void setOrderPrintQuantity(Long jiuzhenId, EMROrderForm form, HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    try {
      int quantity = this.orderService.setOrderPrintQuantity(jiuzhenId, form);
      mr.setObj(Integer.valueOf(quantity));
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/getPrintQuantity.htm"}, method = {RequestMethod.POST})
  public void getPrintQuantity(HttpServletRequest request, HttpServletResponse response, Long jiuzhenId, Integer jcxmId) {
    MyResult mr = new MyResult();
    try {
      EMROrder eo = this.orderService.findEMROrderByJcxmidAndJiuzhenid(jiuzhenId, jcxmId);
      mr.setObj(eo.getPrintQuantity());
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }

  /**
   * @description:根据EMROrder的ID查询对应的检查在HIS/LIS上的缴费状态
   * @param id EMROrder的主键
   * @return:
   * @author: Mason
   * @time: 2020/5/9 17:32
   */
  @RequestMapping(value = {"/checkOrderJiFeiStatus.htm"}, method = {RequestMethod.POST})
  public void checkOrderHisJiFeiStatus(HttpServletRequest request, HttpServletResponse response, Long id){
    MyResult result = new MyResult();
    result.setDoing("查询开单信息！");
    try {
      EMROrder order = this.orderService.getEMROrder(id);
      if (null != order && null == order.getOrderNo()){
        order.setOrderNo("60931714_1,60931714_2,60931714_3,60931714_4");
      }
      boolean flag = this.orderService.checkOrderHisJiFeiStatus(order);
      result.setState(1);
      result.setObj(flag);
    } catch (Exception e) {
      e.printStackTrace();
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

}
