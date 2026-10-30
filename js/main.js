//PEER CODE--------------------------------------------------------


// Helper 
const isAlphaNumeric = str => /^[a-z0-9 ,.!?]*$/gi.test(str);

/**
 * The user's avatar
 */
const avatar = [0,0,0];

/**
 * Peer
 * Copies a text to user's clipboard
 * @param {*} text 
 */
async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard successfully!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

/**
 * String
 * The display names for every client
 */
let names = [];

/**
 * Boolean
 * Is the host
 */
let host = false;

/**
 * Peer
 * The user's peer 
 */
const peer = new Peer();

/**
 * Watchdog boolean that is constantly flipped to check connectivity
 */
let disconnect = false;  

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});

setInterval(() => {
    //Client send ping out
    if(hostConn){
        hostConn.send([0,"Ping"])
        console.log("Ping")
        if(!disconnect){
            disconnect=true
        }else{
            window.removeEventListener('beforeunload', function (e) {
                e.preventDefault();
                e.returnValue = '';
            });
            alert("You have been disconnected.")
            location.reload();
        }
    //Peer check if id is there
    if(!peer.id){
        document.body.style.backgroundColor = "#ff0000";
    }
    
    }
}, 10000);

/**
 * PEER
 * Changes between client mode and host mode
 * When hosting peer.id is copied to user's clipboard
 */
function claimHost(){
    host = !host
    if(host){
        copyId();
        document.getElementById("hostIntroBoard").style.display = "flex"
        document.getElementById("playerIntroBoard").style.display = "none"
    }else{
        document.getElementById("hostIntroBoard").style.display = "none"
        document.getElementById("playerIntroBoard").style.display = "flex" 
    }
}

function copyId(){
    copyTextToClipboard(peer.id);
}

// PEER
// Listens for 
peer.on('connection', function(conn){
    handleConnections(conn);
})

/**
 * PEER
 * Runs whenever a connection is made
 * @param {DataConnection} conn  
 */
function handleConnections(conn){
    conn.on('data', function(data){
        messageRecieved(data, conn);
    })
}

/**
 * PEER
 * Master function for handling messages
 * @param {int} data 
 * @param {Array} conn 
 */
function messageRecieved(data, conn){
    let msg = data[1];
    switch(data[0]){
        case 0:
            disconnected[connections.indexOf(conn)] = false;
            conn.send([1,"Pong"]);
            console.log("Pong");
            break;
        case 1:
            disconnect = false
            console.log("Sent");
            break;
        case 2:
            if(!playing){
                newPlayer(msg, conn);
            }
            break;
        case 3:
            names = msg;
            console.log(msg)
            introPlayers.innerHTML = ""
            msg.forEach(cName => {
                const liElem = document.createElement('li');
                liElem.textContent = cName;
                introPlayers.appendChild(liElem);
            })
            break;
        case 4:
            sendChatUpdate(connections.indexOf(conn), msg);
            break;
        case 5:
            updateChatbox(msg);
            break;
        case 6:
            avatars.push(msg);
            break;
        case 7:
            gameStart(msg);
            break;
    }

}

