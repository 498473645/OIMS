package cn.com.oims.service;

import cn.com.oims.dao.pojo.Donator;
import cn.com.oims.web.form.GongTiSearchForm;
import com.codesnet.common.Page;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * @author: 黄浩
 * @date: 2020/8/17.
 */
@Service
public interface IDonatorService {

    List<Map<String, Object>> findGongTiList(GongTiSearchForm form, Page page);

    void deleteGongTi(Long id);

    Serializable saveGongTi(GongTiSearchForm form);

    Donator queryGongTiById(Long id);

    void updateGongTi(GongTiSearchForm form);
}
