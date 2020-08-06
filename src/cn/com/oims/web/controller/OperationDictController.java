package cn.com.oims.web.controller;

import cn.com.oims.service.IOperationDictService;
import cn.com.oims.web.form.OperationGroupForm;
import cn.com.oims.web.form.OperationGroupMemberForm;
import cn.com.oims.web.form.OperationGroupSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.Map;
import java.util.Vector;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"operationDict"})
public class OperationDictController {
  @Autowired
  private IOperationDictService ods;
  
  @RequestMapping(value = {"saveOrUpdateOperationGroup.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateOperationGroup(OperationGroupForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("保存手术组");
    try {
      result.setObj(this.ods.saveOrUpdateOperationGroup(form, gonghao));
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findOperationGroupPageList.htm"}, method = {RequestMethod.POST})
  public void findOperationGroupPageList(OperationGroupSearchForm sf, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.ods.findOperationGroupPageList(sf, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"deleteOperationGroup.htm"}, method = {RequestMethod.POST})
  public void deleteOperationGroup(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("删除手术组");
    try {
      String[] ids = request.getParameterValues("id");
      this.ods.deleteOperationGroup(ids);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateGroupMembers.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateGroupMembers(Integer groupId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("保存手术组成员");
    result.setGonghao(gonghao);
    String[] workNo = request.getParameterValues("workNo");
    String[] levelFlag = request.getParameterValues("levelFlag");
    String[] operationDicts = request.getParameterValues("operationDicts");
    Vector<OperationGroupMemberForm> ogf = new Vector<>();
    try {
      for (int i = 0; i < workNo.length; i++) {
        OperationGroupMemberForm gf = new OperationGroupMemberForm();
        gf.setGroupId(groupId);
        gf.setLevelFlag(Integer.valueOf(Integer.parseInt(levelFlag[i])));
        gf.setOperationDicts(operationDicts[i]);
        gf.setWorkNo(workNo[i]);
        ogf.add(gf);
      } 
      this.ods.saveOrUpdateGroupMembers(ogf, gonghao);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findGroupMember.htm"}, method = {RequestMethod.POST})
  public void findGroupMemberList(String groupId, HttpServletRequest request, HttpServletResponse response) {
    JSONWriterUtils.writeJSONList(this.ods.findGroupMemberList(groupId), response);
  }
}
