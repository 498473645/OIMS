package cn.com.oims.dao;

import cn.com.oims.dao.pojo.AChao;
import cn.com.oims.dao.pojo.Fzyy;
import cn.com.oims.dao.pojo.Fzyyjl;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.Pcao;
import cn.com.oims.dao.pojo.XiaoErChuZhen;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.web.form.ChildSearchForm;
import cn.com.oims.web.form.ChildTiGeForm;
import cn.com.oims.web.form.FzyySearchForm;
import cn.com.oims.web.form.FzyyjlSearchForm;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public interface IChildCheckDao {
  List<Map<String, Object>> findChildByConditionAndPage(Page paramPage, ChildSearchForm paramChildSearchForm);
  
  String findHuanZheLianXiRenByHuanZheID(Long paramLong);
  
  void saveChuZhen(XiaoErChuZhen paramXiaoErChuZhen);
  
  XiaoErChuZhen getChuZhenByHzid(Long paramLong);
  
  void updateChuZhen(XiaoErChuZhen paramXiaoErChuZhen);
  
  Serializable savePcao(Pcao paramPcao);
  
  void updatePcao(Pcao paramPcao);
  
  List<Pcao> findPchaoList(Page paramPage, Serializable paramSerializable);
  
  List<Pcao> findAllPcao();
  
  List<AChao> findAllAChao();
  
  List<AChao> findAllAChaoByPage(Page paramPage);
  
  List<AChao> findAChaoList(Page paramPage, Serializable paramSerializable);
  
  int countByAChao();
  
  AChao findAChaoByID(Serializable paramSerializable);
  
  AChao findAChaoByJcdID(Serializable paramSerializable);
  
  Serializable saveAChao(AChao paramAChao);
  
  void updateAChao(AChao paramAChao);
  
  void deleteAChao(AChao paramAChao);
  
  void deleteAChaoByID(Serializable paramSerializable);
  
  List<Jzjl> showAllTgjc();
  
  Object updateTgjc(Jzjl paramJzjl);
  
  Object addTgjc(Jzjl paramJzjl, ChildTiGeForm paramChildTiGeForm);
  
  Jzjl showById(Long paramLong);
  
  List<Map<String, Integer>> getCategoryMap();
  
  List<Map<String, Object>> findFzyy4Page(Page paramPage, FzyySearchForm paramFzyySearchForm);
  
  Serializable addFzyyInfo(Fzyy paramFzyy);
  
  Fzyy findFzzByJiuzhenid(String paramString);
  
  void updateFzyy(Fzyy paramFzyy);
  
  Fzyyjl findSfjlByFzyyid(String paramString);
  
  void updateFzyyjl(Fzyyjl paramFzyyjl);
  
  void saveFzyyjl(Fzyyjl paramFzyyjl);
  
  Fzyy findFzyyById(String paramString);
  
  List<Map<String, Object>> findFzyyjlList(Page paramPage, FzyyjlSearchForm paramFzyyjlSearchForm);
  
  Pcao findPcaoByJcdID(Serializable paramSerializable);
  
  Pcao findPcaoByID(Serializable paramSerializable);
  
  List<Map<String, Object>> findChildListNoPageByHuanzheIDs(ChildSearchForm paramChildSearchForm, String paramString);
  
  List<YanYa> findAllYanYa4Page(Page paramPage, HzXxSearchForm paramHzXxSearchForm);
  
  Boolean isXiaoEr(String paramString);
}
