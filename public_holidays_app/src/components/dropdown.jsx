import { useEffect, useState } from "react";

const Dropdown = () => {
    const [countries, setCountries] = useState([]);
    const[holidays, setHolidays] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch("https://openholidaysapi.org/Countries");
            const data = await response.json();
            const countryNames = data.map((country) => ({
                name: country.name[0].text,
                isoCode: country.isoCode
            }));
            setCountries(countryNames); // ✅ Corrected this line
        };

        fetchCountries();
    }, []);
   
    function handleChange(event) {
        const selectedCountry = event.target.value;
        console.log(selectedCountry);
        const fetchHoiliday = async () => {
            const response = await fetch("https://openholidaysapi.org/PublicHolidays?countryIsoCode="+selectedCountry+"&languageIsoCode=EN&validFrom=2025-01-01&validTo=2025-12-31");
            const data = await response.json();
            console.log(data);
            const holidaysList = data.map((holiday) => ({
                holidayDatae:holiday.endDate ,
                holidayTitle:holiday.name[0].text
            }));
            setHolidays(holidaysList); // ✅ Corrected this line
        };
        fetchHoiliday();
    }


    return (
        <div>
            <label htmlFor="countries">Choose a Country:  </label>
            <select name="countries" id="countries" onChange={(e) => handleChange(e)}>
                {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                    </option>
                ))}
            </select>
            {holidays.length > 0 && (
                <div>
                    <h2>Holidays List:</h2>
                    <ul>
                        {holidays.map((holiday, index) => (
                            <li key={index}>
                                {holiday.holidayTitle} - {holiday.holidayDatae}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        
    );
};

export default Dropdown;            

