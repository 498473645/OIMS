package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.RevProj;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.service.IBuMenService;
import cn.com.oims.service.IReserveInfoService;
import cn.com.oims.service.IRevChangeService;
import cn.com.oims.service.IRevProjService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.RevChgForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"revchg"})
public class RevChgController extends BaseController {
  @Autowired
  private IRevChangeService revChgService;
  
  @Autowired
  private IRevProjService revProjService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  private IBuMenService bumenService;
  
  @Autowired
  private IReserveInfoService reserveInfoService;
  
  @RequestMapping(value = {"/getRevChgList.htm"}, method = {RequestMethod.POST})
  public void getRevChgList(HttpServletRequest request, HttpServletResponse response, Page page, RevChgForm form) {
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = null;
    try {
      User user = getCurrentUser(request);
      BuMen bm = this.bumenService.getBuMenById(this.yuanGongService
          .obtainYuanGongByGonghao(user.getGonghao()).getBumenId());
      list = this.revChgService.findRevChgByForm(page, form);
      map.put("list", list);
      map.put("page", page);
      map.put("bumen", bm);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getDepartMent.htm"}, method = {RequestMethod.POST})
  public void getBumen(HttpServletRequest request, HttpServletResponse response, Page page, RevChgForm form) {
    MyResult result = new MyResult();
    try {
      User user = getCurrentUser(request);
      BuMen bm = this.bumenService.getBuMenById(this.yuanGongService
          .obtainYuanGongByGonghao(user.getGonghao()).getBumenId());
      result.setObj(bm);
      result.setState(1);
    } catch (Exception e) {
      result.setObj(e.getMessage());
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getProjByDepartMent.htm"}, method = {RequestMethod.POST})
  public void getProjByDepartMent(HttpServletRequest request, HttpServletResponse response, Integer bumenId) {
    MyResult result = new MyResult();
    try {
      List<RevProj> rplist = this.revProjService.getRevProjByBumenId(bumenId.intValue());
      result.setObj(rplist);
      result.setState(1);
    } catch (Exception e) {
      result.setObj(e.getMessage());
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/mrgRevChg.htm"}, method = {RequestMethod.POST})
  public void mrgRevChg(HttpServletRequest request, HttpServletResponse response, RevChgForm form) {
    MyResult result = new MyResult();
    try {
      this.revChgService.mrgRevChgByForm(form);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/mrgRevChgBat.htm"}, method = {RequestMethod.POST})
  public void mrgRevChgBat(HttpServletRequest request, HttpServletResponse response, RevChgForm form) {
    MyResult result = new MyResult();
    try {
      this.revChgService.mrgRevChgBatByForm(form);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findByJcxmNBumen.htm"}, method = {RequestMethod.POST})
  public void findByJcxmNBumen(HttpServletRequest request, HttpServletResponse response, Long reprojId, String revdt) {
    MyResult result = new MyResult();
    RevChgForm revChgForm = new RevChgForm();
    RevProj revProj = this.revProjService.getRevProjById(reprojId);
    int maxYuyueNumAm = 0;
    int maxYuyueNumPm = 0;
    int bgshuAm = 0;
    int bgshuPm = 0;
    int mYuyueNumAm = 0;
    int mYuyueNumPm = 0;
    int yuyueNumAm = 0;
    int yuyueNumPm = 0;
    User user = getCurrentUser(request);
    if (revProj != null) {
      maxYuyueNumAm = revProj.getAmnum().intValue();
      maxYuyueNumPm = revProj.getPmnum().intValue();
      bgshuAm = this.revChgService.getReserveChgNumByResDateAndReprojId(0, revProj.getJcxmIds(), revdt, revProj.getBumenId());
      bgshuPm = this.revChgService.getReserveChgNumByResDateAndReprojId(1, revProj.getJcxmIds(), revdt, revProj.getBumenId());
      mYuyueNumAm = maxYuyueNumAm + bgshuAm;
      mYuyueNumPm = maxYuyueNumPm + bgshuPm;
      yuyueNumAm = this.reserveInfoService.curReserveNumAm(reprojId, user.getGonghao(), revdt);
      yuyueNumPm = this.reserveInfoService.curReserveNumPm(reprojId, user.getGonghao(), revdt);
      revChgForm.setOfferAmNum(Integer.valueOf(mYuyueNumAm));
      revChgForm.setOfferPmNum(Integer.valueOf(mYuyueNumPm));
      revChgForm.setAmnum(Integer.valueOf(mYuyueNumAm - yuyueNumAm));
      revChgForm.setPmnum(Integer.valueOf(mYuyueNumPm - yuyueNumPm));
      revChgForm.setYuyueNumAm(Integer.valueOf(yuyueNumAm));
      revChgForm.setYuyueNumPm(Integer.valueOf(yuyueNumPm));
      revChgForm.setAddr(revProj.getCheckAddr());
      result.setObj(revChgForm);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
