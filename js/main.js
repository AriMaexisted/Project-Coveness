var peer = new Peer();
let ourId = "";
let ourConn = null;

peer.on("open", function (id) {
  console.log("ID: " + id);
  ourId = id;
});

function handleData(conn) {
  conn.on("data", function (data) {
    console.log("Received data:", data);

    if (data === "red") {
      document.body.style.backgroundColor = "#FF0000";
    } else if (data === "blue") {
      document.body.style.backgroundColor = "#0000FF";
    }
  });
}

function sendMsg() {
  const targetId = document.getElementById("input").value;
  ourConn = peer.connect(targetId); 

  ourConn.on("open", function () {
    console.log("Connected with: " + targetId);
    handleData(ourConn);
  });
}

peer.on("connection", function (conn) {
  ourConn = conn;
  console.log("Connected with: " + conn.peer);

  ourConn.on("open", function () {
    handleData(ourConn);
  });
});

function red() {
  if (ourConn && ourConn.open) {
    console.log("Sending red");
    ourConn.send("red");
  } else {
    console.log("Unable");
  }
}

function blu() {
  if (ourConn && ourConn.open) {
    console.log("Sending blue");
    ourConn.send("blue");
  } else {
    console.log("Unable");
  }
}