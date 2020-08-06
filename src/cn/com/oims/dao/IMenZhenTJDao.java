package cn.com.oims.dao;

import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public interface IMenZhenTJDao {
  Map<String, Object> getPatientInfo(String paramString);
}
