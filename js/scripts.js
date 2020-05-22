const MAX_LETTER = 140;
let tweetArea = document.getElementById("tweetArea");
let empty = true;
let tweetList = [];


const remainLetter = () => {
    let lengthTweet = tweetArea.value.length;
    let remainLetter = MAX_LETTER - lengthTweet;
    if (lengthTweet == 0) {
        document.getElementById("remain").innerHTML = null;
        document.getElementById("remain").style.backgroundColor = "white";
        document.getElementById("remain").style.width = "100%";
        return 0;
    }
    if (remainLetter < 0) {
        document.getElementById("remain").innerHTML = `${remainLetter}`;
        document.getElementById("remain").style.backgroundColor = "red";
        document.getElementById("remain").style.width = "100%";
        document.getElementById("remain").style.color = "black"
    } else {
        document.getElementById("remain").innerHTML = `${lengthTweet}`;
        document.getElementById("remain").style.backgroundColor = "#1DA1F2";
        document.getElementById("remain").style.width = `${(lengthTweet/1.4)}%`;
        document.getElementById("remain").style.color = "black";
    }
}

tweetArea.addEventListener("input", remainLetter);