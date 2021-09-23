package cn.com.oims.service.impl;

import cn.com.oims.dao.IDonatorDao;
import cn.com.oims.dao.pojo.Donator;
import cn.com.oims.service.IDonatorService;
import cn.com.oims.web.form.GongTiSearchForm;
import com.codesnet.common.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

/**
 * @author: 黄浩
 * @date: 2020/8/17.
 */
@Service
public class DonatorServiceImpl implements IDonatorService {

    @Autowired
    private IDonatorDao GtDao;
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public List<Map<String, Object>> findGongTiList(GongTiSearchForm form, Page page) {
        return GtDao.findGongTiList(form,page);
    }

    @Override
    @Transactional
    public void deleteGongTi(Long id) {
        Donator donator = GtDao.getGongTi(id);
        if (donator != null) {
            GtDao.deleteGongTi(donator);
        }
    }

    @Override
    public Serializable saveGongTi(GongTiSearchForm form) {
        Donator donator = formToDonator(form);
        try {
            if (form.getInsertTime()!=null && form.getInsertTime()!="") {
                donator.setInsert_Time(sdf.parse(form.getInsertTime()));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        donator.setInsert_User(form.getInsertUser());
        return GtDao.saveGongTi(donator);
    }

    @Override
    public Donator queryGongTiById(Long id) {
        return GtDao.getGongTi(id);
    }

    @Override
    public void updateGongTi(GongTiSearchForm form) {
        Donator donator = formToDonator(form);
        donator.setId(form.getId());
        try {
            donator.setUpdate_Time(sdf.parse(form.getUpdateTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        donator.setUpdate_User(form.getUpdateUser());
        GtDao.updateGongTi(donator);
    }

    private Donator formToDonator (GongTiSearchForm form) {
        Donator donator = new Donator();
        donator.setEye_bank(form.getEyeBank());
        donator.setBank_tel(form.getBankTel());
        donator.setBank_mobile(form.getBankMobile());
        donator.setBank_email(form.getBankEmail());
        donator.setPatient_Id(form.getPatientId());
        donator.setDonator_No(form.getDonatorNo());
        donator.setDonator_Name(form.getDonatorName());
        donator.setDonator_Sex(form.getDonatorSex());
        donator.setDonator_Age(form.getDonatorAge());
        donator.setDonator_nationality(form.getDonatorNationality());
        donator.setDonator_id_type(form.getDonatorIdType());
        donator.setDonator_id_No(form.getDonatorIdNo());
        donator.setBelong_hospital(form.getBelongHospital());
        donator.setNow_address(form.getNowAddress());
        donator.setFamily_name(form.getFamilyName());
        donator.setFamily_relation(form.getFamilyRelation());
        donator.setDonator_intension(form.getDonatorIntension());
        donator.setExpress_intension(form.getExpressIntension());
        donator.setFamily_intension(form.getFamilyIntension());
        donator.setAnti_hiv(form.getAntiHiv());
        donator.setHbs_ag(form.getHbsAg());
        donator.setAnti_hbs(form.getAntiHbs());
        donator.setAnti_hbc(form.getAntiHbc());
        donator.setAnti_hcv(form.getAntiHcv());
        donator.setVenereal_disease(form.getVenerealDisease());
        donator.setHpi(form.getHpi());
        donator.setFamily_history(form.getFamilyHistory());
        donator.setPrevious_history(form.getPreviousHistory());
        donator.setPersonal_history(form.getPersonalHistory());
        try {
            if (form.getDeathTime()!=null && form.getDeathTime()!="") {
                donator.setDeath_time(sdf.parse(form.getDeathTime()));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        donator.setDeath_reason(form.getDeathReason());
        donator.setTake_department(form.getTakeDepartment());
        donator.setMaterial_Type(form.getMaterialType());
        try {
            if (form.getTakeTime()!=null && form.getTakeTime()!="") {
                donator.setTake_Time(sdf.parse(form.getTakeTime()));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        donator.setTake_address(form.getTakeAddress());
        donator.setTake_members(form.getTakeMembers());
        donator.setTraffic_type(form.getTrafficType());
        donator.setCold_storage(form.getColdStorage());
        donator.setTransfer_type(form.getTransferType());
        donator.setCrystal_type(form.getCrystalType());
        donator.setEye_Type(form.getEyeType());
        donator.setIs_storaged(form.getIsStoraged());
        donator.setMaterial_no(form.getMaterialNo());
        try {
            if (form.getStorageTime()!=null && form.getStorageTime()!="") {
                donator.setStorage_time(sdf.parse(form.getStorageTime()));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        donator.setStorage_type(form.getStorageType());
        try {
            if (form.getConeaEvaluateTime()!=null && form.getConeaEvaluateTime()!="") {
                donator.setConea_evaluate_time(sdf.parse(form.getConeaEvaluateTime()));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        donator.setSclerotic_ring_width(form.getScleroticRingWidth());
        donator.setConea_diam(form.getConeaDiam());
        donator.setHyalomere_diam(form.getHyalomereDiam());
        donator.setCrystal_type(form.getCrystalType());
        donator.setEpithelium_smooth(form.getEpitheliumSmooth());
        donator.setStroma_clear(form.getStromaClear());
        donator.setDescemet_fold(form.getDescemetFold());
        donator.setEcd(form.getEcd());
        donator.setEndothelium_defect(form.getEndotheliumDefect());
        donator.setEndothelial_cell_thickness(form.getEndothelialCellThickness());
        donator.setApplicable_scope(form.getApplicableScope());
        donator.setObjective(form.getObjective());
        donator.setAllocation_Status(form.getAllocationStatus());
        donator.setProcessing_results(form.getProcessingResults());
        return donator;
    }
}
