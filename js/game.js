
let playing = false;

// --------------HOST CONNECTION---------------

let playerAttack = [];
let playerDefense = [];

let mayorRevealed = false;


function startGame(){
    connections.forEach(conn => {
        conn.send([STARTGAME,[roles[connections.indexOf(conn)],document.getElementById("covenExpansionCheckbox").checked]]);
    });
    document.getElementById("hostIntroBoard").style.display = "none";
    document.getElementById("hostPlayingBoard").style.display = "flex";
    let timer1 = setInterval(() => {
        document.getElementById("hostWaitAlert").style.display = "none";
    }, 4000)
    document.getElementById("trialVoteUpdate").innerText = trial;
    document.getElementById("voteUpdate").innerText = votes;
    roles.forEach((role, ind) => {

        playerAttack.push(getRoleByName(role).attack);
        playerDefense.push(getRoleByName(role).defense);

        document.querySelectorAll(`.hostBoardPlayer[data-player="${ind}"]`)[0].querySelectorAll(".att")[0].value = getRoleByName(role).attack;
        document.querySelectorAll(`.hostBoardPlayer[data-player="${ind}"]`)[0].querySelectorAll(".def")[0].value = getRoleByName(role).defense;
        
        document.querySelectorAll(`.hostBoardPlayer[data-player="${ind}"]`)[0].querySelectorAll(".roleBtn")[0].innerText = role;
    })
    playing = true;
}

let hostTime = 0;

function setTime(time){
    hostTime = time;
    connections.forEach(conn => {
        conn.send([TIMECHANGE, time]);
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
                    conn.send([TIMERCHANGE, timerVal])
                })
            });
            if(timerVal <= 0){
                clearInterval(currentTimer);
            }
        }, 1000)
    }
    if(option==="stop" && currentTimer){
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
        conn.send([DAYCHANGE, day]);
    })
}

function computeAction(action, player){
    console.log("computer action");
    const playerBoard = document.querySelectorAll(`.hostBoardPlayer[data-player="${player}"]`)[0];
    playerBoard.querySelectorAll(".hostBoardAction")[0].innerText = action;
}

function roleBlockJP(msg){
    let isJailor = msg[0];
    let target = msg[1];
    
    connections[target].send([JAILEDPIRATED, isJailor])
}

function updateText(msg, player){
    let newText = msg[0];
    let isLastWill = msg[1];

    const elementToChange = document.querySelector(`.hostBoardPlayer[data-player="${player}"] ${(isLastWill)?".lastWill":".deathNote"}`);
    elementToChange.innerText = newText;
}


// --------------CLIENT CONNECTION--------------

let myRole = "none"

let currentDay = 0
let currentTime = 3

let roleShowing = false;

let amRoleBlocked = false;

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
    document.querySelectorAll('.dayPlayer0[data-player="0"]')[0].style.display = "flex";
    
    document.querySelectorAll(".abilitySelector").forEach((icon) => {
        icon.style.display = "none";
    })
    document.querySelectorAll('.abilitySelector[data-uitype="-1"]')[0].style.display = "flex";
    document.querySelectorAll('.dayAbilitySelector[data-uitype="-1"]')[0].style.display = "flex";
    console.log(myRole.ui);
    console.log("ability")
    switch(myRole.ui){
        case "0":
            document.querySelector(".abilitySelector[data-uitype='2']").style.display = "flex";
            document.getElementById("ui2text").innerText = myRole.button;
            break;
        case "1":
            document.querySelectorAll('.abilitySelector[data-uitype="-1"]')[0].style.display = "none";
            document.getElementById("reason").innerText = "You're role usually doesn't do anything at night'";
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
        case "9":
            document.querySelector(".abilitySelector[data-uitype='2']").style.display = "flex";
            document.getElementById("ui2text").innerText = myRole.button;
            document.querySelectorAll('.abilitySelector[data-uitype="-1"]')[0].style.display = "none";

    } 

    switch(myRole.dayUi){
        case "0":
            document.querySelector(".dayAbilitySelector[data-uitype='-1']").style.display = "none";
            break;
        case "1":
            document.querySelector(".dayAbilitySelector[data-uitype='0']").style.display = "flex";
            document.getElementById("dayAbility0").innerText = myRole.dayUiButton;
            break;
        case "2":
            document.querySelector(".dayAbilitySelector[data-uitype='1']").style.display = "flex";
            document.getElementById("dayAbility1").innerText = myRole.dayUiButton;
            document.querySelector(".dayAbilitySelector[data-uitype='-1']").style.display = "none";
            break;

            
    }
    
    covenExpansion = msg[1]

    document.querySelectorAll(".covenExpansion").forEach((element) => {
        element.style.display = covenExpansion?"flex":"none";
    })

    document.querySelectorAll(".unCovenExpansion").forEach((element) => {
        element.style.display = (!covenExpansion)?"flex":"none";
    })
    switchTabs('gamePlayerList');

    if(myRole.hasDeathNote === "TRUE"){
        document.getElementById("DeathNoteBtn").style.display = "flex"
    }else{
        document.getElementById("DeathNoteBtn").style.display = "none"
    }
    
    if(myRole.name === "Forger"){
        document.getElementById("forgeryBtn").style.display = "flex"
    }else{
        document.getElementById("forgeryBtn").style.display = "none"
    }

    playing = true;
}

