package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IJzjlService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.HuanZheSearchForm;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.pojo.OutpMr;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.Date;
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
@RequestMapping({"jzjl"})
public class JzjlController extends BaseController {
  private IJzjlService jzjlService;
  
  private IJiuzhenService jiuzhenService;
  
  private HisWebService hiswebservice;
  
  private IHuanZheXinXiService hzxxService;
  
  private IYuanGongService yuangongservice;
  
  @Autowired
  public void setHzxxService(IHuanZheXinXiService hzxxService) {
    this.hzxxService = hzxxService;
  }
  
  @Autowired
  public void setYuangongservice(IYuanGongService yuangongservice) {
    this.yuangongservice = yuangongservice;
  }
  
  @Autowired
  public void setHiswebservice(HisWebService hiswebservice) {
    this.hiswebservice = hiswebservice;
  }
  
  @Autowired
  public void setJzjlService(IJzjlService jzjlService) {
    this.jzjlService = jzjlService;
  }
  
  @Autowired
  public void setJiuzhenService(IJiuzhenService jiuzhenService) {
    this.jiuzhenService = jiuzhenService;
  }
  
  @RequestMapping(value = {"/getJzjlListByCategoryIdAndJiuzhenId.htm"}, method = {RequestMethod.POST})
  public void getJzjlListByCategoryIdAndJiuzhenId(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取就诊记录列表");
    String categoryId = request.getParameter("categoryId");
    String jiuzhenId = request.getParameter("jiuzhenId");
    try {
      Integer cId = null;
      Long jId = null;
      if (categoryId != null && !"".equals("categoryId"))
        cId = Integer.valueOf(Integer.parseInt(categoryId)); 
      if (jiuzhenId != null && !"".equals("jiuzhenId"))
        jId = Long.valueOf(Long.parseLong(jiuzhenId)); 
      List<Jzjl> list = this.jzjlService.findJzjlListByCategoryIdAndJiuzhenId(cId, jId);
      if (list != null && list.size() > 0) {
        result.setObj(list);
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findTodayHuanZhe.htm"}, method = {RequestMethod.POST})
  public void findTodayHuanZhe(HttpServletRequest request, HttpServletResponse response, Page page, HuanZheSearchForm searchForm) {
    MyResult mr = createResult("查询当天就诊患者", request);
    try {
      Map<String, Object> m = new HashMap<>(0);
      List<HuanZheXinXi> list = this.jzjlService.findTodayHuanZhe(page, searchForm);
      m.put("list", list);
      m.put("page", page);
      JSONWriterUtils.writeJSONObj(m, response);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
      JSONWriterUtils.writeJSONObj(mr, response);
    } 
  }
  
  @RequestMapping(value = {"/saveMedicalRecord.htm"}, method = {RequestMethod.POST})
  public void saveJzjl(Jzjl jzjl, HttpServletRequest request, HttpServletResponse response, String zkjc) {
    MyResult result = new MyResult();
    result.setDoing("保存就诊记录列表");
    HttpSession session = request.getSession();
    try {
      jzjl.setJlren(session.getAttribute("gonghao").toString());
      YuanGong yg = this.yuangongservice.obtainYuanGongByGonghao(session.getAttribute("gonghao").toString());
      if (!this.jiuzhenService.isMyJiuzhen(jzjl.getJlren(), jzjl.getJiuzhenId()))
        throw new RuntimeException("您不是当前患者的接诊医生，无权为患者写病历！"); 
      jzjl.setJlTime(new Date());
      this.jzjlService.saveOrUpdateMR(jzjl, request);
      Jiuzhen jz = this.jiuzhenService.getJiuzhenById(jzjl.getJiuzhenId());
      if (jz.getHaoma() != null && !jz.getHaoma().startsWith("OIMS")) {
        HuanZheXinXi hzxx = this.hzxxService.findHuanZheById(jz.getHuanzheId());
        OutpMr om = this.hiswebservice.findOUTPMR(jz.getCaozuoTime(), Integer.valueOf(Integer.parseInt(jz.getHaoma())));
        List<Jzjl> jzjlList = this.jzjlService.getJzjlListByJiuzhenId(String.valueOf(jzjl.getJiuzhenId()));
        if (om != null) {
          if (jzjl.getJilu() != null && !jzjl.getJilu().trim().equals("")) {
            if (jzjlList != null && jzjlList.size() > 0) {
              for (Jzjl jzjltmp : jzjlList) {
                if (jzjltmp.getCategoryId().intValue() == 30100) {
                  om.setIllness_desc(jzjltmp.getJilu());
                  continue;
                }
                if (jzjltmp.getCategoryId().intValue() == 30103) {
                  om.setAnamnesis(jzjltmp.getJilu());
                  continue;
                }
                if (jzjltmp.getCategoryId().intValue() == 30102) {
                  om.setMed_history(jzjltmp.getJilu());
                  continue;
                }
                if (jzjltmp.getCategoryId().intValue() == 30104) {
                  om.setAllergic_history(jzjltmp.getJilu());
                  continue;
                }
                if (jzjltmp.getCategoryId().intValue() == 30105)
                  om.setFamily_history(jzjltmp.getJilu());
              }
              //设置最后医生为当前登录的医生
              om.setLast_doctor(yg.getXingming());
              if (jzjl.getCategoryId().intValue() == 30100) {
                om.setIllness_desc(jzjl.getJilu());
                this.hiswebservice.updateOUTPMR(om);
              } else if (jzjl.getCategoryId().intValue() == 30103) {
                om.setAnamnesis(jzjl.getJilu());
                this.hiswebservice.updateOUTPMR(om);
              } else if (jzjl.getCategoryId().intValue() == 30102) {
                om.setMed_history(jzjl.getJilu());
                this.hiswebservice.updateOUTPMR(om);
              } else if (jzjl.getCategoryId().intValue() == 30104) {
                om.setFamily_history(jzjl.getJilu());
                this.hiswebservice.updateOUTPMR(om);
              } else if (jzjl.getCategoryId().intValue() == 30105) {
                om.setAllergic_history(jzjl.getJilu());
                this.hiswebservice.updateOUTPMR(om);
              }
            }
          } 
        } else {
          om = new OutpMr();
          if (jzjlList != null && jzjlList.size() > 0)
            for (Jzjl jzjltmp : jzjlList) {
              if (jzjltmp.getCategoryId().intValue() == 30100) {
                om.setIllness_desc(jzjltmp.getJilu());
                continue;
              } 
              if (jzjltmp.getCategoryId().intValue() == 30103) {
                om.setAnamnesis(jzjltmp.getJilu());
                continue;
              } 
              if (jzjltmp.getCategoryId().intValue() == 30102) {
                om.setMed_history(jzjltmp.getJilu());
                continue;
              } 
              if (jzjltmp.getCategoryId().intValue() == 30104) {
                om.setAllergic_history(jzjltmp.getJilu());
                continue;
              } 
              if (jzjltmp.getCategoryId().intValue() == 30105)
                om.setFamily_history(jzjltmp.getJilu()); 
            }  
          om.setPatient_id(hzxx.getBinglihao());
          om.setVisit_date(jz.getCaozuoTime());
          om.setVisit_no(Integer.valueOf(Integer.parseInt(jz.getHaoma())));
          if (jzjl.getCategoryId().intValue() == 30100) {
            om.setIllness_desc(jzjl.getJilu());
          } else if (jzjl.getCategoryId().intValue() == 30103) {
            om.setAnamnesis(jzjl.getJilu());
          } else if (jzjl.getCategoryId().intValue() == 30102) {
            om.setMed_history(jzjl.getJilu());
          } else if (jzjl.getCategoryId().intValue() == 30104) {
            om.setAllergic_history(jzjl.getJilu());
          } else if (jzjl.getCategoryId().intValue() == 30105) {
            om.setFamily_history(jzjl.getJilu());
          } 
          om.setDoctor(yg.getXingming());
          om.setLast_doctor(yg.getXingming());
          if (jzjl.getJilu() != null && !jzjl.getJilu().trim().equals(""))
            this.hiswebservice.addOUTPMR(om); 
        } 
      } 
      this.jiuzhenService.setPatientState(jzjl.getJiuzhenId(), Integer.valueOf(94));
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveZkjcToHis.htm"}, method = {RequestMethod.POST})
  public void saveZkjcToHis(HttpServletRequest request, HttpServletResponse response, String zkjc, String jiuzhenId) {
    Jiuzhen jz = this.jiuzhenService.getJiuzhenById(Long.valueOf(Long.parseLong(jiuzhenId)));
    if (jz.getHaoma() != null && !jz.getHaoma().startsWith("OIMS")) {
      OutpMr om = this.hiswebservice.findOUTPMR(jz.getCaozuoTime(), Integer.valueOf(Integer.parseInt(jz.getHaoma())));
      if (om != null) {
        om.setBody_exam(zkjc);
        this.hiswebservice.updateOUTPMR(om);
      } 
    } 
  }
}
