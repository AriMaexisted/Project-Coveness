const allRoles = {
    Town: {
        Investigative: [
            {name:'Investigator', wiki:'https://town-of-salem.fandom.com/wiki/Investigator_(ToS)', image:'images/roles/Investigator.svg', ui: 0},
            {name:'Lookout', wiki:'https://town-of-salem.fandom.com/wiki/Lookout_(ToS)', image:'images/roles/Lookout.svg', ui: 0},
            {name:'Psychic', wiki:'https://town-of-salem.fandom.com/wiki/Psychic_(ToS)', image:'images/roles/Psychic.svg', ui: 13},
            {name:'Sheriff', wiki:'https://town-of-salem.fandom.com/wiki/Sheriff_(ToS)', image:'images/roles/Sheriff.svg', ui: 0},
            {name:'Spy', wiki:'https://town-of-salem.fandom.com/wiki/Spy_(ToS)', image:'images/roles/Spy.svg', ui: 3},
            {name:'Tracker', wiki:'https://town-of-salem.fandom.com/wiki/Tracker_(ToS)', image:'images/roles/Tracker.svg', ui: 0}
        ],
        Killing: [
            {name:'Jailor', wiki:'https://town-of-salem.fandom.com/wiki/Jailor_(ToS)', image:'images/roles/Jailor.svg', ui: 13},
            {name:'Vampire Hunter', wiki:'https://town-of-salem.fandom.com/wiki/Vampire_Hunter', image:'images/roles/VampireHunter.svg', ui: 0},
            {name:'Veteran', wiki:'https://town-of-salem.fandom.com/wiki/Veteran_(ToS)', image:'images/roles/Veteran.svg', ui: 10},
            {name:'Vigilante', wiki:'https://town-of-salem.fandom.com/wiki/Vigilante_(ToS)', image:'images/roles/Vigilante.svg', ui: 0}
        ],
        Protective: [
            {name:'Bodyguard', wiki:'https://town-of-salem.fandom.com/wiki/Bodyguard_(ToS)', image:'images/roles/Bodyguard.svg', ui: 0},
            {name:'Crusader', wiki:'https://town-of-salem.fandom.com/wiki/Crusader_(ToS)', image:'images/roles/Crusader.svg', ui: 0},
            {name:'Doctor', wiki:'https://town-of-salem.fandom.com/wiki/Doctor', image:'images/roles/Doctor.svg', ui: 0},
            {name:'Trapper', wiki:'https://town-of-salem.fandom.com/wiki/Trapper_(ToS)', image:'images/roles/Trapper.svg', ui: 0}
        ],
        Support: [
            {name:'Tavern Keeper', wiki:'https://town-of-salem.fandom.com/wiki/Tavern_Keeper_(ToS)', image:'images/roles/TavernKeeper.svg', ui: 0},
            {name:'Mayor', wiki:'https://town-of-salem.fandom.com/wiki/Mayor_(ToS)', image:'images/roles/Mayor.svg', ui: 13},
            {name:'Medium', wiki:'https://town-of-salem.fandom.com/wiki/Medium_(ToS)', image:'images/roles/Medium.svg', ui: 13},
            {name:'Retributionist', wiki:'https://town-of-salem.fandom.com/wiki/Retributionist_(ToS)', image:'images/roles/Retributionist.svg', ui: 12},
            {name:'Transporter', wiki:'https://town-of-salem.fandom.com/wiki/Transporter_(ToS)', image:'images/roles/Transporter.svg', ui: 1}
        ]
    },
    Mafia: {
        Deception: [
            {name:'Disguiser', wiki:'https://town-of-salem.fandom.com/wiki/Disguiser_(ToS)', image:'images/roles/Disguiser.svg', ui: 8},
            {name:'Forger', wiki:'https://town-of-salem.fandom.com/wiki/Forger', image:'images/roles/Forger.svg', ui: 7},
            {name:'Framer', wiki:'https://town-of-salem.fandom.com/wiki/Framer', image:'images/roles/Framer.svg', ui: 3},
            {name:'Hypnotist', wiki:'https://town-of-salem.fandom.com/wiki/Hypnotist', image:'images/roles/Hypnotist.svg', ui: 4},
            {name:'Janitor', wiki:'https://town-of-salem.fandom.com/wiki/Janitor', image:'images/roles/Janitor.svg', ui: 0}
        ],
        Killing: [
            {name:'Ambusher', wiki:'https://town-of-salem.fandom.com/wiki/Ambusher', image:'images/roles/Ambusher.svg', ui: 0},
            {name:'Godfather', wiki:'https://town-of-salem.fandom.com/wiki/Godfather', image:'images/roles/Godfather.svg', ui: 9},
            {name:'Mafioso', wiki:'https://town-of-salem.fandom.com/wiki/Mafioso', image:'images/roles/Mafioso.svg', ui: 9}
        ],
        Support: [
            {name:'Blackmailer', wiki:'https://town-of-salem.fandom.com/wiki/Blackmailer', image:'images/roles/Blackmailer.svg', ui: 0},
            {name:'Bootlegger', wiki:'https://town-of-salem.fandom.com/wiki/Bootlegger', image:'images/roles/Bootlegger.svg', ui: 0},
            {name:'Consigliere', wiki:'https://town-of-salem.fandom.com/wiki/Consigliere', image:'images/roles/Consigliere.svg', ui: 0}
        ]
    },
    Coven: {
        Evil: [
            {name:'CovenLeader', wiki:'https://town-of-salem.fandom.com/wiki/Coven_Leader', image:'images/roles/CovenLeader.svg', ui: 1},
            {name:'HexMaster', wiki:'https://town-of-salem.fandom.com/wiki/Hex_Master_(ToS)', image:'images/roles/HexMaster.svg', ui: 0},
            {name:'Medusa', wiki:'https://town-of-salem.fandom.com/wiki/Medusa_(ToS)', image:'images/roles/Medusa.svg', ui: 10},
            {name:'Necromancer', wiki:'https://town-of-salem.fandom.com/wiki/Necromancer_(ToS)', image:'images/roles/Necromancer.svg', ui: 11},
            {name:'Poisoner', wiki:'https://town-of-salem.fandom.com/wiki/Poisoner_(ToS)', image:'images/roles/Poisoner.svg', ui: 0},
            {name:'Potion Master', wiki:'https://town-of-salem.fandom.com/wiki/Potion_Master_(ToS)', image:'images/roles/PotionMaster.svg', ui: 6}
        ]
    },
    Neutral: {
        Benign: [
            {name:'Amnesiac', wiki:'https://town-of-salem.fandom.com/wiki/Amnesiac_(ToS)', image:'images/roles/Amnesiac.svg', ui: 11},
            {name:'Guardian Angel', wiki:'https://town-of-salem.fandom.com/wiki/Guardian_Angel', image:'images/roles/GuardianAngel.svg', ui: 10},
            {name:'Survivor', wiki:'https://town-of-salem.fandom.com/wiki/Survivor', image:'images/roles/Survivor.svg', ui: 10}
        ],
        Evil: [
            {name:'Executioner', wiki:'https://town-of-salem.fandom.com/wiki/Executioner_(ToS)', image:'images/roles/Executioner.svg', ui: 13},
            {name:'Jester', wiki:'https://town-of-salem.fandom.com/wiki/Jester_(ToS)', image:'images/roles/Jester.svg', ui: 13},
            {name:'Witch', wiki:'https://town-of-salem.fandom.com/wiki/Witch_(ToS)', image:'images/roles/Witch.svg', ui: 1}
        ],
        Killing: [
            {name:'Arsonist', wiki:'https://town-of-salem.fandom.com/wiki/Arsonist_(ToS)', image:'images/roles/Arsonist.svg', ui: 0},
            {name:'Juggernaut', wiki:'https://town-of-salem.fandom.com/wiki/Juggernaut', image:'images/roles/Juggernaut.svg', ui: 0},
            {name:'SerialKiller', wiki:'https://town-of-salem.fandom.com/wiki/Serial_Killer_(ToS)', image:'images/roles/SerialKiller.svg', ui: 2},
            {name:'Werewolf', wiki:'https://town-of-salem.fandom.com/wiki/Werewolf_(ToS)', image:'images/roles/Werewolf.svg', ui: 0}
        ],
        Chaos: [
            {name:'Pestilence', wiki:'https://town-of-salem.fandom.com/wiki/Pestilence_(ToS)', image:'images/roles/Pestilence.svg', ui: 0},
            {name:'Pirate', wiki:'https://town-of-salem.fandom.com/wiki/Pirate_(ToS)', image:'images/roles/Pirate.svg', ui: 14},
            {name:'Plaguebearer', wiki:'https://town-of-salem.fandom.com/wiki/Plaguebearer_(ToS)', image:'images/roles/Plaguebearer.svg', ui: 0},
            {name:'Vampire', wiki:'https://town-of-salem.fandom.com/wiki/Vampire_(ToS)', image:'images/roles/Vampire.svg', ui: 5}
        ]
    }
};

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
    searchDiv.appendChild(searchBackButton);

    roleMenu.appendChild(searchDiv);
    roleStart.appendChild(searchButton);
    

    Object.entries(allRoles).forEach(([team, alignments]) => {
        const teamButton = document.createElement('button');
        const teamDiv = document.createElement('div');
        teamDiv.id = "RM".concat(team, ind);
        teamDiv.classList.add("RMdiv");
        teamButton.addEventListener('click', () => {
            transfer("RM".concat(team, ind));
        });
        teamButton.style.height = "10vh";
        teamButton.style.aspectRatio = 1;
        teamButton.innerText = team;
        
        roleStart.appendChild(teamButton);
        roleMenu.appendChild(teamDiv);
        
        const alignmentBackButton = document.createElement('button');
        alignmentBackButton.addEventListener('click', () => {
            transfer('RMstart'.concat(ind));
        });
        alignmentBackButton.innerText = "Back"
        teamDiv.appendChild(alignmentBackButton);
        
        Object.entries(alignments).forEach(([alignment, roles]) => {

            const alignmentButton = document.createElement('button');
            const alignmentDiv = document.createElement('div');
            alignmentDiv.id = "RM".concat(team, alignment, ind);
            alignmentDiv.classList.add("RMdiv");
            alignmentButton.addEventListener('click', () => {
                transfer("RM".concat(team, alignment, ind));
            });
            // alignmentButton.innerHTML = `<img class="RMrole" src="./images/icons/alignment/${team.concat(alignment)}.svg"> <p> ${team} ${alignment}`;
            alignmentButton.innerText = `${team} ${alignment}`;
            alignmentButton.style.height = "10vh";
            alignmentButton.style.aspectRatio = 1;
            
            console.log(teamDiv)
            teamDiv.appendChild(alignmentButton);
            roleMenu.appendChild(alignmentDiv);

            const roleBackButton = document.createElement('button');
            roleBackButton.addEventListener('click', () => {
                transfer("RM".concat(team, ind));
            });
            roleBackButton.innerText = "Back"
            alignmentDiv.appendChild(roleBackButton);


            roles.forEach(role =>{
                

                const roleName = role.name;
                const roleNameRaw = role.name.replaceAll(" ","");
                const roleImg = role.image;
                const roleWiki = role.wiki;

                const roleButton = document.createElement('button');
                const roleDiv = document.createElement('div');
                roleDiv.id = "RM".concat(roleName, ind);
                roleDiv.classList.add("RMdiv");
                roleButton.addEventListener('click', () => {
                    transfer("RM".concat(roleName, ind));
                    setFocusedRole(roleName);
                });
                // roleButton.innerHTML = `<img class="RMimg" src="./images/roles/${roleNameRaw}.svg">`;
                roleButton.innerText = `${roleNameRaw}`;
                // const roleImg = document.createElement('img')
                // roleButton.innerHTML = 
                
                alignmentDiv.appendChild(roleButton);
                roleMenu.appendChild(roleDiv);

                allRolesAlph.push(role);

            });
        });
    });

    const sortedRoles = [...allRolesAlph].sort((a, b) => a.name.localeCompare(b.name));

    sortedRoles.forEach(role => {
        const roleName = role.name;
        const roleNameRaw = role.name.replaceAll(" ", "");

        const roleButton = document.createElement('button');
        roleButton.addEventListener('click', () => {
            transfer("RM".concat(roleName, ind));
            setFocusedRole(roleName);
        });
        roleButton.innerText = `${roleNameRaw}`;
        searchDiv.appendChild(roleButton);
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
    focusedRole = role;
    document.getElementById('selRole').innerText = focusedRole;
}