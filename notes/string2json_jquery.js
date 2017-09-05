###['A','B','C','D','E','F']
var aj = $.ajax( {  
      	url:'/other/url.php',// 跳转到 action  
      	data:{   
            'pass' : 'kali'
      	},  
     	type:'get',  
     	cache:false,  
     	dataType:'json',  
     	success:function(data) {  
         	if(data.msg =="true" ){  
             	// view("修改成功！");  
             	alert("修改成功！");  
         	}else{
         		$.each(data, function(i, item) {
					$("#main").append(
						"<p><a href='"+item+"'>"+i+"</a></p>"
					);
				});
         	}  
      	},  
      	error : function() {  
           	// view("异常！");  
           	alert("异常！");  
      	}  
 	});
