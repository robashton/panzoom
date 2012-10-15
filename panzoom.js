(function() {

  $.fn.panzoom = function(options) {
    var $img = $(this)
      , scale = 1.0
      , focalx = 0 
      , focaly = 0
      , rawImageWidth = $img.width()
      , rawImageHeight = $img.height()
      , rawScaleX = rawImageWidth / options.width
      , rawScaleY = rawImageHeight / options.height

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
       var adjustedScaleX = scale / rawScaleX
         , adjustedScaleY = scale / rawScaleY
         , adjustedFocalX = (-focalx) * adjustedScaleX
         , adjustedFocalY = (-focaly) * adjustedScaleY

       $img.css({
         '-webkit-transform-origin': '0% 0%',
         '-webkit-transform': 'translate(' + adjustedFocalX + 'px,' + adjustedFocalY + 'px) scale(' + adjustedScaleX + ',' + adjustedScaleY + ')',
         '-webkit-transition': '-webkit-transform ' + options.transition + 's' 
       })
     }
     updateCss()

     return {
       pan: function(x, y) {
         focalx = x
         focaly = y
         updateCss()
       },
       zoom: function(level) {
         scale = level
         updateCss()
       },
       screenToImage: function(x, y) {
         var adjustedScaleX = scale / rawScaleX
           , adjustedScaleY = scale / rawScaleY
           
         x /= adjustedScaleX
         y /= adjustedScaleY

         x += focalx 
         y += focaly

         return {
           x: x,
           y: y
         }

       }
     }
  }
}())
