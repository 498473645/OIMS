package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.MSG;
import cn.com.oims.dao.pojo.MSGAttachment;
import cn.com.oims.dao.pojo.UserOnline;
import cn.com.oims.service.IUserOnlineService;
import cn.com.oims.service.MSGService;
import cn.com.oims.web.form.MSGForm;
import cn.com.oims.web.form.MSGOutboxForm;
import cn.com.oims.web.form.MSGSearchForm;
import cn.com.oims.web.form.UserSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;

@Controller
@RequestMapping({"msg"})
public class MSGController {
  @Autowired
  private MSGService msgService;
  
  @Autowired
  private IUserOnlineService uoService;
  
  @RequestMapping(value = {"getMSG.htm"}, method = {RequestMethod.POST})
  public void getMSG(Long msgId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取消息");
    try {
      HttpSession session = request.getSession();
      Map<String, Object> map = this.msgService.getMSG(msgId, session.getAttribute("gonghao").toString());
      result.setState(1);
      result.setObj(map);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateMSG.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateMSG(MSGForm form, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存更新消息");
    try {
      HttpSession session = request.getSession();
      form.setSender(session.getAttribute("gonghao").toString());
      Vector<MSGAttachment> vec = processAttachment(request);
      form.setAttachments(vec);
      this.msgService.saveOrUpdateMSG(form);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  private Vector<MSGAttachment> processAttachment(HttpServletRequest request) {
    DefaultMultipartHttpServletRequest req = (DefaultMultipartHttpServletRequest)request;
    List<MultipartFile> fileList = (List<MultipartFile>)req.getMultiFileMap().get("file");
    Vector<MSGAttachment> vec = null;
    if (fileList.size() > 0) {
      String path = "/msg/attachment/" + (new SimpleDateFormat("yyyy/MM/dd")).format(new Date());
      String filePath = request.getSession().getServletContext().getRealPath(path);
      File folder = new File(filePath);
      if (!folder.exists())
        folder.mkdirs(); 
      vec = new Vector<>();
      for (MultipartFile file : fileList) {
        MSGAttachment a = new MSGAttachment();
        String filename = file.getOriginalFilename();
        if (filename.isEmpty())
          continue; 
        a.setFilename(filename);
        String ext = filename.substring(filename.lastIndexOf("."));
        String newname = String.valueOf(MultiUtils.getTimeRodem()) + ext;
        File f = new File(String.valueOf(filePath) + File.separator + newname);
        try {
          file.transferTo(f);
        } catch (IllegalStateException e) {
          e.printStackTrace();
        } catch (IOException e) {
          e.printStackTrace();
        } 
        a.setPath(String.valueOf(path) + "/" + newname);
        vec.add(a);
      } 
      if ((folder.listFiles()).length == 0)
        folder.delete(); 
    } 
    return vec;
  }
  
  @RequestMapping(value = {"sendMSG.htm"}, method = {RequestMethod.POST})
  public void sendMSG(MSGOutboxForm form, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存更新消息");
    HttpSession session = request.getSession();
    form.setSender(session.getAttribute("gonghao").toString());
    Vector<MSGAttachment> vec = processAttachment(request);
    form.setAttachments(vec);
    this.msgService.sendMSG(form);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findDraftBox.htm"}, method = {RequestMethod.POST})
  public void findDraftBox(Page page, MSGSearchForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    form.setUser(session.getAttribute("gonghao").toString());
    Map<String, Object> map = this.msgService.findDraftBox(page, form);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"findInBox.htm"}, method = {RequestMethod.POST})
  public void findInBox(Page page, MSGSearchForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    form.setUser(session.getAttribute("gonghao").toString());
    Map<String, Object> map = this.msgService.findInBox(page, form);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"findOutBox.htm"}, method = {RequestMethod.POST})
  public void findOutBox(Page page, MSGSearchForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    form.setUser(session.getAttribute("gonghao").toString());
    Map<String, Object> map = this.msgService.findOutBox(page, form);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"deleteMSG.htm"}, method = {RequestMethod.GET})
  public void deleteMSG(Long id, boolean re, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("发送消息");
    try {
      HttpSession session = request.getSession();
      this.msgService.deleteMSG(id, re, session);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteMSGAttachment.htm"}, method = {RequestMethod.GET})
  public void deleteMSGAttachment(Long id, Long msgId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("发送消息");
    try {
      HttpSession session = request.getSession();
      MSGAttachment a = (MSGAttachment)this.msgService.getObj(MSGAttachment.class, id);
      if (a.getMsgId().longValue() != msgId.longValue())
        throw new RuntimeException("不是此消息的附件！"); 
      MSG msg = (MSG)this.msgService.getObj(MSG.class, msgId);
      if (!msg.getInsertUser().equals(session.getAttribute("gonghao").toString()))
        throw new RuntimeException("不是我添加的附件！"); 
      if (msg.isSend())
        throw new RuntimeException("不能删除已发送消息的附件！"); 
      if (msg.isDel())
        throw new RuntimeException("不能删除已删除消息的附件！"); 
      File file = new File(session.getServletContext().getRealPath(a.getPath()));
      if (file.exists())
        file.delete(); 
      this.msgService.delete(a);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"recoverMSG.htm"}, method = {RequestMethod.POST})
  public void recoverMSG(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("发送消息");
    try {
      HttpSession session = request.getSession();
      this.msgService.recoverMSG(id, session.getAttribute("gonghao").toString());
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findAttachment.htm"}, method = {RequestMethod.POST})
  public void findAttachment(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("发送消息");
    try {
      HttpSession session = request.getSession();
      this.msgService.recoverMSG(id, session.getAttribute("gonghao").toString());
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findUserlist.htm"}, method = {RequestMethod.POST})
  public void findUserlist(UserSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> list = this.msgService.findUser(form, page);
    JSONWriterUtils.writeJSONObj(list, response);
  }
  
  @RequestMapping(value = {"findMsgListWithUser.htm"}, method = {RequestMethod.POST})
  public void findMsgListWithUser(Page page, String gonghao, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> list = this.msgService.findMSG(page, gonghao, 
        request.getSession().getAttribute("gonghao").toString());
    JSONWriterUtils.writeJSONObj(list, response);
  }
  
  @RequestMapping(value = {"findTodayMsgListWithUser.htm"}, method = {RequestMethod.POST})
  public void findTodayMsgListWithUser(String gonghao, HttpServletRequest request, HttpServletResponse response) {
    List<MSG> list = this.msgService.findTodayMSG(gonghao, request.getSession().getAttribute("gonghao").toString());
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"findMSGUserlist.htm"}, method = {RequestMethod.POST})
  public void findMSGUserlist(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String uid = session.getAttribute("uid").toString();
    UserOnline online = this.uoService.findUserOnlineById(uid);
    online.setVisitTime(new Date());
    online.setOnline(true);
    this.uoService.saveOrUpdateUserOnline(online);
    List<Map<String, Object>> list = this.msgService
      .findMSGUser(session.getAttribute("gonghao").toString());
    JSONWriterUtils.writeJSONList(list, response);
  }
}
