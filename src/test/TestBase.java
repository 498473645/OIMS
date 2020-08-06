package test;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.mock.web.MockServletContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.springframework.web.servlet.HandlerAdapter;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

public class TestBase {
  private static HandlerMapping mapping;
  
  private static HandlerAdapter adapter;
  
  static {
    String[] configs = { "file:WebContent/WEB-INF/dispatcher-servlet.xml", 
        "file:WebContent/WEB-INF/applicationContext.xml", 
        "file:WebContent/WEB-INF/oimsData.xml", 
        "file:WebContent/WEB-INF/oimsService.xml" };
    XmlWebApplicationContext context = new XmlWebApplicationContext();
    context.setConfigLocations(configs);
    MockServletContext msc = new MockServletContext();
    context.setServletContext((ServletContext)msc);
    context.refresh();
    msc.setAttribute(
        WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE, 
        context);
    mapping = (HandlerMapping)context
      .getBean(RequestMappingHandlerMapping.class);
    adapter = (HandlerAdapter)context.getBean(context
        .getBeanNamesForType(RequestMappingHandlerAdapter.class)[0]);
  }
  
  public ModelAndView excute(HttpServletRequest request, HttpServletResponse response) throws Exception {
    request.setAttribute(HandlerMapping.INTROSPECT_TYPE_LEVEL_MAPPING, Boolean.valueOf(true));
    HandlerExecutionChain chain = mapping.getHandler(request);
    ModelAndView model = adapter.handle(request, response, 
        chain.getHandler());
    return model;
  }
}
