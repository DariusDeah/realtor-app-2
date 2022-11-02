import { API_KEY, axios, SERVER_API } from "./axios.conif";
import { Homes } from "../models/home";
import { SearchParams } from "../types/searchParams";
import { homeTestData } from "./mock-data";
import { unsplashTestData } from "./unsplash-mockData";

export async function fetchProperties({
  query,
}: { query?: SearchParams } = {}) {
  const res = await axios.get("/propertyExtendedSearch", {
    params: {
      location: (query && query.location) || "santa monica, ca",
      page: query && query.page,
      home_type: query && query.homeType,
      bathsMin: query && query.minBathroom,
      bedsMin: query && query.minBed,
      minPrice: (query && query.minPrice) ?? 100000,
      sort: query && query.sort,
    },
  });

  const homes = JSON.parse(res.data);
  const modifiedHomes: any[] = homes.props.map((home: any) => new Homes(home));
  return modifiedHomes;
}

export async function fetchProperty(homeId: string) {
  const res = await axios.get("/property", {
    params: {
      zpid: homeId,
    },
  });
  return JSON.parse(res.data);
}

export async function fetchFavoriteFavorites() {
  const res = await SERVER_API.get("/favorites", {
    withCredentials: true,
  });
  return res;
}

export async function signup(apiData: any) {
  const res = await SERVER_API.post(`/signup`, JSON.stringify(apiData));
  return res;
}
export async function login(apiData: any) {
  const res = await SERVER_API.post(`/login`, JSON.stringify(apiData));
  return res;
}

export async function fetchGalleryPhotos() {
  const res = await SERVER_API.get("/unsplash-proxy");
  const imgs = JSON.parse(res.data);
  return imgs.data;
}
