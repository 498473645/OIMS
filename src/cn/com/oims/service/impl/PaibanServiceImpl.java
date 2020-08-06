package cn.com.oims.service.impl;

import cn.com.oims.dao.IPaibanDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.Paiban;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IPaibanService;
import cn.com.oims.web.form.PaibanForm;
import java.util.Date;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaibanServiceImpl implements IPaibanService {
  @Autowired
  private IPaibanDao paibanDao;
  
  @Autowired
  private IYuanGongDao ygDao;
  
  public List<Paiban> findPaibanValues(Date startDate, Date endDate, Integer category, Integer officeId, Integer child) {
    return this.paibanDao.findPaibanValues(startDate, endDate, category, officeId, child);
  }
  
  public Long savePaiban(PaibanForm paiban) {
    Paiban p = new Paiban();
    BeanUtils.copyProperties(paiban, p);
    if (this.paibanDao.paibanExist(p))
      throw new RuntimeException("已排班！"); 
    YuanGong yg = this.ygDao.findYuanGongByGongHao(p.getGonghao());
    p.setXingming(yg.getXingming());
    return this.paibanDao.savePaiban(p);
  }
  
  public void deletePaiban(Long id) {
    this.paibanDao.deletePaiban(id);
  }
}
