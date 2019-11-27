import $ from 'jquery';

fetch('../public/assets/data/questions.json')
  .then((questions) => questions.json())
  .then((data) => {
    // target le body
    const monBody = $('body');
    // créer div qui accueillera les questions
    // const maQuestion = $('<div id="maQuestion"></div>');
    const maQuestion = $(`
    <div id="maQuestion">
      <p></p>
      <div>
        ${data.questions.reponse}
      </div>
    </div>`);
    console.log(data.questions);
    monBody.append(maQuestion);

    // pour chaque question créer une div
    data.questions.forEach((question) => {
      monBody.append(`<section id="question${question.id}"></section>`);
    });

    // append la premiere question
    // maQuestion.append(`<p>${data.questions[0].question}</p>`);
  });
