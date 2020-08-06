package cn.com.oims.service;

import cn.com.oims.dao.pojo.Waterconfig;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IWaterService {
  Serializable add(Waterconfig paramWaterconfig);
  
  Serializable deleteWaterconfigById(Serializable paramSerializable);
  
  Serializable update(Waterconfig paramWaterconfig);
  
  List<Map<String, Object>> findAll(Waterconfig paramWaterconfig, Page paramPage);
  
  Waterconfig getById(Serializable paramSerializable);
}