function switchTabs(tab){
    let target = tab
    if(myRole.name === "Jailor" && target === "deathNote"){
        target = "jailorDeathNote";
    }

    let topBarTabs = document.getElementsByClassName("topBarTabs");

    Array.prototype.forEach.call(topBarTabs, function(topBarTab) {
        topBarTab.style.display = "none";
    });

    document.getElementById(target).style.display = "flex";
    
}

document.querySelector("#jailorDeathNote select").addEventListener('change', () => {

})

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
    document.getElementById("roleBlockedDiv").style.display = "none"
    roleShowing = false;
    if(!hidden){
        document.getElementById("dayAbilitySelectorWrapper").style.display = "flex"
    }
    jailed = false;
    pirated = false;
    switch (time){
        case 0:
            amRoleBlocked = false; 
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
            document.getElementById("dayAbilitySelectorWrapper").style.display = "none"
            roleShowing = true;
            timeTeller.innerText = `Night ${currentDay}`;
            if(!hidden){
                document.getElementById("abilitySelectorWrapper").style.display = !amRoleBlocked?"flex":"none";
                document.getElementById("roleBlockedDiv").style.display = amRoleBlocked?"flex":"none";
            } 
            if(myRole.dayUi === '1' && !document.querySelector(".dayAbilitySelector[data-uitype='-1'] input").checked){
                hostConn.send([RBASJAILPIR, [(myRole.name==="Jailor"),abilityFocus[0]]])
            }else if(myRole.dayUi === '1' && document.querySelector(".dayAbilitySelector[data-uitype='-1'] input").checked){
                document.getElementById("abilitySelectorWrapper").style.display = "none";
                document.getElementById("noActionTonight").style.display = "flex";
                document.getElementById("reason").innerText = "You didn't choose anyone during the day.";
            }
            if(myRole.ui === '1'){
                document.getElementById('noActionTonight').style.display('flex');
            }
            nightChat();
            break;
        case 6:
            timeTeller.innerText = `Day Break ${currentDay}`;
            submitAction();
            document.getElementById("pirated").close();
            document.getElementById("lastWillText").disabled = true;
            chatDisabled(true);
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
    hostConn.send([VOTE, currentFocus]);
}

function retractVote(){
    hostConn.send([VOTE, -1]);
}

let hidden = false

