package cn.com.oims.service.impl;

import cn.com.oims.common.BeanCopyUtils;
import cn.com.oims.common.Utils;
import cn.com.oims.dao.IUserDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.UserOnline;
import cn.com.oims.dao.pojo.Yhpz;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IQuanXianService;
import cn.com.oims.service.IUserOnlineService;
import cn.com.oims.service.IUserService;
import cn.com.oims.service.IYhpzService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.UserForm;
import cn.com.oims.web.form.UserLoginForm;
import cn.com.oims.web.form.YuanGongForm;
import cn.com.oims.web.form.pwdResetForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {
  public static String success = "success";
  
  private IUserDao dao = null;
  
  private IQuanXianService quanxianService;
  
  private IYhpzService yhpzService;
  
  private IUserOnlineService userOnlineService;
  
  private IYuanGongService yuangongService;
  
  private IYuanGongDao yuangongDao;
  
  @Autowired
  public void setYuangongDao(IYuanGongDao yuangongDao) {
    this.yuangongDao = yuangongDao;
  }
  
  @Autowired
  public void setUserOnlineService(IUserOnlineService userOnlineService) {
    this.userOnlineService = userOnlineService;
  }
  
  @Autowired
  public void setYhpzService(IYhpzService yhpzService) {
    this.yhpzService = yhpzService;
  }
  
  @Autowired
  public void setQuanxianService(IQuanXianService quanxianService) {
    this.quanxianService = quanxianService;
  }
  
  @Autowired
  public void setDao(IUserDao dao) {
    this.dao = dao;
  }
  
  @Autowired
  public void setYuangongService(IYuanGongService yuangongService) {
    this.yuangongService = yuangongService;
  }
  
  public int countsOfUser() {
    return this.dao.countsOfUser();
  }
  
  public List<User> findUsersByPage(Page page) {
    return this.dao.findUsersByPage(page);
  }
  
  public List<User> findAllUsers() {
    return this.dao.findAllUsers();
  }
  
  public void deleteUserById(Serializable id) {
    User u = this.dao.findUserById(id);
    this.dao.deleteUser(u);
  }
  
  public Serializable saveUser(User user) {
    return this.dao.saveUser(user);
  }
  
  public void saveOrUpdateUser(User user) {
    this.dao.saveOrUpdateUser(user);
  }
  
  public void updateUser(User user) {
    this.dao.updateUser(user);
  }
  
  public User findUserById(Serializable id) {
    return this.dao.findUserById(id);
  }
  
  public User userLogin(UserLoginForm usf) throws Exception {
    User user = null;
    if (usf.getLoginType() == 1) {
      user = this.dao.findQiYongUserByGh(usf.getInput());
    } else {
      user = this.dao.findQiYongUserById(usf.getInput());
    } 
    if (user != null)
      if (user.getPassword().equals((
          new MultiUtils()).getPasswordString(usf.getPwd()))) {
        UserOnline uo = this.userOnlineService.findUserOnlineById(user.getUid());
        if (uo != null) {
          uo.setLoginCount(Integer.valueOf(uo.getLoginCount().intValue() + 1));
          uo.setLoginTime(new Date());
          uo.setVisitTime(new Date());
          uo.setOnline(true);
          uo.setIp(usf.getIp());
          this.userOnlineService.updateUserOnline(uo);
        } else {
          uo = new UserOnline();
          uo.setLoginCount(Integer.valueOf(1));
          uo.setOnline(true);
          uo.setVisitTime(new Date());
          uo.setLoginTime(new Date());
          uo.setUsername(user.getUid());
          uo.setIp(usf.getIp());
          this.userOnlineService.saveUserOnline(uo);
        } 
        return user;
      }  
    return null;
  }
  
  public User userSmallScreenLogin(UserLoginForm usf) throws Exception {
    User user = null;
    if (usf.getLoginType() == 1) {
      user = this.dao.findQiYongUserByGh(usf.getInput());
    } else {
      user = this.dao.findQiYongUserById(usf.getInput());
    } 
    if (user != null)
      if (user.getPassword().equals((
          new MultiUtils()).getPasswordString(usf.getPwd()))) {
        UserOnline uo = this.userOnlineService
          .findUserOnlineById(user.getUid());
        if (uo != null) {
          uo.setLoginCount(Integer.valueOf(uo.getLoginCount().intValue() + 1));
          uo.setLoginTime(new Date());
          uo.setVisitTime(new Date());
          uo.setOnline(true);
          uo.setIp(usf.getIp());
          this.userOnlineService.updateUserOnline(uo);
        } else {
          uo = new UserOnline();
          uo.setLoginCount(Integer.valueOf(1));
          uo.setOnline(true);
          uo.setVisitTime(new Date());
          uo.setLoginTime(new Date());
          uo.setUsername(user.getUid());
          uo.setIp(usf.getIp());
          this.userOnlineService.saveUserOnline(uo);
        } 
        return user;
      }  
    return null;
  }
  
  public Map<String, Object> getUserData(String uid) {
    User user = this.dao.findUserById(uid);
    Map<String, Object> map = new HashMap<>();
    map.put("uid", user.getUid());
    map.put("role", user.getJiaose());
    map.put("gonghao", user.getGonghao());
    map.put("permission", user.getQuanxian());
    Yhpz config = this.yhpzService.findYhpzById(user.getGonghao());
    map.put("userConfig", config);
    String ql = this.quanxianService.userQuanxian(user);
    map.put("menuData", 
        this.quanxianService.getMenuAndButtonByIds(ql, 
          config.getYuyan()));
    String[] gonghao = user.getGonghao().split(",");
    List<YuanGong> list = new ArrayList<>();
    byte b;
    int i;
    String[] arrayOfString1;
    for (i = (arrayOfString1 = gonghao).length, b = 0; b < i; ) {
      String g = arrayOfString1[b];
      YuanGong yg = this.yuangongService.obtainYuanGongByGonghao(g);
      if (yg != null)
        list.add(yg); 
      b++;
    } 
    map.put("staff", list);
    return map;
  }
  
  public MyResult findUsersByPage(MyResult mr, String key, Page p) {
    List<Map<String, Object>> ls = this.dao.findAllUser4Page(p, key);
    Map<String, Object> r = new HashMap<>(0);
    r.put("list", ls);
    r.put("page", p);
    mr.setObj(r);
    return mr;
  }
  
  public User findUserByGongHao(String gonghao) {
    return this.dao.findUserByGh(gonghao);
  }
  
  public User findUserByUid(String uid) {
    return this.dao.findUserById(uid);
  }
  
  public void modifyUserPwd(pwdResetForm uf) {
    User u = this.dao.findUserById(uf.getUid());
    String newPwd = (new MultiUtils()).getPasswordString(uf.getNewPwd());
    u.setPassword(newPwd);
    this.dao.updateUser(u);
  }
  
  public String addUser(UserForm uf, YuanGongForm yf, Yhpz yhpz) {
    User user = new User();
    BeanCopyUtils.copyProperties(uf, user);
    user.setEmail(Utils.strNullDo(user.getEmail(), ""));
    user.setJishu(Integer.valueOf((user.getJishu() == null) ? 0 : user.getJishu().intValue()));
    user.setPassword((new MultiUtils()).getPasswordString(uf.getPassword()));
    user.setQiyong(true);
    this.dao.saveUser(user);
    if (yf != null && yf.getXingming() != null) {
      YuanGong yuangong = new YuanGong();
      BeanCopyUtils.copyProperties(yf, yuangong);
      YuanGong yuangongselect = this.yuangongDao
        .obtainYuanGongByGonghao(yf.getGonghao());
      if (yuangongselect == null) {
        this.yuangongDao.saveYuanGong(yuangong);
      } else {
        yuangong.setId(yuangongselect.getId());
        this.yuangongDao.updateYuanGong(yuangong);
      } 
    } 
    this.yhpzService.saveOrUpdateYhpz(yhpz);
    return success;
  }
  
  public Object updateUser(UserForm uf, YuanGongForm yf, String ygdetail) {
    User user = this.dao.findUserByGh(uf.getGonghao());
    user.setUid(uf.getUid());
    user.setEmail(uf.getEmail());
    user.setJiaose(Integer.valueOf(Integer.parseInt(uf.getJiaose())));
    this.dao.updateUserByGonghao(user);
    if (yf != null && yf.getXingming() != null) {
      YuanGong yuangong = new YuanGong();
      BeanCopyUtils.copyProperties(yf, yuangong);
      YuanGong yuangongselect = this.yuangongDao
        .obtainYuanGongByGonghao(yf.getGonghao());
      if (yuangongselect == null) {
        this.yuangongDao.saveYuanGong(yuangong);
      } else {
        yuangong.setId(yuangongselect.getId());
        this.yuangongDao.updateYuanGong(yuangong);
      } 
    } 
    return success;
  }
  
  public Object updateJiaose(UserForm uf, User currentUser) {
    User u = this.dao.findUserById(uf.getUid());
    u.setJiaose(Integer.valueOf(uf.getJiaose()));
    this.dao.updateUser(u);
    return success;
  }
  
  public void deleteUserByUid(String uid) {
    User u = this.dao.findUserById(uid);
    this.dao.deleteUser(u);
  }
  
  public String deleteUser(Serializable id) {
    User u = this.dao.findUserById(id);
    this.dao.deleteUser(u);
    return success;
  }
  
  public boolean isQuanXianToUser(String gonghao, String qxId) {
    return this.dao.isQuanXianToUser(gonghao, qxId);
  }
  
  public List<Map<String, Object>> findAllUserByPage(Page page) {
    List<Map<String, Object>> list = this.dao.findAllUserByPage(page);
    convert(page, list);
    return list;
  }
  
  private void convert(Page page, List list) {
    Iterator<Map> iterator = list.iterator();
    int i = (page.getCurrentPage().intValue() - 1) * page.getPageSize().intValue() + 1;
    while (iterator.hasNext()) {
      Map<String, Integer> map = iterator.next();
      map.put("paihao", Integer.valueOf(i));
      i++;
    } 
  }
  
  public String updateQiYong(String qyUId, String qy) {
    boolean b = false;
    if (qy != null && qy.equals("1"))
      b = true; 
    User u = this.dao.findUserById(qyUId);
    u.setQiyong(b);
    this.dao.updateUser(u);
    return success;
  }
  
  public void qiYongUserByUid(String qyUId) {
    User u = this.dao.findUserById(qyUId);
    u.setQiyong(true);
    this.dao.updateUser(u);
  }
  
  public void jingYongUserByUid(String qyUId) {
    User u = this.dao.findUserById(qyUId);
    u.setQiyong(false);
    this.dao.updateUser(u);
  }
  
  public String updateUserQuanXian(String qyUId, String qy) {
    User u = findUserById(qyUId);
    u.setQuanxian(qy);
    this.dao.updateUser(u);
    return success;
  }
  
  public boolean isExistUserToRoleId(Integer jiaoseId) {
    return this.dao.isExistUserToRoleId(jiaoseId);
  }
  
  public List<User> selectUsersByUser(User user) {
    return this.dao.selectUsersByUser(user);
  }
  
  public boolean haveRight(String gonghao, int[] rights) {
    boolean x = true;
    byte b;
    int i, arrayOfInt[];
    for (i = (arrayOfInt = rights).length, b = 0; b < i; ) {
      int j = arrayOfInt[b];
      x = this.dao.isQuanXianToUser(gonghao, (new StringBuilder(String.valueOf(j))).toString());
      if (!x)
        break; 
      b++;
    } 
    return x;
  }
}
