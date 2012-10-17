(function() {
  $.fn.touchpanzoom = function() {
    var $img = $(this)
    var zoomer = $img.panzoom() 
    var hammer = new Hammer($img.get(0))
    applyPinchFunction(zoomer, hammer)
    applyZoomFunction(zoomer, hammer)
    applyDragFunction(zoomer, hammer)
  }

  function applyPinchFunction(zoomer, hammer) {
    var lastScale = 1.0
    var currentScale = 1.0
    var zoomTimer = null

    function updateTransform() {
      var difference = currentScale - lastScale
      lastScale = currentScale
      zoomer.zoom(difference,0)
    }

    hammer.ontransformstart = function(e) {
      lastScale = e.scale
      currentScale = e.scale
      zoomTimer = setInterval(updateTransform, 20)
      return false
    }
    hammer.ontransform = function(e) {
      currentScale = e.scale
      return false
    }
    hammer.ontransformend = function(e) {
      clearInterval(zoomTimer)
      updateTransform()
      return false
    }
  }

  function applyZoomFunction(zoomer, hammer) {
    var zoomed = false
    hammer.ondoubletap = function(e) {
      var imagePosition = zoomer.screenToImage(e.position[0].x, e.position[0].y)

      if(zoomed) {
        zoomer.reset()
      } else {
        zoomer.zoomTo(4.0)
        zoomer.panTo(imagePosition.x, imagePosition.y)
      }
      zoomed = !zoomed
      return false
    }
  }

  function applyDragFunction(zoomer, hammer) {
    var dragTimer = null
    var lastDrag = {
      x: 0,
      y: 0
    }
    var currentDrag = {
      x: 0,
      y: 0
    }
    function updateDrag() {
      var x = lastDrag.x - currentDrag.x
      var y = lastDrag.y - currentDrag.y 
      lastDrag.x = currentDrag.x
      lastDrag.y = currentDrag.y
      zoomer.pan(x, y, 0)
    }

    hammer.ondragstart = function(e) {
      lastDrag.x = 0
      lastDrag.y = 0
      dragTimer = setInterval(updateDrag, 20)
      return false
    }
    hammer.ondrag = function(e) {
      currentDrag.x = e.distanceX
      currentDrag.y = e.distanceY
      return false
    }

    hammer.ondragend = function() {
      clearInterval(dragTimer)
      updateDrag()
      return false
    }
  }
}())
