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

const breakdownChemical = (recipes: Map<string, any>, target = 1) => {
  let requirements = Map({
    ORE: 0,
    FUEL: target,
  });
  List(recipes.keys()).forEach(key => {
    requirements = requirements.update(key, v => v || 0);
  });

  while (requirements.find((value, key) => value > 0 && key !== "ORE")) {
    const chemical = requirements.findKey((value, key) => value > 0 && key !== "ORE");
    const ingredients = recipes.get(chemical);
    const numberOfReactions = Math.ceil(requirements.get(chemical) / parseInt(ingredients.get("count"), 10));

    ingredients.get("requirements").forEach(requirement => {
      requirements = requirements.update(requirement.get("chemical"), v => v + numberOfReactions * parseInt(requirement.get("count"), 10));
    });
    requirements = requirements.update(chemical, value => value - numberOfReactions * parseInt(ingredients.get("count"), 10));
  }
  return requirements.get("ORE");
};

const search = (recipes: Map<string, any>, target: number, min: number, max: number): number => {
  if (max - min === 1) {
    return breakdownChemical(recipes, min) ? min : max;
  }
  const count = breakdownChemical(recipes, Math.round((min + max) / 2));
  if (count < target) {
    return search(recipes, target, Math.round((min + max) / 2), max);
  }
  return search(recipes, target, min, Math.round((min + max) / 2));
};

export {
  parser,
  breakdownChemical,
  search,
};
