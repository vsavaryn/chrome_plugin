chrome.runtime.sendMessage({ action: 'getWinner' }, function ({ data }) {
    localStorage.setItem('winner', data);
});

const winner = localStorage.getItem('winner');
const needWinner = localStorage.getItem('needWinner');

const findWinner = items => {
    let winnerIndex = 0;
    const winnerItem = items.find(({ innerText }, index) => {
        if (innerText.trim().toLowerCase() === winner.trim().toLowerCase()) {
            winnerIndex = index;
            return true
        }
    })

    return { winnerIndex, winnerItem };
}

const makeWinnerFirst = list => {
    var newList = list.cloneNode(true);
    const { winnerIndex, winnerItem } = findWinner([...newList.children])

    if (winnerIndex > 0) {
        const replacedItem = newList.replaceChild(winnerItem, newList.children[0])
        newList.appendChild(replacedItem);
        list.innerHTML = newList.innerHTML
    }

    localStorage.setItem('needWinner', 0);
}

const attachClickListener = () => {
    let listRandomizeBtn = document.querySelector("form input[type=submit][value=Randomize]")
        || document.querySelector("form input[type=submit][value^=Again]")

    if (listRandomizeBtn) {
        listRandomizeBtn.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            localStorage.setItem('needWinner', 1);
            listRandomizeBtn.click()
        });
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    const list = document.querySelector("ol")
        if (!!Number(needWinner) && list) {
            makeWinnerFirst(list);
        }

    attachClickListener()
});