function updateChatbox(msg){
    const newP = document.createElement('p');
    let name = names[msg[0]];
    if(msg[0]==-1){
        name = "Host"
    }
    newP.innerText = name + ": " + (msg[1]);
    document.getElementById('chatHistory').appendChild(newP)
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

function randomAvatar(){
    avatar[0] = Math.floor(Math.random()*8);
    avatar[1] = Math.floor(Math.random()*8);
    avatar[2] = Math.floor(Math.random()*8);
    document.querySelector(`.changer.avatarT`).src = `images/avatar/T${avatar[0]}.svg`
    document.querySelector(`.changer.avatarC`).src = `images/avatar/C${avatar[2]}.svg`
    document.querySelector(`.changer.avatarB`).src = `images/avatar/B${avatar[1]}.svg`
    if(hostConn){
        hostConn.send([6, avatar]);
    }
}

function whisper(){
    document.getElementById('whisperPlayerList').showModal();
    
    // if(host){
    // }else{
    // }
}

//HOST CODE--------------------------------------------------------
/**
 * DataConnection Array
 * The display connection object for every client
 */
const connections = [];

const avatars = [];
const roles = [];
const disconnected = [];

let selectedPlayer = -1;

function updatePlayerlist(){
    const playerConfig = document.getElementById("playerConfig")
    
    playerConfig.innerHTML = "";
    names.forEach(cName => {
        const playerDiv = document.createElement('div');
        const playerName = document.createElement('h1');
        const role = document.createElement('button');
        playerName.textContent = cName;
        playerConfig.appendChild(playerDiv);
        
        playerDiv.classList.add("playerConfigRow");
        playerDiv.id = "playerDiv-".concat(names.indexOf(cName));

        playerDiv.classList.add(names.indexOf(cName));
        playerName.classList.add(names.indexOf(cName));
        role.classList.add(names.indexOf(cName));
        role.classList.add("roleBtn");

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

        avatarT.src = `images/avatar/T${avatars[names.indexOf(cName)][0]}.svg`
        avatarB.src = `images/avatar/B${avatars[names.indexOf(cName)][1]}.svg`
        avatarC.src = `images/avatar/C${avatars[names.indexOf(cName)][2]}.svg`

        const kickButton = document.createElement('button');
        kickButton.innerText = "Kick";

        playerDiv.appendChild(kickButton);
        playerDiv.cloneNode(avatarDiv);
        playerDiv.appendChild(playerName);
        playerDiv.appendChild(role);
        
        role.addEventListener('click', () => {
            setRole();
            selectedPlayer = names.indexOf(cName)
        })
        kickButton.addEventListener('click', () => {
            kick(names.indexOf(cName));
        })
        
        const whisperButtonDiv = document.createElement('button');
        const whisperButtonIcon = avatarDiv.cloneNode(true);
        const whisperButtonName = document.createElement('p');

        whisperButtonName.innerText = cName;

        whisperButtonDiv.append(whisperButtonIcon);
        whisperButtonDiv.append(whisperButtonName);

        document.getElementById("whisperPlayerList").append(whisperButtonDiv);
    })
}

function newPlayer(msg, conn){
    connections.push(conn);
    let newName = msg;
    let extend = 2
    while(names.indexOf(newName) != -1){
        newName = msg.concat(extend);
        extend++;
    }
    names.push(newName);
    connections.forEach(cConn => {
        cConn.send([3, names]);        
    })
    updatePlayerlist();
    disconnected.push(false);
    setInterval(()=>{
        if(disconnected[connections.indexOf(conn)]){
            alert(`Player ${connections.indexOf(conn)+1} has disconnected`);
            kick(connections.indexOf(conn)+1);
            clearInterval();
        }else{
            disconnected[connections.indexOf(conn)] = true;
        }
    },10000)
}

function kick(player){
    connections[player].close();
    connections.splice(player, 1);
    names.splice(player, 1);
    avatars.splice(player, 1);
    updatePlayerlist();
}

function setRole(){
    const roleSelect = document.getElementById('roleSelect');
    const roleMenuStart = document.getElementById('RMstart');
    roleSelect.showModal();
    transfer('RMstart')
}

function submitRole(){
    roles[selectedPlayer] = focusedRole;
    roleSelect.close();
    document.getElementById("playerDiv-".concat(selectedPlayer)).querySelector(".roleBtn").innerText = focusedRole;
}

function sendChatUpdate(id, text){
    connections.forEach((conn) => {
        conn.send([5, [id, text]]);
        console.log(conn);
    } )
    updateChatbox([id, text]);
}

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
        return
    }

    const targetId = document.getElementById("code").value;
    hostConn = peer.connect(targetId); // Sets hostConn

    if(hostConn){
        hostConn.send([0,"Ping"]); // Sends a ping to start loop
        console.log("Connected")
        document.getElementById("joinGameBtn").disabled = true;
        document.getElementById("hostClaimBtn").disabled = true;
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
    if(err.type==='peer-unavailable'){
        alert("Connection failed! Please try again.");
        document.getElementById("joinGameBtn").disabled = false;
        document.getElementById("hostClaimBtn").disabled = false;
        document.querySelectorAll("#avatarCreatorDiv button").forEach((button) => {
            button.disabled = true;
        })
        hostConn = null;
    }
})

function sendMsg(msg){
    if(!hostConn){
        if(host){
            sendChatUpdate(-1, msg);
        }
        return;
    }
    if(isAlphaNumeric(msg)){
        hostConn.send([4,msg]);
    }else{
        const errorMsg = document.getElementById("chatError");
        if(errorMsg.style.display = "flex"){
            return;
        }
        errorMsg.style.display = "flex";
        setTimeout(function(){
            errorMsg.style.display = "none";
        }, 2000);
    }
}

