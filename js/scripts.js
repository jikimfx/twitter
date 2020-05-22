const MAX_LETTER = 140;
let tweetArea = document.getElementById("tweetArea");
let num = 0;
let empty = true;
let currentUser = "Anonymous";
let currentUsername = "Home";
let tweetList = [];
let retweetList = {};


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

const postTweet = () => {
    let temp = document.getElementById("tweetArea").value.split(" ");
    let hashtag = temp.filter((item) => item[0] == "#");
    let tweetContent = temp.filter((item) => item[0]!="#");
    let tweet = {
        name: currentUser,
        username: `@${currentUsername}`,
        content: tweetContent.join(" "),
        like: false,
        id: num,
        tag: hashtag
    }
    tweetList.push(tweet);
    document.getElementById("tweetArea").value = null;
    document.getElementById("remain").innerHTML = null;
    document.getElementById("remain").style.backgroundColor = "white";
    document.getElementById("remain").style.width = "100%";
    console.log(tweetList);
    num ++;
    render(tweetList);
}

const delTweet = (idUser) => {
    idUser = Number(idUser);
    let originalIndex = tweetList.findIndex((item) => (item.id == idUser))
    console.log(originalIndex);
    tweetList.splice(originalIndex, 1);
    render(tweetList);
}

const like = (idUser) => {
    idUser = Number(idUser);
    let original = tweetList.find((item) => (item.id == idUser))
    original.like = !(original.like);
    render(tweetList);
}

const tagFilter = (idTag) => {
    console.log(typeof(idTag));
    let tagPost = tweetList.filter(item => {
        let index = item.tag.findIndex(i => i == idTag);
        return (index > -1);
    });
    render(tagPost);
}

const render = (list) => {
    let allTweet = list.map((item) => {
        let icon = `<i class="far fa-heart fa-lg"></i>`
        if (item.like) {
            icon = `<i class="fas fa-heart fa-lg"></i>`
        }
        let tag = item.tag.map(hashtag => ` <a href="#" id="${hashtag}" onclick="tagFilter(id)">${hashtag}</a>`).join("");
        let context = `<div class="row border-modified" style="padding: 15px 0px; border-bottom: 1px solid #E1E8ED;"> 
        <div class="col-auto">
            <img class="rounded-circle" src="img/user-default.png" style="width: 50px;">
        </div>
        <div class="col">
            <div class="row" style="flex-direction: column; margin-bottom: 10px;">
                <h5 style="margin-bottom: 0px;">${item.name}</h5>
                <a href="#" id="currentUser">${item.username}</a>
            </div>
            <div class="row" style="margin-bottom: 10px;">
                <p id="tweetContent">${item.content} ${tag}</p>
            </div>
            <div class="row features">
                <span class="comment" id="${item.id}"><i class="far fa-comment fa-lg"></i></span>
                <span class="retweet" id="${item.id}"><i class="fas fa-retweet fa-lg"></i></span>
                <span class="like" id="${item.id}" onclick="like(id)">${icon}</span>
                <span class="share" id="${item.id}"><i class="far fa-share-square fa-lg"></i></i></span>
                <span class="analytic" id="${item.id}"><i class="fas fa-chart-bar fa-lg"></i></span>
                <span class="trash" id="${item.id}" onclick="delTweet(id)"><i class="fas fa-trash-alt fa-lg"></i></span>
            </div>
        </div>
        </div>`
        return (context);
    }).join("");
    document.getElementById("contentTweet").innerHTML = allTweet;
}

tweetArea.addEventListener("input", remainLetter);