INSERT INTO locations (longitude, latitude)
VALUES
(49.2785956, -123.0999113),
(49.2821939, -123.1126916),
(49.2821886, -123.1126916),
(49.2268638, -123.1310463),
(49.2268426, -123.1988972),
(49.2812333, -123.117183),
(49.2274648, -123.0176254),
(49.1747, -123.1538525);


INSERT INTO users (username, email, password, location_id)
VALUES
('FoodieToTheMax', 'FoodieToTheMax@gmail.com', 'password', 6),
('NoobFood', 'NoobFood@gmail.com', 'password', 7),
('Andrew', 'Andrew@gmail.com', 'password', 8),
('Wyvern123', 'Wyvern123@gmail.com', 'password', 6),
('SmokeHouse', 'Smokehouse@gmail.com', 'password', 7);


INSERT INTO polls (creator_id, poll_string, name, description, end_time)
VALUES
(1, 'DuckDuckGoose', 'Food Aventures on Granville', 'Granville food is the best in Vancouver. Lets check it out.', '2020-01-01 12:45:34.000'),
(2, 'GingeraleWalletFund', 'Lunch at Metrotown', 'Metrotown is the holy grail of malls', '2020-01-01 12:45:34.000'),
(3, 'AllMyLifeCamera', 'Dinner with Dad', 'Dad is coming to town and I want to eat with dad', '2020-01-01 12:45:34.000'),
(4, 'PlasticMagicChair', 'Foodtrucks', 'Foodtruck even is in Vancouver, lets eat.', '2020-01-01 12:45:34.000'),
(5, 'YesterdayGamblingStraws', 'Aquarium food choices', 'The babies are going to be hungry so we need to decide early and make a reservation', '2020-01-01 12:45:34.000'),
(2, 'RunArrowCasper', 'Golf Lunch', 'I like golfing when its cold out', '2020-01-01 12:45:34.000'),
(1, 'MincedMayonaise', 'Tinder Date', 'Tinder dates need to be preplanned or I am set up for disaster', '2020-01-01 12:45:34.000');

INSERT INTO options (name, location_id)
VALUES
('Chipotle', 1),
('Boston Pizza', 2),
('Tim Hortons', 3),
('Sushi Mura', 4),
('Pho Express', 5);


INSERT INTO rankings (id)
VALUES
(1),
(2),
(3);

-- POLL 1 DATA
INSERT INTO poll_responses (poll_id, option_id, user_id, name, ranking_id)
VALUES
(1, 1, 1, 'Max', 1),
(1, 2, 1, 'Max', 2),
(1, 3, 1, 'Max', 3),
(1, 1, 2, 'Billy', 1),
(1, 3, 2, 'Billy', 2),
(1, 4, 2, 'Billy', 3),
(1, 1, 3, 'Andrew', 1),
(1, 2, 3, 'Andrew', 2),
(1, 5, 3, 'Andrew', 3);


-- Poll 2 Data
INSERT INTO poll_responses (poll_id, option_id, user_id, name, ranking_id)
VALUES
(2, 3, 1, 'Max', 1),
(2, 2, 1, 'Max', 2),
(2, 5, 1, 'Max', 3),
(2, 1, 4, 'Jack', 1),
(2, 3, 4, 'Jack', 2),
(2, 4, 4, 'Jack', 3),
(2, 1, 3, 'Andrew', 1),
(2, 2, 3, 'Andrew', 2),
(2, 5, 3, 'Andrew', 3);

-- Poll 3 Data
INSERT INTO poll_responses (poll_id, option_id, user_id, name, ranking_id)
VALUES
(3, 5, 4, 'Jack', 1),
(3, 3, 4, 'Jack', 2),
(3, 4, 4, 'Jack', 3),
(3, 5, 5, 'Lebron', 1),
(3, 2, 5, 'Lebron', 2),
(3, 1, 5, 'Lebron', 3);

-- Poll 4 Data
INSERT INTO poll_responses (poll_id, option_id, user_id, name, ranking_id)
VALUES
(4, 5, 5, 'Lebron', 1),
(4, 2, 5, 'Lebron', 2),
(4, 1, 5, 'Lebron', 3),
(4, 5, 4, 'Jack', 1),
(4, 3, 4, 'Jack', 2),
(4, 4, 4, 'Jack', 3),
(4, 1, 1, 'Max', 1),
(4, 2, 1, 'Max', 2),
(4, 3, 1, 'Max', 3),
(4, 2, 2, 'Billy', 1),
(4, 3, 2, 'Billy', 2),
(4, 4, 2, 'Billy', 3);
