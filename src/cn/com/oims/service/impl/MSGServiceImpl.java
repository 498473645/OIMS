package cn.com.oims.service.impl;

import cn.com.oims.dao.MSGDao;
import cn.com.oims.dao.pojo.MSG;
import cn.com.oims.dao.pojo.MSGAttachment;
import cn.com.oims.dao.pojo.MSGInbox;
import cn.com.oims.dao.pojo.MSGOutbox;
import cn.com.oims.dao.pojo.MSGReceiver;
import cn.com.oims.service.MSGService;
import cn.com.oims.web.form.MSGForm;
import cn.com.oims.web.form.MSGOutboxForm;
import cn.com.oims.web.form.MSGSearchForm;
import cn.com.oims.web.form.UserSearchForm;
import com.codesnet.common.Page;
import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MSGServiceImpl implements MSGService {
  @Autowired
  private MSGDao msgDao;
  
  @Transactional
  public void saveOrUpdateMSG(MSGForm form) {
    MSG msg;
    boolean update = false;
    if (form.getMsgId() != null) {
      msg = (MSG)this.msgDao.getObj(MSG.class, form.getMsgId());
      if (msg == null)
        throw new RuntimeException("消息未找到！"); 
      if (msg.isDel())
        throw new RuntimeException("消息已删除！"); 
      if (msg.isSend())
        throw new RuntimeException("消息已发送！"); 
      if (!msg.getInsertUser().equals(form.getSender()))
        throw new RuntimeException("不是本人的消息！"); 
      update = true;
    } else {
      msg = new MSG();
      msg.setInsertDate(new Date());
      msg.setInsertUser(form.getSender());
    } 
    msg.setContent(form.getContent());
    msg.setTitle(form.getTitle());
    msg.setSend(false);
    msg.setDel(false);
    this.msgDao.saveOrUpdate(msg);
    if (form.getReceiver() != null) {
      String[] receivers = form.getReceiver().split(",");
      List<MSGReceiver> list = new ArrayList<>();
      if (update)
        list = this.msgDao.findMSGReceivers(msg.getId()); 
      for (int i = 0; i < receivers.length; i++) {
        String receiver = receivers[i];
        String model = "TO";
        boolean x = true;
        for (MSGReceiver _r : list) {
          if (_r.getReceiver().equals(receiver)) {
            if (!_r.getSendType().equals(model) || _r.getN() != i) {
              _r.setSendType(model);
              _r.setN(i);
              this.msgDao.saveOrUpdate(_r);
            } 
            list.remove(_r);
            x = false;
            break;
          } 
        } 
        if (x) {
          MSGReceiver r = new MSGReceiver();
          r.setMsgId(msg.getId());
          r.setReceiver(receiver);
          r.setSendType(model);
          r.setSender(msg.getInsertUser());
          this.msgDao.saveOrUpdate(r);
        } 
      } 
      this.msgDao.deleteCollection(list);
    } 
    if (form.getAttachments() != null)
      for (MSGAttachment a : form.getAttachments()) {
        a.setMsgId(msg.getId());
        this.msgDao.saveOrUpdate(a);
      }  
  }
  
  @Transactional
  public void sendMSG(MSGOutboxForm form) {
    MSG msg;
    boolean update = false;
    if (form.getMsgId() != null) {
      msg = (MSG)this.msgDao.getObj(MSG.class, form.getMsgId());
      if (msg == null)
        throw new RuntimeException("消息未找到！"); 
      if (msg.isDel())
        throw new RuntimeException("消息已删除！"); 
      if (msg.isSend())
        throw new RuntimeException("消息已发送！"); 
      if (!msg.getInsertUser().equals(form.getSender()))
        throw new RuntimeException("不是本人的消息！"); 
      update = true;
    } else {
      msg = new MSG();
      msg.setInsertDate(new Date());
      msg.setInsertUser(form.getSender());
    } 
    msg.setContent(form.getContent());
    msg.setTitle(form.getTitle());
    msg.setSend(true);
    msg.setDel(false);
    this.msgDao.saveOrUpdate(msg);
    if (form.getReceiver() != null) {
      String[] receivers = form.getReceiver().split(",");
      List<MSGReceiver> list = new ArrayList<>();
      if (update)
        list = this.msgDao.findMSGReceivers(msg.getId()); 
      for (int i = 0; i < receivers.length; i++) {
        String receiver = receivers[i];
        String model = "TO";
        MSGInbox inbox = new MSGInbox();
        inbox.setMsgId(msg.getId());
        inbox.setRead(false);
        inbox.setReceiveMode(model);
        inbox.setReceiver(receiver);
        inbox.setDel(false);
        this.msgDao.saveOrUpdate(inbox);
        boolean x = true;
        for (MSGReceiver _r : list) {
          if (_r.getReceiver().equals(receiver)) {
            if (!_r.getSendType().equals(model) || _r.getN() != i) {
              _r.setSendType(model);
              _r.setN(i);
              this.msgDao.saveOrUpdate(_r);
            } 
            list.remove(_r);
            x = false;
            break;
          } 
        } 
        if (x) {
          MSGReceiver r = new MSGReceiver();
          r.setMsgId(msg.getId());
          r.setReceiver(receiver);
          r.setSendType(model);
          r.setSender(form.getSender());
          this.msgDao.saveOrUpdate(r);
        } 
      } 
      this.msgDao.deleteCollection(list);
    } 
    if (form.getAttachments() != null)
      for (MSGAttachment a : form.getAttachments()) {
        a.setMsgId(msg.getId());
        this.msgDao.saveOrUpdate(a);
      }  
    MSGOutbox box = new MSGOutbox();
    box.setGonghao(form.getSender());
    box.setDel(false);
    box.setInsertDate(new Date());
    box.setMsgId(msg.getId());
    box.setDeluser("00");
    this.msgDao.saveOrUpdate(box);
  }
  
  public Map<String, Object> findDraftBox(Page page, MSGSearchForm form) {
    Map<String, Object> map = new HashMap<>();
    List<MSG> list = this.msgDao.findDraftBox(page, form);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public Map<String, Object> findInBox(Page page, MSGSearchForm form) {
    Map<String, Object> map = new HashMap<>();
    List<MSG> list = this.msgDao.findInBox(page, form);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public Map<String, Object> findOutBox(Page page, MSGSearchForm form) {
    Map<String, Object> map = new HashMap<>();
    List<MSG> list = this.msgDao.findOutBox(page, form);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public Map<String, Object> findDeleteMSG(Page page, MSGSearchForm form) {
    Map<String, Object> map = new HashMap<>();
    List<MSG> list = this.msgDao.findDeleteMSG(page, form);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  @Transactional
  public boolean deleteMSG(Long id, boolean re, HttpSession session) {
    MSG msg = (MSG)this.msgDao.getObj(MSG.class, id);
    if (msg == null)
      return false; 
    String user = session.getAttribute("gonghao").toString();
    if (!msg.isSend()) {
      if (!user.equals(msg.getInsertUser()))
        return false; 
      if (re) {
        this.msgDao.deleteObj(msg);
        List<MSGReceiver> list = this.msgDao.findMSGReceivers(id);
        this.msgDao.deleteCollection(list);
        List<MSGAttachment> l = this.msgDao.findMSGAttachment(id);
        for (MSGAttachment a : l) {
          File file = new File(session.getServletContext().getRealPath(a.getPath()));
          file.delete();
        } 
        this.msgDao.deleteCollection(l);
      } else {
        msg.setDel(true);
        this.msgDao.saveOrUpdate(msg);
      } 
    } else {
      MSGOutbox outbox = this.msgDao.getMSGOutboxByid(id);
      if (outbox != null)
        if (outbox.isDel()) {
          this.msgDao.deleteObj(outbox);
        } else {
          outbox.setDel(true);
          outbox.setDeluser(user);
          this.msgDao.saveOrUpdate(outbox);
        }  
      MSGInbox inbox = this.msgDao.getMSGInboxByid(id);
      if (inbox != null)
        if (inbox.isDel()) {
          this.msgDao.deleteObj(inbox);
        } else {
          inbox.setDel(true);
          this.msgDao.saveOrUpdate(inbox);
        }  
      if (!this.msgDao.msgExistsInOutbox(id) && !this.msgDao.msgExistsInInbox(id)) {
        this.msgDao.deleteObj(msg);
        List<MSGReceiver> list = this.msgDao.findMSGReceivers(id);
        this.msgDao.deleteCollection(list);
        List<MSGAttachment> l = this.msgDao.findMSGAttachment(id);
        for (MSGAttachment a : l) {
          File file = new File(session.getServletContext()
              .getRealPath(a.getPath()));
          file.delete();
        } 
        this.msgDao.deleteCollection(l);
      } 
    } 
    return true;
  }
  
  @Transactional
  public boolean recoverMSG(Long id, String user) {
    boolean re = false;
    MSG msg = (MSG)this.msgDao.getObj(MSG.class, id);
    if (msg == null)
      return re; 
    if (msg.isSend()) {
      if (user.equals(msg.getInsertUser())) {
        MSGOutbox outbox = this.msgDao.getMSGOutbox(user, id);
        if (outbox != null && outbox.isDel()) {
          outbox.setDel(false);
          this.msgDao.saveOrUpdate(outbox);
          re = true;
        } 
      } 
      MSGInbox inbox = this.msgDao.getMSGInbox(user, id);
      if (inbox != null && inbox.isDel()) {
        inbox.setDel(false);
        this.msgDao.saveOrUpdate(inbox);
        re = true;
      } 
    } else if (msg.isDel()) {
      msg.setDel(false);
      this.msgDao.saveOrUpdate(msg);
      re = true;
    } 
    return re;
  }
  
  public Object getObj(Class class1, Long id) {
    return this.msgDao.getObj(class1, id);
  }
  
  public void delete(Object a) {
    this.msgDao.deleteObj(a);
  }
  
  public Map<String, Object> getMSG(Long msgId, String string) {
    MSG msg = (MSG)this.msgDao.getObj(MSG.class, msgId);
    if (msg == null)
      return null; 
    Map<String, Object> map = new HashMap<>();
    map.put("msg", msg);
    MSGOutbox outbox = this.msgDao.getMSGOutbox(msg.getInsertUser(), msgId);
    map.put("outbox", outbox);
    List<MSGReceiver> receiver = this.msgDao.findMSGReceivers(msg.getId());
    map.put("receiver", receiver);
    MSGInbox inbox = this.msgDao.getMSGInbox(string, msgId);
    if (inbox != null) {
      inbox.setRead(true);
      inbox.setReadTime(new Date());
      this.msgDao.saveOrUpdate(inbox);
    } 
    return map;
  }
  
  public Map<String, Object> findUser(UserSearchForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = this.msgDao.findUser(form, page);
    map.put("page", page);
    map.put("list", list);
    return map;
  }
  
  public Map<String, Object> findMSG(Page page, String gonghao, String user) {
    Map<String, Object> map = new HashMap<>();
    List<MSG> list = this.msgDao.findMSG(page, gonghao, user);
    map.put("page", page);
    map.put("list", list);
    setAttachmentAndReadMSG(list, user);
    return map;
  }
  
  @Transactional
  private void setAttachmentAndReadMSG(List<MSG> list, String user) {
    for (MSG msg : list) {
      MSGInbox inbox = this.msgDao.getMSGInbox(user, msg.getId());
      List<MSGAttachment> al = this.msgDao.findMSGAttachment(msg.getId());
      msg.setAttachment(al);
      if (inbox != null && !inbox.isRead()) {
        inbox.setRead(true);
        this.msgDao.saveOrUpdate(inbox);
      } 
    } 
  }
  
  public List<MSG> findTodayMSG(String gonghao, String user) {
    List<MSG> list = this.msgDao.findTodayMSG(gonghao, user);
    setAttachmentAndReadMSG(list, user);
    return list;
  }
  
  public List<Map<String, Object>> findMSGUser(String user) {
    return this.msgDao.findMSGUserList(user);
  }
}
