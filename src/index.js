import $ from 'jquery';

fetch('../public/assets/data/questions.json')
  .then((questions) => questions.json())
  .then((data) => {
    // pour chaque question créer une div colorée par le css
    // /////////////////////////////////////////////////////
    data.questions.forEach((question) => {
      $('body').append(`<section id="question${question.id}"></section>`);
    });


    // compteur pour l'id
    // //////////////////
    let prochainId = 0;


    // récolter données
    // ////////////////
    let game = 0;
    let wad = 0;
    let web = 0;

    const lesReponse = [];


    // passer d'une question à l'autre
    // ///////////////////////////////
    $('#soumettre').click(() => {
      // si page d'acceuil
      if ($('#soumettre').text() === 'Allons-y !') {
        // changer texte du bouton
        $('#soumettre').text('suivant');
        // sinon incrémenter le prochain id
      } else {
        prochainId += 1;
      }

      // changer de fond de façon smooth
      $('html,body').animate({
        scrollTop: $(`#question${prochainId}`).offset().top,
      }, 1000);

      // aller à la question (suivante)
      // afficher la question
      $('#affichage p').text(data.questions[prochainId].question);

      // et ses réponses
      $('#lesReponses').empty();
      (data.questions[prochainId].reponses).forEach((reponse) => {
        $('#lesReponses').append(
          `<div>
            <input type="radio" id="question${data.questions[prochainId].id}" value="" name="">
            <label for="${reponse.rep}">${reponse.rep}</label>
            </div>`,
        );
        console.log(`question #${data.questions[prochainId].id + 1}`);
      });
      console.log(game, wad, web);
      game += data.questions[prochainId].reponses[0].game;
      wad += data.questions[prochainId].reponses[0].wad;
      web += data.questions[prochainId].reponses[0].web;
      // à changer lsq bouron radion sera réparé
      lesReponse.push([(data.questions[prochainId].question), (data.questions[prochainId].reponses[0].rep)]);
      console.log(game, wad, web);
      console.log(lesReponse);
    });
  });
