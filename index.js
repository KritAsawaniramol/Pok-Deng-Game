var readline = require("readline");

var rl = readline.createInterface(process.stdin, process.stdout);
const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
const cardNumbers = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];
let playerChips = 0;

class Deck {
  constructor() {
    this.cards = createDeck();
  }

  // Shuffle using Fisher-Yates Shuffle
  shuffleDeck() {
    for (var i = this.cards.length - 1; i > 0; i--) {
      // Returns a random integer from 0 to this.cards.length - 1
      const randomIndex = Math.floor(Math.random() * (i + 1));

      var temp = this.cards[i];
      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }
}

function createDeck() {
  var deck = [];
  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < cardNumbers.length; j++) {
      deck.push({
        card: suits[i] + "-" + cardNumbers[j],
        value: j > 8 ? 0 : j + 1,
      });
    }
  }
  return deck;
}

let deck = new Deck();

const isValidBet = (bet) => {
  if (isNaN(bet)) {
    console.log("Please enter a valid number");
    return false;
  }
  if (bet < 0) {
    console.log("Please enter a positive number ( >= 0 )");
    return false;
  }
  return true;
};

const playGame = () => {
  rl.question("Please put your bet:\n", (answer) => {
    handlePlayGameInput(answer);
  });
};

const handlePlayGameInput = (answer) => {
  if (!isValidBet(answer)) {
    playGame();
    return;
  }
  let bet = parseInt(answer);

  deck.shuffleDeck();

  let playerCard = [deck.cards[0], deck.cards[1]];
  let dealerCard = [deck.cards[2], deck.cards[3]];

  console.log("You got " + playerCard[0].card + ", " + playerCard[1].card);
  console.log(
    "The dealer got " + dealerCard[0].card + ", " + dealerCard[1].card
  );

  let playerScore = playerCard[0].value + playerCard[1].value;
  let dealerScore = dealerCard[0].value + dealerCard[1].value;

  if (playerScore > dealerScore) {
    playerChips += bet;
    process.stdout.write("You won!!, recived: " + bet + " chips\n");
  } else if (playerScore < dealerScore) {
    playerChips -= bet;
    process.stdout.write("You lost!!, forfeited: " + bet + " chips\n");
  } else {
    process.stdout.write("You tie!!\n");
  }
  continueGame();
};

const continueGame = () => {
  rl.question("Wanna play more (Yes/No)?\n", (answer) => {
    handleContinueGamaInput(answer);
  });
};

const handleContinueGamaInput = (answer) => {
  answer = answer.toLowerCase();
  if (answer === "yes") {
    playGame();
  } else if (answer === "no") {
    rl.close();
    return;
  } else {
    console.log("Please enter a valid input (Yes/No)");
    continueGame();
  }
};

rl.on("close", () => {
  if (playerChips >= 0) {
    console.log("You got total " + playerChips + " chips");
  } else {
    playerChips = Math.abs(playerChips);
    console.log("You lost " + playerChips + " chips");
  }
});

playGame();

module.exports = {
    createDeck,
    isValidBet,
    handlePlayGameInput,
    handleContinueGamaInput,
}