drop schema public cascade;
create schema public;

create table album(
id serial not null primary key,
title character varying,
date_released date,
duration character varying
);

create table song(
id serial not null primary key,
artist character varying default 'Kanye West',
title character varying,
album_id int references album(id),
duration character varying,
producer character varying,
writer character varying
);

create table round(
id serial primary key not null,
round int,
label character varying,
start_date date,
end_date date
);

create table song_votes(
song_id int references song(id),
round int references round(id)
);

-- select * from round_song_votes

create view view_songs as
select s.title as song_title, a.title as album_title, a.date_released, s.artist
from album a, song s
where s.album_id = a.id;

create view round_song_votes as 
select s.title as song_title, count(sv.song_id) as votes, r.label
from album a, song s, round r, song_votes sv
where s.album_id = a.id
and sv.song_id = s.id
and sv.round = r.id
group by sv.song_id,s.title,r.label;

/**create view view_song_votes as
select s.title as song_title, a.title as album_title, a.date_released, s.artist, sv.votes, r.label
from album a, song s, song_votes sv left join round r on sv.round = r.id
where s.album_id = a.id
and sv.song_id = s.id;**/

INSERT INTO ROUND (round,label,start_date) VALUES (1,'Prelimiary Round', '2015/11/01');

INSERT INTO album (title, date_released,duration) VALUES (	'My Beautiful Dark Twisted Fantasy'	,	'10/22/2010'	,	'1:08:36'	);
INSERT INTO album (title, date_released,duration) VALUES (	'Non-Album/Features'	,	'8/15/2015'	,	'1:07:17'	);
INSERT INTO album (title, date_released,duration) VALUES (	'Cruel Summer'	,	'9/14/2012'	,	'0:54:31'	);
INSERT INTO album (title, date_released,duration) VALUES (	'College Dropout'	,	'2/10/2004'	,	'1:16:13'	);
INSERT INTO album (title, date_released,duration) VALUES (	'Late Registration'	,	'8/30/2005'	,	'1:10:26'	);
INSERT INTO album (title, date_released,duration) VALUES (	'Graduation'	,	'9/11/2007'	,	'0:57:12'	);
INSERT INTO album (title, date_released,duration) VALUES (	'Yeezus'	,	'6/18/2013'	,	'0:40:01'	);
INSERT INTO album (title, date_released,duration) VALUES (	'Watch The Throne'	,	'8/8/2011'	,	'0:46:02'	);
INSERT INTO album (title, date_released,duration) VALUES (	'808s & Heartbreak'	,	'11/24/2008'	,	'52:01:00'	);

