function collapse(id)
{
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

function highlight(id)
{
	document.getElementById('size').className= "about";
	document.getElementById('minconnected').className= "about";
	document.getElementById('movefixed').className= "about";
	document.getElementById('triggeronmoved').className= "about";
	document.getElementById('triggerdeleted').className= "about";
	document.getElementById('origin').className= "about";
	document.getElementById('celldimensions').className= "about";
	document.getElementById('aboutagbo').className= "about";
	
	document.getElementById(id).className= "highlighted";
}