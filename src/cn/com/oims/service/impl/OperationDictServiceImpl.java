package cn.com.oims.service.impl;

import cn.com.oims.dao.IOperationDictDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.GroupMemberId;
import cn.com.oims.dao.pojo.OperationGroup;
import cn.com.oims.dao.pojo.OperationGroupMember;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IOperationDictService;
import cn.com.oims.web.form.OperationGroupForm;
import cn.com.oims.web.form.OperationGroupMemberForm;
import cn.com.oims.web.form.OperationGroupSearchForm;
import com.codesnet.common.Page;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OperationDictServiceImpl implements IOperationDictService {
  @Autowired
  private IOperationDictDao odd;
  
  @Autowired
  private IYuanGongDao ygDao;
  
  public OperationGroup saveOrUpdateOperationGroup(OperationGroupForm form, String gonghao) {
    OperationGroup og;
    if (form.getId() != null) {
      og = this.odd.getOperationGroup(form.getId());
      if (og == null)
        throw new RuntimeException("未找到手术组"); 
      og.setUpdateDate(new Date());
      og.setUpdateUser(gonghao);
    } else {
      og = new OperationGroup();
      og.setInsertDate(new Date());
      og.setInsertUser(gonghao);
    } 
    BeanUtils.copyProperties(form, og);
    this.odd.saveOrUpdate(og);
    return og;
  }
  
  @Transactional
  public void deleteOperationGroup(String[] ids) {
    byte b;
    int i;
    String[] arrayOfString;
    for (i = (arrayOfString = ids).length, b = 0; b < i; ) {
      String s = arrayOfString[b];
      Integer id = Integer.valueOf(Integer.parseInt(s));
      if (id.intValue() == 1)
        throw new RuntimeException("此为系统保留组，不能被删除！"); 
      OperationGroup og = this.odd.getOperationGroup(id);
      if (this.odd.groupIsUse(id))
        throw new RuntimeException("分组已经被使用了，不能删除！"); 
      List<OperationGroupMember> list = this.odd.findOperationGroupMemberByGroupId(id);
      this.odd.deleteAll(list);
      this.odd.delete(og);
      b++;
    } 
  }
  
  public Map<String, Object> findOperationGroupPageList(OperationGroupSearchForm sf, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<OperationGroup> list = this.odd.findOperationGroupPageList(sf, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public void saveOrUpdateGroupMember(OperationGroupMemberForm form, String gonghao) {
    GroupMemberId gmi = new GroupMemberId(form.getGroupId(), form.getWorkNo());
    OperationGroupMember ogm = this.odd.getOperationGroupMember(gmi);
    if (ogm == null) {
      ogm = new OperationGroupMember(gmi);
      ogm.setInsertDate(new Date());
      ogm.setInsertUser(gonghao);
    } else {
      ogm.setUpdateDate(new Date());
      ogm.setUpdateUser(gonghao);
    } 
    YuanGong yg = this.ygDao.getYuanGongByGH(form.getWorkNo());
    ogm.setDeptId(yg.getBumenId());
    ogm.setName(yg.getXingming());
    ogm.setFirstTitle(yg.getZhiwu());
    ogm.setLevelFlag(form.getLevelFlag());
    ogm.setOperationDicts(form.getOperationDicts());
    ogm.setSecondTitle(yg.getTitle());
    ogm.setCategory(yg.getCategory());
    this.odd.saveOrUpdate(ogm);
  }
  
  public List<OperationGroupMember> findGroupMemberList(String groupIds) {
    return this.odd.findOperationGroupMembersByGroupIds(groupIds);
  }
  
  @Transactional
  public void saveOrUpdateGroupMembers(Vector<OperationGroupMemberForm> ogf, String gonghao) {
    List<OperationGroupMember> list = this.odd.findOperationGroupMemberByGroupId(((OperationGroupMemberForm)ogf.get(0)).getGroupId());
    for (OperationGroupMemberForm ogm : ogf) {
      Iterator<OperationGroupMember> itr = list.iterator();
      while (itr.hasNext()) {
        OperationGroupMember o = itr.next();
        GroupMemberId id = o.getGroupMemberId();
        if (id.getGroupId().intValue() == ogm.getGroupId().intValue() && id.getWorkNo().equals(ogm.getWorkNo())) {
          list.remove(o);
          break;
        } 
      } 
      saveOrUpdateGroupMember(ogm, gonghao);
    } 
    if (list.size() > 0)
      this.odd.deleteAll(list); 
  }
  
  public List<Map<String, Object>> findOperationGroupInforByGonghao(String gonghao) {
    return this.odd.findOperationGroupInforByGonghao(gonghao);
  }
}
