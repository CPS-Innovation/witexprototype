const express = require('express')
const router = new express.Router()

var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY);

// route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});


// Get Sprint and Feature for URL links
router.use('/', (req, res, next) => {
  req.version = req.originalUrl.split('/')[1] // this is added by DC project
  req.feature = req.originalUrl.split('/')[1]
  req.sprint = req.originalUrl.split('/')[2]
  res.locals.version = req.version // this is added by DC project
  res.locals.feature = req.feature
  res.locals.sprint = req.sprint
 // var arse = req.params[0];
  next()
})


// Send emails from notify
// The URL here needs to match the URL of the page that the user is on
// when they type in their email address
// router.post('/*/details', function (req, res) {

//  notify.sendEmail(
    // this long string is the template ID, copy it from the template
    // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
    // in your code.
 //   'b6b7d5e5-6096-4191-9e70-b93483557ca1',
    // `emailAddress` here needs to match the name of the form field in
//    req.body.email
//  );

  // This is the URL the users will be redirected to once the email
  // has been sent
 
//  res.redirect('confirmEmail');

//});


// Send emails from notify
function errorHandler(err, req, res, next) {
  console.error(err);
  next();
}

router.use(errorHandler);

router.post('/*/details', function (req, res, next) {
  notify.sendEmail(
    'b6b7d5e5-6096-4191-9e70-b93483557ca1',
    req.body.email
  );
  next();
}, function(req, res) {
  res.redirect('confirmEmail');
});



// Versions routing stuff - so indivdual routes are in the sub version
router.use(/\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/version-${req.params[0]}/routes`)(req, res, next);
})

console.log('main routes loaded');
router.get('/', (req, res) => {
  res.render('index')
})

/// Employers ID setup

// Start Dummy Data
const dummy_employer_1 = {
  id: "XJBMNV",
  name: "Assurance Aerospace Engineering"
}

const dummy_employer_2 = {
  id: "PPJTRA",
  name: "; DROP TABLE \"COMPANIES\";-- LTD"
}


router.use(function (req, res, next) {
  if (!req.session.employers) {
    console.log("Adding employers to session");
    req.session.employers = [dummy_employer_1, dummy_employer_2];
  }
  next();
})


router.param('employer', function (req, res, next, employer) {
  var employers = req.session.employers.filter(e => e.id == employer);
  if (employers.length == 1) {
    res.locals.employer = employers[0];
  }
  next();
});


///// End of employers ID stuff

// routing the app 
// /// This is just a test version.
// router.get('/version-1/manage-apprenticeships/branch1' , function (req, res) {
//   // Get the answer from the query string (eg. ?over18=false)
//   var over18 = req.query.over18

//   if (over18 === 'false') {
//     // Redirect to the relevant page
//     res.redirect(`/${req.version}/manage-apprenticeships/branch2`)
//   } else {
//     // If over18 is any other value (or is missing) render the page requested
//     res.render(`${req.version}/manage-apprenticeships/branch1`)
//   }
// })

// Redirects for Vanessas end to end
// Employer started
 router.get('/directEmployer', function (req, res) {
   res.redirect(`/version-12/newregister/employerStarted/v3/`)
 })


// Provider started, employer finishes
 router.get('/directProvider', function (req, res) {
  res.redirect("/version-12/newregister/employerStarted/v3/email")
 })


// v11 Homepage back to Vanessas version
 router.get('/version-11/home', function (req, res) {
  res.redirect("https://das-registration-prototype.herokuapp.com/interimHomepage")
 })

// v11 Recruit back to Vanessas version
 router.get('/version-11/recruit', function (req, res) {
  res.redirect("https://das-recruit-prototype.herokuapp.com/raa-v2/0-1-9/recruitment/dashboard-multiple?user=employer&journey=existing&NumberOfEntities=0")
 })





//  ------------------  CPS NAV ----------------------
// CPS > Nav > Home
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/CPSHomeNav', function (req, res) {
  res.redirect(`/${req.version}/redaction`)
 })

  router.get('/*/*/CPSHomeNav', function (req, res) {
  res.redirect(`/${req.version}/redaction`)
 })


  // CPS > Nav > Review
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/CPSreviewNav', function (req, res) {
  res.redirect(`/${req.version}/scrolljourneymodal/casefile`)
 })

  router.get('/*/*/CPSreviewNav', function (req, res) {
  res.redirect(`/${req.version}/scrolljourneymodal/casefile`)
 })

    // CPS > Nav > Redaction
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/CPSRedactNav', function (req, res) {
  res.redirect(`/${req.version}/redaction/tagRedact`)
 })

  router.get('/*/*/CPSRedactNav', function (req, res) {
  res.redirect(`/${req.version}/redaction/tagRedact`)
 })


 router.get('/*/CPSLogDashboard', function (req, res) {
  res.redirect(`/${req.version}/samelog`)
 })

  router.get('/*/*/CPSLogDashboard', function (req, res) {
  res.redirect(`/${req.version}/samelog`)
 })

 router.get('/*/CPSLogLog', function (req, res) {
  res.redirect(`/${req.version}/samelog/addlog`)
 })

  router.get('/*/*/CPSLogLog', function (req, res) {
  res.redirect(`/${req.version}/samelog/addlog`)
 })

   router.get('/*/logReportCPS', function (req, res) {
  res.redirect(`/${req.version}/samelog/CPSLogReport`)
 })

  router.get('/*/*/logReportCPS', function (req, res) {
  res.redirect(`/${req.version}/samelog/CPSLogReport`)
 })

   router.get('/*/helpDAHome', function (req, res) {
  res.redirect(`/${req.version}/helpda`)
 })

  router.get('/*/*/helpDAHome', function (req, res) {
  res.redirect(`/${req.version}/helpda`)
 })


   router.get('/*/helpDAReport', function (req, res) {
  res.redirect(`/${req.version}/helpda/reporting`)
 })

  router.get('/*/*/helpDAReport', function (req, res) {
  res.redirect(`/${req.version}/helpda/reporting`)
 })

     router.get('/*/helpDAInvest', function (req, res) {
  res.redirect(`/${req.version}/helpda/investigation`)
 })

  router.get('/*/*/helpDAInvest', function (req, res) {
  res.redirect(`/${req.version}/helpda/investigation`)
 })

       router.get('/*/helpDATrial', function (req, res) {
  res.redirect(`/${req.version}/helpda/trial`)
 })

  router.get('/*/*/helpDATrial', function (req, res) {
  res.redirect(`/${req.version}/helpda/trial`)
 })


/// Witex nav

 router.get('/*/homeNav', function (req, res) {
  res.redirect(`/${req.version}/caseManagement/index2`)
 })

  router.get('/*/*/homeNav', function (req, res) {
  res.redirect(`/${req.version}/caseManagement/index2`)
 })

 router.get('/*/reportsNav', function (req, res) {
  res.redirect(`/${req.version}/caseManagement/admin/mi`)
 })

  router.get('/*/*/reportsNav', function (req, res) {
  res.redirect(`/${req.version}/caseManagement/admin/mi`)
 })

   router.get('/*/notifyNav', function (req, res) {
  res.redirect(`/${req.version}/caseManagement/admin/notifications`)
 })

  router.get('/*/*/notifyNav', function (req, res) {
  res.redirect(`/${req.version}/caseManagement/admin/notifications`)
 })

     router.get('/*/teamNav', function (req, res) {
  res.redirect(`/${req.version}/caseManagement/admin/team`)
 })

  router.get('/*/*/teamNav', function (req, res) {
  res.redirect(`/${req.version}/caseManagement/admin/team`)
 })

       router.get('/*/paymentsNav', function (req, res) {
  res.redirect(`/${req.version}/caseManagement/admin/download`)
 })

  router.get('/*/*/paymentsNav', function (req, res) {
  res.redirect(`/${req.version}/caseManagement/admin/download`)
 })

router.get('/*/newClaimNav', function (req, res) {
  req.session.data['wakefieldJourney'] = true;
  res.redirect(`/witex-v29-claim/start/areYou`)

 })

  router.get('/*/*/newClaimNav', function (req, res) {
  req.session.data['wakefieldJourney'] = true;
  res.redirect(`/witex-v29-claim/start/areYou`)
 })




/// registration > used service before?
router.get('/*/manage-apprenticeships/signin' , function (req, res) {
  var usedService = req.query.usedService  
  if (usedService === 'false') {
    res.redirect(`/${req.version}/manage-apprenticeships/whatyoullneed`)
  } else {
    res.render(`${req.version}/manage-apprenticeships/signin`)
  }
})

/// registration > used service before? Feb version
/// http://127.0.0.1:3000/version-8/newregister/employerStarted/feb/usedServiceBefore
router.get('/*/manage-apprenticeships/signinFEB' , function (req, res) {
  var usedService = req.query.usedService
  if (usedService === 'false') {
    res.redirect(`/${req.version}/newregister/employerStarted/feb/need`)
  } else {
    res.render(`${req.version}/manage-apprenticeships/signin`)
  }
})



/// registration > used service before? Feb version
/// http://127.0.0.1:3000/version-8/newregister/employerStarted/feb/usedServiceBefore
router.get('/*/manage-apprenticeships/signinAPR' , function (req, res) {
  var usedService = req.query.usedService
  if (usedService === 'false') {
    res.redirect(`/${req.version}/newregister/employerStarted/april/need`)
  } else {
    res.render(`${req.version}/manage-apprenticeships/signin`)
  }
})


// This should remove a trailing slash from the end of the URL that occassionaly breaks the urls and redirects
router.use(function(req, res, next) {
      if (req.path.length > 1 && /\/$/.test(req.path)) {
        var query = req.url.slice(req.path.length)
        res.redirect(301, req.path.slice(0, -1) + query)
      } else {
        next()
      }
    });


// Nav home
//router.get('/version-1/arse', function (req, res) {
 // res.render(`/${req.version}/home/index`);
 //})



router.get('/*/start/witnessTypeOne' , function (req, res) {
  var confirmTraining = req.query.witnessType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              // req.session.data['MG11SheMcRedacted'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`witnessTypeProChoose`)
            
           break;

           case  (confirmTraining == 'No'):
           // req.session.data['MG11SheMcNotRedacted'] = true;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`whoClaiming`)
            
        default:
            console.log("bork bork bork bork");
                     // req.session.data['MG11SheMcRedacted'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`whoClaiming`)
            break;
        }
})

router.get('/*/start/witnessTypeTwo' , function (req, res) {
  var confirmTraining = req.query.witnessType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              // req.session.data['MG11SheMcRedacted'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`tbc`)
            
           break;

           case  (confirmTraining == 'No'):
           // req.session.data['MG11SheMcNotRedacted'] = true;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`whoClaiming`)
            
        default:
            console.log("bork bork bork bork");
                     // req.session.data['MG11SheMcRedacted'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`whoClaiming`)
            break;
        }
})



router.get('/*/start/claimPayRoute' , function (req, res) {
  var confirmTraining = req.query.employmentType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['employmentTypeShow'] = true;
              req.session.data['lossPayShow'] = false;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`overnightStay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['employmentTypeShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`lossOfPay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`overnightStay`)
            break;
        }
})   

