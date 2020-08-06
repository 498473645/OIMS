package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "frequency")
public class Frequency {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "frequency_sequence")
  @SequenceGenerator(name = "frequency_sequence", allocationSize = 1, initialValue = 1, sequenceName = "frequency_sequence")
  @Column(name = "serial_no")
  private Integer id;
  
  @Column(name = "freq_desc")
  private String freqDesc;
  
  @Column(name = "freq_counter")
  private Integer freqCounter;
  
  @Column(name = "freq_interval")
  private Integer freqInterval;
  
  @Column(name = "freq_interval_units")
  private String freqIntervalUnits;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getFreqDesc() {
    return this.freqDesc;
  }
  
  public void setFreqDesc(String freqDesc) {
    this.freqDesc = freqDesc;
  }
  
  public Integer getFreqCounter() {
    return this.freqCounter;
  }
  
  public void setFreqCounter(Integer freqCounter) {
    this.freqCounter = freqCounter;
  }
  
  public Integer getFreqInterval() {
    return this.freqInterval;
  }
  
  public void setFreqInterval(Integer freqInterval) {
    this.freqInterval = freqInterval;
  }
  
  public String getFreqIntervalUnits() {
    return this.freqIntervalUnits;
  }
  
  public void setFreqIntervalUnits(String freqIntervalUnits) {
    this.freqIntervalUnits = freqIntervalUnits;
  }
}
