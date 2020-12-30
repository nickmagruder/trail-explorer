'use strict';

const $navBtn = $('#menu-btn');
const $navMenu = $('#menu');
const $searchBtn = $('.search');
const $searchModal = $('#search-modal');
const $detailBtn = $('.trail-card');
const $detailModal = $('#detail-modal');

$navBtn.click(function() {
  $navMenu.toggle();
});

$searchBtn.click(() => {
  $searchModal.show();
});

$('.result-cards').on('click', '.trail-card', e => {
  let $selectedCard = $(e.target).closest('div');
  let $cardModal = $selectedCard.find('.modal');
  $cardModal.show();
});

$('.close').on('click', e=>{
  $('.modal').hide();
});
