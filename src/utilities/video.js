/**
 * Takes the arguments and returns the url of the heatmap video
 * @param {timeRangeValue, location, area} args
 * @returns url of the heatmap video
 */
export function getHeatmapVideo({ timeRangeValue, location, area }) {
  let url;
  if (timeRangeValue) {
    url = `./media/${location}/${area}/output-seg-${timeRangeValue}.mp4`;
  } else {
    url = `./media/${location}/${area}/output-seg.mp4`;
  }
  return new Promise((r) => setTimeout(() => r({ url, name: "" }), 3000)).catch(
    (err) => console.error(err)
  );
}
