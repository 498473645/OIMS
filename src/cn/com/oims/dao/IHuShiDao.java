package cn.com.oims.dao;

import cn.com.oims.dao.pojo.YanYa;
import com.codesnet.common.Page;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IHuShiDao extends BaseDao {
  int counts();
  
  List<YanYa> findAllYanYaByPage(Page paramPage);
}
