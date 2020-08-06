package cn.com.oims.service.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.ITongJiDao;
import cn.com.oims.service.ITongJiService;
import cn.com.oims.web.form.ChartHql;
import cn.com.oims.web.form.ChartListHead;
import cn.com.oims.web.form.ChartParam;
import com.codesnet.common.Page;
import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TongJiServiceImpl implements ITongJiService {
  ITongJiDao tongJiDao;
  
  @Autowired
  public void setTongJiDao(ITongJiDao tongJiDao) {
    this.tongJiDao = tongJiDao;
  }
  
  public List<Map<String, Object>> find4Chart(String hql, String doing, String startTime, String endTime) {
    List<Map<String, Object>> l = this.tongJiDao.find4Chart(hql, doing, Utils.strToDateDay(startTime), Utils.strToDateDay(endTime));
    return l;
  }
  
  public List<Map<String, Object>> find4ChartEx(String hql, String timeName, String doing, String startTime, String endTime) {
    List<Map<String, Object>> l = this.tongJiDao.find4ChartEx(hql, timeName, doing, Utils.strToDateDay(startTime), Utils.strToDateDay(endTime));
    return l;
  }
  
  public List<Map<String, Object>> find4ChartHql(ChartHql db, String cp) {
    ChartHql db_ = getHql(db.getFindTag(), db);
    Map<String, Object> m = stringToMap(cp);
    return this.tongJiDao.find4ChartHql(db_, m);
  }
  
  public Map<String, Object> find4ListHql(ChartHql db, String cp, Page p) {
    ChartHql db_ = getHql(db.getFindTag(), db);
    Map<String, Object> m = stringToMap(cp);
    Map<String, Object> rt = new HashMap<>(0);
    p.setRowsCount(this.tongJiDao.count(db_, m));
    p.init();
    rt.put("list", this.tongJiDao.find4ListHql(db_, m, p));
    rt.put("page", p);
    return rt;
  }
  
  public File find4Export(ChartHql hql, String cs, String head) throws Exception {
    List<Map<String, Object>> ls = find4ChartHql(hql, cs);
    Map<String, ChartListHead> head_m = StringToHeadMap(head);
    WritableWorkbook book = null;
    String path = getClass().getClassLoader().getResource("/").getPath();
    path = path.substring(0, path.lastIndexOf("/"));
    path = path.substring(0, path.lastIndexOf("/"));
    File p = new File(String.valueOf(path) + "/oimsv3_xls/temp");
    p.mkdirs();
    File f = new File(String.valueOf(path) + "/oimsv3_xls/temp/bool.xls");
    f.createNewFile();
    book = Workbook.createWorkbook(f);
    WritableSheet sheet = book.createSheet(Utils.dateToStrShort(new Date()), 0);
    writeChartHead(sheet, head_m);
    writeDate(sheet, head_m, ls);
    book.write();
    book.close();
    System.out.println(f.getAbsolutePath());
    return f;
  }
  
  private WritableSheet writeDate(WritableSheet sheet, Map<String, ChartListHead> head_m, List<Map<String, Object>> ls) throws Exception {
    int r = 0;
    Label l = null;
    for (Map<String, Object> row : ls) {
      r++;
      for (int i = 0; i < row.size(); i++) {
        ChartListHead clh = head_m.get(i + 1);
        Object o = row.get(clh.getColumn());
        if (o != null)
          if (o.getClass().getSimpleName().toLowerCase().equals(boolean.class.getSimpleName().toLowerCase())) {
            l = new Label(Integer.parseInt(clh.getIndex()) - 1, r, clh.getValue(((Boolean)o).booleanValue()));
            sheet.addCell((WritableCell)l);
          } else if (o.getClass().getSimpleName().equals(Date.class.getSimpleName())) {
            l = new Label(Integer.parseInt(clh.getIndex()) - 1, r, Utils.dateToStrShort((Date)o));
            sheet.addCell((WritableCell)l);
          } else {
            l = new Label(Integer.parseInt(clh.getIndex()) - 1, r, o.toString());
            sheet.addCell((WritableCell)l);
          }  
      } 
    } 
    return sheet;
  }
  
  private WritableSheet writeChartHead(WritableSheet sheet, Map<String, ChartListHead> head_m) {
    try {
      Label l = null;
      for (int i = 0; i < head_m.size(); i++) {
        ChartListHead h = head_m.get(i + 1);
        if (h == null)
          throw new RuntimeException("没有找到设置的报表头"); 
        l = new Label(i, 0, h.getTitle());
        sheet.addCell((WritableCell)l);
      } 
    } catch (RowsExceededException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    } 
    return sheet;
  }
  
  private Map<String, ChartListHead> StringToHeadMap(String head) {
    Map<String, ChartListHead> map = new HashMap<>(0);
    byte b;
    int i;
    String[] arrayOfString;
    for (i = (arrayOfString = head.split(",")).length, b = 0; b < i; ) {
      String s = arrayOfString[b];
      if (s != null && !s.equals("")) {
        ChartListHead clh = new ChartListHead();
        byte b1;
        int j;
        String[] arrayOfString1;
        for (j = (arrayOfString1 = s.split("<f>")).length, b1 = 0; b1 < j; ) {
          String kv = arrayOfString1[b1];
          if (kv.split("<kv>")[0].equals("title")) {
            clh.setTitle(kv.split("<kv>")[1]);
          } else if (kv.split("<kv>")[0].equals("index")) {
            clh.setIndex(kv.split("<kv>")[1]);
          } else if (kv.split("<kv>")[0].equals("column")) {
            clh.setColumn(kv.split("<kv>")[1]);
          } else if (kv.split("<kv>")[0].equals("fValue")) {
            clh.setfValue(kv.split("<kv>")[1]);
          } else if (kv.split("<kv>")[0].equals("tValue")) {
            clh.settValue(kv.split("<kv>")[1]);
          } 
          b1++;
        } 
        map.put(clh.getIndex(), clh);
      } 
      b++;
    } 
    return map;
  }
  
  private Map<String, Object> stringToMap(String cp) {
    Map<String, Object> m = new HashMap<>(0);
    byte b;
    int i;
    String[] arrayOfString;
    for (i = (arrayOfString = cp.split(",")).length, b = 0; b < i; ) {
      String s = arrayOfString[b];
      if (s != null && !s.equals("")) {
        ChartParam chartParam = new ChartParam();
        byte b1;
        int j;
        String[] arrayOfString1;
        for (j = (arrayOfString1 = s.split("<f>")).length, b1 = 0; b1 < j; ) {
          String pm = arrayOfString1[b1];
          if (pm != null && !pm.equals(""))
            if (pm.split("<kv>")[0].equals("name")) {
              chartParam.setName(pm.split("<kv>")[1]);
            } else if (pm.split("<kv>")[0].equals("value")) {
              chartParam.setValue(pm.split("<kv>")[1]);
            } else if (pm.split("<kv>")[0].equals("type")) {
              chartParam.setType(pm.split("<kv>")[1]);
            }  
          b1++;
        } 
        if (chartParam.getType() != null)
          if (chartParam.getType().equals("string")) {
            m.put(chartParam.getName(), chartParam.getValue());
          } else if (chartParam.getType().equals("int")) {
            m.put(chartParam.getName(), Integer.valueOf(chartParam.getValue()));
          } else if (chartParam.getType().equals("date")) {
            m.put(chartParam.getName(), Utils.strToDateDay(chartParam.getValue()));
          } else if (chartParam.getType().equals("double")) {
            m.put(chartParam.getName(), Double.valueOf(chartParam.getValue()));
          } else if (chartParam.getType().equals("long")) {
            m.put(chartParam.getName(), Long.valueOf(chartParam.getValue()));
          } else if (chartParam.getType().equals("boolean")) {
            m.put(chartParam.getName(), Boolean.valueOf(chartParam.getValue().equals("t")));
          }  
      } 
      b++;
    } 
    return m;
  }
  
  private ChartHql getHql(String tag, ChartHql hql) {
    String t = getClass().toString();
    Utils.tLog("tag is " + tag);
    if (Utils.strIsEmpty(tag))
      throw new RuntimeException(String.valueOf(t) + "getHql 参数为空 \ttag is " + tag); 
    if (tag.toLowerCase().equals("diqu")) {
      hql.setSelect("select new map(count(*) as value,'所有地区' as label,'javascript:zhtj.dqHandler().chartEx()' as link )");
      hql.setFrom(" from HuanZheXinXi h");
      return hql;
    } 
    if (tag.toLowerCase().equals("diquex")) {
      hql.setSelect("select new map(count(*) as value,h.diqu as label )");
      hql.setFrom("from HuanZheXinXi h");
      hql.setGroup("group by h.diqu");
      return hql;
    } 
    if (tag.toLowerCase().equals("diqupro")) {
      hql.setSelect("select new map(h.id as id,h.xingbie as xingbie,h.binglihao as binglihao,h.xingming as xingming,h.shouji as shouji )");
      hql.setFrom("from HuanZheXinXi h");
      return hql;
    } 
    if (tag.toLowerCase().equals("diqumx")) {
      hql.setSelect("select new map(h.id as id,h.xingbie as xingbie,h.binglihao as binglihao,h.xingming as xingming,h.shouji as shouji )");
      hql.setFrom("from HuanZheXinXi h");
      return hql;
    } 
    if (tag.toLowerCase().equals("lx")) {
      hql.setSelect("select new map(count(*) as value,'患者类型统计' as label,'javascript:zhtj.lxHandler().chartEx()' as link )");
      hql.setFrom("from HuanZheXinXi h");
      return hql;
    } 
    if (tag.toLowerCase().equals("lxex")) {
      hql.setSelect("select new map(count(*) as value," + hql.getGroup() + " as label )");
      hql.setFrom("from HuanZheXinXi h");
      hql.setGroup("group by " + hql.getGroup());
      return hql;
    } 
    if (tag.toLowerCase().equals("lxpro")) {
      hql.setSelect("select new map(h.id as id,h.xingbie as xingbie,h.binglihao as binglihao,h.xingming as xingming,h.shouji as shouji ) ");
      hql.setFrom("from HuanZheXinXi h");
      return hql;
    } 
    if (tag.toLowerCase().equals("lxpagelook")) {
      hql.setSelect("select new map(h.id as id,h.xingbie as xingbie,h.binglihao as binglihao,h.xingming as xingming,h.shouji as shouji ) ");
      hql.setFrom("from HuanZheXinXi h");
      return hql;
    } 
    if (tag.toLowerCase().equals("ly")) {
      hql.setSelect("select new map(count(*) as value,'所有来源' as label,'javascript:zhtj.lyHandler().chartEx()' as link ) ");
      hql.setFrom("from HuanZheXinXi h,Category c");
      hql.setWhere("where h.laiyuan=c.id " + hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("lyex")) {
      hql.setSelect("select new map(count(*) as value,c.category as label )");
      hql.setFrom("from HuanZheXinXi h ,Category c");
      hql.setWhere("where h.laiyuan=c.id " + hql.getWhere().replaceAll("where", "and"));
      hql.setGroup("group by c.category");
      return hql;
    } 
    if (tag.toLowerCase().equals("lypro")) {
      hql.setSelect("select new map(h.id as id,h.xingbie as xingbie,h.binglihao as binglihao,h.xingming as xingming,h.shouji as shouji ,c.category as category ) ");
      hql.setFrom("from HuanZheXinXi h ,Category c");
      hql.setWhere("where h.laiyuan=c.id" + hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("lypagelook")) {
      hql.setSelect("select new map(h.id as id,h.xingbie as xingbie,h.binglihao as binglihao,h.xingming as xingming,h.shouji as shouji,c.category ) ");
      hql.setFrom("from HuanZheXinXi h ,Category c");
      hql.setWhere("where h.laiyuan=c.id" + hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("zd")) {
      hql.setSelect("select new map(count(*) as value,'所有诊断' as label,'javascript:zhtj.zdHandler().chartEx()' as link )");
      hql.setFrom("from HuanZheXinXi h ,Jiuzhen j,MedicalCertificate m,Category c,Jcd jcd,Category lyc");
      hql.setWhere("where h.id=j.huanzheId and j.id=m.id.jiuzhenId and m.id.categoryId=c.id and h.laiyuan=lyc.id and h.id=jcd.jiuzhenId and c.fatherid=40000 " + 
          hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("zdex")) {
      hql.setSelect("select new map(count(*) as value,c.category as label )");
      hql.setFrom("from HuanZheXinXi h ,Jiuzhen j,MedicalCertificate m,Category c,Jcd jcd,Category lyc");
      hql.setWhere("where h.id=j.huanzheId and j.id=m.id.jiuzhenId and m.id.categoryId=c.id and h.laiyuan=lyc.id and h.id=jcd.jiuzhenId and c.fatherid=40000 " + 
          hql.getWhere().replaceAll("where", "and"));
      hql.setGroup("group by c.category");
      return hql;
    } 
    if (tag.toLowerCase().equals("zdpro")) {
      hql.setSelect("select new map(h.id as id,h.xingbie as xingbie,h.binglihao as binglihao,h.xingming as xingming,h.shouji as shouji,c.category as category )");
      hql.setFrom("from HuanZheXinXi h ,Jiuzhen j,MedicalCertificate m,Category c,Jcd jcd,Category lyc");
      hql.setWhere("where h.id=j.huanzheId and j.id=m.id.jiuzhenId and m.id.categoryId=c.id and h.laiyuan=lyc.id and h.id=jcd.jiuzhenId and c.fatherid=40000 " + 
          hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("zdpagelook")) {
      hql.setSelect("select new map(h.id as id,h.xingbie as xingbie,h.binglihao as binglihao,h.xingming as xingming,h.shouji as shouji,c.category as category )");
      hql.setFrom("from HuanZheXinXi h ,Jiuzhen j,MedicalCertificate m,Category c,Jcd jcd,Category lyc");
      hql.setWhere("where h.id=j.huanzheId and j.id=m.id.jiuzhenId and m.id.categoryId=c.id and h.laiyuan=lyc.id and h.id=jcd.jiuzhenId and c.fatherid=40000 " + 
          hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("jc")) {
      hql.setSelect("select new map(count(*) as value,'所有检查' as label,'javascript:zhtj.jcHandler().chartEx()' as link )");
      hql.setFrom("from HuanZheXinXi h ,Jcd j");
      hql.setWhere("where h.id=j.huanzheId" + hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("jcex")) {
      hql.setSelect("select new map(count(*) as value,j.biaoti as label )");
      hql.setFrom("from HuanZheXinXi h ,Jcd j");
      hql.setWhere("where h.id=j.huanzheId" + hql.getWhere().replaceAll("where", "and"));
      hql.setGroup("group by j.biaoti");
      return hql;
    } 
    if (tag.toLowerCase().equals("jcpro")) {
      hql.setSelect("select new map(h.id as id,h.xingbie as xingbie,h.binglihao as binglihao,h.xingming as xingming,h.shouji as shouji,j.biaoti as biaoti )");
      hql.setFrom("from HuanZheXinXi h ,Jcd j");
      hql.setWhere("where h.id=j.huanzheId" + hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("jcpagelook")) {
      hql.setSelect("select new map(h.id as id,h.xingbie as xingbie,h.binglihao as binglihao,h.xingming as xingming,h.shouji as shouji,j.biaoti as biaoti )");
      hql.setFrom("from HuanZheXinXi h ,Jcd j");
      hql.setWhere("where h.id=j.huanzheId" + hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("jcd_jcdzt")) {
      hql.setSelect("select new map(count(*) as value,'所有检查项目' as label,'javascript:jcd.jcdZtHandler().chartEx()' as link )");
      hql.setFrom("from Jcd jcd,BuMen b,Jcxm xm,Category biaoshi ");
      hql.setWhere("where b.id=jcd.kdksId and xm.id=jcd.jcxmIds and biaoshi.id=jcd.biaoshi" + hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("jcd_jcdzt_ex")) {
      hql.setSelect("select new map(count(*) as value,biaoshi.category as label )");
      hql.setFrom("from Jcd jcd,BuMen b,Jcxm xm,Category biaoshi  ");
      hql.setWhere("where b.id=jcd.kdksId and xm.id=jcd.jcxmIds and biaoshi.id=jcd.biaoshi " + hql.getWhere().replaceAll("where", "and"));
      hql.setGroup("group by jcd.biaoshi");
      return hql;
    } 
    if (tag.toLowerCase().equals("jcd_jcdzt_pro")) {
      hql.setSelect("select new map( (select binglihao  from HuanZheXinXi h where h.id = jcd.huanzheId) as binglihao, (select xingming   from HuanZheXinXi h where h.id = jcd.huanzheId) as xingming,  (select xingbie    from HuanZheXinXi h where h.id = jcd.huanzheId) as xingbie , (select shengri    from HuanZheXinXi h where h.id = jcd.huanzheId) as shengri,  (select sfzh       from HuanZheXinXi h where h.id = jcd.huanzheId) as sfzh,  (select shouji     from HuanZheXinXi h where h.id = jcd.huanzheId) as shouji,  (select dianhua    from HuanZheXinXi h where h.id = jcd.huanzheId) as dianhua,  (select bmmc\t     from BuMen\tjcks \t where jcks.id = jcd.jcksId) as jcksId,  (select bmmc\t     from BuMen kdks \t where kdks.id = jcd.kdksId) as kdksId , (select xingming\t from YuanGong kdys where kdys.gonghao = jcd.kdys) as kdys,  (select xingming\t from YuanGong jcys where jcys.gonghao = jcd.kdys) as jcys,  (select category\t from Category biaoshi where biaoshi.id = jcd.biaoshi) as biaoshi,  (select category\t from Category yanbie  where yanbie.id = jcd.yanbie) as yanbie,  jcd.jcksTime as jcksTime, jcd.jcdh as jcdh, jcd.jcjsTime as jcjsTime)");
      hql.setFrom("from Jcd jcd");
      return hql;
    } 
    if (tag.toLowerCase().equals("jcd_jcdzt_pagelook")) {
      hql.setSelect("select new map( h.binglihao as binglihao, h.xingming as xingming , h.xingbie as xingbie,  h.shengri as shengri , h.sfzh as sfzh, h.shouji as shouji, h.dianhua as dianhua,  jcks.bmmc as jcksId, jcys.xingming as jcys , jcd.jcksTime as jcksTime, jcd.jcdh as jcdh, jcd.jcjsTime as jcjsTime, biaoshi.category as biaoshi, yanbie.category as yanbie, kdys.xingming as kdys, b.bmmc as kdksId )");
      hql.setFrom("from Jcd jcd,BuMen b,Jcxm xm,Category biaoshi ,HuanZheXinXi h,YuanGong jcys, YuanGong kdys,BuMen jcks,Category yanbie ");
      hql.setWhere("where b.id=jcd.kdksId and xm.id=jcd.jcxmIds and biaoshi.id=jcd.biaoshi  and jcys.gonghao=jcd.jcys and jcd.kdys=kdys.gonghao and  jcks.id=jcd.jcksId and yanbie.id=jcd.yanbie" + 
          
          hql.getWhere().replaceAll("where", "and"));
      hql.setGroup("group by jcd.jcdh");
      return hql;
    } 
    if (tag.toLowerCase().equals("jcys")) {
      hql.setSelect("select new map(count(*) as value,jcys.xingming as label ,jcys.gonghao as ysgh  )");
      hql.setFrom("from Jcd jcd,BuMen jcks,YuanGong jcys,Jcxm jcxm,Category yb");
      hql.setWhere("where jcd.jcksId=jcks.id and jcd.jcys=jcys.gonghao and jcd.jcxmIds=jcxm.id and yb.id=jcd.yanbie" + 
          hql.getWhere().replaceAll("where", "and"));
      hql.setGroup("group by jcys.xingming");
      return hql;
    } 
    if (tag.toLowerCase().equals("jcys_ex")) {
      hql.setSelect("select new map(count(*) as value,jcxm.xmmc as label,jcxm.id )");
      hql.setFrom("from Jcd jcd,BuMen jcks,YuanGong jcys,Jcxm jcxm,Category yb");
      hql.setWhere("where jcd.jcksId=jcks.id and jcd.jcys=jcys.gonghao and jcd.jcxmIds=jcxm.id and yb.id=jcd.yanbie" + 
          hql.getWhere().replaceAll("where", "and"));
      hql.setGroup("group by jcxm.id");
      return hql;
    } 
    if (tag.toLowerCase().equals("jcys_pro")) {
      hql.setSelect("select new map(jcys.gonghao as gonghao,jcys.xingming as xingming,jcd.jcksTime as jcksTime,jcxm.xmmc as xmmc )");
      hql.setFrom("from Jcd jcd,BuMen jcks,YuanGong jcys,Jcxm jcxm,Category yb");
      hql.setWhere("where jcd.jcksId=jcks.id and jcd.jcys=jcys.gonghao and jcd.jcxmIds=jcxm.id and yb.id=jcd.yanbie" + 
          hql.getWhere().replaceAll("where", "and"));
      hql.setGroup("group by jcd.jcksTime");
      return hql;
    } 
    if (tag.toLowerCase().equals("sebie")) {
      hql.setSelect("select new map(count(*) as value ,sb.sbmc as label,sb.id as id ) ");
      hql.setFrom("from Jcd jcd ,SheBei sb");
      hql.setWhere("where sb.id=jcd.jcsbId " + 
          hql.getWhere().replaceAll("where", "and"));
      hql.setGroup("group by sb.id");
      return hql;
    } 
    if (tag.toLowerCase().equals("sebie_ex")) {
      hql.setSelect("select new map(count(*) as value ,yg.xingming as label,yg.id as ygid ) ");
      hql.setFrom("from Jcd jcd ,SheBei sb,YuanGong yg");
      hql.setWhere("where sb.id=jcd.jcsbId and jcd.jcys=yg.gonghao" + 
          hql.getWhere().replaceAll("where", "and"));
      hql.setGroup("group by yg.id");
      return hql;
    } 
    if (tag.toLowerCase().equals("sebie_pro")) {
      hql.setSelect("select new map(sb.id as sbid,sb.sbmc as sbmc,jcd.jcksTime as jcksTime,jcxm.xmmc as xmmc,yg.gonghao as gonghao,yg.xingming as xingming ) ");
      hql.setFrom("from Jcd jcd ,SheBei sb,YuanGong yg,Jcxm jcxm ");
      hql.setWhere("where sb.id=jcd.jcsbId and jcd.jcys=yg.gonghao and jcd.jcxmIds=jcxm.id" + 
          hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("sebie_pagelist")) {
      hql.setSelect("select new map(sb.id as sbid,sb.sbmc as sbmc,jcd.jcksTime as jcksTime,jcxm.xmmc as xmmc,yg.gonghao as gonghao,yg.xingming as xingming ) ");
      hql.setFrom("from Jcd jcd ,SheBei sb,YuanGong yg,Jcxm jcxm ");
      hql.setWhere("where sb.id=jcd.jcsbId and jcd.jcys=yg.gonghao and jcd.jcxmIds=jcxm.id" + 
          hql.getWhere().replaceAll("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("jcd_zymz_show")) {
      hql.setSelect("select new map(count(*) as value,'所有诊别' as label,jcd.yanbie as yanbie,'javascript:jcd.zyMzHandler().chartEx()' as link )");
      hql.setFrom("from Jcd jcd ");
      hql.setWhere(hql.getWhere());
      return hql;
    } 
    if (tag.toLowerCase().equals("jcd_zymz_ex")) {
      hql.setSelect("select new map(count(*) as value,jz.zhenbie as label )");
      hql.setFrom("from Jcd jcd,Jiuzhen jz ");
      hql.setWhere(String.valueOf(hql.getWhere()) + Utils.whereOrAnd(hql.getWhere()) + "jz.id=jcd.jiuzhenId");
      hql.setGroup(" group by jz.zhenbie ");
      return hql;
    } 
    if (tag.toLowerCase().equals("jcd_zymz_pro")) {
      hql.setSelect("select new map(hz.shengri as shengri , hz.binglihao as binglihao,hz.xingming as xingming,hz.xingbie as xingbie,hz.sfzh as sfzh ,hz.shouji as shouji,hz.dianhua as dianhua ,jcd.jcdh as jcdh,kdks.bmmc as kdksId,kdys.xingming as kdys ,jcks.bmmc as jcksId,jcys.xingming as jcys ,jcd.jcksTime as jcksTime,jcd.jcjsTime as jcjsTime,yb.category as yanbie ,bs.category as biaoshi )");
      hql.setFrom("from Jcd jcd, HuanZheXinXi hz,YuanGong kdys,YuanGong jcys,BuMen kdks,BuMen jcks,Category yb,Category bs ");
      hql.setWhere(" where jcd.huanzheId=hz.id  and jcd.jcys=jcys.gonghao and jcd.kdys=kdys.gonghao and jcd.kdksId = kdks.id  and jcd.jcksId=jcks.id  and jcd.yanbie = yb.id  and jcd.biaoshi=bs.id" + 
          
          hql.getWhere().replace("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("jcd_zymz_pagelook")) {
      hql.setSelect("select new map(hz.shengri as shengri , hz.binglihao as binglihao,hz.xingming as xingming,hz.xingbie as xingbie,hz.sfzh as sfzh ,hz.shouji as shouji,hz.dianhua as dianhua ,jcd.jcdh as jcdh,kdks.bmmc as kdksId,kdys.xingming as kdys ,jcks.bmmc as jcksId,jcys.xingming as jcys ,jcd.jcksTime as jcksTime,jcd.jcjsTime as jcjsTime,yb.category as yanbie ,bs.category as biaoshi )");
      hql.setFrom("from Jcd jcd, HuanZheXinXi hz,YuanGong kdys,YuanGong jcys,BuMen kdks,BuMen jcks,Category yb,Category bs ");
      hql.setWhere(" where jcd.huanzheId=hz.id  and jcd.jcys=jcys.gonghao and jcd.kdys=kdys.gonghao and jcd.kdksId = kdks.id  and jcd.jcksId=jcks.id  and jcd.yanbie = yb.id  and jcd.biaoshi=bs.id" + 
          
          hql.getWhere().replace("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("xm")) {
      hql.setSelect("select new map(count(*) as value,'所有项目' as label,'javascript:new JcxmTj_().chartEx()' as link)");
      hql.setFrom(" from Jcd jcd,Jcxm xm,BuMen bm ,Category bs,YuanGong yg");
      hql.setWhere(" where xm.id=jcd.jcxmIds and jcd.jcksId=bm.id and jcd.biaoshi=bs.id and yg.gonghao=jcd.jcys " + 
          hql.getWhere().replace("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("xm_ex")) {
      hql.setSelect("select new map(count(*) as value,xm.xmmc as label)");
      hql.setFrom(" from Jcd jcd,Jcxm xm,BuMen bm ,Category bs,YuanGong yg");
      hql.setWhere(" where xm.id=jcd.jcxmIds and jcd.jcksId=bm.id and jcd.biaoshi=bs.id and yg.gonghao=jcd.jcys" + 
          hql.getWhere().replace("where", "and"));
      hql.setGroup(" group by xm.id");
      return hql;
    } 
    if (tag.toLowerCase().equals("xm_pro")) {
      hql.setSelect("select new map(yg.xingming as jcys,yg.gonghao as gonghao ,bm.bmmc as jcks,bs.category as zt,xm.xmmc as xmmc,jcd.jcksTime as jcksTime)");
      hql.setFrom(" from Jcd jcd,Jcxm xm,BuMen bm ,Category bs,YuanGong yg");
      hql.setWhere(" where xm.id=jcd.jcxmIds and jcd.jcksId=bm.id and jcd.biaoshi=bs.id and yg.gonghao=jcd.jcys" + 
          hql.getWhere().replace("where", "and"));
      return hql;
    } 
    if (tag.toLowerCase().equals("export")) {
      String g1 = hql.getGroup().split(",")[0];
      if (Utils.strIsEmpty(g1))
        throw new RuntimeException("无分组依据"); 
      Utils.tLog(hql.getTjType());
      hql.setFrom(" from ");
      if ("jcd".equals(hql.getTjType())) {
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,Jcxm jcxm,BuMen jcks,SheBei jcsb,YuanGong jcys,Category yb,Category bs ,BuMen kdks,YuanGong kdys");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcxmIds=jcxm.id and jcd.jcksId=jcks.id and jcd.jcsbId=jcsb.id " + 
            " and jcd.jcys= jcys.gonghao and jcd.yanbie=yb.id and bs.id=jcd.biaoshi " + 
            " and jcd.kdksId=kdks.id and jcd.kdys=kdys.gonghao");
      } else if ("hz".equals(hql.getTjType())) {
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " HuanZheXinXi hz,Jiuzhen jz,MedicalCertificate jzzd ,Category zd,YuanGong zdys,Jcd jcd ,Category ly,Category yb");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " hz.id=jz.huanzheId and jz.id=jzzd.id.jiuzhenId and jzzd.id.categoryId=zd.id and jzzd.doctor = zdys.gonghao " + 
            "and jcd.huanzheId=hz.id and ly.id=hz.laiyuan and yb.id=jcd.yanbie");
      } else if ("xm".equals(hql.getTjType())) {
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,BuMen jcks,Jcxm jcxm,Category bs,YuanGong jcys,SheBei jcsb ");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcksId=jcks.id and jcd.jcxmIds=jcxm.id and jcd.biaoshi=bs.id and jcd.jcsbId=jcsb.id and jcd.jcys=jcys.gonghao ");
      } else if ("sb".equals(hql.getTjType())) {
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,Jcxm jcxm,BuMen jcks ,Category bs,YuanGong jcys, SheBei jcsb");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcsbId = jcsb.id and jcd.jcxmIds=jcxm.id  and jcd.jcksId=jcks.id and jcd.biaoshi=bs.id and jcd.jcys = jcys.gonghao ");
      } else if ("all".equals(hql.getTjType())) {
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,Jcxm jcxm,BuMen jcks,SheBei jcsb,YuanGong jcys,Category yb,Category ly " + 
            " ,HuanZheXinXi hz,Jiuzhen jz,MedicalCertificate jzzd ,Category zd ,YuanGong zdys " + 
            " ,Category bs ");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcxmIds=jcxm.id and jcd.jcksId=jcks.id and jcd.jcsbId=jcsb.id and jcd.jcys= jcys.gonghao and jcd.yanbie=yb.id " + 
            " and hz.id=jz.huanzheId and jz.id=jzzd.id.jiuzhenId and jzzd.id.categoryId=zd.id and jzzd.doctor = zdys.gonghao and jcd.huanzheId=hz.id " + 
            " and jcd.biaoshi=bs.id and jcd.jcys = jcys.gonghao and hz.laiyuan=ly.id " + 
            "  ");
      } 
      hql.setSelect("select new map(count(*) as value," + g1 + " as label )");
      hql.setGroup("group by " + g1);
      return hql;
    } 
    if (tag.toLowerCase().equals("export_ex")) {
      String g1 = hql.getGroup().split(",")[0];
      String g2 = hql.getGroup().split(",")[1];
      if (Utils.strIsEmpty(g1))
        throw new RuntimeException("无分组依据"); 
      Utils.tLog(hql.getTjType());
      hql.setFrom(" from ");
      if ("jcd".equals(hql.getTjType())) {
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,Jcxm jcxm,BuMen jcks,SheBei jcsb,YuanGong jcys,Category yb,Category bs ,BuMen kdks,YuanGong kdys");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcxmIds=jcxm.id and jcd.jcksId=jcks.id and jcd.jcsbId=jcsb.id " + 
            " and jcd.jcys= jcys.gonghao and jcd.yanbie=yb.id and bs.id=jcd.biaoshi " + 
            " and jcd.kdksId=kdks.id and jcd.kdys=kdys.gonghao");
      } else if ("hz".equals(hql.getTjType())) {
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " HuanZheXinXi hz,Jiuzhen jz,MedicalCertificate jzzd ,Category zd,YuanGong zdys,Jcd jcd ,Category ly,Category yb");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " hz.id=jz.huanzheId and jz.id=jzzd.id.jiuzhenId and jzzd.id.categoryId=zd.id and jzzd.doctor = zdys.gonghao " + 
            "and jcd.huanzheId=hz.id and ly.id=hz.laiyuan and yb.id=jcd.yanbie");
      } else if ("xm".equals(hql.getTjType())) {
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,BuMen jcks,Jcxm jcxm,Category bs,YuanGong jcys,SheBei jcsb ");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcksId=jcks.id and jcd.jcxmIds=jcxm.id and jcd.biaoshi=bs.id and jcd.jcsbId=jcsb.id and jcd.jcys=jcys.gonghao ");
      } else if ("sb".equals(hql.getTjType())) {
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,Jcxm jcxm,BuMen jcks ,Category bs,YuanGong jcys, SheBei jcsb");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcsbId = jcsb.id and jcd.jcxmIds=jcxm.id  and jcd.jcksId=jcks.id and jcd.biaoshi=bs.id and jcd.jcys = jcys.gonghao ");
      } else if ("all".equals(hql.getTjType())) {
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,Jcxm jcxm,BuMen jcks,SheBei jcsb,YuanGong jcys,Category yb " + 
            " ,HuanZheXinXi hz,Jiuzhen jz,MedicalCertificate jzzd ,Category zd ,YuanGong zdys " + 
            " ,Category bs,Category ly ");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcxmIds=jcxm.id and jcd.jcksId=jcks.id and jcd.jcsbId=jcsb.id and jcd.jcys= jcys.gonghao and jcd.yanbie=yb.id " + 
            " and hz.id=jz.huanzheId and jz.id=jzzd.id.jiuzhenId and jzzd.id.categoryId=zd.id and jzzd.doctor = zdys.gonghao and jcd.huanzheId=hz.id " + 
            " and jcd.biaoshi=bs.id and jcd.jcys = jcys.gonghao and hz.laiyuan=ly.id" + 
            "  ");
      } 
      hql.setSelect("select new map(count(*) as value," + g2 + " as label )");
      hql.setGroup("group by " + g2);
      return hql;
    } 
    if (tag.toLowerCase().equals("export_pro")) {
      String g1 = hql.getGroup().split(",")[0];
      if (Utils.strIsEmpty(g1))
        throw new RuntimeException("无分组依据"); 
      Utils.tLog(hql.getTjType());
      hql.setFrom(" from ");
      if ("jcd".equals(hql.getTjType())) {
        hql.setSelect("select new map(hz.shengri as shengri , hz.binglihao as binglihao,hz.xingming as xingming,hz.xingbie as xingbie,hz.sfzh as sfzh ,hz.shouji as shouji,hz.dianhua as dianhua ,jcd.jcdh as jcdh,kdks.bmmc as kdksId,kdys.xingming as kdys ,kdys.gonghao as kdysgh,jcks.bmmc as jcksId,jcys.xingming as jcys ,jcys.gonghao as jcysgh,jcd.jcksTime as jcksTime,jcd.jcjsTime as jcjsTime,yb.category as yanbie ,bs.category as biaoshi ,jcxm.xmmc as jcxmmc )");
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,Jcxm jcxm,BuMen jcks,SheBei jcsb,YuanGong jcys,Category yb,Category bs,HuanZheXinXi hz ,BuMen kdks,YuanGong kdys ");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcxmIds=jcxm.id and jcd.jcksId=jcks.id and jcd.jcsbId=jcsb.id " + 
            " and jcd.jcys= jcys.gonghao and jcd.yanbie=yb.id and bs.id=jcd.biaoshi " + 
            " and  jcd.huanzheId=hz.id and jcd.kdksId=kdks.id and jcd.kdys=kdys.gonghao ");
      } else if ("hz".equals(hql.getTjType())) {
        hql.setSelect("select new map(hz.id as id,hz.xingbie as xingbie,hz.binglihao as binglihao,hz.xingming as xingming,hz.shouji as shouji )");
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " HuanZheXinXi hz,Jiuzhen jz,MedicalCertificate jzzd ,Category zd,YuanGong zdys,Jcd jcd ,Category ly,Category yb");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " hz.id=jz.huanzheId and jz.id=jzzd.id.jiuzhenId and jzzd.id.categoryId=zd.id and jzzd.doctor = zdys.gonghao " + 
            "and jcd.huanzheId=hz.id and ly.id=hz.laiyuan and yb.id=jcd.yanbie");
      } else if ("xm".equals(hql.getTjType())) {
        hql.setSelect("select new map(jcsb.id as sbid,jcsb.sbmc as sbmc,jcd.jcksTime as jcksTime,jcxm.xmmc as xmmc,jcys.gonghao as gonghao,jcys.xingming as xingming ) ");
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,BuMen jcks,Jcxm jcxm,Category bs,YuanGong jcys,SheBei jcsb  ");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcksId=jcks.id and jcd.jcxmIds=jcxm.id and jcd.biaoshi=bs.id and jcd.jcsbId=jcsb.id and jcd.jcys=jcys.gonghao ");
      } else if ("sb".equals(hql.getTjType())) {
        hql.setSelect("select new map(jcsb.id as sbid,jcsb.sbmc as sbmc,jcd.jcksTime as jcksTime,jcxm.xmmc as xmmc,jcys.gonghao as gonghao,jcys.xingming as xingming ) ");
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,Jcxm jcxm,BuMen jcks ,Category bs,YuanGong jcys, SheBei jcsb");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcsbId = jcsb.id and jcd.jcxmIds=jcxm.id  and jcd.jcksId=jcks.id and jcd.biaoshi=bs.id and jcd.jcys = jcys.gonghao ");
      } else if ("all".equals(hql.getTjType())) {
        hql.setSelect("select new map(hz.shengri as shengri , hz.binglihao as binglihao,hz.xingming as xingming,hz.xingbie as xingbie,hz.sfzh as sfzh ,hz.shouji as shouji,hz.dianhua as dianhua ,jcsb.id as sbid,jcsb.sbmc as sbmc,jcd.jcksTime as jcksTime,jcxm.xmmc as xmmc,jcys.gonghao as jcysgh,jcys.xingming as jcys) ");
        hql.setFrom(String.valueOf(hql.getFrom()) + 
            " Jcd jcd,Jcxm jcxm,BuMen jcks,SheBei jcsb,YuanGong jcys,Category yb " + 
            " ,HuanZheXinXi hz,Jiuzhen jz,MedicalCertificate jzzd ,Category zd ,YuanGong zdys " + 
            " ,Category bs,Category ly");
        hql.setWhere(String.valueOf(hql.getWhere()) + 
            Utils.whereOrAnd(hql.getWhere()) + 
            " jcd.jcxmIds=jcxm.id and jcd.jcksId=jcks.id and jcd.jcsbId=jcsb.id and jcd.jcys= jcys.gonghao and jcd.yanbie=yb.id " + 
            " and hz.id=jz.huanzheId and jz.id=jzzd.id.jiuzhenId and jzzd.id.categoryId=zd.id and jzzd.doctor = zdys.gonghao and jcd.huanzheId=hz.id " + 
            " and jcd.biaoshi=bs.id and jcd.jcys = jcys.gonghao  " + 
            " and hz.laiyuan=ly.id ");
      } 
      hql.setGroup("");
      return hql;
    } 
    throw new RuntimeException(String.valueOf(t) + "getHql 无匹配hql\t" + tag);
  }
  
  public List<Map<String, Object>> findYuanGongByBumen(String bumenId) {
    return this.tongJiDao.findYuanGongByBumen(bumenId);
  }
  
  public List<Map<String, Object>> findSheBieByBumen(String bumenId, String bgsId) {
    return this.tongJiDao.findSheBieByBumen(bumenId, bgsId);
  }
}
