/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array = [];

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
      addClickHandlersToElements ();
      loadData ();
}

function loadData () {
      var student_api_object = {
            url: "http://s-apis.learningfuze.com/sgt/get",
            method: "POST",
            data: {
                  api_key: "IluXv1RI8a",
                  // "force-failure":"request"
            },
            dataType: "json",
            success: function (response) {
                  console.log(response);
                  // if(response.error.length > 0){
                  //       var error_message = response.error.join();
                  //       $('.modal_error_message').text(error_message);
                  //       $('#errorModal').modal('show');
                  // }
                  // else{
                        student_array = response.data;
                        updateStudentList(student_array);
                        console.log(response);
                        return(response);
                  // }
            }
      };

      $.ajax(student_api_object);
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
      $("#addButton").on("click",handleAddClicked);
      $("#cancelButton").on("click",handleCancelClick);
      $("#getDataFromServerButton").on("click",handleGetDataClick);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(studentObj){
      console.log("add was clicked");
      addStudent ();
      clearAddStudentFormInputs ();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */

function handleGetDataClick () {
      var student_api_object = {
            url: "http://s-apis.learningfuze.com/sgt/get",
            method: "POST",
            data: {api_key: "IluXv1RI8a"},
            dataType: "json",
            success: function (response) {
                  console.log(response);
            }
      };

      $.ajax(student_api_object);
}

function handleCancelClick(){
      console.log("cancel was clicked");
      clearAddStudentFormInputs ();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
      var studentObj = {};
      studentObj.name = $("#studentName").val();
      studentObj.course = $("#course").val();
      studentObj.grade = $("#studentGrade").val();
      console.log(studentObj);
      student_array.push(studentObj);
      addStudentToDB (studentObj.name,studentObj.course,studentObj.grade);

      updateStudentList (student_array);
      clearAddStudentFormInputs ();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
      $("#studentName").val("");
      $("#course").val("");
      $("#studentGrade").val("");
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObject){
      var table_row = $("<tr>");
      var name_TD = $("<td>").text(studentObject.name);
      var course_TD = $("<td>").text(studentObject.course);
      var grade_TD = $("<td>").text(studentObject.grade);
      var op_TD = $("<td>");
      
      var delete_button = $("<button>",{
            text: "delete",
            "class": "btn btn-danger",
            on: {
                  click: function () {
                        table_row.remove();
                        var index = student_array.indexOf(studentObject);
                        student_array.splice(index,1);
                        deleteFromDB (studentObject.id);
                        calculateGradeAverage (student_array);
                  }
            }
      });
      op_TD.append(delete_button);

      var currentStudentRow = $(table_row).append(name_TD,course_TD,grade_TD,op_TD);
      $("tbody").append(table_row);     
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(student_array){
      $("tbody").empty();
      for(var i = 0; i < student_array.length; i++){
            renderStudentOnDom(student_array[i]);
      }
      calculateGradeAverage (student_array);
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(student_array){
      var totalGradeScore = 0;
      for(var index = 0; index < student_array.length; index++){
            var combinedGradeScore = parseFloat(student_array[index].grade);
            totalGradeScore += combinedGradeScore;
      }
      var average = totalGradeScore/student_array.length;
      if(isNaN(average)){
            average = 0;
            var fixedAverage = average.toFixed(0);
            renderGradeAverage (fixedAverage+"%");
            return fixedAverage;
      }
      else{
            var fixedAverage = average.toFixed(0);
            renderGradeAverage (fixedAverage+"%");
            return fixedAverage;
      }
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
      $(".avgGrade").text(average);
}

function addStudentToDB (name,course,grade){
      var student_api_object = {
            url: "http://s-apis.learningfuze.com/sgt/create",
            method: "POST",
            data: {
                  api_key: "IluXv1RI8a",
                  name: name,
                  course: course,
                  grade: grade,
                  // "force-failure": "server"
            },
            dataType: "json",
            success: function (response) {
                  console.log(response);
                  return(response);
            },
            error: function (response) {
                  console.log(response);
                  $('.modal_error_message').text(response.statusText);
                  $('#errorModal').modal('show');
            }
      };
      $.ajax(student_api_object);
}

function deleteFromDB (idIndex) {
      var student_api_object = {
            url: "http://s-apis.learningfuze.com/sgt/delete",
            method: "POST",
            data: {
                  api_key: "IluXv1RI8a",
                  student_id: idIndex,
                  "force-failure": "timeout"
            },
            dataType: "json",
            success: function (response) {
                  console.log(response);
                  return(response);
            },
            error: function (jqXHR,exception) {
                  console.log(jqXHR,exception);
                  var error_message = "";
                  if(exception === "timeout"){
                        error_message = "Time out error"
                  }
                  console.log(error_message);
                  // setTimeout(function(){ 
                  //       $('.modal_error_message').text("took too long to load response from database");
                  //       $('#errorModal').modal('show');}, 2000);
            }
      };
      setTimeout(function(){ 
            $('.modal_error_message').text("took too long to load response from database");
            $('#errorModal').modal('show');}, 2000);
      $.ajax(student_api_object);
      return;
}