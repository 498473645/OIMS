package cn.com.oims.web.controller;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.pojo.CorneaRecord;
import cn.com.oims.service.ICorneaRecordService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.web.form.CorneaRecordForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: 黄浩
 * @date: 2020/9/4.
 */
@Controller
@RequestMapping("jiaomoyizhi")
public class CorneaRecordController extends BaseController{

    private int doState = 1;// 操作执行状态，1表示成功
    private String doing = "";// 描述此操作
    private String message = "";// 操作执行结果的描述
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    @Autowired
    private ICorneaRecordService corneaRecordService;

    @Autowired
    private IOimsLogService oimsLogService;

    /**
     * 根据患者id显示病历信息
     */
    @RequestMapping(value="/queryCorneaRecordByPatientNo.htm", method= RequestMethod.POST)
    public void queryCorneaRecordByPatientNo(String patientNo, HttpServletRequest request, HttpServletResponse response){
        MyResult result = new MyResult();
        result.setDoing("根据患者id显示病历信息!");
        HttpSession session = request.getSession();
        String gonghao = (session.getAttribute("gonghao") != null) ? session
                .getAttribute("gonghao").toString() : null;
        List<CorneaRecord> corneaRecords = corneaRecordService.queryCorneaRecordByPatientNo(patientNo);
        Map map = new HashMap();
        map.put("list", corneaRecords);
        result.setGonghao(gonghao);
        oimsLogService.saveOimsLog(result, 1);
        JSONWriterUtils.writeJSONObj(map, response);
    }

    /**
     * 角膜移植病历单
     */
    @RequestMapping(value = "/saveCorneaRecord.htm", method = RequestMethod.POST)
    public void saveCorneaRecord(CorneaRecordForm form, HttpServletRequest request,
                                 HttpServletResponse response) {
        HttpSession session = request.getSession();
        String gonghao = (session.getAttribute("gonghao") != null) ? session
                .getAttribute("gonghao").toString() : null;
        MyResult result = new MyResult();
        String doing = "";
        try {
            doing = "角膜移植病历单";
            CorneaRecord corneaRecord = corneaRecordService.getCorneaRecord(form.getId());
            if (corneaRecord == null) {
//            form.setInsertUser(gonghao);// 添加人工号
                form.setInsertTime(sdf.format(new Date()));//添加时间
                this.corneaRecordService.saveCorneaRecord(form);
                doState = 1;
                message = "操作成功";
            } else {
                form.setUpdateTime(sdf.format(new Date()));//修改时间
                this.corneaRecordService.updateCorneaRecord(form);
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
}
