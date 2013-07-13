gb = gb || {}
gb.ui = gb.ui || {}
gb.ui.Chart = (x, y, width, height) ->
  @x = x
  @y = y
  @width = width
  @height = height
  @chartLeft = 60 # leftmost area of chart
  @chartTop = 60
  @chartRight = @width - 60
  @chartBottom = @height - 100
  @chartWidth = @chartRight - @chartLeft
  @chartHeight = @chartBottom - @chartTop
  @barCeiling = @chartHeight - 40 # space from tallest bar to top of chart
  @topInterval = 0
  @chart = Raphael(@x, @y, @width, @height)
  @tickXPos = 30
  @tickMarks = null
  @textBox = @chart.text(50, 20, "").attr(font: "14pt 'Arial'")
  @minText = @chart.text(200, 20, "min:").attr(font: "14pt 'Arial'")
  @maxText = @chart.text(200, 40, "max:").attr(font: "14pt 'Arial'")
  @topIntervalText = @chart.text(400, 40, "top:").attr(font: "14pt 'Arial'")
  @chartArea = @chart.rect(@chartLeft, @chartTop, @chartWidth, @chartHeight).attr(
    fill: "#efefef"
    "stroke-width": 1
    stroke: "#666"
  )
  @numberOfBars = 15
  @barWidth = 40
  @barSpacing = 20 # spacing
  @bars = []
  @data = []
  @tickCount = 5
  @roundUpTo = 100

  # randomizer
  @generatorIndex = 1

gb.ui.Chart::init = ->
  @data = util.RandomArray(@numberOfBars, @generatorIndex * 100)

gb.ui.Chart::grid = (horizontal, vertical) ->

  # draw horizontal rules
  i = 1

  while i < @height
    path = "M0 " + i + " H" + @width
    @chart.path(path).attr "stroke-width": 0.1
    i += vertical

  # draw vertical rules
  i = 1

  while i < @width
    path = "M" + i + " 0 V" + @height
    @chart.path(path).attr "stroke-width": 0.1
    i += horizontal

gb.ui.Chart::draw = ->
  if @data.length
    i = 0

    while i < @data.length
      @bars[i].remove()  if @bars[i]
      @bars[i] = @drawBar(i, @data[i])
      i++

gb.ui.Chart::drawBar = (i, value) ->
  xPos = @chartLeft + (i * (@barWidth + @barSpacing))
  yPos = @chartBottom - value
  thisObj = this
  objSet = @chart.set()
  objSet.push @chart.rect(xPos, yPos, @barWidth, value).attr(
    fill: "#fff"
    "stroke-width": 0
  ).click(->
    text = "selected: " + i
    thisObj.textBox.attr "text", text
  )
  xPosText = xPos + @barWidth / 2
  yPosText = yPos - 10
  objSet.push @chart.text(xPosText, yPosText, value).attr(
    font: "10pt 'Arial'"
    fill: "#666"
  )
  objSet

gb.ui.Chart::drawTickMarks = ->
  tickIntervalValue = @topInterval / @tickCount
  @tickMarks.remove()  if @tickMarks
  tickSet = @chart.set()
  i = 1

  while i <= @tickCount
    tickLabel = tickIntervalValue * i
    yPos = @chartBottom - @scaledValue(tickIntervalValue * i)

    # console.debug("tickPositions: "+this.tickXPos+" "+yPos+" value: "+tickLabel)
    tickSet.push @chart.text(@tickXPos, yPos, tickLabel).attr(font: "10pt 'Arial'")
    i++
  @tickMarks = tickSet

gb.ui.Chart::animate = ->
  newData = util.RandomArray(@numberOfBars, @generatorIndex * @roundUpTo)
  if @generatorIndex > 12
    @generatorIndex = 1
  else
    @generatorIndex++
  min = util.ArrayMin(newData)
  max = util.ArrayMax(newData)
  @topInterval = @calculateTopInterval(max, @roundUpTo)
  @minText.attr text: "min: " + min
  @maxText.attr text: "max: " + max
  @topIntervalText.attr text: "top:" + @topInterval
  if @data.length
    i = 0

    while i < @data.length
      @data[i] = newData[i] # sync model
      newHeight = @scaledValue(newData[i])
      newYPos = @chartBottom - newHeight
      fillColor = @colorCode(newData[i])
      barAnimation = Raphael.animation(
        height: newHeight
        y: newYPos
        fill: fillColor
        "stroke-width": 0
      , 500, "easeInOut")
      textAnimation = Raphael.animation(
        height: newHeight
        y: newYPos - 10
      , 500, "easeInOut")
      barObj = @bars[i]
      barObj[0].animate barAnimation
      barObj[1].attr(text: newData[i]).animate textAnimation
      i++
  @drawTickMarks()


###
Calculate the actual pixel height:
barHeight = (value * barCeiling)/ topInterval;
###
gb.ui.Chart::scaledValue = (value) ->
  (if (@topInterval isnt 0) then (value * @barCeiling) / @topInterval else 0)


###
Calculate the nearest top interval:
topInterval(150,100) -> 200
###
gb.ui.Chart::calculateTopInterval = (value, interval) ->
  (if ((value % interval) > 0) then value - (value % interval) + interval else value)

gb.ui.Chart::colorCode = (value) ->
  colorMap =
    treshold: [550, 500, 400, 300, 200]
    color: ["#ff0033", "#ff6633", "#ffcc33", "#8FD600", "#3399CC"]
    def: "#003366"

  i = 0

  while i < colorMap.treshold.length
    return colorMap.color[i]  if value > colorMap.treshold[i]
    i++
  colorMap.def


# invoke onLoad
$ ->
  initPage = ->
    chart = new gb.ui.Chart(300, 120, 1002, 802)
    chart.init()
    chart.grid 20, 20
    chart.draw()
    chart.animate()
    interval = setInterval(refresh, 3000)
  refresh = ->
    chart.animate()
  chart = null
  initPage()