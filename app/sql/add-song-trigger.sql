CREATE OR REPLACE FUNCTION add_song()
  RETURNS trigger AS
$BODY$
DECLARE
  song_id int;
BEGIN
  song_id := NEW.id;

 IF (NEW.id IS NOT NULL and NEW.title IS NOT NULL) THEN
    RAISE NOTICE 'Adding song to vote.';
 		INSERT INTO song_votes (song_id) VALUES (song_id);
    RAISE NOTICE 'Complete...';
 END IF;

 RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION add_song()
  OWNER TO postgres;

DROP TRIGGER IF EXISTS add_song ON song;
CREATE TRIGGER add_song AFTER INSERT ON song
    FOR EACH ROW EXECUTE PROCEDURE add_song();