/* content:
 * info button
 * initial query when page loads
 * update query if required by user
 * display data logic
 * paginate data logic
 * display pop-up
 * create autocomplete function
 */

/* info button */

// get elements
const infobutton = document.getElementById("info-button");
const modalHiddenCont = document.querySelector(".uni-hidden-popup");
const modalHiddenClose = document.getElementById("close-hidden-popup");
const modalHiddenContent = document.querySelector(".content-hidden-cont");

// function popup button
infobutton.addEventListener("click", function () {
  // open popup
  modalHiddenCont.classList.add("open-modal-uni");
  modalHiddenCont.style.zIndex = 20;

  // display data in Popup
  modalHiddenContent.innerHTML = `<p class="text_insight_info"> <b>How to use this page</b> </p>
  <div class="text_insight">
  <p>Welcome to our Database!</p>
  <p>On this page, you are able to search for the universities and subjects you want to apply to.</p>
  <p>If we have data for your search, it will be displayed here and you are able to get more specific information on the person who got admitted or rejected by clicking on the respective entry.</p>
  <p>In case we do not have any entries for your search, you can make your search less specific or look for another program. As our database is continuously growing, make sure to come back soon and check whether someone has added an entry for your program!</p>
  <p>If you have any questions, feel free to contact us via the e-mail given in the legal disclosure.</p>
  </div>`;
});

/* initital query when page loads */

// Select elements on universities page
const secondInputForm = document.getElementById("second-uni-search");
let universityInputTwo = document.getElementById("universityTwo");
let subjectInputTwo = document.getElementById("subjectTwo");

// loading student data on screen
window.addEventListener("DOMContentLoaded", function () {
  // add index search query to university search query
  const initialInput = getLocalStorage();

  // get university value
  const universityInputlocal = initialInput.find(function (e) {
    return e.id === "uniInput";
  });

  // get subject value
  const subjectInputlocal = initialInput.find(function (e) {
    return e.id === "subjectInput";
  });

  // deal with undefined local storage
  if (universityInputlocal == undefined || subjectInputlocal == undefined) {
    universityInputTwo.value = "University of Mannheim ";
    subjectInputTwo.value = "Business Administration";
  } else {
    universityInputTwo.value = universityInputlocal.universityValue;
    subjectInputTwo.value = subjectInputlocal.universityValue;
  }

  // display Students
  countPlaceDataset = 0;
  dataload = [];

  //display data
  getAndDisplay();

  // do the DOMContent tab highlighting
  const idUniversityLink = document.getElementById("university-page-link");
  idUniversityLink.style.color = "#271291";
  idUniversityLink.style.textDecoration = "underline";
  idUniversityLink.style.textDecorationColor = "#271291";
});

// get local storage
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

/* update query if required by user */

// update display if user presses Enter
window.addEventListener("keyup", function (e) {
  // number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // update saved query terms
    localStorage.clear();
    addToLocalStorage("uniInput", universityInputTwo.value);
    addToLocalStorage("subjectInput", subjectInputTwo.value);
    // cancel the default action
    e.preventDefault();
    dataload = [];
    // get data from backend and safe in dataload
    getAndDisplay();
  }
});

// prevent default in university query form and update display
secondInputForm.addEventListener("submit", function (e) {
  // update saved query terms
  localStorage.clear();
  addToLocalStorage("uniInput", universityInputTwo.value);
  addToLocalStorage("subjectInput", subjectInputTwo.value);
  e.preventDefault();
  dataload = [];
  // get data from backend and safe in dataload
  getAndDisplay();
});

// add to local storage
function addToLocalStorage(id, value) {
  const university = { id: id, universityValue: value };
  let items = getLocalStorage();
  console.log(items);
  items.push(university);
  localStorage.setItem("list", JSON.stringify(items));
}

/* display data logic */

// assign firestore to variable
db = firebase.firestore();

