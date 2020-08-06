package cn.com.oims.service;

import cn.com.oims.dao.pojo.AChao;
import cn.com.oims.dao.pojo.Fzyy;
import cn.com.oims.dao.pojo.Fzyyjl;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.Pcao;
import cn.com.oims.dao.pojo.XiaoErChuZhen;
import cn.com.oims.dao.pojo.YanGuang;
import cn.com.oims.web.form.AChaoForm;
import cn.com.oims.web.form.ChildCheckPcaoForm;
import cn.com.oims.web.form.ChildSearchForm;
import cn.com.oims.web.form.ChildTiGeForm;
import cn.com.oims.web.form.ChileCheckYanYaForm;
import cn.com.oims.web.form.FzyyForm;
import cn.com.oims.web.form.FzyySearchForm;
import cn.com.oims.web.form.FzyyjlForm;
import cn.com.oims.web.form.FzyyjlSearchForm;
import cn.com.oims.web.form.HzXxSearchForm;
import cn.com.oims.web.form.QuGuangForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface IChildCheckService {
  List<Map<String, Object>> findChildByPage(Page paramPage, ChildSearchForm paramChildSearchForm);
  
  void addChildRegistration(HuanZheXinXi paramHuanZheXinXi, Jiuzhen paramJiuzhen, XiaoErChuZhen paramXiaoErChuZhen);
  
  Serializable addHuanEr(HuanZheXinXi paramHuanZheXinXi);
  
  void addJiuZhen(Jiuzhen paramJiuzhen);
  
  void addChuZhen(XiaoErChuZhen paramXiaoErChuZhen);
  
  Map<String, Object> findXiaoErFUZhen(String paramString);
  
  void addChildReexamination(HuanZheXinXi paramHuanZheXinXi, Jiuzhen paramJiuzhen, XiaoErChuZhen paramXiaoErChuZhen);
  
  XiaoErChuZhen findChuZhenByHzid(Long paramLong);
  
  void updateChildInfo(HuanZheXinXi paramHuanZheXinXi, Jiuzhen paramJiuzhen, XiaoErChuZhen paramXiaoErChuZhen);
  
  boolean savePcaoAndjcd(ChildCheckPcaoForm paramChildCheckPcaoForm);
  
  void updatePChao(Pcao paramPcao);
  
  Pcao findPcaoByJcdID(Serializable paramSerializable);
  
  Pcao findPcaoByID(Serializable paramSerializable);
  
  boolean saveYanYa(ChileCheckYanYaForm paramChileCheckYanYaForm);
  
  Map<String, Object> findAllAChao();
  
  void updateAChao(AChao paramAChao);
  
  AChao findAChaoByJcdID(Serializable paramSerializable);
  
  AChao findAChaoByID(Serializable paramSerializable);
  
  Serializable saveAChao(AChaoForm paramAChaoForm);
  
  List<Jzjl> getshowAllTgjc();
  
  Object getupdateTgjc(Jzjl paramJzjl);
  
  boolean getaddTgjc(Jzjl paramJzjl, ChildTiGeForm paramChildTiGeForm);
  
  Jzjl getshowById(Long paramLong);
  
  String findHuanZheLianXiRenByHuanZheID(Long paramLong);
  
  void updateQuGuang(YanGuang paramYanGuang);
  
  Serializable saveQuGuang(QuGuangForm paramQuGuangForm);
  
  YanGuang findYanGuangByJcdid(Serializable paramSerializable);
  
  List<Map<String, Object>> findFzyyjlList(Page paramPage, FzyyjlSearchForm paramFzyyjlSearchForm);
  
  Map<String, Object> findFzyy4Page(Page paramPage, FzyySearchForm paramFzyySearchForm);
  
  boolean addFzyyInfo(Fzyy paramFzyy, FzyyForm paramFzyyForm);
  
  Fzyy findFzyyByJiuzhenid(String paramString);
  
  void updateFzyyInfo(Fzyy paramFzyy, FzyyForm paramFzyyForm);
  
  Fzyyjl findSfjlByFzyyid(String paramString);
  
  void updateFzyyjl1Info(Fzyyjl paramFzyyjl, FzyyjlForm paramFzyyjlForm);
  
  void addFzyyjlInfo(Fzyyjl paramFzyyjl, FzyyjlForm paramFzyyjlForm);
  
  Fzyy findFzyyById(String paramString);
  
  void updateFzyy(Fzyy paramFzyy);
  
  List<Jzjl> findTGJC(long paramLong);
  
  void updateTgjc(Jzjl paramJzjl, ChildTiGeForm paramChildTiGeForm, Long paramLong);
  
  int calculateYq(String paramString);
  
  Map<String, Object> findAOrP(String paramString1, String paramString2);
  
  Map findAllYanYa4Page(Page paramPage, HzXxSearchForm paramHzXxSearchForm);
  
  List<Map<String, Object>> exportXiaoErXinXi(ChildSearchForm paramChildSearchForm, String paramString);
  
  @Transactional
  int importXiaoErXinXiToApp(String paramString1, String paramString2);
  
  Map<String, Object> findYanGuangList(Page paramPage, Serializable paramSerializable);
  
  Map<String, Object> findPChaoList(Page paramPage, Serializable paramSerializable);
  
  Map<String, Object> findAChaoList(Page paramPage, Serializable paramSerializable);
  
  Boolean isXiaoEr(String paramString);
}
