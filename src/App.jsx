import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import Header from "./components/Header";
import Loading from "./components/Loading";
import "./App.css"
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

const App = () => {
  const [location, setLocation] = useState({ lat: null, long: null });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await getCurrentPosition();
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location.lat !== null && location.long !== null) {
        try {
          setLoading(true);
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/weather/?lat=${location.lat}&lon=${location.long}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
          );
          const result = await response.json();
          setData(result);
          
        } catch (error) {
          console.error(error);
         
        }finally{
          setLoading(false)
        }
      }
    };

    fetchWeather();
  }, [location]);

  const getWeather = async (city) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      );
      const data = await response.json();
      setData(data);
      
    } catch (error) {
      console.error(error);
      
    }finally{
      setLoading(false)
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  return (
    <div className="App">
      <Header getWeather={getWeather} />
      {loading ? (
        <Loading/>
      ) : data && data.main ? (
        <Weather weatherData={data} />
      ) : (
        <NotFound/>
      )}
      <Footer/>
    </div>
  );
};

export default App;
