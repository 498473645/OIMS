package cn.com.oims.web.form;

/**
 * @author: 黄浩
 * @date: 2020/8/20.
 */
public class ShouTiSearchForm {

    private String search;
    //主键
    private Long id;
    //受体患者id
    private String patientId;
    //受体患者姓名
    private String doneeName;
    //受体患者性别
    private Integer doneeSex;
    //受体患者年龄
    private Integer doneeAge;
    //受体患者电话
    private Integer doneeTel;
    //受体患者地址
    private String doneeAddress;
    //受体患者登记日期
    private String operationRigDate;
    //受体患者抵达日期
    private String arriveDate;
    //供体类型
    private Integer donorType;
    //拟手术方式
    private Integer operationMode;
    //移植状态
    private Integer migrationStatus;
    //移植时间
    private String migrationTime;
    //诊断
    private String diagnose;
    //供体编号
    private Integer donatorNo;
    //供体姓名
    private String donatorName;
    //供体性别
    private Integer donatorSex;
    //供体年龄
    private Integer donatorAge;
    //新增时间
    private String insertTime;
    //新增用户工号
    private String insertUser;
    //更新时间
    private String updateTime;
    //更新用户工号
    private String updateUser;
    //受体证件类型
    private Integer doneeIdType;
    //受体证件号码
    private String doneeIdNo;

    public Integer getDoneeIdType() {
        return doneeIdType;
    }

    public void setDoneeIdType(Integer doneeIdType) {
        this.doneeIdType = doneeIdType;
    }

    public String getDoneeIdNo() {
        return doneeIdNo;
    }

    public void setDoneeIdNo(String doneeIdNo) {
        this.doneeIdNo = doneeIdNo;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getDoneeName() {
        return doneeName;
    }

    public void setDoneeName(String doneeName) {
        this.doneeName = doneeName;
    }

    public Integer getDoneeSex() {
        return doneeSex;
    }

    public void setDoneeSex(Integer doneeSex) {
        this.doneeSex = doneeSex;
    }

    public Integer getDoneeAge() {
        return doneeAge;
    }

    public void setDoneeAge(Integer doneeAge) {
        this.doneeAge = doneeAge;
    }

    public Integer getDoneeTel() {
        return doneeTel;
    }

    public void setDoneeTel(Integer doneeTel) {
        this.doneeTel = doneeTel;
    }

    public String getDoneeAddress() {
        return doneeAddress;
    }

    public void setDoneeAddress(String doneeAddress) {
        this.doneeAddress = doneeAddress;
    }

    public String getOperationRigDate() {
        return operationRigDate;
    }

    public void setOperationRigDate(String operationRigDate) {
        this.operationRigDate = operationRigDate;
    }

    public String getArriveDate() {
        return arriveDate;
    }

    public void setArriveDate(String arriveDate) {
        this.arriveDate = arriveDate;
    }

    public Integer getDonorType() {
        return donorType;
    }

    public void setDonorType(Integer donorType) {
        this.donorType = donorType;
    }

    public Integer getOperationMode() {
        return operationMode;
    }

    public void setOperationMode(Integer operationMode) {
        this.operationMode = operationMode;
    }

    public Integer getMigrationStatus() {
        return migrationStatus;
    }

    public void setMigrationStatus(Integer migrationStatus) {
        this.migrationStatus = migrationStatus;
    }

    public String getMigrationTime() {
        return migrationTime;
    }

    public void setMigrationTime(String migrationTime) {
        this.migrationTime = migrationTime;
    }

    public String getDiagnose() {
        return diagnose;
    }

    public void setDiagnose(String diagnose) {
        this.diagnose = diagnose;
    }

    public Integer getDonatorNo() {
        return donatorNo;
    }

    public void setDonatorNo(Integer donatorNo) {
        this.donatorNo = donatorNo;
    }

    public String getDonatorName() {
        return donatorName;
    }

    public void setDonatorName(String donatorName) {
        this.donatorName = donatorName;
    }

    public Integer getDonatorSex() {
        return donatorSex;
    }

    public void setDonatorSex(Integer donatorSex) {
        this.donatorSex = donatorSex;
    }

    public Integer getDonatorAge() {
        return donatorAge;
    }

    public void setDonatorAge(Integer donatorAge) {
        this.donatorAge = donatorAge;
    }

    public String getInsertTime() {
        return insertTime;
    }

    public void setInsertTime(String insertTime) {
        this.insertTime = insertTime;
    }

    public String getInsertUser() {
        return insertUser;
    }

    public void setInsertUser(String insertUser) {
        this.insertUser = insertUser;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }
}