router.get('/*/start/lossPayRoute' , function (req, res) {
  var confirmTraining = req.query.lossPay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['lossPayShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`overnightStay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['lossPayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`overnightStay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['lossPayShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`overnightStay`)
            break;
        }
})



router.get('/*/start/overNightStayRoute' , function (req, res) {
  var confirmTraining = req.query.overnightStay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['overNightStayShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`travel`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['overNightStayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`travel`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['overNightStayShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`travel`)
            break;
        }
})

router.get('/*/start/travelRoute' , function (req, res) {
  var confirmTraining = req.query.travelclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['travelShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['travelShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['travelShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`travel`)
            break;
        }
})


router.get('/*/start/childcareRoute' , function (req, res) {
  var confirmTraining = req.query.childcare
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['childcareShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['childcareShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`petSitting`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})

router.get('/*/start/foodRoute2' , function (req, res) {
  var confirmTraining = req.query.foodclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['foodShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../foodanddrink`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['foodShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`travel`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`travel`)
            break;
        }
})

router.get('/*/start/travelRoute2' , function (req, res) {
  var confirmTraining = req.query.travelclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['travelShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../travel`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['travelShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`overnightStay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['travelShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`overnightStay`)
            break;
        }
})

router.get('/*/start/overNightStayRoute2' , function (req, res) {
  var confirmTraining = req.query.overnightStay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['overNightStayShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../overnightstay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['overNightStayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`lossOfPay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['overNightStayShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`lossOfPay`)
            break;
        }
})

router.get('/*/start/overNightStayRoute3' , function (req, res) {
  var confirmTraining = req.query.overnightStay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['overNightStayShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../overnightstay/stayDays`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['overNightStayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`lossOfPay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['overNightStayShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`lossOfPay`)
            break;
        }
})


router.get('/*/start/overNightStayRoute4' , function (req, res) {
  var confirmTraining = req.query.overnightStay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['overNightStayShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../overnightstay/whyPay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['overNightStayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../receipts/add`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['overNightStayShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`lossOfPay`)
            break;
        }
})

router.get('/*/overnightstay/paidAlready' , function (req, res) {
  var confirmTraining = req.query.overnightPaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`meal`)
            
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`accomodation`)
            
        default:
            console.log("bork bork bork bork");

              res.redirect(`meal`)
            break;
        }
})

router.get('/*/overnightstay/paidAlready2' , function (req, res) {
  var confirmTraining = req.query.overnightPaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`why`)
            
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`accomodation`)
            
        default:
            console.log("bork bork bork bork");   

              res.redirect(`meal`)
            break;
        }
})

