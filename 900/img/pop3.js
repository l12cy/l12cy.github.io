function popClose(){
	var id= arguments[0]?arguments[0]:'popHtml';
	var dom = document.querySelector('#'+id);
	if(dom)
		dom.parentNode.removeChild(dom);
}
function popHtml(obj){
	//popClose();
	var popDiv = document.createElement('div');
	popDiv.id = obj['id']?obj['id']:'popHtml';
	
	
	
	popDiv.className ="pop-bottom";
	var z_index = obj['z-index']?obj['z-index']:9999;
	var html = '';
	
	
	var shadeClose =  obj.hasOwnProperty('shadeClose')?obj.shadeClose:false;
	if(obj.nomask) {
	} else {
		html+='<div class="pop-bg" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.55);z-index:'+z_index+';"></div>';
	}
	
	var bg_color = obj.bg_color?obj.bg_color:'#fff';
	if(obj.align&&obj.align=='center') {
		obj.width = obj.hasOwnProperty('width')?obj.width:'80%';
		html += '<div class="pop-content" style="position:fixed;left:50%;top:50%;transform:translateX(-50%) translateY(-50%);width:'+obj.width+';height:fit-content;background-color:'+bg_color+';z-index:'+z_index+';padding:0px 0px 0px;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;	border-radius:10px ;overflow:hidden;padding:8px 10px;">';
	} else {
		html += '<div class="pop-content" style="position:fixed;left:0;bottom:0;width:100%;background-color:'+bg_color+';z-index:'+z_index+';padding:0px 0px 0px;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;	border-radius:10px 10px 0 0 ;overflow:hidden;padding:8px 10px;">';
	}
	
	
	
	var closeBtn = obj.hasOwnProperty('closeBtn')?obj.closeBtn:true;
	if(closeBtn) {
		html += '<img class="pop-close" src="https://zqmodule.oss-cn-hangzhou.aliyuncs.com/xiexinbao/images/close.png"  style="width:20px;height:20px;position:absolute;right:10px;top:10px;"/>';
	}
	
	if(obj.title) {
		html += '<div class="pop-title" style="padding: 10px;color:#000;font-size:14px;font-weight:bold;text-align:center;">'+obj.title+'</div>';
	}
	
	html += '<div class="pop-body" style="padding:5px 0 5px;">';
	html += obj.content;
	if(obj.button&&obj.button.text) {
		if(typeof obj.button.url =='undefined') {
			html += '<span id="pop-btn-create" class="btn-create">'+obj.button.text+'</span>';
		} else {
			html += '<a target="_blank"  href="'+obj.button.url+'" id="pop-btn-create" class="btn-create">'+obj.button.text+'</a>';	
		}
	}
	html += '</div>';
	html += '<style>.pop-bottom .btn-create { width: 96%; height: 34px; line-height: 34px; margin: 10px auto; text-align: center; color: #fff; background-color: #000; cursor: pointer; font-size: 12px;border-radius: 0px; text-decoration: none; display: block;}</style>';
	html += '</div>';
	
	popDiv.innerHTML = html;
	document.body.appendChild(popDiv);
	
	
	if(obj.button&&obj.button.click) {
		document.querySelector('#'+ popDiv.id+' #pop-btn-create').addEventListener("click", function (e) {
			obj.button.click();
		});
	}
	
	function closeSelf(obj,popDiv){
		return function(){
			if(obj.hasOwnProperty('closeFn')){
				obj.closeFn();
			}
			popClose(popDiv.id);
		}
	}
	if(popDiv.querySelector('.pop-bg') && shadeClose) {
		popDiv.querySelector('.pop-bg').onclick = closeSelf(obj,popDiv);
	}
	if(popDiv.querySelector('.pop-close') && closeBtn) {
		popDiv.querySelector('.pop-close').onclick = closeSelf(obj,popDiv);
	}
	popDiv.closeSelf = closeSelf(obj,popDiv);
	return popDiv;
}
function popHtml2(obj){
	//popClose();
	var popDiv = document.createElement('div');
	popDiv.id = obj['id']?obj['id']:'popHtml';
	popDiv.className ="pop-bottom";
	var z_index = obj['z-index']?obj['z-index']:9999;
	var html = '';
	var shadeClose =  obj.hasOwnProperty('shadeClose')?obj.shadeClose:false;
	if(obj.nomask) {
		if(shadeClose) {
			html+='<div class="pop-bg" onclick="popClose(\''+popDiv.id+'\')" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0);z-index:'+z_index+';"></div>';
		} else {
			html+='<div class="pop-bg"  style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0);z-index:'+z_index+';"></div>';
		}
	} else {
		if(shadeClose) {
			html+='<div class="pop-bg" onclick="popClose(\''+popDiv.id+'\')" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.55);z-index:'+z_index+';"></div>';
		} else {
			html+='<div class="pop-bg" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.55);z-index:'+z_index+';"></div>';
		}
	}
	
	var bg_color = obj.bg_color?obj.bg_color:'#fff';
	if(obj.align&&obj.align=='center') {
		obj.width = obj.hasOwnProperty('width')?obj.width:'80%';
		html += '<div class="pop-content" style="position:fixed;left:50%;top:50%;transform:translateX(-50%) translateY(-50%);width:'+obj.width+';background-color:'+bg_color+';z-index:'+z_index+';padding:0px 0px 0px;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;	border-radius:10px ;overflow:hidden;padding:8px 10px;">';
	} else {
		html += '<div class="pop-content" style="position:fixed;left:0;bottom:0;width:100%;background-color:'+bg_color+';z-index:'+z_index+';padding:0px 0px 0px;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;	border-radius:10px 10px 0 0 ;overflow:hidden;padding:8px 10px;">';
	}
	
	var closeBtn = obj.hasOwnProperty('closeBtn')?obj.closeBtn:true;
	if(closeBtn) {
		html += '<img class="pop-close" src="https://zqmodule.oss-cn-hangzhou.aliyuncs.com/xiexinbao/images/close.png" onclick="popClose(\''+popDiv.id+'\')" style="width:20px;height:20px;position:absolute;left:10px;top:10px;"/>';
	}
	
	if(obj.button&&obj.button.text) {
		if(typeof obj.button.url =='undefined') {
			html += '<a id="pop-btn-create"  style="height:20px;position:absolute;right:10px;top:10px;white-space: nowrap;color: #007aff;font-weight:bold;cursor: pointer;">'+obj.button.text+'</a>';
		} else {
			html += '<a target="_blank"  href="'+obj.button.url+'" id="pop-btn-create"  style="height:20px;position:absolute;right:10px;top:10px;white-space: nowrap;color: #007aff;font-weight:bold;cursor: pointer;">'+obj.button.text+'</a>';	
		}
	}
	
	if(obj.title) {
		html += '<div class="pop-title" style="padding: 10px;color:#000;font-size:14px;font-weight:bold;text-align:center;">'+obj.title+'</div>';
	}

	html += '<div class="pop-body" style="padding:5px 0 5px;">';
	html += obj.content;
	html += '</div></div>';

	popDiv.innerHTML = html;
	document.body.appendChild(popDiv);
	
	
	if(obj.button&&obj.button.click) {
		document.querySelector('#'+ popDiv.id+' #pop-btn-create').addEventListener("click", function (e) {
			obj.button.click();
		});
	}
}

