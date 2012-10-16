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

     var updateCss = function() {

       if(focalx < 0) focalx = 0
       if(focaly < 0) focaly = 0
       if(focalx > rawImageWidth) focalx = rawImageWidth
       if(focaly > rawImageHeight) focaly = rawImageHeight

       var adjustedFocalX = (-focalx) * scale + rawImageWidth/2.0
         , adjustedFocalY = (-focaly) * scale + rawImageHeight/2.0
         , displayedWidth = (rawImageWidth / 2) / scale
         , displayedHeight = (rawImageHeight / 2) / scale

       $img.css({
         '-webkit-transform-origin': '0% 0%',
         '-webkit-transform': 'translate(' + adjustedFocalX + 'px,' + adjustedFocalY + 'px) ' + 
                              'scale(' + scale + ',' + scale + ')',
         '-webkit-transition': '-webkit-transform ' + options.transition + 's' 
       })
     }
     function reset() {
       scale = 1.0
       focalx = rawImageWidth / 2.0 
       focaly = rawImageHeight / 2.0 
       updateCss()
     }
     reset()

     return {
       pan: function(x, y) {
         focalx += x 
         focaly += y 
         updateCss()
       },
       panTo: function(x, y) {
         focalx = x
         focaly = y
         updateCss()
       },
       zoomTo: function(level) {
         scale = level
         updateCss()
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
