package cn.com.oims.service.impl;

import cn.com.oims.dao.IRGJTDictDao;
import cn.com.oims.dao.pojo.RGJTChangjia;
import cn.com.oims.dao.pojo.RGJTCjtglx;
import cn.com.oims.dao.pojo.RGJTCrklx;
import cn.com.oims.dao.pojo.RGJTPanleixing;
import cn.com.oims.dao.pojo.RGJTXinghao;
import cn.com.oims.service.IRGJTDictService;
import cn.com.oims.web.form.RGJTSearchForm;
import com.codesnet.common.Page;
import com.codesnet.common.PinyinUtils;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RGJTDictServiceImpl implements IRGJTDictService {
  @Autowired
  private IRGJTDictDao rgjtDao;
  
  public void saveOrUpdateRGJChangjia(RGJTChangjia cj) {
    if (cj.getCode() == null || cj.getCode().isEmpty())
      cj.setCode(getJianpin(cj.getName())); 
    this.rgjtDao.saveOrUpdate(cj);
  }
  
  private String getJianpin(String name) {
    PinyinUtils pu = new PinyinUtils();
    char[] cs = name.toCharArray();
    StringBuffer sb = new StringBuffer();
    byte b;
    int i;
    char[] arrayOfChar1;
    for (i = (arrayOfChar1 = cs).length, b = 0; b < i; ) {
      char c = arrayOfChar1[b];
      try {
        String s = pu.getPinyinByChar(c);
        sb.append(s.substring(0, 1));
      } catch (Exception e) {
        sb.append(c);
      } 
      b++;
    } 
    return sb.toString().toUpperCase();
  }
  
  public Map<String, Object> findRGJTChangjia(String inputCode, Page page, Integer category) {
    Map<String, Object> map = new HashMap<>();
    List<RGJTChangjia> list = this.rgjtDao.findRGJTChangjia(category, inputCode, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public RGJTChangjia getRGJTChangjia(Integer id) {
    return this.rgjtDao.getRGJTChangjia(id);
  }
  
  public void deleteRGJTChangjia(Integer id) {
    this.rgjtDao.delete(getRGJTChangjia(id));
  }
  
  public void saveOrUpdateRGJTXinghao(RGJTXinghao xinghao) {
    if (xinghao.getCode() == null || xinghao.getCode().isEmpty())
      xinghao.setCode(getJianpin(xinghao.getName())); 
    this.rgjtDao.saveOrUpdate(xinghao);
  }
  
  public Map<String, Object> findRGJTXinhaoPageList(String code, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<RGJTXinghao> list = this.rgjtDao.findRGJTXinhaoPageList(code, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public void deleteRGJTXinhao(Integer id) {
    this.rgjtDao.delete(this.rgjtDao.getRGJTXinghao(id));
  }
  
  public void saveOrUpdateRGJTPanleixing(RGJTPanleixing plx) {
    if (plx.getCode() == null || plx.getCode().isEmpty())
      plx.setCode(getJianpin(plx.getName())); 
    this.rgjtDao.saveOrUpdate(plx);
  }
  
  public Map<String, Object> findRGJTPanleixingPageList(String code, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<RGJTPanleixing> list = this.rgjtDao.findRGJTPanleixing(code, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public void deleteRGJTPanleixing(Integer id) {
    this.rgjtDao.delete(this.rgjtDao.getRGJTPanleixing(id));
  }
  
  public void saveOrUpdateRGJTCjtglx(RGJTCjtglx cjtglx) {
    if (cjtglx.getDisabled() == null)
      cjtglx.setDisabled(Boolean.valueOf(false)); 
    this.rgjtDao.saveOrUpdate(cjtglx);
  }
  
  public Map<String, Object> findRGJTCjtglx(RGJTSearchForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<RGJTCjtglx> list = this.rgjtDao.findRGJTCjtglx(form, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public RGJTCjtglx getRGJTCjtglx(Integer id) {
    return this.rgjtDao.getRGJTCjtglx(id);
  }
  
  public void deleteRGJTCjtglx(Integer id) {
    this.rgjtDao.delete(getRGJTCjtglx(id));
  }
  
  public void saveOrUpdateRGJTCrklx(RGJTCrklx crklx) {
    if (crklx.getCode() == null || crklx.getCode().isEmpty())
      crklx.setCode(getJianpin(crklx.getName())); 
    this.rgjtDao.saveOrUpdate(crklx);
  }
  
  public Map<String, Object> findRGJTCrklxPageList(String code, Integer category, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<RGJTCrklx> list = this.rgjtDao.findRGJTCrklxPageList(code, category, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public void deleteRGJTCrklx(Integer id) {
    this.rgjtDao.delete(this.rgjtDao.getRGJTCrklx(id));
  }
}
