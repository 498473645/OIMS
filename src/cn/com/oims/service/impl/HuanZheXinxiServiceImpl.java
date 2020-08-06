package cn.com.oims.service.impl;

import cn.com.oims.common.BeanCopyUtils;
import cn.com.oims.common.Utils;
import cn.com.oims.dao.IDiquDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.web.form.HuanZheForm;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import test.PushServlet;

@Service
public class HuanZheXinxiServiceImpl implements IHuanZheXinXiService {
  private static String seccess = "sceess";
  
  private IHuanZheXinXiDao huanzhexinxiDao;
  
  private IYuanGongDao yuanGongDao;
  
  private IJiuzhenDao jiuzhenDao;
  
  @Autowired
  private IDiquDao diquDao;
  
  @Autowired
  public void setJiuzhenDao(IJiuzhenDao jiuzhenDao) {
    this.jiuzhenDao = jiuzhenDao;
  }
  
  @Autowired
  public void setYuanGongDao(IYuanGongDao yuanGongDao) {
    this.yuanGongDao = yuanGongDao;
  }
  
  @Autowired
  public void setHuanzhexinxiDao(IHuanZheXinXiDao huanzhexinxiDao) {
    this.huanzhexinxiDao = huanzhexinxiDao;
  }
  
  private String age(String a) {
    int aValue = Integer.parseInt(a);
    String jt = Utils.dateToStrShort(new Date());
    int n = Integer.valueOf(jt.substring(0, 4)).intValue() - aValue;
    return "'" + n + jt.substring(4) + "'";
  }
  
  public Map<String, Object> findHuanZhe(HuanZheForm hzf, Page p) {
    String hqlC = "select count(*) from HuanZheXinXi h ";
    String hqlM = "select new map(h.id as id,h.binglihao as binglihao, h.xingming as xingming ,h.xingbie as xingbie,h.shengri as shengri, h.sfzh as sfzh,h.shouji as shouji ,h.gzdw as gzdw,h.zcrq as zcrq,h.diqu as diqu, h.gongfei as gongfei , h.shangbao as shangbao)  from HuanZheXinXi h  ";
    if (hzf.getBinglihao() != null && !"".equals(hzf.getBinglihao())) {
      hqlC = String.valueOf(Utils.whereOrAnd(hqlC)) + "h.binglihao like '%" + 
        hzf.getBinglihao() + "%'";
      hqlM = String.valueOf(Utils.whereOrAnd(hqlM)) + "h.binglihao like '%" + 
        hzf.getBinglihao() + "%'";
    } 
    hqlM = String.valueOf(hqlM) + " order by id ";
    List<Map<String, Object>> list = this.huanzhexinxiDao.findHuanZhe4Page(
        hqlC, hqlM, p);
    convert(p, list);
    Map<String, Object> m = new HashMap<>(0);
    m.put("list", list);
    m.put("page", p);
    return m;
  }
  
  public void saveHuanZhe(HuanZheForm hzf) {
    HuanZheXinXi hz = new HuanZheXinXi();
    BeanCopyUtils.copyProperties(hzf, hz);
    if (hzf.getXingbie() != null && "1".equals(hzf.getXingbie()))
      hz.setXingbie(true); 
    if (hzf.getYibao() != null && "1".equals(hzf.getYibao()))
      hz.setYibao(true); 
    if (hz.getBinglihao() == null || "".equals(hz.getBinglihao())) {
      String max = this.huanzhexinxiDao.findMaxBinglihao();
      max = (max == null) ? "" : max;
      max = (max.length() > 4) ? max.substring(4) : "0";
      int int_max = Integer.parseInt(max) + 1;
      String blh = "oims";
      if ((new StringBuilder(String.valueOf(int_max))).toString().length() < 4)
        for (int i = 0; i < 4 - (new StringBuilder(String.valueOf(int_max))).toString().length(); i++)
          blh = String.valueOf(blh) + "0";  
      blh = String.valueOf(blh) + int_max;
      hz.setBinglihao(blh);
    } 
    Long huanzheId = (Long)this.huanzhexinxiDao.saveHuanZhe(hz);
    if (hzf.getFzys() != null && !"".equals(hzf.getFzys())) {
      Jiuzhen jiuzhen = new Jiuzhen();
      jiuzhen.setHuanzheId(huanzheId);
      jiuzhen.setCaozuoren(hzf.getJilvren());
      jiuzhen.setCaozuoTime(new Date());
      jiuzhen.setFzys(hzf.getFzys());
      jiuzhen.setState(Integer.valueOf(27));
      jiuzhen.setZhenbie(Integer.valueOf(2));
      jiuzhen.setFzr(hzf.getJilvren());
      jiuzhen.setFzTime(new Date());
      jiuzhen.setHzlxr(hzf.getXingming());
      jiuzhen.setYhzgx("患者本人");
      jiuzhen.setHzlxrdh(hzf.getShouji());
      int age = Utils.getAge(hz.getShengri()).intValue();
      jiuzhen.setAge(Integer.valueOf(age));
      this.jiuzhenDao.saveJiuzhen(jiuzhen);
    } 
  }
  
