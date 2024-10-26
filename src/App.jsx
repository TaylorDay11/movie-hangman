import React from "react"
import Hangman from "./components/Hangman.jsx"
import './App.css'

export default function App() {

  const [data, setData] = React.useState(null);  // To store the API data
  const [loading, setLoading] = React.useState(true);  // Loading state to track if data is being fetched
  const [error, setError] = React.useState(null);  // Error state in case of an error

  React.useEffect(() => {

    const options = {
      method: 'GET',
      url: '/api/movies'
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/movies');
        console.log(options)
        if (!response.ok) {
          throw new Error('Failed to fetch data. Please try refereshing the page.');
        }
        const result = await response.json();
        setData(result);  // Set the fetched data
        setLoading(false);  // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message);
        setLoading(false);  // Stop loading on error
      }
    };

    fetchData();
  }, []);  // Empty dependency array to ensure the effect runs only once on mount

  // Conditionally render based on loading state
  if (loading) {
    return <div className="loading-page"><h1>Loading...</h1></div>;  // Show loading indicator while fetching
  }

  if (error) {
    return <div className="error-page"><h1>Error: {error}</h1></div>;  // Show error message if fetching fails
  }

  // Render the component content once the data has been fetched
  return (
    <div>
      <Hangman data={data} />
    </div>
  );
}
