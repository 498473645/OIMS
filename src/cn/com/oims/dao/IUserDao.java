package cn.com.oims.dao;

import cn.com.oims.dao.pojo.User;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IUserDao extends BaseDao {
  int countsOfUser();
  
  List<User> findUsersByPage(Page paramPage);
  
  List<User> findAllUsers();
  
  void deleteUserById(Serializable paramSerializable);
  
  void deleteUser(User paramUser);
  
  Serializable saveUser(User paramUser);
  
  void saveOrUpdateUser(User paramUser);
  
  void updateUser(User paramUser);
  
  void updateUserByGonghao(User paramUser);
  
  User findUserById(Serializable paramSerializable);
  
  User findQiYongUserById(Serializable paramSerializable);
  
  User findUserByGh(String paramString);
  
  User findQiYongUserByGh(String paramString);
  
  List<Map<String, Object>> findAllUser4Page(Page paramPage, String paramString);
  
  void deleteUserByUid(String paramString);
  
  void deleteUserByIds(Serializable paramSerializable);
  
  List<Map<String, Object>> findAllUserByPage(Page paramPage);
  
  boolean isQuanXianToUser(String paramString1, String paramString2);
  
  boolean isExistUserToRoleId(Integer paramInteger);
  
  List<User> selectUsersByUser(User paramUser);
}