  public void updateHuanZheXingXi(HuanZheXinXi hzxx) {
    this.huanzhexinxiDao.updateHuanZhe(hzxx);
  }
  
  public String updateHuanZhe(HuanZheForm hzf) {
    hzf.setId(hzf.getId());
    HuanZheXinXi hz = new HuanZheXinXi();
    BeanCopyUtils.copyProperties(hzf, hz);
    if (hzf.getXingbie() != null && "1".equals(hzf.getXingbie()))
      hz.setXingbie(true); 
    if (hzf.getYibao() != null && "1".equals(hzf.getYibao()))
      hz.setYibao(true); 
    HuanZheXinXi hzxx = this.huanzhexinxiDao.findHuanZheById(Long.valueOf(hzf.getId()));
    hz.setBinglihao(hzxx.getBinglihao());
    this.huanzhexinxiDao.updateHuanZhe(hz);
    if (hzf.getFzys() != null && !"".equals(hzf.getFzys()))
      try {
        List<Jiuzhen> list = jiuzhenDao.getAlljzjlByIDAndTimeAndGonghao(hzxx.getId(),new Date(), hzf.getFzys());
        Jiuzhen jiuzhen = (list != null && list.size() > 0) ? list.get(0) : null;
        if (jiuzhen == null) {
          jiuzhen = new Jiuzhen();
          jiuzhen.setHuanzheId(hz.getId());
          jiuzhen.setCaozuoren(hzf.getJilvren());
          jiuzhen.setCaozuoTime(new Date());
          jiuzhen.setFzys(hzf.getFzys());
          YuanGong yg = this.yuanGongDao.getYuanGongByGH(hzf.getFzys());
          jiuzhen.setJzks(yg.getBumenId().intValue());
          jiuzhen.setState(Integer.valueOf(27));
          jiuzhen.setZhenbie(Integer.valueOf(2));
          jiuzhen.setFzr(hzf.getJilvren());
          jiuzhen.setFzTime(new Date());
          jiuzhen.setHzlxr(hzf.getXingming());
          jiuzhen.setYhzgx("患者本人");
          jiuzhen.setHzlxrdh(hzf.getShouji());
          int age = Utils.getAge(hz.getShengri()).intValue();
          jiuzhen.setAge(Integer.valueOf(age));
          this.jiuzhenDao.saveJiuzhen(jiuzhen);
        } 
        PushServlet.sendMsg(jiuzhen.getFzys(), jiuzhen.getId().toString());
      } catch (Exception e) {
        e.printStackTrace();
      }  
    return seccess;
  }
  
  public String delHuanZhe(List<Long> ids) {
    this.huanzhexinxiDao.delHuanZhe(ids);
    return seccess;
  }
  
  public String deleteHuanZheXinXiByHzid(Serializable id) {
    HuanZheXinXi hz = this.huanzhexinxiDao.findHuanZheById((Long)id);
    this.huanzhexinxiDao.delHuanZheXinXi(hz);
    return seccess;
  }
  
  public HuanZheXinXi findHuanZheById(Long id) {
    return this.huanzhexinxiDao.findHuanZheById(id);
  }
  
  public Serializable saveHuanZhe(HuanZheXinXi hzf) {
    String binglihao = hzf.getBinglihao();
    if (binglihao != null && !binglihao.isEmpty()) {
      HuanZheXinXi hzxx = this.huanzhexinxiDao.getHuanzhexinxiByBLH(hzf
          .getBinglihao());
      if (hzxx != null)
        throw new RuntimeException("病历号已存在"); 
    } 
    return this.huanzhexinxiDao.saveHuanZhe(hzf);
  }
  
  public boolean isHuanZheXinXiExist(HuanZheXinXi hzxx) {
    return this.huanzhexinxiDao.isHuanZheXinXiExist(hzxx);
  }
  
