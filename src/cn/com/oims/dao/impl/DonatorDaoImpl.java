package cn.com.oims.dao.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.IDonatorDao;
import cn.com.oims.dao.pojo.Donator;
import cn.com.oims.web.form.GongTiSearchForm;
import com.codesnet.common.Page;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: 黄浩
 * @date: 2020/8/17.
 */
@Component
public class DonatorDaoImpl extends BaseDaoImpl implements IDonatorDao {


    @Override
    public  List<Map<String, Object>> findGongTiList(GongTiSearchForm form, Page page) {
        Map<String, Date> map = new HashMap<String, Date>();
        String factorSql = this.getQueryCondition(form, map);
        String hql = "select new map("
                + "d.id as id,"
                + "d.patient_Id as patientId,"
                + "d.donator_No as donatorNo,"
                + "d.donator_Name as donatorName,"
                + "d.donator_Sex as donatorSex,"
                + "d.donator_Age as donatorAge,"
                + "d.material_Type as materialType,"
                + "d.take_Time as takeTime,"
                + "d.eye_Type as eyeType,"
                + "d.allocation_Status as allocationStatus,"
                + "d.insert_Time as insertTime,"
                + "d.insert_User as insertUser,"
                + "d.update_Time as updateTime,"
                + "d.update_User as updateUser,"
                + "d.donator_id_type as donatorIdType,"
                + "d.donator_id_No as donatorIdNo,"
                + "d.belong_hospital as belongHospital,"
                + "d.family_name as familyName,"
                + "d.take_department as takeDepartment,"
                + "d.material_no as materialNo,"
                + "d.processing_results as processingResults) from Donator d";
        hql += "  where " + factorSql + " order by d.take_Time";
        int size = 0;
        List list = null;
        if (!map.isEmpty()) {
            list = this.findList(hql, map);
            if (list != null) {
                size = list.size();
            }
        } else {
            list = this.hibernateTemplate.find(hql);
            if (list != null) {
                size = list.size();
            }
        }
        page.setRowsCount(size);
        page.init();

        int startRow = page.getStartRow();
        int pageSize = page.getPageSize();
        if (!map.isEmpty()) {
            list = this.getListForPage(hql, startRow, pageSize, map);
        } else {
            list = this.getListForPage(hql, startRow, pageSize);
        }
        return list;

    }

    @Override
    public Donator getGongTi(Long id) {
        return hibernateTemplate.get(Donator.class, id);
    }

    @Override
    public Serializable saveGongTi(Donator donator) {
        return this.hibernateTemplate.save(donator);
    }

    @Override
    public void updateGongTi(Donator donator) {
        this.hibernateTemplate.update(donator);
    }

    @Override
    public void deleteGongTi(Object donator) {
        hibernateTemplate.delete(donator);
    }

    // 查询条件拼装(整理)
    private String getQueryCondition(GongTiSearchForm form,
                                     Map<String, Date> map) {
        String factorSql = " 1=1 ";
        if (form.getSearch() != null && !form.getSearch().isEmpty()) {// 病历号或者患者姓名
            factorSql += " and d.donator_No like '" + form.getSearch()
                    + "' or d.donator_Name like '%" + form.getSearch()
                    + "%'";
        }
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        if (form.getDonatorNo() != null
                && !form.getDonatorNo().equals("")) {// 供体编号
            factorSql += " and d.donator_No in (" + form.getDonatorNo() + ")";
        }
        if (form.getPatientId() != null
                && !form.getPatientId().equals("")) {// 患者id
            factorSql += " and d.patient_Id in (" + form.getPatientId() + ")";
        }
        if (Utils.strIsNotEmpty(form.getDonatorName())) {// 姓名
            factorSql += " and d.donator_Name like '%" + form.getDonatorName() + "%'";
        }
        if (form.getDonatorSex() != null
                && !form.getDonatorSex().equals("")) {// 性别
            factorSql += " and d.donator_Sex in (" + form.getDonatorSex() + ")";
        }
        if (form.getDonatorIdType() != null
                && !form.getDonatorIdType().equals("")) {// 证件类型d
            factorSql += " and d.donator_id_type in (" + form.getDonatorIdType() + ")";
        }
        if (form.getDonatorIdNo() != null && !form.getDonatorIdNo().isEmpty()) {// 证件号码
            factorSql += " and d.donator_id_No like '%" + form.getDonatorIdNo()
                    + "%'";
        }
        if (form.getBelongHospital() != null && !form.getBelongHospital().isEmpty()) {// 所属医院
            factorSql += " and d.belong_hospital in (" + form.getBelongHospital() + ")";
        }
        if (Utils.strIsNotEmpty(form.getFamilyName())) {// 家属姓名
            factorSql += " and d.family_name like '%" + form.getFamilyName()
                    + "%'";
        }
        if (Utils.strIsNotEmpty(form.getTakeDepartment())) {// 获取单位名称
            factorSql += " and d.take_department like '%" + form.getTakeDepartment() + "%'";
        }
        if (form.getMaterialType() != null
                && !form.getMaterialType().equals("")) {// 获取材料类型
            factorSql += " and d.material_Type in (" + form.getMaterialType() + ")";
        }

        if (Utils.strIsNotEmpty(form.getTakeTime())) {// 获取时间
            factorSql += "and d.take_Time = to_date('" + form.getTakeTime() + "','yyyy/mm/dd')";
        }
        if (form.getEyeType() != null
                && !form.getEyeType().equals("")) {// 获取眼别
            factorSql += " and d.eye_Type in (" + form.getEyeType() + ")";
        }
        if (Utils.strIsNotEmpty(form.getMaterialNo())) {// 角膜材料编号
            factorSql += "and d.material_no like '%" + form.getMaterialNo() + "%'";
        }
        if (form.getAllocationStatus() != null
                && !form.getAllocationStatus().equals("")) {// 分配状态
            factorSql += " and d.allocation_Status in (" + form.getAllocationStatus() + ")";
        }
        if (form.getProcessingResults() != null
                && !form.getProcessingResults().equals("")) {// 处理结果
            factorSql += " and d.processing_results in (" + form.getProcessingResults() + ")";
        }
        return factorSql;
    }

}
