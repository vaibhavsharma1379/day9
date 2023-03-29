const chai=require("chai");
const chaiHttp=require("chai-http");
const should=chai.should();
const server=require("../index")

const API=process.env.BASE_URL;
chai.use(chaiHttp);

describe('/POST testing user signup', () => { 
    it("creates a new user",()=>{
        chai.request(API).post("/api/v1/user/signup").send({
            name:"Vaibbhaa",
            email:"vaibhavsrh2@gmail.com",
            password:"Vaibhav@123122"
        }).end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.contain("Welcome to Devsnest Vaibbhaa. Thank you for signing up")
            done();
        });
    })
 })
describe('/POST /POST testing user signin', () => { 
    it("logs a user",()=>{
        chai.request(API).post("/api/v1/user/signin").send({
            email:"vaibhavsrh2@gmail.com",
            password:"Vaibhav@123122"
        }).end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.equal("Signed In Successfully!");
            res.body.should.have.property("bearerToken");
           done();
        });
    })
 })
 describe("/POST testing user sigh out",()=>{
    it("sign out the user",()=>{
        chai.request(API).get("/api/v1/user/signout").end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a("object")
            res.body.should.have.property("message");
            res.body.message.should.contain("cokkie cleared");
            done();
        })
    })
 })