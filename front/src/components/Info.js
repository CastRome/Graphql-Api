import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import '../App.css';
import { Link } from 'react-router-dom';
function DisplayCharacterInfo({ id }) {
  const GET_CHARACTER_INFO = gql`
    query GetCharactersInfo {
      
      character(id: ${id}) {
        id
        name
        image
        status
        gender
        url
        created
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_CHARACTER_INFO);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div key={data.character.id} className="card">
      <h3>{data.character.name}</h3>
      <img
        width="250"
        height="300"
        alt="location-reference"
        src={`${data.character.image}`}
      />
      <br />
      <b>Gender:</b>
      <p>{data.character.gender}</p>

      <b>Status:</b>
      <p>{data.character.status}</p>
      <b>Created:</b>
      <p>{data.character.created}</p>
      <b>Link:</b>
      <p>
        <Link>{data.character.url}</Link>
      </p>

      <br />
    </div>
  );
}

const Info = () => {
  let params = useParams();
  return (
    <div className="App">
      <DisplayCharacterInfo id={params.id} />{' '}
    </div>
  );
};

export default Info;
