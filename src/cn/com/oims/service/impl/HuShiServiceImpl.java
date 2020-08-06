package cn.com.oims.service.impl;

import cn.com.oims.dao.IHuShiDao;
import cn.com.oims.service.IHuShiService;
import com.codesnet.common.Page;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HuShiServiceImpl implements IHuShiService {
  IHuShiDao dao = null;
  
  public IHuShiDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IHuShiDao dao) {
    this.dao = dao;
  }
  
  public Map<String, Object> findAllYanYaByPage(Page p) {
    Map<String, Object> m = new HashMap<>();
    m.put("list", this.dao.findAllYanYaByPage(p));
    m.put("page", p);
    return m;
  }
}
