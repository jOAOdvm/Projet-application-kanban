// .js/listesCartes.js
import { kanbanData, saveStorage } from './localStorage.js';

let boardContainer = null;// Conteneur principal

// Création de l’interface de base-------------------------------------------------------------------
export function initInterface() {
  // Titre
  const title = document.createElement('h1');
  title.textContent = 'Tableau Kanban';
  document.body.appendChild(title);

  // Bouton “Ajouter une liste”
  const btnAddList = document.createElement('button');
  btnAddList.id = 'btn-add-list';
  btnAddList.className = 'bouton-ajouter-liste';
  btnAddList.textContent = ' Ajouter une liste';
  document.body.appendChild(btnAddList);

  // Conteneur des listes
  boardContainer = document.createElement('div');
  boardContainer.id = 'tableau-trello';
  document.body.appendChild(boardContainer);
}

// quand on clique sur  “Ajouter une liste”----------------------------------------------------------
export function connecterListe() {
  const btn = document.getElementById('btn-add-list');
  btn.addEventListener('click', () => {
  
    kanbanData.push({ nomListe: 'Nouvelle liste', taches: [] });// ca ajoute une liste vide dans KanbanData
    const newIndex = kanbanData.length - 1; // -1 pour acceder a lemplacement réel de la nouvelle liste

    createListInDOM(kanbanData[newIndex], newIndex);// On crée la liste dans le DOM

    saveStorage();// On sauvegarde dans le navigateur
  });
}

//  Créer une liste interactive dans le DOM--------------------------------------------------------------------------
export function createListInDOM(listeData, listeIndex) {

  const listEl = document.createElement('div');
  listEl.className = 'liste';
  listEl.draggable = true;  // avtive le drag&drop
  listEl.dataset.index = listeIndex;

  //  Titre de la liste (éditable)
  const heading = document.createElement('h2');
  heading.setAttribute('contenteditable', 'true');
  heading.textContent = listeData.nomListe;
  
  heading.addEventListener('blur', () => {// tu ne peux plus y taper tant que tu ne recliques pas dedans
    kanbanData[listeIndex].nomListe = heading.textContent.trim();// trim supprime les espaces blancs tu texte recuperé 

    saveStorage();
  });
  listEl.appendChild(heading);

  //  Bouton supprimer la liste
  const btnDeleteList = document.createElement('button');
  btnDeleteList.className = 'bouton-supprimer-liste';
  btnDeleteList.textContent = '×';
  btnDeleteList.addEventListener('click', () => {
    kanbanData.splice(listeIndex, 1);
    listEl.remove();
    saveStorage();
  });
  listEl.appendChild(btnDeleteList);

  //  Conteneur des cartes
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'taches';
  listEl.appendChild(cardsContainer);

  //  recrée les cartes existantes
  listeData.taches.forEach((texteCarte, carteIndex) => {
    createCardInDOM(cardsContainer, listeIndex, carteIndex, texteCarte);
  });

  //  Bouton “Ajouter une carte”
  const btnAddCard = document.createElement('button');
  btnAddCard.className = 'bouton-ajouter-carte';
  btnAddCard.textContent = ' Ajouter une carte';

  btnAddCard.addEventListener('click', () => {
    kanbanData[listeIndex].taches.push('Nouvelle tâche');
    const newCardIdx = kanbanData[listeIndex].taches.length - 1;
    createCardInDOM(cardsContainer, listeIndex, newCardIdx, 'Nouvelle tâche');
    saveStorage();
  });
  listEl.appendChild(btnAddCard);

  //  On ajoute la liste au tableau
  boardContainer.appendChild(listEl);
}

//  Créer une carte dans une liste dasn le DOM---------------------------------------------------------------------------
export function createCardInDOM(parentContainer, listeIdx, carteIdx, texte) {
  const cardEl = document.createElement('div');
  cardEl.className = 'tache';
  cardEl.draggable = true;
  cardEl.dataset.liste = listeIdx;
  cardEl.dataset.carte = carteIdx;

  // Contenu éditable
  const content = document.createElement('div');
  content.className = 'contenu-carte';
  content.setAttribute('contenteditable', 'true');
  content.textContent = texte;
  content.addEventListener('blur', () => { // tu ne peux plus y taper tant que tu ne recliques pas dedans
    kanbanData[listeIdx].taches[carteIdx] = content.textContent.trim();
    saveStorage();
  });
  cardEl.appendChild(content);

  // Bouton supprimer la carte
  const btnDeleteCard = document.createElement('button');
  btnDeleteCard.className = 'bouton-supprimer-carte';
  btnDeleteCard.textContent = '×';
  btnDeleteCard.addEventListener('click', () => {
    kanbanData[listeIdx].taches.splice(carteIdx, 1);
    cardEl.remove();
    saveStorage();
  });
  cardEl.appendChild(btnDeleteCard);

  parentContainer.appendChild(cardEl);
}


