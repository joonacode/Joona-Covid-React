import React, { Component } from 'react'
import {
  MainCard,
  MainChart,
  MainFooter,
  MainHeader,
  Spinner,
  TableCountry,
  TableProv,
} from '../components'
import SelectSearch from 'react-select-search'
import './App.css'
import Moment from 'react-moment'
import Axios from 'axios'
class App extends Component {
  state = {
    worldCases: {
      totalCase: 0,
      totalRecovered: 0,
      totalDeaths: 0,
      todayCase: 0,
      todayRecovered: 0,
      todayDeaths: 0,
      lastUpdate: null,
      isLoading: false,
    },
    chartGlobal: {
      cases: [],
      recovered: [],
      deaths: [],
      keyChart: [],
      isLoading: false,
    },
    chartCountry: {
      cases: [],
      recovered: [],
      deaths: [],
      keyChart: [],
      isLoading: false,
      country: null,
    },
    detailCountry: {
      flag: null,
      countryName: null,
      totalCases: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      todayCases: 0,
      todayDeaths: 0,
      todayRecovered: 0,
      isLoading: false,
      lastUpdate: null,
    },
    dataCountry: {
      countries: [],
      isLoading: false,
    },
    allDataCountries: {
      dataCountries: [],
      cpDataCountries: [],
      isLoading: false,
    },
    dataProv: {
      allProv: [],
      cpAllProv: [],
      isLoading: false,
    },
  }

  fetchWorldCases() {
    this.setState({
      worldCases: { isLoading: true },
    })
    Axios.get('https://corona.lmao.ninja/v2/all')
      .then((response) => {
        const dataGlobal = response.data
        this.setState({
          worldCases: {
            totalCase: dataGlobal.cases,
            totalRecovered: dataGlobal.recovered,
            totalDeaths: dataGlobal.deaths,
            todayCase: dataGlobal.todayCases,
            todayRecovered: dataGlobal.todayRecovered,
            todayDeaths: dataGlobal.todayDeaths,
            lastUpdate: dataGlobal.updated,
            isLoading: false,
          },
        })
      })
      .catch((err) => {
        this.setState({
          worldCases: { isLoading: false },
        })
        console.log(err.response)
      })
  }
  fetchAllDataCountries() {
    this.setState({
      allDataCountries: { isLoading: true },
    })
    Axios.get('https://corona.lmao.ninja/v2/countries?yesterday&sort')
      .then((response) => {
        const data = response.data
        this.setState({
          allDataCountries: {
            dataCountries: data,
            cpDataCountries: data,
            isLoading: false,
          },
        })
      })
      .catch((err) => {
        this.setState({
          allDataCountries: { isLoading: false },
        })
        console.log(err.response)
      })
  }
  fetchChartGlobal() {
    this.setState({
      chartGlobal: {
        isLoading: true,
      },
    })
    Axios.get('https://corona.lmao.ninja/v2/historical/all')
      .then((response) => {
        const chartGlobal = response.data
        const keyChart = Object.keys(chartGlobal.cases).map(
          (key) => new Date(key),
        )
        const resultCase = Object.keys(chartGlobal.cases).map(
          (key) => chartGlobal.cases[key],
        )
        const resultRecovered = Object.keys(chartGlobal.recovered).map(
          (key) => chartGlobal.recovered[key],
        )
        const resultDeaths = Object.keys(chartGlobal.deaths).map(
          (key) => chartGlobal.deaths[key],
        )
        this.setState({
          chartGlobal: {
            cases: resultCase,
            recovered: resultRecovered,
            deaths: resultDeaths,
            keyChart: keyChart,
            isLoading: false,
          },
        })
      })
      .catch((err) => {
        this.setState({
          chartGlobal: {
            isLoading: false,
          },
        })
        console.log(err.response)
      })
  }
  fetchChartCountry(iso) {
    this.setState({
      chartCountry: {
        isLoading: true,
      },
    })
    Axios.get(
      `https://corona.lmao.ninja/v2/historical/${
        iso ? iso : 'indonesia'
      }?lastdays=all`,
    )
      .then((response) => {
        const chartGlobal = response.data.timeline
        const keyChart = Object.keys(chartGlobal.cases).map(
          (key) => new Date(key),
        )
        const resultCase = Object.keys(chartGlobal.cases).map(
          (key) => chartGlobal.cases[key],
        )
        const resultRecovered = Object.keys(chartGlobal.recovered).map(
          (key) => chartGlobal.recovered[key],
        )
        const resultDeaths = Object.keys(chartGlobal.deaths).map(
          (key) => chartGlobal.deaths[key],
        )
        this.setState({
          chartCountry: {
            cases: resultCase,
            recovered: resultRecovered,
            deaths: resultDeaths,
            keyChart: keyChart,
            isLoading: false,
            country: response.data.country,
          },
        })
      })
      .catch((err) => {
        this.setState({
          chartCountry: {
            isLoading: false,
          },
        })
        console.log(err.response)
      })
  }
  fetchDetailCountry(iso) {
    this.setState({
      detailCountry: {
        isLoading: true,
      },
    })
    Axios.get(
      `https://corona.lmao.ninja/v2/countries/${
        iso ? iso : 'ID'
      }?yesterday=false&strict=true&query`,
    )
      .then((response) => {
        const detail = response.data
        this.setState({
          detailCountry: {
            flag: detail.countryInfo.flag,
            countryName: detail.country,
            totalCases: detail.cases,
            totalDeaths: detail.deaths,
            totalRecovered: detail.recovered,
            todayCases: detail.todayCases,
            todayDeaths: detail.todayDeaths,
            todayRecovered: detail.todayRecovered,
            lastUpdate: detail.updated,
            isLoading: false,
          },
        })
      })
      .catch((err) => {
        this.setState({
          detailCountry: {
            isLoading: false,
          },
        })
        console.log(err.response)
      })
  }
  fetchAllCountries() {
    this.setState({
      dataCountry: {
        isLoading: true,
      },
    })
    Axios.get('https://covid19.mathdro.id/api/countries')
      .then((response) => {
        const resposeCountry = response.data.countries
        const newReponse = []
        resposeCountry.map((item) => {
          return newReponse.push({
            name: item.name,
            value: item.iso2,
          })
        })
        this.setState({
          dataCountry: {
            countries: newReponse,
            isLoading: false,
          },
        })
      })
      .catch((err) => {
        this.setState({
          dataCountry: {
            countries: [],
            isLoading: false,
          },
        })
        console.log(err.response)
      })
  }
  fetchProvinsiId() {
    this.setState({
      dataProv: {
        isLoading: true,
      },
    })
    Axios.get(
      'https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi',
    )
      .then((response) => {
        this.setState({
          dataProv: {
            allProv: response.data,
            cpAllProv: response.data,
            isLoading: false,
          },
        })
      })
      .catch((err) => {
        this.setState({
          dataProv: {
            isLoading: false,
          },
        })
        console.log(err.response)
      })
  }

