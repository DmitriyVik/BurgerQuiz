document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const modalWrap = document.querySelector('.modal');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const modalDialog = document.querySelector('.modal-dialog');
  const sendButton = document.querySelector('#send');
  
  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [
          {
              title: 'Стандарт',
              url: './image/burger.png'
          },
          {
              title: 'Черный',
              url: './image/burgerBlack.png'
          }
      ],
      type: 'radio'
  },
  {
      question: "Из какого мяса котлета?",
      answers: [
          {
              title: 'Курица',
              url: './image/chickenMeat.png'
          },
          {
              title: 'Говядина',
              url: './image/beefMeat.png'
          },
          {
              title: 'Свинина',
              url: './image/porkMeat.png'
          }
      ],
      type: 'radio'
  },
  {
      question: "Дополнительные ингредиенты?",
      answers: [
          {
              title: 'Помидор',
              url: './image/tomato.png'
          },
          {
              title: 'Огурец',
              url: './image/cucumber.png'
          },
          {
              title: 'Салат',
              url: './image/salad.png'
          },
          {
              title: 'Лук',
              url: './image/onion.png'
          }
      ],
      type: 'checkbox'
  },
  {
      question: "Добавить соус?",
      answers: [
          {
              title: 'Чесночный',
              url: './image/sauce1.png'
          },
          {
              title: 'Томатный',
              url: './image/sauce2.png'
          },
          {
              title: 'Горчичный',
              url: './image/sauce3.png'
          }
      ],
      type: 'radio'
  }
  ];
        
  // let count = -100 ;
  // let interval;
  // modalDialog.style.top = "-100%";
  // const animateModal = () => {
  //   modalDialog.style.top = count + "%";
  //   count++;
  //   if (count >= 0) {
  //     clearInterval(interval)
  //     count = -100;
  //   }
  // }

  let count = -100 ;
  let interval;
  modalDialog.style.top = "-100%";
  const animateModal = () => {
    modalDialog.style.top = count + "%";
    count++;
    interval = requestAnimationFrame(animateModal,10);
    if (count >= 0) {
      cancelAnimationFrame(interval)
      count = -100;
    }
  }

  let clientWidth = document.documentElement.clientWidth;
  

  if (clientWidth < 768) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }


  window.addEventListener('resize', function() {
    clientWidth = document.documentElement.clientWidth;

    if (clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  })

  burgerBtn.addEventListener('click', function() {
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    playTest();
  })


  btnOpenModal.addEventListener('click',() => {
    // interval = setInterval(animateModal,10);
    interval = requestAnimationFrame(animateModal,10);

    modalBlock.classList.add('d-block');
    playTest();
  })
  closeModal.addEventListener('click',() => {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
  })
//  закрытие модального окна клику за пределом окна
  document.addEventListener('click', function(event) {
    event.target
    if (!event.target.closest('.modal-dialog') &&
    !event.target.closest('#btnOpenModal') &&
    !event.target.closest('#burger')
    ) {
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active');
    }
  })

  // Запуск тестирования
  const playTest = () => {
    const obj = {};
    const finalAnswers = [];

    let numberQuestion = 0;
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
      const answerItem = document.createElement('div')
        answerItem.className = ('answers-item d-flex justify-content-center')
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
          <img class="answerImg" src="${answer.url}" alt="burger">
          <span>${answer.title}</span>
          </label>
          `;
      formAnswers.appendChild(answerItem);
    })
  }
    // рендер ответов
    const renderQuestion = (indexQuestion) => {
      formAnswers.innerHTML = ``;
      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = questions[indexQuestion].question;
        renderAnswers(indexQuestion);
        prevButton.classList.remove('d-none')
        nextButton.classList.remove('d-none')
        sendButton.classList.add('d-none')
      }       
      if (numberQuestion < 1) {
        prevButton.classList.add('d-none')
        
      }       
      if (numberQuestion > questions.length - 1) {
        questionTitle.textContent = ''
        nextButton.classList.add('d-none');
        prevButton.classList.add('d-none');
        sendButton.classList.remove('d-none');
        formAnswers.innerHTML = `
        <div class="form-group">
          <label for="numberPhone">Enter your number</label> 
          <input type ="phone" class="form-control" id="numberPhone">
        <\div>
        `;

        const numberPhone = document.getElementById('numberPhone');
        numberPhone.addEventListener('input', (event) => {
          event.target.value = event.target.value.replace(/[^0-9+-]/, "")
        })

      }
      if (numberQuestion > questions.length) {
        formAnswers.textContent = 'Спасибо за пройденный тест!'

        for (let key in obj) {
          let newObj = {};
          newObj[key] = obj[key];
          finalAnswers.push(newObj);
          
        }
        // console.log('finalAnswers: ', finalAnswers);

        sendButton.classList.add('d-none')
        setTimeout(() => {
          modalBlock.classList.remove('d-block');
        }, 2000)
      }
    }
    renderQuestion(numberQuestion);

    const checkAnswer = () => {
      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        } else {
          obj[`Номер телефона`] = input.value;
        }
      })
      // finalAnswers.push(obj);
      

    }


    prevButton.onclick = () => {
      
      numberQuestion--;
      renderQuestion(numberQuestion);
      
    }
    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;      
      renderQuestion(numberQuestion);
    }
    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestion(numberQuestion);
      console.log('finalAnswers: ', finalAnswers);
    }

    
  }
})

