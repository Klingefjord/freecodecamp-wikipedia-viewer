var search = "#searchfield";
var results = "#results";
var wrap = "#wrapper";
var url;

//event handler for searchfield
$(search).keypress(function(key){
  //if enter is pressed
  if (event.which === 13) {
    submitSearch($(search).val());
  }
});

function submitSearch(input) {
  $(results).empty(); //empty div
  $.getJSON(setUrl(input), function(data){
    updateDocument(data);
  });
}

function setUrl(input) {
  url = "https://en.wikipedia.org//w/api.php?action=query&prop=extracts|info&format=json&exsentences=1&excontinue=1&exlimit=10&exintro=&explaintext=&inprop=url&generator=search&redirects=&gsrsearch=" + input + "&gsrlimit=10&callback=?";
  return url;
}

function updateDocument(data) {
  for (i in data.query.pages) {
      var link = data.query.pages[i].fullurl;
      var title = data.query.pages[i].title;
      var extract = "";
      if (data.query.pages[i].extract) {
        extract = data.query.pages[i].extract;
      }
      $(results).append("<a target ='_blank' href='" + link + "'><div class='result'><h1>" + title + "</h1><p>" + extract + "</p></div></a>");
    }
  }

//2017 Oliver Klingefjord
