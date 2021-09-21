const selectElement = document.querySelector(".room-type");

const result = document.querySelector(".results");

selectElement.addEventListener("change", handleSelected);

function handleSelected(evt) {
  let check = evt.target.value;

  if (check === "DeluxeRoom") {
    result.value = "$450 per night";
  } else if (check === "StandardRoom") {
    result.value = "$200 per night";
  } else if (check === "LuxurySuite") {
    result.value = "$700 per night";
  }
}
