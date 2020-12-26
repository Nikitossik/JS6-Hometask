let words = ['прокрастинация', 'милитаризация', 'конкатенация'],
    word  = words[Math.floor(Math.random()*words.length)],
    answer = [],
    button = document.querySelector('button.guess'),
    text   = document.querySelector('.text'),
    rem_t  = document.querySelector('.remain'),
    try_t  = document.querySelector('.tries'),
    remain = word.length - 2,
    tries  = word.length - 2;

answer[0] = word[0];
answer[word.length - 1] = word[word.length - 1];

for (var i = 1; i < word.length - 1; i++){
    answer[i] = '_';
}

text.innerHTML = answer.join(' ');
rem_t.innerHTML = 'Букв осталось: ' + remain;
try_t.innerHTML = 'Попыток осталось: ' + tries;


button.addEventListener('click', function(){
    var input = prompt('Введите букву');
    if (tries > 0) tries--;
    for (let i = 1; i < word.length-1; i++) { 
        if (word[i] === input) { 
          answer[i] = input; 
          remain--;
        }
      }
      if (tries == 0) alert('Вы проиграли!!!');
      else if (answer.join('') == word) alert('Вы выиграли!!!');
      text.innerHTML = answer.join(' ');
      rem_t.innerHTML = 'Букв осталось: ' + remain;
      try_t.innerHTML = 'Попыток осталось: ' + tries;
});




