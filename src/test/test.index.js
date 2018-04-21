var config = require("../config/config.js").test;
process.env.modelRoot = config.paths.data;

var expect = require("chai").expect,
    gf = require("../app/controlla/general.face.js"),
    uf = require("../app/controlla/user.face.js");


describe("User Facade Routines",function(){

    it("Logs in User",function(){// TODO add check for hashing method
        expect( uf.login("bryan21","FHDShdjsh12232$$$") ).to.deep.equal(1);
    } );
    it("Fails to Logs in User",function(){// TODO add check for hashing method
        expect( uf.login("bryan21","s$$$") ).to.deep.equal(false);
    } );

    it("Adds a font to the users collection",function(){
        expect(uf.newCollection(1,[1,2,3]) ).to.deep.equal({failed:{},success:{font_id:3}});
    });

    it("Gets all fonts in a users collection",function(){
        expect(uf.getCollections(1)).to.deep.equal(
            {family: "Roboto", font_id:1,
			source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"}
        )
    })


});

describe("General Facade Routines",function(){

    it("Gets all of a User Comments",function(){
        expect( gf.userComments("bryan21") ).to.deep.equal([{comment_text:"gosdofjbn",rating:"99"}]);
    });

    it("Gets all of a Font's Comments",function(){
        expect( gf.fontComments(1) ).to.deep.equal([{comment_text:"gosdofjbn",rating:"99"}])
    });

    it("Inserts a new Font Comment",function(){
        expect( gf.newComment(1,2,"COOL BEANS BABIEII")).to.deep.equal(true);
    });

    it("Inserts a new Font Rating",function(){
        expect( gf.newRating(1,2,2,99)).to.equal(true);
    });
    it("Inserts a new Comment Rating",function(){
        expect( gf.newRating(1,3,2,99)).to.equal(true);
    });
    it("Gets a font using it's id",function(){
        expect( gf.getFontById(1) ).to.deep.equal(  
            {family: "Roboto", "font_id": 1,
            source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"
        	}
          );
    });
    it("Gets a Font using it's name",function(){
        expect(gf.getFontByName("Cool As Shit")).to.deep.equal(
            {family: "Roboto", "font_id": 1,
            source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"
        	} 
        ) 
    });
    it("Gets all Fonts",function(){
        expect(gf.getAllFonts("Cool As Shit")).to.deep.equal(
            [{family: "Roboto",
            source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"
        	}] 
        ) 
    });
    it("Get history of font by it's id",function(){
        expect(gf.getFontHistory(1)).to.deep.equal([1,2,3]);
    });

    it("Gets the most popular fonts",function(){
        expect(gf.getMostPopular()).to.deep.equal(
            [{family: "Roboto", "font_id": 1,
            source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"
        	}] 
        )
    })
    
});


