//var myChart = echarts.init(document.getElementById('charts'));
$.ajax({
	type: "get",
	url: "./data/output.json",
	async: true,
	success: function(dataSourse) {
		/* dataX:存放所有数据
		 * All:变更后的数据
		 * SchoolName:学校名称
		 * MajorCategories:专业大类
		 * ProfessionalCategory:专业类
		 * ProfessionalName:专业名称
		 * Source：存放变更后的数据
		 * */
		var dataX = [],
			All = [],
			Alls = [],
			SchoolName = [],
			MajorCategories = [],
			ProfessionalCategory = [],
			ProfessionalName = [],
			Grade = [],
			Source = [];

		/*赋值给dataX*/
		$.each(dataSourse, function(index, data) {
			dataX.push(data);
		});

		for(var i = 0; i < dataX.length; i++) {
			Alls.push(dataX[i]);
		}

		function DataX(data) {
			SchoolName = [],
				MajorCategories = [],
				ProfessionalCategory = [],
				ProfessionalName = [],
				Grade = [];
			for(var i = 0; i < data.length; i++) {
				All.push(data[i]);
				SchoolName.push(data[i].SchoolName);
				MajorCategories.push(data[i].MajorCategories);
				ProfessionalCategory.push(data[i].ProfessionalCategory);
				ProfessionalName.push(data[i].ProfessionalName);
				Grade.push(data[i].Grade);
			}
			$.unique(SchoolName);
			$.unique(MajorCategories);
			$.unique(ProfessionalCategory);
			$.unique(ProfessionalName);
		}
		DataX(dataX);
		$.each(SchoolName, function(index, data) {
			$("#SchoolName").append("<option id=" + index + ">" + data + "</option>")
		});
		$.each(MajorCategories, function(index, data) {
			$("#MajorCategories").append("<option id=" + index + ">" + data + "</option>")
		});
		$.each(ProfessionalCategory, function(index, data) {
			$("#ProfessionalCategory").append("<option id=" + index + ">" + data + "</option>")
		});
		$.each(ProfessionalName, function(index, data) {
			$("#ProfessionalName").append("<option id=" + index + ">" + data + "</option>")
		});

		var m = 1; /*data-index*/
		$('select').on('change', function() {
			Source = [], $("#table tbody").html('');
			var html = null;

			var This = $(this).attr('id'),
				Values = [],
				ValueInput = [],
				tval = $(this).val(); /*This为当前ID,Values为选中的ID,ValuesInput为当前选中的值*/
			var ThisIndex = $(this).attr('data-index'); /*当前选中的data-index*/

			if(ThisIndex == 0) {
				$(this).attr('data-index', m++);

				for(var i = 0; i < All.length; i++) {
					if(All[i][This] == tval) {
						html = '<tr><td>' + All[i].ID + '</td><td>' + All[i].SchoolName + '</td><td>' + All[i].MajorCategories + '</td><td>' + All[i].ProfessionalCategory + '</td><td>' + All[i].ProfessionalName + '</td><td>' + All[i].SchoolSystem + '</td><td>' + All[i].Year + '</td><td>' + All[i].Graduate + '</td><td>' + All[i].Student + '</td><td>' + All[i].GradeOne + '</td><td>' + All[i].GradeTwo + '</td><td>' + All[i].GradeThree + '</td><td>' + All[i].GradeFour + '</td></tr>'
						$("#table tbody").append(html);
						Source.push(All[i]);
					}
				}
			} else if(ThisIndex > 0) {
				//				if(ThisIndex == 1) {
				//					All = Alls;
				//				}

				Values = [], ValueInput = [], Source = [];
				/*遍历data-index*/
				var pushs = [];
				pushs.push($("[data-index]"))
				pushs.sort();
				$.each(pushs, function(index, data) {
					var ID = $(data).attr('id'),
						dataIndex = $(data).attr('data-index'); /*获取遍历的ID、data-index*/

					if(dataIndex > ThisIndex) {
						$("#" + ID).attr('data-index', '0');
					} else if(dataIndex < ThisIndex && dataIndex >= 1) {
						console.log(ID);
						console.log($("#" + ID).val());
						Values.push(ID);
						ValueInput.push($("#" + ID).val());
					} else if(ThisIndex == 1) {
						Values.push(This);
						ValueInput.push($("#" + ID).val());
					}
					Values.push(ID);
					ValueInput.push(tval);
					$.unique(Values);
					$.unique(ValueInput);
				});

				console.log(ValueInput)
				$.each(Values, function(a, b) {
					console.log(b);
					for(var i = 0; i < Alls.length; i++) {
						for(var y = 0; y < ValueInput.length; y++) {
							if(Alls[i][b] == ValueInput[y]) {
								//console.log(Alls);
								html = '<tr><td>' + Alls[i].ID + '</td><td>' + Alls[i].SchoolName + '</td><td>' + Alls[i].MajorCategories + '</td><td>' + Alls[i].ProfessionalCategory + '</td><td>' + Alls[i].ProfessionalName + '</td><td>' + Alls[i].SchoolSystem + '</td><td>' + Alls[i].Year + '</td><td>' + Alls[i].Graduate + '</td><td>' + Alls[i].Student + '</td><td>' + Alls[i].GradeOne + '</td><td>' + Alls[i].GradeTwo + '</td><td>' + Alls[i].GradeThree + '</td><td>' + Alls[i].GradeFour + '</td></tr>'
								$("#table tbody").append(html);
								Source.push(Alls[i]);
							}
						}
					}
				});
			}
			DataX(Source);
			var Data_Index = $(this).attr('data-index');

			if($(this).attr('data-index') >= 1) {
				$.each($("[data-index]"), function(index, data) {
					var ID = $(data).attr('id'),
						dataIndex = $(data).attr('data-index');
					if(dataIndex > Data_Index || dataIndex == 0) {
						DataX(Source);
						console.log(ProfessionalName);
						$("#" + ID).html("<option>请选择</option");
						$.each(eval(ID), function(index1, data1) {
							$("#" + ID).append("<option>" + data1 + "</option>")
						});
					}
				})
			}
			All = Source;
		});
	}
});