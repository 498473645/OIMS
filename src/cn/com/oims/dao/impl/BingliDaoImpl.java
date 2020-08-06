package cn.com.oims.dao.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.IBingliDao;
import cn.com.oims.dao.ICategoryDao;
import cn.com.oims.dao.IDiquDao;
import cn.com.oims.dao.IJiBingDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.JiBing;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.MedicalCertificate;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.web.form.BingliForm;
import cn.com.oims.web.form.HuanZheSearchExForm;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.Page;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BingliDaoImpl extends BaseDaoEx implements IBingliDao {
  @Autowired
  private ICategoryDao categoryDao;

  @Autowired
  private IDiquDao diquDao;

  @Autowired
  private IJiBingDao jiBingDao;

  @Autowired
  private IYuanGongDao yuanGongDao;

  public List<Map<String, Object>> findBy(BingliForm bl, Page p) {
    if (bl == null || p == null)
      throw new RuntimeException("病历页面查询 参数异常");
    return null;
  }

  private List<HuanZheXinXi> findHuanzhe(BingliForm bl, Page p) {
    if (bl == null || p == null)
      throw new RuntimeException("病历页面查询 参数异常");
    String hql = " from HuanZheXinXi h ";
    if (!Utils.strIsEmpty(bl.getSearch()))
      hql = String.valueOf(hql) + Utils.whereOrAnd(hql) + " (" +
              " h.xingming like '%" + bl.getSearch() + "%'" +
              " or h.binglihao like '%" + bl.getSearch() + "%' " +
              ")";
    Utils.tLog(hql, "findHuanzhe");
    return this.hibernateTemplate.find(hql);
  }

  private List<Category> findCategoryById(BingliForm bl) {
    String hql = "from Category c where ";
    hql = String.valueOf(hql) + "  c.id =" + bl.getCategory();
    Utils.tLog(hql, "findCategory");
    return this.hibernateTemplate.find(hql);
  }

  private List<Category> findCategory(BingliForm bl) {
    String hql = "from Category c";
    if (!bl.getSearch().equals(""))
      hql = String.valueOf(hql) + " where (c.category like '%" + bl.getSearch() + "%' or c.intr = '" + bl.getSearch() + "')";
    Utils.tLog(hql, "findCategory");
    return this.hibernateTemplate.find(hql);
  }

  private List<MedicalCertificate> findMedicalCertificates(List<Category> cs) {
    String in = "40000";
    for (Category c : cs)
      in = String.valueOf(in) + (in.equals("") ? c.getId() : ("," + c.getId()));
    String hql = "from MedicalCertificate m where m.id.categoryId in (" + in + ")";
    Utils.tLog(hql, "findMedicalCertificates");
    return this.hibernateTemplate.find(hql);
  }

  private List<Jiuzhen> findJiuzhens(List<MedicalCertificate> cs) {
    String in = "";
    for (MedicalCertificate m : cs)
      in = String.valueOf(in) + (in.equals("") ? m.getId().getJiuzhenId() : ("," + m.getId().getJiuzhenId()));
    String hql = " from Jiuzhen j ";
    if (!in.equals("")) {
      hql = String.valueOf(hql) + " where j.id in(" + in + ")";
    } else {
      return null;
    }
    Utils.tLog(hql, "findJiuzhens");
    return this.hibernateTemplate.find(hql);
  }

  private List<HuanZheXinXi> findHuanzhe(List<Jiuzhen> lm, Page p) {
    String in = "";
    if (lm == null)
      return null;
    for (Jiuzhen m : lm)
      in = String.valueOf(in) + (in.equals("") ? m.getHuanzheId() + "" : ("," + m.getHuanzheId()));
    String hql = "from HuanZheXinXi h ";
    if (!in.equals(""))
      hql = String.valueOf(hql) + "where h.id in(" + in + ")";
    Utils.tLog(hql, "findHuanzhe");
    return this.hibernateTemplate.find(hql);
  }

  public List<HuanZheXinXi> findByXmOrBl(BingliForm bl, Page p) {
    List<HuanZheXinXi> hzs = findHuanzhe(bl, p);
    return hzs;
  }

  public List<HuanZheXinXi> findByZd(BingliForm bl, Page p) {
    List<Category> cs = findCategory(bl);
    if (cs.size() <= 0)
      return new ArrayList<HuanZheXinXi>(0);
    List<MedicalCertificate> ms = findMedicalCertificates(cs);
    List<Jiuzhen> js = findJiuzhens(ms);
    List<HuanZheXinXi> hzs = findHuanzhe(js, p);
    return hzs;
  }

  public List<HuanZheXinXi> findByZdId(BingliForm bl, Page p) {
    List<Category> cs = findCategoryById(bl);
    if (cs.size() <= 0)
      return new ArrayList<HuanZheXinXi>(0);
    List<MedicalCertificate> ms = findMedicalCertificates(cs);
    List<Jiuzhen> js = findJiuzhens(ms);
    List<HuanZheXinXi> hzs = findHuanzhe(js, p);
    return hzs;
  }

  public List<Map<String, Object>> findJzCs(List<HuanZheXinXi> hs) {
    String in = "";
    for (HuanZheXinXi h : hs)
      in = String.valueOf(in) + (in.equals("") ? h.getId() + "" : ("," + h.getId()));
    String hql = "select new map(count(*) as cs ,j.huanzheId as huanzheId)  from Jiuzhen j ";
    if (!in.equals(""))
      hql = String.valueOf(hql) + " where j.huanzheId in(" + in + ")";
    hql = String.valueOf(hql) + " group by j.huanzheId";
    Utils.tLog(hql, "findJiuZheByXmOrBl");
    return this.hibernateTemplate.find(hql);
  }

  public String getLastCategory(Long huanzheId) {
    Jiuzhen j = getLastJiuzhe(huanzheId);
    if (j == null) {
      Utils.tLog(huanzheId.toString(), "患者无就诊");
      return null;
    }
    MedicalCertificate m = getLastMedicalCertificate(j);
    if (m == null) {
      Utils.tLog(String.valueOf(huanzheId.toString()) + "\t" + j.getId(), "患者无诊断");
      return null;
    }
    Utils.tLog(huanzheId.toString(), "患者已诊断");
    Category c = getLastCategory(m);
    return c.getCategory();
  }

  private Category getLastCategory(MedicalCertificate m) {
    Category c = (Category)this.hibernateTemplate.get(Category.class, m.getId().getCategoryId());
    return c;
  }

  private MedicalCertificate getLastMedicalCertificate(Jiuzhen j) {
    String hql = "from MedicalCertificate m where m.id.jiuzhenId = " + j.getId();
    Utils.tLog(hql, "getLastMedicalCertificate");
    List<MedicalCertificate> rt = this.hibernateTemplate.find(hql);
    if (rt.size() > 0)
      return rt.get(0);
    return null;
  }

  private Jiuzhen getLastJiuzhe(Long huanzheId) {
    String chHql = "(select max(chj.caozuoTime) from Jiuzhen chj where chj.huanzheId = " + huanzheId + ")";
    String hql = "from Jiuzhen j where j.caozuoTime = " + chHql;
    Utils.tLog(hql, "getLastJiuzhe");
    List<Jiuzhen> rt = this.hibernateTemplate.find(hql);
    if (rt.size() > 0)
      return rt.get(0);
    return null;
  }

  public List<HuanZheXinXi> findEx(List<Long> hzids, Page p) {
    if (hzids.size() <= 0)
      return new ArrayList<HuanZheXinXi>();
    DetachedCriteria dc = DetachedCriteria.forClass(HuanZheXinXi.class);
    dc.add(Restrictions.in("id", hzids));
    return this.hibernateTemplate.findByCriteria(dc);
  }

  public List<Map<String, Object>> findByCategory4Exprot(Long categoryId) {
    String map = "select new map(h.binglihao as binglihao,h.xingming as xingming ,h.xingbie as xingbie, h.shengri as shengri ,c.category as category,(select count(*) from Jiuzhen chj where chj.huanzheId=h.id ) as cs) ";
    String hql = " from Category c,HuanZheXinXi h,Jiuzhen j ,MedicalCertificate m  where c.id=:categoryId  and c.id=m.id.categoryId   and m.id.jiuzhenId = j.id  and h.id=j.huanzheId";
    hql = String.valueOf(map) + hql;
    Map<String, Object> params = new HashMap<String, Object>(0);
    params.put("categoryId", Integer.valueOf(Integer.parseInt(categoryId.toString())));
    return findList(hql, params);
  }

  public List<Map<String, Object>> findBy4Exprot(String search) {
    String map = "select new map(h.binglihao as binglihao,h.xingming as xingming ,h.xingbie as xingbie, h.shengri as shengri ,j.haoma as haoma,j.caozuoTime as caozuo_time,j.treatMethod as treat_method,j.treatResult as treat_result,j.id as id,(select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30100) as zhusu, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30102) as xianbingshi, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30103) as jiwangshi, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30104) as guominshi, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30105) as jiazushi, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30301) as r_yw, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30302) as l_yw, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30303) as r_yqyd, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30304) as l_yqyd, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30305) as r_yj, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30306) as l_yj, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30307) as r_lq, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30308) as l_lq, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30309) as r_jiemo, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30310) as l_jiemo, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30311) as r_gm, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30312) as l_gm, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30313) as r_jiaomo, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30314) as l_jiaomo, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30315) as r_qf, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30316) as l_qf, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30317) as r_hm, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30318) as l_hm, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30319) as r_tk, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30320) as l_tk, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30321) as r_jt, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30322) as l_jt, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30323) as r_blt, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30324) as l_blt, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30325) as r_yd, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30326) as l_yd, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30327) as r_yk, (select jilu from Jzjl jzjl where jzjl.jiuzhenId=j.id and jzjl.categoryId=30328) as l_yk, (select xingming from YuanGong where gonghao=j.fzys) as doctor,(select wm_concat(d.disease) from JiBing d,JzZhenduan jzzd  where jzzd.jiuzhen_id=j.id and d.id=jzzd.zdfl_id) as disease)";
    String hql = " from HuanZheXinXi h,Jiuzhen j  where (h.binglihao in " +
            search + ")" +
            " and h.id=j.huanzheId";
    return this.hibernateTemplate.find(String.valueOf(map) + hql);
  }

  public List<Map<String, Object>> findHuanZheBySearchForm(HuanZheSearchForm hzf) {
    String map = "select new map(h.binglihao as binglihao,h.xingming as xingming ,h.xingbie as xingbie, h.shengri as shengri ,c.category as category,(select count(*) from Jiuzhen chj where chj.huanzheId=h.id ) as cs) ";
    String hql = " from Category c,HuanZheXinXi h,Jiuzhen j ,MedicalCertificate m ,Category ly where c.id=m.id.categoryId   and m.id.jiuzhenId = j.id  and h.id=j.huanzheId ";
    Map<String, Object> params = new HashMap<String, Object>(0);
    if (Utils.strIsNotEmpty(hzf.getXingming())) {
      hql = String.valueOf(hql) + " and h.xingming like:xingming";
      params.put("xingming", "%" + hzf.getXingming() + "%");
      Utils.tLog(params.get("xingming").toString(), "xingming");
    }
    if (Utils.strIsNotEmpty(hzf.getXingbie()))
      hql = String.valueOf(hql) + " and h.xingbie in (" + hzf.getXingbie() + ")";
    if (Utils.strIsNotEmpty(hzf.getDiqu())) {
      hql = String.valueOf(hql) + " and h.diqu like:diqu ";
      params.put("diqu", "%" + hzf.getDiqu() + "%");
    }
    if (Utils.strIsNotEmpty(hzf.getZcrqStart())) {
      hql = String.valueOf(hql) + " and h.zcrq <:zcrqStart ";
      params.put("zcrqStart", Utils.strToDateDay(hzf.getZcrqEnd()));
    }
    if (Utils.strIsNotEmpty(hzf.getZcrqEnd())) {
      hql = String.valueOf(hql) + " and h.zcrq >:zcrqEnd ";
      params.put("zcrqEnd", Utils.strToDateDay(hzf.getZcrqEnd()));
    }
    if (Utils.strIsNotEmpty(hzf.getShouji())) {
      hql = String.valueOf(hql) + "and h.shouji like:shouji";
      params.put("shouji", "%" + hzf.getShouji() + "%");
    }
    if (Utils.strIsNotEmpty(hzf.getYibao()))
      hql = String.valueOf(hql) + " and h.Yibao in(" + hzf.getYibao() + ")";
    if (Utils.strIsNotEmpty(hzf.getDianhua())) {
      hql = String.valueOf(hql) + " and h.dianhua like:dianhua";
      params.put("dianhua", "%" + hzf.getDianhua() + "%");
    }
    if (Utils.ObjIsNotNull(hzf.getShengriStart())) {
      hql = String.valueOf(hql) + " and h.shengri<:shengriStart ";
      params.put("shengriStart", Utils.ageToBirthday(hzf.getShengriStart().intValue()));
      Utils.tLog(Utils.dateToStrLong((Date)params.get("shengriStart")), "shengriStart");
    }
    if (Utils.ObjIsNotNull(hzf.getShengriEnd())) {
      hql = String.valueOf(hql) + " and h.shengri >:shengriEnd";
      params.put("shengriEnd", Utils.ageToBirthday(hzf.getShengriEnd().intValue()));
      Utils.tLog(Utils.dateToStrLong((Date)params.get("shengriEnd")), "shengriEnd");
    }
    if (Utils.strIsNotEmpty(hzf.getDwdh())) {
      hql = String.valueOf(hql) + " and h.dwdh like:dwdh";
      params.put("dwdh", "%" + hzf.getDiqu() + "%");
    }
    if (Utils.strIsNotEmpty(hzf.getHzlxr())) {
      hql = String.valueOf(hql) + " and h.hzlxr like:hzlxr";
      params.put("hzlxr", "%" + hzf.getHzlxr() + "%");
    }
    if (Utils.strIsNotEmpty(hzf.getHzlxrdh())) {
      hql = String.valueOf(hql) + " and h.hzlxrdh like:hzlxrdh";
      params.put("hzlxrdh", "%" + hzf.getHzlxrdh() + "%");
    }
    if (Utils.strIsNotEmpty(hzf.getSfzh())) {
      hql = String.valueOf(hql) + " and h.sfzh like:sfzh";
      params.put("sfzh", "%" + hzf.getSfzh() + "%");
    }
    if (Utils.strIsNotEmpty(hzf.getLaiyuan()))
      hql = String.valueOf(hql) + " and h.laiyuan in (" + hzf.getLaiyuan() + ")";
    if (Utils.strIsNotEmpty(hzf.getJtdz())) {
      hql = String.valueOf(hql) + " and h.jtdz like:jtdz";
      params.put("jtdz", "%" + hzf.getJtdz() + "%");
    }
    if (Utils.strIsNotEmpty(hzf.getBingZhongId())) {
      hql = String.valueOf(hql) + " and c.id =:bingzhongid ";
      params.put("bingzhongid", Integer.valueOf(hzf.getBingZhongId()));
    }
    if (Utils.strIsNotEmpty(hzf.getBingLiKey()))
      hql = String.valueOf(hql) + " and h.id in (" + findHuanzheByBljl(hzf.getBingLiKey()) + ")";
    hql = String.valueOf(hql) + " group by h.binglihao,h.xingming";
    hql = String.valueOf(map) + hql;
    Utils.tLog(hql, "findHuanZheBySearchForm");
    return findList(hql, params);
  }

  private String findHuanzheByBljl(String jl) {
    String hql = "select h.id from HuanZheXinXi h ,Jiuzhen j ,Jzjl jl where h.id=j.huanzheId and j.id=jl.jiuzhenId";
    if (Utils.strIsNotEmpty(jl))
      hql = String.valueOf(hql) + " and jl.jilu  like '%" + jl + "%'";
    List<Long> rt = this.hibernateTemplate.find(hql);
    String rts = "";
    for (Long o : rt)
      rts = String.valueOf(rts) + (rts.equals("") ? o.toString() : ("," + o.toString()));
    return rts.equals("") ? "null-null-null" : rts;
  }

  private String huanzhexingxiWhere(HuanZheSearchExForm f) {
    String where = "";
    if (Utils.strIsNotEmpty(f.getBinglihao()))
      where = String.valueOf(where) + "  and h.binglihao ='" + f.getBinglihao() + "' ";
    if (Utils.strIsNotEmpty(f.getXingbie()))
      where = String.valueOf(where) + " and h.xingbie in (" + f.getXingbie() + ") ";
    if (Utils.strIsNotEmpty(f.getXingming()))
      where = String.valueOf(where) + " and h.xingming like '%" + f.getXingming() + "%' ";
    if (Utils.strIsNotEmpty(f.getSfzh()))
      where = String.valueOf(where) + " and h.sfzh='" + f.getSfzh() + "' ";
    if (Utils.strIsNotEmpty(f.getYibao()))
      where = String.valueOf(where) + " and h.yibao in (" + f.getYibao() + ") ";
    if (Utils.strIsNotEmpty(f.getYibaohao()))
      where = String.valueOf(where) + " and h.yibaohao='" + f.getYibaohao() + "' ";
    if (Utils.strIsNotEmpty(f.getShouji()))
      where = String.valueOf(where) + " and h.shouji='" + f.getShouji() + "'  ";
    if (Utils.strIsNotEmpty(f.getBingLiKey()))
      where = String.valueOf(where) + " and jzjl.jilu like '%" + f.getBingLiKey() + "%' ";
    if (Utils.strIsNotEmpty(f.getBingZhongId()))
      where = String.valueOf(where) + " and jzjl.categoryId in (" + f.getBingZhongId() + ") ";
    if (Utils.strIsNotEmpty(f.getJbbm()))
      where = String.valueOf(where) + " and c.id in (" + f.getJbbm() + ") ";
    if (Utils.strIsNotEmpty(f.getZcrqStart()))
      where = String.valueOf(where) + " and h.zcrq >:s ";
    if (Utils.strIsNotEmpty(f.getZcrqEnd()))
      where = String.valueOf(where) + " and h.zcrq <:e ";
    if (Utils.ObjIsNotNull(f.getShengriStart())) {
      Date d = Utils.ageToBirthday(f.getShengriStart().intValue());
      where = String.valueOf(where) + " and h.shengri >:ss";
    }
    if (Utils.ObjIsNotNull(f.getShengriEnd())) {
      Date d = Utils.ageToBirthday(f.getShengriEnd().intValue());
      where = String.valueOf(where) + " and h.shengri <:se ";
    }
    return where;
  }

  private Map<String, Object> huanzhexinxiWhereParam(HuanZheSearchExForm f) {
    Map<String, Object> param = new HashMap<String, Object>(0);
    if (Utils.strIsNotEmpty(f.getZcrqStart()))
      param.put("s", Utils.strToDateTime(String.valueOf(f.getZcrqStart()) + " 00:00:00"));
    if (Utils.strIsNotEmpty(f.getZcrqEnd()))
      param.put("e", Utils.strToDateTime(String.valueOf(f.getZcrqStart()) + " 23:59:59"));
    if (Utils.ObjIsNotNull(f.getShengriStart())) {
      Date d = Utils.ageToBirthday(f.getShengriStart().intValue());
      param.put("ss", d);
    }
    if (Utils.ObjIsNotNull(f.getShengriEnd())) {
      Date d = Utils.ageToBirthday(f.getShengriEnd().intValue());
      param.put("se", d);
    }
    return param;
  }

  public List<Map<String, Object>> getHuanZheXinXiListByPage(Page p, HuanZheSearchExForm f) {
    String hql = "select new map(h.id as id) from HuanZheXinXi h ,Jzjl jzjl,Category c,Jiuzhen j where h.id=j.huanzheId and jzjl.jiuzhenId=j.id and c.id=jzjl.categoryId";
    String count = "select new map(count(*) as count,h.id) from HuanZheXinXi h ,Jzjl jzjl,Category c,Jiuzhen j where h.id=j.huanzheId and jzjl.jiuzhenId=j.id and c.id=jzjl.categoryId";
    hql = String.valueOf(hql) + huanzhexingxiWhere(f) + " group by h.id ";
    count = String.valueOf(count) + huanzhexingxiWhere(f) + " group by h.id ";
    Utils.tLog(hql);
    Utils.tLog(count);
    Map<String, Object> param = huanzhexinxiWhereParam(f);
    List<Map<String, Object>> ct = getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue(), param);
    p.setRowsCount((Integer)((Map)ct.get(0)).get("count"));
    if (p.getRowsCount().intValue() == 0)
      return new ArrayList<Map<String, Object>>(0);
    List<Map<String, Object>> rt = getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue(), param);
    Utils.tLog((new StringBuilder(String.valueOf(rt.size()))).toString(), String.valueOf(getClass().getName()) + "getHuanZheXinXiListByPage");
    return rt;
  }

  public List<Map<String, Object>> findBySeach(BingliForm bl, Page p) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String hql = "select new map(h.id as id ,h.shouji as shouji, h.binglihao as binglihao,h.xingming as xingming , h.xingbie as xingbie, h.shengri as shengri , y.xingming as doctor, (select count(*) from Jiuzhen chj where chj.huanzheId=h.id ) as cs )";
    String from = " from HuanZheXinXi h, Jiuzhen j, YuanGong y ";
    String findJzidSql = "";
    if (Utils.strIsNotEmpty(bl.getJcxm()) && !Utils.strIsNotEmpty(bl.getChufang())) {
      findJzidSql = "select max(jz.id) from Jiuzhen jz,JzZhenduan zd,EMROrder eo where jz.huanzheId=h.id and jz.id=zd.jiuzhen_id and eo.jiuzhenId=jz.id ";
    } else if (!Utils.strIsNotEmpty(bl.getJcxm()) && Utils.strIsNotEmpty(bl.getChufang())) {
      findJzidSql = "select max(jz.id) from Jiuzhen jz,JzZhenduan zd,EMRChufang ecf,EMRChufangQindan ecqd where jz.huanzheId=h.id and jz.id=zd.jiuzhen_id and ecf.jiuzhenId=jz.id and ecqd.chufangId=ecf.id";
    } else if (Utils.strIsNotEmpty(bl.getJcxm()) && Utils.strIsNotEmpty(bl.getChufang())) {
      findJzidSql = "select max(jz.id) from Jiuzhen jz,JzZhenduan zd,EMROrder eo,EMRChufang ecf,EMRChufangQindan ecqd where jz.huanzheId=h.id and jz.id=zd.jiuzhen_id and eo.jiuzhenId=jz.id and ecf.jiuzhenId=jz.id and ecqd.chufangId=ecf.id";
    } else {
      findJzidSql = "select max(jz.id) from Jiuzhen jz,JzZhenduan zd where jz.huanzheId=h.id and jz.id=zd.jiuzhen_id";
    }
    Map<String, Object> map = new HashMap<String, Object>();
    StringBuffer where = new StringBuffer(" where h.id=j.huanzheId and y.gonghao=j.fzys");
    if (Utils.strIsNotEmpty(bl.getBingLiKey())) {
      findJzidSql = String.valueOf(findJzidSql) + " and (select count(*) from Jzjl jl where jl.jiuzhenId=jz.id and jl.jilu like :bingliKey)>0";
      map.put("bingliKey", "%" + bl.getBingLiKey() + "%");
    }
    if (Utils.strIsNotEmpty(bl.getJbbm())) {
      findJzidSql = String.valueOf(findJzidSql) + " and (select count(*) from JiBing where icd_code=:bzId and id=zd.zdfl_id)>0";
      map.put("bzId", bl.getJbbm());
    }
    if (Utils.strIsNotEmpty(bl.getZcrqEnd()))
      try {
        Date zcrqEnd = sdf.parse(String.valueOf(bl.getZcrqEnd()) + " 23:59:59");
        findJzidSql = String.valueOf(findJzidSql) + " and jz.caozuoTime <=:zcrqEnd";
        map.put("zcrqEnd", zcrqEnd);
      } catch (ParseException parseException) {}
    if (Utils.strIsNotEmpty(bl.getZcrqStart()))
      try {
        Date zcrqStart = sdf.parse(String.valueOf(bl.getZcrqStart()) + " 00:00:00");
        findJzidSql = String.valueOf(findJzidSql) + " and jz.caozuoTime >=:zcrqStart";
        map.put("zcrqStart", zcrqStart);
      } catch (ParseException e) {
        e.printStackTrace();
      }
    if (Utils.strIsNotEmpty(bl.getFzys())) {
      where.append(" and (j.fzys =:fzys or y.xingming=:fzys)");
      map.put("fzys", bl.getFzys());
    }
    if (Utils.strIsNotEmpty(bl.getZhenduan())) {
      String[] ds = bl.getZhenduan().split("\\+");
      if (bl.getZhenduan().indexOf("+") != -1 && ds.length > 1) {
        where.append(" and (select count(*) from JzZhenduan z0_ where z0_.jiuzhen_id=j.id)>=" + ds.length);
        for (int i = 0; i < ds.length; i++) {
          where.append(" and (select count(*) from JzZhenduan zd_, JiBing jb_ where jb_.id=zd_.zdfl_id and zd_.jiuzhen_id=j.id and jb_.disease like :zhenduan" + i + ")>0 ");
          map.put("zhenduan" + i, "%" + ds[i] + "%");
        }
      } else {
        findJzidSql = String.valueOf(findJzidSql) + " and (select count(*) from JiBing where id=zd.zdfl_id and (";
        ds = bl.getZhenduan().split("\\/");
        for (int i = 0; i < ds.length; i++) {
          if (i > 0)
            findJzidSql = String.valueOf(findJzidSql) + " or ";
          findJzidSql = String.valueOf(findJzidSql) + " disease like :zhenduan" + i;
          map.put("zhenduan" + i, "%" + ds[i] + "%");
        }
        findJzidSql = String.valueOf(findJzidSql) + "))>0";
      }
    }
    if (Utils.strIsNotEmpty(bl.getChufang())) {
      findJzidSql = String.valueOf(findJzidSql) + " and ecqd.yaoming like :chufang";
      map.put("chufang", "%" + bl.getChufang() + "%");
    }
    if (Utils.strIsNotEmpty(bl.getJcxm())) {
      findJzidSql = String.valueOf(findJzidSql) + " and eo.itemName like :jcxm";
      map.put("jcxm", "%" + bl.getJcxm() + "%");
    }
    where.append(" and j.id=(" + findJzidSql + ")");
    if (Utils.strIsNotEmpty(bl.getDianhua())) {
      where.append(" and h.dianhua=:dianhua");
      map.put("dianhua", bl.getDianhua());
    }
    if (Utils.strIsNotEmpty(bl.getDiqu()))
      where.append(" and h.diquId in(" + this.diquDao.findChildDiquIDS(bl.getDiqu()) + ")");
    if (Utils.strIsNotEmpty(bl.getDwdh())) {
      where.append(" and h.dwdh=:dwdh");
      map.put("dwdh", bl.getDwdh());
    }
    if (Utils.strIsNotEmpty(bl.getHzlxr())) {
      where.append(" and (j.hzlxr=:hzlxr or h.hzlxr=:hzlxr)");
      map.put("hzlxr", bl.getHzlxr());
    }
    if (Utils.strIsNotEmpty(bl.getHzlxrdh())) {
      where.append(" and (j.hzlxrdh=:lxrdh or h.hzlxrdh=:lxrdh)");
      map.put("lxrdh", bl.getHzlxrdh());
    }
    if (Utils.strIsNotEmpty(bl.getJtdz())) {
      where.append(" and h.jtdz like :jtdz");
      map.put("jtdz", bl.getJtdz());
    }
    if (Utils.strIsNotEmpty(bl.getLaiyuan())) {
      where.append(" and (");
      String[] ly = bl.getLaiyuan().split(",");
      boolean x = false;
      byte b;
      int i;
      String[] arrayOfString1;
      for (i = (arrayOfString1 = ly).length, b = 0; b < i; ) {
        String s = arrayOfString1[b];
        if (!s.isEmpty())
          try {
            int laiyuan = Integer.parseInt(s);
            if (x)
              where.append(" or");
            where.append(" h.laiyuan=" + laiyuan);
            x = true;
          } catch (Exception exception) {}
        b++;
      }
      where.append(")");
    }
    if (Utils.strIsNotEmpty(bl.getSearch())) {
      where.append(" and (h.binglihao=:search or h.xingming=:search)");
      map.put("search", bl.getSearch());
    }
    if (Utils.strIsNotEmpty(bl.getSfzh())) {
      where.append(" and h.sfzh=:sfzh");
      map.put("sfzh", bl.getSfzh());
    }
    if (Utils.strIsNotEmpty(bl.getShengriEnd()))
      try {
        Date birthEnd = Utils.ageToBirthday(Integer.parseInt(bl.getShengriEnd()));
        where.append(" and h.shengri >=:birthEnd");
        map.put("birthEnd", birthEnd);
      } catch (Exception exception) {}
    if (Utils.strIsNotEmpty(bl.getShengriStart()))
      try {
        Date birthStart = Utils.ageToBirthday(Integer.parseInt(bl.getShengriStart()));
        where.append(" and h.shengri <=:birthStart");
        map.put("birthStart", birthStart);
      } catch (Exception exception) {}
    if (Utils.strIsNotEmpty(bl.getShouji())) {
      where.append(" and h.shouji=:shouji");
      map.put("shouji", bl.getShouji());
    }
    if (Utils.strIsNotEmpty(bl.getXingbie())) {
      String[] s = bl.getXingbie().split(",");
      if (s.length == 1) {
        where.append(" and h.xingbie=:sex");
        map.put("sex", Boolean.valueOf(bl.getXingbie().equals("1")));
      }
    }
    if (Utils.strIsNotEmpty(bl.getXingming())) {
      where.append(" and h.xingming like :xingming");
      map.put("xingming", "%" + bl.getXingming() + "%");
    }
    if (Utils.strIsNotEmpty(bl.getYibao())) {
      String[] s = bl.getYibao().split(",");
      if (s.length == 1) {
        where.append(" and h.yibao=:yibao");
        map.put("yibao", Boolean.valueOf("1".equals(bl.getYibao())));
      }
    }
    int rowsCount = counts("select count(*) " + from + where.toString(), map);
    p.setRowsCount(Integer.valueOf(rowsCount));
    p.init();
    return getListForPage(String.valueOf(hql) + from + where.toString(), p.getStartRow().intValue(), p.getPageSize().intValue(), map);
  }

  public List<Map<String, Object>> findBySeachOld(BingliForm bl, Page p) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String hql = "select distinct new map(h.id as id ,h.shouji as shouji, h.binglihao as binglihao,h.xingming as xingming , h.xingbie as xingbie, h.shengri as shengri ,(select xingming from YuanGong where gonghao=j.fzys) as doctor, (select count(*) from Jiuzhen chj where chj.huanzheId=h.id ) as cs )";
    String from = " from HuanZheXinXi h, Jiuzhen j where j.huanzheId=h.id and(select max(chj.id) from Jiuzhen chj where chj.huanzheId=h.id)=j.id";
    Map<String, Object> map = new HashMap<String, Object>();
    StringBuffer where = new StringBuffer();
    if (Utils.strIsNotEmpty(bl.getBingLiKey())) {
      where.append(" and (select count(*) from Jzjl jl where jl.jiuzhenId=j.id and jl.jilu like :bingliKey)>0");
      map.put("bingliKey", "%" + bl.getBingLiKey() + "%");
    }
    if (Utils.strIsNotEmpty(bl.getJbbm())) {
      where.append(" and (select count(*) from JzZhenduan zd where zd.jiuzhen_id=j.id and zd.zdfl_id=(select id from JiBing where icd_code=:bzId))>0");
      map.put("bzId", bl.getJbbm());
    }
    if (Utils.strIsNotEmpty(bl.getDianhua())) {
      where.append(" and h.dianhua=:dianhua");
      map.put("dianhua", bl.getDianhua());
    }
    if (Utils.strIsNotEmpty(bl.getDiqu()))
      where.append(" and h.diquId in(" + this.diquDao.findChildDiquIDS(bl.getDiqu()) + ")");
    if (Utils.strIsNotEmpty(bl.getDwdh())) {
      where.append(" and h.dwdh=:dwdh");
      map.put("dwdh", bl.getDwdh());
    }
    if (Utils.strIsNotEmpty(bl.getHzlxr())) {
      where.append(" and (j.hzlxr=:hzlxr or h.hzlxr=:hzlxr)");
      map.put("hzlxr", bl.getHzlxr());
    }
    if (Utils.strIsNotEmpty(bl.getHzlxrdh())) {
      where.append(" and (j.hzlxrdh=:lxrdh or h.hzlxrdh=:lxrdh)");
      map.put("lxrdh", bl.getHzlxrdh());
    }
    if (Utils.strIsNotEmpty(bl.getJtdz())) {
      where.append(" and h.jtdz like :jtdz");
      map.put("jtdz", bl.getJtdz());
    }
    if (Utils.strIsNotEmpty(bl.getLaiyuan())) {
      where.append(" and (");
      String[] ly = bl.getLaiyuan().split(",");
      boolean x = false;
      byte b;
      int i;
      String[] arrayOfString1;
      for (i = (arrayOfString1 = ly).length, b = 0; b < i; ) {
        String s = arrayOfString1[b];
        if (!s.isEmpty())
          try {
            int laiyuan = Integer.parseInt(s);
            if (x)
              where.append(" or");
            where.append(" h.laiyuan=" + laiyuan);
            x = true;
          } catch (Exception exception) {}
        b++;
      }
      where.append(")");
    }
    if (Utils.strIsNotEmpty(bl.getSearch())) {
      where.append(" and (h.binglihao=:search or h.xingming=:search ");
      String jbHql = "select id from JiBing where disease like :search";
      Map<Object, Object> m = new HashMap<Object, Object>();
      m.put("search", "%" + bl.getSearch() + "%");
      List list = findList(jbHql, m);
      if (list.size() > 0) {
        where.append(" or (select count(*) from JzZhenduan where jiuzhen_id=j.id and (");
        Iterator itr = list.iterator();
        boolean x = false;
        while (itr.hasNext()) {
          String id = itr.next().toString();
          if (x)
            where.append(" or");
          where.append(" zdfl_id='" + id + "'");
          x = true;
        }
        where.append("))>0");
      }
      where.append(")");
      map.put("search", bl.getSearch());
    }
    if (Utils.strIsNotEmpty(bl.getSfzh())) {
      where.append(" and h.sfzh=:sfzh");
      map.put("sfzh", bl.getSfzh());
    }
    if (Utils.strIsNotEmpty(bl.getShengriEnd()))
      try {
        Date birthEnd = Utils.ageToBirthday(Integer.parseInt(bl.getShengriEnd()));
        where.append(" and h.shengri >=:birthEnd");
        map.put("birthEnd", birthEnd);
      } catch (Exception exception) {}
    if (Utils.strIsNotEmpty(bl.getShengriStart()))
      try {
        Date birthStart = Utils.ageToBirthday(Integer.parseInt(bl.getShengriStart()));
        where.append(" and h.shengri <=:birthStart");
        map.put("birthStart", birthStart);
      } catch (Exception exception) {}
    if (Utils.strIsNotEmpty(bl.getShouji())) {
      where.append(" and h.shouji=:shouji");
      map.put("shouji", bl.getShouji());
    }
    if (Utils.strIsNotEmpty(bl.getXingbie())) {
      String[] s = bl.getXingbie().split(",");
      if (s.length == 1) {
        where.append(" and h.xingbie=:sex");
        map.put("sex", Boolean.valueOf(bl.getXingbie().equals("1")));
      }
    }
    if (Utils.strIsNotEmpty(bl.getXingming())) {
      where.append(" and h.xingming like :xingming");
      map.put("xingming", "%" + bl.getXingming() + "%");
    }
    if (Utils.strIsNotEmpty(bl.getYibao())) {
      String[] s = bl.getYibao().split(",");
      if (s.length == 1) {
        where.append(" and h.yibao=:yibao");
        map.put("yibao", Boolean.valueOf("1".equals(bl.getYibao())));
      }
    }
    if (Utils.strIsNotEmpty(bl.getZcrqEnd()))
      try {
        Date date = sdf.parse(String.valueOf(bl.getZcrqEnd()) + " 23:59:59");
        where.append(" and j.caozuoTime <=:zcrqEnd");
        map.put("zcrqEnd", bl.getZcrqEnd());
      } catch (ParseException parseException) {}
    if (Utils.strIsNotEmpty(bl.getZcrqStart()))
      try {
        Date date = sdf.parse(String.valueOf(bl.getZcrqStart()) + " 00:00:00");
        where.append(" and j.caozuoTime <=:zcrqStart");
        map.put("zcrqStart", bl.getZcrqStart());
      } catch (ParseException parseException) {}
    if (Utils.strIsNotEmpty(bl.getCategory())) {
      List<Integer> list = new ArrayList<Integer>();
      findChildDisease(Integer.parseInt(bl.getCategory()), list);
      if (list.size() > 0) {
        where.append(" and (select count(*) from JzZhenduan where jiuzhen_id=j.id and (");
        Iterator<Integer> itr = list.iterator();
        boolean x = false;
        while (itr.hasNext()) {
          String id = itr.next().toString();
          if (x)
            where.append(" or");
          where.append(" zdfl_id='" + id + "'");
          x = true;
        }
        where.append("))>0");
      }
    }
    if (Utils.strIsNotEmpty(bl.getFzys())) {
      YuanGong yg = new YuanGong();
      yg.setXingming(bl.getFzys());
      List<YuanGong> list_yuangong = this.yuanGongDao.findYuanGongsByYuanGong(yg);
      String s = "(";
      for (int i = 0; i < list_yuangong.size(); i++) {
        s = String.valueOf(s) + "'" + ((YuanGong)list_yuangong.get(i)).getGonghao() + "'";
        if (i != list_yuangong.size() - 1)
          s = String.valueOf(s) + ",";
      }
      s = String.valueOf(s) + ")";
      if (list_yuangong != null && list_yuangong.size() > 0) {
        where.append(" and j.fzys in" + s);
      } else {
        where.append(" and j.fzys is null");
      }
    }
    if (Utils.strIsNotEmpty(bl.getZhenduan())) {
      String jbHql = "select id from JiBing where disease like :search";
      Map<Object, Object> m = new HashMap<Object, Object>();
      m.put("search", "%" + bl.getZhenduan() + "%");
      List list = findList(jbHql, m);
      if (list.size() > 0) {
        where.append(" and (select count(*) from JzZhenduan where jiuzhen_id=j.id and (");
        Iterator itr = list.iterator();
        boolean x = false;
        while (itr.hasNext()) {
          String id = itr.next().toString();
          if (x)
            where.append(" or");
          where.append(" zdfl_id='" + id + "'");
          x = true;
        }
        where.append("))>0");
      }
      where.append(")");
    }
    int rowsCount = counts("select count(distinct h.id)" + from + where.toString(), map);
    p.setRowsCount(Integer.valueOf(rowsCount));
    p.init();
    return getListForPage(String.valueOf(hql) + from + where.toString(), p.getStartRow().intValue(), p.getPageSize().intValue(), map);
  }

  public List<Map<String, Object>> findByCategory2(BingliForm bl, Page p) {
    String fw = "select new map( h.binglihao as binglihao,h.xingming as xingming , h.xingbie as xingbie, h.shengri as shengri , h.id as id, h.shouji as shouji, (select count(*) from Jiuzhen chj where chj.huanzheId=h.id ) as cs, (select jb.disease from JiBing jb,JzZhenduan jzzd where jb.id=jzzd.zdfl_id and j.id=jzzd.jiuzhen_id and rownum=1) as disease)";
    String count = "select count(distinct  h.id) ";
    String where = " from HuanZheXinXi h,Jiuzhen j  where h.id=j.huanzheId and (select max(chj1.caozuoTime) from Jiuzhen chj1 where chj1.huanzheId=h.id)=j.caozuoTime and j.state=29";
    if (Utils.strIsNotEmpty(bl.getCategory()))
      where = String.valueOf(where) + " and j.id in(select jzzd1.jiuzhen_id from JzZhenduan jzzd1,JiBing jb1 where jzzd1.zdfl_id=jb1.id and jb1.father_id='" + bl.getCategory() + "' or jb1.id='" + bl.getCategory() + "')";
    Utils.tLog(String.valueOf(count) + where);
    Utils.tLog(String.valueOf(fw) + where);
    return findObject4Page(String.valueOf(fw) + where, String.valueOf(count) + where, p);
  }

  public List<Map<String, Object>> findBySeachEx(HuanZheSearchExForm f, Page p) {
    Map<String, Object> pm = new HashMap<String, Object>(0);
    String fw = "select new map(h.id as id,h.binglihao as binglihao,h.xingming as xingming , h.xingbie as xingbie, h.shengri as shengri ,(select count(*) from Jiuzhen chj where chj.huanzheId=h.id )  as cs, (select jb.disease from JiBing jb,JzZhenduan jzzd where jb.id=jzzd.zdfl_id and j.id=jzzd.jiuzhen_id and rownum=1) as disease)";
    String count = "select count(distinct  h.id) ";
    String where = "from HuanZheXinXi h,Jiuzhen j  where h.id=j.huanzheId and (select max(chj1.caozuoTime) from Jiuzhen chj1 where chj1.huanzheId=h.id)=j.caozuoTime and j.state=29";
    if (Utils.strIsNotEmpty(f.getBinglihao()))
      where = String.valueOf(where) + "  and h.binglihao ='" + f.getBinglihao() + "' ";
    if (Utils.strIsNotEmpty(f.getXingbie()))
      where = String.valueOf(where) + " and h.xingbie in (" + f.getXingbie() + ") ";
    if (Utils.strIsNotEmpty(f.getXingming()))
      where = String.valueOf(where) + " and h.xingming like '%" + f.getXingming() + "%' ";
    if (Utils.strIsNotEmpty(f.getSfzh()))
      where = String.valueOf(where) + " and h.sfzh='" + f.getSfzh() + "' ";
    if (Utils.strIsNotEmpty(f.getYibao()))
      where = String.valueOf(where) + " and h.yibao in (" + f.getYibao() + ") ";
    if (Utils.strIsNotEmpty(f.getYibaohao()))
      where = String.valueOf(where) + " and h.yibaohao='" + f.getYibaohao() + "' ";
    if (Utils.strIsNotEmpty(f.getDiqu()))
      where = String.valueOf(where) + " and h.diqu like '%" + f.getDiqu() + "%'";
    if (Utils.strIsNotEmpty(f.getDianhua()))
      where = String.valueOf(where) + " and h.dianhua='" + f.getDianhua() + "'";
    if (Utils.strIsNotEmpty(f.getDwdh()))
      where = String.valueOf(where) + " and h.dwdh='" + f.getDwdh() + "'";
    if (Utils.strIsNotEmpty(f.getHzlxr()))
      where = String.valueOf(where) + " and h.hzlxr like'%" + f.getHzlxr() + "%'";
    if (Utils.strIsNotEmpty(f.getHzlxrdh()))
      where = String.valueOf(where) + " and h.hzlxrdh like'%" + f.getHzlxrdh() + "%'";
    if (Utils.strIsNotEmpty(f.getLaiyuan()))
      where = String.valueOf(where) + " and h.laiyuan in(" + f.getLaiyuan() + ")";
    if (Utils.strIsNotEmpty(f.getJtdz()))
      where = String.valueOf(where) + " and h.jtdz like'%" + f.getJtdz() + "%'";
    if (Utils.strIsNotEmpty(f.getShouji()))
      where = String.valueOf(where) + " and h.shouji='" + f.getShouji() + "'  ";
    if (Utils.strIsNotEmpty(f.getBingLiKey()))
      where = String.valueOf(where) + " and h.id in(select jz2.huanzheId from Jzjl jl1,Jiuzhen jz2 where jl1.jiuzhenId=jz2.id and jl1.jilu like '%" + f.getBingLiKey() + "%') ";
    if (Utils.strIsNotEmpty(f.getJbbm()))
      where = String.valueOf(where) + " and h.id in(select jz1.huanzheId from JzZhenduan jzzd1,Jiuzhen jz1,JiBing jb1 where jzzd1.jiuzhen_id=jz1.id and jb1.id=jzzd1.zdfl_id and jb1.icd_code in('" + f.getJbbm() + "'))";
    if (Utils.strIsNotEmpty(f.getZcrqStart())) {
      where = String.valueOf(where) + " and h.zcrq >:s ";
      pm.put("s", Utils.strToDateTime(String.valueOf(f.getZcrqStart()) + " 00:00:00"));
    }
    if (Utils.strIsNotEmpty(f.getZcrqEnd())) {
      where = String.valueOf(where) + " and h.zcrq <:e ";
      pm.put("e", Utils.strToDateTime(String.valueOf(f.getZcrqEnd()) + " 23:59:59"));
    }
    if (Utils.ObjIsNotNull(f.getShengriStart())) {
      Date d = Utils.ageToBirthday(f.getShengriStart().intValue());
      where = String.valueOf(where) + " and h.shengri <:ss";
      pm.put("ss", d);
    }
    if (Utils.ObjIsNotNull(f.getShengriEnd())) {
      Date d = Utils.ageToBirthday(f.getShengriEnd().intValue());
      where = String.valueOf(where) + " and h.shengri >:se ";
      pm.put("se", d);
    }
    Utils.tLog(String.valueOf(count) + where);
    Utils.tLog(String.valueOf(fw) + where);
    if (pm.isEmpty()) {
      p.setRowsCount(Integer.valueOf(count(String.valueOf(count) + where)));
    } else {
      p.setRowsCount(Integer.valueOf(counts(String.valueOf(count) + where, pm)));
    }
    p.init();
    return getListForPage(String.valueOf(fw) + where, p.getStartRow().intValue(), p.getPageSize().intValue(), pm);
  }

  public Jiuzhen getDiagnosisPatientVisitInfo(String patientId) {
    String hql = "from Jiuzhen jz where jz.huanzheId=" + patientId + " order by jz.caozuoTime desc";
    List<Jiuzhen> list = getListForPage(hql.toString(), 0, 1);
    if (list != null && list.size() == 1)
      return list.get(0);
    return null;
  }

  public List<Map<String, Object>> findPatientZhenduan(Long patientId) {
    String hql = "select distinct new map(jb.id as jingbingId,jb.icd_code as icdCode, jb.disease as jibing) from JzZhenduan zd,Jiuzhen jz, JiBing jb where zd.jiuzhen_id=jz.id and zd.zdfl_id=jb.id and jz.huanzheId=" + patientId;
    return this.hibernateTemplate.find(hql);
  }

  public List<Jiuzhen> findPatientJiuzheByJiBingId(Long patientId, Integer jibingId) {
    String hql = "select * from Jiuzhen j where j.haunzheId=" + patientId + " and (select count(*) from JzZhenduan where jiuzhen_id=j.id and zdfl_id='" + jibingId + "')>0";
    return this.hibernateTemplate.find(hql);
  }

  public void findChildDiseaseMethod(String father_id, List<String> list) {
    list.add(father_id);
    String jbHql = "select id from JiBing where father_id ='" + father_id + "'";
    List<Integer> list1 = this.hibernateTemplate.find(jbHql);
    if (list1.size() != 0)
      for (Integer o : list1)
        findChildDiseaseMethod(o.toString(), list);
  }

  public void findChildDisease(int father_id, List<Integer> jiBingIds) {
    List<Category> list = this.categoryDao.findCategorysByFather(Integer.valueOf(father_id));
    if (list != null && list.size() > 0)
      for (Category category : list)
        findChildDisease(category.getId().intValue(), jiBingIds);
    List<JiBing> jiBingTemp = this.jiBingDao.findDiseaseByCategory(Integer.valueOf(father_id));
    for (JiBing jiBing : jiBingTemp)
      jiBingIds.add(jiBing.getId());
  }
}
