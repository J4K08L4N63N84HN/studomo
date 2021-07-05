// /////////////Manage first Input//////////////////////////

// input form "find university"
const initialInputForm = document.getElementById("initial-uni-search");
let universityInput = document.getElementById("university-input");
let subjectInput = document.getElementById("subject-input");
// toggle placeholder onfocus: University&Subject Input
let helpPlaceholderUni = "";
let helpPlaceholderSubject = "";
// University
universityInput.addEventListener("focus", function () {
  helpPlaceholderUni = universityInput.getAttribute("placeholder");
  universityInput.removeAttribute("placeholder");
});
universityInput.addEventListener("blur", function () {
  universityInput.setAttribute("placeholder", helpPlaceholderUni);
});
// Subject
subjectInput.addEventListener("focus", function () {
  helpPlaceholderSubject = subjectInput.getAttribute("placeholder");
  subjectInput.removeAttribute("placeholder");
});
subjectInput.addEventListener("blur", function () {
  subjectInput.setAttribute("placeholder", helpPlaceholderSubject);
});
// submiting on first page
initialInputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // clear existing local storage
  let initialInput = getLocalStorage();
  let hideOrNot = { id: "dummy", universityValue: false };
  initialInput.forEach(function (e) {
    if (e.id === "hidePopup") {
      hideOrNot = e;
      return hideOrNot;
    }
  });
  localStorage.clear();
  // end clear existing storage

  // add to local storage
  addToLocalStorage("hidePopup", hideOrNot.universityValue);
  addToLocalStorage("uniInput", universityInput.value);
  addToLocalStorage("subjectInput", subjectInput.value);
  // go to database.html
  window.location = "database.html";
});
window.addEventListener("keyup", function (e) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    e.preventDefault();
    // clear existing local storage
    let initialInput = getLocalStorage();
    let hideOrNot = { id: "dummy", universityValue: false };
    initialInput.forEach(function (e) {
      if (e.id === "hidePopup") {
        hideOrNot = e;
        return hideOrNot;
      }
    });
    localStorage.clear();
    // end clear existing storage

    // add to local storage
    addToLocalStorage("hidePopup", hideOrNot.universityValue);
    addToLocalStorage("uniInput", universityInput.value);
    addToLocalStorage("subjectInput", subjectInput.value);
    // go to database.html
    window.location = "database.html";
  }
});
// //////////////////Local Storage Functions////////////////////
function addToLocalStorage(id, value) {
  const university = { id: id, universityValue: value };
  let items = getLocalStorage();
  console.log(items);
  items.push(university);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

//Autocomplete function with two arguments: text field element dn array of values
function autocomplete(inp, arr) {
  //enable button
  document.getElementById("index_button_go").disabled = false;
  //reset input button border to black
  inp.className = "input-form";
  //help variable to switch between automplete values
  let currentFocus;
  inp.value = "";
  //function to execute when someone writes into text field
  inp.addEventListener("input", function (e) {
    let unilist,
      matchingEle,
      i,
      val = this.value;
    //close any already open lists of autocompleted values
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    //create a DIV element that will contain the values
    unilist = document.createElement("DIV");
    unilist.setAttribute("id", this.id + "autocomplete-list");
    unilist.setAttribute("class", "autocomplete-items");
    //append DIV element to autocomplete container
    this.parentNode.appendChild(unilist);
    for (i = 0; i < arr.length; i++) {
      //check if item starts with the same letters as the text field value
      let j = arr[i].toUpperCase();
      let y = val.toUpperCase();
      let z = j.search(y);
      if (arr[i].substr(z, val.length).toUpperCase() == val.toUpperCase()) {
        if (i > 0) {
          //validate input field
          document.getElementById("index_button_go").disabled = "disabled";
          //set input button border to red
          inp.className = "input-form-disabled";
        }
        //create DIV element for matching elements
        matchingEle = document.createElement("DIV");
        //make matching letters bold
        matchingEle.innerHTML = arr[i].substr(0, val.length);
        matchingEle.innerHTML += arr[i].substr(val.length);
        //input field to hold currennt value
        matchingEle.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        //execute when someone clicks on item value
        matchingEle.addEventListener("click", function (e) {
          //insert autocomplete value
          inp.value = this.getElementsByTagName("input")[0].value;
          //set validation to true
          document.getElementById("index_button_go").disabled = false;
          //reset input button border to black
          inp.className = "input-form";
          //close autocompleted list
          closeAllLists();
        });

        unilist.appendChild(matchingEle);
      }
    }
  });

  //function presses key on the keyboard
  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    //arrow down make current item more visible
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      //arrpwn up make current item more visible
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      //enter prevent from being submitted and simulate click on active item
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  //function to classify item as active
  function addActive(x) {
    if (!x) return false;
    //remove all active class on items
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }

  //function to remove active class
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  //function to close all autocomplete lists in document
  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  //execute when someone clicks in document to close all Lists
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

// activate Autocomplete Subject
universityInput.addEventListener("focus", function () {
  init("university-input");
});
// activate Autocomplete Subject
subjectInput.addEventListener("focus", function () {
  init("subject-input");
});
////////////// JSON Reading///////////////////////////////
function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.open("GET", "./js/data.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status === 200) {
      // Required use of an anonymous callback
      // as .open() will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
function init(idInput) {
  loadJSON(function (response) {
    // Parse JSON string into object
    let actual_JSON = JSON.parse(response);
    console.log(actual_JSON);
    switch (idInput) {
      case "subject-input":
        autocomplete(document.getElementById(idInput), actual_JSON[0].subject);
        break;
      case "university-input":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].universities
        );
        break;
      case "country-cur":
        autocomplete(document.getElementById(idInput), actual_JSON[0].country);
        break;
    }
  });
}