// get values from backend and display
function getAndDisplay() {
  document.getElementById("loadMoreResults").style.display = "block";
  document.getElementById("loadPreviousResults").style.display = "none";

  //create function if university and subject is searched
  function bothData(univalue, subjectvalue) {
    var firstQuery = db
      .collection("universities")
      .where("Decisionwhere", "==", univalue)
      .where("Decisionsubject", "==", subjectvalue)
      .limit(8);

    //check if subject has data
    firstQuery.get().then(function (querySnapshot) {
      if (!querySnapshot.empty) {
        // if subject has data
        querySnapshot.forEach(function (doc) {
          dataload.unshift(doc.data());

          // save data to session storage and add uid
          let i;
          sessionStorage.clear();
          for (i = 0; i < dataload.length; i++) {
            dataload[i].id = i;
            addToSessionStorage(i, dataload[i], "previous");
          }
        });
        // display data and popup
        displayStudents2(dataload);
        popupStudent(dataload);
        bothPaginateData(firstQuery, univalue, subjectvalue);
        // if subject has no data
      } else {
        oneData("Decisionwhere", univalue);
      }
    });
  }

  //function if only of them is searched
  function oneData(oneChoice, oneValue) {
    var firstQuery = db
      .collection("universities")
      .where(oneChoice, "==", oneValue)
      .limit(8);

    firstQuery.get().then(function (querySnapshot) {
      if (!querySnapshot.empty) {
        querySnapshot.forEach(function (doc) {
          dataload.unshift(doc.data());
          // save data to session storage and add uid
          let i;
          sessionStorage.clear();
          for (i = 0; i < dataload.length; i++) {
            dataload[i].id = i;
            addToSessionStorage(i, dataload[i], "previous");
          }
          // display data and popup
        });
        displayStudents2(dataload);
        popupStudent(dataload);
        onePaginateData(firstQuery, oneChoice, oneValue);
      } else {
        displayNoDataAvailable();
      }
    });
  }

  let univalue;
  let subjectvalue;

  // create search query
  if (universityInputTwo.value && subjectInputTwo.value) {
    univalue = universityInputTwo.value;
    subjectvalue = subjectInputTwo.value;
    bothData(univalue, subjectvalue);
  } else if (!universityInputTwo.value && subjectInputTwo.value) {
    oneValue = subjectInputTwo.value;
    oneChoice = "Decisionsubject";
    oneData(oneChoice, oneValue);
  } else if (universityInputTwo.value && !subjectInputTwo.value) {
    oneValue = universityInputTwo.value;
    oneChoice = "Decisionwhere";
    oneData(oneChoice, oneValue);
  } else {
    univalue = "University of Mannheim ";
    subjectvalue = "Business Adminstration";
    bothData(univalue, subjectvalue);
  }
}

// get element
const displayOutput = document.getElementById("check-universities-output");

// display function
function displayStudents2(dataset) {
  displayOutput.innerHTML = ``;
  let countDisplays = 0;
  dataset.every(function (stud) {
    countDisplays++;
    countPlaceDataset++;
    returnHTML(stud);
    // break if displaying to much data
    if (countDisplays >= 8) {
      return false;
    } else {
      return true;
    }
  });
}

function displayNoDataAvailable() {
  displayOutput.innerHTML = ``;
  let countDisplays = 0;
  const element = document.createElement("div");
  element.innerHTML = `<h4>Sorry, no Data available yet :-(</h4><br>
    <h3>Please try out a different search combination or try again later </h3>`;
  element.classList.add("no-data-available");
  displayOutput.appendChild(element);
}

// function for returning html
function returnHTML(stud) {
  const element = document.createElement("div");
  // get id
  const attr = document.createAttribute("dataId");
  attr.value = stud.id;
  element.setAttributeNode(attr);
  //add class
  element.classList.add("single-student-output");
  // create HTML
  element.innerHTML = `<h5>${displayAdmittedIcon(stud.Decision)}</h5> <h5>${
    stud.Level
  }</h5> <h5>${stud.Decisionwhere}</h5> <h5>${stud.Decisionsubject}</h5>`;
  displayOutput.appendChild(element);
}

// add to session
function addToSessionStorage(id, value, word) {
  // store in session storage and use data object for value with suitable id
  const data = { id: id, data: value };
  let items = getSessionStorage(word);
  items.push(data);
  sessionStorage.setItem(word, JSON.stringify(items));
}

// get session storage
function getSessionStorage(word) {
  return sessionStorage.getItem(word)
    ? JSON.parse(sessionStorage.getItem(word))
    : [];
}

/* paginate data logic */

const loadMoreDataButton = document.getElementById("loadMoreResults");