function popHtml3(obj){
	//popClose();
	var popDiv = document.createElement('div');
	popDiv.id = obj['id']?obj['id']:'popHtml';
	popDiv.className ="pop-bottom";
	var z_index = obj['z-index']?obj['z-index']:9999;
	var html = '';
	var shadeClose =  obj.hasOwnProperty('shadeClose')?obj.shadeClose:false;
	if(obj.nomask) {
		if(shadeClose) {
			html+='<div class="pop-bg" onclick="popClose(\''+popDiv.id+'\')" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0);z-index:'+z_index+';"></div>';
		} else {
			html+='<div class="pop-bg"  style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0);z-index:'+z_index+';"></div>';
		}
	} else {
		if(shadeClose) {
			html+='<div class="pop-bg" onclick="popClose(\''+popDiv.id+'\')" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.55);z-index:'+z_index+';"></div>';
		} else {
			html+='<div class="pop-bg" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.55);z-index:'+z_index+';"></div>';
		}
	}

	var bg_color = obj.bg_color?obj.bg_color:'#fff';
	if(obj.align&&obj.align=='center') {
		obj.width = obj.hasOwnProperty('width')?obj.width:'80%';
		html += '<div class="pop-content" style="position:fixed;left:50%;top:50%;transform:translateX(-50%) translateY(-50%);width:'+obj.width+';background-color:'+bg_color+';z-index:'+z_index+';padding:0px 0px 0px;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;	border-radius:10px ;overflow:hidden;padding:8px 10px;">';
	} else if(obj.align&&obj.align=='top') {
		obj.width = obj.hasOwnProperty('width')?obj.width:'80%';
		html += '<div class="pop-content" style="position:fixed;left:50%;top:0;transform:translateX(-50%) ;width:'+obj.width+';background-color:'+bg_color+';z-index:'+z_index+';padding:0px 0px 0px;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;	border-radius:10px ;overflow:hidden;padding:8px 10px;">';
	} else if(obj.align&&obj.align=='full') {
		obj.width = obj.hasOwnProperty('width')?obj.width:'100%';
		html += '<div class="pop-content" style="position:fixed;left:0;top:0;right:0;bottom:0;height:100%;width:100%;background-color:'+bg_color+';z-index:'+z_index+';padding:0px 0px 0px;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;	border-radius:0px ;overflow:hidden;padding:8px 10px;">';
	} else {
		html += '<div class="pop-content" style="position:fixed;left:0;bottom:0;width:100%;background-color:'+bg_color+';z-index:'+z_index+';padding:0px 0px 0px;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;	border-radius:10px 10px 0 0 ;overflow:hidden;padding:8px 10px;">';
	}

	var closeBtn = obj.hasOwnProperty('closeBtn')?obj.closeBtn:true;
	if(closeBtn) {
		html += '<img class="pop-close" src="https://zqmodule.oss-cn-hangzhou.aliyuncs.com/xiexinbao/images/close.png" onclick="popClose(\''+popDiv.id+'\')" style="width:20px;height:20px;position:absolute;left:10px;top:10px;"/>';
	}

	if(obj.button&&obj.button.text) {
		if(typeof obj.button.url =='undefined') {
			html += '<a id="pop-btn-create"  style="height:20px;position:absolute;right:10px;top:10px;white-space: nowrap;color: #007aff;font-weight:bold;cursor:pointer;">'+obj.button.text+'</a>';
		} else {
			html += '<a target="_blank"  href="'+obj.button.url+'" id="pop-btn-create"  style="height:20px;position:absolute;right:10px;top:10px;white-space: nowrap;color: #007aff;cursor:pointer;">'+obj.button.text+'</a>';	
		}
	}

	if(obj.title) {
		html += '<div class="pop-title" style="padding: 5px;color:#000;font-size:14px;font-weight:bold;text-align:center;">'+obj.title+'</div>';
	}

	html += '<div class="pop-body" style="padding:5px 0 0px;">';
	html += obj.content;
	
	if(obj.bt_buttons) {
		var bottom_html = '<div class="pop-bottom-buttons">';
		for(var m=0;m<obj.bt_buttons.length;m++) {
			var bt_button = obj.bt_buttons[m];
			if(typeof bt_button.url =='undefined') {
				bottom_html += '<a style="background-color:'+(bt_button.bgColor||'#000')+';" id="pop-bottom-button-'+m+'" class="btn-create">'+bt_button.text+'</a>';
			} else {
				bottom_html += '<a style="background-color:'+(bt_button.bgColor||'#000')+';" id="pop-bottom-button-'+m+';" class="btn-create" target="_blank" href="'+bt_button.url+'">'+bt_button.text+'</a>';	
			}
		}
		bottom_html+='</div>';
		html +=bottom_html;
	}
	
	html += '</div></div>';
	
	popDiv.innerHTML = html;
	document.body.appendChild(popDiv);
	
	
	if(obj.button&&obj.button.click) {
		document.querySelector('#'+ popDiv.id+' #pop-btn-create').addEventListener("click", function (e) {
			obj.button.click();
		});
	}
	
	function btn_bind_click(bt_button){
		document.querySelector('#pop-bottom-button-'+m).addEventListener("click", function (e) {
			bt_button.click();
		});
	}
	
	if(obj.bt_buttons) {
		for(var m=0;m<obj.bt_buttons.length;m++) {
			var bt_button = obj.bt_buttons[m];
			btn_bind_click(bt_button);
		}
	}
}


