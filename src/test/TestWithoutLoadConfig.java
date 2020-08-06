package test;

import cn.com.oims.dao.pojo.OutpOrders;
import cn.com.oims.utils.Cn2Spell;
import cn.com.oims.utils.JsonUtil;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.junit.Test;

public class TestWithoutLoadConfig {
  @Test
  public void regex() {
    String str = "gc";
    System.out.println(str.matches(".*\\d?.*"));
  }
  
  @Test
  public void pinyin() {
    String pinyin = Cn2Spell.converterToFirstSpell("双眼无痛性、渐进性视物不清....2");
    System.out.println(pinyin);
  }
  
  @Test
  public void T1() {
    OutpOrders order = new OutpOrders();
    String[] properties = { "doctor", "patientId" };
    order.setDoctor("admin");
    order.setPatientId("88219");
    JsonConfig config = JsonUtil.resolveProperty(properties);
    System.out.println(JSONObject.fromObject(order, config));
  }
}
