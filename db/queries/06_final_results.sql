  SELECT poll_responses.id AS response_id, options.id AS option_id, options.name, rankings.id as ranking, polls.name, polls.description
    FROM poll_responses
    INNER JOIN options
    ON options.id = poll_responses.option_id
    INNER JOIN polls
    ON polls.id = poll_responses.poll_id
    INNER JOIN rankings
    ON rankings.id = poll_responses.ranking_id
    WHERE polls.id = 1;
