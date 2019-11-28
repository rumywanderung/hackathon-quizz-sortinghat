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

    let aAJouterGame = 0;
    let aAjouterWad = 0;
    let aAjouterWeb = 0;

    const lesReponses = [];
    const infoReponses = [];


    // passer d'une question à l'autre
    // ///////////////////////////////

    // test
    let x = 0;

    $('#soumettre').click(() => {
      // si page d'acceuil
      if ($('#soumettre').text() === 'Allons-y !') {
        // changer texte du bouton
        $('#soumettre').text('suivant');
        // sinon incrémenter le prochain id
      } else {
        prochainId += 1;
      }

      // test
      if (x < data.questions.length) {
        // changer de fond de façon smooth
        $('html,body').animate({
          scrollTop: $(`#question${prochainId}`).offset().top,
        }, 1000);

        // aller à la question (suivante)
        // afficher la question
        $('#affichage p').text(data.questions[prochainId].question);

        // et ses réponses
        $('#lesReponses').empty();

        console.log(game, wad, web);


        for (let i = 0; i < data.questions[prochainId].reponses.length; i++) {
          const reponse = data.questions[prochainId].reponses[i];
          const uneReponse = $(`<button id='${prochainId}'></button>`);
          uneReponse.click(function () {
            console.log(this.id);
            aAJouterGame = reponse.game;
            aAjouterWad = reponse.wad;
            aAjouterWeb = reponse.web;
            console.log(aAJouterGame, aAjouterWad, aAjouterWeb);

            // console.log(data.questions[prochainId].question, reponse.rep);

            infoReponses[i] = [data.questions[prochainId].question, reponse.rep];
          });


          uneReponse.text(reponse.rep);
          $('#lesReponses').append(uneReponse);
        }
        x++;
      }
      game += aAJouterGame;
      wad += aAjouterWad;
      web += aAjouterWeb;
      console.log(game, wad, web);

      lesReponses.push(infoReponses);
      console.log(lesReponses);
    });
  });
