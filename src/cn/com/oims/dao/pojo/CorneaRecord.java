package cn.com.oims.dao.pojo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author: 黄浩
 * @date: 2020/9/2.
 */
@Entity
@Table(name = "CORNEA_RECORD")
public class CorneaRecord implements Serializable {

    private Long id;
    private String RECORD_NO;//病历编号
    private Date INSERT_TIME;//新增时间
    private String INSERT_USER;//新增用户工号
    private Date UPDATE_TIME;//更新时间
    private String UPDATE_USER;//更新用户工号
    private String PATIENT_NO;//患者id
    private String NAME;//患者姓名
    private Integer SEX;//性别
    private Integer AGE;//年龄
    private Date VISIT_DATE;//就诊日期
    private String REMARK;//备注
    private String COMPLAINT_L;//主诉左眼
    private String COMPLAINT_R;//主诉右眼
    private Float VISION_L;//左眼视力
    private Float VISION_R;//右眼视力
    private String CONJUNCTIVA_L;//左眼结膜
    private String CONJUNCTIVA_R;//右眼结膜
    private String CORNEA_L;//左眼角膜
    private String CORNEA_R;//右眼角膜
    private String ANTERIOR_CHAMBER_L;//左眼前房
    private String ANTERIOR_CHAMBER_R;//右眼前房
    private String PUPIL_L;//左眼瞳孔
    private String PUPIL_R;//右眼瞳孔
    private String CRYSTAL_L;//左眼晶体
    private String CRYSTAL_R;//右眼晶体
    private String EYE_GROUND_L;//左眼眼底
    private String EYE_GROUND_R;//右眼眼底
    private String IOP_L;//左眼眼压
    private String IOP_R;//右眼眼压

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CORNEA_RECORD_sequence")
    @SequenceGenerator(name = "CORNEA_RECORD_sequence", allocationSize = 1, initialValue = 1, sequenceName = "CORNEA_RECORD_sequence")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRECORD_NO() {
        return RECORD_NO;
    }

    public void setRECORD_NO(String RECORD_NO) {
        this.RECORD_NO = RECORD_NO;
    }

    public Date getINSERT_TIME() {
        return INSERT_TIME;
    }

    public void setINSERT_TIME(Date INSERT_TIME) {
        this.INSERT_TIME = INSERT_TIME;
    }

    public String getINSERT_USER() {
        return INSERT_USER;
    }

    public void setINSERT_USER(String INSERT_USER) {
        this.INSERT_USER = INSERT_USER;
    }

    public Date getUPDATE_TIME() {
        return UPDATE_TIME;
    }

    public void setUPDATE_TIME(Date UPDATE_TIME) {
        this.UPDATE_TIME = UPDATE_TIME;
    }

    public String getUPDATE_USER() {
        return UPDATE_USER;
    }

    public void setUPDATE_USER(String UPDATE_USER) {
        this.UPDATE_USER = UPDATE_USER;
    }

    public String getPATIENT_NO() {
        return PATIENT_NO;
    }

    public void setPATIENT_NO(String PATIENT_NO) {
        this.PATIENT_NO = PATIENT_NO;
    }

    public String getNAME() {
        return NAME;
    }

    public void setNAME(String NAME) {
        this.NAME = NAME;
    }

    public Integer getSEX() {
        return SEX;
    }

    public void setSEX(Integer SEX) {
        this.SEX = SEX;
    }

    public Integer getAGE() {
        return AGE;
    }

    public void setAGE(Integer AGE) {
        this.AGE = AGE;
    }

    public Date getVISIT_DATE() {
        return VISIT_DATE;
    }

    public void setVISIT_DATE(Date VISIT_DATE) {
        this.VISIT_DATE = VISIT_DATE;
    }

    public String getREMARK() {
        return REMARK;
    }

    public void setREMARK(String REMARK) {
        this.REMARK = REMARK;
    }