function popOptions(obj){
	var buttons = [];
	for(var i=0;i<obj.buttons.length;i++){
		obj.buttons[i].id = obj.buttons[i].id?obj.buttons[i].id:((new Date).getTime()+i);
	}

	//popClose();
	var popDiv = document.createElement('div');
	popDiv.id = obj['id']?obj['id']:'popOptions';
	popDiv.className ="pop-bottom";
	var z_index = obj['z-index']?obj['z-index']:9999;
	var html = '';
	if(obj.nomask) {
		html+='<div class="pop-bg" onclick="popClose(\''+popDiv.id+'\')" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0);z-index:'+z_index+';"></div>';
	} else {
		html+='<div class="pop-bg" onclick="popClose(\''+popDiv.id+'\')" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.55);z-index:'+z_index+';"></div>';
	}

	var bg_color = obj.bg_color?obj.bg_color:'#fff';
	if(obj.align&&obj.align=='center') {
		html += '<div class="pop-content" style="width:80%;position:fixed;left:50%;top:50%;transform:translateX(-50%) translateY(-50%);background-color:'+bg_color+';z-index:'+z_index+';padding:0px 0px 0px;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;	border-radius:10px ;overflow:hidden;padding:5px 10px 2;">';
	} else {
		html += '<div class="pop-content" style="width:96%;position:fixed;left:50%;bottom:2vw;transform:translateX(-50%);background-color:'+bg_color+';z-index:'+z_index+';padding:0px 0px 0px;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;	border-radius:10px 10px 10px 10px ;overflow:hidden;padding:5px 10px 0px;">';
	}
	html += '<img class="pop-close" src="https://zqmodule.oss-cn-hangzhou.aliyuncs.com/xiexinbao/images/close.png" onclick="popClose(\''+popDiv.id+'\')" style="width:20px;height:20px;position:absolute;right:10px;top:10px;"/>';
	html += '<div class="pop-title" style="padding: 10px;color:#000;font-size:14px;font-weight:bold;text-align:center;">'+(obj.title||'&nbsp;')+'</div>';

	html += '<div class="pop-body pop-option-btns"  style="padding:5px 0 5px;max-height:60vh;overflow-y:auto;">';
	html += obj.content||'';
	for(var i=0;i<obj.buttons.length;i++){
		var button = obj.buttons[i];
		if(typeof button.url =='undefined') {
			html += '<a id="pop-option-btn-'+button.id+'" data-text="'+button.text+'"  data-value="'+(button.vaule||button.text)+'" class="pop-option-btn">'+button.text+'</a>';
		} else {
			html += '<a id="pop-option-btn-'+button.id+'" data-text="'+button.text+'"  data-value="'+(button.vaule||button.text)+'" class="pop-option-btn" target="_blank"  href="'+button.url+'" >'+button.text+'</a>';
		}
	}

	html += '</div></div>';
	html += '<style>.pop-option-btn{width: 100%;text-align: center;font-weight: 400;margin: 0;background: rgba(255,255,255,.95);box-sizing: border-box;display: block;position: relative;overflow: hidden;cursor: pointer;height: 57px;line-height: 57px;font-size: 20px;color: #007aff;white-space: normal;text-overflow: ellipsis;text-decoration:none;}';
	html += ".pop-option-btns .pop-option-btn:not(:last-child):after{content:'';position: absolute;left: 0;bottom: 0;right: auto;top: auto;height: 1px;width: 100%;background-color: rgba(0,0,0,.2);}</style>";
	popDiv.innerHTML = html;
	document.body.appendChild(popDiv);

	function bindClick(id,clickFn){
		document.querySelector('#pop-option-btn-'+ id).addEventListener("click", function (e) {
			clickFn();
			popClose(popDiv.id);
		});
	}
	
	//给按钮绑定事件
	for(var i=0;i<obj.buttons.length;i++){
		var button = obj.buttons[i];
		if(button&&button.click) {
			bindClick(button.id,button.click);
		}
	}
}

