$(document).ready(function(){
    var player;
    var opp;
    var pic;
    var oldSrc;
    var beginDiv;
    var round=1;
    
    
    var LandDiv;
    
   



    var pb={name:"Princesss BubbleGum",life:100,power:40, src1: "assets/images/pb1.png",src2:"assets/images/pbFSm.png", 
    weaponSrc: "assets/images/pbWeap.png",
    attack:function(){
        console.log("ppooop");
        $("#playerWeap").animate({left: "100vw" }, 1000);
        },
    counter:function(){
        console.log("pplllooop");
        $("#oppWeap").animate({left: "-100vw" }, 1000);
        }
    };
    var fin={name:"Finn",life:200,power:10, src1: "assets/images/fin1.png",src2:"assets/images/finFSm.png",
    weaponSrc: "assets/images/finWeap.png",
    attack:function(){
        $("#playerWeap").animate({left: "100vw" }, 1000);
        },
    counter:function(){
        console.log("ppooop");
        $("#oppWeap").animate({left: "-100vw" }, 1000);
        }
    };
    var jake={name:"Jake",life:120,power:20, src1: "assets/images/jake1.png",src2:"assets/images/jakeFSm.png",
    weaponSrc: "assets/images/jakeWeap.png",
    attack:function(){
        $("#playerWeap").animate({left: "100vw" }, 1000);
        },
    counter:function(){
        console.log("ppooop");
        $("#oppWeap").animate({left: "-100vw" }, 1000);
        }
    };
    var marcy={name:"Marceline",life:50,power:60, src1: "assets/images/marcy1.png",src2:"assets/images/marcyFSm.png",
    weaponSrc: "assets/images/marcyWeap.png",
    attack:function(){
        $("#playerWeap").animate({left: "100vw" }, 1000);
        },
    counter:function(){
        console.log("ppooop");
        $("#oppWeap").animate({left: "-100vw" }, 1000);
        }
    };
    var ice={name:"Ice King",life:250,power:5, src1: "assets/images/ice1.png",src2:"assets/images/iceFSm.png",
    weaponSrc: "assets/images/iceWeap.png",
    attack:function(){
        $("#playerWeap").animate({left: "100vw" }, 1000);
        },
    counter:function(){
        console.log("ppooop");
        $("#oppWeap").animate({left: "-100vw" }, 1000);
        }
    };
    var pbut={name:"Peppermint Butler",life:10,power:90, src1: "assets/images/pbut1.png",src2:"assets/images/pbutFSm.png",
    weaponSrc: "assets/images/pbutWeap.png",
    attack:function(){
        $("#playerWeap").animate({left: "100vw" }, 1000);
        },
    counter:function(){
        console.log("ppooop");
        $("#oppWeap").animate({left: "-100vw" }, 1000);
        }
    };
    
    //add attack functions to objects & images perhaps

    var playersObjA=[fin,jake,pb,marcy,ice,pbut];
    var playersA=["fin","jake","pb","marcy","ice","pbut"];
    var playersAvailableA=["fin","jake","pb","marcy","ice","pbut"];
    var refNum;
    var pObj;
    var oppObj;
    //console.log(playersObjA[2].name);


    $( ".preFightDiv" ).mouseenter(function(){
        pic=$("#"+this.id+"1");
        var newSrc= "assets/images/"+this.id+"FSm.png";
        oldSrc=pic.attr('src');
        pic.attr('src',newSrc);
    });
    $( ".preFightDiv").mouseleave(function(){
        pic.attr('src',oldSrc);
    });

    $(".preFightDiv").click(function(){
        choosePlayer(this.id);
    })



    function chooseRefNum(charac){
        refNum=playersA.indexOf(charac);
        cutIndex=playersAvailableA.indexOf(charac);
        playersAvailableA.splice(cutIndex,1);
    }

    function choosePlayer(p){
        player=p;
        chooseRefNum(player);
        pObj=playersObjA[refNum];
              
        test();
                   
        for(var i=0; i<playersAvailableA.length; i++){
            var rDiv=$('#'+playersAvailableA[i]);
            rDiv.addClass('remDiv')
            rDiv.appendTo("#containerRemaining");
            
        }
              
        $('#begin').remove();
        
        $('.preFightDiv').off('click');
        newRound(); 

    
    }
    function makeLandDiv(){
        $('#landTitle').html("CHOSE YOUR ARENA");
        for(var i=1; i<7; i++){
            $("#land").append("<img class='landPick' src=assets/images/candyScene"+i+".png />")
        }
        $(".landPick").click(function(){setUpFight($(this).attr("src"));
        });
       

    }
    function newRound(){

        $("#remainTitle").html("CHOOSE AN OPPONENT");
        $("h1").html("Your Character is "+pObj.name);
        $('.preFightDiv').on('click', function () {
                opp=this.id;
                chooseOpp();
        });
    }

    function chooseOpp(){
        
        chooseRefNum(opp);
        oppObj=playersObjA[refNum];
        $("h1").html(pObj.name +' vs '+oppObj.name);
        console.log(opp);
        
        $('#'+opp).remove();
        $('.preFightDiv').off('click');
        
        
        
        $('#remainTitle').html("OPPONENTS REMAINING");
        setUp();


    }
    function setUp(){
        console.log("hey");
        if(round==1){
            makeLandDiv();
        }
        else{
        $("#landArea").append(landDiv);
        }
       
    }
    function setUpFight(thi){
       
            landDiv=$('#landDiv').detach();

            var containerFight=$("<div id='containerFight'></div>");
            var chosenFighter=$("<div id='chosenFighter'></div>");
            var chosenOpponent=$("<div id='chosenOpponent'></div>");
            var fightButton=$("<button id='fightButt'>FIGHT!</button>");
            
            chosenFighter.append('<img id="chosenP" class="fightRowPic" src='+pObj.src1+' />')
            chosenOpponent.append('<img id="chosenO" class="img-hor fightRowPic" src='+oppObj.src1+' />');
            
            chosenFighter.appendTo(containerFight);
            fightButton.appendTo(containerFight);
            chosenOpponent.appendTo(containerFight);
            containerFight.appendTo($("#fightArea"));
            $('#containerFight').css("background-image","url("+thi+")");
            fightInfoDiv(pObj, "chosenFighter", "Player");
            fightInfoDiv(oppObj, "chosenOpponent", "Opp");
            fightButton.click(function(){
                attackOpp();
            });


            
        }; 

    

    function fightInfoDiv(fObj,divId,labelId){
        var infoDiv=$("<div class='infoDiv'></div>");
        var lID="life"+labelId;
        var pID="power"+labelId;
        var pLifeLabel=$("<p class='fighterLife' id="+lID+"> Life= "+fObj.life+"</p>");
        var pPowerLabel=$("<p class='fighterPower' id="+pID+"> Hit Power= "+fObj.power+"</p>");
        var pNameLabel=$("<p class='fighterName'>"+fObj.name+"</p>");
       
        infoDiv.append(pNameLabel);
        infoDiv.append(pLifeLabel);
        infoDiv.append(pPowerLabel);

        
        $("#"+divId).append(infoDiv);
        

    }
    function updateStats(fObj,labelId){
        $("#life"+labelId).html(" Life="+fObj.life);
        $("#power"+labelId).html(" Power="+fObj.power);

    }
    function attackOpp(){
        
        $("#playerWeap").remove();
        $("#oppWeap").remove();
        $("#chosenFighter").append('<img id="playerWeap" src='+pObj.weaponSrc+' />');
        $("#chosenOpponent").append('<img id="oppWeap" src='+oppObj.weaponSrc+' />');
        //player Attacks
        oppObj.life=oppObj.life-pObj.power;
        pObj.power+=pObj.power;
       
        $("#chosenP").attr('src',pObj.src2);
        $("#playerWeap").animate({ opacity: "1" });
        
        pObj.attack();

        var playerAttack = setTimeout(function() {
          $("#chosenP").attr('src',pObj.src1);
        }, 3000);

        updateStats(pObj,"Player");
        updateStats(oppObj,"Opp");

        setTimeout(function(){
            $("#lifeOpp").css("background-color", "red");
           $("#powerPlayer").css("background-color", "lightblue"); 
       }, 2000);
        console.log(playersAvailableA);
        
        setTimeout(function(){
          
            if(oppObj.life<=0&&pObj.life>0){
                if(playersAvailableA.length==0){
                    win();
                }
                else{
                    clearOut();
                };
            
            }
            if(pObj.life>0&&oppObj.life>0){
                    defend();
            }

        },3000);

           
        
        
        
    }
    function defend(){
        $("#lifeOpp").css("background-color", "white");
        $("#powerPlayer").css("background-color", "white");
        $("#oppWeap").animate({ opacity: "1" });
        oppObj.counter();
        $("#chosenO").attr('src',oppObj.src2);
        var oppAttack = setTimeout(function() {
          $("#chosenO").attr('src',oppObj.src1);
        }, 3000);
        
        pObj.life=pObj.life-oppObj.power;
        updateStats(pObj,"Player");
        updateStats(oppObj,"Opp");
        setTimeout(function(){
            if(pObj.life<=0){
            lose();
            };
        $("#lifePlayer").css("background-color", "red");

        }, 3000);
        
    }
    function clearOut(){
        console.log('clear');
        $("#titl").html("YOU WON THIS ROUND");
        $("#containerFight").remove();
        $($)
        round++;
        newRound();
     };
   
    function win(){
        
        $("#containerFight").remove();
        $("#defeatedOpps").remove();
        $("#remainArea").remove();
        $("#titl").html("YOU WIN");
        $("#titl").css("font-size","160px");
        var restartButton=$("<button id='restart'>NEW GAME</button>");
        restartButton.click(function(){restartGame();});
        $("#fightArea").append(restartButton);
        $("#fightArea").css("text-align","center");
        //$("#containerFight").css("align-items","center");
        //$("#containerFight").css("justify-content","center")
    }
    
    function test(){
        console.log(refNum);
        console.log(player);
        console.log(pObj.name);
    }
    function lose(){

        $("#containerFight").remove();
        $("#defeatedOpps").remove();
        $("#remainArea").remove();
        $("#titl").html("YOU LOSE");
        $("#titl").css("font-size","160px");
        var restartButton=$("<button id='restart'>NEW GAME</button>");
        restartButton.click(function(){restartGame();});
        $("#fightArea").append(restartButton);
        $("#fightArea").css("text-align","center");
        //$("#containerFight").css("align-items","center");
        //$("#containerFight").css("justify-content","center");
    }
    
    function restartGame(){
        
        window.location.reload(true);
        

    }

});



