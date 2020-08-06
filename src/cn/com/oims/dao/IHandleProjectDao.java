package cn.com.oims.dao;

import cn.com.oims.dao.pojo.HandleProject;
import java.util.List;

public interface IHandleProjectDao {
  HandleProject getHandleProject(Integer paramInteger);
  
  HandleProject getByCodeAndSpecAndUnits(String paramString1, String paramString2, String paramString3);
  
  List<HandleProject> getAll();
  
  List<HandleProject> getValid();
  
  List<HandleProject> getInvalid();
  
  List<HandleProject> getByPinyin(String paramString, boolean paramBoolean);
  
  void save(HandleProject paramHandleProject);
  
  void saveOrUpdate(HandleProject paramHandleProject);
  
  void update(HandleProject paramHandleProject);
}
