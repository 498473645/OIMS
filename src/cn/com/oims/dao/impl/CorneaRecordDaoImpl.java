package cn.com.oims.dao.impl;

import cn.com.oims.dao.ICorneaRecordDao;
import cn.com.oims.dao.pojo.CorneaRecord;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

/**
 * @author: 黄浩
 * @date: 2020/9/4.
 */
@Repository
public class CorneaRecordDaoImpl extends BaseDaoImpl implements ICorneaRecordDao {

    @Override
    public Serializable saveCorneaRecord(CorneaRecord corneaRecord) {
       return this.hibernateTemplate.save(corneaRecord);
    }

    @Override
    public void updateCorneaRecord(CorneaRecord corneaRecord) {
        this.hibernateTemplate.update(corneaRecord);
    }

    @Override
    public List<CorneaRecord> queryCorneaRecordByPatientNo(String patientNo) {
        String hql = "select new map("
                + "c.id as id,"
                + "c.RECORD_NO as recordNo,"
                + "c.INSERT_TIME as insertTime,"
                + "c.INSERT_USER as insertUser,"
                + "c.UPDATE_TIME as updateTime,"
                + "c.UPDATE_USER as updateUser,"
                + "c.PATIENT_NO as patientNo,"
                + "c.NAME as name,"
                + "c.SEX as sex,"
                + "c.AGE as age,"
                + "c.VISIT_DATE as visitDate,"
                + "c.REMARK as remark,"
                + "c.COMPLAINT_L as complaintL,"
                + "c.COMPLAINT_R as complaintR,"
                + "c.VISION_L as visionL,"
                + "c.VISION_R as visionR,"
                + "c.CONJUNCTIVA_L as conjunctivaL,"
                + "c.CONJUNCTIVA_R as conjunctivaR,"
                + "c.CORNEA_L as corneaL,"
                + "c.CORNEA_R as corneaR,"
                + "c.ANTERIOR_CHAMBER_L as anteriorChamberL,"
                + "c.ANTERIOR_CHAMBER_R as anteriorChamberR,"
                + "c.PUPIL_L as pupilL,"
                + "c.PUPIL_R as pupilR,"
                + "c.CRYSTAL_L as crystalL,"
                + "c.CRYSTAL_R as crystalR,"
                + "c.EYE_GROUND_L as eyeGroundL,"
                + "c.EYE_GROUND_R as eyeGroundR,"
                + "c.IOP_L as iopL,"
                + "c.IOP_R as iopR) from CorneaRecord c";
        hql += "  where c.PATIENT_NO =" + patientNo;
        return this.hibernateTemplate.find(hql);
    }

    @Override
    public CorneaRecord getCorneaRecord(Long id) {
        return hibernateTemplate.get(CorneaRecord.class, id);
    }
}
