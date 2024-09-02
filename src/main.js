const $gameBoard = document.querySelector('.game-board')
const $emojis = document.querySelectorAll(".emoji")
const $playButton = document.querySelector('#play-button')
const emojiList = ["😎", "🦀", "🤺", "🐱‍👤"]
let clickedEmojis = []
let matches = 0

$playButton.onclick = function () {
    const shuffledEmojis = shuffleEmojis()
    
    $emojis.forEach(($emoji, count) => {
        if (!$emoji.classList.contains("opacity-0")) {
            $emoji.classList.add("opacity-0")
        }

        $emoji.textContent = shuffledEmojis[count]
        count++
    })

}

function shuffleEmojis() {
    let shuffledEmojis = emojiList.concat(emojiList).sort(() => Math.random() - 0.5);
    
    return shuffledEmojis
}
