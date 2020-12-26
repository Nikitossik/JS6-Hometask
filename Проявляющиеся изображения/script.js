history.scrollRestoration = 'manual';

window.addEventListener('beforeunload', function(){
    window.scrollTo(0,0);
});

var progress = document.querySelector('.progressbar'),
    scene = document.querySelector('.scene'),
    bg = document.querySelector('.background'),
    sun = document.querySelector('.sun'),
    earth = document.querySelector('.earth'),
    moon = document.querySelector('.moon'),
    container = document.querySelector('.container'),
    earth_width = earth.offsetWidth,
    moon_width = moon.offsetWidth;

var sun_arr = getTransform(sun),
    earth_arr = getTransform(earth),
    earth_arr2 = [].concat(earth_arr),
    earth_arr3 = [].concat(earth_arr),
    moon_arr = getTransform(moon),
    moon_arr2 = [].concat(moon_arr),
    moon_arr3 = [].concat(moon_arr),
    moon_arr4 = [].concat(moon_arr);;

window.addEventListener('scroll', function(){
    var scroll = document.body.scrollTop || document.documentElement.scrollTop,
        document_height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    progress.style.width = (scroll / document_height)*100 + '%';

    if (scroll > 0){
        sun.classList.remove('blurred');
        bg.classList.remove('blurred');
        container.classList.add('hidden');
        scale_bg(scroll);
        scale_sun(scroll);
        move_earth(scroll);
        move_moon(scroll);
        transform(scroll);
    }
    else{
        sun.classList.add('blurred');
        bg.classList.add('blurred');
        container.classList.remove('hidden');
    }

});


function scale_bg(scroll){
    var scale = 100 + scroll / 200, offset = -scroll / 400;

    bg.style.width = `${scale}%`;
    bg.style.left = `${offset}%`;
    bg.style.height = `${scale}%`;
    bg.style.top = `${offset}%`;
}

function scale_sun(scroll){
    var scale = 1 + scroll/8000;

    if (scroll <= 2000) {
        sun.style.transform = `matrix(${scale}, 0, 0, ${scale}, 
            ${sun_arr[4]}, ${sun_arr[5]})`;
        sun_arr[0] = scale;
    }
}

function move_earth(scroll){
    var x_off, y_off;
    if (scroll <= 2000) {
        x_off = -earth_width/2 + scroll/5;
        y_off = -earth_width/2 - scroll/15;  
        earth.style.transform = `matrix(1,0,0,1, ${x_off}, ${y_off}`;
        earth.style.zIndex = '3';
        earth_arr[4] = x_off;
        earth_arr[5] = y_off;
    }
    else if(scroll > 2000 && scroll <= 4000){
        var scale = 1 + (scroll - 2000)/5000, sun_scale_diff = (scroll - 2000)/7000;
        y_off = earth_arr[5] + (scroll - 2000)/20;

        earth.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${earth_arr[4]}, ${y_off})`;
        earth.style.zIndex = '5';

        sun.style.transform = `matrix(${sun_arr[0] - sun_scale_diff}, 0, 0, ${sun_arr[0] - sun_scale_diff}, ${sun_arr[4]}, ${sun_arr[5]})`;

        earth_arr[0] = scale;
        earth_arr2[5] = y_off;
    }
    else if (scroll > 4000 && scroll <= 15000){
        x_off = earth_arr[4] - (scroll- 4000)/15;
        earth_arr2[4] = x_off;
        earth.style.zIndex = '5';
        earth.style.transform = `matrix(${earth_arr[0]}, 0, 0, ${earth_arr[0]}, ${x_off}, ${earth_arr2[5]}`;
    }
    else if (scroll > 15000 && scroll <= 16200){
        var scale = earth_arr[0] - (scroll - 15000)/5000;
        y_off = earth_arr2[5] - (scroll - 15000)/30;
        earth_arr[3] = scale;
        earth_arr3[5] = y_off;
        earth.style.zIndex = '5';
        earth.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${earth_arr2[4]}, ${y_off}`;
    }   
    else if (scroll > 16200 && scroll <= 18300){
        x_off = earth_arr2[4] + (scroll - 16200)/5;
        y_off = earth_arr3[5] + (scroll - 16200)/15;
        earth.style.zIndex = '3'
        earth.style.transform = `matrix(${earth_arr[3]}, 0, 0, ${earth_arr[3]}, ${x_off}, ${y_off}`;
    }
}

