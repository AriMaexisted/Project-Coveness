const allRoles={
    Town:{
        Investigative:[
            {name:'Investigator',wiki:'https://town-of-salem.fandom.com/wiki/Investigator_(ToS)',image:'images/roles/Investigator.svg'},
            {name:'Lookout',wiki:'https://town-of-salem.fandom.com/wiki/Lookout_(ToS)',image:'images/roles/Lookout.svg'},
            {name:'Psychic',wiki:'https://town-of-salem.fandom.com/wiki/Psychic_(ToS)',image:'images/roles/Psychic.svg'},
            {name:'Sheriff',wiki:'https://town-of-salem.fandom.com/wiki/Sheriff_(ToS)',image:'images/roles/Sheriff.svg'},
            {name:'Spy',wiki:'https://town-of-salem.fandom.com/wiki/Spy_(ToS)',image:'images/roles/Spy.svg'},
            {name:'Tracker',wiki:'https://town-of-salem.fandom.com/wiki/Tracker_(ToS)',image:'images/roles/Tracker.svg'}
        ],
        Killing:[
            {name:'Jailor',wiki:'https://town-of-salem.fandom.com/wiki/Jailor_(ToS)',image:'images/roles/Jailor.svg'},
            {name:'Vampire Hunter',wiki:'https://town-of-salem.fandom.com/wiki/Vampire_Hunter',image:'images/roles/VampireHunter.svg'},
            {name:'Veteran',wiki:'https://town-of-salem.fandom.com/wiki/Veteran_(ToS)',image:'images/roles/Veteran.svg'},
            {name:'Vigilante',wiki:'https://town-of-salem.fandom.com/wiki/Vigilante_(ToS)',image:'images/roles/Vigilante.svg'}
        ],
        Protective:[
            {name:'Bodyguard',wiki:'https://town-of-salem.fandom.com/wiki/Bodyguard_(ToS)',image:'images/roles/Bodyguard.svg'},
            {name:'Crusader',wiki:'https://town-of-salem.fandom.com/wiki/Crusader_(ToS)',image:'images/roles/Crusader.svg'},
            {name:'Doctor',wiki:'https://town-of-salem.fandom.com/wiki/Doctor',image:'images/roles/Doctor.svg'},
            {name:'Trapper',wiki:'https://town-of-salem.fandom.com/wiki/Trapper_(ToS)',image:'images/roles/Trapper.svg'}
        ],
        Support:[
            {name:'Tavern Keeper',wiki:'https://town-of-salem.fandom.com/wiki/Tavern_Keeper_(ToS)',image:'images/roles/TavernKeeper.svg'},
            {name:'Mayor',wiki:'https://town-of-salem.fandom.com/wiki/Mayor_(ToS)',image:'images/roles/Mayor.svg'},
            {name:'Medium',wiki:'https://town-of-salem.fandom.com/wiki/Medium_(ToS)',image:'images/roles/Medium.svg'},
            {name:'Retributionist',wiki:'https://town-of-salem.fandom.com/wiki/Retributionist_(ToS)',image:'images/roles/Retributionist.svg'},
            {name:'Transporter',wiki:'https://town-of-salem.fandom.com/wiki/Transporter_(ToS)',image:'images/roles/Transporter.svg'}
        ]
    },
    Mafia:{
        Deception:[
            {name:'Disguiser',wiki:'https://town-of-salem.fandom.com/wiki/Disguiser_(ToS)',image:'images/roles/Disguiser.svg'},
            {name:'Forger',wiki:'https://town-of-salem.fandom.com/wiki/Forger',image:'images/roles/Forger.svg'},
            {name:'Framer',wiki:'https://town-of-salem.fandom.com/wiki/Framer',image:'images/roles/Framer.svg'},
            {name:'Hypnotist',wiki:'https://town-of-salem.fandom.com/wiki/Hypnotist',image:'images/roles/Hypnotist.svg'},
            {name:'Janitor',wiki:'https://town-of-salem.fandom.com/wiki/Janitor',image:'images/roles/Janitor.svg'}
        ],
        Killing:[
            {name:'Ambusher',wiki:'https://town-of-salem.fandom.com/wiki/Ambusher',image:'images/roles/Ambusher.svg'},
            {name:'Godfather',wiki:'https://town-of-salem.fandom.com/wiki/Godfather',image:'images/roles/Godfather.svg'},
            {name:'Mafioso',wiki:'https://town-of-salem.fandom.com/wiki/Mafioso',image:'images/roles/Mafioso.svg'}
        ],
        Support:[
            {name:'Blackmailer',wiki:'https://town-of-salem.fandom.com/wiki/Blackmailer',image:'images/roles/Blackmailer.svg'},
            {name:'Bootlegger',wiki:'https://town-of-salem.fandom.com/wiki/Bootlegger',image:'images/roles/Bootlegger.svg'},
            {name:'Consigliere',wiki:'https://town-of-salem.fandom.com/wiki/Consigliere',image:'images/roles/Consigliere.svg'}
        ]
    },
    Coven:{
        Evil:[
            {name:'CovenLeader',wiki:'https://town-of-salem.fandom.com/wiki/Coven_Leader',image:'images/roles/CovenLeader.svg'},
            {name:'HexMaster',wiki:'https://town-of-salem.fandom.com/wiki/Hex_Master_(ToS)',image:'images/roles/HexMaster.svg'},
            {name:'Medusa',wiki:'https://town-of-salem.fandom.com/wiki/Medusa_(ToS)',image:'images/roles/Medusa.svg'},
            {name:'Necromancer',wiki:'https://town-of-salem.fandom.com/wiki/Necromancer_(ToS)',image:'images/roles/Necromancer.svg'},
            {name:'Poisoner',wiki:'https://town-of-salem.fandom.com/wiki/Poisoner_(ToS)',image:'images/roles/Poisoner.svg'},
            {name:'Potion Master',wiki:'https://town-of-salem.fandom.com/wiki/Potion_Master_(ToS)',image:'images/roles/PotionMaster.svg'}
        ]
    },
    Neutral:{
        Benign:[
            {name:'Amnesiac',wiki:'https://town-of-salem.fandom.com/wiki/Amnesiac_(ToS)',image:'images/roles/Amnesiac.svg'},
            {name:'Guardian Angel',wiki:'https://town-of-salem.fandom.com/wiki/Guardian_Angel',image:'images/roles/GuardianAngel.svg'},
            {name:'Survivor',wiki:'https://town-of-salem.fandom.com/wiki/Survivor',image:'images/roles/Survivor.svg'}
        ],
        Evil:[
            {name:'Executioner',wiki:'https://town-of-salem.fandom.com/wiki/Executioner_(ToS)',image:'images/roles/Executioner.svg'},
            {name:'Jester',wiki:'https://town-of-salem.fandom.com/wiki/Jester_(ToS)',image:'images/roles/Jester.svg'},
            {name:'Witch',wiki:'https://town-of-salem.fandom.com/wiki/Witch_(ToS)',image:'images/roles/Witch.svg'}
        ],
        Killing:[
            {name:'Arsonist',wiki:'https://town-of-salem.fandom.com/wiki/Arsonist_(ToS)',image:'images/roles/Arsonist.svg'},
            {name:'Juggernaut',wiki:'https://town-of-salem.fandom.com/wiki/Juggernaut',image:'images/roles/Juggernaut.svg'},
            {name:'SerialKiller',wiki:'https://town-of-salem.fandom.com/wiki/Serial_Killer_(ToS)',image:'images/roles/SerialKiller.svg'},
            {name:'Werewolf',wiki:'https://town-of-salem.fandom.com/wiki/Werewolf_(ToS)',image:'images/roles/Werewolf.svg'}
        ],
        Chaos:[
            {name:'Pestilence',wiki:'https://town-of-salem.fandom.com/wiki/Pestilence_(ToS)',image:'images/roles/Pestilence.svg'},
            {name:'Pirate',wiki:'https://town-of-salem.fandom.com/wiki/Pirate_(ToS)',image:'images/roles/Pirate.svg'},
            {name:'Plaguebearer',wiki:'https://town-of-salem.fandom.com/wiki/Plaguebearer_(ToS)',image:'images/roles/Plaguebearer.svg'},
            {name:'Vampire',wiki:'https://town-of-salem.fandom.com/wiki/Vampire_(ToS)',image:'images/roles/Vampire.svg'}
        ]
    }
};


