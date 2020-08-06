package cn.com.oims.service;

import org.springframework.stereotype.Service;

@Service
public interface IOimsDatabackupService {
  String backup(String paramString, String[] paramArrayOfString);
}
