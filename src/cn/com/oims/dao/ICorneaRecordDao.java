package cn.com.oims.dao;

import cn.com.oims.dao.pojo.CorneaRecord;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

/**
 * @author: 黄浩
 * @date: 2020/9/4.
 */
@Repository
public interface ICorneaRecordDao {

    Serializable saveCorneaRecord(CorneaRecord corneaRecord);

    void updateCorneaRecord(CorneaRecord corneaRecord);

    List<CorneaRecord> queryCorneaRecordByPatientNo(String patientNo);

    CorneaRecord getCorneaRecord(Long id);

}
