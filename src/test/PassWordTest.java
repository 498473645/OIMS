package test;

import com.codesnet.common.MultiUtils;
import org.junit.Test;

public class PassWordTest {
  @Test
  public void showPassWord1() {
    System.out.println("password is \t" + (new MultiUtils()).getPasswordString("1"));
  }
}
