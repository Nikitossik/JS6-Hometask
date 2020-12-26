var irises = document.getElementsByTagName("img"); 
for (var i = 0; i < irises.length; i++) {
  irises[i].onmousedown = go;
}

var irisesState = [];
for (var i = 0; i < irises.length; i++) {
   // создание массива для отслеживания irises
   irisesState[irises[i].id] = false;
}

function check(){
   for (key in irisesState){
       if (irisesState[key] == false) {
           alert('-');
           return;
       }
   }
   alert('+');
}

function go(e) {
    // Ирис, на котором произошло событие нажатия мыши
    var flower = document.getElementById(e.target.id);
    var breed = flower.dataset.breed; // считываем сорт цветка
  
    var coords = getCoords(flower);
    // shiftX - сдвиг курсора от левого края картинки
    var shiftX = e.pageX - coords.left;
    // shiftY - сдвиг курсора от верхнего края картинки
    var shiftY = e.pageY - coords.top;
  
    // событие перемещения мыши
      document.onmousemove = function (e) {
      moveAt(e);
    };

function onField(field, left, top){
    var f = getCoords(field);
    if (left > f.left && left < f.left + f.width && top > f.top && top < f.top + f.height && (field == tan || field == pink || field == blue)) return 1;
    return 0;
}

  
    // функция перемещения объекта под координаты курсора
    function moveAt(e) {
      // shiftX и shiftY - сдвиг курсора относительно верхнего левого угла картинки
      var left = e.pageX - shiftX;
      var top = e.pageY - shiftY;
      flower.style.left = left + "px";
      flower.style.top = top + "px";
  
      // Координаты картинки относительно окна записываем в поле showCoords
      showCoords.innerHTML =
        "x: " + flower.style.left + " y: " + flower.style.top;
  
      //проверка, попадает ли на поле tan цветок с координатами left, top
      if (onField(tan, left, top)) {
        if (breed == "tan") tan.style.border = "2px green solid";
        else tan.style.border = "2px red solid";
      }
  
      //проверка, попадает ли на поле pink цветок с координатами left, top
      if (onField(pink, left, top)) {
        if (breed == "pink") pink.style.border = "2px green solid";
        else pink.style.border = "2px red solid";
      }

      if (onField(blue, left, top)) {
        if (breed == "blue") blue.style.border = "2px green solid";
        else blue.style.border = "2px red red";
      }
    }
  
    // событие отпускания мыши
    flower.onmouseup = function (event) {
        irisesState[flower.id] = false;

      // получаем координаты цветка
      var left = parseInt(flower.style.left);
      var top = parseInt(flower.style.top);
  
     //проверка, попадает ли на поле tan цветок с координатами left, top
     if (onField(tan, left, top)) {
       state.innerHTML =
       flower.id + " сорт " + breed + " отпускаем на поле tan!"; // записываем в поле state    
       if (breed == 'tan') irisesState[flower.id] = true;
       else irisesState[flower.id] = false;
     } else {
       state.innerHTML =
       flower.id + " сорт " + breed + " отпускаем вне поля tan!";
       tan.style.border = "none";
     }
     //проверка, попадает ли на поле pink цветок с координатами left, top
     if (onField(pink, left, top)) {
       state.innerHTML =
       flower.id + " сорт " + breed + " отпускаем на поле pink!";
       if (breed == 'pink') irisesState[flower.id] = true;
       else irisesState[flower.id] = false;
      } else {
      state.innerHTML =
        flower.id + " сорт " + breed + " отпускаем вне поля pink!";
        pink.style.border = "none";
      }

      if (onField(blue, left, top)) {
        state.innerHTML =
        flower.id + " сорт " + breed + " отпускаем на поле blue!";
        if (breed == 'blue') irisesState[flower.id] = true;
        else irisesState[flower.id] = false;
       } else {
       state.innerHTML =
         flower.id + " сорт " + breed + " отпускаем вне поля blue!";
         pink.style.border = "none";
       }
     document.onmousemove = null;
     flower.onmouseup = null;
   };
  
   flower.ondragstart = function () {
      return false; // отмена drag and drop браузера
   };
  }
  
  // функция возвращает размер элемента и его координаты относительно объемлющего элемента.
  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    //pageYOffset и pageXOffset возвращают скроллирование окна в пикселях
    return {
      height: box.height,
      width: box.width,
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }