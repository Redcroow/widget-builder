// Récupère les références aux éléments HTML par leur attribut 'id'
const cardContainer = document.getElementById("card-container");
const cardCountElem = document.getElementById("card-count");
const cardTotalElem = document.getElementById("card-total");
const loader = document.getElementById("loader");

// Définit des constantes pour gérer les cartes
const cardLimit = 99;
const cardIncrease = 9;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

// Affiche le nombre total de cartes
cardTotalElem.innerHTML = cardLimit;

// Variable de temporisation pour éviter les appels trop fréquents à une fonction
var throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

// Génère une couleur de fond aléatoire pour les cartes
const getRandomColor = () => {
  const h = Math.floor(Math.random() * 360);

  return `hsl(${h}deg, 90%, 85%)`;
};

// Crée une carte avec un numéro donné
const createCard = (index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = index;
  card.style.backgroundColor = getRandomColor();
  cardContainer.appendChild(card);
};

// Ajoute un groupe de cartes à la page
const addCards = (pageIndex) => {
  currentPage = pageIndex;

  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange =
    currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;

  cardCountElem.innerHTML = endRange;

  for (let i = startRange + 1; i <= endRange; i++) {
    createCard(i);
  }
};

// Gère le chargement infini des cartes lors du défilement
const handleInfiniteScroll = () => {
  throttle(() => {
    const endOfPage =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

    if (endOfPage) {
      addCards(currentPage + 1);
    }

    if (currentPage === pageCount) {
      removeInfiniteScroll();
    }
  }, 1000);
};

// Supprime le chargement infini une fois toutes les pages chargées
const removeInfiniteScroll = () => {
  loader.remove();
  window.removeEventListener("scroll", handleInfiniteScroll);
};

// Charge les cartes initiales lorsque la fenêtre est chargée
window.onload = function () {
  addCards(currentPage);
};

// Ajoute un gestionnaire d'événement de défilement pour le chargement infini
window.addEventListener("scroll", handleInfiniteScroll);
