function _emr_initCheckOrderView() {
	//单击放大图片时请将此属性设置值，双击放大图片请不要加此属性
	hs.addSlideshow({});
	// 动画用来判断还是出的变量
	var jcdflagdemo = 0;
	// 点击Oct检查单的时候oct图像显示
	$("#oct").click(function() {
		// 分两步：1清空photo下的所有数据,并且清空photo_title第四个div如果有；2在photo_title最后加上特检div
		// 第一步,清空photo下的所有数据
		$("#photo").html("");
		// 判断是否有第四个子div
		if ($("#photo_title > div").length == 3) {
			// 如果没有
			$("<div />").addClass("emr_jcdtab01 tab_show study_tab").attr("id", "jcd_oct").appendTo($("#photo_title"));
			$("<span />").appendTo($("#jcd_oct")).text("OCT");
		} else {// 如果有，取出来重新给title赋值
			$($("#photo_title div")[3]).html("<span>OCT</span>").attr("id", "jcd_oct");
		}
		$("#jcd_oct").click(function() {
			$("#jcd_oct").removeClass("tab_hide").addClass("tab_show");
			for ( var i = 0; i <= 2; i++) {
				$($("#photo_title div")[i]).removeClass("tab_show").addClass("tab_hide");
				$("#photo").html("");
				$("<div class='oimsslide-gallery'/>").appendTo($("#photo"))
				.append($("<a onclick='return hs.expand(this)' href='/EMR/demo/doctor/images/IM001356(B).JPG' class='oimsslide' ><img src='../demo/doctor/images/IM001356.JPG' alt='眼睛'/></a>"));
			}
		});

		showtohide("jcd_oct");

		$("<div class='oimsslide-gallery'/>").appendTo($("#photo"))
		.append($("<a onclick='return hs.expand(this)' href='/EMR/demo/doctor/images/IM001356(B).JPG' class='oimsslide' ><img src='../demo/doctor/images/IM001356.JPG' alt='眼睛'/></a>"));});
		// 点击角膜检查单的时候图像显示
		$("#jiaomo").click(function() {

			$("#photo").html("");
				if ($("#photo_title > div").length == 3) {
				// 如果没有
				$("<div />").addClass("emr_jcdtab01 tab_show study_tab").attr("id", "jcd_jiaomo").appendTo($("#photo_title"));
				$("<span />").appendTo($("#jcd_jiaomo")).text("角膜图地图检查");

			} else {
				$($("#photo_title div")[3]).html(
				"<span>角膜图地图检查</span>")
				.attr("id", "jcd_jiaomo");
			}
			$("#jcd_jiaomo").click(function() {

				$("#jcd_jiaomo").removeClass("tab_hide").addClass("tab_show");
				for ( var i = 0; i <= 2; i++) {
					$($("#photo_title div")[i]).removeClass("tab_show").addClass("tab_hide");
					$("#photo").html("");
					$("<div />").appendTo($("#photo")).append($("<img src='../demo/doctor/images/IM001358.JPG' alt='眼睛'/>"));
															}
														});
										showtohide("jcd_jiaomo");
										$("<div />")
												.appendTo($("#photo"))
												.append(
														$("<img src='../demo/doctor/images/IM001358.JPG' alt='眼睛'/>"));
									});
					// 点击裂隙灯检查单的时候图像显示
					$("#lxd")
							.click(
									function() {

										$("#photo").html("");
										if ($("#photo_title > div").length == 3) {
											$("<div />")
													.addClass(
															"emr_jcdtab01 tab_show study_tab")
													.attr("id", "jcd_lxd")
													.appendTo($("#photo_title"));
											$("<span />").appendTo(
													$("#jcd_lxd")).text("裂隙灯");

										} else {
											$($("#photo_title div")[3]).html(
													"<span>裂隙灯</span>").attr(
													"id", "jcd_lxd");
										}
										$("#jcd_lxd")
												.click(
														function() {

															$("#jcd_lxd")
																	.removeClass(
																			"tab_hide")
																	.addClass(
																			"tab_show");
															for ( var i = 0; i <= 2; i++) {
																$(
																		$("#photo_title div")[i])
																		.removeClass(
																				"tab_show")
																		.addClass(
																				"tab_hide");
																$("#photo")
																		.html(
																				"");
																$("<div />")
																		.appendTo(
																				$("#photo"))
																		.append(
																				$("<img src='../demo/doctor/images/IM001357.JPG' alt='眼睛'/>"));
															}
														});
										showtohide("jcd_lxd");
										$("<div />")
												.appendTo($("#photo"))
												.append(
														$("<img src='../demo/doctor/images/IM001357.JPG' alt='眼睛'/>"));
									});
					// 当点击视力标签的时候显示视力信息在photo中,并且去掉其他标签的tab_show属性
					$("#shili_result")
							.click(
									function() {
										// 让其他div为灰色
										showtohide("shili_result");
										$("#photo").html("");
										var table = "<table><tbody><tr><th>眼别</th><th>矫正视力</th><th>近视力</th><th>裸眼视力</th></tr><tr><td>左眼</td>"
												+ "<td></td><td></td><td></td></tr><tr><td>右眼</td><td></td><td></td><td></td></tr></tbody></table>";
										$(table).appendTo($("#photo"));
									});
					// 当点击眼压标签的时候显示眼压信息在photo中,并且去掉其他标签的tab_show属性
					$("#yanya_result")
							.click(
									function() {

										// 让其他div为灰色
										showtohide("yanya_result");
										var d = "";

										// 清空检查单图片显示区域
										$(".studyShowTag").text("");
										$("<div />").attr({
											"id" : "yanya_div"
										}).appendTo(".studyShowTag");

										var sw = $(".studyShowTag")
												.innerWidth();
										var sh = $(".studyShowTag")
												.innerHeight();

										var l_data = [];
										var r_data = [];

										var date = [];

										for ( var i = 0; i < d.length; i++) {

											l_data.push(d[i].left == null ? 0
													: d[i].left);
											r_data.push(d[i].right == null ? 0
													: d[i].right);

											var h = d[i].ycsj.hours;
											var m = d[i].ycsj.minutes;
											var h_str = "";
											var m_str = "";

											if (h < 10) {
												h_str = "0" + h;
											} else {
												h_str = h;
											}

											if (m < 10) {
												m_str = "0" + m;
											} else {
												m_str = m;
											}

											date.push(h_str + ":" + m_str);
										}

										createClick(sw, sh, l_data, r_data,
												date);

										function createClick(sw, sh, l_data,
												r_data, date) {

											if (date.length > 8) {
												sw = sw + (date.length - 8)
														* 40;
											}

											var option = {
												chartContent : {
													width : sw - 20,
													height : sh - 20
												},
												divContent : {
													id : "yanya_div"
												},
												xAxisContent : {
													name : "检查时间",
													unit : ""
												}, // 检查时间
												yAxisContent : {
													name : "眼压" + "(mmHg)",
													unit : ""
												},// 眼压
												arrayContent : [ {
													name : "左眼"/* "左眼" */,
													data : l_data
												}, {
													name : "右眼"/* "右眼" */,
													data : r_data
												} ],
												categoriesNum : date
											};
											creteChart(option);
										}
										function creteChart(options) {
											var chart = new Highcharts.Chart(
													{

														chart : {
															renderTo : options.divContent.id,
															type : 'line',
															width : options.chartContent.width,
															height : options.chartContent.height,
															style : {
																margin : '0 auto'
															}
														},

														title : {
															text : "眼压曲线"/* '眼压曲线' */
														},

														subtitle : {
															text : ''
														},

														xAxis : {
															categories : options.categoriesNum,
															title : {
																text : options.xAxisContent.name
															},
															labels : {
																formatter : function() {
																	return this.value
																			+ options.xAxisContent.unit;
																}
															}
														},

														yAxis : {
															title : {
																text : options.yAxisContent.name
															},
															labels : {
																formatter : function() {
																	return this.value
																			+ options.yAxisContent.unit;
																}
															},
															lineWidth : 2,
															min : 0
														},

														legend : {
															enabled : true
														},

														tooltip : {
															enabled : true,
															formatter : function() {
																return this.x
																		+ options.xAxisContent.unit
																		+ "<br/>"
																		+ this.series.name
																		+ ":"
																		+ this.y
																		+ options.yAxisContent.unit
																		+ "<br/>";
															}
														},

														plotOptions : {
															line : {
																dataLabels : {
																	enabled : true
																},
																enableMouseTracking : true
															}
														},

														series : options.arrayContent

													});
										}
									});
					// 当点击验光标签的时候显示验光信息在photo中,并且去掉其他标签的tab_show属性
					$("#yanguang_result")
							.click(
									function() {
										// 让其他div为灰色
										showtohide("yanguang_result");

										// 清空检查单图片显示区域
										$(".studyShowTag").text("");

										var t = $("<table />").appendTo(
												".studyShowTag");
										$("<caption />")
												.append("客观屈光度参考值"/* "客观屈光度参考值" */)
												.appendTo(t);
										var tr = $("<tr />").appendTo(t);
										$("<th />").text("").appendTo(tr);
										$("<th />").text("球镜度"/* "球镜度" */)
												.appendTo(tr);
										$("<th />").text("散光度"/* "散光度" */)
												.appendTo(tr);
										$("<th />").text("轴位"/* "轴位" */)
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("左眼").appendTo(tr);// "左眼"
										$("<td />").attr("id", "refLS")
												.appendTo(tr);
										$("<td />").attr("id", "refLC")
												.appendTo(tr);
										$("<td />").attr("id", "refLA")
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("右眼").appendTo(tr);// "右眼"
										$("<td />").attr("id", "refRS")
												.appendTo(tr);
										$("<td />").attr("id", "refRC")
												.appendTo(tr);
										$("<td />").attr("id", "refRA")
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("瞳距"/* "瞳距" */)
												.appendTo(tr);// "瞳距"
										$("<td />").attr({
											"id" : "refPd",
											"colspan" : "3"
										}).appendTo(tr);

										var t = $("<table />").appendTo(
												".studyShowTag");
										$("<caption />")
												.append("角膜曲率参考值"/* "角膜曲率参考值" */)
												.appendTo(t);
										var tr = $("<tr />").appendTo(t);
										$("<th />").text("左眼"/* "左眼" */)
												.appendTo(tr);// "眼别"
										$("<th />").text("角膜曲光度"/* "角膜曲光度" */)
												.appendTo(tr);
										$("<th />").text("曲率半径"/* "曲率半径" */)
												.appendTo(tr);
										$("<th />").text("方向"/* "方向" */)
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("水平方向"/* "水平方向" */)
												.appendTo(tr);// "左眼"
										$("<td />").attr("id", "krtLHd")
												.appendTo(tr);
										$("<td />").attr("id", "krtLHmm")
												.appendTo(tr);
										$("<td />").attr("id", "krtLHa")
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("垂直方向"/* "垂直方向" */)
												.appendTo(tr);// "右眼"
										$("<td />").attr("id", "krtLVd")
												.appendTo(tr);
										$("<td />").attr("id", "krtLVmm")
												.appendTo(tr);
										$("<td />").attr("id", "krtLVa")
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("平均值"/* "平均值" */)
												.appendTo(tr);// "右眼"
										$("<td />").attr("id", "krtLAved")
												.appendTo(tr);
										$("<td />").attr("id", "krtLAvemm")
												.appendTo(tr);
										$("<td />").attr("id", "16od")
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("角膜散光度"/* "角膜散光度" */)
												.appendTo(tr);// "右眼"
										$("<td />").attr("id", "14od")
												.appendTo(tr);
										$("<td />").attr("id", "krtLCylmm")
												.appendTo(tr);
										$("<td />").attr("id", "krtLCyla")
												.appendTo(tr);

										var tr = $("<tr />").appendTo(t);
										$("<th />").text("右眼"/* "右眼" */)
												.appendTo(tr);// "眼别"
										$("<th />").text("角膜曲光度"/* "角膜曲光度" */)
												.appendTo(tr);
										$("<th />").text("曲率半径"/* "曲率半径" */)
												.appendTo(tr);
										$("<th />").text("方向"/* "方向" */)
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("水平方向"/*"水平方向"*/)
												.appendTo(tr);//"左眼"
										$("<td />").attr("id", "krtRHd")
												.appendTo(tr);
										$("<td />").attr("id", "krtRHmm")
												.appendTo(tr);
										$("<td />").attr("id", "krtRHa")
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("垂直方向"/*"垂直方向"*/)
												.appendTo(tr);//"右眼"
										$("<td />").attr("id", "krtRVd")
												.appendTo(tr);
										$("<td />").attr("id", "krtRVmm")
												.appendTo(tr);
										$("<td />").attr("id", "krtRVa")
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("平均值"/*"平均值"*/)
												.appendTo(tr);//"右眼"
										$("<td />").attr("id", "krtRAved")
												.appendTo(tr);
										$("<td />").attr("id", "krtRAvemm")
												.appendTo(tr);
										$("<td />").attr("id", "16od")
												.appendTo(tr);

										tr = $("<tr />").appendTo(t);
										$("<td />").text("角膜散光度"/*"角膜散光度"*/)
												.appendTo(tr);//"右眼"
										$("<td />").attr("id", "krtRCylmm")
												.appendTo(tr);
										$("<td />").attr("id", "14od")
												.appendTo(tr);
										$("<td />").attr("id", "krtRCyla")
												.appendTo(tr);
									});

					//一旦点击photo_title其中的任意一个div块，其它的div都要加tab_hide,自己加tab_show
					function showtohide(id) {

						$("#" + id).removeClass("tab_hide")
								.addClass("tab_show");
						var ary = $("#photo_title div");
						for ( var i = 0; i < ary.length; i++) {

							if (!($(ary[i]).attr("id") == id)) {

								$(ary[i]).removeClass("tab_show").addClass(
										"tab_hide");
							}
						}
					}
				}