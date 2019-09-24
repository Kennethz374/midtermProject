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


  const resultSQL = function() {
    return db.query(`
    SELECT polls.name as poll_name, options.name as food_option, rankings.id as ranking
    FROM polls
    JOIN poll_responses ON poll_id = polls.id
    JOIN options ON option_id = options.id
    JOIN rankings ON ranking_id = rankings.id
    GROUP BY polls.name, options.name, rankings.id;
    `)
    .then((response) => {
      console.log(response)
      return response.rows;
    })
  }

  // const addUser =  function(user) {
  //   const values = [user.name, user.email, user.password]
  //   return db.pool.query(`INSERT INTO users(name, email, password)
  //   VALUES ($1, $2, $3) RETURNING *`, values)
  //   .then (res => {
  //     return res.rows[0];
  //   })


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
    getPoll,
    resultSQL
  }
}


