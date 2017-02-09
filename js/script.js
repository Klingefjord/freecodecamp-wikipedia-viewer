var search = "#searchfield";
var results = "#results";
var wrap = "wrapper";
var url;


$(search).keypress(function(key){
  if (event.which === 13) {
    submitSearch($(search).val());
  }
});

function submitSearch(input) {
  $(wrapper).addClass("override");
  url = "https://en.wikipedia.org//w/api.php?action=query&prop=extracts|info&format=json&exsentences=1&excontinue=1&exlimit=10&exintro=&explaintext=&inprop=url&generator=search&redirects=&gsrsearch=" + input + "&gsrlimit=10&callback=?";
  $(results).empty(); //empty div
  url = (url.slice(0, 102) + input + url.slice(102));
  console.log(url);
  $.getJSON(url, function(data){
    console.log(data);
    updateDocument(data);
  });
}

function updateDocument(data) {

  for (i in data.query.pages) {
      console.log(data.query.pages[i].index);
      $(results).append("<a target ='_blank' href='" + data.query.pages[i].fullurl + "'><div class='result'><h1>" + data.query.pages[i].title + "</h1><p>" + data.query.pages[i].extract + "</p></div></a>");
    }
  }
