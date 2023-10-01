const counter = document.getElementById('counter');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const like = document.getElementById('heart')
const likeList = document.querySelector('.likes');
const commentSection = document.querySelector('form');
let theCount = 0;
let likes = 1;
const likesObj = {};

// Timer
let turnOn = true; 
function timer() {
    if(turnOn === true ) {
        theCount++;
        counter.textContent = theCount;
    }
}
setInterval(timer, 1000);


//Plus and Minus Buttons
minus.addEventListener('click', iSubtract);

function iSubtract(e){
    e.preventDefault();
    theCount--;
    counter.textContent = theCount;
};

plus.addEventListener('click', iAdd);

function iAdd(e){
    e.preventDefault();
    theCount++;
    counter.textContent = theCount;
}

//Like
like.addEventListener('click', iHeart)

function iHeart(e){
    e.preventDefault(); 
    const newLike = document.createElement('li')
    if(likesObj.hasOwnProperty(theCount)) {
        likesObj[theCount]++;
    } else {
        likesObj[theCount] = 1;
    };

    likeList.innerHTML = '';

    for (const theCount in likesObj) {
        if (likesObj.hasOwnProperty(theCount)) {
            const newLike = document.createElement('li');
            if (likesObj[theCount] == 1) {
                newLike.textContent = `The number ${theCount} was liked 1 time!`;
            } else {
            newLike.textContent = `The number ${theCount} was liked ${likesObj[theCount]} times!`;
            }
            likeList.appendChild(newLike);
        }
    }
};


//Comments
commentSection.addEventListener('submit', iComment)

function iComment(e) {
    e.preventDefault();
    addComment(e.target['comment-input'].value);
    commentSection.reset();

};

function addComment(comment) {
    let p = document.createElement('p');
    p.textContent = ` ${comment} `;
    document.getElementById('list').appendChild(p);
};

function noComment(e) {
    e.preventDefault();
}

//Everything above this line is correct and complete    


//Pause Button
let pauseButton = document.getElementById('pause');
const buttons = document.getElementsByTagName('button')

let disabledButton = false;

pauseButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (disabledButton === true) {
        for (let i=0; i<buttons.length; i++){
            buttons[i].style.opacity = 100;           
        }
        pauseButton.textContent = "pause";
        turnOn = true;
        disabledButton = false;
    } else {
        for (let i=0; i<buttons.length; i++){
            buttons[i].style.opacity = 0.5;
        }
        pauseButton.textContent = "resume";
        pauseButton.style.opacity = 100;
        turnOn = false;       
        disabledButton = true;
    }

    if (disabledButton) {
        minus.removeEventListener('click', iSubtract);
        plus.removeEventListener('click', iAdd);
        like.removeEventListener('click', iHeart)
        commentSection.removeEventListener('submit', iComment);
        commentSection.addEventListener('click', noComment);
    } else {
        minus.addEventListener('click', iSubtract);
        plus.addEventListener('click', iAdd);
        like.addEventListener('click', iHeart)
        commentSection.removeEventListener('click', noComment);
        commentSection.addEventListener('submit', iComment);
    }
});
