'use strict';

const $navBtn = $('#menu-btn');
const $navMenu = $('#menu');
const $searchBtn = $('.search');
const $searchModal = $('#search-modal');

$navBtn.click(function() {
  $navMenu.toggle();
});

$searchBtn.click(() => {
  $searchModal.show();
});

$('.result-cards').on('click', '.trail-card', e => {
  let $selectedCard = $(e.target).closest('div');
  console.log($selectedCard);
  let $cardModal = $selectedCard.find('.modal');
  $cardModal.show();
});

$('.close').on('click', e=>{
  $('.modal').hide();
});
