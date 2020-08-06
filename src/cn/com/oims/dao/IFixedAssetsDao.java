package cn.com.oims.dao;

import cn.com.oims.dao.pojo.FixedAssets;
import cn.com.oims.dao.pojo.MaintainRecord;
import cn.com.oims.web.form.FixedAssetsSearchForm;
import com.codesnet.common.Page;
import java.util.List;

public interface IFixedAssetsDao extends BaseDao {
  List<FixedAssets> findFixedAssets(FixedAssetsSearchForm paramFixedAssetsSearchForm, Page paramPage);
  
  FixedAssets getFixedAssets(Integer paramInteger);
  
  void delFixedAssets(FixedAssets paramFixedAssets);
  
  void saveOrUpdateFixedAssets(FixedAssets paramFixedAssets);
  
  MaintainRecord getMaintainRecord(Long paramLong);
  
  void saveOrUpdateMaintainRecord(MaintainRecord paramMaintainRecord);
  
  List<MaintainRecord> findMaintainRecords(Integer paramInteger);
  
  void delMaintainRecord(MaintainRecord paramMaintainRecord);
  
  void updateFixedAssets(FixedAssets paramFixedAssets);
  
  void saveFixedAssets(FixedAssets paramFixedAssets);
  
  List<FixedAssets> findFixedAssetsList(FixedAssetsSearchForm paramFixedAssetsSearchForm, Page paramPage);
  
  FixedAssets getFixedAssetsByNo(String paramString);
}
