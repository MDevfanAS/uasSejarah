//Initial References

//Questions Or Images
const questions = [
  {
    image: "Kabinet Ali Sastroamidjojo 1.jpeg",
    correct_option: "Kabinet Ali Sastroamidjojo 1",
  },
  {
    image: "Kabinet Ali Sastroamidjojo 2.jpeg",
    correct_option: "Kabinet Ali Sastroamidjojo 2",
  },
  {
    image: "Kabinet Burhanuddin Harahap.jpeg",
    correct_option: "Kabinet Burhanuddin Harahap",
  },
  {
    image: "Kabinet Djuanda.jpeg",
    correct_option: "Kabinet Djuanda",
  },
  {
    image: "Kabinet Natsir.jpeg",
    correct_option: "Kabinet Natsir",
  },
  {
    image: "Kabinet Soekiman.jpeg",
    correct_option: "Kabinet Soekiman",
  },
  {
    image: "Kabinet Wipolo.jpeg",
    correct_option: "Kabinet Wipolo",
  },
  {
    image: "NU(Nahdlatul Ulama).jpeg",
    correct_option: "NU(Nahdlatul Ulama)",
  },
  {
    image: "Partai Buruh.png",
    correct_option: "Partai Buruh",
  },
  {
    image: "Partai Katolik.png",
    correct_option: "Partai Katolik",
  },
  {
    image: "Partai Komunis Indonesia(PKI).png",
    correct_option: "Partai Komunis Indonesia(PKI)",
  },
  {
    image: "Partai Kristen Indonesia.jpeg",
    correct_option: "Partai Kristen Indonesia",
  },
  {
    image: "Partai Murba.png",
    correct_option: "Partai Murba",
  },
  {
    image: "Partai Nasional Indonesia(PNI).png",
    correct_option: "Partai Nasional Indonesia(PNI)",
  },
  {
    image: "Partai Sosialis Indonesia(PSI).png",
    correct_option: "Partai Sosialis Indonesia(PSI)",
  },
  {
    image: "Partai Syarikat Islam Indonesia(PSII).jpeg",
    correct_option: "Partai Syarikat Islam Indonesia(PSII)",
  },
];

//All options
const optionsArray = [
  "Partai Syarikat Islam Indonesia(PSII)",
  "Partai Sosialis Indonesia(PSI)",
  "Partai Nasional Indonesia(PNI)",
  "Partai Murba",
  "Partai Kristen Indonesia",
  "Partai Komunis Indonesia(PKI)",
  "Partai Katolik",
  "Partai Buruh",
  "NU(Nahdlatul Ulama)",
  "Kabinet Wipolo",
  "Kabinet Soekiman",
  "Kabinet Natsir",
  "Kabinet Djuanda",
  "Kabinet Burhanuddin Harahap",
  "Kabinet Ali Sastroamidjojo 2",
  "Kabinet Ali Sastroamidjojo 1",
  "Ir Soekarno",
  "Moh Hatta",
  "H. Adam Malik",
  "Sri Sultan HB IX",
  "Soeharto",
  "Dipa Nusantara Aidit",
  "Wikana",
  "Partai Solidaritas Indonesia",
  "Partai Persatuan Pembangunan (PPP)",
  "Partai Demokrasi Indonesia (PDI)",
  "Golongan Karya (Golkar)",
  "Partai Rakyat Indonesia (PRI)",
  "Partai Rakyat Nasional (PRN)",
  "Agus Salim",
  "Ahmad Yani",
  "Iwa Kusumasumantri",
  "Johannes Leimena",
  "S. Parman",
  "Soebardjo",
  "Dr. Kusuma Atmaja",
  "Sutan Sjahrir",
  "Chairil Anwar",
  "Abdurrahman Wahid",
  "Amien Rais",
];
const container = document.querySelector(".container");
const gameContainer = document.querySelector(".game-container");
const startButton = document.getElementById("start");
const scoreContainer = document.querySelector(".score-container");
const userScore = document.getElementById("user-score");
let timer = document.getElementsByClassName("timer")[0];
let nextBtn;
let score, currentQuestion, finalQuestions;
let countdown,
  count = 11;

//Random value from array
const randomValueGenerator = (array) =>
  array[Math.floor(Math.random() * array.length)];

//Random shuffle array
const randomShuffle = (array) => array.sort(() => 0.5 - Math.random());

//Start game
const startGame = () => {
  //Select random 5 questions
  scoreContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
  finalQuestions = populateQuestions();
  score = 0;
  currentQuestion = 0;
  //Generate card for first question
  cardGenerator(finalQuestions[currentQuestion]);
};

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count -= 1;
    timer.innerHTML = `<span>Time Left: </span>${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      nextQuestion();
    }
  }, 1000);
};

//Create options
const populateOptions = (correct_option) => {
  let arr = [];
  arr.push(correct_option);
  let optionsCount = 1;
  while (optionsCount < 4) {
    let randomvalue = randomValueGenerator(optionsArray);
    if (!arr.includes(randomvalue)) {
      arr.push(randomvalue);
      optionsCount += 1;
    }
  }
  return arr;
};

//Choose random questions
const populateQuestions = () => {
  let questionsCount = 0;
  let chosenObjects = [];
  let questionsBatch = [];
  //5 Questions
  while (questionsCount < 10) {
    let randomvalue = randomValueGenerator(questions);
    let index = questions.indexOf(randomvalue);
    if (!chosenObjects.includes(index)) {
      questionsBatch.push(randomvalue);
      chosenObjects.push(index);
      questionsCount += 1;
    }
  }
  return questionsBatch;
};

//check selected answer
const checker = (e) => {
  let userSolution = e.target.innerText;
  let options = document.querySelectorAll(".option");
  if (userSolution === finalQuestions[currentQuestion].correct_option) {
    e.target.classList.add("correct");
    score++;
  } else {
    e.target.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == finalQuestions[currentQuestion].correct_option) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
};

//Next question
const nextQuestion = (e) => {
  //increment currentQuestion
  currentQuestion += 1;
  if (currentQuestion == finalQuestions.length) {
    gameContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    startButton.innerText = `Ulang`;
    userScore.innerHTML =
      "Nilaimu adalah " + score + " dari " + currentQuestion;
    clearInterval(countdown);
  } else {
    cardGenerator(finalQuestions[currentQuestion]);
  }
};

//Card UI
const cardGenerator = (cardObject) => {
  const { image, correct_option } = cardObject;
  let options = randomShuffle(populateOptions(correct_option));
  container.innerHTML = `<div class="quiz">
  <p class="num">
  ${currentQuestion + 1}/10
  </p>
  <div class="questions">
    <img class="pokemon-image" src="${image}"/>
  </div>
    <div class="options">
    <button class="option" onclick="checker(event)">${options[0]}
    </button>
    <button class="option" onclick="checker(event)">${options[1]}
    </button>
    <button class="option" onclick="checker(event)">${options[2]}
    </button>
    <button class="option" onclick="checker(event)">${options[3]}
    </button>
    </div>

    <div class="nxt-btn-div">
        <button class="next-btn" onclick="nextQuestion(event)">Next</button>
    </div>

  </div>`;
  //For timer
  count = 11;
  clearInterval(countdown);
  //Display timer
  timerDisplay();
};

startButton.addEventListener("click", startGame);
