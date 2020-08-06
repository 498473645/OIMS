package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Administration")
public class Administration implements Serializable {
  private static final long serialVersionUID = -1255279671716374423L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "administration_sequence")
  @SequenceGenerator(name = "administration_sequence", allocationSize = 1, initialValue = 1, sequenceName = "administration_sequence")
  private Integer id;
  
  @Column(name = "serial_no")
  private Integer serialNo;
  
  @Column(name = "administration_code")
  private String administrationCode;
  
  @Column(name = "administration_name")
  private String administrationName;
  
  @Column(name = "input_code")
  private String inputCode;
  
  public Integer getSerialNo() {
    return this.serialNo;
  }
  
  public void setSerialNo(Integer serialNo) {
    this.serialNo = serialNo;
  }
  
  public String getAdministrationCode() {
    return this.administrationCode;
  }
  
  public void setAdministrationCode(String administrationCode) {
    this.administrationCode = administrationCode;
  }
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getAdministrationName() {
    return this.administrationName;
  }
  
  public void setAdministrationName(String administrationName) {
    this.administrationName = administrationName;
  }
  
  public String getInputCode() {
    return this.inputCode;
  }
  
  public void setInputCode(String inputCode) {
    this.inputCode = inputCode;
  }
}
