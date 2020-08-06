package cn.com.oims.service.impl;

import cn.com.oims.service.ITalk;

public class TalkProxy implements ITalk {
  private ITalk talker;
  
  public TalkProxy(ITalk talker) {
    this.talker = talker;
  }
  
  public void talk(String msg) {
    this.talker.talk(msg);
  }
  
  public void talk(String msg, String singname) {
    this.talker.talk(msg);
    sing(singname);
  }
  
  private void sing(String singname) {
    System.out.println("唱歌：" + singname);
  }
}
