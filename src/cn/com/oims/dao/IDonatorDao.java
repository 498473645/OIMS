package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Donator;
import cn.com.oims.web.form.GongTiSearchForm;
import com.codesnet.common.Page;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * @author: 黄浩
 * @date: 2020/8/17.
 */
public interface IDonatorDao extends BaseDao{

    List<Map<String, Object>> findGongTiList(GongTiSearchForm form, Page page);

    void deleteGongTi(Object donator);

    Donator getGongTi(Long id);

    Serializable saveGongTi(Donator donator);

    void updateGongTi(Donator donator);
}
