package test;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.IBaoGaoRelationDao;
import cn.com.oims.web.form.TongJiForm;
import javax.annotation.Resource;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:WebContent/WEB-INF/dispatcher-servlet.xml", "file:WebContent/WEB-INF/applicationContext.xml", "file:WebContent/WEB-INF/oimsData.xml", "file:WebContent/WEB-INF/oimsService.xml"})
public class AB extends AbstractJUnit4SpringContextTests {
  @Resource
  private IBaoGaoRelationDao baoGaoRelationDao;
  
  @Test
  public void testGroupYuanGongByTongJiForm() {
    TongJiForm form = new TongJiForm();
    form.setDoctors("admin");
    form.setfTime1("2014");
    form.setfTime2("11");
    long l = this.baoGaoRelationDao.getBaoGaoCountByProperties(form).longValue();
    System.out.println(l);
  }
  
  public static void main(String[] args) {
    String path = Utils.class.getClassLoader().getResource("").getPath();
    System.out.println(path);
  }
}
