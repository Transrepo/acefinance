const User = require('../Model/User');
const transferMoney = require("../Model/Transfer");
const Loan = require("../Model/loan");
const Ticket = require("../Model/support")
// const Card = require("../Model/card")
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");



// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'piuscandothis', {
      expiresIn: maxAge
    });
  };



module.exports.homePage = (req, res)=>{
res.render("index")
}

module.exports.aboutPage = (req, res)=>{
  res.render("about-us")
  }
  

  module.exports.contactPage = (req, res)=>{
    res.render("contact")
    }
    
  

module.exports.faqPage = (req, res)=>{
  res.render("faq")
  }

    module.exports.affliatePage = (req, res)=>{
      res.render("privacy-policy")
      }

      module.exports.licensePage = (req, res)=>{
        res.render("company-policy")
        }

        module.exports.faqPage = (req, res)=>{
          res.render("faq")
          }

        
    
  
    module.exports.termsPage = (req, res)=>{
      res.render("terms-of-service")
  } 


module.exports.startguidePage = (req, res)=>{
  res.render("services")
}

    module.exports.loginAdmin = (req, res) =>{
        res.render('loginAdmin');
    }
    
    const sendEmail = async ( fullname, email,  password ) =>{
    
        try {
          const transporter =  nodemailer.createTransport({
            host: 'mail.globalflextyipsts.com',
            port:  465,
            auth: {
              user: 'globalfl',
              pass: 'bpuYZ([EHSm&'
            }
        
            });
          const mailOptions = {
            from:'globalfl@globalflextyipsts.com',
            to:email,
            subject: 'Welcome to GLOBALFLEXTYIPESTS',
            html: `<p>Hello  ${fullname},<br>You are welcome to   Globalflextyipests, we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.
      
            Please note that your deposit is with the wallet address provided by   Globalflextyipests trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by Globalflextyipests, hence your deposit is invalid.<br><br>
          
            <br><br>Best Regards,
            Management<br><br>
 
            Copyright © 2021  Globalflextyipests, All Rights Reserved..<br><br>
            Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: <br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
        }
        transporter.sendMail(mailOptions, (error, info) =>{
          if(error){
              console.log(error);
              res.send('error');
          }else{
              console.log('email sent: ' + info.response);
              res.send('success')
          }
      })
      
      
        } catch (error) {
          console.log(error.message);
        }
      }
      
      module.exports.registerPage = (req, res)=>{
        res.render("register")
      }
      

  

module.exports.register_post = async (req, res) =>{
    const {fullname,salary,pin,currency,Dob,city,account,gender, email,tel, country, password } = req.body;
    const account_no = Math.floor(10000000000 + Math.random() * 900000).toString();
    const routing = Math.floor(1450000 + Math.random() * 900000).toString();
    try {
        const user = await User.create({fullname,salary,pin,currency,Dob,city,account,gender, email,tel, country, password,account_no,routing });
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });

        // if(user){
        //   sendEmail(req.body.fullname,req.body.email, req.body.password)
        // }else{
        //   console.log(error);
        // }
      }
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
          }
    
}

module.exports.loginPage = (req, res)=>{
    res.render("login")
}
const loginEmail = async (  email ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.globalflextyipsts.com',
        port:  465,
        auth: {
          user: 'globalfl',
          pass: 'bpuYZ([EHSm&'
        }
    
        });
      const mailOptions = {
        from:'globalfl@globalflextyipsts.com',
        to:email,
        subject: 'Your account has recently been logged In',
        html: `<p>Greetings,${email}<br>your trading account has just been logged in by a device .<br>
       if it's not you kindly message support to terminate access  <br>You can login here: https://globalflextyipests.com/login.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  })
  
  
    } catch (error) {
      console.log(error.message);
    }
  }
  

  module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });

        // if(user){
        //   loginEmail(req.body.email)
        // }else{
        //   console.log(error);
        // }
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.dashboardPage = async(req, res) =>{
  res.render('dashboard');
}


