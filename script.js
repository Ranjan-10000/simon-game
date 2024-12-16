function create_pattern(pattern){

    var r=Math.random();
    r=r*4;
    r=Math.floor(r)+1;

    switch(r){

        case 1:
            button_pressed("green");
            pattern.push("green");
            break;
        
        case 2:
            button_pressed("red");
            pattern.push("red");
            break;

        case 3:
            button_pressed("yellow");
            pattern.push("yellow");
            break;
        
        case 4:
            button_pressed("blue");
            pattern.push("blue");
            break;
            
    }

    console.log("pattern: "+pattern);
    user_pattern=[];

}

function game_over(){

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },150);

    var sound=new Audio("sounds\\wrong.mp3");
    sound.play();

    $("h1").text("Game Over, Press Any Key to Restart");

    level=1;
    pattern=[];
    user_pattern=[];
    lost=1;
    f=0;
}


function button_pressed(id){


    var audio_file="sounds\\"+id+".mp3";

    id="#"+id;
    $(id).addClass("pressed");

    var sound=new Audio(audio_file);
    
    setTimeout(function(){
        $(id).removeClass("pressed");
    },100);

    sound.play();
}


function button_pressed_user(id){

    user_pattern.push(id);
    button_pressed(id);

    console.log("user pattern: "+user_pattern);

    for(var i=0;i<user_pattern.length;i++){

        if(user_pattern[i]!=pattern[i]){
            game_over();
        }
    }

}


var level=1;
var f=0;
var lost=0;
var pattern=[];
var user_pattern=[];


async function start_game(){

    while(!lost){

        var h1="Level "+level;

        $("h1").text(h1);

        setTimeout(function(){
            create_pattern(pattern);
        },1000);

        await wait_for_button_press();

        level++;

    }
}



function wait_for_button_press(){

    return new Promise((resolve)=>{

        var pressCount=0;

        $(".btn").on("click", function () {
            const id=$(this).attr("id");
            button_pressed_user(id);
            pressCount++;

            if (pressCount===pattern.length) {
                $(".btn").off("click");
                resolve();
            }
        });

    });
}


$(document).on("keydown", function(){

    console.log("f: "+f);

    if(f==0){
        f = 1;
        lost = 0;
        level = 1;
        pattern = [];
        user_pattern = [];
        start_game();
    }
});















