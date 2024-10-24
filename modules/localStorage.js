// fetch data and store in local storage
function fetchAndStore(uid) {
  console.log('fetching data for UID: ', uid);
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uid })
  })
    .then(response => {
      // debugging response
      console.log('Response status: ', response.status);
      return response.json();
    })
    .then(data => {
      // log fetched data
      console.log('fetched data: ', data);
      // initialize and set value of userData to data after converting it from json format to a string
      if (data) {
        localStorage.setItem('userData', JSON.stringify(data));
        // log stored data
        console.log('Data stored in local storage: ', localStorage.getItem('userData'));
        // updateUI(data);
        renderProfile(userData);
      } else{
        console.log('No data received');
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}

// retrieve data from local storage and update UI
function localStoredData(){
  const storedData = localStorage.getItem('userData');
  if (storedData){
    try{
      const userData = JSON.parse(storedData);
      // log loaded data
      console.log('loaded user data from local storage: ', userData);
      if (userData) {
        if (document.getElementById('nickname')){
          updateUI(userData);
        } else{
          console.log('No elements found to update UI');
        }
      }
    } catch (error){
      console.log('Error parsing stored data: ', error);
    }
  } else{
    console.log('No user data found in local storage.');
  }
  // const userData = JSON.parse(localStorage.getItem('userData'));
}

// render profile to the DOM
function renderProfile(data) {
  console.log('renderProfile');
  // Render the profile data to the DOM
  const profileContainer = document.querySelector('.container');
  profileContainer.innerHTML = `
    <h2 id="nickname">Welcome, ${data.player.nickname}!</h2>
    <img id="avatar" src="${data.player.avatar}" alt="avatar">
    <p id="signature" class="mb-1">${data.player.signature}</p>
    <p class="mb-1">Your stats:</p>
    <ul class="list-unstyled">
      <li id="level">Level: ${data.player.level}</li>
      <li id="world_level">World Level: ${data.player.world_level}</li>
      <li id="friend_count">Friend Count: ${data.player.friend_count}</li>
      <li id="avatar_count">Number of Characters: ${data.player.space_info.avatar_count}</li>
      <li id="light_cone_count">Number of Light Cones: ${data.player.space_info.light_cone_count}</li>
      <li id="achievement_count">Number of Achievements: ${data.player.space_info.achievement_count}</li>
    </ul>
  `;
  // Call updateUI to ensure any additional updates are applied
  updateUI(data);
}

// update UI with user data
// order of the elements needs to match that of the view file
function updateUI(data){

  console.log('updateUI');
  // profile
  const nickname = document.getElementById('nickname');
  const avatar = document.getElementById('avatar');
  const signature = document.getElementById('signature');

  console.log(nickname);
  console.log(data.player.nickname);
  // check for elements, prevents TypeError
  if (nickname) {
    nickname.textContent = data.player.nickname;
    console.log("nickname: ", nickname.textContent);
  } else{
    console.log('Element with ID "nickname" not found');
  }
  if (avatar) avatar.src = data.player.avatar.icon;
  if (signature) signature.textContent = data.player.signature;
  console.log(signature.textContent);
  // document.getElementById('nickname').textContent = data.player.nickname;
  // document.getElementById('avatar').src = data.player.avatar.icon;
  // document.getElementById('signature').textContent = data.player.signature;

  // profile stats
  const level = document.getElementById('level');
  const world_level = document.getElementById('world_level');
  const friend_count = document.getElementById('friend_count');
  const avatar_count = document.getElementById('avatar_count');
  const light_cone_count = document.getElementById('light_cone_count');
  const achievement_count = document.getElementById('achievement_count');

  if (level) level.textContent = data.player.level;
  if (world_level) world_level.textContent = data.player.world_level;
  if (friend_count) friend_count.textContent = data.player.friend_count;
  if (avatar_count) avatar_count.textContent = data.player.space_info.avatar_count; 
  if (light_cone_count) light_cone_count.textContent = data.player.space_info.light_cone_count;
  if (achievement_count) achievement_count.textContent = data.player.space_info.achievement_count;
  // document.getElementById('level').textContent = data.player.level;
  // document.getElementById('world_level').textContent = data.player.world_level;
  // document.getElementById('friend_count').textContent = data.player.friend_count;
  // document.getElementById('avatar_count').textContent = data.player.space_info.avatar_count; 
  // document.getElementById('light_cone_count').textContent = data.player.space_info.light_cone_count;
  // document.getElementById('achievement_count').textContent = data.player.space_info.achievement_count;

  // favorite characters
  data.characters.forEach((character, index) => {
    const card = document.querySelectorAll('.card')[index];
    if (card) {
      // explain *= operator
      const characterPreview = card.querySelector('img[src="character.preview"]');
      const characterName = card.querySelector('p.mb-1').textContent;

      if (characterPreview) characterPreview.src = character.preview;
      if (characterName) characterName.textContent = character.name;
      // card.querySelector('img[src="character.preview"]').src = character.preview;
      // card.querySelector('p.mb-1').textContent = character.name;
      card.querySelector('img[src="character.path"]').src = character.path;
      card.querySelector('img[src="character.element"]').src = character.element;
      
      // character details
      // reduces redundant code
      const details = card.querySelectorAll('p.mb-1');
      details.textContent = `Rarity: ${character.rarity}`;
      details.textContent = `Eidolon: ${character.rank}`;
      details.textContent = `Level: ${character.level}`;
      details.textContent = character.path.name;
      details.textContent = character.element.name;

      // equipped lightcones
      card.querySelector('img[src="character.light_cone.preview"]').src = character.light_cone.preview;
      // reduces redundant code
      details.textContent = character.light_cone.name;
      details.textContent = `Rarity: ${character.light_cone.rarity}`;
      details.textContent = `Level: ${character.light_cone.level}`;
      details.textContent = `Superimposition: ${character.light_cone.rank}`;
    }
  });
}

// ------------------------------ WORKS
// event listener for form submission
document.getElementById('fetchDataForm').addEventListener('submit', function(Event) {
  Event.preventDefault();
  const uid = document.getElementById('uid').value; 
  console.log('form submitted with UID: ', uid);
  fetchAndStore(uid);
});

document.addEventListener('DOMContentLoaded', function () { localStoredData() } );