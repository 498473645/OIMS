package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "shebei_dicom_config")
public class ShebeiDicomConfig implements Serializable {
  private static final long serialVersionUID = 1378279483790733733L;
  
  @Id
  private Long shebieId;
  
  @Column(length = 200)
  private String shebeiUID;
  
  private boolean worklist;
  
  private boolean storage;
  
  private boolean mpps;
  
  private boolean storageCommitment;
  
  private boolean queryOrRetrieve;
  
  private boolean storageDataBackup;
  
  private int port;
  
  @Column(length = 50)
  private String aeTitle;
  
  @Column(length = 50)
  private String modality;
  
  @Column(length = 50)
  private String scModality;
  
  public Long getShebieId() {
    return this.shebieId;
  }
  
  public void setShebieId(Long shebieId) {
    this.shebieId = shebieId;
  }
  
  public String getShebeiUID() {
    return this.shebeiUID;
  }
  
  public void setShebeiUID(String shebeiUID) {
    this.shebeiUID = shebeiUID;
  }
  
  public boolean isWorklist() {
    return this.worklist;
  }
  
  public void setWorklist(boolean worklist) {
    this.worklist = worklist;
  }
  
  public boolean isStorage() {
    return this.storage;
  }
  
  public void setStorage(boolean storage) {
    this.storage = storage;
  }
  
  public boolean isMpps() {
    return this.mpps;
  }
  
  public void setMpps(boolean mpps) {
    this.mpps = mpps;
  }
  
  public boolean isStorageCommitment() {
    return this.storageCommitment;
  }
  
  public void setStorageCommitment(boolean storageCommitment) {
    this.storageCommitment = storageCommitment;
  }
  
  public boolean isQueryOrRetrieve() {
    return this.queryOrRetrieve;
  }
  
  public void setQueryOrRetrieve(boolean queryOrRetrieve) {
    this.queryOrRetrieve = queryOrRetrieve;
  }
  
  public boolean isStorageDataBackup() {
    return this.storageDataBackup;
  }
  
  public void setStorageDataBackup(boolean storageDataBackup) {
    this.storageDataBackup = storageDataBackup;
  }
  
  public int getPort() {
    return this.port;
  }
  
  public void setPort(int port) {
    this.port = port;
  }
  
  public String getAeTitle() {
    return this.aeTitle;
  }
  
  public void setAeTitle(String aeTitle) {
    this.aeTitle = aeTitle;
  }
  
  public String getModality() {
    return this.modality;
  }
  
  public void setModality(String modality) {
    this.modality = modality;
  }
  
  public String getScModality() {
    return this.scModality;
  }
  
  public void setScModality(String scModality) {
    this.scModality = scModality;
  }
}
