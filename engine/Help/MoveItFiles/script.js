function collapse(id) {
	eval("var item = document.getElementById('"+id+"')");
	if(item.style.visibility == "visible") {
		item.style.visibility = "hidden";
		item.style.display = "none";
	}
	else{
		item.style.visibility = "visible";
		item.style.display = "block";
	}
}