(function() {

  $.fn.panzoom = function(options) {
    var $img = $(this)
      , scale = 1.0
      , panx = 0
      , pany = 0

     options = options || {}
     options.width = options.width || 100
     options.height = options.height || 100

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

       console.log(rawImageWidth, rawImageHeight, rawScaleX, rawScaleY)

       $img.css({
         '-webkit-transform-origin': '0% 0%',
         '-webkit-transform': 'translate(' + (-panx) + 'px,' + (-pany) + 'px) scale(' + adjustedScaleX + ',' + adjustedScaleY + ')',
         '-webkit-transition': '-webkit-transform 1s' 
       })
     }
     updateCss()

     return {
       pan: function(x, y) {
         panx = x
         pany = y
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