function popToast(obj){
	closeToast();
	var popDiv = document.createElement('div');
	popDiv.id = 'popToast';
	popDiv.className ="popToast";
	var html = '';
	obj.icon = obj.icon?obj.icon:'none';
	var icon_url = 'https://zqmodule.oss-cn-hangzhou.aliyuncs.com/www/loading.gif';
	
	if(obj.icon&&obj.icon=='error') {
		icon_url = 'https://zqmodule.oss-cn-hangzhou.aliyuncs.com/www/error.png';
	}
	
	if(obj.icon&&obj.icon=='none') {
	} else {
		html += '<img class="pop-icon" src="'+icon_url+'" style="width:30px;"/>';
	}
	
	var content = obj.title || obj.text || obj.content;
	
	html += '<div class="popToast-title">'+obj.title+'</div>';
	if(obj.icon&&obj.icon=='success') {
		html = '<div class="pop-mask" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.01);z-index:5349;"></div>';
		html += '<div class="weui-toast"><i class="weui-icon-success-no-circle weui-icon_toast"></i><p class="weui-toast__content">'+content+'</p></div>';
	}
	if(obj.icon&&obj.icon=='error') {
		html = '<div class="pop-mask" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.01);z-index:5349;"></div>';
		html += '<div class="weui-toast"><i class="weui-icon-warn-no-circle weui-icon_toast"></i><p class="weui-toast__content">'+content+'</p></div>';
	}
	if(obj.icon&&obj.icon=='loading') {
		html = '<div class="pop-mask" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.01);z-index:5349;"></div>';
		html += '<div class="weui-toast"><span class="weui-primary-loading weui-icon_toast"> <span class="weui-primary-loading__dot"></span></span> <p class="weui-toast__content">'+content+'</p></div>';
	}
	if(obj.icon&&obj.icon=='none') {
		html = '<div class="pop-mask" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.01);z-index:5349;"></div>';
		html += '<div class="weui-toast weui-toast_text"> <p class="weui-toast__content">'+content+'</p> </div>';
		
           
       
	}
	
	html += '<style>.weui-toast{position:fixed;z-index:5500;font-size:10px;width:13.6em;height:13.6em;top:40%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;border-radius:12px;color:rgba(255,255,255,0.9);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;background-color:#4c4c4c;box-sizing:border-box;line-height:1.4}';
	html += '.weui-icon_toast{display:block;margin-bottom:16px}';
	html += '.weui-primary-loading{font-size:16px;display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;position:relative;width:1em;height:1em;vertical-align:middle;color:#606060;-webkit-animation:circleLoading 1s steps(60,end) infinite;animation:circleLoading 1s steps(60,end) infinite}';
	html += '.weui-icon_toast.weui-primary-loading{display:-webkit-box;display:-webkit-flex;display:flex;width:1em;height:1em;font-size:40px;color:#ededed}';
	html += '.weui-primary-loading::before,.weui-primary-loading::after{content:"";display:block;width:0.5em;height:1em;box-sizing:border-box;border:0.0875em solid;border-color:currentColor}';
	html += '.weui-primary-loading::before{border-right-width:0;border-top-left-radius:1em;border-bottom-left-radius:1em;-webkit-mask-image:-webkit-linear-gradient(top,#000000 8%,rgba(0,0,0,0.3) 95%)}';
	html += '.weui-icon_toast.weui-primary-loading::before{border-width:4px 0 4px 4px}';
	html += '.weui-primary-loading::after{border-left-width:0;border-top-right-radius:1em;border-bottom-right-radius:1em;-webkit-mask-image:-webkit-linear-gradient(top,rgba(0,0,0,0) 8%,rgba(0,0,0,0.3) 95%)}';
	html += '.weui-icon_toast.weui-primary-loading::after{border-width:4px 4px 4px 0}';
	html += '.weui-toast__content{font-size:17px;padding:0 12px;word-wrap:break-word;-webkit-hyphens:auto;hyphens:auto;font-family:system-ui,-apple-system,Helvetica Neue,sans-serif;margin:0;padding:0 12px}';
	
	html += '.weui-icon-success { mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-1.177-7.86l-2.765-2.767L7%2012.431l3.119%203.121a1%201%200%20001.414%200l5.952-5.95-1.062-1.062-5.6%205.6z%22%2F%3E%3C%2Fsvg%3E);}';
	html += '.weui-icon-success-circle { mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6zm-1.172-6.242l5.809-5.808.848.849-5.95%205.95a1%201%200%2001-1.414%200L7%2012.426l.849-.849%202.98%202.98z%22%2F%3E%3C%2Fsvg%3E);}';
	html += '.weui-icon-success-no-circle {margin-bottom:10px;-webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;-webkit-mask-size: 100%;mask-size: 100%;background-color: currentColor;color:#07c160;width:50px; height:50px;mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8.657%2018.435L3%2012.778l1.414-1.414%204.95%204.95L20.678%205l1.414%201.414-12.02%2012.021a1%201%200%2001-1.415%200z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8.657%2018.435L3%2012.778l1.414-1.414%204.95%204.95L20.678%205l1.414%201.414-12.02%2012.021a1%201%200%2001-1.415%200z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);}';
	html += '.weui-icon-warn-no-circle {margin-bottom:10px;-webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;-webkit-mask-size: 100%;mask-size: 100%;background-color: currentColor;color: hsla(0,0%,100%,.9);width:42px; height:42px;mask-image:url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-.763-15.864l.11%207.596h1.305l.11-7.596h-1.525zm.759%2010.967c.512%200%20.902-.383.902-.882%200-.5-.39-.882-.902-.882a.878.878%200%2000-.896.882c0%20.499.396.882.896.882z%22%2F%3E%3C%2Fsvg%3E);-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-.763-15.864l.11%207.596h1.305l.11-7.596h-1.525zm.759%2010.967c.512%200%20.902-.383.902-.882%200-.5-.39-.882-.902-.882a.878.878%200%2000-.896.882c0%20.499.396.882.896.882z%22%2F%3E%3C%2Fsvg%3E);}';
	
	html +=`.weui-icon-warn {
		display: inline-block;
		vertical-align: middle;
		font-size: 10px;
		width: 4em;
		height: 4em;
		color: rgba(255, 255, 255, 0.9);
		-webkit-mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-.763-15.864l.11%207.596h1.305l.11-7.596h-1.525zm.759%2010.967c.512%200%20.902-.383.902-.882%200-.5-.39-.882-.902-.882a.878.878%200%2000-.896.882c0%20.499.396.882.896.882z%22%2F%3E%3C%2Fsvg%3E);
		mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-.763-15.864l.11%207.596h1.305l.11-7.596h-1.525zm.759%2010.967c.512%200%20.902-.383.902-.882%200-.5-.39-.882-.902-.882a.878.878%200%2000-.896.882c0%20.499.396.882.896.882z%22%2F%3E%3C%2Fsvg%3E);
	}
	
	.weui-toast_text {
		width: auto;
		height: auto;
		min-width: 152px;
		max-width: 216px;
		padding: 12px 0;
		border-radius: 8px;
	}
	`
	
	
	html += '@keyframes circleLoading{0%{transform:rotate3d(0,0,1,0deg)}100%{transform:rotate3d(0,0,1,360deg)}}</style>';
	popDiv.innerHTML = html;
	
	document.body.appendChild(popDiv);
	
	if(obj.hasOwnProperty('timeout') && obj.timeout>0) {
		setTimeout(function(){
			var dom = document.getElementById('popToast');
			if(dom) {
				dom.parentNode.removeChild(dom);
			}
			if(obj.callback){obj.callback();}
		},obj.timeout||2000);
	}
	
	popDiv.closeSelf = function() {
		popDiv.remove();
	}
	return popDiv;
}