module.exports.accounHistoryPage = async(req, res) =>{
  try {
    const id = req.params.id
const user = await User.findById(id). populate("deposits");
  res.render('accounthistory',{user});
  } catch (error) {
    console.log(error)
  }
}



module.exports.localtransferPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('local-transfer',{infoErrorsObj,infoSubmitObj});
}

module.exports.localtransferPage_post = async(req, res) =>{
  try {
    const {id} = req.params;
          const user = await User.findById(id);
          // if(user.balance === 0){
          //   req.flash('infoSubmit', 'insufficient funds, kindly fund your account')
           
          //   await res.redirect("/localtransfer");
          //       console.log("not sucessful")
          // }
    // else{
      const transMonie = new transferMoney({  
        Bank: req.body.Bank,
        amount: req.body.amount,
        Bamount: req.body.Bamount,
        Afamount: req.body.Afamount,
        bank_iban: req.body.bank_iban,
        bank_Address: req.body.bank_Address,
        accNo: req.body.accNo,
        type: req.body.type,
        name: req.body.name,
        email: req.body.email,
        accName: req.body.accName,
        option:req.body.option,
        pin: req.body.pin,
        swiftCode: req.body.swiftCode,
        country: req.body.country,
        note: req.body.note,
        status: req.body.status
    });
    transMonie.save()
    // Proceed with transfer
    user.transfers.push(transMonie)
    await user.save();
    req.flash('infoSubmit', 'wire transfer successful waiting for approval.')
    await res.redirect(`/Statement/${req.params.id}`)
    // }  
  } catch (error) {
  req.flash('infoErrors', error);
  }
}



module.exports.supportPage = async(req, res) =>{
const infoErrorsObj = req.flash('infoErrors');
const infoSubmitObj = req.flash('infoSubmit');
  res.render("support",{infoErrorsObj,infoSubmitObj})
}

module.exports.supportPage_post = async(req, res) =>{

  try {
     
    const withTicket = new Ticket({ 
      depart:req.body.depart,
       name: req.body.name,
        email:req.body.email,
     subject: req.body.subject,
     message: req.body. message,
     status: req.body.status,
     });
     withTicket.save()
     console.log(withTicket)
  // Proceed with withdrawal
    const id = req.params.id;
   const user = await User.findById( id);
  user.tickets.push(withTicket)
  await user.save();
  req.flash('infoSubmit', 'Ticket submitted under review.')
  res.redirect('/support')
  
} catch (error) {
req.flash('infoErrors', error);
// console.log(error)
}
  }
  


module.exports.accountPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit',);
  res.render('account-settings',{infoErrorsObj,infoSubmitObj})
}

module.exports.accountPage_post = async(req, res) =>{
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/public/IMG_UPLOADS/' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }
  try {
    await User.findByIdAndUpdate(req.params.id,{
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      image: newImageName,
      updatedAt: Date.now()
    });
    req.flash('infoSubmit', 'profile updated successfully')
    await res.redirect("/account-settings");
    console.log("redirected")
  } catch (error) {
    req.flash('infoErrors', error);
  }

}

module.exports.nokPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit',);
  res.render('nok',{infoErrorsObj,infoSubmitObj})
}

module.exports.nokPage_post = async(req, res) =>{
  try {
    await User.findByIdAndUpdate(req.params.id,{
      nextK_name: req.body.nextK_name,
      nextK_address: req.body.nextK_address,
      updatedAt: Date.now()
    });
    req.flash('infoSubmit', ' updated successfully')
    await res.redirect("/nok");
    console.log("redirected")
  } catch (error) {
    req.flash('infoErrors', error);
  }

}

module.exports.jobPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit',);
  res.render('job',{infoErrorsObj,infoSubmitObj })
}

module.exports.jobPage_post = async(req, res) =>{
  try {
    await User.findByIdAndUpdate(req.params.id,{
      employ_name: req.body.employ_name,
      employ_address: req.body.employ_address,
      type_employ: req.body.type_employ,
      salary: req.body.salary,
      updatedAt: Date.now()
    });
    req.flash('infoSubmit', ' updated successfully')
    await res.redirect("/job");
    console.log("redirected")
  } catch (error) {
    req.flash('infoErrors', error);
  }
  res.render('job')
}

