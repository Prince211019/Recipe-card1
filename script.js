const recipes = {
  chocolateCake: {
    title: "Chocolate Cake",
    description: "Delicious chocolate cake with rich chocolate frosting.",
    ingredients: [
      "Flour",
      "Sugar",
      "Cocoa Powder",
      "Baking Powder",
      "Eggs",
      "Milk",
      "Butter",
      "Vanilla Extract",
    ],
    steps: [
      "Preheat the oven to 350°F (175°C).",
      "In a bowl, mix the dry ingredients together.",
      "Add the wet ingredients and mix until combined.",
      "Pour the batter into a greased cake pan.",
      "Bake for 30 minutes or until a toothpick comes out clean.",
    ],
    prepTime: 30,
  },
  vanillaCupcakes: {
    title: "Vanilla Cupcakes",
    description:
      "Soft and fluffy vanilla cupcakes topped with buttercream frosting.",
    ingredients: [
      "Flour",
      "Sugar",
      "Baking Powder",
      "Salt",
      "Butter",
      "Eggs",
      "Milk",
      "Vanilla Extract",
      "Buttercream Frosting",
    ],
    steps: [
      "Preheat the oven to 350°F (175°C).",
      "In a mixing bowl, cream together butter and sugar.",
      "Add eggs one at a time, then mix in vanilla.",
      "Combine flour, baking powder, and salt; add to the wet mixture.",
      "Fill cupcake liners and bake for 20 minutes.",
      "Let cool before frosting with buttercream.",
    ],
    prepTime: 25,
  },

  spaghettiBolognese: {
    title: "Spaghetti Bolognese",
    description: "Classic Italian spaghetti served with a hearty meat sauce.",
    ingredients: [
      "Spaghetti",
      "Ground Beef",
      "Onion",
      "Garlic",
      "Carrot",
      "Celery",
      "Tomato Sauce",
      "Olive Oil",
      "Basil",
      "Parmesan Cheese",
    ],
    steps: [
      "Cook spaghetti according to package instructions.",
      "In a pan, sauté onion, garlic, carrot, and celery in olive oil.",
      "Add ground beef and cook until browned.",
      "Stir in tomato sauce and basil; simmer for 20 minutes.",
      "Serve sauce over spaghetti, topped with Parmesan cheese.",
    ],
    prepTime: 40,
  },

  chickenCurry: {
    title: "Chicken Curry",
    description: "A flavorful chicken curry made with aromatic spices.",
    ingredients: [
      "Chicken Breasts",
      "Onion",
      "Garlic",
      "Ginger",
      "Curry Powder",
      "Coconut Milk",
      "Tomatoes",
      "Spinach",
      "Cilantro",
    ],
    steps: [
      "Heat oil in a pot and sauté onions, garlic, and ginger.",
      "Add chicken and brown on all sides.",
      "Stir in curry powder, tomatoes, and coconut milk.",
      "Simmer for 25 minutes, adding spinach towards the end.",
      "Garnish with cilantro and serve with rice.",
    ],
    prepTime: 35,
  },
};

let currentRecipeKey = "";
let countdownTime;
let countdownInterval;

document.addEventListener("DOMContentLoaded", function() {
    const recipeCards = document.querySelectorAll('.recipe-grid .recipe-card');
  
    const observerOptions = {
      root: null, // Use the viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the card is visible
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(recipeCards).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`; // Add staggered delay
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing after it becomes visible
        }
      });
    }, observerOptions);
  
    recipeCards.forEach(card => {
      observer.observe(card);
    });
  });

  
function openPopup(recipeKey) {
  const recipe = recipes[recipeKey];
  currentRecipeKey = recipeKey;

  // Recipe title and description
  document.getElementById("recipeTitle").innerText = recipe.title;
  document.getElementById("recipeDescription").innerText = recipe.description;

  // Ingredients
  const ingredientsList = document.getElementById("ingredientsList");
  ingredientsList.innerHTML = "";
  recipe.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.innerText = ingredient;
    ingredientsList.appendChild(li);
  });

  const stepsList = document.getElementById("cookingStepsList");
  stepsList.innerHTML = "";
  recipe.steps.forEach((step) => {
    const li = document.createElement("li");
    li.innerText = step;
    stepsList.appendChild(li);
  });

  document.getElementById("popupBg").style.display = "block";
}

function closePopup() {
  clearInterval(countdownInterval);
  const countdownElement = document.getElementById("countdownTimer");
  countdownElement.style.visibility = "hidden";
  const popup = document.getElementById("popupBg");
  popup.style.display = "none";
}
document.querySelector(".close").addEventListener("click", closePopup);
function startCooking() {
  const recipe = recipes[currentRecipeKey];

  if (!recipe) {
    alert("Recipe not found!");
    return;
  }

  const prepTime = recipe.prepTime;

  countdownTime = prepTime * 60; // Convert minutes to seconds
  const countdownElement = document.getElementById("countdownTimer");

  // Show the timer when starting
  countdownElement.style.visibility = "visible";

  clearInterval(countdownInterval); // Clear any existing countdown

  countdownInterval = setInterval(() => {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    countdownElement.innerText = `Time left: ${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;

    if (countdownTime < 600) {
      countdownElement.style.color = "red";
    } else {
      countdownElement.style.color = "";
    }

    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      countdownElement.innerText = "Time's up!";
      alert("Cooking time is up!");
      countdownElement.style.color = "";

      countdownElement.style.visibility = "hidden";
    }

    countdownTime--;
  }, 1000); // Update the timer every second
}
