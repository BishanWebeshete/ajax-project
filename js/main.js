var $ol = document.querySelector('ol');
var $rankingsContainer = document.querySelector('.rankings-container');
var $tableContentContainer = document.querySelector('.table-content-container');
var $playerProfileContainer = document.querySelector('.player-profile-container');
var $plusSign = document.querySelector('.plus-sign');
var $plusSignContainer = document.querySelector('.plus-sign-container');
var $favoritePlayersContainer = document.querySelector('.favorite-players-content-container');
var $favoritesButton = document.querySelector('.favorites');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://statsapi.web.nhl.com/api/v1/standings?season=20222023');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (let i = 0; i < xhr.response.records[3].teamRecords.length; i++) {
    var teamID = xhr.response.records[3].teamRecords[i].team.id;
    var teamName = xhr.response.records[3].teamRecords[i].team.name;
    var $li = document.createElement('li');
    var $img = document.createElement('img');
    if (teamName === 'Vegas Golden Knights') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Vegas_Golden_Knights_logo.svg/800px-Vegas_Golden_Knights_logo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Los Angeles Kings') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Los_Angeles_Kings_logo.svg/1200px-Los_Angeles_Kings_logo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Edmonton Oilers') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Logo_Edmonton_Oilers.svg/1200px-Logo_Edmonton_Oilers.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Seattle Kraken') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Seattle_Kraken_official_logo.svg/1200px-Seattle_Kraken_official_logo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Calgary Flames') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Calgary_Flames_logo.svg/1200px-Calgary_Flames_logo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Vancouver Canucks') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Vancouver_Canucks_logo.svg/1200px-Vancouver_Canucks_logo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'San Jose Sharks') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/SanJoseSharksLogo.svg/1200px-SanJoseSharksLogo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Anaheim Ducks') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Anaheim_Ducks.svg/1200px-Anaheim_Ducks.svg.png');
      $img.setAttribute('id', teamID);
    }
    $li.appendChild($img);
    $ol.appendChild($li);
  }
});
xhr.send();

var $imagesContainer = document.querySelector('.listed-images-container');
$imagesContainer.addEventListener('click', function (event) {
  if (event.target.tagName !== 'IMG') {
    return;
  }
  $favoritePlayersContainer.classList.add('hidden');
  $rankingsContainer.classList.add('hidden');
  $tableContentContainer.classList.remove('hidden');
  var teamID = event.target.id;
  var xhr1 = new XMLHttpRequest();
  xhr1.open('GET', 'https://statsapi.web.nhl.com/api/v1/teams/' + teamID + '/roster?season=20222023');
  xhr1.responseType = 'json';
  xhr1.addEventListener('load', function () {
    var $oldTableBody = document.querySelector('tbody');
    if ($oldTableBody) {
      $oldTableBody.remove();
    }
    var $tbody = document.createElement('tbody');
    for (let i = 0; i < xhr1.response.roster.length; i++) {
      var $table = document.querySelector('table');
      var $tr = document.createElement('tr');
      $tr.setAttribute('id', xhr1.response.roster[i].person.id);
      var $td1 = document.createElement('td');
      $td1.textContent = xhr1.response.roster[i].jerseyNumber;
      var $td2 = document.createElement('td');
      $td2.textContent = xhr1.response.roster[i].person.fullName;
      var $td3 = document.createElement('td');
      $td3.textContent = xhr1.response.roster[i].position.abbreviation;
      $tr.appendChild($td1);
      $tr.appendChild($td2);
      $tr.appendChild($td3);
      $tbody.appendChild($tr);
      $table.appendChild($tbody);
    }

  });
  xhr1.send();
});

var $rankingsTab = document.querySelector('.rankings');
$rankingsTab.addEventListener('click', function (event) {
  $tableContentContainer.classList.add('hidden');
  $rankingsContainer.classList.remove('hidden');
  $playerProfileContainer.classList.add('hidden');
});

