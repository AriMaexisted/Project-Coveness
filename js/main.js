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

const peerInt = setInterval((e) => {
    console.log(peer.id);
    if(!peer.id){
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
    console.log(msg)
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
            clientUpdatePlayerlist(msg);
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
        case 8:
            sendWhisperUpdate(-2, msg);
            break;
        case 9:
            changeTime(msg);
            break;
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
        hostConn.send([6, avatar]);
    }
}

function whisper(){
    document.getElementById('whisperPlayerList').showModal();
}

function sendMsg(msg){
    if(!hostConn){
        if(host){
            sendChatUpdate(-1, msg);
        }
        return;
    }
    if(isAlphaNumeric(msg)){
        console.log(whisperTarget);
        if(whisperTarget !== ""){
            hostConn.send([8,[whisperTarget, msg, names.indexOf(myName)]])
            console.log("whispering")
            return;
        }
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


