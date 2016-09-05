drop schema public cascade;
create schema public;

CREATE EXTENSION plv8;

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
round int references round(id),
mac_address character varying,
submission_time timestamp default current_timestamp
);

-- select * from round_song_votes

create view view_songs as
select s.id,s.title as song_title, a.title as album_title, a.date_released, s.artist
from album a, song s
where s.album_id = a.id;

create view round_song_votes as 
select a.title as album, s.title as song, sv.song_id as song_id, count(sv.song_id) as votes, r.label as round
from album a, song s, round r, song_votes sv
where s.album_id = a.id
and sv.song_id = s.id
and sv.round = r.id
group by sv.song_id,s.title,r.label, a.title;


create view round_album_votes as
select a.title as album, count(a.id) as votes, r.label as round
from album a, song s, round r, song_votes sv
where s.album_id = a.id
and sv.song_id = s.id
and sv.round = r.id
group by a.id, r.label;

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

/****

SELECT * from song_votes;
SELECT * FROM ___yeezy_vote_song(ARRAY[(SELECT floor(random()*(113-1)+2)::int)], 1, (SELECT floor(random()*(3000-1)+2)::char));

SELECT * FROM ___yeezy_vote_song((SELECT floor(random()*(113-1)+2)::int),1);
SELECT * FROM ___yeezy_vote_song((SELECT floor(random()*(113-1)+2)::int),1);

****/

CREATE OR REPLACE FUNCTION ___yeezy_vote_song(song_ids integer[], round_id integer, mac_address character varying)
  RETURNS boolean AS
$BODY$

 var valid_song_id;
 var valid_round_id;
 var submission;
 var eligible;
 var num_votes;
 var time_remaining;
 var hours;
 var minutes;
 var votes_remaining;


 valid_round_id = plv8.execute("SELECT id FROM round WHERE id = $1", [round_id])[0].id;
 // number of votes in last 24 hours
 num_votes = plv8.execute("SELECT count(*)::int FROM song_votes WHERE mac_address = $1 AND now()-submission_time < interval '24 hours'", [mac_address])[0].count;
 votes_remaining = 5-num_votes;

 if (votes_remaining > 0){
   song_ids.forEach(function(id, index){

	valid_song_id = plv8.execute("SELECT id FROM song WHERE id = $1", [id])[0].id;

	if(index <= votes_remaining-1){

	  plv8.elog(NOTICE, 'Submitting vote: ' + ' index: ' + index + 'check:' + (index <= votes_remaining-1));

	  submission = plv8.execute("INSERT INTO song_votes(song_id, round, mac_address) VALUES ($1, $2, $3) RETURNING submission_time", [valid_song_id, valid_round_id, mac_address])

	} else {

	  plv8.elog(NOTICE, 'Votes did not make the cut: ' + ' index: ' + index + 'check:' + (index <= votes_remaining-1));
	}

   });

   } else {
	time_remaining = plv8.execute("select interval '24 hours' - (select now() - (select submission_time from song_votes where mac_address = $1 order by submission_time desc limit 1)) as time_remaining", [mac_address])[0]['time_remaining'];
	hours = plv8.execute("SELECT EXTRACT(HOUR FROM interval '24 hours' - (select now() - (select submission_time from song_votes order by submission_time desc limit 1)))")[0]['date_part'];
	minutes = plv8.execute("SELECT EXTRACT(MINUTE FROM interval '24 hours' - (select now() - (select submission_time from song_votes order by submission_time desc limit 1)))")[0]['date_part'];

	return plv8.elog(ERROR, 'Vote limit exceeded. Return in ' + hours + ' hours and ' + minutes + ' minutes!');
   }

    if (submission !== null){
    	plv8.elog(NOTICE, "submission = ", JSON.stringify(submission));
	return true;
    } else {
	return plv8.elog(ERROR, 'Cannot record vote');
    }

$BODY$
  LANGUAGE plv8 VOLATILE
  COST 100;
ALTER FUNCTION ___yeezy_vote_song(integer[], integer, character varying)
  OWNER TO postgres;
