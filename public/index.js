'use strict';

const userStatus = $('input[name=user-status');

function hideNewUser(){
  if($(':radio:checked').val() === 'existing'){
    $('.new').hide();
    $('form').attr('action', '/home/existing');
  }else{
    $('.new').show();
    $('form').attr('action', '/home');
  }
}

function usernameHidden(){
  $('#user-exists').hide();
  $('#user-not').hide();
}

function userError(){
  if(userStatus.val() === 'true'){
    $('#user-exists').show();
    $('input[value=new]').attr('checked', 'checked');
  }
  if(userStatus.val() === 'false'){
    $('#user-not').show();
    $('input[value=existing]').attr('checked', 'checked');
    $('.new').hide();
    $('form').attr('action', '/home/existing');
  }
}

usernameHidden();
$(':radio').change(hideNewUser);
$('form').ready(userError);



// $('form').find('input[name="username"]').val()