// paginate data function
function bothPaginateData(lastquery, univalue, subjectvalue) {
  // clear old data
  dataloadNext = [];

  // load new data
  loadMoreDataButton.addEventListener(
    "click",
    function () {
      return lastquery.get().then(function (documentSnapshots) {
        // Get the last visible document
        var lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        // Construct a new query starting at this document,
        db.collection("universities")
          .where("Decisionwhere", "==", univalue)
          .where("Decisionsubject", "==", subjectvalue)
          .startAfter(lastVisible)
          .limit(8)
          .get()
          .then(function (querySnapshot) {
            if (!querySnapshot.empty) {
              querySnapshot.forEach(function (doc) {
                dataloadNext.unshift(doc.data());
              });

              // save data to session storage
              let i;
              for (i = 0; i < dataloadNext.length; i++) {
                dataloadNext[i].id = i;
                addToSessionStorage(i, dataloadNext[i], "next");
              }

              //display data and popup
              displayStudents2(dataloadNext);
              popupStudent(dataloadNext);
              previousData();
            } else {
              previousData();
              displayNoMoreDataAvailable();
            }
          });
      });
    },
    { once: true }
  );
}

function onePaginateData(lastquery, oneChoice, oneValue) {
  // clear old data
  dataloadNext = [];

  // load new data
  loadMoreDataButton.addEventListener(
    "click",
    function () {
      return lastquery.get().then(function (documentSnapshots) {
        // Get the last visible document
        var lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        // Construct a new query starting at this document,
        db.collection("universities")
          .where(oneChoice, "==", oneValue)
          .startAfter(lastVisible)
          .limit(8)
          .get()
          .then(function (querySnapshot) {
            if (!querySnapshot.empty) {
              querySnapshot.forEach(function (doc) {
                dataloadNext.unshift(doc.data());
              });
              // save data to session storage
              let i;
              for (i = 0; i < dataloadNext.length; i++) {
                dataloadNext[i].id = i;
                addToSessionStorage(i, dataloadNext[i], "next");
              }

              //display data and popup
              displayStudents2(dataloadNext);
              popupStudent(dataloadNext);
              previousData();
            } else {
              previousData();
              displayNoMoreDataAvailable();
            }
          });
      });
    },
    { once: true }
  );
}

function displayNoMoreDataAvailable() {
  displayOutput.innerHTML = ``;
  let countDisplays = 0;
  const element = document.createElement("div");
  element.innerHTML = `<h4>Sorry, no more Data available yet :-(</h4><br>
    <h3>Please try out a different search combination or try again later </h3>`;
  element.classList.add("no-data-available");
  displayOutput.appendChild(element);
}

const loadPreviousDataButton = document.getElementById("loadPreviousResults");

function previousData() {
  //show previous button
  document.getElementById("loadPreviousResults").style.display = "block";
  document.getElementById("loadMoreResults").style.display = "none";

  previousDataset = [];
  loadPreviousDataButton.addEventListener("click", function () {
    previousDataSet = getSessionStorage("previous");
    for (i = 0; i < previousDataSet.length; i++) {
      previousDataSet[i] = previousDataSet[i].data;
    }
    //display data and popup
    displayStudents2(previousDataSet);
    popupStudent(previousDataSet);
    nextData();
    document.getElementById("loadPreviousResults").style.display = "none";
    document.getElementById("loadMoreResults").style.display = "block";
  });
}

function nextData() {
  // do not display backward
  document.getElementById("loadPreviousResults").style.display = "none";
  document.getElementById("loadMoreResults").style.display = "block";

  nextDataSet = [];
  loadMoreDataButton.addEventListener("click", function () {
    nextDataSet = getSessionStorage("next");
    for (i = 0; i < nextDataSet.length; i++) {
      nextDataSet[i] = nextDataSet[i].data;
    }
    //display data and popup
    displayStudents2(nextDataSet);
    popupStudent(nextDataSet);
    document.getElementById("loadPreviousResults").style.display = "block";
    document.getElementById("loadMoreResults").style.display = "none";
  });
}

/* display pop-up */

