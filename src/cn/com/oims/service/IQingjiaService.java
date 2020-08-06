package cn.com.oims.service;

import cn.com.oims.dao.pojo.Qingjiatiao;
import cn.com.oims.web.form.QingjiaSearchForm;
import cn.com.oims.web.form.QingjiatiaoForm;
import com.codesnet.common.Page;
import java.util.Map;

public interface IQingjiaService {
  void saveOrUpdateQingjiatiao(QingjiatiaoForm paramQingjiatiaoForm, String paramString);
  
  Qingjiatiao getQingjiatiao(Long paramLong);
  
  Map<String, Object> findQingjiatiao(QingjiaSearchForm paramQingjiaSearchForm, Page paramPage);
  
  void setQingjiatiaoState(Long paramLong, int paramInt, String paramString);
  
  void deleteQingjiatiao(Long paramLong, String paramString);
}
