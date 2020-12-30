'use strict';

const $navBtn = $('#menu-btn');
const $navMenu = $('#menu');
const $searchBtn = $('.search');
const $searchModal = $('#search-modal');

const $mileageBtn = $('#mileage');
const $mileageModal = $('#mileage-modal');

const $location = $('#search-form').find('input[name=location]');


$navBtn.click(function() {
  $navMenu.toggle();
});

$searchBtn.click(() => {
  if($location.val() === ','){
    $location.val('');
  }
  $searchModal.show();
});

$mileageBtn.click(() => {
  $mileageModal.show();
});

$('.result-cards').on('click', '.trail-card', e => {
  let $selectedCard = $(e.target).closest('div');
  let $cardModal = $selectedCard.find('.modal');
  $cardModal.show();
});

$('.close').on('click', e=>{
  $('.modal').hide();
});

$('.search-results').on('click', '.trail-card', e => {
  let $selectedCard = $(e.target).closest('div');
  let $cardModal = $selectedCard.find('.modal');
  $cardModal.show();
});