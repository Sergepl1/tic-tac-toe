window.addEventListener('load', function () {

  var input = document.querySelector('.count');
  var buttonGen = document.querySelector('.generateField');
  var field = document.querySelector('.field');
  var startNewGame = document.querySelector('.startNewGame');
  var soundBtn = document.querySelector('.soundBtn')
  var state = [];
  var data = JSON.parse(localStorage.getItem('position'));
  var inputVal = JSON.parse(localStorage.getItem('inputVal'))
  var point = JSON.parse(localStorage.getItem('point')) ? JSON.parse(localStorage.getItem('point')) : 'o';
  var cells;


  function audio(sound) {
    var audio = new Audio();
    audio.src = sound;
    audio.autoplay = true;
    soundBtn.addEventListener('click', function () {
      console.log('audio', audio)
      if (audio.paused) {
        soundBtn.src = 'img/soundOff.png'
        audio.play()
      } else {
        audio.pause();
        soundBtn.src = 'img/soundOn.png';
      }
    })
  }

  function startGame() {
    inputVal = '';
    document.querySelector('.winner-message').innerHTML = '';
    field.innerHTML = '';
    document.querySelector('.mainGame').style.display = 'none';
    document.querySelector('.startGame').style.display = 'block';
    localStorage.clear()
    data = ''
  }

  function saving(cells) {
    for (var i = 0; i < inputVal; i++) {
      for (var j = 0; j < inputVal; j++) {
        var temperNumber = cells[i * inputVal + j];
        if (temperNumber.classList.contains('x')) {
          state[i * inputVal + j] = 'x';
        } else if (temperNumber.classList.contains('o')) {
          state[i * inputVal + j] = 'o';
        } else {
          state[i * inputVal + j] = '';
        }
      }
    }
    localStorage.setItem('position', JSON.stringify(state));
  }

  function handleStart(event) {
    audio('audio/click1.mp3')
    if (!event.target.classList.contains('cell') ||
      event.target.classList.contains('x') ||
      event.target.classList.contains('o')) {
      return;
    }
    if (getWinner()) {
      return;
    }
    if (point == 'x') {
      point = 'o'
    } else {
      point = 'x'
    }
    event.target.classList.add(point);
    localStorage.setItem('point', JSON.stringify(point))
    var winner = getWinner();
    if (winner == 'x') {
      document.querySelector('.winner-message').innerHTML = 'Хрестик переміг';
    } else if (getWinner() == 'o') {
      document.querySelector('.winner-message').innerHTML = 'Нолик переміг';
    }
    saving(cells);
  }

  audio('audio/fort_boyard.mp3')

  if (data) {
    document.querySelector('.mainGame').style.display = 'block';
    document.querySelector('.startGame').style.display = 'none';
    for (var i = 0; i < inputVal; i++) {
      var row = document.createElement('div');
      row.classList.add('row');
      field.appendChild(row);
      for (var j = 0; j < inputVal; j++) {
        var cell = document.createElement('div');
        row.appendChild(cell);
        cell.classList.add('cell');
        //cell.classList.add('cell');
        cells = document.querySelectorAll('.cell');
        if (data[i * inputVal + j] != '') {
          cells[i * inputVal + j].classList.add(data[i * inputVal + j]);
        }
      }
    }
    field.addEventListener('click', handleStart);
    startNewGame.addEventListener('click', startGame);
  }
  buttonGen.addEventListener('click', function () {

    inputVal = (parseFloat(input.value))
    localStorage.setItem('inputVal', JSON.stringify(inputVal))
    if (inputVal > 15 || inputVal < 5 || inputVal !== parseInt(inputVal)) {
      var error = document.querySelector('.error-message');
      error.innerHTML = 'Вы ввели некорректное число';
    } else {
      document.querySelector('.mainGame').style.display = 'block';
      document.querySelector('.startGame').style.display = 'none';
      for (var i = 0; i < inputVal; i++) {
        var row = document.createElement('div');
        row.classList.add('row');
        field.appendChild(row);
        for (var j = 0; j < inputVal; j++) {
          var cell = document.createElement('div');
          row.appendChild(cell);
          cell.classList.add('cell');
          cells = document.querySelectorAll('.cell');
        }
      }
    }
    field.addEventListener('click', handleStart);
    startNewGame.addEventListener('click', startGame);
  })


});