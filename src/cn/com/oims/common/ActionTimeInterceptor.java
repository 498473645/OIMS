package cn.com.oims.common;

import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import org.springframework.ui.ModelMap;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.WebRequestInterceptor;

public class ActionTimeInterceptor implements WebRequestInterceptor {
  private static String timeTag = "actTime";
  
  public void afterCompletion(WebRequest arg0, Exception arg1) throws Exception {
    ServletWebRequest sw = (ServletWebRequest)arg0;
    sw.getRequest().getContextPath();
    HttpServletRequest req = sw.getRequest();
    req.getLocalAddr();
    Date end = new Date();
    Date start = (Date)arg0.getAttribute(timeTag, 1);
    long rt = end.getTime() - start.getTime();
    Utils.tLog(String.valueOf(rt) + "\t毫秒\t" + arg0.getDescription(false) + "?" + req.getQueryString());
  }
  
  public void postHandle(WebRequest arg0, ModelMap arg1) throws Exception {}
  
  public void preHandle(WebRequest arg0) throws Exception {
    arg0.setAttribute(timeTag, new Date(), 1);
  }
}
