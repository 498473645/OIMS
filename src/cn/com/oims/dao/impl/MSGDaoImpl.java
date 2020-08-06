package cn.com.oims.dao.impl;

import cn.com.oims.dao.MSGDao;
import cn.com.oims.dao.pojo.MSG;
import cn.com.oims.dao.pojo.MSGAttachment;
import cn.com.oims.dao.pojo.MSGInbox;
import cn.com.oims.dao.pojo.MSGOutbox;
import cn.com.oims.dao.pojo.MSGReceiver;
import cn.com.oims.web.form.MSGSearchForm;
import cn.com.oims.web.form.UserSearchForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class MSGDaoImpl extends BaseDaoImpl implements MSGDao {
  @Override
  public Object getObj(Class class1, Serializable msgId) {
    return this.hibernateTemplate.get(class1, msgId);
  }
  
  @Override
  public void saveOrUpdate(Object object) {
    this.hibernateTemplate.saveOrUpdate(object);
  }
  
  @Override
  public boolean msgReceiverExists(Long id, String receiver, String model) {
    String hql = "select count(*) from MSGReceiver where msgId=" + id + " and receiver='" + receiver + "' and sendType='" + model + "'";
    return (count(hql) > 0);
  }
  
  @Override
  public List<MSGReceiver> findMSGReceivers(Long id) {
    String hql = " from MSGReceiver where msgId=" + id + " order by n";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public void deleteCollection(Collection list) {
    this.hibernateTemplate.deleteAll(list);
  }
  
  @Override
  public List<MSG> findDraftBox(Page page, MSGSearchForm form) {
    String hql = " from MSG m where m.send=false and m.insertUser='" + form.getUser() + "'";
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<MSG> findInBox(Page page, MSGSearchForm form) {
    String hql = " from MSG m, MSGInbox i where m.id = i.msgId and i.receiver='" + form.getUser() + "'";
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage("select m " + hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<MSG> findOutBox(Page page, MSGSearchForm form) {
    String hql = " from  MSG m, MSGOutbox o where m.id=o.msgId and o.gonghao='" + form.getUser() + "'";
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage("select m" + hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<MSG> findDeleteMSG(Page page, MSGSearchForm form) {
    String hql = " from (MSG m where m.del = true and m.insertUser='" + form.getUser() + "')";
    return null;
  }
  
  @Override
  public void deleteObj(Object msg) {
    this.hibernateTemplate.delete(msg);
  }
  
  @Override
  public MSGOutbox getMSGOutbox(String user, Long id) {
    String hql = " from MSGOutbox o where msgId=" + id + " and gonghao='" + user + "'";
    List<MSGOutbox> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public MSGOutbox getMSGOutboxByid(Long id) {
    String hql = " from MSGOutbox o where msgId=" + id;
    List<MSGOutbox> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public MSGInbox getMSGInbox(String user, Long id) {
    String hql = " from MSGInbox i where msgId=" + id + " and receiver='" + user + "'";
    List<MSGInbox> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public MSGInbox getMSGInboxByid(Long id) {
    String hql = " from MSGInbox i where msgId=" + id;
    List<MSGInbox> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public boolean msgExistsInOutbox(Long id) {
    String hql = "select count(*) from MSGOutbox o where msgId=" + id;
    return (count(hql) > 0);
  }
  
  @Override
  public boolean msgExistsInInbox(Long id) {
    String hql = "select count(*) from MSGInbox i where msgId=" + id;
    return (count(hql) > 0);
  }
  
  @Override
  public List<MSGAttachment> findMSGAttachment(Long id) {
    String hql = " from MSGAttachment where msgId=" + id;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<Map<String, Object>> findUser(UserSearchForm form, Page page) {
    StringBuffer h = new StringBuffer(" from YuanGong y where (y.leaveOffice=false or y.leaveOffice is null)");
    if (form.getOnline() != null) {
      if (form.getOnline().booleanValue()) {
        h.append(" and y.gonghao in(select u.gonghao from UserOnline o,User u where o.online=true and o.username=u.uid and u.gonghao=y.gonghao)");
      } else {
        h.append(" and y.gonghao not in(select u.gonghao from UserOnline o,User u where o.online=true and o.username=u.uid and u.gonghao=y.gonghao)");
      }
    }
    if (form.getXingming() != null && !form.getXingming().isEmpty()) {
      h.append("y.xingming like '%" + form.getXingming() + "%'");
    }
    String hql = h.toString();
    return this.hibernateTemplate.find("select new map(y.photo as photo,y.xingming as xingming,y.xingbie as xingbie,y.zhiwu as zhiwu, y.gonghao as gonghao)" + hql + " order by y.pinyin");
  }
  
  @Override
  public List<MSG> findMSG(Page page, String gonghao, String user) {
    String hql = "from MSG m, MSGOutbox o where m.id=o.msgId and o.deluser !=:user and o.insertDate<:date and ((o.gonghao=:user and m.id in(select r.msgId from MSGReceiver r where m.id=r.msgId and r.receiver=:gonghao))or (o.gonghao=:gonghao and m.id in(select r.msgId from MSGReceiver r where m.id=r.msgId and r.receiver=:user)))";
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("date", MultiUtils.getStartTimeOfDay());
    map.put("gonghao", gonghao);
    map.put("user", user);
    page.setRowsCount(Integer.valueOf(counts("select count(*)" + hql, map)));
    page.init();
    return getListForPage("select m " + hql + " order by o.insertDate desc", page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }
  
  @Override
  public List<MSG> findTodayMSG(String gonghao, String user) {
    String hql = "select m from MSG m, MSGOutbox o where m.id=o.msgId and o.deluser !=:user and o.insertDate>=:date and ((o.gonghao=:user and m.id in(select r.msgId from MSGReceiver r where m.id=r.msgId and r.receiver=:gonghao))or (o.gonghao=:gonghao and m.id in(select r.msgId from MSGReceiver r where m.id=r.msgId and r.receiver=:user)))";
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("date", MultiUtils.getStartTimeOfDay());
    map.put("gonghao", gonghao);
    map.put("user", user);
    return findList(String.valueOf(hql) + " order by o.insertDate", map);
  }
  
  @Override
  public List<Map<String, Object>> findMSGUserList(String user) {
    String hql = " from YuanGong y where y.gonghao in (select m.insertUser from MSGInbox i,MSG m where m.id=i.msgId and i.read=false and i.receiver='" + user + "')";
    return this.hibernateTemplate.find("select new map(y.photo as photo,y.xingming as xingming,y.xingbie as xingbie,y.zhiwu as zhiwu, y.gonghao as gonghao)" + hql + " order by y.pinyin");
  }
}
