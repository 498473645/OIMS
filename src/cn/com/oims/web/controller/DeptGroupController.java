package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.DeptGroup;
import cn.com.oims.dao.pojo.GroupMember;
import cn.com.oims.dao.pojo.GroupMemberId;
import cn.com.oims.service.IDeptGroupService;
import cn.com.oims.web.form.ArticleSearchForm;
import cn.com.oims.web.form.DeptGroupForm;
import cn.com.oims.web.form.GrooupPatientMsgForm;
import cn.com.oims.web.form.GroupArticleForm;
import cn.com.oims.web.form.PatientSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.List;
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
@RequestMapping({"deptGroup"})
public class DeptGroupController {
  @Autowired
  private IDeptGroupService groupService;
  
  @RequestMapping(value = {"findDeptGroupList.htm"}, method = {RequestMethod.POST})
  public void findDeptGroupList(String search, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("获取分组列表！");
    result.setGonghao(gonghao);
    try {
      List<DeptGroup> list = this.groupService.findDeptGroupList(search);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findGroupMember.htm"}, method = {RequestMethod.POST})
  public void findGroupMember(Integer groupId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("获取分组列表！");
    result.setGonghao(gonghao);
    try {
      List<GroupMember> list = this.groupService.findGoupMember(groupId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateGroupMember.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateGroupMember(Integer groupId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("保存分组成员！");
    result.setGonghao(gonghao);
    try {
      Vector<GroupMember> v = new Vector<>();
      String[] workNo = request.getParameterValues("workNo");
      String[] _id = request.getParameterValues("id");
      String[] name = request.getParameterValues("name");
      String[] note = request.getParameterValues("note");
      String[] role = request.getParameterValues("role");
      for (int i = 0; i < workNo.length; i++) {
        GroupMember gm = new GroupMember();
        GroupMemberId id = new GroupMemberId(groupId, workNo[i]);
        gm.setGroupMemberId(id);
        gm.setName(name[i]);
        gm.setNote(note[i]);
        gm.setRole(Integer.valueOf(Integer.parseInt(role[i])));
        v.add(gm);
      } 
      this.groupService.saveOrUpdateGroupMember(v);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteGroupMember.htm"}, method = {RequestMethod.GET})
  public void deleteGroupMember(Integer id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing(" 删除分组成员");
    result.setGonghao(gonghao);
    try {
      this.groupService.deleteGroupMember(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateDeptGroup.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateDeptGroup(DeptGroupForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("保存部门分组（课题分组）");
    result.setGonghao(gonghao);
    try {
      this.groupService.saveOrUpdateDeptGroup(form, gonghao);
      result.setState(1);
      result.setObj(form);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteDeptGroup.htm"}, method = {RequestMethod.GET})
  public void deleteDeptGroup(Integer id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("删除部门（课题）分组！");
    result.setGonghao(gonghao);
    try {
      this.groupService.deleteDeptGroup(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateDeptGroupArticle.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateDeptGroupArticle(GroupArticleForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing(" 保存部门（课题）分组科研资料！");
    result.setGonghao(gonghao);
    try {
      this.groupService.saveOrUpdateGroupArticle(form, gonghao);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"addDeptGroupArticle.htm"}, method = {RequestMethod.POST})
  public void addDeptGroupArticle(Long articleId, Integer groupId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("添加文章到部门（课题）分组！");
    result.setGonghao(gonghao);
    try {
      this.groupService.addDeptGroupArticle(articleId, groupId, gonghao);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteDeptGroupArticle.htm"}, method = {RequestMethod.GET})
  public void deleteDeptGroupArticle(Integer groupId, Long articleId, Boolean deleteArticle, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("删除部门（课题）分组文章！");
    result.setGonghao(gonghao);
    try {
      this.groupService.deleteDeptGroupArticle(groupId, articleId, deleteArticle, gonghao);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findDeptGroupArticles.htm"}, method = {RequestMethod.POST})
  public void findDeptGroupArticles(Integer groupId, ArticleSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.groupService.findDeptGroupArticles(groupId, form, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"addDeptGroupPatient.htm"}, method = {RequestMethod.GET})
  public void addDeptGroupPatient(Integer groupId, Long patientId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("保存部门（课题）讨论患者！");
    result.setGonghao(gonghao);
    try {
      this.groupService.addDeptGroupPatient(groupId, patientId, gonghao);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteDeptGroupPatient.htm"}, method = {RequestMethod.GET})
  public void deleteDeptGroupPatient(Integer groupId, Long patientId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("删除部门（课题）讨论患者！");
    result.setGonghao(gonghao);
    try {
      this.groupService.deleteDeptGroupPatient(groupId, patientId, gonghao);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findDeptGroupPatients.htm"}, method = {RequestMethod.POST})
  public void findDeptGroupPatients(Integer groupId, PatientSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.groupService.findDeptGroupPatients(groupId, form, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"findDeptGroupPatientMsgs.htm"}, method = {RequestMethod.POST})
  public void findDeptGroupPatientMsgs(Integer groupId, Long patientId, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.groupService.findDeptGroupPatientMsgs(groupId, patientId, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"saveOrDeptGroupPatientMsg.htm"}, method = {RequestMethod.POST})
  public void saveOrDeptGroupPatientMsg(GrooupPatientMsgForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("部门（课题）患者讨论添加与编辑！");
    result.setGonghao(gonghao);
    try {
      this.groupService.addDeptGroupPatientMsg(form, gonghao);
      result.setState(1);
      result.setObj(form);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteDeptGroupPatientMsg.htm"}, method = {RequestMethod.GET})
  public void deleteDeptGroupPatientMsg(Long id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing(" 删除组内患者的讨论信息");
    result.setGonghao(gonghao);
    try {
      this.groupService.deleteDeptGroupPatientMsg(id, gonghao);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
