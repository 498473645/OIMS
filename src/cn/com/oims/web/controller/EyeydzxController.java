package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.EyeEOG;
import cn.com.oims.dao.pojo.Eyereportpicture;
import cn.com.oims.dao.pojo.Eyeydzx;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyereportpictureService;
import cn.com.oims.service.IEyeydzxService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IOimsLogService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
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
@RequestMapping({"Eyeydzx"})
public class EyeydzxController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcdService jcdservice;
  
  @Autowired
  private IEyeydzxService eyeydzxservice;
  
  @Autowired
  private IEyereportpictureService eyereportpictureservice;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @Autowired
  private IOimsLogService oimslogservice;
  
  @RequestMapping(value = {"/saveOrUpdateEyeydzx.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyeydzx(HttpServletResponse response, HttpServletRequest request, Eyeydzx eyeydzx) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "眼底照相报告保存或者修改";
    try {
      Eyeydzx eyeydzxSelect = new Eyeydzx();
      eyeydzxSelect.setJcdId(eyeydzx.getJcdId());
      eyeydzxSelect = this.eyeydzxservice.selectEyeydzxByEyeydzx(eyeydzxSelect);
      if (eyeydzxSelect == null) {
        this.eyeydzxservice.saveEyeydzx(eyeydzx);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(eyeydzx.getFlowNo());
        baoGaoRelation.setJcdId(eyeydzx.getJcdId());
        baoGaoRelation.setClassName(EyeEOG.class.getSimpleName());
        baoGaoRelation.setState(1007);
        Jcd jcd1 = this.jcdservice.getJcdById(eyeydzx.getJcdId());
        baoGaoRelation.setJcxmId(jcd1.getJcxmIds());
        baoGaoRelation.setInsertDate(new Date());
        baoGaoRelation.setInsertUser(gonghao);
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyeydzx.setFlowNo(eyeydzxSelect.getFlowNo());
        this.eyeydzxservice.updateEyeydzx(eyeydzx);
      } 
      Jcd jcd = this.jcdservice.getJcdById(eyeydzx.getJcdId());
      jcd.setState(Integer.valueOf(1));
      this.jcdservice.updateJcd(jcd);
      Eyereportpicture eyereportpictureSelect = new Eyereportpicture();
      eyereportpictureSelect.setJcdId(eyeydzx.getJcdId());
      List<Eyereportpicture> eyereportpictures = this.eyereportpictureservice
        .selectEyereportpicturesByEyereportpicture(eyereportpictureSelect);
      for (Eyereportpicture eyereportpictureDelete : eyereportpictures)
        this.eyereportpictureservice
          .deleteEyereportpicture(eyereportpictureDelete); 
      String path_pictures = request.getParameter("path_pictures");
      String[] path_picture = path_pictures.split(",");
      for (int i = 0; path_picture != null && i < path_picture.length && 
        !path_picture[i].equals(""); i++) {
        Eyereportpicture eyereportpicture = new Eyereportpicture();
        eyereportpicture.setReport_id(eyeydzx.getFlowNo());
        eyereportpicture.setJcdId(eyeydzx.getJcdId());
        eyereportpicture
          .setHuanzhexinxi_id(eyeydzx.getHuanzhexinxi_id());
        eyereportpicture.setPath_picture(path_picture[i].replaceAll("\\\\", "/"));
        eyereportpicture.setPaixu(new Long(i));
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
  
  @RequestMapping(value = {"/selectEyeydzxByEyeydzx.htm"}, method = {RequestMethod.POST})
  public void selectEyeydzxByEyeydzx(HttpServletResponse response, HttpServletRequest request, Eyeydzx eyeydzx) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据眼底照相报告对象查询符合条件的眼底照相报告对象";
    try {
      eyeydzx = this.eyeydzxservice.selectEyeydzxByEyeydzx(eyeydzx);
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
    result.setObj(eyeydzx);
    this.oimslogservice.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
