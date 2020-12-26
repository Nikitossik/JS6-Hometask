var total = 0, equivalents = {};

function allowDrop(event) {
  event.preventDefault();
}

function countEquivalents(flower) {
    if (
        equivalents.length == 0 ||
        equivalents[flower] == undefined
    )
    return 0;
    return equivalents[flower][1];
}

function drag(event) {
  event.dataTransfer.setData("text", '<img  src="http://js.web-online.net.ua/' + event.target.id + '.jpg" class="mini" />,' + event.target.dataset.text + ', ' + event.target.dataset.price + ', ' + event.target.id);
}

function drop(event) {
  event.preventDefault();
  var drop = document.getElementById('cart');
  var data = event.dataTransfer.getData("text");
  var arr_data = data.split(',');
  // console.log(arr_data);
  var sum = document.getElementById('sum');
  total += parseInt(arr_data[2]);
  sum.innerHTML = 'Сумма: $' + total;
  if (countEquivalents(arr_data[1]) == 0){
    equivalents[arr_data[1]] = [arr_data[2], 1];
    drop.innerHTML += arr_data[0] + arr_data[1] + ', $' + parseInt(arr_data[2]) + '<span id="count_' + arr_data[3] + '"> количество: ' + countEquivalents(arr_data[1]) +  '</span>';
  }
  else{
    equivalents[arr_data[1]][1]++;
    let cf1 = document.getElementById('count_' +  arr_data[3]); 
    cf1.innerHTML = ' количество: ' + countEquivalents(arr_data[1]);
  }

  console.log(equivalents);
  console.log(countEquivalents('Ирис 1'));
}

function arrange(){
  let inp = confirm('Вы уверены что хотите оформить заказ?');
  if (inp){
    var text = document.getElementById('order');   
    text.classList.remove('hidden');
    text.innerHTML =  !countEquivalents('Ирис 1') ? '' : `Ирис 1: ${countEquivalents('Ирис 1')}<br>`;
    text.innerHTML += !countEquivalents('Ирис 2') ? '' : `Ирис 2: ${countEquivalents('Ирис 2')}<br>`;
    text.innerHTML += '<br>Сумма заказа: ' + total + '$';
  }
}