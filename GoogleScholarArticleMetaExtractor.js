//Requires any jquery library dependency.

String.prototype.nthIndexOf = function(pattern, n) {
    var i = -1;
    while (n-- && i++ < this.length) {
        i = this.indexOf(pattern, i);
        if (i < 0) break;
    }
    return i;
}
$.fn.exists = function () {
    return this.length !== 0;
}
function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
$("h3[class='gs_rt'] a").mouseover(function(){
  var a = $(this);
  var title = a.text();
  var article = a.parent().parent();
  
  //check if already processed
  if (article.parent().find("textarea").exists()){
        return;    
  }
  
  var citesX = article.find("div[class='gs_fl'] a").first();
  var cites = citesX.text();
  cites = cites.replace("Cited by","");
  var authorX = article.find("div[class='gs_a']");
  var author = authorX.text();
  var secIndex = author.nthIndexOf(" ",2);  //ikinci boþluk 2. yazar için.
  var firstAuthor = author.substring(0,secIndex).replace(",","");
  var i = firstAuthor.nthIndexOf(" ",1);
  var firstAuthorLastName = firstAuthor.substring(i).trim();
  var year = author.replace( /^\D+/g, '');
  year = parseInt(year);
  //console.log(firstAuthorLastName);
  //console.log(cites);
  //console.log(year);
  var filename = title+"-"+cites+"c-"+firstAuthorLastName+year+".pdf";
  console.log(filename);
  
  //append and copy to clipboard TODO: Bunu otomatik yapamadým bi türlü.
  article.append("<textarea onClick='javascript:copyToClipboard(this.value);' class='article' rows='1' cols='200'>" + filename+"</textarea>");
  var txt = article.parent().find("textarea");
  txt.select();
  //txt.setSelectionRange(0,100);
  //txt[0].select();
  document.execCommand('copy');
  //var copied = txt.innerText.createTextRange();
  //copied.execCommand('Copy');
  //copyToClipboard(filename);
  //window.prompt("Copy to clipboard: Ctrl+C, Enter","gokhan ercan");
}); 

