package cn.com.oims.web.controller;

import cn.com.oims.common.CheckTeleFormat;
import cn.com.oims.common.Copy_2_of_ExcelUtilLogInfo;
import cn.com.oims.common.FileUpOrDownLoad;
import cn.com.oims.common.PersonalArtcleList;
import cn.com.oims.common.XLSHead;
import cn.com.oims.dao.pojo.Baogao;
import cn.com.oims.dao.pojo.BaogaoMoban;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IBaogaoMobanService;
import cn.com.oims.service.IBaogaoService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.ISheBeiService;
import cn.com.oims.service.IShuruMobanService;
import cn.com.oims.service.IUserService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.utils.FtlTool;
import cn.com.oims.web.form.Fblw_Form;
import cn.com.oims.web.form.UserForm;
import cn.com.oims.web.form.YgForm;
import cn.com.oims.web.form.YuanGongSearchForm;
import cn.com.oims.web.form.YuangGongDangAnForm;
import cn.com.oims.web.form.YuangongJianliForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.ObjectWrapper;
import freemarker.template.Template;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping({"yuangong"})
public class YuanGongController extends BaseController {
  private String path_YuanGongPhoto = "/ygPhoto";
  
  private String path_YuanGongJianLiFile = "/gyJianLi" + File.separator + "fujian";
  
  private String path_YuanGongJianLiDownLoadTmpFile = "/gyJianLi" + File.separator + "tmp";
  
  private String path_YuanGongJianLiDownLoadTmpFilePath = "/gyJianLi" + File.separator + "tmp" + File.separator + "template";
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  private IYuanGongService yuangongService;
  
  private IOimsLogService oimsLogService;
  
  private IUserService userservice;
  
  private IJcdService jcdservice;
  
  private IBaogaoMobanService bgmbService;
  
  private IBaogaoService baogaoService;
  
  private IJiuzhenService jiuzhenService;
  
  private ISheBeiService shebeiService;
  
  private IShuruMobanService srmbService;
  
  @Autowired
  public void setJiuzhenService(IJiuzhenService jiuzhenService) {
    this.jiuzhenService = jiuzhenService;
  }
  
  @Autowired
  public void setShebeiService(ISheBeiService shebeiService) {
    this.shebeiService = shebeiService;
  }
  
  @Autowired
  public void setSrmbService(IShuruMobanService srmbService) {
    this.srmbService = srmbService;
  }
  
  @Autowired
  public void setBaogaoService(IBaogaoService baogaoService) {
    this.baogaoService = baogaoService;
  }
  
  @Autowired
  public void setBgmbService(IBaogaoMobanService bgmbService) {
    this.bgmbService = bgmbService;
  }
  
  @Autowired
  public void setJcdservice(IJcdService jcdservice) {
    this.jcdservice = jcdservice;
  }
  
  @Autowired
  public void setOimsLogService(IOimsLogService oimsLogService) {
    this.oimsLogService = oimsLogService;
  }
  
  @Autowired
  public void setYuangongService(IYuanGongService yuangongService) {
    this.yuangongService = yuangongService;
  }
  
  @Autowired
  public void setUserservice(IUserService userservice) {
    this.userservice = userservice;
  }
  
