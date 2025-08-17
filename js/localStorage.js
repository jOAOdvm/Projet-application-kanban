// .js/localStorage.js

import { createListInDOM } from './listesCartes.js';

// Structure en mémoire
export let kanbanData = [];

// Enregistre dans le navigateur
export function saveStorage() {
  localStorage.setItem('kanbanBoard', JSON.stringify(kanbanData));
}

// Recharge au démarrage
export function loadStorage() {
  const raw = localStorage.getItem('kanbanBoard');
  kanbanData = raw ? JSON.parse(raw) : [];

  // Pour chaque liste, on la recrée
  kanbanData.forEach((liste, index) => {
    createListInDOM(liste, index);
  });
}

