

$(() => {

  const $resultsWrapper = $('.results');

  const appendPolls = polls => {
    polls.forEach(result => {
      $resultsWrapper.append(pollMarkup(result));
    });
  }

  const pollMarkup = result => `
    <div class="result">
      <p>${result.poll_name}</p>
      <p>${result.food_option}</p>
      <p>${result.ranking}</p>
    </div>
  `;

  $.get('/api/results')
  .done(({ test }) => appendPolls(test))
  .catch(err => alert(err.status));

});
