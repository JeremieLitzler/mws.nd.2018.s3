const slider = document.querySelector(".mdc-slider");
let minMarkers = 0;
let maxMarkers = 5;
minMarkers = [...slider.attributes].find(attr => attr.name === "aria-valuemin")
  .value;
maxMarkers = [...slider.attributes].find(attr => attr.name === "aria-valuemax")
  .value;

let nbOfMarkers = maxMarkers - minMarkers;
console.log("nbOfMarkers", nbOfMarkers);

const sliderTrack = document.querySelector(".mdc-slider__track");
const trackContainer = document.createElement("div");
trackContainer.className = "mdc-slider__track-marker-container";

const trackMarker = document.createElement("div");
trackMarker.className = "mdc-slider__track-marker";

/**
 * Idea for a start rating: https://zellwk.com/blog/star-rating/
 */
/*const star = document.createElement("svg");
const useElement = document.createElement("use");
useElement.setAttribute("xlink:href", "start");
star.appendChild(useElement);
trackMarker.appendChild(star);*/

for (let index = 0; index < nbOfMarkers; index++) {
  const currentRating = index + 1;
  const titleLabel = `Select rating of ${currentRating}`;
  const ratingValueSpan = document.createElement("span");
  ratingValueSpan.className = "rating";
  ratingValueSpan.innerText = currentRating;
  ratingValueSpan.title = titleLabel;
  ratingValueSpan.href = "#";
  ratingValueSpan.tabIndex = 0;
  ratingValueSpan.setAttribute("aria-label", titleLabel);

  const currentTrackMarker = trackMarker.cloneNode();
  currentTrackMarker.appendChild(ratingValueSpan);
  trackContainer.appendChild(currentTrackMarker);
  console.log(`Added marker ${index}`);
}
sliderTrack.appendChild(trackContainer);