let focusedRole = ""

let RMnum = 0
let roleMenus = document.getElementsByClassName("roleMenu");

Array.prototype.forEach.call(roleMenus, function(roleMenu) {
    roleIter(roleMenu, RMnum);
    console.log("done")
});

function roleIter(roleMenu, ind){
    const roleStart = document.createElement('div');
    roleStart.id = 'RMstart'
    roleStart.classList.add('RMdiv')
    roleMenu.appendChild(roleStart);

    Object.entries(allRoles).forEach(([team, alignments]) => {
        const teamButton = document.createElement('button');
        const teamDiv = document.createElement('div');
        teamDiv.id = "RM".concat(team, ind);
        teamDiv.classList.add("RMdiv");
        teamButton.addEventListener('click', () => {
            transfer("RM".concat(team, ind));
        });
        teamButton.innerText = team;

        roleStart.appendChild(teamButton);
        roleMenu.appendChild(teamDiv);

        const alignmentBackButton = document.createElement('button');
        alignmentBackButton.addEventListener('click', () => {
            transfer('RMstart');
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
            alignmentButton.innerText = alignment;

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
                roleButton.innerHTML = `<img class="RMimg" src="./images/roles/${roleNameRaw}.svg">`
                // const roleImg = document.createElement('img')
                // roleButton.innerHTML = 
                
                alignmentDiv.appendChild(roleButton);
                roleMenu.appendChild(roleDiv);


            });
        });
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