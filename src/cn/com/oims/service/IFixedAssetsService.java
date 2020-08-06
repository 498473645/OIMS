package cn.com.oims.service;

import cn.com.oims.dao.pojo.FixedAssets;
import cn.com.oims.dao.pojo.MaintainRecord;
import cn.com.oims.web.form.FixedAssetsSearchForm;
import cn.com.oims.web.form.MaintainRecordForm;
import com.codesnet.common.Page;
import java.io.File;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IFixedAssetsService {
  Map<String, Object> findFixedAssets(FixedAssetsSearchForm paramFixedAssetsSearchForm, Page paramPage);
  
  void saveOrUpdateFixedAssets(FixedAssets paramFixedAssets, String paramString);
  
  FixedAssets getFixedAssetsById(Integer paramInteger);
  
  void delFixedAsset(Integer paramInteger);
  
  boolean setScrapFlag(Integer paramInteger, Boolean paramBoolean);
  
  Map<String, Object> findFixedAssetsInMaintainTime(int paramInt, Page paramPage);
  
  void saveOrUpdateMaintainRecord(MaintainRecordForm paramMaintainRecordForm, String paramString);
  
  List<MaintainRecord> findMaintainRecords(Integer paramInteger);
  
  MaintainRecord getMaintainRecordById(Long paramLong);
  
  void delMaintainRecord(Long paramLong);
  
  void updateFixedAssets(FixedAssets paramFixedAssets);
  
  void saveFixedAssets(FixedAssets paramFixedAssets);
  
  Map<String, Object> findFixedAssetsList(FixedAssetsSearchForm paramFixedAssetsSearchForm, Page paramPage);
  
  int[] importFixedAssetsFromExcel(File paramFile, String paramString);
}
