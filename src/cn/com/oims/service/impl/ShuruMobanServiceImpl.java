package cn.com.oims.service.impl;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.IJcxmDao;
import cn.com.oims.dao.IShuruMobanDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.InquiryComboTreeNode;
import cn.com.oims.dao.pojo.InspectionItemCombo;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.RecordSets;
import cn.com.oims.dao.pojo.RecordSetsDetail;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.TemplateVariable;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IDoctorsWorkstationService;
import cn.com.oims.service.IShuruMobanService;
import cn.com.oims.utils.InputPinYinToDatabase;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShuruMobanServiceImpl implements IShuruMobanService {
  IShuruMobanDao dao = null;
  
  @Autowired
  IYuanGongDao iygDao = null;
  
  @Autowired
  IJcxmDao jcxmDao = null;
  
  private String regex = " ";
  
  @Autowired
  private IDoctorsWorkstationService doctorsWorkstationService;
  
  public IShuruMobanDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IShuruMobanDao dao) {
    this.dao = dao;
  }
  
  public int countsOfShuruMoban() {
    return this.dao.countsOfShuruMoban();
  }
  
  public List<ShuruMoban> findShuruMobansByPage(Page page) {
    return this.dao.findShuruMobansByPage(page);
  }
  
  public List<ShuruMoban> findAllShuruMobans() {
    return this.dao.findAllShuruMobans();
  }
  
  public void deleteShuruMobanById(Serializable id) {
    this.dao.deleteShuruMobanById(id);
  }
  
  public Serializable saveShuruMoban(ShuruMoban shurumoban) {
    return this.dao.saveShuruMoban(shurumoban);
  }
  
  public void saveOrUpdateShuruMoban(ShuruMoban shurumoban) {
    this.dao.saveOrUpdateShuruMoban(shurumoban);
  }
  
  public void updateShuruMoban(ShuruMoban shurumoban) {
    this.dao.updateShuruMoban(shurumoban);
  }
  
  public ShuruMoban findShuruMobanById(Serializable id) {
    return this.dao.findShuruMobanById(id);
  }
  
  public Map<String, Object> findAllShuruMobansByPage(Page page, ShuruMoban shurumoban) {
    Map<String, Object> map = new HashMap<>();
    List list = this.dao.findAllShuruMobansByPage(page, shurumoban);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public List findShuruMobansByShuruMoban(ShuruMoban shurumoban) {
    return this.dao.findShuruMobansByShuruMoban(shurumoban);
  }
  
  public List<ShuruMoban> selectShuruMobansByShuruMoban(ShuruMoban shurumoban) {
    return this.dao.selectShuruMobansByShuruMoban(shurumoban);
  }
  
  public Map<String, Object> findInputTemplateForPage(Page page, String categoryId, String gonghao, String suoyin) {
    Map<String, Object> map = new HashMap<>();
    YuanGong yg = this.iygDao.obtainYuanGongByGonghao(gonghao);
    List list = this.dao.findInputTemplateForPage(page, categoryId, yg, suoyin);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  @Transactional
  public Serializable saveShuruMobanEMR(ShuruMoban shurumoban) {
    InputPinYinToDatabase ipytd = new InputPinYinToDatabase(shurumoban);
    Map<String, Object> map = ipytd.inputAndPinyinToDatabase();
    List<TemplateVariable> list = (List<TemplateVariable>)map.get("variablecollection");
    shurumoban.setShuru(map.get("input").toString());
    shurumoban.setPinyin(map.get("pinyin").toString());
    if (list.size() > 0) {
      Long id = (Long)this.dao.saveShuruMoban(shurumoban);
      for (TemplateVariable tv : list) {
        tv.setShuruId(id);
        tv.setCategory(OimsCategoryConfig.inputcategory_common);
        this.dao.saveTemplateVariable(tv);
      } 
      return id;
    } 
    return this.dao.saveShuruMoban(shurumoban);
  }
  
  @Transactional
  public void updateInputTemplates(ShuruMoban shurumoban) {
    List<TemplateVariable> list_tv = this.dao.findTemplateVariable(shurumoban.getId());
    for (TemplateVariable tv : list_tv)
      this.dao.deleteTemplateVariable(tv); 
    InputPinYinToDatabase ipytd = new InputPinYinToDatabase(shurumoban);
    Map map = ipytd.inputAndPinyinToDatabase();
    shurumoban.setShuru(map.get("input").toString());
    shurumoban.setPinyin(map.get("pinyin").toString());
    this.dao.updateShuruMoban(shurumoban);
    List<TemplateVariable> list = (List<TemplateVariable>)map.get("variablecollection");
    for (TemplateVariable tv : list) {
      tv.setShuruId(shurumoban.getId());
      tv.setCategory(OimsCategoryConfig.inputcategory_common);
      this.dao.saveTemplateVariable(tv);
    } 
  }
  
  @Transactional
  public void deleteShuruMoban(String id) {
    this.dao.deleteWenZhenbanById(id);
    List<TemplateVariable> list = this.dao.findTemplateVariable(Long.valueOf(Long.parseLong(id)));
    if (list.size() > 0)
      for (TemplateVariable tv : list)
        this.dao.deleteTemplateVariable(tv);  
  }
  
  public Map<String, Object> findInspectionItemComboByPage(Page page, String gonghao, String search) {
    Map<String, Object> map = new HashMap<>();
    YuanGong yg = this.iygDao.obtainYuanGongByGonghao(gonghao);
    List<Map<String, Object>> list = this.dao.findInspectionItemComboByPage(page, yg, search);
    for (Map m : list) {
      String inspectionitemIds = m.get("inspectionitemIds").toString();
      String inspectionitemPY = "";
      List<Jcxm> Jcxmlist = this.jcxmDao.findJcxmsByIds(inspectionitemIds);
      for (int i = 0; i < Jcxmlist.size(); i++) {
        inspectionitemPY = String.valueOf(inspectionitemPY) + ((Jcxm)Jcxmlist.get(i)).getXmmc() + ",";
        if (i == Jcxmlist.size() - 1)
          inspectionitemPY = inspectionitemPY.substring(0, inspectionitemPY.length() - 1); 
      } 
      m.put("inspectionitemPY", inspectionitemPY);
    } 
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  @Transactional
  public void saveCompositeTemplate(RecordSets rs, List<RecordSetsDetail> list) {
    Integer id = this.dao.saveRecordSets(rs);
    for (RecordSetsDetail rsd : list) {
      ShuruMoban sm = new ShuruMoban();
      sm.setShuru(rsd.getContent());
      InputPinYinToDatabase ipytd = new InputPinYinToDatabase(sm);
      Map map = ipytd.inputAndPinyinToDatabase();
      rsd.setContent(map.get("input").toString());
      rsd.setRecordsetsId(id);
      Integer rsd_id = this.dao.saveRecordSetsDetail(rsd);
      List<TemplateVariable> list1 = (List<TemplateVariable>)map.get("variablecollection");
      for (TemplateVariable tv : list1) {
        tv.setShuruId(Long.valueOf(Integer.valueOf(rsd_id.intValue()).longValue()));
        tv.setCategory(OimsCategoryConfig.inputcategory_composite);
        this.dao.saveTemplateVariable(tv);
      } 
    } 
  }
  
  public Map<String, Object> findCompositeTemplateByPage(Page page, String gonghao, String search) {
    Map<String, Object> map = new HashMap<>();
    YuanGong yg = this.iygDao.obtainYuanGongByGonghao(gonghao);
    List list = this.dao.findCompositeTemplateByPage(page, yg, search);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public List<RecordSetsDetail> findAllTemplateByCompositeId(String id) {
    List<RecordSetsDetail> listtemplates = this.dao.findAllTemplateByCompositeId(id);
    for (RecordSetsDetail rsd : listtemplates) {
      String template = rsd.getContent();
      List<TemplateVariable> listvariable = this.dao.findCompositeTemplateVariable(Long.valueOf(rsd.getId().intValue()));
      if (listvariable.size() > 0)
        for (int i = 0; i < listvariable.size(); i++)
          template = template.replaceFirst("\\?", "{" + ((TemplateVariable)listvariable.get(i)).getVariable() + "}");  
      rsd.setContent(template);
    } 
    return listtemplates;
  }
  
  @Transactional
  public void updateCompositeTemplate(RecordSets rs, List<RecordSetsDetail> list) {
    this.dao.updateRecordSets(rs);
    for (RecordSetsDetail rsd : list) {
      ShuruMoban sm = new ShuruMoban();
      sm.setShuru(rsd.getContent());
      InputPinYinToDatabase ipytd = new InputPinYinToDatabase(sm);
      Map map = ipytd.inputAndPinyinToDatabase();
      rsd.setContent(map.get("input").toString());
      rsd.setRecordsetsId(rs.getId());
      this.dao.updateRecordSetsDetail(rsd);
      this.dao.deleteAllVariablesByRecordSetsDetailId(rsd.getId());
      List<TemplateVariable> list1 = (List<TemplateVariable>)map.get("variablecollection");
      for (TemplateVariable tv : list1) {
        tv.setShuruId(Long.valueOf(Integer.valueOf(rsd.getId().intValue()).longValue()));
        tv.setCategory(OimsCategoryConfig.inputcategory_composite);
        this.dao.saveTemplateVariable(tv);
      } 
    } 
  }
  
  @Transactional
  public void deleteCompositeTemplate(String id) {
    this.dao.deleteCompositeTemplate(id);
    List<RecordSetsDetail> list = this.dao.findAllTemplateByCompositeId(id);
    for (RecordSetsDetail rsd : list) {
      this.dao.deleteAllVariablesByRecordSetsDetailId(rsd.getId());
      this.dao.deleteRecordSetsDetail(rsd);
    } 
  }
  
  public void addInspectionItemCombo(InspectionItemCombo iic) {
    this.dao.addInspectionItemCombo(iic);
  }
  
  public void updateInspectionItemCombo(InspectionItemCombo iic) {
    this.dao.updateInspectionItemCombo(iic);
  }
  
  public void delInspectionItemComboById(String id) {
    InspectionItemCombo iic = this.dao.findInspectionItemComboById(id);
    this.dao.delInspectionItemComboById(iic);
  }
  
  public String findComboTreeChildrenByPid(String id, String categoryId) {
    String sc = "[";
    List<InquiryComboTreeNode> list = this.dao.findComboTreeChildrenByPid(id, categoryId);
    int i = 0;
    for (InquiryComboTreeNode ict : list) {
      sc = String.valueOf(sc) + "{";
      List<InquiryComboTreeNode> l = this.dao.findComboTreeChildrenByPid(ict.getId().toString(), categoryId);
      if (l.size() != 0) {
        sc = String.valueOf(sc) + String.format("\"id\":\"%s\", \"text\":\"%s\",\"state\":\"closed\"", new Object[] { ict.getId(), ict.getText() });
      } else {
        sc = String.valueOf(sc) + String.format("\"id\":\"%s\", \"text\":\"%s\",\"state\":\"\",\"iconCls\":\"icon-ly-fold\"", new Object[] { ict.getId(), ict.getText() });
      } 
      sc = String.valueOf(sc) + "}";
      i++;
      if (i != list.size())
        sc = String.valueOf(sc) + ","; 
    } 
    sc = String.valueOf(sc) + "]";
    return sc;
  }
  
  public JSONObject saveOrUpdateTempletSort(InquiryComboTreeNode combo) {
    InquiryComboTreeNode existCombo = null;
    if (combo.getId() != null)
      existCombo = this.dao.findComboTreeNodeById(combo.getId().toString()); 
    if (existCombo == null)
      existCombo = new InquiryComboTreeNode(); 
    existCombo.setText(combo.getText());
    existCombo.setPid(combo.getPid());
    existCombo.setCategoryId(combo.getCategoryId());
    this.dao.saveOrUpdate(existCombo);
    return JSONObject.fromObject(existCombo);
  }
  
  @Transactional
  public Integer combotreeDelNode(String parameter) {
    String categoryId = this.dao.findNodeCategoryById(parameter);
    Integer it = findShuruMobanByFatherCategory(parameter, categoryId);
    if (it.intValue() == 0) {
      this.dao.combotreeDelNode(parameter);
      return Integer.valueOf(0);
    } 
    return it;
  }
  
  private Integer findShuruMobanByFatherCategory(String id, String categoryId) {
    List<ShuruMoban> s_list = this.dao.findShuruMobanByTreeNodeId(id);
    if (s_list.size() == 0) {
      List<InquiryComboTreeNode> i_list = this.dao.findComboTreeChildrenByPid(id, categoryId);
      return Integer.valueOf(i_list.size());
    } 
    return Integer.valueOf(s_list.size());
  }
  
  private Integer combotreeDelNodeWithChildren(List<Integer> pids) {
    List<Integer> pids1 = new ArrayList<>();
    for (Integer pid : pids) {
      List<Integer> list = this.dao.combotreeDelNodeChildren(pid);
      pids1.addAll(list);
    } 
    if (pids1.size() != 0)
      combotreeDelNodeWithChildren(pids1); 
    return Integer.valueOf(1);
  }
  
  public void combotreeModifyNode(String parameter, String parameter2) {
    InquiryComboTreeNode ict = this.dao.findComboTreeNodeById(parameter);
    ict.setText(parameter2);
    this.dao.combotreeModifyNode(ict);
  }
  
  public String findNodeAndMoBanByPid(String id, String categoryId) {
    String sc = "[";
    List<InquiryComboTreeNode> list = this.dao.findComboTreeChildrenByPid(id, categoryId);
    int i = 0;
    for (InquiryComboTreeNode ict : list) {
      sc = String.valueOf(sc) + "{";
      List<InquiryComboTreeNode> l = this.dao.findComboTreeChildrenByPid(ict.getId().toString(), categoryId);
      List<ShuruMoban> s_list = this.dao.findShuruMobanByTreeNodeId(ict.getId().toString());
      if (l.size() != 0 || s_list.size() != 0) {
        sc = String.valueOf(sc) + String.format("\"id\":\"%s\", \"text\":\"%s\",\"state\":\"closed\"", new Object[] { ict.getId(), ict.getText() });
      } else {
        sc = String.valueOf(sc) + String.format("\"id\":\"%s\", \"text\":\"%s\",\"state\":\"\",\"iconCls\":\"icon-ly-fold\"", new Object[] { ict.getId(), ict.getText() });
      } 
      sc = String.valueOf(sc) + "}";
      i++;
      if (i != list.size())
        sc = String.valueOf(sc) + ","; 
    } 
    List<ShuruMoban> list_s = this.dao.findShuruMobanByTreeNodeId(id);
    JSONArray items = JSONArray.fromObject(list_s);
    for (int j = 0; j < items.size(); j++) {
      if (list.size() == 0 && j == 0) {
        sc = String.valueOf(sc) + "{";
      } else {
        sc = String.valueOf(sc) + ",{";
      } 
      JSONObject item = items.getJSONObject(j);
      Long item_id = Long.valueOf(item.getLong("id"));
      List<TemplateVariable> list1 = this.doctorsWorkstationService.findTemplateVariable(item_id);
      JSONArray array = new JSONArray();
      for (TemplateVariable tv : list1) {
        String var = tv.getVariable().trim();
        String[] temp = var.split(this.regex);
        JSONArray arrayvariable = JSONArray.fromObject(temp);
        array.add(arrayvariable);
      } 
      sc = String.valueOf(sc) + String.format("\"id\":\"%s\",\"text\":\"%s\",\"state\":\"\",\"attributes\":{\"child\":" + array + "}", new Object[] { ((ShuruMoban)list_s.get(j)).getId(), ((ShuruMoban)list_s.get(j)).getShuru() });
      sc = String.valueOf(sc) + "}";
    } 
    sc = String.valueOf(sc) + "]";
    return sc;
  }
}
