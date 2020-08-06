package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Qingjiatiao;
import cn.com.oims.service.IQingjiaService;
import cn.com.oims.service.IUserService;
import cn.com.oims.web.form.QingjiaSearchForm;
import cn.com.oims.web.form.QingjiatiaoForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"qingjia"})
public class QingjiaController {
  @Autowired
  private IQingjiaService qingjiaService;
  
  @Autowired
  private IUserService userService;
  
  private int RIGHT_PIZHUN = 366;
  
  private int RIGHT_BUPIZHUN = 367;
  
  @RequestMapping(value = {"saveOrUpdateQingjiatiao.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateQingjiatiao(QingjiatiaoForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("请假");
    result.setGonghao(gonghao);
    try {
      this.qingjiaService.saveOrUpdateQingjiatiao(form, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"getQingjiatiao.htm"}, method = {RequestMethod.GET})
  public void getQingjiatiao(Long id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("获取请假条");
    result.setGonghao(gonghao);
    try {
      Qingjiatiao qjt = this.qingjiaService.getQingjiatiao(id);
      result.setObj(qjt);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findQingjiatiao.htm"}, method = {RequestMethod.POST})
  public void findQingjiatiao(Page page, QingjiaSearchForm qsf, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    if (!this.userService.haveRight(gonghao, new int[] { this.RIGHT_PIZHUN, this.RIGHT_BUPIZHUN }))
      qsf.setInsertUser(gonghao); 
    Map<String, Object> map = this.qingjiaService.findQingjiatiao(qsf, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"setQingjiatiaoState.htm"}, method = {RequestMethod.POST})
  public void setQingjiatiaoState(Long id, int state, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("设置请假条状态");
    result.setGonghao(gonghao);
    try {
      if ((state == 2 || state == 1) && 
        !this.userService.haveRight(gonghao, new int[] { this.RIGHT_PIZHUN, this.RIGHT_BUPIZHUN }))
        throw new RuntimeException("no rights!"); 
      this.qingjiaService.setQingjiatiaoState(id, state, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteQingjiatiao.htm"}, method = {RequestMethod.POST})
  public void deleteQingjiatiao(Long id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("删除请假条");
    result.setGonghao(gonghao);
    try {
      this.qingjiaService.deleteQingjiatiao(id, gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
