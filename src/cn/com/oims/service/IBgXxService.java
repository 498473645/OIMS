package cn.com.oims.service;

import com.codesnet.common.Page;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IBgXxService {
  Map<String, Object> findBgXx4Page(Page paramPage);
}
