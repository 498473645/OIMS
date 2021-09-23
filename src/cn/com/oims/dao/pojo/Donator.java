package cn.com.oims.dao.pojo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author: 黄浩
 * @date: 2020/8/17.
 */
@Entity
@Table(name = "donator")
public class Donator implements Serializable {

    //主键
    private Long id;
    //捐献者患者id
    private String patient_Id;
    //捐献者编号
    private Integer donator_No;
    //捐献者姓名
    private String donator_Name;
    //捐献者性别
    private Integer donator_Sex;
    //捐献者年龄
    private Integer donator_Age;
    //获取材料类型
    private Integer material_Type;
    //获取时间
    private Date take_Time;
    //获取眼别
    private Integer eye_Type;
    //分配状态
    private Integer allocation_Status;
    //新增时间
    private Date insert_Time;
    //新增用户工号
    private String insert_User;
    //更新时间
    private Date update_Time;
    //更新用户工号
    private String update_User;
    //证件类型
    private Integer donator_id_type;
    //证件号码
    private String donator_id_No;
    //所属医院
    private String belong_hospital;
    //家属姓名
    private String family_name;
    //获取单位名称
    private String take_department;
    //角膜材料编号
    private String material_no;
    //处理结果
    private Integer processing_results;
    //眼库名称
    private String eye_bank;
    //眼库电话
    private Integer bank_tel;
    //眼库手机号
    private Integer bank_mobile;
    //眼库电子邮箱
    private String bank_email;
    //国籍/地区
    private String donator_nationality;
    //当前所在地
    private String now_address;
    //与捐献者关系
    private Integer family_relation;
    //病人本人同意捐献眼球/角膜
    private Integer donator_intension;
    //病人是否向家属或其他人表达过捐献意愿
    private Integer express_intension;
    //病人配偶、父母及成年子女是否同意病人身故后捐献眼球/角膜
    private Integer family_intension;
    //艾滋病病毒抗体类型
    private Integer anti_hiv;
    //乙型肝炎表面抗原
    private Integer hbs_ag;
    //ANTI_HBS
    private Integer anti_hbs;
    //抗乙型肝炎核心抗体
    private Integer anti_hbc;
    //抗丙型肝炎核心抗体
    private Integer anti_hcv;
    //性病实验结果
    private Integer venereal_disease;
    //现病史
    private Integer hpi;
    //家族史
    private Integer family_history;
    //既往史
    private Integer previous_history;
    //个人史
    private Integer personal_history;
    //死亡时间，具体到时分秒
    private Date death_time;
    //死亡原因
    private Integer death_reason;
    //取材地点
    private String take_address;
    //取材成员
    private String take_members;
    //派车或自费
    private Integer traffic_type;
    //取材后是否规范冷藏条件下转运
    private Integer cold_storage;
    //获取后转运保存方式
    private Integer transfer_type;
    //角膜材料是否已保存
    private Integer is_storaged;
    //保存时间，具体到时分秒
    private Date storage_time;
    //角膜保存方式
    private Integer storage_type;
    //角膜评估时间，具体到时分秒
    private Date conea_evaluate_time;
    //巩膜环宽度(mm)
    private Float sclerotic_ring_width;
    //角膜直径
    private Float conea_diam;
    //透明区直径
    private Float hyalomere_diam;
    //J晶体类型
    private Integer crystal_type;
    //上皮层是否光滑
    private Integer epithelium_smooth;
    //基质层是否清亮
    private Integer stroma_clear;
    //后弹力层有无褶皱及缺损
    private Integer descemet_fold;
    //内皮细胞密度
    private Float ecd;
    //内皮层有无压力线及缺损
    private Integer endothelium_defect;
    //内皮细胞厚度
    private Float endothelial_cell_thickness;
    //可应用范围
    private String applicable_scope;
    //获取的目的
    private Integer objective;
    //派车或自费的花费金额
    private Float traffic_cost;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "donator_sequence")
    @SequenceGenerator(name = "donator_sequence", allocationSize = 1, initialValue = 1, sequenceName = "donator_sequence")
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

    public Integer getDonator_No() {
        return donator_No;
    }

    public void setDonator_No(Integer donator_No) {
        this.donator_No = donator_No;
    }

    public String getDonator_Name() {
        return donator_Name;
    }

    public void setDonator_Name(String donator_Name) {
        this.donator_Name = donator_Name;
    }

    public Integer getDonator_Sex() {
        return donator_Sex;
    }

    public void setDonator_Sex(Integer donator_Sex) {
        this.donator_Sex = donator_Sex;
    }

    public Integer getDonator_Age() {
        return donator_Age;
    }

    public void setDonator_Age(Integer donator_Age) {
        this.donator_Age = donator_Age;
    }

    public Integer getMaterial_Type() {
        return material_Type;
    }

    public void setMaterial_Type(Integer material_Type) {
        this.material_Type = material_Type;
    }

    public Date getTake_Time() {
        return take_Time;
    }

    public void setTake_Time(Date take_Time) {
        this.take_Time = take_Time;
    }

    public Integer getEye_Type() {
        return eye_Type;
    }

    public void setEye_Type(Integer eye_Type) {
        this.eye_Type = eye_Type;
    }

    public Integer getAllocation_Status() {
        return allocation_Status;
    }

    public void setAllocation_Status(Integer allocation_Status) {
        this.allocation_Status = allocation_Status;
    }

    public Date getInsert_Time() {
        return insert_Time;
    }

    public void setInsert_Time(Date insert_Time) {
        this.insert_Time = insert_Time;
    }

    public String getInsert_User() {
        return insert_User;
    }

    public void setInsert_User(String insert_User) {
        this.insert_User = insert_User;
    }

    public Date getUpdate_Time() {
        return update_Time;
    }

    public void setUpdate_Time(Date update_Time) {
        this.update_Time = update_Time;
    }

    public String getUpdate_User() {
        return update_User;
    }

    public void setUpdate_User(String update_User) {
        this.update_User = update_User;
    }

    public Integer getDonator_id_type() {
        return donator_id_type;
    }

    public void setDonator_id_type(Integer donator_id_type) {
        this.donator_id_type = donator_id_type;
    }

    public String getDonator_id_No() {
        return donator_id_No;
    }

    public void setDonator_id_No(String donator_id_No) {
        this.donator_id_No = donator_id_No;
    }

    public String getBelong_hospital() {
        return belong_hospital;
    }

    public void setBelong_hospital(String belong_hospital) {
        this.belong_hospital = belong_hospital;
    }

    public String getFamily_name() {
        return family_name;
    }

    public void setFamily_name(String family_name) {
        this.family_name = family_name;
    }

    public String getTake_department() {
        return take_department;
    }

    public void setTake_department(String take_department) {
        this.take_department = take_department;
    }

    public String getMaterial_no() {
        return material_no;
    }

    public void setMaterial_no(String material_no) {
        this.material_no = material_no;
    }

    public Integer getProcessing_results() {
        return processing_results;
    }

    public void setProcessing_results(Integer processing_results) {
        this.processing_results = processing_results;
    }

    public String getEye_bank() {
        return eye_bank;
    }

    public void setEye_bank(String eye_bank) {
        this.eye_bank = eye_bank;
    }

    public Integer getBank_tel() {
        return bank_tel;
    }

    public void setBank_tel(Integer bank_tel) {
        this.bank_tel = bank_tel;
    }

    public Integer getBank_mobile() {
        return bank_mobile;
    }

    public void setBank_mobile(Integer bank_mobile) {
        this.bank_mobile = bank_mobile;
    }

    public String getBank_email() {
        return bank_email;
    }

    public void setBank_email(String bank_email) {
        this.bank_email = bank_email;
    }

    public String getDonator_nationality() {
        return donator_nationality;
    }

    public void setDonator_nationality(String donator_nationality) {
        this.donator_nationality = donator_nationality;
    }

    public String getNow_address() {
        return now_address;
    }

    public void setNow_address(String now_address) {
        this.now_address = now_address;
    }

    public Integer getFamily_relation() {
        return family_relation;
    }

    public void setFamily_relation(Integer family_relation) {
        this.family_relation = family_relation;
    }

    public Integer getDonator_intension() {
        return donator_intension;
    }

    public void setDonator_intension(Integer donator_intension) {
        this.donator_intension = donator_intension;
    }

    public Integer getExpress_intension() {
        return express_intension;
    }

    public void setExpress_intension(Integer express_intension) {
        this.express_intension = express_intension;
    }

    public Integer getFamily_intension() {
        return family_intension;
    }

    public void setFamily_intension(Integer family_intension) {
        this.family_intension = family_intension;
    }

    public Integer getAnti_hiv() {
        return anti_hiv;
    }

    public void setAnti_hiv(Integer anti_hiv) {
        this.anti_hiv = anti_hiv;
    }

    public Integer getHbs_ag() {
        return hbs_ag;
    }

    public void setHbs_ag(Integer hbs_ag) {
        this.hbs_ag = hbs_ag;
    }

    public Integer getAnti_hbs() {
        return anti_hbs;
    }

    public void setAnti_hbs(Integer anti_hbs) {
        this.anti_hbs = anti_hbs;
    }

    public Integer getAnti_hbc() {
        return anti_hbc;
    }

    public void setAnti_hbc(Integer anti_hbc) {
        this.anti_hbc = anti_hbc;
    }

    public Integer getAnti_hcv() {
        return anti_hcv;
    }

    public void setAnti_hcv(Integer anti_hcv) {
        this.anti_hcv = anti_hcv;
    }

    public Integer getVenereal_disease() {
        return venereal_disease;
    }

    public void setVenereal_disease(Integer venereal_disease) {
        this.venereal_disease = venereal_disease;
    }

    public Integer getHpi() {
        return hpi;
    }

    public void setHpi(Integer hpi) {
        this.hpi = hpi;
    }

    public Integer getFamily_history() {
        return family_history;
    }

    public void setFamily_history(Integer family_history) {
        this.family_history = family_history;
    }

    public Integer getPrevious_history() {
        return previous_history;
    }

    public void setPrevious_history(Integer previous_history) {
        this.previous_history = previous_history;
    }

    public Integer getPersonal_history() {
        return personal_history;
    }

    public void setPersonal_history(Integer personal_history) {
        this.personal_history = personal_history;
    }

    public Date getDeath_time() {
        return death_time;
    }

    public void setDeath_time(Date death_time) {
        this.death_time = death_time;
    }

    public Integer getDeath_reason() {
        return death_reason;
    }

    public void setDeath_reason(Integer death_reason) {
        this.death_reason = death_reason;
    }

    public String getTake_address() {
        return take_address;
    }

    public void setTake_address(String take_address) {
        this.take_address = take_address;
    }

    public String getTake_members() {
        return take_members;
    }

    public void setTake_members(String take_members) {
        this.take_members = take_members;
    }

    public Integer getTraffic_type() {
        return traffic_type;
    }

    public void setTraffic_type(Integer traffic_type) {
        this.traffic_type = traffic_type;
    }

    public Integer getCold_storage() {
        return cold_storage;
    }

    public void setCold_storage(Integer cold_storage) {
        this.cold_storage = cold_storage;
    }

    public Integer getTransfer_type() {
        return transfer_type;
    }

    public void setTransfer_type(Integer transfer_type) {
        this.transfer_type = transfer_type;
    }

    public Integer getIs_storaged() {
        return is_storaged;
    }

    public void setIs_storaged(Integer is_storaged) {
        this.is_storaged = is_storaged;
    }

    public Date getStorage_time() {
        return storage_time;
    }

    public void setStorage_time(Date storage_time) {
        this.storage_time = storage_time;
    }

    public Integer getStorage_type() {
        return storage_type;
    }

    public void setStorage_type(Integer storage_type) {
        this.storage_type = storage_type;
    }

    public Date getConea_evaluate_time() {
        return conea_evaluate_time;
    }

    public void setConea_evaluate_time(Date conea_evaluate_time) {
        this.conea_evaluate_time = conea_evaluate_time;
    }

    public Float getSclerotic_ring_width() {
        return sclerotic_ring_width;
    }

    public void setSclerotic_ring_width(Float sclerotic_ring_width) {
        this.sclerotic_ring_width = sclerotic_ring_width;
    }

    public Float getConea_diam() {
        return conea_diam;
    }

    public void setConea_diam(Float conea_diam) {
        this.conea_diam = conea_diam;
    }

    public Float getHyalomere_diam() {
        return hyalomere_diam;
    }

    public void setHyalomere_diam(Float hyalomere_diam) {
        this.hyalomere_diam = hyalomere_diam;
    }

    public Integer getCrystal_type() {
        return crystal_type;
    }

    public void setCrystal_type(Integer crystal_type) {
        this.crystal_type = crystal_type;
    }

    public Integer getEpithelium_smooth() {
        return epithelium_smooth;
    }

    public void setEpithelium_smooth(Integer epithelium_smooth) {
        this.epithelium_smooth = epithelium_smooth;
    }

    public Integer getStroma_clear() {
        return stroma_clear;
    }

    public void setStroma_clear(Integer stroma_clear) {
        this.stroma_clear = stroma_clear;
    }

    public Integer getDescemet_fold() {
        return descemet_fold;
    }

    public void setDescemet_fold(Integer descemet_fold) {
        this.descemet_fold = descemet_fold;
    }

    public Float getEcd() {
        return ecd;
    }

    public void setEcd(Float ecd) {
        this.ecd = ecd;
    }

    public Integer getEndothelium_defect() {
        return endothelium_defect;
    }

    public void setEndothelium_defect(Integer endothelium_defect) {
        this.endothelium_defect = endothelium_defect;
    }

    public Float getEndothelial_cell_thickness() {
        return endothelial_cell_thickness;
    }

    public void setEndothelial_cell_thickness(Float endothelial_cell_thickness) {
        this.endothelial_cell_thickness = endothelial_cell_thickness;
    }

    public Float getTraffic_cost() {
        return traffic_cost;
    }

    public void setTraffic_cost(Float traffic_cost) {
        this.traffic_cost = traffic_cost;
    }

    public String getApplicable_scope() {
        return applicable_scope;
    }

    public void setApplicable_scope(String applicable_scope) {
        this.applicable_scope = applicable_scope;
    }

    public Integer getObjective() {
        return objective;
    }

    public void setObjective(Integer objective) {
        this.objective = objective;
    }
}
