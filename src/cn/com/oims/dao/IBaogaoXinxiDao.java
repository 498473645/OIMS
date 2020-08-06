package cn.com.oims.dao;

import com.codesnet.common.Page;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IBaogaoXinxiDao extends BaseDao {
  List findBaogaoXinxiByPage(Page paramPage);
  
  int counts();
}
