package cn.com.oims.web.intercepts;

import cn.com.oims.service.IUserService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginValidationIntercept extends HandlerInterceptorAdapter {
  private String notValidURI = "userLogin.htm";
  
  private String validOimsCpature = "/user/showJCPanel.htm";
  
  @Autowired
  private IUserService userService;
  
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    String requestURI = request.getRequestURI();
    HttpSession session = request.getSession();
    Object jobnum = session.getAttribute("gonghao");
    boolean required = true;
    if (requestURI.indexOf(this.notValidURI) != -1)
      required = false; 
    if (requestURI.indexOf(this.validOimsCpature) != -1)
      required = false; 
    if (required)
      if (jobnum == null) {
        response.sendRedirect("../");
        return false;
      }  
    return super.preHandle(request, response, handler);
  }
}
