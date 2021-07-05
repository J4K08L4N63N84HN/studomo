// Open Popup for sec Questions
const firstSubForm = document.getElementById("first-quest-id");
const modalSecond = document.querySelector(".modal-overlay-sec");
const firstSubBtn = document.querySelector("#submit-first-contr");
// dynamically adding the content
const modalfirst = document.querySelector(".modal-overlay");
const currStatus = document.getElementById("degree-cur");
// Current Tab Highlighter
window.addEventListener("DOMContentLoaded", function () {
  const idContributeLink = document.getElementById("contribute-page-link-1");
  idContributeLink.style.color = "#271291";
  idContributeLink.style.textDecoration = "underline";
  idContributeLink.style.textDecorationColor = "#271291";
});
// info button onclick
const infoButtonCont = document.getElementById("info-button-contr");
const contributeMain = document.querySelector("contribute-main");
infoButtonCont.addEventListener("click", function () {
  const element = document.createElement("div");
  element.id = "popup-info-contr";
  element.classList.add("open-modal-uni");
  element.style.zIndex = 2000;

  // display data in Popup
  element.innerHTML = `<div class="info-contribute-text">
  <i class="fas fa-times" id="close-popup-info"></i>
  <p class="text_insight_info"> <b>How to use this page</b> </p>
  <div class="text_insight">
  <p>Share your data with us anonymously and find out where you stand compared to your fellow students.</p>
  <p>It will take no more than 2 minutes and help students all over the world!</p>
  <p>We will validate your data and afterwards you can already find it on our "Universities" page.</p>
  <p>If you have any questions, feel free to contact us via the e-mail given in the legal disclosure.</p>
  </div>
  </div>`;
  modalfirst.appendChild(element);
  document
    .getElementById("close-popup-info")
    .addEventListener("click", function () {
      const elementClose = document.getElementById("popup-info-contr");
      elementClose.remove();
    });
});
//constructor function to get data
function PersonCreate(
  country,
  status,
  HGPA,
  HS,
  HP,
  Te,
  TeSc,
  HIt,
  HInat,
  HVt,
  lev,
  BU,
  BSub,
  PO,
  BGPA,
  BS,
  BP,
  BIt,
  BInat,
  BVt,
  whe,
  sub,
  subspec,
  dec
) {
  this.country = country;
  this.status = status;
  this.HighschoolGPA = HGPA;
  this.HighschoolScale = HS;

  this.Test = Te;
  this.TestScore = TeSc;
  this.HighschoolInternshiptype = HIt;
  this.HighschoolInternationaltype = HInat;
  this.HighschoolVolunteeringtype = HVt;
  this.BachelorUniversity = BU;
  this.BachelorSubject = BSub;
  this.PublishOkay = PO;
  this.BachelorGPA = BGPA;
  this.BachelorScale = BS;
  this.Bachelorpercent = BP;
  this.BachelorInternshiptype = BIt;
  this.BachelorInternationaltype = BInat;
  this.BachelorVolunteeringtype = BVt;
  this.level = lev;
  this.where = whe;
  this.subject = sub;
  this.subjectspecification = subspec;
  this.Decision = dec;
}
//autocomplete for Countries
let countryinput = document.getElementById("country-cur");
countryinput.addEventListener("focus", function () {
  init("country-cur", "submit-first-contr");
});
//define a new person
let VariableSaveTransfer = new PersonCreate();
// change grading scala during Highschool(first field)
changeGrading("cur-HGPA", "first-quest-id");
//define input fields that need to be required
document.getElementById("country-cur").required = true;
document.getElementById("degree-cur").required = true;
document.getElementById("grading-scala").required = true;
// Regulate first submit
firstSubForm.addEventListener("submit", function (e) {
  e.preventDefault();
  //get HTML data
  VariableSaveTransfer.country = document.getElementById("country-cur").value;
  VariableSaveTransfer.status = document.getElementById("degree-cur").value;
  VariableSaveTransfer.HighschoolGPA = document.getElementById(
    "cur-HGPA"
  ).value;
  VariableSaveTransfer.HighschoolScale = document.getElementById(
    "grading-scala"
  ).value;

  // choosing path according to study status
  if (currStatus.value === "Highschool") {
    //set data that is only relevant for Bachelor to 0 if people are on Highschoollevel
    VariableSaveTransfer.BachelorUniversity = "0";
    VariableSaveTransfer.BachelorSubject = "0";
    VariableSaveTransfer.PublishOkay = "0";
    VariableSaveTransfer.BachelorGPA = "0";
    VariableSaveTransfer.BachelorScale = "0";
    VariableSaveTransfer.Bachelorpercent = "0";
    VariableSaveTransfer.BachelorInternshiptype = "0";
    VariableSaveTransfer.BachelorInternationaltype = "0";
    VariableSaveTransfer.BachelorVolunteeringtype = "0";
    VariableSaveTransfer.Test = "0";
    VariableSaveTransfer.TestScore = "0";
    // First stage of highschool input
    modalfirst.innerHTML = highschoolExtraCurr(
      "extra-curr-form",
      "submit-high-extracurr"
    );
    insertProgress("33%");
    // heading extra curr highschool
    insertHeading("Please tell us about your High School Extracurriculars");

    // second stage of highschool input
    const highschoolExtraForm = document.getElementById("extra-curr-form");
    // adding to form on click///////////////////////////////
    // Internship
    const onclickEngagement = document.getElementById("extraCurrHigh-work");
    clickPleaseSpecify(
      "extraCurrHigh-work-label",
      onclickEngagement,
      "work-durhigh-type",
      "submit-high-extracurr"
    );
    // International Experience
    const onclickEngagement2 = document.getElementById("extraCurrHigh-intExp");
    clickPleaseSpecify(
      "extraCurrHigh-intExp-label",
      onclickEngagement2,
      "intExp-durhigh-type",
      "submit-high-extracurr"
    );
    // Volunteering
    const onclickEngagement3 = document.getElementById("extraCurrHigh-volunt");
    clickPleaseSpecify(
      "extraCurrHigh-volunt-label",
      onclickEngagement3,
      "volunt-durhigh-type",
      "submit-high-extracurr"
    );
    // end adding to form on click///////////////////////////////////
    highschoolExtraForm.addEventListener("submit", function (e) {
      e.preventDefault();
      //check and save data out of input fields
      VariableSaveTransfer.HighschoolInternshiptype = saveData(
        "work-durhigh-type"
      );
      //check and save data out of input fields
      VariableSaveTransfer.HighschoolInternationaltype = saveData(
        "intExp-durhigh-type"
      );
      //check and save data out of input fields
      VariableSaveTransfer.HighschoolVolunteeringtype = saveData(
        "volunt-durhigh-type"
      );
      modalfirst.innerHTML = bachelorAdmitted(
        "high-bachelor-admitted-form",
        "high-submit-Ba-admitted",
        1,
        "thumbs-1",
        "thumbs-2"
      );
      // toggle Icons for Admitted/notAdmitted
      itemToggler(".icon-admit");
      console.log(VariableSaveTransfer);
      // third stage of highschool input
      const bachelorAdmittedForm = document.getElementById(
        "high-bachelor-admitted-form"
      );
      //variables for buttons to create eventlistener
      let uni1 = document.getElementById("programm-admitted-uni");
      let uni2 = document.getElementById("programm-admitted-uni-2");
      let sub1 = document.getElementById("programm-admitted-subject");
      let sub2 = document.getElementById("programm-admitted-subject-2");
      //Autocomplete für Textfelder
      uni1.addEventListener("focus", function () {
        init("programm-admitted-uni", "high-submit-Ba-admitted");
      });
      //Autocomplete für Textfelder
      uni2.addEventListener("focus", function () {
        init("programm-admitted-uni-2", "high-submit-Ba-admitted");
      });
      // activate Autocomplete Subject
      sub1.addEventListener("focus", function () {
        init("programm-admitted-subject", "high-submit-Ba-admitted");
      });
      // activate Autocomplete Subject
      sub2.addEventListener("focus", function () {
        init("programm-admitted-subject-2", "high-submit-Ba-admitted");
      });
      // add additional university
      clickAddUniAdmitted(
        bachelorAdmittedForm,
        "high-submit-Ba-admitted",
        "addnew-Uniadmit-1",
        "thumbs-3",
        "thumbs-4"
      );
      // heading extra curr highschool
      insertHeading(
        "Share your Bachelor applications. Please specify if you got admitted or rejected."
      );
      // progress bachelor admitted
      insertProgress("66%");
      // end add additional university
      bachelorAdmittedForm.addEventListener("submit", function () {
        e.preventDefault();
        VariableSaveTransfer.level = "Bachelor";
        console.log(VariableSaveTransfer);

        //check university input field
        checkuniversitydata(
          "programm-admitted-uni",
          "programm-admitted-subject",
          "subject-specification",
          "thumbs-1",
          VariableSaveTransfer
        );
        console.log(VariableSaveTransfer);
        //save database

        savedatabase(VariableSaveTransfer);

        //check university input field
        checkuniversitydata(
          "programm-admitted-uni-2",
          "programm-admitted-subject-2",
          "subject-specification-2",
          "thumbs-2",
          VariableSaveTransfer
        );
        console.log(VariableSaveTransfer);
        //save database
        savedatabase(VariableSaveTransfer);
        //check university input field
        checkuniversitydata(
          "programm-admitted-uni-3",
          "programm-admitted-subject-3",
          "subject-specification-3",
          "thumbs-3",
          VariableSaveTransfer
        );
        console.log(VariableSaveTransfer);
        //save database, set variables for data in Bachelor's degree to zero cause highschool-student
        savedatabase(VariableSaveTransfer);
        //check university input field
        checkuniversitydata(
          "programm-admitted-uni-4",
          "programm-admitted-subject-4",
          "subject-specification-4",
          "thumbs-4",
          VariableSaveTransfer
        );

        modalfirst.innerHTML = thankYou();
        //save database, set variables for data in Bachelor's degree to zero cause highschool-student
        savedatabase(VariableSaveTransfer);
        // go to database.html after 0,5 s
        toUni();
      });
    });
    // ##################Case Bachelor###########################
  } else if (currStatus.value === "Bachelor") {
    //set data that is only relevant for Bachelor to 0 if people are not on Masterlevel
    VariableSaveTransfer.BachelorUniversity = "0";
    VariableSaveTransfer.BachelorSubject = "0";
    VariableSaveTransfer.PublishOkay = "0";
    VariableSaveTransfer.BachelorGPA = "0";
    VariableSaveTransfer.BachelorScale = "0";
    VariableSaveTransfer.Bachelorpercent = "0";
    VariableSaveTransfer.BachelorInternshiptype = "0";
    VariableSaveTransfer.BachelorInternationaltype = "0";
    VariableSaveTransfer.BachelorVolunteeringtype = "0";
    VariableSaveTransfer.Test = "0";
    VariableSaveTransfer.TestScore = "0";
    // First stage of highschool input
    modalfirst.innerHTML = highschoolExtraCurr(
      "extra-curr-ba-form",
      "submit-high-extracurr"
    );
    // heading extra curr highschool
    insertHeading("Please tell us about your High School Extracurriculars");
    // progress extra curr highschool
    insertProgress("33%");
    // second stage of highschool input
    const highschoolExtraForm = document.getElementById("extra-curr-ba-form");
    // adding to form on click///////////////////////////////
    // Internship
    const onclickEngagement = document.getElementById("extraCurrHigh-work");
    clickPleaseSpecify(
      "extraCurrHigh-work-label",
      onclickEngagement,
      "work-durhigh-ba-type",
      "submit-high-ba-extracurr"
    );
    // International Experience
    const onclickEngagement2 = document.getElementById("extraCurrHigh-intExp");
    clickPleaseSpecify(
      "extraCurrHigh-intExp-label",
      onclickEngagement2,
      "intExp-durhigh-ba-type",
      "submit-high-ba-extracurr"
    );
    // Volunteering
    const onclickEngagement3 = document.getElementById("extraCurrHigh-volunt");
    clickPleaseSpecify(
      "extraCurrHigh-volunt-label",
      onclickEngagement3,
      "volunt-durhigh-ba-type",
      "submit-high-ba-extracurr"
    );
    // end adding to form on click///////////////////////////////////
    highschoolExtraForm.addEventListener("submit", function (e) {
      e.preventDefault();
      //check and save data out of input fields
      VariableSaveTransfer.HighschoolInternshiptype = saveData(
        "work-durhigh-ba-type"
      );
      //check and save data out of input fields
      VariableSaveTransfer.HighschoolInternationaltype = saveData(
        "intExp-durhigh-ba-type"
      );
      //check and save data out of input fields
      VariableSaveTransfer.HighschoolVolunteeringtype = saveData(
        "volunt-durhigh-ba-type"
      );
      modalfirst.innerHTML = bachelorAdmitted(
        "high-bachelor-admitted-form",
        "high-submit-Ba-admitted",
        1,
        "thumbs-1",
        "thumbs-2"
      );
      // toggle Icons for Admitted/notAdmitted
      itemToggler(".icon-admit");
      console.log(VariableSaveTransfer);
      // third stage of highschool input
      const bachelorAdmittedForm = document.getElementById(
        "high-bachelor-admitted-form"
      );
      //first university and subject field to be required
      document.getElementById("programm-admitted-uni").required = true;
      document.getElementById("programm-admitted-subject").required = true;
      //variables for buttons to create eventlistener
      let uni1 = document.getElementById("programm-admitted-uni");
      let uni2 = document.getElementById("programm-admitted-uni-2");
      let sub1 = document.getElementById("programm-admitted-subject");
      let sub2 = document.getElementById("programm-admitted-subject-2");
      //Autocomplete für Textfelder
      uni1.addEventListener("focus", function () {
        init("programm-admitted-uni", "high-submit-Ba-admitted");
      });
      //Autocomplete für Textfelder
      uni2.addEventListener("focus", function () {
        init("programm-admitted-uni-2", "high-submit-Ba-admitted");
      });
      // activate Autocomplete Subject
      sub1.addEventListener("focus", function () {
        init("programm-admitted-subject", "high-submit-Ba-admitted");
      });
      // activate Autocomplete Subject
      sub2.addEventListener("focus", function () {
        init("programm-admitted-subject-2", "high-submit-Ba-admitted");
      });
      // add additional university
      clickAddUniAdmitted(
        bachelorAdmittedForm,
        "high-submit-Ba-admitted",
        "addnew-Uniadmit-1",
        "thumbs-3",
        "thumbs-4"
      );
      // heading extra curr highschool
      insertHeading(
        "Share your Bachelor applications. Please specify if you got admitted or rejected."
      );
      // progress bachelor admitted
      insertProgress("66%");
      // end add additional university
      bachelorAdmittedForm.addEventListener("submit", function () {
        e.preventDefault();
        VariableSaveTransfer.level = "Bachelor";
        //check university input field
        checkuniversitydata(
          "programm-admitted-uni",
          "programm-admitted-subject",
          "subject-specification",
          "thumbs-1",
          VariableSaveTransfer
        );
        //save database
        savedatabase(VariableSaveTransfer);
        //check university input field
        checkuniversitydata(
          "programm-admitted-uni-2",
          "programm-admitted-subject-2",
          "subject-specification-2",
          "thumbs-2",
          VariableSaveTransfer
        );
        //save database
        savedatabase(VariableSaveTransfer);
        //check university input field
        checkuniversitydata(
          "programm-admitted-uni-3",
          "programm-admitted-subject-3",
          "subject-specification-3",
          "thumbs-3",
          VariableSaveTransfer
        );

        //save database, set variables for data in Bachelor's degree to zero cause highschool-student
        savedatabase(VariableSaveTransfer);
        //check university input field
        checkuniversitydata(
          "programm-admitted-uni-4",
          "programm-admitted-subject-4",
          "subject-specification-4",
          "thumbs-4",
          VariableSaveTransfer
        );

        modalfirst.innerHTML = thankYou();
        //save database, set variables for data in Bachelor's degree to zero cause highschool-student
        savedatabase(VariableSaveTransfer);
        // go to database.html after 0,5 s
        toUni();
      });
    });
  } else {
    // FIrst stage of input (pre BA)
    modalfirst.innerHTML = highschoolExtraCurr(
      "preBachelor-nowMaster-form",
      "preBachelor-nowMaster-submit"
    );
    // heading extra curr highschool
    insertHeading("Please tell us about your Highschool Extracurriculars");
    // progress extra curr highschool
    insertProgress("20%");
    // second stage of input (durBA)
    const bachelorExtraForm = document.getElementById(
      "preBachelor-nowMaster-form"
    );
    // adding to form on click///////////////////////////////
    // Internship
    const onclickEngagement = document.getElementById("extraCurrHigh-work");
    clickPleaseSpecify(
      "extraCurrHigh-work-label",
      onclickEngagement,
      "work-durhigh-ma-type",
      "preBachelor-nowMaster-submit"
    );
    // International Experience
    const onclickEngagement2 = document.getElementById("extraCurrHigh-intExp");
    clickPleaseSpecify(
      "extraCurrHigh-intExp-label",
      onclickEngagement2,
      "intExp-durhigh-ma-type",
      "preBachelor-nowMaster-submit"
    );
    // Volunteering
    const onclickEngagement3 = document.getElementById("extraCurrHigh-volunt");
    clickPleaseSpecify(
      "extraCurrHigh-volunt-label",
      onclickEngagement3,
      "volunt-durhigh-ma-type",
      "preBachelor-nowMaster-submit"
    );
    // end adding to form on click///////////////////////////////
    bachelorExtraForm.addEventListener("submit", function (e) {
      e.preventDefault();
      //check and save data out of input fields
      VariableSaveTransfer.HighschoolInternshiptype = saveData(
        "work-durhigh-ma-type"
      );
      //check and save data out of input fields
      VariableSaveTransfer.HighschoolInternationaltype = saveData(
        "intExp-durhigh-ma-type"
      );
      //check and save data out of input fields
      VariableSaveTransfer.HighschoolVolunteeringtype = saveData(
        "volunt-durhigh-ma-type"
      );
      modalfirst.innerHTML = bachelorExtraCurr(
        "durBachelor-nowMaster-form",
        "durBachelor-nowMaster-submit"
      );
      // heading extra curr bachelor
      insertHeading("Please tell us about your Bachelor Extracurriculars");
      // progress extra curr bachelor
      insertProgress("40%");
      // change Grading scala
      changeGrading("GPA-Bachelor", "durBachelor-nowMaster-form");
      const durBachelorExtraForm = document.getElementById(
        "durBachelor-nowMaster-form"
      );
      // adding to form on click "during Bachelor"/////////////////////
      // Internship
      const onclickEngagement4 = document.getElementById("extraCurrBa-work");
      clickPleaseSpecify(
        "extraCurrHigh-work-label",
        onclickEngagement4,
        "work-durBa-ma-type",
        "durBachelor-nowMaster-submit"
      );
      // International Exp
      const onclickEngagement5 = document.getElementById("extraCurrBa-intExp");
      clickPleaseSpecify(
        "extraCurrHigh-intExp-label",
        onclickEngagement5,
        "intExp-durBa-ma-type",
        "durBachelor-nowMaster-submit"
      );
      // Volunteering
      const onclickEngagement6 = document.getElementById("extraCurrBa-volunt");
      clickPleaseSpecify(
        "extraCurrHigh-volunt-label",
        onclickEngagement6,
        "volunt-durBa-ma-type",
        "durBachelor-nowMaster-submit"
      );
      //variables for current study university + subject
      let currentuni = document.getElementById("current-study-uni-ba");
      let currentsubject = document.getElementById("current-study-subject-ba");
      //Autocomplete für Textfelder
      currentuni.addEventListener("focus", function () {
        init("current-study-uni-ba", "durBachelor-nowMaster-submit");
      });
      currentsubject.addEventListener("focus", function () {
        init("current-study-subject-ba", "durBachelor-nowMaster-submit");
      });
      //first university and subject field to be required
      document.getElementById("current-study-uni-ba").required = true;
      document.getElementById("current-study-subject-ba").required = true;
      document.getElementById("grading-scala").required = true;
      // End adding to form on click "during Bachelor" ///////////////
      // third stage of input (BA admit)
      durBachelorExtraForm.addEventListener("submit", function (e) {
        e.preventDefault();
        //check and save data out of input fields
        VariableSaveTransfer.BachelorUniversity = saveData(
          "current-study-uni-ba"
        );
        VariableSaveTransfer.BachelorSubject = saveData(
          "current-study-subject-ba"
        );
        VariableSaveTransfer.PublishOkay = document.getElementById(
          "allow-show-data-uni"
        ).checked;
        //check and save data out of input fields
        VariableSaveTransfer.BachelorGPA = saveData("GPA-Bachelor");
        VariableSaveTransfer.BachelorScale = document.getElementById(
          "grading-scala"
        ).value;
        VariableSaveTransfer.Bachelorpercent = document.getElementById(
          "GPA-Bachelor-percent"
        ).value;
        //check if data was contributed in radio button tests and save it
        if (document.querySelector('input[name="tests"]:checked') != null) {
          VariableSaveTransfer.Test = document.querySelector(
            'input[name="tests"]:checked'
          ).value;
        } else {
          VariableSaveTransfer.Test = "0";
        }
        //check if data was contributed for variable and save it
        VariableSaveTransfer.TestScore = saveData("testscore");
        //check and save data out of input fields
        VariableSaveTransfer.BachelorInternshiptype = saveData(
          "work-durBa-ma-type"
        );
        //check and save data out of input fields
        VariableSaveTransfer.BachelorInternationaltype = saveData(
          "intExp-durBa-ma-type"
        );
        //check and save data out of input fields
        VariableSaveTransfer.BachelorVolunteeringtype = saveData(
          "volunt-durBa-ma-type"
        );
        console.log(VariableSaveTransfer);
        modalfirst.innerHTML = bachelorAdmitted(
          "master-bachelor-admitted-form",
          "master-submit-Ba-admitted",
          1,
          "thumbs-1",
          "thumbs-2"
        );
        // heading extra curr highschool
        insertHeading(
          "Share your Bachelor applications. Please specify if you got admitted or rejected."
        );
        // progress bachelor admitted
        insertProgress("60%");
        // toggle Icons for Admitted/notAdmitted
        itemToggler(".icon-admit");
        // fourth stage (MA admit)
        const bachelorAdmittedForm = document.getElementById(
          "master-bachelor-admitted-form"
        );
        //first university and subject field to be required
        document.getElementById("programm-admitted-uni").value =
          VariableSaveTransfer.BachelorUniversity;
        document.getElementById("programm-admitted-subject").value =
          VariableSaveTransfer.BachelorSubject;
        //variables for buttons to create eventlistener
        let uni1 = document.getElementById("programm-admitted-uni");
        let uni2 = document.getElementById("programm-admitted-uni-2");
        let sub1 = document.getElementById("programm-admitted-subject");
        let sub2 = document.getElementById("programm-admitted-subject-2");
        //Autocomplete für Textfelder
        uni1.addEventListener("focus", function () {
          init("programm-admitted-uni", "master-submit-Ba-admitted");
        });
        //Autocomplete für Textfelder
        uni2.addEventListener("focus", function () {
          init("programm-admitted-uni-2", "master-submit-Ba-admitted");
        });
        // activate Autocomplete Subject
        sub1.addEventListener("focus", function () {
          init("programm-admitted-subject", "master-submit-Ba-admitted");
        });
        // activate Autocomplete Subject
        sub2.addEventListener("focus", function () {
          init("programm-admitted-subject-2", "master-submit-Ba-admitted");
        });
        // add additional university
        clickAddUniAdmitted(
          bachelorAdmittedForm,
          "master-submit-Ba-admitted",
          "addnew-Uniadmit-1",
          "thumbs-3",
          "thumbs-4"
        );
        // end add additional university
        bachelorAdmittedForm.addEventListener("submit", function (e) {
          e.preventDefault();
          VariableSaveTransfer.level = "Bachelor";
          //check university input field
          checkuniversitydata(
            "programm-admitted-uni",
            "programm-admitted-subject",
            "subject-specification",
            "thumbs-1",
            VariableSaveTransfer
          );
          //data transfer
          savedatabase(VariableSaveTransfer);
          //check university input field
          checkuniversitydata(
            "programm-admitted-uni-",
            "programm-admitted-subject-2",
            "subject-specification-2",
            "thumbs-2",
            VariableSaveTransfer
          );
          //data transfer
          savedatabase(VariableSaveTransfer);
          //check university input field
          checkuniversitydata(
            "programm-admitted-uni-3",
            "programm-admitted-subject-3",
            "subject-specification-3",
            "thumbs-3",
            VariableSaveTransfer
          );

          //data transfer
          savedatabase(VariableSaveTransfer);
          //check university input field
          checkuniversitydata(
            "programm-admitted-uni-4",
            "programm-admitted-subject-4",
            "subject-specification-4",
            "thumbs-4",
            VariableSaveTransfer
          );
          console.log(VariableSaveTransfer);
          //data transfer
          savedatabase(VariableSaveTransfer);
          modalfirst.innerHTML = bachelorAdmitted(
            "master-master-admitted-form",
            "master-submit-Ma-admitted",
            2,
            "mthumbs-1",
            "mthumbs-2"
          );
          // heading extra curr highschool
          insertHeading(
            "Share your Master applications. Please specify if you got admitted or rejected."
          );
          // progress master admitted
          insertProgress("80%");
          // toggle Icons for Admitted/notAdmitted
          itemToggler(".icon-admit");
          // fifth input (thank you)
          const masterAdmittedForm = document.getElementById(
            "master-master-admitted-form"
          );
          //first university and subject field to be required
          document.getElementById("programm-admitted-uni").required = true;
          document.getElementById("programm-admitted-subject").required = true;
          //variables for buttons to create eventlistener
          let uni1 = document.getElementById("programm-admitted-uni");
          let uni2 = document.getElementById("programm-admitted-uni-2");
          let sub1 = document.getElementById("programm-admitted-subject");
          let sub2 = document.getElementById("programm-admitted-subject-2");
          //Autocomplete für Textfelder
          uni1.addEventListener("focus", function () {
            init("programm-admitted-uni", "master-submit-Ma-admitted");
          });
          //Autocomplete für Textfelder
          uni2.addEventListener("focus", function () {
            init("programm-admitted-uni-2", "master-submit-Ma-admitted");
          });
          // activate Autocomplete Subject
          sub1.addEventListener("focus", function () {
            init("programm-admitted-subject", "master-submit-Ma-admitted");
          });
          // activate Autocomplete Subject
          sub2.addEventListener("focus", function () {
            init("programm-admitted-subject-2", "master-submit-Ma-admitted");
          });
          // add additional university
          clickAddUniAdmitted(
            masterAdmittedForm,
            "master-submit-Ma-admitted",
            "addnew-Uniadmit-2",
            "mthumbs-3",
            "mthumbs-4"
          );
          // end add additional university
          masterAdmittedForm.addEventListener("submit", function (e) {
            e.preventDefault();
            VariableSaveTransfer.level = "Master";
            //check university input field
            checkuniversitydata(
              "programm-admitted-uni",
              "programm-admitted-subject",
              "subject-specification",
              "mthumbs-1",
              VariableSaveTransfer
            );
            //data transfer
            savedatabase(VariableSaveTransfer);
            //check university input field
            checkuniversitydata(
              "programm-admitted-uni-2",
              "programm-admitted-subject-2",
              "subject-specification-2",
              "mthumbs-2",
              VariableSaveTransfer
            );
            //data transfer
            savedatabase(VariableSaveTransfer);
            //check university input field
            checkuniversitydata(
              "programm-admitted-uni-3",
              "programm-admitted-subject-3",
              "subject-specification-3",
              "mthumbs-3",
              VariableSaveTransfer
            );
            //data transfer
            savedatabase(VariableSaveTransfer);
            //check university input field
            checkuniversitydata(
              "programm-admitted-uni-4",
              "programm-admitted-subject-4",
              "subject-specification-4",
              "mthumbs-4",
              VariableSaveTransfer
            );
            //data transfer
            savedatabase(VariableSaveTransfer);
            modalfirst.innerHTML = thankYou();
            // go to database.html after 0,5 s
            toUni();
          });
          //
        });
        //
      });
      //
    });
  }
});

