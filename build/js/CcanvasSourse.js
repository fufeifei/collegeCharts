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
			All = dataSourse;
			SchoolName.push(data.SchoolName);
			MajorCategories.push(data.MajorCategories);
			ProfessionalCategory.push(data.ProfessionalCategory);
			ProfessionalName.push(data.ProfessionalName);
			Grade.push(data.Grade);
		});

		$.unique(SchoolName);
		$.unique(MajorCategories);
		$.unique(ProfessionalCategory);
		$.unique(ProfessionalName);

		/*./初始化下拉菜单*/
		function optionVal(ID, ids) {
			var val = eval(ids)
			$.each(ID, function(index, data) {
				$("#" + ids).append("<option>" + data + "</option>")
			});
		}
		optionVal(SchoolName, "SchoolName");
		optionVal(MajorCategories, "MajorCategories");
		optionVal(ProfessionalCategory, "ProfessionalCategory");
		optionVal(ProfessionalName, "ProfessionalName");
		/*./初始化下拉菜单*/

		var x = 1,
			value = [],
			ids = [],
			Sources = [],
			sourceAll = [],
			_select = $("#filter select");
		$("#filter select").on('change', function() {
			var val = $(this).val(),
				id = $(this).attr("id"),
				len = $("#filter select").length,
				dataIndex = $(this).attr('data-index'),
				arr = [];
				
			if(dataIndex == 0) {
				$(this).attr('data-index', x++);
				$.each(_select, function(r,g) {
					if($(g).attr("data-index") == 0){
						$(g).html("<option>请选择</option");
					}
				});
			} else if(dataIndex > 0) {
				arr.push($("[data-index]"));
			}
			if(arr != "") {
				$.each(arr[0], function(index, data) {
					if($("#" + $(data).attr("id")).attr("data-index") > dataIndex) {
						value.splice(dataIndex - 1, 5);
						ids.splice(dataIndex - 1, 5);
						$("#" + $(data).attr("id")).attr("data-index", "0");
						x--;
					}
				});
			}
			value.push(val);
			ids.push(id);

			if(value != "") {
				for(var j = 0; j < value.length; j++) {
					if($(this).attr('data-index') == 1) {
						sourceAll = All;
						Sources = [];
						for(var i = 0; i < sourceAll.length; i++) {
							if(sourceAll[i][ids[j]] == value[j]) {
								Sources.push(sourceAll[i]);
							}
						}
					} else if($(this).attr('data-index') > 1) {
						sourceAll = Sources;
						Sources = [];
						for(var i = 0; i < sourceAll.length; i++) {
							if(sourceAll[i][ids[j]] == value[j]) {
								Sources.push(sourceAll[i]);
							}
						}
					}
				}
			}
			console.log(Sources)
			$("#table tbody").html("");
			var ThisIndex = $(this).attr("data-index");
			$.each(Sources, function(index, data) {
				var html = '<tr><td>' + data.SchoolName + '</td><td>' + data.MajorCategories + '</td><td>' + data.ProfessionalCategory + '</td><td>' + data.ProfessionalName + '</td><td>' + data.SchoolSystem + '</td><td>' + data.Year + '</td><td>' + data.Graduate + '</td><td>' + data.Student + '</td><td>' + data.GradeOne + '</td><td>' + data.GradeTwo + '</td><td>' + data.GradeThree + '</td></tr>'
				$("#table tbody").append(html);
				var selectId = [];
				if(_select != "") {
					$.each(_select, function(id, valID) {
						selectId.push($(valID).attr("id"));
					});
					$.each(ids, function(index1, dataID) {
						selectId.splice($.inArray(dataID, selectId), 1);
					});
				}
				$.each(selectId, function(a, b) {
					$("#" + b).append("<option>" + data[b] + "</option>");
				});
			})
		});
	}
});