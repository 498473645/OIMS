package cn.com.oims.dao.impl;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.IShuruMobanDao;
import cn.com.oims.dao.pojo.InquiryComboTreeNode;
import cn.com.oims.dao.pojo.InspectionItemCombo;
import cn.com.oims.dao.pojo.RecordSets;
import cn.com.oims.dao.pojo.RecordSetsDetail;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.TemplateVariable;
import cn.com.oims.dao.pojo.YuanGong;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

@Component
public class ShuruMobanDaoImpl extends BaseDaoImpl implements IShuruMobanDao {
  private String clazzName = ShuruMoban.class.getSimpleName();
  
  private static String s_result = "";
  
  private int hospital = 101;
  
  private int department = 102;
  
  private int office = 103;
  
  private int personal = 104;
  
  private String regex = " ";
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(ShuruMoban.class);
  }
  
  @Override
  public int countsOfShuruMoban() {
    Long l = (Long)this.hibernateTemplate.findByCriteria(this.getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }
  
  @Override
  public List<ShuruMoban> findShuruMobansByPage(Page page) {
    page.setRowsCount(Integer.valueOf(countsOfShuruMoban()));
    page.init();
    return this.hibernateTemplate.findByCriteria(getDC(), page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<ShuruMoban> findAllShuruMobans() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  @Override
  public void deleteShuruMobanById(Serializable id) {
    String sql = "delete from " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public Serializable saveShuruMoban(ShuruMoban shurumoban) {
    return this.hibernateTemplate.save(shurumoban);
  }
  
  @Override
  public void saveOrUpdateShuruMoban(ShuruMoban shurumoban) {
    this.hibernateTemplate.saveOrUpdate(shurumoban);
  }
  
  @Override
  public void updateShuruMoban(ShuruMoban shurumoban) {
    this.hibernateTemplate.update(shurumoban);
  }
  
  @Override
  public ShuruMoban findShuruMobanById(Serializable id) {
    return (ShuruMoban)this.hibernateTemplate.get(ShuruMoban.class, id);
  }
  
  @Override
  public List findAllShuruMobansByPage(Page page, ShuruMoban shurumoban) {
    String hql_count = "select count(shurumoban.id) from ShuruMoban  shurumoban,BuMen  bumen,Category  jibiecategory,Category  fenleicategory,YuanGong  yuangong";
    String hql_map = "select new map(shurumoban.id as shurumobanid,shurumoban.addTime as addTime,shurumoban.bmId as bmId,bumen.bmmc as bmmc,shurumoban.categoryId as categoryId,fenleicategory.category as categoryName,shurumoban.gonghao as gonghao,yuangong.xingming as xingming,shurumoban.jcxmId as jcxmId,shurumoban.jibie as jibie,jibiecategory.category as jibieName,shurumoban.suoyin as suoyin,shurumoban.pinyin as pinyin,shurumoban.shuru as shuru ) from ShuruMoban  shurumoban,BuMen  bumen,Category  jibiecategory,Category  fenleicategory,YuanGong  yuangong";
    String strWhere = " where 1=1 ";
    if (shurumoban.getCategoryId() != null) {
      strWhere = String.valueOf(strWhere) + " and shurumoban.categoryId=" + shurumoban.getCategoryId();
    }
    if (shurumoban.getSuoyin() != null && !"".equals(shurumoban.getSuoyin())) {
      strWhere = String.valueOf(strWhere) + " and shurumoban.suoyin like '%" + shurumoban.getSuoyin() + "%'";
    }
    strWhere = String.valueOf(strWhere) + " and shurumoban.bmId=bumen.id ";
    strWhere = String.valueOf(strWhere) + " and shurumoban.gonghao=yuangong.gonghao ";
    strWhere = String.valueOf(strWhere) + " and shurumoban.categoryId=fenleicategory.id ";
    strWhere = String.valueOf(strWhere) + " and shurumoban.jibie=jibiecategory.id ";
    strWhere = String.valueOf(strWhere) + " order by shurumoban.id desc";
    hql_count = String.valueOf(hql_count) + strWhere;
    hql_map = String.valueOf(hql_map) + strWhere;
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List list = getListForPage(hql_map, page.getStartRow().intValue(), page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List findShuruMobansByShuruMoban(ShuruMoban shurumoban) {
    String hql_map = "select new map(shurumoban.id as index,shurumoban.shuru as val ) from ShuruMoban  shurumoban";
    String strWhere = " where 1=1 ";
    if (shurumoban.getCategoryId() != null) {
      strWhere = String.valueOf(strWhere) + " and shurumoban.categoryId=" + shurumoban.getCategoryId();
    }
    hql_map = String.valueOf(hql_map) + strWhere;
    return this.hibernateTemplate.find(hql_map);
  }
  
  @Override
  public List<ShuruMoban> selectShuruMobansByShuruMoban(ShuruMoban shurumoban) {
    return this.hibernateTemplate.findByExample(shurumoban);
  }
  
  @Override
  public void saveTemplateVariable(TemplateVariable tv) {
    this.hibernateTemplate.save(tv);
  }
  
  @Override
  public List findInputTemplateForPage(Page page, String categoryId, YuanGong employee, String suoyin) {
    StringBuilder hql = new StringBuilder();
    hql.append("from ShuruMoban sm , YuanGong yg , Category c where sm.gonghao=yg.gonghao and sm.categoryId=c.id ");
    hql.append("and sm.categoryId=").append(categoryId);
    hql.append(" and (");
    hql.append("(sm.jibie=").append(this.hospital).append(") ");
    hql.append("or (sm.jibie=").append(this.department).append(" and sm.bmId=").append(employee.getBumenId()).append(") ");
    hql.append("or (sm.jibie=").append(this.office).append(" and sm.bmId=").append(employee.getBgsId()).append(") ");
    hql.append("or (sm.jibie=").append(this.personal).append(" and sm.gonghao='").append(employee.getGonghao()).append("') ");
    hql.append(")");
    StringBuilder hql_count = new StringBuilder();
    hql_count.append("select count(*) ");
    hql_count.append(hql);
    StringBuilder hql_map = new StringBuilder();
    hql_map.append("select new map(sm.id as id,sm.shuru as shuru,sm.suoyin as suoyin,sm.bmId as bmId,yg.xingming as xingming,");
    hql_map.append("sm.jcxmId as jcxmId,sm.addTime as addTime,c.id as categoryId,c.category as category,sm.jibie as jibie,sm.treeNodeId as treeNodeId) ");
    hql_map.append(hql);
    if (suoyin != null && suoyin.trim() != "") {
      hql_count.append(" and sm.suoyin like '%" + suoyin + "%' order by sm.id asc");
      hql_map.append(" and sm.suoyin like '%" + suoyin + "%' order by sm.id asc");
    }

    page.setRowsCount(this.count(hql_count.toString()));
    page.init();
    List<Map<String, Object>> list = this.getListForPage(hql_map.toString(), page.getStartRow(), page.getPageSize());

    Map m;
    String value;
    for(Iterator var10 = list.iterator(); var10.hasNext(); m.put("shuru_display", this.shuru_display(value))) {
      m = (Map)var10.next();
      value = m.get("shuru").toString();
      String id = m.get("id").toString();
      List<TemplateVariable> list1 = this.hibernateTemplate.find("from TemplateVariable where shuruId=" + id + " and category=" + OimsCategoryConfig.inputcategory_common + " order by vindex asc");
      if (list1.size() > 0) {
        for(int i = 0; i < list1.size(); ++i) {
          value = value.replaceFirst("\\?", "{" + ((TemplateVariable)list1.get(i)).getVariable() + "}");
        }

        m.put("shuru", value);
      }
    }

    return list;
  }
  
  public String shuru_display(String s) {
    Pattern pattern = Pattern.compile("\\{([^\\{]*?)\\}");
    Matcher matcher = pattern.matcher(s);
    StringBuffer buffer = new StringBuffer();
    int end = s.length();
    while (matcher.find()) {
      String group = matcher.group();
      group = group.substring(1, group.length() - 1);
      String[] tvStr = group.split(this.regex);
      matcher.appendReplacement(buffer, tvStr[0]);
      end = matcher.end();
    } 
    if (buffer.length() > 0) {
      return buffer.append(s.substring(end)).toString();
    }
    return s;
  }
  
  @Override
  public List<TemplateVariable> findTemplateVariable(Long id) {
    String hql = "from TemplateVariable where shuruId=" + id + " and category=" + OimsCategoryConfig.inputcategory_common;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public void deleteTemplateVariable(TemplateVariable tv) {
    this.hibernateTemplate.delete(tv);
  }
  
  @Override
  public void deleteWenZhenbanById(String id) {
    ShuruMoban sm = findShuruMobanById(Long.valueOf(Long.parseLong(id)));
    this.hibernateTemplate.delete(sm);
  }
  
  @Override
  public List findInspectionItemComboByPage(Page page, YuanGong yg, String search) {
    StringBuilder hql = new StringBuilder();
    hql.append("from InspectionItemCombo iic , YuanGong yg,Category c  where iic.operator=yg.gonghao and iic.level=c.id");
    hql.append(" and (");
    hql.append("(iic.level=").append(this.hospital).append(") ");
    hql.append("or (iic.level=").append(this.department).append(" and iic.bmId=").append(yg.getBumenId()).append(") ");
    hql.append("or (iic.level=").append(this.office).append(" and iic.bmId=").append(yg.getBgsId()).append(") ");
    hql.append("or (iic.level=").append(this.personal).append(" and iic.operator='").append(yg.getGonghao()).append("') ");
    hql.append(")");
    StringBuilder hql_count = new StringBuilder();
    hql_count.append("select count(*) ");
    hql_count.append(hql);
    StringBuilder hql_map = new StringBuilder();
    hql_map.append("select new map(iic.id as id,iic.name as name,iic.level as level,c.category as levelDisplay,iic.bmId as bmId,yg.xingming as xingming,iic.inspectionitemIds as inspectionitemIds) ");
    hql_map.append(hql);
    if (search != null && search.trim() != "") {
      hql_count.append(" and iic.name like '%" + search + "%' order by iic.id asc");
      hql_map.append(" and iic.name like '%" + search + "%' order by iic.id asc");
      System.out.println(hql_map);
    } 
    page.setRowsCount(Integer.valueOf(count(hql_count.toString())));
    page.init();
    List<Map<String, Object>> list = getListForPage(hql_map.toString(), page.getStartRow().intValue(), page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void addInspectionItemCombo(InspectionItemCombo iic) {
    this.hibernateTemplate.save(iic);
  }
  
  @Override
  public void updateInspectionItemCombo(InspectionItemCombo iic) {
    this.hibernateTemplate.update(iic);
  }
  
  @Override
  public InspectionItemCombo findInspectionItemComboById(String id) {
    String hql = "from InspectionItemCombo where id=" + id;
    List<InspectionItemCombo> list = this.hibernateTemplate.find(hql);
    return list.get(0);
  }
  
  @Override
  public void delInspectionItemComboById(InspectionItemCombo iic) {
    this.hibernateTemplate.delete(iic);
  }
  
  @Override
  public Integer saveRecordSets(RecordSets rs) {
    return (Integer)this.hibernateTemplate.save(rs);
  }
  
  @Override
  public Integer saveRecordSetsDetail(RecordSetsDetail rsd) {
    return (Integer)this.hibernateTemplate.save(rsd);
  }
  
  @Override
  public List<Map<String, Object>> findCompositeTemplateByPage(Page page, YuanGong yg, String search) {
    StringBuilder hql = new StringBuilder();
    hql.append("from RecordSets rs,JiBing d,YuanGong y,Category c,BuMen bm where bm.id=rs.bmId and c.id=rs.level and d.id=rs.diseaseid and y.gonghao=rs.operator ");
    hql.append(" and (");
    hql.append("(rs.level=").append(this.hospital).append(") ");
    hql.append("or (rs.level=").append(this.department).append(" and rs.bmId=").append(yg.getBumenId()).append(") ");
    hql.append("or (rs.level=").append(this.office).append(" and rs.bmId=").append(yg.getBgsId()).append(") ");
    hql.append("or (rs.level=").append(this.personal).append(" and rs.operator='").append(yg.getGonghao()).append("') ");
    hql.append(")");
    StringBuilder hql_count = new StringBuilder();
    hql_count.append("select count(*) ");
    hql_count.append(hql);
    StringBuilder hql_map = new StringBuilder();
    hql_map.append("select new map(rs.id as id,rs.name as name,rs.diseaseid as diseaseid,d.disease as disease,d.icd_code as icd_code,rs.bmId as bmId,bm.bmmc as bmmc,c.category as category,rs.level as level, y.xingming as operator) ");
    hql_map.append(hql);
    if (search != null && search.trim() != "") {
      hql_count.append(" and ( d.disease like '%" + search + "%' or rs.name like '%" + search + "%') ");
      hql_map.append(" and ( d.disease like '%" + search + "%' or rs.name like '%" + search + "%') ");
    } 
    hql_map.append(" order by rs.id asc");
    page.setRowsCount(Integer.valueOf(count(hql_count.toString())));
    page.init();
    List<Map<String, Object>> list = getListForPage(hql_map.toString(), page.getStartRow().intValue(), page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<RecordSetsDetail> findAllTemplateByCompositeId(String id) {
    String hql = "from RecordSetsDetail where recordsetsId=" + id;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<TemplateVariable> findCompositeTemplateVariable(Long valueOf) {
    String hql = "from TemplateVariable where shuruId=" + valueOf + " and category=" + OimsCategoryConfig.inputcategory_composite;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public void updateRecordSets(RecordSets rs) {
    this.hibernateTemplate.update(rs);
  }
  
  @Override
  public void updateRecordSetsDetail(RecordSetsDetail rsd) {
    this.hibernateTemplate.update(rsd);
  }
  
  @Override
  public void deleteAllVariablesByRecordSetsDetailId(Integer id) {
    String hql = "from TemplateVariable where shuruId=" + id + " and category=" + OimsCategoryConfig.inputcategory_composite;
    List list = this.hibernateTemplate.find(hql);
    this.hibernateTemplate.deleteAll(list);
  }
  
  @Override
  public void deleteCompositeTemplate(String id) {
    RecordSets rs = (RecordSets)this.hibernateTemplate.get(RecordSets.class, Integer.valueOf(Integer.parseInt(id)));
    this.hibernateTemplate.delete(rs);
  }
  
  @Override
  public void deleteRecordSetsDetail(RecordSetsDetail rsd) {
    this.hibernateTemplate.delete(rsd);
  }
  
  public Object get(final Class cla, final Serializable id) {
    HibernateCallback hc = new HibernateCallback() {
        @Override
        public Object doInHibernate(Session session) throws HibernateException, SQLException {
          Object items = null;
          items = session.get(cla, id);
          return items;
        }
      };
    return this.hibernateTemplate.execute(hc);
  }
  
  @Override
  public List<InquiryComboTreeNode> findComboTreeChildrenByPid(String id, String categoryId) {
    String hql = "from InquiryComboTreeNode  ict where pid=" + id + " and categoryId=" + categoryId;
    List<InquiryComboTreeNode> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public Integer combotreeAddNode(String parameter, String categoryId) {
    InquiryComboTreeNode ict = new InquiryComboTreeNode();
    ict.setPid(Integer.valueOf(Integer.parseInt(parameter)));
    ict.setText("new item1");
    ict.setCategoryId(Integer.valueOf(Integer.parseInt(categoryId)));
    return (Integer)this.hibernateTemplate.save(ict);
  }
  
  @Override
  public List<Integer> combotreeDelNodeChildren(Integer pid) {
    String hql = "from InquiryComboTreeNode where pid=" + pid;
    List<InquiryComboTreeNode> list = this.hibernateTemplate.find(hql);
    List<Integer> ids = new ArrayList<Integer>();
    for (InquiryComboTreeNode ict : list) {
      ids.add(ict.getId());
    }
    this.hibernateTemplate.deleteAll(list);
    return ids;
  }
  
  @Override
  public void combotreeDelNode(String parameter) {
    InquiryComboTreeNode ict = findComboTreeNodeById(parameter);
    this.hibernateTemplate.delete(ict);
  }
  
  @Override
  public InquiryComboTreeNode findComboTreeNodeById(String parameter) {
    return (InquiryComboTreeNode)this.hibernateTemplate.get(InquiryComboTreeNode.class, Integer.valueOf(Integer.parseInt(parameter)));
  }
  
  @Override
  public void combotreeModifyNode(InquiryComboTreeNode ict) {
    this.hibernateTemplate.update(ict);
  }
  
  @Override
  public List<ShuruMoban> findShuruMobanByTreeNodeId(String string) {
    String hql = "from ShuruMoban where treeNodeId=" + string;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public String findNodeCategoryById(String parameter) {
    InquiryComboTreeNode ict = (InquiryComboTreeNode)this.hibernateTemplate.get(InquiryComboTreeNode.class, Integer.valueOf(Integer.parseInt(parameter)));
    return ict.getCategoryId().toString();
  }
  
  @Override
  public void saveOrUpdate(Object entity) {
    this.hibernateTemplate.saveOrUpdate(entity);
  }
}
