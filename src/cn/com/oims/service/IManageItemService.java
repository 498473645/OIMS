package cn.com.oims.service;

import cn.com.oims.dao.pojo.Manageitem;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IManageItemService {
  Manageitem getManageitemById(Serializable paramSerializable);
  
  Serializable saveManageitem(Manageitem paramManageitem);
  
  void delManageitemById(Serializable paramSerializable);
  
  void saveOrUpdateManageitem(Manageitem paramManageitem);
  
  void updateManageitem(Manageitem paramManageitem);
  
  List<Manageitem> findAllManageitem();
  
  Map<String, Object> findAllManageitem4Page(Page paramPage);
  
  List<Manageitem> findManageitemListByCategoryId(Integer paramInteger);
  
  void updateManageitemState(boolean paramBoolean, Long paramLong);
  
  void updateManageitemVals(Integer paramInteger, Long paramLong);
  
  void updateUserConfState(boolean paramBoolean, Long paramLong, int paramInt);
  
  Manageitem getUserConfState(boolean paramBoolean, int paramInt);
  
  Manageitem updateManageitemVals(Manageitem paramManageitem);
  
  Manageitem updateManageitemState(Manageitem paramManageitem);
}
