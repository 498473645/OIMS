package cn.com.oims.service.impl;

import cn.com.oims.dao.IRevProjDao;
import cn.com.oims.dao.pojo.RevProj;
import cn.com.oims.service.IRevProjService;
import cn.com.oims.web.form.RevProjForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RevProjServiceImpl implements IRevProjService {
  @Autowired
  private IRevProjDao iRevProjDao;
  
  public List<Map<String, Object>> findRevProjByPage(Page page, RevProjForm form) {
    List<Map<String, Object>> list = this.iRevProjDao.findRevProjByPage(page, form);
    convert(page, list);
    return list;
  }
  
  public Serializable saveRevProj(RevProj t) {
    return this.iRevProjDao.saveRevProj(t);
  }
  
  public void updateRevProj(RevProj revProj) {
    this.iRevProjDao.updateRevProj(revProj);
  }
  
  public List<Map<String, Object>> findRevProjByUser(String uid) {
    return this.iRevProjDao.findRevProjByUser(uid);
  }
  
  public RevProj getRevProjById(Serializable id) {
    return this.iRevProjDao.getRevProjById(id);
  }
  
  public void delRevProjById(Serializable id) {
    this.iRevProjDao.delRevProjById(id);
  }
  
  public List<RevProj> getRevProjByBumenId(int bumenId) {
    return this.iRevProjDao.getRevProjByBumenId(bumenId);
  }
  
  private void convert(Page page, List list) {
    Iterator<Map> itr = list.iterator();
    int i = (page.getCurrentPage().intValue() - 1) * page.getPageSize().intValue() + 1;
    while (itr.hasNext()) {
      Map map = itr.next();
      map.put("paihao", Integer.valueOf(i));
      i++;
      if (map.get("opertm") != null) {
        String revdt = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(map.get("opertm"));
        map.put("opertm", revdt);
      } 
    } 
  }
}
