package cn.com.oims.web.form;

public class OperationApplicationForm extends OperationAppointmentForm {
  private Integer anesthesia;
  
  private String anesthetist;
  
  private String note;
  
  private String firstAssistant;
  
  private String secondAssistant;
  
  public Integer getAnesthesia() {
    return this.anesthesia;
  }
  
  public void setAnesthesia(Integer anesthesia) {
    this.anesthesia = anesthesia;
  }
  
  public String getAnesthetist() {
    return this.anesthetist;
  }
  
  public void setAnesthetist(String anesthetist) {
    this.anesthetist = anesthetist;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public String getFirstAssistant() {
    return this.firstAssistant;
  }
  
  public void setFirstAssistant(String firstAssistant) {
    this.firstAssistant = firstAssistant;
  }
  
  public String getSecondAssistant() {
    return this.secondAssistant;
  }
  
  public void setSecondAssistant(String secondAssistant) {
    this.secondAssistant = secondAssistant;
  }
}
