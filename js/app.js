/*
 * Create a list that holds all of your cards
 */
let arr = new Array(null, null);
/*
arr[0]=اول بطاقة يتم الضغط عليها
arr[1]=البطاقة الثانية التي يتم الضغط عليها
*/
Shuffled = null; //shuffle متغير بداخلة المصفوفة الناتجة من
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
//shuffleدالة تستخدم عند اضافة البطائق المعاد ترتيبها من
//DOMلإضافة العناصر الجديدة الى الـ

function refresh_Page() {
  Shuffled = shuffle(Array.from(document.querySelectorAll(".card")));
  arr[0] = null,
    arr[1] = null;
  let x = document.querySelector(".deck");
  x.textContent = "";
  for (let i = 0; i < Shuffled.length; i++) {
    Shuffled[i].className = "card"
    x.appendChild(Shuffled[i]);

  }
}
//دالة التحقق من البطاقة المحددة
function check(env) {
  if (arr[0] === null) {
    arr[0] = env.target.firstElementChild;
    arr[0].parentElement.classList.add('open', 'show');
  } else if (arr[1] === null) {
    arr[1] = env.target.firstElementChild;
    if ((arr[0].className === arr[1].className) & arr[1].className != null) {
      arr[1].parentElement.classList.add('match');
      arr[0].parentElement.classList.add('match');
      arr[0] = null; //
      arr[1] = null; //
    } else if (arr[1].className != null & arr[0].className != null) {
      arr[1].parentElement.classList.add('wrong');
      arr[0].parentElement.classList.add('wrong');
      setTimeout(function() {
        arr[1].parentElement.classList.remove('show', 'open', 'wrong');
        arr[0].parentElement.classList.remove('show', 'open', 'wrong');
        arr[0] = null; //
        arr[1] = null; //
      }, 1000);

    }

  }

}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
refresh_Page();
for (var i = 0; i < Shuffled.length; i++) {
  Shuffled[i].parentElement.addEventListener('click', check);
}
let restart_Button = document.querySelector('.restart');
restart_Button.addEventListener('click', function() {
  refresh_Page();
});
