
let playing = false;

// --------------HOST CONNECTION---------------

function startGame(){
    connections.forEach(conn => {
        conn.send([7,[roles[connections.indexOf(conn)],document.getElementById("covenExpansionCheckbox").checked]]);
    });
    document.getElementById("hostIntroBoard").style.display = "none";
    document.getElementById("hostPlayingBoard").style.display = "flex";
    let timer1 = setInterval(() => {
        document.getElementById("hostWaitAlert").style.display = "none";
    }, 4000)
    document.getElementById("trialVoteUpdate").innerText = trial;
    document.getElementById("voteUpdate").innerText = votes;
}

function setTime(time){
    connections.forEach(conn => {
        conn.send([9, time]);
    })
}


let timerVal = 0
let currentTimer = null

function timer(option){
    if(option==="start"){
        timerVal = document.getElementById("timerInput").value; 
        currentTimer = setInterval(() => {
            timerVal--;
            document.querySelectorAll(".timer").forEach((element) => {
                element.innerText = timerVal;
                connections.forEach(conn => {
                    conn.send([11, timerVal])
                })
            });
            if(timerVal <= 0){
                clearInterval(currentTimer);
            }
        }, 1000)
    }
    if(option==="stop" && !currentTimer){
        clearInterval(currentTimer);
    }
}


const votes = [];

function updateVoters(msg, voter){
    votes[voter] = msg;
    document.getElementById("voteUpdate").innerText = votes;
}

const trial = [];

function updateTrialVotes(msg, voter){
    trial[voter] = msg;
    document.getElementById("trialVoteUpdate").innerText = trial;
}

let day = 0;

function dayChange(isIncrease){
    day += isIncrease?1:-1;
    document.getElementById("dayDisplay").innerText = day;
    connections.forEach(conn =>{
        conn.send([13, day]);
    })
}


// --------------CLIENT CONNECTION--------------

let myRole = "none"

let currentDay = 0
let currentTime = 3

let roleShowing = false;

function getRoleByName(targetName) {
    return Object.values(ALLROLES)
        .flat()
        .find(role => role.name === targetName);
}

function gameStart(msg){
    role = msg[0]
    myRole = getRoleByName(role)
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
    document.getElementById("showRoleImg").src = `./images/roles/${role.replaceAll(" ", "")}.svg`; 
    document.getElementById("showRoleImg").style.height = "30vh";
    document.getElementById("showRoleImg").style.aspectRatio = "5/7"
    card.src = `./images/roles/${role.replaceAll(" ", "")}.svg`;
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
        changeTime(0);
        clearInterval(timer2);
    }, 4000)

    document.querySelectorAll(".PSplays").forEach((icon) => {
        icon.style.display = "none";
    })
    document.querySelectorAll(".actionSelectorPlayer").forEach((icon) => {
        icon.style.display = "none";
    })
    document.querySelectorAll('.PSplays[data-player="0"]')[0].style.display = "flex";
    document.querySelectorAll('.player0[data-player="0"]')[0].style.display = "flex";
    document.querySelectorAll('.player1[data-player="0"]')[0].style.display = "flex";
    
    document.querySelectorAll(".abilitySelector").forEach((icon) => {
        icon.style.display = "none";
    })
    console.log(myRole.ui);
    console.log("ability")
    switch(myRole.ui){
        case "0":
            document.querySelector(".abilitySelector[data-uitype='2']").style.display = "flex";
            document.getElementById("ui2text").innerText = myRole.button;
            break;
        case "2":
            document.querySelector(".abilitySelector[data-uitype='0']").style.display = "flex";
            document.querySelector(".abilitySelector[data-uitype='2']").style.display = "flex";
            document.getElementById("ability0").innerText = myRole.button.split("|")[0];
            document.getElementById("ui2text").innerText = myRole.button.split("|")[1];
            break;
        case "3":
            document.querySelector(".abilitySelector[data-uitype='0']").style.display = "flex";
            document.querySelector(".abilitySelector[data-uitype='3']").style.display = "flex";
            document.getElementById("ability0").innerText = myRole.button;
            break;
        case "4":
            document.querySelector(".abilitySelector[data-uitype='0']").style.display = "flex";
            document.querySelector(".abilitySelector[data-uitype='1']").style.display = "flex";
            document.getElementById("ability0").innerText = myRole.button.split("|")[0];
            document.getElementById("ability1").innerText = myRole.button.split("|")[1];
            break;
        case "5":
            document.querySelector(".abilitySelector[data-uitype='0']").style.display = "flex";
            document.querySelector(".abilitySelector[data-uitype='4']").style.display = "flex";
            document.getElementById("ability0").innerText = myRole.button;
            break;
        case "6":
            document.querySelector(".abilitySelector[data-uitype='0']").style.display = "flex";
            document.getElementById("ability0").innerText = myRole.button;
            break;
        case "7":
            document.querySelector(".abilitySelector[data-uitype='6']").style.display = "flex";
            break;
        case "8":
            document.querySelector(".abilitySelector[data-uitype='0']").style.display = "flex";
            document.querySelector(".abilitySelector[data-uitype='5']").style.display = "flex";
            document.getElementById("ability0").innerText = myRole.button;
            break;
    }
    
    covenExpansion = msg[1]

    document.querySelectorAll(".covenExpansion").forEach((element) => {
        element.style.display = covenExpansion?"flex":"none";
    })

    document.querySelectorAll(".unCovenExpansion").forEach((element) => {
        element.style.display = covenExpansion?"flex":"none";
    })
    switchTabs('gamePlayerList')
}

