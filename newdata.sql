-- View: votes_per_song

-- DROP VIEW votes_per_song;

CREATE OR REPLACE VIEW votes_per_song AS 
 SELECT song.title,
    count(song_votes.song_id) AS votes
   FROM song_votes,
    song
  WHERE song.id = song_votes.song_id
  GROUP BY song_votes.song_id, song.title
  ORDER BY count(song_votes.song_id) DESC;
