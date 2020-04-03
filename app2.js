const FIN1 = "Prenez contact avec votre médecin généraliste au moindre doute. Cette application n’est pour l’instant pas adaptée aux personnes de moins de 15 ans. En cas d’urgence, appelez le 15.";

const FIN2 = "Votre situation peut relever d’un COVID 19 qu’il faut surveiller. Si de nouveaux symptômes apparaissent, refaites le test ou consultez votre médecin. Nous vous conseillons de rester à votre domicile.";

const FIN3 = "Votre situation peut relever d’un COVID 19. Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile. Appelez le 15 si une gêne respiratoire ou des difficultés importantes pour vous alimenter ou boire apparaissent pendant plus de 24 heures.";

const FIN4 = "Votre situation peut relever d’un COVID 19. Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile. Si vous n’arrivez pas à obtenir de consultation, appelez le 15.";

const FIN5 = "Appelez le 15.";

const FIN6 = "Votre situation peut relever d’un COVID 19. Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile (SOS médecins, etc.)";

const FIN7 = "Votre situation peut relever d’un COVID 19. Un avis médical est recommandé. Au moindre doute, appelez le 15. Nous vous conseillons de rester à votre domicile.";

const FIN8 = "Votre situation ne relève probablement pas du COVID 19. N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation. Pour toute information concernant le COVID 19, composer le 0 800 130 000.";

const refaireTest = "<br/><a href='index.html'>Refaire le test</a>"

const questionnaire = document.querySelector('.questionnaireCovid');

function printResult(fin){
    const result = document.querySelector('.result');
    result.innerHTML = fin+refaireTest;
}

questionnaire.addEventListener('submit',(e)=>{
    e.preventDefault();

    let facteurGraviteMineur = 0;
    let facteurPronostiqueDefavorable = 0;

    /* combien de facteurs pronostiques défavorables liés au terrain ? */
    if(parseInt(questionnaire.elements.age.value)>70) facteurPronostiqueDefavorable++;
    if(parseInt(questionnaire.elements.poids.value)/(parseInt(questionnaire.elements.taille.value)^2)>30) facteurPronostiqueDefavorable++;
    if(questionnaire.elements.hypertension.value==="oui") facteurPronostiqueDefavorable++;
    if(questionnaire.elements.diabetique.value==="oui") facteurPronostiqueDefavorable++;
    if(questionnaire.elements.cancer.value==="oui") facteurPronostiqueDefavorable++;
    if(questionnaire.elements.maladieRespiratoire.value==="oui") facteurPronostiqueDefavorable++;
    if(questionnaire.elements.insuffisanceRenale.value==="oui") facteurPronostiqueDefavorable++;
    if(questionnaire.elements.foie.value==="oui") facteurPronostiqueDefavorable++;
    if(questionnaire.elements.enceinte.value==="oui") facteurPronostiqueDefavorable++;
    if(questionnaire.elements.defensesImmunitaires.value==="oui") facteurPronostiqueDefavorable++;
    if(questionnaire.elements.traitementImmunosupresseur.value==="oui") facteurPronostiqueDefavorable++;

    /* combien de facteurs de gravité mineurs ? */
    if(parseInt(questionnaire.elements.temperature.value)<35.5) facteurGraviteMineur++;
    if(parseInt(questionnaire.elements.temperature.value)>39) facteurGraviteMineur++;
    if(questionnaire.elements.fievre.value==="oui" && questionnaire.elements.temperature.value==="") facteurGraviteMineur++;
    if(questionnaire.elements.siFatigue.value==="oui") facteurGraviteMineur++;

    


    console.log("facteur prono defav : " + facteurPronostiqueDefavorable)
    console.log("facteur gravite mineure : " + facteurGraviteMineur)

    // SI moins de 15 ans => FIN1
    if(parseInt(questionnaire.elements.age.value)<15){
        printResult(FIN1)
    }
    // SI >= 1 facteurs de gravité majeurs => FIN5 
    else if(questionnaire.elements.manqueSouffle.value==="oui" || questionnaire.elements.boireManger.value === "oui") {
        printResult(FIN5);
    } 
    // SI fièvre ET toux
    else if(questionnaire.elements.fievre.value==="oui" && questionnaire.elements.toux.value==="oui"){
        // SI 0 facteur pronostique
        if(facteurPronostiqueDefavorable===0) printResult(FIN6);

        // SI >= 1 facteurs pronostiques
        if(facteurPronostiqueDefavorable>=1){

            // SI < 2 facteur de gravité mineur
            if(facteurGraviteMineur<2) printResult(FIN6);

            // SI >= 2 facteurs de gravité mineurs
            if(facteurGraviteMineur>=2) printResult(FIN4);
        }
    }
    // SI fièvre OU (pas de fièvre et (diarrhée OU (toux ET douleurs) OU (toux ET anosmie))
    else if(questionnaire.elements.fievre.value==="oui" || ( questionnaire.elements.fievre.value==="non" && (questionnaire.elements.diarrhee.value==="oui" || (questionnaire.elements.toux.value==="oui" && questionnaire.elements.courbaturesEtc.value==="oui")) || (questionnaire.elements.toux.value==="oui" && questionnaire.elements.odoratGout.value==="oui") ) ){

        // SI 0 facteur pronostique
        if(facteurPronostiqueDefavorable===0){
            // SI 0 facteur de gravité mineur
            if(facteurGraviteMineur===0){
                // SI moins de 50 ans
                if(parseInt(questionnaire.elements.age.value)<50){
                    printResult(FIN2);
                } 
                // SINON 
                else {
                    printResult(FIN3);
                }
            } 
            // SI >= 1 facteur de gravité mineur => FIN3
            else if (facteurGraviteMineur>=1) printResult(FIN3);
        }
        // SI >= 1 facteurs pronostiques
        else if(facteurPronostiqueDefavorable>=1){
            // SI < 2 facteur de gravité mineur => FIN3
            if(facteurGraviteMineur<2) printResult(FIN3)
            // SI >= 2 facteurs de gravité mineurs => FIN4
            if(facteurGraviteMineur>=2) printResult(FIN4);
        }
    }
    // SI toux OU douleurs OU anosmie
    else if(questionnaire.elements.toux.value==="oui" || questionnaire.elements.courbaturesEtc.value==="oui" || questionnaire.elements.odoratGout.value==="oui"){
        // SI 0 facteur pronostique => FIN2
        if(facteurPronostiqueDefavorable===0) printResult(FIN2);
        // SI >= 1 facteur pronostique => FIN7
        if(facteurPronostiqueDefavorable>=1) printResult(FIN7);
    }
    // SI NI toux NI douleurs NI anosmie => FIN8
    else if(questionnaire.elements.toux.value==="non" && questionnaire.elements.courbaturesEtc.value==="non" || questionnaire.elements.odoratGout.value==="non"){
        printResult(FIN8);
    }

    questionnaire.style.display = "none";
    document.querySelector('.result').style.display = "block";

})