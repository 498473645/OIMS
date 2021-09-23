package cn.com.oims.service.impl;

import cn.com.oims.dao.IDoneeDao;
import cn.com.oims.dao.pojo.Donee;
import cn.com.oims.service.IDoneeService;
import cn.com.oims.web.form.ShouTiSearchForm;
import com.codesnet.common.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

/**
 * @author: 黄浩
 * @date: 2020/8/20.
 */
@Service
public class DoneeServiceImpl implements IDoneeService {

    @Autowired
    private IDoneeDao doneeDao;
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public List<Map<String, Object>> findShouTiList(ShouTiSearchForm form, Page page) {
        return doneeDao.findShouTiList(form,page);
    }

    @Override
    public Donee queryShouTiById(Long id) {
        return doneeDao.getShouTi(id);
    }

    @Override
    public void deleteShouTi(Long id) {
        Donee donee = doneeDao.getShouTi(id);
        if (donee != null) {
            doneeDao.deleteShouTi(donee);
        }
    }

    @Override
    public Serializable saveShouTi(ShouTiSearchForm form) {
        Donee donee = formToDonee(form);
        donee.setInsert_user(form.getInsertUser());
        try {
            donee.setInsert_time(sdf.parse(form.getInsertTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return doneeDao.saveShouTi(donee);
    }

    @Override
    public void updateShouTi(ShouTiSearchForm form) {
        Donee donee = formToDonee(form);
        donee.setId(form.getId());
        donee.setUpdate_user(form.getUpdateUser());
        try {
            donee.setUpdate_time(sdf.parse(form.getUpdateTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        doneeDao.updateShouTi(donee);
    }

    @Override
    public  List<Donee> queryShouTiByDonatorNo(Integer donatorNo) {
        return doneeDao.queryShouTiByDonatorNo(donatorNo);
    }

    private Donee formToDonee (ShouTiSearchForm form) {
        Donee donee = new Donee();
        donee.setPatient_Id(form.getPatientId());
        donee.setDonee_Name(form.getDoneeName());
        donee.setDonee_Sex(form.getDoneeSex());
        donee.setDonee_Age(form.getDoneeAge());
        donee.setDonee_tel(form.getDoneeTel());
        donee.setDonee_address(form.getDoneeAddress());
        try {
            donee.setOperation_rig_date(sdf.parse(form.getOperationRigDate()));
            donee.setArrive_date(sdf.parse(form.getArriveDate()));
            donee.setMigration_time(sdf.parse(form.getMigrationTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        donee.setDonor_type(form.getDonorType());
        donee.setOperation_mode(form.getOperationMode());
        donee.setMigration_status(form.getMigrationStatus());
        donee.setDiagnose(form.getDiagnose());
        donee.setDonator_no(form.getDonatorNo());
        donee.setDonator_name(form.getDoneeName());
        donee.setDonator_sex(form.getDonatorSex());
        donee.setDonator_age(form.getDonatorAge());
        return donee;
    }
}
