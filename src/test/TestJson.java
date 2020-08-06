package test;

import java.util.ArrayList;
import java.util.List;
import net.sf.json.JSONArray;

public class TestJson {
  public static void main(String[] args) {
    List<stury1> s = new ArrayList<>();
    stury1 s1 = new stury1();
    stury1 s2 = new stury1();
    s1.setName("微视野");
    s1.setY(45);
    s1.setOimsData("001");
    s2.setName("微视野");
    s2.setY(45);
    s2.setOimsData("001");
    s.add(s1);
    s.add(s2);
    System.out.println(JSONArray.fromObject(s).toString());
  }
}
