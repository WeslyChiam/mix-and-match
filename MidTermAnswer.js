    //STATIC VARIABLE - every function call, variable will continue from previous value
    findMatch.firstClick = 0; //keep the picture id first click by user
    findMatch.secondClick = 0;
    findMatch.matchPic = 0;
    let interval = null;
    let time = 0; minute = 0; second = 0; displayMin = 0, displaySec = 0; rank = 0; move = 0; 
    let numberOfCells = 12;
    var cell = []; //Store individual cells in array
    var status = true; //true:playing, false:game over
    
    //Start the game, shuffle card and reset current rank once page loaded 
    window.onload = newGame(); 

    //Function for new game 
    function newGame(){
        console.log(cell); 
        shuffle(); 
        console.log(cell); 
        window.clearInterval(interval); 
        rank = 0; move = 0;  
        time = 0; minute = 0; second = 0; 
        window.setInterval(timer, 1000);

    }
  
    //Function for timer 
    function timer(){  
                second++;
                if(second == 60){
                    minute++; 
                    second = 0; 
                }
                if(second < 10){
                    displaySec = "0" + second.toString(); 
                }else{
                    displaySec = second.toString(); 
                }
                if(minute < 10){
                    displayMin = "0" + minute.toString(); 
                }else{
                    displayMin = minute.toString(); 
                }
                time = displayMin + ":" + displaySec;
                document.getElementById("time").innerHTML = time;  
    }

    function setRank(move){
        if (move <= 10){
            rank = "S"; 
        }else if(move <= 15 && move >10){
            rank = "A"; 
        }else if(move <= 20 && move > 15){
            rank = "B";
        }
        else{
            rank = "C"; 
        }
        return rank; 
    }

    //Shuffle the cell
    function shuffle(){
        // load default place into array 
        while(cell.length < 13){ //Should use while loop, for loop will break (var i = 0; i < 13; i++)
                var randomNum = Math.floor(Math.random() * (12 - 1) + 1); //Generate random number from 1 to 12
                if(cell.indexOf(randomNum) === -1){ //Check if the number is unique among the array
                    cell.push(randomNum); //Push each unique random number into array
                } 
        } 
    }


    function findMatch(x) {
        switch(x){
            case cell[1] : case cell[10] : findMatch.picName = 'pic1.jpg';break;
            case cell[2] : case cell[12] : findMatch.picName = 'pic3.jpg';break;
            case cell[3] : case cell[8] : findMatch.picName = 'pic6.jpg';break;
            case cell[4] : case cell[11] : findMatch.picName = 'pic5.jpg';break;
            case cell[5] : case cell[6] : findMatch.picName = 'pic2.jpg';break;
            case cell[7] : case cell[9] : findMatch.picName = 'pic4.jpg';break;
        }

        move++; 

        if(findMatch.firstClick == 0) {
            document.getElementById('img' + x.toString()).src = findMatch.picName;
            findMatch.firstClick = x;
        }else if(findMatch.secondClick==0){
            document.getElementById('img' + x.toString()).src = findMatch.picName;
            alert
            findMatch.secondClick = x;

            if((findMatch.firstClick==1 && findMatch.secondClick==10)
                || (findMatch.firstClick==2 && findMatch.secondClick==12)
                || (findMatch.firstClick==3 && findMatch.secondClick==8)
                || (findMatch.firstClick==4 && findMatch.secondClick==11)
                || (findMatch.firstClick==5 && findMatch.secondClick==6)
                || (findMatch.firstClick==7 && findMatch.secondClick==9)){
                findMatch.matchPic++;
                document.getElementById('match').hidden = false;
                document.getElementById('notmatch').hidden = true;
                move++; 
            }else{
                document.getElementById('match').hidden = true;
                document.getElementById('notmatch').hidden = false;
                document.getElementById('img' + findMatch.firstClick.toString()).src = 'clickme.jpeg';
                document.getElementById('img' + findMatch.secondClick.toString()).src = 'clickme.jpeg';
                move++; 
            }
            findMatch.firstClick = 0;
            findMatch.secondClick = 0;
        }
        if(findMatch.matchPic == 6){
            alert('CONGRATULATIONS. GAME OVER');
            for(i=1;i<=12;i++){
                document.getElementById('img'+i.toString()).onclick=noRespond;
            }
        }
    }

    function noRespond(){
        document.getElementById('match').hidden = true;
        document.getElementById('notmatch').hidden = true;
        document.getElementById('gameover').hidden = false;
    }