import axiosClient from "./axiosClient";
import { API_BASE_URL } from "../constants";

const landingPageApi = {
  getLandingPageData: () => {
    // Ensure the endpoint is correct
    return axiosClient.get(`${API_BASE_URL}/landingblocks/AllLandingPageData`);
  },
};

export default landingPageApi;
