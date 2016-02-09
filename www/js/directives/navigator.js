angular.module('starter')

  .directive("nsNavigator", function () {
    return {
      restrict: 'AE',
      replace: true,
      transclude: true,
      scope: {title: '=expanderTitle', control: '='},
      link: function (scope, element) {
        var init, render, drawLive, setLivePosition;
        var video, live, liveCtx, row, livePos, transitionVelocity, swipeDetect, tweenPosition, marginTop;
        var isPlaying;

        init = function(){
          video = document.getElementById('video');
          live = element[0];
          liveCtx = live.getContext("2d");
          row = 3;
          marginTop = 0;
          isPlaying = false;
          livePos = {y:0, x:0};
          transitionVelocity = 0.75;
          // draw background init
          liveCtx.rect(0,0,live.width,live.height);
          liveCtx.fillStyle="#000000";
          liveCtx.fill();

          var windowHeight = window.innerHeight;
          var windowWidth = window.innerWidth;
          $('#live').css('height', windowHeight - marginTop);
          if($('#live').width() < windowWidth){
            console.log('ok');
            $('#live').css('width', windowWidth);
          };

          window.onresize = function() {
            var windowHeight = window.innerHeight;
            var windowWidth = window.innerWidth;
            $('#live').css('height', windowHeight - marginTop);

            if($('#live').width() < windowWidth){
              $('#live').css('width', windowWidth);
            }
            else {
              $('#live').css('width', 'auto');
            }
          };

          // video.addEventListener('')

          // set swipe detection
          swipeDetect(function(direction){
            setLivePosition (direction);
          });
          // listen if video is played
          scope.$on('isPlaying', function(event) {
            isPlaying = true;
            render();
          });

          scope.$on('isPaused', function(event) {
            isPlaying = false;
          });
        }

        drawLive = function(){
          liveCtx.drawImage(video, livePos.x, livePos.y, live.width * row, live.height * row);
        }

        setLivePosition = function(direction){
          switch(direction){
            case 'up' :
              var nextPos = livePos.y - live.height;
              tweenPosition(livePos, nextPos, 'y');
              break;
            case 'down' :
              var nextPos = livePos.y + live.height;
              tweenPosition(livePos, nextPos, 'y');
              break;
            case 'left' :
              var nextPos = livePos.x - live.width;
              tweenPosition(livePos, nextPos, 'x');
              break;
            case 'right' :
              var nextPos = livePos.x + live.width;
              tweenPosition(livePos, nextPos, 'x');
              break;
          }
        }

        tweenPosition = function(position, nextPosition, axis){
          if(axis == 'y' && nextPosition <= 0 && nextPosition > -live.height * row){
            TweenMax.to(position, transitionVelocity, {y:nextPosition, ease:Power3.easeOut});
          }
          else if(axis == 'x' && nextPosition <=0 && nextPosition > -live.width * row){
            TweenMax.to(position, transitionVelocity, {x:nextPosition, ease:Power3.easeOut});
          }
        }

        swipeDetect = function(callback){
          //todo detect swipe
          var swipedir,
            startX,
            startY,
            distX,
            distY,
            threshold = 50, //required min distance traveled to be considered swipe
            restraint = 100, // maximum distance allowed at the same time in perpendicular direction
            allowedTime = 300, // maximum time allowed to travel that distance
            elapsedTime,
            startTime,
            handleswipe = callback || function(swipedir){}

          live.addEventListener('touchstart', function(e){
            var touchobj = e.changedTouches[0]
            swipedir = 'none'
            dist = 0;
            startX = touchobj.pageX
            startY = touchobj.pageY
            startTime = new Date().getTime() // record time when finger first makes contact with surface
            e.preventDefault()
          }, false)

          live.addEventListener('touchmove', function(e){
            e.preventDefault() // prevent scrolling when inside DIV
          }, false)

          live.addEventListener('touchend', function(e){
            var touchobj = e.changedTouches[0]
            distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime // get time elapsed
            if (elapsedTime <= allowedTime){ // first condition for awipe met
              if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
              }
              else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
              }
            }
            if(swipedir != 'none') {
              handleswipe(swipedir);
            }
            e.preventDefault()
          }, false)

        }

        render = function(){
          if(isPlaying == true){
            drawLive();
            requestAnimationFrame(render);
          }
        }

        init();
      }
    };
  })
