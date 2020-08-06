package test;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.catalina.comet.CometEvent;
import org.apache.catalina.comet.CometProcessor;

public class PushServlet extends HttpServlet implements CometProcessor {
  private static final long serialVersionUID = -2670931212478418528L;
  
  public static Map<String, HttpServletResponse> connections = new HashMap<>();
  
  public static MessageSender messageSender = null;
  
  public void init() throws ServletException {
    messageSender = new MessageSender();
    Thread messageSenderThread = new Thread(messageSender, "MessageSender[" + getServletContext().getContextPath() + "]");
    messageSenderThread.setDaemon(true);
    messageSenderThread.start();
  }
  
  public void destroy() {
    connections.clear();
    messageSender.stop();
    messageSender = null;
  }
  
  public void event(CometEvent event) throws IOException, ServletException {
    HttpServletRequest request = event.getHttpServletRequest();
    HttpServletResponse response = event.getHttpServletResponse();
    String name = request.getSession().getAttribute("gonghao").toString();
    if (name == null)
      return; 
    if (event.getEventType() == CometEvent.EventType.BEGIN) {
      event.setTimeout(0);
      log("为用户" + name + "开启推送服务。SessionID：" + request.getSession(true).getId());
      PrintWriter writer = response.getWriter();
      writer.println("<!doctype html public \"-//w3c//dtd html 4.0 transitional//en\">");
      writer.println("<html><head><script type=\"text/javascript\">var comet = window.parent.comet;</script></head><body>");
      writer.println("<script type=\"text/javascript\">");
      writer.println("var comet = window.parent.comet;");
      writer.println("</script>");
      writer.flush();
      if (request.getHeader("User-Agent").contains("KHTML")) {
        for (int i = 0; i < 100; i++)
          writer.print("<input type=hidden name=none value=none>"); 
        writer.flush();
      } 
      synchronized (connections) {
        connections.remove(name);
        connections.put(name, response);
      } 
    } else if (event.getEventType() == CometEvent.EventType.ERROR) {
      log("用户" + name + "推送服务出错。SessionID：" + request.getSession(true).getId());
      synchronized (connections) {
        connections.remove(name);
      } 
      event.close();
    } else if (event.getEventType() == CometEvent.EventType.END) {
      log("关闭用户" + name + "推送服务。SessionID：" + request.getSession(true).getId());
      synchronized (connections) {
        connections.remove(name);
      } 
      PrintWriter writer = response.getWriter();
      writer.println("</body></html>");
      event.close();
    } else if (event.getEventType() == CometEvent.EventType.READ) {
      ServletInputStream servletInputStream = request.getInputStream();
      byte[] buf = new byte[512];
      do {
        int n = servletInputStream.read(buf);
        if (n > 0) {
          log("读取 " + n + " 比特: " + new String(buf, 0, n) + 
              " 从会话: " + 
              request.getSession(true).getId());
        } else if (n < 0) {
          return;
        } 
      } while (servletInputStream.available() > 0);
    } 
  }
  
  public static void sendMsg(String user, String message) {
    if (messageSender != null)
      messageSender.send(user, message); 
  }
  
  public class MessageSender implements Runnable {
    protected boolean running = true;
    
    protected Map<String, String> messages = new HashMap<>();
    
    public void stop() {
      this.running = false;
    }
    
    public void send(String user, String message) {
      synchronized (this.messages) {
        this.messages.put(user, message);
        this.messages.notify();
      } 
    }
    
    public void run() {
      while (this.running) {
        if (this.messages.size() == 0)
          try {
            synchronized (this.messages) {
              this.messages.wait();
            } 
          } catch (InterruptedException interruptedException) {} 
        synchronized (PushServlet.connections) {
          synchronized (this.messages) {
            Iterator<Map.Entry<String, String>> iterator = this.messages.entrySet().iterator();
            while (iterator.hasNext()) {
              Map.Entry<String, String> message = iterator.next();
              try {
                HttpServletResponse response = PushServlet.connections
                  .get(message.getKey());
                PrintWriter writer = response.getWriter();
                writer
                  .print("<script type=\"text/javascript\">");
                writer.println("comet.addPatient('" + 
                    (String)message.getValue() + "');");
                writer.print("</script>");
                writer.flush();
              } catch (IOException e) {
                PushServlet.this.log("IO异常", e);
              } 
              this.messages.remove(message.getKey());
            } 
          } 
        } 
      } 
    }
  }
}
