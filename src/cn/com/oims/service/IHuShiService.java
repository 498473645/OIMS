package cn.com.oims.service;

import com.codesnet.common.Page;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IHuShiService {
  Map<String, Object> findAllYanYaByPage(Page paramPage);
}
