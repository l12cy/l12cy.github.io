var $uploader = {};
$uploader.currentInput = null; // 用于存储当前用于文件上传的<input>元素

$uploader.fileChoose =  function (obj) {
	var obj = arguments[0] ? arguments[0] : {accept: "*/*"};
	// 在创建新的<input>之前，先移除当前存在的<input>（如果有）  
	if ($uploader.currentInput) {  
		document.body.removeChild($uploader.currentInput);  
		$uploader.currentInput = null;  
	}
	
	return new Promise((resolve, reject) => {
		let input = document.createElement("input");
		input.type = "file";
		input.accept = obj.accept;
		input.style.display = "none";
		//input.multiple = "multiple";
		input.id = "tmp_file_window";
		
		$uploader.currentInput = input; // 存储当前<input>元素以便后续可以移除
		
		input.onclick=function(){
			event.stopPropagation();
		}
		
	
		input.onchange = async function () {
			if (obj.onchange) obj.onchange();
		    var _input = this;
		    var file = _input.files[0];
		    resolve(file);
		};
		
		document.body.appendChild(input);
		setTimeout(function () {
		  input.click();
		}, 100);
	});
};

$uploader.fileChooseMultiple =  function (obj) {
	var obj = arguments[0] ? arguments[0] : {accept: "*/*"};//image/*,video/*
	return new Promise((resolve, reject) => {
		let input = document.createElement("input");
		input.type = "file";
		input.accept = obj.accept;
		input.style.display = "none";
		input.multiple = "multiple";
		input.onclick=function(){
			event.stopPropagation();
		}
		input.onchange = async function () {
		  if (obj.onchange) obj.onchange();
		  var _input = this;
		  resolve(_input.files);
		};
		document.body.appendChild(input);
		setTimeout(function () {
		  input.click();
		}, 100);
	});
};

$uploader.get_frame = function (file) {
	// 创建虚拟的video元素
	const videoElement = document.createElement('video');
	videoElement.preload = 'metadata';
	// 创建虚拟的canvas元素
	const canvasElement = document.createElement('canvas');
	const canvasContext = canvasElement.getContext('2d');

	// 监听video元素的loadedmetadata事件
	videoElement.addEventListener('loadedmetadata', function() {
		// 设置canvas的大小以匹配视频的尺寸
		canvasElement.width = videoElement.videoWidth;
		canvasElement.height = videoElement.videoHeight;

		// 绘制视频的第一帧到canvas
		canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

		// 获取绘制的图像数据URL
		const firstFrameDataURL = canvasElement.toDataURL('image/jpeg');
		const durationInSeconds = videoElement.duration;
			// 在这里你可以使用durationInSeconds，可能需要进行格式化
		console.log('视频时长（秒）：', durationInSeconds);

		// 在这里你可以使用 firstFrameDataURL
		console.log('第一帧图片的数据URL：', firstFrameDataURL);
	});
	videoElement.src = URL.createObjectURL(file);
};


$uploader.get_duration =  function (file) {
	return new Promise((resolve, reject) => {
		const video = document.createElement('video');
		video.preload = 'metadata';
		video.onloadedmetadata = function() { 
			const durationInSeconds = video.duration;
			// 在这里你可以使用durationInSeconds，可能需要进行格式化
			console.log('视频时长（秒）：', durationInSeconds);
			resolve(durationInSeconds);
		};
		video.src = URL.createObjectURL(file);
		video.onerror = function(e) {
			console.log(e);
			console.error('无法加载视频文件。');
		};
		setTimeout(function(){
			resolve(1);
		},2000);
	});
};
$uploader.get_md5 =  function (file) {
	return new Promise((resolve, reject) => {
		var chunkSize = 64 * 1024; // 64 KB
		var spark = new SparkMD5.ArrayBuffer();
		var fileReader = new FileReader();

		let cursor = 0; // 文件读取位置

		fileReader.onload = function(e) {
		  spark.append(e.target.result); // 累加文件内容到spark
		  processFile(); // 继续处理文件
		};

		fileReader.onerror = function() {
		  console.error('文件读取错误');
		};

		function processFile() {
		  var fileSlice = file.slice(cursor, cursor + chunkSize);
		  fileReader.readAsArrayBuffer(fileSlice);
		  cursor += chunkSize;
		  if (cursor >= file.size) {
			var md5Hash = spark.end(); // 文件读取完毕，得到MD5
			resolve(md5Hash);
		  }
		}
		processFile(); 
	});
};

