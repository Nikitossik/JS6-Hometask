function Dog(weight, object) {

    this.weight = weight;

    this.speed = 0;
    this.left = 800; 
    this.elem = object;

    let maxspeed = this.weight <= 25 ? 10 : 20;

    this.stop = function() {
        this.speed = 0;
    };

    this.changeSpeed = function(km){

        if (this.speed <= maxspeed) this.speed += km;

        if (this.left > 0) this.left -= this.speed * 1000 / 3600;
        else this.stop();
    };   
}

var n = +prompt('Введите кол-во собак: '), dogs = [];

function init(){
    for (var i = 0; i < n; i++){

        var banner = document.querySelector('.banner');
        banner.style.height = 160 * n + 'px';

        var road = document.createElement('div');
        road.classList = 'road';

        var dog = document.createElement('div');
        dog.classList = 'dog';

        road.appendChild(dog);
        banner.appendChild(road);

        var weight = 5 + Math.floor(Math.random() * 30);

        dogs.push(new Dog(weight, dog));
    }
}

init();

function play(){

    for(var i = 0; i < dogs.length; i++){
        dogs[i].changeSpeed(4 + Math.floor(Math.random() * 4));
        console.log(dogs[i]);
        dogs[i].elem.style.animationDuration = `0.4s, 0.4s, ${20 - dogs[i].speed}s`;
    }

    var t = setTimeout(play, 1000);
}

play();
