package cn.com.oims.dao.impl;

import cn.com.oims.dao.IQingjiaDao;
import cn.com.oims.dao.pojo.Qingjiatiao;
import cn.com.oims.web.form.QingjiaSearchForm;
import com.codesnet.common.Page;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class QingjiaDaoImpl extends BaseDaoImpl implements IQingjiaDao {
  @Override
  public Qingjiatiao getQingjiatiao(Long id) {
    return (Qingjiatiao)this.hibernateTemplate.get(Qingjiatiao.class, id);
  }
  
  @Override
  public void saveOrUpdateQingjiatiao(Qingjiatiao qjt) {
    this.hibernateTemplate.saveOrUpdate(qjt);
  }
  
  @Override
  public List<Qingjiatiao> findQingjiatiao(QingjiaSearchForm qsf, Page page) {
    String hql = " from Qingjiatiao q,YuanGong y where q.insertUser=y.gonghao";
    Map<String, Object> map = new HashMap<String, Object>();
    if (qsf.getInsertUser() != null) {
      hql = String.valueOf(hql) + " and q.insertUser=:insertUser";
      map.put("insertUser", qsf.getInsertUser());
    } 
    if (qsf.getKssj() != null) {
      hql = String.valueOf(hql) + " and q.kssj >= :kssj";
      map.put("kssj", qsf.getKssj());
    } 
    if (qsf.getJssj() != null) {
      hql = String.valueOf(hql) + " and q.jssj<= :jssj";
      map.put("jssj", qsf.getJssj());
    } 
    if (qsf.getState() != null) {
      hql = String.valueOf(hql) + " and q.state=:state";
      map.put("state", qsf.getState());
    } 
    if (qsf.getQjlx() != null) {
      hql = String.valueOf(hql) + " and q.qjlx=:qjlx";
      map.put("qjlx", qsf.getQjlx());
    } 
    page.setRowsCount(Integer.valueOf(counts("select count(*)" + hql, map)));
    page.init();
    return getListForPage("select new map(q.id as id,q.insertUser as insertUser,q.insertTime as insertTime,q.qjlx as qjlx,q.kssj as kssj,q.jssj as jssj,q.xjsj as xjsj,q.state as state,q.qingjiaYuanyou as qingjiaYuanyou,y.xingming as xingming)" + 
        
        hql, page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }
  
  @Override
  public void deleteQingjiatiao(Qingjiatiao qjt) {
    this.hibernateTemplate.delete(qjt);
  }
}
