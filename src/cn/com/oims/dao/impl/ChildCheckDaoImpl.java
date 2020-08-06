package cn.com.oims.dao.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.IChildCheckDao;
import cn.com.oims.dao.pojo.AChao;
import cn.com.oims.dao.pojo.Fzyy;
import cn.com.oims.dao.pojo.Fzyyjl;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.Pcao;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.XiaoErChuZhen;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.web.form.ChildSearchForm;
import cn.com.oims.web.form.ChildTiGeForm;
import cn.com.oims.web.form.FzyySearchForm;
import cn.com.oims.web.form.FzyyjlSearchForm;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.stereotype.Repository;

@Repository
public class ChildCheckDaoImpl extends BaseDaoImpl implements IChildCheckDao {
  private String clazzName = User.class.getSimpleName();
  
  private String classNameOfAChao = AChao.class.getSimpleName();
  
  private DetachedCriteria getDCOfAChao() {
    return DetachedCriteria.forClass(AChao.class);
  }
  
  public List<Map<String, Object>> findChildByConditionAndPage(Page page, ChildSearchForm csf) {
    int size = 0;
    String countHql = "select count(h.id) from HuanZheXinXi as h where h.id in (select x.hzid from XiaoErChuZhen as x) " + getQueryString(csf);
    size = count(countHql);
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String hql = "select new map(h.id as huanzheID,h.binglihao as patientID,h.xingming as name,h.shengri as birthday,h.dianhua as tel,h.shouji as mobile,(select  j.id  from Jiuzhen as j where j.huanzheId = h.id and  j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  ) as jiuzhenID,(select  j.tizhong  from Jiuzhen as j where j.huanzheId = h.id and  j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)) as weight,  (select  j.hzlxr from Jiuzhen as j where  j.huanzheId = h.id and j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  )as guardian ,(select  j.caozuoTime  from Jiuzhen as j where j.huanzheId = h.id and  j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  ) as caozuo_Time ) from HuanZheXinXi as h  where h.id in (select x.hzid from XiaoErChuZhen as x )" + 
      
      getQueryString(csf) + " order by caozuo_Time desc";
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  private String getQueryString(ChildSearchForm csf) {
    String queryString = "";
    if (csf.getHuanzheID() != null && !csf.getHuanzheID().isEmpty()) {
      queryString = String.valueOf(queryString) + "and h.id like '%" + csf.getHuanzheID() + "%'";
    } else if (csf.getPatientID() != null && !csf.getPatientID().isEmpty()) {
      queryString = String.valueOf(queryString) + " and h.binglihao = " + csf.getPatientID();
    } else if (csf.getSearch() != null && !csf.getSearch().isEmpty()) {
      queryString = String.valueOf(queryString) + " and (h.xingming like '%" + csf.getSearch() + "%' or h.binglihao like '%" + csf.getSearch() + "%' or (select  j.hzlxr from Jiuzhen as j where j.huanzheId =h.id and  j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)) like '%" + csf.getSearch() + "%')";
    } 
    return queryString;
  }
  
  public void saveChuZhen(XiaoErChuZhen xecz) {
    this.hibernateTemplate.save(xecz);
  }
  
  public XiaoErChuZhen getChuZhenByHzid(Long Hzid) {
    String hql = "from XiaoErChuZhen where hzid=" + Hzid;
    List<XiaoErChuZhen> list = this.hibernateTemplate.find(hql);
    XiaoErChuZhen xecz = (list.size() > 0) ? list.get(0) : null;
    return xecz;
  }
  
  public void updateChuZhen(XiaoErChuZhen xecz) {
    this.hibernateTemplate.update(xecz);
  }
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(User.class);
  }
  
  public Serializable savePcao(Pcao pcao) {
    return this.hibernateTemplate.save(pcao);
  }
  
  public void updatePcao(Pcao pcao) {
    this.hibernateTemplate.update(pcao);
  }
  
  public List<Pcao> findAllPcao() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public List<AChao> findAllAChao() {
    return this.hibernateTemplate.findByCriteria(getDCOfAChao());
  }
  
  public List<AChao> findAllAChaoByPage(Page p) {
    return null;
  }
  
