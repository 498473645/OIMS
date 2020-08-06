package cn.com.oims.common;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
/**
 *
 * @author 于洋
 *
 */
public class BeanCopyUtils {

  public static String bln = "t" ;

  /**
   * @author 于洋
   * @param s:Object
   * @param t:Object
   *
   * <p>
   * 适用于formBean与pojo的转换
   * spring提供的类型一定要相同，但是如果传过来的参数是"",要转成Integer，就会出错
   * ""转Integer为0 异常为-1
   * ""转Date 或转换异常 为当前时间
   * public class T {
  String a ;
  int b ;
  boolean c;
  Date d ;
  long e ;
  getter...
  setter...
  }

  public class TF {
  String a ;
  String b ;
  String c;
  String d ;
  String e ;
  getter...
  setter...
  }

   @Test
   public void copyProperties(){
   T t = new T() ;
   TF tf = new TF() ;
   tf.setA("--------") ;
   tf.setB("12") ;
   tf.setC("t") ;//小写字母"t"会转换为true
   tf.setD("2011-01-01") ;
   tf.setE("100000000") ;
   BeanCopyUtils.copyProperties(tf, t) ;
   System.out.println(t.getA()+"\t"+t.getB()+"\t"+t.isC()+"\t"+t.getD()+"\t"+t.getE());
   }
   结果：--------	12	true	Sat Jan 01 00:00:00 CST 2011	100000000
    *
    *  </p>
   */
  @SuppressWarnings("rawtypes")
  public static void copyProperties(Object s,Object t) {
    Class<?> sc = s.getClass() ;
    Class<?> tc = t.getClass() ;
    Method[] ms = sc.getMethods() ;
    Method[] mt = tc.getMethods() ;
    Map<String ,Method> kvMs = new HashMap<String, Method>() ;
    for(Method m : ms){
      if(m.getName().startsWith("get")||m.getName().startsWith("is"))
        kvMs.put(m.getName().substring(3), m) ;
    }


    Method smt =null ;
    for(Method m: mt){

      if(m.getName().startsWith("set")){
        Type[] pcs = m.getParameterTypes() ;
        smt = kvMs.get(m.getName().substring(3)) ;
        if(smt==null)
          continue ;
        if(pcs[0].equals(String.class))
          setInvoke(m, t, getInvoke(kvMs.get(m.getName().substring(3)), s)) ;
        else if (pcs[0].equals(Integer.class)){
          String sv = (String)getInvoke(kvMs.get(m.getName().substring(3)), s) ;
          if(sv==null||"".equals(sv))
            setInvoke(m, t, 0) ;
          else
            setInvoke(m, t, getInteger(sv)) ;
        }else if(pcs[0].equals(Long.class)){
          String sv = (String)getInvoke(kvMs.get(m.getName().substring(3)), s) ;
          if(sv==null||"".equals(sv))
            setInvoke(m, t, 0L) ;
          else
            setInvoke(m, t, getLong(sv)) ;
        }else if(pcs[0].equals(Date.class)){
          String sv = (String)getInvoke(kvMs.get(m.getName().substring(3)), s) ;
          if(sv==null||"".equals(sv))
            setInvoke(m, t, new Date()) ;
          else
            setInvoke(m, t, getDate(sv)) ;
        }else if(((Class)pcs[0]).getName().equals("boolean")){
          String sv = (String)getInvoke(kvMs.get(m.getName().substring(3)), s) ;
          if(sv==null||"".equals(sv))
            setInvoke(m, t, false) ;
          else{
            if(sv.toLowerCase().equals(bln))
              setInvoke(m, t, true) ;
            else
              setInvoke(m, t, false) ;
          }
        } else if(((Class)pcs[0]).getName().equals("int")){
          String sv = (String)getInvoke(kvMs.get(m.getName().substring(3)), s) ;
          if(sv==null||"".equals(sv))
            setInvoke(m, t, 0) ;
          else{
            setInvoke(m, t, getInteger(sv)) ;
          }
        }else if(((Class)pcs[0]).getName().equals("long")){
          String sv = (String)getInvoke(kvMs.get(m.getName().substring(3)), s) ;
          if(sv==null||"".equals(sv))
            setInvoke(m, t, 0L) ;
          else{
            setInvoke(m, t, getLong(sv)) ;
          }
        }
        else{
          System.out.println(((Class)pcs[0]).getName()+"没有实现");
        }

      }
    }

  }

  public static Object getInvoke(Method m,Object o){
    Object rt = null ;
    try {
      rt = m.invoke(o, null) ;
    } catch (IllegalArgumentException e) {
      e.printStackTrace();
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    } catch (InvocationTargetException e) {
      e.printStackTrace();
    }
    return rt ;
  }

  public static void setInvoke(Method m,Object o,Object param){
    try {
      m.invoke(o, param) ;
    } catch (IllegalArgumentException e) {
      e.printStackTrace();
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    } catch (InvocationTargetException e) {
      e.printStackTrace();
    }
  }



  public static Integer getInteger(String s){
    int l = 0 ;
    try {
      l = Integer.parseInt(s) ;
    } catch (NumberFormatException e) {
      e.printStackTrace();
      l=-1 ;
    }
    return l ;
  }

  public static Long getLong(String s){
    long l = 0 ;
    try {
      l = Long.parseLong(s) ;
    } catch (NumberFormatException e) {
      e.printStackTrace();
      l=-1 ;
    }
    return l ;
  }

  public static Date getDate(String s){
    SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
    Date time = null ;
    try {
      time = formatDate.parse(s);
    } catch (ParseException e) {
      e.printStackTrace();
      time = new Date() ;
    }
    return time ;
  }
}
