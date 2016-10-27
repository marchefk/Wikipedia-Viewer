let { title, desc, link } = '';

let getInput = () => {
  return $('#input').val(); ;
}

let body = document.body;

let wikiContainer = document.createElement('div');
body.appendChild(wikiContainer);
document.getRootNode(wikiContainer);
let notFound = document.createElement('div');
body.appendChild(notFound);
notFound.style.display = 'none';
notFound.style.textAlign = 'center';

let getResults = () => {
  let value = getInput();
  let url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${value}&callback=?`;

  $.getJSON(url, function(data) {
    if (!data.hasOwnProperty('continue')) {
      notFound.style.display = 'block';
      notFound.innerHTML = 'No results found.';
      wikiContainer.style.display = 'none';
    } else {
      notFound.style.display ='none';
      for (var i = 0; i < data.query.search.length; i++) {
        let pContainer = document.createElement('p');
        let aContainer = document.createElement('a');
        wikiContainer.appendChild(pContainer);
        wikiContainer.appendChild(aContainer);

        var result = {
                  title: data.query.search[i].title,
                  desc: data.query.search[i].snippet
                  };
        link = `https://en.wikipedia.org/wiki/${result.title}`;

        wikiContainer.style.display = 'block';
        pContainer.classList.add('altered');
        pContainer.innerHTML = `<h3>${result.title}</h3>${result.desc}...`;
        aContainer.setAttribute('href', link);
      }
    }
  });
}

$("#search").on("click", () => {
  getResults();
})

$("#input").keyup((event) => {
  if (event.keyCode == 13) {
    getResults();
  }
})
