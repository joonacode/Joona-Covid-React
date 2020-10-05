// import Axios from 'axios'
import React, { Component } from 'react'
import { MainCard, MainChart, MainFooter, MainHeader } from '../components'
import SelectSearch from 'react-select-search'
import './App.css'
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
      cases: 0,
      deaths: 0,
      recovered: 0,
      isLoading: false,
      lastUpdate: null,
    },
    dataCountry: {
      countries: [],
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
      }?lastdays=30`,
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
      }?yesterday=true&strict=true&query`,
    )
      .then((response) => {
        const detail = response.data
        this.setState({
          detailCountry: {
            flag: detail.countryInfo.flag,
            cases: detail.cases,
            deaths: detail.deaths,
            recovered: detail.recovered,
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

  handleChangeCountry(e) {
    this.fetchChartCountry(e)
    this.fetchDetailCountry(e)
  }

  componentDidMount() {
    this.fetchWorldCases()
    this.fetchChartGlobal()
    this.fetchChartCountry()
    this.fetchAllCountries()
    this.fetchDetailCountry()
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
            <div className='col-md-8 mb-4'>
              <MainChart
                cases={this.state.chartGlobal.cases}
                recovered={this.state.chartGlobal.recovered}
                deaths={this.state.chartGlobal.deaths}
                keyChart={this.state.chartGlobal.keyChart}
                isLoading={this.state.chartGlobal.isLoading}
                title='Data Global'
              />
            </div>
            <div className='col-md-4 mb-4'>
              <div className='row'>
                <div className='col-md-12 mb-3'>
                  <MainCard
                    title='Statistik Global'
                    isLoading={this.state.worldCases.isLoading}
                    cases={this.state.worldCases.totalCase}
                    recovered={this.state.worldCases.totalRecovered}
                    deaths={this.state.worldCases.totalDeaths}
                  />
                </div>
                <div className='col-md-12'>
                  <MainCard
                    title='Statistik Hari Ini Global'
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
            <div className='col-md-8 mb-4'>
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
            <div className='col-md-4 mb-4'>
              <MainCard
                title='Ringkasan Country'
                isLoading={this.state.detailCountry.isLoading}
                cases={this.state.detailCountry.cases}
                recovered={this.state.detailCountry.recovered}
                deaths={this.state.detailCountry.deaths}
              />
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    )
  }
}

export default App
