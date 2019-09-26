SELECT option_id,
    CASE
      WHEN ranking_id=1 THEN sum(ranking_id)*3
      WHEN ranking_id=2 THEN sum(ranking_id)
      ELSE sum(ranking_id) / 3
    END as points
  FROM poll_responses
  JOIN polls ON polls.id = poll_id
  WHERE poll_string = 'duckduckgoose'
  GROUP BY option_id, ranking_id
  ORDER BY ranking_id;


-- SELECT name, sum(points)
-- FROM options
-- WHERE options.id IN (SELECT option_id,
--     CASE
--       WHEN ranking_id=1 THEN sum(ranking_id)*3
--       WHEN ranking_id=2 THEN sum(ranking_id)
--       ELSE sum(ranking_id) / 3
--     END as points
--   FROM poll_responses
--   JOIN polls ON polls.id = poll_id
--   WHERE poll_string = 'duckduckgoose'
--   GROUP BY option_id, ranking_id
--   ORDER BY ranking_id)
--   GROUP BY name;
