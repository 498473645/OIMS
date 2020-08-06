package cn.com.oims.service;

import cn.com.oims.web.form.RevChgForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;

public interface IRevChangeService {
  List<Map<String, Object>> findRevChgByForm(Page paramPage, RevChgForm paramRevChgForm);
  
  void mrgRevChgByForm(RevChgForm paramRevChgForm);
  
  void mrgRevChgBatByForm(RevChgForm paramRevChgForm);
  
  int getReserveChgNumByResDateAndReprojId(int paramInt, String paramString1, String paramString2, Long paramLong);
}
