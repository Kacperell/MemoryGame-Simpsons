const all = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19", "c20", "c21", "c22", "c23", "c24", "c25", "c26", "c27", "c28", "c29"];
let cardColors = [];
let SelectLevel = document.querySelector(".selectLvl");
let footer = document.querySelector(".footer");
const startTime = new Date().getTime();
let activeCard = "";
const activeCards = [];
let gameResult = 0;
let cards;
let GamePairs;
const createclass = function (lvl) {
    let quantity = lvl / 2;
    let temparray2 = [];
    let temparray1 = [];
    for (i = 0; i < quantity; i++) {
        fate = Math.round(Math.random() * (all.length - 1));
        isalready = false;
        for (j = 0; j < temparray2.length; j++) {
            if (temparray2[j] == fate) isalready = true;
        }
        if (isalready) {
            i--;
        } else {
            temparray2[i] = fate;
        }
    }
    for (i = 0; i < quantity; i++) {
        temparray1.push(all[temparray2[i]]);
    };
    temparray2 = temparray1.slice(0);
    cardColors = temparray1.concat(temparray2);
}
const clickCard = function () {
    activeCard = this;
    if (activeCard == activeCards[0]) {
        return;
    }
    activeCard.classList.remove("hidden");
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    } else {
        cards.forEach(card => card.removeEventListener("click", clickCard))
        activeCards[1] = activeCard;
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains("off"))
                if (gameResult === GamePairs) {
                    console.log("wygrana gra");
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000;
                    alert("Wow! Legit! Your time is: " + gameTime + " seconds.Try again!");
                    location.reload();
                }
            } else {
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard))
        }, 500)

    }
};
const init = function (lvl) {
    SelectLevel.classList.add("off");
    footer.classList.add("off");
    for (i = 0; i < lvl; i++) {
        var div = document.createElement("div");
        div.className = "card";
        document.querySelector(".box").appendChild(div);
    }
    cards = document.querySelectorAll(".card");
    cards = [...cards];
    if (lvl == 24) {
        cards.forEach(card => {
            card.classList.add("hardCard")
        });
    }
    GamePairs = cards.length / 2;
    cards.forEach(card => {
        const postion = Math.floor(Math.random() * cardColors.length);
        card.classList.add(cardColors[postion])
        cardColors.splice(postion, 1)
    });
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard)
        })
    }, 3000)
};
const MediumButton = document.querySelector(".mediumButton");
const HardButton = document.querySelector(".hardButton");
MediumButton.addEventListener("click", function () {
    createclass(18);
    init(18);
});
HardButton.addEventListener("click", function () {
    createclass(24);
    init(24);
});