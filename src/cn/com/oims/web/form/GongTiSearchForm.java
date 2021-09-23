package cn.com.oims.web.form;

/**
 * @author: 黄浩
 * @date: 2020/8/17.
 */
public class GongTiSearchForm {

    private String search;
    //主键
    private Long id;
    //捐献者患者id
    private String patientId;
    //捐献者编号
    private Integer donatorNo;
    //捐献者姓名
    private String donatorName;
    //捐献者性别
    private Integer donatorSex;
    //捐献者年龄
    private Integer donatorAge;
    //获取材料类型
    private Integer materialType;
    //获取时间
    private String takeTime;
    //获取眼别
    private Integer eyeType;
    //分配状态
    private Integer allocationStatus;
    //新增时间
    private String insertTime;
    //新增用户工号
    private String insertUser;
    //更新时间
    private String updateTime;
    //更新用户工号
    private String updateUser;
    //证件类型
    private Integer donatorIdType;
    //证件号码
    private String donatorIdNo;
    //所属医院
    private String belongHospital;
    //家属姓名
    private String familyName;
    //获取单位名称
    private String takeDepartment;
    //角膜材料编号
    private String materialNo;
    //处理结果
    private Integer processingResults;
    //眼库名称
    private String eyeBank;
    //眼库电话
    private Integer bankTel;
    //眼库手机号
    private Integer bankMobile;
    //眼库电子邮箱
    private String bankEmail;
    //国籍/地区
    private String donatorNationality;
    //当前所在地
    private String nowAddress;
    //与捐献者关系
    private Integer familyRelation;
    //病人本人同意捐献眼球/角膜
    private Integer donatorIntension;
    //病人是否向家属或其他人表达过捐献意愿
    private Integer expressIntension;
    //病人配偶、父母及成年子女是否同意病人身故后捐献眼球/角膜
    private Integer familyIntension;
    //艾滋病病毒抗体类型
    private Integer antiHiv;
    //乙型肝炎表面抗原
    private Integer hbsAg;
    //ANTI_HBS
    private Integer antiHbs;
    //抗乙型肝炎核心抗体
    private Integer antiHbc;
    //抗丙型肝炎核心抗体
    private Integer antiHcv;
    //性病实验结果
    private Integer venerealDisease;
    //现病史
    private Integer hpi;
    //家族史
    private Integer familyHistory;
    //既往史
    private Integer previousHistory;
    //个人史
    private Integer personalHistory;
    //死亡时间，具体到时分秒
    private String deathTime;
    //死亡原因
    private Integer deathReason;
    //取材地点
    private String takeAddress;
    //取材成员
    private String takeMembers;
    //派车或自费
    private Integer trafficType;
    //取材后是否规范冷藏条件下转运
    private Integer coldStorage;
    //获取后转运保存方式
    private Integer transferType;
    //角膜材料是否已保存
    private Integer isStoraged;
    //保存时间，具体到时分秒
    private String storageTime;
    //角膜保存方式
    private Integer storageType;
    //角膜评估时间，具体到时分秒
    private String coneaEvaluateTime;
    //巩膜环宽度(mm)
    private Float scleroticRingWidth;
    //角膜直径
    private Float coneaDiam;
    //透明区直径
    private Float hyalomereDiam;
    //J晶体类型
    private Integer crystalType;
    //上皮层是否光滑
    private Integer epitheliumSmooth;
    //基质层是否清亮
    private Integer stromaClear;
    //后弹力层有无褶皱及缺损
    private Integer descemetFold;
    //内皮细胞密度
    private Float ecd;
    //内皮层有无压力线及缺损
    private Integer endotheliumDefect;
    //内皮细胞厚度
    private Float endothelialCellThickness;
    //可应用范围
    private String applicableScope;
    //获取的目的
    private Integer objective;
    //派车或自费
    private Float trafficCost;

    public Float getTrafficCost() {
        return trafficCost;
    }

