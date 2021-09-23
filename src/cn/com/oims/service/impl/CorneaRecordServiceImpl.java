package cn.com.oims.service.impl;

import cn.com.oims.dao.ICorneaRecordDao;
import cn.com.oims.dao.pojo.CorneaRecord;
import cn.com.oims.service.ICorneaRecordService;
import cn.com.oims.web.form.CorneaRecordForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author: 黄浩
 * @date: 2020/9/4.
 */
@Service
public class CorneaRecordServiceImpl implements ICorneaRecordService {

    @Autowired
    private ICorneaRecordDao corneaRecordDao;
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public Serializable saveCorneaRecord(CorneaRecordForm form) {
        CorneaRecord corneaRecord = corneaRecordFormToCornearecord(form);
        String RECORD_NO = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        corneaRecord.setRECORD_NO(RECORD_NO);
        try {
            corneaRecord.setINSERT_TIME(sdf.parse(form.getInsertTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        corneaRecord.setINSERT_USER(form.getInsertUser());
        return corneaRecordDao.saveCorneaRecord(corneaRecord);
    }

    @Override
    public List<CorneaRecord> queryCorneaRecordByPatientNo(String patientNo) {
        return corneaRecordDao.queryCorneaRecordByPatientNo(patientNo);
    }

    @Override
    public void updateCorneaRecord(CorneaRecordForm form) {
        CorneaRecord corneaRecord = corneaRecordFormToCornearecord(form);
        corneaRecord.setId(form.getId());
        corneaRecord.setUPDATE_USER(form.getUpdateUser());
        try {
            corneaRecord.setUPDATE_TIME(sdf.parse(form.getUpdateTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        corneaRecordDao.updateCorneaRecord(corneaRecord);
    }

    @Override
    public CorneaRecord getCorneaRecord(Long id) {
        return corneaRecordDao.getCorneaRecord(id);
    }

    private CorneaRecord corneaRecordFormToCornearecord (CorneaRecordForm form) {
        CorneaRecord corneaRecord = new CorneaRecord();
        corneaRecord.setPATIENT_NO(form.getPatientNo());
        corneaRecord.setNAME(form.getName());
        corneaRecord.setSEX(form.getSex());
        corneaRecord.setAGE(form.getAge());
        try {
            corneaRecord.setVISIT_DATE(sdf.parse(form.getVisitDate()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        corneaRecord.setCOMPLAINT_R(form.getComplaintR());
        corneaRecord.setCOMPLAINT_L(form.getComplaintL());
        corneaRecord.setVISION_R(form.getVisionR());
        corneaRecord.setVISION_L(form.getVisionL());
        corneaRecord.setCONJUNCTIVA_R(form.getConjunctivaR());
        corneaRecord.setCONJUNCTIVA_L(form.getConjunctivaL());
        corneaRecord.setCORNEA_R(form.getCorneaR());
        corneaRecord.setCORNEA_L(form.getCorneaL());
        corneaRecord.setANTERIOR_CHAMBER_R(form.getAnteriorChamberR());
        corneaRecord.setANTERIOR_CHAMBER_L(form.getAnteriorChamberL());
        corneaRecord.setPUPIL_R(form.getPupilR());
        corneaRecord.setPUPIL_L(form.getPupilL());
        corneaRecord.setCRYSTAL_R(form.getCrystalR());
        corneaRecord.setCRYSTAL_L(form.getCrystalL());
        corneaRecord.setEYE_GROUND_R(form.getEyeGroundR());
        corneaRecord.setEYE_GROUND_L(form.getEyeGroundL());
        corneaRecord.setIOP_R(form.getIopR());
        corneaRecord.setIOP_L(form.getIopL());
        corneaRecord.setREMARK(form.getRemark());
        return corneaRecord;
    }
}
