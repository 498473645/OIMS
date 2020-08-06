package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Role;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;

public interface IRoleDao extends BaseDao {
  int countsOfRole();
  
  List<Role> findRolesByPage(Page paramPage);
  
  List<Role> findAllRoles();
  
  void deleteRoleById(Serializable paramSerializable);
  
  Serializable saveRole(Role paramRole);
  
  void saveOrUpdateRole(Role paramRole);
  
  void updateRole(Role paramRole);
  
  Role findRoleById(Serializable paramSerializable);
}
