package cn.com.oims.dao;

import cn.com.oims.dao.pojo.EMRJcxmFushu;
import cn.com.oims.dao.pojo.EMROrder;
import cn.com.oims.dao.pojo.EMROrderDetail;
import java.util.List;

public interface IEMROrderDao extends BaseDao {

  /**
   * @description:根据id查询EMROrder数据
   * @param paramLong
   * @return:
   * @author: Mason
   * @time: 2020/5/9 17:36
   */
  EMROrder getEMROrder(Long paramLong);
  
  Long saveOrder(EMROrder paramEMROrder);
  
  EMRJcxmFushu getEMRJcxmFushu(Integer paramInteger);
  
  List<EMROrderDetail> findOrderDetails(Long paramLong);
  
  void updateOrderDetail(EMROrderDetail paramEMROrderDetail);
  
  Long saveOrderDetail(EMROrderDetail paramEMROrderDetail);
  
  void deleteOrderDetail(List<EMROrderDetail> paramList);
  
  void updateOrder(EMROrder paramEMROrder);
  
  List<EMROrder> findOrders(Long paramLong, Integer paramInteger1, Integer paramInteger2);
  
  List<EMROrder> findOrders(Long paramLong, Integer paramInteger);
  
  void deleteOrder(EMROrder paramEMROrder);
  
  String getEMROrder(Integer paramInteger, Long paramLong);
  
  EMROrder findEMROrderByJcxmidAndJiuzhenid(Long paramLong, Integer paramInteger);
}