function textToast(title){
	var popDiv = document.getElementById('popToast');
	if(popDiv){
		var titleDiv = document.querySelector('.popToast-title');
		titleDiv.innerHTML = title;
	}
}
function closeToast(){
	var dom = document.getElementById('popToast');
	if(dom) {
		dom.parentNode.removeChild(dom);
	}
}

function popComfirm(){
	var obj =  arguments[0]?arguments[0]:{};
	var title = obj.title || '';
	var content = obj.text || obj.content ;
	var width = obj.hasOwnProperty('width')?obj.width:'320px';
	var z_index = obj['z-index']?obj['z-index']:9999;
	
	return new Promise((resolve, reject) => {
		function closeSelf(popDiv) {
			return function() {
				// 恢复滚动并返回之前的位置
				document.body.classList.remove('no-scroll');
				window.scrollTo(0, window.scrollPosition);  // 滚动到之前的位置
				document.body.style.top = '';  // 清除top样式
				popDiv.remove();
			};
		}
		// 阻止滚动并记录当前位置
		document.body.classList.add('no-scroll');
		window.scrollPosition = window.pageYOffset; // 获取当前垂直滚动位置
		document.body.style.top = -window.scrollPosition + 'px';  // 设置top属性以保持视觉上的位置不变
		document.body.classList.add('no-scroll');

		var popDiv = document.createElement('div');
		popDiv.id = obj['id']?obj['id']:'popComfirm';
		
		
		//样式 https://weui.io/#dialog ，微信中删除聊天记录弹框提醒
		var html = `
		<div class="comfirm-box">
			<div class="comfirm-mask" style="position:fixed;top:0;bottom:0;right:0;width:100%;z-index:${z_index};background: rgba(0,0,0,0.5);"></div>
			<div class="comfirm-content"><div class="comfirm-inner"><div class="comfirm-title">${title}</div><div class="comfirm-text">${content}</div></div><div class="comfirm-btns"></div></div>
		</div>';
		<style>.no-scroll {overflow: hidden;position: fixed; width: 100%;height: 100%;}</style>
		<style>.comfirm-content {background-color: #fff;border-radius: 12px;margin: 0;outline: none;padding: 0;position: fixed;z-index:9999;background-color:#fff;left:50%;top:50%;transform:translateX(-50%) translateY(-50%);}</style>
		<style>.comfirm-inner {width: ${width};max-width:90vw;padding:24px 24px;max-width:90vw;text-align:center;font-size: 18px;line-height: 1.6;word-wrap: break-word;-webkit-hyphens: auto;hyphens: auto;color: rgba(0,0,0,1);}</style>
		<style>.comfirm-title {text-align:center;font-size: 18px;font-weight:600;line-height: 1.6;word-wrap: break-word;-webkit-hyphens: auto;hyphens: auto;color: rgba(0,0,0,1);}</style>
		<style>.comfirm-text {text-align:center;font-size: 14px;margin-top:5px;line-height: 1.4;word-wrap: break-word;-webkit-hyphens: auto;hyphens: auto;color: rgba(0,0,0,1);}</style>
		<style>.comfirm-btns {border-top:1px solid rgba(0,0,0,0.1);display:flex;}</style>
		<style>.comfirm-btns .button-item {flex:1;padding: 16px 0;user-select: none;text-align:center;cursor:pointer;font-weight:700;font-size:17px;}.comfirm-btns .button-item:first-child{border-right:1px solid rgba(0,0,0,0.1);}</style>`

		popDiv.innerHTML = html;
		document.body.appendChild(popDiv);

		if(obj.hasOwnProperty('buttons')&&obj.buttons.length>0) {
		} else {
			obj.buttons = [
				{text:'取消',color:'#000',click:function(confirmDiv){
					confirmDiv.closeSelf();
					resolve(false);
				}},
				{text:'确定',color:'#007aff',click:function(confirmDiv){
					confirmDiv.closeSelf();
					resolve(true);
				}}
			];
		}

		for(var m=0;m<obj.buttons.length;m++) {
			var button = obj.buttons[m];
			var btnDiv = document.createElement('div');
			btnDiv.innerHTML = '<a class="button-item" style="color:'+button.color+';">'+button.text+'</a>';
			btnDiv = btnDiv.children[0];
			btnDiv.onclick = (function(popDiv,button){
				return function() {
					button.click(popDiv);
				};
			})(popDiv,button);
			popDiv.querySelector('.comfirm-btns').appendChild(btnDiv);
		}
		//绑定关闭事件
		popDiv.closeSelf = closeSelf(popDiv);
	});
}

