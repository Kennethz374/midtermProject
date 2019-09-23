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

  // const addUser =  function(user) {
  //   const values = [user.name, user.email, user.password]
  //   return db.pool.query(`INSERT INTO users(name, email, password)
  //   VALUES ($1, $2, $3) RETURNING *`, values)
  //   .then (res => {
  //     return res.rows[0];
  //   })


  const createPoll = function(pollData) { // CREATING THE POLL
    const values = [pollData.title, pollData.description] // pollData.endTime
    return db.query(`
    INSERT INTO polls(creator_id, name, description, end_time)
    VALUES (1, $1, $2, '2020-01-01 12:45:4.000') RETURNING *;`, values)
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
    createPoll
  }
}