  @RequestMapping(value = {"/findAllyuangongByPage.htm"}, method = {RequestMethod.POST})
  public void findYuanGongByPage(HttpServletRequest request, HttpServletResponse response, Page page, YuanGongSearchForm yuangongsearchform) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    List<YuanGong> list = new ArrayList<>();
    this.doing = "??????????????????????????????";
    try {
      list = this.yuangongService.findYuanGongsByPage(page, 
          yuangongsearchform);
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    map.put("list", list);
    map.put("page", page);
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(map);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findYuanGongByID.htm"}, method = {RequestMethod.POST})
  public void findYuanGongById(HttpServletRequest request, HttpServletResponse response, int id) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    this.doing = "????????????ID??????????????????";
    YuanGong yuangong = null;
    try {
      yuangong = this.yuangongService.findYuanGongById(Integer.valueOf(id));
      String path = request.getSession().getServletContext()
        .getRealPath("/");
      String ygphotopath = yuangong.getPhoto();
      if (CheckTeleFormat.checkFileName(String.valueOf(path) + ygphotopath)) {
        yuangong.setPhoto(ygphotopath);
      } else {
        yuangong.setPhoto("");
      } 
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(yuangong);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/addYuanGong.htm"}, method = {RequestMethod.POST})
  public void saveYuanGong(HttpServletRequest request, HttpServletResponse response, YgForm ygf, UserForm uf) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    this.doing = "??????????????????,???????????????????????????????????????";
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile yg_photo = multipartRequest.getFile("yg_photo");
    try {
      ygf.setPhoto(String.valueOf(this.path_YuanGongPhoto) + 
          System.getProperty("file.separator") + 
          FileUpOrDownLoad.doFileUpLoad(yg_photo, 
            request.getSession().getServletContext()
            .getRealPath(this.path_YuanGongPhoto)));
      this.yuangongService.addYuanGong(uf, ygf);
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updataYuanGongTouXiang.htm"}, method = {RequestMethod.POST})
  public void updataYuanGongTouXiang(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("????????????????????????");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile yg_photo = multipartRequest.getFile("yg_photo");
    String ygPhotoPath = FileUpOrDownLoad.doFileUpLoad(
        yg_photo, 
        request.getSession().getServletContext()
        .getRealPath(this.path_YuanGongPhoto));
    try {
      YuanGong yg = this.yuangongService.obtainYuanGongByGonghao(gonghao);
      if (yg != null) {
        yg.setPhoto(String.valueOf(this.path_YuanGongPhoto) + "/" + ygPhotoPath);
        this.yuangongService.updateYg(yg);
        result.setObj(yg);
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/gonghaoIsExist.htm"}, method = {RequestMethod.POST})
  public void gonghaoIsExist(HttpServletRequest request, HttpServletResponse response, String allgonghao) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    this.doing = "?????????????????????????????????????????????????????????????????????(??????)";
    try {
      YuanGong yuangong = this.yuangongService
        .obtainYuanGongByGonghao(allgonghao);
      if (yuangong != null) {
        this.doState = 1;
        this.message = "?????????????????????????????????????????????";
      } else {
        this.doState = 0;
        this.message = "????????????????????????????????????????????????";
      } 
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/IsYuanGongToOtherTable.htm"}, method = {RequestMethod.POST})
  public void IsYuanGongToOther(HttpServletRequest request, HttpServletResponse response, int id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("?????????????????????????????????");
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/deleteYuanGongById.htm"}, method = {RequestMethod.POST})
  public void deleteYuanGongById(HttpServletResponse response, HttpServletRequest request, YuanGong yuangong) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "??????Id????????????????????????";
    try {
      this.yuangongService.deleteYuanGongById(yuangong.getId().intValue());
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(yuangong);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/DelYuanGong.htm"}, method = {RequestMethod.POST})
  public void doDelYuanGong(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("??????????????????");
    String ids = request.getParameter("ids");
    YuanGong yg = new YuanGong();
    BaogaoMoban bgmb = new BaogaoMoban();
    Baogao bg = new Baogao();
    Jiuzhen jz = new Jiuzhen();
    SheBei sb = new SheBei();
    ShuruMoban srmb = new ShuruMoban();
    int n = 0;
    try {
      String[] uids = null;
      if (ids != null && !ids.equals("")) {
        uids = ids.split(",");
        byte b;
        int i;
        String[] arrayOfString;
        for (i = (arrayOfString = uids).length, b = 0; b < i; ) {
          String id = arrayOfString[b];
          if (id != null && !id.equals("")) {
            yg = this.yuangongService.findYuanGongById(
                Integer.valueOf(id));
            bgmb.setGonghao(yg.getGonghao());
            bg.setBgys(yg.getXingming());
            srmb.setGonghao(yg.getGonghao());
            boolean a = (this.bgmbService.findBaogaoMobansByBaogaoMoban(
                bgmb).size() == 0);
            boolean bool1 = (this.yuangongService.obtainBaoGaoByGonghao(yg)
              .size() == 0);
            boolean c = (this.yuangongService.obtainJzjlByGonghao(
                yg.getGonghao()).size() == 0);
            boolean d = (this.shebeiService.getShebeiListByManagerUser(
                yg.getGonghao()).size() == 0);
            boolean e = (this.yuangongService.obtainSrMbByGonghao(
                yg.getGonghao()).size() == 0);
            if (a && bool1 && c && d && e) {
              this.yuangongService.deleteYuanGongById(Integer.valueOf(id).intValue());
              n++;
            } 
          } 
          b++;
        } 
        result.setState(1);
        result.setMessage("????????????:" + n);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("??????");
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/ssssDelYuanGong.htm"}, method = {RequestMethod.POST})
  public void delYuanGong(HttpServletRequest request, HttpServletResponse response, String ids) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    List<Long> idsL = new ArrayList();
    String[] arrayOfString;
    int j = (arrayOfString = ids.split(",")).length;
    for (int i = 0; i < j; i++) {
      String id = arrayOfString[i];
      if (id != null && !id.equals(""))
        idsL.add(Long.valueOf(Long.parseLong(id))); 
    } 
    MyResult result = new MyResult();
    result.setDoing("??????????????????");
    try {
      this.yuangongService.delYuanGong(idsL);
      result.setState(1);
      result.setMessage("??????");
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("??????");
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateYuanGong.htm"}, method = {RequestMethod.POST})
  public void updateYuanGong(HttpServletRequest request, HttpServletResponse response, YgForm ygf, UserForm uf) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    this.doing = "??????????????????";
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile yg_photo = multipartRequest.getFile("yg_photo");
    try {
      if (yg_photo == null || yg_photo.getSize() == 0L) {
        ygf.setPhoto(this.yuangongService.findYuanGongById(
              Integer.valueOf(ygf.getId())).getPhoto());
      } else {
        ygf.setPhoto(String.valueOf(this.path_YuanGongPhoto) + 
            System.getProperty("file.separator") + 
            FileUpOrDownLoad.doFileUpLoad(yg_photo, 
              request.getSession().getServletContext()
              .getRealPath(this.path_YuanGongPhoto)));
      } 
      this.yuangongService.updateYuanGong(ygf, uf);
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findYuangongByGh.htm"}, method = {RequestMethod.POST})
  public void findYuangongByGh(String gh, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    YuanGong yuangong = null;
    this.doing = "????????????????????????????????????";
    try {
      yuangong = this.yuangongService.obtainYuanGongByGonghao(gh);
      if (yuangong != null) {
        this.doState = 1;
        this.message = "?????????????????????????????????????????????";
      } else {
        this.doState = 0;
        this.message = "????????????????????????????????????????????????";
      } 
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(yuangong);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findYuangongByGonghao.htm"}, method = {RequestMethod.POST})
  public void findYuangongByGonghao(HttpServletRequest req, HttpServletResponse res) {
    MyResult result = new MyResult();
    HttpSession session = req.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("????????????????????????????????????");
    try {
      YuanGong yg = this.yuangongService.obtainYuanGongByGonghao(gonghao);
      if (yg != null) {
        String path = req.getSession().getServletContext()
          .getRealPath("/");
        String photoPath = yg.getPhoto();
        if (!CheckTeleFormat.checkFileName(String.valueOf(path) + photoPath))
          yg.setPhoto(""); 
        result.setObj(yg);
        result.setState(1);
        result.setMessage("??????");
      } else {
        result.setMessage("??????");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, res);
  }
  
  @RequestMapping(value = {"/findYuangongByGonghao1.htm"}, method = {RequestMethod.POST})
  public void findYuangongByGonghao1(HttpServletRequest req, HttpServletResponse res) {
    MyResult result = new MyResult();
    String gonghao = req.getParameter("gonghao");
    result.setDoing("????????????????????????????????????");
    try {
      YuanGong yg = this.yuangongService.obtainYuanGongByGonghao(gonghao);
      if (yg != null) {
        String path = req.getSession().getServletContext()
          .getRealPath("/");
        String photoPath = yg.getPhoto();
        if (!CheckTeleFormat.checkFileName(String.valueOf(path) + photoPath))
          yg.setPhoto(""); 
        result.setObj(yg);
        result.setState(1);
        result.setMessage("??????");
      } else {
        result.setMessage("??????");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, res);
  }
  
  @RequestMapping(value = {"getJianChaDoctorByBumenAndQuanxian.htm"}, method = {RequestMethod.POST})
  public void getDoctorByBumenAndQuanxian(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List list = new ArrayList();
    this.doing = "?????????????????????????????????????????????????????????";
    try {
      list = this.yuangongService.getDoctorByBumenAndQuanxian(-1, 
          "114");
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(list);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getKaiDanDoctorByQuanxian.htm"}, method = {RequestMethod.POST})
  public void getKaiDanDoctorByQuanxian(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List list = new ArrayList();
    this.doing = "???????????????????????????????????????";
    try {
      list = this.yuangongService.getDoctorByBumenAndQuanxian(-1, 
          "204,205");
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(list);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getKaiDanDoctorByHuanZheId.htm"}, method = {RequestMethod.POST})
  public void getKaiDanDoctorByHuanZheId(Long huanzheId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "??????????????????";
    try {
      String fzys = this.yuangongService.getDoctorByHuanZheId(huanzheId);
      this.doState = 1;
      this.message = "????????????";
      result.setObj(fzys);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getYuYueDoctorByQuanxian.htm"}, method = {RequestMethod.GET})
  public void getYuYueDoctorByQuanxian(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("??????????????????????????????????????????");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    List list = this.yuangongService.getDoctorByBumenAndQuanxian(-1, 
        "163");
    if (list != null) {
      result.setObj(list);
      result.setState(1);
      result.setMessage("??????");
    } else {
      result.setMessage("????????????????????????");
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findYuanGongsByYuanGong.htm"}, method = {RequestMethod.POST})
  public void findYuanGongsByYuanGon(HttpServletRequest request, HttpServletResponse response, YuanGong yuangong) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List yuangongs = new ArrayList();
    this.doing = "???????????????????????????????????????????????????";
    try {
      yuangongs = this.yuangongService.findYuanGongsByBuMenId(yuangong.getBumenId());
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(yuangongs);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findUserByGh.htm"}, method = {RequestMethod.POST})
  public void findUserByGh(String gh, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "?????????????????????????????????????????????????????????????????????";
    User user = null;
    try {
      user = this.yuangongService.obtainUserByGonghao(gh);
      if (user != null) {
        this.doState = 1;
        this.message = "????????????(????????????????????????????????????)";
      } else {
        this.doState = 0;
        this.message = "????????????(?????????????????????????????????????????????)";
      } 
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(user);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping({"/upLoadYgPic.htm"})
  public void upLoadYgPic(HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile file = multipartRequest.getFile("yg_photo");
    String path_yg_photo = "";
    MyResult result = new MyResult();
    this.doing = "????????????????????????";
    try {
      String name_yg_photo = FileUpOrDownLoad.doFileUpLoad(
          file, 
          request.getSession().getServletContext()
          .getRealPath(this.path_YuanGongPhoto));
      if (name_yg_photo != null)
        path_yg_photo = String.valueOf(this.path_YuanGongPhoto) + File.separator + 
          name_yg_photo; 
      this.doState = 1;
      this.message = "??????????????????????????????";
    } catch (Exception e) {
      path_yg_photo = "";
      this.doState = 0;
      this.message = "??????????????????????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(path_yg_photo);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findYuangongByBumenId.htm"}, method = {RequestMethod.POST})
  public void findYuangongByBumenId(Integer deptId, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "????????????????????????";
    try {
      List<YuanGong> list = this.yuangongService.findYuanGongsByBuMenId(deptId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"setYuangGongLizhi.htm"}, method = {RequestMethod.POST})
  public void setYuangGongLizhi(Integer id, boolean lizhi, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "????????????????????????";
    try {
      this.yuangongService.setYuangGongLizhi(id, lizhi);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findYuangGongJianli.htm"}, method = {RequestMethod.POST})
  public void findYuangGongJianli(String gonghao, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gh = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("?????????????????????");
    result.setGonghao(gh);
    try {
      if (gonghao == null)
        gonghao = gh; 
      Map<String, List<Object>> list = this.yuangongService.findAllYuanGongJianLi(gonghao);
      result.setState(1);
      result.setObj(list);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"getUploadFileOfJianli.htm"}, method = {RequestMethod.POST})
  public void getUploadFileOfJianli(@RequestParam("uploadFile") MultipartFile uploadFile, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gh = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("??????????????????");
    result.setGonghao(gh);
    YuanGong gong = new YuanGong();
    gong.setGonghao(gh);
    YuanGong yuanGong = this.yuangongService.findYuanGongsByYuanGong(gong).get(0);
    String path_yg_photo = "";
    String name_yg_photo = "";
    try {
      name_yg_photo = FileUpOrDownLoad.doFileUpLoadName(
          uploadFile, 
          
          String.valueOf(request.getSession().getServletContext().getRealPath(this.path_YuanGongJianLiFile)) + File.separator + yuanGong.getXingming());
      if (name_yg_photo != null)
        path_yg_photo = String.valueOf(this.path_YuanGongJianLiFile) + File.separator + yuanGong.getXingming() + File.separator + 
          name_yg_photo; 
      this.doState = 1;
      this.message = "??????????????????";
    } catch (Exception e) {
      path_yg_photo = "";
      this.doState = 0;
      this.message = "??????????????????";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    YuangongJianliForm jianli = new YuangongJianliForm();
    jianli.setFujian(name_yg_photo);
    jianli.setPath(path_yg_photo);
    result.setObj(jianli);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateYgjl.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateYgjl(YuangGongDangAnForm form, String data, HttpServletResponse response, HttpServletRequest request) {
    MyResult result = new MyResult();
    result.setDoing("??????????????????");
    try {
      User user = (User)request.getSession().getAttribute("currentUser");
      result.setGonghao(user.getGonghao());
      Object obj = this.yuangongService.saveOrUpdateYgjl(form, user);
      result.setState(1);
      result.setObj(obj);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteYgjl.htm"}, method = {RequestMethod.POST})
  public void deleteYgjl(String type, Integer id, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gh = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "??????????????????";
    result.setDoing(this.doing);
    result.setGonghao(gh);
    try {
      this.yuangongService.deleteYgjl(id, type);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"downLoadFileOfJianli.htm"}, method = {RequestMethod.GET})
  public void downLoadFileOfJianli(HttpServletRequest request, HttpServletResponse response, String gonghao) {
    User user = (User)request.getSession().getAttribute("currentUser");
    MyResult result = new MyResult();
    result.setDoing("??????????????????");
    try {
      Map<String, Object> data = this.yuangongService.findDownLoad_jianLi(gonghao, user);
      response.setCharacterEncoding("utf-8");
      response.setContentType("application/msword");
      response.addHeader("Content-Disposition", "attachment;filename=" + gonghao + ".doc");
      FtlTool.freemarkerFileOutPut(data, "yuangong", (OutputStream)response.getOutputStream());
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  public void downLoadFileOfJianli_bak(HttpServletRequest request, HttpServletResponse response, String gonghao) {
    User user = (User)request.getSession().getAttribute("currentUser");
    HttpSession session = request.getSession();
    String gh = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("?????????????????????word");
    result.setGonghao(gh);
    try {
      if (gonghao == null)
        gonghao = gh; 
      Map<String, List<Object>> list = this.yuangongService.findAllYuanGongJianLi(gonghao);
      YuanGong gong = new YuanGong();
      gong.setGonghao(gonghao);
      YuanGong yuanGong = this.yuangongService.findYuanGongsByYuanGong(gong).get(0);
      String path = request.getSession().getServletContext().getRealPath(this.path_YuanGongJianLiDownLoadTmpFilePath);
      File file = new File(path);
      if (!file.exists() && !file.isDirectory())
        file.mkdirs(); 
      Configuration configuration = new Configuration();
      configuration.setDirectoryForTemplateLoading(file);
      configuration.setObjectWrapper((ObjectWrapper)new DefaultObjectWrapper());
      configuration.setDefaultEncoding("UTF-8");
      Template template = configuration.getTemplate("jianliJT.html");
      File outFile = new File(String.valueOf(request.getSession().getServletContext().getRealPath(this.path_YuanGongJianLiDownLoadTmpFile)) + File.separator + yuanGong.getXingming() + yuanGong.getGonghao() + "?????????.doc");
      Writer writer = new OutputStreamWriter(new FileOutputStream(outFile), "UTF-8");
      template.setDateTimeFormat("yyyy-MM-dd");
      template.process(list, writer);
      writer.flush();
      writer.close();
      result.setState(1);
      result.setObj(String.valueOf(this.path_YuanGongJianLiDownLoadTmpFile) + File.separator + yuanGong.getXingming() + yuanGong.getGonghao() + "?????????.doc");
    } catch (Exception e) {
      result.setState(0);
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findJianLiByConditon.htm"}, method = {RequestMethod.POST})
  public void findJianLiByConditon(HttpServletRequest request, HttpServletResponse response, YuangongJianliForm form, Page page) {
    HttpSession session = request.getSession();
    String gh = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "??????????????????";
    Map<String, Object> map = new HashMap<>();
    result.setDoing(this.doing);
    result.setGonghao(gh);
    try {
      List<Map<String, Object>> list = this.yuangongService.findAllZiLiaoByCondition(form, page);
      map.put("list", list);
      map.put("page", page);
      result.setState(1);
      result.setObj(map);
      result.setGonghao(gh);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"exportAllArtcle.htm"}, method = {RequestMethod.POST})
  public void exportAllArtcle(HttpServletRequest request, HttpServletResponse response, YuangongJianliForm form, Page page) {
    String path = request.getSession().getServletContext().getRealPath("/temp");
    HttpSession session = request.getSession();
    String gh = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "??????????????????";
    result.setDoing(this.doing);
    result.setGonghao(gh);
    try {
      page.setCurrentPage(Integer.valueOf(1));
      page.setPageSize(Integer.valueOf(100));
      List<Map<String, Object>> list = this.yuangongService.findAllZiLiaoByCondition(form, page);
      List l = PersonalArtcleList.getReturnTypeByClassType(form.getType());
      Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
      File file = eu.exportLogInfo(path, list, l);
      while (page.getCurrentPage().intValue() < page.getPageCount().intValue()) {
        page.setCurrentPage(Integer.valueOf(page.getCurrentPage().intValue() + 1));
        list = this.yuangongService.findAllZiLiaoByCondition(form, page);
        eu.exportLogInfo(file, list, l);
      } 
      result.setObj(file.getName());
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"exportSomeArtcle.htm"}, method = {RequestMethod.POST})
  public void exportSomeArtcle(HttpServletRequest request, HttpServletResponse response, String ids) {}
  
  @RequestMapping(value = {"model_lw_find_fblw.htm"}, method = {RequestMethod.POST})
  public void model_lw_find_fblw(HttpServletRequest request, HttpServletResponse response, String keyword, String categoryId, Page page) {
    User user = (User)request.getSession().getAttribute("currentUser");
    MyResult result = new MyResult();
    result.setDoing("??????????????????");
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = new ArrayList<>(20);
    try {
      list = this.yuangongService.model_lw_find_fblw(categoryId, keyword, page);
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    map.put("list", list);
    map.put("page", page);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(map);
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"model_lw_save.htm"}, method = {RequestMethod.POST})
  public void model_lw_save(HttpServletRequest request, HttpServletResponse response, Fblw_Form fblw) {
    User user = (User)request.getSession().getAttribute("currentUser");
    MyResult result = new MyResult();
    result.setDoing("??????????????????????????????");
    fblw.setGonghao(user.getGonghao());
    try {
      this.yuangongService.model_lw_save(fblw);
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(this.message);
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"model_lw_update.htm"}, method = {RequestMethod.POST})
  public void model_lw_update(HttpServletRequest request, HttpServletResponse response, Fblw_Form fblw) {
    User user = (User)request.getSession().getAttribute("currentUser");
    MyResult result = new MyResult();
    result.setDoing("??????????????????????????????");
    fblw.setGonghao(user.getGonghao());
    try {
      this.yuangongService.model_lw_update(fblw);
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(this.message);
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"model_lw_del.htm"}, method = {RequestMethod.POST})
  public void model_lw_del(HttpServletRequest request, HttpServletResponse response, Fblw_Form fblw) {
    User user = (User)request.getSession().getAttribute("currentUser");
    MyResult result = new MyResult();
    result.setDoing("??????????????????????????????");
    fblw.setGonghao(user.getGonghao());
    try {
      this.yuangongService.model_lw_del(fblw);
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(this.message);
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"model_lw_publish.htm"}, method = {RequestMethod.POST})
  public void model_lw_publish(HttpServletRequest request, HttpServletResponse response, String id) {
    User user = (User)request.getSession().getAttribute("currentUser");
    MyResult result = new MyResult();
    result.setDoing("??????????????????????????????");
    try {
      this.yuangongService.model_lw_publish(id);
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(this.message);
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"exportYuanGong.htm"}, method = {RequestMethod.POST})
  public void exportYuanGong(HttpServletRequest request, HttpServletResponse response, String patient_ids) {
    String[] temp = patient_ids.split(",");
    String s = "(";
    for (int i = 0; i < temp.length; i++) {
      s = String.valueOf(s) + "'" + temp[i] + "'";
      if (i != temp.length - 1)
        s = String.valueOf(s) + ","; 
    } 
    s = String.valueOf(s) + ")";
    List<Map<String, Object>> m = this.yuangongService.findYuangongByIds(s);
    exportXls(m, exportHead(), request, response);
  }
  
  private Vector<XLSHead> exportHead() {
    Vector<XLSHead> vh = new Vector<>();
    XLSHead h = null;
    h = new XLSHead("gonghao", "??????");
    vh.add(h);
    h = new XLSHead("xingming", "??????");
    vh.add(h);
    h = new XLSHead("shengri", "??????", "date");
    vh.add(h);
    h = new XLSHead("zhicheng", "??????");
    vh.add(h);
    h = new XLSHead("xueli", "??????");
    vh.add(h);
    h = new XLSHead("dianhua", "??????");
    vh.add(h);
    h = new XLSHead("sfzh", "????????????");
    vh.add(h);
    return vh;
  }
  
  @RequestMapping(value = {"/updataYuanGongTouXiangManage.htm"}, method = {RequestMethod.POST})
  public void updataYuanGongTouXiangManage(HttpServletRequest request, HttpServletResponse response, String gh_hide) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = gh_hide;
    result.setDoing("????????????????????????");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile yg_photo = multipartRequest.getFile("yg_photo1");
    String ygPhotoPath = FileUpOrDownLoad.doFileUpLoad(
        yg_photo, 
        request.getSession().getServletContext()
        .getRealPath(this.path_YuanGongPhoto));
    try {
      YuanGong yg = this.yuangongService.obtainYuanGongByGonghao(gonghao);
      if (yg != null) {
        yg.setPhoto(String.valueOf(this.path_YuanGongPhoto) + "/" + ygPhotoPath);
        this.yuangongService.updateYg(yg);
        result.setObj(yg);
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateJcxmsOfYuanGong.htm"}, method = {RequestMethod.POST})
  public void updateJcxmsOfYuanGong(HttpServletResponse response, HttpServletRequest request, YuanGong yg) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "??????????????????";
    try {
      this.yuangongService.updateJcxmsOfYuanGong(yg);
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(null);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
