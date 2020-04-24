// ==UserScript==
// @namespace     http://www.fuzzwahracing.com/p/results-highlighter.html
// @name          iRacing My Results Highlighter
// @description   Highlights the rows of your, and optionally other selected drivers, in the iRacing event results table
// @include       *://members.iracing.com/membersite/member/EventResult.do*
// @version       2.20.04.25.01
// @author        fuzzwah
// @copyright     2018+, fuzzwah (https://github.com/fuzzwah)
// @license       MIT; https://raw.githubusercontent.com/fuzzwah/iRacing-My-Results-Highlighter/master/LICENSE
// @homepageURL   http://www.fuzzwahracing.com/p/results-highlighter.html
// @updateURL     https://raw.githubusercontent.com/fuzzwah/iRacing-My-Results-Highlighter/master/iRacing-My-Results-Highlighter.user.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require       https://raw.githubusercontent.com/fuzzwah/iRacing-My-Results-Highlighter/master/GM_config.js
// @require       https://raw.githubusercontent.com/fuzzwah/iRacing-My-Results-Highlighter/master/waitForKeyElements.js
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_listValues
// @grant         GM_config
// @grant         GM_registerMenuCommand
// @run-at        document-idle
// ==/UserScript==

/* globals GM_config, GM_configStruct */

waitForKeyElements ("table.event_table", actionHighlight);

