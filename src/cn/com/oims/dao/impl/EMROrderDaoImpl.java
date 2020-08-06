package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEMROrderDao;
import cn.com.oims.dao.pojo.EMRJcxmFushu;
import cn.com.oims.dao.pojo.EMROrder;
import cn.com.oims.dao.pojo.EMROrderDetail;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EMROrderDaoImpl extends BaseDaoImpl implements IEMROrderDao {
  public EMROrder getEMROrder(Long id) {
    return (EMROrder)this.hibernateTemplate.get(EMROrder.class, id);
  }
  
  public Long saveOrder(EMROrder order) {
    return (Long)this.hibernateTemplate.save(order);
  }
  
  public EMRJcxmFushu getEMRJcxmFushu(Integer id) {
    return (EMRJcxmFushu)this.hibernateTemplate.get(EMRJcxmFushu.class, id);
  }
  
  public List<EMROrderDetail> findOrderDetails(Long orderId) {
    List<EMROrderDetail> list = this.hibernateTemplate.find("from EMROrderDetail where orderId=" + orderId);
    return list;
  }
  
  public void updateOrderDetail(EMROrderDetail o) {
    this.hibernateTemplate.update(o);
  }
  
  public Long saveOrderDetail(EMROrderDetail d) {
    return (Long)this.hibernateTemplate.save(d);
  }
  
  public void deleteOrderDetail(List<EMROrderDetail> oldDl) {
    this.hibernateTemplate.deleteAll(oldDl);
  }
  
  public void updateOrder(EMROrder order) {
    this.hibernateTemplate.update(order);
  }
  
  public List<EMROrder> findOrders(Long jiuzhenId, Integer categoryId, Integer jifeiFlag) {
    String hql = "from EMROrder where jiuzhenId=" + jiuzhenId;
    if (categoryId != null)
      hql = String.valueOf(hql) + " and categoryId=" + categoryId; 
    if (jifeiFlag != null)
      hql = String.valueOf(hql) + " and jifeiFlag=" + jifeiFlag; 
    List<EMROrder> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  public List<EMROrder> findOrders(Long jiuzhenId, Integer categoryId) {
    String hql = "from EMROrder where jiuzhenId=" + jiuzhenId;
    if (categoryId != null)
      hql = String.valueOf(hql) + " and categoryId=" + categoryId; 
    List<EMROrder> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  public void deleteOrder(EMROrder emrOrder) {
    this.hibernateTemplate.delete(emrOrder);
  }
  
  public String getEMROrder(Integer jcxmId, Long jiuzhenId) {
    String hql = "from EMROrder where jcxmId=" + jcxmId + " and jiuzhenId=" + jiuzhenId;
    List<EMROrder> orders = this.hibernateTemplate.find(hql);
    return (orders != null && orders.size() > 0) ? ((EMROrder)orders.get(0)).getOrderNo() : null;
  }
  
  public EMROrder findEMROrderByJcxmidAndJiuzhenid(Long jiuzhenId, Integer jcxmId) {
    String hql = "from EMROrder where jcxmId=" + jcxmId + " and jiuzhenId=" + jiuzhenId;
    List<EMROrder> orders = this.hibernateTemplate.find(hql);
    return (orders != null && orders.size() > 0) ? orders.get(0) : null;
  }
}
