import $ from 'jquery';

fetch('../public/assets/data/questions.json')
  .then((questions) => questions.json())
  .then((data) => {
    // pour chaque question créer une div colorée par le css
    // /////////////////////////////////////////////////////
    // data.questions.forEach((question) => {
    //   $('body').append(`<section id="question${question.id}"></section>`);
    // });


    // compteur pour l'id
    // //////////////////
    let prochainId = 0;


    // récolter données
    // ////////////////
    let game = 0;
    let wad = 0;
    let web = 0;
    let other = 0;

    let aAJouterGame = 0;
    let aAjouterWad = 0;
    let aAjouterWeb = 0;
    let aAjouterOther = 0;

    const lesReponses = [];
    let infoReponses = 0;


    // passer d'une question à l'autre
    // ///////////////////////////////

    // compteur questions
    let compteurQuestion = 0;

    $('#soumettre').click(() => {
      // si page d'acceuil
      if ($('#soumettre').text() === 'Allons-y !') {
        // changer texte du bouton
        $('#soumettre').text('suivant');
        // sinon incrémenter le prochain id
      } else {
        prochainId += 1;
      }

      // siil y a encore des questions
      if (compteurQuestion < data.questions.length) {
        // aller à la question (suivante)
        // afficher la question
        $('#affichage p').text(data.questions[prochainId].question);

        // et ses réponses
        $('#lesReponses').empty();

        // pour chaque réponse possible
        for (let i = 0; i < data.questions[prochainId].reponses.length; i++) {
          const reponse = data.questions[prochainId].reponses[i];
          // la mettre dans un boutton
          const uneReponse = $(`<button id='${prochainId}'></button>`);
          // lorsqu'on le click
          uneReponse.click(() => {
            // stockage de points dans compteurs
            aAJouterGame = reponse.game;
            aAjouterWad = reponse.wad;
            aAjouterWeb = reponse.web;
            aAjouterOther = reponse.other;

            // question et reponse choisie sont stockés
            infoReponses = [data.questions[prochainId].question, reponse.rep];

            // on peut clicker sur suivant
            $('#soumettre').attr('disabled', false);
          });

          // texte de la reponse
          uneReponse.text(reponse.rep);
          // ajout de la reponse
          $('#lesReponses').append(uneReponse);
        }

        // incrémentation du compteur de quetsion
        compteurQuestion++;

        // on ne peut pas clicker sur suivant tant qu'on n'a pas séléctionné de réponse
        $('#soumettre').attr('disabled', true);
      }

      // si c'est la dernière question
      if (compteurQuestion === data.questions.length - 1) {
        if (game > wad && game > web) {
          if (other > 7) {
            $('#affichage').html(`
            <p>
            Félicitations ! D'après nos estimations, tu ne serais probablement pas trop à ta place dans une des 3 formations que ce quiz propose. Néanmoins, ton intérêt des métiers de l'informatique ne s'arrête pas ici. \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/se-former">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. 
            </p>
            `);
          } else {
            console.log('GAME');
            $('#affichage').html(`
            <p>
            Félicitations ! D'après nos estimations, tu te plairais à coup sûr dans une formation de Game Developer. En effet ton esprit débordant de créativité, ta passion du storytelling et des expériences ludiques ainsi que ton côté 'débrouillarde' sont des qualités prisées dans l'industrie du jeux vidéo. \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/formation/game-developer">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. 
            </p>
            `);
          }
        } else if (wad > game && wad > web) {
          if (other > 7) {
            $('#affichage').html(`
            <p>
            Félicitations ! D'après nos estimations, tu ne serais probablement pas trop à ta place dans une des 3 formations que ce quiz propose. Néanmoins, ton intérêt des métiers de l'informatique ne s'arrête pas ici. \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/se-former">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. 
            </p>
            `);
          } else {
            $('#affichage').html(`
            <p>
            Félicitations ! D'après nos estimations, tu te plairais à coup sûr dans une formation de WEB-APPLICATIONS DEVELOPER. En effet ton esprit analytique, ta franchise et ton goût du minimalisme sont des qualités prisées dans ce domaine dit du "back-end". \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/formation/web-application-developer">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. 
            </p>
            `);
          }
        } else if (web > wad && web > game) {
          if (other > 7) {
            $('#affichage').html(`
            <p>
            Félicitations ! D'après nos estimations, tu ne serais probablement pas trop à ta place dans une des 3 formations que ce quiz propose. Néanmoins, ton intérêt des métiers de l'informatique ne s'arrête pas ici. \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/se-former">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. 
            </p>
            `);
          } else {
            $('#affichage').html(`
            <p>
            Félicitations ! D'après nos estimations, tu te plairais à coup sûr dans une formation de Webmaster. En effet ton esprit curieux, ta prédisposition pour toutes choses design et ton sens inné de l'harmonie sont des qualités prisées dans ce domaine dit du "front-end".\nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/formation/webmaster">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. 
            </p>
            `);
          }
        } else {
          $('#affichage').html(`
          <p>
          Félicitations ! D'après nos estimations, tu ne serais probablement pas trop à ta place dans une des 3 formations que ce quiz propose. Néanmoins, ton intérêt des métiers de l'informatique ne s'arrête pas ici. \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/se-former">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. 
          </p>
          `);
        }
      }
      game += aAJouterGame;
      wad += aAjouterWad;
      web += aAjouterWeb;
      other += aAjouterOther;
      console.log(game, wad, web, other);

      lesReponses.push(infoReponses);
      console.log(lesReponses);
    });
  });
