let h2 = document.querySelector("h2");
let colors = ["red","green","yellow","purple"];
let level = 0;
let gameSeq = [];
let userSeq = [];
let started = false;
let maxScore = 0;

document.addEventListener("keypress",function (){
    if(started==false)
    {
        started = true;
        levelUp();
    }
})

function flasher(obj)
{
        obj.classList.add("flash");
        setTimeout(function(){
            obj.classList.remove("flash");
        }, 250);
}

function userFlasher(obj)
{
        obj.classList.add("userFlash");
        setTimeout(function(){
            obj.classList.remove("userFlash");
        }, 250);
}

function levelUp()
{
        userSeq = [];
        level++;
        h2.innerText = `Level ${level}`
        let idx = Math.floor(Math.random()*4);
        let col = colors[idx];
        let obj = document.querySelector(`.${col}`);
        gameSeq.push(col);
        flasher(obj);
}

let boxes = document.querySelectorAll(".boxes");
for(i = 0;i<boxes.length;i++)
{
    boxes[i].addEventListener("click",function ()
{
    if(gameSeq.length!=0)
    {
        userFlasher(this);
        let userCol = this.attributes.id.value;
        userSeq.push(userCol);
        check(userSeq.length-1);
    }
});
}

function check(idx)
{
    if(userSeq[idx]==gameSeq[idx])
    {
        if(userSeq.length==gameSeq.length)
            setTimeout(levelUp,1000);
    }
    else
    {
        score = level-1;
        maxScore = Math.max(maxScore,score);
        h2.innerHTML = `Game Over!<br>Your score is: ${score}<br><b>Highest score is ${maxScore}<b><br> Press any key to start`;
        let body = document.querySelector("body");
        reset(body);
    }
}

function reset(body)
{
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    body.classList.add("beep");
    setTimeout(function ()
    {
        body.classList.remove("beep")
    },250);
}