package cn.com.oims.dao.pojo;

import java.io.Serializable;

public class DrugDictPk implements Serializable {
  private static final long serialVersionUID = 6514369564033855983L;
  
  private String drugCode;
  
  private String drugSpec;
  
  private int drugIndicator;
  
  public DrugDictPk() {}
  
  public DrugDictPk(String drug_code, String drug_spec, int drug_indicator) {
    this.drugCode = drug_code;
    this.drugSpec = drug_spec;
    this.drugIndicator = drug_indicator;
  }
  
  public String getDrugCode() {
    return this.drugCode;
  }
  
  public void setDrugCode(String drugCode) {
    this.drugCode = drugCode;
  }
  
  public String getDrugSpec() {
    return this.drugSpec;
  }
  
  public void setDrugSpec(String drugSpec) {
    this.drugSpec = drugSpec;
  }
  
  public int getDrugIndicator() {
    return this.drugIndicator;
  }
  
  public void setDrugIndicator(int drugIndicator) {
    this.drugIndicator = drugIndicator;
  }
  
  public int hashCode() {
    int key = 31;
    int hashCode = 1;
    hashCode = 31 * hashCode + ((this.drugCode == null) ? 0 : this.drugCode.hashCode());
    hashCode = 31 * hashCode + ((this.drugSpec == null) ? 0 : this.drugSpec.hashCode());
    hashCode = 31 * hashCode + this.drugIndicator;
    return hashCode;
  }
  
  public boolean equals(Object obj) {
    if (this == obj)
      return true; 
    if (obj == null)
      return false; 
    if (!(obj instanceof DrugDictPk))
      return false; 
    DrugDictPk other = (DrugDictPk)obj;
    if (this.drugIndicator != other.drugIndicator)
      return false; 
    if (this.drugCode == null) {
      if (other.drugCode != null)
        return false; 
    } else if (!this.drugCode.equals(other.drugCode)) {
      return false;
    } 
    if (this.drugSpec == null) {
      if (other.drugSpec != null)
        return false; 
    } else if (!this.drugSpec.equals(other.drugSpec)) {
      return false;
    } 
    return true;
  }
}
