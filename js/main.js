//PEER CODE--------------------------------------------------------


// Helper 
const isAlphaNumeric = str => /^[a-z0-9 ,.!?]*$/gi.test(str);


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

let host = false;
const peer = new Peer();

const introPlayers = document.getElementById("playerList");

/**
 * Watchdog boolean that is constantly flipped to check connectivity
 */
let disconnect = false;     

setInterval(() => {
    //Client send ping out
    if(hostConn){
        hostConn.send([0,"Ping"])
        console.log("Ping")
        if(!disconnect){
            disconnect=true
        }else{
            alert("You have been disconnected.")
    }
    //Peer check if id is there
    if(!peer.id){
        document.body.style.backgroundColor = "#ff0000";
    }
    
    }
}, 5000);

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
            conn.send([1,"Pong"]);
            console.log("Pong");
            break;
        case 1:
            disconnect = false
            console.log("Sent");
            break;
        case 2:
            newPlayer(msg, conn);
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

//HOST CODE--------------------------------------------------------
/**
 * DataConnection
 * The display connection object for every client
 */
const connections = [];


function newPlayer(msg, conn){
    connections.push(conn);
    names.push(msg);
    connections.forEach(cConn => {
        cConn.send([3, names]);        
    })

    
    const playerConfig = document.getElementById("playerConfig")
    
    playerConfig.innerHTML = "";
    names.forEach(cName => {
        const playerDiv = document.createElement('div');
        const playerName = document.createElement('h1');
        const role = document.createElement('button');
        playerName.textContent = cName;
        playerConfig.appendChild(playerDiv);
        playerDiv.appendChild(playerName);
        playerDiv.appendChild(role);
        playerDiv.classList.add("playerConfigRow");

        playerDiv.classList.add(names.indexOf(cName));
        playerName.classList.add(names.indexOf(cName));
        role.classList.add(names.indexOf(cName));
        
        role.addEventListener('click', () => {
            setRole();
        })
    })
}

function setRole(){
    const roleSelect = document.getElementById('roleSelect');
    const roleMenuStart = document.getElementById('RMstart');
    roleSelect.showModal();
    transfer('RMstart')
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
 * CLIENT
 * Triggers when connecting to host
 */
function joinGame(){

    if(!isAlphaNumeric(document.getElementById("name").value)){
        alert("Please only use letters, numbers, spaces, or these symbols: , . ! ?")
        return
    }

    const targetId = document.getElementById("code").value;
    hostConn = peer.connect(targetId); // Sets hostConn

    if(hostConn){
        hostConn.send([0,"Ping"]); // Sends a ping to start loop
        console.log("Connected")
        document.getElementById("joinGameBtn").disabled = true;
        document.getElementById("hostClaimBtn").disabled = true;
    }

    hostConn.on('data', function(data){
        messageRecieved(data, hostConn); // Handles data sent
    });

    // Sends name
    hostConn.on('open', function(){
        console.log("Hostconn: " + hostConn.peer);
        hostConn.send([2,document.getElementById("name").value])
    });
}

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


