package cn.com.oims.dao.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.IDoneeDao;
import cn.com.oims.dao.pojo.Donee;
import cn.com.oims.web.form.ShouTiSearchForm;
import com.codesnet.common.Page;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: 黄浩
 * @date: 2020/8/20.
 */
@Component
public class DoneeDaoImpl  extends BaseDaoImpl implements IDoneeDao {

    @Override
    public List<Map<String, Object>> findShouTiList(ShouTiSearchForm form, Page page) {
        Map<String, Date> map = new HashMap<String, Date>();
        String factorSql = this.getQueryCondition(form, map);
        String hql = "select new map("
                + "d.id as id,"
                + "d.patient_Id as patientId,"
                + "d.donee_Name as doneeName,"
                + "d.donee_Sex as doneeSex,"
                + "d.donee_Age as doneeAge,"
                + "d.donee_tel as doneeTel,"
                + "d.donee_address as doneeAddress,"
                + "d.operation_rig_date as operationRigDate,"
                + "d.arrive_date as arriveDate,"
                + "d.donor_type as donorType,"
                + "d.operation_mode as operationMode,"
                + "d.migration_status as migrationStatus,"
                + "d.migration_time as migrationTime,"
                + "d.diagnose as diagnose,"
                + "d.donator_no as donatorNo,"
                + "d.donator_name as donatorName,"
                + "d.donator_sex as donatorSex,"
                + "d.donator_age as donatorAge,"
                + "d.insert_time as insertTime,"
                + "d.insert_user as insertUser,"
                + "d.update_time as updateTime,"
                + "d.donee_id_type as doneeIdType,"
                + "d.donee_id_no as doneeIdNo,"
                + "d.update_user as updateUser) from Donee d";
        hql += "  where " + factorSql + " order by d.arrive_date";
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
    public void deleteShouTi(Object donne) {
        hibernateTemplate.delete(donne);
    }

    @Override
    public Donee getShouTi(Long id) {
        return hibernateTemplate.get(Donee.class, id);
    }

    @Override
    public Serializable saveShouTi(Donee donee) {
        return this.hibernateTemplate.save(donee);
    }

    @Override
    public void updateShouTi(Donee donee) {
        this.hibernateTemplate.update(donee);
    }

    @Override
    public List<Donee> queryShouTiByDonatorNo(Integer donatorNo) {
        String hql = "select new map("
                + "d.id as id,"
                + "d.patient_Id as patientId,"
                + "d.donee_Name as doneeName,"
                + "d.donee_Sex as doneeSex,"
                + "d.donee_Age as doneeAge,"
                + "d.donee_tel as doneeTel,"
                + "d.donee_address as doneeAddress,"
                + "d.operation_rig_date as operationRigDate,"
                + "d.arrive_date as arriveDate,"
                + "d.donor_type as donorType,"
                + "d.operation_mode as operationMode,"
                + "d.migration_status as migrationStatus,"
                + "d.migration_time as migrationTime,"
                + "d.diagnose as diagnose,"
                + "d.donator_no as donatorNo,"
                + "d.donator_name as donatorName,"
                + "d.donator_sex as donatorSex,"
                + "d.donator_age as donatorAge,"
                + "d.insert_time as insertTime,"
                + "d.insert_user as insertUser,"
                + "d.update_time as updateTime,"
                + "d.donee_id_type as doneeIdType,"
                + "d.donee_id_no as doneeIdNo,"
                + "d.update_user as updateUser) from Donee d";
        hql += "  where d.donator_no =" + donatorNo;
        return this.hibernateTemplate.find(hql);
    }

    // 查询条件拼装(整理)
    private String getQueryCondition(ShouTiSearchForm form,
                                     Map<String, Date> map) {
        String factorSql = " 1=1 ";
        if (form.getSearch() != null && !form.getSearch().isEmpty()) {// 病历号或者患者姓名
            factorSql += " and d.patient_Id like '" + form.getSearch()
                    + "' or d.donee_Name like '%" + form.getSearch()
                    + "%'";
        }

        if (Utils.strIsNotEmpty(form.getMigrationTime())) {// 移植时间
                factorSql += "and d.migration_time = to_date('" + form.getMigrationTime() + "','yyyy/mm/dd')";
        }
        if (form.getPatientId() != null
                && !form.getPatientId().equals("")) {// 患者id
            factorSql += " and d.patient_Id in (" + form.getPatientId() + ")";
        }
        if (Utils.strIsNotEmpty(form.getDoneeName())) {// 姓名
            factorSql += " and d.donee_Name like '%" + form.getDoneeName() + "%'";
        }
        if (form.getDoneeTel() != null
                && !form.getDoneeTel().equals("")) {// 联系电话
            factorSql += " and d.donee_tel in (" + form.getDoneeTel() + ")";
        }
        if (Utils.strIsNotEmpty(form.getOperationRigDate())) {// 登记日期
                factorSql += "and d.operation_rig_date = to_date('" + form.getOperationRigDate() + "','yyyy/mm/dd')";
        }
        if (form.getDonatorNo() != null
                && !form.getDonatorNo().equals("")) {// 供体编号
            factorSql += " and d.donator_no in (" + form.getDonatorNo() + ")";
        }
        if (form.getDonorType() != null
                && !form.getDonorType().equals("")) {// 供体类型
            factorSql += " and d.donor_type in (" + form.getDonorType() + ")";
        }
        if (form.getOperationMode() != null
                && !form.getOperationMode().equals("")) {// 拟手术方式
            factorSql += " and d.operation_mode in (" + form.getOperationMode() + ")";
        }
        return factorSql;
    }
}
