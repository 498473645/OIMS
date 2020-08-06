package cn.com.oims.service.impl;

import cn.com.oims.common.CommonFunction;
import cn.com.oims.dao.IRevChangeDao;
import cn.com.oims.dao.pojo.RevChange;
import cn.com.oims.service.IJcxmService;
import cn.com.oims.service.IRevChangeService;
import cn.com.oims.web.form.RevChgForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RevChangeServiceImpl implements IRevChangeService {
  @Autowired
  private IRevChangeDao iRevChangeDao;
  
  @Autowired
  private IJcxmService iJcxmService;
  
  public IRevChangeDao getiRevChangeDao() {
    return this.iRevChangeDao;
  }
  
  public void setiRevChangeDao(IRevChangeDao iRevChangeDao) {
    this.iRevChangeDao = iRevChangeDao;
  }
  
  public List<Map<String, Object>> findRevChgByForm(Page page, RevChgForm form) {
    List<Map<String, Object>> list = this.iRevChangeDao.findRevChgByForm(page, form);
    convert(page, list);
    return list;
  }
  
  public void mrgRevChgByForm(RevChgForm form) {
    RevChange revChange = new RevChange();
    revChange.setBiaoshi(form.getBiaoshi());
    revChange.setBumenId(form.getBmid());
    revChange.setUserId(form.getUid());
    revChange.setOpertm(new Date());
    try {
      revChange.setRevdt((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(form.getRevdt()));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    revChange.setChgnum(form.getChgnum());
    revChange.setJcxmId(form.getJcxmid());
    this.iRevChangeDao.saveRevChange(revChange);
  }
  
  public void mrgRevChgBatByForm(RevChgForm form) {
    int revPeriod = form.getRevPeriod().intValue();
    int weekFlag = form.getWeekFlag().intValue();
    String endDateStr = form.getRevdt();
    if (endDateStr.indexOf(" ") != -1)
      endDateStr = endDateStr.split(" ")[0]; 
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String startDateStr = sdf.format(new Date()).split(" ")[0];
    int yancishu = CommonFunction.countDays(startDateStr, endDateStr);
    for (int count = 0; count < revPeriod; count++) {
      Date nextTime = MultiUtils.getPreviousDay(MultiUtils.getStartTimeOfDay(), -count - yancishu);
      String nextTimeStr = sdf.format(nextTime);
      int xiqi = CommonFunction.getWeekDay(nextTimeStr);
      if (weekFlag == xiqi) {
        String nextDateStr = nextTimeStr.substring(0, 10);
        form.setRevdt(String.valueOf(nextDateStr) + " " + form.getTimeFlag());
        RevChange rc = this.iRevChangeDao.getRevChangeByForm(form);
        if (rc != null)
          this.iRevChangeDao.delRevChange(rc.getId()); 
        RevChange revChange = new RevChange();
        revChange.setBiaoshi(form.getBiaoshi());
        revChange.setBumenId(form.getBmid());
        revChange.setUserId(form.getUid());
        revChange.setOpertm(new Date());
        try {
          revChange.setRevdt((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(form.getRevdt()));
        } catch (ParseException e) {
          e.printStackTrace();
        } 
        revChange.setChgnum(form.getChgnum());
        revChange.setJcxmId(form.getJcxmid());
        if (form.getChgnum().intValue() != 0)
          this.iRevChangeDao.saveRevChange(revChange); 
      } 
    } 
  }
  
  public int getReserveChgNumByResDateAndReprojId(int flag, String jcxmId, String revdt, Long jcbmid) {
    int bgshu = 0;
    List list = this.iRevChangeDao.getReserveChgNumByResDateAndReprojId(flag, jcxmId, revdt, jcbmid);
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
    return bgshu;
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
        map.put("revdt", revdt.split(" ")[0]);
        String timeflag = revdt.split(" ")[1];
        if ("02:00:00".equals(timeflag)) {
          map.put("timeflag", Integer.valueOf(1));
          continue;
        } 
        if ("13:00:00".equals(timeflag))
          map.put("timeflag", Integer.valueOf(2)); 
      } 
    } 
  }
}
