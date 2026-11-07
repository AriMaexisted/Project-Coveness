const allRolesAlph = [];

let focusedRole = ""

let RMnum = 0
let roleMenus = document.getElementsByClassName("roleMenu");

Array.prototype.forEach.call(roleMenus, function(roleMenu) {
    roleIter(roleMenu, RMnum);
    console.log("done")
});

function roleIter(roleMenu, ind){
    const roleStart = document.createElement('div');
    roleStart.id = 'RMstart'.concat(ind);
    roleStart.classList.add('RMdiv')
    roleMenu.appendChild(roleStart);

    const searchButton = document.createElement('button');
    searchButton.addEventListener('click', () => {
        transfer("RMsearch".concat(ind));
    });
    searchButton.style.height = "10vh";
    searchButton.style.aspectRatio = 1;
    searchButton.innerText = "All";

    const searchDiv = document.createElement('div');
    searchDiv.id = "RMsearch".concat(ind);
    searchDiv.classList.add("RMdiv");
    
    const searchBackButton = document.createElement('button');
    searchBackButton.addEventListener('click', ()=>{
        transfer('RMstart'.concat(ind));
    })
    searchBackButton.innerText = "Back";
    searchBackButton.style.height = "10vh";
    searchBackButton.style.width = "10vh";
    searchDiv.appendChild(searchBackButton);
    
    
    roleMenu.appendChild(searchDiv);
    roleStart.appendChild(searchButton);
    
    ALLROLES.forEach(role => {
        const factionDivId = "RM".concat(role.faction, ind)
        
        if(!document.getElementById(factionDivId)){
            const factionButton = document.createElement('button');
            const backButton = document.createElement('button');
            const factionDiv = document.createElement('div');
            factionDiv.id = factionDivId;
            factionDiv.classList.add("RMdiv");
            factionButton.addEventListener('click', () => {
                transfer(factionDivId);
            });
            backButton.style.height = "10vh";
            backButton.style.width = "10vh";
            backButton.innerText = "Back";
            backButton.addEventListener('click', () => {
                transfer('RMstart'.concat(ind));
            });
            factionDiv.appendChild(backButton);
            factionButton.style.height = "10vh";
            factionButton.style.width = "10vh";
            factionButton.style.aspectRatio = 1;
            factionButton.innerText = role.faction;
            
            roleStart.appendChild(factionButton);
            roleMenu.appendChild(factionDiv);
        }
        
        const alignmentDivId = "RM".concat(role.alignment.replace(/\s/g, ""), ind)
        
        if(!document.getElementById(alignmentDivId)){
            const alignmentButton = document.createElement('button');
            const alignmentDiv = document.createElement('div');
            const backButton = document.createElement('button');
            alignmentDiv.id = alignmentDivId;
            alignmentDiv.classList.add("RMdiv");
            alignmentButton.addEventListener('click', () => {
                transfer(alignmentDivId);
            });
            backButton.style.height = "10vh";
            backButton.style.width = "10vh";
            backButton.innerText = "Back";
            backButton.addEventListener('click', () => {
                transfer(factionDivId);
            });
            alignmentDiv.appendChild(backButton);
            alignmentButton.style.height = "10vh";
            alignmentButton.style.width = "10vh";
            alignmentButton.style.aspectRatio = 1;
            alignmentButton.innerText = role.alignment;
            
            document.getElementById(factionDivId).appendChild(alignmentButton);
            roleMenu.appendChild(alignmentDiv);
        }
        
        const roleDivId = "RM".concat(role.name.replace(/\s/g, ""), ind)
        const roleButton = document.createElement('button');
        const roleDiv = document.createElement('div');
        const backButton = document.createElement('button');
        roleDiv.id = roleDivId;
        roleDiv.classList.add("RMdiv");
        roleButton.addEventListener('click', () => {
            transfer(roleDivId);
            setFocusedRole(role.name);
        });
        backButton.style.height = "10vh";
        backButton.style.width = "10vh";
        backButton.innerText = "Back";
        backButton.addEventListener('click', () => {
            transfer(alignmentDivId);
        });
        roleDiv.appendChild(backButton);
        roleButton.style.height = "10vh";
        roleButton.style.width = "10vh";
        roleButton.style.aspectRatio = 1;
        roleButton.innerText = role.name;
        roleButton.innerText = role.name;
        
        document.getElementById(alignmentDivId).appendChild(roleButton);
        roleMenu.appendChild(roleDiv);
        
        allRolesAlph.push(role.name)

        // Content inside of rolediv
        let cardImg = document.createElement('img');
        cardImg.src = `images/roles/${role.name.replace(/\s/g, "")}.svg`;
        cardImg.style.height = "40vh";
        cardImg.style.aspectRatio = 5/7;
        roleDiv.appendChild(cardImg);

        let dataDiv = document.createElement('div');
        // dataDiv.style.height = "40vh";
        roleDiv.appendChild(dataDiv);

        dataDiv.innerHTML = `
    <table class="roleTable">
        <tr>
            <td class="roleCell" style="font-weight: bold;">Faction</td>
            <td class="roleCell">${role.faction}</td>
        </tr>
        <tr>
            <td class="roleCell" style="font-weight: bold;">Alignment</td>
            <td class="roleCell">${role.alignment}</td>
        </tr>
        <tr>
            <td class="roleCell" style="font-weight: bold;">Defense</td>
            <td class="roleCell">${role.defense}</td>
        </tr>
        <tr>
            <td class="roleCell" style="font-weight: bold;">Attack</td>
            <td class="roleCell">${role.attack}</td>
        </tr>
        <tr>
            <td class="roleCell" style="font-weight: bold;">Unique</td>
            <td class="roleCell">${role.unique}</td>
        </tr>
        <tr>
            <td class="roleCell" style="font-weight: bold;">Sumary</td>
            <td class="roleCell">${role.summary}</td>
        </tr>
        <tr>
            <td class="roleCell" style="font-weight: bold;">Investigation Results (Non-DLC) </td>
            <td class="roleCell">${investigationResults[role.investResult]}</td>
        </tr>
        <tr>
            <td class="roleCell" style="font-weight: bold;">Investigation Results (DLC) </td>
            <td class="roleCell">${investigationResultsDLC[role.investResult]}</td>
        </tr>
    </table>`

        
        
    })
    
    allRolesAlph.sort()
    
    allRolesAlph.forEach(role => {
        const roleButton = document.createElement('button');
        roleButton.addEventListener('click', () => {
            transfer("RM".concat(role.replace(/\s/g, ""), ind));
            setFocusedRole(role);
        });
        roleButton.innerText = role;
        searchDiv.appendChild(roleButton);
        roleButton.style.height = "10vh";
        roleButton.style.width = "10vh";
    });
}

function transfer(id, ind){
    const menus = document.querySelectorAll(".RMdiv");

    menus.forEach(element => {
        element.style.display = "none";
    });

    console.log(id)
    document.getElementById(id).style.display = "flex";
}

function setFocusedRole(role){
    console.log(role);
    focusedRole = role;
    document.getElementById('selRole').innerText = focusedRole;
}