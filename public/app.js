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

$detailBtn.click(() => {
  $detailModal.show();
});
