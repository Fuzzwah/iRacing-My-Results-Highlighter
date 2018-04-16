// ==UserScript==
// @namespace     http://fuzzwahracing.com/my_results_highlighter
// @name          iRacing My Results Highlighter
// @description   Highlights the rows of your entries in the iRacing event results table
// @include       http://members.iracing.com/membersite/member/EventResult.do*
// @version       18.04.17
// @author        fuzzwah
// @copyright     2018+, fuzzwah (https://github.com/fuzzwah)
// @license       MIT; https://raw.githubusercontent.com/xthexder/wide-github/master/LICENSE
// @homepageURL   https://github.com/Fuzzwah/iRacing-My-Results-Highlighter
// ==/UserScript==

// the script overwrites the addExportButton function (which is called at the end of the populateResults function

function addExportButton(parent, ssId, ssNum) {
  // so first we do the things that addExportButton normally does...
	var csv_div=parent.appendChild(element("div",{},{position:"absolute",top:"1px",right:"21px"}));
	var csvimg_link=csv_div.appendChild(element("a",{href:contextpath+"/member/GetEventResultsAsCSV?subsessionid="+ssId+"&simsesnum="+ssNum+"&includeSummary=1",className:"outputcsv_label"},{display:"block",position:"absolute",top:"5px",right:"5px"}));
	imgpreload(imageserver+"/member_images/results/outputcsv.gif",csvimg_link,"outputcsv_label");
  
  // and then we do the things needed to highlight the driver's row in the tables:
  // get our custid from the URL
  var custid = location.search.split('custid=').splice(1).join('').split('&')[0];
  // spin through each row in the table
  var trs = document.getElementsByTagName('tr');
  for (var i = trs.length - 1; i >= 0; i--) {
    var elmRow = trs[i];
    // check if the id of the row contains our custid
    if (elmRow.id.indexOf(""+custid+"") !== -1) {
      // make it yellow!
      elmRow.style.background = "yellow";
    }
  }  
}

// the function below injects our updated addExportButton function into the page
addJS_Node(addExportButton);
function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
  var D = document;
  var scriptNode = D.createElement ('script');
  if (runOnLoad) {
    scriptNode.addEventListener ("load", runOnLoad, false);
  }
  scriptNode.type = "text/javascript";
  if (text) scriptNode.textContent = text;
  if (s_URL) scriptNode.src = s_URL;
  if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';

  var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
  targ.appendChild (scriptNode);
}
