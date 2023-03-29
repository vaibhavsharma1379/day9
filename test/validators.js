const {
    validateName,
    validateEmail,
    validatePassword,
  } = require("../utils/validators");
  
  var expect = require("chai").expect;
describe("Testing Validators", function () {
    it("should return true for valid name", function () {
      expect(validateName("Shamim")).to.equal(true);
    });
    it("should return false for invalid name", function () {
      expect(validateName("Shamim01")).to.equal(false);
    });
    it("should return true for valid email",function(){
        expect(validateEmail("valis@gmail.com")).to.equal(true);
    });
    it("should return false for invalid email",function(){
        expect(validateEmail("vaibhav.gamil.com")).to.equal(false);
    })
    it("should return true for valid password",function(){
        expect(validatePassword("Vaiabhv@123")).to.equal(true);
    });
    it("should return false for invalid password",function(){
        expect(validatePassword("heloo@1")).to.equal(false);
    })
})