var slides = document.querySelectorAll('.slide'),
    minis  = document.querySelectorAll('.mini'),
    next_b = document.querySelector('#next'),
    prev_b = document.querySelector('#prev'),
    effects_b = document.querySelectorAll('button.effect'),
    slide_index = 1,
    effect = '';

show_slide(slide_index);

function show_slide(n) {
    minis.forEach(element => element.classList.remove('active'));
    slides.forEach((element) => {
        element.classList.remove('active');
        element.className = 'slide';
    });
    
    if (n > slides.length) slide_index = 1;
    else if (n <= 0) slide_index = slides.length;

    slides[slide_index-1].classList.add('active');
    if (effect != '') slides[slide_index-1].classList.add(effect);
    minis[slide_index-1].classList.add('active');
}

function arrow_next(){
    slide_index++;
    show_slide(slide_index);
}

function arrow_prev(){
    slide_index--;
    show_slide(slide_index);
}

function mini_toggle(e) {
    console.log(e.target);
    slide_index = +e.target.id;
    show_slide(slide_index);
}

function get_effect(e){
    effect = e.target.dataset.effect;
    console.log(effect);
}

next_b.addEventListener('click', function () {
    arrow_next();
});

prev_b.addEventListener('click', function () {
    arrow_prev();
});

minis.forEach((element) =>{
    element.addEventListener('click', mini_toggle);
});

effects_b.forEach((element) =>{
    element.addEventListener('click', get_effect);
});

