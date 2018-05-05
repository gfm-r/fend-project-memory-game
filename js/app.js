/*
 * Create a list that holds all of your cards
 */
let corent = null,
  nextCorent = null;
let diamond = 0,
  paper = 0,
  anchor = 0,
  bolt = 0,
  cube = 0,
  leaf = 0,
  bicycle = 0,
  bomb = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}




let get_Shuffle = shuffle(Array.from(document.querySelectorAll(".card")));

function refresh_Page(arr) {
  let x = document.querySelector(".deck");
  x.textContent = "";
  for (var i = 0; i < arr.length; i++)
    x.appendChild(arr[i]);
}

function check(env) {
  if (corent === null) {
    corent = env.target.firstElementChild;
    corent.parentElement.classList.add('open', 'show');
  } else if (nextCorent === null) {
    nextCorent = env.target.firstElementChild;
    if (corent.className === nextCorent.className) {
      nextCorent.parentElement.classList.add('match');
      corent.parentElement.classList.add('match');
      corent = null; //
      nextCorent = null; //
    } else {
      nextCorent.parentElement.classList.add('wrong');
      corent.parentElement.classList.add('wrong');
      setTimeout(function() {
        nextCorent.parentElement.classList.remove('show', 'open', 'wrong');
        corent.parentElement.classList.remove('show', 'open', 'wrong');
        corent = null; //
        nextCorent = null; //
      }, 1000);

    }

  }

}

//* set up the event listener for a card. If a card is clicked:



for (var i = 0; i < get_Shuffle.length; i++) {
  get_Shuffle[i].parentElement.addEventListener('click', check);
}
refresh_Page(get_Shuffle);

// getCards.addEventListener('click', check);


//*  - display the card's symbol (put this functionality in another function that you call from this one)





//*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)






//*  - if the list already has another card, check to see if the two cards match






//*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)







//*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)







//*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)







//*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
