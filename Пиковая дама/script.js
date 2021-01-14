let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    playedCards = [],
    number = 0,
    isGame = true,
    realCardsField = document.getElementById("real_cards"),
    playedCardsField = document.getElementById("played_cards"),
    win = document.getElementById("win");

function shuffle(arr) {
  let rand, temp;
  for (let i = 0; i < arr.length; i++) {
    rand = Math.floor(Math.random() * (i + 1));
    temp = arr[rand];
    arr[rand] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

shuffle(cards);

function fly() {
  let card_elements = document.querySelectorAll(".card");

  for (let i = 0; i < card_elements.length; i++) {
    card_elements[i].style.transitionDelay = i * 0.5 + "s";
    card_elements[i].classList.add("rotate");
  }
}

function checkWin(who, card) {
  if (card == "Q") {
    win.innerHTML = who + " win";
    win.classList.add('active');
    isGame = false;
    return true;
  }
  return false;
}

function myMove(data) {
  let b = false;
  let card = data[3];
  if (checkWin("You ", card)) {
    b = true;
    fly();
  } else {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i] == card) number = i;
    }
    setTimeout(removeCard.bind(null, number), 1000);
  }
  return b;
}

function computerMove() {
  isGame = false;
  let b = false;
  number = Math.floor(Math.random() * cards.length);
  if (checkWin("I ", cards[number])) {
    b = true;
    fly();
  } else {
    setTimeout(removeCard.bind(null, number), 1000);
    isGame = true;
  }

  return b;
}

function removeCard(number) {
  playedCards.push(cards[number]);
  cards.splice(number, 1);
  generateCards(playedCards, playedCardsField);
  generateCards(cards, realCardsField);
}

function play(id) {
  if (!isGame) return;
  try {
    if (myMove(id)) return;
    setTimeout(computerMove, 1000);
  } catch (ex) {
    myMove();
  }
}

function newPlay() {
  location.reload();
  return false;
}

function generateCards(cards, field) {
    field.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
      var card = document.createElement('div');
      card.id = 'rc_' + cards[i];
      card.classList.add('card');
      card.addEventListener('dragstart', drag);
      card.setAttribute('draggable', 'true');
      field.appendChild(card);
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id); 
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.append(document.getElementById(data));
  play(data);
}

window.onload = function () {
  playedCardsField.addEventListener('dragover', allowDrop);
  playedCardsField.addEventListener('drop', drop);
  generateCards(cards, realCardsField);
};
