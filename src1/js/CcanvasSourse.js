$.ajax({type:"get",url:"./data/output.json",async:!0,success:function(dataSourse){function optionVal(ID,ids){var val=eval(ids);$.each(ID,function(e,a){$("#"+ids).append("<option>"+a+"</option>")})}var dataX=[],All=[],Alls=[],SchoolName=[],MajorCategories=[],ProfessionalCategory=[],ProfessionalName=[],Grade=[],Source=[];$.each(dataSourse,function(e,a){All=dataSourse,SchoolName.push(a.SchoolName),MajorCategories.push(a.MajorCategories),ProfessionalCategory.push(a.ProfessionalCategory),ProfessionalName.push(a.ProfessionalName),Grade.push(a.Grade)}),$.unique(SchoolName),$.unique(MajorCategories),$.unique(ProfessionalCategory),$.unique(ProfessionalName),optionVal(SchoolName,"SchoolName"),optionVal(MajorCategories,"MajorCategories"),optionVal(ProfessionalCategory,"ProfessionalCategory"),optionVal(ProfessionalName,"ProfessionalName");var x=1,value=[],ids=[],Sources=[],sourceAll=[],_select=$("#filter select");$("#filter select").on("change",function(){var e=$(this).val(),a=$(this).attr("id"),t=($("#filter select").length,$(this).attr("data-index")),o=[];if(0==t?($(this).attr("data-index",x++),$.each(_select,function(e,a){0==$(a).attr("data-index")&&$(a).html("<option>请选择</option")})):t>0&&o.push($("[data-index]")),""!=o&&$.each(o[0],function(e,a){$("#"+$(a).attr("id")).attr("data-index")>t&&(value.splice(t-1,5),ids.splice(t-1,5),$("#"+$(a).attr("id")).attr("data-index","0"),x--)}),value.push(e),ids.push(a),""!=value)for(var s=0;s<value.length;s++)if(1==$(this).attr("data-index")){sourceAll=All,Sources=[];for(r=0;r<sourceAll.length;r++)sourceAll[r][ids[s]]==value[s]&&Sources.push(sourceAll[r])}else if($(this).attr("data-index")>1){sourceAll=Sources,Sources=[];for(var r=0;r<sourceAll.length;r++)sourceAll[r][ids[s]]==value[s]&&Sources.push(sourceAll[r])}console.log(Sources),$("#table tbody").html("");$(this).attr("data-index");$.each(Sources,function(e,a){var t="<tr><td>"+a.SchoolName+"</td><td>"+a.MajorCategories+"</td><td>"+a.ProfessionalCategory+"</td><td>"+a.ProfessionalName+"</td><td>"+a.SchoolSystem+"</td><td>"+a.Year+"</td><td>"+a.Graduate+"</td><td>"+a.Student+"</td><td>"+a.GradeOne+"</td><td>"+a.GradeTwo+"</td><td>"+a.GradeThree+"</td></tr>";$("#table tbody").append(t);var o=[];""!=_select&&($.each(_select,function(e,a){o.push($(a).attr("id"))}),$.each(ids,function(e,a){o.splice($.inArray(a,o),1)})),$.each(o,function(e,t){$("#"+t).append("<option>"+a[t]+"</option>")})})})}});