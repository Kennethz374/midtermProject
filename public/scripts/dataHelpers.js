const faker = require('faker');



module.exports = (db) =>{

  const randomStringGenerator = function() {
    let words = faker.random.words();
    words = words.split(" ").join("").toLowerCase();
    return words
  }

  const firstSQL = function() {
    return db.query(`SELECT * FROM polls;`)
    .then((response) => {
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

  const futureTime = function(futureMins) {
    return db.query(`
      SELECT current_timestamp + ($1 ||' minutes')::interval;`, futureMins)
    .then(res => {
      return res.rows[0]
    })
  }


  const createPoll = function(pollData) { // CREATING THE POLL
    return db.query(`
    INSERT INTO polls(poll_string, creator_id, name, description, end_time)
    VALUES ($1, 1, $2, $3, $4) RETURNING *;`, pollData)

    .then (res => {
      return res.rows[0];
    })
  }

  const getPoll = function(poll_string) {
    const values = [poll_string];
    return db.query(`SELECT *
    FROM polls
    WHERE poll_string = $1;`, values)
    .then (res => {
      return res.rows[0];
    })
  }

  const getActivePolls = function(shortURL) {
    return db.query(` SELECT *
    FROM polls
    WHERE end_time > NOW();`)
    .then (res => {
      return res.rows;
    })
  }

  const getActivePoll = function(shortURL) {
    const values = [shortURL];
    return db.query(` SELECT *
    FROM polls
    WHERE end_time > NOW()
    AND poll_string = $1;`, values)
    .then (res => {
      return res.rows;
    })
  }

  const getRankings = function(shortURL) {
    const values = [shortURL];
    console.log("Values:", values)
    return db.query(` SELECT polls.name, polls.description, poll_responses.name, options.name as food, poll_responses.ranking_id
    FROM polls
    JOIN poll_responses ON polls.id = poll_id
    JOIN options ON options.id = option_id
    WHERE poll_string = $1
    GROUP BY polls.name, polls.description, poll_responses.ranking_id, poll_responses.name, options.name;`, values)
    .then (res => {
      console.log('getRankings:', res)
      return res.rows[0];
    })
  }

  const getTotalRanking = function (poll_string) {
    const values = [poll_string];
    return db.query(`SELECT ranking_id,
    CASE
      WHEN ranking_id=1 THEN sum(ranking_id)*3
      WHEN ranking_id=2 THEN sum(ranking_id)
      ELSE sum(ranking_id) / 3
    END
  FROM poll_responses
  WHERE poll_id = 1
  GROUP BY ranking_id
  ORDER BY ranking_id;`)
    .then (res => {
      console.log('THIS', res);
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
    resultSQL,
    getActivePoll,
    futureTime,
    getTotalRanking,
    getRankings
  }
}



// const $optionWrapper = $('#optionTable');

// const renderOptionsTable = (optionData) => {
//   optionData.forEach(result => {
//     $optionWrapper.append(createOptionsTable(result));
//   })
//   }


// const createOptionsTable = (optionObject) => {
//   const {id, name, location_id, poll_id, option_id, user_id, ranking_id} = optionObject;
//   return `<div>
//   <p> id: ${id} </p>
//   <p> name: ${name}</p>
//   <p> location_id: ${location_id}</p>
//   <p> poll_id: ${poll_id}</p>
//   <p> option_id: ${option_id}</p>
//   <p> user_id: ${user_id}</p>
//   <p> ranking_id: ${ranking_id}</p>
//   </div>`
// }


