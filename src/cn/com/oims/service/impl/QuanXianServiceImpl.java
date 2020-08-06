package cn.com.oims.service.impl;

import cn.com.oims.common.CommonFunction;
import cn.com.oims.common.Utils;
import cn.com.oims.dao.IQuanXianDao;
import cn.com.oims.dao.IRoleDao;
import cn.com.oims.dao.IUserDao;
import cn.com.oims.dao.pojo.QuanXian;
import cn.com.oims.dao.pojo.Role;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.service.IQuanXianService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuanXianServiceImpl implements IQuanXianService {
  IQuanXianDao dao = null;
  
  IRoleDao roleDao = null;
  
  IUserDao userDao = null;
  
  public IUserDao getUserDao() {
    return this.userDao;
  }
  
  @Autowired
  public void setUserDao(IUserDao userDao) {
    this.userDao = userDao;
  }
  
  public IRoleDao getRoleDao() {
    return this.roleDao;
  }
  
  @Autowired
  public void setRoleDao(IRoleDao roleDao) {
    this.roleDao = roleDao;
  }
  
  public IQuanXianDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IQuanXianDao dao) {
    this.dao = dao;
  }
  
  public int countsOfQuanXian() {
    return this.dao.countsOfQuanXian();
  }
  
  public List<QuanXian> findQuanXiansByPage(Page page) {
    return this.dao.findQuanXiansByPage(page);
  }
  
  public List<QuanXian> findAllQuanXians() {
    return this.dao.findAllQuanXians();
  }
  
  public void deleteQuanXianById(Serializable id) {
    this.dao.deleteQuanXianById(id);
  }
  
  public Serializable saveQuanXian(QuanXian quanxian) {
    return this.dao.saveQuanXian(quanxian);
  }
  
  public void saveOrUpdateQuanXian(QuanXian quanxian) {
    this.dao.saveOrUpdateQuanXian(quanxian);
  }
  
  public void updateQuanXian(QuanXian quanxian) {
    this.dao.updateQuanXian(quanxian);
  }
  
  public QuanXian findQuanXianById(Serializable id) {
    return this.dao.findQuanXianById(id);
  }
  
  public List<Map<String, Object>> getMenuAndButtonByIds(String ids, Integer yuyan) {
    List<Map<String, Object>> list = this.dao.getMenuAndButtonByIds(ids, yuyan);
    return getMenuOrButton(Integer.valueOf(0), Integer.valueOf(0), list);
  }
  
  private List<Map<String, Object>> getMenuOrButton(Integer cdjb, Integer fatherId, List<Map<String, Object>> list) {
    List<Map<String, Object>> rl = new ArrayList<>();
    Iterator<Map<String, Object>> itr = list.iterator();
    while (itr.hasNext()) {
      Map<String, Object> m = itr.next();
      Integer mc = null;
      if (m.get("cdjb") != null)
        mc = (Integer)m.get("cdjb"); 
      Integer fId = (Integer)m.get("fatherId");
      if (((mc == null && cdjb == null) || (mc != null && mc.equals(cdjb))) && 
        fatherId.intValue() == fId.intValue()) {
        Map<String, Object> rm = new HashMap<>();
        rm.put("title", m.get("title"));
        rm.put("func", m.get("func"));
        rm.put("css", m.get("css"));
        rm.put("jsFileUrl", m.get("jsFileUrl"));
        rm.put("id", m.get("id"));
        rm.put("fatherId", m.get("fatherId"));
        Integer id = (Integer)m.get("id");
        if (mc != null) {
          List<Map<String, Object>> cl = getMenuOrButton(Integer.valueOf(cdjb.intValue() + 1), id, list);
          rm.put("child", cl);
          rm.put("buttons", getMenuOrButton(null, id, list));
        } 
        rl.add(rm);
      } 
    } 
    return rl;
  }
  
  public List<QuanXian> findQuanXianByUser(User u) {
    List<QuanXian> rt = new ArrayList<>();
    u = this.userDao.findUserById(u.getUid());
    Integer jiaoseId = u.getJiaose();
    String qxs = u.getQuanxian();
    List<Integer> userQx = null;
    if (jiaoseId != null && !jiaoseId.equals(""))
      getQuanXianByJiaoSe(jiaoseId, rt); 
    if (qxs != null && !qxs.equals("")) {
      userQx = new ArrayList<>();
      String[] qx = qxs.split(",");
      for (int i = 0; i < qx.length; i++)
        userQx.add(Integer.valueOf(Integer.parseInt(qx[i]))); 
      getQuanXianByArray(userQx, rt);
    } 
    remove(rt);
    return rt;
  }
  
  private void remove(List<QuanXian> rt) {
    for (int i = 0; i < rt.size(); i++) {
      for (int j = i + 1; j < rt.size(); j++) {
        if (((QuanXian)rt.get(i)).getId().intValue() == ((QuanXian)rt.get(j)).getId()
          .intValue())
          rt.remove(j); 
      } 
    } 
  }
  
  private void getQuanXianByArray(List<Integer> userQx, List<QuanXian> rt) {
    List<QuanXian> qxs = this.dao.findQuanXianByIds(userQx);
    for (int i = 0; i < qxs.size(); i++)
      rt.add(qxs.get(i)); 
  }
  
  private void getQuanXianByJiaoSe(Integer jiaoseId, List<QuanXian> rt) {
    Role r = this.roleDao.findRoleById(jiaoseId);
    String quanxian = r.getQuanxian();
    String[] qxs = quanxian.split(",");
    List<Integer> userQx = new ArrayList<>();
    for (int i = 0; i < qxs.length; i++)
      userQx.add(Integer.valueOf(Integer.parseInt(qxs[i]))); 
    getQuanXianByArray(userQx, rt);
  }
  
  public String userQuanxian(User user) {
    String quanxians = "-1";
    Role role = this.roleDao.findRoleById(user.getJiaose());
    if (user.getQuanxian() != null && !"".equals(user.getQuanxian()))
      quanxians = String.valueOf(quanxians) + "," + user.getQuanxian(); 
    if (role != null && role.getQuanxian() != null && 
      !"".equals(role.getQuanxian()))
      quanxians = String.valueOf(quanxians) + "," + role.getQuanxian(); 
    return quanxians;
  }
  
  public List<QuanXian> findQuanXianDif(String uid, User curentuser) {
    List<QuanXian> resut = new ArrayList<>();
    User u = this.userDao.findUserById(uid);
    if (u.getJiaose().intValue() == 0) {
      Role role = this.roleDao.findRoleById(curentuser.getJiaose());
      String quanxians = String.valueOf(role.getQuanxian()) + "," + 
        Utils.strNullDo(curentuser.getQuanxian());
      List<Integer> qxidLs = new ArrayList<>(0);
      byte b1;
      int j;
      String[] arrayOfString1;
      for (j = (arrayOfString1 = quanxians.split(",")).length, b1 = 0; b1 < j; ) {
        String s = arrayOfString1[b1];
        if (s != null && !"".equals(s))
          qxidLs.add(Integer.valueOf(s)); 
        b1++;
      } 
      for (QuanXian q : this.dao.findQuanXianByIds(qxidLs)) {
        if (q.getCdjb() == null)
          q.setCdjb(Integer.valueOf(3)); 
        resut.add(q);
      } 
      return resut;
    } 
    String uQxIds = String.valueOf(this.roleDao.findRoleById(u.getJiaose()).getQuanxian()) + 
      "," + ((u.getQuanxian() == null) ? "" : u.getQuanxian());
    String cuQxIds = 
      String.valueOf(this.roleDao.findRoleById(curentuser.getJiaose()).getQuanxian()) + 
      "," + (
      (curentuser.getQuanxian() == null) ? "" : u.getQuanxian());
    List<Integer> uQxIdsInt = new ArrayList<>(200);
    List<Integer> cuQxIdsInt = new ArrayList<>(200);
    byte b;
    int i;
    String[] arrayOfString;
    for (i = (arrayOfString = uQxIds.split(",")).length, b = 0; b < i; ) {
      String id = arrayOfString[b];
      if (id != null && !id.equals(""))
        uQxIdsInt.add(new Integer(id)); 
      b++;
    } 
    for (i = (arrayOfString = cuQxIds.split(",")).length, b = 0; b < i; ) {
      String id = arrayOfString[b];
      if (id != null && !id.equals(""))
        cuQxIdsInt.add(new Integer(id)); 
      b++;
    } 
    List<QuanXian> uQxS = this.dao.findQuanXianByIds(uQxIdsInt);
    List<QuanXian> cuQxS = this.dao.findQuanXianByIds(cuQxIdsInt);
    Map<Serializable, QuanXian> m = pojoListToMap(cuQxS);
    for (QuanXian q : uQxS)
      m.remove(q.getId()); 
    addFather(m, pojoListToMap(cuQxS));
    return mapToList(m);
  }
  
  private void addFather(Map<Serializable, QuanXian> m, Map<Serializable, QuanXian> cum) {
    Map<Serializable, QuanXian> m2 = m;
    try {
      byte b;
      int i;
      QuanXian[] arrayOfQuanXian;
      for (i = (arrayOfQuanXian = (QuanXian[])m2.values().toArray((Object[])new QuanXian[0])).length, b = 0; b < i; ) {
        QuanXian q = arrayOfQuanXian[b];
        if (q.getFatherId().intValue() != 0)
          m.put(q.getFatherId(), cum.get(q.getFatherId())); 
        b++;
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  private List<QuanXian> mapToList(Map<Serializable, QuanXian> m) {
    List<QuanXian> ls = new ArrayList<>(0);
    Iterator<QuanXian> its = m.values().iterator();
    while (its.hasNext())
      ls.add(its.next()); 
    return ls;
  }
  
  private Map<Serializable, QuanXian> pojoListToMap(List<QuanXian> ls) {
    Map<Serializable, QuanXian> m = new HashMap<>(0);
    for (QuanXian q : ls)
      m.put(q.getId(), q); 
    return m;
  }
  
  public List<QuanXian> findYuangonQuanXian(String ids, User currentUser) {
    Map<Integer, Integer> cuqxid = new HashMap<>(0);
    Role r = this.roleDao.findRoleById(currentUser.getJiaose());
    String cuqx = "";
    cuqx = String.valueOf(cuqx) + ((r == null) ? "" : r.getQuanxian());
    cuqx = String.valueOf(cuqx) + ",";
    cuqx = String.valueOf(cuqx) + Utils.strNullDo(currentUser.getQuanxian());
    byte b;
    int i;
    String[] arrayOfString1;
    for (i = (arrayOfString1 = cuqx.split(",")).length, b = 0; b < i; ) {
      String id = arrayOfString1[b];
      if (Utils.strIsNotEmpty(id))
        cuqxid.put(Integer.valueOf(id), Integer.valueOf(id)); 
      b++;
    } 
    List<Integer> idsInt = new ArrayList<>();
    String[] arrayOfString2;
    for (int j = (arrayOfString2 = ids.split(",")).length; i < j; ) {
      String id = arrayOfString2[i];
      if (id != null && !id.equals("") && 
        cuqxid.get(Integer.valueOf(id)) != null)
        idsInt.add(Integer.valueOf(id)); 
      i++;
    } 
    List<QuanXian> ls = this.dao.findQuanXianByIds(idsInt);
    return ls;
  }
  
  public String findQuanxianCUserAndSelectedUserDif(String uid, User currentUser) {
    String cuqxStr = 
      String.valueOf(this.roleDao.findRoleById(currentUser.getJiaose()).getQuanxian()) + 
      "," + 
      Utils.strNullDo(currentUser.getQuanxian());
    User user = this.userDao.findUserById(uid);
    String uqxStr = "";
    String difStr = "";
    if (currentUser.getJiaose() != user.getJiaose()) {
      if (user.getJiaose().intValue() != 0)
        uqxStr = String.valueOf(uqxStr) + this.roleDao.findRoleById(user.getJiaose())
          .getQuanxian(); 
      difStr = CommonFunction.filterStr(cuqxStr, uqxStr);
    } 
    return difStr;
  }
  
  public List<QuanXian> findCurentUserQuanxianDif(String uid, User currentUser) {
    String cuqxStr = 
      String.valueOf(this.roleDao.findRoleById(currentUser.getJiaose()).getQuanxian()) + 
      "," + 
      Utils.strNullDo(currentUser.getQuanxian());
    List<Integer> cuqxInts = new ArrayList<>(0);
    byte b1;
    int i;
    String[] arrayOfString1;
    for (i = (arrayOfString1 = cuqxStr.split(",")).length, b1 = 0; b1 < i; ) {
      String str = arrayOfString1[b1];
      if (str != null && !str.equals(""))
        cuqxInts.add(Integer.valueOf(str)); 
      b1++;
    } 
    List<QuanXian> cuqxList = this.dao.findQuanXianByIds(cuqxInts);
    Map<Integer, QuanXian> cuqxMap = new HashMap<>(0);
    Map<Integer, QuanXian> data = new HashMap<>(0);
    for (QuanXian tmp : cuqxList) {
      cuqxMap.put(tmp.getId(), tmp);
      data.put(tmp.getId(), tmp);
    } 
    User user = this.userDao.findUserById(uid);
    String uqxStr = "";
    if (user.getJiaose().intValue() != 0)
      uqxStr = String.valueOf(uqxStr) + this.roleDao.findRoleById(currentUser.getJiaose())
        .getQuanxian() + ","; 
    uqxStr = String.valueOf(uqxStr) + Utils.strNullDo(user.getQuanxian());
    List<Integer> uqxInts = new ArrayList<>(0);
    byte b2;
    int j;
    String[] arrayOfString2;
    for (j = (arrayOfString2 = uqxStr.split(",")).length, b2 = 0; b2 < j; ) {
      String str = arrayOfString2[b2];
      if (str != null && !str.equals(""))
        uqxInts.add(Integer.valueOf(str)); 
      b2++;
    } 
    List<QuanXian> uqxList = this.dao.findQuanXianByIds(uqxInts);
    Map<Integer, QuanXian> fatherQx = new HashMap<>(0);
    for (QuanXian tmp : uqxList)
      cuqxMap.remove(tmp.getId()); 
    Iterator<QuanXian> its = cuqxMap.values().iterator();
    while (its.hasNext()) {
      QuanXian qx = its.next();
      if (qx.getFatherId().intValue() == 0)
        continue; 
      QuanXian q = data.get(qx.getFatherId());
      fatherQx.put(q.getId(), q);
      if (q.getFatherId().intValue() != 0) {
        QuanXian q3 = data.get(q.getFatherId());
        fatherQx.put(q3.getId(), q3);
      } 
    } 
    cuqxMap.putAll(fatherQx);
    List<QuanXian> diff = new ArrayList<>(0);
    for (QuanXian q : cuqxMap.values())
      diff.add(q); 
    return diff;
  }
  
  public List<QuanXian> findCurLoginUserQuanXiangToNo1(User user) {
    Role role = this.roleDao.findRoleById(user.getJiaose());
    String quanxian_role = role.getQuanxian();
    String quanxian_user = user.getQuanxian();
    String quanxian_all = "-1";
    if (quanxian_role != null && !"".equals(quanxian_role))
      quanxian_all = String.valueOf(quanxian_all) + "," + quanxian_role; 
    if (quanxian_user != null && !"".equals(quanxian_user))
      quanxian_all = String.valueOf(quanxian_all) + "," + quanxian_user; 
    return this.dao.findCurLoginUserQuanXian(quanxian_all, 
        Integer.valueOf(0), Integer.valueOf(0));
  }
  
  public List<QuanXian> findCurLoginUserQuanXiangToNo2(Integer id, User user) {
    Role role = this.roleDao.findRoleById(user.getJiaose());
    String quanxian_role = role.getQuanxian();
    String quanxian_user = user.getQuanxian();
    String quanxian_all = "-1";
    if (quanxian_role != null && !"".equals(quanxian_role))
      quanxian_all = String.valueOf(quanxian_all) + "," + quanxian_role; 
    if (quanxian_user != null && !"".equals(quanxian_user))
      quanxian_all = String.valueOf(quanxian_all) + "," + quanxian_user; 
    return this.dao.findCurLoginUserQuanXian(quanxian_all, Integer.valueOf(1), id);
  }
  
  public List<QuanXian> findCurLoginUserQuanXiangToButton(Integer id, User user) {
    Role role = this.roleDao.findRoleById(user.getJiaose());
    String quanxian_role = role.getQuanxian();
    String quanxian_user = user.getQuanxian();
    String quanxian_all = "-1";
    if (quanxian_role != null && !"".equals(quanxian_role))
      quanxian_all = String.valueOf(quanxian_all) + "," + quanxian_role; 
    if (quanxian_user != null && !"".equals(quanxian_user))
      quanxian_all = String.valueOf(quanxian_all) + "," + quanxian_user; 
    return this.dao.findCurLoginUserQuanXian(quanxian_all, null, id);
  }
  
  public String findQuanXianNo1StrByQuanXianIds(String quanxianIds) {
    return this.dao.findQuanXianNo1StrByQuanXianIds(quanxianIds);
  }
}
