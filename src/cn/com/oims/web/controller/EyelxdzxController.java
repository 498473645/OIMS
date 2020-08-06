package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.Eyelxdzx;
import cn.com.oims.dao.pojo.Eyereportpicture;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyelxdzxService;
import cn.com.oims.service.IEyereportpictureService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.ISheBeiService;
import cn.com.oims.service.IYuanGongService;
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
@RequestMapping({"Eyelxdzx"})
public class EyelxdzxController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcdService jcdservice;
  
  @Autowired
  private IEyelxdzxService eyelxdzxservice;
  
  @Autowired
  private IEyereportpictureService eyereportpictureservice;
  
  @Autowired
  private IOimsLogService oimslogservice;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  private ISheBeiService sheBeiService;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/saveOrUpdateEyelxdzx.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyelxdzx(HttpServletResponse response, HttpServletRequest request, Eyelxdzx eyelxdzx, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "裂隙灯照相报告保存或者修改";
    try {
      Eyelxdzx eyelxdzxSelect = new Eyelxdzx();
      eyelxdzxSelect.setJcdId(eyelxdzx.getJcdId());
      eyelxdzxSelect = this.eyelxdzxservice
        .selectEyelxdzxByEyelxdzx(eyelxdzxSelect);
      if (eyelxdzxSelect == null) {
        Long bgId = (Long)this.eyelxdzxservice.saveEyelxdzx(eyelxdzx);
        String jcgonghao = eyelxdzx.getDoctor();
        YuanGong yuanGong = this.yuanGongService.obtainYuanGongByGonghao(gonghao);
        Jcd jcd1 = this.jcdservice.getJcdById(eyelxdzx.getJcdId());
        jcd1.setJcys(jcgonghao);
        jcd1.setJcksTime(new Date());
        jcd1.setJcjsTime(new Date());
        jcd1.setJcksId(yuanGong.getBumenId());
        jcd1.setBiaoshi(Integer.valueOf(56));
        jcd1.setState(Integer.valueOf(1));
        this.jcdservice.updateJcd(jcd1);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyelxdzx.getJcdId());
        baoGaoRelation.setClassName(Eyelxdzx.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd1.getJcxmIds());
        String jc_date = eyelxdzx.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyelxdzx.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyelxdzx.setFlowNo(eyelxdzxSelect.getFlowNo());
        this.eyelxdzxservice.updateEyelxdzx(eyelxdzx);
        updateEyelxdzxRelation(eyelxdzx, baogaoState);
      } 
      Jcd jcd = this.jcdservice.getJcdById(eyelxdzx.getJcdId());
      jcd.setState(Integer.valueOf(1));
      this.jcdservice.updateJcd(jcd);
      Eyereportpicture eyereportpictureSelect = new Eyereportpicture();
      eyereportpictureSelect.setJcdId(eyelxdzx.getJcdId());
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
        eyereportpicture.setReport_id(eyelxdzx.getFlowNo());
        eyereportpicture.setJcdId(eyelxdzx.getJcdId());
        eyereportpicture.setHuanzhexinxi_id(eyelxdzx
            .getHuanzhexinxi_id());
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
  
  public void updateEyelxdzxRelation(Eyelxdzx eyelxdzx, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyelxdzx.getFlowNo());
    baoGaoRelation.setClassName(Eyelxdzx.class.getSimpleName());
    baoGaoRelation.setJcdId(eyelxdzx.getJcdId());
    baoGaoRelation.setInsertDate(new Date());
    baoGaoRelation.setInsertUser(eyelxdzx.getDoctor());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyelxdzx.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyelxdzx.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
  
  @RequestMapping(value = {"/selectEyelxdzxByEyelxdzx.htm"}, method = {RequestMethod.POST})
  public void selectEyelxdzxByEyelxdzx(HttpServletResponse response, HttpServletRequest request, Eyelxdzx eyelxdzx) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据lxdzx报告对象查询符合条件的lxdzx报告对象";
    try {
      eyelxdzx = this.eyelxdzxservice.selectEyelxdzxByEyelxdzx(eyelxdzx);
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
    result.setObj(eyelxdzx);
    this.oimslogservice.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