function move_moon(scroll){
    var x_off, y_off;
    if (scroll <= 2000) {
        x_off = -moon_width/2 + scroll/5;
        y_off = -moon_width/2 - scroll/15;  
        moon.style.transform = `matrix(1,0,0,1, ${x_off}, ${y_off}`;
        moon.style.transition = '0.3s ease';
        moon.style.zIndex = '2';
        moon_arr[4] = x_off;
        moon_arr[5] = y_off;
    }
    else if(scroll > 2000 && scroll <= 2800){
        x_off = moon_arr[4] + (scroll - 2000)/5;
        y_off = moon_arr[5] + (scroll - 2000)/20;

        moon.style.zIndex = '2';
        moon.style.transition = '0.3s ease';
        moon.style.transform = `matrix(1, 0, 0, 1, ${x_off}, ${y_off})`;
        moon_arr2[4] = x_off;
        moon_arr2[5] = y_off;
    }
    else if (scroll > 2800 && scroll <= 4000){
        scale = 1 + (scroll - 2800)/5000;
        y_off = moon_arr2[5] + (scroll - 2800)/20;
        
        moon_arr[0] = scale;
        moon_arr3[5] = y_off;
        
        moon.style.transition = '0.1s ease';
        moon.style.zIndex = '5';
        moon.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${moon_arr2[4]}, ${y_off}`;
    }   
    else if (scroll > 4000 && scroll <= 14000){
        x_off = moon_arr2[4] - (scroll - 4000)/10;
        moon_arr3[4] = x_off;
        moon.style.zIndex = '5';
        moon.style.transform = `matrix(${moon_arr[0]}, 0, 0, ${moon_arr[0]}, ${x_off}, ${moon_arr3[5]}`;
    }
    else if (scroll > 14000 && scroll <= 16200){
        var scale = moon_arr[0] - (scroll - 14000)/7000;
        y_off = moon_arr3[5] - (scroll - 14000)/15;
        moon_arr[3] = scale;
        moon_arr4[5] = y_off;
        moon.style.zIndex = '2';
        moon.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${moon_arr3[4]}, ${y_off}`;
    }
    else if (scroll > 16200 && scroll <= 18300){
        x_off = moon_arr3[4] + (scroll - 16200)/5;
        y_off = moon_arr4[5] + (scroll - 16200)/10;
        earth.style.zIndex = '3'
        moon.style.transform = `matrix(${moon_arr[3]}, 0, 0, ${moon_arr[3]}, ${x_off}, ${y_off}`;
    }

}

function transform(scroll){
    
    if (scroll > 9600){
        sun.classList.remove('shining');

        sun.querySelector('img').src = 'images/earth.png';
        earth.querySelector('img').src = 'images/moon.png';
        moon.querySelector('img').src = 'images/astronaut.png';

        sun.classList.add('anim');
        earth.classList.add('anim');
        moon.classList.add('anim');
       
    }
    else{
        sun.classList.add('shining');

        sun.querySelector('img').src = 'images/sun.png';
        earth.querySelector('img').src = 'images/earth.png';
        moon.querySelector('img').src = 'images/moon.png';

        sun.classList.remove('anim');
        earth.classList.remove('anim');
        moon.classList.remove('anim');

    }
}

function getTransform(elem){
    var styles = getComputedStyle(elem, null), style = styles.getPropertyValue('transform');

    var value = style.replace('matrix(',''), array = value.split('');

    array.pop();

    var result_str = array.join('');

    var result_arr = result_str.split(',');

    for(var i = 0; i < result_arr.length; i++){
        result_arr[i] = parseInt(result_arr[i].trim());
    }

    return result_arr;
}