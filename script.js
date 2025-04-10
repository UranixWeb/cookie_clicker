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
const investment = document.getElementById("investment");
const investice = document.getElementById("investice");
const o1 = document.getElementById("o1");
const o2 = document.getElementById("o2");
const o3 = document.getElementById("o3");
const o4 = document.getElementById("o4");
const o5 = document.getElementById("o5");
const a1 = 0;
const a2 = 0;
const a3 = 0;
const a4 = 0;
const a5 = 0;
const achievement1 = document.getElementById("achievement1");
const achievement2 = document.getElementById("achievement2");
const achievement3 = document.getElementById("achievement3");
const achievement4 = document.getElementById("achievement4");
const achievement5 = document.getElementById("achievement5");

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

investment.addEventListener("click", function () {
    const investmentValue = parseInt(investice.value) || 0;

    if (penize >= investmentValue && investmentValue > 0) {
        penize -= investmentValue;
        outputDiv.textContent = "Peníze: " + penize;
        console.log("Investment made, waiting for cashback...");

        const multiplier = Math.random() * (1.5 - 0.5) + 0.5; 
        const cashback = Math.floor(investmentValue * multiplier);

        setTimeout(() => {
            penize += cashback;
            outputDiv.textContent = "Peníze: " + penize;
            console.log(`Cashback received: ${cashback}, Total money: ${penize}`);
            if (multiplier > 1) {
                alert(`Gratulujeme, získali jste ${cashback} a vydělali jste!`);
            } if (multiplier < 1) {
                alert(`Bohužel, získali jste pouze ${cashback} zpět.`);
            }
        }, cashback * 10); 
    } else {
        console.log("Not enough money to invest or invalid investment value.");
    }
});

save.addEventListener("click", function() {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Set cookie expiration to 1 year from now

    // Save all game variables into cookies
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
    document.cookie = "a1=" + encodeURIComponent(a1) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "a2=" + encodeURIComponent(a2) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "a3=" + encodeURIComponent(a3) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "a4=" + encodeURIComponent(a4) + "; path=/; expires=" + expirationDate.toUTCString();
    document.cookie = "a5=" + encodeURIComponent(a5) + "; path=/; expires=" + expirationDate.toUTCString();
});

load.addEventListener("click", function() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
    }

    // Load all game variables from cookies
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
    a1 = parseInt(getCookie("a1")) || 0;
    a2 = parseInt(getCookie("a2")) || 0;
    a3 = parseInt(getCookie("a3")) || 0;
    a4 = parseInt(getCookie("a4")) || 0;
    a5 = parseInt(getCookie("a5")) || 0;

    // Update the UI with loaded values
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

setInterval(function () {
    if (penize >= 100 && achievement1.style.display === "none") {
        achievement1.style.display = "block";
        alert("Achievement dosažen: 100 peněz!");
        console.log("Achievement unlocked: 100 penize!");
    }
    if (penize >= 1000 && achievement2.style.display === "none") {
        achievement2.style.display = "block";
        alert("Achievement dosažen: 100 peněz!");
        console.log("Achievement unlocked: 1000 penize!");
    }
    if (penize >= 10000 && achievement3.style.display === "none") {
        achievement3.style.display = "block";
        alert("Achievement dosažen: 100 peněz!");
        console.log("Achievement unlocked: 10000 penize!");
    }
    if (penize >= 100000 && achievement4.style.display === "none") {
        achievement4.style.display = "block";
        alert("Achievement dosažen: 100 peněz!");
        console.log("Achievement unlocked: 100000 penize!");
    }
    if (penize >= 1000000 && achievement5.style.display === "none") {
        achievement5.style.display = "block";
        alert("Achievement dosažen: 100 peněz!");
        console.log("Achievement unlocked: 1000000 penize!");
    }
}, 1000);