var $table = document.querySelector('#table');
$table.addEventListener('click', function (event) {
  if (event.target.tagName !== 'TD') {
    return;
  }
  $playerProfileContainer.classList.remove('hidden');
  $tableContentContainer.classList.add('hidden');
  var $trId = event.target.closest('tr').id;
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId);
  xhr2.responseType = 'json';
  xhr2.addEventListener('load', function () {
    var $playerImg = document.querySelector('.player-image');
    var currentTeam = xhr2.response.people[0].currentTeam.name;
    if (currentTeam === 'Vegas Golden Knights') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Vegas_Golden_Knights_logo.svg/800px-Vegas_Golden_Knights_logo.svg.png');
    } else if (currentTeam === 'Los Angeles Kings') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Los_Angeles_Kings_logo.svg/1200px-Los_Angeles_Kings_logo.svg.png');
    } else if (currentTeam === 'Edmonton Oilers') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Logo_Edmonton_Oilers.svg/1200px-Logo_Edmonton_Oilers.svg.png');
    } else if (currentTeam === 'Seattle Kraken') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Seattle_Kraken_official_logo.svg/1200px-Seattle_Kraken_official_logo.svg.png');
    } else if (currentTeam === 'Vancouver Canucks') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Vancouver_Canucks_logo.svg/1200px-Vancouver_Canucks_logo.svg.png');
    } else if (currentTeam === 'San Jose Sharks') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/SanJoseSharksLogo.svg/1200px-SanJoseSharksLogo.svg.png');
    } else if (currentTeam === 'Anaheim Ducks') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Anaheim_Ducks.svg/1200px-Anaheim_Ducks.svg.png');
    }
    $plusSign.setAttribute('id', xhr2.response.people[0].id);
    var $name = document.querySelector('.name');
    $name.textContent = xhr2.response.people[0].fullName;
    var $position = document.querySelector('.position');
    $position.textContent = xhr2.response.people[0].primaryPosition.abbreviation;
    var $height = document.querySelector('.height');
    $height.textContent = xhr2.response.people[0].height;
    var $weight = document.querySelector('.weight');
    $weight.textContent = xhr2.response.people[0].weight + ' ' + 'lbs';
    var $age = document.querySelector('.age');
    $age.textContent = xhr2.response.people[0].currentAge + ' ' + 'yrs';
    var $birthDay = document.querySelector('.birth-date');
    $birthDay.textContent = xhr2.response.people[0].birthDate;
    var $birthPlace = document.querySelector('.birth-place');
    $birthPlace.textContent = xhr2.response.people[0].birthCity + ',' + ' ' + xhr2.response.people[0].birthCountry;
  });
  xhr2.send();

  var xhr3 = new XMLHttpRequest();
  xhr3.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId + '/stats?stats=homeAndAway&season=20222023');
  xhr3.responseType = 'json';
  xhr3.addEventListener('load', function () {
    var $gamesPlayed = document.querySelector('.gp');
    $gamesPlayed.textContent = xhr3.response.stats[0].splits[0].stat.games + xhr3.response.stats[0].splits[1].stat.games + ' ' + 'gp';
    var $goals = document.querySelector('.goals');
    $goals.textContent = xhr3.response.stats[0].splits[0].stat.goals + xhr3.response.stats[0].splits[1].stat.goals + ' ' + 'G';
    var $assists = document.querySelector('.assists');
    $assists.textContent = xhr3.response.stats[0].splits[0].stat.assists + xhr3.response.stats[0].splits[1].stat.assists + ' ' + 'A';
  });
  xhr3.send();
});

$plusSignContainer.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  $favoritePlayersContainer.classList.remove('hidden');
  $playerProfileContainer.classList.add('hidden');
  var $iconId = event.target.closest('i').id;
  var xhr4 = new XMLHttpRequest();
  xhr4.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $iconId);
  xhr4.responseType = 'json';
  xhr4.addEventListener('load', function () {
    var $favoritesTable = document.querySelector('#favorite-players-table');
    var $favoriteTbody = document.createElement('tbody');
    var $favoriteTr = document.createElement('tr');
    var $favoriteTd1 = document.createElement('td');
    $favoriteTd1.textContent = xhr4.response.people[0].primaryNumber;
    var $favoriteTd2 = document.createElement('td');
    $favoriteTd2.textContent = xhr4.response.people[0].fullName;
    var $favoriteTd3 = document.createElement('td');
    $favoriteTd3.textContent = xhr4.response.people[0].primaryPosition.abbreviation;
    $favoritesTable.appendChild($favoriteTbody);
    $favoriteTbody.appendChild($favoriteTr);
    $favoriteTr.appendChild($favoriteTd1);
    $favoriteTr.appendChild($favoriteTd2);
    $favoriteTr.appendChild($favoriteTd3);
  });
  xhr4.send();
});

$favoritesButton.addEventListener('click', function (event) {
  $favoritePlayersContainer.classList.remove('hidden');
  $rankingsContainer.classList.add('hidden');
  $tableContentContainer.classList.add('hidden');
});
