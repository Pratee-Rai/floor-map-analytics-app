/**
 * Takes the arguments and returns the url of the heatmap video
 * @param {timeRangeValue, location, area} args
 * @returns url of the heatmap video
 */
export function getVideo(args) {
  return new Promise((r) =>
    setTimeout(() => r({ url: "", name: "" }), 5000)
  ).catch((err) => console.error(err));
}
