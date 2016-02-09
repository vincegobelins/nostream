angular.module('starter')

.directive('nsslider',function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      nsslider: '='
    },
    template: '<ul class="ns-slider">' +
    '<li class="slide ns-slider-item" ng-repeat="(key, value) in slides">' +
    '<div class="ns-slider-img-wrapper">' +
    '<video preload muted loop src="{{value.preview}}"></video>' +
    '</div>' +
    '<div class="ns-slider-top ns-slider-anim">' +
    '<div class="ns-slider-bloc-hidden">' +
    '<img src="img/thumbs/briseglace.png" alt="" class="ns-slider-img">' +
    '</div>' +
    '</div>' +
    '<div class="ns-slider-bottom ns-slider-anim">' +
    '<div class="ns-slider-bloc-hidden">' +
    '<p class="ns-slider-detail">{{value.tag}}</p>' +
    '</div>' +
    '<div class="ns-slider-bloc-hidden">' +
    '<h1 class="ns-slider-title">{{value.title}}</strong></h1>' +
    '</div>' +
    '<div class="ns-slider-bloc-hidden">' +
    '<a href="#/app/lives/{{key}}">' +
    '<img src="img/button-live.png" alt="" ng-click="capture(key)" class="ns-slider-cta">' +
    '</a>' +
    '</div>' +
    '</div>' +
    '</li>' +
    '</ul>',
    link: function(scope, el) {
      el.ready(function() {
        scope.$apply(function() {
          scope.slides = scope.nsslider;
        });
        var windowHeight = window.innerHeight;
        $('.ns-slider-item').css('height', windowHeight - 44);
        $('video').css('height', windowHeight);

        window.onresize = function() {
          var windowHeight = window.innerHeight;
          $('.ns-slider-item').css('height', windowHeight - 44);
          $('video').css('height', windowHeight);
        };

        $('.ns-slider').bxSlider({
          auto: false,
          autoControls: false,
          controls: false,
          pager: false,
          video: true,
          infiniteLoop: false,
          onSlideBefore: function(slide){

            /* Reset active class + reset z-index + resume playing */
            $('.ns-slider-item').css('z-index', '0');
            slide.removeClass('active');
            $('video').each(function() {
              $(this)[0].pause();
            });

            /*  Add z-index and play current video  */
            slide.css('z-index', '10');
            var video = slide.find('video');
            video[0].play();
          },
          onSlideAfter: function(slide){

            /*  After loading slide, add class acive  */
            $('.ns-slider-item').removeClass('active');
            slide.addClass('active');
          },
          onSliderLoad: function(){
            /* Init first slide */
            var slide = $('.ns-slider-item').eq(0);
            slide.css('z-index', '10');
            var video = slide.eq(0).find('video');
            video[0].play();
            slide.addClass('active');
          }
        });
    });
}
};
});
