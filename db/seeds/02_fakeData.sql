INSERT INTO locations (id, longitude, latitude)
VALUES
(1, 49.2785956, -123.0999113),
(2, 49.2821939, -123.1126916),
(3, 49.2821886, -123.1126916),
(4, 49.2268638, -123.1310463),
(5, 49.2268426, -123.1988972),
(6, 49.2812333, -123.117183),
(7, 49.2274648, -123.0176254),
(8, 49.1747, -123.1538525);


INSERT INTO users (id, username, email, password, location_id)
VALUES
(1, 'FoodieToTheMax', 'FoodieToTheMax@gmail.com', 'password', 6),
(2, 'NoobFood', 'NoobFood@gmail.com', 'password', 7),
(3, 'Andrew', 'Andrew@gmail.com', 'password', 8),
(4, 'Wyvern123', 'Wyvern123@gmail.com', 'password', 6),
(5, 'SmokeHouse', 'Smokehouse@gmail.com', 'password', 7);


INSERT INTO polls (id, creator_id, name, description, end_time)
VALUES
(1, 1, 'Food Aventures on Granville', 'Granville food is the best in Vancouver. Lets check it out.', '2020-01-01 12:45:34.000'),
(2, 2, 'Lunch at Metrotown', 'Metrotown is the holy grail of malls', '2020-01-01 12:45:34.000'),
(3, 3, 'Dinner with Dad', 'Dad is coming to town and I want to eat with dad', '2020-01-01 12:45:34.000'),
(4, 4, 'Foodtrucks', 'Foodtruck even is in Vancouver, lets eat.', '2020-01-01 12:45:34.000'),
(5, 5, 'Aquarium food choices', 'The babies are going to be hungry so we need to decide early and make a reservation', '2020-01-01 12:45:34.000'),
(6, 2, 'Golf Lunch', 'I like golfing when its cold out', '2020-01-01 12:45:34.000'),
(7, 1, 'Tinder Date', 'Tinder dates need to be preplanned or I am set up for disaster', '2020-01-01 12:45:34.000');

INSERT INTO options (id, name, location_id)
VALUES
(1, 'Chipotle', 1),
(2, 'Boston Pizza', 2),
(3, 'Tim Hortons', 3),
(4, 'Sushi Mura', 4),
(5, 'Pho Express', 5);


INSERT INTO rankings (id)
VALUES
(1),
(2),
(3);

-- POLL 1 DATA
INSERT INTO poll_responses (id, poll_id, option_id, user_id, name, ranking_id)
VALUES
(1, 1, 1, 1, 'Max', 1),
(2, 1, 2, 1, 'Max', 2),
(3, 1, 3, 1, 'Max', 3),
(4, 1, 1, 2, 'Billy', 1),
(5, 1, 3, 2, 'Billy', 2),
(6, 1, 4, 2, 'Billy', 3),
(7, 1, 1, 3, 'Andrew', 1),
(8, 1, 2, 3, 'Andrew', 2),
(9, 1, 5, 3, 'Andrew', 3);


-- Poll 2 Data
INSERT INTO poll_responses (id, poll_id, option_id, user_id, name, ranking_id)
VALUES
(10, 2, 3, 1, 'Max', 1),
(11, 2, 2, 1, 'Max', 2),
(12, 2, 5, 1, 'Max', 3),
(13, 2, 1, 4, 'Jack', 1),
(14, 2, 3, 4, 'Jack', 2),
(15, 2, 4, 4, 'Jack', 3),
(16, 2, 1, 3, 'Andrew', 1),
(17, 2, 2, 3, 'Andrew', 2),
(18, 2, 5, 3, 'Andrew', 3);

-- Poll 3 Data
INSERT INTO poll_responses (id, poll_id, option_id, user_id, name, ranking_id)
VALUES
(19, 3, 5, 4, 'Jack', 1),
(20, 3, 3, 4, 'Jack', 2),
(21, 3, 4, 4, 'Jack', 3),
(22, 3, 5, 5, 'Lebron', 1),
(23, 3, 2, 5, 'Lebron', 2),
(24, 3, 1, 5, 'Lebron', 3);

-- Poll 4 Data
INSERT INTO poll_responses (id, poll_id, option_id, user_id, name, ranking_id)
VALUES
(25, 4, 5, 5, 'Lebron', 1),
(26, 4, 2, 5, 'Lebron', 2),
(27, 4, 1, 5, 'Lebron', 3),
(28, 4, 5, 4, 'Jack', 1),
(29, 4, 3, 4, 'Jack', 2),
(30, 4, 4, 4, 'Jack', 3),
(31, 4, 1, 1, 'Max', 1),
(32, 4, 2, 1, 'Max', 2),
(33, 4, 3, 1, 'Max', 3),
(34, 4, 2, 2, 'Billy', 1),
(35, 4, 3, 2, 'Billy', 2),
(36, 4, 4, 2, 'Billy', 3);
