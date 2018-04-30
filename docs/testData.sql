--password 123
Insert into public.user (username,first_name,last_name,password,salt,email) VALUES ('new','nick','womble','$2a$10$sZPNamlJkm9KRi2fqr9ftuz7etM3ASsY1QqLXl9J/ix5No65/YCkS',null,'me@you.com'),
('memrie','erika','tobais','$2a$10$MON0caCQbcLsneEBsCLOTOpHuFubM5WXR2mEqjavd9cA2M8PH1agi','$2a$10$MON0caCQbcLsneEBsCLOTO','et5392@rit.edu');


insert into font_history (font_id,rank,trending_rank,time) values
(112, 100,20 , (to_date('2018-04-23', 'YYYY-MM-DD')) ),
(112, 110,9 ,  (to_date('2018-04-24', 'YYYY-MM-DD')) ),
(112, 112,6 , (to_date('2018-04-25', 'YYYY-MM-DD')) ),
(112, 112,2 , (to_date('2018-04-26', 'YYYY-MM-DD')) ),
(112, 112, 2 , (to_date('2018-04-27', 'YYYY-MM-DD')) ),
(112, 112,3 , (to_date('2018-04-28', 'YYYY-MM-DD'))  ),
(112, 112, 3 , (to_date('2018-04-29', 'YYYY-MM-DD')) );

insert into font_history (font_id,rank,trending_rank,time) values
(1, 1, 56 , (to_date('2018-04-23', 'YYYY-MM-DD')) ),
(1, 2, 50 ,  (to_date('2018-04-24', 'YYYY-MM-DD')) ),
(1, 2, 41 , (to_date('2018-04-25', 'YYYY-MM-DD')) ),
(1, 1, 98 , (to_date('2018-04-26', 'YYYY-MM-DD')) ),
(1, 1, 78 , (to_date('2018-04-27', 'YYYY-MM-DD')) ),
(1, 1, 50 , (to_date('2018-04-28', 'YYYY-MM-DD'))  ),
(1, 1, 53 , (to_date('2018-04-29', 'YYYY-MM-DD')) );

insert into user_font (user_user_id, font_font_id) VALUES
(2,1),
(2,496),
(2,179);
