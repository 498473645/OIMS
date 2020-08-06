package cn.com.oims.service;

import cn.com.oims.dao.pojo.InquiryComboTreeNode;
import cn.com.oims.dao.pojo.InspectionItemCombo;
import cn.com.oims.dao.pojo.RecordSets;
import cn.com.oims.dao.pojo.RecordSetsDetail;
import cn.com.oims.dao.pojo.ShuruMoban;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONObject;

public interface IShuruMobanService {
  int countsOfShuruMoban();
  
  List<ShuruMoban> findShuruMobansByPage(Page paramPage);
  
  List<ShuruMoban> findAllShuruMobans();
  
  void deleteShuruMobanById(Serializable paramSerializable);
  
  void saveOrUpdateShuruMoban(ShuruMoban paramShuruMoban);
  
  void updateShuruMoban(ShuruMoban paramShuruMoban);
  
  ShuruMoban findShuruMobanById(Serializable paramSerializable);
  
  Map<String, Object> findAllShuruMobansByPage(Page paramPage, ShuruMoban paramShuruMoban);
  
  List findShuruMobansByShuruMoban(ShuruMoban paramShuruMoban);
  
  List<ShuruMoban> selectShuruMobansByShuruMoban(ShuruMoban paramShuruMoban);
  
  Map<String, Object> findInputTemplateForPage(Page paramPage, String paramString1, String paramString2, String paramString3);
  
  void updateInputTemplates(ShuruMoban paramShuruMoban);
  
  void deleteShuruMoban(String paramString);
  
  Serializable saveShuruMoban(ShuruMoban paramShuruMoban);
  
  void saveCompositeTemplate(RecordSets paramRecordSets, List<RecordSetsDetail> paramList);
  
  Map<String, Object> findCompositeTemplateByPage(Page paramPage, String paramString1, String paramString2);
  
  List<RecordSetsDetail> findAllTemplateByCompositeId(String paramString);
  
  void updateCompositeTemplate(RecordSets paramRecordSets, List<RecordSetsDetail> paramList);
  
  void deleteCompositeTemplate(String paramString);
  
  Map<String, Object> findInspectionItemComboByPage(Page paramPage, String paramString1, String paramString2);
  
  void addInspectionItemCombo(InspectionItemCombo paramInspectionItemCombo);
  
  void updateInspectionItemCombo(InspectionItemCombo paramInspectionItemCombo);
  
  void delInspectionItemComboById(String paramString);
  
  String findComboTreeChildrenByPid(String paramString1, String paramString2);
  
  JSONObject saveOrUpdateTempletSort(InquiryComboTreeNode paramInquiryComboTreeNode);
  
  Integer combotreeDelNode(String paramString);
  
  void combotreeModifyNode(String paramString1, String paramString2);
  
  String findNodeAndMoBanByPid(String paramString1, String paramString2);
  
  Serializable saveShuruMobanEMR(ShuruMoban paramShuruMoban);
}
