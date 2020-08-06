package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Qingjiatiao;
import cn.com.oims.web.form.QingjiaSearchForm;
import com.codesnet.common.Page;
import java.util.List;

public interface IQingjiaDao extends BaseDao {
  Qingjiatiao getQingjiatiao(Long paramLong);
  
  void saveOrUpdateQingjiatiao(Qingjiatiao paramQingjiatiao);
  
  List<Qingjiatiao> findQingjiatiao(QingjiaSearchForm paramQingjiaSearchForm, Page paramPage);
  
  void deleteQingjiatiao(Qingjiatiao paramQingjiatiao);
}
