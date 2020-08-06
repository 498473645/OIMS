package cn.com.oims.dao.jdbc.impl;

import cn.com.oims.dao.jdbc.IMiddleControlFskDao;
import java.io.UnsupportedEncodingException;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class MiddleControlFskDaoimpl implements IMiddleControlFskDao {
  private String language;
  
  private String hislanguage;
  
  private JdbcTemplate middleControlJdbcTemplate;
  
  public MiddleControlFskDaoimpl() {
    this.language = "GBK";
    this.hislanguage = "iso-8859-1";
  }
  
  @Resource
  public void setMiddleControlJdbcTemplate(JdbcTemplate middleControlJdbcTemplate) {
    this.middleControlJdbcTemplate = middleControlJdbcTemplate;
  }
  
  public String findMiddleControlFskAddress(String temp) {
    try {
      temp = new String(temp.getBytes(), this.hislanguage);
    } catch (UnsupportedEncodingException e1) {
      e1.printStackTrace();
    } 
    String sql = "select station_location as location from station where aetitle='" + temp + "'";
    String location = (String)this.middleControlJdbcTemplate.queryForObject(sql, new RowMapper<String>() {
          public String mapRow(ResultSet rs, int arg1) throws SQLException {
            try {
              return new String(rs.getBytes("location"), MiddleControlFskDaoimpl.this.language);
            } catch (UnsupportedEncodingException e) {
              e.printStackTrace();
              return null;
            } 
          }
        });
    return location;
  }
}
