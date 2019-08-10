// ==UserScript==
// @namespace     http://www.fuzzwahracing.com/p/results-highlighter.html
// @name          iRacing My Results Highlighter
// @description   Highlights the rows of your entries in the iRacing event results table
// @include       *://members.iracing.com/membersite/member/EventResult.do*
// @version       1.19.08.10.01
// @author        fuzzwah
// @copyright     2018+, fuzzwah (https://github.com/fuzzwah)
// @license       MIT; https://raw.githubusercontent.com/fuzzwah/iRacing-My-Results-Highlighter/master/LICENSE
// @homepageURL   http://www.fuzzwahracing.com/p/results-highlighter.html
// @updateURL     https://raw.githubusercontent.com/fuzzwah/iRacing-My-Results-Highlighter/master/iRacing-My-Results-Highlighter.user.js
// ==/UserScript==

// the script overwrites the addExportButton function (which is called at the end of the populateResults function
function addExportButton(parent, ssId, ssNum) {
    // so first we do the things that addExportButton normally does...
    var csv_div = parent.appendChild(element("div", {}, {
        position: "absolute",
        top: "1px",
        right: "21px"
    }));
    var csvimg_link = csv_div.appendChild(element("a", {
        href: contextpath + "/member/GetEventResultsAsCSV?subsessionid=" + ssId + "&simsesnum=" + ssNum + "&includeSummary=1",
        className: "outputcsv_label"
    }, {
        display: "block",
        position: "absolute",
        top: "5px",
        right: "5px"
    }));
    imgpreload(imageserver + "/member_images/results/outputcsv.gif", csvimg_link, "outputcsv_label");

    // and then we do the things needed to highlight the driver's row in the tables:
    // this grabs the custid from the URL
    var custid = location.search.split('custid=').splice(1).join('').split('&')[0];

    // you can configure the array below to make the script highlight other drivers too
    // edit the examples below in the format: ["name", "custid", "html_color_code"]
    var drivers = [
        ["", ""+custid+"", "#FFF3B3"],
        ["Driver 1", "driver1_custid_here", "#FFF3B3"],
        ["Driver 2", "driver2_custid_here", "#FFB1CC"],
        ["Driver 3", "driver3_custid_here", "#C1FFAF"],
        ["Driver 4", "driver4_custid_here", "#B2ECFF"],
        ["Driver 5", "driver5_custid_here", "#A05EFF"],
        ["Driver 6", "driver6_custid_here", "#FFB459"],
    ];

    // set up some variables to handle team race results
    var teamRace = false;
    var prevTeam = null;
    // spin through each row in the table
    var trs = document.getElementsByTagName('tr');
    for (var i = 0; i < trs.length; i++) {
        var elmRow = trs[i];
        // if any of these rows have the class "team_parent_row", results are from a team race
        if (elmRow.classList.contains("team_parent_row")) {
            teamRace = true;
            // hold onto the last team we saw
            prevTeam = elmRow;
        }
        // check if the id of the row contains against the custids our drivers
        var index
        for (index = 0; index < drivers.length; ++index) {
            if (elmRow.id.indexOf(drivers[index][1]) !== -1) {
                // set the color
                elmRow.style.background = drivers[index][2];
                // if this was a team race....
                if (teamRace == true) {
                    // also highlight the last team row we saw
                    prevTeam.style.background = drivers[index][2];
                }
            }
        }
    }
}

// the function below injects our updated addExportButton function into the page
addJS_Node(addExportButton);

function addJS_Node(text, s_URL, funcToRun, runOnLoad) {
    var D = document;
    var scriptNode = D.createElement('script');
    if (runOnLoad) {
        scriptNode.addEventListener("load", runOnLoad, false);
    }
    scriptNode.type = "text/javascript";
    if (text) scriptNode.textContent = text;
    if (s_URL) scriptNode.src = s_URL;
    if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
}
