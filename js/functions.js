function toggle(id){
	if(event.target.id.localeCompare(id)==0 || event.target.tagName.localeCompare('H1') == 0){
		var x = '#inner'+id.split('-')[1]+'.collapse';
		$(x).collapse('toggle');
	}
};

$(document).ready(function(){
	var x = document.getElementsByClassName("checkmark");
	for(var i = 0; i < x.length; i++){
		x[i].classList+=" check-"+i;
		x[i].classList.add("check-"+i);
		//alert(x[i].classList);
		x[i].addEventListener("click", function (e) {
			var lst = event.target.classList;
			var num=-1;
			for(var j=0;j<lst.length;j++){
				//alert(lst[j]);
				if(lst[j].search('check-')==0){
					//number of the currently clicked checkmark
					num=Number(lst[j].split('-')[1]);
				}
			}
			var cook = getCookie();//number of the last checkmark clicked
			//alert(cook + "    " + num);
			if(cook == num-1){//moving forwards
				var target = e.target;
				target.classList.toggle("not-clicked");
				target.classList.toggle("is-clicked");
				generateCookie(num);
			}else if(cook == num){//backtracking
				var target = e.target;
				target.classList.toggle("not-clicked");
				target.classList.toggle("is-clicked");
				generateCookie(num-1);
			}
		}, false);
	}
});

$(document).ready(function(){
	var x = document.getElementsByClassName("checkmark");
	var gist = event.target.classList;
	var count = getCookie();
	for(var i=0;i<=count;i++){
		var y = document.getElementsByClassName("check-"+i)[0];
		y.classList.toggle("not-clicked");
		y.classList.toggle("is-clicked");
	}
});

function generateCookie(checkNum){
	var time = new Date();
	time.setFullYear(time.getFullYear() + 5);
	document.cookie = "progress="+checkNum+"; expires="+time.toUTCString();
}

function getCookie(){
	var cookies = document.cookie.split(';');
	for(var i=0;i<cookies.length;i++){
		while(cookies[i].charAt(0)==" ") cookies[i]=cookies[i].substring(1);
		if(cookies[i].indexOf("progress")==0) return Number(cookies[i].split('=')[1]);
	}
	return -1;
}