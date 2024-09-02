const $gameBoard = document.querySelector('.game-board');
const $emojis = document.querySelectorAll(".emoji");
const $playButton = document.querySelector('#play-button');
const emojiList = ["😎", "🦀", "🤺", "🐱‍👤"];
let clickedEmojis = [];
let matches = 0;

$playButton.onclick = function () {
    const shuffledEmojis = shuffleEmojis();

    $emojis.forEach(($emoji, count) => {
        if (!$emoji.classList.contains("opacity-0")) {
            $emoji.classList.add("opacity-0");
        }

        $emoji.parentElement.parentElement.onclick = handleInput;

        $emoji.textContent = shuffledEmojis[count];
    });
}

function shuffleEmojis() {
    let shuffledEmojis = emojiList.concat(emojiList).sort(() => Math.random() - 0.5);
    return shuffledEmojis;
}

function handleInput(e) {
    if (!clickedEmojis.includes(e.target) && clickedEmojis.length < 2 && e.target.classList.contains("emoji")) {
        clickedEmojis.push(e.target);
        e.target.classList.replace("opacity-0", "opacity-100");
        if (clickedEmojis.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    if (clickedEmojis[0].textContent === clickedEmojis[1].textContent) {
        clickedEmojis = [];
        matches++;
    } else {
        hideEmojis();
    }
}

function hideEmojis() {
    clickedEmojis.forEach((emoji) => {
        emoji.classList.replace("opacity-100", "opacity-0");
    });
    clickedEmojis = [];
}
