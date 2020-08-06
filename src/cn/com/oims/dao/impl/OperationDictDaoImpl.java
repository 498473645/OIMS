package cn.com.oims.dao.impl;

import cn.com.oims.dao.IOperationDictDao;
import cn.com.oims.dao.pojo.GroupMemberId;
import cn.com.oims.dao.pojo.OperationGroup;
import cn.com.oims.dao.pojo.OperationGroupMember;
import cn.com.oims.web.form.OperationGroupSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class OperationDictDaoImpl extends BaseDaoImpl implements IOperationDictDao {
  public OperationGroup getOperationGroup(Integer id) {
    return (OperationGroup)this.hibernateTemplate.get(OperationGroup.class, id);
  }
  
  public void saveOrUpdate(Object og) {
    this.hibernateTemplate.saveOrUpdate(og);
  }
  
  public List<OperationGroup> findOperationGroupPageList(OperationGroupSearchForm sf, Page page) {
    String hql = " from OperationGroup";
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage(String.valueOf(hql) + " order by id", page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  public List<OperationGroupMember> findOperationGroupMemberByGroupId(Integer id) {
    String hql = " from OperationGroupMember gm where groupMemberId.groupId=" + id;
    return this.hibernateTemplate.find(String.valueOf(hql) + " order by name asc");
  }
  
  public void deleteAll(Collection list) {
    this.hibernateTemplate.deleteAll(list);
  }
  
  public void delete(Object obj) {
    this.hibernateTemplate.delete(obj);
  }
  
  public OperationGroupMember getOperationGroupMember(GroupMemberId id) {
    return (OperationGroupMember)this.hibernateTemplate.get(OperationGroupMember.class, (Serializable)id);
  }
  
  public boolean groupIsUse(Integer id) {
    String hql = "select count(*) from Operation where groupId=" + id;
    return (count(hql) > 0);
  }
  
  public void deleteMember(String gonghao) {
    String hql = " from OperationGroupMember where groupMemberId.workNo='" + gonghao + "'";
    this.hibernateTemplate.deleteAll(this.hibernateTemplate.find(hql));
  }
  
  public List<OperationGroupMember> findOperationGroupMembersByGroupIds(String groupIds) {
    String hql = " select gm from YuanGong yg,OperationGroupMember gm where yg.gonghao=gm.groupMemberId.workNo and gm.groupMemberId.groupId in(" + groupIds + ")";
    return this.hibernateTemplate.find(String.valueOf(hql) + " order by yg.pinyin asc");
  }
  
  public List<Map<String, Object>> findOperationGroupInforByGonghao(String gonghao) {
    String hql = "select new map(og.name as groupName) from OperationGroup og,OperationGroupMember ogm where og.id=ogm.groupMemberId.groupId and ogm.groupMemberId.workNo='" + gonghao + "'";
    return this.hibernateTemplate.find(hql);
  }
  
  public void deleteOtherGroupThisYuanGong(Integer groupId, String gonghao) {
    String hql = " from OperationGroupMember ogm where ogm.groupMemberId.groupId <>" + groupId + " and ogm.groupMemberId.workNo='" + gonghao + "'";
    List<OperationGroupMember> list = this.hibernateTemplate.find(hql);
    this.hibernateTemplate.deleteAll(list);
  }
  
  public Integer findDoctorLevelByGonghao(String gonghao) {
    String hql = "select ogm.levelFlag from OperationGroupMember ogm where ogm.groupMemberId.workNo='" + gonghao + "'";
    List<Integer> list = this.hibernateTemplate.find(hql);
    return (list != null && list.size() != 0) ? list.get(0) : null;
  }
}
