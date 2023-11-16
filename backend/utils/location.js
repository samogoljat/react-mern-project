#!/usr/bin/env node
require('dotenv').config();
const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = process.env.API_KEY;
console.log(API_KEY)

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  console.log(data)


  if (!data || data.status === "ZERO_RESULTS" || !Array.isArray(data.results) || data.results.length === 0) {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;

