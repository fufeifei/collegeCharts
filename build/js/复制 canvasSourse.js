var myChart = echarts.init(document.getElementById('charts'));
$.ajax({
	type: "get",
	url: "./data/output.json",
	async: true,
	success: function(dataSourse) {
		var All = [],
			dataX = [],
			dataS = [],
			SchoolName = [],
			MajorCategories = [],
			ProfessionalCategory = [],
			ProfessionalName = [],
			Grade = [],
			index, indexM, indexP, indexN,
			GradeOne = [],
			GradeTwo = [],
			GradeThree = [],
			GradeFour = [],
			html = null;
		$.each(dataSourse, function(index, data) {
			dataX.push(data);
		});

		for(var i = 0; i < dataX.length; i++) {
			All.push(dataX[i]);
			SchoolName.push(dataX[i].SchoolName);
		}

		$("#SchoolName").html('');
		for(var i = 0; i < SchoolName.length; i++) {
			$.unique(SchoolName);
			SchoolName.sort();
			$("#SchoolName").prepend("<option>" + SchoolName[i] + "</option>")
		}

		$("#SchoolName").on('change', '', function() {
			$("#MajorCategories").html('');
			$("#ProfessionalCategory").html('');
			$("#ProfessionalName").html('');
			$("#table tbody").html('');
			index = [], MajorCategories = [];
			var val = $(this).val();
			for(var i = 0; i < All.length; i++) {
				if(All[i].SchoolName == val) {
					index.push(All[i]);
				}
			}
			for(var j = 0; j < index.length; j++) {
				MajorCategories.push(index[j].MajorCategories);
				html = '<tr><td>' + index[j].ID + '</td><td>' + index[j].SchoolName + '</td><td>' + index[j].MajorCategories + '</td><td>' + index[j].ProfessionalCategory + '</td><td>' + index[j].ProfessionalName + '</td><td>' + index[j].SchoolSystem + '</td><td>' + index[j].Year + '</td><td>' + index[j].Graduate + '</td><td>' + index[j].Student + '</td><td>' + index[j].GradeOne + '</td><td>' + index[j].GradeTwo + '</td><td>' + index[j].GradeThree + '</td><td>' + index[j].GradeFour + '</td></tr>'
				$("#table tbody").append(html);
			}
			$.unique(MajorCategories);
			for(var j = 0; j < MajorCategories.length; j++) {
				$("#MajorCategories").prepend("<option>" + MajorCategories[j] + "</option>")
			}
		});

		$("#MajorCategories").on('click', '', function() {
			$("#ProfessionalCategory").html('');
			$("#ProfessionalName").html('');
			var val = $(this).val();
			indexM = [], ProfessionalCategory = [];
			for(var i = 0; i < index.length; i++) {
				if(index[i].MajorCategories == val) {
					indexM.push(index[i]);
				}
			}
			$("#table tbody").html('');
			var Student = [],
				Graduate = [];
			for(var j = 0; j < indexM.length; j++) {
				Student.push(indexM[j].Student);
				Graduate.push(indexM[j].Graduate);
				ProfessionalCategory.push(indexM[j].ProfessionalCategory);
				html = '<tr><td>' + indexM[j].ID + '</td><td>' + indexM[j].SchoolName + '</td><td>' + indexM[j].MajorCategories + '</td><td>' + indexM[j].ProfessionalCategory + '</td><td>' + indexM[j].ProfessionalName + '</td><td>' + indexM[j].SchoolSystem + '</td><td>' + indexM[j].Year + '</td><td>' + indexM[j].Graduate + '</td><td>' + indexM[j].Student + '</td><td>' + indexM[j].GradeOne + '</td><td>' + indexM[j].GradeTwo + '</td><td>' + indexM[j].GradeThree + '</td><td>' + indexM[j].GradeFour + '</td></tr>'
				$("#table tbody").append(html);
			}
			$.unique(ProfessionalCategory);
			for(var j = 0; j < ProfessionalCategory.length; j++) {
				$("#ProfessionalCategory").prepend("<option>" + ProfessionalCategory[j] + "</option>")
			}
			console.log(ProfessionalCategory);
			option = {
				title: {
					text: '专业与学校数',
					subtext: val
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['毕业生', '在校生']
				},
				toolbox: {
					show: true,
					feature: {
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ['line', 'bar'] },
						restore: { show: true },
						saveAsImage: { show: true }
					}
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					axisLabel: {
						interval: 0,
						rotate: 30
					},
					data: ProfessionalCategory
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
						name: '毕业生',
						type: 'bar',
						barMaxWidth: '40',
						data: Graduate,
						markPoint: {
							data: [
								{ type: 'max', name: '最大值' },
								{ type: 'min', name: '最小值' }
							]
						},
						markLine: {
							data: [
								{ type: 'average', name: '平均值' }
							]
						}
					},
					{
						name: '在校生',
						type: 'bar',
						barMaxWidth: '40',
						data: Student,
						markPoint: {
							data: [
								{ name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
								{ name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
							]
						},
						markLine: {
							data: [
								{ type: 'average', name: '平均值' }
							]
						}
					}
				]
			};

			myChart.setOption(option);
		});

		$("#ProfessionalCategory").on('click', '', function() {
			$("#ProfessionalName").html('');
			var val = $(this).val();
			indexP = [], ProfessionalName = [];
			for(var i = 0; i < indexM.length; i++) {
				if(indexM[i].ProfessionalCategory == val) {
					indexP.push(indexM[i]);
				}
			}
			var Student = [],
				Graduate = [];
			for(var j = 0; j < indexP.length; j++) {
				Student.push(indexP[j].Student);
				Graduate.push(indexP[j].Graduate);
				ProfessionalName.push(indexP[j].ProfessionalName);
			}

			$.unique(ProfessionalName);
			for(var j = 0; j < ProfessionalName.length; j++) {
				$("#ProfessionalName").prepend("<option>" + ProfessionalName[j] + "</option>")
			}

			option = {
				title: {
					text: '专业与学校数',
					subtext: val
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['毕业生', '在校生']
				},
				toolbox: {
					show: true,
					feature: {
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ['line', 'bar'] },
						restore: { show: true },
						saveAsImage: { show: true }
					}
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					axisLabel: {
						interval: 0,
						rotate: 30
					},
					data: ProfessionalName
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
						name: '毕业生',
						type: 'bar',
						barMaxWidth: '40',
						data: Graduate,
						markPoint: {
							data: [
								{ type: 'max', name: '最大值' },
								{ type: 'min', name: '最小值' }
							]
						},
						markLine: {
							data: [
								{ type: 'average', name: '平均值' }
							]
						}
					},
					{
						name: '在校生',
						type: 'bar',
						barMaxWidth: '40',
						data: Student,
						markPoint: {
							data: [
								{ name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
								{ name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
							]
						},
						markLine: {
							data: [
								{ type: 'average', name: '平均值' }
							]
						}
					}
				]
			};

			myChart.setOption(option);
		});

		$("#ProfessionalName").on('click', '', function() {
			var val = $(this).val();
			indexN = [], Grade = [];
			for(var i = 0; i < indexP.length; i++) {
				if(indexP[i].ProfessionalName == val) {
					indexN.push(indexP[i]);
				}
			}
			for(var j = 0; j < indexN.length; j++) {
				Grade.push(indexN[j]);
			}
		});

		$("#Grade").on('click', '', function() {
			var val = $(this).val();
			GradeFour = [], GradeThree = [], GradeTwo = [], GradeOne = [];
			for(var i = 0; i < Grade.length; i++) {
				if(val == '1') {
					GradeOne.push(Grade[i].GradeOne);
				} else if(val == '2') {
					GradeOne.push(Grade[i].GradeTwo);
				} else if(val == '3') {
					GradeOne.push(Grade[i].GradeThree);
				} else if(val == '4') {
					GradeOne.push(Grade[i].GradeFour);
				}
			}
		});
		$('#chartsType').on('change', function() {
			option = {
				title: {
					text: '基于大数据的职业教育人才需求分析平台',
					subtext: '专业与学校数'
				},
				tooltip: {
					trigger: 'axis'
				},
				color: ['#c65c47', '#24c5a4', '#2e5c78', '#4d9379'],
				legend: {
					data: ['GradeOne']
				},
				grid: {
					left: '10%',
					bottom: '15%'
				},
				toolbox: {
					show: true,
					feature: {
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ['line', 'bar'] },
						restore: { show: true },
						saveAsImage: { show: true }
					}
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					axisLabel: {
						interval: 0,
						rotate: 30
					},
					data: function() {
						$("#Grade").val()
					}
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					name: 'GradeFour',
					type: 'bar',
					data: GradeOne,
					markPoint: {
						data: [
							{ name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
							{ name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
						]
					},
					markLine: {
						data: [
							{ type: 'average', name: '平均值' }
						]
					}
				}]
			};
			myChart.setOption(option);
		});
	}
});