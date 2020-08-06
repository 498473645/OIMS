package cn.com.oims.common;

import java.util.Calendar;
import java.util.Date;

public class SyncObject {
  private Date expiTime;
  
  private Object obj;
  
  public SyncObject(Object obj) {
    setObj(obj);
  }
  
  public Object getObj() {
    if (Calendar.getInstance().getTime().after(this.expiTime))
      this.obj = null; 
    return this.obj;
  }
  
  public synchronized void setObj(Object obj) {
    setExpiTime();
    this.obj = obj;
  }
  
  public boolean expired() {
    return Calendar.getInstance().after(this.expiTime);
  }
  
  private void setExpiTime() {
    Calendar cal = Calendar.getInstance();
    cal.set(13, cal.get(13) + 10);
    this.expiTime = cal.getTime();
  }
}
