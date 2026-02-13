import countries from 'world-countries';

export const getCountryOptions = () => {
  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  return countryOptions.sort((a, b) => a.label.localeCompare(b.label));
};
