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
@Table(name = "operation_dict")
public class OperationDict implements Serializable {
  private static final long serialVersionUID = 5855456712310568663L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "operation_dict_sequence")
  @SequenceGenerator(name = "operation_dict_sequence", allocationSize = 1, initialValue = 1, sequenceName = "operation_dict_sequence")
  private Integer id;
  
  @Column(name = "operation_code", length = 30)
  private String operationCode;
  
  @Column(nullable = false, name = "level_flag")
  private Integer levelFlag;
  
  @Column(nullable = false)
  private String name;
  
  @Column(name = "price_code", length = 50)
  private String priceCode;
  
  private Float price;
  
  @Column(name = "infomation", length = 500)
  private String infomation;
  
  @Column(length = 3000)
  private String need;
  
  @Column(name = "operation_size")
  private Integer operationSize;
  
  @Column(name = "input_code")
  private String inputCode;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getOperationCode() {
    return this.operationCode;
  }
  
  public void setOperationCode(String operationCode) {
    this.operationCode = operationCode;
  }
  
  public Integer getLevelFlag() {
    return this.levelFlag;
  }
  
  public void setLevelFlag(Integer levelFlag) {
    this.levelFlag = levelFlag;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public Float getPrice() {
    return this.price;
  }
  
  public void setPrice(Float price) {
    this.price = price;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }
  
  public String getNeed() {
    return this.need;
  }
  
  public void setNeed(String need) {
    this.need = need;
  }
  
  public String getPriceCode() {
    return this.priceCode;
  }
  
  public void setPriceCode(String priceCode) {
    this.priceCode = priceCode;
  }
  
  public String getInputCode() {
    return this.inputCode;
  }
  
  public void setInputCode(String inputCode) {
    this.inputCode = inputCode;
  }
  
  public Integer getOperationSize() {
    return this.operationSize;
  }
  
  public void setOperationSize(Integer operationSize) {
    this.operationSize = operationSize;
  }
}
