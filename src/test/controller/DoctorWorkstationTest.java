package test.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import test.TestBase;

public class DoctorWorkstationTest extends TestBase {
  private MockHttpServletRequest request;
  
  private MockHttpServletResponse response;
  
  @Before
  public void init() {
    this.request = new MockHttpServletRequest();
    this.response = new MockHttpServletResponse();
  }
  
  @Test
  public void controller() throws Exception {
    String str = "yzq,wy1,xhp,csj,wh,ly,yt,lfl,yx,yh,zll,zsl,qw,hcm,qy,zcx,ln,wn,ztt,dch,hxy,lcan,lx_yk,zs_yk,dp_yk,xjn_yk,gp_yk,cx_yk,yk_lr,lxi,wh_yk,dyh,lh,lsy_yk,ghl,yyl_yk,wrz_yk,dj_yk,qlh_yk,zyy_yk,qdm_yk,pyl_yk,lmm_yk,miao,ww_yk,glx_yk,xj_yk,fy_yk,ym_yk,yjj_yk,hsj_yk,ljw_yk,tl_yk,wgq_yk,yx_yk,zlj_yk,zcb_yk,xj-yk,ll_yk,swl_yk,wy_yk,zx_yk,zb_yk,wgj_yk,lh_yk,glh_yk,dc_yk,ly_yk,jl_yk,tz_yk,lql_yk,td_yk,gxl_yk,mep_yk,lzp_yk,ty_yk,lbj_yk,yy_yk,ysj_yk,cp_k";
    String[] uids = str.split(",");
    for (int i = 0; i < uids.length; i++) {
      String uid = uids[i];
      this.request.setMethod("POST");
      this.request.setRequestURI("/user/updateUserPassword.htm");
      this.request.setParameter("uid", uid);
      this.request.setParameter("password", uid);
      this.request.setParameter("password2", uid);
      this.request.getSession().setAttribute("gonghao", "10002");
      excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
    } 
  }
  
  @Test
  public void getHandleProject() throws Exception {
    this.request.setMethod("POST");
    this.request.setRequestURI("/emr/getHandleProject.htm");
    this.request.setParameter("validable", "true");
    this.request.getSession().setAttribute("gonghao", "10002");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void getHandlePertain() throws Exception {
    this.request.setMethod("POST");
    this.request.setRequestURI("/emr/getHandlePertain.htm");
    this.request.setParameter("handleId", "27");
    this.request.getSession().setAttribute("gonghao", "10002");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void getPatientList() throws Exception {
    this.request.setMethod("POST");
    this.request.setRequestURI("/emr/getvisitlistbystate.htm");
    this.request.setParameter("gonghao", "0047");
    this.request.setParameter("state", "27");
    this.request.setParameter("style", "card");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void test() throws Exception {
    this.request.setMethod("POST");
    this.request.setRequestURI("/emr/test.htm");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void test2() throws Exception {
    this.request.setMethod("POST");
    this.request.setRequestURI("/_emr/testSaveMedicines.htm");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void syncronizedJcxm() throws Exception {
    this.request.setMethod("GET");
    this.request.setAttribute("gonghao", "ly");
    this.request.setRequestURI("/jcxm/synchJcxm.htm");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void handleProjectToJcxm() throws Exception {
    this.request.setMethod("POST");
    this.request.setRequestURI("/emr/handleProjectToJcxm.htm");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void syncroDrug() throws Exception {
    this.request.setMethod("GET");
    this.request.setRequestURI("/_emr/synchDrug.htm");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void handleFuShuSyncro() throws Exception {
    this.request.setMethod("POST");
    this.request.setRequestURI("/emr/fuShuSyncro");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void syncroYuangongGonghao() throws Exception {
    this.request.setMethod("POST");
    this.request.setRequestURI("/emr/syncroYuangongGonghao.htm");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void test111() throws Exception {
    this.request.setMethod("POST");
    this.request.setRequestURI("/emr/syncroFuShu.htm");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
  
  @Test
  public void testk() throws Exception {
    this.request.setMethod("POST");
    this.request.setRequestURI("/emr/eyePatient.htm");
    excute((HttpServletRequest)this.request, (HttpServletResponse)this.response);
  }
}
