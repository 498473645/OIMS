package cn.com.oims.service.impl;

import cn.com.oims.dao.IBaogaoXinxiDao;
import cn.com.oims.service.IBgXxService;
import com.codesnet.common.Page;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BgXxServiceImpl implements IBgXxService {
  IBaogaoXinxiDao dao = null;
  
  @Autowired
  public void setDao(IBaogaoXinxiDao dao) {
    this.dao = dao;
  }
  
  @Override
  public Map<String, Object> findBgXx4Page(Page p) {
    List list = this.dao.findBaogaoXinxiByPage(p);
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("list", list);
    map.put("page", p);
    return map;
  }
}
