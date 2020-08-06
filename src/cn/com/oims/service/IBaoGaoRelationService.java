package cn.com.oims.service;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface IBaoGaoRelationService {
  Serializable saveBaoGaoRelation(BaoGaoRelation paramBaoGaoRelation);
  
  void updateBaoGaoRelation(BaoGaoRelation paramBaoGaoRelation);
  
  BaoGaoRelation getBaoGaoRelationById(Long paramLong);
  
  List<BaoGaoRelation> getBaoGaoRelationsByBaoGaoRelation(BaoGaoRelation paramBaoGaoRelation);
  
  List<BaoGaoRelation> getBaoGaoRelationTimeTag(String paramString1, String paramString2);
  
  void deleteBaogaoRelationByJcdId(Long paramLong);
}
