package cn.com.oims.dao;

import cn.com.oims.dao.pojo.InquiryComboTreeNode;
import cn.com.oims.dao.pojo.InspectionItemCombo;
import cn.com.oims.dao.pojo.RecordSets;
import cn.com.oims.dao.pojo.RecordSetsDetail;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.TemplateVariable;
import cn.com.oims.dao.pojo.YuanGong;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public interface IShuruMobanDao extends BaseDao {
  int countsOfShuruMoban();
  
  List<ShuruMoban> findShuruMobansByPage(Page paramPage);
  
  List<ShuruMoban> findAllShuruMobans();
  
  void deleteShuruMobanById(Serializable paramSerializable);
  
  void saveOrUpdateShuruMoban(ShuruMoban paramShuruMoban);
  
  void updateShuruMoban(ShuruMoban paramShuruMoban);
  
  ShuruMoban findShuruMobanById(Serializable paramSerializable);
  
  List findAllShuruMobansByPage(Page paramPage, ShuruMoban paramShuruMoban);
  
  List findShuruMobansByShuruMoban(ShuruMoban paramShuruMoban);
  
  List<ShuruMoban> selectShuruMobansByShuruMoban(ShuruMoban paramShuruMoban);
  
  void saveTemplateVariable(TemplateVariable paramTemplateVariable);
  
  List findInputTemplateForPage(Page paramPage, String paramString1, YuanGong paramYuanGong, String paramString2);
  
  Serializable saveShuruMoban(ShuruMoban paramShuruMoban);
  
  List<TemplateVariable> findTemplateVariable(Long paramLong);
  
  void deleteTemplateVariable(TemplateVariable paramTemplateVariable);
  
  void deleteWenZhenbanById(String paramString);
  
  Integer saveRecordSets(RecordSets paramRecordSets);
  
  Integer saveRecordSetsDetail(RecordSetsDetail paramRecordSetsDetail);
  
  List<Map<String, Object>> findCompositeTemplateByPage(Page paramPage, YuanGong paramYuanGong, String paramString);
  
  List<RecordSetsDetail> findAllTemplateByCompositeId(String paramString);
  
  List findInspectionItemComboByPage(Page paramPage, YuanGong paramYuanGong, String paramString);
  
  List<TemplateVariable> findCompositeTemplateVariable(Long paramLong);
  
  void updateRecordSets(RecordSets paramRecordSets);
  
  void updateRecordSetsDetail(RecordSetsDetail paramRecordSetsDetail);
  
  void deleteAllVariablesByRecordSetsDetailId(Integer paramInteger);
  
  void deleteCompositeTemplate(String paramString);
  
  void deleteRecordSetsDetail(RecordSetsDetail paramRecordSetsDetail);
  
  void addInspectionItemCombo(InspectionItemCombo paramInspectionItemCombo);
  
  void updateInspectionItemCombo(InspectionItemCombo paramInspectionItemCombo);
  
  InspectionItemCombo findInspectionItemComboById(String paramString);
  
  void delInspectionItemComboById(InspectionItemCombo paramInspectionItemCombo);
  
  List<InquiryComboTreeNode> findComboTreeChildrenByPid(String paramString1, String paramString2);
  
  Integer combotreeAddNode(String paramString1, String paramString2);
  
  List<Integer> combotreeDelNodeChildren(Integer paramInteger);
  
  void combotreeDelNode(String paramString);
  
  InquiryComboTreeNode findComboTreeNodeById(String paramString);
  
  void combotreeModifyNode(InquiryComboTreeNode paramInquiryComboTreeNode);
  
  List<ShuruMoban> findShuruMobanByTreeNodeId(String paramString);
  
  String findNodeCategoryById(String paramString);
  
  void saveOrUpdate(Object paramObject);
}
