var peer = new Peer();
let ourId = "";
let ourConn = null;
let o = false
let myTurn = false;
let buttons = Array.from(document.querySelectorAll(".row button:not([onclick*='joinGame'])"));

let activate = false;

enabled(false)

console.log(peer)

peer.on("open", function (id) {
    console.log("ID: " + id);
    ourId = id;
});

function joinGame(){
    ourConn = peer.connect(document.getElementById("name").value);
    ourConn.on('open', function() {
        document.getElementById("name").disabled = true
        enabled(true)
        ourConn.on('data', function(data){
            if(!o){
                buttons[data].textContent = 'o';
            }else{
                buttons[data].textContent = 'x';
            }
            myTurn = true
            enabled(myTurn);
            checkGame();
        })
    })
    o = true
}

peer.on('connection', function(conn){
    ourConn = conn
    if(o && !activate){
        myTurn = true;
        activate = true;
    }
    ourConn.on('data', function(data){
        if(!o){
            buttons[data].textContent = 'o';
        }else{
            buttons[data].textContent = 'x';
        }
        myTurn = true
        enabled(myTurn);
        checkGame();
    })
})

function send(val){
    if(buttons[val].textContent !== ''){
        return
    }
    ourConn.send(val);
    myTurn = false;
    enabled(myTurn);
    if(o){
        buttons[val].textContent = 'o';
    }else{
        buttons[val].textContent = 'x';
    }
    checkGame();
}

function enabled(val){
    buttons.forEach(element => {
        element.disabled = !val;
    });
}

function checkGame(){
    winner = false
    isO = false
    for (let i=0;i<3;i++) {
        if(buttons[i*3].textContent === buttons[i*3+1].textContent && 
            buttons[i*3+1].textContent === buttons[i*3+2].textContent &&
            buttons[i*3+2].textContent !== '' ){
                winner = true
                isO = (buttons[i*3+2]==='o')
            }

        if(buttons[i].textContent === buttons[i+3].textContent && 
            buttons[i+3].textContent === buttons[i+6].textContent &&
            buttons[i+6].textContent !== '' ){
                winner = true
                isO = (buttons[i]==='o')
            }

        }
    if(buttons[0].textContent === buttons[4].textContent && 
        buttons[4].textContent === buttons[8].textContent &&
        buttons[8].textContent !== '' ){
            winner = true
            isO = (buttons[4]==='o')
        }

    if(buttons[2].textContent === buttons[4].textContent && 
        buttons[4].textContent === buttons[6].textContent &&
        buttons[6].textContent !== '' ){
            winner = true
            isO = (buttons[4]==='o')
        }

    if(winner){
        win(isO);
    }
}

function win(isO){
    if(isO !== o){
        document.getElementById("grat").innerHTML = "You won!" 
    }else{
        document.getElementById("grat").innerHTML = "You lost!" 
    }
}
