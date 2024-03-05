import { FLOW_JSON, API_ROOT } from "../lib/endpoints";
import { httpClient } from "./client";

/**
 * Fetches data from the API endpoint.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @returns {Promise} - A Promise that resolves to the fetched data or null if an error occurs.
 */
const fetchData = async (endpoint: any) => {
  try {
    const res = await fetch(`${endpoint}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for ${endpoint}:`, error); // eslint-disable-line no-console
    return null;
  }
};

/**
 * Object containing methods to fetch data from the API.
 * @typedef {Object} apiService
 * @property {Function} getChatDefaultMessages - Fetches the default chat messages.
 * @property {Function} postConversation - Posts a conversation to the API.
 * 
 * @example
 * const chatDefaultMessages = await apiService.getChatDefaultMessages();
 */
const apiService = {
  getChatDefaultMessages: async () => fetchData(FLOW_JSON),

  postConversation: async (conversation: any) => {
    return httpClient.put(`${API_ROOT}/conversation`, conversation);
  }
};

export default apiService;