// ######################Display Functions#############################
function highschoolExtraCurr(idForm, idSubmit) {
  return `<div class="first-quest">
            <p>What did you do/participate during High School?</p>
      <form action="" id=${idForm}>
        <label id="extraCurrHigh-work-label"
          ><input
            type="checkbox"
            name="extraCurr"
            id="extraCurrHigh-work"
            class="checkbox"
          />Working Experience / Internship</label
        >
        <br />
        <label id="extraCurrHigh-intExp-label"
          ><input
            type="checkbox"
            name="extraCurr"
            id="extraCurrHigh-intExp"
            class="checkbox"
          />International Experience</label
        >
        <br />
        <label id="extraCurrHigh-volunt-label"
          ><input
            type="checkbox"
            name="extraCurr"
            id="extraCurrHigh-volunt"
            class="checkbox"
          />Volunteering / Activities</label
        >
        <br />
         <input
          class="btn hero-btn contr-btn"
          type="submit"
          value="Next"
          id=${idSubmit}
        />
      </form>
    </div>`;
}
function bachelorExtraCurr(idForm, idSubmit) {
  return `<div class="first-quest">
     
      <form action="" id=${idForm} autocomplete="off">
        <label for="programm-admitted-uni">At my Bachelor school*</label>
        <br />
        <span class="autocomplete"> 
        <input name="programm-admitted-uni" id="current-study-uni-ba" class="input-form input-contribute" type="text" placeholder="University" />
        </span>
        <br/>
        <!-- subject --> 
        <label for="programm-admitted-subject">In the subject*</label>
        <br />
        <span class="autocomplete"> 
        <input id="current-study-subject-ba" name="programm-admitted-subject" class="input-form input-contribute" type="text" placeholder="Subject" value=""/>
        </span>
        <div>
        <label for="allow-show-data-uni" id="allow-show-data-uni-label"> Are we allowed to show this to our community as further information to the Master's application.</label>
        <input type="checkbox" name="allow-show-data-uni" id="allow-show-data-uni" class="checkbox" checked/>
        </div>
        <br />
        <label for="grading-scala">My Bachelor grade was/is*</label>
        <br />
        <select id="grading-scala" class="dropdown input-contribute" name="grading-scala">
          <option value="" disabled selected>Select Grading System</option>
          <option value="Germany(4.0-1.0)">Best 1.0 - Worst 4.0</option>
          <option value="GPA(1.0-4.0)">Best 4.0 - Worst 1.0</option>
          <option value="UK(Fail-First)">First - Fail</option>
          <option value="Netherlands(0-10)">10 - 0</option>
          <option value="Percentage(0-100%)">100% - 0%</option>
          <option value="Grading-Letters(F-A+)">A+ - F</option>
          <option value="Italy(0-30)">30 - 0</option>
        </select>
            <input
              placeholder="Grade"
              class="input-form input-contribute grade-contribute"
              name="GPA-high"
              id="GPA-Bachelor"
              type="number"
              min="1"
              max="4"
              step=".1"
            />
            <br />
            <label for="GPA-high-percent" class="text-contribute">which ranked me</label>
            <br />
            <select id="GPA-Bachelor-percent" class="dropdown input-contribute" name="GPA-high-percent">
              <option value="10%">Top 10%</option>
              <option value="25%">Top 25%</option>
              <option value="50%">Top 50%</option>
              <option value="100%">Top 100%</option>
              <option value="Not sure.">Not sure.</option>
            </select>
            <br />
            <label for="GMAT" class="text-contribute"> I have taken</label
                ><br />
                <input type="radio" id="GMAT" name="tests" value="GMAT" />
                <label for="GMAT">GMAT</label>
                <input
                  type="radio"
                  id="GRE(Quant)"
                  name="tests"
                  value="GRE(Quant)"
                />
                <label for="GRE(Quant)">GRE(Quant)</label>
                <input type="radio" id="SAT" name="tests" value="SAT" />
                <label for="SAT">SAT</label>&nbsp
                <input type="radio" id="None" name="tests" value="None" />
                <label for="None">None</label>&nbsp
                <input
                  placeholder="Points"
                  min="0"
                  id="testscore"
                  class="input-form input-contribute"
                  name="testscore"
                  type="number"
                /><br />
                <br/>
            <p class="text-contribute">What did you do/participate in during your Bachelor?</p>
            <br />
        <label id="extraCurrHigh-work-label"
          ><input
            type="checkbox"
            name="extraCurr"
            id="extraCurrBa-work"
            class="checkbox"
          />Working Experience / Internship</label
        >
        <br />
        <label id="extraCurrHigh-intExp-label"
          ><input
            type="checkbox"
            name="extraCurr"
            id="extraCurrBa-intExp"
            class="checkbox"
          />International Experience</label
        >
        <br />
        <label id="extraCurrHigh-volunt-label"
          ><input
            type="checkbox"
            name="extraCurr"
            id="extraCurrBa-volunt"
            class="checkbox"
          />Volunteering / Activities</label
        >
        <br />
        <input
          class="btn hero-btn contr-btn"
          type="submit"
          value="Next"
          id=${idSubmit}
        />
        <p id="info_mandatory2">
        Fields marked with * are mandatory.
      </p>
      </form>
    </div>`;
}
function bachelorAdmitted(idForm, idSubmit, idNumber, idthumbs1, idthumbs2) {
  return `<div class="first-quest">
      <form action="" autocomplete="off" id=${idForm}> 
     
      <!-- 1. Application -->
        <!-- Uni -->
        <label for="programm-admitted-uni">At the school*</label>
        <br />
        <span class="autocomplete"> 
        <input name="programm-admitted-uni" id="programm-admitted-uni" class="input-form input-contribute" type="text" placeholder="University" />
        </span>
        <br />
        <!-- subject --> 
        <label for="programm-admitted-subject">In the subject*</label>
        <br />
        <span class="autocomplete"> 
        <input id="programm-admitted-subject" name="programm-admitted-subject" class="input-form input-contribute" type="text" placeholder="e.g. Economics" value=""/>
        </span>
        <br />
        <!-- possible name of program --> 
         <span> 
        <input id="subject-specification" name="subject-specification" class="input-form input-contribute" type="text" placeholder="e.g. M.Sc. Finance and Economics" />
        </span>
        <br />
        <!-- Admitted yes/no -->
        <p style="display:inline"> Admitted / Rejected?</p>
       <i class="fas fa-thumbs-up icon-admit" id=${idthumbs1}></i>
       <br /> 
       <br />

        <!-- 2. Application -->
        <!-- Uni -->
        <label for="programm-admitted-uni" class="text-contribute">At the school</label>
        <br />
        <span class="autocomplete"> 
        <input id="programm-admitted-uni-2" name="programm-admitted-uni-2" class="input-form input-contribute" type="text" placeholder="University" value=""/>
        </span>
        <br />
        <!-- subject -->
        <label for="programm-admitted-subject">In the subject</label>
        <br />
        <span class="autocomplete"> 
        <input id="programm-admitted-subject-2" name="programm-admitted-subject-2" class="input-form input-contribute" type="text" placeholder="e.g. Economics" value=""/>
        </span>
        <br />
        <!-- possible name of program --> 
                <span> 
        <input id="subject-specification-2" name="subject-specification-2" class="input-form input-contribute" type="text" placeholder="e.g. M.Sc. Finance and Economics" />
        </span>
        <br />
        <!-- Admitted yes/no -->
        <p style="display:inline"> Admitted / Rejected?</p>
       <i class="fas fa-thumbs-up icon-admit" id=${idthumbs2}></i>
       <br /> 
       <br />
       
        <i class="fas fa-plus-square" id="addnew-Uniadmit-${idNumber}"></i>
        <br />
        <br />

        <input
        type="checkbox"
        class="checkbox"
        id="contribute-checkbox"
        name="contribute-checkbox"
        />
        <label for="contribute-checkbox">I assure that the information provided is true and agree to the <a href="terms-and-conditions.html">Terms and Conditions</a>.
        I have taken note of the <a href="Data-Protection-Declaration.html"
        >Data Protection Declaration</a>.*</label>

        <input
          type="submit"
          class="btn hero-btn contr-btn"
          value="Share"
          id=${idSubmit}
        />
        <p id="info_mandatory3">
                  Fields marked with * are mandatory.
                </p>
      </form>
    </div>`;
}
function thankYou() {
  return `<h3 id="thankyou">THANK YOU!</h3>
    <h3>
    </h3>`;
}
// gives you specification for Engagement
function pleaseSpecify(inputIdType) {
  return `<p class="please_specify">Please Specify</p>
         <input type="text" class="input-form input-contribute" name="extraCurr-type" id=${inputIdType} />`;
}
// function for creating "please specify" on click
function clickPleaseSpecify(idLabelAdd, clickBox, idSpecType, idButton) {
  clickBox.addEventListener("click", function () {
    let helpInput = document.createElement("div");
    helpInput.classList.add("testclass");
    if (clickBox.checked) {
      // pleaseSpecify creates Html COde for Form
      helpInput.innerHTML = pleaseSpecify(idSpecType);
      // insert before button element
      let button = document.getElementById(idButton);
      // formToAdd.insertBefore(helpInput, button);
      const testomat = document.getElementById(idLabelAdd);
      // clickBox.insertAdjacentElement("afterend", helpInput);
      testomat.insertAdjacentElement("afterend", helpInput);
    } else {
      // formToAdd.lastChild.previousSibling.previousSibling.remove();
      let removeDiv = document.getElementById(idSpecType);
      removeDiv.parentElement.remove();
    }
  });
}
// click to get additional University admitted/not admitted
function addUniAdmitted(idthumbs3, idthumbs4) {
  return `<!-- 3. Application -->
        <!-- Uni -->
        <label for="programm-admitted-uni">At the school</label>
        <br />
        <span class="autocomplete">
        <input name="programm-admitted-uni" id="programm-admitted-uni-3" class="input-form input-contribute" type="text" placeholder="University" value="" />
        </span> 
        <br />
        <!-- subject -->
        <label for="programm-admitted-subject">In the subject</label>
        <br />
        <span class="autocomplete">
        <input id="programm-admitted-subject-3" name="programm-admitted-subject-3" class="input-form input-contribute" type="text" placeholder="e.g. Economics" value="" />
        </span> 
        <br />
        <!-- possible name of program --> 
         <span> 
        <input id="subject-specification-3" name="subject-specification-3" class="input-form input-contribute" type="text" placeholder="e.g. M.Sc. Finance and Economics" />
        </span>
        <br />
        <!-- Admitted yes/no -->
        <p style="display:inline"> Admitted / Rejected?</p>
       <i class="fas fa-thumbs-up icon-admit1" id=${idthumbs3}></i>
       <br /> 
       <br />

        <!-- 4. Application -->
        <!-- Uni -->
        <label for="programm-admitted-uni" class="text-contribute">At the school</label>
        <br />
        <span class="autocomplete">
        <input name="programm-admitted-uni-4" id="programm-admitted-uni-4" class="input-form input-contribute" type="text" placeholder="University" value=""/>
        </span> 
        <br />
        <!-- subject -->
        <label for="programm-admitted-subject">In the subject</label>
        <br />
        <span class="autocomplete">
        <input id="programm-admitted-subject-4" name="programm-admitted-subject-4" class="input-form input-contribute" type="text" placeholder="e.g. Economics" value="" />
        </span> 
        <br />
        <!-- possible name of program --> 
        <span> 

        <input id="subject-specification-4" name="subject-specification-4" class="input-form input-contribute" type="text" placeholder="e.g. M.Sc. Finance and Economics" />
        </span>
        <br />
        <!-- Admitted yes/no -->
        <p style="display:inline"> Admitted / Rejected?</p>
       <i class="fas fa-thumbs-up icon-admit1" id=${idthumbs4}></i>`;
}
// Icon thumbs up/down toggler
function itemToggler(classtoggle) {
  const iconAdmitted = document.querySelectorAll(classtoggle);
  iconAdmitted.forEach(function (icon) {
    icon.addEventListener("click", function () {
      icon.classList.toggle("fa-thumbs-down");
      icon.classList.toggle("fa-thumbs-up");
    });
  });
}
function clickAddUniAdmitted(
  formToAdd,
  idButton,
  idPlusSign,
  idthumbs3,
  idthumbs4
) {
  let helpInput = document.createElement("div");
  let plusSign = document.getElementById(idPlusSign);
  plusSign.addEventListener("click", function () {
    let button = document.getElementById(idButton);
    helpInput.innerHTML = addUniAdmitted(idthumbs3, idthumbs4);
    formToAdd.insertBefore(helpInput, button);
    //variables for buttons to create eventlistener
    let uni3 = document.getElementById("programm-admitted-uni-3");
    let uni4 = document.getElementById("programm-admitted-uni-4");
    let sub3 = document.getElementById("programm-admitted-subject-3");
    let sub4 = document.getElementById("programm-admitted-subject-4");
    //Autocomplete für Textfelder
    uni3.addEventListener("focus", function () {
      init("programm-admitted-uni-3", idButton);
    });
    //Autocomplete für Textfelder
    uni4.addEventListener("focus", function () {
      init("programm-admitted-uni-4", idButton);
    });
    // activate Autocomplete Subject
    sub3.addEventListener("focus", function () {
      init("programm-admitted-subject-3", idButton);
    });
    // activate Autocomplete Subject
    sub4.addEventListener("focus", function () {
      init("programm-admitted-subject-4", idButton);
    });
    itemToggler(".icon-admit1");
  });
}
//Autocomplete function with two arguments: text field element dn array of values
function autocomplete(inp, arr, idButton) {
  //enable button
  document.getElementById(idButton).disabled = false;
  //reset input button border to black
  inp.className = "input-form input-contribute";
  //help variable to switch between automplete values
  let currentFocus;
  //reset button value
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
          document.getElementById(idButton).disabled = "disabled";
          //set input button border to red
          inp.className = "input-form input-contribute-disabled";
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
          //set validation to true
          document.getElementById(idButton).disabled = false;
          //insert autocomplete value
          inp.value = this.getElementsByTagName("input")[0].value;
          //reset input button border to black
          inp.className = "input-form input-contribute";
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

// /////////Function add heading to frame//////////////////
function insertHeading(headingString) {
  const questFrame = document.querySelector(".first-quest");
  let headingDiv = document.createElement("div");
  headingDiv.innerHTML =
    `<h3 class="heading-contr">` + headingString + `</h3><br/>`;
  questFrame.insertAdjacentElement("afterbegin", headingDiv);
}
//////// Function add progressbar to frame/////////////////
function insertProgress(progress) {
  const questFrame = document.querySelector(".first-quest");
  let element = document.createElement("div");
  element.classList.add("progressbar");
  element.innerHTML = `<div class="progress" style="width: ${progress};"><p class="progress-percentage">${progress}</p></div>`;
  questFrame.insertAdjacentElement("beforebegin", element);
}
//
// Function dealing with correct choices for grading scala
// works only once (fix is down at "if else with idx" problem see console)
function changeGrading(idGPAInput, idForm) {
  let idx = 0;
  const gradingScala = document.getElementById("grading-scala");
  let entireForm = document.getElementById(idForm);
  // differ between chosen grading scala
  const actInputGrade = document.getElementById(idGPAInput);
  gradingScala.addEventListener("change", function () {
    let element = document.createElement("span");

    switch (gradingScala.value) {
      case "Germany(4.0-1.0)":
        element.innerHTML = `<input

              class="input-form input-contribute grade-contribute" 
              placeholder="Grade"
              name="GPA-high"
              id=${idGPAInput}
              type="number"
              min="1"
              max="4"
              step=".1"
              required
              />`;

        break;
      case "GPA(1.0-4.0)":
        element.innerHTML = `<input
              class="input-form input-contribute grade-contribute"
              placeholder="Grade"
              name="GPA-high"
              id=${idGPAInput}
              type="number"
              min="1"
              max="4"
              step=".1"
              required
              />`;
        break;
      case "UK(Fail-First)":
        element.innerHTML = `<select id=${idGPAInput} class="dropdown input-contribute grade-contribute" name="GPA-Bachelor" placeholder="Grade">
      <option value="First">First</option>
      <option value="Upper Second">Upper Second</option>
      <option value="Lower Second">Lower Second</option>
      <option value="Third">Third</option>
      <option value="Pass">Pass</option>
      <option value="Fail">Fail</option>
    </select>`;
        break;
      case "Netherlands(0-10)":
        element.innerHTML = `<input
          class="input-form input-contribute grade-contribute"
          placeholder="Grade"
          name="GPA-high"
          id=${idGPAInput}
          type="number"
          min="0"
          max="10"
          step="0.5"
          required
          />`;
        break;
      case "Percentage(0-100%)":
        element.innerHTML = `<input
          class="input-form input-contribute grade-contribute"
          placeholder="Grade"
          name="GPA-high"
          id=${idGPAInput}
          type="number"
          min="0"
          max="100"
          step="1"
          required
          />`;
        break;
      case "Grading-Letters(F-A+)":
        element.innerHTML = `<select id=${idGPAInput} class="dropdown input-contribute grade-contribute" name="GPA-Bachelor" placeholder="Grade">
      <option value="A+">A+</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="E">E</option>
      <option value="F">F</option>
    </select>`;
        break;
      case "Italy(0-30)":
        element.innerHTML = `<input
          class="input-form input-contribute grade-contribute"
          placeholder="Grade"
          name="GPA-high"
          id=${idGPAInput}
          type="number"
          min="0"
          max="30"
          step="1"
          required
          />`;
        break;
    }
    console.log(document.getElementById(idGPAInput));
    console.log(element);
    console.log(actInputGrade);
    // remove existing number input & insert element
    if (!idx) {
      idx++;
      entireForm.insertBefore(element, actInputGrade);
      actInputGrade.remove();
    } else {
      // soll eig lösen dass zweimal nutzbar
      const actInputGrade2 = document.getElementById(idGPAInput);
      entireForm.insertBefore(element, actInputGrade2);
      actInputGrade2.remove();
    }
  });
}
//function save data into database, call function for each subject after saving data into variablesavetransfer
function savedatabase(data) {
  //check if there is an input in university input field and just put data into database if there is
  if (data.where != 0) {
    firebase.firestore().collection("universities").add({
      Country: data.country,
      Status: data.status,
      HighschoolGPA: data.HighschoolGPA,
      HighschoolScale: data.HighschoolScale,
      Test: data.Test,
      TestScore: data.TestScore,
      HInternshiptype: data.HighschoolInternshiptype,
      HInternationaltype: data.HighschoolInternationaltype,
      HVolunteeringtype: data.HighschoolVolunteeringtype,
      BachelorUniversity: data.BachelorUniversity,
      BachelorSubject: data.BachelorSubject,
      PublishOkay: data.PublishOkay,
      BachelorGPA: data.BachelorGPA,
      BachelorScale: data.BachelorScale,
      BPercent: data.Bachelorpercent,
      BInternshiptype: data.BachelorInternshiptype,
      BInternationaltype: data.BachelorInternationaltype,
      BVolunteeringtype: data.BachelorVolunteeringtype,
      Level: data.level,
      Decisionwhere: data.where,
      Decisionsubject: data.subject,
      Decisionsubjectspec: data.subjectspecification,
      Decision: data.Decision,
      Rand1: "4387372082231332388733806495239901444332746126643305864164850450947350098742327567353600860660692796",
    });
  }
}
//save data in VariableSaveTransfer if there is some, otherwise set value to 0
function saveData(input) {
  let data;
  if (document.getElementById(input) !== null) {
    data = document.getElementById(input).value;
  } else {
    data = "0";
  }
  return data;
}

//get data if person is admitted, check if there is information, otherwise set value to 0
//if person admitted value will be set to 1, otherwise to -1
function checkuniversitydata(uni, subject, subjectspec, thumbs, data) {
  //check if input field is generated
  if (document.getElementById(uni) !== null) {
    //check if input field is filled with a university name
    if (document.getElementById(uni).value != "") {
      data.where = document.getElementById(uni).value;
      data.subject = document.getElementById(subject).value;
      data.subjectspecification = document.getElementById(subjectspec).value;
      if (
        document.getElementById(thumbs).className ==
        "fas icon-admit fa-thumbs-down"
      ) {
        data.Decision = "-1";
      } else {
        data.Decision = "1";
      }
    } else {
      data.where = "0";
      data.subject = "0";
      data.subjectspecification = "0";
      data.Decision = "0";
    }
  } else {
    data.where = "0";
    data.subject = "0";
    data.subjectspecification = "0";
    data.Decision = "0";
  }
}
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
//function call will always be made when input fields are available
function init(idInput, idButton) {
  loadJSON(function (response) {
    // Parse JSON string into object
    let actual_JSON = JSON.parse(response);
    console.log(actual_JSON);
    switch (idInput) {
      case "programm-admitted-subject":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].subject,
          idButton
        );
        break;
      case "programm-admitted-uni":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].universities,
          idButton
        );
        break;
      case "country-cur":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].country,
          idButton
        );
        break;
      case "programm-admitted-subject-2":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].subject,
          idButton
        );
        break;
      case "programm-admitted-uni-2":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].universities,
          idButton
        );
        break;
      case "programm-admitted-subject-3":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].subject,
          idButton
        );
        break;
      case "programm-admitted-uni-3":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].universities,
          idButton
        );
        break;
      case "programm-admitted-subject-4":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].subject,
          idButton
        );
        break;
      case "programm-admitted-uni-4":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].universities,
          idButton
        );
        break;
      case "current-study-uni-ba":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].universities,
          idButton
        );
        break;
      case "current-study-subject-ba":
        autocomplete(
          document.getElementById(idInput),
          actual_JSON[0].subject,
          idButton
        );
        break;
    }
  });
}
// go to Uni Page
function toUni() {
  // go to database.html after 0,5 s
  window.setTimeout(function () {
    // Move to a new location or you can do something else
    window.location = "database.html";
  }, 500);
}
// #####################Old Content###########################
