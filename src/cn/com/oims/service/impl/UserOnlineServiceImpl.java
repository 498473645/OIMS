package cn.com.oims.service.impl;

import cn.com.oims.dao.IUserOnlineDao;
import cn.com.oims.dao.pojo.UserOnline;
import cn.com.oims.service.IUserOnlineService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserOnlineServiceImpl implements IUserOnlineService {
  IUserOnlineDao dao = null;
  
  public IUserOnlineDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IUserOnlineDao dao) {
    this.dao = dao;
  }
  
  public int countsOfUserOnline() {
    return this.dao.countsOfUserOnline();
  }
  
  public List<UserOnline> findUserOnlinesByPage(Page page) {
    return this.dao.findUserOnlinesByPage(page);
  }
  
  public List<UserOnline> findAllUserOnlines() {
    return this.dao.findAllUserOnlines();
  }
  
  public void deleteUserOnlineById(Serializable id) {
    this.dao.deleteUserOnlineById(id);
  }
  
  public Serializable saveUserOnline(UserOnline useronline) {
    return this.dao.saveUserOnline(useronline);
  }
  
  public void saveOrUpdateUserOnline(UserOnline useronline) {
    this.dao.saveOrUpdateUserOnline(useronline);
  }
  
  public void updateUserOnline(UserOnline useronline) {
    this.dao.updateUserOnline(useronline);
  }
  
  public UserOnline findUserOnlineById(Serializable id) {
    return this.dao.findUserOnlineById(id);
  }
}
