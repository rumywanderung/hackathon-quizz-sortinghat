import $ from 'jquery';

fetch('../public/assets/data/questions.json')
  .then((questions) => questions.json())
  .then((data) => {
    // target le body
    const monBody = $('body');

    // pour chaque question créer une div coloré par le css
    data.questions.forEach((question) => {
      monBody.append(`<section id="question${question.id}"></section>`);
    });

    // créer div qui accueillera les questions
    const maQuestion = $('<div id="maQuestion"></div>');
    maQuestion.append(`
      <p id="${data.questions[0].id}">${data.questions[0].question}</p>
      <div>
      </div>
    `);

    data.questions[0].reponses.forEach((reponse) => {
      // console.log(reponse.rep);
      $(maQuestion.children()[1]).append(`
      <p class="response">${reponse.rep}</p>
      `);
    });

    // ajouter la question au body
    monBody.append(maQuestion);

    $('.response').click(function () {
      console.log($(this).parent().parent().children()[0]);
      // $(this.parent().parent().children()[0]).
    });


    // append la premiere question
    // maQuestion.append(`<p>${data.questions[0].question}</p>`);
  });