function popAlert(){
	var obj =  arguments[0]?arguments[0]:{};
	var content = obj.text || obj.content ;
	var width = obj.hasOwnProperty('width')?obj.width:'320px';
	function closeSelf(popDiv) {
		return function() {
			// 恢复滚动并返回之前的位置
			document.body.classList.remove('no-scroll');
			window.scrollTo(0, window.scrollPosition);  // 滚动到之前的位置
			document.body.style.top = '';  // 清除top样式
			popDiv.remove();
		};
	}
	// 阻止滚动并记录当前位置
	document.body.classList.add('no-scroll');
	window.scrollPosition = window.pageYOffset; // 获取当前垂直滚动位置
	document.body.style.top = -window.scrollPosition + 'px';  // 设置top属性以保持视觉上的位置不变
	document.body.classList.add('no-scroll');

	var popDiv = document.createElement('div');
	popDiv.id = obj['id']?obj['id']:'popComfirm';
	var z_index = obj['z-index']?obj['z-index']:9999;
	
	//样式 https://weui.io/#dialog ，微信中删除聊天记录弹框提醒
	var html = `<div class="comfirm-box">';
					<div class="comfirm-mask" style="position:fixed;top:0;bottom:0;right:0;width:100%;z-index:${z_index};background: rgba(0,0,0,0.5);"></div>
					<div class="comfirm-content"><div class="comfirm-text">${content}</div><div class="comfirm-btns"></div></div>
				<style>.no-scroll {overflow: hidden;position: fixed; width: 100%;height: 100%;}</style>
				<style>.comfirm-content {background-color: #fff;border-radius: 12px;margin: 0;outline: none;padding: 0;position: fixed;z-index:9999;background-color:#fff;left:50%;top:50%;transform:translateX(-50%) translateY(-50%);}</style>
				<style>.comfirm-text {width: ${width};max-width:80vw;text-align:center;padding:32px 24px;font-size: 17px;line-height: 1.4;word-wrap: break-word;-webkit-hyphens: auto;hyphens: auto;color: rgba(0,0,0,1);}</style>
				<style>.comfirm-btns {border-top:1px solid rgba(0,0,0,0.1);display:flex;}</style>';
				<style>.comfirm-btns .button-item {flex:1;padding: 16px 0;user-select: none;text-align:center;cursor:pointer;font-weight:700;font-size:17px;}.comfirm-btns .button-item:first-child{border-right:1px solid rgba(0,0,0,0.1);}</style>
				</div>`;
				

	popDiv.innerHTML = html;
	document.body.appendChild(popDiv);
	
	//绑定关闭事件
	popDiv.closeSelf = closeSelf(popDiv);
	
	if(obj.hasOwnProperty('buttons')&&obj.buttons.length>0) {
		for(var m=0;m<obj.buttons.length;m++) {
			var button = obj.buttons[m];
			var btnDiv = document.createElement('div');
			btnDiv.innerHTML = '<a class="button-item" style="color:'+button.color+';">'+button.text+'</a>';
			btnDiv = btnDiv.children[0];
			btnDiv.onclick = (function(popDiv,button){
				return function() {
					button.click(popDiv);
				};
			})(popDiv,button);
			popDiv.querySelector('.comfirm-btns').appendChild(btnDiv);
		}
		return popDiv;
	} else {
		return new Promise((resolve, reject) => {
			obj.buttons = [
				{text:'确定',color:'#007aff',click:function(confirmDiv){
					confirmDiv.closeSelf();
					resolve(true);
				}}
			];
			for(var m=0;m<obj.buttons.length;m++) {
				var button = obj.buttons[m];
				var btnDiv = document.createElement('div');
				btnDiv.innerHTML = '<a class="button-item" style="color:'+button.color+';">'+button.text+'</a>';
				btnDiv = btnDiv.children[0];
				btnDiv.onclick = (function(popDiv,button){
					return function() {
						button.click(popDiv);
					};
				})(popDiv,button);
				popDiv.querySelector('.comfirm-btns').appendChild(btnDiv);
			}
		});
	}
}


