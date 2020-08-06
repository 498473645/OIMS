var _emr_main = ['双眼无痛性渐进性视物不清2年',
                 '双眼红、分泌物增多3天',
                 '右眼红、视物模糊、畏光3天',
                 '右眼红、胀痛、视物模糊1天'];//主诉
var _emr_now = [];//现病史
var _emr_old = ['高血压10年','体健','2型糖尿病10年'];//既往史
var _emr_allergies = [];//过敏史
var _emr_family = ['父亲患闭角型青光眼'];//家族史

var _emr_inquiry_temp = {
	main_txt:_emr_main,
	now_txt:_emr_now,
	old_txt:_emr_old,
	allergies_txt:_emr_allergies,
	family_txt:_emr_family
};

var _emr_eyelid = {flag:1,data:['未见异常1'],imgs:['/demo/doctor/physical_images/eyelid_od.png','/demo/doctor/physical_images/eyelid_os.png']};//眼睑
var _emr_conjunctival = {flag:1,data:['未见异常2'],imgs:['/demo/doctor/physical_images/conjunctival_od.png','/demo/doctor/physical_images/conjunctival_os.png']};//结膜
var _emr_scleral = {flag:0,data:['未见异常3']};//巩膜
var _emr_eyes = {flag:1,data:['未见异常4']};//眼位和眼球运动
var _emr_corneal = {flag:1,data:['透明'],imgs:['/demo/doctor/physical_images/corneal_od.png','/demo/doctor/physical_images/corneal_os.png']};//角膜
var _emr_anterior = {flag:1,data:['深'],imgs:['/demo/doctor/physical_images/anterior_od.png','/demo/doctor/physical_images/anterior_os.png']};//前房
var _emr_iris = {flag:1,data:['纹理清'],imgs:['/demo/doctor/physical_images/iris_od.png','/demo/doctor/physical_images/iris_os.png']};//虹膜
var _emr_pupil = {flag:1,data:['圆','直径3mm','光反射灵敏'],imgs:['/demo/doctor/physical_images/pupil_od.png','/demo/doctor/physical_images/pupil_os.png']};//瞳孔
var _emr_lens = {flag:1,data:['浑浊','皮质混','核混'],imgs:['/demo/doctor/physical_images/lens_od.png','/demo/doctor/physical_images/lens_os.png']};//晶状体
var _emr_vitreous = {flag:1,data:['浑浊'],imgs:['/demo/doctor/physical_images/vitreous_od.png','/demo/doctor/physical_images/vitreous_os.png']};//玻璃体
var _emr_fundus = {flag:1,data:['视盘色正界清','黄斑中心凹反光不清','动静脉比1:2','未见明显出血渗出'],imgs:['/demo/doctor/physical_images/fundus_od.png','/demo/doctor/physical_images/fundus_os.png']};//眼底（视盘，黄斑，血管，视网膜）
var _emr_physical_temp = {
	_emr_eyelid:_emr_eyelid,
	_emr_conjunctival:_emr_conjunctival,
	_emr_scleral:_emr_scleral,
	_emr_eyes:_emr_eyes,
	_emr_corneal:_emr_corneal,
	_emr_anterior:_emr_anterior,
	_emr_iris:_emr_iris,
	_emr_pupil:_emr_pupil,
	_emr_lens:_emr_lens,
	_emr_vitreous:_emr_vitreous,
	_emr_fundus:_emr_fundus
};

var _emr_medical_order = ['随诊观察','门诊复查，不适随诊','必要时散瞳查眼底，3日后门诊复查','复测眼压，明日复诊','控制血糖，必要时眼底激光治疗'];//医嘱 
var _emr_handle = ['冲洗泪道','冲洗结膜囊','拔倒睫','睑板腺按摩','球后注射','取角结膜异物','取结石'];//处置
var _emr_medical = [{name:'羟苯磺酸钙胶囊',commodityname:'可元',type:'0.5g*20S',jixing:'Cap',num:'5',unit:'盒',direction:'一次4片一日三次',route:'口服',level:'乙',title:"[适应症] 用于糖尿病引起的视网膜病变。[规格]0.5g[用法用量] 进餐时吞服，在起始治疗阶段，一日3次，一次1粒；4～6周后，调整为一日2次，一次1粒。[不良反应]偶见胃部不适、恶心、胃灼热、食欲缺乏等症状；此时，应酌情减量，必要时暂停给药。"},
                    {name:'葡萄糖注射液',commodityname:'葡萄糖注射液',type:'20ml:10g*5支',jixing:'Aqu',num:'3',unit:'盒',direction:'2天一次',route:'注射',level:'甲',title:"【用法用量】（1）补充热能 患者因某些原因进食减少或不能进食时，一般可予25%葡萄糖注射液静脉注射，并同时补充体液。葡萄糖用量根据所需热能计算。（2）全静脉营养疗法 葡萄糖是此疗法最重要的能量供给物质。在非蛋白质热能中，葡萄糖与脂肪供给热量之比为2∶1。具体用量依据临床热量需要而定。根据补液量的需要，葡萄糖可配制为25%～50%的不同浓度，必要时加入胰岛素，每5～10g葡萄糖加入正规胰岛素1单位。由于正常应用高渗葡萄糖溶液，对静脉刺激性较大，并需输注脂肪乳剂，故一般选用大静脉滴注。（3）低糖血症，重者可先予用50%葡萄糖注射液20～40ml静脉推注。（4）饥饿性酮症，严重者应用5%～25%葡萄糖注射液静脉滴注，每日100g葡萄糖可基本控制病情。（5）失水 等渗性失水给予5%葡萄糖注射液静脉滴注。（6）高钾血症 应用10～25%注射液，每2～4g葡萄糖加1单位正规胰岛素输注，可降低血清钾浓度。但此疗法仅使细胞外钾离子进入细胞内，体内总钾含量不变。如不采取排钾措施，仍有再次出现高钾血症的可能。（7）组织脱水 高渗溶液（一般采用50%葡萄糖注射液）快速静脉注射20～50ml。但作用短暂。临床上应注意防止高血糖，目前少用。用于调节腹膜透析液渗透压时，50%葡萄糖注射液20ml即10g葡萄糖可使1L腹膜透析液渗透压提高55mOsm/kgH2O。"},
                    {name:'硫酸阿托品眼膏',commodityname:'硫酸阿托品眼膏',type:'2g',jixing:'Gel',num:'11',unit:'支',direction:'一日3次',route:'涂抹',level:'甲'},
                    {name:'依托咪酯脂肪乳注射液',commodityname:'福尔利',type:'10ML*20MG',jixing:'Aer',num:'2',unit:'瓶',direction:'一日一瓶',route:'注射',level:'甲'}];//药品
var _emr_deal_temp = {
	_emr_medical_order:_emr_medical_order,
	_emr_handle:_emr_handle,
	_emr_medical:_emr_medical
};
var allergicHistoryData=[{name:'羟苯磺酸钙胶囊'},{name:'葡萄糖注射液'}];
var allergicHistoryCal=0;