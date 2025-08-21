import { saveStorage, kanbanData } from './localStorage.js';

//  Fonction principale pour activer le Drag & Drop
export function initDragAndDrop() {
  let draggedEl = null; //  Variable qui garde l'élément qu'on est en train de glisser

  //  Quand on commence à glisser une liste ou une tâche-----------------------------------------------
  document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('liste') || e.target.classList.contains('tache')) {// verifie si cest une liste ou une tache
      draggedEl = e.target; //  mémorise l’élément glissé
      e.dataTransfer.effectAllowed = 'move'; // Indique qu'on veut le déplacer
      e.dataTransfer.setData('text/plain', ''); // Nécessaire pour activer le glissement dans le navigateur
      draggedEl.classList.add('en-train-de-glisser'); 
    }
  });


  // Quand on lâche l’élément glissé-------------------------------------------------------------------
  document.addEventListener('dragend', () => {
    if (draggedEl) {
      draggedEl.classList.remove('en-train-de-glisser'); // Retire leffet du glissement 
      draggedEl = null; // Réinitialise la variable
      saveStorage(); // Sauvegarde les données actueldans le localStorage
    }
  });


  // drop des listes dasn le tableau---------------------------------------------------------------------
  const board = document.getElementById('tableau-trello');

  // Autorise le drop sur le tableau pour les listes
  board.addEventListener('dragover', (e) => {
    if (draggedEl && draggedEl.classList.contains('liste')) {
      e.preventDefault(); // Nécessaire pour autoriser le drop a l'endroit indiqué
      e.dataTransfer.dropEffect = 'move';
    }
  });

  // Gère le drop d'une liste dans la liste
  board.addEventListener('drop', (e) => {
    if (!(draggedEl && draggedEl.classList.contains('liste'))) return;//  si cest nest pas une liste qu'on on deplace, on sort de suite 

    e.preventDefault(); 

    
    const targetList = e.target.closest('.liste');//  Trouve l'élément liste sous la souris 

    if (targetList && targetList !== draggedEl) {// trouve la colonne et evite de reinserer au meme endroit 
      
      const rect = targetList.getBoundingClientRect();// methode pour manipuler le positionement et les dimentions d'un element (e)
      const isAfter = e.clientX > rect.left + rect.width / 2;// rect = rectangle , si la sourire est plus grandeque  gauche plus la moitié 

      //  Insère avant ou après selon la position
      const refNode = isAfter ? targetList.nextElementSibling : targetList;// choix du neud juste apre ou la cible elle meme
      board.insertBefore(draggedEl, refNode);//  insere la lise  avant refNode
    } else {
      // Si on lâche ailleurs dans le tableau → on ajoute à la fin
      board.appendChild(draggedEl);
    }


  });

  //  DROP DES TÂCHES DANS LES COLONNES

  // Autorise le drop dans les colonnes de tâches
  document.addEventListener('dragover', (e) => {
    if (e.target.classList.contains('taches')) {
      e.preventDefault(); // Nécessaire pour autoriser le drop
    }
  });

  // Gère le drop  , lacher la tache sur le liste choisi
  document.addEventListener('drop', (e) => {
    if (draggedEl && draggedEl.classList.contains('tache') &&
        e.target.classList.contains('taches')) {// confirme quon deplace une tache et que cest en endroit valide 
      e.preventDefault(); // Autorise le drop
      e.target.appendChild(draggedEl); // deplace la tâche dans la nouvelle colonne
    }
  });
}
