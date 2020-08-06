package cn.com.oims.web.form;

public class OperationPlanForm extends OperationApplicationForm {
  private String circuitNurse;
  
  private String instrumentNurse;
  
  private Integer operationRoomId;
  
  private Boolean drugResistanceBacteriaCarrier = Boolean.valueOf(false);
  
  private String nurse_note;
  
  private Boolean isPlanCancel = Boolean.valueOf(false);
  
  private String operationOrderNum;
  
  public Boolean getDrugResistanceBacteriaCarrier() {
    return this.drugResistanceBacteriaCarrier;
  }
  
  public void setDrugResistanceBacteriaCarrier(Boolean drugResistanceBacteriaCarrier) {
    this.drugResistanceBacteriaCarrier = drugResistanceBacteriaCarrier;
  }
  
  public Boolean getIsPlanCancel() {
    return this.isPlanCancel;
  }
  
  public void setIsPlanCancel(Boolean isPlanCancel) {
    this.isPlanCancel = isPlanCancel;
  }
  
  public String getNurse_note() {
    return this.nurse_note;
  }
  
  public void setNurse_note(String nurse_note) {
    this.nurse_note = nurse_note;
  }
  
  public String getCircuitNurse() {
    return this.circuitNurse;
  }
  
  public void setCircuitNurse(String circuitNurse) {
    this.circuitNurse = circuitNurse;
  }
  
  public String getInstrumentNurse() {
    return this.instrumentNurse;
  }
  
  public void setInstrumentNurse(String instrumentNurse) {
    this.instrumentNurse = instrumentNurse;
  }
  
  public Integer getOperationRoomId() {
    return this.operationRoomId;
  }
  
  public void setOperationRoomId(Integer operationRoomId) {
    this.operationRoomId = operationRoomId;
  }
  
  public String getOperationOrderNum() {
    return this.operationOrderNum;
  }
  
  public void setOperationOrderNum(String operationOrderNum) {
    this.operationOrderNum = operationOrderNum;
  }
}
