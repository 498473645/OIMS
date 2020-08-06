package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Manageitem;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;

public interface IManageItemDao extends BaseDao {
  int counts();
  
  List<Manageitem> findAllManageItem4Page(Page paramPage);
  
  List<Manageitem> findAllManageItem();
  
  void delManageItem(Serializable paramSerializable);
  
  Serializable saveManageItem(Manageitem paramManageitem);
  
  void saveOrUpdateManageItem(Manageitem paramManageitem);
  
  void updateManageItem(Manageitem paramManageitem);
  
  Manageitem findManageItemById(Serializable paramSerializable);
  
  List<Manageitem> findManageitemListByCategoryId(Integer paramInteger);
  
  List<Manageitem> findManageitemListNotIdByCategoryId(boolean paramBoolean, Long paramLong, Integer paramInteger);
  
  Manageitem getUserConfState(boolean paramBoolean, int paramInt);
}
