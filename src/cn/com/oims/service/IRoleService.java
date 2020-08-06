package cn.com.oims.service;

import cn.com.oims.dao.pojo.Role;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IRoleService {
  int countsOfRole();
  
  List<Role> findRolesByPage(Page paramPage);
  
  List<Map> findRolesMapByPage(Page paramPage);
  
  List<Role> findAllRoles();
  
  void deleteRoleById(Serializable paramSerializable);
  
  Serializable saveRole(Role paramRole);
  
  void saveOrUpdateRole(Role paramRole);
  
  void updateRole(Role paramRole);
  
  Role findRoleById(Serializable paramSerializable);
}
