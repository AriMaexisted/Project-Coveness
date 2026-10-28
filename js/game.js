
let playing = false;

// --------------HOSE CONNECTION---------------

function startGame(){
    connections.forEach(conn => {
        conn.send([7,connections.indexOf(conn)]);
    });
}


// --------------CLIENT CONNECTION--------------

function gameStart(){
    const card = roleRevealCards;
    const subtext = roleRevealSubtext;
    document.getElementById("playerIntroBoard").style.display = "none";
    document.getElementById("playerPlayingBoard").style.display = "flex";
    document.getElementById("roleRevealIntro").style.display = "flex";
    console.log("Yo");
    console.log(document.getElementById("roleRevealIntro").style.display);
    setInterval(() => {
        document.getElementById("roleRevealCards").style.display = "flex";
        document.getElementById("roleRevealSubtext").style.display = "flex";
    }, 1500)
}