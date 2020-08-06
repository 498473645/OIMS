package cn.com.oims.utils;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

public class Cn2Spell {
  public static String converterToFirstSpell(String chines) {
    StringBuilder pinyinName = new StringBuilder();
    char[] nameChar = chines.toCharArray();
    for (int i = 0; i < nameChar.length; i++) {
      try {
        String[] c = PinyinHelper.toHanyuPinyinStringArray(nameChar[i], 
            getDefauultOutPutFormat());
        if (c != null)
          pinyinName.append(c[0].charAt(0)); 
      } catch (BadHanyuPinyinOutputFormatCombination e) {
        e.printStackTrace();
      } 
    } 
    return pinyinName.toString();
  }
  
  public static String converterToSpell(String chines) throws BadHanyuPinyinOutputFormatCombination {
    String zhongWenName = "";
    char[] nameChar = chines.toCharArray();
    for (int i = 0; i < nameChar.length; i++) {
      String[] pinyin = PinyinHelper.toHanyuPinyinStringArray(
          nameChar[i], getDefauultOutPutFormat());
      if (pinyin != null) {
        zhongWenName = String.valueOf(zhongWenName) + pinyin[0];
      } else {
        zhongWenName = String.valueOf(zhongWenName) + nameChar[i];
      } 
    } 
    return zhongWenName;
  }
  
  public static String converterToSpellByOneUpperCase(String chines) {
    String zhongWenName = "";
    try {
      char[] nameChar = chines.toCharArray();
      for (int i = 0; i < nameChar.length; i++) {
        String[] pinyin = PinyinHelper.toHanyuPinyinStringArray(
            nameChar[i], getDefauultOutPutFormat());
        if (pinyin != null) {
          zhongWenName = String.valueOf(zhongWenName) + toUpperCaseByOne(pinyin[0]);
        } else {
          zhongWenName = String.valueOf(zhongWenName) + nameChar[i];
        } 
      } 
    } catch (BadHanyuPinyinOutputFormatCombination e) {
      e.printStackTrace();
    } 
    return zhongWenName;
  }
  
  public static HanyuPinyinOutputFormat getDefauultOutPutFormat() {
    HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
    defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
    defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
    defaultFormat.setVCharType(HanyuPinyinVCharType.WITH_U_UNICODE);
    return defaultFormat;
  }
  
  public static String toUpperCaseByOne(String s) {
    char[] ch = s.toCharArray();
    if (ch[0] >= 'a' && ch[0] <= 'z')
      ch[0] = (char)(ch[0] - 32); 
    s = new String(ch);
    return s;
  }
  
  public static void main(String[] args) throws BadHanyuPinyinOutputFormatCombination {
    String a = "张俊泽C(";
    String b = converterToSpell(a);
    String c = converterToFirstSpell(a);
    String d = converterToSpellByOneUpperCase(a);
    System.out.println(b);
    System.out.println(c);
    System.out.println(d);
  }
}
