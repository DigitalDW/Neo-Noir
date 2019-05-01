// DOM Elements

const textMenu = document.getElementById("menuText");
const button = document.getElementById("startButton");
const newGameButton = document.getElementById("newGame");
const textBox = document.getElementById("textBox");
const dialogueBox = document.getElementById("dialogueBox");
const buttonBox = document.getElementById("buttonBox");
const html = document.querySelector("html");
const audio = document.getElementById("audio");
const svg = document.querySelector("svg");
const textIntro = document.getElementById("textIntro");
const skipButton = document.getElementById("skipButton");
const skipButtonBox = document.getElementById("skipButtonBox");
const texts = document.getElementById("texts");
const choiceBox = document.getElementById("choices");
const endText = document.getElementById("endText");
const endStats = document.getElementById("endStats");
const startAgain = document.getElementById("startAgain");
let failSafe = true;
let status = {}

// Story object
const story = {
    scene1: {
        text: () => `It's a rather calm, rainy night. You just ended your shift, so, you decide to go get a drink.
        You head to your car and drive to the nearest bar. Upon your arrival, you sit at the bar, near the 
        <span class="highlight2">
        jukebox
        </span>.
        You look around. <br/>
        The place is comfy - there's just enough light and a soothing music. There are a few people sitting 
        here and there around the room, though, 
        <span class="highlight2">
        you don't feel like talking to anyone right now
        </span>. 
        The 
        <span class="highlight2">
        bartender
        </span> 
        takes a quick glance at you.`,
        choices: [ {
            option: () => `Order a drink`,
            action: function(){
                status.drunkness ++;
                status.currentScene = "story.scene1_orderDrink1";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_orderDrink1);
            },
        },
        {
            option: () => `Change the music`,
            action: function(){
                status.currentScene = "story.scene1_changeMusic";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_changeMusic);
            },
        },
        {
            option: () => `Just sit down and relax`,
            action: function(){
                status.currentScene = "story.scene1_didNothing";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_didNothing);
            },
        } ],
    },
    scene1_didNothing: {
        text: () => `You decide to relax for a while. The whole room is filled with a fine veil of smoke. 
        The walls are covered in posters. One of them piques your interest: it's a missing person poster. The 
        fog hides the picture, but you can read 
        <span class="highlight1">
        "MISSING: Claire, female, 26yo, 1.68 m, red hair, black clothes, last seen: 20th July."
        </span> 
        "She's been missing for two days already", you think to yourself. But you don't think too much of it and continue 
        looking around. <br/>
        You quickly spot a 
        <span class="highlight2">
        weird device
        </span> 
        on a table next to the wall behind you. It's some sort of tablet. Since there is 
        no one currently sitting there, you walk to the table and pick up the unknown machine. It starts beeping as 
        soon as you pick it up.`,
        choices: [ {
            option: () => `Answer the call`,
            action: function(){
                status.currentScene = "story.scene1_answerPager";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_answerPager);
            }
        },
        {
            option: () => `Ignore the call and sit back down`,
            action: function(){
                changeMusic("./audio/limelight.mp3");
                status.musics.liLi = true;
                status.currentScene = "story.scene1_ignoredCall";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_ignoredCall);
            }
        } ]
    },
    scene1_changeMusic: {
        text: () => `You think that the music is nice, but you feel like spicing things up.
        So, you pull a coin out of your pocket and put it in the 
        <span class="highlight1">
        jukebox
        </span>. 
        You gather three specific songs that, in your opinion, will fit much better 
        with your mood and the atmosphere of the bar. <br/><br/>
        You hesitate a while before finally 
        <span class="hightlight2">
        selecting the next song
        </span>.`,
        choices: [ {
            option: () => `"Resonance" by HOME`,
            action: function(){
                changeMusic("./audio/resonance.mp3");
                status.musics.res = true;
                status.currentScene = "story.scene1";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1);
            }
        },
        {
            option: () => `"Turbo Killer" by Carpenter Brut`,
            action: function(){
                changeMusic("./audio/turbo_killer.mp3");
                status.musics.tK = true;
                status.currentScene = "story.scene1";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1);
            }
        },
        {
            option: () => `"Days of Thunder" by The Midnight`,
            action: function(){
                changeMusic("./audio/days_of_thunder.mp3");
                status.musics.dOT = true;
                status.currentScene = "story.scene1";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1);
            },
        } ]
    },
    scene1_orderDrink1: {
        text: () => `You ask the 
        <span class="highlight1">
        bartender
        </span> 
        for a drink. You order as usual: a nice, cold, 
        <span class="highlight1">
        red
        </span> 
        ale. You start sipping it. As the cold brew runs down your throat, 
        you think about your day at work. Things are not always easy when you're a car mechanic, but hey, 
        it's part of the job. <br/><br/>
        You finish your 
        <span class="highlight2">
        drink
        </span>.`,
        choices: [ {
            option: () => `Order another drink`,
            action: function(){
                status.drunkness ++
                status.currentScene = "story.scene1_orderDrink2";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_orderDrink2);
            },
        },
        {
            option: () => `Just sit down and relax`,
            action: function(){
                status.currentScene = "story.scene1_didNothing";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_didNothing);
            },
        } ],
    },
    scene1_orderDrink2: {
        text: () => `You ask the 
        <span class="highlight1">
        bartender
        </span> 
        for another drink. You still decide to order 
        <span class="highlight1">
        as usual
        </span>. 
        While you start your second drink, a man at the bar starts talking to you. Politely, you listen to him. 
        The guy is a police officer. He tells you about 
        <span class="highlight1">
        the ongoing investigations on the disappearance of a girl named Claire
        </span>. 
        Apparently the cops are getting there, but the lack of evidence slows the whole operation down. You ask 
        him about the last location of the girl. He says that she reportedly left her university campus 
        at around midnight and never came back. <br/><br/>
        Your drink is running out, the officer asks to 
        <span class="highlight2">
        offer you a drink
        </span>.`,
        choices: [ {
            option: () => `Accept the offer`,
            action: function(){
                status.drunkness ++;
                status.metTheCop = true;
                status.currentScene = "story.scene1_orderDrink3";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_orderDrink3);
            },
        },
        {
            option: () => `Refuse the offer and relax on your own`,
            action: function(){
                status.currentScene = "story.scene1_didNothing";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_didNothing);
            },
        } ],
    },
    scene1_orderDrink3: {
        text: () => `You thank the officer and ask the 
        <span class="highlight1">
        bartender
        </span> 
        for another drink. You decide to order 
        <span class="highlight1">
        a sctoch
        </span>. 
        While you start your drink, the officer tells you about his life, how he's struggling to pay for his child support 
        and what not. At some point, you get a text from your lover and interrupt the conversation with the cop.
        The message reads: 
        <span class="highlight1">
        "Hey babe! My shift was shorter than expected, wanna come over tonight?"
        </span>.<br/><br/>
        You finish your scotch and think about what you want to do.`,
        choices: [ {
            option: () => `Answer the text`,
            action: function(){
                changeMusic("./audio/gloria.mp3");
                status.musics.glo = true;
                status.currentScene = "story.scene1_answerText";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_answerText);
            },
        },
        {
            option: () => `Answer the text later`,
            action: function(){
                status.currentScene = "story.scene1_didNothing";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_didNothing);
            },
        } ],
    },
    scene1_answerText: {
        text: () => `You feel like you drank enough. You feel the alcohol making you much more 
        <span class="highlight1">
        amorous
        </span> 
        than usual. 
        You text back saying you're on your way. The officer wishes you a good night and tells you that you should 
        <span class="highlight1">
        enjoy your relationships while they last
        </span>. 
        You thank him and get out of the bar. <br/><br/>
        Because you're drunk, you decide to walk to your partner's home. It's only a twenty minutes walk from here. 
        You shrug your shoulders under the rain and get on your way. You feel good. Maybe it's only the alcohol, 
        but you don't care; you go in the distance with a 
        <span class="hightlight1">
        smile
        </span> 
        on your face.`,
        choices: [ {
            option: () => `The end`,
            action: function(){
                status.endings.goSeeLover = true;
                localStorage.setItem('game', JSON.stringify(status));
                thanksForPlaying();
            }
        } ]
    },
    scene1_ignoredCall: {
        text: () => `You decide to ignore the call and put the device back on the table, as if nothing happened. You 
        wonder who that could have been, but you've got your own things to do. <br/>
        You think about your lover. You suddenly feel the urge to make sure they are fine. You decide to call them. 
        They pick up...`,
        choices: [ {
            option: () => `The end`,
            action: function(){
                status.endings.dontAnswerPager = true;
                localStorage.setItem('game', JSON.stringify(status));
                thanksForPlaying();
            }
        } ]
    },
    scene1_answerPager: {
        text: () => `You answer the call. On the other end, you hear a femal voice calling for help:<br/>
        <span class="highlight1">
        "Hello? Anyone here? If you hear me, please come rescue me at .::[]/_. .*;-!- My car is brok-[-/ .-_. ,,- 
        If you hear me, please, please c-.__*, -/ #=-.ello...? //^-.e.-lo...? {/elp m.-.!#*´^.! {Please send 
        he-**][! ............................ease...
        </span><br/><br/>
        The connection seems to have been lost.`,
        choices: [ {
            option: () => `Try to call back`,
            action: function(){
                status.currentScene = "story.scene1_callBack";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_callBack);
            },
        },
        {
            option: () => `Try to locate to origin of the call`,
            action: function(){
                status.currentScene = "story.scene1_tryLocate";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_tryLocate);
            }
        },
        {
            option: () => `Ask ${status.metTheCop ? "the cop" : ""} for help`,
            action: function(){
                status.currentScene = "story.scene1_askedForHelp";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_askedForHelp)
            }
        } ]
    },
    scene1_callBack: {
        text: () => `You don't know how the device works, but you try anyway. <br/><br/>
        After a few minutes, you still can't make it work. You give up on that option.`,
        choices: [ {
            option: () =>`Try to locate to origin of the call`,
            action: function(){
                status.currentScene = "story.scene1_tryLocate";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_tryLocate);
            }
        },
        {
            option: () => `Ask ${status.metTheCop ? "the cop" : ""} for help`,
            action: function(){
                status.currentScene = "story.scene1_askedForHelp";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_askedForHelp)
            }
        } ]
    },
    scene1_tryLocate: {
        text: () => `You think that you might ba able to locate the origin of the call if you open the machine. 
        Thanks to your job as a mechanic, you manage to crack open the device and find what appears 
        to be its 
        <span class="highlight2">
        emitter
        </span>. 
        You go back to your car to get some tools and try to locate the origin of the call.`,
        choices: [ {
            option: () => `Connect the emitter to your car's onboard computer`,
            action: function(){
                status.currentScene = "story.scene1_carEmitter";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_carEmitter)
            }
        },
        {
            option: () => `Find the emitter's chip`,
            action: function(){
                status.currentScene = "story.scene1_emitterChip";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_emitterChip)
            },
        },
        {
            option: () => `Go back inside and ask ${status.metTheCop ? "the cop" : ""} for help`,
            action: function(){
                status.currentScene = "story.scene1_askedForHelp";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene1_askedForHelp)
            }
        } ]
    },
    scene1_carEmitter: {
        text: () => `You decide to connect the emitter to your onboard computer, hoping to by able to get the 
        information of the call from the internal chip of the 
        <span class="hightligh1">
        device
        </span>.<br/>
        You manage to successfully connect it to your computer. After a few minutes of digging into the files, 
        you find what appears to be 
        <span class="highlight2">
        coordinates
        </span>.<br/>
        You type them in your GPS, hoping they would be valid. Lucky you, they are! The location is at a nearby forest, 
        about an hour away from here by foot.`,
        choices: [ {
            option: () => `Drive to coordinates`,
            action: function(){
                if(status.drunkness == 3){
                    changeMusic("./audio/Untitled.mp3");
                    status.musics.unt = true;
                    status.currentScene = "story.scene1_crash";
                    localStorage.setItem('game', JSON.stringify(status));
                    loadNextText(story.scene1_crash);
                }else{
                    story.wentToScene2 = "car";
                    status.currentScene = "story.scene2";
                    localStorage.setItem('game', JSON.stringify(status));
                    loadNextText(story.scene2)
                }
            }
        },
        {
            option: () => `Go there on foot`,
            action: function(){
                story.wentToScene2 = "foot";
                status.currentScene = "story.scene2";
                localStorage.setItem('game', JSON.stringify(status));
                loadNextText(story.scene2)
            }
        } ]
    },
    scene1_crash: {
        text: () => `You take your car and start to drive towards the 
        <span class="highlight1">
        coordinates
        </span>. 
        You start to feel dizzy and tired. Your eyes are eyelids are heavy. You close them for one second. 
        You hear a loud noise and you suddenly feel weightless. Your car flies over the bridge before 
        <span class="highlight1">
        crashing into a street light
        </span>. <br/><br/>
        Your head hurts. You look around you. There are people looking at you. Someone seems to be calling 
        the police. You close your eyes. Maybe driving after drinking so much was not a good idea.`,
        choices: [ {
            option: () => `The end`,
            action: function(){
                status.endings.drankTooMuch = true;
                localStorage.setItem('game', JSON.stringify(status));
                thanksForPlaying();
            }
        } ]
    },
    scene1_emitterChip: {
        text: () => `You take the emitter in your hand and try to use some finer tools to open it and get to its chip. 
        It seems to be glued in place. Therefore, you apply more force on the emitter, causing it to suddenly 
        <span class="highlight1">
        snap
        </span>. 
        It's definitely broken.<br/><br/>
        You don't have many choices left.`,
        choices: [ {
            option: () => `Go back inside and ask ${status.metTheCop ? "the cop" : ""} for help`,
            action: function(){
                status.emitterBroke = true;
                status.currentScene = "story.scene1_askedForHelp";
                localStorage.setItem('game', JSON.stringify(status));
                changeMusic("./audio/rust.mp3");
                status.musics.rus = true;
                loadNextText(story.scene1_askedForHelp)
            }
        } ]
    },
    scene1_askedForHelp: {
        text: () => `You ask ${
            status.metTheCop ? 
                `<span class="highlight1">the cop</span>` : 
                `people`
            } 
        at the bar for help. ${
            status.metTheCop ? 
                `The officer asks you what it's all about.<br/>` : 
                `One man at the bar turns around and says: "I'm a police officer, I can help".<br/>`
            }
        You tell the cop about the device, the call and its possible link to the investigations on 
        <span class="highlight1">
        Claire
        </span>. 
        He immediately takes the strange machine from your hands and takes out another weird device from his coat's 
        pocket. <br/>
        "It's a communication tool. I can get information on the location of the call..."
        ${status.emitterBroke ? 
            `<br/>
            After a few seconds, he turns around and says: "Wait... It's 
            <span class="highlight2">
            broken
            </span>. 
            I can't read the information." <br/>
            A cold chill runs down your spine. You let the device to the officer, tell him you're sorry 
            and sit back down. You ordrer one more drink, hoping to forget what happened.` : 
            `<br/>
            Soon enough, he tells you he found the 
            <span class="highlight2">
            coordinates
            </span> and that he will go to the police station right away. 
            You take a quick glance at the information and go to your car.`
        }`,
        choices: [ {
            option: () => `${status.emitterBroke ? `The end` : `Drive to the coordinates`}`,
            action: function(){
                if(status.emitterBroke){
                    status.endings.brokeEmitter = true;
                    localStorage.setItem('game', JSON.stringify(status));
                    thanksForPlaying();
                }else if(status.drunkness == 3){
                    changeMusic("./audio/Untitled.mp3");
                    status.currentScene = "story.scene1_crash";
                    localStorage.setItem('game', JSON.stringify(status));
                    loadNextText(story.scene1_crash);
                }else{
                    status.wentToScene2 = "car";
                    status.currentScene = "story.scene2";
                    localStorage.setItem('game', JSON.stringify(status));
                    loadNextText(story.scene2);
                }
            }
        } ]
    },
    scene2: {
        text: () => `Coming soon`,
        choices: [ {
            option: () => `Coming soon`,
            action: function(){
                console.log("coming soon")
            },
        } ]
    }
}

// Events handlers
button.addEventListener("click", start);
newGameButton.addEventListener("click", startNewGame);
startAgain.addEventListener("click", startWithOldStats);
skipButton.addEventListener("click", function(){
    loadMenu();
});

// Function to start a new game
function start(){
    html.style.width = "100%";
    html.style.height = "100%";
    textBox.style.display = "block";
    dialogueBox.style.display = "block";
    texts.style.display = "block";
    choiceBox.style.display = "block";
    buttonBox.style.display = "none";
    newGameButton.style.display = "none";
    button.style.display = "none";
    startAgain.style.display = "none";
    // audio.src = "";
    status = JSON.parse(localStorage.getItem('game'));
    audio.src = status.currentMusic;
    loadNextText(eval(status.currentScene));
}

function startNewGame(){
    html.style.width = "100%";
    html.style.height = "100%";
    textBox.style.display = "block";
    dialogueBox.style.display = "block";
    texts.style.display = "block";
    choiceBox.style.display = "block";
    buttonBox.style.display = "none";
    button.style.display = "none";
    newGameButton.style.display = "none";
    startAgain.style.display = "none";
    audio.src = "./audio/femme_fatale.mp3";
    // audio.src = "";
    
    status =  {
        drunkness: 0,
        metTheCop: false,
        wentToScene2: "",
        emitterBroke: false,
        currentScene: "story.scene1",
        currentMusic: "./audio/femme_fatale.mp3",
        musics: {
            dOT: false,
            fF: true,
            glo: false,
            liLi: false,
            res: false,
            rus: false,
            tW1K: true,
            tK: false,
            unt: false,
        },
        endings: {
            dontAnswerPager: false,
            goSeeLover: false,
            drankTooMuch: false,
            brokeEmitter: false,
        }
    }

    localStorage.setItem('game', JSON.stringify(status));

    loadNextText(eval(status.currentScene))
}

function startWithOldStats(){
    html.style.width = "100%";
    html.style.height = "100%";
    textBox.style.display = "block";
    dialogueBox.style.display = "block";
    texts.style.display = "block";
    choiceBox.style.display = "block";
    buttonBox.style.display = "none";
    newGameButton.style.display = "none";
    button.style.display = "none";
    startAgain.style.display = "none";
    endText.style.display = "none";
    endStats.style.display = "none";
    // audio.src = "";
    status = JSON.parse(localStorage.getItem('game'));
    status.currentScene = "story.scene1";
    status.drunkness = 0;
    status.metTheCop = false;
    status.wentToScene2 = "";
    status.emitterBroke = false;
    localStorage.setItem('game', JSON.stringify(status));
    loadNextText(eval(status.currentScene));
}

// Function to skip intro and load menu
function loadMenu(){
    if(failSafe){
        textIntro.innerHTML = "";
        svg.style.display = "block";
        newGameButton.style.display = "block";
        buttonBox.style.display = "block";
        endText.style.display = "none";
        endStats.style.display = "none";
        textMenu.style.display = "none";
        textIntro.style.display = "none";
        skipButton.style.display = "none";
        skipButtonBox.style.display = "none";
        endText.style.display = "none";
        endStats.style.display = "none";
        if (localStorage.getItem("game") === null){
            button.style.display = "none";
        }else{
            button.style.display = "block";
            html.style.height = "33%";
        }
        failSafe = false;
    }
}

// Onload function: play music and roll intro
function startMusic(){
    audio.src = "./audio/tainted_with_one_kiss.mp3";
    setTimeout(function(){ textIntro.innerHTML = "*..incoming transmission..*" }, 1050);
    setTimeout(function(){ textIntro.innerHTML = "" }, 6200);
    setTimeout(function(){ textIntro.innerHTML = "\"Hello?\"" }, 9000);
    setTimeout(function(){ textIntro.innerHTML = "" }, 14000);
    setTimeout(function(){ textIntro.innerHTML = "\"Anyone here?\"" }, 17000);
    setTimeout(function(){ textIntro.innerHTML = "" }, 22200);
    setTimeout(function(){ textIntro.innerHTML = "\"If you hear me, please come rescue me at .::[]/_..*;-!-\"" }, 24900);
    setTimeout(function(){ textIntro.innerHTML = "" }, 30100);
    setTimeout(function(){ textIntro.innerHTML = "\"My car is brok-[-/.-_.,,-\"" }, 33000);
    setTimeout(function(){ textIntro.innerHTML = "" }, 38200);
    setTimeout(function(){ textIntro.innerHTML = "\"If you hear me, please, please c-.__*,]/\"" }, 39000);
    setTimeout(function(){ textIntro.innerHTML = "\"{#=-.ello...?\"" }, 41000);
    setTimeout(function(){ textIntro.innerHTML = "" }, 45100);
    setTimeout(function(){ textIntro.innerHTML = "\"{//^-.e.-lo...?\"" }, 49000);
    setTimeout(function(){ textIntro.innerHTML = "" }, 53000);
    setTimeout(function(){ textIntro.innerHTML = "\"{/elp m.-.!#*´^.!\"" }, 56900);
    setTimeout(function(){ textIntro.innerHTML = "" }, 61100);
    setTimeout(function(){ textIntro.innerHTML = "\"{Please send he-**][!\"" }, 65000);
    setTimeout(function(){ textIntro.innerHTML = "" }, 68950);
    setTimeout(function(){ textIntro.innerHTML = "\".........................\"" }, 71000);
    setTimeout(function(){ textIntro.innerHTML = "\"...ease...\"" }, 72200);
    setTimeout(function(){ loadMenu(); }, 73000);
}

function loadNextText(scene){
    text = scene.text();
    texts.innerHTML = text;
    displayChoices(scene.choices);
}

function displayChoices(choices){
    let oldChoices = document.querySelectorAll("div.choice");
    oldChoices.forEach(element => {
        choiceBox.removeChild(element)
    });
    for(let i=0; i<choices.length;i++){
        let choice = document.createElement("div");
        choice.className = "choice";
        choice.addEventListener("click", choices[i].action);
        let choiceText = document.createElement("p");
        choiceText.className = "choiceText";
        
        text = choices[i].option;
        choiceText.innerHTML = text();

        choice.appendChild(choiceText);
        choiceBox.appendChild(choice);
    }
}

function changeMusic(music){
    audio.src = music;
    status.currentMusic = music;
}

function thanksForPlaying(){
    html.style.width = "50%";
    html.style.height = "40%";
    textBox.style.display = "none";
    dialogueBox.style.display = "none";
    texts.style.display = "none";
    choiceBox.style.display = "none";
    endText.style.display = "inline";
    endStats.style.display = "inline";
    buttonBox.style.display = "block";
    startAgain.style.display = "block";
    let musicsFound = Object.values(status.musics).filter(Boolean).length;
    let musicsTotal = Object.values(status.musics).length;
    let endingsFound = Object.values(status.endings).filter(Boolean).length;
    let endingsTotal = Object.values(status.endings).length;
    endStats.innerHTML = `<br/><br/>You have found ${endingsFound} ${endingsFound > 1 ? "endings" : "ending"} out of 
        ${endingsTotal} and listened to ${musicsFound} out of ${musicsTotal} songs!<br/><br/>`;
}