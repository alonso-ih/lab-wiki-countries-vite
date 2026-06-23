import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetailsPage() {
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const { countryId } = useParams();

  useEffect(() => {
    setCountry(null);

    Promise.all([
      axios.get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`),
      axios.get("https://ih-countries-api.herokuapp.com/countries"),
    ])
      .then(([countryResponse, countriesResponse]) => {
        setCountry(countryResponse.data);

        if (Array.isArray(countriesResponse.data)) {
          setCountries(countriesResponse.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [countryId]);

  if (!country) {
    return (
      <div className="container">
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="container">
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>
      <h1>{country.name.common}</h1>

      <table className="table">
        <tbody>
          <tr>
            <td style={{ width: "30%" }}>Capital</td>
            <td>{country.capital && country.capital[0]}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {country.area} km<sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {country.borders &&
                  country.borders.map((border) => {
                    const borderCountry = countries.find(
                      (country) => country.alpha3Code === border
                    );
                    const borderName = borderCountry
                      ? borderCountry.name.common
                      : border;

                    return (
                      <li key={border}>
                        <Link to={`/${border}`}>{borderName}</Link>
                      </li>
                    );
                  })}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetailsPage;
