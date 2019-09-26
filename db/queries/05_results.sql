 SELECT polls.name, polls.description, poll_responses.name, options.name as food, poll_responses.ranking_id
FROM polls
JOIN poll_responses ON polls.id = poll_id
JOIN options ON options.id = option_id
WHERE poll_string = 'duckduckgoose';

