const MAX_LETTER = 140;
let tweetArea = document.getElementById("tweetArea"); // two places to tweet from, but ids have to be unique
let tweetAreaModal = document.getElementById("tweetAreaModal"); // two places to tweet from, but ids have to be unique
let num = 0;
let empty = true;
let currentUser = "Anonymous";
let currentUsername = "Home";
let currentPassword = "";
let tweetList = [];
let retweetList = {};

const saveStorage = () => {
    localStorage.setItem("tweetList", JSON.stringify(tweetList));
    localStorage.setItem("retweetList", JSON.stringify(retweetList));
}

const loginUser = () => {
    currentUser = document.getElementById("username").value;
    currentUsername = document.getElementById("username").value;
    currentPassword = document.getElementById("password").value;
    document.getElementById("signInButton").innerHTML = `<i class="fa fa-user-o" aria-hidden="true"></i><span class="navlink ml-2">${currentUsername}</span></a></li>`;
}

const getStorage = () => {
    let storeTweet = localStorage.getItem("tweetList");
    let storeRetweet = localStorage.getItem("retweetList");
    if (storeTweet !== null) {
        tweetList = JSON.parse(storeTweet);
        console.log(tweetList);
    }
    if (storeRetweet !== null) {
        retweetList = JSON.parse(storeRetweet);
        console.log(retweetList);
    }
}

const remainLetter = () => { // ids must be unique for each different tweet area
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
        document.getElementById("remain").style.width = `${(lengthTweet / 1.4)}%`;
        document.getElementById("remain").style.color = "black";
    }
}

const remainLetterModal = () => { // ids must be unique for each different tweet area
    let lengthTweet = tweetAreaModal.value.length;
    let remainLetterModal = MAX_LETTER - lengthTweet;
    if (lengthTweet == 0) {
        document.getElementById("remainModal").innerHTML = null;
        document.getElementById("remainModal").style.backgroundColor = "white";
        document.getElementById("remainModal").style.width = "100%";
        return 0;
    }
    if (remainLetterModal < 0) {
        document.getElementById("remainModal").innerHTML = `${remainLetterModal}`;
        document.getElementById("remainModal").style.backgroundColor = "red";
        document.getElementById("remainModal").style.width = "100%";
        document.getElementById("remainModal").style.color = "black"
    } else {
        document.getElementById("remainModal").innerHTML = `${lengthTweet}`;
        document.getElementById("remainModal").style.backgroundColor = "#1DA1F2";
        document.getElementById("remainModal").style.width = `${(lengthTweet / 1.4)}%`;
        document.getElementById("remainModal").style.color = "black";
    }
}

const postTweet = () => {
    if (tweetArea.value.length == 0) { // error checking
        document.getElementById("mainTweetAlert").innerHTML = 'You must fweet something!';
        document.getElementById("mainTweetAlert").className = 'alert alert-danger mt-2';
    }
    else if (tweetArea.value.length > MAX_LETTER) {
        document.getElementById("mainTweetAlert").innerHTML = 'Your fweet is too long!';
        document.getElementById("mainTweetAlert").className = 'alert alert-danger mt-2';
    }
    else {
        document.getElementById("mainTweetAlert").innerHTML = '';
        document.getElementById("mainTweetAlert").className = '';
        let temp = document.getElementById("tweetArea").value.split(" ");
        let tweet = {
            name: currentUser,
            username: `@${currentUsername}`,
            password: currentPassword,
            content: temp,
            like: false,
            id: num
        }
        retweetList[num] = [];
        console.log("Retweet", retweetList);
        tweetList.push(tweet);
        document.getElementById("tweetArea").value = null;
        document.getElementById("remain").innerHTML = null;
        document.getElementById("remain").style.backgroundColor = "white";
        document.getElementById("remain").style.width = "100%";
        console.log(tweetList);
        num++;
        render(tweetList);
    }
}

const postTweetModal = () => {
    if (tweetAreaModal.value.length == 0) { // error checking
        document.getElementById("modalTweetAlert").innerHTML = 'You must fweet something!';
        document.getElementById("modalTweetAlert").className = 'alert alert-danger mt-2';
    }
    else if (tweetAreaModal.value.length > MAX_LETTER) {
        document.getElementById("modalTweetAlert").innerHTML = 'Your fweet is too long!';
        document.getElementById("modalTweetAlert").className = 'alert alert-danger mt-2';
    }
    else {
        document.getElementById("modalTweetAlert").innerHTML = '';
        document.getElementById("modalTweetAlert").className = '';
        let temp = document.getElementById("tweetAreaModal").value.split(" ");
        let tweet = {
            name: currentUser,
            username: `@${currentUsername}`,
            password: currentPassword,
            content: temp,
            like: false,
            id: num
        }
        retweetList[num] = [];
        console.log("Retweet", retweetList);
        tweetList.push(tweet);
        document.getElementById("tweetAreaModal").value = null;
        document.getElementById("remainModal").innerHTML = null;
        document.getElementById("remainModal").style.backgroundColor = "white";
        document.getElementById("remainModal").style.width = "100%";
        console.log(tweetList);
        num++;
        render(tweetList);
    }
}

