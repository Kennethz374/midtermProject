const faker = require('faker');



module.exports = (db) =>{
  const randomStringGenerator = function() {
    let words = faker.random.words();
    words = words.split(" ").join("");
    return words
  }

  const firstSQL = function() {
    return db.query(`SELECT * FROM polls;`)
    .then((response) => {
      console.log(response)
      return response.rows;
    })
  }


  const createPoll = function(pollData) { // CREATING THE POLL
    return db.query(`
    INSERT INTO polls(poll_string, creator_id, name, description, end_time)
    VALUES ($1, 1, $2, $3, '2020-01-01 12:45:4.000') RETURNING *;`, pollData)
    .then (res => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
  }

  const getPoll = function(shortURL) {
    const values = [shortURL];
    return db.query(`SELECT *
    FROM polls
    WHERE poll_string = $1;`, values)
    .then (res => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
  }

// INSERT INTO polls (creator_id, name, description, end_time)
// VALUES (1, 'billys tinder date', 'Billy got game', '2020-01-01 12:45:4.000');

  return {
    randomStringGenerator,
    firstSQL,
    createPoll,
    getPoll
  }
}

