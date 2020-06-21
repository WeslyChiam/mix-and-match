    //STATIC VARIABLE - every function call, variable will continue from previous value
    findMatch.firstClick = 0; //keep the picture id first click by user
    findMatch.secondClick = 0;
    findMatch.matchPic = 0;
    let interval = null;
    let time = 0; minute = 0; second = 0; displayMin = 0, displaySec = 0; rank = 0; move = 0; 
    var cell = []; //Store individual cells in array
    var status = true; //true:playing, false:game over
    
    //Start the game, shuffle card and reset current rank once page loaded 
    window.onload = newGame(); 

    //Function for new game 
    function newGame(){
        console.log(cell); 
        shuffle(); 
        console.log(cell); //If this array is not reveal, better check 
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
                timeForRecord = (minute * 60) + second; //Easy for records as seconds
                document.getElementById("timeDisplay").innerHTML = time;  
    }

    function setRank(){
        if (move <= 10){
            if(timeForRecord <=180){
                rank = "S"; 
            }else if(timeForRecord <= 300 && timeForRecord > 180){
                rank = "A"; 
            }else if(timeForRecord <= 480 && timeForRecord > 300){
                rank = "B"; 
            }
        }else if(move <= 15 && move >10){
            if(timeForRecord <= 180){
                rank = "A";
            }else if(timeForRecord <= 300 && timeForRecord > 180){
                rank = "A"; 
            }else if(timeForRecord <= 480 && timeForRecord > 300){
                rank = "B"; 
            }
        }else if(move <= 20 && move > 15){
            if(timeForRecord <=180){
                rank = "B"; 
            }else if(timeForRecord <= 300 && timeForRecord > 180){
                rank = "B"; 
            }else if(timeForRecord <= 480 && timeForRecord > 300){
                rank = "C"; 
            }
        }
        else{
            rank = "C"; 
        } 

        //Record previoius rank to display(requires database)
        document.getElementById("rankDisplay").innerHTML = "Rank:" + rank; 
        document.getElementById("rankTime").innerHTML =  "Time:" + timeConvert(timeForRecord); 
        document.getElementById("rankMove").innerHTML = "Moves:" + move; 
    }

    //Shuffle the cell
    function shuffle(){
        // load default place into array 
        while(cell.length < 12){ //Should use while loop (cell.length < 13), for loop will break (var i = 0; i < 13; i++)
                var randomNum = Math.floor(Math.random() * (13)); //Generate random number from 1 to 12
                if(cell.indexOf(randomNum) === -1) {
                    if(randomNum != 0){
                        cell.push(randomNum);
                    }
                }//Check if the number is unique among the array           
        } 
    }

    //Convert timeForRecord from seconds to minute and seconds
    function timeConvert(timeForRecord){
        let timeConverted = 0;
        let convertedMinute = Math.floor(timeForRecord/60);
        let remainingSeconds = timeForRecord - (convertedMinute * 60); 
        let displayRemainigSeconds = 0; 
        if (remainingSeconds <= 9 && remainingSeconds != 0){
            displayRemainigSeconds = "0" + remainingSeconds.toString(); 
        }else{
            displayRemainigSeconds = remainingSeconds.toString();
        }
        if(remainingSeconds == 0){
            timeConverted = convertedMinute; 
        }else{
            timeConverted = convertedMinute + ":" + displayRemainigSeconds;
        }
        return timeConverted; 
    }

    //function to track number of moves
    function setMove(){
        move++; 
        if(move <= 9){
            moveDisplay = "0" + move.toString(); 
        }
        else if(move == 3){
            moveDisplay = "0" + move.toString();
        }
        else{
            moveDisplay = move.toString();
        }
        document.getElementById("moveCounter").innerHTML = moveDisplay; 
    }

    function findMatch(x) {
        switch(x){
            case cell[0] : case cell[2] : findMatch.picName = 'pic1.jpg';break;
            case cell[1] : case cell[3] : findMatch.picName = 'pic3.jpg';break;
            case cell[4] : case cell[5] : findMatch.picName = 'pic6.jpg';break;
            case cell[6] : case cell[9] : findMatch.picName = 'pic5.jpg';break;
            case cell[7] : case cell[10] : findMatch.picName = 'pic2.jpg';break;
            case cell[8] : case cell[11] : findMatch.picName = 'pic4.jpg';break;
        } 

        if(findMatch.firstClick == 0) {
            setMove(); //Every times a click on image will increase move counter
            document.getElementById('img' + x.toString()).src = findMatch.picName; 
            findMatch.firstClick = x;
        }else if(findMatch.secondClick==0){
            setMove(); //Every times a click on image will increase move counter
            document.getElementById('img' + x.toString()).src = findMatch.picName; 
            alert
            findMatch.secondClick = x;

            if((findMatch.firstClick==cell[8] && findMatch.secondClick==cell[11])
                || (findMatch.firstClick==cell[0] && findMatch.secondClick==cell[2])
                || (findMatch.firstClick==cell[1] && findMatch.secondClick==cell[3])
                || (findMatch.firstClick==cell[4] && findMatch.secondClick==cell[5])
                || (findMatch.firstClick==cell[6] && findMatch.secondClick==cell[9])
                || (findMatch.firstClick==cell[7] && findMatch.secondClick==cell[10])
                || (findMatch.firstClick==cell[11] && findMatch.secondClick==cell[8])
                || (findMatch.firstClick==cell[2] && findMatch.secondClick==cell[0])
                || (findMatch.firstClick==cell[3] && findMatch.secondClick==cell[1])
                || (findMatch.firstClick==cell[5] && findMatch.secondClick==cell[4])
                || (findMatch.firstClick==cell[9] && findMatch.secondClick==cell[6])
                || (findMatch.firstClick==cell[10] && findMatch.secondClick==cell[7])){
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
                setRank(); 
            }
        }
    }

    function noRespond(){
        document.getElementById('match').hidden = true;
        document.getElementById('notmatch').hidden = true;
        document.getElementById('gameover').hidden = false;
    }