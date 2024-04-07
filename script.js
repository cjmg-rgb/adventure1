// ============================================ Initial Variables ============================================ 

// Stats
let playerXp = 0;
let playerHp = 100;
let playerGold = 50;


// ============================================ HTML ============================================ 
const buttonClass = "bg-[#135D66] text-[#E3FEF7] text-sm rounded";
const aClass = buttonClass + " text-center";

// TITLE TAB
const titleTab = document.querySelector(".title-tab");
const titleTabDivClass = "bg-[#003C43] text-[#E3FEF7] px-4 py-2 rounded"
titleTab.setAttribute("class", titleTabDivClass);

const titleTabTitle = document.createElement("h3");
const titleTabTitleClass = "text-center text-sm font-medium";
titleTabTitle.innerText = window.document.title;
titleTabTitle.setAttribute("class", titleTabTitleClass);

titleTab.appendChild(titleTabTitle);

// INFORMATION TAB
const infoTab = document.querySelectorAll(".info-tab");
const infoTabDatas = {
    xp: playerXp,
    hp: playerHp,
    gold: playerGold
}

infoTab.forEach(tab => {
    tab.setAttribute("class", "flex space-x-11 bg-[#77B0AA] py-1");
    
    for(let data in infoTabDatas) {
        const dataDiv = document.createElement("div");
        const dataName = document.createElement("h4");
        const dataVal = document.createElement("h4");
    
        dataDiv.setAttribute("class", "flex space-x-1 text-sm w-full justify-center");
        dataVal.setAttribute("class", `font-bold ${data === "hp" ? "playerHP" : ""}`)
        dataName.setAttribute("class", "font-medium")

        dataName.innerText = `${data.toUpperCase()}: `;
        dataVal.innerText = infoTabDatas[data];
    
        dataDiv.appendChild(dataName);
        dataDiv.appendChild(dataVal);
        tab.appendChild(dataDiv);
    }
})

// NAVIGATION TAB
const navTab = document.querySelectorAll(".nav-tab");

const navigations = {
    home: {
        a1: {
            href: "scenes/store.html",
            text: "Store",
            tag: "a"
        },
        a2: {
            href: "scenes/cave.html",
            text: "Cave",
            tag: "a"
        },
        b1: {
            tag: "button",
            text: "Dragon"
        }
    },
    store: {
        b1: {
            tag: "button",
            text: "Buy HP (10 gold)"
        },
        b2: {
            tag: "button",
            text: "Buy Weapon (30 gold)"
        },
        a1: {
            href: "../index.html",
            text: "Go to Townsquare",
            tag: "a"
        }
    },
    cave: {
        b1: {
            tag: "button",
            text: "Slime"
        },
        b2: {
            tag: "button",
            text: "Wolf"
        },
        a1: {
            href: "../index.html",
            text: "Run",
            tag: "a",
        }
    },
    enemy: {
        b1: {
            tag: "button",
            text: "Attack",
        },
        b2: {
            tag: "button",
            text: "Dodge",
        },
        a1: {
            href: "../index.html",
            text: "Run",
            tag: "a",
        }
    }
}

navTab.forEach(nav => {
    nav.setAttribute("class", nav.getAttribute("class") + " grid grid-cols-3 px-2 py-2 gap-1 bg-[#003C43]");
    const navList = nav.classList;
    if(navList.contains("home-tab")) {
        navigationElements("home", nav);
    } else if(navList.contains("store-tab")) {
        navigationElements("store", nav);
    } else if(navList.contains("cave-tab")) {
        navigationElements("cave", nav);
    } else if(navList.contains("enemy-tab")) {
        navigationElements("enemy", nav, navList.contains("slime") ? "slime" : "wolf");
    }
})

function navigationElements(page, nav, additionalClass="") {
    for(let component in navigations[page]) {
        let element = "";
        const el = navigations[page][component];
        if(el["tag"] === "a") {
            element = document.createElement("a");
            element.href = el["href"];
            element.setAttribute("class", aClass);
        } else if(el["tag"] === "button") {
            element = document.createElement("button");
            element.setAttribute("class", buttonClass);
            if(page === "enemy") {
                element.setAttribute("class", element.getAttribute("class") + " attack-btns " + additionalClass);
            }
        }
        element.innerText = el["text"];
        nav.appendChild(element);
    }
}

// ============================================ Logics ============================================ 

const playerHpValue = document.querySelector(".playerHP");

//Buttons
const enemyBtns = document.querySelectorAll(".enemy-btns");
const attackBtns = document.querySelectorAll(".attack-btns");

// Cave Menu
const caveWindow = document.querySelector(".cave-menu");

// Enemies Menu
const slimeWindow = document.querySelector(".slime-enemy");
const wolfWindow = document.querySelector(".wolf-enemy");


// Enemies
const slime = {
    name: "Slime",
    hp: 15,
    exp: 2,
    message(beat=true, weapon="stick") {
        if(beat) {
            console.log(`The cute little ${this.name} evaporated, you used ${weapon}`);
            
        } else {
            console.log(`The small ${this.name} turns into adult after digesting you`);
        }
    },
    // damaged() {
    //     this.hp -= this.damage;
    // },
    attacK() {
        return randomize(10, 20);
    }
}

const wolf = {
    name: "Wolf",
    damage: randomize(20, 40),
    exp: 8,
    message(weapon="stick", beat=true) {
        if(beat) {
            console.log(`You turned the ${this.name} into a puppy with ${weapon}`);
        } else {
            console.log(`${this.name}'s fangs turns red, gooddbye`);
        }
    }

}

    // Enemy Controls
    enemyBtns.forEach(btn => {
        btn.addEventListener("click", e => {
            const target = e.target;
            if(target.innerText === "Slime") {
                caveWindow.setAttribute("hidden", true);
                slimeWindow.removeAttribute("hidden");
            } else if(target.innerText === "Wolf") {
                caveWindow.setAttribute("hidden", true);
                wolfWindow.removeAttribute("hidden");
            }
        })
    })
    
    attackBtns.forEach(btn => {
        btn.addEventListener("click", e => {
            const target = e.target;
            if(target.classList.contains("slime")) {
                if(target.innerText === "Attack") {
                    const enemy = slime;
                    const dodged = Math.round(Math.random());
                    if(!dodged) {
                        enemy.message(true);
                    } else {
                        enemy.message(false);
                        playerHp -= enemy.attacK();
                        playerHpValue.innerText = playerHp;
                        console.log(playerHpValue.innerText);
                        infoTabDatas.hp = playerHpValue.value;
                    }
                }
            }
        })
    })


// class Enemy {
    //     constructor(name, minDamage, maxDamage, exp) {
        //         this.name = name;
        //         this.damage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);
        //         this.exp = exp;
        //     };
        // }
        
        // const slime = new Enemy("Slime", 10, 20, 2);
        // const wolf = new Enemy("Wolf", 20, 40, 8);
        
        



// Functions
function randomize(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

// console.log(`%c${slime.damage}`,"color: red;");






