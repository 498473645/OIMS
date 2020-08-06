package cn.com.oims.dao.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.ITJDao;
import cn.com.oims.web.form.ChartHql;
import cn.com.oims.web.form.TJForm;
import cn.com.oims.web.form.TongJiForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class TJDaoImpl extends BaseDaoImpl implements ITJDao {
  @Override
  public List<Map<String, Object>> chart(TJForm f) {
    ChartHql ch = new ChartHql();
    ch = fToChartHql(ch, f, f.getGroup1());
    ch = timeHql(f, ch);
    ch.setWhere(ch.getWhere().replace("{0}", ch.getFindEx1()));
    String hqlchart = String.valueOf(ch.getSelect()) + ch.getFrom() + ch.getWhere() + ch.getGroup() + " order by value desc";
    String hqlc = "select count(*) " + ch.getFrom() + ch.getWhere();
    Map<String, Object> t = getTime(f);
    int c = 0;
    List<Map<String, Object>> rt = null;
    Utils.tLog(hqlchart, String.valueOf(getClass().getSimpleName()) + "chart(TJForm f)");
    if (hqlchart.indexOf(":s") > 0 || hqlchart.indexOf(":e") > 0) {
      rt = getListForPage(hqlchart, 0, 10, t);
      c = counts(hqlc, t);
    } else {
      rt = getListForPage(hqlchart, 0, 10);
      c = counts(hqlc);
    } 
    int i = 0;
    for (Object m : rt) {
      Map<String, Object> mm = (Map<String, Object>)m;
      i += Integer.parseInt(mm.get("value").toString());
    } 
    if (i < c) {
      Map<String, Object> m = new HashMap<String, Object>(1);
      m.put("label", "其它");
      m.put("value", Integer.valueOf(c - i));
      rt.add(m);
    } 
    return rt;
  }
  
  @Override
  public List<Map<String, Object>> chartEx(TJForm f) {
    String w = "";
    if (strIsNotNull(f.getFindEx())) {
      String[] tmp = f.getFindEx().split("<fg>");
      w = String.valueOf(tmp[0]) + "='" + tmp[1] + "'";
    } 
    ChartHql ch = new ChartHql();
    ch = fToChartHql(ch, f, f.getGroup1());
    if (!f.getGroup2().equals(""))
      ch = fToChartHql(ch, f, f.getGroup2()); 
    ch = timeHql(f, ch);
    String hqlchart = String.valueOf(ch.getSelect()) + ch.getFrom() + ch.getWhere() + (w.equals("") ? "" : (String.valueOf(Utils.whereOrAnd(ch.getWhere())) + w)) + ch.getGroup() + " order by value desc";
    String hqlc = "select count(*) " + ch.getFrom() + ch.getWhere() + (w.equals("") ? "" : (String.valueOf(Utils.whereOrAnd(ch.getWhere())) + w));
    Utils.tLog(hqlchart, String.valueOf(getClass().getSimpleName()) + "chartEx(TJForm f)");
    Map<String, Object> t = getTime(f);
    int c = 0;
    List<Map<String, Object>> rt = null;
    if (hqlchart.indexOf(":s") > 0 || hqlchart.indexOf(":e") > 0) {
      rt = getListForPage(hqlchart, 0, 10, t);
      c = counts(hqlc, t);
    } else {
      rt = getListForPage(hqlchart, 0, 10);
      c = counts(hqlc);
    } 
    int i = 0;
    for (Object m : rt) {
      Map<String, Object> mm = (Map<String, Object>)m;
      i += Integer.parseInt(mm.get("value").toString());
    } 
    if (i < c) {
      Map<String, Object> m = new HashMap<String, Object>(1);
      m.put("label", "其它");
      m.put("value", Integer.valueOf(c - i));
      rt.add(m);
    } 
    return rt;
  }
  
  @Override
  public List<Map<String, Object>> list(TJForm f, Page page) {
    String w = "";
    if (strIsNotNull(f.getFindEx())) {
      String[] tmp = f.getFindEx().split("<fg>");
      w = String.valueOf(tmp[0]) + "='" + tmp[1] + "'";
    } 
    ChartHql ch = new ChartHql();
    ch = fToListHql(ch, f);
    ch = timeHql(f, ch);
    String hqlchart = String.valueOf(ch.getSelect()) + ch.getFrom() + ch.getWhere() + (w.equals("") ? "" : (String.valueOf(Utils.whereOrAnd(ch.getWhere())) + w));
    String hqlc = "select count(*) " + ch.getFrom() + ch.getWhere() + (w.equals("") ? "" : (String.valueOf(Utils.whereOrAnd(ch.getWhere())) + w));
    Utils.tLog(hqlchart, String.valueOf(getClass().getSimpleName()) + "list(TJForm f,Page page)");
    Map<String, Object> t = getTime(f);
    int c = 0;
    List<Map<String, Object>> rt = null;
    if (hqlchart.indexOf(":s") > 0 || hqlchart.indexOf(":e") > 0) {
      c = counts(hqlc, t);
      page.setRowsCount(Integer.valueOf(c));
      page.init();
      System.out.println(hqlchart);
      rt = getListForPage(hqlchart, page.getStartRow().intValue(), page.getPageSize().intValue(), t);
    } else {
      c = counts(hqlc);
      page.setRowsCount(Integer.valueOf(c));
      page.init();
      rt = getListForPage(hqlchart, page.getStartRow().intValue(), page.getPageSize().intValue());
    } 
    return rt;
  }
  
  @Override
  public List<Map<String, Object>> pro(TJForm f) {
    String w = "";
    if (strIsNotNull(f.getFindEx())) {
      String[] tmp = f.getFindEx().split("<fg>");
      w = String.valueOf(tmp[0]) + "='" + tmp[1] + "'";
    } 
    ChartHql ch = new ChartHql();
    ch = fToProHql(ch, f);
    ch = timeHql(f, ch);
    String hqlchart = String.valueOf(ch.getSelect()) + ch.getFrom() + ch.getWhere() + (w.equals("") ? "" : (String.valueOf(Utils.whereOrAnd(ch.getWhere())) + w));
    Utils.tLog(hqlchart, String.valueOf(getClass().getSimpleName()) + "list(TJForm f,Page page)");
    Map<String, Object> t = getTime(f);
    List<Map<String, Object>> rt = null;
    if (hqlchart.indexOf(":s") > 0 || hqlchart.indexOf(":e") > 0) {
      rt = findList(hqlchart, t);
    } else {
      rt = this.hibernateTemplate.find(hqlchart);
    } 
    return rt;
  }
  
  private ChartHql fToProHql(ChartHql ch, TJForm f) {
    ch = setTjlx(f, ch);
    ch = setGroup(f, ch, f.getGroup1());
    ch = setGroup(f, ch, f.getGroup2());
    ch.setWhere(ch.getWhere().replace("{0}", ch.getFindEx1()));
    ch = setFind(f, ch);
    if (f.getTjlx().trim().equals("hz")) {
      ch.setSelect("select new map(hz.id as id,hz.xingming as xingming,hz.sfzh as sfzh,hz.shouji as shouji,hz.shengri as shengri ,hz.binglihao as binglihao,hz.diqu as diqu,hz.zcrq as zcrq ,hz.xingbie as xingbie,(select ly_.category from Category ly_ where ly_.id=hz.laiyuan) as laiyuan)");
    } else if (f.getTjlx().trim().equals("zd")) {
      ch.setSelect("select new map((select zdmc_.category from Category zdmc_ where zdmc_.id=zd.id.categoryId) as zdmc,(select zdys_.xingming from YuanGong zdys_ where zdys_.gonghao=zd.doctor) as zdys,zd.addTime as zdsj,zd.id.jiuzhenId as ghdh)");
    } else if (f.getTjlx().trim().equals("jcd")) {
      ch.setSelect("select new map(jcd.id as id,jcd.jcdh as jcdh,jcd.jcksTime as jcTime,(select hz_.xingming from HuanZheXinXi hz_ where hz_.id=jcd.huanzheId) as hzName,(select jcys_.xingming from YuanGong jcys_ where  jcys_.gonghao=jcd.jcys) as jcys,(select jcxm_.xmmc from Jcxm jcxm_ where jcxm_.id=jcd.jcxmIds) as jcxm,(select yb_.category from Category yb_ where yb_.id=jcd.yanbie) as yb,(select jczt_.category from Category jczt_ where jczt_.id=jcd.biaoshi) as jczt,jcd.kdTime as kdTime,(select jcsb.sbmc from SheBei jcsb where jcsb.id=jcd.jcsbId) as jcsb)");
    } 
    return ch;
  }
  
  private ChartHql fToListHql(ChartHql ch, TJForm f) {
    ch = setTjlx(f, ch);
    ch = setGroup(f, ch, f.getGroup1());
    ch = setGroup(f, ch, f.getGroup2());
    ch.setWhere(ch.getWhere().replace("{0}", ch.getFindEx1()));
    ch = setFind(f, ch);
    if (f.getTjlx().trim().equals("hz")) {
      ch.setSelect("select new map(hz.id as id,hz.xingming as xingming,hz.sfzh as sfzh,hz.shouji as shouji,hz.shengri as shengri ,hz.binglihao as binglihao)");
    } else if (f.getTjlx().trim().equals("zd")) {
      ch.setSelect("select new map((select zdmc_.category from Category zdmc_ where zdmc_.id=zd.id.categoryId) as zdmc,(select zdys_.xingming from YuanGong zdys_ where zdys_.gonghao=zd.doctor) as zdys,zd.addTime as zdsj,zd.id.jiuzhenId as ghdh)");
    } else if (f.getTjlx().trim().equals("jcd")) {
      ch.setSelect("select new map(jcd.id as id,jcd.jcdh as jcdh,jcd.jcksTime as jcTime,(select hz_.xingming from HuanZheXinXi hz_ where hz_.id=jcd.huanzheId) as hzName,(select jcys_.xingming from YuanGong jcys_ where  jcys_.gonghao=jcd.jcys) as jcys,(select jcxm_.xmmc from Jcxm jcxm_ where jcxm_.id=jcd.jcxmIds) as jcxm,(select jczt_.category from Category jczt_ where jcd.biaoshi=jczt_.id) as state)");
    } 
    return ch;
  }
  
  private ChartHql fToChartHql(ChartHql ch, TJForm f, String g) {
    ch = setTjlx(f, ch);
    ch = setGroup(f, ch, g);
    ch.setWhere(ch.getWhere().replace("{0}", ch.getFindEx1()));
    ch = setFind(f, ch);
    String label = "", tag = "";
    if (g.equals("")) {
      if (f.getTjlx().equals("hz")) {
        label = "'患者总数'";
        tag = "'tag'";
      } else if (f.getTjlx().equals("zd")) {
        label = "'诊断总数'";
        tag = "'tag'";
      } 
      if (f.getTjlx().equals("jcd")) {
        label = "'检查单总数'";
        tag = "'tag'";
      } 
    } else if (g.equals("hzzd")) {
      label = "hzzd.category";
      tag = "hzzd.id";
    } else if (g.equals("jcks")) {
      label = "jcks.bmmc";
      tag = "jcks.id";
    } else if (g.equals("jcxm")) {
      label = "jcxm.xmmc";
      tag = "jcxm.id";
    } else if (g.equals("zdys")) {
      label = "zdys.xingming";
      tag = "zdys.gonghao";
    } else if (g.equals("jcsb")) {
      label = "jcsb.sbmc";
      tag = "jcsb.id";
    } else if (g.equals("jcys")) {
      label = "jcys.xingming";
      tag = "jcys.gonghao";
    } else if (g.split("_")[0].equals("hz")) {
      label = g.replace("_", ".");
      tag = g.replace("_", ".");
    } else if (g.equals("yanbie")) {
      label = "yb.category";
      tag = "yb.id";
    } else if (g.equals("state")) {
      label = "jczt.category";
      tag = "jczt.id";
    } else if (g.equals("zb")) {
      label = "zb.category";
      tag = "zb.id";
    } 
    if (g.equals("hz_laiyuan")) {
      label = "(select ly.category from Category ly where hz.laiyuan =ly.id )";
      tag = "hz.laiyuan";
    } 
    String tagLabel = tag.replace("'", "");
    ch.setSelect("select new map( count(*) as value," + label + " as label," + tag + " as tag,'" + tagLabel + "' as tagLabel )");
    return ch;
  }
  
  private ChartHql setTjlx(TJForm f, ChartHql ch) {
    if ("hz".equals(f.getTjlx())) {
      if (notHasFrom(ch, "hz"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "HuanZheXinXi hz"); 
    } else if ("zd".equals(f.getTjlx()) && 
      notHasFrom(ch, "zd")) {
      ch.setFrom(String.valueOf(fromRelate(ch)) + "MedicalCertificate zd");
    } 
    if ("jcd".equals(f.getTjlx()) && 
      notHasFrom(ch, "jcd"))
      ch.setFrom(String.valueOf(fromRelate(ch)) + "Jcd jcd"); 
    return ch;
  }
  
  private ChartHql setFind(TJForm f, ChartHql ch) {
    if (strIsNotNull(f.getZbType())) {
      if (f.getTjlx().equals("hz")) {
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "hz.id=jz.huanzheId and jz.id=jcd.jiuzhenId");
        ch = hzLxJcd(f, ch);
      } else if (f.getTjlx().equals("zd")) {
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jz.id=zd.id.jiuzhenId and jz.id=jcd.jiuzhenId");
        ch = hzLxJcd(f, ch);
      } else if (f.getTjlx().equals("jcd")) {
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "hz.id=jcd.huanzheId and hz.id=jz.huanzheId and jcd.jiuzhenId = jz.id");
        if (notHasFrom(ch, "hz"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "HuanZheXinXi hz"); 
      } 
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
          "zb.id=jz.zhenbie and zb.id in (" + f.getZbType() + ")");
      if (notHasFrom(ch, "jz"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "Jiuzhen jz"); 
      if (notHasFrom(ch, "zb"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "Category zb"); 
    } 
    if (strIsNotNull(f.getHzly())) {
      if (!f.getTjlx().equals("hz"))
        if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
        } else if (f.getTjlx().equals("jcd")) {
          ch = hzLxJcd(f, ch);
        }  
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
          "hz.laiyuan=laiyuan.id and laiyuan.category in (" + StringToWhereIn(f.getHzly()) + ")");
      if (notHasFrom(ch, "laiyuan"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "Category laiyuan"); 
    } 
    if (strIsNotNull(f.getHzdq())) {
      if (!f.getTjlx().equals("hz"))
        if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
        } else if (f.getTjlx().equals("jcd")) {
          ch = hzLxJcd(f, ch);
        }  
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "hz.diqu in (" + StringToWhereIn(f.getHzdq()) + ")");
    } 
    if (strIsNotNull(f.getHzzd())) {
      if (f.getTjlx().equals("hz")) {
        if (notHasFrom(ch, "jz"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Jiuzhen jz"); 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jz.huanzheId=hz.id and jz.id=zd.id.jiuzhenId");
      } else if (f.getTjlx().equals("zd")) {
        if (notHasFrom(ch, "jz"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Jiuzhen jz"); 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jz.id=zd.id.jiuzhenId");
      } else if (f.getTjlx().equals("jcd")) {
        if (notHasFrom(ch, "jz"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Jiuzhen jz"); 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id and jz.id=zd.id.jiuzhenId");
      } 
      if (notHasFrom(ch, "zd"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "MedicalCertificate zd"); 
      if (notHasFrom(ch, "hzzd"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "Category hzzd"); 
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
          "zd.id.categoryId = hzzd.id and hzzd.category in(" + StringToWhereIn(f.getHzzd()) + ")");
    } 
    if (strIsNotNull(f.getHzjc())) {
      if (f.getTjlx().equals("hz")) {
        ch = hzLxJcd(f, ch);
      } else if (f.getTjlx().equals("zd")) {
        ch = hzLxZd(f, ch);
        ch = hzLxJcd(f, ch);
      } else {
        f.getTjlx().equals("jcd");
      } 
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
          "jcxm.id=jcd.jcxmIds and jcxm.xmmc in (" + StringToWhereIn(f.getHzjc()) + ")");
      if (notHasFrom(ch, "jcxm"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "Jcxm jcxm"); 
      if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
    } 
    if (strIsNotNull(f.getJcks())) {
      if (f.getTjlx().equals("hz")) {
        ch = hzLxJcd(f, ch);
      } else if (f.getTjlx().equals("zd")) {
        ch = hzLxZd(f, ch);
        ch = hzLxJcd(f, ch);
      } else {
        f.getTjlx().equals("jcd");
      } 
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcks.id=jcd.jcksId and jcks.id=" + f.getJcks());
      if (notHasFrom(ch, "jcks"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "BuMen jcks"); 
      if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
    } 
    if (strIsNotNull(f.getJcxm())) {
      if (f.getTjlx().equals("hz")) {
        ch = hzLxJcd(f, ch);
      } else if (f.getTjlx().equals("zd")) {
        ch = hzLxZd(f, ch);
        ch = hzLxJcd(f, ch);
      } else {
        f.getTjlx().equals("jcd");
      } 
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcxm.id=jcd.jcxmIds and jcd.jcxmIds=" + f.getJcxm());
      if (notHasFrom(ch, "jcxm"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "Jcxm jcxm"); 
      if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
    } 
    if (strIsNotNull(f.getJcsb())) {
      if (f.getTjlx().equals("hz")) {
        ch = hzLxJcd(f, ch);
      } else if (f.getTjlx().equals("zd")) {
        ch = hzLxZd(f, ch);
        ch = hzLxJcd(f, ch);
      } else {
        f.getTjlx().equals("jcd");
      } 
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
          "jcd.jcsbId=jcsb.id and jcsb.id in (" + f.getJcsb() + ")");
      if (notHasFrom(ch, "jcsb"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "SheBei jcsb"); 
      if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
    } 
    if (strIsNotNull(f.getJcys())) {
      if (f.getTjlx().equals("hz")) {
        ch = hzLxJcd(f, ch);
      } else if (f.getTjlx().equals("zd")) {
        ch = hzLxZd(f, ch);
        ch = hzLxJcd(f, ch);
      } else {
        f.getTjlx().equals("jcd");
      } 
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
          "jcd.jcys=jcys.gonghao and jcys.gonghao in (" + f.getJcys() + ")");
      if (notHasFrom(ch, "jcys"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "YuanGong jcys"); 
      if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
    } 
    if (strIsNotNull(f.getZdys())) {
      if (f.getTjlx().equals("hz")) {
        ch = hzLxZd(f, ch);
      } else if (!f.getTjlx().equals("zd") && 
        f.getTjlx().equals("jcd")) {
        ch = hzLxZd(f, ch);
        ch = hzLxJcd(f, ch);
      } 
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
          "zd.doctor=zdys.gonghao and zdys.gonghao in (" + f.getZdys() + ")");
      if (notHasFrom(ch, "zdys"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "YuanGong zdys"); 
    } 
    if (strIsNotNull(f.getFeibie())) {
      if (!f.getTjlx().equals("hz"))
        if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
        } else if (f.getTjlx().equals("jcd")) {
          ch = hzLxJcd(f, ch);
        }  
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "hz.gongfei in (" + f.getFeibie() + ")");
      if (notHasFrom(ch, "hz"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "HuanZheXinXi hz"); 
    } 
    if (strIsNotNull(f.getSex())) {
      if (!f.getTjlx().equals("hz"))
        if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
        } else if (f.getTjlx().equals("jcd")) {
          ch = hzLxJcd(f, ch);
        }  
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "hz.xingbie in (" + f.getSex() + ")");
      if (notHasFrom(ch, "hz"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "HuanZheXinXi hz"); 
    } 
    if (strIsNotNull(f.getYibao())) {
      if (!f.getTjlx().equals("hz"))
        if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
        } else if (f.getTjlx().equals("jcd")) {
          ch = hzLxJcd(f, ch);
        }  
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "hz.yibao in (" + f.getYibao() + ")");
      if (notHasFrom(ch, "hz"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "HuanZheXinXi hz"); 
    } 
    if (strIsNotNull(f.getEyeType())) {
      if (f.getTjlx().equals("hz")) {
        ch = hzLxJcd(f, ch);
      } else if (f.getTjlx().equals("zd")) {
        ch = hzLxZd(f, ch);
        ch = hzLxJcd(f, ch);
      } else {
        f.getTjlx().equals("jcd");
      } 
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "yb.id=jcd.yanbie and jcd.yanbie in (" + f.getEyeType() + ")");
      if (notHasFrom(ch, "jcd"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "Jcd jcd"); 
      if (notHasFrom(ch, "yb"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "Category yb"); 
    } 
    if (strIsNotNull(f.getJczt())) {
      if (f.getTjlx().equals("hz")) {
        ch = hzLxJcd(f, ch);
      } else if (f.getTjlx().equals("zd")) {
        ch = hzLxZd(f, ch);
        ch = hzLxJcd(f, ch);
      } else {
        f.getTjlx().equals("jcd");
      } 
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jczt.id=jcd.biaoshi and jcd.biaoshi in (" + f.getJczt() + ")");
      if (notHasFrom(ch, "jcd"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "Jcd jcd"); 
      if (notHasFrom(ch, "jczt"))
        ch.setFrom(String.valueOf(fromRelate(ch)) + "Category jczt"); 
    } 
    if (strIsNotNull(f.getFindEx())) {
      String s = f.getFindEx().substring(0, f.getFindEx().indexOf("."));
      if (s.equals("hz") && 
        !f.getTjlx().equals("hz"))
        if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
        } else if (f.getTjlx().equals("jcd")) {
          ch = hzLxJcd(f, ch);
        }  
      if (s.equals("hzzd")) {
        if (!f.getTjlx().equals("hz"))
          if (f.getTjlx().equals("zd")) {
            ch = hzLxZd(f, ch);
          } else if (f.getTjlx().equals("jcd")) {
            ch = hzLxJcd(f, ch);
          }  
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
            "zd.id.categoryId = hzzd.id");
        if (notHasFrom(ch, "hzzd"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Category hzzd"); 
      } 
      if (s.equals("jcxm")) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
          ch = hzLxJcd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcxm.id=jcd.jcxmIds");
        if (notHasFrom(ch, "jcxm"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Jcxm jcxm"); 
        if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
      } 
      if (s.equals("jcks")) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
          ch = hzLxJcd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcks.id=jcd.jcksId ");
        if (notHasFrom(ch, "jcks"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "BuMen jcks"); 
        if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
      } 
      if (s.equals("jcsb")) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
          ch = hzLxJcd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
            "jcd.jcsbId=jcsb.id");
        if (notHasFrom(ch, "jcsb"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "SheBei jcsb"); 
        if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
      } 
      if (s.equals("jcys")) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
          ch = hzLxJcd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
            "jcd.jcys=jcys.gonghao");
        if (notHasFrom(ch, "jcys"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "YuanGong jcys"); 
        if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id and"); 
      } 
      if (s.equals("zdys")) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxZd(f, ch);
        } else if (!f.getTjlx().equals("zd") && 
          f.getTjlx().equals("jcd")) {
          ch = hzLxZd(f, ch);
          ch = hzLxJcd(f, ch);
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
            "zd.doctor=zdys.gonghao");
        if (notHasFrom(ch, "zdys"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "YuanGong zdys"); 
      } 
      if (s.equals("yb")) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
          ch = hzLxJcd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
            "yb.id=jcd.yanbie");
        if (notHasFrom(ch, "jcd"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Jcd jcd"); 
        if (notHasFrom(ch, "yb"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Category yb"); 
      } 
      if (s.equals("jczt")) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
          ch = hzLxJcd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
            "jczt.id=jcd.biaoshi");
        if (notHasFrom(ch, "jcd"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Jcd jcd"); 
        if (notHasFrom(ch, "jczt"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Category jczt"); 
      } 
    } 
    return ch;
  }
  
  private ChartHql setGroup(TJForm f, ChartHql ch, String g) {
    if (!"".equals(g))
      if ("hzzd".equals(g)) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxZd(f, ch);
        } else if (f.getTjlx().equals("jcd")) {
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id and jz.id=zd.id.jiuzhenId");
          if (notHasFrom(ch, "jz"))
            ch.setFrom(String.valueOf(fromRelate(ch)) + "Jiuzhen jz"); 
          if (notHasFrom(ch, "zd"))
            ch.setFrom(String.valueOf(fromRelate(ch)) + "MedicalCertificate zd"); 
        } else {
          f.getTjlx().equals("zd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "hzzd.id=zd.id.categoryId");
        if (notHasFrom(ch, "hzzd"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Category hzzd"); 
        ch.setGroup("group by zd.id.categoryId");
      } else if ("jcks".equals(g)) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxJcd(f, ch);
          ch = hzLxZd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcks.id=jcd.jcksId");
        if (notHasFrom(ch, "jcks"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "BuMen jcks"); 
        ch.setGroup("group by jcks.id");
        if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
      } else if ("jcxm".equals(g)) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxJcd(f, ch);
          ch = hzLxZd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jcxmIds=jcxm.id");
        if (notHasFrom(ch, "jcxm"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Jcxm jcxm"); 
        if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
        ch.setGroup("group by jcxm.id");
      } else if ("zdys".equals(g)) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxZd(f, ch);
        } else if (!f.getTjlx().equals("zd")) {
          if (f.getTjlx().equals("jcd")) {
            ch = hzLxJcd(f, ch);
            ch = hzLxZd(f, ch);
          } 
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "zdys.gonghao=zd.doctor");
        if (notHasFrom(ch, "zdys"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "YuanGong zdys"); 
        ch.setGroup("group by zdys.id");
      } else if ("jcsb".equals(g)) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxZd(f, ch);
          ch = hzLxJcd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jcsbId=jcsb.id");
        if (notHasFrom(ch, "jcsb"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "SheBei jcsb"); 
        ch.setGroup("group by jcsb.id");
      } else if ("jcys".equals(g)) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxJcd(f, ch);
          ch = hzLxZd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcys.gonghao=jcd.jcys");
        if (notHasFrom(ch, "jcys"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "YuanGong jcys"); 
        ch.setGroup("group by jcys.id");
        if (ch.getFrom().indexOf(" jz ") >= 0 && ch.getFrom().indexOf(" jcd ") >= 0 && ch.getWhere().indexOf("jcd.jiuzhenId=jz.id") < 0)
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId=jz.id"); 
      } else if ("hz".equals(g.split("_")[0])) {
        if (!f.getTjlx().equals("hz"))
          if (f.getTjlx().equals("zd")) {
            ch = hzLxZd(f, ch);
          } else if (f.getTjlx().equals("jcd")) {
            ch = hzLxJcd(f, ch);
          }  
        ch.setGroup("group by " + g.replace("_", "."));
      } else if ("yanbie".equals(g)) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxJcd(f, ch);
          ch = hzLxZd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "yb.id=jcd.yanbie");
        if (notHasFrom(ch, "yb"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Category yb"); 
        ch.setGroup("group by jcd.yanbie ");
      } else if ("state".equals(g)) {
        if (f.getTjlx().equals("hz")) {
          ch = hzLxJcd(f, ch);
        } else if (f.getTjlx().equals("zd")) {
          ch = hzLxJcd(f, ch);
          ch = hzLxZd(f, ch);
        } else {
          f.getTjlx().equals("jcd");
        } 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jczt.id=jcd.biaoshi");
        if (notHasFrom(ch, "jczt"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Category jczt"); 
        ch.setGroup("group by jcd.biaoshi ");
      } else if ("zb".equals(g)) {
        if (notHasFrom(ch, "jz"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Jiuzhen jz"); 
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + 
            "zb.id=jz.zhenbie");
        if (notHasFrom(ch, "zb"))
          ch.setFrom(String.valueOf(fromRelate(ch)) + "Category zb"); 
        ch.setGroup("group by jz.zhenbie ");
        if (f.getTjlx().equals("hz")) {
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "hz.id=jz.huanzheId");
        } else if (f.getTjlx().equals("zd")) {
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jz.id=zd.id.jiuzhenId");
        } else if (f.getTjlx().equals("jcd")) {
          ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.jiuzhenId = jz.id");
        } 
      }  
    return ch;
  }
  
  private ChartHql hzLxZd(TJForm f, ChartHql ch) {
    ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "hz.id=jz.huanzheId and jz.id=zd.id.jiuzhenId");
    if (notHasFrom(ch, "jz"))
      ch.setFrom(String.valueOf(fromRelate(ch)) + "Jiuzhen jz"); 
    if (notHasFrom(ch, "zd"))
      ch.setFrom(String.valueOf(fromRelate(ch)) + "MedicalCertificate zd"); 
    if (notHasFrom(ch, "hz"))
      ch.setFrom(String.valueOf(fromRelate(ch)) + "HuanZheXinXi hz"); 
    return ch;
  }
  
  private ChartHql hzLxJcd(TJForm f, ChartHql ch) {
    ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + "jcd.huanzheId=hz.id");
    if (notHasFrom(ch, "jcd"))
      ch.setFrom(String.valueOf(fromRelate(ch)) + "Jcd jcd"); 
    if (notHasFrom(ch, "hz"))
      ch.setFrom(String.valueOf(fromRelate(ch)) + "HuanZheXinXi hz"); 
    return ch;
  }
  
  private boolean notHasFrom(ChartHql ch, String from) {
    if (ch.getFrom().indexOf(" " + from + " ") < 0)
      return true; 
    return false;
  }
  
  private ChartHql timeHql(TJForm f, ChartHql ch) {
    String time = "";
    if (f.getTjlx().equals("hz")) {
      time = "hz.zcrq";
    } else if (f.getTjlx().equals("zd")) {
      time = "zd.addTime";
    } else if (f.getTjlx().equals("jcd")) {
      time = "jcd.kdTime";
    } 
    if (f.getTimeType().equals("timeType_1")) {
      ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + time + ">:s and " + time + "<:e ");
    } else if (f.getTimeType().equals("timeType_2")) {
      if (!f.getfTime1().equals(""))
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + time + ">:s "); 
      if (!f.getfTime2().equals(""))
        ch.setWhere(String.valueOf(ch.getWhere()) + Utils.whereOrAnd(ch.getWhere()) + time + "<:e "); 
    } 
    return ch;
  }
  
  private Map<String, Object> getTime(TJForm f) {
    Map<String, Object> m = new HashMap<String, Object>(2);
    if (f.getTimeType().equals("timeType_1")) {
      Calendar c = Calendar.getInstance();
      c.set(1, Integer.parseInt(f.getfTime1()));
      c.set(2, Integer.parseInt(f.getfTime2()) - 1);
      c.set(5, c.getActualMinimum(5));
      m.put("s", c.getTime());
      c.set(5, c.getActualMaximum(5));
      m.put("e", c.getTime());
    } else if (f.getTimeType().equals("timeType_2")) {
      Calendar c = Calendar.getInstance();
      if (strIsNotNull(f.getfTime1())) {
        String[] t1 = f.getfTime1().split("-");
        c.set(1, Integer.parseInt(t1[0]));
        c.set(2, Integer.parseInt(t1[1]) - 1);
        c.set(5, Integer.parseInt(t1[2]));
        m.put("s", c.getTime());
      } 
      if (strIsNotNull(f.getfTime2())) {
        String[] t2 = f.getfTime2().split("-");
        c.set(1, Integer.parseInt(t2[0]));
        c.set(2, Integer.parseInt(t2[1]) - 1);
        c.set(5, Integer.parseInt(t2[2]));
        m.put("e", c.getTime());
      } 
    } else {
      throw new RuntimeException("时间参数异常：时间类型异常");
    } 
    return m;
  }
  
  private String StringToWhereIn(String s) {
    String ss = "";
    byte b;
    int i;
    String[] arrayOfString;
    for (i = (arrayOfString = s.split(",")).length, b = 0; b < i; ) {
      String tmp = arrayOfString[b];
      ss = String.valueOf(ss) + ((ss.length() == 0) ? ("'" + tmp + "'") : (",'" + tmp + "'"));
      b++;
    } 
    return ss;
  }
  
  private String fromRelate(ChartHql ch) {
    if (strIsNull(ch.getFrom())) {
      ch.setFrom("from");
    } else {
      ch.setFrom(String.valueOf(ch.getFrom()) + ",");
    } 
    return ch.getFrom();
  }
  
  public static boolean strIsNull(String s) {
    if (s == null || s.trim().equals(""))
      return true; 
    return false;
  }
  
  public static boolean strIsNotNull(String s) {
    return !strIsNull(s);
  }
  
  @Override
  public List<Map<String, Object>> findYuanGongByBumen(String bumenId) {
    String hql = "select new map(y.xingming as text,y.gonghao as gonghao) from YuanGong y where y.bumenId=" + bumenId;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<Map<String, Object>> findSheBieByBumen(String bumenId, String bgsId) {
    String hql = "select new map(sb.sbmc as text,sb.id as id) from SheBei sb ,BuMen bm  where sb.bmId=bm.id ";
    if (Utils.strIsNotEmpty(bgsId))
      hql = String.valueOf(hql) + Utils.whereOrAnd(hql) + " sb.bgsId in ()"; 
    if (Utils.strIsNotEmpty(bumenId))
      hql = String.valueOf(hql) + Utils.whereOrAnd(hql) + " bm.id in (" + bumenId + ")"; 
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<Map<String, Object>> groupJcdStrateByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "";
    System.out.println(form.getZb());
    if (form.getZb() == null || form.getZb().isEmpty()) {
      hql = "select (select category from Category c where c.id = j.biaoshi) as name,count(*) as y from Jcd j where 1=1";
    } else {
      hql = "select (select category from Category c where c.id = j.biaoshi) as name,count(*) as y from Jcd j,Jiuzhen jz where 1=1 and j.jiuzhenId = jz.id ";
    } 
    hql = String.valueOf(hql) + createSelectForJcd(form, map);
    hql = String.valueOf(hql) + " group by j.biaoshi";
    return findList(hql, map);
  }
  
  @Override
  public List<Map<String, Object>> groupJcdTypeByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select (select category from Category where id = jz.zhenbie) as name,count(*) as y from Jcd j,Jiuzhen jz where jz.id = j.jiuzhenId ";
    hql = String.valueOf(hql) + createSelectForJcd(form, map);
    hql = String.valueOf(hql) + " group by jz.zhenbie";
    return findList(hql, map);
  }
  
  @Override
  public List<Map<String, Object>> groupCheckDoctorByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "";
    if (form.getZb() == null || form.getZb().isEmpty()) {
      hql = " select new map((select xingming from YuanGong where gonghao = j.jcys) as name,count(*) as y) from Jcd j where j.jcys is not null ";
    } else {
      hql = " select new map((select xingming from YuanGong where gonghao = j.jcys) as name,count(*) as y) from Jcd j,Jiuzhen jz where j.jiuzhenId =jz.id  and  j.jcys is not null ";
    } 
    hql = String.valueOf(hql) + createSelectForJcd(form, map);
    hql = String.valueOf(hql) + " group by jcys";
    System.out.println(hql);
    return findList(hql, map);
  }
  
  @Override
  public List<Map<String, Object>> groupCheckJcxmByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "";
    if (form.getZb() == null || form.getZb().isEmpty()) {
      hql = "select (select xmmc from Jcxm where id = j.jcxmIds) as name,count(*) as y from Jcd j where 1=1";
    } else {
      hql = "select (select xmmc from Jcxm where id = j.jcxmIds) as name,count(*) as y from Jcd j,Jiuzhen jz where jz.id = j.jiuzhenId";
    } 
    hql = String.valueOf(hql) + createSelectForJcd(form, map);
    hql = String.valueOf(hql) + " group by j.jcxmIds";
    System.out.println(hql);
    return findList(hql, map);
  }
  
  @Override
  public List<Map<String, Object>> groupCheckDeviceByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "";
    if (form.getZb() == null || form.getZb().isEmpty()) {
      hql = "select (select sbmc from SheBei where id = j.jcsbId) as name,count(*) as y from Jcd j where j.jcys is not null and jcsbId <>0 ";
    } else {
      hql = "select (select sbmc from SheBei where id = j.jcsbId) as name,count(*) as y from Jcd j,Jiuzhen jz where jz.id = j.jiuzhenId and j.jcys is not null and jcsbId <>0 ";
    } 
    hql = String.valueOf(hql) + createSelectForJcd(form, map);
    hql = String.valueOf(hql) + " group by j.jcsbId";
    System.out.println(hql);
    return findList(hql, map);
  }
  
  private String createSelectForJcd(TongJiForm form, Map<String, Object> map) {
    String hql = " ";
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    if ("sj".equals(form.getTimeType())) {
      if ((form.getfTime1() != null && !form.getfTime1().isEmpty()) || (
        form.getfTime2() != null && !form.getfTime2().isEmpty())) {
        try {
          map.put("startTime", 
              sdf.parse(String.valueOf(form.getfTime1()) + " 00:00:00"));
          map.put("endTime", 
              sdf.parse(String.valueOf(form.getfTime2()) + " 23:59:59"));
        } catch (ParseException e) {
          e.printStackTrace();
        } 
        hql = String.valueOf(hql) + " and j.kdTime between :startTime and :endTime";
      } else if (form.getfTime1() != null && !form.getfTime1().isEmpty() && (
        form.getfTime2() == null || form.getfTime2().isEmpty())) {
        try {
          map.put("startTime", 
              sdf.parse(String.valueOf(form.getfTime1()) + " 00:00:00"));
          map.put("endTime", 
              sdf.parse(String.valueOf(form.getfTime1()) + " 23:59:59"));
        } catch (ParseException e) {
          e.printStackTrace();
        } 
        hql = String.valueOf(hql) + " and j.kdTime between :startTime and :endTime";
      } else if (form.getfTime2() != null && !form.getfTime2().isEmpty() && (
        form.getfTime1() == null || form.getfTime1().isEmpty())) {
        try {
          map.put("startTime", 
              sdf.parse(String.valueOf(form.getfTime2()) + " 00:00:00"));
          map.put("endTime", 
              sdf.parse(String.valueOf(form.getfTime2()) + " 23:59:59"));
        } catch (ParseException e) {
          e.printStackTrace();
        } 
        hql = String.valueOf(hql) + " and j.kdTime between :startTime and :endTime";
      } 
    } else {
      SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
      Calendar c = Calendar.getInstance();
      c.set(1, Integer.parseInt(form.getfTime1()));
      c.set(2, Integer.parseInt(form.getfTime2()) - 1);
      c.set(5, c.getActualMinimum(5));
      String time1 = format.format(c.getTime());
      c.set(5, c.getActualMaximum(5));
      String time2 = format.format(c.getTime());
      try {
        map.put("startTime", sdf.parse(String.valueOf(time1) + " 00:00:00"));
        map.put("endTime", sdf.parse(String.valueOf(time2) + " 23:59:59"));
        hql = String.valueOf(hql) + " and j.kdTime between :startTime and :endTime";
      } catch (ParseException e) {
        e.printStackTrace();
      } 
    } 
    if (form.getJcxms() != null && !form.getJcxms().isEmpty()) {
      String[] str = form.getJcxms().split(",");
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and j.jcxmIds =" + str[0];
      } else {
        hql = String.valueOf(hql) + " and j.jcxmIds in(" + form.getJcxms() + ")";
      } 
    } 
    if (form.getDoctors() != null && !form.getDoctors().isEmpty()) {
      String[] str = form.getDoctors().split(",");
      StringBuffer buffer = new StringBuffer();
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and j.jcys = '" + str[0] + "'";
      } else {
        for (int i = 0; i < str.length; i++) {
          if (i == 0) {
            buffer.append("'" + str[i] + "'");
          } else {
            buffer.append(",'" + str[i] + "'");
          } 
        } 
        hql = String.valueOf(hql) + " and j.jcys in(" + buffer + ")";
      } 
    } 
    if (form.getJcsb() != null && !form.getJcsb().isEmpty()) {
      String[] str = form.getJcsb().split(",");
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and j.jcsbId =" + str[0];
      } else {
        hql = String.valueOf(hql) + " and j.jcsbId in(" + form.getJcsb() + ")";
      } 
    } 
    if (form.getYb() != null && !form.getYb().isEmpty()) {
      String[] str = form.getYb().split(",");
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and j.yanbie =" + str[0];
      } else {
        hql = String.valueOf(hql) + " and j.yanbie in(" + form.getYb() + ")";
      } 
    } 
    if (form.getJcdState() != null && !form.getJcdState().isEmpty()) {
      String[] str = form.getJcdState().split(",");
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and j.biaoshi =" + str[0];
      } else {
        hql = String.valueOf(hql) + " and j.biaoshi in(" + form.getJcdState() + ")";
      } 
    } 
    if (form.getZb() != null && !form.getZb().isEmpty()) {
      String[] str = form.getZb().split(",");
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and jz.zhenbie =" + str[0];
      } else {
        hql = String.valueOf(hql) + " and jz.zhenbie in(" + form.getZb() + ")";
      } 
    } 
    return hql;
  }
  
  @Override
  public int getPersonalMzQuantity(String state, String gonghao, Date parse, Date parse2) {
    Date startTime = MultiUtils.getStartTimeOfDay(parse);
    Date endTime = MultiUtils.getEndTimeOfDay(parse2);
    StringBuilder hql = new StringBuilder();
    hql.append("select count(*) from Jiuzhen where 1=1");
    if (state != null && !"".equals(state))
      hql.append(" and state in (").append(state).append(") "); 
    if (gonghao != null && !"".equals(gonghao))
      hql.append(" and fzys='").append(gonghao).append("'"); 
    hql.append(" and caozuoTime>=:startTime and caozuoTime<=:endTime ");
    hql.append("and huanzheId in (select id from HuanZheXinXi) ");
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("startTime", startTime);
    map.put("endTime", endTime);
    return Integer.parseInt(findList(hql.toString(), map).get(0).toString());
  }
  
  @Override
  public List<Map<String, Object>> getPersonalSsQuantity(String gonghao, Date startTimeOfDay, Date endTimeOfDay) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(max(od.name) as name,count(eod.operationId) as num ) from Operation eo,OperationDetail eod,OperationDict od where eo.id=eod.operationId and od.id=eod.operationDictId and eo.operationTime is not null and eo.operationCompleteTime is not null and eo.operationTime>=:startTime and eo.operationCompleteTime<=:endTime and doctor=:doctor group by eod.operationDictId";
    map.put("startTime", startTimeOfDay);
    map.put("endTime", endTimeOfDay);
    map.put("doctor", gonghao);
    return findList(hql, map);
  }
}
