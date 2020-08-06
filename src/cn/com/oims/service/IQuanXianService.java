package cn.com.oims.service;

import cn.com.oims.dao.pojo.QuanXian;
import cn.com.oims.dao.pojo.User;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IQuanXianService {
  int countsOfQuanXian();
  
  Serializable saveQuanXian(QuanXian paramQuanXian);
  
  void saveOrUpdateQuanXian(QuanXian paramQuanXian);
  
  void updateQuanXian(QuanXian paramQuanXian);
  
  void deleteQuanXianById(Serializable paramSerializable);
  
  List<Map<String, Object>> getMenuAndButtonByIds(String paramString, Integer paramInteger);
  
  List<QuanXian> findQuanXiansByPage(Page paramPage);
  
  List<QuanXian> findAllQuanXians();
  
  QuanXian findQuanXianById(Serializable paramSerializable);
  
  String userQuanxian(User paramUser);
  
  List<QuanXian> findQuanXianByUser(User paramUser);
  
  List<QuanXian> findQuanXianDif(String paramString, User paramUser);
  
  List<QuanXian> findYuangonQuanXian(String paramString, User paramUser);
  
  String findQuanxianCUserAndSelectedUserDif(String paramString, User paramUser);
  
  Object findCurentUserQuanxianDif(String paramString, User paramUser);
  
  List<QuanXian> findCurLoginUserQuanXiangToNo1(User paramUser);
  
  List<QuanXian> findCurLoginUserQuanXiangToNo2(Integer paramInteger, User paramUser);
  
  List<QuanXian> findCurLoginUserQuanXiangToButton(Integer paramInteger, User paramUser);
  
  String findQuanXianNo1StrByQuanXianIds(String paramString);
}
