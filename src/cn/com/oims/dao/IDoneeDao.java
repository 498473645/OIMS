package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Donee;
import cn.com.oims.web.form.ShouTiSearchForm;
import com.codesnet.common.Page;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * @author: 黄浩
 * @date: 2020/8/20.
 */
public interface IDoneeDao extends BaseDao{

    List<Map<String, Object>> findShouTiList(ShouTiSearchForm form, Page page);

    void deleteShouTi(Object donee);

    Donee getShouTi(Long id);

    Serializable saveShouTi(Donee donee);

    void updateShouTi(Donee donee);

    List<Donee> queryShouTiByDonatorNo(Integer donatorNo);
}
