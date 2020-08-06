package cn.com.oims.dao;

import cn.com.oims.dao.pojo.JcxmToHisItem;
import java.util.List;

public interface IJcxmToHisItemDao {
  List<JcxmToHisItem> getJcxmToHisItem(Integer paramInteger, String paramString);
  
  List<JcxmToHisItem> getJcxmToHisItem(String paramString);
  
  void save(JcxmToHisItem paramJcxmToHisItem);
}
