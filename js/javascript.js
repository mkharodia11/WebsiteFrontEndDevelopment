(function(){

	let menuButton = document.getElementById ("mainmenu");
	let navMenu = document.getElementById ("nav-menu");

	menuButton.addEventListener("click", toggleMenu);


	let toggle = false; //hidden at first
	function toggleMenu() {
		if (toggle) { //if menu is visible
		navMenu.classList.remove("displaymenu"), //hide the menu
		toggle = false
		}
		else { // false: it's hidden
		navMenu.classList.add("displaymenu"), // show the menu
		toggle = true
		}
	}

}) ();


(function(){

  let myName = document.getElementById("my-name");
  let getName = document.getElementById("get-name");
  let userName = document.getElementById("user-name");
  let clearStorage = document.getElementById("clearStorage");
  let nameStored = localStorage.name;
  let chosenColour = document.getElementById('colorPicker');
  let colourStored = localStorage.colour;

  // Displays the name in the console at this stage:
  console.log(`Name on page load: ${nameStored}`);

  if(nameStored) {
    // If there's a name in localStorage, use it:
    myName.innerHTML = `again ${nameStored}`;
    console.log(`Name stored is: ${nameStored}`);
  }
  else {
    // There's no name in localStorage:
    myName.innerHTML = "stranger";
    console.log(`No name stored`);
  }

  if(colourStored) {
		document.body.style.backgroundColor = colourStored;
	}

  function clearStorageFunc(){
    localStorage.clear();
  }

  function changeBGColour(){
    document.body.style.backgroundColor = chosenColour.value;
	colourStored = chosenColour.value;
	localStorage.colour = colourStored;
  }


  function PerformGreeting() {
    if(userName.value === "") {
      alert("Please enter a name");
      userName.focus();
    }
    // Gets the name the user entered:
    nameStored = userName.value;

    // Shows the name in "my-name":
    myName.innerHTML = nameStored;

    // Puts the name into localStorage:
    localStorage.name = nameStored;

    // Displays the name in the console at the final stage:
    console.log(`New name stored: ${nameStored}`);

    return false;
  }

if (getName){
	if (typeof event === "undefined") {
		getName.onsubmit = PerformGreeting; // for Firefox
	}
	else {
		getName.addEventListener("submit", PerformGreeting);
		event.preventDefault();
	}
}
	if (clearStorage)
	{
		clearStorage.addEventListener("click",clearStorageFunc);
	}

	if (chosenColour)
	{
		chosenColour.addEventListener("change",changeBGColour);
	}

}());


"use strict";

(function(){

	console.log("test");
  // creates a new object called xhr
  // which will handle the API call
  let xhr = new XMLHttpRequest();
  // console.log(`Current readyState: ${xhr.readyState}`);

  let queryBox = document.getElementById("wikiQuery");
  let searchForm = document.getElementById("searchForm");
  let demoJSON = document.getElementById("demo");

  // constructs the base for the request url
  let baseURL = "https://en.wikipedia.org/w/api.php? \
                format=json& \
                action=query& \
                generator=search& \
                gsrnamespace=0& \
                gsrlimit=10& \
                prop=info|extracts|langlinks|pageimages& \
                inprop=url& \
                exintro& \
                explaintext& \
                exsentences=1& \
                exlimit=max& \
                llprop=url& \
                lllimit=max& \
                piprop=thumbnail|name& \
                origin=*& \
                gsrsearch=";

/*
API Sandbox url
https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&generator=search&prop=extracts%7Clanglinks%7Cpageimages&gsrlimit=10&gsrnamespace=0&exintro&explaintext&exsentences=1&exlimit=max&llprop=url&lllimit=max&piprop=thumbnail|name&origin=*&gsrsearch=kittens

Request url
https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts%7Clanglinks%7Cpageimages&gsrlimit=10&gsrnamespace=0&exintro&explaintext&exsentences=1&exlimit=max&llprop=url&lllimit=max&piprop=thumbnail|name&origin=*&gsrsearch=kittens
*/

  function gatherData(data) {
    // console.log(data);
    // initialise some variables
    let theData = "";
    let langLinks = "";
    let wikiimg = "<wikiimg>";
    const languages = ["en", "de", "zh", "fr", "es", "ja", "ar", "ko", "el"];
    let k;
    let key;
    // loop through the result pages by pageid
    for(key in data.query.pages) {
      let tmp = data.query.pages[key];
      if (tmp.thumbnail) {
        wikiimg = `<wikiimg src="${tmp.thumbnail.source}" alt="${tmp.title}"> `;
      }
      let title = `<strong><a href="${tmp.fullurl}">${tmp.title}</a></strong>`;
      let extract = `<span class="txt">${tmp.extract}</span>`;
      let langLinks = "";
      for (k in tmp.langlinks) {
        if (languages.includes(tmp.langlinks[k].lang)) {
          langLinks += `<a href=${tmp.langlinks[k].url}>${tmp.langlinks[k].lang}</a> `;
        }
      }
      theData += `<li>${wikiimg} ${title} ${extract} <span class="langs">${langLinks}</span></li>`;
    }
    demoJSON.innerHTML = theData;
  }

  // the API call is triggered once the user submits a query
	if (searchForm)
	{
		searchForm.addEventListener("submit", function(ev){
	    // complete the request url
	    let wiki = baseURL + queryBox.value;
	    // open a connection to the requested API url
	    xhr.open("GET", wiki, true);
	    // be polite to Wikipedia
	    xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
	    // send off that request
	    xhr.send();
	    // if the response was ok, handle the response data using the gatherData function
	    xhr.onreadystatechange = function() {
	      // console.log(`Current readyState: ${xhr.readyState}`);
	      if (xhr.readyState === 4 && xhr.status === 200) {
	        // parse the response JSON
	        let response = JSON.parse(xhr.responseText);
	        // deal with the parsed JSON data
	        gatherData(response);
	      }
	    };
	    // clear the search box
	    queryBox.value = "";
	    ev.preventDefault();
	  }, false);
	}

}());


function initMap() {
  let leicester = {lat: 52.629109, lng: -1.139164};

  let mapDemo = document.getElementById("map");

  // this sets the default location for when the map is first loaded
  let map = new google.maps.Map(mapDemo, {
    zoom: 13,
    center: leicester
  });

  // these set different markers you want to show on your map
  let markerLeicester = new google.maps.Marker({
    position: leicester,
    map: map,
    title: 'Kimberlin Library'
  });

}