router.get('/*/overnightstay/paidAlready3' , function (req, res) {
  var confirmTraining = req.query.overnightPaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`whyPay`)
            
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`accomodation`)
            
        default:
            console.log("bork bork bork bork");

              res.redirect(`meal`)
            break;
        }
})

router.get('/*/overnightstay/didUserPay' , function (req, res) {
  var confirmTraining = req.query.overnightUserPaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
          req.session.data['userPaidOvernight'] = 'yes';
              res.redirect(`nights`)
            
           break;

           case  (confirmTraining == 'No'):
            req.session.data['userPaidOvernight'] = 'no';
            res.redirect(`nights`)
            
        default:
            console.log("bork bork bork bork");
            req.session.data['userPaidOvernight'] = 'yes';
              res.redirect(`nights`)
            break;
        }
})

router.get('/*/overnightstay/didUserPay2' , function (req, res) {
  var confirmTraining = req.query.overnightUserPaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
         req.session.data['userPaidOvernight'] = 'no';
              res.redirect(`why`)
            
           break;

           case  (confirmTraining == 'No'):
            req.session.data['userPaidOvernight'] = 'no';
            res.redirect(`meal`)
            
        default:
            console.log("bork bork bork bork");
            req.session.data['userPaidOvernight'] = 'yes';
              res.redirect(`nights`)
            break;
        }
})

router.get('/*/overnightstay/whereHotelRoute' , function (req, res) {

    var confirmTraining = req.session.data['userPaidOvernight']
       switch (true) {
          case  (confirmTraining == 'yes'):
              res.redirect(`whereHotel`)
            
           break;

           case  (confirmTraining == 'no'):
            res.redirect(`../start/lossOfPay`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`3`)
            break;
        }
})


router.get('/*/start/employedornotroute' , function (req, res) {

    var confirmTraining = req.query.workornot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`employedornot`)
            
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`childcare`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`3`)
            break;
        }
})

router.get('/*/start/selfemployedornotroute' , function (req, res) {

    var confirmTraining = req.query.employedornot
       switch (true) {
          case  (confirmTraining == 'Employed'):
              res.redirect(`../unpaidDay`)
            
           break;

           case  (confirmTraining == 'Self employed'):
            res.redirect(`../selfEmployed/lostIncome`)
             break;

                 case  (confirmTraining == 'Director'):
            res.redirect(`../ltdDirector`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`3`)
            break;
        }
})

router.get('/*/start/selfemployedornotroute2' , function (req, res) {

    var confirmTraining = req.query.employedornot
       switch (true) {
          case  (confirmTraining == 'Employed'):
              res.redirect(`../lossOfPay`)
            
           break;

           case  (confirmTraining == 'Self employed'):
            res.redirect(`../selfEmployed`)
             break;

                 case  (confirmTraining == 'Director'):
            res.redirect(`../ltdDirector`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`3`)
            break;
        }
})

router.get('/*/start/lossPayRoute2' , function (req, res) {
  var confirmTraining = req.query.lossPay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['lossPayShow'] = true;
              req.session.data['employmentTypeShow'] = false;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../unpaidDay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['lossPayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`yourWork`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['lossPayShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            break;
        }
})

router.get('/*/lossOfPay/unpaiddayoffroute' , function (req, res) {
  var confirmTraining = req.query.unpaiddayoff
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['lossPayShow'] = true;
              req.session.data['employmentTypeShow'] = false;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../unpaidDay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['lossPayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['lossPayShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            break;
        }
})

router.get('/*/lossOfPay/unpaiddayoffroute2' , function (req, res) {
  var confirmTraining = req.query.unpaiddayoff
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['lossPayShow'] = true;
              req.session.data['employmentTypeShow'] = false;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`payDays`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['lossPayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['lossPayShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            break;
        }
})

router.get('/*/ltdDirector/directorunpaiddayoffroute' , function (req, res) {
  var confirmTraining = req.query.unpaiddayoff
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['lossPayShow'] = true;
              req.session.data['employmentTypeShow'] = false;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`timeOff`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['lossPayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['lossPayShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            break;
        }
})

