package cn.com.oims.service.impl;

import cn.com.oims.dao.IWaterconfigDao;
import cn.com.oims.dao.pojo.Waterconfig;
import cn.com.oims.service.IWaterService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WaterServiceImpl implements IWaterService {
  @Autowired
  private IWaterconfigDao waterConfigDao;
  
  public Serializable add(Waterconfig waterconfig) {
    return this.waterConfigDao.add(waterconfig);
  }
  
  public Serializable deleteWaterconfigById(Serializable id) {
    return this.waterConfigDao.deleteWaterconfigById(id);
  }
  
  public Serializable update(Waterconfig waterconfig) {
    return this.waterConfigDao.update(waterconfig);
  }
  
  public List<Map<String, Object>> findAll(Waterconfig waterconfig, Page page) {
    List<Map<String, Object>> list = this.waterConfigDao.findAll(
        waterconfig, page);
    addXh(list, page);
    return list;
  }
  
  public Waterconfig getById(Serializable id) {
    return this.waterConfigDao.getById(id);
  }
  
  private void addXh(List<Map<String, Object>> list, Page page) {
    Iterator<Map<String, Object>> iterator = list.iterator();
    int i = (page.getCurrentPage().intValue() - 1) * page.getPageSize().intValue() + 1;
    while (iterator.hasNext()) {
      Map<String, Integer> map = (Map)iterator.next();
      map.put("xh", Integer.valueOf(i));
      i++;
    } 
  }
}
