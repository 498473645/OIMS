package cn.com.oims.dao;

import cn.com.oims.dao.pojo.FollowedUp;

public interface IFollowedUpDao {
  void save(FollowedUp paramFollowedUp);
  
  void update(FollowedUp paramFollowedUp);
  
  FollowedUp getFollowedUpByVisitId(Long paramLong);
}
