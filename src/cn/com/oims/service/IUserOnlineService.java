package cn.com.oims.service;

import cn.com.oims.dao.pojo.UserOnline;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;

public interface IUserOnlineService {
  int countsOfUserOnline();
  
  List<UserOnline> findUserOnlinesByPage(Page paramPage);
  
  List<UserOnline> findAllUserOnlines();
  
  void deleteUserOnlineById(Serializable paramSerializable);
  
  Serializable saveUserOnline(UserOnline paramUserOnline);
  
  void saveOrUpdateUserOnline(UserOnline paramUserOnline);
  
  void updateUserOnline(UserOnline paramUserOnline);
  
  UserOnline findUserOnlineById(Serializable paramSerializable);
}
