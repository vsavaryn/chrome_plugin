function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Please do not delete
document.getElementById('true-random-integer-generator-credits').innerHTML += '&nbsp;';

let integers = [];
let key = 0;

chrome.runtime.sendMessage({action: 'getIntegers'}, function (response) {
    integers = response.data;
});


let elementButton = document.getElementById('true-random-integer-generator-button');
let elementResult = document.getElementById('true-random-integer-generator-result');

elementButton.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    elementResult.innerHTML = '<img src="https://www.random.org/util/cp/images/ajax-loader.gif" alt="Loading..." />';

    if (integers.length === key) {
        key = 0;
    }

    const minValue = document.getElementById("true-random-integer-generator-min").value;
    const maxValue = document.getElementById("true-random-integer-generator-max").value;

    const date = moment().utc().add(1, "minutes").format("YYYY-MM-DD HH:mm:ss"); //response from server is 1 minute ahead

    setTimeout(function () {
        elementResult.innerHTML = '<img src="https://www.random.org/util/cp/images/ajax-loader.gif" alt="Loading..." />';
        
        setTimeout(function () {
            elementResult.innerHTML = `<center><span style='font-size:100%;font-weight:bold;'>${integers[key]}<br>
</span><span style='font-size:70%;'>Min:&nbsp;${minValue}, Max:&nbsp;${maxValue}<br>
${date} UTC</span></center>`;
            ++key;
    }, getRandomInteger(350, 600));
    }, 350);

    
});