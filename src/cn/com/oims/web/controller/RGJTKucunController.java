package cn.com.oims.web.controller;

import cn.com.oims.common.XLSHead;
import cn.com.oims.dao.pojo.RGJTCgmx;
import cn.com.oims.dao.pojo.RGJTChukusqmx;
import cn.com.oims.dao.pojo.RGJTCrkmx;
import cn.com.oims.service.IRGJTKuncunService;
import cn.com.oims.web.form.RGJTBaobiaoForm;
import cn.com.oims.web.form.RGJTCaigouSearchForm;
import cn.com.oims.web.form.RGJTCgsqdForm;
import cn.com.oims.web.form.RGJTChukuForm;
import cn.com.oims.web.form.RGJTChukuSearchForm;
import cn.com.oims.web.form.RGJTKucunLSSearchForm;
import cn.com.oims.web.form.RGJTKucunSearchForm;
import cn.com.oims.web.form.RGJTRukuForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"rgjtKucun"})
public class RGJTKucunController extends BaseController {
  @Autowired
  private IRGJTKuncunService kcService;
  
  @RequestMapping(value = {"findKucunPageList.htm"}, method = {RequestMethod.POST})
  public void findKucunPageList(RGJTKucunSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.kcService.findKucunPageList(form, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"findCaigouPageList.htm"}, method = {RequestMethod.POST})
  public void findCaigouPageList(RGJTCaigouSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.kcService.findCaigouPageList(form, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"findCaigoumxPageList.htm"}, method = {RequestMethod.POST})
  public void findCaigoumxPageList(Long id, RGJTCaigouSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.kcService.findCaigoumxPageList(id, form, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping({"caigousq.htm"})
  public void caigousq(RGJTCgsqdForm form, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("采购申请");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      String[] proIds = request.getParameterValues("proId");
      String[] quantity = request.getParameterValues("quantity");
      String[] diopter = request.getParameterValues("diopter");
      List<RGJTCgmx> list = new ArrayList<>();
      for (int i = 0; i < proIds.length; i++) {
        RGJTCgmx cgmx = new RGJTCgmx();
        cgmx.setCgsqdId(form.getId());
        int proId = Integer.parseInt(proIds[i]);
        cgmx.setQuantity(Integer.parseInt(quantity[i]));
        cgmx.setDiopter(Float.valueOf(Float.parseFloat(diopter[i])));
        cgmx.setProId(Integer.valueOf(proId));
        list.add(cgmx);
      } 
      this.kcService.caigousq(form, list, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"caigouShenhe.htm"}, method = {RequestMethod.POST})
  public void caigouShenhe(Long id, boolean flag, String note, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("采购审核");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      this.kcService.caigouShenhe(id, flag, note, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"caigouPifu.htm"}, method = {RequestMethod.POST})
  public void caigouPifu(Long id, boolean approvalFlag, String approvalMsg, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("采购批复");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      this.kcService.caigouPifu(id, approvalFlag, approvalMsg, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"delCaigouShenqingdan.htm"}, method = {RequestMethod.POST})
  public void delCaigouShenqingdan(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("采购批复");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      this.kcService.delCaigouShenqingdan(id, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping({"jingtiChRuku.htm"})
  public void jingtiChRuku(RGJTRukuForm form, HttpServletRequest request, HttpServletResponse response, Long operationId) {
    MyResult result = new MyResult();
    result.setDoing("人工晶体出入库");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      String[] proIds = request.getParameterValues("proId");
      String[] quantity = request.getParameterValues("quantity");
      String[] diopter = request.getParameterValues("diopter");
      String[] sn = request.getParameterValues("sn");
      String[] expiTime = request.getParameterValues("expiTime");
      String[] batchNumber = request.getParameterValues("batchNumber");
      List<RGJTCrkmx> list = new ArrayList<>();
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      for (int i = 0; i < proIds.length; i++) {
        RGJTCrkmx cgmx = new RGJTCrkmx();
        cgmx.setQuantity(Integer.parseInt(quantity[i]));
        if (expiTime != null)
          cgmx.setExpiTime((expiTime[i] == null || expiTime[i].isEmpty()) ? null : sdf.parse(expiTime[i])); 
        if (diopter != null)
          cgmx.setDiopter((diopter[i] == null || diopter[i].isEmpty()) ? null : Float.valueOf(Float.parseFloat(diopter[i]))); 
        cgmx.setProId(Integer.valueOf(Integer.parseInt(proIds[i])));
        if (sn != null)
          cgmx.setSn(sn[i]); 
        if (batchNumber != null)
          cgmx.setBatchNumber(batchNumber[i]); 
        list.add(cgmx);
      } 
      this.kcService.jingtiChRuku(form, list, gonghao, operationId);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findChukusqPageList.htm"}, method = {RequestMethod.POST})
  public void findChukusqPageList(RGJTChukuSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.kcService.findChukusqPageList(form, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"findChukusqmxPageList.htm"}, method = {RequestMethod.POST})
  public void findChukusqmxPageList(Long id, RGJTChukuSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.kcService.findChukusqmxPageList(id, form, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping({"chukuShenqing.htm"})
  public void chukuShenqing(RGJTChukuForm form, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("出库申请");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setGonghao(gonghao);
      String[] proIds = request.getParameterValues("proId");
      String[] quantity = request.getParameterValues("quantity");
      String[] diopter = request.getParameterValues("diopter");
      List<RGJTChukusqmx> list = new ArrayList<>();
      for (int i = 0; i < proIds.length; i++) {
        RGJTChukusqmx cgmx = new RGJTChukusqmx();
        cgmx.setQuantity(Integer.valueOf(Integer.parseInt(quantity[i])));
        cgmx.setDiopter(Float.valueOf(Float.parseFloat(diopter[i])));
        cgmx.setProId(Integer.valueOf(Integer.parseInt(proIds[i])));
        list.add(cgmx);
      } 
      this.kcService.chukuShenqing(form, list, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"chukuShenhe.htm"}, method = {RequestMethod.POST})
  public void chukuShenhe(Long id, boolean flag, String note, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("采购申请");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      this.kcService.chukuShenhe(id, flag, note, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"chukuPifu.htm"}, method = {RequestMethod.POST})
  public void chukuPifu(Long id, boolean flag, String note, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("采购申请");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      this.kcService.chukuPifu(id, flag, note, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"delChukuShenqingdan.htm"}, method = {RequestMethod.POST})
  public void delChukuShenqingdan(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("删除出库申请单");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      this.kcService.delChukuShenqingdan(id, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"rgjtKucunBaobiao.htm"}, method = {RequestMethod.POST})
  public void rgjtKucunBaobiao(RGJTBaobiaoForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map result = this.kcService.getRGJTKucunBaobiao(form, page);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findOperationPatient.htm"}, method = {RequestMethod.POST})
  public void findOperationPatient(String blh, HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> result = this.kcService.findOperationPatient(blh);
    JSONWriterUtils.writeJSONList(result, response);
  }
  
  @RequestMapping(value = {"findRGJTKucunMX.htm"}, method = {RequestMethod.GET})
  public void findRGJTKucunMX(Long id, Boolean pro, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("查找库存中的人工晶体");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setDoing(gonghao);
      List<Map<String, Object>> mx = this.kcService.findRGJTKucunMX(id, pro);
      result.setState(1);
      result.setObj(mx);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findRGJTBySN.htm"}, method = {RequestMethod.GET})
  public void findRGJTBySN(String sn, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据SN查找库存中的人工晶体");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setDoing(gonghao);
      Map<String, Object> mx = this.kcService.findRGJTBySN(sn);
      result.setState(1);
      result.setObj(mx);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"rgjtKucunMXPagelist.htm"}, method = {RequestMethod.POST})
  public void rgjtKucunMXPagelist(RGJTKucunSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map result = this.kcService.rgjtKucunMXPagelist(form, page);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"rgjtKucunLSPagelist.htm"}, method = {RequestMethod.POST})
  public void rgjtKucunLSPagelist(RGJTKucunLSSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map result = this.kcService.rgjtKucunLSPagelist(form, page);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findKucunLSMXList.htm"}, method = {RequestMethod.GET})
  public void findKucunLSMXList(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("查找人工晶体流水明细");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setDoing(gonghao);
      List<Map<String, Object>> mx = this.kcService.findRGJTKucunLSMX(id);
      result.setState(1);
      result.setObj(mx);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findRGJTKucun.htm"}, method = {RequestMethod.GET})
  public void findRGJTKucun(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("查找库存中的人工晶体");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setDoing(gonghao);
      Map<String, Object> mx = this.kcService.findRGJTKucun(id);
      result.setState(1);
      result.setObj(mx);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findRGJTKucunByProId.htm"}, method = {RequestMethod.GET})
  public void findRGJTKucunByProId(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("查找库存中的人工晶体");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setDoing(gonghao);
      Map<String, Object> mx = this.kcService.findRGJTKucunByProId(id);
      result.setState(1);
      result.setObj(mx);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"rgjtMxBaobiao.htm"}, method = {RequestMethod.POST})
  public void rgjtMxBaobiao(RGJTBaobiaoForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map result = this.kcService.getRGJTMxBaobiao(form, page);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"getDayNum.htm"}, method = {RequestMethod.POST})
  public void getDayNum(HttpServletRequest request, HttpServletResponse response, String startDate, String endDate, Integer proId) {
    Date startTime = null;
    Date endTime = null;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    MyResult mr = new MyResult();
    try {
      if (!startDate.isEmpty())
        startTime = MultiUtils.getStartTimeOfDay(sdf.parse(startDate)); 
      if (!endDate.isEmpty())
        endTime = MultiUtils.getEndTimeOfDay(sdf.parse(endDate)); 
      List<Map<String, Object>> list = this.kcService.getDayNum(proId, startTime, endTime);
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"getJingTiDetalsByOperationId.htm"}, method = {RequestMethod.POST})
  public void getJingTiDetalsByOperationId(Long operationId, HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    try {
      List<Map<String, Object>> list = this.kcService.getJingTiDetalsByOperationId(operationId);
      mr.setState(1);
      mr.setObj(list);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"deleteOperJingti.htm"}, method = {RequestMethod.POST})
  public void deleteOperJingti(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String gonghao = request.getSession().getAttribute("gonghao").toString();
    try {
      this.kcService.deleteOperJingti(id, gonghao);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"exportjingtinum.htm"}, method = {RequestMethod.POST})
  public void exportjingtinum(HttpServletRequest request, HttpServletResponse response, String startDate, String endDate, Integer productId) {
    Date startTime = null;
    Date endTime = null;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    try {
      if (!startDate.isEmpty())
        startTime = MultiUtils.getStartTimeOfDay(sdf.parse(startDate)); 
      if (!endDate.isEmpty())
        endTime = MultiUtils.getEndTimeOfDay(sdf.parse(endDate)); 
      List<Map<String, Object>> list = this.kcService.getDayNum(productId, startTime, endTime);
      exportXls(list, exportJTNumHead(), request, response);
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  private Vector<XLSHead> exportJTNumHead() {
    Vector<XLSHead> vh = new Vector<>();
    XLSHead h = null;
    h = new XLSHead("date", "日期", "date");
    vh.add(h);
    h = new XLSHead("rk", "入库");
    vh.add(h);
    h = new XLSHead("ck", "出库");
    vh.add(h);
    h = new XLSHead("sh", "损坏");
    vh.add(h);
    h = new XLSHead("jy", "结余");
    vh.add(h);
    return vh;
  }
  
  @RequestMapping(value = {"exportjingtimx.htm"}, method = {RequestMethod.POST})
  public void exportjingtimx(RGJTBaobiaoForm form, HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = this.kcService.getRGJTMxBaobiaoExport(form);
    exportXls(list, exportJTMXHead(), request, response);
  }
  
  private Vector<XLSHead> exportJTMXHead() {
    Vector<XLSHead> vh = new Vector<>();
    XLSHead h = null;
    h = new XLSHead("typeName", "规格型号");
    vh.add(h);
    h = new XLSHead("quantity", "数量");
    vh.add(h);
    h = new XLSHead("manufacturer", "厂家名称");
    vh.add(h);
    h = new XLSHead("patientName", "病人姓名");
    vh.add(h);
    h = new XLSHead("patientName", "病人姓名");
    vh.add(h);
    h = new XLSHead("patientId", "ID号");
    vh.add(h);
    h = new XLSHead("operationDate", "日期", "date");
    vh.add(h);
    h = new XLSHead("diopter", "度数");
    vh.add(h);
    h = new XLSHead("expiTime", "效期");
    vh.add(h);
    h = new XLSHead("sn", "批号");
    vh.add(h);
    h = new XLSHead("batchNumber", "发票号");
    vh.add(h);
    h = new XLSHead("doctor", "医生");
    vh.add(h);
    h = new XLSHead("nurse", "护士");
    vh.add(h);
    return vh;
  }
}
