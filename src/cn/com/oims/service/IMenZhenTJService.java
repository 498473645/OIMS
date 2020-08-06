package cn.com.oims.service;

import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IMenZhenTJService {
  Map<String, Object> getPatientInfo(String paramString);
}
