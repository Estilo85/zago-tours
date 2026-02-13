import countries from 'world-countries';

export const getCountryOptions = () => {
  const countryOptions = countries.map(country => ({
    value: country.cca2, // ISO code: US, GB, CA, etc.
    label: country.name.common, 
  }));

  return countryOptions.sort((a, b) => a.label.localeCompare(b.label));
};

export const getCountries = () => {
  return countries.sort((a, b) => 
    a.name.common.localeCompare(b.name.common)
  );
};



// 'use client';

// import { getCountryOptions } from '@/utils/countries';
// // ... other imports

// export const YourComponent = () => {
//   const countryOptions = getCountryOptions();

//   return (
//     <Select placeholder="Select country">
//       {countryOptions.map((country) => (
//         <option key={country.value} value={country.value}>
//           {country.label}
//         </option>
//       ))}
//     </Select>
//   );
// };