SELECT DISTINCT options.name AS restaurant,
options.price AS Price,
options.rating AS Rating,
options.total_review AS Total_Review,
options.address AS address,
options.picture AS Picture,
polls.name
FROM poll_responses
JOIN options ON option_id = options.id
JOIN polls ON polls.id = poll_id
WHERE poll_string = 'duckduckgoose';
