package test;

import cn.com.oims.dao.pojo.HuanZheXinXi;

public class Test1 {
  public static void main(String[] args) {
    HuanZheXinXi m0 = new HuanZheXinXi();
    m0.setId(Long.valueOf(1L));
    HuanZheXinXi m1 = new HuanZheXinXi();
    m1.setId(Long.valueOf(1L));
    System.out.println("map:" + m0.equals(m1));
  }
}
