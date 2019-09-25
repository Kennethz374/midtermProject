
select ranking_id,
  CASE
    WHEN ranking_id=1 THEN sum(ranking_id)*3
    WHEN ranking_id=2 THEN sum(ranking_id)*2 ELSE sum(ranking_id) * 1
  END
from poll_responses
group by ranking_id
order by ranking_id;
