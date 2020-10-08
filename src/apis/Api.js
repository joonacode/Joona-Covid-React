import Axios from 'axios'

const BASE_NINJA = 'https://corona.lmao.ninja/v2'

const API = {
  getWorldCases: () => {
    return Axios.get(`${BASE_NINJA}/all`)
  },
  getListCountries: () => {
    return Axios.get(`${BASE_NINJA}/countries?yesterday&sort`)
  },
  getChartGlobal: () => {
    return Axios.get(`${BASE_NINJA}/historical/all`)
  },
  getChartCountry: (iso) => {
    return Axios.get(`${BASE_NINJA}/historical/${
      iso ? iso : 'indonesia'
    }?lastdays=all`)
  },
  getDetailCountry: (iso) => {
    return Axios.get(`${BASE_NINJA}/countries/${
      iso ? iso : 'ID'
    }?yesterday=false&strict=true&query`)
  },
  getAllNameCountries: () => {
    return Axios.get('https://covid19.mathdro.id/api/countries')
  },
  getProvinsiId: () => {
    return Axios.get('https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi')
  },

}

export default API