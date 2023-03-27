import Axios from 'axios';

const BASE_NINJA = 'https://corona.lmao.ninja/v2';

const API = {
  getWorldCases: () => Axios.get(`${BASE_NINJA}/all`),
  getListCountries: () => Axios.get(`${BASE_NINJA}/countries?yesterday&sort`),
  getChartGlobal: () => Axios.get(`${BASE_NINJA}/historical/all`),
  getChartCountry: (iso: string) => Axios.get(`${BASE_NINJA}/historical/${iso || 'indonesia'}?lastdays=all`),
  getDetailCountry: (iso: string) => Axios.get(`${BASE_NINJA}/countries/${iso || 'ID'}?yesterday=false&strict=true&query`),
  getAllNameCountries: () => Axios.get('https://covid19.mathdro.id/api/countries'),
  getProvinsiId: () => Axios.get('https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi'),
};

export default API;