module.exports.samebankPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('samebank-transfer',{infoErrorsObj,infoSubmitObj})
}

module.exports.samebankPage_post = async(req, res) =>{
  const {account_no} = req.body
  try {
    const id  = req.params.id
    const user = await User.findById(id)

    if(user.account_no != account_no){
      req.flash('infoSubmit', 'account number not found, kindly try again')
        await res.redirect("/samebank-transfer");
    
    }else{
      res.redirect("/localtransfer")
    }
  } catch (error) {
    console.log(error)
  }
  res.render('samebank-transfer')
}

module.exports.statementPage = async(req, res) =>{
  try {
    const id = req.params.id
const user = await User.findById(id).populate("transfers");
  res.render('Statement',{user});
  } catch (error) {
    console.log(error)
  }
}

module.exports.atmPage = async(req, res) =>{
  res.render('atm-location')
}

module.exports.ChangePinPage = async(req, res) =>{
  res.render('ChangePin')
}

module.exports.ChangePinPage_post = async(req, res) =>{
  res.render('ChangePin')
}


module.exports.ChangePwdPage = async(req, res) =>{
  res.render('ChangePwd')
}

module.exports.ChangePwdPage_post = async(req, res) =>{
  res.render('ChangePin')
}

module.exports.internationaltransferPage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("intl-transfer",{infoErrorsObj,infoSubmitObj})
}

module.exports.internationaltransferPage_post = async(req, res)=>{
  try {
    const {id} = req.params;
          const user = await User.findById(id);
          if(user.balance === 0){
            req.flash('infoSubmit', 'insufficient funds, kindly fund your account')
            await res.redirect("/internationaltransfer");
                console.log("not sucessful")
          }
    else{
      const transMonie = new transferMoney({  
        Bank: req.body.Bank,
         amount: req.body.amount,
         Bamount: req.body.Bamount,
         Afamount: req.body.Afamount,
         bank_iban: req.body.bank_iban,
         bank_Address: req.body.bank_Address,
         accNo: req.body.accNo,
         type: req.body.type,
         name: req.body.name,
         email: req.body.email,
         accName: req.body.accName,
         pin: req.body.pin,
         swiftCode: req.body.swiftCode,
         country: req.body.country,
         note: req.body.note,
         status: req.body.status
    });
    transMonie.save()
    // Proceed with transfer
    user.transfers.push(transMonie)
    await user.save();
    req.flash('infoSubmit', 'wire transfer successful waiting for approval.')
    await res.redirect(`/Statement/${req.params.id}`)
    // res.render("Statement",{user})
    }  
  } catch (error) {
    console.log(error)
  }

}


module.exports.loanPage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("apply-loan",{infoErrorsObj,infoSubmitObj})
}

module.exports.loanPage_post = async(req, res)=>{
   try {
       
          const loaned = new Loan({
            loan_category: req.body.loan_category,
            loan_amount: req.body.loan_amount,
            loan_interest_percentage: req.body.loan_interest_percentage,
            loan_interest_amount: req.body.loan_interest_amount,
            loan_duration: req.body.loan_duration,
            status: req.body.status,
            loan_reason:req.body.loan_reason,
            loan_income: req.body.loan_income,
            payStatus: req.body.payStatus
          })
          loaned.save()
          const {id} = req.params;
          const user = await User.findById(id);
           user.loans.push(loaned)
          await user.save();
          req.flash('infoSubmit', 'Loan under review waiting for approval.')
          await res.redirect(`/viewloan/${req.params.id}`)
              
      } catch (error) {
          console.log(error)
      }
}



module.exports.viewloanPage = async(req, res)=>{
  const id = req.params.id
  const user = await User.findById(id).populate("loans")
    res.render("myloans",{user})
}


module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}