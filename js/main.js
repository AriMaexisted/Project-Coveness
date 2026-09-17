var peer = new Peer();
let ourId = "" 

peer.on("open", function (id) {
  console.log("My peer ID is: " + id);
  ourId = id;
});

function sendMsg() {
    const id = document.getElementById("input").value;
    var conn = peer.connect(id);
    console.log("Sending")
    conn.on("open", function () {
        // Send messages
        conn.send("ID:"+ourId);
    });
}

peer.on('connection', function (conn) { 
    conn.on("open", function () {
        conn.on("data", function (data){
            if(data.includes("ID:")){
                cleanId = data.slice(3);
                peer.connect(cleanId);
            }
            if(data=="red"){
                document.body.style.backgroundColor = "#FF0000";
            }else if(data=="blue"){
                document.body.style.backgroundColor = "#0000FF";
            }else if(data=="sent!"){
                console.log("Message recieved!");
            }
        })
        conn.send("sent!");
        console.log("sent")
    })
});

function red() {
    const id = document.getElementById("input").value;
    var conn = peer.connect(id);
    console.log("Sending")
    conn.on("open", function () {
        // Send messages
        conn.send("red");
    });
}

function blu() {
    const id = document.getElementById("input").value;
    var conn = peer.connect(id);
    console.log("Sending")
    conn.on("open", function () {
        // Send messages
        conn.send("blue");
    });
}