  public HuanZheXinXi getHuanzhexinxiByExample(HuanZheXinXi hzxx) {
    return this.huanzhexinxiDao.getHuanzhexinxiByExample(hzxx);
  }
  
  public List<Map<String, Object>> getHuanZheXinXiListByPage(Page page, HuanZheSearchForm searchForm) {
    List<Map<String, Object>> list = this.huanzhexinxiDao
      .getHuanZheXinXiListByPage(page, searchForm);
    convert(page, list);
    return list;
  }
  
  public List<Map<String, Object>> findHuanZheToExaminedByPageList(Page page, HuanZheSearchForm searchForm) {
    List<Map<String, Object>> list = this.huanzhexinxiDao
      .findHuanZheToExaminedByPageList(page, searchForm);
    convert(page, list);
    return list;
  }
  
  public List<Map<String, Object>> getHuanZheXinXiListByCondition(HuanZheSearchForm searchForm, String ids) {
    List<Map<String, Object>> list = this.huanzhexinxiDao
      .getHuanZheXinXiListByCondition(searchForm, ids);
    convert(list);
    return list;
  }
  
  public HuanZheXinXi getHuanZheXinXiBySearch(String search) {
    HuanZheXinXi huanzhe = null;
    try {
      Long id = Long.valueOf(Long.parseLong(search));
      huanzhe = this.huanzhexinxiDao.findHuanZheById(id);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    if (huanzhe == null)
      huanzhe = this.huanzhexinxiDao.getHuanzhexinxiByBLH(search); 
    if (huanzhe == null)
      huanzhe = this.huanzhexinxiDao.getHuanzhexinxiBySFZH(search); 
    return huanzhe;
  }
  
  public List<HuanZheXinXi> getHuanZheXinXiListBySearch(String search) {
    List<HuanZheXinXi> list = this.huanzhexinxiDao
      .getHuanZheXinXiListBySearch(search);
    return list;
  }
  
  private void convert(Page page, List list) {
    Iterator<Map> iterator = list.iterator();
    int i = (page.getCurrentPage().intValue() - 1) * page.getPageSize().intValue() + 1;
    while (iterator.hasNext()) {
      Map<String, Object> map = iterator.next();
      map.put("paihao", Integer.valueOf(i));
      i++;
      if (map.get("shengri") != null) {
        String shengri = (new SimpleDateFormat("yyyy-MM-dd")).format(map
            .get("shengri"));
        map.put("shengri", shengri);
      } 
      if (map.get("zcrq") != null) {
        String zcrq = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"))
          .format(map.get("zcrq"));
        map.put("zcrq", zcrq);
      } 
    } 
  }
  
  private void convert(List list) {
    Iterator<Map> itr = list.iterator();
    while (itr.hasNext()) {
      Map<String, String> map = itr.next();
      if (map.get("shengri") != null) {
        String shengri = (new SimpleDateFormat("yyyy-MM-dd")).format(map
            .get("shengri"));
        map.put("shengri", shengri);
      } 
      if (map.get("zcrq") != null) {
        String zcrq = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"))
          .format(map.get("zcrq"));
        map.put("zcrq", zcrq);
      } 
      if (map.get("xingbie") != null) {
        String xbstr = "";
        String xingbie = map.get("xingbie");
        if (xingbie.equals("0")) {
          xbstr = "女";
        }else if (xingbie.equals("1")){
          xbstr = "男";
        }
        map.put("xingbie", xbstr);
      } 
    } 
  }
  
  public Long getOneExamedHzId() {
    return this.huanzhexinxiDao.getOneExamedHzId();
  }
  
  public HuanZheXinXi getHuanzhexinxiByBLH(String blh) {
    return this.huanzhexinxiDao.getHuanzhexinxiByBLH(blh);
  }
  
  public Map<String, Object> getHuanZheXinXiMapByBLH(String blh) {
    Map<String, Object> map = this.huanzhexinxiDao
      .getHuanZheXinXiMapByBLH(blh);
    if (map != null) {
      if (map.get("shengri") != null) {
        String shengri = (new SimpleDateFormat("yyyy-MM-dd")).format(map
            .get("shengri"));
        map.put("shengri", shengri);
      } 
      if (map.get("xingbie") != null) {
        boolean xb = ((Boolean)map.get("xingbie")).booleanValue();
        String xbstr = xb ? "男" : "女";
        map.put("sex", xbstr);
      } 
      return map;
    } 
    return null;
  }
}
