import { useState } from 'react';
import API from '@/apis/Api';

export const useWorldCases = () => {
  const [worldCases, setWorldCases] = useState({
    totalCase: 0,
    totalRecovered: 0,
    totalDeaths: 0,
    todayCase: 0,
    todayRecovered: 0,
    todayDeaths: 0,
    lastUpdate: undefined,
    isLoading: false,
  });
  const fetchWorldCases = async () => {
    try {
      setWorldCases((prev) => ({ ...prev, isLoading: true }));
      const res = await API.getWorldCases();
      const dataGlobal = res.data;
      setWorldCases({
        totalCase: dataGlobal.cases,
        totalRecovered: dataGlobal.recovered,
        totalDeaths: dataGlobal.deaths,
        todayCase: dataGlobal.todayCases,
        todayRecovered: dataGlobal.todayRecovered,
        todayDeaths: dataGlobal.todayDeaths,
        lastUpdate: dataGlobal.updated,
        isLoading: false,
      });
    } catch (_) {
      setWorldCases((prev) => ({ ...prev, isLoading: false }));
    }
  };
  return { fetchWorldCases, worldCases };
};

export const useChartGlobal = () => {
  const [chartGlobal, setChartGlobal] = useState({
    cases: [],
    recovered: [],
    deaths: [],
    keyChart: [],
    isLoading: false,
  });
  const fetchChartGlobal = async () => {
    try {
      setChartGlobal((prev) => ({ ...prev, isLoading: true }));
      const res = await API.getChartGlobal();
      const chartGlobal = res.data;
      const keyChart: any = Object.keys(chartGlobal.cases).map(
        (key) => new Date(key),
      );
      const resultCase: any = Object.keys(chartGlobal.cases).map(
        (key) => chartGlobal.cases[key],
      );
      const resultRecovered: any = Object.keys(chartGlobal.recovered).map(
        (key) => chartGlobal.recovered[key],
      );
      const resultDeaths: any = Object.keys(chartGlobal.deaths).map(
        (key) => chartGlobal.deaths[key],
      );
      setChartGlobal({
        cases: resultCase,
        recovered: resultRecovered,
        deaths: resultDeaths,
        keyChart: keyChart,
        isLoading: false,
      });
    } catch (_) {
      setChartGlobal((prev) => ({ ...prev, isLoading: false }));
    }
  };
  return { fetchChartGlobal, chartGlobal };
};

export const useChartCountry = (iso: string) => {
  const [chartCountry, setChartCountry] = useState({
    cases: [],
    recovered: [],
    deaths: [],
    keyChart: [],
    isLoading: false,
    country: undefined,
  });
  const fetchChartCountry = async () => {
    setChartCountry((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await API.getChartCountry(iso);
      const chartGlobal: any = res.data.timeline;
      const keyChart: any = Object.keys(chartGlobal.cases).map(
        (key) => new Date(key),
      );
      const resultCase: any = Object.keys(chartGlobal.cases).map(
        (key) => chartGlobal.cases[key],
      );
      const resultRecovered: any = Object.keys(chartGlobal.recovered).map(
        (key) => chartGlobal.recovered[key],
      );
      const resultDeaths: any = Object.keys(chartGlobal.deaths).map(
        (key) => chartGlobal.deaths[key],
      );

      setChartCountry({
        cases: resultCase,
        recovered: resultRecovered,
        deaths: resultDeaths,
        keyChart: keyChart,
        isLoading: false,
        country: res.data.country,
      });
    } catch (_) {
      setChartCountry((prev) => ({ ...prev, isLoading: false }));
    }
  };
  return { fetchChartCountry, chartCountry };
};

export const useDetailCountry = (iso: string) => {
  const [detailCountry, setDetailCountry] = useState({
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
  });
  const fetchDetailCountry = async () => {
    try {
      setDetailCountry((prev) => ({ ...prev, isLoading: true }));
      const res = await API.getDetailCountry(iso);
      const detail = res.data;
      setDetailCountry({
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
      });
    } catch (_) {
      setDetailCountry((prev) => ({ ...prev, isLoading: false }));
    }
  };
  return { fetchDetailCountry, detailCountry };
};

export const useDataCountry = () => {
  const [dataCountry, setDataCountry] = useState({
    countries: [],
    isLoading: false,
  });
  const fetchDataCountry = async () => {
    try {
      setDataCountry((prev) => ({ ...prev, isLoading: true }));
      const res = await API.getAllNameCountries();
      const resposeCountry = res.data.countries;
      const newReponse: any = [];
      resposeCountry.map((item: any) => newReponse.push({
        name: item.name,
        value: item.iso2,
      }));
      setDataCountry({
        countries: newReponse,
        isLoading: false,
      });
    } catch (_) {
      setDataCountry((prev) => ({ ...prev, isLoading: false }));
    }
  };
  return { fetchDataCountry, dataCountry };
};

export const useAllDataCountries = () => {
  const [allDataCountries, setAllDataCountries] = useState({
    dataCountries: [],
    cpDataCountries: [],
    isLoading: false,
  });
  const fetchAllDataCountries = async () => {
    setAllDataCountries((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await API.getListCountries();
      const { data } = res;
      setAllDataCountries({
        dataCountries: data,
        cpDataCountries: data,
        isLoading: false,
      });
    } catch (_) {
      setAllDataCountries((prev) => ({ ...prev, isLoading: false }));
    }
  };
  return { fetchAllDataCountries, allDataCountries };
};

export const useDataProv = () => {
  const [dataProv, setDataProv] = useState({
    allProv: [],
    cpAllProv: [],
    isLoading: false,
  });
  const fetchDataProv = async () => {
    try {
      setDataProv((prev) => ({ ...prev, isLoading: true }));
      const res = await API.getProvinsiId();
      setDataProv({
        allProv: res.data,
        cpAllProv: res.data,
        isLoading: false,
      });
    } catch (_) {
      setDataProv((prev) => ({ ...prev, isLoading: false }));
    }
  };
  return { fetchDataProv, dataProv };
};
