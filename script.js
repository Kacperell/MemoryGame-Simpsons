(function () {
    var config = {
        apiKey: "AIzaSyB-bOfVoWShODxNZXPXpiFTkEgZ-ctKNxE",
        authDomain: "memorysimpsons.firebaseapp.com",
        databaseURL: "https://memorysimpsons.firebaseio.com",
        projectId: "memorysimpsons",
        storageBucket: "memorysimpsons.appspot.com",
        messagingSenderId: "883109277425"
    };

    firebase.initializeApp(config);
    var db = firebase.firestore();

    const all = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19", "c20", "c21", "c22", "c23", "c24", "c25", "c26", "c27", "c28", "c29"];
    let cardColors = [];
    const SelectLevel = document.querySelector(".selectLvl");
    const footer = document.querySelector(".footer");
    let startTime = new Date().getTime();
    let activeCard = "";
    let activeCards = [];
    let gameResult = 0;
    let cards;
    let GamePairs;
    let poziom;

    const box = document.querySelector(".box");
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
        }
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
                    if (gameResult === GamePairs) {
                        const endTime = new Date().getTime();
                        const gameTime = (endTime - startTime) / 1000;
                        let points = 1000 - gameTime * 3;
                        points = parseInt(points);

                        if (poziom == 1) {
                            let top5Medrium = db.collection('top5medium').orderBy("points", "desc").limit(5);
                            let czyDodac = 0;
                            top5Medrium.get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    if (points > doc.data().points) {
                                        czyDodac = 1;
                                    }
                                });
                                if (czyDodac == 1) {
                                    let person = prompt(" You are in top 5!🔥 Enter your name:", "Harry");
                                    db.collection("top5medium").add({
                                            name: person,
                                            points: points
                                        }).then(function (docRef) {
                                            console.log("Document written with ID: ", docRef.id);
                                            updateMediumRank();
                                        })
                                        .catch(function (error) {
                                            console.error("Error adding document: ", error);
                                        });

                                }
                            });
                        } else {
                            let top5Hard = db.collection('top5hard').orderBy("points", "desc").limit(5);
                            let czyDodac = 0;
                            top5Hard.get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    if (points > doc.data().points) {
                                        czyDodac = 1;
                                    }
                                });
                                if (czyDodac == 1) {
                                    let person = prompt(" You are in top 5!🔥 Enter your name:", "Harry");
                                    db.collection("top5hard").add({
                                            name: person,
                                            points: points
                                        }).then(function (docRef) {
                                            console.log("Document written with ID: ", docRef.id);
                                            updateHardRank();
                                        })
                                        .catch(function (error) {
                                            console.error("Error adding document: ", error);
                                        });
                                }
                            });
                        }
                        alert("Wow! Legit! You scored " + points + " points!😎 ");
                        SelectLevel.classList.remove("off");
                        footer.classList.remove("off");
                        box.classList.add("off");
                        gameResult = 0;
                        activeCard = "";
                        activeCards = [];
                        while (box.firstChild) {
                            box.removeChild(box.firstChild);
                        }

                    }
                } else {
                    activeCards.forEach(card => card.classList.add("hidden"))
                }
                activeCard = "";
                activeCards.length = 0;
                cards.forEach(card => card.addEventListener("click", clickCard))
            }, 500)

        }
    }
    const init = function (lvl) {
        SelectLevel.classList.add("off");
        footer.classList.add("off");
        startTime = new Date().getTime();
        for (i = 0; i < lvl; i++) {
            let div = document.createElement("div");
            div.className = "card";
            document.querySelector(".box").appendChild(div);
        }
        cards = document.querySelectorAll(".card");

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
        }, 5800);
    };

    const MediumButton = document.querySelector(".mediumButton");
    const HardButton = document.querySelector(".hardButton");
    const topLogo = document.querySelector(".top");

    MediumButton.addEventListener("click", function () {
        box.classList.remove("off");
        createclass(18);
        init(18);
        poziom = 1;
    });
    HardButton.addEventListener("click", function () {
        box.classList.remove("off");
        createclass(24);
        init(24);
        poziom = 2;
    });


    topLogo.addEventListener("click", function () {
        let myNode = document.querySelector(".box")
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        SelectLevel.classList.remove("off");
        footer.classList.remove("off");
        box.classList.add("off");
        ranking.classList.add("off");
        activeCard = "";
        activeCards = [];
        gameResult = 0;
    });
    const rankingBtn = document.querySelector(".rankingBtn");
    const ranking = document.querySelector(".ranking");
    rankingBtn.addEventListener("click", function () {
        SelectLevel.classList.add("off");
        footer.classList.add("off");
        ranking.classList.remove("off");

    });
    function updateMediumRank() {
        const rankingMedium = document.querySelector(".top5.medium");
        const fragment = document.createDocumentFragment();

        rankingMedium.innerHTML = "top 5 Medium";
        let top5MedriumRef = db.collection('top5medium').orderBy("points", "desc").limit(5);
        let el;
        let i = 1;
        top5MedriumRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                el = document.createElement('span');
                el.classList = "rankingElement";
                el.innerHTML = `${i}. <p class="red"> ${doc.data().name} </p> points:  <p class="red"> ${doc.data().points}</p>   `;
                i++;
                fragment.appendChild(el);
            });
            rankingMedium.appendChild(fragment);
        });
    }
    updateMediumRank();

    function updateHardRank() {
        const rankingHard = document.querySelector(".top5.hard");
        const fragmentHard = document.createDocumentFragment();
 
        rankingHard.innerHTML = "top 5 hard";

        let top5HardRef = db.collection('top5hard').orderBy("points", "desc").limit(5);
        let el2;
        let j = 1;
        top5HardRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                el = document.createElement('span');
                el.classList = "rankingElement";
                el.innerHTML = `${j}. <p class="red"> ${doc.data().name} </p> points:  <p class="red"> ${doc.data().points}</p>   `;
                j++;
                fragmentHard.appendChild(el);
            });
            rankingHard.appendChild(fragmentHard);
        });
    }
    updateHardRank();

    for(let i=1;i<30;i++){
        console.log("Xd");
        const img=new Image();
     //   img.src = `img/${i}.jpg`;
        img.classList=`c${i}`;
    box.appendChild(img);
    }

})();