function popActionMenu(){
	function closeSelf(popDiv) {
		return function() {
			// 恢复滚动并返回之前的位置
			document.body.classList.remove('no-scroll');
			window.scrollTo(0, window.scrollPosition);  // 滚动到之前的位置
			document.body.style.top = '';  // 清除top样式
			popDiv.remove();
		};
	}
	var obj =  arguments[0]?arguments[0]:{};
	document.body.classList.add('no-scroll');
	// 阻止滚动并记录当前位置
	window.scrollPosition = window.pageYOffset; // 获取当前垂直滚动位置
	document.body.style.top = -window.scrollPosition + 'px';  // 设置top属性以保持视觉上的位置不变
	document.body.classList.add('no-scroll');
	
	var popDiv = document.createElement('div');
	popDiv.id = obj['id']?obj['id']:'popActionMenu';
	var z_index = obj['z-index']?obj['z-index']:9999;
	var html = `<div class="action-menu-box">
		<div class="action-menu-mask" style="position:fixed;top:0;bottom:0;right:0;width:100%;z-index:9999;"></div>
		<div class="action-menu"><div class="item-wrapper"></div></div>
	</div>`;
	
	//css样式
	html += `<style>
	.no-scroll {overflow: hidden;position: fixed; width: 100%;height: 100%;}
	@keyframes slideIn {from { opacity: 0; }to { opacity: 1; }}
	.action-menu {background-color: #fff;border: none;border-radius: 4px;box-shadow: 0 4px 8px rgba(31,35,41,0.1);margin: 0;min-width: 128px;outline: none;padding: 0;position: fixed;z-index:9999;background-color:#fff;border:1px solid #dee0e3;overflow: hidden;}
	.item-wrapper {outline: none;padding: 8px 0;background-color:#fff;}
	.dropdown-item{-webkit-tap-highlight-color: transparent;background: none;border: none;border-radius: 0;box-sizing: border-box;color: #202124;font: inherit;min-height: 32px;padding: 0 24px;text-align: start;user-select: none;width: 100%;background-color:#fff;display:block;cursor: pointer;}
	.dropdown-item:focus, .dropdown-item:hover{background-color: #bdc1c6;outline: none;}
	</style>`;
	
	popDiv.innerHTML = html;
	document.body.appendChild(popDiv);
	
	if(obj.hasOwnProperty('buttons')&&obj.buttons.length>0) {
	} else {}
	for(var m=0;m<obj.buttons.length;m++) {
		var button = obj.buttons[m];
		var btnDiv = document.createElement('div');
		btnDiv.innerHTML = '<button class="dropdown-item">'+button.text+'</button>';
		btnDiv = btnDiv.children[0];
		
		btnDiv.onclick = (function(popDiv,button){
			return function() {
				button.click(popDiv);
			};
		})(popDiv,button);
		popDiv.querySelector('.item-wrapper').appendChild(btnDiv);
	}
	
	//el定位
	var moreIcon = obj.el;
	var menuWidth = popDiv.querySelector('.action-menu').getBoundingClientRect().width;
	var menuHeight = popDiv.querySelector('.action-menu').getBoundingClientRect().height;
	var left = moreIcon.getBoundingClientRect().right -8; 
	if(moreIcon.getBoundingClientRect().right > window.innerWidth/2){
		left = moreIcon.getBoundingClientRect().right - menuWidth ;
	}
	var top = moreIcon.getBoundingClientRect().bottom + 4;
	if(moreIcon.getBoundingClientRect().bottom > window.innerHeight/2){
		top = moreIcon.getBoundingClientRect().bottom - menuHeight -16 -4;
	}
	Object.assign(popDiv.querySelector('.action-menu').style, {left: `${left}px`,top: `${top}px`});
	
	//绑定关闭事件
	popDiv.querySelector('.action-menu-mask').onclick = closeSelf(popDiv);
	popDiv.closeSelf = closeSelf(popDiv);
	return popDiv;
}

function popPage(obj){
	// 阻止滚动并记录当前位置
	document.body.classList.add('no-scroll');
	window.scrollPosition = window.pageYOffset; // 获取当前垂直滚动位置
	document.body.style.top = -window.scrollPosition + 'px';  // 设置top属性以保持视觉上的位置不变
	document.body.classList.add('no-scroll');


	var popDiv = document.createElement('div');
	popDiv.id = obj['id']?obj['id']:'popPage';
	popDiv.className ="pop-bottom";
	var z_index = obj['z-index']?obj['z-index']:9999;
	var html = '';
	var shadeClose =  obj.hasOwnProperty('shadeClose')?obj.shadeClose:false;
	if(obj.hasOwnProperty('nomask')&&obj.nomask==true) {
		html+='<div class="pop-mask" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.9);z-index:'+z_index+';display:none;"></div>';
	} else {
		html+='<div class="pop-mask" style="position:fixed;top:0;bottom:0;right:0;width:100%;background-color:rgba(0,0,0,0.9);z-index:'+z_index+';"></div>';
	}
	html += '<div class="pop-body" style="padding:0;overflow:hidden;bottom: 0; left: 0;overflow: hidden;position: fixed;right: 0;top: 0;z-index:'+z_index+';"></div>';
	html += '<style>.no-scroll {overflow: hidden;position: fixed; width: 100%;height: 100%;}</style>';
	
	popDiv.innerHTML = html;
	document.body.appendChild(popDiv);
	popDiv.querySelector('.pop-body').appendChild(obj.content);

	//绑定关闭事件
	function closeSelf(popDiv) {
		return function() {
			// 恢复滚动并返回之前的位置
			document.body.classList.remove('no-scroll');
			window.scrollTo(0, window.scrollPosition);  // 滚动到之前的位置
			document.body.style.top = '';  // 清除top样式
			popDiv.remove();
		};
	}
	popDiv.querySelector('.pop-mask').onclick = closeSelf(popDiv);
	popDiv.closeSelf = closeSelf(popDiv);

	return popDiv;
}
function closePage(id){
	// 恢复滚动并返回之前的位置
	document.body.classList.remove('no-scroll');
	window.scrollTo(0, window.scrollPosition);  // 滚动到之前的位置
	document.body.style.top = '';  // 清除top样式
	popClose(id)
}