// function open popup and display values
function popupStudent(stud) {
  const displayContainer = document.querySelectorAll(".single-student-output");
  displayContainer.forEach(function (e) {
    e.addEventListener("click", function () {
      // open popup
      modalHiddenCont.classList.add("open-modal-uni");
      modalHiddenCont.style.zIndex = 20;
      // style clicked element

      // clear existing borders
      displayContainer.forEach(function (f) {
        f.style.border = null;
        f.style.boxShadow = null;
      });

      // style newly clicked
      e.style.border = "2px solid #93e5ab";
      e.style.boxShadow = "2px 5px 10px #cfefd8";

      // get values from dataset
      const keyId = e.attributes[0].value;
      let studentObj = stud[keyId];

      // display data in Popup
      modalHiddenContent.innerHTML = `<span> <h5 class="text_insight_icon"> <b>${displayAdmittedIcon(
        studentObj.Decision
      )}</b></h5></span>
      <span> <h5 class="text_insight"> <b>Person is from:</b> ${
        studentObj.Country
      }</h5> </span>`;

      // check wether someone got admitted or rejected at first
      if (studentObj.Decision == "1") {
        modalHiddenContent.innerHTML += `<span> <h5 class="text_insight"> <b> Admitted at:</b> ${studentObj.Decisionwhere}</h5> </span>`;
      } else {
        modalHiddenContent.innerHTML += `<span> <h5 class="text_insight"><b> Rejected at:</b> ${studentObj.Decisionwhere}</h5> </span>`;
      }
      modalHiddenContent.innerHTML += `<span> <h5 style="display:inline-block;" class="text_insight"> <b>In Subject:</b> ${studentObj.Decisionsubject}</h5> </span>`;
      if (
        studentObj.Decisionsubjectspec != "0" &&
        studentObj.Decisionsubjectspec != ""
      ) {
        modalHiddenContent.innerHTML += `<span> <h5 style="display:inline-block;" class="text_insight"> <b>Specification:</b> ${studentObj.Decisionsubjectspec}</h5> </span>`;
      }
      modalHiddenContent.innerHTML += `<span> <h5 class="text_insight"> <b>Pursued Degree:</b> ${studentObj.Level}</h5> </span>`;
      //check if data was contributed for variable and if yes then display
      if (
        studentObj.TestScore != "0" &&
        studentObj.TestScore != "" &&
        studentObj.TestScore != "None"
      ) {
        modalHiddenContent.innerHTML += `<span> <h5 class="text_insight"> <b>Took:</b> ${studentObj.Test} <b>with:</b> ${studentObj.TestScore} <b>Points</b></h5> </span>`;
      }
      if (studentObj.Level == "Master") {
        modalHiddenContent.innerHTML += `<span><h5 class="text_insight_info"> Bachelor </h5> </span>`;
        //check if data was contributed for variable and if yes then display
        if (studentObj.PublishOkay == true) {
          modalHiddenContent.innerHTML += `<span><h5 class="text_insight"> <b>Bachelor University:</b> ${studentObj.BachelorUniversity}</h5> </span>
          <span><h5 class="text_insight"> <b>Bachelor Subject:</b> ${studentObj.BachelorSubject}</h5> </span>`;
        }
        modalHiddenContent.innerHTML += ` <span><h5 style="display:inline-block;" class="text_insight"> <b>Grade / GPA:</b> ${studentObj.BachelorGPA}</h5> </span>`;

        modalHiddenContent.innerHTML += ` <span><h5 style="display:inline-block;" class="text_insight">(Top ${studentObj.BPercent})</h5> </span>`;
        //check  Scale  and then add description of grading scale
        displayscale(studentObj.BachelorScale, modalHiddenContent);
        displaycurr(
          studentObj.BInternshiptype,
          studentObj.BInternationaltype,
          studentObj.BVolunteeringtype,
          modalHiddenContent
        );
      }
      //Highschool data
      modalHiddenContent.innerHTML += `<span><h5 class="text_insight_info"> Highschool </h5> </span>
      <span> <h5 style="display:inline-block;" class="text_insight"> <b>Grade / GPA:</b> ${studentObj.HighschoolGPA}</h5> </span>`;
      //check  Scale  and then add description of grading scale
      displayscale(
        studentObj.HighschoolScale,
        modalHiddenContent,
        studentObj.HInternshiptype
      );
      //check if extracurricular were contributed for variable and if yes then display
      displaycurr(
        studentObj.HInternshiptype,
        studentObj.HInternationaltype,
        studentObj.HVolunteeringtype,
        modalHiddenContent
      );
    });
  });
}

