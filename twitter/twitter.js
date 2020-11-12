async function getTweet() {
    try {
        const result = await axios({
            method: 'get',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
        });
        return result.data;
    }
    catch (error) {
        return error;
    }
}

async function createTweet(tweet, type, parent) {
    try {
        const result = await axios({
            method: 'post',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
                type: type,
                parent: parent,
                body: tweet
            },
        });

        return result.data;
    }
    catch (error) {
        return error;
    }
}

async function getTweetAt(id) {
    try {
        const result = await axios({
            method: 'get',
            url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
            withCredentials: true,
        });

        return result.data;
    }
    catch (error) {
        return error;
    }
}

async function updateTweet(updatedTweet, id) {
    try {
        const result = await axios({
            method: 'put',
            url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
            withCredentials: true,
            data: {
                body: updatedTweet
            },
        });

        return result.data;
    }
    catch (error) {
        return error;
    }
}

async function deleteTweet(id) {
    try {
        const result = await axios({
            method: 'delete',
            url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
            withCredentials: true,
        });

        return result.data;
    } catch (error) {
        return error;
    }
}

async function likeTweet(id) {
    try {
        const result = await axios({
            method: 'put',
            url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}/like`,
            withCredentials: true,
        });

        return result.data;
    } catch (error) {
        return error;
    }
}

async function unlikeTweet(id) {
    try {
        const result = await axios({
            method: 'put',
            url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}/unlike`,
            withCredentials: true,
        });

        return result.data;
    } catch (error) {
        return error;
    }
}

// converts epoch to utc time
function convertTime(epoch) {
    let date = new Date(epoch);
    return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + (date.getHours() % 12 == 0 ? '12' : date.getHours() % 12) + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + (date.getHours() < 11 || date.getHours() == 24 ? ' AM' : ' PM');
}

// handles button click for comment
async function handleReplyButton() {
    let tweetId = event.target.parentElement.parentElement.id;

    let replyArea =
        `<div id="reply${tweetId}" class="box tweet-size edit-form">
        <h1 id="edit-title" class="title is-4"> reply </h1>
        <textarea placeholder="add your reply here!" id="reply-textarea" class="textarea" rows="2.5"></textarea>
        <div><button id="reply-cancel-button" class="button is-light">cancel</button><button id="reply-submit-button" class="button is-light">reply</button></div>
    </div>
    `

    $(`#${tweetId}`).replaceWith(replyArea);
}

// handles button click for reply submission
async function handleReplySubmitButton() {
    let tweetId = event.target.parentElement.parentElement.id.substring(5);

    await createTweet($('#reply-textarea').val(), "reply", tweetId);

    let currentTweet = await getTweetAt(tweetId);

    if (currentTweet.parent == undefined) {
        $(`#reply${tweetId}`).replaceWith(renderUpdatedTweet(currentTweet));

        // gets updated reply count
        $(`#replies${tweetId}`).html(currentTweet.replyCount);
    } else {
        renderTwitterPosts(true);
    }
}

// handles button click for canceling a reply
async function handleReplyCancelButton() {
    let tweetId = event.target.parentElement.parentElement.id.substring(5);
    let currentTweet = await getTweetAt(tweetId);

    if (currentTweet.parent == undefined) {
        $(`#reply${tweetId}`).replaceWith(renderUpdatedTweet(currentTweet));
    } else {
        renderTwitterPosts(true);
    }
}

// handles button click for retweet
function handleRetweetButton() {
    let tweetId = event.target.parentElement.parentElement.id;

    let retweetArea =
        `<div id="retweet${tweetId}" class="box tweet-size edit-form">
        <div><h1 id="edit-title" class="title is-4"> retweet </h1></div>
        <textarea placeholder="add a message here!" id="retweet-textarea" class="textarea" rows="2.5"></textarea>
        <div id="retweet-buttons"><button id="retweet-cancel-button" class="button is-light">cancel</button><button id="retweet-submit-button" class="button is-light">retweet</button></div>
        </div>`

    $(`#${tweetId}`).replaceWith(retweetArea);
}

