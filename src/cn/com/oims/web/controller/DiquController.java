package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Diqu;
import cn.com.oims.service.IDiquService;
import cn.com.oims.service.IOimsLogService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"diqu"})
public class DiquController extends BaseController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  private IDiquService diquService;
  
  @Autowired
  public void setDiquService(IDiquService diquService) {
    this.diquService = diquService;
  }
  
  @RequestMapping(value = {"findAllDiqu.htm"}, method = {RequestMethod.POST})
  public void findAllDiqu(HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("查询所有地区", req);
    try {
      mrSuccess(mr, this.diquService.findDiquAll());
      JSONWriterUtils.writeJSONObj(mr, res);
      this.oimsLogService.saveOimsLog(mr, 
          1);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e.getMessage(), mr);
    } 
  }
  
  @RequestMapping(value = {"/findDiqusByPid.htm"}, method = {RequestMethod.POST})
  public void findDiqusByPid(Integer pid, HttpServletRequest request, HttpServletResponse response, String startDate, String endDate) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      this.doing = "根据父级Id查询地区信息";
      List<Diqu> list = this.diquService.findDiqus(pid);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    result.setDoing(this.doing);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findFullDiquID.htm"}, method = {RequestMethod.POST})
  public void findFullDiquID(int id, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("查询所有地区", req);
    try {
      mrSuccess(mr, this.diquService.findDiquFull(id));
      JSONWriterUtils.writeJSONObj(mr, res);
      this.oimsLogService.saveOimsLog(mr, 1);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e.getMessage(), mr);
    } 
  }
}
