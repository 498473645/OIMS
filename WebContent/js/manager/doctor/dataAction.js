//测试数据  对程序无影响

var versionTestObj = {
		j_l:2.0,
		j_r:2.0,
		jz_l:2.0,
		jz_r:2.0,
		l_l:1.2,
		l_r:1.2
};

var yanyaTestObj = {
		left:18,
		right:21
}

var patientTestObj = {
		id : 1,
		name : "张三",
		sex : true,
		patientId : "4",
		birthday : new Date("1081-12-12")
	};
	var mcListTestObj = [ {
		id : 1,
		date : "2011-02-21",
		doctor : "洪七公",
		state : 0
	}, {
		id : 2,
		date : "2011.11.09",
		doctor : "欧阳锋",
		state : 1
	} ];
	var mcCategoryTestObj = [ {
		id : 1,
		category : "问诊"
	}, {
		id : 2,
		category : "检查"
	}, {
		id : 3,
		category : "诊断"
	}, {
		id : 4,
		category : "处置"
	}, {
		id : 5,
		category : "处方"
	} ];
	var mcto0 = [ {
		id : 5,
		category : "主述"
	}, {
		id : 6,
		category : "现病史"
	}, {
		id : 7,
		category : "即往史"
	}, {
		id : 8,
		category : "药敏史"
	}, {
		id : 9,
		category : "家族史"
	} ];
	var mcto1 = [ {
		id : 10,
		category : "眼睑"
	}, {
		id : 11,
		category : "结膜"
	}, {
		id : 7,
		category : "巩膜"
	}, {
		id : 8,
		category : "眼外肌"
	}, {
		id : 9,
		category : "角膜"
	}, {
		id : 10,
		category : "前房"
	}, {
		id : 11,
		category : "虹膜"
	}, {
		id : 7,
		category : "瞳孔"
	}, {
		id : 8,
		category : "晶状体"
	}, {
		id : 9,
		category : "玻璃体"
	}, {
		id : 10,
		category : "视盘"
	}, {
		id : 11,
		category : "黄斑"
	}, {
		id : 7,
		category : "血管"
	}, {
		id : 8,
		category : "视网膜"
	} ];
	var mcTestObj = {
		zhuShu : "一早劈材，被柴片击伤！"
	};
	var studyListTestObj = [ {
		id : 1,
		title : "眼底照相",
		startTime : "2012-3-4 9:00:00",
		endTime : "201-3-4 9:10:21",
		state : 0
	}, {
		id : 1,
		title : "眼底造影",
		startTime : "2012-3-4 9:20:09",
		endTime : "201-3-4 9:58:11",
		state : 1
	}, {
		id : 1,
		title : "眼底造影",
		startTime : "2012-3-4 9:20:09",
		endTime : "201-3-4 9:58:11",
		state : 2
	}, {
		id : 1,
		title : "眼底造影",
		startTime : "2012-3-4 9:20:09",
		endTime : "201-3-4 9:58:11",
		state : 3
	}, {
		id : 1,
		title : "眼底造影",
		startTime : "2012-3-4 9:20:09",
		endTime : "201-3-4 9:58:11",
		state : 4
	} ];

	var studyTestObj = 
		 [ {
			path : "/images/img1.png",
			message : ""
		}, {
			path : "/images/img2.png",
			message : "测试一下"
		}, {
			path : "/images/img3.png",
			message : "测试一下"
		}, {
			path : "/images/img4.png",
			message : "测试一下"
		} ]
	;
	
var patientListTestObj = [
{
			id : 1,
			patientId : "test001",
			name : "张小三",
			birthday : "1976-3-15",
			photo : "/images/patient.jpg",
			sex : 1,
			mobile : "18601234567",
			state : 0,
			diagnosis:"青光眼",
			count:2
		}, {
			id : 2,
			patientId : "test002",
			name : "李大四",
			birthday : "1982-5-1",
			photo : "/images/patient.jpg",
			sex : 1,
			mobile : "18601234567",
			state : 0,
			diagnosis:"青光眼",
			count:2
		}, {
			id : 3,
			patientId : "test003",
			name : "王老五",
			birthday : "1971-8-11",
			photo : "/images/patient.jpg",
			sex : 1,
			mobile : "18601234567",
			state : 0,
			diagnosis:"开角型青光眼",
			count:2
		}, {
			id : 4,
			patientId : "test004",
			name : "赵六六",
			birthday : "1990-9-11",
			photo : "/images/patient.jpg",
			sex : 1,
			mobile : "18601234567",
			state : 0,
			diagnosis:"闭角型青光眼",
			count:2
		}, {
			id : 5,
			patientId : "test005",
			name : "拉登",
			birthday : "1964-9-11",
			photo : "/images/patient.jpg",
			sex : 1,
			mobile : "18601234567",
			state : 0,
			diagnosis:"白内障",
			count:2
		}, {
			id : 6,
			patientId : "test006",
			name : "本拉登",
			birthday : "1999-9-11",
			photo : "/images/patient.jpg",
			sex : 1,
			mobile : "18601234567",
			state : 0,
			diagnosis:"白内障",
			count:2
		}, {
			id : 7,
			patientId : "test007",
			name : "欧阳锋",
			birthday : "1961-10-22",
			photo : "/images/patient.jpg",
			sex : 1,
			mobile : "18601234567",
			state : 0,
			diagnosis:"白内障",
			count:2
		}, {
			id : 8,
			patientId : "test008",
			name : "郭芙",
			birthday : "1980-2-19",
			photo : "/images/patient.jpg",
			sex : 0,
			mobile : "18601234567",
			state : 0,
			diagnosis:"白内障",
			count:2
		}, {
			id : 9,
			patientId : "test009",
			name : "刘瑛",
			birthday : "1963-11-11",
			photo : "/images/patient.jpg",
			sex : 0,
			mobile : "18601234567",
			state : 0,
			diagnosis:"白内障",
			count:2
		}];