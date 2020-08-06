/*
jQueryFlash v1.0 <http://sourceforge.net/projects/jqueryflash/>
Copyright (c) 2009 Daniel Katz
This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
This project descents from SWFObject v2.1 <http://code.google.com/p/swfobject/>
*/

(function($) {

    var SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash";

    function createElement(tag) {
        return $(document.createElement(tag));
    }

    // Cross-browser dynamic SWF creation
    function createSWF(attObj, parObj) {
        var result;

        if ($.browser.msie) { // IE, the object element and W3C DOM methods do not combine: fall back to outerHTML
            var att = "",
                par = "";

            for (var i in attObj) {
                if (attObj[i] != Object.prototype[i]) { // Filter out prototype additions from other potential libraries, like Object.prototype.toJSONString = function() {}
                    if (i.toLowerCase() == "data") {
                        parObj.movie = attObj[i];
                    }
                    else if (i.toLowerCase() != "classid") {
                        att += ' ' + i + '="' + attObj[i] + '"';
                    }
                }
            }

            for (var j in parObj) {
                if (parObj[j] != Object.prototype[j]) { // Filter out prototype additions from other potential libraries
                    par += '<param name="' + j + '" value="' + parObj[j] + '" />';
                }
            }

            result = $('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>');
        }
        else if ($.browser.safari && $.browser.version < 312) { // Older webkit engines ignore the object element's nested param elements: fall back to the proprietary embed element
            var result = createElement("embed").attr("type", FLASH_MIME_TYPE);

            for (var k in attObj) {
                if (attObj[k] != Object.prototype[k]) { // Filter out prototype additions from other potential libraries
                    if (k.toLowerCase() == "data") {
                        result.attr("src", attObj[k]);
                    }
                    else if (k.toLowerCase() != "classid") { // Filter out IE specific attribute
                        result.attr(k, attObj[k]);
                    }
                }
            }

            for (var l in parObj) {
                if (parObj[l] != Object.prototype[l]) { // Filter out prototype additions from other potential libraries
                    if (l.toLowerCase() != "movie") { // Filter out IE specific param element
                        result.attr(l, parObj[l]);
                    }
                }
            }
        }
        else { // Well-behaving browsers
            var result = createElement("object").attr("type", FLASH_MIME_TYPE);

            for (var m in attObj) {
                if (attObj[m] != Object.prototype[m]) { // Filter out prototype additions from other potential libraries
                    if (m.toLowerCase() != "classid") { // Filter out IE specific attribute
                        result.attr(m, attObj[m]);
                    }
                }
            }

            for (var n in parObj) {
                if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // Filter out prototype additions from other potential libraries and IE specific param element
                    result.append(createElement("param").attr("name", n).attr("value", parObj[n]));
                }
            }
        }

        return result;
    }

    $.flash = function(src, options) {
        if (src && options instanceof Object) {
            var att = {},
                par = {};

            att.data = src;

            if (options.paremeters instanceof Object) {
                for (var j in options.paremeters) {
                    if (options.paremeters[j] != Object.prototype[j]) { // Filter out prototype additions from other potential libraries
                        par[j] = options.paremeters[j];
                    }
                }
            }

            if (options.flashvars instanceof Object) {
                for (var k in options.flashvars) {
                    if (options.flashvars[k] != Object.prototype[k]) { // Filter out prototype additions from other potential libraries
                        if (par.flashvars != undefined) {
                            par.flashvars += "&" + k + "=" + options.flashvars[k];
                        }
                        else {
                            par.flashvars = k + "=" + options.flashvars[k];
                        }
                    }
                }
            }

            return createSWF(att, par);
        } else {
            return undefined;
        }
    }

    $.fn.flash = function(src, options) {
        var elem = $.flash(src, options);
        if (elem instanceof $) {
            if (options.width)
                elem.attr("width", options.width);

            if (options.height)
                elem.attr("height", options.height);
            
            if(options.id)
            	elem.attr("id", options.id);

            return this.replaceWith(elem);
        } else {
            return this;
        }
    }

} (jQuery));