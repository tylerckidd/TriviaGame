$(document).ready(function(){
  
   
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
   
    questions: {
      q1: 'Where does the show take place?',
      q2: 'This character is always with Micheal?',
      q3: 'Who gets abandoned in the lake wearing a sumo costume?',
      q4: 'What is the name of Jims company that he starts later on in the series?',
      q5: "Who is Phyllis Married to?",
      q6: 'Who did Micheal Propose to?',
      q7: "Where is Toby moving to?",
      q8:"Where does Jim propose to Pam?",
      q9:"Where did Pam go to school?",
      q10:"Angela's favorite animal is?"
    },
    options: {
      q1: ['Pittsburg', 'Scranton', 'Columbus', 'Philadelphia'],
      q2: ['Jim', 'Ryan', 'Dwight', 'Pam'],
      q3: ['Andy', 'Dwight', 'Erin', 'Standley'],
      q4: [' Philly Sports', 'PBJ ', 'Athlead', 'Sports R Us'],
      q5: ['Roy','Bob Vance','Dwight','Val'],
      q6: ['Jan','Holly','Pam','Carol'],
      q7: ['Belize', 'Panama', 'Peru','Costa Rica'],
      q8: ['The office', 'Pams school', 'a gas station','Parking lot'],
      q9:['Philly', 'New York', 'Ohio','Pittsburg'],
      q10:['Cats', 'Dogs', 'Hamsters','None'],
    },
    answers: {
      q1: 'Scranton',
      q2: 'Dwight',
      q3: 'Andy',
      q4: 'Athlead',
      q5: 'Bob Vance',
      q6: 'Holly',
      q7: 'Costa Rica',
      q8:'Gas station',
      q9:'New York',
      q10:'Cats',
    },
    
    startGame: function(){

    
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
     
      $('#game').show();
      
    
      $('#results').html('');
      
     
      $('#timer').text(trivia.timer);
      
  
      $('#start').hide();
  
      $('#remaining-time').show();
      
     
      trivia.nextQuestion();
      
    },
  
    nextQuestion : function(){
 
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
     
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
    
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
 
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
     
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
  
    timerRunning : function(){
     
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
  
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
     
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
    
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
    
        $('#game').hide();
        
      
        $('#start').show();
      }
      
    },
   
    guessChecker : function() {
      
    
      var resultId;
      
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
     
      if($(this).text() === currentAnswer){
    
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
     
      else{
     
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Hopefully you get it next time! '+ currentAnswer +'</h3>');
      }
      
    },
   
    guessResult : function(){
      
    
      trivia.currentSet++;
      
     
      $('.option').remove();
      $('#results h3').remove();
      
    
      trivia.nextQuestion();
       
    }
  
  }