$uploader.fileToBuffer = function (file) {
	var media_type = 'application/octet-stream';
	var media_types = [
		'application/octet-stream',
		'text/txt','text/csv','text/css','text/html','text/js',
		'application/zip','application/pdf','application/doc',
		'image/png','image/jpeg','image/jpg','image/gif',
		'audio/kgm','audio/mp3','audio/wav'
		
	];
	if (file.name.indexOf('.html')>-1) {
		media_type = 'text/html';
	}
	if (file.name.indexOf('.js')>-1) {
		media_type = 'text/js';
	}
	return new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.addEventListener("load", function (e) {
			  var data = new Uint8Array(e.target.result);
			  reader = null;
			  resolve({ name:file.name,size:file.size,data: data, mime: media_type,suffix:file.name.substr(file.name.lastIndexOf('.')).toLowerCase()});
		});
		reader.readAsArrayBuffer(file);
	});
};
$uploader.getProtocol = function(){
	return window.location.protocol.indexOf('https')>-1?'https:':'http:';
}
$uploader.isExistFile = async function (file_url) {
	return new Promise((resolve, reject) => {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState === XMLHttpRequest.DONE) {
				var status = request.status;
				if (status === 200) {
					console.log('200');
					resolve(true);
				} else if (status === 404) {
					resolve(false);
					console.log('404');
				} else {
					resolve(false);
					console.log('other');
				}
			}
		};
		request.open('HEAD', file_url, true);
		request.send();
	});
};
$uploader.uploadFile = async function (obj) {//obj.mine,obj.data,obj.filename
	var http_get=function(req){return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest();xhr.ontimeout=function(e){resolve('');xhr.abort();};xhr.onerror=function(e){resolve('');};xhr.open("GET",req.url,true);xhr.onreadystatechange=function(){if(xhr.readyState==4){resolve(xhr.responseText);}};xhr.timeout=1500;xhr.send();});};
	var mime = obj.mime ? obj.mime : "image/png";
	var file_data = obj.data;
	var oss_text = await http_get({url:$uploader.getProtocol() +"//www.xiexinbao.com/oss_hz/params?mime=" +mime +"&filename=" +(obj.filename || "")});
	if (oss_text.indexOf('{')==-1) {
		oss_text = await http_get({url:$uploader.getProtocol() +"//www.xiexinbao.com/oss_hz/params?mime=" +mime +"&filename=" +(obj.filename || "")});
	}
	if (oss_text.indexOf('{')==-1) {
		alert('图片上传失败！')
		return;
	}	
	var oss = JSON.parse(oss_text);
	
	//先判断是否存在，存在就不上传了
	var file_url = $uploader.getProtocol() + '//' +oss.host + "/" +oss.filename;
	
	async function oss_http_put(){
		return new Promise((resolve, reject) => {
			var loadstart_flag = false;
			try {
				const request = new XMLHttpRequest();
				request.upload.onloadstart = function(){
					loadstart_flag = true;
					//超过1s，就得重新干一遍
					console.log('Upload started');
				};
				request.upload.onprogress = function(evt){
					if (evt.lengthComputable) {
						if(document.querySelector("#progress_status")) {
							document.querySelector("#progress_status").innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
						}
					}
				}
				request.onload = function(){
					console.log('Upload completed');
					resolve(file_url);
				};
				request.ontimeout = function (e) {
					resolve("");
				};
				request.onerror = function (e) {
					resolve("");
				};
				request.open("PUT",file_url);
				request.setRequestHeader("authorization", oss.authorization);
				request.setRequestHeader("Content-Type", oss.mime); 
				request.setRequestHeader("x-oss-date", oss.date); 
				request.timeout = 30 * 60 * 1000;
				request.send(file_data);
				
				setTimeout(function(){
					if(loadstart_flag==false){
						resolve('unloadstart');
						request.abort();
					}
				},1000);
			} catch (e) {
				resolve("");
			}
		});
	}
	
	var result = await oss_http_put();
	if(result=='unloadstart') {
		result = await oss_http_put();
	}
	if(result=='unloadstart') {
		result = '';
	}
	return result;
}