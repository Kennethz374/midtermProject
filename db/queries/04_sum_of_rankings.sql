SELECT ranking_id,
  CASE
    WHEN ranking_id=1 THEN sum(ranking_id)*3
    WHEN ranking_id=2 THEN sum(ranking_id)
    ELSE sum(ranking_id) / 3
  END
FROM poll_responses
WHERE poll_id = 1
GROUP BY ranking_id
ORDER BY ranking_id;
