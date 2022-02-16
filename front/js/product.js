var url = new URL(document.location.href);

var search_params = new URLSearchParams(url.search); 

if(search_params.has('id')) {
  var id = search_params.get('id');
  console.log(id);
} 
