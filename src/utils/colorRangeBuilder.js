let buildColors = (start, end, n) => {
  //Distance between each color
  var steps = [(end[0] - start[0]) / n, (end[1] - start[1]) / n, (end[2] - start[2]) / n]

  //Build array of colors
  var colors = [start]
  for (var ii = 0; ii < n - 1; ++ii) {
    colors.push([
      Math.floor(colors[ii][0] + steps[0]),
      Math.floor(colors[ii][1] + steps[1]),
      Math.floor(colors[ii][2] + steps[2]),
    ])
  }
  colors.push(end)
  colors = colors.map((d) => `rgb(${d.toString()})`)
  return colors
}

export default buildColors
