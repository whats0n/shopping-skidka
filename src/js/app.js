//POLYFILL CSS OBJECT-FIT
let objectFitImages = require('object-fit-images');
objectFitImages();
//POLYFILL SVGXUSE
import svg4everybody from 'svg4everybody';
svg4everybody();
//jquery
window.$ = require('jquery');
window.jQuery = require('jquery');
//scrollbar
require('perfect-scrollbar/jquery')($);
///common
require('./common/_common.js');