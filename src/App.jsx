import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import Header from "./components/Header";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [location, setLocation] = useState({ lat: null, long: null });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [geolocationError, setGeolocationError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading when fetching location
        const position = await getCurrentPosition();
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      } catch (error) {
        console.error(error);
        setGeolocationError(true); // Set error state if user denies geolocation
      } finally {
        setLoading(false); // Stop loading regardless of error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location.lat !== null && location.long !== null) {
        try {
          setLoading(true); // Start loading when fetching weather data
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/weather/?lat=${location.lat}&lon=${location.long}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
          );
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Stop loading regardless of error
        }
      }
    };

    fetchWeather();
  }, [location]);

  const getWeather = async (city) => {
    try {
      setLoading(true); // Start loading when fetching weather data
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      );
      const data = await response.json();
      setData(data);
      setLocation({ lat: data.coord.lat, long: data.coord.lon }); // Update location state with coordinates of the searched city
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading regardless of error
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
      { geolocationError ? (
          <NotFound/>
      ) :
      loading ? (
        <Loading />
      ) : data && data.main ? (
        <Weather weatherData={data} />
      ) : (
        <NotFound />
      )}
      <Footer />
    </div>
  );
};

export default App;
