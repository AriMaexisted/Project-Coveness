//HOST CODE--------------------------------------------------------
/**
 * DataConnection Array
 * The display connection object for every client
 */
const connections = [];

let avatars = [];
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
        playerName.classList.add("playerConfigName");
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
        playerDiv.appendChild(avatarDiv);
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
        cConn.send([3, [names, avatars]]);        
    })
    updatePlayerlist();
    disconnected.push(false);
    const dcI = setInterval(()=>{
        if(disconnected[connections.indexOf(conn)]){
            if(!playing){
                alert(`Player ${connections.indexOf(conn)+1} has disconnected`);
                kick(connections.indexOf(conn)+1);
                clearInterval(dcI);
            }
        }else{
            disconnected[connections.indexOf(conn)] = true;
        }
    },10000)
}

function kick(player){
    if(connections[player]){
        connections[player].close();
        connections.splice(player, 1);
        names.splice(player, 1);
        avatars.splice(player, 1);
        updatePlayerlist();
    }
}

function setRole(){
    const roleSelect = document.getElementById('roleSelect');
    const roleMenuStart = document.getElementById('RMstart');
    roleSelect.showModal();
    transfer('RMstart0')
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

function sendWhisperUpdate(id, msg){
    
    connections.forEach((conn) => {
        conn.send([5, [id, `${names[msg[2]]} is whispering to ${names[msg[0]]}`]]);
        console.log(conn);
    } )
    console.log(msg)
    connections[msg[2]].send([5, [id, `To ${names[msg[0]]}: ${msg[1]}`]]);
    connections[msg[0]].send([5, [id, `From ${names[msg[2]]}: ${msg[1]}`]]);
}
