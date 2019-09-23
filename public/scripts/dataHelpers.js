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


  // const createPoll = function(pollData) { // CREATING THE POLL
  //   return db.pool.query(`
  //   INSERT INTO polls(name, description, end_time)
  //   VALUES ($1, $2, $3) RETURNING *`, values)
  // }

  return {
    randomStringGenerator,
    firstSQL
  }
}

