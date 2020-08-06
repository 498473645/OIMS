package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaogaoPic;
import cn.com.oims.service.IBaogaoPicService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"baogaopic"})
public class BaogaoPicController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IBaogaoPicService baogaopicService = null;
  
  @RequestMapping(value = {"/selectBaogaoPicsByBaogaoPic.htm"}, method = {RequestMethod.POST})
  public void selectBaogaoPicsByBaogaoPic(HttpServletResponse response, BaogaoPic baogaopic) {
    MyResult result = new MyResult();
    List<BaogaoPic> baogaopics = new ArrayList<>();
    this.doing = "根据报告图片对象查询报告图片对象集合";
    try {
      baogaopics = this.baogaopicService.selectBaogaoPicsByBaogaoPic(baogaopic);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(baogaopics);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