function showRole(){
    if(hidden){
        document.getElementById("showRole").innerHTML = `<img id="showRoleImg" src="./images/roles/${myRole.name.replaceAll(" ", "")}.svg" style="height: 30vh; aspect-ratio: 5 / 7;">`
        document.getElementById("DeathNoteBtn").style.display = (myRole.hasDeathNote === "TRUE")?"flex":"none";
        document.getElementById("forgeryBtn").style.display = (myRole.name === "Forger")?"flex":"none";
    }else{
        document.getElementById("showRole").innerHTML = `<p>Hidden... Press to reveal!</p>`
        document.getElementById("DeathNoteBtn").style.display = "none";
        document.getElementById("forgeryBtn").style.display = "none";
    }
    console.log(roleShowing);
    console.log(hidden);
    hidden = !hidden    
    if(roleShowing && !hidden){
        document.getElementById("abilitySelectorWrapper").style.display = !amRoleBlocked?"flex":"none";
        document.getElementById("roleBlockedDiv").style.display = amRoleBlocked?"flex":"none";
    }else{
        document.getElementById("abilitySelectorWrapper").style.display = "none";
        document.getElementById("roleBlockedDiv").style.display = "none";
    }
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

let abilityFocus = [0,0];

function moveSelector(ind, isDown){
    retractVote();
    document.querySelectorAll(".player".concat(ind)).forEach((icon) => {
        icon.style.display = "none";
    })
    if(isDown){
        abilityFocus[ind]--;
    }else{
        abilityFocus[ind]++;
    }
    if(abilityFocus[ind]<0){
        abilityFocus[ind] = names.length-1;
    }
    if(abilityFocus[ind]>=names.length){
        abilityFocus[ind] = 0;
    }
    document.querySelectorAll(`.player${ind}[data-player="${abilityFocus[ind]}"]`)[0].style.display = "flex";
}

let dayAbilityFocus = [0];

function dayMoveSelector(ind, isDown){
    retractVote();
    document.querySelectorAll(".dayPlayer".concat(ind)).forEach((icon) => {
        icon.style.display = "none";
    })
    if(isDown){
        dayAbilityFocus[ind]--;
    }else{
        dayAbilityFocus[ind]++;
    }
    if(dayAbilityFocus[ind]<0){
        dayAbilityFocus[ind] = names.length-1;
    }
    if(dayAbilityFocus[ind]>=names.length){
        dayAbilityFocus[ind] = 0;
    }
    document.querySelectorAll(`.dayPlayer${ind}[data-player="${dayAbilityFocus[ind]}"]`)[0].style.display = "flex";
}

function specialGameStart(role){
    clientUpdatePlayerlist([["AAA","BBB","CCC"],[[0,0,0],[1,1,1],[2,2,2]]]);
    gameStart([role,true]);
}

function dayUpdate(change){
    currentDay = change;
}


function submitAction(){
    let action = ""
    switch(myRole.ui){
        case "0":
            action = `${myRole.button} ${document.getElementById("abilityCheckbox").value}`;
            break;
        case "1":
            if(myRole.name === "Jailor"){
                action = `${myRole.button} ${abilityFocus[0]}`
            }else{
                action = "No action"
            }
            break;
        case "2":
            action = `${myRole.button.split("|")[0]} ${abilityFocus[0]} Cautious: ${document.getElementById("abilityCheckbox").value}`
            break;
        case "3":
            action = `${myRole.button.split("|")[0]} ${abilityFocus[0]} with "${hypnoSelect.value}"`;
            break;
        case "4":
            action = `${myRole.button.split("|")[0]} ${abilityFocus[0]} and ${myRole.button.split("|")[1]} ${abilityFocus[1]}`;
            break;
        case "5":
            action = `${myRole.button.split("|")[0]} ${abilityFocus[0]} with ${document.getElementById("potionSelect").value}`
            break;
        case "6":
            action = `${myRole.button} ${abilityFocus[0]}`
            break;
        case "7":
            action = `${document.getElementById('piratePicker').value}`
            break;
        case "8":
            action = `Forge ${abilityFocus[0]} as ${document.getElementById("roleForgeSelect").value}`
            break;
    }
    if(amRoleBlocked){
        if(pirated){
            action = `Pirate Defense: ${document.getElementById("pirateDefender").value}`
        }
    }
    hostConn.send([NIGHTACTION,action])
}

function changeRole(msg){
    gameStart([msg,covenExpansion]);    
}


// Role specific functions

let pirated = false;
let jailed = false;

function showMayorPopup(mayor){
    document.querySelectorAll("#mayorHasRevealed h3")[0].innerText = `${names[mayor]} has revealed themself as the mayor!`
    document.getElementById("mayorHasRevealed").showModal();
}

function mayorReveal(){
    hostConn.send([REVEALASMAYOR,""])
    mayorRevealed = true;
    document.getElementById("revealYourselfMayor").close();
}

function roleBlocked(isJailor){
    amRoleBlocked = true;
    if(!hidden){
        document.getElementById("abilitySelectorWrapper").style.display = !amRoleBlocked?"flex":"none";
        document.getElementById("roleBlockedDiv").style.display = amRoleBlocked?"flex":"none";
    }
    if(isJailor){
        jailed = true;
        document.getElementById("jailed").style.display = "flex";
    }else{
        pirated = true;
        document.getElementById("pirated").showModal();
    }
}

function nightChat(){
    if(!jailed && myRole.chat == "0"){
        chatDisabled(true);
    }
}