  public int countByAChao() {
    return 0;
  }
  
  public AChao findAChaoByID(Serializable id) {
    return (AChao)this.hibernateTemplate.get(AChao.class, id);
  }
  
  public Serializable saveAChao(AChao aChao) {
    return this.hibernateTemplate.save(aChao);
  }
  
  public void updateAChao(AChao aChao) {
    this.hibernateTemplate.update(aChao);
  }
  
  public void deleteAChao(AChao aChao) {
    this.hibernateTemplate.delete(aChao);
  }
  
  public void deleteAChaoByID(Serializable id) {
    String sql = "delete from " + this.classNameOfAChao + " as a where a.id = " + id;
    executeUpdate(sql);
  }
  
  public List<Jzjl> showAllTgjc() {
    try {
      return this.hibernateTemplate.find("from Jzjl");
    } catch (Exception e) {
      System.out.println("error:" + e.getMessage());
      return null;
    } 
  }
  
  public Object updateTgjc(Jzjl jzjl) {
    this.hibernateTemplate.update(jzjl);
    return new Integer(1);
  }
  
  public Object addTgjc(Jzjl jzjl, ChildTiGeForm form) {
    return this.hibernateTemplate.save(jzjl);
  }
  
  public Jzjl showById(Long id) {
    return (Jzjl)this.hibernateTemplate.get(Jzjl.class, id);
  }
  
  public List<Map<String, Integer>> getCategoryMap() {
    String hql = "select new map(c.id) from Category as ";
    return this.hibernateTemplate.find(hql);
  }
  
  public String findHuanZheLianXiRenByHuanZheID(Long huanzheID) {
    String hql = "select  j.hzlxr from Jiuzhen as j where j.huanzheId = " + huanzheID + " and j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=" + huanzheID + ")";
    List list = this.hibernateTemplate.find(hql);
    return (list.get(0) == null) ? "aaa" : list.get(0).toString();
  }
  