// handles button click for submitting retweet
async function handleRetweetSubmitButton() {
    let tweetId = event.target.parentElement.parentElement.id.substring(7);

    await createTweet($('#retweet-textarea').val(), 'retweet', tweetId);

    renderTwitterPosts(true);
}

// handles button click for canceling a retweet
async function handleRetweetCancelButton() {
    let tweetId = event.target.parentElement.parentElement.id.substring(7);

    renderTwitterPosts(true);

    // let currentTweet = await getTweetAt(tweetId);
    // $(`#retweet${tweetId}`).replaceWith(renderUpdatedTweet(currentTweet));
}

// handles button click for likes/unlike
async function handleLikeButton() {
    let anomaly = event.target.id;
    let tweetId = event.target.id.substring(10);
    let likeIcon = event.target;

    if (anomaly == "like-button") {
        tweetId = event.target.className;
        likeIcon = event.target.querySelector('i');
    }
    
    let currentTweet = await getTweetAt(tweetId);

    if (currentTweet.isLiked) {
        await unlikeTweet(tweetId);
        likeIcon.className = 'far fa-heart';

    } else if (!currentTweet.isMine) {
        await likeTweet(tweetId);
        likeIcon.className = 'fas fa-heart';
    }

    // gets updated like count
    currentTweet = await getTweetAt(tweetId);
    $(`#like${tweetId}`).html(currentTweet.likeCount);
}

// handles button click for editing twitter post
async function handleEditButton() {
    let tweetId = event.target.parentElement.parentElement.id;
    let currentTweet = await getTweetAt(tweetId);

    let editArea =
        `<div id="edit${tweetId}" class="box tweet-size edit-form">
        <h1 id="edit-title" class="title is-4"> edit your tweet </h1>
        <textarea id="edit-textarea" class="textarea" rows="2.5">${currentTweet.body}</textarea>
        <div><button id="update-cancel-button" class="button is-light">cancel</button><button id="update-button" class="button is-light">update</button></div>
    </div>
    `

    $(`#${tweetId}`).replaceWith(editArea);
}

// handles button click for updating twitter post
async function handleUpdateButton() {
    let tweetId = event.target.parentElement.parentElement.id.substring(4);
    let currentTweet = await updateTweet($('#edit-textarea').val(), tweetId);

    if (currentTweet.parent == undefined) {
        $(`#edit${tweetId}`).replaceWith(renderUpdatedTweet(currentTweet));
    } else {
        renderTwitterPosts(true);
    }
}

// handles button click for canceling updating a post
async function handleUpdateCancelButton() {
    let tweetId = event.target.parentElement.parentElement.id.substring(4);

    renderTwitterPosts(true);
}

// handles button click for deleting twitter post
async function handleDeleteButton() {
    let tweetId = event.target.parentElement.parentElement.id;
    await deleteTweet(tweetId);

    renderTwitterPosts(true);
}

// handles button click for creating a new tweet
async function handleCreateButton() {
    let createArea =
        `<div id="create" class="box create-size">
        <h1 id="create-title" class="title is-4"> create your tweet </h1>
        <textarea id="create-textarea" class="textarea" rows="3" cols="95"></textarea>
        <div><button id="post-cancel-button" class="button is-light">cancel</button><button id="post-button" class="button is-light">post</button></div>
    </div>
    `

    $('.twitter-header').append(createArea);
}

// handles button click for posting a new tweet
async function handlePostButton() {
    await createTweet($('#create-textarea').val());

    let messageSuccess =
        `<div class="notification">
        <button id="notification-delete-button" class="delete"></button>
        tweet successfully created!
    </div>`

    let messageFail =
        `<div class="notification">
        <button id="notification-delete-button" class="delete"></button>
        tweet not created :( please enter in some text!
    </div>`

    if ($('#create-textarea').val() != "") {
        $('#create').replaceWith(messageSuccess);
        renderTwitterPosts(true);
    } else {
        $('#create').replaceWith(messageFail);
    }
}

