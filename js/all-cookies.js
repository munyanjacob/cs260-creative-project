const searchField = document.getElementById("search-field");
const recipeContainer = document.getElementById("recipes-container");

const api_id = '6deccc36';
const api_key = '10c251ff77b8a6c9f3b85e1294ba76e7';

searchField.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.which === 13) {
    fetchData(searchField.value);
  }
});

document.getElementById("search-addon").addEventListener('click', function() {
  fetchData(searchField.value)
});


async function fetchData(query) {
  const queryURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" + query + "&app_id=" + api_id + "&app_key=" + api_key
  const response = await fetch(queryURL);
  const data = await response.json();

  //console.log(data);

  displayRecipes(data.hits);
}

function displayRecipes(results) {
  var strToStartCard = '<div class="card cookie-card bg-dark"><div class="row gx-0"><div class="col-sm-12 col-lg-5 px-0 d-flex flex-column justify-content-center"><div class="card-body d-flex justify-content-center"><img src="';
  var strAfterImgURL = '" class="cookie-image align-self-center" alt="';
  var strAfterImgAlt = '"></div></div><div class="col-sm-12 col-lg-7 px-0 align-self-center"><div class="card-body cookie-card-details px-1"><div class="d-flex justify-content-center mb-4"><div class="cookie-title-wrapper"><h3 class="px-2"><strong>';
  var strAfterImgLabel = '</strong></h3><h5> by ';
  var strAfterImgSource = '</h5></div></div>';
  var strAfterIngredients = '<div class="cookie-description-wrapper">';
  var strAfterDescription = '</div></div></div></div></div>';

  for (let result of results) {
    var everything = "";
    var imageURL = result.recipe.image;
    var label = result.recipe.label;
    var source = result.recipe.source;
    var servings = result.recipe.yield;
    var diets = result.recipe.dietLabels.join(", ");

    if (!diets) {
      diets = "none";
    }

    everything += strToStartCard + imageURL + strAfterImgURL + label + strAfterImgAlt + label + strAfterImgLabel + source + strAfterImgSource;

    everything += '<div class="ingredients mb-4">';
    for (let ingredientLine of result.recipe.ingredientLines) {
      everything += '<p> - ' + ingredientLine + '</p>';
    }
    everything += '</div>';

    everything += strAfterIngredients;

    everything += '<p>Servings: <strong>' + String(servings) + '</strong></p><p>Diets: <strong>' + diets + '</strong></p>';

    everything += strAfterDescription;

    recipeContainer.innerHTML += everything;
  }


}