var $j = jQuery.noConflict();

$j( function() {
  $j( "#draggable" ).draggable();
} );

fetch('../public/assets/data/questions.json')
  .then((questions) => questions.json())
  .then((data) => {
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

    $j('#soumettre').click(() => {
      // si page d'acceuil
      if ($j('#soumettre').text() === 'Allons-y !') {
        // changer texte du bouton
        $j('#soumettre').text('suivant');
        // sinon incrémenter le prochain id
      } else {
        prochainId += 1;
      }

      // siil y a encore des questions
      if (compteurQuestion < data.questions.length) {
        // aller à la question (suivante)
        // afficher la question
        $j('#affichage p').text(data.questions[prochainId].question);

        // et ses réponses
        $j('#lesReponses').empty();


        // copier les réponses dans un tableau
        const tableauDeReponses = data.questions[prochainId].reponses;

        // melanger les réponses avant de les afficher
        tableauDeReponses.sort(() => (Math.random() - 0.5));

        // pour chaque réponse possible
        for (let i = 0; i < tableauDeReponses.length; i++) {
          const reponse = tableauDeReponses[i];
          // console.log('REPONSE');
          // console.log(reponse);
          // la mettre dans un boutton
          const uneReponse = $j(`<button id='${prochainId}'></button>`);
          // lorsqu'on le click
          // $j(uneReponse).hover(
          //   function() {
          //     $j(this).css('background-color', '#BBDEFB');
          //   }, function() {
          //     $j(this).css('background-color', 'transparent');
          //   }
          // );
          uneReponse.click(function () {
            // stockage de points dans compteurs
            aAJouterGame = reponse.game;
            aAjouterWad = reponse.wad;
            aAjouterWeb = reponse.web;
            aAjouterOther = reponse.other;
            
            // question et reponse choisie sont stockés
            infoReponses = [data.questions[prochainId].question, reponse.rep];

            // on peut clicker sur suivant
            $j('#soumettre').attr('disabled', false);
            console.log('prou');
            $j('button').css('background-color', 'transparent');
            $j(this).css('background-color', '#BBDEFB');
            
          });

          // texte de la reponse
          uneReponse.text(reponse.rep);
          // ajout de la reponse
          $j('#lesReponses').append(uneReponse);
        }

        // incrémentation du compteur de quetsion
        compteurQuestion++;

        // on ne peut pas clicker sur suivant tant qu'on n'a pas séléctionné de réponse
        $j('#soumettre').attr('disabled', true);
      }

      // si c'est la dernière question
      if (compteurQuestion === data.questions.length - 1) {
        const disclaimer = 'DISCLAIMER: Ce quiz n\'est pas une analyse scientifique et sans faille. ';
        if (game > wad && game > web) {
          if (other > 7) {
            $j('#affichage').html(`
            <p>
            Félicitations ! <br /> D'après nos estimations, tu ne serais probablement pas trop à ta place dans une des 3 formations que ce quiz propose. Néanmoins, ton intérêt des métiers de l'informatique ne s'arrête pas ici. \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/se-former">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. <br /><br />${disclaimer}
            </p>
            `);
          } else {
            console.log('GAME');
            $j('#affichage').html(`
            <p>
            Félicitations ! <br />D'après nos estimations, tu te plairais à coup sûr dans une formation de GAME DEVELOPER. En effet ton esprit débordant de créativité, ta passion du storytelling et des expériences ludiques ainsi que ton côté 'débrouillarde' sont des qualités prisées dans l'industrie du jeux vidéo. \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/formation/game-developer">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. <br /><br />${disclaimer}
            </p>
            `);
          }
        } else if (wad > game && wad > web) {
          if (other > 7) {
            $j('#affichage').html(`
            <p>
            Félicitations ! <br />D'après nos estimations, tu ne serais probablement pas trop à ta place dans une des 3 formations que ce quiz propose. Néanmoins, ton intérêt des métiers de l'informatique ne s'arrête pas ici. \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/se-former">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. <br /><br />${disclaimer}
            </p>
            `);
          } else {
            $j('#affichage').html(`
            <p>
            Félicitations !<br />D'après nos estimations, tu te plairais à coup sûr dans une formation de WEB-APPLICATIONS DEVELOPER. En effet ton esprit analytique, ta franchise et ton goût du minimalisme sont des qualités prisées dans ce domaine dit du "back-end". \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/formation/web-application-developer">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. <br /><br />${disclaimer}
            </p>
            `);
          }
        } else if (web > wad && web > game) {
          if (other > 7) {
            $j('#affichage').html(`
            <p>
            Félicitations ! <br />D'après nos estimations, tu ne serais probablement pas trop à ta place dans une des 3 formations que ce quiz propose. Néanmoins, ton intérêt des métiers de l'informatique ne s'arrête pas ici. \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/se-former">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. <br /><br />${disclaimer}
            </p>
            `);
          } else {
            $j('#affichage').html(`
            <p>
            Félicitations ! <br />D'après nos estimations, tu te plairais à coup sûr dans une formation de WEBMASTER. En effet ton esprit curieux, ta prédisposition pour toutes choses design et ton sens inné de l'harmonie sont des qualités prisées dans ce domaine dit du "front-end".\nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/formation/webmaster">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. <br /><br />${disclaimer}
            </p>
            `);
          }
        } else {
          $j('#affichage').html(`
          <p>
          Félicitations ! <br />D'après nos estimations, tu ne serais probablement pas trop à ta place dans une des 3 formations que ce quiz propose. Néanmoins, ton intérêt des métiers de l'informatique ne s'arrête pas ici. \nPour plus d'informations, n'hésite pas à consulter <a href="https://www.interface3.be/fr/se-former">ici</a> le descriptif détaillé de la formation, ainsi que ses nombreux débouchés. <br /><br />${disclaimer}
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
