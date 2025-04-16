//
//       ToasterMenu v1.0 by Chris Branch
//
//        http://www.starfishgames.co.uk/
//    email: chris.branch@starfishgames.co.uk
//
// Include this script file in the header to be
// compatible with mozilla/netscape etc.
//
// If you wish to redistribute this file, email me
// also email if you have improvements :)
//

if (navigator.userAgent.toLowerCase().indexOf('msie') == -1)
{
// The following code is for non-IE browsers

function ShowMenu(objname, parentitem) {
 var loop = document.getElementsByTagName("TABLE");
 for (var x=0;x<loop.length;x++) { if (loop.item(x).id == objname) var object = loop.item(x); }
 var parenttable = parentitem.parentNode.parentNode;
 object.style.left = parenttable.offsetLeft+parenttable.offsetWidth-4;
 object.style.top = parentitem.offsetTop+parenttable.offsetTop;
 // deselect items in new menu
 var menuitems = object.childNodes.item(0).childNodes;
 for (var x=0;x<menuitems.length;x++) {
  if (menuitems.item(x).nodeName == "TR") menuitems.item(x).className = ''; }
 HideMenu(objname, parentitem);
}
function ShowMenuBelow(objname, parentitem) {
 var loop = document.getElementsByTagName("TABLE");
 for (var x=0;x<loop.length;x++) { if (loop.item(x).id == objname) var object = loop.item(x); }
 var parenttable = parentitem.parentNode.parentNode.parentNode;
 object.style.left = parenttable.offsetLeft+parentitem.offsetLeft;
 object.style.top = parenttable.offsetTop+parenttable.offsetHeight-3;
 // deselect items in new menu
 var menuitems = object.childNodes.item(0).childNodes;
 for (var x=0;x<menuitems.length;x++) {
  if (menuitems.item(x).nodeName == "TR") menuitems.item(x).className = ''; }
 HideMenu(objname, parentitem);
}
// w3c dom is nice but it's a pain to get id elements
function HideMenu(objname, parentitem) {
 // deselect menu
 var parenttbody = parentitem.parentNode.childNodes;
 for (var x=0;x<parenttbody.length;x++) {
  parenttbody.item(x).className = ''; } // you shouldn't have anything in the table :|
 parentitem.className = 'itemselected';


 var loop = document.getElementsByTagName("TABLE");
 for (var x=0;x<loop.length;x++) { if (loop.item(x).id == objname) var object = loop.item(x); }
 // hide all menus
 var allmenus = document.getElementsByTagName("SPAN").item('menusandbox').childNodes;
 for (var x=0;x<allmenus.length;x++) {
  if (allmenus.item(x).nodeName == "TABLE") allmenus.item(x).style.display = 'none';
 }
 
 // show menus and parents
 object.style.display = 'block';
 var loopspan = document.getElementsByTagName("SPAN");
 var looptable = document.getElementsByTagName("TABLE");
 for (var x=0;x<loopspan.length;x++) { if (loopspan.item(x).id == objname) var menuparent = loopspan.item(x).childNodes.item(0).nodeValue; }
 while (menuparent != "") {
  var realmenu = null;
  for (var x=0;x<looptable.length;x++) { if (looptable.item(x).id == menuparent) var realmenu = looptable.item(x); }
  menuparent = "";
  if (realmenu != null) {
   realmenu.style.display = 'block';
   for (var x=0;x<loopspan.length;x++) { if (loopspan.item(x).id == realmenu.id) menuparent = loopspan.item(x).childNodes.item(0).nodeValue; }
  }
 }
}

function HideAll(objname) {
 var loop = document.getElementsByTagName("TABLE");
 for (var x=0;x<loop.length;x++) { if (loop.item(x).id == objname) var object = loop.item(x); }
 // hide all menus
 var allmenus = document.getElementsByTagName("SPAN").item('menusandbox').childNodes;
 for (var x=0;x<allmenus.length;x++) {
  if (allmenus.item(x).nodeName == "TABLE") allmenus.item(x).style.display = 'none';
 } 

 // show menus and parents
 object.style.display = 'block';

 // deselect menu
 var parenttbody = object.childNodes.item(0).childNodes;
 for (var x=0;x<parenttbody.length;x++) {
  parenttbody.item(x).className = ''; }
}

function HideAllTR(objname) {
 var loop = document.getElementsByTagName("TABLE");
 for (var x=0;x<loop.length;x++) { if (loop.item(x).id == objname) var object = loop.item(x); }
 // hide all menus
 var allmenus = document.getElementsByTagName("SPAN").item('menusandbox').childNodes;
 for (var x=0;x<allmenus.length;x++) {
  if (allmenus.item(x).nodeName == "TABLE") allmenus.item(x).style.display = 'none';
 } 

 // show menus and parents
 object.style.display = 'block';

 // deselect menu
 var parenttbody = object.childNodes.item(0).childNodes;
 for (var x=0;x<parenttbody.length;x++) {
   for (var y=0;y<parenttbody.item(x).childNodes.length;y++) {
    parenttbody.item(x).childNodes.item(y).className = ''; } }
}

}
else
{
// The following code is for internet explorer
// now if only javascript was universal :(

function ShowMenu(objname, parentitem) {
 var object = document.all.item(objname,0);
 var parenttable = parentitem.parentElement.parentElement;
 object.style.left = parenttable.offsetLeft+parenttable.offsetWidth-4;
 object.style.top = parentitem.offsetTop+parenttable.offsetTop-2;
 // deselect items in new menu
 var menuitems = object.children[1].children;
 for (var x=0;x<menuitems.length;x++) {
  if (menuitems[x].tagName == "TR") menuitems[x].className = ''; }
 HideMenu(objname, parentitem);
}
function ShowMenuBelow(objname, parentitem) {
 var object = document.all.item(objname,0);
 var parenttable = parentitem.parentElement.parentElement.parentElement;
 object.style.left = parenttable.offsetLeft+parentitem.offsetLeft-2;
 object.style.top = parenttable.offsetTop+parenttable.offsetHeight-2;
 // deselect items in new menu
 var menuitems = object.children[1].children;
 for (var x=0;x<menuitems.length;x++) {
  if (menuitems[x].tagName == "TR") menuitems[x].className = ''; }
 HideMenu(objname, parentitem);
}
function HideMenu(objname, parentitem) {
 // deselect menu
 var parenttbody = parentitem.parentElement.children;
 for (var x=0;x<parenttbody.length;x++) {
  parenttbody[x].className = ''; } // you shouldn't have anything in the table :|
 parentitem.className = 'itemselected';

 var curmenu = document.all.item(objname,0);
 // hide all menus
 var allmenus = document.all.item('menusandbox',0).children;
 for (var x=0;x<allmenus.length;x++) {
  if (allmenus[x].tagName == "TABLE") allmenus[x].style.display = 'none';
 }
 
 // show menus and parents
 curmenu.style.display = 'block';
 if (document.all.item(objname).length > 1) {			// parent menu?
  var menuparent = document.all.item(objname,1).innerHTML;
  while (menuparent != "") {
   var realmenu = document.all.item(menuparent,0);
   realmenu.style.display = 'block';
   if (document.all.item(menuparent).length > 1) {	// get parent
    menuparent = document.all.item(menuparent,1).innerHTML;
   }
   else { menuparent = ""; }
  }
 }
}

function HideAll(objname) {
 var curmenu = document.all.item(objname,0);
 // hide all menus
 var allmenus = document.all.item('menusandbox',0).children;
 for (var x=0;x<allmenus.length;x++) {
  if (allmenus[x].tagName == "TABLE") allmenus[x].style.display = 'none';
 }
 
 // show menus and parents
 curmenu.style.display = 'block';

 // deselect menu
 var parenttbody = object.children.item(0).children;
 for (var x=0;x<parenttbody.length;x++) {
  parenttbody[x].className = ''; } // you shouldn't have anything in the table :|
}

function HideAllTR(objname) {
 var curmenu = document.all.item(objname,0);
 // hide all menus
 var allmenus = document.all.item('menusandbox',0).children;
 for (var x=0;x<allmenus.length;x++) {
  if (allmenus[x].tagName == "TABLE") allmenus[x].style.display = 'none';
 }
 
 // show menus and parents
 curmenu.style.display = 'block';

 // deselect menu
 var parenttbody = curmenu.children[0].children;
 for (var x=0;x<parenttbody.length;x++) { var subchildren = parenttbody[x].children;
  for (var y=0;y<subchildren.length;y++) {
   subchildren[y].className = ''; } }
}

}

function nav(page) { location.href = page; }