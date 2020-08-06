package cn.com.oims.common;

import org.hibernate.Hibernate;
import org.hibernate.dialect.Oracle9iDialect;
import org.hibernate.dialect.function.SQLFunction;
import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.type.Type;

public class OracleWmCodeDialect extends Oracle9iDialect {
  public OracleWmCodeDialect() {
    registerFunction("wm_concat", (SQLFunction)new StandardSQLFunction("wm_concat", (Type)Hibernate.STRING));
  }
}
