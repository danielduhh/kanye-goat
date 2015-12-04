'use strict';

describe('myApp.public module', function() {

  beforeEach(module('myApp.home'));

  describe('public controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('AlbumsCtrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});