package cn.com.oims.dao.impl;

import cn.com.oims.dao.IOimsDataDao;
import cn.com.oims.dao.pojo.Baogao;
import cn.com.oims.dao.pojo.BaogaoMoban;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.OimsLog;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.web.form.BaogaoXinxiSearchForm;
import cn.com.oims.web.form.BgMbSearchForm;
import cn.com.oims.web.form.HzXxSearchForm;
import cn.com.oims.web.form.JcXmSearchForm;
import cn.com.oims.web.form.JcdSearchForm;
import cn.com.oims.web.form.SheBeiSearchForm;
import cn.com.oims.web.form.SrMbSearchForm;
import cn.com.oims.web.form.UserSearchForm;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class OimsDataDaoImpl extends BaseDaoImpl implements IOimsDataDao {
  private String clazzName = OimsLog.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(OimsLog.class);
  }
  
  public int counts() {
    Long i = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return i.intValue();
  }
  
  public List<Map<String, Object>> getUserInfoList(UserSearchForm l) {
    String factorSql = getUserQueryCondition(l);
    String hql = "select new map(l.uid as uid ,l.password as password ,l.gonghao as gonghao,l.email as email,l.jiaose as jiaose ,r.jiaose as rolevalue,l.qiyong as qiyong,l.quanxian as quanxian ,l.jishu as jishu ) from User  as l ,Role as r  where " + 
      factorSql + "  and  l.jiaose =r.id ";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  private String getUserQueryCondition(UserSearchForm l) {
    String factorSql = "1=1";
    if (l.getUid() != null && !l.getUid().equals(""))
      factorSql = String.valueOf(factorSql) + " and(l.uid='" + l.getUid() + "')"; 
    if (l.getGonghao() != null && !l.getGonghao().equals(""))
      factorSql = String.valueOf(factorSql) + " and(l.gonghao='" + l.getGonghao() + "')"; 
    if (l.getJob() != null && !l.getJob().equals(""))
      factorSql = String.valueOf(factorSql) + " and (l.jiaose in (" + l.getJob() + "))"; 
    System.out.println(String.valueOf(factorSql) + "<-----factorSql");
    return factorSql;
  }
  
  private String getSheBeiQueryCondition(SheBeiSearchForm s) {
    String factorSql = "1=1";
    if (s.getBumenId() != null && !s.getBumenId().equals(""))
      factorSql = String.valueOf(factorSql) + " and(shebei.bmId in(" + s.getBumenId() + "))"; 
    if (s.getQiyong() != null && !s.getQiyong().equals(""))
      factorSql = String.valueOf(factorSql) + " and(shebei.qiyong='" + s.getQiyong() + "')"; 
    return factorSql;
  }
  
  public List<Map<String, Object>> getSheBeiInfoList(SheBeiSearchForm lsf) {
    String factorSql = getSheBeiQueryCondition(lsf);
    String hql = "select new map(shebei.id as id,shebei.sbmc as sbmc,shebei.ggxh as ggxh,shebei.bmId as bmId,b.bmmc as bmIdValue,shebei.bgsId as bgsId,g.bgs as bgsIdValue,shebei.ip as ip,shebei.smbUser as smbUser,shebei.ip as ip,shebei.smbUser as smbUser,shebei.smbPassword as smbPassword,shebei.smbPassword as smbPassword,shebei.smbName as smbName,shebei.online as online,shebei.manageUser as manageUser,shebei.protocol as protocol,shebei.jcxmIds as jcxmIds,shebei.qiyong as qiyong ) from SheBei as shebei ,BuMen as b,BanGongShi as g where " + 
      
      factorSql + " and shebei.bmId=b.id and shebei.bgsId = g.id";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    String s = "";
    for (Map<String, Object> m : list) {
      Object JcxmIds = m.get("jcxmIds");
      if (JcxmIds == null || JcxmIds.equals(""))
        continue; 
      JcxmIds = JcxmIds.toString();
      String hql2 = "select new map (j.xmmc as xmmc ) from Jcxm as j where j.id in (" + 
        JcxmIds + ")";
      List<Map<String, Object>> l2 = this.hibernateTemplate.find(hql2);
      for (int i = 0; i < l2.size(); i++) {
        Map m2 = l2.get(i);
        if (m2.get("xmmc") != null)
          s = String.valueOf(s) + m2.get("xmmc").toString() + ","; 
      } 
      if (s != "" && !s.equals(""))
        s = s.substring(0, s.lastIndexOf(",")); 
      m.put("xmmc", s);
      s = "";
    } 
    return list;
  }
  
  private String getPatientQuery(HzXxSearchForm h) {
    String factorSql = " 1=1";
    if (h.getDiqu() != null && !h.getDiqu().isEmpty())
      factorSql = String.valueOf(factorSql) + " and h.diqu='" + h.getDiqu() + "'"; 
    if (h.getLaiyuan() != null && !h.getLaiyuan().isEmpty())
      factorSql = String.valueOf(factorSql) + " and h.laiyuan in (" + h.getLaiyuan() + ")"; 
    if (h.getShengri() != null && !h.getShengri().isEmpty())
      factorSql = String.valueOf(factorSql) + " and h.shengri='" + h.getShengri() + "'"; 
    if (h.getXingbie() != null && !h.getXingbie().isEmpty())
      factorSql = String.valueOf(factorSql) + " and h.xingbie='" + h.getXingbie() + "'"; 
    if (h.getXingming() != null && !h.getXingming().isEmpty())
      factorSql = String.valueOf(factorSql) + " and h.xingming='" + h.getXingming() + "'"; 
    if (h.getZcrq() != null && !h.getZcrq().isEmpty())
      factorSql = String.valueOf(factorSql) + " and h.zcrq='" + h.getZcrq() + "'"; 
    return factorSql;
  }
  
  public List<Map<String, Object>> getHuanZheInfoList(HzXxSearchForm h) {
    String factorSql = getPatientQuery(h);
    String hql = "select new map(h.id as id,h.diquId as diquId, h.binglihao as binglihao ,h.xingming as xingming ,h.xingbie as xingbie ,h.shengri as shengri ,h.diqu as diqu,h.sfzh as sfzh, h.gzdw as gzdw,h.dwyb as dwyb,h.dwdz as dwdz, h.dwdh as dwdh,h.jtdz as jtdz,h.youbian as youbian ,h.shouji as shouji, h.dianhua as dianhua ,h.hzlxr as hzlxr,h.hzlxrdh as hzlxrdh,h.yhzgx as yhzgx,h.yibao as yibao ,h.yibaohao as yibaohao ,h.shangbao as shangbao ,h.gongfei as gongfei ,h.zcrq as zcrq ,h.jilvren as jilvren,h.beizhu as beizhu ,h.laiyuan as laiyuan ,h.photourl as photourl ) from HuanZheXinXi h where " + 
      
      factorSql;
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  private String getJcXmQuery(JcXmSearchForm j) {
    String factorSql = " 1=1";
    if (j.getCategoryId2() != null && !j.getCategoryId2().isEmpty())
      factorSql = String.valueOf(factorSql) + "  and j.categoryId ='" + j.getCategoryId2() + "'"; 
    if (j.getFatherId() != null && !j.getFatherId().isEmpty())
      factorSql = String.valueOf(factorSql) + "  and j.fatherId ='" + j.getFatherId() + "'"; 
    return factorSql;
  }
  
  public List<Map<String, Object>> getJcXmInfoList(JcXmSearchForm lsf) {
    String factorSql = getJcXmQuery(lsf);
    String hql = "select new map(j.id as id,j.bianma as bianma , j.xmmc as xmmc ,j.xmms as xmms ,j.fatherId as fatherId,c.category as fatherIdValue,j.categoryId as categoryId, cc.category as categoryIdValue,j.leftPicPath as leftPicPath ,j.rightPicPath as rightPicPath)  from Jcxm as j ,Category as c,Category as cc where " + 
      
      factorSql + " and j.fatherId =c.id and j.categoryId=cc.id";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  private String getSrMbQuery(SrMbSearchForm s) {
    String factorSql = "1=1";
    if (s.getBumenId() != null && !s.getBumenId().isEmpty())
      factorSql = String.valueOf(factorSql) + " and s.bmId in(" + s.getBumenId() + ")"; 
    if (s.getCategoryId() != null && !s.getCategoryId().isEmpty())
      factorSql = String.valueOf(factorSql) + " and s.categoryId  in (" + s.getCategoryId() + ")"; 
    if (s.getAddTime() != null && !s.getAddTime().isEmpty())
      factorSql = String.valueOf(factorSql) + " and s.addTime='" + s.getAddTime() + "'"; 
    if (s.getGonghao() != null && !s.getGonghao().isEmpty())
      factorSql = String.valueOf(factorSql) + " and s.gonghao='" + s.getGonghao() + "'"; 
    if (s.getJcxmIds() != null && !s.getJcxmIds().isEmpty())
      factorSql = String.valueOf(factorSql) + " and s.jcxmId in(" + s.getJcxmIds() + ")"; 
    if (s.getJibie() != null && !s.getJibie().isEmpty())
      factorSql = String.valueOf(factorSql) + " and s.jibie in(" + s.getJibie() + ")"; 
    return factorSql;
  }
  
  public List<Map<String, Object>> getSrMbInfoList(SrMbSearchForm lsf) {
    String factorSql = getSrMbQuery(lsf);
    String hql = "select new map(s.id as id ,s.shuru as shuru ,s.suoyin as suoyin ,s.bmId as bmId ,b.bmmc as bmIdValue, s.jibie as jibie ,c.category as   jibieValue,   s.categoryId as categoryId , cc.category as categoryIdValue , s.jcxmId as jcxmId,s.addTime as addTime ,s.gonghao as gonghao, y.xingming as gonghaoValue )from ShuruMoban  as s , BuMen as b ,Category as c ,Category as cc,YuanGong as y where " + 
      
      factorSql + 
      " and b.id=s.bmId  and c.id=s.jibie and cc.id=s.categoryId  and s.gonghao =y.gonghao ";
    return this.hibernateTemplate.find(hql);
  }
  
  private String getBgMbQuery(BgMbSearchForm b) {
    String factorSql = " 1=1";
    if (b.getBumenId() != null && !b.getBumenId().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.bumenId in (" + b.getBumenId() + ")"; 
    if (b.getJcxmIds() != null && !b.getJcxmIds().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.jcxmIds in (" + b.getJcxmIds() + ")"; 
    if (b.getJibie() != null && !b.getJibie().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.jibie in (" + b.getJibie() + ")"; 
    return factorSql;
  }
  
  public List<Map<String, Object>> getBgMbInfoList(BgMbSearchForm lsf) {
    String factorSql = getBgMbQuery(lsf);
    String hql = "select new map ( b.id as id, b.biaoti as biaoti,b.moban as moban,b.jibie as jibie ,c.category as jibieValue, b.bumenId as bumenId,k.bmmc as bumenIdValue, b.gonghao as gonghao ,b.categoryId as categoryId , cc.category as categoryIdValue,  b.jcxmIds as jcxmIds,j.xmmc as jcxmIdsValue ,b.url as url)from BaogaoMoban as  b ,BuMen as k,Category as c,Category as cc,Jcxm as j where " + 
      
      factorSql + 
      " and k.id=b.bumenId and c.id=b.jibie and cc.id=b.categoryId and j.id=b.jcxmIds";
    return this.hibernateTemplate.find(hql);
  }
  
  private String getJcdQuery(JcdSearchForm j) {
    String factorSql = " 1=1";
    if (j.getJcxmid() != null && !j.getJcxmid().isEmpty())
      factorSql = String.valueOf(factorSql) + " and j.jcxmIds = '" + j.getJcxmid() + "'"; 
    if (j.getJcys() != null && !j.getJcys().isEmpty())
      factorSql = String.valueOf(factorSql) + " and j.jcys  in (" + j.getJcys() + ")"; 
    if (j.getStartkdsj() != null && !j.getStartkdsj().isEmpty())
      factorSql = String.valueOf(factorSql) + " and j.kdTime = '" + j.getStartkdsj() + "'"; 
    if (j.getBiaoshi() != null && !j.getBiaoshi().isEmpty())
      factorSql = String.valueOf(factorSql) + " and j.biaoshi = '" + j.getBiaoshi() + "'"; 
    return factorSql;
  }
  
  public List<Map<String, Object>> getJcdInfoList(JcdSearchForm lsf) {
    String factorSql = getJcdQuery(lsf);
    String hql = "select new map(j.id as id,j.jcdh as jcdh ,j.jiuzhenId as jiuzhenId,j.biaoti as biaoti, j.jcsbId as jcsbId, j.huanzheId as huanzheId , j.jcxmIds as jcxmIds,jc.xmmc as jcxmIdsValue,j.kdksId as kdksId,b.bmmc as kdksIdValue,j.kdys as kdys,y1.xingming as kdysValue ,j.kdTime as kdTime,j.jcksId as jcksId , j.jcys as jcys, y2.xingming as jcysValue, j.jcksTime as jcksTime,j.jcjsTime as jcjsTime,j.leftPic as leftPic,j.rightPic as rightPic,j.jfbs as jfbs ,j.biaoshi as biaoshi,c.category as biaoshiValue,j.yanbie as yanbie ,cc.category as yanbieValue,j.jcyq as jcyq)from Jcd as j , Jcxm as jc,BuMen as b ,Category as c,Category as cc ,YuanGong as y1, YuanGong as y2 where " + 
      
      factorSql + 
      " and j.jcxmIds=jc.id and b.id =j.kdksId and y1.gonghao =j.kdys and y2.gonghao=j.jcys" + 
      " and c.id = j.biaoshi and cc.id=j.yanbie ";
    return this.hibernateTemplate.find(hql);
  }
  
  private String getBgXxQuery(BaogaoXinxiSearchForm b) {
    String factorSql = " 1=1";
    if (b.getBgTime() != null && !b.getBgTime().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.bgTime = '" + b.getBgTime() + "'"; 
    if (b.getBgys() != null && !b.getBgys().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.bgys = '" + b.getBgys() + "'"; 
    if (b.getMobanId() != null && !b.getMobanId().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.mobanId = '" + b.getMobanId() + "'"; 
    if (b.getShTime() != null && !b.getShTime().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.shTime = '" + b.getShTime() + "'"; 
    if (b.getShys() != null && !b.getShys().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.shys = '" + b.getShys() + "'"; 
    if (b.getState() != null && !b.getState().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.state = '" + b.getState() + "'"; 
    return factorSql;
  }
  
  public List<Map<String, Object>> getbgxxInfoList(BaogaoXinxiSearchForm lsf) {
    String factorSql = getBgXxQuery(lsf);
    String hql = "select new map(b.id as id, b.jcdId as jcdId ,b.bgys as bgys ,b.bgTime as bgTime,  b.shys as shys ,b.shTime as shTime ,b.jckj as jckj, b.jcts as jcts ,b.state as state,  b.mobanId as mobanId ,bg.biaoti as mobanIdValue)from Baogao as b ,BaogaoMoban as bg where " + 
      
      factorSql + " and b.mobanId=bg.id";
    return this.hibernateTemplate.find(hql);
  }
  
  public List getDoctorHasCheckList(int s) {
    String hql = "select new map (y.xingming as xingming ,y.gonghao as gonghao , y.zhiwu as zhiwu) from YuanGong as y  , User as u where y.gonghao = u.gonghao  and ( u.quanxian='" + 
      
      s + 
      "' or u.quanxian like '" + 
      s + 
      ",%' " + 
      " or u.quanxian like '%," + 
      s + 
      ",%'" + 
      " or u.quanxian like '%," + s + "')";
    return this.hibernateTemplate.find(hql);
  }
  
  public List getBuMenBaoGaoInfo() {
    String hql = "select new map (b.bmbm  as bmbm  ,b.bmmc as  bmmc) from BuMen b ,Jcd j ,Baogao g where b.id=j.jcksId  and  g.jcdId=j.id";
    return this.hibernateTemplate.find(hql);
  }
  
  public List<SheBei> getSheBeisInBuMen(String v) {
    if (v != null && !v.isEmpty()) {
      String hql = "from SheBei as s  where  1=1 and s.bmId in (" + v + 
        ")";
      return this.hibernateTemplate.find(hql);
    } 
    return null;
  }
  
  public List getJcxmsInSheBei(String s) {
    if (s != null && !s.isEmpty()) {
      String hql = "  from  Jcxm as j  where j.id in (" + s + ")";
      return this.hibernateTemplate.find(hql);
    } 
    return null;
  }
  
  public List<User> getUserList(User s) {
    return this.hibernateTemplate.findByExample(s);
  }
  
  public List<YuanGong> getYuanGongList(YuanGong s) {
    return this.hibernateTemplate.findByExample(s);
  }
  
  public List<BuMen> getBuMenList(BuMen s) {
    return this.hibernateTemplate.findByExample(s);
  }
  
  public List<SheBei> getSheBeiList(SheBei s) {
    return this.hibernateTemplate.findByExample(s);
  }
  
  public List<HuanZheXinXi> getHuanZheXinXiList(HuanZheXinXi s) {
    return this.hibernateTemplate.findByExample(s);
  }
  
  public List<Jcxm> getJcxmList(Jcxm s) {
    return this.hibernateTemplate.findByExample(s);
  }
  
  public List<Jcd> getJcdList(Jcd s) {
    return this.hibernateTemplate.findByExample(s);
  }
  
  public List<Baogao> getBaogaoList(Baogao s) {
    return this.hibernateTemplate.findByExample(s);
  }
  
  public List<ShuruMoban> getShuruMobanList(ShuruMoban s) {
    return this.hibernateTemplate.findByExample(s);
  }
  
  public List<OimsLog> getOimsLogList(OimsLog s) {
    return this.hibernateTemplate.findByExample(s);
  }
  
  public List<BaogaoMoban> getBaogaoMobanList(BaogaoMoban s) {
    return this.hibernateTemplate.findByExample(s);
  }
}
