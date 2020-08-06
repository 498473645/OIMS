package cn.com.oims.web.controller;

import cn.com.oims.common.Utils;
import cn.com.oims.common.XLSHead;
import cn.com.oims.service.ITongJiService;
import cn.com.oims.web.form.ChartHql;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"tongji"})
public class TongJiController extends BaseController {
  private ITongJiService tongJiService;
  
  @Autowired
  public void setTongJiService(ITongJiService tongJiService) {
    this.tongJiService = tongJiService;
  }
  
  @RequestMapping(value = {"find4ChartHql.htm"}, method = {RequestMethod.POST})
  public void find4ChartHql(ChartHql db, String cs, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("提供页面统计图形数据", req);
    try {
      mrSuccess(mr, this.tongJiService.find4ChartHql(db, cs));
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeLog(mr, level_find);
    writeObjectJson(mr, res);
  }
  
  public String getwhere(ChartHql db) {
    String where = db.getWhere();
    Utils.tLog(where, " sr where is ");
    String[] wheres = where.split("<");
    String[] tmp = null;
    where = "";
    byte b;
    int i;
    String[] arrayOfString1;
    for (i = (arrayOfString1 = wheres).length, b = 0; b < i; ) {
      String s = arrayOfString1[b];
      if (s.trim().length() >= 1) {
        tmp = s.split(">");
        if (tmp.length <= 3 && tmp.length >= 1) {
          where = String.valueOf(where) + Utils.whereOrAnd(where) + tmp[0].replace("_", ".");
          if ("in".equals(tmp[1])) {
            where = String.valueOf(where) + " in (" + tmp[2] + ")";
          } else if ("eq".equals(tmp[1])) {
            where = String.valueOf(where) + " = " + tmp[2];
          } else if ("gt".equals(tmp[1])) {
            where = String.valueOf(where) + " > " + tmp[2];
          } else if ("lt".equals(tmp[1])) {
            where = String.valueOf(where) + " < " + tmp[2];
          } 
        } 
      } 
      b++;
    } 
    Utils.tLog(where);
    return where;
  }
  
  @RequestMapping(value = {"find4ListHql.htm"}, method = {RequestMethod.GET})
  public void find4ListHql(ChartHql db, String cs, Page p, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("统计分页查询", req);
    try {
      mrSuccess(mr, this.tongJiService.find4ListHql(db, cs, p));
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeLog(mr, level_find);
    writeObjectJson(mr.getObj(), res);
  }
  
  @RequestMapping(value = {"find4Export.htm"}, method = {RequestMethod.POST})
  public void find4Export(ChartHql hql, String cs, String head, HttpServletRequest req, HttpServletResponse res) throws Exception {
    int b;
    MyResult mr = createResult("统计导出数据", req);
    res.reset();
    res.setContentType("application/vnd.ms-excel");
    res.setCharacterEncoding("UTF-8");
    String name = "attachment;filename=" + URLEncoder.encode("export-" + Utils.dateToStrShort(new Date()) + ".xls", "UTF-8");
    res.setHeader("Content-disposition", name);
    File f = this.tongJiService.find4Export(hql, cs, head);
    writeLog(mr, level_find);
    FileInputStream fis = new FileInputStream(f);
    ServletOutputStream sos = res.getOutputStream();
    byte[] bs = new byte[1024];
    do {
      b = fis.read(bs);
      sos.write(bs);
    } while (b != -1);
    sos.flush();
    sos.close();
  }
  
  @RequestMapping(value = {"find4Export2.htm"}, method = {RequestMethod.POST})
  public void find4Export2(ChartHql hql, String cs, String head, HttpServletRequest req, HttpServletResponse res) throws Exception {
    MyResult mr = createResult("统计导出数据2", req);
    Vector<XLSHead> vs = Utils.strToVector(head);
    List<Map<String, Object>> data = this.tongJiService.find4ChartHql(hql, cs);
    Utils.tLog((new StringBuilder(String.valueOf(data.size()))).toString());
    writeLog(mr, level_find);
    exportXls(data, vs, req, res);
  }
  
  @RequestMapping(value = {"findYuanGongByBumen.htm"}, method = {RequestMethod.POST})
  public void findYuanGongByBumen(String bumenId, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("以部门查询员工", req);
    try {
      mr.setObj(this.tongJiService.findYuanGongByBumen(bumenId));
      mrSuccess(mr);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeObjectJson(mr, res);
    writeLog(mr, level_find);
  }
  
  @RequestMapping(value = {"findSheBieByBumen.htm"}, method = {RequestMethod.POST})
  public void findSheBieByBumen(String bumenId, String bgsId, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("以部门查询设备", req);
    try {
      mr.setObj(this.tongJiService.findSheBieByBumen(bumenId, bgsId));
      mrSuccess(mr);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeObjectJson(mr, res);
    writeLog(mr, level_find);
  }
  
  @RequestMapping(value = {"testAction"}, method = {RequestMethod.POST})
  public void testAction(HttpServletRequest req, HttpServletResponse res) {
    System.out.println(req.getParameter("month"));
    List<Map<String, Object>> rt = new ArrayList<>();
    Map<String, Object> e = new HashMap<>();
    e.put("label", "123");
    e.put("value", "1");
    rt.add(e);
    MyResult mr = createResult("测试后台问题", req);
    mr.setObj(rt);
    writeObjectJson(mr, res);
    writeLog(mr, level_find);
  }
}
