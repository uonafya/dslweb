
// docReady
function ready(handler) {
    if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
        handler();
    } else {
        document.addEventListener('DOMContentLoaded', handler, false);
    }
}
// docReady

// PARTNERS Carousel
// ready(function () {
//     bulmaCarousel.attach('#carousel-partners', {
//       slidesToScroll: 1,
//       slidesToShow: 4,
//       autoplay: true,
//       pagination: false,
//       loop: true
//     });
// });
// PARTNERS Carousel

//Date range filter in indicators
// var calendars = bulmaCalendar.attach('[type="date"]', options);
// var calendars = bulmaCalendar.attach('[type="date"]', null);
// for(var i = 0; i < calendars.length; i++) {
//     date=> {
//         console.log(date);
//     };
// }
//Date range filter in indicators
