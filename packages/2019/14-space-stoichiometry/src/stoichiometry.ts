/* eslint-disable no-loop-func */
import { List, Map } from "immutable";
import { promises as fs } from "fs";

const parseIngredients = (s: string): List<Map<string, string>> => {
  const ingredients = List(s.split(", "));
  return ingredients.map(ingredient => {
    const [, count, chemical] = ingredient.match(/(.*) (.*)/);
    return Map({ count, chemical });
  });
};

const parser = async (file: string): Promise<Map<any, any>> => {
  const buffer: Buffer = await fs.readFile(file);
  const recipesL: List<string> = List(buffer.toString().split("\n"));

  let recipes = Map();
  recipesL.forEach(recipe => {
    const [, ingredients, count, product] = recipe.match(/(.*) => (.*) (.*)/);
    recipes = recipes.set(product, Map({ count, requirements: parseIngredients(ingredients) }));
  });
  return recipes;
};

let requirements = Map({
  ORE: 0,
  FUEL: 1,
});

const generateRequirements = (recipes: Map<string, any>) => {
  List(recipes.keys()).forEach(key => {
    requirements = requirements.update(key, v => v || 0);
  });
};


const breakdownChemical = (recipes: Map<string, any>) => {
  generateRequirements(recipes);
  for (let _ = 0; _ < 10000; _++) {
    if (requirements.filter((value, key) => value > 0 && key !== "ORE").size === 0) break;
    const k = requirements.findKey((value, key) => value > 0 && key !== "ORE");
    const ingredients = recipes.get(k);
    const numberOfReactions = Math.ceil(requirements.get(k) / parseInt(ingredients.get("count"), 10));

    const r = ingredients.get("requirements");
    r.forEach(requirement => {
      requirements = requirements.update(requirement.get("chemical"), v => v + numberOfReactions * parseInt(requirement.get("count"), 10));
    });
    requirements = requirements.update(k, v => v - numberOfReactions * parseInt(ingredients.get("count"), 10));
  }
  return requirements.get("ORE");
};

const countChemicals = (chemicals, chemical): number => {
  return chemicals.filter(chem => chem.get("chemical") === chemical)
    .map(chem => parseInt(chem.get("count"), 10))
    .reduce((x, y) => x + y);
};

const breakdownChemical1 = (recipes: Map<string, any>) => {
  let chemicals = List.of(Map({ chemical: "FUEL", count: "1" }));
  for (let _ = 0; _ < 100; _ += 1) {
    const first: Map<string, string> = chemicals.first();
    if (first.get("chemical") !== "ORE") {
      const amountRequired = parseInt(first.get("count"), 10) / parseInt(recipes.get(first.get("chemical")).get("count"), 10);
      const requirements = recipes.get(first.get("chemical")).get("requirements");
      for (let _ = 0; _ < amountRequired; _ += 1) {
        chemicals = chemicals.concat(requirements);
      }
      chemicals = chemicals.shift();
    } else {
      chemicals = chemicals.push(first);
      chemicals = chemicals.shift();
    }
  }
  return countChemicals(chemicals, "ORE");
};

const search = (recipes: Map<string, any>) => {
  let min = 1000000;
  let max = 1900000000;
  while (max - min > 1) {
    requirements = Map({
      ORE: 0,
      FUEL: Math.round((min + max) / 2),
    });
    const count = breakdownChemical(recipes);
    if (count < 1000000000000) {
      min = Math.round((min + max) / 2);
    } else {
      max = Math.round((min + max) / 2);
    }
  }
  requirements = Map({
    ORE: 0,
    FUEL: min,
  });
  return (breakdownChemical(recipes)) ? min : max;
};

export {
  parser,
  breakdownChemical,
  search,
};
