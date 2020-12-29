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
