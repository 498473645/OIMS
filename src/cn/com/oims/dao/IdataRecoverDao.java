package cn.com.oims.dao;

public interface IdataRecoverDao extends BaseDao {
  String executeRecover(String paramString, String[] paramArrayOfString);
}
