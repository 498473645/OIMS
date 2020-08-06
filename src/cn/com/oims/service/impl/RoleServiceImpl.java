package cn.com.oims.service.impl;

import cn.com.oims.dao.IRoleDao;
import cn.com.oims.dao.pojo.Role;
import cn.com.oims.service.IRoleService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements IRoleService {
  IRoleDao dao = null;
  
  public IRoleDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IRoleDao dao) {
    this.dao = dao;
  }
  
  public int countsOfRole() {
    return this.dao.countsOfRole();
  }
  
  public List<Role> findRolesByPage(Page page) {
    return this.dao.findRolesByPage(page);
  }
  
  public List<Map> findRolesMapByPage(Page page) {
    List list = this.dao.findRolesByPage(page);
    return convert(page, list);
  }
  
  public List<Role> findAllRoles() {
    return this.dao.findAllRoles();
  }
  
  public void deleteRoleById(Serializable id) {
    this.dao.deleteRoleById(id);
  }
  
  public Serializable saveRole(Role role) {
    return this.dao.saveRole(role);
  }
  
  public void saveOrUpdateRole(Role role) {
    this.dao.saveOrUpdateRole(role);
  }
  
  public void updateRole(Role role) {
    this.dao.updateRole(role);
  }
  
  public Role findRoleById(Serializable id) {
    return this.dao.findRoleById(id);
  }
  
  private List<Map> convert(Page page, List list) {
    Iterator<Role> iterator = list.iterator();
    int i = (page.getCurrentPage().intValue() - 1) * page.getPageSize().intValue() + 1;
    List<Map> roleList = new ArrayList<>();
    while (iterator.hasNext()) {
      Map<Object, Object> map = new HashMap<>();
      Role role = iterator.next();
      map.put("paihao", Integer.valueOf(i));
      map.put("jiaose", role.getJiaose());
      map.put("id", role.getId());
      i++;
      roleList.add(map);
    } 
    return roleList;
  }
}
