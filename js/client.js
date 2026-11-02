//CLIENT CODE--------------------------------------------------------
let hostConn = null;

/**
 * Element
 */
const introPlayers = document.getElementById("playerList");

/**
 * CLIENT
 * Triggers when connecting to host
 */
function joinGame(){

    if(!isAlphaNumeric(document.getElementById("name").value)){
        alert("Please only use letters, numbers, spaces, or these symbols: , . ! ?");
        return;
    }

    const targetId = document.getElementById("code").value;
    hostConn = peer.connect(targetId); // Sets hostConn



    if(hostConn){
        hostConn.send([0,"Ping"]); // Sends a ping to start loop
        console.log("Connected")
        document.getElementById("joinGameBtn").disabled = true;
        document.getElementById("hostClaimBtn").disabled = true;
        myName = document.getElementById("name").value;
        document.querySelectorAll("#avatarCreatorDiv button").forEach((button) => {
            button.disabled = true;
        })
    }

    hostConn.on('data', function(data){
        messageRecieved(data, hostConn); // Handles data sent
    });

    // Sends name
    hostConn.on('open', function(){
        console.log("Hostconn: " + hostConn.peer);
        hostConn.send([6, avatar]);
        hostConn.send([2,document.getElementById("name").value]);
    });

    
    hostConn.on('close', function(){
        window.removeEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = '';
        });
        alert("You have been disconnected.")
        location.reload();
    })
}

peer.on('error', function(err){
    console.log(err);
    alert("Connection failed! Please try again. Error:".concat(err.type));
    document.getElementById("joinGameBtn").disabled = false;
    document.getElementById("hostClaimBtn").disabled = false;
    document.querySelectorAll("#avatarCreatorDiv button").forEach((button) => {
        button.disabled = true;
    })
    hostConn = null;
})

function clientUpdatePlayerlist(msg){
    document.getElementById("chatDiv").style.display = "flex";
    names = msg[0];
    avatars = msg[1];
    console.log(msg)
    introPlayers.innerHTML = ""
    document.getElementById("gamePlayerList").innerHTML = ""
    document.getElementById("whisperPlayerList").innerHTML = ""

    const hostWhisper = document.createElement('button');
    hostWhisper.addEventListener('click', () => {
        setWhisperTarget('host')
    })
    hostWhisper.innerText = "Host"
    document.getElementById("whisperPlayerList").appendChild(hostWhisper);
    
    document.getElementById("PSdisplay").innerHTML = ""
    names.forEach(cName => {
        const player = document.createElement('div');
        const playerName = document.createElement('p');
        player.classList.add("clientPlayerListPlayer");

        const avatarDiv = document.createElement('div');
        const avatarT = document.createElement('img');
        const avatarB = document.createElement('img');
        const avatarC = document.createElement('img');

        avatarDiv.classList.add("avatarWrapper");
        avatarDiv.style.height = "50px";

        avatarDiv.appendChild(avatarT);
        avatarDiv.appendChild(avatarB);
        avatarDiv.appendChild(avatarC);
    
        avatarT.classList.add("avatarT");
        avatarB.classList.add("avatarB");
        avatarC.classList.add("avatarC");

        console.log(names.indexOf(cName));
        console.log(msg[1][names.indexOf(cName)]);

        avatarT.src = `images/avatar/T${msg[1][names.indexOf(cName)][0]}.svg`
        avatarB.src = `images/avatar/B${msg[1][names.indexOf(cName)][1]}.svg`
        avatarC.src = `images/avatar/C${msg[1][names.indexOf(cName)][2]}.svg`

        playerName.textContent = cName;
        player.appendChild(avatarDiv);
        player.appendChild(playerName);

        document.getElementById("gamePlayerList").appendChild(player);

        const PLplayer = player.cloneNode(true)
        document.getElementById("playerList").appendChild(PLplayer);
        
        const PSplayer = player.cloneNode(true);
        document.getElementById("PSdisplay").appendChild(PSplayer);
        PSplayer.classList.add("PSplays");
        PSplayer.dataset.player = (names.indexOf(cName));

        const whisperPlayer = player.cloneNode(true);
        const whisperButton = document.createElement('button');
        whisperButton.appendChild(whisperPlayer);

        whisperButton.addEventListener('click', ()=>{
            setWhisperTarget(names.indexOf(cName));
        })
        document.getElementById("whisperPlayerList").appendChild(whisperButton);

    })
}


function avatarChange(id, spClass){
    switch(id){
        case 0:
            avatar[0]--;
            if(avatar[0]==-1){avatar[0]=7;}
            break;
        case 1:
            avatar[1]--;
            if(avatar[1]==-1){avatar[1]=7;}
            break;
        case 2:
            avatar[2]--;
            if(avatar[2]==-1){avatar[2]=7;}
            break;
        case 3:
            avatar[0]++;
            if(avatar[0]==8){avatar[0]=0;}
            break;
        case 4:
            avatar[1]++;
            if(avatar[1]==8){avatar[1]=0;}
            break;
        case 5:
            avatar[2]++;
            if(avatar[2]==8){avatar[2]=0;}
            break;
    }
    document.querySelector(`.${spClass}.avatarT`).src = `images/avatar/T${avatar[0]}.svg`
    document.querySelector(`.${spClass}.avatarC`).src = `images/avatar/C${avatar[2]}.svg`
    document.querySelector(`.${spClass}.avatarB`).src = `images/avatar/B${avatar[1]}.svg`
    if(hostConn){
        hostConn.send([6, avatar]);
    }
}
