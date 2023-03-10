import '../App.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

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
    <div key={data.character.id} className="cardInfo">
      <h2>{data.character.name}</h2>
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
      <h1>Character Info</h1>
      <DisplayCharacterInfo id={params.id} />{' '}
    </div>
  );
};

export default Info;