// handles button click for canceling creating a new post
async function handlePostCancelButton() {
    $('#create').remove();
}

// handles button click for x-ing out notification
function handleNotifDeleteButton() {
    $('.notification').remove();
}

async function renderTwitterPosts(rerender) {
    const tweets = await getTweet();

    if (rerender) {
        $('#tweet-container').empty();
    }

    // iterates through tweet and gets info to append to tweet
    for (let i = tweets.length - 1; i >= 0; i--) {
        let tweetId = tweets[i].id;
        let author = tweets[i].author;
        let username = author.slice(0, -1);
        username = username.replace(/ /g, "").toLowerCase();
        let post = tweets[i].body;
        let createdAt = convertTime(tweets[i].createdAt);
        let updatedAt = convertTime(tweets[i].updatedAt);
        let likeCount = tweets[i].likeCount;
        let retweetCount = tweets[i].retweetCount;
        let replyCount = tweets[i].replyCount;
        let heartClassIcon = "far fa-heart";
        let editIcon = "";
        let deleteIcon = "";

        // check if post is liked to update graphic
        if (tweets[i].isLiked) {
            heartClassIcon = "fas fa-heart"
        }

        // check if post is mine to enable editing/deleting
        if (tweets[i].isMine) {
            editIcon = `<div id="${tweetId}" class="level-item"><a id="edit-button"><i class="far fa-edit"></i></a></div>`;
            deleteIcon = `<div id="${tweetId}" class="level-item"><a id="delete-button"><i class="far fa-trash-alt"></i></a></div>`;
        }

        let renderedPost =
            `<div id=${tweetId} class="box tweet-size"> 
                <p> 
                    <span class="title is-6 tweet-author">${author}</span>
                    <span class="subtitle is-6">@${username}</span>
                </p>
                <p class="body-style">${post}</p>
                <p class="createdAt-style"><em>${createdAt}</em></p>
                <div class="level interactive-button-style">
                    <div id="${tweetId}" class="level-item">
                        <a id="reply-button"><i class="far fa-comment"></i></a>
                        <span id='replies${tweetId}'>${replyCount}</span>
                    </div>
                    <div id="${tweetId}" class="level-item">
                        <a id="retweet-button"><i class="fas fa-retweet"></i></a>
                        <span>${retweetCount}</span>
                    </div>
                    <div id="${tweetId}" class="level-item">
                        <a id="like-button" class="${tweetId}"><i id="likeButton${tweetId}" class='${heartClassIcon}'></i></a>
                        <span id='like${tweetId}'>${likeCount}</span>
                    </div>
                    ${editIcon}
                    ${deleteIcon}
                </div>
            </div>`

        if (tweets[i].type == "retweet") {
            let parentTweet = $(`#${tweets[i].parentId}`).html();
            username = tweets[i].author.slice(0, -1);
            username = username.replace(/ /g, "").toLowerCase();

            if (parentTweet == undefined) {
                parentTweet = `<span class="tweet-deleted-holder">this tweet has been deleted :(</span>`
            } else {
                let cutOff = parentTweet.indexOf('<div class="level');
                parentTweet = parentTweet.substring(0, cutOff);
            }

            renderedPost =
                `<div id=${tweetId} class="box"> 
                <p> 
                    <span class="title is-6 tweet-author">${author}</span>
                    <span class="subtitle is-6">@${username}</span>
                </p>
                <p class="body-style">${post}</p>
                <div class="box retweet-container">
                    ${parentTweet}
                </div>
                <p><em>${createdAt}</em></p>
                <div class="level interactive-button-style">
                    <div id="${tweetId}" class="level-item">
                        <a id="reply-button"><i class="far fa-comment"></i></a>
                        <span id='replies${tweetId}'>${replyCount}</span>
                    </div>
                    <div id="${tweetId}" class="level-item">
                        <a id="retweet-button"><i class="fas fa-retweet"></i></a>
                        <span>${retweetCount}</span>
                    </div>
                    <div id="${tweetId}" class="level-item">
                        <a id="like-button" class="${tweetId}"><i id="likeButton${tweetId}" class='${heartClassIcon}'></i></a>
                        <span id='like${tweetId}'>${likeCount}</span>
                    </div>
                    ${editIcon}
                    ${deleteIcon}
                </div>
            </div>`
        }

        // if we are not rerendering to create a new post then append as normal, otherwise, replace 
        if (rerender) {
            $('#tweet-container').prepend(renderedPost);
        } else {
            $('#tweet-container').prepend(renderedPost);
        }

    }
}

