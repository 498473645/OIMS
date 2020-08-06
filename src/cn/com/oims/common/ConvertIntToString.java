package cn.com.oims.common;

public class ConvertIntToString {
  public static String getHaobie(int haobie) {
    String str = null;
    switch (haobie) {
      case 0:
        str = "普通号";
        break;
      case 1:
        str = "专家号";
        break;
      case 2:
        str = "特需号";
        break;
    } 
    return str;
  }
  
  public static String getZhibanshijian(int shijian) {
    String str = null;
    switch (shijian) {
      case 0:
        str = "全天";
        break;
      case 1:
        str = "上午";
        break;
      case 2:
        str = "下午";
        break;
    } 
    return str;
  }
  
  public static String getZhenbie(int zhenbie) {
    String str = null;
    switch (zhenbie) {
      case 0:
        str = "急诊";
        break;
      case 1:
        str = "门诊";
        break;
      case 2:
        str = "会诊";
        break;
      case 3:
        str = "出诊";
        break;
      case 4:
        str = "义诊";
        break;
    } 
    return str;
  }
  
  public static String getXingqishu(int xingqishu) {
    String str = null;
    switch (xingqishu) {
      case 0:
        str = "星期日";
        break;
      case 1:
        str = "星期一";
        break;
      case 2:
        str = "星期二";
        break;
      case 3:
        str = "星期三";
        break;
      case 4:
        str = "星期四";
        break;
      case 5:
        str = "星期五";
        break;
      case 6:
        str = "星期六";
        break;
    } 
    return str;
  }
  
  public static String getXingbie(int xingbie) {
    String str = null;
    switch (xingbie) {
      case 0:
        str = "女";
        break;
      case 1:
        str = "男";
        break;
    } 
    return str;
  }
  
  public static String getState(int state) {
    String str = null;
    switch (state) {
      case 0:
        str = "未接诊";
        break;
      case 1:
        str = "已接诊";
        break;
      case 2:
        str = "已完成";
        break;
      case 3:
        str = "已过号";
        break;
    } 
    return str;
  }
  
  public static String getBiaoshi(int biaoshi) {
    String bs = null;
    switch (biaoshi) {
      case 50:
        bs = "待检查";
        return bs;
      case 51:
        bs = "已检查";
        return bs;
      case 52:
        bs = "待补传";
        return bs;
      case 53:
        bs = "已过号";
        return bs;
      case 54:
        bs = "检查中";
        return bs;
      case 55:
        bs = "等上传";
        return bs;
      case 56:
        bs = "已完成";
        return bs;
      case 57:
        bs = "待上传连接异常";
        return bs;
      case 58:
        bs = "待上传文件丢失";
        return bs;
      case 59:
        bs = "上传中连接异常";
        return bs;
      case 60:
        bs = "上传中文件丢失";
        return bs;
      case 61:
        bs = "上传中文件错误";
        return bs;
    } 
    bs = "已开单";
    return bs;
  }
  
  public static String getLeibie(int biaoshi) {
    String bs = null;
    switch (biaoshi) {
      case 6:
        bs = "主诉";
        return bs;
      case 7:
        bs = "现病史";
        return bs;
      case 8:
        bs = "既往史";
        return bs;
      case 9:
        bs = "诊断";
        return bs;
      case 10:
        bs = "检查可见";
        return bs;
      case 12:
        bs = "检查提示";
        return bs;
    } 
    bs = "检查要求";
    return bs;
  }
  
  public static String getYanbie(int Yanbie) {
    String bs = null;
    switch (Yanbie) {
      case 0:
        bs = "右眼";
        return bs;
      case 1:
        bs = "左眼";
        return bs;
      case 2:
        bs = "双眼";
        return bs;
    } 
    bs = "";
    return bs;
  }
}
