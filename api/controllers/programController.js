// This module allows me to make frontend fetches from my backend.
const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const getAllPrograms = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs?${json}&${paginationFalse}`
  );
  programs = await programs.json();
  res.json(programs);
};

const getAllProgramCategories = async (req, res) => {
    let categories = await fetch(
        `http://api.sr.se/api/v2/programcategories?${json}` 
    )
    categories = await categories.json();
    res.json(categories);
}


module.exports = {
  getAllPrograms,
  getAllProgramCategories
};