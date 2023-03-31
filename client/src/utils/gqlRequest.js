import axios from 'axios';

export const gqlRequest = async (query) => {
  const { gqlQuery, queryName } = parseQuery(query);

  try {
    const res = await axios.post('http://localhost:3001/graphql', gqlQuery, {
      headers: {
        'Content-Type': 'application/json'
      }
      // withCredentials: true
    });
    return res.data.data[queryName];
  } catch (err) {
    const error = Error(err.response.data.errors[0].message);
    error.status = err.response.data.errors[0].status;
    throw error;
  }
};

const parseQuery = (query) => {
  const queryObj = { query };
  const queryName = query.split('{')[1].split('(')[0].trim();
  const gqlQuery = JSON.stringify(queryObj);
  return { gqlQuery, queryName };
};
