// ==UserScript==
// @namespace     http://www.fuzzwahracing.com/p/results-highlighter.html
// @name          iRacing My Results Highlighter
// @description   Highlights the rows of your, and optionally other selected drivers, in the iRacing event results table
// @include       *://members.iracing.com/membersite/member/EventResult.do*
// @version       2.20.11.12.02
// @author        fuzzwah
// @copyright     2018+, fuzzwah (https://github.com/fuzzwah)
// @license       MIT; https://raw.githubusercontent.com/fuzzwah/iRacing-My-Results-Highlighter/master/LICENSE
// @homepageURL   http://www.fuzzwahracing.com/p/results-highlighter.html
// @updateURL     https://raw.githubusercontent.com/fuzzwah/iRacing-My-Results-Highlighter/master/iRacing-My-Results-Highlighter.user.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
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
                'labelPos': 'above',
                'label': 'Names',
                'type': 'text',
                'default': 'Your Name',
                'class': 'name',
                'size': 30
            },
            'driver1_custid': {
                'labelPos': 'above',
                'label': 'Custids',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver1_color': {
                'labelPos': 'above',
                'label': 'Colors',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver2_name': {
                'section': [GM_config.create('Driver 2'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver2_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver2_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver3_name': {
                'section': [GM_config.create('Driver 3'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver3_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver3_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver4_name': {
                'section': [GM_config.create('Driver 4'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver4_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver4_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver5_name': {
                'section': [GM_config.create('Driver 5'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver5_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver5_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver6_name': {
                'section': [GM_config.create('Driver 6'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver6_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver6_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver7_name': {
                'section': [GM_config.create('Driver 7'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver7_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver7_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver8_name': {
                'section': [GM_config.create('Driver 8'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver8_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver8_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver9_name': {
                'section': [GM_config.create('Driver 9'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver9_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver9_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver10_name': {
                'section': [GM_config.create('Driver 10'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver10_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver10_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver11_name': {
                'section': [GM_config.create('Driver 11'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver11_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver11_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
            'driver12_name': {
                'section': [GM_config.create('Driver 12'), ''],
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'name',
                'size': 30
            },
            'driver12_custid': {
                'labelPos': 'left',
                'type': 'int',
                'default': '',
                'class': 'custid',
                'size': 12
            },
            'driver12_color': {
                'labelPos': 'left',
                'type': 'text',
                'default': '',
                'class': 'color',
                'size': 8
            },
        },
        'css': '.name {float: left; width: 50%; margin-top: 5px;} .custid {float: left; width: 30%; margin-top: 5px;} .color {float: left; width: 20%; margin-top: 5px;}'
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
        var drivers = [
            ["", custid, "#FFF3B3"],
        ];
    } else {
        var drivers = [];
    }

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
            if (drivers[l][1] != 0) {
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
    }
};