let r = 1
let penize = 0;
let cena = 20;
let výdělek = 1;
let upgrade = 1;
let vyplata = 0;
let counter = 0;
let pasivniCena = (counter + 1) * 50;
let aktivniCena = výdělek * 20;
let advancement = 100;
let av = 0;
let ap = 0;
let v = 0;
let p = 0;

const button = document.getElementById("výdělek");
const outputDiv = document.getElementById("penize");
const upgradeButton = document.getElementById("upgrade");
const vyplataButton = document.getElementById("vyplata");
const upgradeInfo = document.getElementById("upgradeInfo");
const vyplataInfo = document.getElementById("vyplataInfo");
const rebirth = document.getElementById("rebirth");
const save = document.getElementById("save");
const load = document.getElementById("load");
const rebirthInfo = document.getElementById("rebirthInfo");

button.addEventListener("click", function () {
    const moneyEarned = (výdělek + av) * r;

    button.classList.add("clicked");
    setTimeout(() => {
        button.classList.remove("clicked");
    }, 100);

    penize += moneyEarned;
    outputDiv.textContent = "Peníze: " + penize;

    const floatingText = document.createElement("div");
    floatingText.textContent = `+${moneyEarned}`;
    floatingText.className = "floating-text";

    const rect = button.getBoundingClientRect();
    floatingText.style.position = "absolute";
    floatingText.style.left = `${rect.left + rect.width / 2}px`;
    floatingText.style.top = `${rect.top}px`;

    document.body.appendChild(floatingText);

    setTimeout(() => {
        floatingText.remove();
    }, 1000);
});

upgradeButton.addEventListener("click", function(){
    if(penize >= aktivniCena){
        penize -= aktivniCena;
        výdělek += upgrade;
        aktivniCena = výdělek * 20;
        outputDiv.textContent = "Peníze: " + penize;
        upgradeInfo.textContent = "Nynější výdělek je " + ((výdělek + av) * r);
        upgradeButton.textContent = "Koupit upgrade za " + aktivniCena;
        console.log("Upgrade purchased, penize: " + penize, "výdělek: " + výdělek, "cena: " + aktivniCena);
    }
});

vyplataButton.addEventListener("click", function(){
    if(penize >= pasivniCena){
        penize -= pasivniCena;
        vyplata += 1;
        counter++;
        pasivniCena += 50;
        outputDiv.textContent = "Peníze: " + penize;
        vyplataInfo.textContent = "Nynější pasivní příjem je " + ((vyplata + ap) * r);
        vyplataButton.textContent = "Koupit pasivní příjem za " + pasivniCena;
        console.log("Passive income purchased, penize: " + penize, "vyplata: " + vyplata, "pasivniCena: " + pasivniCena);
    }
});

rebirth.addEventListener("click", function () {
    if (penize >= 1000000) { 
        penize = 0;
        výdělek = 1;
        vyplata = 0;
        r++;
        cena = 20;
        pasivniCena = 50;
        advancement = 100; 
        ap = 0; 
        av = 0; 

        outputDiv.textContent = "Peníze: " + penize;
        upgradeInfo.textContent = "Nynější příjem je " + ((výdělek + av) * r);
        vyplataInfo.textContent = "Nynější pasivní příjem je " + ((vyplata + ap) * r);
        upgradeButton.textContent = "Koupit upgrade za " + cena;
        vyplataButton.textContent = "Koupit pasivní příjem za " + pasivniCena;

        const multiplierDisplay = document.querySelector("p:nth-of-type(4)");
        multiplierDisplay.textContent = "Nynější multiplace je " + r;

        console.log("Rebirth performed, multiplier: " + r);
    }
});

setInterval(function () {
    penize += ((vyplata + ap) * r);
    outputDiv.textContent = "Peníze: " + penize;
    console.log("AFK salary added, penize: " + penize, "vyplata: " + vyplata, "ap: " + ap, "r: " + r);
}, 1000);

setInterval(function () {
    if (penize >= advancement && selectedDifficulty !== "hard") {
        console.log("Advancement achieved, new target: " + advancement);
        alert("Gratulujeme, dosáhli jste pokroku! Váš výdělek by zdvojnásoben! Nový cíl je " + advancement);
        advancement *= 10
        av = (výdělek + av);
        ap = (vyplata + ap);
        upgradeInfo.textContent = "Nynější výdělek je " + ((výdělek + av) * r);
        vyplataInfo.textContent = "Nynější pasivní příjem je " + ((vyplata + ap) * r);
    }
}, 1000); 

save.addEventListener("click", function() {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); 

    document.cookie = "penize=" + encodeURIComponent(penize) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "výdělek=" + encodeURIComponent(výdělek) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "vyplata=" + encodeURIComponent(vyplata) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "r=" + encodeURIComponent(r) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "upgrade=" + encodeURIComponent(upgrade) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "counter=" + encodeURIComponent(counter) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "aktivniCena=" + encodeURIComponent(aktivniCena) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "pasivniCena=" + encodeURIComponent(pasivniCena) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "av=" + encodeURIComponent(av) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "ap=" + encodeURIComponent(ap) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "v=" + encodeURIComponent(v) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "p=" + encodeURIComponent(p) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "cena=" + encodeURIComponent(cena) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "advancement=" + encodeURIComponent(advancement) + "; path=/; expires=" + expirationDate.toUTCString();
});

load.addEventListener("click", function() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
    }

    penize = parseInt(getCookie("penize")) || 0;
    výdělek = parseInt(getCookie("výdělek")) || 1;
    vyplata = parseInt(getCookie("vyplata")) || 0;
    r = parseInt(getCookie("r")) || 1;
    upgrade = parseInt(getCookie("upgrade")) || 1;
    counter = parseInt(getCookie("counter")) || 0;
    aktivniCena = parseInt(getCookie("aktivniCena")) || výdělek * 20;
    pasivniCena = parseInt(getCookie("pasivniCena")) || (counter + 1) * 50;
    av = parseInt(getCookie("av")) || 0;
    ap = parseInt(getCookie("ap")) || 0;
    v = parseInt(getCookie("v")) || 0;
    p = parseInt(getCookie("p")) || 0;
    cena = parseInt(getCookie("cena")) || 20;
    advancement = parseInt(getCookie("advancement")) || 100;

    outputDiv.textContent = "Peníze: " + penize;
    upgradeInfo.textContent = "Nynější výdělek je " + ((výdělek + av) * r);
    vyplataInfo.textContent = "Nynější pasivní příjem je " + ((vyplata + ap) * r);
    upgradeButton.textContent = "Koupit upgrade za " + aktivniCena;
    vyplataButton.textContent = "Koupit pasivní příjem za " + pasivniCena;
    rebirthInfo.textContent = "Nynější multiplace je " + r;


    console.log("Progress loaded:", {
        penize, výdělek, vyplata, r, upgrade, counter, aktivniCena, pasivniCena, av, ap, v, p, cena, advancement
    });
});