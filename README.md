Panzoom
-------------

Not an imaginative name, I know, this is two jQuery plug-ins, one dependent on the other depending on whether you want to control your own touch events or not.


Fully automatic touch events and everything
-------------

    $('#myselector').touchpanzoom();

For this, the javascript files you need are

- jquery
- hammer.js
- jquery.panzoom.js
- jquery.panzoom.touch.js


Manually controlled pan + zoom
-------------

For this you need the JS files 

- jquery
- jquery.panzoom.js


    // Set everything up and get the controller
    var controller = $('#myselector').panzoom()

    // Pan by the specified x and y amounts, over the time specified (optional)
    controller.pan(x,y,[time])

    // Pan to a specific area on the element, over the time specified (optional)
    controller.panTo(x, y, [time])

    // Zoom in/out by the specified amount, over the time specified (optional)
    controller.zoom(amount, [time])

    // Zoom to the specified scale, over the time specified (optional)
    controller.zoomTo(level, [time])

    // Reset to the default (fully zoomed out, scale=1.0, x,y = centre of image
    // over the time specified (optional)
    controller.reset([time])

    // Convert a set of screen coordinates (relative to the element) to coordinates
    // on the original element (taking into account panning and zooming)
    var point = controller.screenToImage(x, y);


Very exciting, works for me anyway.
