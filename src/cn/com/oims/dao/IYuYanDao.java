package cn.com.oims.dao;

import cn.com.oims.dao.pojo.YuYan;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IYuYanDao extends BaseDao {
  int countsOfYuYan();
  
  List<YuYan> findYuYansByPage(Page paramPage);
  
  List<YuYan> findAllYuYans();
  
  void deleteYuYanById(Serializable paramSerializable);
  
  Serializable saveYuYan(YuYan paramYuYan);
  
  void saveOrUpdateYuYan(YuYan paramYuYan);
  
  void updateYuYan(YuYan paramYuYan);
  
  YuYan findYuYanById(Serializable paramSerializable);
  
  YuYan findYuYanByIdAndFenLei(Integer paramInteger1, Integer paramInteger2);
  
  List findAllYuYansByPageAndYuYan(Page paramPage, YuYan paramYuYan);
  
  void deleteYuYanByIdAndFenLei(Integer paramInteger1, Integer paramInteger2);
  
  List<YuYan> findAllYuYansByYuYan(YuYan paramYuYan);
  
  List<YuYan> findAllYuYansByIdsAndFenlei(String paramString, Integer paramInteger);
}
