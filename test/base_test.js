var should = require("chai").should()
  , expect = require("chai").expect
  , supertest = require("supertest")
  , api = supertest("http://localhost:1337")

describe("Base", function(){
	it("Debe responder a una petición GET sencilla", function(done){
		api.get("/api/v1")
		   .set("Accept", "application/json")
		   .expect(200, done)
	})


})