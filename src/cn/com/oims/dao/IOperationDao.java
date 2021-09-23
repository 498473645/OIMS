package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Operation;
import cn.com.oims.dao.pojo.OperationConsumable;
import cn.com.oims.dao.pojo.OperationDetail;
import cn.com.oims.dao.pojo.OperationDict;
import cn.com.oims.web.form.OperationConsumableSearchForm;
import cn.com.oims.web.form.OperationSearchForm;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface IOperationDao extends BaseDao {
  public static final int OPERATION_CONSUMABLE_CATEGORY_RGJT = 0;

  public static final int OPERATION_CONSUMABLE_CATEGORY_OTHER = 1;

  void saveOrUpdate(Object paramObject);

  List<OperationDict> findOperationDictList(String paramString, Page paramPage);

  OperationDict getOperationDict(Integer paramInteger);

  void delete(Object paramObject);

  Operation getOperation(Long paramLong);

  List<Map<String, Object>> findOperationList(Page paramPage, OperationSearchForm paramOperationSearchForm);

  boolean operationExists(Integer paramInteger);

  Map<String, Object> getOperationMap(String paramString);

  List<OperationDict> findOperationDict(String paramString);

  boolean patientOperationAppointmentExists(Long paramLong1, String[] paramArrayOfString, Long paramLong2);

  List<Operation> getOperation(Long paramLong1, Long paramLong2);

  List<OperationDetail> findOperationDetails(Long paramLong);

  void deleteAll(Collection paramCollection);

  List<Map<String, Object>> findOperationDetailsMap(Long paramLong);

  List<OperationConsumable> findOperationConsumable(Long paramLong);

  List<Map<String, Object>> findOperationConsumablePageList(OperationConsumableSearchForm paramOperationConsumableSearchForm, Page paramPage);

  List<Map<String, Object>> findOperationList(OperationSearchForm paramOperationSearchForm);

  /**
   * @Description: 根据分页查询对象、手术查询对象查询手术列表
   * @param page 分页查询对象
   * @param form 手术查询对象
   * @return
   * @author huxiaoqiang
   * @date 2019-12-16 09:21:20
   */
  public List<Map<String,Object>> findOperationListForIndex(Page page, OperationSearchForm form);
}
