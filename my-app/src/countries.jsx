import { useEffect, useState } from "react";
import "./Cityselector.css";

const Card = ({ name, flag, abbr }) => {
  return (
    <div
      className="countryCard"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        width: "200px",
        border: "0.5px solid black",
        borderRadius: "4px",
        textAlign: "center",
        padding: "10px",
        
      }}
    >
      <img
        src={flag}
        alt={`Flag of ${name}`}
        style={{ height: "100px", width: "100px" }}
      />
      <h2>{name}</h2>
    </div>
  );
};

const API_Endpoint =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

export default function Countries() {
  const [data, setData] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setCountryName(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_Endpoint);
        const remoteData = await response.json();
        setData(remoteData);
        setFilteredData(remoteData);
      } catch (error) {
        console.error("Error fetching data:" + error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selectedCountries = data.filter((eachCountry) =>
      eachCountry.common.toLowerCase().includes(countryName.toLowerCase())
    );
    setFilteredData(selectedCountries);
  }, [countryName]);

  return (
    <div>
      <input type="text" id="nico" onChange={handleChange} />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          paddingLeft: "60px",
        }}
      >
        {filteredData.map(({ common, png }) => (
          <Card name={common} flag={png} key={common} />
        ))}
      </div>
    </div>
  );
}
