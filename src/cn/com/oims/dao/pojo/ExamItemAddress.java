package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author: hh
 * @date: 2021/8/19
 */
@Entity
@Table(name = "exam_item_address")
public class ExamItemAddress implements Serializable {

    @Id
    @Column(name = "deptCode")
    private String deptCode;
    private String name;
    private String location;
    private String memos;


    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDeptCode() {
        return this.deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMemos() {
        return memos;
    }

    public void setMemos(String memos) {
        this.memos = memos;
    }
}
