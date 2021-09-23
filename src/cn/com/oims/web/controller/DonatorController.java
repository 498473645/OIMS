package cn.com.oims.web.controller;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.pojo.Donator;
import cn.com.oims.service.IDonatorService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.web.form.GongTiSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author: 黄浩
 * @date: 2020/8/17.
 */
@Controller
@RequestMapping("gongti")
public class DonatorController extends BaseController{
    private int doState = 1;// 操作执行状态，1表示成功
    private String doing = "";// 描述此操作
    private String message = "";// 操作执行结果的描述
    private  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    @Autowired
    private IDonatorService gtService;
    @Autowired
    private IOimsLogService oimsLogService;

    /**
     * 供体信息列表
     * @param form
     * @param page
     */
    @RequestMapping(value="/findGongTiList.htm", method= RequestMethod.POST)
    public void findGongTiList(GongTiSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response){
        MyResult result = new MyResult();
        result.setDoing("获取供体信息列表!");
        HttpSession session = request.getSession();
        String gonghao = (session.getAttribute("gonghao") != null) ? session
                .getAttribute("gonghao").toString() : null;
        List<Map<String, Object>> list = gtService.findGongTiList(form,page);
        session.setAttribute("searchForm", form);
        Map map = new HashMap();
        map.put("list", list);
        map.put("page", page);
        result.setGonghao(gonghao);
        oimsLogService.saveOimsLog(result, 1);
        JSONWriterUtils.writeJSONObj(map, response);
    }

    /**
     * 查看供体信息详情
     */
    @RequestMapping(value="/queryGongTiById.htm", method= RequestMethod.POST)
    public void queryGongTiById(Long id, HttpServletRequest request, HttpServletResponse response){
        MyResult result = new MyResult();
        result.setDoing("查看供体信息详情!");
        HttpSession session = request.getSession();
        String gonghao = (session.getAttribute("gonghao") != null) ? session
                .getAttribute("gonghao").toString() : null;
        List list = new ArrayList();
        Donator donator = gtService.queryGongTiById(id);
        list.add(donator);
        Map map = new HashMap();
        map.put("list", list);
        result.setGonghao(gonghao);
        oimsLogService.saveOimsLog(result, 1);
        JSONWriterUtils.writeJSONObj(map, response);
    }

    /**
     * 供体信息新增或者修改
     */
    @RequestMapping(value = "/saveGongTi.htm", method = RequestMethod.POST)
    public void saveGongTi(GongTiSearchForm form, HttpServletRequest request,
                            HttpServletResponse response) {
        HttpSession session = request.getSession();
        String gonghao = (session.getAttribute("gonghao") != null) ? session
                .getAttribute("gonghao").toString() : null;
        MyResult result = new MyResult();
        String doing = "";
        try {
            if (form.getId()==null) {
                doing = "供体信息新增";
                form.setInsertUser(gonghao);// 添加人工号
                form.setInsertTime(sdf.format(new Date()));//添加时间
                this.gtService.saveGongTi(form);
                doState = 1;
                message = "操作成功";
            } else {
                doing = "供体信息修改";
                form.setUpdateUser(gonghao);// 记录人
                form.setUpdateTime(sdf.format(new Date()));
                this.gtService.updateGongTi(form);
                doState = 1;
                message = "操作成功";
            }
        } catch (Exception e) {
            doState = 0;// 操作失败
            message = "操作失败";
            e.printStackTrace();
        }
        result.setDoing(doing);
        result.setState(doState);
        result.setMessage(message);
        result.setGonghao(gonghao);
        oimsLogService.saveOimsLog(result, OimsCategoryConfig.SAVELOG_LEVEL);
        JSONWriterUtils.writeJSONObj(result, response);
    }

    /**
     * 删除供体信息
     */
    @RequestMapping(value="/deleteGongTi.htm",method=RequestMethod.POST)
    public void deleteGongTi(Long id,HttpServletRequest request,HttpServletResponse response){
        MyResult result = new MyResult();
        result.setDoing("删除供体信息！");
        try{
            gtService.deleteGongTi(id);
            result.setState(1);
        }catch(Exception e){
            result.setMessage(e.getMessage());
        }
        JSONWriterUtils.writeJSONObj(result, response);
    }
}