function popActionSheet(obj){
	var obj =  arguments[0]?arguments[0]:{};
	function closeSelf(popDiv) {
		return function() {
			// 恢复滚动并返回之前的位置
			document.body.classList.remove('no-scroll');
			window.scrollTo(0, window.scrollPosition);  // 滚动到之前的位置
			document.body.style.top = '';  // 清除top样式
			popDiv.remove();
			
			if(obj.hasOwnProperty('closeFn')){
				obj.closeFn();
			}
		};
	}
	
	// 阻止滚动并记录当前位置
	document.body.classList.add('no-scroll');
	window.scrollPosition = window.pageYOffset; // 获取当前垂直滚动位置
	document.body.style.top = -window.scrollPosition + 'px';  // 设置top属性以保持视觉上的位置不变
	document.body.classList.add('no-scroll');

	var popDiv = document.createElement('div');
	popDiv.id = obj['id']?obj['id']:'popActionSheet';
	var z_index = obj['z-index']?obj['z-index']:9999;
	var html = `<div class="action-sheet-box">
		<div class="action-sheet-mask" style="position:fixed;top:0;bottom:0;right:0;width:100%;z-index:9999;background: rgba(0,0,0,0.5);"></div>
		<div class="action-sheet"><div class="item-wrapper"></div></div>
	</div>`;
		
		
	//css样式
	html += `<style>
	.no-scroll {overflow: hidden;position: fixed; width: 100%;height: 100%;}
	@keyframes slideIn {from { opacity: 0; }to { opacity: 1; }}
	.action-sheet {width: 100%;background-color: #f2f2f2;border: none;border-radius: 4px;box-shadow: 0 4px 8px rgba(31,35,41,0.1);margin: 0;outline: none;padding: 0;position: fixed;z-index:9999;position: fixed;bottom:0;left:0;border-radius:13px 13px 0 0;overflow: hidden;}
	.item-wrapper {outline: none;padding:0;background-color: transparent;;}
	.sheet-item{-webkit-tap-highlight-color: transparent;background: none;border: none;border-radius: 0;box-sizing: border-box;color: #000;font: inherit;min-height: 32px;padding: 0 24px;text-align: start;user-select: none;width: 100%;background-color:#fff;display:block;cursor: pointer;font-size:18px;border-bottom:1px solid #e2e2e2;padding:18px 8px;text-align:center;}
	.sheet-item:focus, .sheet-item:hover{background-color: #bdc1c6;outline: none;}
	.item-wrapper .sheet-item:last-child{margin-top:10px;}
	</style>`;
	
	popDiv.innerHTML = html;
	document.body.appendChild(popDiv);
	
	if(obj.hasOwnProperty('buttons')&&obj.buttons.length>0) {
		obj.buttons.push({text:'取消',click:function(popDiv){popDiv.closeSelf();}});
	} else {
		obj.buttons = [{text:'取消',click:function(popDiv){popDiv.closeSelf();}}];
	}
	for(var m=0;m<obj.buttons.length;m++) {
		var button = obj.buttons[m];
		var btnDiv = document.createElement('div');
		btnDiv.innerHTML = '<button class="sheet-item">'+button.text+'</button>';
		btnDiv = btnDiv.children[0];
		
		btnDiv.onclick = (function(popDiv,button){
			return function() {
				button.click(popDiv);
			};
		})(popDiv,button);
		
		popDiv.querySelector('.item-wrapper').appendChild(btnDiv);
	}
	
	//绑定关闭事件
	popDiv.querySelector('.action-sheet-mask').onclick = closeSelf(popDiv);
	popDiv.closeSelf = closeSelf(popDiv);
	return popDiv;
}

function bindDropdown(inputId, options, config = { idField: 'id', textField: 'text' }) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) return;

    // 添加CSS样式到文档头部
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.textContent = `
        .dropdown {position: relative; display: inline-block; width: 100%;}
        .dropdown-content {display: none; position: absolute; background-color: #f9f9f9; width: 100%; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; max-height: 200px; overflow-y: auto;}
        .dropdown-content div {padding: 8px 16px; cursor: pointer; color: #333; font-size: 13px;}
        .dropdown-content div:hover {background-color: #bdc1c6;}
        .dropdown-show {display: block;}
        .dropdown input[type="text"]:focus {outline: none; border: 2px solid #007BFF; box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);}
        .dropdown-content::-webkit-scrollbar {display: none;}
    `;

    // 创建下拉菜单的容器
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    dropdown.style.width = inputElement.offsetWidth + 'px'; // 保持原始宽度
    inputElement.parentNode.insertBefore(dropdown, inputElement);
    dropdown.appendChild(inputElement);

    // 创建下拉内容容器
    const dropdownContent = document.createElement('div');
    dropdownContent.id = inputId + 'DropdownContent';
    dropdownContent.className = 'dropdown-content';

    // 添加选项到下拉内容
    options.forEach(option => {
        const div = document.createElement('div');
        if (typeof option === 'string') {
            div.textContent = option;
            div.setAttribute('data-value', option);
        } else {
            div.textContent = option[config.textField];
            div.setAttribute('data-value', option[config.idField]);
        }
        div.onclick = function (e) {
            e.stopPropagation();
            inputElement.value = this.textContent;
            dropdownContent.classList.remove('dropdown-show');
        };
        dropdownContent.appendChild(div);
    });

    dropdown.appendChild(dropdownContent);

    // 显示/隐藏下拉菜单
    inputElement.oninput = inputElement.onfocus = function (e) {
        const filter = inputElement.value.toUpperCase();
        const divs = dropdownContent.querySelectorAll('div');
        let visibleCount = 0;
        divs.forEach(div => {
            const txtValue = div.textContent || div.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                div.style.display = "";
                visibleCount++;
            } else {
                div.style.display = "none";
            }
        });
        if (visibleCount > 0 || e.type === 'focus') {
            dropdownContent.classList.add('dropdown-show');
        } else {
            dropdownContent.classList.remove('dropdown-show');
        }
    };

    // 点击外部关闭下拉菜单
    window.onclick = function (e) {
        if (!dropdown.contains(e.target)) {
            dropdownContent.classList.remove('dropdown-show');
        }
    };

    // 输入框失去焦点时关闭下拉菜单
    inputElement.onblur = function (e) {
        setTimeout(() => {
            if (!dropdown.contains(document.activeElement)) {
                dropdownContent.classList.remove('dropdown-show');
            }
        }, 150);
    };

    // 处理窗口大小调整
    window.addEventListener('resize', () => {
        dropdown.style.width = inputElement.offsetWidth + 'px';
    });
}
