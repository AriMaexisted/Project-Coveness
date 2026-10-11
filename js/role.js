function transfer(id){
    const menus = document.querySelectorAll(".RMdiv");

    menus.forEach(element => {
        element.style.display = "none";
    });

    document.getElementById(id).style.display = "flex";
}