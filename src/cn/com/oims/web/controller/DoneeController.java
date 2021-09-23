package cn.com.oims.web.controller;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.pojo.Donee;
import cn.com.oims.service.IDoneeService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.web.form.ShouTiSearchForm;
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
 * @date: 2020/8/20.
 */
@Controller
@RequestMapping("shouti")
public class DoneeController extends BaseController{

    private int doState = 1;// 操作执行状态，1表示成功
    private String doing = "";// 描述此操作
    private String message = "";// 操作执行结果的描述
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    @Autowired
    private IDoneeService doneeService;

    @Autowired
    private IOimsLogService oimsLogService;

    /**
     * 受体信息列表
     * @param form
     * @param page
     */
    @RequestMapping(value="/findShouTiList.htm", method= RequestMethod.POST)
    public void findShouTiList(ShouTiSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response){
        MyResult result = new MyResult();
        result.setDoing("获取受体信息列表!");
        HttpSession session = request.getSession();
        String gonghao = (session.getAttribute("gonghao") != null) ? session
                .getAttribute("gonghao").toString() : null;
        List<Map<String, Object>> list = doneeService.findShouTiList(form,page);
        session.setAttribute("searchForm", form);
        Map map = new HashMap();
        map.put("list", list);
        map.put("page", page);
        result.setGonghao(gonghao);
        oimsLogService.saveOimsLog(result, 1);
        JSONWriterUtils.writeJSONObj(map, response);
    }

    /**
     * 查看受体信息详情
     */
    @RequestMapping(value="/queryShouTiById.htm", method= RequestMethod.POST)
    public void queryShouTiById(Long id, HttpServletRequest request, HttpServletResponse response){
        MyResult result = new MyResult();
        result.setDoing("查看受体信息详情!");
        HttpSession session = request.getSession();
        String gonghao = (session.getAttribute("gonghao") != null) ? session
                .getAttribute("gonghao").toString() : null;
        List list = new ArrayList();
        Donee donee = doneeService.queryShouTiById(id);
        list.add(donee);
        Map map = new HashMap();
        map.put("list", list);
        result.setGonghao(gonghao);
        oimsLogService.saveOimsLog(result, 1);
        JSONWriterUtils.writeJSONObj(map, response);
    }

    /**
     * 根据供体编号查看受体信息详情
     */
    @RequestMapping(value="/queryShouTiByDonatorNo.htm", method= RequestMethod.POST)
    public void queryShouTiByDonatorNo(Integer donatorNo, HttpServletRequest request, HttpServletResponse response){
        MyResult result = new MyResult();
        result.setDoing("根据供体编号查看受体信息详情!");
        HttpSession session = request.getSession();
        String gonghao = (session.getAttribute("gonghao") != null) ? session
                .getAttribute("gonghao").toString() : null;
        List<Donee> donee = doneeService.queryShouTiByDonatorNo(donatorNo);
        Map map = new HashMap();
        map.put("list", donee);
        result.setGonghao(gonghao);
        oimsLogService.saveOimsLog(result, 1);
        JSONWriterUtils.writeJSONObj(map, response);
    }

    /**
     * 受体信息新增或者修改
     */
    @RequestMapping(value = "/saveShouTi.htm", method = RequestMethod.POST)
    public void saveShouTi(ShouTiSearchForm form, HttpServletRequest request,
                            HttpServletResponse response) {
        HttpSession session = request.getSession();
        String gonghao = (session.getAttribute("gonghao") != null) ? session
                .getAttribute("gonghao").toString() : null;
        MyResult result = new MyResult();
        String doing = "";
        try {
            if (form.getId()==null) {
                doing = "受体信息新增";
                form.setInsertUser(gonghao);// 添加人工号
                form.setInsertTime(sdf.format(new Date()));//添加时间
                this.doneeService.saveShouTi(form);
                doState = 1;
                message = "操作成功";
            } else {
                doing = "受体信息修改";
                form.setUpdateUser(gonghao);// 记录人
                form.setUpdateTime(sdf.format(new Date()));
                this.doneeService.updateShouTi(form);
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
     * 删除受体信息
     */
    @RequestMapping(value="/deleteShouTi.htm",method=RequestMethod.POST)
    public void deleteShouTi(Long id,HttpServletRequest request,HttpServletResponse response){
        MyResult result = new MyResult();
        result.setDoing("删除受体信息！");
        try{
            doneeService.deleteShouTi(id);
            result.setState(1);
        }catch(Exception e){
            result.setMessage(e.getMessage());
        }
        JSONWriterUtils.writeJSONObj(result, response);
    }
}
