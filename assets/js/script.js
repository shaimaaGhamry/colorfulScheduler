var currentDateElement = $("#currentDay");

setInterval(function(){
  //1. change the displayed time
  var day = dayjs().format("dddd, MMMM DD [at] hh:mm:ss a");
  currentDateElement.text(day);

  //2. change the colors of the slots every hour
 if((dayjs().minute() == 0 ) &&  (dayjs().second() == 0)){
  
  for(var i=9; i<=17; i++){
    var currentHour = dayjs().hour();
    var containerElement = $("#hour-"+i);
    
    //remove the old class
    containerElement.removeClass("past");
    containerElement.removeClass("present");
    containerElement.removeClass("future");
    
    if(i>currentHour){
      containerElement.addClass("future");
    }else if(i == currentHour){
      containerElement.addClass("present");
    }else{
      containerElement.addClass("past");
    }    
  }
  }  
}, 1000);

init();
function init(){
  for(var i=9; i<=17; i++){//for each hours in the calendar
    var containerElement = $("#hour-" + i);

    //1.retrieve the events saved in the localstorage
    var savedEventText = localStorage.getItem("hour-"+i);
    if( savedEventText != null){
      containerElement.children("textarea").val(savedEventText);
    };

    //2. change the color of every time slot
    var currentHour = dayjs().hour();
    if(i>currentHour){
      containerElement.addClass("future");
    }else if(i == currentHour){
      containerElement.addClass("present");
    }else{
      containerElement.addClass("past")
    }
    

     //3. add eventlistener for each button
 
    var saveButton = containerElement.children("button");
    saveButton.on("click" , function(){
      handleSaveAction($(this));
    });
  }
  
}
function handleSaveAction(buttonElem){
  var hourId = buttonElem.parent().attr("id");
  var eventText = buttonElem.siblings("textarea").val();
  localStorage.setItem(hourId,eventText);
}





