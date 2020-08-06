package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tlbsc_tlbs")
public class Tlbs implements Serializable {
  private static final long serialVersionUID = 1L;
  
  @Id
  private String huanzheId;
  
  private boolean tlb;
  
  private Integer blbns;
  
  private boolean yongyao;
  
  private Integer insulinLong;
  
  private Integer insulinShort;
  
  private Integer sulphonylurea;
  
  private Integer sulphonylureaMonth;
  
  private Integer nonSulfonylurea;
  
  private Integer nonSulfonylureaMonth;
  
  private Integer alfa;
  
  private Integer alfaMonth;
  
  private Integer biguanides;
  
  private Integer biguanidesMonth;
  
  private Integer hypertension;
  
  private String disease;
  
  private boolean retinopathyOD;
  
  private boolean retinopathyOS;
  
  private Integer treatmentOD;
  
  private String treatmentODOther;
  
  private Integer treatmentOS;
  
  private Integer treatmentOSOther;
  
  public String getHuanzheId() {
    return this.huanzheId;
  }
  
  public void setHuanzheId(String huanzheId) {
    this.huanzheId = huanzheId;
  }
  
  public boolean isTlb() {
    return this.tlb;
  }
  
  public void setTlb(boolean tlb) {
    this.tlb = tlb;
  }
  
  public Integer getBlbns() {
    return this.blbns;
  }
  
  public void setBlbns(Integer blbns) {
    this.blbns = blbns;
  }
  
  public boolean isYongyao() {
    return this.yongyao;
  }
  
  public void setYongyao(boolean yongyao) {
    this.yongyao = yongyao;
  }
  
  public Integer getInsulinLong() {
    return this.insulinLong;
  }
  
  public void setInsulinLong(Integer insulinLong) {
    this.insulinLong = insulinLong;
  }
  
  public Integer getInsulinShort() {
    return this.insulinShort;
  }
  
  public void setInsulinShort(Integer insulinShort) {
    this.insulinShort = insulinShort;
  }
  
  public Integer getSulphonylurea() {
    return this.sulphonylurea;
  }
  
  public void setSulphonylurea(Integer sulphonylurea) {
    this.sulphonylurea = sulphonylurea;
  }
  
  public Integer getSulphonylureaMonth() {
    return this.sulphonylureaMonth;
  }
  
  public void setSulphonylureaMonth(Integer sulphonylureaMonth) {
    this.sulphonylureaMonth = sulphonylureaMonth;
  }
  
  public Integer getNonSulfonylurea() {
    return this.nonSulfonylurea;
  }
  
  public void setNonSulfonylurea(Integer nonSulfonylurea) {
    this.nonSulfonylurea = nonSulfonylurea;
  }
  
  public Integer getNonSulfonylureaMonth() {
    return this.nonSulfonylureaMonth;
  }
  
  public void setNonSulfonylureaMonth(Integer nonSulfonylureaMonth) {
    this.nonSulfonylureaMonth = nonSulfonylureaMonth;
  }
  
  public Integer getAlfa() {
    return this.alfa;
  }
  
  public void setAlfa(Integer alfa) {
    this.alfa = alfa;
  }
  
  public Integer getAlfaMonth() {
    return this.alfaMonth;
  }
  
  public void setAlfaMonth(Integer alfaMonth) {
    this.alfaMonth = alfaMonth;
  }
  
  public Integer getBiguanides() {
    return this.biguanides;
  }
  
  public void setBiguanides(Integer biguanides) {
    this.biguanides = biguanides;
  }
  
  public Integer getBiguanidesMonth() {
    return this.biguanidesMonth;
  }
  
  public void setBiguanidesMonth(Integer biguanidesMonth) {
    this.biguanidesMonth = biguanidesMonth;
  }
  
  public Integer getHypertension() {
    return this.hypertension;
  }
  
  public void setHypertension(Integer hypertension) {
    this.hypertension = hypertension;
  }
  
  public String getDisease() {
    return this.disease;
  }
  
  public void setDisease(String disease) {
    this.disease = disease;
  }
  
  public boolean isRetinopathyOD() {
    return this.retinopathyOD;
  }
  
  public void setRetinopathyOD(boolean retinopathyOD) {
    this.retinopathyOD = retinopathyOD;
  }
  
  public boolean isRetinopathyOS() {
    return this.retinopathyOS;
  }
  
  public void setRetinopathyOS(boolean retinopathyOS) {
    this.retinopathyOS = retinopathyOS;
  }
  
  public Integer getTreatmentOD() {
    return this.treatmentOD;
  }
  
  public void setTreatmentOD(Integer treatmentOD) {
    this.treatmentOD = treatmentOD;
  }
  
  public String getTreatmentODOther() {
    return this.treatmentODOther;
  }
  
  public void setTreatmentODOther(String treatmentODOther) {
    this.treatmentODOther = treatmentODOther;
  }
  
  public Integer getTreatmentOS() {
    return this.treatmentOS;
  }
  
  public void setTreatmentOS(Integer treatmentOS) {
    this.treatmentOS = treatmentOS;
  }
  
  public Integer getTreatmentOSOther() {
    return this.treatmentOSOther;
  }
  
  public void setTreatmentOSOther(Integer treatmentOSOther) {
    this.treatmentOSOther = treatmentOSOther;
  }
}