  handleChangeCountry(e) {
    this.fetchChartCountry(e)
    this.fetchDetailCountry(e)
  }
  handleSearchCountries(e) {
    const valueSearch = e.target.value.toLowerCase()
    if (!valueSearch) {
      const backup = this.state.allDataCountries.cpDataCountries
      this.setState({
        allDataCountries: {
          ...this.state.allDataCountries,
          dataCountries: backup,
        },
      })
    } else {
      const resultSearch = this.state.allDataCountries.cpDataCountries.filter(
        (item) => item.country.toLowerCase().match(valueSearch),
      )
      this.setState({
        allDataCountries: {
          ...this.state.allDataCountries,
          dataCountries: resultSearch,
        },
      })
    }
  }
  handleSearchProvincies(e) {
    const valueSearch = e.target.value.toLowerCase()
    if (!valueSearch) {
      const backup = this.state.dataProv.cpAllProv
      this.setState({
        dataProv: {
          ...this.state.dataProv,
          allProv: backup,
        },
      })
    } else {
      const resultSearch = this.state.dataProv.cpAllProv.filter((item) =>
        item.provinsi.toLowerCase().match(valueSearch),
      )
      this.setState({
        dataProv: {
          ...this.state.dataProv,
          allProv: resultSearch,
        },
      })
    }
  }

  componentDidMount() {
    this.fetchWorldCases()
    this.fetchChartGlobal()
    this.fetchChartCountry()
    this.fetchAllCountries()
    this.fetchDetailCountry()
    this.fetchAllDataCountries()
    this.fetchProvinsiId()
  }

