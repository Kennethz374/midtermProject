SELECT polls.name as poll_name, options.name as food_option
FROM polls
JOIN poll_responses ON poll_id = polls.id
JOIN options ON option_id = options.id
GROUP BY polls.name, options.name;
