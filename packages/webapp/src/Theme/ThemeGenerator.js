import * as chroma from "chroma-js";

export function getContrastColor(
  color,
  baseColor,
  contrastRatio,
  luminanceDarkThreshold = 0.1833
) {
  if (typeof color !== "color") {
    color = chroma(color);
  }

  let l = color.luminance();
  if (l <= luminanceDarkThreshold) {
    return baseColor.luminance((l + 0.05) * contrastRatio - 0.05);
  } else {
    return baseColor.luminance((l + 0.05) / contrastRatio - 0.05);
  }
}

export function buildColorScales(colors) {
  for (var key in colors) {
    if (typeof colors[key] === "string") {
      let color = chroma(colors[key]);
      let result = { main: colors[key] };

      let sourceScale = chroma
        .scale([color.luminance(0.85), color, color.luminance(0.05)])
        .domain([9, 5, 1])
        .mode("lch");

      var scale = {};
      var contrasts = {};
      for (var i = 9; i >= 1; i--) {
        result[i] = sourceScale(i).hex();
        contrasts[i] = {};
        for (var ratio = 2; ratio <= 10; ratio++) {
          contrasts[i][ratio] = getContrastColor(
            sourceScale(i),
            color,
            ratio
          ).hex();
        }
      }
      result.light = result[6];
      result.dark = result[4];

      contrasts.main = contrasts[5][7];
      contrasts.light = contrasts[6][7];
      contrasts.dark = contrasts[4][7];

      result.contrast = contrasts;
      colors[key] = result;
    }
  }
}
export function createTheme(theme) {}
