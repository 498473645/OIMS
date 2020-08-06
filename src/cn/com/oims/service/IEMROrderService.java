package cn.com.oims.service;

import cn.com.oims.dao.pojo.EMROrder;
import cn.com.oims.dao.pojo.EMROrderDetail;
import cn.com.oims.web.form.EMROrderForm;
import cn.com.oims.webservice.pojo.exam.ExamResult;
import cn.com.oims.webservice.pojo.lis.TestResult;
import java.util.List;
import java.util.Map;

public interface IEMROrderService {
  public static final Integer ORDER_JIFEI_FLAG_WJF = Integer.valueOf(0);
  
  public static final Integer ORDER_JIFEI_FLAG_YJF = Integer.valueOf(1);
  
  public static final Integer ORDER_JIFEI_FLAG_YTF = Integer.valueOf(-1);
  
  List<Map<String, Object>> saveOrder(List<EMROrderForm> paramList, Long paramLong1, Long paramLong2, String paramString, boolean paramBoolean);
  
  List<Map<String, Object>> findOrders(Long paramLong, Integer paramInteger1, Integer paramInteger2);
  
  void deleteOrders(String paramString);
  
  List<EMROrderDetail> findOrderDetails(Long paramLong);
  
  void deleteAllOrderByCategory(Integer paramInteger, Long paramLong1, Long paramLong2, String paramString);
  
  void saveOrUpdateSpecialTreat(Long paramLong, Integer paramInteger);
  
  String getExamAppointsNo(Integer paramInteger, Long paramLong);
  
  Map<String, Object> getZYSX(Integer paramInteger1, Long paramLong, Integer paramInteger2, Integer paramInteger3);
  
  ExamResult getExamReport(String paramString);
  
  String getExamNo(String paramString);
  
  List<TestResult> getLisReport(String paramString);
  
  void updateTreatResult(Long paramLong, String paramString);
  
  EMROrder findEMROrderByJcxmidAndJiuzhenid(Long paramLong, Integer paramInteger);
  
  int setOrderPrintQuantity(Long paramLong, EMROrderForm paramEMROrderForm);
  
  void deleteEMROrders(Long paramLong, Integer paramInteger);

  /**
   * @description:根据id查询EMROrder数据
   * @param id
   * @return:
   * @author: Mason
   * @time: 2020/5/9 17:36
   */
  EMROrder getEMROrder(Long id);

  /**
   * @description:根据EMROrder查询该检查单在HIS/LIS上的缴费状态
   * @param order
   * @return:
   * @author: Mason
   * @time: 2020/5/9 18:09
   */
  boolean checkOrderHisJiFeiStatus(EMROrder order);
}