function renderUpdatedTweet(tweet) {
    let tweetId = tweet.id;
    let author = tweet.author;
    let username = author.slice(0, -1);
    username = username.replace(/ /g, "").toLowerCase();
    let post = tweet.body;
    let createdAt = convertTime(tweet.createdAt);
    let updatedAt = convertTime(tweet.updatedAt);
    let likeCount = tweet.likeCount;
    let retweetCount = tweet.retweetCount;
    let replyCount = tweet.replyCount;
    let heartClassIcon = "far fa-heart";
    let editIcon = "";
    let deleteIcon = "";

    // check if post is liked to update graphic
    if (tweet.isLiked) {
        heartClassIcon = "fas fa-heart"
    }

    // check if post is mine to enable editing/deleting
    if (tweet.isMine) {
        editIcon = `<div id="${tweetId}" class="level-item"><a id="edit-button"><i class="far fa-edit"></i></a></div>`;
        deleteIcon = `<div id="${tweetId}" class="level-item"><a id="delete-button"><i class="far fa-trash-alt"></i></a></div>`;
    }

    let renderedPost =
        `<div id=${tweetId} class="box tweet-size"> 
        <p> 
            <span class="title is-6 tweet-author">${author}</span>
            <span class="subtitle is-6">@${username}</span>
        </p>
        <p class="body-style">${post}</p>
        <p class="createdAt-style"><em>${createdAt}</em></p>
            <div class="level interactive-button-style">
                    <div id="${tweetId}" class="level-item">
                        <a id="reply-button"><i class="far fa-comment"></i></a>
                        <span id='replies${tweetId}'>${replyCount}</span>
                    </div>
                    <div id="${tweetId}" class="level-item">
                        <a id="retweet-button"><i class="fas fa-retweet"></i></a>
                        <span>${retweetCount}</span>
                    </div>
                    <div id="${tweetId}" class="level-item">
                        <a id="like-button" class="${tweetId}"><i id="likeButton${tweetId}" class='${heartClassIcon}'></i></a>
                        <span id='like${tweetId}'>${likeCount}</span>
                    </div>
                    ${editIcon}
                    ${deleteIcon}
            </div>
        </div>`

    return renderedPost;

}

$(function () {
    renderTwitterPosts();
    $('#root').on('click', '#reply-button', handleReplyButton);
    $('#root').on('click', '#reply-submit-button', handleReplySubmitButton);
    $('#root').on('click', '#reply-cancel-button', handleReplyCancelButton);
    $('#root').on('click', '#retweet-submit-button', handleRetweetSubmitButton);
    $('#root').on('click', '#retweet-cancel-button', handleRetweetCancelButton);
    $('#root').on('click', '#retweet-button', handleRetweetButton);
    $('#root').on('click', '#like-button', handleLikeButton);
    $('#root').on('click', '#edit-button', handleEditButton);
    $('#root').on('click', '#update-button', handleUpdateButton);
    $('#root').on('click', '#update-cancel-button', handleUpdateCancelButton);
    $('#root').on('click', '#delete-button', handleDeleteButton);
    $('#root').on('click', '#create-tweet-button', handleCreateButton);
    $('#root').on('click', '#post-button', handlePostButton);
    $('#root').on('click', '#post-cancel-button', handlePostCancelButton);
    $('#root').on('click', '#notification-delete-button', handleNotifDeleteButton);
});



