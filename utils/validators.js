const validateName=(name)=>{
    const reg=new RegExp(/[a-zA-Z][a-zA-Z]+[a-zA-Z]$/);
    return reg.test(name);
  }
  const validateEmail=(email)=>{
    const reg=new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,3}$/,'gm');
    return reg.test(email);
  }
  const validatePassword=(password)=>{
    const reg=new RegExp( "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    return reg.test(password);
  }
  // console.log(
  //   validateName("Naeem Ghadai"),
  //   validateEmail("sm47@gmail.com"),
  //   validatePassword("HelloWorld@6")
  // );
  module.exports={
    validateEmail,
    validatePassword,
    validateName
  }