    public void setTrafficCost(Float trafficCost) {
        this.trafficCost = trafficCost;
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

    public Integer getMaterialType() {
        return materialType;
    }

    public void setMaterialType(Integer materialType) {
        this.materialType = materialType;
    }

    public Integer getEyeType() {
        return eyeType;
    }

    public void setEyeType(Integer eyeType) {
        this.eyeType = eyeType;
    }

    public Integer getAllocationStatus() {
        return allocationStatus;
    }

    public void setAllocationStatus(Integer allocationStatus) {
        this.allocationStatus = allocationStatus;
    }

    public String getInsertUser() {
        return insertUser;
    }

    public void setInsertUser(String insertUser) {
        this.insertUser = insertUser;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    public Integer getDonatorIdType() {
        return donatorIdType;
    }

    public void setDonatorIdType(Integer donatorIdType) {
        this.donatorIdType = donatorIdType;
    }

    public String getDonatorIdNo() {
        return donatorIdNo;
    }

    public void setDonatorIdNo(String donatorIdNo) {
        this.donatorIdNo = donatorIdNo;
    }

    public String getBelongHospital() {
        return belongHospital;
    }

    public void setBelongHospital(String belongHospital) {
        this.belongHospital = belongHospital;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getTakeDepartment() {
        return takeDepartment;
    }

    public void setTakeDepartment(String takeDepartment) {
        this.takeDepartment = takeDepartment;
    }

    public String getMaterialNo() {
        return materialNo;
    }

    public void setMaterialNo(String materialNo) {
        this.materialNo = materialNo;
    }

    public Integer getProcessingResults() {
        return processingResults;
    }

    public void setProcessingResults(Integer processingResults) {
        this.processingResults = processingResults;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getTakeTime() {
        return takeTime;
    }

    public void setTakeTime(String takeTime) {
        this.takeTime = takeTime;
    }

    public String getInsertTime() {
        return insertTime;
    }

    public void setInsertTime(String insertTime) {
        this.insertTime = insertTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getEyeBank() {
        return eyeBank;
    }

    public void setEyeBank(String eyeBank) {
        this.eyeBank = eyeBank;
    }

    public Integer getBankTel() {
        return bankTel;
    }

    public void setBankTel(Integer bankTel) {
        this.bankTel = bankTel;
    }

    public Integer getBankMobile() {
        return bankMobile;
    }

    public void setBankMobile(Integer bankMobile) {
        this.bankMobile = bankMobile;
    }

    public String getBankEmail() {
        return bankEmail;
    }

    public void setBankEmail(String bankEmail) {
        this.bankEmail = bankEmail;
    }

    public String getDonatorNationality() {
        return donatorNationality;
    }

    public void setDonatorNationality(String donatorNationality) {
        this.donatorNationality = donatorNationality;
    }

    public String getNowAddress() {
        return nowAddress;
    }

    public void setNowAddress(String nowAddress) {
        this.nowAddress = nowAddress;
    }

    public Integer getFamilyRelation() {
        return familyRelation;
    }

    public void setFamilyRelation(Integer familyRelation) {
        this.familyRelation = familyRelation;
    }

    public Integer getDonatorIntension() {
        return donatorIntension;
    }

    public void setDonatorIntension(Integer donatorIntension) {
        this.donatorIntension = donatorIntension;
    }

    public Integer getExpressIntension() {
        return expressIntension;
    }

    public void setExpressIntension(Integer expressIntension) {
        this.expressIntension = expressIntension;
    }

    public Integer getFamilyIntension() {
        return familyIntension;
    }

    public void setFamilyIntension(Integer familyIntension) {
        this.familyIntension = familyIntension;
    }

    public Integer getAntiHiv() {
        return antiHiv;
    }

    public void setAntiHiv(Integer antiHiv) {
        this.antiHiv = antiHiv;
    }

    public Integer getHbsAg() {
        return hbsAg;
    }

    public void setHbsAg(Integer hbsAg) {
        this.hbsAg = hbsAg;
    }

    public Integer getAntiHbs() {
        return antiHbs;
    }

    public void setAntiHbs(Integer antiHbs) {
        this.antiHbs = antiHbs;
    }

    public Integer getAntiHbc() {
        return antiHbc;
    }

    public void setAntiHbc(Integer antiHbc) {
        this.antiHbc = antiHbc;
    }

    public Integer getAntiHcv() {
        return antiHcv;
    }

    public void setAntiHcv(Integer antiHcv) {
        this.antiHcv = antiHcv;
    }

    public Integer getVenerealDisease() {
        return venerealDisease;
    }

    public void setVenerealDisease(Integer venerealDisease) {
        this.venerealDisease = venerealDisease;
    }

    public Integer getHpi() {
        return hpi;
    }

    public void setHpi(Integer hpi) {
        this.hpi = hpi;
    }

    public Integer getFamilyHistory() {
        return familyHistory;
    }

    public void setFamilyHistory(Integer familyHistory) {
        this.familyHistory = familyHistory;
    }

    public Integer getPreviousHistory() {
        return previousHistory;
    }

    public void setPreviousHistory(Integer previousHistory) {
        this.previousHistory = previousHistory;
    }

    public Integer getPersonalHistory() {
        return personalHistory;
    }

    public void setPersonalHistory(Integer personalHistory) {
        this.personalHistory = personalHistory;
    }

    public String getDeathTime() {
        return deathTime;
    }

    public void setDeathTime(String deathTime) {
        this.deathTime = deathTime;
    }

    public Integer getDeathReason() {
        return deathReason;
    }

    public void setDeathReason(Integer deathReason) {
        this.deathReason = deathReason;
    }

    public String getTakeAddress() {
        return takeAddress;
    }

    public void setTakeAddress(String takeAddress) {
        this.takeAddress = takeAddress;
    }

    public String getTakeMembers() {
        return takeMembers;
    }

    public void setTakeMembers(String takeMembers) {
        this.takeMembers = takeMembers;
    }

    public Integer getTrafficType() {
        return trafficType;
    }

    public void setTrafficType(Integer trafficType) {
        this.trafficType = trafficType;
    }

    public Integer getColdStorage() {
        return coldStorage;
    }

    public void setColdStorage(Integer coldStorage) {
        this.coldStorage = coldStorage;
    }

    public Integer getTransferType() {
        return transferType;
    }

    public void setTransferType(Integer transferType) {
        this.transferType = transferType;
    }

    public Integer getIsStoraged() {
        return isStoraged;
    }

    public void setIsStoraged(Integer isStoraged) {
        this.isStoraged = isStoraged;
    }

    public String getStorageTime() {
        return storageTime;
    }

    public void setStorageTime(String storageTime) {
        this.storageTime = storageTime;
    }

    public Integer getStorageType() {
        return storageType;
    }

    public void setStorageType(Integer storageType) {
        this.storageType = storageType;
    }

    public String getConeaEvaluateTime() {
        return coneaEvaluateTime;
    }

    public void setConeaEvaluateTime(String coneaEvaluateTime) {
        this.coneaEvaluateTime = coneaEvaluateTime;
    }

    public Float getScleroticRingWidth() {
        return scleroticRingWidth;
    }

    public void setScleroticRingWidth(Float scleroticRingWidth) {
        this.scleroticRingWidth = scleroticRingWidth;
    }

    public Float getConeaDiam() {
        return coneaDiam;
    }

    public void setConeaDiam(Float coneaDiam) {
        this.coneaDiam = coneaDiam;
    }

    public Float getHyalomereDiam() {
        return hyalomereDiam;
    }

    public void setHyalomereDiam(Float hyalomereDiam) {
        this.hyalomereDiam = hyalomereDiam;
    }

    public Integer getCrystalType() {
        return crystalType;
    }

    public void setCrystalType(Integer crystalType) {
        this.crystalType = crystalType;
    }

    public Integer getEpitheliumSmooth() {
        return epitheliumSmooth;
    }

    public void setEpitheliumSmooth(Integer epitheliumSmooth) {
        this.epitheliumSmooth = epitheliumSmooth;
    }

    public Integer getStromaClear() {
        return stromaClear;
    }

    public void setStromaClear(Integer stromaClear) {
        this.stromaClear = stromaClear;
    }

    public Integer getDescemetFold() {
        return descemetFold;
    }

    public void setDescemetFold(Integer descemetFold) {
        this.descemetFold = descemetFold;
    }

    public Float getEcd() {
        return ecd;
    }

    public void setEcd(Float ecd) {
        this.ecd = ecd;
    }

    public Integer getEndotheliumDefect() {
        return endotheliumDefect;
    }

    public void setEndotheliumDefect(Integer endotheliumDefect) {
        this.endotheliumDefect = endotheliumDefect;
    }

    public Float getEndothelialCellThickness() {
        return endothelialCellThickness;
    }

    public void setEndothelialCellThickness(Float endothelialCellThickness) {
        this.endothelialCellThickness = endothelialCellThickness;
    }

    public String getApplicableScope() {
        return applicableScope;
    }

    public void setApplicableScope(String applicableScope) {
        this.applicableScope = applicableScope;
    }

    public Integer getObjective() {
        return objective;
    }

    public void setObjective(Integer objective) {
        this.objective = objective;
    }
}
