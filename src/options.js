function onSubmit() {
    const saved = document.createElement("span");
    saved.innerHTML = "Saved";
    saved.style.color = "green";
    document.body.appendChild(saved);
    setTimeout(function () {
        document.body.removeChild(saved);
    }, 2000)
}

function handlerSubmit() {
    // let value = document.getElementById('integers').value.split(',');
    // chrome.runtime.sendMessage({ action: 'setIntegers', data: value });
    
    let winnerValue = document.getElementById('winner').value;
    chrome.runtime.sendMessage({ action: 'setWinner', data: winnerValue }, onSubmit);
}

function handlerDOMContentLoaded() {
    // chrome.runtime.sendMessage({action: 'getIntegers'}, function (response) {
    //     document.getElementById('integers').value = response.data.join();
    // });
    chrome.runtime.sendMessage({action: 'getWinner'}, function (response) {
        document.getElementById('winner').value = response.data;
    });

    document.getElementById('submit').addEventListener('click', handlerSubmit);
}

document.addEventListener('DOMContentLoaded', handlerDOMContentLoaded);
