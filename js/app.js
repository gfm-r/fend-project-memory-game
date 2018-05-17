/*
arr[0]=اول بطاقة يتم الضغط عليها
arr[1]=البطاقة الثانية التي يتم الضغط عليها
*/
let arr = new Array(null, null);
let deck = document.querySelector('.deck');
let my_Timer = document.querySelector('.Timer');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
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
  //shuffle متغير بداخلة المصفوفة الناتجة من
  const Shuffled = shuffle(Array.from(document.querySelectorAll('.card')));
  //DOMبعد اعادة ترتيب البطائق نقوم بإضافتها الى الـ
  //فهي ليست موجودة بعد داخل الصفحة
  for (let i = 0; i < Shuffled.length; i++) {
    deck.appendChild(Shuffled[i]);
  }
}


let moves = document.querySelector('.moves');
let num_Wrong = 0; //عدد المحاولات الخاطئة
let num_Win = 0; //عدد المحاولات الناجحة
let my_Stars = Array.from(document.querySelectorAll('.fa-star'));
/*
دالة تحديث نتيجة اللاعب تستقبل هذه الدالة اما 0 او 1
update_Score(1, 0)عند اختيار كرتين متطابقين نستدعي الدالة
update_Score(0, 1)وعند اختيار كرتين غير متطابقين نستدعي الدالة
*/
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
  if (num_Win === 8) {
    ////////////swal-alert//////////////////////////
    clearInterval(my_time); //إقاف تشغيل العداد
    let stars = 0;
    if (num_Wrong <= 2)
      stars = 3;
    else if (num_Wrong <= 4)
      stars = 2;
    else
      stars = 1;
    swal({
      title: 'Congratulation! You Won!',
      text: 'With ' + moves.innerText + ' Moves and ' + stars + ' Stars' + ' and spent ' + minute + ':' + second + ' playing :)',
      icon: 'success',
      button: 'Play again!',
    }).then(function() {
      window.location.reload();
    });
    //////////////////////////////////////
  } //for ->  else if (num_Win === 1) {
} //for ->function update_Score(win, wrong) {

//دالة التحقق من البطاقة المختاره
/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 */
function check(env) {
  if (arr[0] === null && env.target.className === 'card') {
    arr[0] = env.target.firstElementChild;
    arr[0].parentElement.classList.add('open', 'show', 'animated', 'pulse');
  } else if (arr[1] === null && env.target.className === 'card') {
    arr[1] = env.target.firstElementChild;
    arr[0].parentElement.classList.remove('animated', 'pulse');
    if ((arr[0].className === arr[1].className)) { //حالة تطابق البطائق
      arr[1].parentElement.classList.add('match', 'animated', 'bounceIn');
      arr[0].parentElement.classList.add('match', 'animated', 'bounceIn');
      update_Score(1, 0);
      arr[0] = null;
      arr[1] = null;
    } else {
      arr[1].parentElement.classList.add('wrong', 'animated', 'swing');
      arr[0].parentElement.classList.add('wrong', 'animated', 'swing');
      update_Score(0, 1);
      setTimeout(function() {
        arr[1].parentElement.classList.remove('show', 'open', 'wrong', 'animated', 'swing');
        arr[0].parentElement.classList.remove('show', 'open', 'wrong', 'animated', 'swing');
        arr[0] = null; //
        arr[1] = null; //
      }, 1000);
    }
  }
}
//////////////////////-Timer-///////////////////
let minute = 0;
let second = 0;
//دالة حساب الوقت الذي امضاه الاعب
function Timer() {
  if (second < 60)
    second++;
  else {
    second = 0;
    minute++;
  }
  my_Timer.innerText = minute + ':' + second;
}
//////////////////////////////////////////////////////////////////
refresh_Page(); //نقوم بـ خلط الاوراق حالا بعد تحميل الصفحة
// set up the event listener for a card. If a card is clicked:
deck.addEventListener('click', check);
let restart_Button = document.querySelector('.restart');
restart_Button.addEventListener('click', function() {
  window.location.reload();
});
//حساب وقت اللعب
var my_time = setInterval(function() {
  Timer();
}, 1000);
