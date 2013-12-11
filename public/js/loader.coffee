"use strict"

$(window).load ->
  mediaHost = "//media.suayan.com/"
  images = []
  backgrounds = []
  totalBackgrounds = 5 # 28;
  countLoaded = 0
  checkSpinner = ->
    countLoaded++
    $("#spinner").hide()  if countLoaded is totalBackgrounds

  onSuccess = ->
    checkSpinner()

  onError = ->
    checkSpinner()

  preloadBackgrounds = ->
    i = 1

    while i <= totalBackgrounds
      numStr = gb.util.ZeroFill(i, 3)
      images.push mediaHost + "images/image-" + numStr + ".jpg"
      i++
    i = 0
    n = images.length

    while i < n
      preloader = new gb.ui.PreloadableImage("img" + i, images[i], onSuccess, onError)
      backgrounds.push preloader
      i++

  preloadBackgrounds()
  onResizeHandler = (e) ->
    $(window).resize util.ResizeThrottle(onResizeHandler, 500)
    $("#spinner").show()
    $("body").fullscreen
      refreshInterval: 30000
      fadeOutTime: 1000
      fadeInTime: 50
      images: images

    content = $("#content")
    visibleContent = true
    toggleContent = ->
      visibleContent = (not visibleContent)
      if visibleContent
        content.stop().animate
          opacity: 1
        , 500, "swing", ->
          content.attr
            visibility: "visible"
            display: "block"

      else
        content.stop().animate
          opacity: 0
        , 1000, "swing", ->
          content.attr
            visibility: "hidden"
            display: "none"

    $("#ui-toolbar").click toggleContent
