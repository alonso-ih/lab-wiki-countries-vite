import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container" style={{ maxHeight: "90vh", overflow: "scroll" }}>
      <h1 style={{ fontSize: "24px" }}>
        WikiCountries: Your Guide to the World
      </h1>

      <div className="list-group">
        {countries.map((country) => {
          const flagUrl = `https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`;

          return (
            <Link
              className="list-group-item list-group-item-action"
              key={country.alpha3Code}
              to={`/${country.alpha3Code}`}
            >
              <img
                alt={`${country.name.common} flag`}
                className="me-2"
                src={flagUrl}
                style={{ width: "24px" }}
              />
              {country.name.common}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
