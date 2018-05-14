let arr = new Array(null, null);
let moves = document.querySelector('.moves');
let deck = document.querySelector(".deck");
let num_Wrong = 0;
let num_Win = 0;
let my_Stars = Array.from(document.querySelectorAll('.fa-star'));
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
//لنقوم بتحويل العناصر الناتجة من نوع Array.fromنستخدم الدالة
//الى مصفوفة Element
function refresh_Page() {
  Shuffled = shuffle(Array.from(document.querySelectorAll(".card")));
  //DOMبعد اعادة ترتيب البطائق نقوم بإضافتها الى الـ
  //فهي ليست موجودة بعد داخل الصفحة
  for (let i = 0; i < Shuffled.length; i++) {
    deck.appendChild(Shuffled[i]);
  }
}

function update_Score(win, wrong) {
  moves.innerText++;
  if (wrong)
    num_Wrong++;
  else if (win)
    num_Win++;
  if (num_Wrong === 2)
    my_Stars[2].className = 'fa fa-star-half-o';
  else if (num_Wrong === 4) {
    my_Stars[2].className = 'fa fa-star-o';
  } else if (num_Wrong === 6)
    my_Stars[1].className = 'fa fa-star-half-o';
  else if (num_Wrong === 8)
    my_Stars[1].className = 'fa fa-star-o';
  if (num_Win === 16) {
    ////////////swal-alert//////////////////////////
    swal({
      title: "Congratulation! You Won!",
      text: "with " + moves.innerText + " Moves and Stars",
      icon: "success",
      button: "Play again!",
    }).then(function() {
      window.location.reload();
    });
    //////////////////////////////////////
  } //for ->  else if (num_Win === 1) {
} //for ->function update_Score(win, wrong) {

//دالة التحقق من البطاقة المختاره
function check(env) {
  if (arr[0] === null && env.target.className === 'card') {
    arr[0] = env.target.firstElementChild;
    arr[0].parentElement.classList.add('open', 'show');
  } else if (arr[1] === null && env.target.className === 'card') {
    arr[1] = env.target.firstElementChild;
    if ((arr[0].className === arr[1].className)) { //حالة تطابق البطائق
      arr[1].parentElement.classList.add('match');
      arr[0].parentElement.classList.add('match');
      update_Score(1, 0);
      arr[0] = null;
      arr[1] = null;
    } else {
      arr[1].parentElement.classList.add('wrong');
      arr[0].parentElement.classList.add('wrong');
      update_Score(0, 1);
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
////////////////////////////////////////////////////////////////////
refresh_Page(); //نقوم بـ خلط الاوراق حالا بعد تحميل الصفحة
// for (var i = 0; i < Shuffled.length; i++) {
//   Shuffled[i].addEventListener('click', check);
// }
deck.addEventListener('click', check);
let restart_Button = document.querySelector('.restart');
restart_Button.addEventListener('click', function() {
  window.location.reload();
});
////////////////////////////////////////////////////////////////////
