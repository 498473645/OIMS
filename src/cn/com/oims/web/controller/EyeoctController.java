package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.Eyeoct;
import cn.com.oims.dao.pojo.Eyereportpicture;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyeoctService;
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
@RequestMapping({"Eyeoct"})
public class EyeoctController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcdService jcdservice;
  
  @Autowired
  private IEyeoctService eyeoctservice;
  
  @Autowired
  private IEyereportpictureService eyereportpictureservice;
  
  @Autowired
  private IOimsLogService oimslogservice;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/saveOrUpdateEyeoct.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyeoct(HttpServletResponse response, HttpServletRequest request, Eyeoct eyeoct, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "OCT报告保存或者修改";
    try {
      Eyeoct eyeoctSelect = new Eyeoct();
      eyeoctSelect.setJcdId(eyeoct.getJcdId());
      eyeoctSelect = this.eyeoctservice.selectEyeoctByEyeoct(eyeoctSelect);
      Jcd jcd = this.jcdservice.getJcdById(eyeoct.getJcdId());
      if (eyeoctSelect == null) {
        Long bgId = (Long)this.eyeoctservice.saveEyeoct(eyeoct);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyeoct.getJcdId());
        baoGaoRelation.setClassName(Eyeoct.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd.getJcxmIds());
        String jc_date = eyeoct.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyeoct.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyeoct.setFlowNo(eyeoctSelect.getFlowNo());
        this.eyeoctservice.updateEyeoct(eyeoct);
        updateEyeoctRelation(eyeoct, baogaoState);
      } 
      String jcgonghao = eyeoct.getDoctor();
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
      Eyereportpicture eyereportpictureSelect = new Eyereportpicture();
      eyereportpictureSelect.setJcdId(eyeoct.getJcdId());
      List<Eyereportpicture> eyereportpictures = this.eyereportpictureservice
        .selectEyereportpicturesByEyereportpicture(eyereportpictureSelect);
      for (Eyereportpicture eyereportpictureDelete : eyereportpictures)
        this.eyereportpictureservice
          .deleteEyereportpicture(eyereportpictureDelete); 
      String path_pictures = request.getParameter("path_pictures");
      String[] path_picture = path_pictures.split(",");
      String[] paixus = request.getParameter("paixus").split(",");
      for (int i = 0; path_picture != null && i < path_picture.length && 
        !path_picture[i].equals(""); i++) {
        Eyereportpicture eyereportpicture = new Eyereportpicture();
        eyereportpicture.setReport_id(eyeoct.getFlowNo());
        eyereportpicture.setJcdId(eyeoct.getJcdId());
        eyereportpicture
          .setHuanzhexinxi_id(eyeoct.getHuanzhexinxi_id());
        eyereportpicture.setPath_picture(path_picture[i].replaceAll("\\\\", "/"));
        eyereportpicture.setPaixu(Long.valueOf(Long.parseLong(paixus[i])));
        this.eyereportpictureservice.saveEyereportpicture(eyereportpicture);
      } 
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
  
  @RequestMapping(value = {"/selectEyeoctByEyeoct.htm"}, method = {RequestMethod.POST})
  public void selectEyeoctByEyeoct(HttpServletResponse response, HttpServletRequest request, Eyeoct eyeoct) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据OCT报告对象查询符合条件的OCT报告对象";
    try {
      eyeoct = this.eyeoctservice.selectEyeoctByEyeoct(eyeoct);
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
    result.setObj(eyeoct);
    this.oimslogservice.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public void updateEyeoctRelation(Eyeoct eyeoct, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyeoct.getFlowNo());
    baoGaoRelation.setClassName(Eyeoct.class.getSimpleName());
    baoGaoRelation.setJcdId(eyeoct.getJcdId());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyeoct.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyeoct.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
}
