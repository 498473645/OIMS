package cn.com.oims.webservice;

import cn.com.oims.dao.pojo.DrugDict;
import cn.com.oims.dao.pojo.EMRChufangQindan;
import cn.com.oims.dao.pojo.OutpPresc;
import cn.com.oims.webservice.pojo.PatientVistInfomation;
import cn.com.oims.webservice.pojo.ResponseObj;
import cn.com.oims.webservice.pojo.medicine.Drug;
import java.util.Date;
import java.util.List;
import javax.jws.WebService;

@WebService
public interface MedicineWebService {
  List<DrugDict> findMedicine(String paramString1, String paramString2, int paramInt1, int paramInt2);
  
  Float getMedicineStorage(String paramString);
  
  Float getMedicinePrice(String paramString);
  
  Integer getMaxItemNoBySerialNo(String paramString);
  
  void updateOutpPresc(OutpPresc paramOutpPresc);
  
  void deleteOutpOrder(String paramString);
  
  void deleteOutpPresc(OutpPresc paramOutpPresc);
  
  String findOutpOrderSerialNo(String paramString1, Date paramDate, String paramString2);
  
  Boolean isDeleteOutpPresc(OutpPresc paramOutpPresc);
  
  ResponseObj saveOrUpdateDrug(EMRChufangQindan paramEMRChufangQindan);
  
  List<Drug> findDrugStock(String paramString);
  
  Integer saveOutpPrescList(PatientVistInfomation paramPatientVistInfomation, List<OutpPresc> paramList);
}
