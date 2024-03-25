"use server";

import axios from "axios";

export async function fetchMenus() {
  try {
    const response = await axios.get(`${process.env.API_HOST}/menus`);
    return response.data;
  } catch (error) {
    console.error("There is a problem fetching menus", error);
  }
}