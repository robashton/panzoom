(function() {

  $.fn.panzoom = function(options) {
    var $img = $(this)
      , rawImageWidth = $img.width()
      , rawImageHeight = $img.height()
      , rawScaleX = rawImageWidth / options.width
      , rawScaleY = rawImageHeight / options.height
      , scale = 1.0
      , focalx = 0
      , focaly = 0

     options = options || {}
     options.width = options.width || 100
     options.height = options.height || 100
     options.transition = options.transition || 1.0

     $img.wrap(
       $('<div/>').css({
         'position': 'relative',
         'width': options.width + 'px',
         'height': options.height + 'px',
         'overflow': 'hidden'
       })
     )

     var updateCss = function() {
       console.log(focalx, focaly)
       var adjustedScaleX = scale / rawScaleX
         , adjustedScaleY = scale / rawScaleY
         , adjustedFocalX = (-focalx) * adjustedScaleX + rawImageWidth/2.0
         , adjustedFocalY = (-focaly) * adjustedScaleY + rawImageHeight/2.0
         , displayedWidth = (rawImageWidth / 2) / adjustedScaleX
         , displayedHeight = (rawImageHeight / 2) / adjustedScaleY

       $img.css({
         '-webkit-transform-origin': '0% 0%',
         '-webkit-transform': 'translate(' + adjustedFocalX + 'px,' + adjustedFocalY + 'px) ' + 
                              'scale(' + adjustedScaleX + ',' + adjustedScaleY + ')',
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
         var adjustedScaleX = scale / rawScaleX
           , adjustedScaleY = scale / rawScaleY

         return {
           x: (x - rawImageWidth/2.0) / adjustedScaleX + focalx,
           y: (y - rawImageHeight/2.0) / adjustedScaleY + focaly
         }

       }
     }
  }
}())
