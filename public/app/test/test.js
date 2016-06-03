describe('Album List', function() {
    it('should show a list of 9 albums', function() {
        browser.get('http://localhost:8000/#/albums');
        // Modify the test to interact with elements on the page.

        // get first row
        var firstAlbum = element(by.repeater('(album,value) in albumSongHash').row(0)).getText();

        // assertion tests
        expect(firstAlbum).toBe('MY BEAUTIFULARK TWISTED FANTASY');
        expect(element.all(by.repeater('(album,value) in albumSongHash')).count()).toEqual(9);
        
    });
});

describe('Kanye App', function (){
    it('should have a title', function() {
        browser.get('http://localhost:8000/#/albums');
        expect(browser.getTitle()).toEqual('Kanye GOAT');
    });
})