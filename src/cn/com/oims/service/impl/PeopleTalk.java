package cn.com.oims.service.impl;

import cn.com.oims.service.ITalk;

public class PeopleTalk implements ITalk {
  public String username;
  
  public String age;
  
  public PeopleTalk(String username, String age) {
    this.username = username;
    this.age = age;
  }
  
  public void talk(String msg) {
    System.out.println(String.valueOf(msg) + "!你好,我是" + this.username + "，我年龄是" + this.age);
  }
  
  public String getName() {
    return this.username;
  }
  
  public void setName(String name) {
    this.username = name;
  }
  
  public String getAge() {
    return this.age;
  }
  
  public void setAge(String age) {
    this.age = age;
  }
}