function actionHighlight(jNode) {
  'use strict';

    GM_config.init({
        'id': 'iR_Results_Highlighter', // The id used for this instance of GM_config
        'title': 'Drivers to highlight',
        'fields': {
            'driver1_name': {
                'section': [GM_config.create('Driver 1'), ''],
                'label': GM_config.create('Name'),
                'labelPos': 'left',
                'type': 'text',
                'default': 'John Smith'
            },
            'driver1_custid': {
                'label': GM_config.create('CustID'),
                'labelPos': 'left',
                'type': 'int',
                'default': 11111
            },
            'driver1_color': {
                'label': GM_config.create('Color'),
                'labelPos': 'left',
                'type': 'text',
                'default': '#FFF3B3'
            },
            'driver2_name': {
                'section': [GM_config.create('Driver 2'), ''],
                'label': GM_config.create('Name'),
                'labelPos': 'left',
                'type': 'text',
                'default': 'John Smith'
            },
            'driver2_custid': {
                'label': GM_config.create('CustID'),
                'labelPos': 'left',
                'type': 'int',
                'default': 11111
            },
            'driver2_color': {
                'label': GM_config.create('Color'),
                'labelPos': 'left',
                'type': 'text',
                'default': '#FFF3B3'
            },
            'driver3_name': {
                'section': [GM_config.create('Driver 3'), ''],
                'label': GM_config.create('Name'),
                'labelPos': 'left',
                'type': 'text',
                'default': 'John Smith'
            },
            'driver3_custid': {
                'label': GM_config.create('CustID'),
                'labelPos': 'left',
                'type': 'int',
                'default': 11111
            },
            'driver3_color': {
                'label': GM_config.create('Color'),
                'labelPos': 'left',
                'type': 'text',
                'default': '#FFF3B3'
            },
            'driver4_name': {
                'section': [GM_config.create('Driver 4'), ''],
                'label': GM_config.create('Name'),
                'labelPos': 'left',
                'type': 'text',
                'default': 'John Smith'
            },
            'driver4_custid': {
                'label': GM_config.create('CustID'),
                'labelPos': 'left',
                'type': 'int',
                'default': 11111
            },
            'driver4_color': {
                'label': GM_config.create('Color'),
                'labelPos': 'left',
                'type': 'text',
                'default': '#FFF3B3'
            },
            'driver5_name': {
                'section': [GM_config.create('Driver 5'), ''],
                'label': GM_config.create('Name'),
                'labelPos': 'left',
                'type': 'text',
                'default': 'John Smith'
            },
            'driver5_custid': {
                'label': GM_config.create('CustID'),
                'labelPos': 'left',
                'type': 'int',
                'default': 11111
            },
            'driver5_color': {
                'label': GM_config.create('Color'),
                'labelPos': 'left',
                'type': 'text',
                'default': '#FFF3B3'
            },
            'driver6_name': {
                'section': [GM_config.create('Driver 6'), ''],
                'label': GM_config.create('Name'),
                'labelPos': 'left',
                'type': 'text',
                'default': 'John Smith'
            },
            'driver6_custid': {
                'label': GM_config.create('CustID'),
                'labelPos': 'left',
                'type': 'int',
                'default': 11111
            },
            'driver6_color': {
                'label': GM_config.create('Color'),
                'labelPos': 'left',
                'type': 'text',
                'default': '#FFF3B3'
            },
            'driver7_name': {
                'section': [GM_config.create('Driver 7'), ''],
                'label': GM_config.create('Name'),
                'labelPos': 'left',
                'type': 'text',
                'default': 'John Smith'
            },
            'driver7_custid': {
                'label': GM_config.create('CustID'),
                'labelPos': 'left',
                'type': 'int',
                'default': 11111
            },
            'driver7_color': {
                'label': GM_config.create('Color'),
                'labelPos': 'left',
                'type': 'text',
                'default': '#FFF3B3'
            },
            'driver8_name': {
                'section': [GM_config.create('Driver 8'), ''],
                'label': GM_config.create('Name'),
                'labelPos': 'left',
                'type': 'text',
                'default': 'John Smith'
            },
            'driver8_custid': {
                'label': GM_config.create('CustID'),
                'labelPos': 'left',
                'type': 'int',
                'default': 11111
            },
            'driver8_color': {
                'label': GM_config.create('Color'),
                'labelPos': 'left',
                'type': 'text',
                'default': '#FFF3B3'
            },
            'driver9_name': {
                'section': [GM_config.create('Driver 9'), ''],
                'label': GM_config.create('Name'),
                'labelPos': 'left',
                'type': 'text',
                'default': 'John Smith'
            },
            'driver9_custid': {
                'label': GM_config.create('CustID'),
                'labelPos': 'left',
                'type': 'int',
                'default': 11111
            },
            'driver9_color': {
                'label': GM_config.create('Color'),
                'labelPos': 'left',
                'type': 'text',
                'default': '#FFF3B3'
            },
            'driver10_name': {
                'section': [GM_config.create('Driver 10'), ''],
                'label': GM_config.create('Name'),
                'labelPos': 'left',
                'type': 'text',
                'default': 'John Smith'
            },
            'driver10_custid': {
                'label': GM_config.create('CustID'),
                'labelPos': 'left',
                'type': 'int',
                'default': 11111
            },
            'driver10_color': {
                'label': GM_config.create('Color'),
                'labelPos': 'left',
                'type': 'text',
                'default': '#FFF3B3'
            },
        }
    });

    var stored_drivers = GM_config.read();

    GM_registerMenuCommand("Set drivers to highlight", function() { GM_config.open(); });

    // this is a function we use later to change font colors depending on how dark the background color is
    var getContrast = function (hexcolor){

        // If a leading # is provided, remove it
        if (hexcolor.slice(0, 1) === '#') {
            hexcolor = hexcolor.slice(1);
        }

        // If a three-character hexcode, make six-character
        if (hexcolor.length === 3) {
            hexcolor = hexcolor.split('').map(function (hex) {
                return hex + hex;
            }).join('');
        }

        // Convert to RGB value
        var r = parseInt(hexcolor.substr(0,2),16);
        var g = parseInt(hexcolor.substr(2,2),16);
        var b = parseInt(hexcolor.substr(4,2),16);

        // Get YIQ ratio
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        // Check contrast
        return (yiq >= 128) ? '#333' : '#eee';

    };

    // and then we do the things needed to highlight the driver's row in the tables:
    // this grabs the custid from the URL
    var custid = location.search.split('custid=').splice(1).join('').split('&')[0];

    if (custid) {
        // console.log(custid);
    } else {
        custid = 1;
    }

    // you can configure the array below to make the script highlight other drivers too
    // edit the examples below in the format: ["name", "custid", "html_color_code"]
    var drivers = [
        ["", custid, "#FFF3B3"],
    ];

    for (i=1; i<11; i++) {
        drivers.push([stored_drivers["driver" + i + "_name"], stored_drivers["driver" + i + "_custid"].toString(), stored_drivers["driver" + i + "_color"]]);
    }

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
        for (var l = 0; l < drivers.length; ++l) {
            if (elmRow.id.indexOf(drivers[l][1]) !== -1) {
                // set the color
                elmRow.style.background = drivers[l][2];
                for (var j = 0; j < elmRow.cells.length; j++) {
                    elmRow.cells[j].style.color = getContrast(drivers[l][2]);
                    var link = elmRow.cells[j].getElementsByClassName("stats_table_link");
                    if (link.length > 0) {
                        link[0].style.color = getContrast(drivers[l][2]);
                    }
                }

                // if this was a team race....
                if (teamRace == true) {
                    // also highlight the last team row we saw
                    prevTeam.style.background = drivers[l][2];
                    for (var k = 0; k < prevTeam.cells.length; k++) {
                        prevTeam.cells[k].style.color = getContrast(drivers[l][2]);
                    }
                }
            }
        }
    }
};