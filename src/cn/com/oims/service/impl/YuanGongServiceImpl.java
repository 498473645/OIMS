package cn.com.oims.service.impl;

import cn.com.oims.common.BeanCopyUtils;
import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.common.Utils;
import cn.com.oims.dao.IManageItemDao;
import cn.com.oims.dao.IOperationDictDao;
import cn.com.oims.dao.IUserDao;
import cn.com.oims.dao.IYhpzDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.Manageitem;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.Yhpz;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.dao.pojo.Yuangong_cgjl;
import cn.com.oims.dao.pojo.Yuangong_cykt;
import cn.com.oims.dao.pojo.Yuangong_fblw;
import cn.com.oims.dao.pojo.Yuangong_gzjl;
import cn.com.oims.dao.pojo.Yuangong_hdzl;
import cn.com.oims.dao.pojo.Yuangong_jtcy;
import cn.com.oims.dao.pojo.Yuangong_jypx;
import cn.com.oims.dao.pojo.Yuangong_qtry;
import cn.com.oims.dao.pojo.Yuangong_xwlw;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.utils.FtlTool;
import cn.com.oims.web.form.Fblw_Form;
import cn.com.oims.web.form.UserForm;
import cn.com.oims.web.form.YgForm;
import cn.com.oims.web.form.YuanGongForm;
import cn.com.oims.web.form.YuanGongSearchForm;
import cn.com.oims.web.form.YuangGongDangAnForm;
import cn.com.oims.web.form.YuangongJianliForm;
import cn.com.oims.web.ftl.FtlCgjl;
import cn.com.oims.web.ftl.FtlCykt;
import cn.com.oims.web.ftl.FtlFblw;
import cn.com.oims.web.ftl.FtlGzjl;
import cn.com.oims.web.ftl.FtlHdzl;
import cn.com.oims.web.ftl.FtlImageUtile;
import cn.com.oims.web.ftl.FtlJtcy;
import cn.com.oims.web.ftl.FtlJypx;
import cn.com.oims.web.ftl.FtlQtry;
import cn.com.oims.web.ftl.FtlXwlw;
import cn.com.oims.web.ftl.FtlYuanGong;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class YuanGongServiceImpl implements IYuanGongService {
  IYuanGongDao dao = null;
  
  IUserDao userDao = null;
  
  @Autowired
  IManageItemDao manageritemDao = null;
  
  @Autowired
  IYhpzDao yhpzDao = null;
  
  @Autowired
  IOperationDictDao dictDao = null;
  
  public IYuanGongDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IYuanGongDao dao) {
    this.dao = dao;
  }
  
  @Autowired
  public void setUserDao(IUserDao userDao) {
    this.userDao = userDao;
  }
  
  public int countsOfYuanGong() {
    return this.dao.countsOfYuanGong();
  }
  
  public List<YuanGong> findYuanGongsByPage(Page page, YuanGongSearchForm yuangongsearchform) {
    List<YuanGong> list = this.dao.findYuanGongsByPage(page, 
        yuangongsearchform);
    return list;
  }
  
  public List<YuanGong> findAllYuanGongs() {
    return this.dao.findAllYuanGongs();
  }
  
  public void deleteYuanGongById(int id) {
    this.dao.deleteYuanGongById(id);
  }
  
  public MyResult saveUser(MyResult mr) {
    Map<String, Object> m = (Map<String, Object>)mr.getObj();
    UserForm uf = (UserForm)m.get(UserForm.class.getSimpleName());
    YuanGongForm ygf = (YuanGongForm)m.get(YuanGongForm.class
        .getSimpleName());
    User u = new User();
    YuanGong yg = new YuanGong();
    BeanCopyUtils.copyProperties(uf, u);
    MultiUtils utils = new MultiUtils();
    String password = utils.getPasswordString(u.getPassword());
    u.setPassword(password);
    BeanCopyUtils.copyProperties(ygf, yg);
    u.setEmail("12123@qq.com");
    u.setQuanxian("123");
    u.setQiyong(true);
    u.setJishu(Integer.valueOf(1));
    this.userDao.saveUser(u);
    this.dao.saveYuanGong(yg);
    return mr;
  }
  
  public Serializable saveYuanGong(YuanGongForm o) {
    YuanGong y = new YuanGong();
    BeanCopyUtils.copyProperties(o, y);
    y.setGonghao(o.getGonghao());
    y.setEmail(o.getEmail());
    return this.dao.saveYuanGong(y);
  }
  
  public void saveOrUpdateYuanGong(YuanGong yuangong) {
    this.dao.saveOrUpdateYuanGong(yuangong);
  }
  
  public void updateYuanGong(YgForm ygf, UserForm uf) {
    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
    YuanGong yg = this.dao.findYuanGongById(Integer.valueOf(Integer.parseInt(ygf.getId())));
    yg.setXingming(ygf.getXingming());
    yg.setXingbie(Integer.valueOf(ygf.getXingbie()));
    try {
      yg.setShengri(df.parse(ygf.getShengri()));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    yg.setBumenId(Integer.valueOf(ygf.getBumenId()));
    yg.setZhiwu((ygf.getZhiwu() == null) ? null : ygf.getZhiwu());
    yg.setDianhua((ygf.getDianhua() == null) ? null : ygf.getDianhua());
    yg.setSfzh((ygf.getSfzh() == null) ? null : ygf.getSfzh());
    yg.setPhoto((ygf.getPhoto() == null) ? null : ygf.getPhoto());
    yg.setEmail((ygf.getYgemail() == null) ? null : ygf.getYgemail());
    yg.setJtdz((ygf.getJtdz() == null) ? null : ygf.getJtdz());
    yg.setJianjie((ygf.getJianjie() == null) ? null : ygf.getJianjie());
    yg.setCategory(Integer.valueOf(ygf.getCategory()));
    yg.setTitle(ygf.getTitle());
    yg.setXueli(ygf.getXueli());
    this.dao.updateYuanGong(yg);
    if (uf.getUid() != null) {
      User user = this.dao.obtainUserByGonghao(yg.getGonghao());
      user.setUid(uf.getUid());
      user.setEmail(uf.getEmail());
      user.setJiaose(Integer.valueOf(Integer.parseInt(uf.getJiaose())));
      this.userDao.updateUserByGonghao(user);
    } 
  }
  
  public YuanGong findYuanGongById(Serializable id) {
    return this.dao.findYuanGongById(id);
  }
  
  public YuanGong obtainYuanGongByGonghao(String gonghao) {
    return this.dao.obtainYuanGongByGonghao(gonghao);
  }
  
  public List getDoctorByBumenAndQuanxian(int bumenid, String quanxian) {
    return this.dao.getDoctorByBumenAndQuanxian(bumenid, quanxian);
  }
  
  public List advsearchYuanGong(YuanGong o) {
    return this.dao.advsearchYuanGong(o);
  }
  
  public String delYuanGong(List<Long> paramList) {
    this.dao.delYuanGong(paramList);
    return "success";
  }
  
  public List<YuanGong> findYuanGongsByYuanGong(YuanGong yuangong) {
    return this.dao.findYuanGongsByYuanGong(yuangong);
  }
  
  public List<Map<String, Object>> getYuanGongList(YuanGongSearchForm ygf) {
    List<Map<String, Object>> list = this.dao.getYuanGongInfo(ygf);
    for (Map<String, Object> map : list) {
      YuanGong y = new YuanGong();
      if (Integer.valueOf(map.get("xingbie").toString()) != null && 
        Integer.valueOf(map.get("xingbie").toString()).intValue() == 1) {
        map.put("xingbie", "???");
        continue;
      } 
      map.put("xingbie", "???");
    } 
    return list;
  }
  
  public void addYuanGong(UserForm uf, YgForm yf) {
    YuanGong y = new YuanGong();
    BeanCopyUtils.copyProperties(yf, y);
    y.setGonghao(yf.getYggonghao());
    y.setPhoto(yf.getPhoto());
    y.setEmail(yf.getYgemail());
    this.dao.saveYuanGong(y);
    if (uf.getUid() != null) {
      User u = new User();
      BeanCopyUtils.copyProperties(uf, u);
      u.setGonghao(yf.getYggonghao());
      u.setJishu(Integer.valueOf((u.getJishu() == null) ? 0 : u.getJishu().intValue()));
      u.setPassword((new MultiUtils()).getPasswordString(uf.getPassword()));
      u.setQiyong(true);
      this.userDao.saveUser(u);
      Manageitem manageitem = this.manageritemDao.getUserConfState(true, 
          OimsCategoryConfig.DEFAULT_UYPZ_POWER.intValue());
      if (manageitem != null) {
        String vals = manageitem.getVals();
        Yhpz yhpz = new Yhpz();
        if (vals != null && !"".equals(vals)) {
          String[] val = vals.split(",");
          yhpz.setGonghao(yf.getYggonghao());
          yhpz.setHyc(val[0].substring(val[0].indexOf(":") + 1)
              .replaceAll("\"", ""));
          yhpz.setGzt(val[1].substring(val[1].indexOf(":") + 1)
              .replaceAll("\"", ""));
          yhpz.setXslx(Integer.valueOf(Integer.parseInt(val[2].substring(val[2]
                    .indexOf(":") + 1))));
          yhpz.setXssj(true);
          yhpz.setYuyan(Integer.valueOf(Integer.parseInt(val[4].substring(val[4]
                    .indexOf(":") + 1))));
          this.yhpzDao.saveYhpz(yhpz);
        } 
      } 
    } 
  }
  
  public User obtainUserByGonghao(String gonghao) {
    User user = this.dao.obtainUserByGonghao(gonghao);
    return user;
  }
  
  public void addYuanGong(UserForm uf, YuanGongForm yf) {}
  
  public void updateYuanGong(YuanGongForm ygf, UserForm uf) {}
  
  public Serializable saveYuanGong(YgForm ygf) {
    YuanGong y = new YuanGong();
    BeanCopyUtils.copyProperties(ygf, y);
    y.setGonghao(ygf.getYggonghao());
    y.setEmail(ygf.getYgemail());
    return this.dao.saveYuanGong(y);
  }
  
  public void updateYg(YuanGong yuangong) {
    this.dao.updateYuanGong(yuangong);
  }
  
  public List obtainJzjlByGonghao(String gonghao) {
    return this.dao.findJzjlByGongHao(gonghao);
  }
  
  public List obtainSrMbByGonghao(String gonghao) {
    return this.dao.findSrMbByGongHao(gonghao);
  }
  
  public List obtainBaoGaoByGonghao(YuanGong yg) {
    return this.dao.findBaoGaoByGongHao(yg);
  }
  
  public List<YuanGong> findYuanGongsByBuMenId(Integer buMenId) {
    return this.dao.findYuanGongsByBuMenId(buMenId);
  }
  
  public String getDoctorByHuanZheId(Long huanzheId) {
    return this.dao.getDoctorByHuanZheId(huanzheId);
  }
  
  public void setYuangGongLizhi(Integer id, boolean lizhi) {
    YuanGong yg = this.dao.getYuanGong(id);
    yg.setLeaveOffice(lizhi);
    if (lizhi) {
      yg.setLeaveOfficeDate(new Date());
      this.dictDao.deleteMember(yg.getGonghao());
    } 
    this.dao.updateYuanGong(yg);
  }
  
  public Object saveOrUpdateYgjl(YuangGongDangAnForm form, User user) {
    String gonghao = (form.getGonghao() == null || form.getGonghao().equals("")) ? user.getGonghao() : form.getGonghao();
    YuanGong yuangGong = this.dao.findYuanGongByGongHao(gonghao);
    String type = form.getType();
    Object obj = null;
    String str1;
    switch ((str1 = type).hashCode()) {
      case -748290733:
        if (!str1.equals("xuewei"))
          break; 
        System.out.println("xuewei in...");
        yuangGong.setXw_level_name(form.getXw_level_name());
        yuangGong.setXw_level_Time(form.getXw_level_Time());
        yuangGong.setXw_name(form.getXw_name());
        yuangGong.setXw_ziGe_name(form.getXw_ziGe_name());
        yuangGong.setXw_ziGe_time(form.getXw_ziGe_time());
        yuangGong.setXuewei_filePath(form.getFilePath());
        this.dao.getHibernateTemplate().update(yuangGong);
        return yuangGong;
      case -227805078:
        if (!str1.equals("yuangong"))
          break; 
        System.out.println("yuangong in...");
        yuangGong.setEmail(form.getYuangong_email());
        yuangGong.setDianhua(form.getYuanggong_phone());
        yuangGong.setSfzh(form.getYuangong_shenfenzheng());
        yuangGong.setDiqu(form.getYuangong_address());
        yuangGong.setXingming(form.getYuangong_name());
        yuangGong.setXingbie(Integer.valueOf(Integer.parseInt(form.getYuangong_sex())));
        yuangGong.setShengri(form.getYuangong_birthday());
        yuangGong.setTitle(form.getYuangong_title());
        yuangGong.setYuangong_hy_i(Integer.valueOf(Integer.parseInt(form.getYuangong_hy())));
        yuangGong.setYuangong_jg(form.getYuangong_jg());
        yuangGong.setYuangong_mz(form.getYuangong_mz());
        yuangGong.setYuangong_zzmm_i(Integer.valueOf(Integer.parseInt(form.getYuangong_zzmm())));
        yuangGong.setYuangong_sg(form.getYuangong_sg());
        yuangGong.setZhicheng_filePath(form.getZhicheng_filePath());
        yuangGong.setSfzh_filePath(form.getSfzh_filePath());
        this.dao.getHibernateTemplate().update(yuangGong);
        return yuangGong;
      case 3051686:
        if (!str1.equals("cgjl"))
          break; 
        System.out.println("cgjl in...");
        if (form.getId() == null) {
          obj = new Yuangong_cgjl();
        } else {
          obj = this.dao.getHibernateTemplate().get(Yuangong_cgjl.class, form.getId());
        } 
        BeanUtils.copyProperties(form, obj);
        this.dao.getHibernateTemplate().saveOrUpdate(obj);
        return obj;
      case 3069023:
        if (!str1.equals("cykt"))
          break; 
        System.out.println("cykt in...");
        if (form.getId() == null) {
          obj = new Yuangong_cykt();
        } else {
          obj = this.dao.getHibernateTemplate().get(Yuangong_cykt.class, form.getId());
        } 
        BeanUtils.copyProperties(form, obj);
        this.dao.getHibernateTemplate().saveOrUpdate(obj);
        return obj;
      case 3099209:
        if (!str1.equals("dyxl"))
          break; 
        System.out.println("dyxl in...");
        yuangGong.setDyxl_job(form.getDyxl_job());
        yuangGong.setDyxl_name(form.getDyxl_name());
        yuangGong.setDyxl_school(form.getDyxl_school());
        yuangGong.setDyxl_filePath(form.getFilePath());
        this.dao.getHibernateTemplate().update(yuangGong);
        return yuangGong;
      case 3136327:
        if (!str1.equals("fblw"))
          break; 
        System.out.println("fblw in...");
        if (form.getId() == null) {
          obj = new Yuangong_fblw();
        } else {
          obj = this.dao.getHibernateTemplate().get(Yuangong_fblw.class, form.getId());
        } 
        BeanUtils.copyProperties(form, obj);
        this.dao.getHibernateTemplate().saveOrUpdate(obj);
        return obj;
      case 3189109:
        if (!str1.equals("gzjl"))
          break; 
        System.out.println("gzjl in...");
        if (form.getId() == null) {
          obj = new Yuangong_gzjl();
        } else {
          obj = this.dao.getHibernateTemplate().get(Yuangong_gzjl.class, form.getId());
        } 
        BeanUtils.copyProperties(form, obj);
        this.dao.getHibernateTemplate().saveOrUpdate(obj);
        return obj;
      case 3198254:
        if (!str1.equals("hdzl"))
          break; 
        System.out.println("hdzl in...");
        if (form.getId() == null) {
          obj = new Yuangong_hdzl();
        } else {
          obj = this.dao.getHibernateTemplate().get(Yuangong_hdzl.class, form.getId());
        } 
        BeanUtils.copyProperties(form, obj);
        this.dao.getHibernateTemplate().saveOrUpdate(obj);
        return obj;
      case 3272512:
        if (!str1.equals("jtcy"))
          break; 
        System.out.println("jtcy in...");
        if (form.getId() == null) {
          obj = new Yuangong_jtcy();
        } else {
          obj = this.dao.getHibernateTemplate().get(Yuangong_jtcy.class, form.getId());
        } 
        BeanUtils.copyProperties(form, obj);
        this.dao.getHibernateTemplate().saveOrUpdate(obj);
        return obj;
      case 3277719:
        if (!str1.equals("jypx"))
          break; 
        System.out.println("jypx in...");
        if (form.getId() == null) {
          obj = new Yuangong_jypx();
        } else {
          obj = this.dao.getHibernateTemplate().get(Yuangong_jypx.class, form.getId());
        } 
        BeanUtils.copyProperties(form, obj);
        this.dao.getHibernateTemplate().saveOrUpdate(obj);
        return obj;
      case 3481514:
        if (!str1.equals("qtry"))
          break; 
        System.out.println("qtry in...");
        if (form.getId() == null) {
          obj = new Yuangong_qtry();
        } else {
          obj = this.dao.getHibernateTemplate().get(Yuangong_qtry.class, form.getId());
        } 
        BeanUtils.copyProperties(form, obj);
        this.dao.getHibernateTemplate().saveOrUpdate(obj);
        return obj;
      case 3692746:
        if (!str1.equals("xwlw"))
          break; 
        System.out.println("xwlw in...");
        if (form.getId() == null) {
          obj = new Yuangong_xwlw();
        } else {
          obj = this.dao.getHibernateTemplate().get(Yuangong_xwlw.class, form.getId());
        } 
        BeanUtils.copyProperties(form, obj);
        this.dao.getHibernateTemplate().saveOrUpdate(obj);
        return obj;
      case 3737313:
        if (!str1.equals("zgxl"))
          break; 
        System.out.println("zgxl in...");
        yuangGong.setZgxl_job(form.getZgxl_job());
        yuangGong.setZgxl_name(form.getZgxl_name());
        yuangGong.setZgxl_school(form.getZgxl_school());
        yuangGong.setZgxl_filePath(form.getFilePath());
        yuangGong.setXueli(form.getZgxl_name());
        this.dao.getHibernateTemplate().update(yuangGong);
        return yuangGong;
      case 3752439:
        if (!str1.equals("zwpj"))
          break; 
        System.out.println("zwpj in...");
        obj = yuangGong;
        yuangGong.setZwpj(form.getZwpj());
        this.dao.getHibernateTemplate().update(yuangGong);
        return yuangGong;
    } 
    return null;
  }
  
  public List<Yuangong_gzjl> findYuanGongJianli(String gonghao, String type) {
    return this.dao.findYuanGongJianli(gonghao, type);
  }
  
  public void deleteYgjl(Integer id, String type) {
    this.dao.deleteYgjl(id, type);
  }
  
  public Map<String, List<Object>> findAllYuanGongJianLi(String gonghao) {
    Map<String, List<Object>> map = new HashMap<>();
    map.put("jtcy", this.dao.find_jtcy(gonghao));
    map.put("dyxl", this.dao.find_dyxl(gonghao));
    map.put("zgxl", this.dao.find_zgxl(gonghao));
    map.put("xuewei", this.dao.find_xuewei(gonghao));
    map.put("jypx", this.dao.find_jypx(gonghao));
    map.put("gzjl", this.dao.find_gzjl(gonghao));
    map.put("cgjl", this.dao.find_cgjl(gonghao));
    map.put("cykt", this.dao.find_cykt(gonghao));
    map.put("fblw", this.dao.find_fblw(gonghao));
    map.put("xwlw", this.dao.find_xwlw(gonghao));
    map.put("hdzl", this.dao.find_hdzl(gonghao));
    map.put("qtry", this.dao.find_qtry(gonghao));
    map.put("zwpj", this.dao.find_zwpj(gonghao));
    return map;
  }
  
  public List<Map<String, Object>> findAllZiLiaoByCondition(YuangongJianliForm form, Page page) {
    return this.dao.findKeYanZiLiaoByCondition(form, page);
  }
  
  public List findExportDataByCondition(String ids, YuangongJianliForm form, String type) {
    if (Utils.strIsEmpty(ids)) {
      Page page = new Page();
      page.setCurrentPage(Integer.valueOf(1));
      page.setPageSize(Integer.valueOf(2147483647));
      return this.dao.findExportKeYanZiLiaoByCondition(form, page);
    } 
    YuangongJianliForm form2 = new YuangongJianliForm();
    form2.setType(type);
    return this.dao.findKeYanZiLiaoByIDS(ids.substring(0, ids.lastIndexOf(",")), form2);
  }
  
  public Map<String, Object> findDownLoad_jianLi(String gonghao, User user) {
    Map<String, Object> data = new HashMap<>(10);
    data.put("gonghao", gonghao);
    YuanGong yg = this.dao.findYuanGongByGongHao(gonghao);
    Object ftlYg = FtlTool.copyField(yg, new FtlYuanGong());
    if (yg.getXingbie() != null)
      if (yg.getXingbie().intValue() == 0) {
        ((FtlYuanGong)ftlYg).setXingbie("???");
      } else {
        ((FtlYuanGong)ftlYg).setXingbie("???");
      }  
    if (yg.getPhoto() != null && !yg.getPhoto().equals(""))
      ((FtlYuanGong)ftlYg).setPhotoStr(FtlImageUtile.yuanGongPhote2Str(yg.getPhoto().replace("\\", "/"))); 
    data.put("yg", ftlYg);
    List ftlData = null;
    ftlData = FtlTool.copyField4List(this.dao.find_jtcy(gonghao), FtlJtcy.class);
    data.put("lstJtcy", ftlData);
    ftlData = FtlTool.copyField4List(this.dao.find_jypx(gonghao), FtlJypx.class);
    data.put("lstJypx", ftlData);
    ftlData = FtlTool.copyField4List(this.dao.find_gzjl(gonghao), FtlGzjl.class);
    data.put("lstGzjl", ftlData);
    ftlData = FtlTool.copyField4List(this.dao.find_cgjl(gonghao), FtlCgjl.class);
    data.put("lstCgjl", ftlData);
    ftlData = FtlTool.copyField4List(this.dao.find_cykt(gonghao), FtlCykt.class);
    data.put("lstCykt", ftlData);
    ftlData = FtlTool.copyField4List(this.dao.find_fblw(gonghao), FtlFblw.class);
    data.put("lstFblw", ftlData);
    ftlData = FtlTool.copyField4List(this.dao.find_xwlw(gonghao), FtlXwlw.class);
    data.put("lstXwlw", ftlData);
    ftlData = FtlTool.copyField4List(this.dao.find_hdzl(gonghao), FtlHdzl.class);
    data.put("lstHdzl", ftlData);
    ftlData = FtlTool.copyField4List(this.dao.find_qtry(gonghao), FtlQtry.class);
    data.put("lstQtry", ftlData);
    return data;
  }
  
  public List<Map<String, Object>> model_lw_find_fblw(String categoryId, String keyword, Page page) {
    return this.dao.model_lw_find_fblw(categoryId, keyword, page);
  }
  
  public void model_lw_save(Fblw_Form fblw) {
    Yuangong_fblw yg_fblw = new Yuangong_fblw();
    BeanUtils.copyProperties(fblw, yg_fblw);
    this.dao.getHibernateTemplate().save(yg_fblw);
  }
  
  public void model_lw_update(Fblw_Form fblw) {
    if (fblw.getId() == null || fblw.getId().equals(""))
      throw new RuntimeException("????????????->???????????? ????????????"); 
    Yuangong_fblw yg_fblw = (Yuangong_fblw)this.dao.getHibernateTemplate().get(Yuangong_fblw.class, fblw.getId());
    BeanUtils.copyProperties(fblw, yg_fblw);
    this.dao.getHibernateTemplate().update(yg_fblw);
  }
  
  public void model_lw_del(Fblw_Form fblw) {
    if (fblw.getId() == null || fblw.getId().equals(""))
      throw new RuntimeException("????????????->????????????????????????"); 
    Yuangong_fblw yg_fblw = (Yuangong_fblw)this.dao.getHibernateTemplate().get(Yuangong_fblw.class, fblw.getId());
    this.dao.getHibernateTemplate().delete(yg_fblw);
  }
  
  public void model_lw_publish(String id) {
    if (id == null || id.equals(""))
      throw new RuntimeException("????????????->????????????????????????"); 
    Yuangong_fblw yg_fblw = (Yuangong_fblw)this.dao.getHibernateTemplate().get(Yuangong_fblw.class, Integer.valueOf(Integer.parseInt(id)));
    yg_fblw.setPublish("true");
    this.dao.getHibernateTemplate().update(yg_fblw);
  }
  
  public List<Map<String, Object>> findYuangongByIds(String s) {
    return this.dao.findYuangongByIds(s);
  }
  
  public void updateJcxmsOfYuanGong(YuanGong yg) {
    YuanGong yuangong = this.dao.findYuanGongByGongHao(yg.getGonghao());
    if (yg.getJcxmIds() != null && !"".equals(yg.getJcxmIds())) {
      yuangong.setJcxmIds(yg.getJcxmIds());
      this.dao.updateYuanGong(yuangong);
    } 
  }
}
