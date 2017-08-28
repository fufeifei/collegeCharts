node_xj = require("xls-to-json");
var data = [
	'Name',
	'311',
	'专业与学校数',
	'电子信息类专业学生数',
	'自动化类专业学生数',
	'汽车类专业学生数',
	'机械设计制造类专业学生数',
	'2011-2013招生数统计',
	'计算机类专业学生数',
	'财务会计类专业学生数',
	'Sheet1',
	'Sheet2'
];
node_xj({
	input: "test2.xls",
	output: "./src/data/output.json",
	sheet: data[1]
}, function(err, result) {
	if (err) {
		console.error(err);
	} else {
		console.log(result);
	}
});