  render() {
    return (
      <div className='App'>
        <MainHeader
          isLoading={this.state.worldCases.isLoading}
          totalCase={this.state.worldCases.totalCase}
          recovered={this.state.worldCases.totalRecovered}
          death={this.state.worldCases.totalDeaths}
          lastUpdate={this.state.worldCases.lastUpdate}
        />
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-lg-8 col-md-12 mb-4'>
              <MainChart
                cases={this.state.chartGlobal.cases}
                recovered={this.state.chartGlobal.recovered}
                deaths={this.state.chartGlobal.deaths}
                keyChart={this.state.chartGlobal.keyChart}
                isLoading={this.state.chartGlobal.isLoading}
                title='Data Global'
              />
            </div>
            <div className='col-lg-4 col-md-12 mb-4'>
              <p className='text-semi'>
                Terakhir diperbarui:{' '}
                <span className='text-danger font-weight-bold'>
                  {this.state.chartGlobal.isLoading ? (
                    '....'
                  ) : (
                    <Moment format='DD MMM YYYY hh:mm'>
                      {this.state.worldCases.lastUpdate}
                    </Moment>
                  )}
                </span>
              </p>
              <div className='row'>
                <div className='col-md-12 mb-3'>
                  <MainCard
                    isTotal
                    title='Statistik Total - Dunia'
                    isLoading={this.state.worldCases.isLoading}
                    cases={this.state.worldCases.totalCase}
                    recovered={this.state.worldCases.totalRecovered}
                    deaths={this.state.worldCases.totalDeaths}
                  />
                </div>
                <div className='col-md-12'>
                  <MainCard
                    title='Statistik Hari Ini - Dunia'
                    isLoading={this.state.worldCases.isLoading}
                    cases={this.state.worldCases.todayCase}
                    recovered={this.state.worldCases.todayRecovered}
                    deaths={this.state.worldCases.todayDeaths}
                  />
                </div>
              </div>
            </div>
            <div className='col-md-12 mt-3 mb-4 border-top pt-4'>
              <h4 className='text-semi'> Statistik Berdasarkan Negara </h4>
            </div>
            <div className='col-lg-8 col-md-12 mb-4'>
              {this.state.dataCountry.isLoading ? (
                'Loading...'
              ) : (
                <div className='mb-3'>
                  <SelectSearch
                    onChange={(e) => this.handleChangeCountry(e)}
                    options={this.state.dataCountry.countries}
                    name='country'
                    search
                    placeholder='Pilih Negara'
                  />
                </div>
              )}
              <MainChart
                cases={this.state.chartCountry.cases}
                recovered={this.state.chartCountry.recovered}
                deaths={this.state.chartCountry.deaths}
                keyChart={this.state.chartCountry.keyChart}
                isLoading={this.state.chartCountry.isLoading}
                title={this.state.chartCountry.country}
              />
            </div>
            <div className='col-lg-4 col-md-12 mb-4'>
              <div className='row'>
                <div className='col-md-12 mb-3'>
                  <p className='text-semi'>
                    Terakhir diperbarui:{' '}
                    <span className='text-danger font-weight-bold'>
                      {this.state.detailCountry.isLoading ? (
                        '....'
                      ) : (
                        <Moment format='DD MMM YYYY hh:mm'>
                          {this.state.detailCountry.lastUpdate}
                        </Moment>
                      )}
                    </span>
                  </p>
                  <MainCard
                    isTotal
                    title={`Statistik Total - ${this.state.detailCountry.countryName}`}
                    isLoading={this.state.detailCountry.isLoading}
                    cases={this.state.detailCountry.totalCases}
                    recovered={this.state.detailCountry.totalRecovered}
                    deaths={this.state.detailCountry.totalDeaths}
                  />
                </div>
                <div className='col-md-12'>
                  <MainCard
                    title={`Statistik Hari Ini - ${this.state.detailCountry.countryName}`}
                    isLoading={this.state.detailCountry.isLoading}
                    cases={this.state.detailCountry.todayCases}
                    recovered={this.state.detailCountry.todayRecovered}
                    deaths={this.state.detailCountry.todayDeaths}
                  />
                </div>
              </div>
            </div>
            <div className='col-md-12 mt-4 shadow-sm py-3'>
              <h5 className='text-semi mb-3'>Kasus di provinsi Indonesia</h5>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Cari berdasarkan nama provinsi...'
                  className='form-control'
                  onChange={(e) => this.handleSearchProvincies(e)}
                />
              </div>
              {this.state.dataProv.isLoading ? (
                <div className='py-5'>
                  <Spinner />
                </div>
              ) : (
                <TableProv
                  provincies={this.state.dataProv.allProv}
                  isLoading={this.state.dataProv.isLoading}
                />
              )}
            </div>
            <div className='col-md-12 mt-5 shadow-sm py-3'>
              <h5 className='text-semi mb-3'>List negara terdampak covid-19</h5>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Cari berdasarkan nama negara...'
                  className='form-control'
                  onChange={(e) => this.handleSearchCountries(e)}
                />
              </div>
              {this.state.allDataCountries.isLoading ? (
                <div className='py-5'>
                  <Spinner />
                </div>
              ) : (
                <TableCountry
                  countries={this.state.allDataCountries.dataCountries}
                  isLoading={this.state.allDataCountries.isLoading}
                />
              )}
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    )
  }
}

export default App
