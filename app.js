const $results = $('#results');
const $searchInput = $('#textSearch');

const createGif = (response) => {
  let numberOfResults = response.data.length;
  if (numberOfResults) {
    let randomImg = Math.floor(Math.random() * numberOfResults);
    let $newColumn = $('<div>', { class: 'col-4' });
    let $newGif = $('<img>', {
      src: response.data[randomImg].images.original.url,
      class: 'w-100',
    });
    $newColumn.append($newGif);
    $results.append($newColumn);
  }
};

$('form').on('submit', async function (event) {
  event.preventDefault();
  let searchWord = $searchInput.val();
  $searchInput.val('');
  const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
    params: {
      q: searchWord,
      api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym',
    },
  });
  createGif(response.data);
});

$('#deleteBtn').on('click', function () {
  $results.empty();
});
