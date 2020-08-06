package cn.com.oims.dao;

import cn.com.oims.dao.pojo.JcxmPertainItem;
import java.util.List;

public interface IJcxmPertainItemDao {
  List<JcxmPertainItem> getJcxmPertainItemsByJcxmId(Integer paramInteger1, Integer paramInteger2);
}
