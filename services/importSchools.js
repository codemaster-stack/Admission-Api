const axios = require("axios");
const School = require("../models/School");

const countries = [

    "Germany",
    "Canada",
    "United States",
    "United Kingdom",
    "France",
    "Portugal",
    "Cyprus",
    "Australia",
    "Ireland",
    "Netherlands",
    "Italy",
    "Spain",
    "Malta",
    "Sweden",
    "Norway",
    "Finland",
    "Austria",
    "Switzerland",
    "Belgium",
    "Denmark",

    "Nigeria",
    "Ghana",
    "Kenya",
    "South Africa"

];

async function importSchools() {

    let totalImported = 0;

    for (const country of countries) {

        console.log(`Importing ${country}...`);

        try {

            const response = await axios.get(

                `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`

            );

            const schools = response.data;

            for (const school of schools) {

                const exists = await School.findOne({

                    name: school.name,

                    country: school.country

                });

                if (exists) continue;

                await School.create({

                    name: school.name,

                    country: school.country,

                    countryCode: school.alpha_two_code,

                    website: school.web_pages[0],

                    domains: school.domains,

                    type: "University"

                });

                totalImported++;

            }

            console.log(`${country}: ${schools.length} schools`);

        }

       catch (err) {

    console.log(`❌ ${country}`);

    console.log(err.response?.data || err.message);

}

    }

    return {

        success: true,

        imported: totalImported

    };

}

module.exports = importSchools;