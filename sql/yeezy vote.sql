﻿/********************************************

SELECT ___yeezy_vote_song(ARRAY[1,2,3],1,'b8:e8:56:36:ed:84')

SELECT * FROM song

*********************************************/

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
