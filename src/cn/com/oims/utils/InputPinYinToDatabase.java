package cn.com.oims.utils;

import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.TemplateVariable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InputPinYinToDatabase {
  private String shuru;
  
  private String pinyin;
  
  private String shuru_result;
  
  private String pinyin_result;
  
  private List<TemplateVariable> list;
  
  private String regex = " ";
  
  public InputPinYinToDatabase(ShuruMoban shuruMoban) {
    this.shuru = shuruMoban.getShuru();
    this.pinyin = Cn2Spell.converterToFirstSpell(this.shuru);
    this.shuru_result = this.shuru;
    this.pinyin_result = this.pinyin;
    this.list = new ArrayList<>();
  }
  
  public Map<String, Object> inputAndPinyinToDatabase() {
    inputAndPinyiniteration();
    Map<String, Object> map = new HashMap<>();
    map.put("input", this.shuru_result);
    map.put("pinyin", this.pinyin_result);
    map.put("variablecollection", this.list);
    return map;
  }
  
  public void inputAndPinyiniteration() {
    Pattern pattern = Pattern.compile("\\{([^\\{]*?)\\}");
    Matcher matcher = pattern.matcher(this.shuru);
    StringBuffer buffer = new StringBuffer();
    int i = 0, end = this.shuru.length();
    while (matcher.find()) {
      String group = matcher.group();
      group = group.substring(1, group.length() - 1).trim();
      if (group.length() == 0)
        continue; 
      TemplateVariable tv = new TemplateVariable();
      tv.setVariable(group);
      tv.setVindex(Integer.valueOf(i++));
      this.list.add(tv);
      matcher.appendReplacement(buffer, "?");
      end = matcher.end();
    } 
    if (this.list.size() > 0) {
      this.shuru_result = buffer.append(this.shuru.substring(end)).toString();
      end = this.pinyin.length();
      Matcher pinyinMatcher = pattern.matcher(this.pinyin);
      StringBuffer pinyinBuffer = new StringBuffer();
      while (pinyinMatcher.find()) {
        String group = pinyinMatcher.group();
        group = group.substring(1, group.length() - 1).trim();
        if (group.length() == 0)
          continue; 
        String[] tvStr = group.split(this.regex);
        pinyinMatcher.appendReplacement(pinyinBuffer, tvStr[0]);
        end = pinyinMatcher.end();
      } 
      this.pinyin_result = pinyinBuffer.append(this.pinyin.substring(end)).toString();
    } else {
      this.shuru_result = this.shuru;
    } 
  }
}
