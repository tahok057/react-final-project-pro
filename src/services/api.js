const API_URL = 'https://randomuser.me/api/?results=10&seed=';

export const searchEmployees = async (company) => {
  try {
    const response = await fetch(`${API_URL}${company}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
