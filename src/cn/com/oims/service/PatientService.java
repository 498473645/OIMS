package cn.com.oims.service;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.web.form.PatientSearchForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;

public interface PatientService {
  HuanZheXinXi getPatientById(Long paramLong);
  
  List<Map<String, Object>> findPatients(Page paramPage, PatientSearchForm paramPatientSearchForm);
}
