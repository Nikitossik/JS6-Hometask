let sentences = [
    "You have come very fast",
    "It is only with the heart that one can see rightly",
    "They say, the winter will be cold",
    "One can become a writer only if he is talented"  
],
  russianTranslations = [
    "Ты пришел очень быстро",
    "По-настоящему можно видеть только сердцем",
    "Говорят, зима будет холодной",
    "Писателем может стать только тот, у кого есть талант",
  ],
  rand = Math.floor(Math.random() * sentences.length),
  originalSentence = sentences[rand],
  russianTranslation = russianTranslations[rand],
  originalWords = shuffle(originalSentence.split(' '));

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}

window.onload = function (){
    let russianSentence = document.querySelector('#russian_sentence');
    russianSentence.innerHTML = russianTranslation;

    let validate_banner = document.querySelector('#validate_banner');

    for (var i = 0; i < originalWords.length; i++){
        var block = document.createElement('div');
        block.classList.add('word_field');
        validate_banner.append(block);
    }

    let bottom_banner = document.querySelector('#bottom_banner');

    for (var i = 0; i < originalWords.length; i++){
        var field = document.createElement('div'), item = document.createElement('div');
        field.classList.add('item_field');
        item.classList.add('drag_item');
        item.setAttribute('draggable','true');
        item.id = 'item' + i;
        item.innerHTML = `<span>${originalWords[i]}</span>`;
        field.append(item);
        bottom_banner.append(field);
    }

    let drag_items = document.querySelectorAll('#bottom_banner .drag_item'),
    bottom_fileds = document.querySelectorAll('#bottom_banner .item_field'),
    top_fields = document.querySelectorAll('#top_banner .word_field');

    for (var i = 0; i < originalWords.length; i++){
        drag_items[i].addEventListener('dragstart', drag);
        bottom_fileds[i].addEventListener('dragover', allowDrop);
        bottom_fileds[i].addEventListener('drop', drop);
        top_fields[i].addEventListener('dragover', allowDrop);
        top_fields[i].addEventListener('drop', drop);
        top_fields[i].addEventListener('dragenter', dragEnter);
        top_fields[i].addEventListener('dragleave', dragLeave);
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
    let data = event.dataTransfer.getData("text");  
    if (event.target.innerHTML == ''){
        event.target.style.border = '3px solid #FF7777';
        event.target.appendChild(document.getElementById(data)); 
    }
    else {
        alert('Занято!');
    } 
    check();
}

function dragEnter(event){
    if (event.target.classList.contains('word_field')) event.target.style.border = '3px dashed #FF7777';
}

function dragLeave(event){
    if (event.target.classList.contains('word_field')) event.target.style.border = 'none';
}

function check(){
    let dragged_words = document.querySelectorAll('#validate_banner .word_field span'),
        resulting_sentence = '';

    if (dragged_words.length != originalWords.length) return;


    for (var i = 0; i < dragged_words.length; i++){
        resulting_sentence += dragged_words[i].innerHTML + ' ';
    }

    if (resulting_sentence.trim() == originalSentence) alert('Answer is correct!');
    else alert('Answer is incorrect!');

}