package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaogaoMoban;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.service.IBanGongShiService;
import cn.com.oims.service.IBaogaoMobanService;
import cn.com.oims.service.IBuMenService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IPaiduiService;
import cn.com.oims.service.ISheBeiService;
import cn.com.oims.service.IShuruMobanService;
import cn.com.oims.service.IYuYanService;
import cn.com.oims.web.form.BuMenSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"bumen"})
public class BuMenController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  private IBuMenService bumenService;
  
  private IJcdService jcdService;
  
  private IPaiduiService paiduiService;
  
  private IYuYanService yuyanService;
  
  private IBanGongShiService bangongshiService;
  
  private IOimsLogService oimslogService;
  
  private IBaogaoMobanService bgmbService;
  
  private ISheBeiService shebeiService;
  
  private IShuruMobanService srmbService;
  
  @Autowired
  public void setSrmbService(IShuruMobanService srmbService) {
    this.srmbService = srmbService;
  }
  
  @Autowired
  public void setShebeiService(ISheBeiService shebeiService) {
    this.shebeiService = shebeiService;
  }
  
  @Autowired
  public void setBgmbService(IBaogaoMobanService bgmbService) {
    this.bgmbService = bgmbService;
  }
  
  @Autowired
  public void setOimslogService(IOimsLogService oimslogService) {
    this.oimslogService = oimslogService;
  }
  
  @Autowired
  public void setBangongshiService(IBanGongShiService bangongshiService) {
    this.bangongshiService = bangongshiService;
  }
  
  @Autowired
  public void setYuyanService(IYuYanService yuyanService) {
    this.yuyanService = yuyanService;
  }
  
  @Autowired
  public void setJcdService(IJcdService jcdService) {
    this.jcdService = jcdService;
  }
  
  @Autowired
  public void setPaiduiService(IPaiduiService paiduiService) {
    this.paiduiService = paiduiService;
  }
  
  @Autowired
  public void setBumenService(IBuMenService bumenService) {
    this.bumenService = bumenService;
  }
  
  @RequestMapping(value = {"/getBumenList.htm"}, method = {RequestMethod.POST})
  public void getBumenList(BuMenSearchForm bsf, Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "分页查询部门信息";
    try {
      List list = this.bumenService.getBumenList(page, bsf);
      map.put("list", list);
      map.put("page", page);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(map);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimslogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findAllBuMen.htm"}, method = {RequestMethod.POST})
  public void findAllBuMen(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<BuMen> bumens = new ArrayList<>();
    this.doing = "查询所有部门信息";
    try {
      bumens = this.bumenService.findAllBuMen();
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(bumens);
    result.setGonghao(gonghao);
    this.oimslogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findBuMenByID.htm"}, method = {RequestMethod.POST})
  public void findBuMenByID(HttpServletRequest request, HttpServletResponse response, int id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据部门ID查询部门对象";
    BuMen bumen = null;
    try {
      bumen = this.bumenService.getBuMenById(Integer.valueOf(id));
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      bumen = new BuMen();
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(bumen);
    result.setGonghao(gonghao);
    this.oimslogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/addBuMen.htm"}, method = {RequestMethod.POST})
  public void saveDanWei(HttpServletRequest request, HttpServletResponse response, BuMen bm) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "部门信息新增";
    try {
      this.bumenService.saveBuMen(bm);
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
    this.oimslogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/deleteBuMen.htm"}, method = {RequestMethod.POST})
  public void deleteBuMen(HttpServletRequest request, HttpServletResponse response, BuMen bumen) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "部门信息删除";
    try {
      this.bumenService.delBuMenById(bumen.getId());
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
    this.oimslogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/IsBuMenToOtherTable.htm"}, method = {RequestMethod.POST})
  public void IsBuMen(HttpServletRequest request, HttpServletResponse response, int id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("判断部门是否有关联信息");
    try {
      if (this.bangongshiService.findAllBanGongShiByBuMenID(id) != null && 
        this.bangongshiService.findAllBanGongShiByBuMenID(id).size() != 0) {
        result.setMessage("有关联的办公室信息，不能删除！");
      } else {
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimslogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/DelBuMen.htm"}, method = {RequestMethod.POST})
  public void delBuMen(HttpServletRequest request, HttpServletResponse response, int id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("根据id删除部门信息");
    BuMen o = new BuMen();
    o.setId(Integer.valueOf(id));
    BaogaoMoban bgmb = new BaogaoMoban();
    bgmb.setBumenId(Integer.valueOf(id));
    SheBei s = new SheBei();
    s.setBmId(Integer.valueOf(id));
    ShuruMoban srmb = new ShuruMoban();
    srmb.setBmId(Integer.valueOf(id));
    boolean a = this.paiduiService.isBumenByIdToPaidui(Integer.valueOf(id));
    boolean c = this.jcdService.isBumenByIdToJcd(Integer.valueOf(id));
    boolean d = (this.bgmbService.findBaogaoMobansByBaogaoMoban(bgmb).size() > 0);
    boolean r = (this.shebeiService.getShebeisBySheBei(s).size() > 0);
    boolean b = (this.bumenService.getShebeiList(o).size() > 0);
    try {
      if (a || c || d || r || b) {
        result.setMessage("有关联的信息不能删除");
        result.setState(0);
      } else {
        this.bumenService.delBuMenById(Integer.valueOf(id));
        result.setMessage("删除成功");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("失败");
    } 
    result.setGonghao(gonghao);
    this.oimslogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateBuMen.htm"}, method = {RequestMethod.POST})
  public void updateBuMen(HttpServletRequest request, HttpServletResponse response, BuMen bumen) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "部门信息修改";
    try {
      this.bumenService.updateBuMen(bumen);
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
    this.oimslogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