    public String getCOMPLAINT_L() {
        return COMPLAINT_L;
    }

    public void setCOMPLAINT_L(String COMPLAINT_L) {
        this.COMPLAINT_L = COMPLAINT_L;
    }

    public String getCOMPLAINT_R() {
        return COMPLAINT_R;
    }

    public void setCOMPLAINT_R(String COMPLAINT_R) {
        this.COMPLAINT_R = COMPLAINT_R;
    }

    public Float getVISION_L() {
        return VISION_L;
    }

    public void setVISION_L(Float VISION_L) {
        this.VISION_L = VISION_L;
    }

    public Float getVISION_R() {
        return VISION_R;
    }

    public void setVISION_R(Float VISION_R) {
        this.VISION_R = VISION_R;
    }

    public String getCONJUNCTIVA_L() {
        return CONJUNCTIVA_L;
    }

    public void setCONJUNCTIVA_L(String CONJUNCTIVA_L) {
        this.CONJUNCTIVA_L = CONJUNCTIVA_L;
    }

    public String getCONJUNCTIVA_R() {
        return CONJUNCTIVA_R;
    }

    public void setCONJUNCTIVA_R(String CONJUNCTIVA_R) {
        this.CONJUNCTIVA_R = CONJUNCTIVA_R;
    }

    public String getCORNEA_L() {
        return CORNEA_L;
    }

    public void setCORNEA_L(String CORNEA_L) {
        this.CORNEA_L = CORNEA_L;
    }

    public String getCORNEA_R() {
        return CORNEA_R;
    }

    public void setCORNEA_R(String CORNEA_R) {
        this.CORNEA_R = CORNEA_R;
    }

    public String getANTERIOR_CHAMBER_L() {
        return ANTERIOR_CHAMBER_L;
    }

    public void setANTERIOR_CHAMBER_L(String ANTERIOR_CHAMBER_L) {
        this.ANTERIOR_CHAMBER_L = ANTERIOR_CHAMBER_L;
    }

    public String getANTERIOR_CHAMBER_R() {
        return ANTERIOR_CHAMBER_R;
    }

    public void setANTERIOR_CHAMBER_R(String ANTERIOR_CHAMBER_R) {
        this.ANTERIOR_CHAMBER_R = ANTERIOR_CHAMBER_R;
    }

    public String getPUPIL_L() {
        return PUPIL_L;
    }

    public void setPUPIL_L(String PUPIL_L) {
        this.PUPIL_L = PUPIL_L;
    }

    public String getPUPIL_R() {
        return PUPIL_R;
    }

    public void setPUPIL_R(String PUPIL_R) {
        this.PUPIL_R = PUPIL_R;
    }

    public String getCRYSTAL_L() {
        return CRYSTAL_L;
    }

    public void setCRYSTAL_L(String CRYSTAL_L) {
        this.CRYSTAL_L = CRYSTAL_L;
    }

    public String getCRYSTAL_R() {
        return CRYSTAL_R;
    }

    public void setCRYSTAL_R(String CRYSTAL_R) {
        this.CRYSTAL_R = CRYSTAL_R;
    }

    public String getEYE_GROUND_L() {
        return EYE_GROUND_L;
    }

    public void setEYE_GROUND_L(String EYE_GROUND_L) {
        this.EYE_GROUND_L = EYE_GROUND_L;
    }

    public String getEYE_GROUND_R() {
        return EYE_GROUND_R;
    }

    public void setEYE_GROUND_R(String EYE_GROUND_R) {
        this.EYE_GROUND_R = EYE_GROUND_R;
    }

    public String getIOP_L() {
        return IOP_L;
    }

    public void setIOP_L(String IOP_L) {
        this.IOP_L = IOP_L;
    }

    public String getIOP_R() {
        return IOP_R;
    }

    public void setIOP_R(String IOP_R) {
        this.IOP_R = IOP_R;
    }
}
