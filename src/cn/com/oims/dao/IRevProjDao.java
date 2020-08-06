package cn.com.oims.dao;

import cn.com.oims.dao.pojo.RevProj;
import cn.com.oims.web.form.RevProjForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public interface IRevProjDao extends BaseDao {
  List<Map<String, Object>> findRevProjByUser(String paramString);
  
  RevProj getRevProjById(Serializable paramSerializable);
  
  List<Map<String, Object>> findRevProjByPage(Page paramPage, RevProjForm paramRevProjForm);
  
  Serializable saveRevProj(RevProj paramRevProj);
  
  void updateRevProj(RevProj paramRevProj);
  
  void delRevProjById(Serializable paramSerializable);
  
  List<RevProj> getRevProjByBumenId(int paramInt);
}
