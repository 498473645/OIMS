package cn.com.oims.utils;

import java.util.Date;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import net.sf.json.util.PropertyFilter;

public class JsonUtil {
  public static JsonConfig toJsonDateForamt(String format) {
    JsonConfig config = new JsonConfig();
    DateJsonValueProcessor processor = null;
    if (format != null) {
      processor = new DateJsonValueProcessor(format);
    } else {
      processor = new DateJsonValueProcessor();
    } 
    config.registerJsonValueProcessor(Date.class, processor);
    return config;
  }
  
  public static JsonConfig ignoreProperty(String[] properties) {
    JsonConfig config = new JsonConfig();
    config.setIgnoreDefaultExcludes(false);
    config.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
    config.setExcludes(properties);
    return config;
  }
  
  public static JsonConfig resolveProperty(final String[] properties) {
    JsonConfig config = new JsonConfig();
    config.setJsonPropertyFilter(new PropertyFilter() {
          public boolean apply(Object source, String name, Object value) {
            for (int i = 0; i < properties.length; i++) {
              if (name.equals(properties[i]))
                return false; 
            } 
            return true;
          }
        });
    return config;
  }
}
