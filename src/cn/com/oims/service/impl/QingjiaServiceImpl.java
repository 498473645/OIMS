package cn.com.oims.service.impl;

import cn.com.oims.dao.IQingjiaDao;
import cn.com.oims.dao.pojo.Qingjiatiao;
import cn.com.oims.service.IQingjiaService;
import cn.com.oims.web.form.QingjiaSearchForm;
import cn.com.oims.web.form.QingjiatiaoForm;
import com.codesnet.common.Page;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QingjiaServiceImpl implements IQingjiaService {
  public static final int QINGJIA_STATE_CHUSHI = 0;
  
  public static final int QINGJIA_STATE_YIPIZHUN = 1;
  
  public static final int QINGJIA_STATE_WEIPIZHUN = 2;
  
  public static final int QINGJIA_STATE_YIXIAOJIA = 3;
  
  @Autowired
  private IQingjiaDao dao;
  
  public void saveOrUpdateQingjiatiao(QingjiatiaoForm form, String gonghao) {
    Qingjiatiao qjt;
    if (form.getId() != null) {
      qjt = this.dao.getQingjiatiao(form.getId());
      if (qjt.getState() == 1 || qjt.getState() == 3)
        throw new RuntimeException("此假条已审核！"); 
      qjt.setState(0);
    } else {
      qjt = new Qingjiatiao();
      qjt.setInsertUser(gonghao);
      qjt.setInsertTime(new Date());
    } 
    BeanUtils.copyProperties(form, qjt);
    this.dao.saveOrUpdateQingjiatiao(qjt);
  }
  
  public Qingjiatiao getQingjiatiao(Long id) {
    return this.dao.getQingjiatiao(id);
  }
  
  public Map<String, Object> findQingjiatiao(QingjiaSearchForm qsf, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<Qingjiatiao> list = this.dao.findQingjiatiao(qsf, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public void setQingjiatiaoState(Long id, int state, String gonghao) {
    Qingjiatiao qjt = this.dao.getQingjiatiao(id);
    if (qjt.getState() == 3)
      throw new RuntimeException("此假条已销！"); 
    if (state == 2 || state == 1) {
      if (qjt.getState() == state)
        throw new RuntimeException("此假条已批示！"); 
      qjt.setAuditTime(new Date());
      qjt.setAuditUser(gonghao);
    } else {
      if (qjt.getJssj().after(new Date()))
        qjt.setJssj(new Date()); 
      qjt.setXjsj(new Date());
    } 
    qjt.setState(state);
    this.dao.saveOrUpdateQingjiatiao(qjt);
  }
  
  public void deleteQingjiatiao(Long id, String gonghao) {
    Qingjiatiao qjt = this.dao.getQingjiatiao(id);
    if (!gonghao.equals(qjt.getInsertUser()))
      throw new RuntimeException("没有删除此请假条的权限！"); 
    if (qjt.getState() == 1 || qjt.getState() == 3)
      throw new RuntimeException("不能删除已批准的请假条！"); 
    this.dao.deleteQingjiatiao(qjt);
  }
}
