function getIntegers() {
    let integers = localStorage.getItem('integers');

    return integers !== null ? integers.split(',') : [1, 2, 3];
}

function setIntegers(integers) {
    localStorage.setItem('integers', integers.join());
}

// for the List
function getWinner() {
    return localStorage.getItem('winner') || "";
}

function setWinner(winner) {
    localStorage.setItem('winner', winner);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.action) {
        // for the Random Number
        case 'getIntegers':
            sendResponse({ data: getIntegers() });
            break;
        case 'setIntegers':
            setIntegers(message.data);
            sendResponse("done")
            break;

        // for the Random List
        case 'getWinner':
            sendResponse({ data: getWinner() });
            break;
        case 'setWinner':
            setWinner(message.data);
            sendResponse("done")
            break;
        default:
            break;
    }
});
