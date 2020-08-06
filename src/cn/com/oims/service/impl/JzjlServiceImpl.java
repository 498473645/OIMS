package cn.com.oims.service.impl;

import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IJzjlDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.jdbc.IEyeDao;
import cn.com.oims.dao.pojo.EyeInfoOutpClinic;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IJzjlService;
import cn.com.oims.utils.DateUtils;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.Page;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JzjlServiceImpl implements IJzjlService {
  private String language = "ISO-8859-1";
  
  private IJzjlDao jzjlDao;
  
  @Autowired
  private IEyeDao eyeDao;
  
  @Autowired
  private IJiuzhenDao jiuzhenDao;
  
  @Autowired
  private IHuanZheXinXiDao huanZheXinXiDao;
  
  @Autowired
  private IYuanGongDao yuanGongDao;
  
  @Autowired
  public void setJzjlDao(IJzjlDao jzjlDao) {
    this.jzjlDao = jzjlDao;
  }
  
  public List<Jzjl> findJzjlListByCategoryIdAndJiuzhenId(Integer categoryId, Long jiuzhenId) {
    return this.jzjlDao.findJzjlListByCategoryIdAndJiuzhenId(categoryId, 
        jiuzhenId);
  }
  
  public List<HuanZheXinXi> findTodayHuanZhe(Page page, HuanZheSearchForm searchForm) throws Exception {
    List<HuanZheXinXi> list = this.jzjlDao.findTodayHuanZhe(page, 
        searchForm);
    return list;
  }
  
  public List<Jzjl> getJzjlListByJiuzhenId(String jzid) {
    return this.jzjlDao.getJzjlListByJiuzhenId(jzid);
  }
  
  private void deleteMRPhoto(Jzjl j, HttpServletRequest request) {
    if (j.getPicPath() != null && !j.getPicPath().isEmpty()) {
      String realPath = request.getSession().getServletContext().getRealPath(j.getPicPath());
      (new File(realPath)).delete();
    } 
  }
  
  public void saveOrUpdateMR(Jzjl jzjl, HttpServletRequest request) {
    List<Jzjl> list = this.jzjlDao.findJzjlListByCategoryIdAndJiuzhenId(jzjl.getCategoryId(), jzjl.getJiuzhenId());
    if (list.size() > 0) {
      Jzjl j = list.get(0);
      if (jzjl.getJilu() == null || jzjl.getJilu().isEmpty()) {
        deleteMRPhoto(j, request);
      } else {
        deleteMRPhoto(j, request);
      } 
      j.setJilu(jzjl.getJilu());
      this.jzjlDao.saveOrUpdateJzjl(j);
    } else {
      this.jzjlDao.saveOrUpdateJzjl(jzjl);
    } 
  }
  
  private void saveOrUpdateJzjlToEyeInfoOutpClinic(Jzjl jzjl) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(jzjl.getJiuzhenId());
    YuanGong yg = this.yuanGongDao.obtainYuanGongByGonghao(visit.getFzys());
    HuanZheXinXi patient = this.huanZheXinXiDao.findHuanZheById(visit.getHuanzheId());
    SimpleDateFormat format = new SimpleDateFormat("yyMMddHHmmss");
    EyeInfoOutpClinic eioc = null;
    try {
      eioc = this.eyeDao.getEyeInfoOutpClinic(patient.getBinglihao(), (new SimpleDateFormat("yyyy-MM-dd")).parse((new SimpleDateFormat("yyyy-MM-dd")).format(visit.getCaozuoTime())), new String(yg.getXingming().getBytes(), this.language));
      String result = jzjl.getJilu();
      if (result != null) {
        String pattern = "(<\\s*([a-z]|[A-Z]|_|\\d|=|\"|'|\\s*)+>)|<\\s*/\\s*([a-z]|[A-Z]|=|\"|'|\\s*)+>";
        result = result.replaceAll(pattern, "");
        result = result.replaceAll("&nbsp;", "");
      } 
      result = (result == null) ? null : new String(result.getBytes(), this.language);
      if (eioc == null) {
        Boolean b = this.eyeDao.findPatientById(patient.getBinglihao());
        if (!b.booleanValue())
          this.eyeDao.addPatientToEyeDatabase(patient); 
        eioc = new EyeInfoOutpClinic();
        eioc.setFlow_no(String.valueOf(patient.getBinglihao()) + format.format(visit.getCaozuoTime()));
        eioc.setCli_date((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date()));
        eioc.setPatient_id(patient.getBinglihao());
        eioc.setDoc_name((yg.getXingming() == null) ? null : new String(yg.getXingming().getBytes(), this.language));
        eioc.setClinic_room("001");
        eioc.setPatient_age(Integer.valueOf(DateUtils.calculateAge(visit.getCaozuoTime(), patient.getShengri())));
        eioc.setVisit_no((visit.getHaoma().length() > 8) ? "0" : visit.getHaoma());
        if (jzjl.getCategoryId().intValue() == 30100) {
          eioc.setPatient_his_present(result);
        } else if (jzjl.getCategoryId().intValue() == 30102) {
          eioc.setPatient_xbs(result);
        } else if (jzjl.getCategoryId().intValue() == 30103) {
          eioc.setPatient_his_jwst(result);
        } else if (jzjl.getCategoryId().intValue() == 30301) {
          eioc.setEye_jc_r_gdw(result);
        } else if (jzjl.getCategoryId().intValue() == 30302) {
          eioc.setEye_jc_l_gdw(result);
        } else if (jzjl.getCategoryId().intValue() == 30305) {
          eioc.setEye_jc_r_yjqk(result);
        } else if (jzjl.getCategoryId().intValue() == 30306) {
          eioc.setEye_jc_l_yjqk(result);
        } else if (jzjl.getCategoryId().intValue() == 30327) {
          eioc.setEye_jc_r_jianl(result);
        } else if (jzjl.getCategoryId().intValue() == 30328) {
          eioc.setEye_jc_l_jianl(result);
        } else if (jzjl.getCategoryId().intValue() == 30307) {
          eioc.setEye_jc_r_lq(result);
        } else if (jzjl.getCategoryId().intValue() == 30308) {
          eioc.setEye_jc_l_lq(result);
        } else if (jzjl.getCategoryId().intValue() == 30303) {
          eioc.setEye_jc_r_yq(result);
        } else if (jzjl.getCategoryId().intValue() == 30304) {
          eioc.setEye_jc_l_yq(result);
        } else if (jzjl.getCategoryId().intValue() == 30309) {
          eioc.setEye_jc_r_jiem(result);
        } else if (jzjl.getCategoryId().intValue() == 30310) {
          eioc.setEye_jc_l_jiem(result);
        } else if (jzjl.getCategoryId().intValue() == 30313) {
          eioc.setEye_jc_r_jiaom(result);
        } else if (jzjl.getCategoryId().intValue() == 30314) {
          eioc.setEye_jc_l_jiaom(result);
        } else if (jzjl.getCategoryId().intValue() == 30311) {
          eioc.setEye_jc_r_gm(result);
        } else if (jzjl.getCategoryId().intValue() == 30312) {
          eioc.setEye_jc_l_gm(result);
        } else if (jzjl.getCategoryId().intValue() == 30315) {
          eioc.setEye_jc_r_qf(result);
        } else if (jzjl.getCategoryId().intValue() == 30316) {
          eioc.setEye_jc_l_qf(result);
        } else if (jzjl.getCategoryId().intValue() == 30317) {
          eioc.setEye_jc_r_hm(result);
        } else if (jzjl.getCategoryId().intValue() == 30318) {
          eioc.setEye_jc_l_hm(result);
        } else if (jzjl.getCategoryId().intValue() == 30319) {
          eioc.setEye_jc_r_tk(result);
        } else if (jzjl.getCategoryId().intValue() == 30320) {
          eioc.setEye_jc_l_tk(result);
        } else if (jzjl.getCategoryId().intValue() == 30321) {
          eioc.setEye_jc_r_jt(result);
        } else if (jzjl.getCategoryId().intValue() == 30322) {
          eioc.setEye_jc_l_jt(result);
        } else if (jzjl.getCategoryId().intValue() == 30323) {
          eioc.setEye_jc_r_blt(result);
        } else if (jzjl.getCategoryId().intValue() == 30324) {
          eioc.setEye_jc_l_blt(result);
        } else if (jzjl.getCategoryId().intValue() == 30325) {
          eioc.setEye_jc_r_swm(result);
        } else if (jzjl.getCategoryId().intValue() == 30326) {
          eioc.setEye_jc_l_swm(result);
        } 
        this.eyeDao.saveEyeInfoOutpClinic(eioc);
      } else {
        eioc.setCli_date((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date()));
        if (jzjl.getCategoryId().intValue() == 30100) {
          eioc.setPatient_his_present(result);
        } else if (jzjl.getCategoryId().intValue() == 30102) {
          eioc.setPatient_xbs(result);
        } else if (jzjl.getCategoryId().intValue() == 30103) {
          eioc.setPatient_his_jwst(result);
        } else if (jzjl.getCategoryId().intValue() == 30301) {
          eioc.setEye_jc_r_gdw(result);
        } else if (jzjl.getCategoryId().intValue() == 30302) {
          eioc.setEye_jc_l_gdw(result);
        } else if (jzjl.getCategoryId().intValue() == 30305) {
          eioc.setEye_jc_r_yjqk(result);
        } else if (jzjl.getCategoryId().intValue() == 30306) {
          eioc.setEye_jc_l_yjqk(result);
        } else if (jzjl.getCategoryId().intValue() == 30327) {
          eioc.setEye_jc_r_jianl(result);
        } else if (jzjl.getCategoryId().intValue() == 30328) {
          eioc.setEye_jc_l_jianl(result);
        } else if (jzjl.getCategoryId().intValue() == 30307) {
          eioc.setEye_jc_r_lq(result);
        } else if (jzjl.getCategoryId().intValue() == 30308) {
          eioc.setEye_jc_l_lq(result);
        } else if (jzjl.getCategoryId().intValue() == 30303) {
          eioc.setEye_jc_r_yq(result);
        } else if (jzjl.getCategoryId().intValue() == 30304) {
          eioc.setEye_jc_l_yq(result);
        } else if (jzjl.getCategoryId().intValue() == 30309) {
          eioc.setEye_jc_r_jiem(result);
        } else if (jzjl.getCategoryId().intValue() == 30310) {
          eioc.setEye_jc_l_jiem(result);
        } else if (jzjl.getCategoryId().intValue() == 30313) {
          eioc.setEye_jc_r_jiaom(result);
        } else if (jzjl.getCategoryId().intValue() == 30314) {
          eioc.setEye_jc_l_jiaom(result);
        } else if (jzjl.getCategoryId().intValue() == 30311) {
          eioc.setEye_jc_r_gm(result);
        } else if (jzjl.getCategoryId().intValue() == 30312) {
          eioc.setEye_jc_l_gm(result);
        } else if (jzjl.getCategoryId().intValue() == 30315) {
          eioc.setEye_jc_r_qf(result);
        } else if (jzjl.getCategoryId().intValue() == 30316) {
          eioc.setEye_jc_l_qf(result);
        } else if (jzjl.getCategoryId().intValue() == 30317) {
          eioc.setEye_jc_r_hm(result);
        } else if (jzjl.getCategoryId().intValue() == 30318) {
          eioc.setEye_jc_l_hm(result);
        } else if (jzjl.getCategoryId().intValue() == 30319) {
          eioc.setEye_jc_r_tk(result);
        } else if (jzjl.getCategoryId().intValue() == 30320) {
          eioc.setEye_jc_l_tk(result);
        } else if (jzjl.getCategoryId().intValue() == 30321) {
          eioc.setEye_jc_r_jt(result);
        } else if (jzjl.getCategoryId().intValue() == 30322) {
          eioc.setEye_jc_l_jt(result);
        } else if (jzjl.getCategoryId().intValue() == 30323) {
          eioc.setEye_jc_r_blt(result);
        } else if (jzjl.getCategoryId().intValue() == 30324) {
          eioc.setEye_jc_l_blt(result);
        } else if (jzjl.getCategoryId().intValue() == 30325) {
          eioc.setEye_jc_r_swm(result);
        } else if (jzjl.getCategoryId().intValue() == 30326) {
          eioc.setEye_jc_l_swm(result);
        } 
        this.eyeDao.updateEyeInfoOutpClinic(eioc);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
}
