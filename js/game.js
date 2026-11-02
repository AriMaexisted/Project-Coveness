
let playing = false;

// --------------HOST CONNECTION---------------

function startGame(){
    connections.forEach(conn => {
        conn.send([7,roles[connections.indexOf(conn)]]);
    });


}

function setTime(time){
    connections.forEach(conn => {
        conn.send([9, time]);
    })
}


// --------------CLIENT CONNECTION--------------

let myRole = "none"

let currentDay = 0
let currentTime = 3

function gameStart(role){
    myRole = role
    document.getElementById("playerPlayingBoard").style.display = "flex";
    const subtext = document.getElementById("roleRevealSubtext");
    const card = document.getElementById("roleRevealCards");
    document.getElementById("playerIntroBoard").style.display = "none";
    document.getElementById("playingMenu").style.display = "none";
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
    let timer1 = setInterval(() => {
        subtext.style.display = "flex";
        card.style.display = "flex";
        document.getElementById("roleReveal").style.display = "flex";
        clearInterval(timer1);
    }, 1500)
    let timer2 = setInterval(() => {
        document.getElementById("roleReveal").style.display = "none";
        document.getElementById("chatDiv").style.display = "flex";
        document.getElementById("playingMenu").style.display = "flex";
        clearInterval(timer2);
    }, 4000)

    document.querySelectorAll(".PSplays").forEach((icon) => {
        icon.style.display = "none";
    })
    document.querySelectorAll('.PSplays[data-player="0"]')[0].style.display = "flex";
}

function switchTabs(tab){

    let topBarTabs = document.getElementsByClassName("topBarTabs");

    Array.prototype.forEach.call(topBarTabs, function(topBarTab) {
        topBarTab.style.display = "none";
    });

    document.getElementById(tab).style.display = "flex";
    
}

function markDead(ind){
    document.querySelectorAll(`.PSplays[data-player="${ind}"]`)[0].style.display = "none";
    deadPlayer = document.querySelectorAll(`.PSplays[data-player="${ind}"]`)[0].cloneNode(true);
    graveyard.appendChild(deadPlayer);
}

function changeTime(time){
    currentTime = time;
    const timeTeller = document.getElementById('time');
    document.getElementById('.PSselector').style.display = "none";
    switch (time){
        case 0:
        case 3:
            document.querySelectorAll('.chatInputWrapper button').forEach((button)=>{
                button.disabled = true;
            });
            timeTeller.innerText = `Day ${currentDay}, Announcements`;
            break;
        case 1:
            document.querySelectorAll('.chatInputWrapper button').forEach((button)=>{
                button.disabled = true;
            });
            timeTeller.innerText = `Day ${currentDay}, Discussion`;
            break;
        case 2:
            document.getElementById('PSselector').style.display = "flex";
            timeTeller.innerText = `Day ${currentDay}, Voting`;
        break;
        case 4:
            document.getElementById('PSselector').style.display = "flex";
            timeTeller.innerText = `Night ${currentDay}`;
        break;

    }
}

let currentFocus = 0;

function moveVote(isDown){
    document.querySelectorAll(".PSplays").forEach((icon) => {
        icon.style.display = "none";
    })
    if(isDown){
        currentFocus--;
    }else{
        currentFocus++;
    }
    if(currentFocus<0){
        currentFocus = names.length-1;
    }
    if(currentFocus>=names.length){
        currentFocus = 0;
    }
    document.querySelectorAll(`.PSplays[data-player="${currentFocus}"]`)[0].style.display = "flex";
}

let hidden = false

function showRole(){
    if(hidden){
        document.getElementById("showRole").innerHTML = `<img id="showRoleImg" src="./images/roles/${myRole}.svg" style="height: 30vh; aspect-ratio: 5 / 7;">`
    }else{
        document.getElementById("showRole").innerHTML = `<p>Hidden... Press to reveal!</p>`
    }
    hidden = !hidden
}