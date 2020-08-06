package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyejmspjs;
import cn.com.oims.dao.pojo.Eyeygnew;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.SgBlfy;
import cn.com.oims.dao.pojo.SgCcdj;
import cn.com.oims.dao.pojo.SgDpjl;
import cn.com.oims.dao.pojo.SgFcjl;
import cn.com.oims.dao.pojo.SgQjd;
import cn.com.oims.dao.pojo.Sgbl;
import cn.com.oims.web.form.SgZkjcForm;
import com.codesnet.common.Page;
import java.util.List;

public interface IShiGuangDao extends BaseDao {
  void saveSgbl(Sgbl paramSgbl);
  
  void updateSgbl(Sgbl paramSgbl);
  
  Sgbl getSgblById(Long paramLong);
  
  List<Sgbl> findSgbl4page(Page paramPage, String paramString);
  
  List<Sgbl> findSgbl(String paramString);
  
  void saveSgCcdj(SgCcdj paramSgCcdj);
  
  void updateSgCcdj(SgCcdj paramSgCcdj);
  
  SgCcdj getSgCcdjById(Long paramLong);
  
  SgCcdj getSgCcdjByBlbh(Long paramLong);
  
  List<SgCcdj> findSgCcdj4page(Page paramPage, Long paramLong);
  
  void saveSgDpjl(SgDpjl paramSgDpjl);
  
  void updateSgDpjl(SgDpjl paramSgDpjl);
  
  SgDpjl getSgDpjlById(Long paramLong);
  
  SgDpjl getSgDpjlByBlbh(Long paramLong);
  
  List<SgDpjl> findSgDpjl4page(Page paramPage, Long paramLong);
  
  void saveSgQjd(SgQjd paramSgQjd);
  
  void updateSgQjd(SgQjd paramSgQjd);
  
  SgQjd getSgQjdById(Long paramLong);
  
  SgQjd getSgQjdByBlbh(Long paramLong);
  
  List<SgQjd> findSgQjd4page(Page paramPage, Long paramLong);
  
  void saveSgFcjl(SgFcjl paramSgFcjl);
  
  void updateSgFcjl(SgFcjl paramSgFcjl);
  
  SgFcjl getSgFcjlById(Long paramLong);
  
  SgFcjl getSgFcjlByBlbh(Long paramLong);
  
  List<SgFcjl> findSgFcjl4page(Page paramPage, Long paramLong);
  
  List<SgFcjl> findSgFcjlByBlbh(Long paramLong);
  
  Eyejmspjs getEyejmspjs(Long paramLong);
  
  Eyeygnew getEyeygnew(Long paramLong1, Long paramLong2, String paramString);
  
  List<SgZkjcForm> findZkjcByHzId(Long paramLong);
  
  List<SgZkjcForm> findZkjcByJiuzhenId(Long paramLong);
  
  List<Jiuzhen> findJiuzheIdByHzId(String paramString);
  
  void saveSgBlfy(SgBlfy paramSgBlfy);
  
  void updateSgBlfy(SgBlfy paramSgBlfy);
  
  SgBlfy getSgBlfyById(Long paramLong);
  
  List<SgBlfy> findSgBlfy4page(Page paramPage, Long paramLong);
  
  List<SgBlfy> findSgBlfyByBlbh(Long paramLong);
}
