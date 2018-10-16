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
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
      $(".btn-success").on("click",handleAddClicked);
      $(".btn-default").on("click",handleCancelClick);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
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
      studentObj.studentName = $("#studentName").val();
      studentObj.studentCourse = $("#course").val();
      studentObj.studentGrade = $("#studentGrade").val();
      console.log(studentObj);
      student_array.push(studentObj);
      updateStudentList ();
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
      for(var i = 0; i < student_array.length; i++){
            var table_row = $("<tr>");
            var name_TD = $("<td>").text(student_array[i].studentName); 
            var course_TD = $("<td>").text(student_array[i].studentCourse);
            var grade_TD = $("<td>").text(student_array[i].studentGrade);
            var delete_button = $("<button>").addClass("btn btn-danger").text("Delete");
            var op_TD = $("<td>");
            op_TD.append(delete_button);
      }
      $(table_row).append(name_TD,course_TD,grade_TD,op_TD);
      $("tbody").append(table_row);
      $(".btn-danger").on("click", function () {
            var index = $(event.currentTarget).closest("tr").index();
            if(index === -1){
                  return;
            }
            student_array.splice(index,1);
            $(event.currentTarget).closest("tr").remove();
      });

}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(studentArray){
      calculateGradeAverage ();
      renderStudentOnDom();
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(studentArray){
      var totalGradeScore = 0;
      for(var index = 0; index < student_array.length; index++){
            var combinedGradeScore = parseFloat(student_array[index].studentGrade);
            totalGradeScore += combinedGradeScore;
      }
      var average = totalGradeScore/student_array.length;
      var fixedAverage = average.toFixed(2);
      renderGradeAverage (fixedAverage+"%");
      return fixedAverage;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
      $(".avgGrade").text(average);
}

// function removeStudent () {
//       var index = $(event.currentTarget).closest("tr").index();
//       student_array.splice(index,1);
// }