function popupStudentOut() {
  const displayContainer = document.querySelectorAll(".single-student-output");
  displayContainer.forEach(function (e) {
    e.addEventListener("click", function () {
      // open popup
      modalHiddenCont.classList.add("open-modal-uni");
      modalHiddenCont.style.zIndex = 20;
      // style clicked element
      // clear existing borders
      displayContainer.forEach(function (f) {
        f.style.border = null;
        f.style.boxShadow = null;
      });
      // style newly clicked
      e.style.border = "2px solid #93e5ab";
      e.style.boxShadow = "2px 5px 10px #cfefd8";
      //add content
      modalHiddenContent.innerHTML = `<div class="univ-login-popup"><p><b>Please Log In</b></p> </br> <p>To provide you with this information, we rely on others to share their experiences with us. Therefore, please log in first to contribute something yourself. <br />
      Good luck with your applications!</p></br><a href="logIn.html" class="btn univ-popup-btn">Log In</a></div>`;
    });
  });
}

//display grading scale
function displayscale(scale, form) {
  switch (scale) {
    case "Germany(4.0-1.0)":
      form.innerHTML += `<span><h5 style="display:inline-block;" class="text_insight">(Worst 4.0 - Best 1.0)</h5> </span>`;
      break;
    case "GPA(1.0-4.0)":
      form.innerHTML += `
    <span><h5 style="display:inline-block;" class="text_insight">(Worst 1.0 - Best 4.0)</h5> </span>`;
      break;
    case "UK(Fail-First)":
      form.innerHTML += `
    <span><h5 style="display:inline-block;" class="text_insight">(Worst Fail - Best First)</h5> </span>`;
      break;
    case "Netherlands(0-10)":
      form.innerHTML += `
    <span><h5 style="display:inline-block;" class="text_insight">(Worst 0 - Best 10)</h5> </span>`;
      break;
    case "Percentage(0-100%)":
      form.innerHTML += `
    <span><h5 style="display:inline-block;" class="text_insight">(Worst 0% - Best 100%)</h5> </span>`;
      break;
    case "Grading-Letters(F-A*)":
      form.innerHTML += `
    <span><h5 style="display:inline-block;" class="text_insight">(Worst F - Best A*)</h5> </span>`;
      break;
    case "Italy(0-30)":
      form.innerHTML += `
    <span><h5 style="display:inline-block;" class="text_insight">(Worst 0 - Best 30)</h5> </span>`;
      break;
  }
}

//display extracurricular
function displaycurr(intern, internat, volun, form) {
  //check if data internship was contributed for variable and if yes then display
  if (intern != "0") {
    form.innerHTML += `<span><h5 class="text_insight"> <b>Working Experience / Internship: </b>${intern}</h5> </span>`;
  }
  //check if data international was contributed for variable and if yes then display
  if (internat != "0") {
    form.innerHTML += `<span><h5 class="text_insight"> <b>International Experience : </b>${internat}</h5> </span>`;
  }
  //check if data volunteering was contributed for variable and if yes then display
  if (volun != "0") {
    form.innerHTML += `<span><h5 class="text_insight"><b>Volunteering:</b> ${volun}</h5> </span>`;
  }
}

// function displaying Admitted Icon
function displayAdmittedIcon(admit) {
  return admit > 0
    ? `<i class="fas fa-check-circle admitted-icon"></i>`
    : `<i class="fas fa-times-circle not-admitted-icon"></i>`;
}

// close pop-up again
modalHiddenClose.addEventListener("click", function () {
  modalHiddenCont.classList.remove("open-modal-uni");
  modalHiddenCont.style.zIndex = -10;
  modalHiddenContent.innerHTML = ``;
  const displayContainer = document.querySelectorAll(".single-student-output");
  displayContainer.forEach(function (f) {
    f.style.border = null;
    f.style.boxShadow = null;
  });
});

/* create autocomplete function */

// Autocomplete function with two arguments: text field element and array of values
function autocomplete(inp, arr) {
  //enable button
  document.getElementById("btn-universities").disabled = false;
  //reset input button border to black
  inp.className = "input-form";
  //help variable to switch between automplete values
  let currentFocus;
  // Reset input
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
          //validate input field by disabling if not out of dropdown
          document.getElementById("btn-universities").disabled = "disabled";
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
          //enable button
          document.getElementById("btn-universities").disabled = false;
          //insert autocomplete value
          inp.value = this.getElementsByTagName("input")[0].value;
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
universityInputTwo.addEventListener("focus", function () {
  init("universityTwo");
});

// activate Autocomplete Subject
subjectInputTwo.addEventListener("focus", function () {
  init("subjectTwo");
});

// JSON reading
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
      case "subjectTwo":
        autocomplete(document.getElementById(idInput), actual_JSON[0].subject);
        break;
      case "universityTwo":
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
