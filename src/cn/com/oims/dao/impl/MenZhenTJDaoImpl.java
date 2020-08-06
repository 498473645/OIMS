package cn.com.oims.dao.impl;

import cn.com.oims.dao.IMenZhenTJDao;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;

@Component
public class MenZhenTJDaoImpl implements IMenZhenTJDao {
  private HibernateTemplate hibernateTemplate;
  
  @Autowired
  public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
    this.hibernateTemplate = hibernateTemplate;
  }
  
  @Override
  public Map<String, Object> getPatientInfo(String patient_id) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map( d.id as patientId, d.xingming as name, d.shengri as birthday, d.photourl as photo, d.shouji as mobile, d.xingbie as sex, (select e.name from Diqu e where e.id = d.diquId ) as diquname, d.binglihao as binglihao, d.sfzh as sfzh, d.gzdw as gzdw, d.dwyb as dwyb, d.dwdz as dwdz, d.dwdh as dwdh, d.jtdz as jtdz, d.youbian as youbian, d.dianhua as dianhua, d.hzlxr as hzlxr, d.hzlxrdh as hzlxrdh, d.yhzgx as yhzgx, d.yibao as yibao, d.yibaohao as yibaohao, d.shangbao as shangbao, d.gongfei as gongfei, d.zcrq as zcrq, d.jilvren as jilvren,( select c.xingming from YuanGong c where c.id = d.jilvren )as jilvrenname ,  d.beizhu as beizhu,( select f.category from Category f where f.id = d.laiyuan ) as laiyuan)  from  HuanZheXinXi d  where  d.id = ? ";
    list = this.hibernateTemplate.find(hql, new Object[] { Long.valueOf(Long.parseLong(patient_id)) });
    if (list.size() > 0) {
      map = list.get(0);
    }
    return map;
  }
}
