import { gql, useQuery } from '@apollo/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      id
      name
      image
      status
    }
  }
`;

function DisplayCharacters() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;
  const handleClick = (id) => {
    console.log(id);
    navigate(`/info/${id}`);
  };

  return data.characters.map(({ id, name, image, status }) => (
    <div key={id} className="card">
      <h3>{name}</h3>
      <img width="250" height="300" alt="location-reference" src={`${image}`} />
      <br />
      <b>Status:</b>
      <p>{status}</p>
      <button
        onClick={() => {
          handleClick(id);
        }}
      >
        More info
      </button>

      <br />
    </div>
  ));
}
export default DisplayCharacters;
