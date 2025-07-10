// --- DYNAMIC CONTENT LOADER ---
document.addEventListener('DOMContentLoaded', () => {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            // Populate Diary App
            document.getElementById('diary-title').innerHTML = data.diary.title;
            document.getElementById('diary-paragraph1').innerHTML = data.diary.paragraph1;
            document.getElementById('diary-paragraph2').innerHTML = data.diary.paragraph2;

            // Populate Press App
            document.getElementById('press-title').innerHTML = data.press.title;
            const pressList = document.getElementById('press-items');
            pressList.innerHTML = '';
            data.press.items.forEach(item => {
                let li = document.createElement('li');
                li.innerHTML = item;
                pressList.appendChild(li);
            });

            // Populate Collective App
            document.getElementById('collective-title').innerHTML = data.collective.title;
            document.getElementById('collective-paragraph1').innerHTML = data.collective.paragraph1;
            document.getElementById('collective-paragraph2').innerHTML = data.collective.paragraph2;

            // Populate Locked App
            document.getElementById('locked-title').innerHTML = data.locked.title;
            document.getElementById('locked-paragraph1').innerHTML = data.locked.paragraph1;
            document.getElementById('locked-paragraph2').innerHTML = data.locked.paragraph2;
            
            // Populate Games App
            document.getElementById('games-title').innerHTML = data.games.title;
            document.getElementById('game-iframe').src = "https://attogram.github.io/2048-lite/";

        })
        .catch(error => console.error('Error loading content:', error));
});


// --- PHONE CLOCK ---
const timeElement = document.getElementById('time');
function updateTime() {
    const now = new Date();
    const options = { timeZone: 'America/Winnipeg', hour: 'numeric', minute: '2-digit', hour12: true };
    timeElement.textContent = now.toLocaleTimeString('en-US', options).replace(" PM", "").replace(" AM", "");
}
setInterval(updateTime, 1000);
updateTime();


// --- APP CONTROLS ---
function openApp(id) {
    document.getElementById(id + '-app').classList.add('visible');
}

function closeApp(id) {
    document.getElementById(id + '-app').classList.remove('visible');
}

function checkPassword() {
    const password = 'RECOVERING';
    const attempt = prompt('A small lock appears on the box. It seems to need a password...');
    if (attempt && attempt.toUpperCase() === password) {
        alert('The lock clicks open!');
        openApp('locked');
    } else if (attempt !== null) {
        alert('The lock remains shut.');
    }
}