  public List<Map<String, Object>> findFzyy4Page(Page page, FzyySearchForm ff) {
    int size = 0;
    String search = "";
    if (ff.getSearch() != null && !ff.getSearch().isEmpty())
      search = String.valueOf(search) + " and (h.xingming like '%" + ff.getSearch() + "%'" + " or h.binglihao ='" + ff.getSearch() + "'" + ")"; 
    String countHql = "select count(h.id) from HuanZheXinXi as h where h.id in (select x.hzid from XiaoErChuZhen as x) and h.id in (select f.hzid from Fzyy as f)" + search;
    size = count(countHql);
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String hql = "select new map(f.id as fzyyID,h.id as huanzheID,h.binglihao as patientID,h.xingming as name,h.shengri as birthday,h.dianhua as tel,h.shouji as mobile,(select  f.biaoshi  from Fzyy as f where  f.add_time=(select max(add_time) from Fzyy o where o.hzid=h.id)  ) as biaoshi,(select  f.yyrq  from Fzyy as f where  f.add_time=(select max(add_time) from Fzyy o where o.hzid=h.id)  ) as yyrq,(select  f.yyzb  from Fzyy as f where  f.add_time=(select max(add_time) from Fzyy o where o.hzid=h.id)  ) as yyzb,  (select  f.yyqk  from Fzyy as f where  f.add_time=(select max(add_time) from Fzyy o where o.hzid=h.id)  )as yyqk ,(select  f.zdjl  from Fzyy as f where  f.add_time=(select max(add_time) from Fzyy o where o.hzid=h.id)    ) as zdjl, (select  f.ssjl  from Fzyy as f where  f.add_time=(select max(add_time) from Fzyy o where o.hzid=h.id)    ) as ssjl, (select  f.yjxm  from Fzyy as f where  f.add_time=(select max(add_time) from Fzyy o where o.hzid=h.id)    ) as yjxm ) from HuanZheXinXi as h,Fzyy as f  where h.id=f.hzid and h.id in (select x.hzid from XiaoErChuZhen as x )" + 
      
      search + " order by yyrq desc";
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  public Serializable addFzyyInfo(Fzyy fzyy) {
    return this.hibernateTemplate.save(fzyy);
  }
  
  public Fzyy findFzzByJiuzhenid(String jiuzhenid) {
    String sql = "from Fzyy  f where  f.jiuzhenid=" + jiuzhenid;
    List<Fzyy> rt = this.hibernateTemplate.find(sql);
    return (rt == null || rt.size() <= 0) ? null : rt.get(0);
  }
  
  public void updateFzyy(Fzyy fzyy) {
    this.hibernateTemplate.update(fzyy);
  }
  
  public Fzyyjl findSfjlByFzyyid(String fzyyid) {
    String hql = "from Fzyyjl where fzyyId=" + fzyyid;
    List<Fzyyjl> list = this.hibernateTemplate.find(hql);
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  public void updateFzyyjl(Fzyyjl fzyyjl) {
    this.hibernateTemplate.update(fzyyjl);
  }
  
  public void saveFzyyjl(Fzyyjl fzyyjl) {
    this.hibernateTemplate.save(fzyyjl);
  }
  
  public Fzyy findFzyyById(String fzyyID) {
    return (Fzyy)this.hibernateTemplate.get(Fzyy.class, Long.valueOf(Long.parseLong(fzyyID)));
  }
  
  public List<Map<String, Object>> findFzyyjlList(Page page, FzyyjlSearchForm ff) {
    int size = 0;
    String count = "select count(h.id) from HuanZheXinXi as h,Fzyy as f,Fzyyjl as jl where h.id=f.hzid and f.id=jl.fzyyId and h.id in( select hzid from Fzyy where id in( select fzyyId from Fzyyjl))" + 
      getSearchTermOfFzyyjl(ff);
    size = count(count);
    System.out.println(String.valueOf(size) + "~~~~~");
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String sql = "select new map( h.id as id, h.xingming as xingming, h.xingbie as xingbie, h.shengri as shengri, h.shouji as shouji, h.dianhua as dianhua , jl.addTime as addTime, jl.beizhu as beizhu, jl.sffs as sffs )  from HuanZheXinXi as h,Fzyy as f,Fzyyjl as jl  where h.id=f.hzid and f.id=jl.fzyyId and h.id in( \tselect hzid from Fzyy \t\twhere id in( select fzyyId from Fzyyjl)) " + 
      
      getSearchTermOfFzyyjl(ff) + " order by jl.addTime desc";
    return getListForPage(sql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  public String getSearchTermOfFzyyjl(FzyyjlSearchForm ff) {
    String str = "";
    if (ff.getFzyyid() != null && !ff.getFzyyid().isEmpty()) {
      str = String.valueOf(str) + " and jl.fzyyId like '%" + ff.getFzyyid() + "%'";
    } else if (ff.getSearch() != null && !ff.getSearch().isEmpty()) {
      str = String.valueOf(str) + " and (h.id like '%" + ff.getSearch() + 
        "%' or h.xingming like '%" + ff.getSearch() + 
        "%' or h.shouji like '%" + ff.getSearch() + 
        "%' or h.dianhua like'%" + ff.getSearch() + "%')";
    } 
    System.out.println(str);
    return str;
  }
  
  public AChao findAChaoByJcdID(Serializable id) {
    String hql = "from AChao where jcdid = " + id;
    List<AChao> list = this.hibernateTemplate.find(hql);
    return (list.get(0) != null) ? list.get(0) : null;
  }
  
  public Pcao findPcaoByJcdID(Serializable id) {
    String hql = "from Pcao where jcdId = " + id;
    List<Pcao> list = this.hibernateTemplate.find(hql);
    return (list.get(0) != null) ? list.get(0) : null;
  }
  
  public Pcao findPcaoByID(Serializable id) {
    return (Pcao)this.hibernateTemplate.get(Pcao.class, id);
  }
  
  public List<Map<String, Object>> findChildListNoPageByHuanzheIDs(ChildSearchForm form, String huanzheIDs) {
    String hql = "select new map (h.id as huanzheID ,h.binglihao as binglihao,h.xingming as xingming,h.shengri as shengri,h.xingbie as xingbie,h.shouji as mobile,(select  j.caozuoTime  from Jiuzhen as j where j.huanzheId = h.id and j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  ) as caozuo_Time, (select  j.state  from Jiuzhen as j where j.huanzheId = h.id and  j.caozuoTime= (select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  ) as state, (select  j.zhenbie  from Jiuzhen as j where j.huanzheId = h.id and  j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  ) as zhenbie, (select  j.jzks  from Jiuzhen as j where j.huanzheId = h.id and  j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  ) as jiuzhenkeshi, (select  j.hzlxr from Jiuzhen as j where j.huanzheId = h.id and  j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  )as lianxiren ,(select  j.caozuoren  from Jiuzhen as j where j.huanzheId = h.id and  j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  ) as caozuoren, (select  j.shengao  from Jiuzhen as j where j.huanzheId = h.id and  j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  ) as shengao, (select  j.tizhong  from Jiuzhen as j where j.huanzheId = h.id and  j.caozuoTime=(select max(o.caozuoTime) from Jiuzhen o where o.huanzheId=h.id)  ) as tizhong, (select x.dqqk from XiaoErChuZhen as x where x.hzid = h.id) as danqianqingkuang,(select x.csqk from XiaoErChuZhen as x where x.hzid = h.id) as chushengqingkuang,(select x.ycrq from XiaoErChuZhen as x where x.hzid = h.id) as yuchanqi,(select x.fmfs from XiaoErChuZhen as x where x.hzid = h.id) as fenmianfangshi ,(select x.cstz from XiaoErChuZhen as x where x.hzid = h.id) as chushengtizhong,(select x.cssg from XiaoErChuZhen as x where x.hzid = h.id) as chushengshengao,(select x.kyycqk from XiaoErChuZhen as x where x.hzid = h.id) as keyichuanqingkuang,(select y.os from YanYa as y where y.ycsj = (select max(c.ycsj) from YanYa as c where c.huanzhe_id = h.id) and y.huanzhe_id = h.id ) as youyanyanya ,(select y.od from YanYa as y where y.ycsj = (select max(c.ycsj) from YanYa as c where c.huanzhe_id = h.id) and y.huanzhe_id = h.id ) as zuoyanyanya ,(select y.ycsj from YanYa as y where y.ycsj = (select max(c.ycsj) from YanYa as c where c.huanzhe_id = h.id) and y.huanzhe_id = h.id ) as yanyajianchashijian ,(select p.OD1 from Pcao as p where p.jcdId = (select id from Jcd where huanzheId = h.id and biaoti='p超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'p超'))) as youyanpchao1 ,(select p.OD2 from Pcao as p where p.jcdId = (select id from Jcd where huanzheId = h.id and biaoti='p超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'p超'))) as youyanpchao2 ,(select p.OD3 from Pcao as p where p.jcdId = (select id from Jcd where huanzheId = h.id and biaoti='p超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'p超'))) as youyanpchao3 ,(select p.ODave from Pcao as p where p.jcdId = (select id from Jcd where huanzheId = h.id and biaoti='p超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'p超'))) as youyanpingjunzhi ,(select p.OS1 from Pcao as p where p.jcdId = (select id from Jcd where huanzheId = h.id and biaoti='p超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'p超'))) as zuoyanpchao1 ,(select p.OS2 from Pcao as p where p.jcdId = (select id from Jcd where huanzheId = h.id and biaoti='p超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'p超'))) as zuoyanpchao2 ,(select p.OS3 from Pcao as p where p.jcdId = (select id from Jcd where huanzheId = h.id and biaoti='p超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'p超'))) as zuoyanpchao3 ,(select p.ODave from Pcao as p  where p.jcdId = (select id from Jcd where huanzheId = h.id and biaoti='p超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'p超'))) as zuoyanpingjunzhi ,(select p.jcTime from Pcao as p where p.jcdId = (select id from Jcd where huanzheId = h.id and biaoti='p超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'p超'))) as pcaojianchashijian ,(select p.od_a from AChao as p where p.jcdid  = (select id from Jcd where huanzheId = h.id and biaoti='A超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'A超')))  as youyanac1 ,(select p.od_al from AChao as p where p.jcdid  = (select id from Jcd where huanzheId = h.id and biaoti='A超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'A超')))  as youyanal ,(select p.od_l from AChao as p where p.jcdid  = (select id from Jcd where huanzheId = h.id and biaoti='A超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'A超')))  as youyanl ,(select p.od_v from AChao as p where p.jcdid  = (select id from Jcd where huanzheId = h.id and biaoti='A超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'A超')))  as youyanv ,(select p.os_a from AChao as p where p.jcdid  = (select id from Jcd where huanzheId = h.id and biaoti='A超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'A超')))  as zuoyanac1 ,(select p.os_al from AChao as p where p.jcdid  = (select id from Jcd where huanzheId = h.id and biaoti='A超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'A超')))  as zuoyanal ,(select p.os_l from AChao as p where p.jcdid  = (select id from Jcd where huanzheId = h.id and biaoti='A超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'A超')))  as zuoyanl ,(select p.os_v from AChao as p where p.jcdid  = (select id from Jcd where huanzheId = h.id and biaoti='A超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'A超')))  as zuoyanv ,(select p.jctime from AChao as p where p.jcdid  = (select id from Jcd where huanzheId = h.id and biaoti='A超' and kdTime=(select max(kdTime) from Jcd where huanzheId = h.id and biaoti = 'A超')))  as acaojianchashijian ,(select y.refLS from YanGuang as y where y.jcdid =(select id from Jcd where huanzheId = h.id and biaoti = '屈光' and kdTime = (select max(kdTime) from Jcd where huanzheId = h.id and biaoti = '屈光'))) as zuoyanqiujing ,(select y.refRS from YanGuang as y where y.jcdid =(select id from Jcd where huanzheId = h.id and biaoti = '屈光' and kdTime = (select max(kdTime) from Jcd where huanzheId = h.id and biaoti = '屈光'))) as youyanqiujing ,(select y.refLC from YanGuang as y where y.jcdid =(select id from Jcd where huanzheId = h.id and biaoti = '屈光' and kdTime = (select max(kdTime) from Jcd where huanzheId = h.id and biaoti = '屈光'))) as zuoyanzhujing ,(select y.refRC from YanGuang as y where y.jcdid =(select id from Jcd where huanzheId = h.id and biaoti = '屈光' and kdTime = (select max(kdTime) from Jcd where huanzheId = h.id and biaoti = '屈光'))) as youyanzhujing ,(select y.refLA from YanGuang as y where y.jcdid =(select id from Jcd where huanzheId = h.id and biaoti = '屈光' and kdTime = (select max(kdTime) from Jcd where huanzheId = h.id and biaoti = '屈光'))) as zuoyanzhoudu ,(select y.refRA from YanGuang as y where y.jcdid =(select id from Jcd where huanzheId = h.id and biaoti = '屈光' and kdTime = (select max(kdTime) from Jcd where huanzheId = h.id and biaoti = '屈光'))) as youyanzhoudu ,(select y.kxd_l from YanGuang as y where y.jcdid =(select id from Jcd where huanzheId = h.id and biaoti = '屈光' and kdTime = (select max(kdTime) from Jcd where huanzheId = h.id and biaoti = '屈光'))) as zuoyankexindu ,(select y.kxd_r from YanGuang as y where y.jcdid =(select id from Jcd where huanzheId = h.id and biaoti = '屈光' and kdTime = (select max(kdTime) from Jcd where huanzheId = h.id and biaoti = '屈光'))) as youyankexindu ,(select y.jcsj from YanGuang as y  where y.jcdid =(select id from Jcd where huanzheId = h.id and biaoti = '屈光' and kdTime = (select max(kdTime) from Jcd where huanzheId = h.id and biaoti = '屈光'))) as quguangjianchashijian,(select j.jilu from Jzjl as j where j.categoryId=60101 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as youyanjiaomo,(select j.jilu from Jzjl as j where j.categoryId=60102 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as youyanjiemo,(select j.jilu from Jzjl as j where j.categoryId=60103 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as youyanjingti,(select j.jilu from Jzjl as j where j.categoryId=60104 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as youyanboliti,(select j.jilu from Jzjl as j where j.categoryId=60105 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as youyanshiwangmo,(select j.jilu from Jzjl as j where j.categoryId=60106 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as youyanshipan,(select j.jilu from Jzjl as j where j.categoryId=60107 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as zuoyanjiaomo,(select j.jilu from Jzjl as j where j.categoryId=60108 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as zuoyanjiemo,(select j.jilu from Jzjl as j where j.categoryId=60109 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as zuoyanjingti,(select j.jilu from Jzjl as j where j.categoryId=60110 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as zuoyanboliti,(select j.jilu from Jzjl as j where j.categoryId=60111 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as zuoyanshiwangmo,(select j.jilu from Jzjl as j where j.categoryId=60112 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as zuoyanshipan ,(select j.jlTime from Jzjl as j where j.categoryId=60101 and j.jiuzhenId = (select z.id from Jiuzhen as z where z.huanzheId=h.id and z.caozuoTime = (select max(caozuoTime) from Jiuzhen where huanzheId = h.id))) as tigejianchashijian)from HuanZheXinXi as h where h.id in (select x.hzid from XiaoErChuZhen as x ) " + 
      
      getQueryString(form);
    if (Utils.strIsNotEmpty(huanzheIDs))
      hql = String.valueOf(hql) + "and h.id in (" + huanzheIDs + ")"; 
    List<Map<String, Object>> list = null;
    list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  public List<YanYa> findAllYanYa4Page(Page p, HzXxSearchForm hzxx) {
    String factorSql = " and 1=1 ";
    if (hzxx.getSearch() != null && !hzxx.getSearch().isEmpty())
      factorSql = String.valueOf(factorSql) + " and (y.jiuzhen_id =" + hzxx.getSearch() + 
        " or h.xingming like '%" + hzxx.getSearch() + "%')"; 
    String countHql = "select count(*)  from HuanZheXinXi as h,YanYa as y,Jcd as j where h.id=y.huanzhe_id and j.id=y.jcd_id   and j.biaoshi in(50,56) and j.jcxmIds = 78" + 
      
      factorSql;
    p.setRowsCount(Integer.valueOf(count(countHql)));
    p.init();
    String hql = "select new map(j.id as id , j.jcdh as jcdh ,h.binglihao as blh ,h.xingming as xm ,h.xingbie as xb ,h.shengri as sr , j.biaoshi as biaoshi , y.od as od , y.os as os, y.ycsj as ycsj ) from Jcd as j,HuanZheXinXi as h,YanYa as y where y.jcd_id=j.id  and h.id=y.huanzhe_id and j.biaoshi in (50,56) and j.jcxmIds=78 " + 
      
      factorSql;
    System.out.println(hql);
    return getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue());
  }
  
  public List<Pcao> findPchaoList(Page p, Serializable id) {
    String countHql = "select count(*) from Pcao as p  where p.jcdId = " + 
      id;
    p.setRowsCount(Integer.valueOf(count(countHql)));
    p.init();
    String hql = "select new map(p.OD1 as d1,p.OD2 as d2,p.OD3 as d3,p.OS1 as s1,p.OS2 as s2,p.OS3 as s3,p.ODave as dave, p.OSave as save) from Pcao as p where p.jcdId = " + 
      
      id;
    return getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue());
  }
  
  public List<AChao> findAChaoList(Page p, Serializable id) {
    String countHql = "select count(*) from AChao as a  where a.jcdid = " + 
      id;
    p.setRowsCount(Integer.valueOf(count(countHql)));
    p.init();
    String hql = "select new map(a.od_a as oda,a.od_l as odl, a.od_v as odv,a.os_a as osa,a.os_l as osl,a.os_v as osv,a.od_al as odal,a.os_al as osal) from AChao as a where a.jcdid = " + 
      
      id;
    return getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue());
  }
  
  public Boolean isXiaoEr(String hzid) {
    String hql = "from XiaoErChuZhen where hzid=" + hzid;
    List list = this.hibernateTemplate.find(hql);
    return Boolean.valueOf(!(list.size() == 0));
  }
}
