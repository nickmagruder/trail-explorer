'use strict';

function hideNewUser(){
  if($(':radio:checked').val() === 'existing'){
    $('.new').hide();
    $('form').attr('action', '/home/existing');
  }else{
    $('.new').show();
    $('form').attr('action', '/home');
  }
}

$(':radio').change(hideNewUser);


