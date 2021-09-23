package cn.com.oims.service;

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
public interface IDoneeService {

    /**
     * 受体信息列表
     */
    List<Map<String, Object>> findShouTiList(ShouTiSearchForm form, Page page);

    /**
     * 根据id查看受体信息
     * @param id
     * @return
     */
    Donee queryShouTiById(Long id);

    /**
     * 删除受体信息
     */
    void deleteShouTi(Long id);

    Serializable saveShouTi(ShouTiSearchForm form);

    void updateShouTi(ShouTiSearchForm form);

    List<Donee> queryShouTiByDonatorNo(Integer donatorNo);
}
