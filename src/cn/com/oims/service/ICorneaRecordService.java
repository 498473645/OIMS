package cn.com.oims.service;

import cn.com.oims.dao.pojo.CorneaRecord;
import cn.com.oims.web.form.CorneaRecordForm;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * @author: 黄浩
 * @date: 2020/9/4.
 */
@Service
public interface ICorneaRecordService {

    Serializable saveCorneaRecord(CorneaRecordForm form);

    List<CorneaRecord> queryCorneaRecordByPatientNo(String patientNo);

    void updateCorneaRecord(CorneaRecordForm form);

    CorneaRecord getCorneaRecord(Long id);
}