function switchTabs(tab){

    let topBarTabs = document.getElementsByClassName("topBarTabs");

    Array.prototype.forEach.call(topBarTabs, function(topBarTab) {
        topBarTab.style.display = "none";
    });

    document.getElementById(tab).style.display = "flex";
    
}

function markDead(ind){
    document.querySelectorAll(`[data-player="${ind}"]`).forEach(player => {
        player.style.display = "none";
    });    
    document.getElementById("graveyard").querySelector(`[data-player="${ind}"]`).style.display = "flex";
}   

function revive(ind){
    document.querySelectorAll(`[data-player="${ind}"]`).forEach(player => {
        player.style.display = "flex";
    });    
    document.getElementById("graveyard").querySelector(`[data-player="${ind}"]`).style.display = "none";
}

function changeTime(time){
    currentTime = time;
    const timeTeller = document.getElementById('time');
    chatDisabled(false);
    document.getElementById('playerSelector').style.display = "none";
    document.getElementById('trialSelector').style.display = "none";
    document.getElementById("abilitySelectorWrapper").style.display = "none";
    roleShowing = false;
    switch (time){
        case 0:
        case 3:
            chatDisabled(true);
            timeTeller.innerText = `Day ${currentDay}, Announcements`;
            break;
        case 1:
            timeTeller.innerText = `Day ${currentDay}, Discussion`;
            break;
        case 2:
            document.getElementById('playerSelector').style.display = "flex";
            timeTeller.innerText = `Day ${currentDay}, Voting`;
        break;
        case 4:
            document.getElementById('trialSelector').style.display = "flex";
            timeTeller.innerText = `Day ${currentDay}, Voting`;
        break;
        case 5:
            roleShowing = true;
            document.getElementById("abilitySelectorWrapper").style.display = hidden?"none":"flex"
            timeTeller.innerText = `Night ${currentDay}`;
            break;
        case 6:
            timeTeller.innerText = `Evening ${currentDay}`;
            break;


    }
}

function chatDisabled(disabled){
    whisperTarget = "";
    document.querySelectorAll('#chatInputWrapper button').forEach((button)=>{
        button.disabled = disabled;
    });
    document.getElementById("chatInput").placeholder = (disabled ? "Chat disabled" : "Type here")
    document.getElementById("chatInput").disabled = disabled;
}

let currentFocus = 0;

function moveVote(isDown){
    retractVote();
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

function submitVote(){
    hostConn.send([10, currentFocus]);
}

function retractVote(){
    hostConn.send([10, -1]);
}

let hidden = false

function showRole(){
    if(hidden){
        document.getElementById("showRole").innerHTML = `<img id="showRoleImg" src="./images/roles/${myRole.name.replaceAll(" ", "")}.svg" style="height: 30vh; aspect-ratio: 5 / 7;">`
    }else{
        document.getElementById("showRole").innerHTML = `<p>Hidden... Press to reveal!</p>`
    }
    console.log(roleShowing);
    console.log(hidden);
    if(roleShowing){
        document.getElementById("abilitySelectorWrapper").style.display = hidden?"flex":"none";
    }
    hidden = !hidden
}

function vote(option){
    document.getElementById("trialSelector").querySelectorAll("button").forEach(button => {
        button.style.backgroundColor = "#F7FFC2";
        button.style.color = "#380060";
        button.style.borderWidth = "0px";
    })
    document.getElementById(option).style.backgroundColor = "#380060";
    document.getElementById(option).style.borderWidth = "10px";
    document.getElementById(option).style.borderColor = "#F7FFC2";
    document.getElementById(option).style.color = "#F7FFC2";  

    hostConn.send(12, option);
}

function updateTimer(time){
    document.getElementById("timerDisplay").innerHTML = "Time:".concat(time);
}

let abilityFocus = 0;

function moveSelector(ind, isDown){
    retractVote();
    document.querySelectorAll(".player".concat(ind)).forEach((icon) => {
        icon.style.display = "none";
    })
    if(isDown){
        abilityFocus--;
    }else{
        abilityFocus++;
    }
    if(abilityFocus<0){
        abilityFocus = names.length-1;
    }
    if(abilityFocus>=names.length){
        abilityFocus = 0;
    }
    document.querySelectorAll(`.PSplays[data-player="${abilityFocus}"]`)[0].style.display = "flex";
}

function specialGameStart(role){
    clientUpdatePlayerlist([["AAA","BBB","CCC"],[[0,0,0],[1,1,1],[2,2,2]]]);
    gameStart(role);
}

function dayUpdate(change){
    currentDay = change;
}