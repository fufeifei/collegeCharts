var IDS=[],allSource=[],thSource=[];$.ajax({type:"get",url:"./data/name.json",async:!0,success:function(t){thSource=t,$.each(t,function(t,e){$("#axisX").append("<option value="+e.ID+">"+e.name+"</option>"),$("#axisY").append("<option value="+e.ID+">"+e.name+"</option>"),t<6&&($(".filters").append('<div><label for="'+e.ID+'">'+e.name+'：</label><select id="'+e.ID+'" data-index="0"><option>请选择</option></select></div>'),IDS.push(e.ID))});var e='<div class="red"><label for="">在校生：</label>';e+='<select><option value="Student">在校生</option><option value="IsGraduated">毕业生</option></select></div>',e+='<div class="red"><label for="">年级：</label>',e+='<select><option value="GradeOne">一年级</option><option value="GradeTwo">二年级</option><option value="GradeThree">三年级</option></select></div>',$(".filters").append(e)}}),$.ajax({type:"get",url:"./data/output.json",async:!0,success:function(t){function e(t,e,a){if($("#table thead tr").html(""),allSource=e,o){var n=[];n=e,$.each(o,function(t,e){allSource=[],$.each(n,function(t,a){a[e]==$("#"+e).val()&&allSource.push(a)}),n=[],n=allSource})}$.each(t,function(t,e){var a=[];$.each(allSource,function(t,o){a.indexOf(o[e])>-1||($("#"+e).append("<option>"+o[e]+"</option>"),a.push(o[e]))})}),$.each(allSource,function(t,e){var o=$("<tr></tr>");$.each(a,function(t,a){$("<td>"+e[a]+"</td>").appendTo(o)}),o.appendTo($("#table tbody"))}),$.each(thSource,function(t,e){$.each(a,function(t,a){e.ID==a&&$("#table thead tr").append("<th>"+e.name+"</th>")})}),console.log(allSource)}e(IDS,t,IDS);var a=1,o=[],n=$("#filter select"),i=[];$(".filters select").on("change",function(){var l=[];l=IDS.slice(),$("#table tbody").html("");$(this).val();var c=$(this).attr("id"),r=$(this).attr("data-index");0==r?($(this).attr("data-index",a++),$.each(n,function(t,e){0==$(e).attr("data-index")&&$(e).html("<option>请选择</option")})):r>0&&$.each(n,function(t,e){$(e).attr("data-index")>r&&a--,($(e).attr("data-index")>r||0==$(e).attr("data-index"))&&($(e).html("<option>请选择</option"),$("#"+$(e).attr("id")).attr("data-index","0"),o.splice(r-1,100),console.log(r))}),o.push(c);for(var s=l.length-1;s>=0;s--)for(var p=o.length-1;p>=0;p--)if(l[s]==o[p]){l.splice(s,1);break}i.splice(l),e(l,t,IDS)});var l=[];$(".red select").on("change",function(){if($.each($(this).find("option"),function(t,e){l.push($(e).val())}),console.log(l),$("#table tbody").html(""),IDS.indexOf(l)>-1);else{for(var a=IDS.length-1;a>=0;a--)for(var o=l.length-1;o>=0;o--)if(IDS[a]==l[o]){IDS.splice(a,1);break}IDS.push($(this).val()),$("thead tr").append("<th>"+$(this).find("option:checked").text()+"</th>"),e(i,t,IDS)}console.log(IDS),l=[]}),$("#search").on("click",function(){$(".canvas").append('<canvas id="charts" width="1300" height="500"></canvas>');var t=echarts.init(document.getElementById("charts")),e=$("#axisX").val(),a=$("#axisY").val(),o=[],n=[];$.each(allSource,function(t,i){o.push(i[e]),n.push(i[a])}),console.log(o),option={title:{text:"专业与学校数",subtext:"val"},tooltip:{trigger:"axis"},toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar"]},restore:{show:!0},saveAsImage:{show:!0}}},calculable:!0,xAxis:[{type:"category",axisLabel:{interval:0,rotate:30},data:o}],yAxis:[{type:"value"}],series:[{name:"毕业生",type:"bar",barMaxWidth:"40",data:n,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},markLine:{data:[{type:"average",name:"平均值"}]}}]},t.setOption(option)})}});