//PEER CODE--------------------------------------------------------


const PING = 0;
const PONG = 1;
const DISPLAYNAME = 2;
const PLAYERLIST = 3;
const SENDMESSAGE = 4;
const NEWMESSAGE = 5;
const AVATAR = 6;
const STARTGAME = 7;
const WHISPERMESSAGE = 8;
const TIMECHANGE = 9;
const VOTE = 10;
const TIMERCHANGE = 11
const VERDICT = 12;
const DAYCHANGE = 13;
const NIGHTACTION = 14;
const REVEALASMAYOR = 15;
const MAYORREVEALED = 16;
const RBASJAILPIR = 17;
const JAILEDPIRATED = 18;
const KILL = 19;
const REVIVE = 20;
const UPDATETEXT = 21;
const CHANGEROLE = 22;
const DISABLECHAT = 23;

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
let peer = new Peer();

const peerInt = setInterval((e) => {
    if(peer.id){
        clearInterval(peerInt);
        document.getElementById("loading").style.display = "none"
        document.getElementById("playerIntroBoard").style.display = "flex"
    }
    
}, 100)

/**
 * Watchdog boolean that is constantly flipped to check connectivity
 */
let disconnect = false;  

let myName = "none";

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});

setInterval(() => {
    //Client send ping out
    if(hostConn){
        hostConn.send([PING,"Ping"])
        console.log("Ping")
        if(!disconnect){
            disconnect=true
        }else{
            if(hostConn.open){
                disconnect=true;
                return;
            }
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
        peer.disconnect();
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
        let result = '';
        for(let i=0; i<6; i++){
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        peer = new Peer(result);
        peer.on('connection', function(conn){
            handleConnections(conn);
        });
        document.getElementById("hostId").innerText = result;
        copyId();
        document.getElementById("hostIntroBoard").style.display = "flex"
        document.getElementById("playerIntroBoard").style.display = "none"
        document.getElementById("chatDiv").style.display = "flex";
        myName = "Host";
    }else{
        document.getElementById("hostIntroBoard").style.display = "none"
        document.getElementById("playerIntroBoard").style.display = "flex" 
        document.getElementById("chatDiv").style.display = "none";
        myName = "";
    }
}

function copyId(){
    copyTextToClipboard(peer.id);
}

peer.on('error', function(err) {
    console.log(err);
 });

// PEER
// Listens for 
peer.on('connection', function(conn){
    handleConnections(conn);
})

peer.on('open', function(err){
    console.log("Huh");
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
    console.log(data)
    switch(data[0]){
        case PING:
            disconnected[connections.indexOf(conn)] = false;
            conn.send([PONG,"Pong"]);
            console.log("Pong");
            break;
        case PONG:
            disconnect = false
            console.log("Sent");
            break;
        case DISPLAYNAME:
            if(!playing){
                newPlayer(msg, conn);
                console.log(conn);
            }
            break;
        case PLAYERLIST:
            clientUpdatePlayerlist(msg);
            break;
        case SENDMESSAGE:
            sendChatUpdate(connections.indexOf(conn), msg);
            break;
        case NEWMESSAGE:
            updateChatbox(msg);
            break;
        case AVATAR:
            avatars.push(msg);
            break;
        case STARTGAME:
            gameStart(msg);
            break;
        case WHISPERMESSAGE:
            sendWhisperUpdate(-2, msg);
            break;
        case TIMECHANGE:
            changeTime(msg);
            break;
        case VOTE:
            updateVoters(msg, connections.indexOf(conn));
            break;
        case TIMERCHANGE:
            updateTimer(msg);
            break;
        case VERDICT:
            updateTrialVotes(msg, connections.indexOf(conn));
            break;
        case DAYCHANGE:
            dayUpdate(msg);
            break;
        case NIGHTACTION:
            computeAction(msg, connections.indexOf(conn));
            break;
        case REVEALASMAYOR:
            connections.forEach(cConn => {
                cConn.send([MAYORREVEALED, connections.indexOf(conn)]);
            }) 
            break;
        case MAYORREVEALED:
            showMayorPopup(msg);
            break;
        case RBASJAILPIR:
            roleBlockJP(msg);
            break;
        case JAILEDPIRATED:
            roleBlocked(msg);
            break;
        case KILL:
            markDead(msg);
            break;
        case REVIVE:
            revive(msg);
            break;
        case UPDATETEXT:
            updateText(msg, connections.indexOf(conn));
            break;
        case CHANGEROLE:
            changeRole(msg)
            break;
        case DISABLECHAT:
            chatDisabled(msg);

        
    }

}

function updateChatbox(msg){
    const newP = document.createElement('p');
    let name = names[msg[0]];
    if(msg[0]==-1){
        name = "Host"
    }
    if(msg[0]==-2){
        name = "";
        newP.style.color = "#5CA1E2";
    }
    newP.innerText = name + ": " + (msg[1]);
    document.getElementById('chatHistory').appendChild(newP)
}

function randomAvatar(){
    avatar[0] = Math.floor(Math.random()*8);
    avatar[1] = Math.floor(Math.random()*8);
    avatar[2] = Math.floor(Math.random()*8);
    document.querySelector(`.changer.avatarT`).src = `images/avatar/T${avatar[0]}.svg`
    document.querySelector(`.changer.avatarC`).src = `images/avatar/C${avatar[2]}.svg`
    document.querySelector(`.changer.avatarB`).src = `images/avatar/B${avatar[1]}.svg`
    if(hostConn){
        hostConn.send([AVATAR, avatar]);
    }
}

function whisper(){
    document.getElementById('whisperPlayerList').showModal();
}

function sendMsg(msg){
    if(!hostConn){
        if(host){
            console.log(whisperTarget)
            if(whisperTarget !== ""){
                sendWhisperUpdate(8,[whisperTarget, msg, "host"])
                console.log("whispering")
                whisperTarget = "";
                document.getElementById("chatInput").placeholder = "Type here";
                return;
            }
            sendChatUpdate(-1, msg);
        }
        return;
    }
    if(isAlphaNumeric(msg)){
        document.getElementById("chatInput").value = "";
        console.log(whisperTarget);
        if(whisperTarget !== ""){
            hostConn.send([WHISPERMESSAGE,[whisperTarget, msg, names.indexOf(myName)]])
            console.log("whispering")
            whisperTarget = "";
            document.getElementById("chatInput").placeholder = "Type here";
            return;
        }
        hostConn.send([SENDMESSAGE, msg]);
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

let whisperTarget = "";

function setWhisperTarget(id){
    if(id == "host"){
        whisperTarget = "host";
        document.getElementById("whisperPlayerList").close();
        document.getElementById("chatInput").placeholder = `Whispering to the host`;
        return;
    }
    console.log(`Whispering to ${id}`)
    whisperTarget = id;
    document.getElementById("whisperPlayerList").close();
    document.getElementById("chatInput").placeholder = `Whispering to ${names[id]}`;
}


