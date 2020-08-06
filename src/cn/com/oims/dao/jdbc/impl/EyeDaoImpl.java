package cn.com.oims.dao.jdbc.impl;

import cn.com.oims.dao.jdbc.IEyeDao;
import cn.com.oims.dao.pojo.EyeInfoOutpClinic;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import java.lang.reflect.AccessibleObject;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class EyeDaoImpl implements IEyeDao {
  private String LANUAGE;
  
  private String YKLANGUAGE;
  
  private JdbcTemplate jdbcTemplate;
  
  public EyeDaoImpl() {
    this.LANUAGE = "GBK";
    this.YKLANGUAGE = "iso-8859-1";
  }
  
  @Resource
  public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }
  
  @Override
  public EyeInfoOutpClinic getEyeInfoOutpClinic(String patientId, Date visitDate, String docName) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    String sql = "select * from eye_info_outp_clinic where patient_id='" + patientId + "' and cli_date like '" + sdf.format(visitDate) + "%' and doc_name='" + docName + "'";
    List<EyeInfoOutpClinic> list = this.jdbcTemplate.query(sql, new RowMapper<EyeInfoOutpClinic>() {
          @Override
          public EyeInfoOutpClinic mapRow(ResultSet rs, int arg1) throws SQLException {
            EyeInfoOutpClinic eioc = new EyeInfoOutpClinic();
            try {
              eioc.setFlow_no(rs.getString("flow_no"));
              eioc.setCli_date(rs.getString("cli_date"));
              eioc.setClinic_room(rs.getString("clinic_room"));
              eioc.setDoc_name(rs.getString("doc_name"));
              eioc.setEye_jc_l_blt(rs.getString("eye_jc_l_blt"));
              eioc.setEye_jc_l_gdw(rs.getString("eye_jc_l_gdw"));
              eioc.setEye_jc_l_gm(rs.getString("eye_jc_l_gm"));
              eioc.setEye_jc_l_hm(rs.getString("eye_jc_l_hm"));
              eioc.setEye_jc_l_jianl(rs.getString("eye_jc_l_jianl"));
              eioc.setEye_jc_l_jiaom(rs.getString("eye_jc_l_jiaom"));
              eioc.setEye_jc_l_jiem(rs.getString("eye_jc_l_jiem"));
              eioc.setEye_jc_l_jt(rs.getString("eye_jc_l_jt"));
              eioc.setEye_jc_l_lq(rs.getString("eye_jc_l_lq"));
              eioc.setEye_jc_l_qf(rs.getString("eye_jc_l_qf"));
              eioc.setEye_jc_l_sj(rs.getString("eye_jc_l_sj"));
              eioc.setEye_jc_l_sl(rs.getString("eye_jc_l_sl"));
              eioc.setEye_jc_l_swm(rs.getString("eye_jc_l_swm"));
              eioc.setEye_jc_l_tk(rs.getString("eye_jc_l_tk"));
              eioc.setEye_jc_l_yjqk(rs.getString("eye_jc_l_yjqk"));
              eioc.setEye_jc_l_yq(rs.getString("eye_jc_l_yq"));
              eioc.setEye_jc_l_zp(rs.getString("eye_jc_l_zp"));
              eioc.setEye_jc_r_blt(rs.getString("eye_jc_r_blt"));
              eioc.setEye_jc_r_gdw(rs.getString("eye_jc_r_gdw"));
              eioc.setEye_jc_r_gm(rs.getString("eye_jc_r_gm"));
              eioc.setEye_jc_r_hm(rs.getString("eye_jc_r_hm"));
              eioc.setEye_jc_r_jianl(rs.getString("eye_jc_r_jianl"));
              eioc.setEye_jc_r_jiaom(rs.getString("eye_jc_r_jiaom"));
              eioc.setEye_jc_r_jiem(rs.getString("eye_jc_r_jiem"));
              eioc.setEye_jc_r_jt(rs.getString("eye_jc_r_jt"));
              eioc.setEye_jc_r_lq(rs.getString("eye_jc_r_lq"));
              eioc.setEye_jc_r_qf(rs.getString("eye_jc_r_qf"));
              eioc.setEye_jc_l_sj(rs.getString("eye_jc_l_sj"));
              eioc.setEye_jc_r_sl(rs.getString("eye_jc_r_sl"));
              eioc.setEye_jc_r_swm(rs.getString("eye_jc_r_swm"));
              eioc.setEye_jc_r_tk(rs.getString("eye_jc_r_tk"));
              eioc.setEye_jc_r_yjqk(rs.getString("eye_jc_r_yjqk"));
              eioc.setEye_jc_r_yq(rs.getString("eye_jc_r_yq"));
              eioc.setEye_jc_r_zp(rs.getString("eye_jc_r_zp"));
              eioc.setFinal_diag(rs.getString("final_diag"));
              eioc.setFirst_diagn(rs.getString("first_diagn"));
              eioc.setPatient_age(Integer.valueOf(rs.getInt("patient_age")));
              eioc.setPatient_his_jwst(rs.getString("patient_his_jwst"));
              eioc.setPatient_his_present(rs.getString("patient_his_present"));
              eioc.setPatient_id(rs.getString("patient_id"));
              eioc.setPatient_xbs(rs.getString("patient_xbs"));
              eioc.setTreatment_info(rs.getString("treatment_info"));
            } catch (Exception e) {
              e.printStackTrace();
            } 
            return eioc;
          }
        });
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public void saveEyeInfoOutpClinic(EyeInfoOutpClinic clinic) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
    if (clinic.getFlow_no() == null || clinic.getFlow_no().isEmpty()) {
      String flowNo = String.valueOf(clinic.getPatient_id()) + sdf.format(clinic.getVisit_date());
      clinic.setFlow_no(flowNo);
    } 
    StringBuffer sb = new StringBuffer("insert into eye_info_outp_clinic (");
    StringBuffer sbv = new StringBuffer(" values(");
    Field[] fields = EyeInfoOutpClinic.class.getDeclaredFields();
    AccessibleObject.setAccessible((AccessibleObject[])fields, true);
    int i = 0;
    sdf.applyPattern("yyyy-MM-dd HH:mm:ss");
    byte b;
    int j;
    Field[] arrayOfField1;
    for (j = (arrayOfField1 = fields).length, b = 0; b < j; ) {
      Field field = arrayOfField1[b];
      Object value = null;
      try {
        value = field.get(clinic);
      } catch (Exception e1) {
        e1.printStackTrace();
      } 
      if (value != null) {
        if (i > 0) {
          sb.append(",");
          sbv.append(",");
        } 
        String name = field.getName().toLowerCase();
        if (!"serialversionuid".equals(name)) {
          sb.append(name);
          Type t = field.getGenericType();
          if (t instanceof Date) {
            String v = sdf.format(value);
            sbv.append("to_date('" + v + "','yyyy-MM-dd HH:mm:ss')");
          } else {
            value = value.toString().replaceAll("'", "''");
            sbv.append("'" + value + "'");
          } 
          i++;
        } 
      } 
      b++;
    } 
    sb.append(")");
    sbv.append(")");
    String sql = sb.append(sbv).toString();
    this.jdbcTemplate.execute(sql);
  }
  
  @Override
  public void updateEyeInfoOutpClinic(EyeInfoOutpClinic clinic) {
    if (clinic.getFlow_no() == null || clinic.getFlow_no().isEmpty()) {
      throw new RuntimeException("没有传主键FLOW_NO");
    }
    StringBuffer sb = new StringBuffer("update  eye_info_outp_clinic set ");
    Field[] fields = EyeInfoOutpClinic.class.getDeclaredFields();
    AccessibleObject.setAccessible((AccessibleObject[])fields, true);
    int i = 0;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    byte b;
    int j;
    Field[] arrayOfField1;
    for (j = (arrayOfField1 = fields).length, b = 0; b < j; ) {
      Field field = arrayOfField1[b];
      Object value = null;
      try {
        value = field.get(clinic);
      } catch (IllegalArgumentException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } 
      if (value != null) {
        if (i > 0) {
          sb.append(",");
        }
        String name = field.getName().toLowerCase();
        if (!"serialversionuid".equals(name)) {
          sb.append(String.valueOf(name) + "=");
          Type t = field.getGenericType();
          if (t instanceof Date) {
            String v = sdf.format(value);
            sb.append("to_date('" + v + "','yyyy-MM-dd HH:mm:ss')");
          } else {
            value = value.toString().replaceAll("'", "''");
            sb.append("'" + value + "'");
          } 
          i++;
        } 
      } 
      b++;
    } 
    String sql = sb.append(" where flow_no='" + clinic.getFlow_no() + "'").toString();
    this.jdbcTemplate.execute(sql);
  }
  
  @Override
  public List<EyeInfoOutpClinic> getEyeInfoOutpClinicList(String patientId) {
    String sql = "select * from eye_info_outp_clinic where patient_id='" + patientId + "' order by cli_date desc";
    List<EyeInfoOutpClinic> list = this.jdbcTemplate.query(sql, new RowMapper<EyeInfoOutpClinic>() {
          @Override
          public EyeInfoOutpClinic mapRow(ResultSet rs, int arg1) throws SQLException {
            EyeInfoOutpClinic eioc = new EyeInfoOutpClinic();
            try {
              eioc.setFlow_no((rs.getString("flow_no") == null) ? null : new String(rs.getString("flow_no").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setCli_date((rs.getString("cli_date") == null) ? null : new String(rs.getString("cli_date").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setClinic_room((rs.getString("clinic_room") == null) ? null : new String(rs.getString("clinic_room").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setDoc_name((rs.getString("doc_name") == null) ? null : new String(rs.getString("doc_name").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_blt((rs.getString("eye_jc_l_blt") == null) ? null : new String(rs.getString("eye_jc_l_blt").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_gdw((rs.getString("eye_jc_l_gdw") == null) ? null : new String(rs.getString("eye_jc_l_gdw").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_gm((rs.getString("eye_jc_l_gm") == null) ? null : new String(rs.getString("eye_jc_l_gm").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_hm((rs.getString("eye_jc_l_hm") == null) ? null : new String(rs.getString("eye_jc_l_hm").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_jianl((rs.getString("eye_jc_l_jianl") == null) ? null : new String(rs.getString("eye_jc_l_jianl").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_jiaom((rs.getString("eye_jc_l_jiaom") == null) ? null : new String(rs.getString("eye_jc_l_jiaom").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_jiem((rs.getString("eye_jc_l_jiem") == null) ? null : new String(rs.getString("eye_jc_l_jiem").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_jt((rs.getString("eye_jc_l_jt") == null) ? null : new String(rs.getString("eye_jc_l_jt").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_lq((rs.getString("eye_jc_l_lq") == null) ? null : new String(rs.getString("eye_jc_l_lq").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_qf((rs.getString("eye_jc_l_qf") == null) ? null : new String(rs.getString("eye_jc_l_qf").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_sj((rs.getString("eye_jc_l_sj") == null) ? null : new String(rs.getString("eye_jc_l_sj").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_sj((rs.getString("eye_jc_r_sj") == null) ? null : new String(rs.getString("eye_jc_r_sj").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_sl((rs.getString("eye_jc_l_sl") == null) ? null : new String(rs.getString("eye_jc_l_sl").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_swm((rs.getString("eye_jc_l_swm") == null) ? null : new String(rs.getString("eye_jc_l_swm").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_tk((rs.getString("eye_jc_l_tk") == null) ? null : new String(rs.getString("eye_jc_l_tk").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_yjqk((rs.getString("eye_jc_l_yjqk") == null) ? null : new String(rs.getString("eye_jc_l_yjqk").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_yq((rs.getString("eye_jc_l_yq") == null) ? null : new String(rs.getString("eye_jc_l_yq").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_l_zp((rs.getString("eye_jc_l_zp") == null) ? null : new String(rs.getString("eye_jc_l_zp").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_blt((rs.getString("eye_jc_r_blt") == null) ? null : new String(rs.getString("eye_jc_r_blt").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_gdw((rs.getString("eye_jc_r_gdw") == null) ? null : new String(rs.getString("eye_jc_r_gdw").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_gm((rs.getString("eye_jc_r_gm") == null) ? null : new String(rs.getString("eye_jc_r_gm").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_hm((rs.getString("eye_jc_r_hm") == null) ? null : new String(rs.getString("eye_jc_r_hm").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_jianl((rs.getString("eye_jc_r_jianl") == null) ? null : new String(rs.getString("eye_jc_r_jianl").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_jiaom((rs.getString("eye_jc_r_jiaom") == null) ? null : new String(rs.getString("eye_jc_r_jiaom").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_jiem((rs.getString("eye_jc_r_jiem") == null) ? null : new String(rs.getString("eye_jc_r_jiem").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_jt((rs.getString("eye_jc_r_jt") == null) ? null : new String(rs.getString("eye_jc_r_jt").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_lq((rs.getString("eye_jc_r_lq") == null) ? null : new String(rs.getString("eye_jc_r_lq").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_qf((rs.getString("eye_jc_r_qf") == null) ? null : new String(rs.getString("eye_jc_r_qf").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_sl((rs.getString("eye_jc_r_sl") == null) ? null : new String(rs.getString("eye_jc_r_sl").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_swm((rs.getString("eye_jc_r_swm") == null) ? null : new String(rs.getString("eye_jc_r_swm").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_tk((rs.getString("eye_jc_r_tk") == null) ? null : new String(rs.getString("eye_jc_r_tk").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_yjqk((rs.getString("eye_jc_r_yjqk") == null) ? null : new String(rs.getString("eye_jc_r_yjqk").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_yq((rs.getString("eye_jc_r_yq") == null) ? null : new String(rs.getString("eye_jc_r_yq").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setEye_jc_r_zp((rs.getString("eye_jc_r_zp") == null) ? null : new String(rs.getString("eye_jc_r_zp").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setFinal_diag((rs.getString("final_diag") == null) ? null : new String(rs.getString("final_diag").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setFirst_diagn((rs.getString("first_diagn") == null) ? null : new String(rs.getString("first_diagn").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setPatient_age(Integer.valueOf(rs.getInt("patient_age")));
              eioc.setPatient_his_jwst((rs.getString("patient_his_jwst") == null) ? null : new String(rs.getString("patient_his_jwst").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setPatient_his_present((rs.getString("patient_his_present") == null) ? null : new String(rs.getString("patient_his_present").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setPatient_id((rs.getString("patient_id") == null) ? null : new String(rs.getString("patient_id").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setPatient_xbs((rs.getString("patient_xbs") == null) ? null : new String(rs.getString("patient_xbs").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
              eioc.setTreatment_info((rs.getString("treatment_info") == null) ? null : new String(rs.getString("treatment_info").getBytes(EyeDaoImpl.this.YKLANGUAGE), EyeDaoImpl.this.LANUAGE));
            } catch (Exception e) {
              e.printStackTrace();
            } 
            return eioc;
          }
        });
    return (list != null && list.size() > 0) ? list : null;
  }
  
  @Override
  public Boolean findPatientById(String binglihao) {
    String sql = "select * from eye_patient_info where patient_id='" + binglihao + "'";
    List<Map<String, Object>> list = this.jdbcTemplate.query(sql, new RowMapper<Map<String, Object>>() {
          @Override
          public Map<String, Object> mapRow(ResultSet rs, int arg1) throws SQLException {
            Map<String, Object> map = new HashMap<String, Object>();
            try {
              map.put("patient_id", rs.getString("patient_id"));
            } catch (Exception e) {
              e.printStackTrace();
            } 
            if (map.size() == 0) {
              return null;
            }
            return map;
          }
        });
    return Boolean.valueOf(!(list == null || list.size() == 0));
  }
  
  @Override
  public void addPatientToEyeDatabase(HuanZheXinXi patient) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      String sql = "insert into eye_patient_info values('" + patient.getBinglihao() + "','" + new String(patient.getXingming().getBytes(this.LANUAGE), this.YKLANGUAGE) + "','" + (patient.isXingbie() ? new String("男".getBytes(this.LANUAGE), this.YKLANGUAGE) : new String("女".getBytes(), this.YKLANGUAGE)) + "'," + ((patient.getShengri() != null) ? ("to_date('" + sdf.format(patient.getShengri()) + "','yyyy-MM-dd')") : null) + "," + ((patient.getJtdz() == null) ? null : ("'" + new String(patient.getJtdz().getBytes(this.LANUAGE), this.YKLANGUAGE) + "'")) + "," + ((patient.getShouji() == null) ? null : ("'" + patient.getShouji() + "'")) + ",null,null,null,null,to_date('" + sdf1.format(new Date()) + "','yyyy-MM-dd HH24:mi:ss'))";
      this.jdbcTemplate.execute(sql);
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
}
