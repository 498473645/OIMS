package cn.com.oims.service.impl;

import cn.com.oims.dao.IReserveInfoDao;
import cn.com.oims.dao.IRevChangeDao;
import cn.com.oims.dao.IRevProjDao;
import cn.com.oims.dao.pojo.ReserveInfo;
import cn.com.oims.dao.pojo.RevChange;
import cn.com.oims.dao.pojo.RevProj;
import cn.com.oims.service.IJcxmService;
import cn.com.oims.service.IReserveInfoService;
import cn.com.oims.web.form.RevInfoForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReserveInfoServiceImpl implements IReserveInfoService {
  @Autowired
  private IReserveInfoDao iReserveInfoDao;
  
  @Autowired
  private IRevProjDao iRevProjDao;
  
  @Autowired
  private IRevChangeDao iRevChangeDao;
  
  @Autowired
  private IJcxmService iJcxmService;
  
  public int curReserveNumAm(Long revprojId, String gonghao, String reservedt) {
    return this.iReserveInfoDao.curReserveNumAm(revprojId, gonghao, reservedt);
  }
  
  public int curReserveNumPm(Long revprojId, String gonghao, String reservedt) {
    return this.iReserveInfoDao.curReserveNumPm(revprojId, gonghao, reservedt);
  }
  
  public Serializable saveReserveInfo(ReserveInfo t) {
    return this.iReserveInfoDao.saveReserveInfo(t);
  }
  
  public void updateReserveInfo(ReserveInfo t) {
    this.iReserveInfoDao.updateReserveInfo(t);
  }
  
  public void delReserveInfoById(Serializable id) {
    this.iReserveInfoDao.delReserveInfoById(id);
  }
  
  public ReserveInfo getReserveInfoById(Serializable id) {
    return this.iReserveInfoDao.getReserveInfoById(id);
  }
  
  public List<Map<String, Object>> findRevInfoByForm(Page page, RevInfoForm form) {
    List<Map<String, Object>> list = this.iReserveInfoDao.findRevInfoByForm(page, form);
    convert(page, list);
    return list;
  }
  
  public void saveOrUpdateReserveInfo(ReserveInfo o) {
    this.iReserveInfoDao.saveOrUpdateReserveInfo(o);
  }
  
  public String getWeiYueManYyDateByXmid(String gonghao, Long revprojId) {
    for (int i = 0; i < 30; i++) {
      Date nextTime = MultiUtils.getPreviousDay(MultiUtils.getStartTimeOfDay(), -i);
      String reservedt = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(nextTime);
      if (!isFullYuyue(reservedt, gonghao, revprojId))
        return reservedt.split(" ")[0]; 
    } 
    return (new SimpleDateFormat("yyyy-MM-dd")).format(new Date());
  }
  
  private boolean isFullYuyue(String reservedt, String gonghao, Long revprojId) {
    int yuyueNum = curReserveNumAm(revprojId, gonghao, reservedt) + curReserveNumPm(revprojId, gonghao, reservedt);
    RevProj revProj = this.iRevProjDao.getRevProjById(revprojId);
    int maxYuyueNum = 0;
    int bgshu = 0;
    if (revProj != null) {
      maxYuyueNum = revProj.getAmnum().intValue() + revProj.getPmnum().intValue();
      List list = this.iRevChangeDao.getReserveChgNumByResDateAndReprojId(2, revProj.getJcxmIds(), reservedt, revProj.getBumenId());
      if (list != null) {
        Iterator<RevChange> itr = list.iterator();
        while (itr.hasNext()) {
          RevChange revChange = itr.next();
          if (revChange.getBiaoshi().intValue() == 1) {
            bgshu += revChange.getChgnum().intValue();
            continue;
          } 
          bgshu -= revChange.getChgnum().intValue();
        } 
      } 
    } else {
      return false;
    } 
    int limitNum = maxYuyueNum + bgshu;
    if (yuyueNum >= limitNum)
      return true; 
    return false;
  }
  
  private void convert(Page page, List list) {
    Iterator<Map> itr = list.iterator();
    int i = (page.getCurrentPage().intValue() - 1) * page.getPageSize().intValue() + 1;
    while (itr.hasNext()) {
      Map map = itr.next();
      map.put("paihao", Integer.valueOf(i));
      i++;
      if (map.get("pbirthday") != null) {
        String shengri = (new SimpleDateFormat("yyyy-MM-dd")).format(map.get("pbirthday"));
        map.put("pbirthday", shengri);
      } 
      if (map.get("revdt") != null) {
        String revdt = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(map.get("revdt"));
        map.put("revdt", revdt);
      } 
    } 
  }
}
