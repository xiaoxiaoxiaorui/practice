/**
 * 
 */
function GetId(divid)
{
    return document.getElementById(divid);
}

function CreateXMLHttpRequest()//閸掓稑缂揂jax閸戣姤鏆�
{
	if (window.ActiveXObject)
	{
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else
	{
		xmlHttp = new XMLHttpRequest();
	}
}

function WOW_ShowTip(divid,id,it_mode,character_id) //閺勫墽銇氱仦鐑囨嫹?閸戣姤鏆熼敍灞剧壋韫囧啫濮涢敓?
{
    GetId(divid).style.display=''; //閸忓牐顔曠純顔昏礋閺勫墽銇�
    CreateXMLHttpRequest();
    if(xmlHttp)
    {
        xmlHttp.open('POST','/index.php?m=trans&a=wowdesc',true);
        //xmlHttp.open('POST','ajaxProxy.php',true);
        //xmlHttp.open('GET','proxy.php?id='+rid,false);
        //xmlHttp.open('GET','ajaxProxy.php?id='+rid,false);
        xmlHttp.onreadystatechange=function()//閸氬本顒為弬鐟扮础娑撳娈戦懢宄扮繁鏉╂柨娲栫紒鎾寸亯閻ㄥ嫭妞傞梻鏉戝綖閿�?
        {
            var divH = GetId(divid).offsetHeight;
            var divW = GetId(divid).offsetWidth;
            if(xmlHttp.readyState==4)
            {
                if(xmlHttp.status==200)
                {
                    // alert(xmlHttp.responseText);
                	GetId('showItemDesc').innerHTML = xmlHttp.responseText;
                    //alert(xmlHttp.responseText);
                    // window.status='NOTE閿涙f the Property board exceeds your screen, please using the keys:Up,Down,Left,Right in the keyboard to have a complete view. ';
                }
                else
                {
                    //GetId(divid).innerHTML="ERROR:"+xmlHttp.statusText;
                    ShowTip(divid,id,character_id);
                }
            }
            else
            {
            	GetId('showItemDesc').innerHTML="<div class='my_table'><img src=\"/Public/images/loading.gif\" border=0></div>";
            }
        }
    }
    else
    {
        GetId(divid).innerHTML="Sorry, your internet browser does not support the XMLHttpRequest, please update to IE6 or above!";
    }
    xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
    // xmlHttp.setRequestHeader("If-Modified-Since","0"); // 閸掔娀娅庣紓鎾崇摠
    if(it_mode.length==0) it_mode='original';
    var SendData = 'item_id='+id+'&type=100&it_mode='+it_mode+'&character_id='+character_id;
    xmlHttp.send(SendData);
    // xmlHttp.send(null);
}

function HideTip()//闂呮劘妫岀仦鐑囨嫹?閸戣姤鏆�
{
     GetId("toolTipLayer").style.display = "none";
	 GetId("showItemDesc").innerHTML = "";
}

//tooltip
var ns4 = document.layers;
var ns6 = document.getElementById && !document.all;
var ie4 = document.all;
var toolTipSTYLE="";
function initToolTips()//Tip閸掓繂顬婇崠鏍у毐閿�?
{
  if(ns4||ns6||ie4)
  {
    if(ns4) toolTipSTYLE = document.toolTipLayer;
    else if(ns6) toolTipSTYLE = document.getElementById("toolTipLayer").style;
    else if(ie4) toolTipSTYLE = document.all.toolTipLayer.style;
    if(ns4) document.captureEvents(Event.MOUSEMOVE);
    else
    {
      toolTipSTYLE.visibility = "visible";
      toolTipSTYLE.display = "none";
    }
    document.onmousemove = moveToMouseLoc;
  }
}

function moveToMouseLoc(e)
{
	var ex;
	var ey;
   switch(getOs())
     {
         case 1:ex = event.x;ey = event.y;break;
         case 2:ex = e.pageX;ey =e.pageY;;break;
         case 3:ex = e.pageX;ey =e.pageY;;break;
         case 0:;break;
     }

  // console.log(getOs());
   
  if(ns4||ns6)
  {
    x = e.pageX;
    y = e.pageY; 
  }
  else
  {
 //   x = event.x + document.body.scrollLeft;
  //  y = event.y + document.body.scrollTop;
	 x = ex + document.documentElement.scrollLeft-60 ;
	 y = ey + document.documentElement.scrollTop ;
	 
  }
  
  
  var divH = GetId("toolTipLayer").offsetHeight;
  var divW = GetId("toolTipLayer").offsetWidth;
  var winH = document.body.clientHeight;
  var winW = document.body.clientWidth;
  
  offsetX = 10;
  offsetY = 15;
  
  var scrollTop = document.body.scrollTop;
  
  offsetX = (x+divW > winW) ? (winW-ex-divW-3) : (10);
  offsetY = (y-scrollTop+divH > winH) ? (winH-ey+scrollTop-divH-3) : (15);

  //if (event.y + divH >= winH && event.x + divW > winW){offsetX = winW - (event.x+divW+3);offsetY = 10}
  toolTipSTYLE.left = x + offsetX+ 'px';
  toolTipSTYLE.top = y + offsetY+ 'px';
  //window.status = "divW:"+divW +" divH:"+ divH +" winW: "+winW + " winH: "+winH +" mouseX:"+event.x +" mouseY:"+event.y+" offsetX:"+offsetX+" offsetY:"+offsetY
  //if (jQuery.browser.msie && $.browser.version == '8.0') {
        //alert(e.clientX + ':' + e.clientY);
   //     toolTipSTYLE.left = window.event.clientX + document.documentElement.scrollLeft;
  //      toolTipSTYLE.top = window.event.clientY + document.documentElement.scrollTop;
        //toolTipSTYLE.left = document.documentElement.clientWidth / 2 + document.documentElement.scrollLeft + document.body.scrollLeft;
        //toolTipSTYLE.top = document.documentElement.clientHeight / 2 + document.documentElement.scrollTop + document.body.scrollTop;
   // }
  return true;
}


function getOs()
{
     if(navigator.userAgent.indexOf("MSIE")>0)return 1;
     if(isFirefox=navigator.userAgent.indexOf("Firefox")>0)return 2;
     if(isSafari=navigator.userAgent.indexOf("Safari")>0)return 3;
     if(isCamino=navigator.userAgent.indexOf("Camino")>0)return 4;
     if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0)return 5;
     return 0;
}