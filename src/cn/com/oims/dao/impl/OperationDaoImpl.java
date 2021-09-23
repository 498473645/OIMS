package cn.com.oims.dao.impl;

import cn.com.oims.dao.IOperationDao;
import cn.com.oims.dao.pojo.Operation;
import cn.com.oims.dao.pojo.OperationConsumable;
import cn.com.oims.dao.pojo.OperationDetail;
import cn.com.oims.dao.pojo.OperationDict;
import cn.com.oims.web.form.OperationConsumableSearchForm;
import cn.com.oims.web.form.OperationSearchForm;
import com.codesnet.common.Page;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class OperationDaoImpl extends BaseDaoImpl implements IOperationDao {
  @Override
  public void saveOrUpdate(Object obj) {
    this.hibernateTemplate.saveOrUpdate(obj);
  }

  @Override
  public List<OperationDict> findOperationDictList(String inputCode, Page page) {
    String hql = " from OperationDict";
    if (inputCode != null && !inputCode.isEmpty()) {
      inputCode = inputCode.replaceAll("'", "‘");
      hql = String.valueOf(hql) + " where inputCode like '%" + inputCode.toUpperCase() + "%' or inputCode like '%" + inputCode + "%'";
      hql = String.valueOf(hql) + " or name like '%" + inputCode + "%'";
    }
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage(String.valueOf(hql) + " order by id desc", page.getStartRow().intValue(), page.getPageSize().intValue());
  }

  @Override
  public OperationDict getOperationDict(Integer id) {
    return (OperationDict)this.hibernateTemplate.get(OperationDict.class, id);
  }

  @Override
  public void delete(Object obj) {
    this.hibernateTemplate.delete(obj);
  }

  @Override
  public Operation getOperation(Long id) {
    return (Operation)this.hibernateTemplate.get(Operation.class, id);
  }

  @Override
  public List<Map<String, Object>> findOperationList(Page page, OperationSearchForm form) {
    String hqlMap = "select new map(o.operationOrderNum as operationOrderNum,o.id as id,o.category as category,o.childCategory as childCategory,o.contact as contact,o.tel as tel,o.mobile as mobile,o.urgent as urgent,o.levelFlag as levelFlag, o.operationSize as operationSize, o.operationTime as operationTime,o.appointmentTime as appointmentTime,o.groupId as groupId,o.doctor as doctor,o.condition as condition,o.medical as medical,o.processState as processState,o.processState as processState,o.anesthesia as anesthesia,o.anesthetist as anesthetist,o.firstAssistant as firstAssistant,o.secondAssistant as secondAssistant,o.operationRoomId as operationRoomId,o.note as note,o.circuitNurse as circuitNurse,o.instrumentNurse as instrumentNurse,o.nurse_note as nurse_note,o.drugResistanceBacteriaCarrier as drugResistanceBacteriaCarrier,o.area as area,o.bedNo as bedNo,o.areaCode as areaCode,o.medicalAfter as medicalAfter, o.isolation as isolation,o.operationRecord as operationRecord,o.operationTime as operationTime, o.operationCompleteTime as operationCompleteTime,h.id as patientId, h.binglihao as patientNo, h.xingming as patientName, h.xingbie as sex, h.shengri as birthday,o.geli_category as geli_category)";
    String hql = " from Operation o, HuanZheXinXi h where o.patientId=h.id and (";
    Map<String, Object> map = new HashMap<String, Object>();
    String[] ps = form.getProcess().split(",");
    for (int i = 0; i < ps.length; i++) {
      if (i > 0) {
        hql = String.valueOf(hql) + " or ";
      }
      hql = String.valueOf(hql) + " o.processState = :process" + i;
      int p = Integer.parseInt(ps[i]);
      map.put("process" + i, Integer.valueOf(p));
    }
    hql = String.valueOf(hql) + ")";
    if (form.getSearch() != null && !form.getSearch().isEmpty()) {
      if (form.getSearch().indexOf("*****") != -1) {
        form.setSearch(form.getSearch().replace("*****", ""));
        hql = String.valueOf(hql) + " and (o.doctor in(select gonghao from YuanGong where xingming like  '%" + form.getSearch() + "%')  or o.medical like '%" + form.getSearch() + "%')";
      } else {
        hql = String.valueOf(hql) + " and (h.binglihao like :search or h.xingming like :search or h.binglihao=:blh or (select count(*) from OperationDetail d, OperationDict di where d.operationDictId=di.id and d.operationId=o.id and (di.name like :search or di.inputCode like :search))>0)";
        map.put("search", "%" + form.getSearch() + "%");
        map.put("blh", form.getSearch());
      }
    }
    if (form.getPatientName() != null && !form.getPatientName().isEmpty()) {
      map.put("name", "%" + form.getPatientName() + "%");
      hql = String.valueOf(hql) + " and h.xingming like :name";
    }
    if (form.getPatientId() != null && !form.getPatientId().isEmpty()) {
      hql = String.valueOf(hql) + " and h.binglihao=:patientId";
      map.put("patientId", form.getPatientId());
    }
    if (form.getOperationName() != null && !form.getOperationName().isEmpty()) {
      if (form.getOperationName().indexOf(",;") != -1) {
        String[] str = form.getOperationName().split(",;");
        hql = String.valueOf(hql) + " and (select count(*) from OperationDetail where operationId=o.id)>=" + str.length;
        for (int j = 0; j < str.length; j++) {
          hql = String.valueOf(hql) + " and ((select count(*) from OperationDetail d, OperationDict di where d.operationDictId=di.id and d.operationId=o.id and  di.name like :operationName" + j + ")>0)";
          map.put("operationName" + j, str[j]);
        }
      } else {
        hql = String.valueOf(hql) + " and ((select count(*) from OperationDetail d, OperationDict di where d.operationDictId=di.id and d.operationId=o.id and di.name like :operationName)>0)";
        map.put("operationName", "%" + form.getOperationName() + "%");
      }
    }
    if (form.getDoctor() != null && !form.getDoctor().isEmpty()) {
      hql = String.valueOf(hql) + " and o.doctor in(select gonghao from YuanGong where xingming like :doctor)";
      map.put("doctor", "%" + form.getDoctor() + "%");
    }
    if (form.getDeptId() != null) {
      hql = String.valueOf(hql) + " and o.groupId=:groupId";
      map.put("groupId", form.getDeptId());
    }
    if (form.getAppointmentTimeStart() != null) {
      if ("3".equals(form.getProcess())) {
        hql = String.valueOf(hql) + " and o.operationTime >=:appointmentTimeStart";
      } else {
        hql = String.valueOf(hql) + " and o.appointmentTime >=:appointmentTimeStart";
      }
      map.put("appointmentTimeStart", form.getAppointmentTimeStart());
    }
    if (form.getAppointmentTimeEnd() != null) {
      if ("3".equals(form.getProcess())) {
        hql = String.valueOf(hql) + " and o.operationTime <=:appointmentTimeEnd";
      } else {
        hql = String.valueOf(hql) + " and o.appointmentTime <=:appointmentTimeEnd";
      }
      map.put("appointmentTimeEnd", form.getAppointmentTimeEnd());
    }
    if (form.getOperationTimeStart() != null) {
      hql = String.valueOf(hql) + " and o.operationTime >=:operationTimeStart";
      map.put("operationTimeStart", form.getOperationTimeStart());
    }
    if (form.getOperationTimeEnd() != null) {
      hql = String.valueOf(hql) + " and o.operationTime<=:operationTimeEnd";
      map.put("operationTimeEnd", form.getOperationTimeEnd());
    }
    if (form.getOperationRoomId() != null) {
      hql = String.valueOf(hql) + " and o.operationRoomId=:operationRoomId";
      map.put("operationRoomId", form.getOperationRoomId());
    }
    if (form.getLevelFlag() != null) {
      hql = String.valueOf(hql) + " and o.levelFlag=:levelFlag";
      map.put("levelFlag", form.getLevelFlag());
    }
    if (form.getStrOperRooms() != null) {
      hql = String.valueOf(hql) + " and (o.operationRoomId in (" + form.getStrOperRooms() + ") or o.operationRoomId is null)";
    }
    if (form.getUrgent().booleanValue()) {
      hql = String.valueOf(hql) + " and o.urgent=1";
    }
    if (form.getCategory() != null) {
      if (form.getCategory().intValue() == 0) {
        hql = String.valueOf(hql) + " and o.category=0";
      } else {
        hql = String.valueOf(hql) + " and o.category=1 and o.childCategory=" + form.getCategory();
      }
    }
    if (form.getDiseases() != null && !form.getDiseases().isEmpty()) {
      hql = String.valueOf(hql) + " and o.medical like :medical";
      map.put("medical", "%" + form.getDiseases() + "%");
    }
    if (form.getOperationSize() != null) {
      hql = String.valueOf(hql) + " and o.operationSize=" + form.getOperationSize();
    }
    if (form.getCircuitNurse() != null && !form.getCircuitNurse().isEmpty()) {
      hql = String.valueOf(hql) + " and o.circuitNurse='" + form.getCircuitNurse() + "'";
    }
    page.setRowsCount(Integer.valueOf(counts("select count(*) " + hql, map)));
    page.init();
    if (form.getIsprint().booleanValue()) {
      hql = String.valueOf(hql) + " order by o.operationRoomId,rownum ";
    } else {
      hql = String.valueOf(hql) + " order by o.processState,o.operationRoomId,o.operationTime,o.appointmentTime desc";
    }
    return getListForPage(String.valueOf(hqlMap) + hql, page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }

  @Override
  public boolean operationExists(Integer id) {
    String hql = "select count(*) from OperationDetail where operationDictId = " + id;
    return (count(hql) > 0);
  }

  @Override
  public Map<String, Object> getOperationMap(String blh) {
    String hql = "select new map(h.id as patientId,h.xingming as name,h.shengri as birthday,h.xingbie as sex, h.shouji as mobile,h.dianhua as tel,j.id as visitId, j.fzys as doctor, j.hzlxr as contact, j.hzlxrsj as contactorMobile,j.hzlxrdh as contactorTel,j.caozuoTime as visitTime) from HuanZheXinXi h, Jiuzhen j where h.id=j.huanzheId and h.binglihao='" +

      blh + "' and (select count(*) from JzZhenduan z where z.jiuzhen_id=j.id)>0 order by j.caozuoTime desc";
    List<Map<String, Object>> list = getListForPage(hql, 0, 1);
    return (list.size() > 0) ? list.get(0) : null;
  }

  @Override
  public List<OperationDict> findOperationDict(String operationDictIds) {
    String hql = "from OperationDict where id in(" + operationDictIds + ")";
    return this.hibernateTemplate.find(hql);
  }

  @Override
  public boolean patientOperationAppointmentExists(Long patientId, String[] operationDictIds, Long visitId) {
    String ids = "";
    for (int i = 0; i < operationDictIds.length; i++) {
      if (i > 0) {
        ids = String.valueOf(ids) + ",";
      }
      ids = String.valueOf(ids) + operationDictIds[i];
    }
    String hql = "select count(*) from Operation o where o.patientId=" + patientId + " and (select count(*) from OperationDetail d where o.id=d.operationId and d.operationDictId in(" + ids + "))>0 and o.visitId=" + visitId;
    return (count(hql) > 0);
  }

  @Override
  public List<Operation> getOperation(Long patientId, Long visitId) {
    List<Operation> list = this.hibernateTemplate.find("from Operation where patientId=" + patientId + " and visitId=" + visitId);
    return list;
  }

  @Override
  public List<OperationDetail> findOperationDetails(Long id) {
    String hql = " from OperationDetail where operationId=" + id;
    return this.hibernateTemplate.find(hql);
  }

  @Override
  public void deleteAll(Collection list) {
    this.hibernateTemplate.deleteAll(list);
  }

  @Override
  public List<Map<String, Object>> findOperationDetailsMap(Long id) {
    String hql = "select new map(b.id as id, b.name as name, b.operationSize as operationSize, b.levelFlag as levelFlag, a.eyes as eyes) from OperationDetail a,OperationDict b where a.operationDictId=b.id and a.operationId=" + id;
    return this.hibernateTemplate.find(hql);
  }

  @Override
  public List<OperationConsumable> findOperationConsumable(Long operationId) {
    String hql = " from OperationConsumable where operationId=" + operationId + " order by id";
    return this.hibernateTemplate.find(hql);
  }

  @Override
  public List<Map<String, Object>> findOperationConsumablePageList(OperationConsumableSearchForm form, Page page) {
    String hql = " from OperationConsumable c, Operation o, HuanZheXinXi h where h.id=o.patientId and c.operationId=o.id";
    Map<String, Object> map = new HashMap<String, Object>();
    if (form.getUsed() == null) {
      hql = String.valueOf(hql) + " and ((c.insertDate between :startDate and :endDate) or (c.useDate between :startDate and :endDate))";
    } else {
      hql = String.valueOf(hql) + " and c.used=:used";
      map.put("used", form.getUsed());
      if (form.getUsed().booleanValue()) {
        hql = String.valueOf(hql) + " and c.useDate between :startDate and :endDate";
      } else {
        hql = String.valueOf(hql) + " and c.insertDate between :startDate and :endDate";
      }
    }
    if (form.getConsumable_name() != null && !form.getConsumable_name().isEmpty()) {
      hql = String.valueOf(hql) + " and c.name like :name";
      map.put("name", "%" + form.getConsumable_name() + "%");
    }
    map.put("startDate", form.getStartDate());
    map.put("endDate", form.getEndDate());
    page.setRowsCount(Integer.valueOf(counts("select count(*)" + hql, map)));
    page.init();
    hql = "select new map(c.id as id, h.xingming as patientName,h.binglihao as patientNo,h.xingbie as sex,h.shengri as birthday,c.name as name,c.regName as regName,c.sn as sn,c.regNo as regNo,c.code as code,c.price as price,c.specification as specification,c.manufacturers as manufacturers, c.quantity as quantity, c.used as used,c.unit as unit, c.useDate as useDate, o.doctor as doctor, o.id as operationId, o.medical as medical)" +

      hql + " order by c.useDate, c.insertDate";
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }

  @Override
  public List<Map<String, Object>> findOperationList(OperationSearchForm form) {
    String hqlMap = "select new map(o.id as id,o.category as category,o.childCategory as childCategory,o.contact as contact,o.tel as tel,o.mobile as mobile,o.urgent as urgent,o.levelFlag as levelFlag, o.operationSize as operationSize, o.appointmentTime as appointmentTime,o.groupId as groupId,o.doctor as doctor,o.condition as condition,o.medical as medical,o.processState as processState,o.processState as processState,o.anesthesia as anesthesia,o.anesthetist as anesthetist,o.firstAssistant as firstAssistant,o.secondAssistant as secondAssistant,o.operationRoomId as operationRoomId,o.note as note,o.circuitNurse as circuitNurse,o.instrumentNurse as instrumentNurse,o.nurse_note as nurse_note,o.drugResistanceBacteriaCarrier as drugResistanceBacteriaCarrier,o.area as area,o.bedNo as bedNo,o.areaCode as areaCode,o.medicalAfter as medicalAfter, o.isolation as isolation,o.operationRecord as operationRecord,o.operationTime as operationTime, o.operationCompleteTime as operationCompleteTime,h.id as patientId, h.binglihao as patientNo, h.xingming as patientName, h.xingbie as sex, h.shengri as birthday,o.geli_category as geli_category)";
    String hql = " from Operation o, HuanZheXinXi h where o.patientId=h.id and (";
    Map<Object, Object> map = new HashMap<Object, Object>();
    String[] ps = form.getProcess().split(",");
    for (int i = 0; i < ps.length; i++) {
      if (i > 0) {
        hql = String.valueOf(hql) + " or ";
      }
      hql = String.valueOf(hql) + " o.processState = :process" + i;
      int p = Integer.parseInt(ps[i]);
      map.put("process" + i, Integer.valueOf(p));
    }
    hql = String.valueOf(hql) + ")";
    if (form.getSearch() != null && !form.getSearch().isEmpty()) {
      hql = String.valueOf(hql) + " and (h.binglihao like :search or h.xingming like :search or h.binglihao=:blh or (select count(*) from OperationDetail d, OperationDict di where d.operationDictId=di.id and d.operationId=o.id and (di.name like :search or di.inputCode like :search))>0)";
      map.put("search", "%" + form.getSearch() + "%");
      map.put("blh", form.getSearch());
    }
    if (form.getPatientName() != null && !form.getPatientName().isEmpty()) {
      map.put("name", "%" + form.getPatientName() + "%");
      hql = String.valueOf(hql) + " and h.xingming like :name";
    }
    if (form.getPatientId() != null && !form.getPatientId().isEmpty()) {
      hql = String.valueOf(hql) + " and h.binglihao=:patientId";
      map.put("patientId", form.getPatientId());
    }
    if (form.getOperationName() != null && !form.getOperationName().isEmpty()) {
      hql = String.valueOf(hql) + " and ((select count(*) from OperationDetail d, OperationDict di where d.operationDictId=di.id and d.operationId=o.id and di.name like :operationName)>0)";
      map.put("operationName", "%" + form.getOperationName() + "%");
    }
    if (form.getDoctor() != null && !form.getDoctor().isEmpty()) {
      hql = String.valueOf(hql) + " and o.doctor in(select gonghao from YuanGong where xingming like :doctor)";
      map.put("doctor", "%" + form.getDoctor() + "%");
    }
    if (form.getDeptId() != null) {
      hql = String.valueOf(hql) + " and o.groupId=:groupId";
      map.put("groupId", form.getDeptId());
    }
    if (form.getAppointmentTimeStart() != null) {
      hql = String.valueOf(hql) + " and o.appointmentTime >=:appointmentTimeStart";
      map.put("appointmentTimeStart", form.getAppointmentTimeStart());
    }
    if (form.getAppointmentTimeEnd() != null) {
      hql = String.valueOf(hql) + " and o.appointmentTime <=:appointmentTimeEnd";
      map.put("appointmentTimeEnd", form.getAppointmentTimeEnd());
    }
    if (form.getOperationTimeStart() != null) {
      hql = String.valueOf(hql) + " and o.operationTime >=:operationTimeStart";
      map.put("operationTimeStart", form.getOperationTimeStart());
    }
    if (form.getOperationTimeEnd() != null) {
      hql = String.valueOf(hql) + " and o.operationTime<=:operationTimeEnd";
      map.put("operationTimeEnd", form.getOperationTimeEnd());
    }
    if (form.getOperationRoomId() != null) {
      hql = String.valueOf(hql) + " and o.operationRoomId=:operationRoomId";
      map.put("operationRoomId", form.getOperationRoomId());
    }
    if (form.getStrOperRooms() != null) {
      hql = String.valueOf(hql) + " and (o.operationRoomId in (" + form.getStrOperRooms() + "))";
    }
    if (form.getLevelFlag() != null) {
      hql = String.valueOf(hql) + " and o.levelFlag=:levelFlag";
      map.put("levelFlag", form.getLevelFlag());
    }
    if (form.getCategory() != null) {
      if (form.getCategory().intValue() == 0) {
        hql = String.valueOf(hql) + " and o.category=0";
      } else {
        hql = String.valueOf(hql) + " and o.category=1 and o.childCategory=" + form.getCategory();
      }
    }
    if (form.getDiseases() != null && !form.getDiseases().isEmpty()) {
      hql = String.valueOf(hql) + " and o.medical like :medical";
      map.put("medical", "%" + form.getDiseases() + "%");
    }
    hql = String.valueOf(hql) + " order by o.urgent, o.processState, o.insertTime desc";
    return findList(String.valueOf(hqlMap) + hql, map);
  }

  @Override
  public List<Map<String,Object>> findOperationListForIndex(Page page, OperationSearchForm form) {
    String hqlMap = "select new map(o.operationOrderNum as operationOrderNum,o.id as id,o.urgent as urgent,o.appointmentTime as appointmentTime,o.doctor as doctor,o.medical as medical,o.processState as processState,h.id as patientId, h.binglihao as patientNo, h.xingming as patientName, h.xingbie as sex, h.shengri as birthday)";
    String hql = " from Operation o, HuanZheXinXi h where o.patientId=h.id and (";
    Map<String,Object> map = new HashMap<String,Object>();
    String[] ps = form.getProcess().split(",");
    for(int i=0; i<ps.length; i++){
      if(i>0)hql+=" or ";
      hql += " o.processState = :process"+i;
      int p =Integer.parseInt(ps[i]);
      map.put("process"+i, p);
    }
    hql+=")";
    if(form.getSearch()!=null && !form.getSearch().isEmpty()){
      if(form.getSearch().indexOf("*****") != -1){//手术统计 查询需要 加入特殊字符区别
        form.setSearch(form.getSearch().replace("*****", ""));
        hql += " and (o.doctor in(select gonghao from YuanGong where xingming like  '%"+form.getSearch()+"%')  or o.medical like '%"+form.getSearch()+"%')";
      }else{
        hql += " and (h.binglihao like :search or h.xingming like :search or h.binglihao=:blh or "
                + "(select count(*) from OperationDetail d, OperationDict di where d.operationDictId=di.id and d.operationId=o.id and (di.name like :search or di.inputCode like :search))>0)";
        map.put("search", "%" + form.getSearch() + "%");
        map.put("blh", form.getSearch());
      }
    }
    if(form.getPatientName()!=null && !form.getPatientName().isEmpty()){
      map.put("name", "%"+form.getPatientName()+"%");
      hql += " and h.xingming like :name";
    }
    if(form.getPatientId()!=null && !form.getPatientId().isEmpty()){
      hql += " and h.binglihao=:patientId";
      map.put("patientId", form.getPatientId());
    }
    if ((form.getOperationName() != null) && (!form.getOperationName().isEmpty())) {
      if(form.getOperationName().indexOf(",;") != -1){
        String str[] = form.getOperationName().split(",;");
        hql += " and (select count(*) from OperationDetail where operationId=o.id)>="+str.length;
        for(int i = 0; i < str.length ; i++){
          hql = hql + " and ((select count(*) from OperationDetail d, OperationDict di where d.operationDictId=di.id and d.operationId=o.id and  di.name like :operationName"+i+ ")>0)";
          map.put("operationName"+i, str[i]);
        }
      }else{
        hql = hql + " and ((select count(*) from OperationDetail d, OperationDict di where d.operationDictId=di.id and d.operationId=o.id and di.name like :operationName)>0)";
        map.put("operationName", "%" + form.getOperationName() + "%");
      }
    }
    if ((form.getDoctor() != null) && (!form.getDoctor().isEmpty())) {
      hql = hql + " and o.doctor in(select gonghao from YuanGong where xingming like :doctor)";
      map.put("doctor", "%" + form.getDoctor() + "%");
    }
    if(form.getDeptId()!=null){
      hql += " and o.groupId=:groupId";
      map.put("groupId", form.getDeptId());
    }

    if(form.getAppointmentTimeStart()!=null){
      if("3".equals(form.getProcess())){
        hql += " and o.operationTime >=:appointmentTimeStart";
      }
      else{
        hql += " and o.appointmentTime >=:appointmentTimeStart";
      }
      map.put("appointmentTimeStart", form.getAppointmentTimeStart());
    }
    if(form.getAppointmentTimeEnd()!=null){
      if("3".equals(form.getProcess())){
        hql += " and o.operationTime <=:appointmentTimeEnd";
      }else{
        hql += " and o.appointmentTime <=:appointmentTimeEnd";
      }

      map.put("appointmentTimeEnd", form.getAppointmentTimeEnd());
    }
    if(form.getOperationTimeStart()!=null){
      hql += " and o.operationTime >=:operationTimeStart";
      map.put("operationTimeStart", form.getOperationTimeStart());
    }
    if(form.getOperationTimeEnd()!=null){
      hql += " and o.operationTime<=:operationTimeEnd";
      map.put("operationTimeEnd", form.getOperationTimeEnd());
    }

    if(form.getUrgent()){
      hql += " and o.urgent=1";
    }

    page.setRowsCount(this.counts("select count(*) "+hql,map));
    page.init();
    hql +=" order by o.processState,o.appointmentTime desc";
    return this.getListForPage(hqlMap + hql, page.getStartRow(), page.getPageSize(), map);
  }

}
