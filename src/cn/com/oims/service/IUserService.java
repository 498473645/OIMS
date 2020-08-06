package cn.com.oims.service;

import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.Yhpz;
import cn.com.oims.web.form.UserForm;
import cn.com.oims.web.form.UserLoginForm;
import cn.com.oims.web.form.YuanGongForm;
import cn.com.oims.web.form.pwdResetForm;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IUserService {
  int countsOfUser();
  
  List<User> findUsersByPage(Page paramPage);
  
  List<User> findAllUsers();
  
  void deleteUserById(Serializable paramSerializable);
  
  String deleteUser(Serializable paramSerializable);
  
  void deleteUserByUid(String paramString);
  
  Serializable saveUser(User paramUser);
  
  void saveOrUpdateUser(User paramUser);
  
  void updateUser(User paramUser);
  
  User findUserById(Serializable paramSerializable);
  
  User userLogin(UserLoginForm paramUserLoginForm) throws Exception;
  
  User userSmallScreenLogin(UserLoginForm paramUserLoginForm) throws Exception;
  
  Map<String, Object> getUserData(String paramString);
  
  MyResult findUsersByPage(MyResult paramMyResult, String paramString, Page paramPage);
  
  User findUserByGongHao(String paramString);
  
  User findUserByUid(String paramString);
  
  void modifyUserPwd(pwdResetForm parampwdResetForm);
  
  String addUser(UserForm paramUserForm, YuanGongForm paramYuanGongForm, Yhpz paramYhpz);
  
  Object updateUser(UserForm paramUserForm, YuanGongForm paramYuanGongForm, String paramString);
  
  Object updateJiaose(UserForm paramUserForm, User paramUser);
  
  List<Map<String, Object>> findAllUserByPage(Page paramPage);
  
  boolean isQuanXianToUser(String paramString1, String paramString2);
  
  String updateQiYong(String paramString1, String paramString2);
  
  void qiYongUserByUid(String paramString);
  
  void jingYongUserByUid(String paramString);
  
  String updateUserQuanXian(String paramString1, String paramString2);
  
  boolean isExistUserToRoleId(Integer paramInteger);
  
  List<User> selectUsersByUser(User paramUser);
  
  boolean haveRight(String paramString, int[] paramArrayOfint);
}
