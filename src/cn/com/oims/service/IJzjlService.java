package cn.com.oims.service;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.Page;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

public interface IJzjlService {
  List<Jzjl> findJzjlListByCategoryIdAndJiuzhenId(Integer paramInteger, Long paramLong);
  
  List<HuanZheXinXi> findTodayHuanZhe(Page paramPage, HuanZheSearchForm paramHuanZheSearchForm) throws Exception;
  
  List<Jzjl> getJzjlListByJiuzhenId(String paramString);
  
  void saveOrUpdateMR(Jzjl paramJzjl, HttpServletRequest paramHttpServletRequest);
}
