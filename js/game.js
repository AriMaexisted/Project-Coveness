
let playing = false;

// --------------HOST CONNECTION---------------

function startGame(){
    connections.forEach(conn => {
        conn.send([7,roles[connections.indexOf(conn)]]);
    });

}


// --------------CLIENT CONNECTION--------------

function gameStart(role){
    const subtext = document.getElementById("roleRevealSubtext");
    const card = document.getElementById("roleRevealCards");
    document.getElementById("playerIntroBoard").style.display = "none";
    document.getElementById("playerPlayingBoard").style.display = "flex";
    document.getElementById("roleRevealIntro").style.display = "flex";
    console.log(role);
    card.src = `./images/roles/${role}.svg`;
    subtext.innerText = `${role}`;
    setInterval(() => {
        subtext.style.display = "flex";
        card.style.display = "flex";
    }, 1500)
    setInterval(() => {
        document.getElementById("roleReveal").style.display = "none";
    }, 4000)
}