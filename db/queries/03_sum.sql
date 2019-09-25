
SELECT polls.name as poll_name, options.name as food_option, rankings.id as ranking
FROM polls
JOIN poll_responses ON poll_id = polls.id
JOIN options ON option_id = options.id
JOIN rankings ON ranking_id = rankings.id
GROUP BY polls.name, options.name, rankings.id;
