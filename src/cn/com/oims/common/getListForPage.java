package cn.com.oims.common;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class getListForPage {
  public static List getPageList(List list, int currentPage, int maxNum, int pageNum) {
    int fromIndex = 0;
    int toIndex = 0;
    if (list == null || list.size() == 0)
      return null; 
    if (currentPage <= pageNum && currentPage != 0) {
      fromIndex = (currentPage - 1) * maxNum;
      if (currentPage == pageNum) {
        toIndex = list.size();
      } else {
        toIndex = currentPage * maxNum;
      } 
    } 
    return list.subList(fromIndex, toIndex);
  }
  
  public static boolean checkList(Map map, List list) {
    boolean flag = false;
    List l = new ArrayList();
    Set set = map.keySet();
    Iterator iterator = set.iterator();
    while (iterator.hasNext())
      l.add(map.get(iterator)); 
    for (int i = 0; i < l.size(); i++) {
      if (l.get(i).equals(list.get(i))) {
        flag = true;
      } else {
        flag = false;
      } 
    } 
    return flag;
  }
}
