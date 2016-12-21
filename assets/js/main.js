/*

*/

(function ($) {
  'use strict';
  var html = document.getElementsByTagName("html")[0];
  if(html.className == "no-js") {
      html.className = html.className.replace("no-js", "js"); // user has JS enabled
  } 
}(jQuery));
