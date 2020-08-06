package cn.com.oims.dao;

import cn.com.oims.dao.pojo.QuanXian;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IQuanXianDao extends BaseDao {
  int countsOfQuanXian();
  
  List<QuanXian> findQuanXiansByPage(Page paramPage);
  
  List<QuanXian> findAllQuanXians();
  
  void deleteQuanXianById(Serializable paramSerializable);
  
  Serializable saveQuanXian(QuanXian paramQuanXian);
  
  void saveOrUpdateQuanXian(QuanXian paramQuanXian);
  
  void updateQuanXian(QuanXian paramQuanXian);
  
  QuanXian findQuanXianById(Serializable paramSerializable);
  
  List<Map<String, Object>> getMenuAndButtonByIds(String paramString, Integer paramInteger);
  
  List<QuanXian> findQuanXianByIds(List<Integer> paramList);
  
  List<QuanXian> findCurLoginUserQuanXian(String paramString, Integer paramInteger1, Integer paramInteger2);
  
  String findQuanXianNo1StrByQuanXianIds(String paramString);
}