INSERT INTO song (title,duration,album_id) VALUES (	'Dark Fantasy'	,	'04:41'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Gorgeous'	,	'05:57'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Power'	,	'04:52'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'All of the Lights'	,	'04:59'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Monster'	,	'06:18'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'So Appalled'	,	'06:38'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Devil in a New Dress'	,	'05:52'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Runaway'	,	'09:08'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Hell of a Life'	,	'05:27'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Blame Game'	,	'07:49'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Lost in the World'	,	'04:16'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'See Me Now'	,	'06:03'	, (SELECT id FROM album WHERE title = 	'My Beautiful Dark Twisted Fantasy'	));
INSERT INTO song (title,duration,album_id) VALUES (	'We Don''t Care'	,	'03:59'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'All Falls Down'	,	'03:43'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Spaceship'	,	'05:24'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Jesus Walks'	,	'03:13'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Never Let Me Down'	,	'05:24'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Get Em High'	,	'04:49'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'The New Workout Plan'	,	'05:22'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Slow Jamz'	,	'05:16'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Breathe In Breathe Out'	,	'04:06'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'School Spirit'	,	'03:02'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Two Words'	,	'04:26'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Through the Wire'	,	'03:41'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Family Business'	,	'04:38'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Last Call'	,	'12:40'	, (SELECT id FROM album WHERE title = 	'College Dropout'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Heard ''Em Say'	,	'03:23'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Touch the Sky'	,	'03:57'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Gold Digger'	,	'03:28'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Drive Slow'	,	'04:32'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Crack Music'	,	'04:31'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Roses'	,	'04:05'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Bring Me Down'	,	'03:18'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Addiction'	,	'04:27'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Diamonds from Sierra Leone (Remix)'	,	'03:53'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'We Major'	,	'07:28'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Hey Mama'	,	'05:05'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Celebration'	,	'03:18'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Gone'	,	'06:02'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Late'	,	'03:50'	, (SELECT id FROM album WHERE title = 	'Late Registration'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Good Morning'	,	'03:15'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Champion'	,	'02:47'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Stronger'	,	'05:11'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'I Wonder'	,	'04:03'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Good Life'	,	'03:27'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Can''t Tell Me Nothing'	,	'04:30'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Barry Bonds'	,	'03:24'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Drunk and Hot Girls'	,	'05:13'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Flashing Lights'	,	'03:57'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Everything I Am'	,	'03:47'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'The Glory'	,	'03:32'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Homecoming'	,	'03:23'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Big Brother'	,	'04:47'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Bittersweet Poetry'	,	'04:01'	, (SELECT id FROM album WHERE title = 	'Graduation'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Say You Will'	,	'06:14'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Welcome to Heartbreak'	,	'04:23'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Heartless'	,	'03:31'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Amazing'	,	'03:58'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Love Lockdown'	,	'04:30'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Paranoid'	,	'04:37'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'RoboCop'	,	'04:34'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Street Lights'	,	'03:09'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Bad News'	,	'03:58'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'See You in My Nightmares'	,	'04:18'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Coldest Winter'	,	'02:45'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Pinocchio Story'	,	'06:03'	, (SELECT id FROM album WHERE title = 	'808s & Heartbreak'	));
INSERT INTO song (title,duration,album_id) VALUES (	'On Sight'	,	'02:36'	, (SELECT id FROM album WHERE title = 	'Yeezus'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Black Skinhead'	,	'03:08'	, (SELECT id FROM album WHERE title = 	'Yeezus'	));
INSERT INTO song (title,duration,album_id) VALUES (	'I Am A God'	,	'03:51'	, (SELECT id FROM album WHERE title = 	'Yeezus'	));
INSERT INTO song (title,duration,album_id) VALUES (	'New Slaves'	,	'04:16'	, (SELECT id FROM album WHERE title = 	'Yeezus'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Hold My Liquor'	,	'05:26'	, (SELECT id FROM album WHERE title = 	'Yeezus'	));
INSERT INTO song (title,duration,album_id) VALUES (	'I’m In It'	,	'03:54'	, (SELECT id FROM album WHERE title = 	'Yeezus'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Blood On The Leaves'	,	'06:00'	, (SELECT id FROM album WHERE title = 	'Yeezus'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Guilt Trip'	,	'04:03'	, (SELECT id FROM album WHERE title = 	'Yeezus'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Send It Up'	,	'02:58'	, (SELECT id FROM album WHERE title = 	'Yeezus'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Bound 2'	,	'03:49'	, (SELECT id FROM album WHERE title = 	'Yeezus'	));
INSERT INTO song (title,duration,album_id) VALUES (	'No Church in the Wild'	,	'04:32'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Lift Off'	,	'04:26'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Niggas in Paris'	,	'03:39'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Otis'	,	'02:58'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Gotta Have It'	,	'02:20'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'New Day'	,	'04:32'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'That’s My Bitch'	,	'03:22'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Welcome to the Jungle'	,	'02:54'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Who’s Gon Stop Me'	,	'04:16'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Murder to Excellence'	,	'05:00'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Made in America'	,	'04:52'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Why I Love You'	,	'03:21'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Illest Motherfucker Alive'	,	'08:22'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'HAM'	,	'04:35'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Primetime'	,	'03:19'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'The Joy'	,	'05:17'	, (SELECT id FROM album WHERE title = 	'Watch The Throne'	));
INSERT INTO song (title,duration,album_id) VALUES (	'To The World'	,	'03:51'	, (SELECT id FROM album WHERE title = 	'Cruel Summer'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Clique'	,	'04:53'	, (SELECT id FROM album WHERE title = 	'Cruel Summer'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Mercy'	,	'05:26'	, (SELECT id FROM album WHERE title = 	'Cruel Summer'	));
INSERT INTO song (title,duration,album_id) VALUES (	'New God Flow'	,	'05:57'	, (SELECT id FROM album WHERE title = 	'Cruel Summer'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Cold'	,	'03:36'	, (SELECT id FROM album WHERE title = 	'Cruel Summer'	));
INSERT INTO song (title,duration,album_id) VALUES (	'The One'	,	'05:44'	, (SELECT id FROM album WHERE title = 	'Cruel Summer'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Don''t Like (Remix)'	,	'04:43'	, (SELECT id FROM album WHERE title = 	'Cruel Summer'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Can''t Stop w/ Theophilus London'	,	'04:51'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Only One'	,	'04:40'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'All Day'	,	'05:10'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Run This Town w/ Jay Z'	,	'04:28'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Put On w/ Young Jeezy'	,	'05:21'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Selfish w/ Slum Village'	,	'03:45'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Wouldn''t Get Far w/ Game'	,	'04:11'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'American Boy w/ Estelle'	,	'04:44'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Flight School w/ GLC'	,	'04:43'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Birthday Song w/ 2 Chainz'	,	'05:06'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Live Fast, Die Young w/ Rick Ross'	,	'06:14'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Lollipop (Remix) w/ Lil Wayne'	,	'04:27'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Sanctified w/ Rick Ross'	,	'04:49'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));
INSERT INTO song (title,duration,album_id) VALUES (	'Diamonds (Remix) w/ Rihanna'	,	'04:48'	, (SELECT id FROM album WHERE title = 	'Non-Album/Features'	));

-- select * from song_votes
-- select * from view_song_votes
-- select row_to_json(song) from song; 
-- SELECT row_to_json(fc) AS response FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type , row_to_json((SELECT l FROM (select song_title,album_title,date_released, artist,votes) As l )) As properties FROM view_song_votes As t ) As f )  As fc;