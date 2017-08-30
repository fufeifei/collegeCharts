/*
 *IDS: 存放所有ID
 * */
var IDS = [],
	allSource = [],
	thSource = [],
	all = [];
$.ajax({
	type: "get",
	url: "./data/name.json",
	async: true,
	success: function(dataSourse) {
		thSource = dataSourse;
		$.each(dataSourse, function(index, data) {
			/* X轴、Y轴筛选条件*/
			if(index < 6) {
				$("#axisX").append('<option value=' + data.ID + '>' + data.name + '</option>');
				$(".filters").append('<div><label for="' + data.ID + '">' + data.name + '：</label><select id="' + data.ID + '" data-index="0"><option>请选择</option></select></div>');
				IDS.push(data.ID);
			} else {
				$("#axisY").append('<option value=' + data.ID + '>' + data.name + '</option>');
			}
		});
		/* 在校生、年级筛选*/
		var HM = '<div class="red"><label for="">在校生：</label>';
		HM += '<select><option value="Student">在校生</option><option value="IsGraduated">毕业生</option></select></div>';
		HM += '<div class="red"><label for="">年级：</label>';
		HM += '<select><option value="GradeOne">一年级</option><option value="GradeTwo">二年级</option><option value="GradeThree">三年级</option></select></div>';
		$(".filters").append(HM);
	}
});

$.ajax({
	type: "get",
	url: "./data/output.json",
	async: true,
	success: function(dataSourse) {
		all = dataSourse;
		$("#load").remove();

		/*showData 展示表格、下拉框数据*/
		function showData(id, sourse, IBD) {
			$("#table thead tr").html("");
			allSource = sourse;
			if(ids) {
				var temp = [];
				temp = sourse;
				$.each(ids, function(m, n) {
					allSource = [];
					$.each(temp, function(index, data) {
						if(data[n] == $("#" + n).val()) {
							allSource.push(data);
						}
					});
					temp = [];
					temp = allSource;
				});
			}
			$.each(id, function(m, n) {
				var V = [];
				$.each(allSource, function(index, data) {
					if(V.indexOf(data[n]) > -1) {

					} else {
						$("#" + n).append('<option>' + data[n] + '</option>');
						V.push(data[n])
					}
				});
			});
			$.each(allSource, function(index, data) {
				var tr = $('<tr></tr>');
				$.each(IBD, function(m, n) {
					var td = $('<td>' + data[n] + '</td>');
					td.appendTo(tr);
				});
				tr.appendTo($("#table tbody"));
			});
			$.each(IBD, function(m, n) {
				$.each(thSource, function(index, data) {
					if(data.ID == n) {
						$("#table thead tr").append("<th>" + data.name + "</th>");
					}
				});
			});
			console.log(allSource)
		}
		showData(IDS, dataSourse, IDS);

		/* */

		var x = 1,
			ids = [],
			_select = $("#filter select");

		var arrN = [];
		$(".filters select").on('change', function() {
			var newArr = [];
			newArr = IDS.slice();
			$("#table tbody").html("");
			var val = $(this).val(),
				id = $(this).attr("id"),
				dataIndex = $(this).attr('data-index');

			if(dataIndex == 0) {
				$(this).attr('data-index', x++);
				$.each(_select, function(r, g) {
					if($(g).attr("data-index") == 0) {
						$(g).html("<option>请选择</option");
					}
				});
			} else if(dataIndex > 0) {
				$.each(_select, function(index, data) {
					if($(data).attr("data-index") > dataIndex) {
						x--;
					}
					if($(data).attr("data-index") > dataIndex || $(data).attr("data-index") == 0) {
						$(data).html("<option>请选择</option");
						$("#" + $(data).attr("id")).attr("data-index", "0");
						ids.splice(dataIndex - 1, 100);
					}
				});
			}
			ids.push(id);
			for(var i = newArr.length - 1; i >= 0; i--) {
				for(var j = ids.length - 1; j >= 0; j--) {
					if(newArr[i] == ids[j]) {
						/*去除重复ID*/
						newArr.splice(i, 1);
						break;
					}
				}
			}
			arrN.splice(newArr)
			showData(newArr, dataSourse, IDS);
		});
		var num = [];
		$(".red select").on('change', function() {
			$.each($(this).find('option'), function(ind, dat) {
				num.push($(dat).val())
			});
			console.log(num);
			$("#table tbody").html("");
			if(IDS.indexOf(num) > -1) {} else {
				for(var i = IDS.length - 1; i >= 0; i--) {
					for(var j = num.length - 1; j >= 0; j--) {
						if(IDS[i] == num[j]) {
							IDS.splice(i, 1);
							//ids.splice(j, 1);
							break;
						}
					}
				}
				IDS.push($(this).val());
				$("thead tr").append('<th>' + $(this).find("option:checked").text() + '</th>')
				console.log(IDS);
				showData(arrN, dataSourse, IDS);
			}
			num = [];
		});

		$("#search").on('click', function() {
			$(".canvas").html("");
			$(".canvas").append('<canvas id="charts" width="1500" height="600"></canvas>');

			var myChart = echarts.init(document.getElementById('charts'));

			var Xaxis = $("#axisX").val(),
				Yaxis = $("#axisY").val(),
				axisx = [],
				axisy = [];
			/*start */
			var reduced = allSource.reduce(function(p, item) {
				if(p[item[Xaxis]]) {
					p[item[Xaxis]][Yaxis] = parseInt(p[item[Xaxis]][Yaxis]) + parseInt(item[Yaxis]);
				} else {
					p[item[Xaxis]] = {
						[Xaxis]: item[Xaxis],
						[Yaxis]: item[Yaxis]
					};
				}
				return p;
			}, {});
			console.log(reduced)
			/*end */
			$.each(reduced, function(index, data) {
				axisx.push(data[Xaxis]);
				axisy.push(data[Yaxis]);
			});
			option = {
				title: {
					text: $("#axisX").find("option:checked").text(),
					subtext: $("#axisY").find("option:checked").text()
				},
				tooltip: {
					trigger: 'axis'
				},
				toolbox: {
					show: true,
					feature: {
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					axisLabel: {
						interval: 0,
						rotate: 30
					},
					data: axisx
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					name: '毕业生',
					type: 'bar',
					barMaxWidth: '40',
					data: axisy,
					markPoint: {
						data: [{
							type: 'max',
							name: '最大值'
						}, {
							type: 'min',
							name: '最小值'
						}]
					},
					markLine: {
						data: [{
							type: 'average',
							name: '平均值'
						}]
					}
				}]
			};
			/* */
			var jsonstr = "[]";
			var pieData = eval('(' + jsonstr + ')');
			$.each(axisy, function(index, data) {
				var arr = {
					"value": data,
					"name": axisx[index]
				}
				pieData.push(arr);
			});
			optionPie = {
				title: {
					text: $("#axisX").find("option:checked").text(),
					subtext: $("#axisY").find("option:checked").text(),
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: axisx
				},
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: pieData,
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]
			};
			if($("#axisChart").val() == 0) {
				myChart.setOption(optionPie);
			} else if($("#axisChart").val() == 1) {
				myChart.setOption(option);
			}
		});
		$("#showAll").on('click', function() {
			ids = [];
			num = [];
			x = 1;
			$("select").attr("val","");
			$.each(_select, function(r, g) {
				$(g).attr("data-index", '0');
			});
			showData(IDS, dataSourse, IDS);
		});
	}
});