const retweet = (idUser) => {
    let userComment = prompt("What's in your mind?").split(" ");
    let tweet = {
        name: currentUser,
        username: `@${currentUsername}`,
        password: currentPassword,
        content: userComment,
        like: false,
        id: num
    }
    num++;
    retweetList[idUser].push(tweet);
    console.log(retweetList);
    render(tweetList);
}

const delTweet = (idUser) => {
    idUser = Number(idUser);
    let originalIndex = tweetList.findIndex((item) => (item.id == idUser));
    if (originalIndex == -1) {
        for (let key in retweetList) {
            originalIndex = retweetList[key].findIndex((item) => (item.id == idUser));
            if (originalIndex > -1) {
                retweetList[key].splice(originalIndex, 1);
            }
        }
    } else {
        tweetList.splice(originalIndex, 1);
        delete retweetList[idUser];
    }
    render(tweetList);
}

const like = (idUser) => {
    idUser = Number(idUser);
    let original = tweetList.find((item) => (item.id == idUser))
    if (typeof original === "undefined") {
        for (let key in retweetList) {
            original = retweetList[key].find((item) => (item.id == idUser));
            if (typeof original !== "undefined") {
                original.like = !(original.like);
            }
        }
    } else original.like = !(original.like);
    render(tweetList);
}

const tagFilter = (idTag) => {
    let tagPost = tweetList.filter(item => {
        let index = item.content.findIndex(i => i == idTag);
        return (index > -1);
    });
    render(tagPost);
}

let formatTweet = (item, addAuthor, originalTweet) => {
    let borderTop = "";
    if (item.id == 0) {
        borderTop = "border-top: 1px solid #E1E8ED;";
    }
    let icon = `<i class="far fa-heart fa-lg"></i>`
    if (item.like) {
        icon = `<i class="fas fa-heart fa-lg"></i>`
    }
    let orgTweet = originalTweet.map((i) => {
        if (i[0] == "#") {
            return (`<a href="#" id="${i}" onclick="tagFilter(id)">${i}</a>`)
        } else return (i);
    }).join(" ");
    let contentTweet = item.content.map((i) => {
        if (i[0] == "#") {
            return (`<a href="#" id="${i}" onclick="tagFilter(id)">${i}</a>`)
        } else return (i);
    }).join(" ");
    let retweetFrom = "";
    let retweetButton = `<span class="retweet" id="${item.id}" onclick="retweet(id)"><i class="fas fa-retweet fa-lg"></i></span>`;
    if (addAuthor != "") {
        retweetButton = "";
        retweetFrom = `Retweet from ${addAuthor}`;
    };
    let context = `<div class="row border-modified" style="padding: 15px 0px; border-bottom: 1px solid #E1E8ED; ${borderTop}"> 
        <div class="col-auto">
            <img class="rounded-circle" src="img/user-default.png" style="width: 50px;">
        </div>
        <div class="col">
            <div class="row" style="flex-direction: column; margin-bottom: 10px;">
                <h5 style="margin-bottom: 0px;">${item.name}</h5>
                <a href="#" id="${item.username}">${item.username}</a>
            </div>
            <div class="row" style="margin-bottom: 10px;">
                <p id="tweetContent"> ${contentTweet} <br><br> <b style="font-weight: 800;">${retweetFrom}</b> <br> ${orgTweet} </p>
            </div>
            <div class="row features">
                <span class="comment" id="${item.id}"><i class="far fa-comment fa-lg"></i></span>
                ${retweetButton}
                <span class="like" id="${item.id}" onclick="like(id)">${icon}</span>
                <span class="share" id="${item.id}"><i class="far fa-share-square fa-lg"></i></i></span>
                <span class="analytic" id="${item.id}"><i class="fas fa-chart-bar fa-lg"></i></span>
                <span class="trash" id="${item.id}" onclick="delTweet(id)"><i class="fas fa-trash-alt fa-lg"></i></span>
            </div>
        </div>
        </div>`
    return (context);
}

const render = (list) => {
    let allTweet = list.slice(0).reverse().map((item) => {
        let retweetContent = retweetList[item.id].slice(0).reverse().map(retweet => {
            return formatTweet(retweet, item.username, item.content);
        }).join("");
        let mainTweet = formatTweet(item, "", []);
        return (mainTweet + retweetContent);
    }).join("");
    document.getElementById("contentTweet").innerHTML = allTweet;
    saveStorage();
}

tweetArea.addEventListener("input", remainLetter);
tweetAreaModal.addEventListener("input", remainLetterModal);
