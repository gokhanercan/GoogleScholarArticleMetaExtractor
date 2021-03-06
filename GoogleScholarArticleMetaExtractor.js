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
  
  //cites
  var citesX = article.find("div[class='gs_fl'] a");
  var rawCites = citesX[2].innerText;
  var cites = rawCites.replace("Cited by","");
  console.log("cites: " + cites);
  
  var authorX = article.find("div[class='gs_a']");
  var author = authorX.text();
  var secIndex = author.nthIndexOf(" ",2);  //ikinci bo�luk 2. yazar i�in.
  var firstAuthor = author.substring(0,secIndex).replace(",","");
  var i = firstAuthor.nthIndexOf(" ",1);
  var firstAuthorLastName = firstAuthor.substring(i).trim();
  firstAuthorLastName = firstAuthorLastName.replace("-","");
  console.log("author: " + firstAuthorLastName);
  
  var year = author.replace( /^\D+/g, '');
  year = parseInt(year);
  
  //year format
  var yearStr = year.toString().substr(2,2);
 
  //final filename
  var filename = firstAuthorLastName.trim() + yearStr.trim() + " - " + title.trim() + " - " + cites.trim() +"c"+".pdf";
  filename = filename.replace(":","-").replace(";","").replace("?","").replace("*","").replace("|","").replace("<","").replace(">","");
  console.log("final filename: " + filename);
  
  //append and copy to clipboard TODO: Bunu otomatik yapamad�m bi t�rl�.
  article.append("<textarea onClick='javascript:copyToClipboard(this.value);' class='article' rows='1' cols='200'>" + filename+"</textarea>");
  var txt = article.parent().find("textarea");
  txt.select();
  document.execCommand('copy');
 
}); 