router.get('/*/start/claimPayRoute2' , function (req, res) {
  var confirmTraining = req.query.employmentType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['employmentTypeShow'] = true;
              res.redirect(`childcare`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['employmentTypeShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            break;
        }
})

router.get('/*/selfEmployed/claimPayRoute3' , function (req, res) {
  var confirmTraining = req.query.employmentType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['employmentTypeShow'] = true;
              res.redirect(`lostIncome`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['employmentTypeShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`hired`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`3`)
            break;
        }
})

router.get('/*/selfEmployed/claimPayRoute4' , function (req, res) {
  var confirmTraining = req.query.employmentType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['employmentTypeShow'] = true;
              res.redirect(`lostIncome`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['employmentTypeShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`3`)
            break;
        }
})

router.get('/*/selfEmployed/lostIncome/losemore85route' , function (req, res) {
  var confirmTraining = req.query.losemore85
       switch (true) {
          case  (confirmTraining == 'Yes'):
            
              res.redirect(`../../start/childcare`)
            
           break;

           case  (confirmTraining == 'No'):
         
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`takeHomePay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`3`)
            break;
        }
})

router.get('/*/selfEmployed/hired/doworkforyouroute' , function (req, res) {
  var confirmTraining = req.query.doWork4You
       switch (true) {
          case  (confirmTraining == 'Yes'):
            
              res.redirect(`days`)
            
           break;

           case  (confirmTraining == 'No'):
         
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../../start/childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`3`)
            break;
        }
})

router.get('/*/selfEmployed/hired/losemorePaidroute' , function (req, res) {
  var confirmTraining = req.query.losemorePaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
            
              res.redirect(`proof`)
            
           break;

           case  (confirmTraining == 'No'):
         
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`takeHomePay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`3`)
            break;
        }
})

router.get('/*/start/childcareRoute2' , function (req, res) {  
  var confirmTraining = req.query.childcare
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['childcareShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../childcare`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['childcareShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`petSitting`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})

router.get('/*/start/childcareRoute3' , function (req, res) {
  var confirmTraining = req.query.childcare
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['childcareShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../childcare`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['childcareShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`carer`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})


router.get('/*/ofstedRoute' , function (req, res) {
  var confirmTraining = req.query.ofsted
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['childcareShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare/ofsted`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['childcareShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`childcare/notOfsted`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})

router.get('/*/start/petsittingRoute2' , function (req, res) {
  var confirmTraining = req.query.petsitting
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../pet/petCost`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`otherExpenses`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})

router.get('/*/start/carerRoute2' , function (req, res) {
  var confirmTraining = req.query.carer
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../carer/careCost`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`petSitting`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})

router.get('/*/start/carerRoute3' , function (req, res) {
  var confirmTraining = req.query.carer
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../carer/careCost`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`otherExpenses`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})

router.get('/*/start/carerRoute4' , function (req, res) {
  var confirmTraining = req.query.carer
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../carer/careCost`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../receipts/add`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})

router.get('/*/start/otherRoute2' , function (req, res) {
  var confirmTraining = req.query.otherexpenses
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['otherShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../otherExpenses`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['other'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../receipts`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`./receipts`)
            break;
        }
})

router.get('/*/start/otherRoute3' , function (req, res) {
  var confirmTraining = req.query.otherexpenses
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['otherShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../otherExpenses`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['other'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../receipts/add`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`./receipts/add`)
            break;
        }
})


router.get('/*/payyou/paymetypeRoute2' , function (req, res) {
  var confirmTraining = req.query.paymetype
       switch (true) {
          case  (confirmTraining == 'UK bank or building society'):
             // req.session.data['Show'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`ukbank`)
           break;

    
          case  (confirmTraining == 'Cheque'):
            res.redirect(`cheque`)

              case  (confirmTraining == 'Bank outside UK'):
            res.redirect(`intbank`)
            
        default:
            console.log("bork bork bork bork");
             //   req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`./receipts`)
            break;
        }
})

router.get('/*/unpaidDay/takeHomeRoute2' , function (req, res) {
  var confirmTraining = req.query.takehome
       switch (true) {
          case  (confirmTraining == 'Yes'):
             // req.session.data['Show'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`confirmUnpaid`)
           break;

           case  (confirmTraining == 'No'):
          // req.session.data['other'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`takeHomePay`)

          case  (confirmTraining == 'Dont know'):
            res.redirect(`takeHomePay`)
            
        default:
            console.log("bork bork bork bork");
             //   req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`./receipts`)
            break;
        }
})

router.get('/*/unpaidDay/payProof2' , function (req, res) {
  var confirmTraining = req.query.uploadProof
       switch (true) {
          case  (confirmTraining == 'Give employer details'):
             // req.session.data['Show'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`employerDetails`)
           break;
                     case  (confirmTraining == 'Limited Company Details'):
             // req.session.data['Show'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`companyDetails`)
           break;

           case  (confirmTraining == 'Upload proof'):
          // req.session.data['other'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/childcare`)

            
        default:
            console.log("bork bork bork bork");
             //   req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../start/childcare`)
            break;
        }
})

router.get('/*/ltdDirector/payProof3' , function (req, res) {
  var confirmTraining = req.query.uploadProof
       switch (true) {
          case  (confirmTraining == 'Give employer details'):
             // req.session.data['Show'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`employerDetails`)
           break;

           case  (confirmTraining == 'Upload proof'):
          // req.session.data['other'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/childcare`)

            
        default:
            console.log("bork bork bork bork");
             //   req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../start/childcare`)
            break;
        }
})

router.get('/*/start/travelRoute3' , function (req, res) {
  var confirmTraining = req.query.travelclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['travelShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../travel`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['travelShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../payyou`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['travelShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../payyou`)
            break;
        }
})

router.get('/*/start/travelRoute4' , function (req, res) {
  var confirmTraining = req.query.travelclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['travelShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../travel`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['travelShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/overnightStay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['travelShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../overnightStay`)
            break;
        }
})

router.get('/*/foodRoute' , function (req, res) {
  var confirmTraining = req.query.foodclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              // req.session.data['travelShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`foodRadioHowMany`)
            
           break;

           case  (confirmTraining == 'No'):
           // req.session.data['travelShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/travel`)
            
        default:
            console.log("bork bork bork bork");
                // req.session.data['travelShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(``)
            break;
        }
})



router.get('/*/travel/higherMileRoute' , function (req, res) {
  var confirmTraining = req.query.higherMile
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`whyHigher`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`otherWitnesses`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/higherMileRouteBike' , function (req, res) {
  var confirmTraining = req.query.higherMileBike
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`motorbike/whyHigher`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`motorbike/otherWitnesses`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/*/otherWitnessRoute' , function (req, res) {
  var confirmTraining = req.query.otherWitnesses
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`howManyWitness`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`miles`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/*/parkingRoute' , function (req, res) {
  var confirmTraining = req.query.parkOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
            req.session.data['needReceiptPark'] = true;
              res.redirect(`howMuchPark`)
           break;

           case  (confirmTraining == 'No'):
           req.session.data['needReceiptPark'] = false;
            res.redirect(`otherDriving`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})



router.get('/*/travel/parkingRoute2' , function (req, res) {
  var confirmTraining = req.query.parkOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
            req.session.data['needReceiptPark'] = true;
              res.redirect(`howMuchParkReceipts`)
           break;

           case  (confirmTraining == 'No'):
           req.session.data['needReceiptPark'] = false;
            res.redirect(`otherDriving`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/parkingRoute2b' , function (req, res) {
  var confirmTraining = req.query.parkOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`howMuchParkReceipts`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`otherDriving`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/parkingRoute3' , function (req, res) {
  var confirmTraining = req.query.parkinghaveReceipts
       switch (true) {
          case  (confirmTraining == 'yes'):
             req.session.data['haveSomeRecipts'] = true;
              res.redirect(`otherDriving`)
           break;

           case  (confirmTraining == 'No, I have some of my receipt(s)'):
            req.session.data['haveSomeRecipts'] = true;
            res.redirect(`otherDriving`)
             break;

           case  (confirmTraining == 'No, I dont have any of my receipts'):
            res.redirect(`otherDriving`)
             break;
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/travel/otherDrivingRoute' , function (req, res) {
  var confirmTraining = req.query.drivingCostsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`multiTravelRouterCar`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/otherDrivingRoute2' , function (req, res) {
  var confirmTraining = req.query.drivingCostsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
            req.session.data['needReceiptDrive'] = true;
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No'):
           req.session.data['needReceiptDrive'] = false;
            res.redirect(`multiTravelRouterCar2`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/otherDrivingRoute3' , function (req, res) {
  var confirmTraining = req.query.drivingCostsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`../receipts/`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/*/otherDrivingRoute4' , function (req, res) {
  var confirmTraining = req.query.drivingCostsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`../start/overnightStay/`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/*/otherDrivingRouteBike' , function (req, res) {
  var confirmTraining = req.query.drivingCostsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`../../start/overnightStay/`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/travel/parkingRoute' , function (req, res) {
  var confirmTraining = req.query.parkinghaveReceipts
       switch (true) {
          case  (confirmTraining == 'Yes'):
           req.session.data['haveSomeRecipts'] = true;
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No, I have some of my receipt(s)'):
            req.session.data['haveSomeRecipts'] = true;
             res.redirect(`otherDrivingCost`)
            break;

            case  (confirmTraining == 'No, I dont have any of my receipts'):
             res.redirect(`otherDrivingCost`)
            break;


        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/receipts/receiptsEndDecide' , function (req, res) {
  var confirmTraining = req.query.receiptsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
            req.session.data['needReceiptDrive'] = true;
              res.redirect(`add`)
           break;

           case  (confirmTraining == 'No, I have some of my receipt(s)'):
           req.session.data['haveSomeRecipts'] = true;
            res.redirect(`reasonWhy`)
            break;

         case  (confirmTraining == 'No, I dont have any of my receipt(s)'):
              req.session.data['haveSomeRecipts'] = false;
              res.redirect(`reasonWhy`)
           break;
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/anotherDayRouter' , function (req, res) {
  var confirmTraining = req.query.thingsCorrect
       switch (true) {
          case  (confirmTraining == 'yes'):
             req.session.data['dayNumber'] = "2";
              res.redirect(`./start/courtDetailsMultiDay`)
           break;

           case  (confirmTraining == 'no'):
            res.redirect(`start/courtDetails`)
            break;
     
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/anotherBankRouter' , function (req, res) {
  var confirmTraining = req.query.thingsCorrect
       switch (true) {
          case  (confirmTraining == 'yes'):
             req.session.data['dayNumber'] = "2";
             req.session.data['bankOrNot'] = "noBank";
              res.redirect(`../checkdetails`)
           break;

           case  (confirmTraining == 'no'):
             res.redirect(`../payyou`)
            break;
     
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/addOrRemoveRouter' , function (req, res) {
  var confirmTraining = req.query.addorremove
       switch (true) {
          case  (confirmTraining == 'add'):
              res.redirect(`addThing`)
           break;

           case  (confirmTraining == 'remove'):
             res.redirect(`removeThing`)
            break;
     
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/compAllowRoute' , function (req, res) {
  var confirmTraining = req.query.compAllow
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`compAllow/chooseComp`)
           break;

           case  (confirmTraining == 'No'):
             res.redirect(`./start//travel`)
            break;
     
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/receipts/receiptMissingRoute' , function (req, res) {
  
       switch (true) {
        case  (req.session.data['haveSomeRecipts'] == true):
         res.redirect(`add`)
          break;

       case  (req.session.data['haveSomeRecipts'] == false):
         res.redirect(`../payyou`)
          break;
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/changeDay' , function (req, res) {
   var confirmTraining = req.query.keepDetailsDay2
       switch (true) {

          case  (confirmTraining == 'Yes'):
        req.session.data['dayNumber'] = "2";

         res.redirect(`../anotherDay`)
          break;

case  (confirmTraining == 'No'):
     req.session.data['dayNumber'] = "1";
         res.redirect(`index3`)
          break;
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/otherDayCheckDetails', function(req, res) {

    switch (true) {

        case (req.session.data['dayNumber'] == "2"):
            req.session.data['dayNumber'] = "1";
            res.redirect(`./Finish/index3`)
            break;

        case (req.session.data['dayNumber'] == "1"):
            res.redirect(`./Finish/index2`)
            break;

        default:
            console.log("bork bork bork bork");
            res.redirect(`../bork`)
            break;
    }
})



router.get('/*/startItUp', function(req, res) {

req.session.data['dayNumber'] = "1";
res.redirect(`./start/screener`)

})

router.get('/*/startItUp2', function(req, res) {

req.session.data['dayNumber'] = "1";
res.redirect(`./start/whatyoullneed`)

})



router.get('/*/day1Router', function(req, res) {

req.session.data['dayNumber'] = "1";
res.redirect(`./start/courtDetailsMultiDay`)

})

router.get('/*/day2Router', function(req, res) {

req.session.data['dayNumber'] = "2";
res.redirect(`./start/courtDetailsMultiDay2`)

})


router.get('/*/taskListCheckDetails', function(req, res) {

    var dayNumberA = req.session.data['dayNumber']
    if (dayNumberA == "1") {
        // req.session.data['taskListDay1'] = "true";
        //   req.session.data['taskListDay2'] = "false";
        res.redirect(`./tasklist`)
    } else {
        // req.session.data['taskListDay2'] = "true";
        res.redirect(`./tasklist`)
    }
})



router.get('/*/eligibilityNoteRouter', function(req, res) {
    req.session.data['cmsChosen'] = true;
    res.redirect(`cmsCheck`)
})


router.get('/*/manage-apprenticeships/signinFEB' , function (req, res) {
  var usedService = req.query.usedService
  if (usedService === 'false') {
    res.redirect(`/${req.version}/newregister/employerStarted/feb/need`)
  } else {
    res.render(`${req.version}/manage-apprenticeships/signin`)
  }
})


// NOT SURE HOW ELSE TO DO THIS, SETS UP ALL THE OTHER req.session stuff before going into task list for first time

router.get('/*/start/petSittingRoute' , function (req, res) {
  var confirmTraining = req.query.petsitting
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['petSittingShow'] = true;
                      req.session.data['trainCostShow'] = false;
                      req.session.data['tubeCostShow'] = false;
                      req.session.data['foodAndDrinkShow'] = false;
                        req.session.data['petConfirmedShow'] = false;
              res.redirect(`../tasklist`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['petSittingShow'] = false;
                  req.session.data['trainCostShow'] = false;
                  req.session.data['tubeCostShow'] = false;
                  req.session.data['foodAndDrinkShow'] = false;
                   req.session.data['petConfirmedShow'] = false;
            res.redirect(`../tasklist`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../tasklist`)
            break;
        }
})

router.get('/*/start/setupTaskListRoute' , function (req, res) {

            req.session.data['overNightStayShow'] = true;
          req.session.data['lossPayShow'] = true;
          req.session.data['employmentTypeShow'] = true;
            req.session.data['petSittingShow'] = true;
            req.session.data['childcareShow'] = true;
            req.session.data['travelShow'] = true;
  
              req.session.data['trainCostShow'] = false;
              req.session.data['tubeCostShow'] = false;
              req.session.data['foodAndDrinkShow'] = false;
              req.session.data['petConfirmedShow'] = false;
              req.session.data['receiptDoneShow'] = false;
              res.redirect(`../tasklist`)
   
})



// travel in the tasklist route v3
router.get('/*/travel/transportChoiceRoute' , function (req, res) {
  var confirmTraining = req.query.transportChoice
       switch (true) {
          case  (confirmTraining == 'Train'):
              // req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            
           break;

           case  (confirmTraining == 'Tube/subway/tram'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`tubeCost`)
            
        default:
            console.log("bork bork bork bork");
                // req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            break;
        }
})


// travel in the tasklist route v3
router.get('/*/travel/transportChoiceRoute2' , function (req, res) {
  var confirmTraining = req.query.transportChoice
       switch (true) {
          case  (confirmTraining == 'Public transport'):
              // req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            
           break;

           case  (confirmTraining == 'Car'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`car`)
             break;

        case  (confirmTraining == 'Motorbike/scooter'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`motorbike`)
             break;

        case  (confirmTraining == 'Bicycle'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`bicycle`)
             break;

        case  (confirmTraining == 'Taxi'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`taxi`)
             break;
                     case  (confirmTraining == 'Coach'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`coach`)
             break;
            
        default:
            console.log("bork bork bork bork");
                // req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            break;
        }
})

// travel in the tasklist route v3
router.get('/*/travel/transportChoiceRoute3' , function (req, res) {
  var confirmTraining = req.query.transportChoice
       switch (true) {
          case  (confirmTraining == 'Train'):
              // req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            
           break;

           case  (confirmTraining == 'Car'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`car`)
                 break;

        case  (confirmTraining == 'Motorbike/scooter'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`motorbike/otherWitnesses`)
                 break;

        case  (confirmTraining == 'Bicycle'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`bicycle`)
                 break;

        case  (confirmTraining == 'Taxi'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`taxi`)
                 break;

          case  (confirmTraining == 'Coach'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`coach`)
                 break;

          case  (confirmTraining == 'Bus/Tram/Metro outside London'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`notLondon`)
                 break;

           case  (confirmTraining == 'London transport'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`londonTransport`)
                 break;

             case  (confirmTraining == 'Air'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`air`)
                 break;

            case  (confirmTraining == 'Sea'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`sea`)
                 break;
            
        default:
            console.log("bork bork bork bork");
                // req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            break;
        }
})


// travel in the tasklist route v3
router.get('/*/travel/transportChoiceRoute4' , function (req, res) {
  var confirmTraining = req.query.transportChoice
       switch (true) {
          case  (confirmTraining == 'Train'):
              // req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCostReceipts`)
            
           break;

           case  (confirmTraining == 'Car'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`car`)

        case  (confirmTraining == 'Motorbike/scooter'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`motorbike`)

        case  (confirmTraining == 'Bicycle'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`bicycle`)

        case  (confirmTraining == 'Taxi'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`taxi`)
            
        default:
            console.log("bork bork bork bork");
                // req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCostReceipts`)
            break;
        }
})

// travel in the tasklist route v3
router.get('/*/transportChoiceRoute5' , function (req, res) {
  var confirmTraining = req.query.transportChoice
       switch (true) {

             case  (confirmTraining == 'Public transport'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../publicQuestion`)
                 break;

           case  (confirmTraining == 'Car'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../car`)
                 break;

        case  (confirmTraining == 'Motorbike/scooter'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../motorbike/otherWitnesses`)
                 break;

        case  (confirmTraining == 'Bicycle'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../bicycle`)
                 break;

        case  (confirmTraining == 'Taxi'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../taxi`)
                 break;
            
        default:
            console.log("bork bork bork bork");
                // req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            break;
        }
})


// travel 
router.get('/*/publicTransportCostRouter' , function (req, res) {
  var confirmTraining = req.query.publicTransportCost
       switch (true) {

             case  (confirmTraining == 'Yes'):
            res.redirect(`publicTransport/recieptsNeeded`)
                 break;

           case  (confirmTraining == 'No'):
            res.redirect(`publicTransport/noRecieptsNeeded`)
                 break;
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`trainCost`)
            break;
        }
})


// travel in the tasklist route v3 - setting to show pub transport after
router.get('/*/travel/multiTravelRouterPubTrain' , function (req, res) {
      var confirmTraining = req.query.haveReceipts
       switch (true) {
          case  (confirmTraining == 'yes'):
            req.session.data['haveSomeRecipts'] = true;
              res.redirect(`car`)
           break;

           case  (confirmTraining == 'No, I have some of my receipt(s)'):
           req.session.data['haveSomeRecipts'] = true;
            res.redirect(`car`)
            break;

         case  (confirmTraining == 'No, I dont have any of my receipts'):
              res.redirect(`car`)
           break;
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../start/overnightStay`)
            break;
        }
    
})

// screener at the beginning
router.get('/*/screenerRoute' , function (req, res) {
      var confirmTraining = req.query.screener
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`courtDetails`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`blueForm`)
            break;

            
        default:
            console.log("bork bork bork bork");
              res.redirect(`blueForm`)
            break;
        }
        

})

// screener at the beginning
router.get('/*/screenerRoute2' , function (req, res) {
      var confirmTraining = req.query.screener
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`dob`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`blueForm`)
            break;

            
        default:
            console.log("bork bork bork bork");
              res.redirect(`blueForm`)
            break;
        } 
})

// screener at the beginning
router.get('/*/screenerRoute3' , function (req, res) {
      var confirmTraining = req.query.screener
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`areYou`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`blueForm`)
            break;

            
        default:
            console.log("bork bork bork bork");
              res.redirect(`blueForm`)
            break;
        } 
})




// 
router.get('/*/moreContact' , function (req, res) {

       switch (true) {
        case  (req.session.data['areWitness'] == true):
         res.redirect(`details`)
          break;
  
        default:
 
            res.redirect(`whoFillingIn`)
        break;
        }
})

// witness type beginning
router.get('/*/areYouRouter' , function (req, res) {
      var confirmTraining = req.query.claimerType
       switch (true) {
          case  (confirmTraining == 'The witness'):
              res.redirect(`dob`)
           break;

           case  (confirmTraining == 'Helping a witness with their claim'):
            res.redirect(`helping/details`)
            break;

            case  (confirmTraining == 'Claiming but not a witness'):
            res.redirect(`notWitness/why`)
            break;

        default:
            console.log("bork bork bork bork");
              res.redirect(`blueForm`)
            break;
        } 
})

// witness type beginning
router.get('/*/areYouRouter2' , function (req, res) {
      var confirmTraining = req.query.claimerType
       switch (true) {
          case  (confirmTraining == 'The witness'):
                req.session.data['areWitness'] = true;
              res.redirect(`witName`)
           break;

    
            case  (confirmTraining == 'Claiming but not a witness'):
                 req.session.data['areWitness'] = false;
            res.redirect(`notWitness/why`)
            break;

        case  (confirmTraining == 'claiming for a child or dependent'):
            req.session.data['areWitness'] = false;
            res.redirect(`witName`)
            break;

                   case  (confirmTraining == 'helping someone else with their claim'):
                    req.session.data['areWitness'] = false;
            res.redirect(`witName`)
            break;

        default:
            console.log("bork bork bork bork");
            req.session.data['areWitness'] = false;
              res.redirect(`blueForm`)
            break;
        } 
})

// witness type beginning
router.get('/*/nonWitRouter2' , function (req, res) {
      var confirmTraining = req.query.whyNoWitness
       switch (true) {
          case  (confirmTraining == "I'm a parent or guardian of a witness under 18"):
            req.session.data['showDB'] = true;
              res.redirect(`child`)
           break;

           case  (confirmTraining == "I'm the carer of a witness"):
            req.session.data['showDB'] = false;
            res.redirect(`details`)
            break;

            case  (confirmTraining == 'Other'):
                req.session.data['showDB'] = false;
            res.redirect(`details`)
            break;

        default:
            console.log("bork bork bork bork");
              res.redirect(`blueForm`)
            break;
        } 
})

// witness type beginning
router.get('/*/nonWitRouter3' , function (req, res) {
      var confirmTraining = req.query.whyNoWitness
       switch (true) {
          case  (confirmTraining == "I'm a parent or guardian of a witness under 18"):
            req.session.data['showDB'] = true;
              res.redirect(`details`)
           break;

           case  (confirmTraining == "I'm the carer of a witness"):
            req.session.data['showDB'] = false;
            res.redirect(`details`)
            break;

            case  (confirmTraining == 'Other'):
                req.session.data['showDB'] = false;
            res.redirect(`details`)
            break;

        default:
            console.log("bork bork bork bork");
              res.redirect(`blueForm`)
            break;
        } 
})

// witness type beginning
router.get('/*/childRouterA' , function (req, res) {
      var confirmTraining = req.query.claimChild
       switch (true) {
          case  (confirmTraining == "yes"):
            req.session.data['childOrNot'] = true;
              res.redirect(`details`)
           break;

           case  (confirmTraining == "no"):
            req.session.data['childOrNot'] = false;
            res.redirect(`details`)
            break;



        default:
            console.log("bork bork bork bork");
              res.redirect(`blueForm`)
            break;
        } 
})

// witness type beginning
router.get('/*/childRouterB' , function (req, res) {
      var confirmTraining = req.query.claimChild
       switch (true) {
          case  (confirmTraining == "yes"):
            req.session.data['childOrNot'] = true;
             req.session.data['areWitness'] = false;
              res.redirect(`../witName`)
           break;

           case  (confirmTraining == "no"):
            req.session.data['childOrNot'] = false;
            res.redirect(`../areYou`)
            break;



        default:
            console.log("bork bork bork bork");
              res.redirect(`blueForm`)
            break;
        } 
})

// witness type beginning
router.get('/*/whoFillingRouter' , function (req, res) {
      var confirmTraining = req.query.fillerType
       switch (true) {
          case  (confirmTraining == "one"):
              res.redirect(`something`)
           break;

           case  (confirmTraining == "two"):
            res.redirect(`areYou`)
            break;

            // case  (confirmTraining == 'Other'):
            //     req.session.data['showDB'] = false;
            // res.redirect(`details`)
            // break;

        default:
            console.log("bork bork bork bork");
              res.redirect(`blueForm`)
            break;
        } 
})


// finish router
router.get('/*/finishRouter' , function (req, res) {
      var confirmTraining = req.session.data['dayNumber']

       switch (true) {
          case  (confirmTraining == "2"):
              res.redirect(`./Finish/index3`)
           break;

            // case  (confirmTraining == 'Other'):
            //     req.session.data['showDB'] = false;
            // res.redirect(`details`)
            // break;

        default:
            console.log("bork bork bork bork");
              res.redirect(`./Finish/index2`)
            break;
        }

})

// finish router
router.get('/*/payRouter2Day' , function (req, res) {
      var confirmTraining = req.session.data['dayNumber']

       switch (true) {
          case  (confirmTraining == "2"):
              res.redirect(`../anotherDay/anotherBank`)
           break;

            // case  (confirmTraining == 'Other'):
            //     req.session.data['showDB'] = false;
            // res.redirect(`details`)
            // break;

        default:
            console.log("bork bork bork bork");
              res.redirect(`../payyou`)
            break;
        }

})


// route the multi travel things
router.get('/*/nonWitRouterDetails' , function (req, res) {

       switch (true) {
        case  (req.session.data['showDB'] == true):
         res.redirect(`dob`)
          break;

        case  (req.session.data['showDB'] == false):
         res.redirect(`whichCourt`)
          break;
  
        default:
 
               res.redirect(`dob`)
        break;
        }
})


// witness type beginning
router.get('/*/helperRouter' , function (req, res) {
      var confirmTraining = req.query.fillerType
       switch (true) {
          case  (confirmTraining == 'one'):
             req.session.data['witHelper'] = false;
              res.redirect(`details`)
           break;

           case  (confirmTraining == 'two'):
            req.session.data['witHelper'] = true;
            res.redirect(`details`)
            break;

        default:
            console.log("bork bork bork bork");
              res.redirect(`blueForm`)
            break;
        } 
})

// travel in the tasklist route v3 - setting to show pub transport after
router.get('/*/travel/multiTravelRouterPubTrans' , function (req, res) {
         req.session.data['showReceipt'] = true;
              res.redirect(`car`)
})

router.get('/*/travel/multiTravelRouterCar' , function (req, res) {
         req.session.data['showPubTrans'] = false;
         req.session.data['showCar'] = false;
              res.redirect(`multiTravelRouter`)
})

router.get('/*/travel/multiTravelRouterCar2' , function (req, res) {
         req.session.data['showPubTrans'] = false;
         req.session.data['showCar'] = false;
              res.redirect(`multiTravelRouter`)
})


// route the multi travel things
router.get('/*/travel/multiTravelRouter' , function (req, res) {
       switch (true) {
        case  (req.session.data['showPubTrans'] == true):
         res.redirect(`../bork`)
          break;
        case  (req.session.data['needReceiptPark'] == true  || req.session.data['needReceiptDrive'] == true ||  req.session.data['showReceipt'] == true || req.session.data['haveSomeRecipts'] == true):
         res.redirect(`../receipts/add`)
          break;
        case  (req.session.data['needReceiptPark'] == false && req.session.data['needReceiptDrive'] == false):
         res.redirect(`../payyou`)
          break;
            
        default:
            res.redirect(`../payyou`)
        break;
        }
})

// v7 router to make the receipts question show at the end
router.get('/*/travel/receiptRouter' , function (req, res) {
       switch (true) {
        case  (req.session.data['showPubTrans'] == true):
         res.redirect(`../bork`)
          break;
        case  (req.session.data['needReceiptPark'] == true  || req.session.data['needReceiptDrive'] == true ||  req.session.data['showReceipt'] == true || req.session.data['haveSomeRecipts'] == true):
         res.redirect(`../receipts/`)
          break;
        case  (req.session.data['needReceiptPark'] == false && req.session.data['needReceiptDrive'] == false):
         res.redirect(`../payyou`)
          break;
            
        default:
            res.redirect(`../receipts`)
        break;
        }
})




router.get('/*/travel/tubeCostRoute' , function (req, res) {

            req.session.data['trainCostShow'] = true;
            req.session.data['tubeCostShow'] = true;
              res.redirect(`../tasklist`)
})

router.get('/*/foodanddrink/foodAndDrinkRoute' , function (req, res) {

            req.session.data['foodAndDrinkShow'] = true;
              res.redirect(`../tasklist`)
})

router.get('/*/pet/petCostRoute' , function (req, res) {

            req.session.data['petConfirmedShow'] = true;
              res.redirect(`../tasklist`)
})

router.get('/*/receipts/receiptsDone' , function (req, res) {

            req.session.data['receiptDoneShow'] = true;
              res.redirect(`../tasklist`) 
})


// route the food
router.get('/*/foodChooseRouter' , function (req, res) {
       switch (true) {
        case  (req.session.data['showFood'] == 1):
         res.redirect(`../foodanddrink`)
          break;

        case  (req.session.data['showFood'] == 2):
         res.redirect(`../foodanddrink/foodRadio`)
          break;

        case  (req.session.data['showFood'] == 3):
         res.redirect(`../foodanddrink/foodTime`)
          break;

            
        default:
            res.redirect(`../foodanddrink`)
        break;
        }
})

// route the food or not
router.get('/*/canceledRouter' , function (req, res) {
  var confirmTraining = req.query.cancelledorNot
       switch (true) {
        case  (confirmTraining == "Yes"):
         res.redirect(`travel`)
          break;

        case  (confirmTraining == "No"):
         res.redirect(`../foodanddrink/foodRadio`)
          break;

            
        default:
            res.redirect(`bork bork bork`)
        break;
        }
})

// route the food or not
router.get('/*/canceledRouter2' , function (req, res) {
  var confirmTraining = req.query.cancelledorNot
       switch (true) {
        case  (confirmTraining == "Yes"):
         res.redirect(`../foodanddrink/foodRadio`)
          break;

        case  (confirmTraining == "No"):
         res.redirect(`travel`)
          break;

            
        default:
            res.redirect(`bork bork bork`)
        break;
        }
})

// Case management actions
// http://127.0.0.1:3000/witex-v15/caseManagement/claim2
router.get('/*/caseManagement/caseActions' , function (req, res) {
      var caseActions = req.query.caseActions
       switch (true) {
          case  (caseActions == 'Approve'):
            req.session.data['homepageBanner'] = 'approve';
            res.redirect(`index2`)
           break;

           case  (caseActions == 'Send back to user'):
            req.session.data['homepageBanner'] = 'back';
            res.redirect(`addNoteAction`)
            break;

            case  (caseActions == 'Block'):
            req.session.data['homepageBanner'] = 'block';
            res.redirect(`addNoteAction`)
            break;

            case  (caseActions == 'Send for approval'):
            req.session.data['homepageBanner'] = 'send';
            res.redirect(`addNoteAction`)
            break;

            case  (caseActions == 'Reject'):
            req.session.data['homepageBanner'] = 'reject';
            res.redirect(`addNoteAction`)
            break;

        default:
            console.log("bork bork bork bork");
              res.redirect(`bork`)
            break;
        }
})

// Case management actions
// http://127.0.0.1:3000/witex-v15/caseManagement/claim4
router.get('/*/caseManagement/caseActions4' , function (req, res) {
      var caseActions = req.query.caseActions
       switch (true) {
          case  (caseActions == 'Approve'):
            req.session.data['homepageBanner4'] = 'approve';
            res.redirect(`index2`)
           break;

           case  (caseActions == 'Send back to user'):
            req.session.data['homepageBanner4'] = 'back';
            res.redirect(`addNoteAction`)
            break;

            case  (caseActions == 'Block'):
            req.session.data['homepageBanner4'] = 'block';
            res.redirect(`addNoteAction`)
            break;

            case  (caseActions == 'Send for approval'):
            req.session.data['homepageBanner4'] = 'send';
            res.redirect(`addNoteAction`)
            break;

            case  (caseActions == 'Reject'):
            req.session.data['homepageBanner4'] = 'reject';
            res.redirect(`addNoteAction`)
            break;

        default:
            console.log("bork bork bork bork");
              res.redirect(`bork`)
            break;
        }
})

// Case management actions
// http://127.0.0.1:3000/witex-v15/caseManagement/claim4
router.get('/*/caseManagement/caseActions5' , function (req, res) {
      var caseActions = req.query.caseActions
       switch (true) {
          case  (caseActions == 'Approve'):
            req.session.data['homepageBanner5'] = 'approve';
            res.redirect(`index2`)
           break;

           case  (caseActions == 'Send back to user'):
            req.session.data['homepageBanner5'] = 'back';
            res.redirect(`addNoteAction`)
            break;

            case  (caseActions == 'Block'):
            req.session.data['homepageBanner5'] = 'block';
            res.redirect(`addNoteAction`)
            break;

            case  (caseActions == 'Send for approval'):
            req.session.data['homepageBanner5'] = 'send';
            res.redirect(`addNoteAction`)
            break;

            case  (caseActions == 'Reject'):
            req.session.data['homepageBanner5'] = 'reject';
            res.redirect(`addNoteAction`)
            break;

        default:
            console.log("bork bork bork bork");
              res.redirect(`bork`)
            break;
        }
})


// sent to correct page and reset the variable that control the success banner
router.get('/*/caseManagement/claim2Router' , function (req, res) {
           delete req.session.data['homepageBanner'] ;
           delete req.session.data['homepageBanner4'] ;
           delete req.session.data['homepageBanner5'] ;
              res.redirect(`claim3`)    
})

// sent to correct page and reset the variable that control the success banner
router.get('/*/caseManagement/claim4Router' , function (req, res) {
           delete req.session.data['homepageBanner'] ;
           delete req.session.data['homepageBanner4'] ;
           delete req.session.data['homepageBanner5'] ;
              res.redirect(`claim4`)    
})

// sent to correct page and reset the variable that control the success banner
router.get('/*/caseManagement/claim5Router' , function (req, res) {
             delete req.session.data['homepageBanner'] ;
           delete req.session.data['homepageBanner4'] ;
           delete req.session.data['homepageBanner5'] ;
              res.redirect(`claim5`)    
})

// sent to correct page and reset the variable that control the success banner
router.get('/*/caseManagement/claim6Router' , function (req, res) {
           delete req.session.data['homepageBanner'] ;
           delete req.session.data['homepageBanner4'] ;
           delete req.session.data['homepageBanner5'] ;
              res.redirect(`claim3n`)    
})

// sent to correct page and reset the variable that control the success banner
router.get('/*/caseManagement/claim7Router' , function (req, res) {
             delete req.session.data['homepageBanner'] ;
           delete req.session.data['homepageBanner4'] ;
           delete req.session.data['homepageBanner5'] ;
              res.redirect(`claim7`)    
})


// reset the successbanner and show rob edwards again
router.get('/*/caseManagement/resetAll' , function (req, res) {
             delete req.session.data['homepageBanner'] ;
           delete req.session.data['homepageBanner4'] ;
           delete req.session.data['homepageBanner5'] ;
              res.redirect(`index2`)    
})

// http://127.0.0.1:3000/witex-v21/caseManagement/edit2/checkanswers?more-detail-note=
router.get('/*/caseManagement/changeAnswersCar' , function (req, res) {
            req.session.data['changeConfirmBanner'] = 'approve';
            res.redirect(`claim3n3`);
         
})

// http://127.0.0.1:3000/witex-v21/caseManagement/edit2/checkanswers?more-detail-note=
router.get('/*/deleteFileRoute' , function (req, res) {
            req.session.data['deleteConfirmBanner'] = 'approve';
            res.redirect(`claim3n1`);
         
})



// reset the successbanner and show rob edwards again
router.get('/*/caseManagement/resetChangeConfirm' , function (req, res) {
             delete req.session.data['changeConfirmBanner'] ;
             delete req.session.data['cmsChosen'] ;
              delete req.session.data['deleteConfirmBanner'] ;
              res.redirect(`claim3n`)    
})



module.exports = router