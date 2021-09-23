package cn.com.oims.dao.pojo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author: 黄浩
 * @date: 2020/8/20.
 */
@Entity
@Table(name = "donee")
public class Donee implements Serializable {

    //主键
    private Long id;
    //受体患者id
    private String patient_Id;
    //受体患者姓名
    private String donee_Name;
    //受体患者性别
    private Integer donee_Sex;
    //受体患者年龄
    private Integer donee_Age;
    //受体患者电话
    private Integer donee_tel;
    //受体患者地址
    private String donee_address;
    //受体患者登记日期
    private Date operation_rig_date;
    //受体患者抵达日期
    private Date arrive_date;
    //供体类型
    private Integer donor_type;
    //拟手术方式
    private Integer operation_mode;
    //移植状态
    private Integer migration_status;
    //移植时间
    private Date migration_time;
    //诊断
    private String diagnose;
    //供体编号
    private Integer donator_no;
    //供体姓名
    private String donator_name;
    //供体性别
    private Integer donator_sex;
    //供体年龄
    private Integer donator_age;
    //新增时间
    private Date insert_time;
    //新增用户工号
    private String insert_user;
    //更新时间
    private Date update_time;
    //更新用户工号
    private String update_user;
    //受体证件类型
    private Integer donee_id_type;
    //受体证件号码
    private String donee_id_no;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "donee_sequence")
    @SequenceGenerator(name = "donee_sequence", allocationSize = 1, initialValue = 1, sequenceName = "donee_sequence")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatient_Id() {
        return patient_Id;
    }

    public void setPatient_Id(String patient_Id) {
        this.patient_Id = patient_Id;
    }

    public String getDonee_Name() {
        return donee_Name;
    }

    public void setDonee_Name(String donee_Name) {
        this.donee_Name = donee_Name;
    }

    public Integer getDonee_Sex() {
        return donee_Sex;
    }

    public void setDonee_Sex(Integer donee_Sex) {
        this.donee_Sex = donee_Sex;
    }

    public Integer getDonee_Age() {
        return donee_Age;
    }

    public void setDonee_Age(Integer donee_Age) {
        this.donee_Age = donee_Age;
    }

    public Integer getDonee_tel() {
        return donee_tel;
    }

    public void setDonee_tel(Integer donee_tel) {
        this.donee_tel = donee_tel;
    }

    public String getDonee_address() {
        return donee_address;
    }

    public void setDonee_address(String donee_address) {
        this.donee_address = donee_address;
    }

    public Date getOperation_rig_date() {
        return operation_rig_date;
    }

    public void setOperation_rig_date(Date operation_rig_date) {
        this.operation_rig_date = operation_rig_date;
    }

    public Date getArrive_date() {
        return arrive_date;
    }

    public void setArrive_date(Date arrive_date) {
        this.arrive_date = arrive_date;
    }

    public Integer getDonor_type() {
        return donor_type;
    }

    public void setDonor_type(Integer donor_type) {
        this.donor_type = donor_type;
    }

    public Integer getOperation_mode() {
        return operation_mode;
    }

    public void setOperation_mode(Integer operation_mode) {
        this.operation_mode = operation_mode;
    }

    public Integer getMigration_status() {
        return migration_status;
    }

    public void setMigration_status(Integer migration_status) {
        this.migration_status = migration_status;
    }

    public Date getMigration_time() {
        return migration_time;
    }

    public void setMigration_time(Date migration_time) {
        this.migration_time = migration_time;
    }

    public String getDiagnose() {
        return diagnose;
    }

    public void setDiagnose(String diagnose) {
        this.diagnose = diagnose;
    }

    public Integer getDonator_no() {
        return donator_no;
    }

    public void setDonator_no(Integer donator_no) {
        this.donator_no = donator_no;
    }

    public String getDonator_name() {
        return donator_name;
    }

    public void setDonator_name(String donator_name) {
        this.donator_name = donator_name;
    }

    public Integer getDonator_sex() {
        return donator_sex;
    }

    public void setDonator_sex(Integer donator_sex) {
        this.donator_sex = donator_sex;
    }

    public Integer getDonator_age() {
        return donator_age;
    }

    public void setDonator_age(Integer donator_age) {
        this.donator_age = donator_age;
    }

    public Date getInsert_time() {
        return insert_time;
    }

    public void setInsert_time(Date insert_time) {
        this.insert_time = insert_time;
    }

    public String getInsert_user() {
        return insert_user;
    }

    public void setInsert_user(String insert_user) {
        this.insert_user = insert_user;
    }

    public Date getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(Date update_time) {
        this.update_time = update_time;
    }

    public String getUpdate_user() {
        return update_user;
    }

    public void setUpdate_user(String update_user) {
        this.update_user = update_user;
    }

    public Integer getDonee_id_type() {
        return donee_id_type;
    }

    public void setDonee_id_type(Integer donee_id_type) {
        this.donee_id_type = donee_id_type;
    }

    public String getDonee_id_no() {
        return donee_id_no;
    }

    public void setDonee_id_no(String donee_id_no) {
        this.donee_id_no = donee_id_no;
    }
}
