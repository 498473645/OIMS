package cn.com.oims.service;

import org.springframework.stereotype.Service;

@Service
public interface IOimsDataRecoverService {
  String recover(String paramString, String[] paramArrayOfString);
}
