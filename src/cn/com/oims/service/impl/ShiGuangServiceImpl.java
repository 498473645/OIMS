package cn.com.oims.service.impl;

import cn.com.oims.dao.IJzjlDao;
import cn.com.oims.dao.IShiGuangDao;
import cn.com.oims.dao.pojo.Eyejmspjs;
import cn.com.oims.dao.pojo.Eyeygnew;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.SgBlfy;
import cn.com.oims.dao.pojo.SgCcdj;
import cn.com.oims.dao.pojo.SgDpjl;
import cn.com.oims.dao.pojo.SgFcjl;
import cn.com.oims.dao.pojo.SgQjd;
import cn.com.oims.dao.pojo.Sgbl;
import cn.com.oims.service.IShiGuangService;
import cn.com.oims.web.form.SgZkjcForm;
import com.codesnet.common.Page;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShiGuangServiceImpl implements IShiGuangService {
  @Autowired
  private IShiGuangDao shiGuangDao;
  
  @Autowired
  private IJzjlDao jzjlDao;
  
  public void saveSgbl(Sgbl sgbl) {
    this.shiGuangDao.saveSgbl(sgbl);
  }
  
  public void updateSgbl(Sgbl sgbl) {
    this.shiGuangDao.updateSgbl(sgbl);
  }
  
  public Sgbl getSgblById(Long id) {
    return this.shiGuangDao.getSgblById(id);
  }
  
  public Map<String, Object> findSgbl4page(Page page, String blh) {
    Map<String, Object> m = new HashMap<>();
    List list = this.shiGuangDao.findSgbl4page(page, blh);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public Sgbl getLastSgbl(String blh) {
    List<Sgbl> list = this.shiGuangDao.findSgbl(blh);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public void saveSgCcdj(SgCcdj ccdj) {
    this.shiGuangDao.saveSgCcdj(ccdj);
  }
  
  public void updateSgCcdj(SgCcdj ccdj) {
    this.shiGuangDao.updateSgCcdj(ccdj);
  }
  
  public SgCcdj getSgCcdjById(Long id) {
    return this.shiGuangDao.getSgCcdjById(id);
  }
  
  public SgCcdj getSgCcdjByBlbh(Long blbh) {
    return this.shiGuangDao.getSgCcdjByBlbh(blbh);
  }
  
  public Map<String, Object> findSgCcdj4page(Page page, Long bl_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.shiGuangDao.findSgCcdj4page(page, bl_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public void saveSgDpjl(SgDpjl dpjl) {
    this.shiGuangDao.saveSgDpjl(dpjl);
  }
  
  public void updateSgDpjl(SgDpjl dpjl) {
    this.shiGuangDao.updateSgDpjl(dpjl);
  }
  
  public SgDpjl getSgDpjlById(Long id) {
    return this.shiGuangDao.getSgDpjlById(id);
  }
  
  public SgDpjl getSgDpjlByBlbh(Long blbh) {
    return this.shiGuangDao.getSgDpjlByBlbh(blbh);
  }
  
  public Map<String, Object> findSgDpjl4page(Page page, Long bl_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.shiGuangDao.findSgDpjl4page(page, bl_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public void saveSgQjd(SgQjd qjd) {
    this.shiGuangDao.saveSgQjd(qjd);
  }
  
  public void updateSgQjd(SgQjd qjd) {
    this.shiGuangDao.updateSgQjd(qjd);
  }
  
  public SgQjd getSgQjdById(Long id) {
    return this.shiGuangDao.getSgQjdById(id);
  }
  
  public SgQjd getSgQjdByBlbh(Long blbh) {
    return this.shiGuangDao.getSgQjdByBlbh(blbh);
  }
  
  public Map<String, Object> findSgQjd4page(Page page, Long bl_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.shiGuangDao.findSgQjd4page(page, bl_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public void saveSgFcjl(SgFcjl fcjl) {
    this.shiGuangDao.saveSgFcjl(fcjl);
  }
  
  public void updateSgFcjl(SgFcjl fcjl) {
    this.shiGuangDao.updateSgFcjl(fcjl);
  }
  
  public SgFcjl getSgFcjlById(Long id) {
    return this.shiGuangDao.getSgFcjlById(id);
  }
  
  public SgFcjl getSgFcjlByBlbh(Long blbh) {
    return this.shiGuangDao.getSgFcjlByBlbh(blbh);
  }
  
  public Map<String, Object> findSgFcjl4page(Page page, Long bl_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.shiGuangDao.findSgFcjl4page(page, bl_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public List<SgFcjl> findSgFcjl(Long blbh) {
    List<SgFcjl> list = this.shiGuangDao.findSgFcjlByBlbh(blbh);
    return list;
  }
  
  public Eyeygnew getEyeygnew(Long huanzheId, Long jcxmId, String kt_xt) {
    Eyeygnew eyeygnew = this.shiGuangDao.getEyeygnew(huanzheId, jcxmId, kt_xt);
    return eyeygnew;
  }
  
  public Eyejmspjs getEyejmspjs(Long huanzheId) {
    return this.shiGuangDao.getEyejmspjs(huanzheId);
  }
  
  public List<SgZkjcForm> findZkjcByHzId(Long hz_id) {
    return this.shiGuangDao.findZkjcByHzId(hz_id);
  }
  
  public List<SgZkjcForm> getLastZkjcByHzId(String hz_id) {
    Long lastJiuzhenId = null;
    List<Jiuzhen> list = this.shiGuangDao.findJiuzheIdByHzId(hz_id);
    if (list != null && list.size() > 0)
      for (int i = 0; i < list.size(); i++) {
        boolean tag2 = false;
        Long jiuzhenId = ((Jiuzhen)list.get(i)).getId();
        List<Jzjl> list_jzjl = this.jzjlDao.getJzjlListByJiuzhenId(jiuzhenId+"");
        if (list_jzjl != null && list_jzjl.size() > 0)
          for (int j = 0; j < list_jzjl.size(); j++) {
            boolean tag1 = false;
            Jzjl jzjl = list_jzjl.get(j);
            if (jzjl != null) {
              for (int k = 30301; k <= 30324; k++) {
                if (jzjl.getCategoryId() != null && jzjl.getCategoryId().intValue() == k && jzjl.getJilu() != null && jzjl.getJilu() != "") {
                  tag1 = true;
                  break;
                } 
              } 
              if (tag1) {
                tag2 = true;
                break;
              } 
            } 
          }  
        if (tag2) {
          lastJiuzhenId = jiuzhenId;
          break;
        } 
      }  
    System.out.println("--------------------------最后一次就诊id是：" + lastJiuzhenId + "----------------------------");
    if (lastJiuzhenId != null) {
      List<SgZkjcForm> list_zkjcForm = this.shiGuangDao.findZkjcByJiuzhenId(lastJiuzhenId);
      return list_zkjcForm;
    } 
    return null;
  }
  
  public void saveSgBlfy(SgBlfy blfy) {
    this.shiGuangDao.saveSgBlfy(blfy);
  }
  
  public void updateSgBlfy(SgBlfy blfy) {
    this.shiGuangDao.updateSgBlfy(blfy);
  }
  
  public SgBlfy getSgBlfyById(Long id) {
    return this.shiGuangDao.getSgBlfyById(id);
  }
  
  public SgBlfy getSgBlfyByBlbh(Long blbh) {
    return (this.shiGuangDao.findSgBlfyByBlbh(blbh) == null || this.shiGuangDao.findSgBlfyByBlbh(blbh).size() == 0) ? null : this.shiGuangDao.findSgBlfyByBlbh(blbh).get(0);
  }
  
  public Map<String, Object> findSgBlfy4page(Page page, Long bl_id) {
    Map<String, Object> m = new HashMap<>();
    List list = this.shiGuangDao.findSgBlfy4page(page, bl_id);
    m.put("list", list);
    m.put("page", page);
    return m;
  }
  
  public List<SgBlfy> findSgBlfyByBlbh(Long bl_id) {
    return this.shiGuangDao.findSgBlfyByBlbh(bl_id);
  }
}
