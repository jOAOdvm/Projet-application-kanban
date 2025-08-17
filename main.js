
import { initInterface, connecterListe } from './js/listesCartes.js';
import { initDragAndDrop } from './js/dragDrop.js';
import { loadStorage } from './js/localStorage.js';

// On attend que le DOM soit prêt
window.addEventListener('DOMContentLoaded', () => {
  initInterface();      // Crée le titre, le bouton et le conteneur
  connecterListe();     // Attache le clic ( ou enenement) “Ajouter une liste”
  loadStorage();        // Recharge les listes + cartes depuis localStorage
  initDragAndDrop();    // Active le drag & drop sur listes et cartes
});

