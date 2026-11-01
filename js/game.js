
let playing = false;

// --------------HOST CONNECTION---------------

function startGame(){
    connections.forEach(conn => {
        conn.send([7,roles[connections.indexOf(conn)]]);
    });

}


// --------------CLIENT CONNECTION--------------

let myRole = "none"

function gameStart(role){
    const subtext = document.getElementById("roleRevealSubtext");
    const card = document.getElementById("roleRevealCards");
    document.getElementById("playerIntroBoard").style.display = "none";
    document.getElementById("roleRevealIntro").style.display = "flex";
    document.getElementById("chatDiv").style.display = "none";
    document.getElementById("playingRoleList").appendChild(document.getElementById("roleMenuTemp").cloneNode(true));
    roleIter(document.getElementById("playingRoleList"), "pla")
    transfer('RMstartpla');
    console.log(role);
    document.getElementById("showRoleImg").src = `./images/roles/${role}.svg`; 
    document.getElementById("showRoleImg").style.height = "30vh";
    document.getElementById("showRoleImg").style.aspectRatio = "5/7"
    card.src = `./images/roles/${role}.svg`;
    card.style.height = "30vh";
    card.style.aspectRatio = "5/7";
    subtext.innerText = `${role}`;
    setInterval(() => {
        subtext.style.display = "flex";
        card.style.display = "flex";
    }, 1500)
    setInterval(() => {
        document.getElementById("roleReveal").style.display = "none";
        document.getElementById("playerPlayingBoard").style.display = "flex";
        document.getElementById("chatDiv").style.display = "flex";
    }, 4000)
}

function switchTabs(tab){

    let topBarTabs = document.getElementsByClassName("topBarTabs");

    Array.prototype.forEach.call(topBarTabs, function(topBarTab) {
        topBarTab.style.display = "none";
    });

    document.getElementById(tab).style.display = "flex";

}

function markDead(ind){
    
}