(function() {

  $.fn.panzoom = function(options) {
    var $img = $(this)
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
       var rawImageWidth = $img.width()
       var rawImageHeight = $img.height()
       var rawScaleX = rawImageWidth / options.width
       var rawScaleY = rawImageHeight / options.height

       var adjustedScaleX = scale / rawScaleX
       var adjustedScaleY = scale / rawScaleY

       var adjustedFocalX = (-focalx) * adjustedScaleX
       var adjustedFocalY = (-focaly) * adjustedScaleY

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
       focusOn: function(x, y, level) {
         
       }
     }
  }
}())
