--password 123
Insert into public.user (username,password,email) VALUES ('new','$2a$10$sZPNamlJkm9KRi2fqr9ftuz7etM3ASsY1QqLXl9J/ix5No65/YCkS','me@you.com');
Insert into public.rating (user_id,font_id,rating) VALUES (1,1,1);
Insert into public.rating (user_id,comment_id,rating) VALUES (1,1,1);
Insert into user_font (user_user_id, font_font_id,rank) VALUES (1,1,1);
Insert into font (family,source_json,popularity,kind) VALUES ('Test Font','/fake/path',-1,'serif');
Insert into public.comment (user_id,font_id,comment_text) VALUES (1,1,'Cool stuff');