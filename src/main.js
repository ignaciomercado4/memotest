const $gameBoard = document.querySelector(".game-board");
const $emojis = document.querySelectorAll(".emoji");
const $playButton = document.querySelector("#play-button");
const EMOJI_LIST = ["😎", "🦀", "🤺", "🐱‍👤"];
let clickedEmojis = [];
let matches = 0;

$playButton.onclick = function () {
    $playButton.disabled = true;
    setDefaults();

    const shuffledEmojis = shuffleEmojis();

    $emojis.forEach(($emoji, count) => {
        if (!$emoji.classList.contains("opacity-0")) {
            $emoji.classList.add("opacity-0");
        }

        $emoji.parentElement.parentElement.onclick = handleInput;

        $emoji.textContent = shuffledEmojis[count];
    });
};

function shuffleEmojis() {
    let shuffledEmojis = EMOJI_LIST.concat(EMOJI_LIST).sort(
        () => Math.random() - 0.5
    );
    return shuffledEmojis;
}

function handleInput(e) {
    if (
        !clickedEmojis.includes(e.target) &&
        clickedEmojis.length < 2 &&
        e.target.classList.contains("emoji")
    ) {
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
        checkWinner();
    } else {
        setTimeout(hideEmojis, 400);
    }
}

function hideEmojis() {
    clickedEmojis.forEach((emoji) => {
        emoji.classList.replace("opacity-100", "opacity-0");
    });
    clickedEmojis = [];
}

function checkWinner() {
    if (matches === 4) {
        $playButton.textContent = "Play again!";
        $playButton.disabled = false;
        startConfetti();
    }
}

function startConfetti() {
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: Math.random() * 360,
            spread: Math.random() * 20 + 20,
            origin: {
                x: Math.random(),
                y: Math.random()
            },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function setDefaults() {
    $playButton.textContent = "Play";
    matches = 0;
    clickedEmojis = [];

    $emojis.forEach((emoji) => {
        emoji.classList.replace("opacity-100", "opacity-0");
        emoji.onclick = null;
    });
}
