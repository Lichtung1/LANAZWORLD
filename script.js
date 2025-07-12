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

            // Populate Notes App
            document.getElementById('notes-title').innerHTML = data.notes.title;
            const notesList = document.getElementById('notes-items');
            notesList.innerHTML = '';
            data.notes.items.forEach(item => {
                let li = document.createElement('li');
                li.innerHTML = item;
                notesList.appendChild(li);
            });

            // Populate Producer App
            document.getElementById('producer-title').innerHTML = data.producer.title;
            const producerTabsContainer = document.getElementById('producer-tabs');
            const producerContentContainer = document.getElementById('producer-content');
            
            for (const key in data.producer.tabs) {
                const tabData = data.producer.tabs[key];
                let button = document.createElement('button');
                button.className = 'tab-button';
                button.textContent = tabData.title;
                button.dataset.tab = key;
                producerTabsContainer.appendChild(button);
                let content = document.createElement('div');
                content.className = 'tab-content';
                content.id = `producer-content-${key}`;
                content.innerHTML = tabData.content;
                producerContentContainer.appendChild(content);
            }

            const tabButtons = producerTabsContainer.querySelectorAll('.tab-button');
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    producerContentContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                    button.classList.add('active');
                    document.getElementById(`producer-content-${button.dataset.tab}`).classList.add('active');
                });
            });

            if (tabButtons.length > 0) {
                tabButtons[0].click();
            }

            // Populate Song Maker App
            document.getElementById('song-maker-title').innerHTML = data['song-maker'].title;
            document.getElementById('song-maker-iframe').src = "https://musiclab.chromeexperiments.com/Song-Maker/";

            // Populate Photos App
            document.getElementById('photos-title').innerHTML = data.photos.title;
            const photoGrid = document.getElementById('photo-grid');
            data.photos.images.forEach(image => {
                let img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt;
                photoGrid.appendChild(img);
            });

            // Populate Voice Memos App
            document.getElementById('voicememos-title').innerHTML = data.voicememos.title;
            const voiceMemoList = document.getElementById('voicememo-list');
            data.voicememos.memos.forEach(memo => {
                let item = document.createElement('div');
                item.className = 'voice-memo-item';
                let title = document.createElement('p');
                title.textContent = memo.title;
                let audio = document.createElement('audio');
                audio.controls = true;
                audio.src = memo.src;
                item.appendChild(title);
                item.appendChild(audio);
                voiceMemoList.appendChild(item);
            });
            
            // CONTACTS APP 
            document.getElementById('contacts-title').innerHTML = data.contacts.title;
            const contactList = document.getElementById('contact-list');
            contactList.innerHTML = ''; // Clear it first
            data.contacts.list.forEach(contact => {
                let link = document.createElement('a');
                link.className = 'contact-link';
                link.href = contact.link;
                if (!contact.link.startsWith('mailto:')) {
                    link.target = '_blank';
                }
                let item = document.createElement('div');
                item.className = 'contact-item';
                let avatar = document.createElement('div');
                avatar.className = 'contact-avatar';
                avatar.textContent = contact.name.charAt(0);
                let info = document.createElement('div');
                info.className = 'contact-info';
                let name = document.createElement('div');
                name.className = 'contact-name';
                name.textContent = contact.name;
                let detail = document.createElement('div');
                detail.className = 'contact-detail';
                detail.textContent = contact.detail;
                info.appendChild(name);
                info.appendChild(detail);
                item.appendChild(avatar);
                item.appendChild(info);
                link.appendChild(item);
                contactList.appendChild(link);
            });

            // Populate Merch App
            document.getElementById('merch-title').innerHTML = data.merch.title;

            // POPULATE NEW MESSAGES APP 
            document.getElementById('messages-title').innerHTML = data.messages.title;
            const messageList = document.getElementById('message-list');
            data.messages.conversation.forEach(msg => {
                let bubble = document.createElement('div');
                // Adds the base class AND the sender class ('me' or 'other')
                bubble.className = `message-bubble ${msg.sender}`;
                bubble.textContent = msg.text;
                messageList.appendChild(bubble);
            });

            //  POPULATE NEW CALENDAR APP 
            document.getElementById('calendar-title').innerHTML = data.calendar.title;
            const calendarList = document.getElementById('calendar-list');
            data.calendar.events.forEach(event => {
                let eventDiv = document.createElement('div');
                eventDiv.className = 'calendar-event';

                let date = new Date(event.date + 'T00:00:00'); // Add time to avoid timezone issues
                let month = date.toLocaleString('default', { month: 'short' });
                let day = date.getDate();

                let dateDiv = document.createElement('div');
                dateDiv.className = 'event-date';
                dateDiv.innerHTML = `<div class="event-month">${month}</div><div class="event-day">${day}</div>`;

                let detailsDiv = document.createElement('div');
                detailsDiv.className = 'event-details';
                detailsDiv.innerHTML = `<div class="event-title">${event.title}</div><div class="event-description">${event.description}</div>`;

                eventDiv.appendChild(dateDiv);
                eventDiv.appendChild(detailsDiv);
                calendarList.appendChild(eventDiv);
            });
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