package cn.com.oims.dao.jdbc.impl;

import cn.com.oims.dao.jdbc.IHistoryInspectResultDao;
import cn.com.oims.dao.pojo.HistoryBaogaoRelation;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class HistoryInspectResultDaoImpl implements IHistoryInspectResultDao {
  private JdbcTemplate hirJdbcTemplate;
  
  private Connection connection;
  
  private Statement statement;
  
  private ResultSet resultSet;
  
  @Resource
  public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
    this.hirJdbcTemplate = jdbcTemplate;
  }
  
  @Override
  public void getJCXMStateByBingLiHao(Map<String, Object> map, String binglihao) {
    String sql_count = "select count(*) from " + map.get("tableName") + 
      " where " + map.get("patientId") + "='" + binglihao + 
      "'";
    System.out.println(sql_count);
    int count = this.hirJdbcTemplate.queryForInt(sql_count);
    map.put("count", Integer.valueOf(count));
  }
  
  @Override
  public List<Map<String, Object>> getJCJGByBingLiHao(String binglihao, HistoryBaogaoRelation historyBaogaoRelation) {
    String sql = "select * from " + historyBaogaoRelation.getTableName() + " where " + 
      historyBaogaoRelation.getPatientId() + " ='" + binglihao + "' order by " + historyBaogaoRelation.getTableDate() + " desc";
    System.out.println(sql);
    return slectList(sql);
  }
  
  @Override
  public List<Map<String, Object>> getJCJGByBingLiHaoAndDate(String binglihao, String date, HistoryBaogaoRelation historyBaogaoRelation) {
    String sql = "select * from " + historyBaogaoRelation.getTableName() + " where " + 
      historyBaogaoRelation.getPatientId() + " ='" + binglihao + "' and " + historyBaogaoRelation.getTableDate() + " = '" + date + "'";
    System.out.println(sql);
    return slectList(sql);
  }
  
  private Map<String, Object> getColumnValue(ResultSet resultSet) throws SQLException, UnsupportedEncodingException {
    Map<String, Object> map = new HashMap<String, Object>();
    ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
    for (int i = 1; i <= resultSetMetaData.getColumnCount(); i++) {
      String columnName = resultSetMetaData.getColumnName(i)
        .toLowerCase();
      switch (resultSetMetaData.getColumnType(i)) {
        case 4:
          map.put(columnName, Integer.valueOf(resultSet.getInt(i)));
          break;
        case 3:
          map.put(columnName, resultSet.getBigDecimal(i));
          break;
        case 91:
          map.put(columnName, resultSet.getDate(i));
          break;
        case 93:
          map.put(columnName, resultSet.getTimestamp(i));
          break;
        default:
          map.put(columnName, (resultSet.getString(i) != null) ? new String(resultSet.getString(i).toString().getBytes("iso-8859-1"), "GBK") : "");
          break;
      } 
    } 
    return map;
  }
  
  public List<Map<String, Object>> slectList(String sql) {
    this.connection = null;
    this.statement = null;
    this.resultSet = null;
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    try {
      this.connection = this.hirJdbcTemplate.getDataSource().getConnection();
      this.statement = this.connection.createStatement();
      this.resultSet = this.statement.executeQuery(sql);
      while (this.resultSet.next()) {
        Map<String, Object> map = getColumnValue(this.resultSet);
        list.add(map);
      } 
    } catch (SQLException e) {
      e.printStackTrace();
    } catch (UnsupportedEncodingException e) {
      e.printStackTrace();
    } finally {
      if (this.resultSet != null) {
        try {
          this.resultSet.close();
        } catch (SQLException sQLException) {}
      }
      if (this.statement != null) {
        try {
          this.statement.close();
        } catch (SQLException sQLException) {}
      }
      if (this.connection != null) {
        try {
          this.connection.close();
        } catch (SQLException sQLException) {}
      }
    } 
    System.out.println("slectList=" + sql);
    return list;
  }
}
