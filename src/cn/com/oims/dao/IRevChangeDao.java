package cn.com.oims.dao;

import cn.com.oims.dao.pojo.RevChange;
import cn.com.oims.web.form.RevChgForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IRevChangeDao {
  List<RevChange> getReserveChgNumByResDateAndReprojId(int paramInt, String paramString1, String paramString2, Long paramLong);
  
  List<Map<String, Object>> findRevChgByForm(Page paramPage, RevChgForm paramRevChgForm);
  
  Serializable saveRevChange(RevChange paramRevChange);
  
  void delRevChange(Serializable paramSerializable);
  
  RevChange getRevChangeByForm(RevChgForm paramRevChgForm);
}
