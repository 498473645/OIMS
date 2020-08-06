package cn.com.oims.dao.impl;

import java.util.List;
import java.util.Map;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class jsonUtil {
  public static Object getObject4JsonString(String jsonString, Class<?> pojoCalss) {
    JSONObject jsonObject = JSONObject.fromObject(jsonString);
    Object pojo = JSONObject.toBean(jsonObject, pojoCalss);
    return pojo;
  }
  
  public static Object[] getObjectArray4Json(String jsonString) {
    JSONArray jsonArray = JSONArray.fromObject(jsonString);
    return jsonArray.toArray();
  }
  
  public static String getJsonString4JavaPOJO(Object javaObj) {
    JSONObject json = JSONObject.fromObject(javaObj);
    return json.toString();
  }
  
  public static JSONObject getJSONList(List<?> list) {
    JSONObject json = new JSONObject();
    json.put("", list);
    return json;
  }
  
  public static JSONObject getJSONMap(Map<?, ?> map) {
    JSONObject json = new JSONObject();
    json.put("", map);
    return json;
  }
}
