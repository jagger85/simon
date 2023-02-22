const notes = {
    1 : "How to play:<br>Train your memory and <br>remember the pattern <br>Don't forget to switch it on <br>Enjoy!",
    2 : 'For reset:<br>Press play button for <br> three seconds<br>Your current record is ' + (localStorage.getItem('level') ?? 0) +'<br>'+ getSentece(localStorage.getItem('level')),
    3 : 'Made with &nbsp;<i class="bi bi-heart"></i> &nbsp;by Jagger85'
};

export function printNote(){
    if(localStorage.getItem('note')== undefined) localStorage.setItem('note',1)
    document.getElementById('sticky-content').innerHTML = notes[localStorage.getItem('note')];
}

export function nextNote(){
    if(localStorage.getItem('note') > 2){
        localStorage.setItem('note',1)
        document.getElementById('sticky-content').innerHTML = notes[localStorage.getItem('note')];
    }
    else{
        localStorage.setItem('note',parseInt(localStorage.getItem('note'))+1)
        document.getElementById('sticky-content').innerHTML = notes[localStorage.getItem('note')];
    }
}

function getSentece(level){
    switch(true){
        case (level??0==0):
            return "Give a try and challenge yourself";

        case (level > 0 && level< 5):
            console.log('hola')
            return "You can do it better";

        case (level>4 && level<9):
            return "Wow impressive try to push harder";

        case (level>=9):
            return "OK YOU WIN!!!!";
    }
}
