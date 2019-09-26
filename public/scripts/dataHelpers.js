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

const verifyUser = function(user_id) {
  return db.query(`Select user_id FROM poll_responses WHERE user_id = $1;
  RETURNING *;`, [user_id])
  .then(res=>{
    console.log(res.rows);
    return res.rows[0];
  })
}

const createUser = function(user) {
  return db.query(`INSERT INTO users (username)
  VALUES ($1) RETURNING *;
  `, [user])
  .then(res => {
    console.log("HITTING THE RES")
    return res.rows[0];
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
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`, pollData)

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

  const passwordCheck = function(username) {
    const values = [username];
    return db.query(` SELECT *
    FROM users
    WHERE username = $1;
    `, values)
    .then (res => {
      return res.rows[0];
    })}

  // const getRankings = function(shortURL) {
  //   const values = [shortURL];
  //   // console.log("Values:", values)
  //   return db.query(` SELECT polls.name, polls.description, poll_responses.name as user, options.name as food, poll_responses.ranking_id
  //   FROM polls
  //   JOIN poll_responses ON polls.id = poll_id
  //   JOIN options ON options.id = option_id
  //   WHERE poll_string = $1;
  //   `, values)
  //   .then (res => {
  //     // console.log('getRankings')
  //     return res.rows;
  //   })
  // }

  // const getTotalRanking = function (poll_string) {
  //   const values = [poll_string];
  //   return db.query(`SELECT option_id,
  //   CASE
  //     WHEN ranking_id=1 THEN sum(ranking_id)*3
  //     WHEN ranking_id=2 THEN sum(ranking_id)
  //     ELSE sum(ranking_id) / 3
  //   END as points
  //   FROM poll_responses
  //   JOIN polls ON polls.id = poll_id
  //   WHERE poll_string = $1
  //   GROUP BY option_id, ranking_id
  //   ORDER BY ranking_id;`, values)
  //   .then (res => {
  //     // console.log('total rankings');
  //     return res.rows;
  //   })
  // }

  const getResults = function (poll_string) {
     const values = [poll_string];
     return db.query(`SELECT poll_responses.id AS response_id, options.id AS option_id, options.name as food, rankings.id as ranking, polls.name, polls.description
     FROM poll_responses
     INNER JOIN options
     ON options.id = poll_responses.option_id
     INNER JOIN polls
     ON polls.id = poll_responses.poll_id
     INNER JOIN rankings
     ON rankings.id = poll_responses.ranking_id
     WHERE polls.poll_string = $1;`, values)
     .then (res => res.rows)
  }



  const optionsQueryBuilder = function (arrayOptions) { // need to move this into the dataHelpers

    let queryInput = `INSERT INTO options(name, rating, price, total_reviews, address) VALUES`
   for (let i in arrayOptions) {
    queryInput +=  ` (`

     for (let n in arrayOptions[i]){
       queryInput += `\'` + arrayOptions[i][n] + `\' , `

     }
     queryInput = queryInput.substring(0, queryInput.length - 2)
     queryInput += `),`
   }
   queryInput = queryInput.substring(0, queryInput.length - 1)


   queryInput = queryInput.replace(",", " ', '")

   console.log(queryInput)

   return queryInput
  }


  const insertOptions = function(optionsData) {
    console.log("PRAY TO GOD")
    return db.query(optionsData)
    .then (result => { // I THINK SHOULD RETURN NOTHING SINCE ITS AN INSERT QUERY
      console.log("INSERT OPTIONS COMPLETE", result.rows)
    })
  }

  return {
    randomStringGenerator,
    firstSQL,
    createPoll,
    getPoll,
    resultSQL,
    getActivePoll,
    futureTime,
    passwordCheck,
    getResults,
    createUser,
    verifyUser,
    insertOptions,
    optionsQueryBuilder
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


