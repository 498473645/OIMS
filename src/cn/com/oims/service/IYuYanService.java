package cn.com.oims.service;

import cn.com.oims.dao.pojo.YuYan;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IYuYanService {
  int countsOfYuYan();
  
  List<YuYan> findYuYansByPage(Page paramPage);
  
  List<YuYan> findAllYuYans();
  
  void deleteYuYanById(Serializable paramSerializable);
  
  Serializable saveYuYan(YuYan paramYuYan);
  
  void saveOrUpdateYuYan(YuYan paramYuYan);
  
  void updateYuYan(YuYan paramYuYan);
  
  YuYan findYuYanById(Serializable paramSerializable);
  
  YuYan findYuYanByIdAndFenLei(Integer paramInteger1, Integer paramInteger2);
  
  Map<String, Object> findAllYuYansByPageAndYuYan(Page paramPage, YuYan paramYuYan);
  
  void deleteYuYanByIdAndFenLei(Integer paramInteger1, Integer paramInteger2);
  
  List<YuYan> findAllYuYansByYuYan(YuYan paramYuYan);
  
  List<YuYan> findAllYuYansByIdsAndFenlei(String paramString, Integer paramInteger);
}
