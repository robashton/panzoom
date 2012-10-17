(function() {

  $.fn.panzoom = function(options) {
     options = options || {}
     options.transition = options.transition || 1.0

    var $img = $(this)
      , rawImageWidth = $img.width()
      , rawImageHeight = $img.height()
      , scale = 1.0
      , focalx = 0
      , focaly = 0


     $img.wrap(
       $('<div/>').css({
         'position': 'relative',
         'width': rawImageWidth + 'px',
         'height': rawImageHeight + 'px',
         'overflow': 'hidden'
       })
     )

     var updateCss = function(time) {
       time = typeof time === 'undefined' ? options.transition : time
       $img.css(
         {
           'transition': 'transform ' + time + 's',
           '-webkit-transition': '-webkit-transform ' + time + 's',
           '-moz-transition': '-moz-transform ' + time + 's',
           '-o-transition': '-o-transform ' + time + 's'
         }
       )

       if(focalx < 0) focalx = 0
       if(focaly < 0) focaly = 0
       if(focalx > rawImageWidth) focalx = rawImageWidth
       if(focaly > rawImageHeight) focaly = rawImageHeight
       if(scale <= 0.0001) scale = 0.0001

       var adjustedFocalX = (-focalx) * scale + rawImageWidth/2.0
         , adjustedFocalY = (-focaly) * scale + rawImageHeight/2.0
         , displayedWidth = (rawImageWidth / 2) / scale
         , displayedHeight = (rawImageHeight / 2) / scale

       var transform = 'translate(' + adjustedFocalX + 'px,' + adjustedFocalY + 'px) ' + 
                       'scale(' + scale + ',' + scale + ')';
       $img.css({
         'tranform-origin' : '0% 0%',
         '-webkit-transform-origin': '0% 0%',
         '-moz-transform-origin': '0% 0%',
         '-o-transform-origin': '0% 0%',
         'transform': transform,
         '-webkit-transform': transform,
         '-moz-transform': transform,
         '-o-transform': transform
       })
     }
     function reset(time) {
       scale = 1.0
       focalx = rawImageWidth / 2.0 
       focaly = rawImageHeight / 2.0 
       updateCss(time)
     }
     reset()

     return {
       pan: function(x, y, time) {
         focalx += x  / scale
         focaly += y  / scale
         updateCss(time)
       },
       panTo: function(x, y, time) {
         focalx = x
         focaly = y
         updateCss(time)
       },
       zoom: function(amount, time) {
         scale += amount * scale
         updateCss(time)
       },
       zoomTo: function(level, time) {
         scale = level
         updateCss(time)
       },
       reset: reset,
       screenToImage: function(x, y) {
         return {
           x: (x - rawImageWidth/2.0) / scale + focalx,
           y: (y - rawImageHeight/2.0) / scale + focaly
         }

       }
     }
  }
}())
