$(document).ready(function(){
    var player;
    var opp;
    var pic;
    var oldSrc;
    var beginDiv;
    var round=1;
    var originalPower;
    
    
    var LandDiv;
  
    var pb={name:"Princesss BubbleGum",life:170,power:15, src1: "assets/images/pb1.png",src2:"assets/images/pbFSm.png", 
    weaponSrc: "assets/images/pbWeap.png",};
    
    var fin={name:"Finn",life:220,power:10, src1: "assets/images/fin1.png",src2:"assets/images/finFSm.png",
    weaponSrc: "assets/images/finWeap.png" };
   
    var jake={name:"Jake",life:150,power:20, src1: "assets/images/jake1.png",src2:"assets/images/jakeFSm.png",
    weaponSrc: "assets/images/jakeWeap.png" };
   
    var marcy={name:"Marceline",life:140,power:25, src1: "assets/images/marcy1.png",src2:"assets/images/marcyFSm.png",
    weaponSrc: "assets/images/marcyWeap.png" };
   
    var ice={name:"Ice King",life:350,power:5, src1: "assets/images/ice1.png",src2:"assets/images/iceFSm.png",
    weaponSrc: "assets/images/iceWeap.png" };
   
    var pbut={name:"Peppermint Butler",life:130,power:30, src1: "assets/images/pbut1.png",src2:"assets/images/pbutFSm.png",
    weaponSrc: "assets/images/pbutWeap.png" };


    
    
    //add attack functions to objects & images perhaps

    var playersObjA=[fin,jake,pb,marcy,ice,pbut];
    var playersA=["fin","jake","pb","marcy","ice","pbut"];
    var labelName=["Finn","Jake", "P. Bubble", "Marceline","Ice King", "P.Butler"]
    var playersAvailableA=["fin","jake","pb","marcy","ice","pbut"];
    var refNum;
    var pObj;
    var oppObj;
    //console.log(playersObjA[2].name);
    for(var i=0; i<playersA.length; i++){
        var labelText="<p class='charLabel'><span class='name'>"+labelName[i]+
        "</span><span class='life'> Life="+playersObjA[i].life+
        " Power="+playersObjA[i].power+ "</span></p>";
        $("#"+playersA[i]).append(labelText);
    }

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
        originalPower=pObj.power;
              
        test();
                   
        for(var i=0; i<playersAvailableA.length; i++){
            var rDiv=$('#'+playersAvailableA[i]);
            rDiv.addClass('remDiv')
            rDiv.appendTo("#containerRemaining");
            
        }
              
        $('#begin').remove();
        
        $('.preFightDiv').off('click');
        $("#titl").html("");
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
        $('.preFightDiv').off('click');
        $("#remainTitle").html("CHOOSE AN OPPONENT");
        $("h1").append("<p class='no-margin'>Your Character is "+pObj.name+ "</p><p class='no-margin'>Power="+pObj.power+ " Life="+pObj.life+"</p>");
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
        $("#fightButt").attr('disabled', true);
        setTimeout(function(){
            $("#fightButt").attr('disabled', false);
        }, 3000);
        $("#lifePlayer").css("background-color", "white");
        $("#lifeOpp").css("background-color", "white");
        $("#powerPlayer").css("background-color", "white");
        $("#playerWeap").remove();
        $("#oppWeap").remove();
        $("#chosenFighter").append('<img id="playerWeap" src='+pObj.weaponSrc+' />');
        $("#chosenOpponent").append('<img id="oppWeap" src='+oppObj.weaponSrc+' />');
        //player Attacks
        oppObj.life=oppObj.life-pObj.power;
        pObj.power=pObj.power+originalPower;
        pObj.life=pObj.life-oppObj.power;
       
        $("#chosenP").attr('src',pObj.src2);
        $("#chosenO").attr('src',oppObj.src2);
        $("#oppWeap").animate({ opacity: "1" });
        $("#playerWeap").animate({ opacity: "1" });
        
        attack();
        counter();



        var playerAttack = setTimeout(function() {
          $("#chosenP").attr('src',pObj.src1);
          $("#chosenO").attr('src',oppObj.src1);
        }, 3000);

        

        setTimeout(function(){
            $("#lifeOpp").css("background-color", "red");
            $("#powerPlayer").css("background-color", "lightblue");
            $("#lifePlayer").css("background-color", "red");
            updateStats(pObj,"Player");
            updateStats(oppObj,"Opp");
       }, 2000);

        //console.log(playersAvailableA);
        // if(pObj.life==0||oppObj.life==0){
        //     $("#fightButt").attr('disabled', true);

        // }
        //setTimeout(function(){
            if(pObj.life<=0){
                lose();
            };
            if(oppObj.life<=0&&pObj.life>0){
                if(playersAvailableA.length==0){
                    win();
                }
                else{
                    clearOut();
                };
            
            };
            

        //},4000);

           
        
        
        
    }
    

    function attack(){
        console.log("ppooop");
        $("#playerWeap").animate({left: "100vw" }, 1000);
        };
    function counter(){
        console.log("pplllooop");
        $("#oppWeap").animate({left: "-100vw" }, 1000);
        };
    

    function clearOut(){
        console.log('clear');
        $("#defeatTitle").html("DEFEATED OPPONENTS");
        $("#containerDefeated").append("<img class='defeated' src="+oppObj.src1+" />")
        $("#titl").html("YOU BEAT "+(oppObj.name));
        $("#containerFight").remove();
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



