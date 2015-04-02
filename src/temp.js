
function r_() {
  (r_.img = new Image()).src = "/cgi-bin/report_cgi?sid=_pAn5fxvYQ_TTFED&r_type=1000009";
}
var f_ = false,
  u_ = navigator.userAgent.toLowerCase();
try {
  if (external.twGetRunPath().toLowerCase().indexOf("360se") > -1) { f_ = true }
} catch (e) { }
if (u_.indexOf("360chrome") > -1 || u_.indexOf("360se") > -1) { 
  f_ = true; }
f_ ? r_() : !','.split(/,/).length && document.write('<img src="res://360se.exe/2/2025" style="display:none;" onload="r_();"/>');

(function () {
  var a = navigator.mimeTypes;
  $(window).bind('load', function () {
    var soLinks = $('#matterc').find('a:[href*="www.so.com"]');
    soLinks.each(function (i, n) {
      var txtNode = document.createTextNode($(n).text());
      $(n).after(txtNode).remove();
    });
  });
})();