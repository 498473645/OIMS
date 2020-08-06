package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.Eyebchao;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyebchaoService;
import cn.com.oims.service.IEyereportpictureService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IOimsLogService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"Eyebchao"})
public class EyebchaoController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcdService jcdservice;
  
  @Autowired
  private IEyebchaoService eyebchaoservice;
  
  @Autowired
  private IEyereportpictureService eyereportpictureservice;
  
  @Autowired
  private IOimsLogService oimslogservice;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  public void sureUpdateJcdState(Jcd jcd) {
    Jcd dataJcd = null;
    for (int i = 0; i < 3; ) {
      dataJcd = this.jcdservice.getJcdById(jcd.getId());
      if (dataJcd == null)
        break; 
      if (dataJcd.getState() == null || dataJcd.getState().intValue() != 1) {
        System.out.println("sureUpdateJcdState：" + jcd.getId() + ";;;" + jcd.getState());
        jcd.setState(Integer.valueOf(1));
        this.jcdservice.updateJcd(jcd);
        i++;
      } 
      break;
    } 
  }
  
  @RequestMapping(value = {"/saveOrUpdateEyebchao.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyebchao(HttpServletResponse response, HttpServletRequest request, Eyebchao eyebchao, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "B超报告保存或者修改";
    try {
      Eyebchao eyebchaoSelect = new Eyebchao();
      eyebchaoSelect.setJcdId(eyebchao.getJcdId());
      eyebchaoSelect = this.eyebchaoservice
        .selectEyebchaoByEyebchao(eyebchaoSelect);
      Jcd jcd = this.jcdservice.getJcdById(eyebchao.getJcdId());
      sureUpdateJcdState(jcd);
      if (eyebchaoSelect == null) {
        Long bgId = (Long)this.eyebchaoservice.saveEyebchao(eyebchao);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyebchao.getJcdId());
        baoGaoRelation.setClassName(Eyebchao.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd.getJcxmIds());
        String jc_date = eyebchao.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyebchao.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyebchao.setFlowNo(eyebchaoSelect.getFlowNo());
        this.eyebchaoservice.updateEyebchao(eyebchao);
        updateEyebchaoRelation(eyebchao, baogaoState);
      } 
      String jcgonghao = eyebchao.getDoctor();
      jcd.setJcys(jcgonghao);
      jcd.setState(Integer.valueOf(1));
      Integer biaoshiold = jcd.getBiaoshi();
      if (biaoshiold.intValue() == 50) {
        jcd.setBiaoshi(Integer.valueOf(51));
        if (jcd.getJcksTime() == null)
          jcd.setJcksTime(new Date()); 
        if (jcd.getJcjsTime() == null)
          jcd.setJcjsTime(new Date()); 
      } 
      this.jcdservice.updateJcd(jcd);
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
    result.setGonghao(gonghao);
    this.oimslogservice.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/selectEyebchaoByEyebchao.htm"}, method = {RequestMethod.POST})
  public void selectEyebchaoByEyebchao(HttpServletResponse response, HttpServletRequest request, Eyebchao eyebchao) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据B超报告对象查询符合条件的B超报告对象";
    try {
      eyebchao = this.eyebchaoservice.selectEyebchaoByEyebchao(eyebchao);
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
    result.setGonghao(gonghao);
    result.setObj(eyebchao);
    this.oimslogservice.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public void updateEyebchaoRelation(Eyebchao eyebchao, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyebchao.getFlowNo());
    baoGaoRelation.setClassName(Eyebchao.class.getSimpleName());
    baoGaoRelation.setJcdId(eyebchao.getJcdId());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyebchao.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyebchao.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
}
