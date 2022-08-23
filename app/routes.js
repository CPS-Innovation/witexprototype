const express = require('express')
const router = new express.Router()

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




// EPAO Commitment - Choose EPAO and Cost
 router.get('/EPAOandCost', function (req, res) {
  res.redirect("/version-13/EPAO/epaoandcost")
 })

 // EPAO Commitment - Choose EPAO and Cost v2
 router.get('/EPAOandCostv2', function (req, res) {
  res.redirect("/version-13/EPAO/epaoandcostv2")
 })

  // EPAO Commitment - Choose cost only
 router.get('/EPAOCostOnly', function (req, res) {
  res.redirect("/version-13/EPAO/epaoOnlyCost")
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


//  ------------------  DoE NAV ----------------------
// Employer > Nav > Home
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/homeNav', function (req, res) {
  res.redirect(`/${req.version}/home`)
 })

  router.get('/*/*/homeNav', function (req, res) {
  res.redirect(`/${req.version}/home`)
 })

 // Employer > Nav > Finance
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/financeNav', function (req, res) {
  res.redirect(`/${req.version}/finance`)
 })

  router.get('/*/*/financeNav', function (req, res) {
  res.redirect(`/${req.version}/finance`)
 })

   // Employer > Nav > Apprentices
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/apprenticesNav', function (req, res) {
  res.redirect(`/${req.version}/apprentices`)
 })

  router.get('/*/*/apprenticesNav', function (req, res) {
  res.redirect(`/${req.version}/apprentices`)
 })

   // Employer > Nav > Team
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/teamNav', function (req, res) {
  res.redirect(`/${req.version}/team`)
 })

  router.get('/*/*/teamNav', function (req, res) {
  res.redirect(`/${req.version}/team`)
 })

// Employer > Nav > Orgs
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/orgsNav', function (req, res) {
  res.redirect(`/${req.version}/orgs`)
 })

  router.get('/*/*/orgsNav', function (req, res) {
  res.redirect(`/${req.version}/orgs`)
 })

// Employer > Nav > PAYE
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/payeNav', function (req, res) {
  res.redirect(`/${req.version}/paye`)
 })

  router.get('/*/*/payeNav', function (req, res) {
  res.redirect(`/${req.version}/paye`)
 })

  // Employer > Nav > Help
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/helpNav', function (req, res) {
  res.redirect(`/${req.version}/help`)
 })

  router.get('/*/*/helpNav', function (req, res) {
  res.redirect(`/${req.version}/help`)
 })

    // Employer > Nav > Settings
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/settingsNav', function (req, res) {
  res.redirect(`/${req.version}/settings`)
 })

  router.get('/*/*/settingsNav', function (req, res) {
  res.redirect(`/${req.version}/settings`)
 })



    // Employer > Nav > Microsite >Home
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/micrositeNav', function (req, res) {
  res.redirect(`/${req.version}/microsite`)
 })

  router.get('/*/*/micrositeNav', function (req, res) {
  res.redirect(`/${req.version}/microsite`)
 })


  // Employer > Nav > Microsite > Stories
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/storiesNav', function (req, res) {
  res.redirect(`/${req.version}/microsite/stories`)
 })

  router.get('/*/*/storiesNav', function (req, res) {
  res.redirect(`/${req.version}/microsite/stories`)
 })

    // Employer > Nav > Microsite > Find out
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/howToNav', function (req, res) {
  res.redirect(`/${req.version}/microsite/guide`)
 })

  router.get('/*/*/howToNav', function (req, res) {
  res.redirect(`/${req.version}/microsite/guide`)
 })

    // Teacher > Nav > Microsite > Find out
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/howToNavTeach', function (req, res) {
  res.redirect(`/${req.version}/microsite/guide/business`)
 })

  router.get('/*/*/howToNavTeach', function (req, res) {
  res.redirect(`/${req.version}/microsite/guide/business`)
 })

////// End employer nav routes

/////Provider nav routes


// Provider > Nav > Home
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/proHomeNav', function (req, res) {
  res.redirect(`/${req.version}/provider/home`)
 })

  router.get('/*/*/proHomeNav', function (req, res) {
  res.redirect(`/${req.version}/provider/home`)
 })


// Provider > Nav > Manage
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/proApprenticesNav', function (req, res) {
  res.redirect(`/${req.version}/provider/manage`)
 })

  router.get('/*/*/proApprenticesNav', function (req, res) {
  res.redirect(`/${req.version}/provider/manage`)
 })



// Provider > Nav > Cohorts
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/proCohortsNav', function (req, res) {
  res.redirect(`/${req.version}/provider/proCohorts`)
 })

  router.get('/*/*/proCohortsNav', function (req, res) {
  res.redirect(`/${req.version}/provider/proCohorts`)
 })

  // Provider > Nav > Agreement IDs
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/proAgreementNav', function (req, res) {
  res.redirect(`/${req.version}/provider/orgsAndAgree`)
 })

  router.get('/*/*/proAgreementNav', function (req, res) {
  res.redirect(`/${req.version}/provider/orgsAndAgree`)
 })


  // Provider > Nav > Agreement IDs
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/proAgreementNav', function (req, res) {
  res.redirect(`/${req.version}/provider/orgsAndAgree`)
 })

  router.get('/*/*/proAgreementNav', function (req, res) {
  res.redirect(`/${req.version}/provider/orgsAndAgree`)
 })


  // Provider > Nav > Agreement IDs
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/recruitNav', function (req, res) {
  res.redirect(`/${req.version}/recruit`)
 })

  router.get('/*/*/recruitNav', function (req, res) {
  res.redirect(`/${req.version}/recruit`)
 })


////End provider nav routes

    // Employer > Nav > Sign Out
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/signoutNav', function (req, res) {
  res.redirect(`/${req.version}/signout`)
 })

  router.get('/*/*/signoutNav', function (req, res) {
  res.redirect(`/${req.version}/signout`)
 })

  // EPAO Nav Routes


   router.get('/*/EPAOApprovalsNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOApprovals/ticks`)
 })

  router.get('/*/*/EPAOApprovalsNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOApprovals/ticks`)
 })

     router.get('/*/EPAOOutcomesNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOOutcomes`)
 })

  router.get('/*/*/EPAOOutcomesNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOOutcomes`)
 })

       router.get('/*/EPAOPipelinesNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOApprovals/EPAOPipeline/ticks`)
 })

  router.get('/*/*/EPAOPipelinesNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOApprovals/EPAOPipeline/ticks`)
 })

         router.get('/*/EPAOGatewayNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOApprovals/EPAOGateway`)
 })

  router.get('/*/*/EPAOGatewayNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOApprovals/donedoEPAOGateway`)
 })

           router.get('/*/EPAOTransactionsNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOTransactions`)
 })

  router.get('/*/*/EPAOTransactionsNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOTransactions`)
 })


           router.get('/*/EPAOPayNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOPay`)
 })

  router.get('/*/*/EPAOPaysNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOPay`)
 })


           router.get('/*/EPAOOrgNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOOrganisations`)
 })

  router.get('/*/*/EPAOOrgNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOOrganisations`)
 })

  

             router.get('/*/epaoHomeNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOApprovals/home`)
 })

  router.get('/*/*/epaoHomeNav', function (req, res) {
  res.redirect(`/${req.version}/EPAOApprovals/home`)
 })
  

////// end of nav routing


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


/// APRIL - Multi ORgs 
/// http://127.0.0.1:3000/version-8/newregister/employerStarted/feb/usedServiceBefore
router.get('/*/newregister/employerStarted/april/multiOrgsChoice' , function (req, res) {
  var orgChoose = req.query.orgChoose
  if (orgChoose === 'FiverOrg') {
    res.redirect(`/${req.version}/newregister/employerStarted/april/searchOrg`)
  } else {
    res.render(`${req.version}/newregister/employerStarted/april/checkPAYE`)
  }
})

/// APRIL THREE - Multi ORgs 
/// http://127.0.0.1:3000/version-8/newregister/employerStarted/feb/usedServiceBefore
router.get('/*/newregister/employerStarted/aprilThree/multiOrgsChoice' , function (req, res) {
  var orgChoose = req.query.orgChoose
  if (orgChoose === 'FiverOrg') {
    res.redirect(`/${req.version}/newregister/employerStarted/aprilThree/searchOrg`)
  } else {
    res.render(`${req.version}/newregister/employerStarted/aprilThree/checkPAYE`)
  }
})

/// v3- Multi ORgs 
/// http://127.0.0.1:3000/version-11/newregister/employerStarted/v3/multiOrgs
router.get('/*/newregister/employerStarted/v3/multiOrgsChoice' , function (req, res) {
  var orgChoose = req.query.orgChoose
  if (orgChoose === 'FiverOrg') {
    res.redirect(`/${req.version}/newregister/employerStarted/v3/searchOrg`)
  } else {
    res.render(`${req.version}/newregister/employerStarted/v3/checkPAYE`)
  }
})


/// APRIL THREE _ registration > used service before? Feb version
/// http://127.0.0.1:3000/version-8/newregister/employerStarted/feb/usedServiceBefore
router.get('/*/manage-apprenticeships/signinAPRThree' , function (req, res) {
  var usedService = req.query.usedService
  if (usedService === 'false') {
    res.redirect(`/${req.version}/newregister/employerStarted/aprilThree/whatyoullneed`)
  } else {
    res.render(`${req.version}/manage-apprenticeships/signin`)
  }
})

/// APRIL THREE v11 _ registration > used service before? Feb version
/// http://127.0.0.1:3000/version-11/newregister/employerStarted/aprilThree/usedServiceBefore
// router.get('/*/manage-apprenticeships/signinAPRThreev11' , function (req, res) {
//   var usedService = req.query.usedService
//   if (usedService === 'false') {
//     res.redirect(`/${req.version}/newregister/employerStarted/aprilThree/contactDetails`)
//   } else {
//     res.redirect(`${req.version}/newregister/employerStarted/aprilThree/signin`)
//   }
// })




/// APRIL THREE v11 _ registration > used service before? Feb version
/// http://127.0.0.1:3000/version-11/newregister/employerStarted/aprilThree/usedServiceBefore
router.get('/*/manage-apprenticeships/signinAPRThreev11' , function (req, res) {
   var usedService = req.query.usedService
       switch (true) {
          case  (usedService == 'false'):
           res.redirect(`/${req.version}/newregister/employerStarted/aprilThree/contactDetails`)
           break;

        default:
          res.redirect(`/${req.version}/newregister/employerStarted/aprilThree/signin`)
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})





/// APRIL FOUR _ registration > used service before? Feb version
/// http://127.0.0.1:3000/version-8/newregister/employerStarted/feb/usedServiceBefore
router.get('/*/newregister/employerStarted/aprilFour/signinAPRFour' , function (req, res) {
  var usedService = req.query.usedService
  if (usedService === 'false') {
    res.redirect(`/${req.version}/newregister/employerStarted/aprilFour/whatyoullneed`)
  } else {
    res.redirect(`/${req.version}/newregister/employerStarted/aprilFour/signin`)
  }
})


/*
/// team > added new team member where to
router.get('/version-1/team/whatsNextTeam' , function (req, res) {
  var teamWhatsNext = req.query.teamwhatsnext
  if (teamWhatsNext === 'another') {
    res.redirect(`/${req.version}/arse`)
  } else {}
    if (teamWhatsNext === 'viewall') {
    res.redirect(`/${req.version}/arse32`)
  } 
    if (teamWhatsNext === 'returnhome') {
    res.redirect(`/${req.version}/arse3`)
  }  
})
*/

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


/// team > added new team member where to
router.get('/*/team/whatsNextTeam' , function (req, res) {
  var teamWhatsNext = req.query.teamwhatsnext
       switch (true) {
          case  (teamWhatsNext == 'another'):
           res.redirect(`/${req.version}/team/add-new-user`)
            break;
        case  (teamWhatsNext == 'viewall'):
        res.redirect(`/${req.version}/team`)
          break
         case  (teamWhatsNext == 'returnhome'):
          res.redirect(`/${req.version}/home`)
          break
        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// orgs > whats next after adding an org
router.get('/*/orgs/whatsNextOrgs' , function (req, res) {
  var orgsWhatsNext = req.query.orgswhatsnext
       switch (true) {
          case  (orgsWhatsNext == 'agreement'):
           res.redirect(`/${req.version}/orgs/droptablesign`)
            break;
        case  (orgsWhatsNext == 'team'):
        res.redirect(`/${req.version}/team`)
          break
         case  (orgsWhatsNext == 'another'):
          res.redirect(`/${req.version}/orgs/searchOrg`)
          break
                   case  (orgsWhatsNext == 'home'):
          res.redirect(`/${req.version}/home`)
          break
        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// paye > whats next after adding an paye
router.get('/*/paye/whatsNextPaye' , function (req, res) {
  var payeWhatsNext = req.query.payeWhatsNext
       switch (true) {
          case  (payeWhatsNext == 'paye'):
            res.redirect(`/${req.version}/paye/allowtaxdetails`)
           break;

          case  (payeWhatsNext == 'finance'):
              res.redirect(`/${req.version}/finance`)
          break;

          case  (payeWhatsNext == 'home'):
              res.redirect(`/${req.version}/home`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// paye > whats next after removing a paye
router.get('/*/paye/payeRemove' , function (req, res) {
  var removePaye = req.query.removePaye
       switch (true) {
          case  (removePaye == 'true'):
            res.redirect(`/${req.version}/paye`)
           break;

          case  (removePaye == 'false'):
              res.redirect(`/${req.version}/paye`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})

/// paye > whats next after removing a paye
router.get('/*/find/chooseFATType' , function (req, res) {
  var fatType = req.query.fatType
       switch (true) {
          case  (fatType == 'apprenticeship'):
          req.session.data['justFindEPAO'] = false;
            res.redirect(`/${req.version}/find/appreticeshipsearch`)
           break;

          case  (fatType == 'epao'):
                 req.session.data['justFindEPAO'] = true;
              res.redirect(`/${req.version}/find/appreticeshipsearch`)
          break;

          case  (fatType == 'provider'):
              res.redirect(`/${req.version}/find/findaprovider`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// Add apprentices > confirm the training provider
router.get('/*/apprentices/add/confirming-training-provider' , function (req, res) {
  var confirmPro = req.query.confirmation
       switch (true) {
          case  (confirmPro == 'true'):
            res.redirect(`/${req.version}/apprentices/add/start-adding-apprentices`)
           break;

          case  (confirmPro == 'false'):
              res.redirect(`/${req.version}/apprentices/add/training-provider`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})



/// Add apprentices > add apprentices yourself or send to provider
router.get('/*/apprentices/add/addingApprentices' , function (req, res) {
  var confirmAddApps = req.query.addApprentices
       switch (true) {
          case  (confirmAddApps == 'true'):
            res.redirect(`/${req.version}/apprentices/add/review-cohort`)
           break;

          case  (confirmAddApps == 'false'):
              res.redirect(`/${req.version}/apprentices/add/message-for-training-provider`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Add apprentices > add apprentices yourself or send to provider
router.get('/*/apprentices/cohorts/editFinishedApprentice' , function (req, res) {
  var appCohortFinishedOption = req.query.appCohortFinishedOption
       switch (true) {
          case  (appCohortFinishedOption == 'approve'):
            res.redirect(`/${req.version}/apprentices/cohorts/message-for-training-provider`)
           break;

          case  (appCohortFinishedOption == 'send'):
              res.redirect(`/${req.version}/apprentices/cohorts/message-for-training-provider`)
          break;

          case  (appCohortFinishedOption == 'save'):
              res.redirect(`/${req.version}/apprentices/cohorts`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})



/// Change apprentices status > 
router.get('/*/apprentices/manage/appsChangeStatusRobEdwards' , function (req, res) {
  var status = req.query.status
       switch (true) {
          case  (status == 'Paused'):
            res.redirect(`/${req.version}/apprentices/manage/confirmPaused`)
           break;

          case  (status == 'Stopped'):
              res.redirect(`/${req.version}/apprentices/manage/confirmStopped`)
          break;

          case  (status == 'Return'):
              res.redirect(`/${req.version}/apprentices/manage/robEdwardsLive`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})


/// Forecast > Delete an apprenticeship you are forecasting against
router.get('/*/finance/projection/deleteForecastApprenticeship' , function (req, res) {
  var confirm = req.query.confirm
       switch (true) {
          case  (confirm == 'yes'):
            res.redirect(`/${req.version}/finance/projection/appRemoved`)
           break;

          case  (confirm == 'no'):
              res.redirect(`/${req.version}/finance/projection/canFund`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Confirming an employer
router.get('/*/provider/proCohorts/providerAgreedTraining' , function (req, res) {
  var confirmEmployer = req.query.confirmEmployer
       switch (true) {
          case  (confirmEmployer == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts/employerConnection`)
           break;

          case  (confirmEmployer == 'false'):
              res.redirect(`/${req.version}/provider/proCohorts/holdingPage`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Connected company check
router.get('/*/provider/proCohorts/employerConnectedCompany' , function (req, res) {
  var connectedCompany = req.query.connectedCompany
       switch (true) {
          case  (connectedCompany == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts/cohortView`)
           break;

          case  (connectedCompany == 'false'):
              res.redirect(`/${req.version}/provider/proCohorts/holdingPage`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Delete apprentice record
router.get('/*/provider/proCohorts/providerDeleteApprentice' , function (req, res) {
  var deleteApp = req.query.deleteApp
       switch (true) {
          case  (deleteApp == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts/cohortView`)
           break;

          case  (deleteApp == 'false'):
              res.redirect(`/${req.version}/provider/proCohorts/edit-apprentice`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})


/// Provider > Finished > send to employer
router.get('/*/provider/proCohorts/providerFinishedApprentice' , function (req, res) {
  var appCohortFinishedOption = req.query.appCohortFinishedOption
       switch (true) {
          case  (appCohortFinishedOption == 'approve'):
            res.redirect(`/${req.version}/provider/proCohorts/messageEmployers`)
           break;

          case  (appCohortFinishedOption == 'send'):
              res.redirect(`/${req.version}/provider/proCohorts/messageEmployers`)
          break;

           case  (appCohortFinishedOption == 'save'):
              res.redirect(`/${req.version}/provider/proCohorts`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Delete cohort
router.get('/*/provider/proCohorts/providerDeleteCohort' , function (req, res) {
  var deleteCohort = req.query.deleteCohort
       switch (true) {
          case  (deleteCohort == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts`)
           break;

          case  (deleteCohort == 'false'):
              res.redirect(`/${req.version}/provider/proCohorts/cohortView`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})






/// Employer > add apprentice > choose reserve funding
//http://127.0.0.1:3000/version-2/apprentices/add/chooseReserve
router.get('/*/apprentices/add/addApprenticesChooseReserve' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
          case  (confirmTraining == 'Aeronautical engineer, Level 2'):
          console.log("raa");
            res.redirect(`/${req.version}/apprentices/add/addApprentice`)
           break;

           case  (confirmTraining == 'Mechanical engineer, Level 3'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/apprentices/add/addApprentice`)
           break;

          case  (confirmTraining == 'Financial Services Administrator, Level 3'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/apprentices/add/find/appreticeshipsearch`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > add apprentice  > finished adding
//http://127.0.0.1:3000/version-2/finance/reserve/complete
router.get('/*/apprentices/add/addApprenticeAddSingleApprenticeFinished' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'reserved'):
          console.log("raa");
            res.redirect(`/${req.version}/apprentices/add`)
           break;

           case  (confirmTraining == 'apprenticeships'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/apprentices/manage`)
           break;

         case  (confirmTraining == 'homepage'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})



/// Employer > Add apprentice > where are they from
// http://127.0.0.1:3000/version-2/apprentices/howRecruiting
router.get('/*/apprentices/add/addApprenticeHowRecruiting' , function (req, res) {
  var confirmTraining = req.query.recruitType
       switch (true) {
          case  (confirmTraining == 'raa'):
            res.redirect(`/${req.version}/apprentices/add/fromRecruit/alreadyAccepted`)
           break;

           case  (confirmTraining == 'alreadyDone'):
            res.redirect(`/${req.version}/apprentices/add/chooseReserve`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > add provider (provider permissions)  > finished adding a new one
// http://127.0.0.1:3000/version-2/savedProviders/add/finished?confirmation=true
router.get('/*/savedProviders/add/addProviderFinished' , function (req, res) {
  var confirmTraining = req.query.addProviderFinished
       switch (true) {
          case  (confirmTraining == 'QA Ltd'):
    
            res.redirect(`/${req.version}/savedProviders/cyberdyne`)
           break;

           case  (confirmTraining == 'providers'):
         
            res.redirect(`/${req.version}/savedProviders`)
           break;

         case  (confirmTraining == 'homepage'):
       
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > add apprentice > single or bulk
// http://127.0.0.1:3000/version-3/apprentices/add/nonLevyFull/oneOrBulk
router.get('/*/apprentices/add/nonLevyFull/oneOrBulkQuestion' , function (req, res) {
  var confirmTraining = req.query.oneOrBulk
       switch (true) {
          case  (confirmTraining == 'one'):
           // We removed the stuff coming in from recruit and jumped straight to reserve
           // res.redirect(`/${req.version}/apprentices/add/NonLevyFull/oneAtTime/alreadyAccepted`)

           res.redirect(`/${req.version}/apprentices/add/NonLevyFull/oneAtTime/choosereserve/`) 
           break;

           case  (confirmTraining == 'bulk'):
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/bulkUpload/`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > v3 > add apprentice > choose apprentices to start
// http://127.0.0.1:3000/version-3/apprentices/add/NonLevyFull/oneAtTime/alreadyAccepted
router.get('/*/apprentices/add/nonLevyFull/oneAtTime/chooseAnApprenticeToStartV3Manage' , function (req, res) {
  var confirmTraining = req.query.acceptedRecruit
       switch (true) {
          case  (confirmTraining == 'Rob Edwards'):
            req.session.data['FirstFirstName'] = 'Rob';
            req.session.data['FirstLastName'] = 'Edwards';

            req.session.data['dob-day'] = '5';
            req.session.data['dob-month'] = 'May';
            req.session.data['dob-year'] = '2000';

            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeConfirm`)
           break;

           case  (confirmTraining == 'David Jenkins'):
            req.session.data['FirstFirstName'] = 'David';
            req.session.data['FirstLastName'] = 'Jenkins';

            req.session.data['dob-day'] = '5';
            req.session.data['dob-month'] = 'May';
            req.session.data['dob-year'] = '2000';

            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeConfirm`)
           break;

          case  (confirmTraining == 'someoneElse'):
            res.redirect(`/${req.version}/apprentices/add/NonLevyFull/oneAtTime/chooseReserve`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > v4 > add apprentice > choose apprentices to start
// http://127.0.0.1:3000/version-4/apprentices/add/fromReserve/alreadyAccepted
router.get('/*/apprentices/add/fromReserve/chooseAnApprenticeToStartV3Manage' , function (req, res) {
  var confirmTraining = req.query.acceptedRecruit
       switch (true) {
          case  (confirmTraining == 'Rob Edwards'):
            req.session.data['FirstFirstName'] = 'Rob';
            req.session.data['FirstLastName'] = 'Edwards';

            req.session.data['dob-day'] = '5';
            req.session.data['dob-month'] = 'May';
            req.session.data['dob-year'] = '2000';

            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeConfirm`)
           break;

           case  (confirmTraining == 'David Jenkins'):
            req.session.data['FirstFirstName'] = 'David';
            req.session.data['FirstLastName'] = 'Jenkins';

            req.session.data['dob-day'] = '5';
            req.session.data['dob-month'] = 'May';
            req.session.data['dob-year'] = '2000';

            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeConfirm`)
           break;

          case  (confirmTraining == 'someoneElse'):
        //  req.session.data['theTraingCourse'] = 'Aeronautical engineer, Level 2';
            res.redirect(`/${req.version}/apprentices/add/NonLevyFull/oneAtTime/apprenticeAdd`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})




/// Employer > v3 > add apprentice > choose reserved funding
// http://127.0.0.1:3000/version-3/apprentices/add/NonLevyFull/oneAtTime/chooseReserve
router.get('/*/apprentices/add/nonLevyFull/oneAtTime/addApprenticesChooseReserve' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
          case  (confirmTraining == 'Aeronautical engineer, Level 2'):
            req.session.data['funding'] = 'Aeronautical engineer, Level 2';
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeAdd`)
           break;

           case  (confirmTraining == 'Mechanical engineer, Level 3'):
           req.session.data['funding'] = 'Mechanical engineer, Level 3';
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeAdd`)
           break;

          case  (confirmTraining == 'Financial Services Administrator, Level 3'):
            req.session.data['funding'] = 'Financial Services Administrator, Level 3';
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/FAT`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > v6 > add apprentice > choose reserved funding
// http://127.0.0.1:3000/version-6/apprentices/add/NonLevyFull/oneAtTime/chooseReserve
router.get('/*/apprentices/add/nonLevyFull/oneAtTime/addApprenticesChooseReserveNEW' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
          case  (confirmTraining == 'Aeronautical engineer, Level 2'):
            req.session.data['funding'] = 'Aeronautical engineer, Level 2';
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeAdd`)
           break;

           case  (confirmTraining == 'Mechanical engineer, Level 3'):
           req.session.data['funding'] = 'Mechanical engineer, Level 3';
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeAdd`)
           break;

          case  (confirmTraining == 'Financial Services Administrator, Level 3'):
            req.session.data['funding'] = 'Financial Services Administrator, Level 3';
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/reserveStartDate`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > v3 > add apprentice > finished adding individual apprentice
// http://127.0.0.1:3000/version-3/apprentices/add/nonLevyFull/oneAtTime/finish?
router.get('/*/apprentices/add/nonLevyFull/oneAtTime/addApprenticeAddSingleApprenticeFinished' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'addAnother'):
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneOrBulk`)
           break;

           case  (confirmTraining == 'apprenticeships'):
            res.redirect(`/${req.version}/apprentices/manage`)
           break;

          case  (confirmTraining == 'homepage'):
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > v6 > confirm apprenticeship sent over from Provider
// http://127.0.0.1:3000/version-6/apprentices/reviewApprove/finish?
router.get('/*/apprentices/reviewApprove/addApprenticeProviderSentToEmployerFinished' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'addAnother'):
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneOrBulk`)
           break;

           case  (confirmTraining == 'apprenticeships'):
            res.redirect(`/${req.version}/apprentices/manage`)
           break;

          case  (confirmTraining == 'homepage'):
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Microsite > v3 > show guidance
// http://127.0.0.1:3000/version-3/microsite/guide/business
router.get('/*/microsite/guide/showPersonalisedGuidance' , function (req, res) {
  var confirmTraining = req.query.confirm
       switch (true) {
          case  (confirmTraining == 'yes'):
            res.redirect(`/${req.version}/notYet`)
           break;

           case  (confirmTraining == 'no'):
            res.redirect(`/${req.version}/microsite/guide/showall`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})



/// Microsite > v3 > apprentice or business
// http://127.0.0.1:3000/version-3/microsite/guide
router.get('/*/microsite/apprenticeorbusiness' , function (req, res) {
  var confirmTraining = req.query.confirm
       switch (true) {
          case  (confirmTraining == 'yes'):
            res.redirect(`/${req.version}/notYet`)
           break;

           case  (confirmTraining == 'no'):
            res.redirect(`/${req.version}/microsite/guide/business`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

// /// Employer > Reserve funding > used saved?
// router.get('/*/finance/reserve/reserveSavedApprenticeship' , function (req, res) {
//   var confirm = req.query.confirm
//        switch (true) {
//           case  (confirm == 'yes'):
//             res.redirect(`/${req.version}/finance/reserve/chooseApp`)
//            break;

//           case  (confirm == 'no'):
//               res.redirect(`/${req.version}/find`)
//           break;

//         default:
//              console.log('gyahhhhhhhh, bork bork borka')
//             break;
//         }
// })

/// Employer > Reserve funding > used saved?
router.get('/*/finance/reserve/reserveNumberOfApps' , function (req, res) {
  var confirm = req.query.funding
       switch (true) {
          case  (confirm == 'Financial Services Administrator, Level 3'):
          console.log("a");
            res.redirect(`/${req.version}/finance/reserve/find/appreticeshipsearch`)
           break;

        default:
            res.redirect(`/${req.version}/finance/reserve/reserveStartDate`)
            break;
        }
})

/// Provider > Reserve funding > used saved?
router.get('/*/provider/employerAccount/reserveFunding/reserve/reserveNumberOfApps' , function (req, res) {
  var confirm = req.query.funding
       switch (true) {
          case  (confirm == 'Financial Services Administrator, Level 3'):
          console.log("a");
            res.redirect(`/${req.version}/provider/employerAccount/reserveFunding/reserve/reserveStartDate`)
           break;

        default:
            res.redirect(`/${req.version}/provider/employerAccount/reserveFunding/reserve/reserveStartDate`)
            break;
        }
})


// =======================================================================
// -----------------------------  RESERVE Funding --------------------------
// =======================================================================

// RESERVE MVS
/// Reserve MVS > Know Apprenticeship or not 
// http://127.0.0.1:3000/version-6/finance/reserveMVS/chooseApp
router.get('/*/reserveMVS/reserveMVSAppOrNot' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
          case  (confirmTraining == 'true'):
            req.session.data['robEdwardsReject'] = 'true';
            req.session.data['robEdwardsAlertReject'] = 'true';
            res.redirect(`/${req.version}/finance/reserveMVS/find/apprenticeshipsearch`)
           break;

           case  (confirmTraining == 'false'):
                 req.session.data['recruitSearchApp'] = 'Not c'; 
           req.session.data['recruitProviderName'] = 'QA Limited';
            res.redirect(`/${req.version}/finance/reserveMVS/reserveStartDate`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


// RESERVE MVS
/// Reserve MVS > Confirm reserved funding period 
// http://127.0.0.1:3000/version-6/finance/reserveMVS/confirm3monthwidow
router.get('/*/reserveMVS/reserveMVSCOnfirmReservedPeriod' , function (req, res) {
  var confirmTraining = req.query.confirmation
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/finance/reserveMVS/confirmReserveFunding`)
           break;

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/finance/reserveMVS/reserveStartDate`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Reserve - Find apprenticeship and then push from find back to reserve
// This just passes the data through so things can be prefilled
// http://127.0.0.1:3000/version-6/finance/reserveMVS/find/findsummary
router.get('/*/recruit/fromReserveToRecruit' , function (req, res) {

            req.session.data['organisation'] = 'Assurance Aerospace Ltd';
           req.session.data['recruitSearchApp'] = 'Financial services administrator'; 
           req.session.data['recruitProviderName'] = 'QA Limited';
            res.redirect(`/${req.version}/finance/reserveMVS/reserveStartDate`)    
})



//// Might not be used anymore
/// Employer > Reserve funding > how are you recruiting
// http://127.0.0.1:3000/version-2/finance/changeReserve/howRecruiting
router.get('/*/finance/changeReserve/reserveHowRecruiting' , function (req, res) {
  var recruitType = req.query.recruitType
       switch (true) {
          case  (recruitType == 'useService'):
            res.redirect(`/${req.version}/finance/changeReserve/startRecruit`)
           break;
           case  (recruitType == 'acceptedService'):
            res.redirect(`/${req.version}/apprentices/add/fromRecruit/alreadyAccepted`)
           break;
           case  (recruitType == 'alreadyDone'):
            res.redirect(`/${req.version}/apprentices/fromRecruit/addApprentice`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

///// end of not used
/// Employer > Reserve funding > how are you recruiting
// http://127.0.0.1:3000/version-2/finance/changeReserve/howRecruiting
router.get('/*/finance/changeReserve/reserveHowRecruitingFoundYet' , function (req, res) {
  var recruitType = req.query.recruitType
       switch (true) {
          case  (recruitType == 'foundThem'):
            res.redirect(`/${req.version}/apprentices/add/fromReserve/alreadyAccepted`)
           break;
          case  (recruitType == 'findThem'):
             req.session.data['recruitProviderName'] = 'QA Limited';
           req.session.data['recruitAppStart-day'] = '10';
           req.session.data['recruitAppStart-month'] = 'Sept';
           req.session.data['recruitAppStart-year'] = '2019';
            res.redirect(`/${req.version}/recruit/fromReserve`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})


// chooseAnApprenticeToStart
/// Employer > Reserve funding > choose an apprentice to start
// http://127.0.0.1:3000/version-2/apprentices/add/fromRecruit/alreadyAccepted
router.get('/*/apprentices/add/fromRecruit/chooseAnApprenticeToStart' , function (req, res) {
  var recruitType = req.query.acceptedRecruit
       switch (true) {
          case  (recruitType == 'Rob Edwards'):
            res.redirect(`/${req.version}/apprentices/add/fromRecruit/addApprentice`)
           break;
           case  (recruitType == 'David Jenkins'):
            res.redirect(`/${req.version}/apprentices/add/fromRecruit/addApprentice`)
           break;
           case  (recruitType == 'someoneElse'):
            res.redirect(`/${req.version}/apprentices/add/addApprentice`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})





/// apprentices/add/fromRecruit/alreadyAccepted

/// Employer > Reserve funding > how are you recruiting
// http://127.0.0.1:3000/version-2/apprentices/fromRecruit/confirm-training-provider
router.get('/*/apprentices/fromRecruit/reserveCommitAddApprentice' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'true'):
          console.log("raa");
            res.redirect(`/${req.version}/apprentices/fromRecruit/addApprentice`)
           break;
           case  (confirmTraining == 'false'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/TBC`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > Reserve funding > how are you recruiting
// http://127.0.0.1:3000/version-2/apprentices/fromRecruit/finish?
router.get('/*/apprentices/fromRecruit/commitAddSingleApprenticeFinished' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'reserved'):
          console.log("raa");
            res.redirect(`/${req.version}/finance/changeReserve`)
           break;
           case  (confirmTraining == 'apprenticeships'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/apprentices/manage`)
           break;
                      case  (confirmTraining == 'homepage'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})





/// Employer > Reserve funding > finished reserving
//http://127.0.0.1:3000/version-2/finance/reserve/complete
router.get('/*/finance/reserve/finishedReserveFunding' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'hire'):
          console.log("raa");
            res.redirect(`/${req.version}/finance/changeReserve/howRecruiting`)
           break;

           case  (confirmTraining == 'reserve'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/finance/reserve`)
           break;

          case  (confirmTraining == 'view'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/finance/changeReserve`)
           break;

         case  (confirmTraining == 'homepage'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > Reserve funding > finished reserving Dans new version
// http://127.0.0.1:3000/version-7/finance/reserve/new/complete
router.get('/*/finance/reserve/new/finishedReserveFundingDan' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'hire'):
          console.log("raa");
            res.redirect(`/${req.version}/finance/changeReserve/howRecruiting`)
           break;

           case  (confirmTraining == 'reserve'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/finance/reserve`)
           break;

          case  (confirmTraining == 'view'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/finance/changeReserve`)
           break;

         case  (confirmTraining == 'homepage'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Reserve - Register > v4 > Signing the agreement during registrations
// http://127.0.0.1:3000/version-4/registerReserve/agreementTwoB
router.get('/*/registerReserve/signAgreementRegisterReserve' , function (req, res) {
  var confirmTraining = req.query.agreementSign
       switch (true) {
          case  (confirmTraining == 'yes'):
            res.redirect(`/${req.version}/registerReserve/taxDetails`)
           break;

           case  (confirmTraining == 'no'):
            res.redirect(`/${req.version}/registerReserve/processStops`)
           break;

           case  (confirmTraining == 'notYet'):
            res.redirect(`/${req.version}/registerReserve/taxDetails`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})




/// Reserve - Register > v4 > add tax details now
// http://127.0.0.1:3000/version-4/registerReserve/taxDetails
router.get('/*/registerReserve/addTaxDetailsRegisterReserve' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/notYet`)
           break;

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/registerReserve/homeConfirmation`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

// =======================================================================
// ----------------------------- END OF RESERVE --------------------------
// =======================================================================


// =======================================================================
// ----------------------------- RECRUIT HERE ----------------------------
// =======================================================================



/// Register Test > v5 > Signing the agreement during registrations (not the reserve version)
// http://127.0.0.1:3000/version-5/newregister/version1/agreementTwoC
router.get('/*/newregister/version1/signAgreementRegisterReserve' , function (req, res) {
  var confirmTraining = req.query.agreementSign
       switch (true) {
          case  (confirmTraining == 'yes'):
         // ga('send', 'event', [agreement], [agreed]);

            res.redirect(`/${req.version}/newregister/version1/taxDetails`) 
           break;

           case  (confirmTraining == 'notYet'):
         //   ga('send', 'event', [agreement], [notAgreed]);
            res.redirect(`/${req.version}/newregister/version1/taxDetails`)
           break;

        default:
            console.log("bork bork bork");
             res.redirect(`/${req.version}/newregister/version1/taxDetails`)
            break;
        }
})

/// Regsiter Test - v5> add tax details now
// http://127.0.0.1:3000/version-5/newregister/version1/taxDetails
router.get('/*/newregister/version1/addTaxDetailsRegisterReserve' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
          //   ga('send', 'event', [tax], [Agreed]);
            res.redirect(`/${req.version}/newregister/version1/homeConfirmation`)
           break;

           case  (confirmTraining == 'false'):
                //   ga('send', 'event', [tax], [notAgreed]);
            res.redirect(`/${req.version}/newregister/version1/homeConfirmation`)
           break;

        default:
            console.log("bork bork bork");
             res.redirect(`/${req.version}/newregister/version1/homeConfirmation`)
            break;
        }
})

/// Regsiter Test - v5> add tax details now V2
// http://127.0.0.1:3000/version-5/newregister/version1/taxDetails
router.get('/*/newregister/version2/addTaxDetailsRegisterReserve' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
           //   ga('send', 'event', [tax], [Agreed]);
            res.redirect(`/${req.version}/newregister/version2/homeConfirmation`)
           break;

           case  (confirmTraining == 'false'):
          //   ga('send', 'event', [tax], [notAgreed]);
            res.redirect(`/${req.version}/newregister/version2/homeConfirmation`)
           break;

        default:
            console.log("bork bork bork");
            res.redirect(`/${req.version}/newregister/version2/homeConfirmation`)
            break;
        }
})

// =======================================================================
// ----------------------------- END OF REGISTER TEST---------------------
// =======================================================================


// =======================================================================
// ----------------------------- RECRUIT HERE ----------------------------
// =======================================================================


/// Recruit - submit vacancy from the review page
// http://127.0.0.1:3000/version-5/recruit/vacancySummary?
router.get('/*/recruit/recruitSubmitVacancyFromReview' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
           //   ga('send', 'event', [tax], [Agreed]);
            res.redirect(`/${req.version}/recruit/finish`)
           break;

           case  (confirmTraining == 'false'):
          //   ga('send', 'event', [tax], [notAgreed]);
            res.redirect(`/${req.version}/recruit/finish`)
           break;

        default:
         res.redirect(`/${req.version}/recruit/finish`)
            console.log("bork bork bork");
            break;
        }
})

/// Recruit - vacancy submitted - whats next options
// http://127.0.0.1:3000/version-5/recruit/finish
router.get('/*/recruit/recruitVacancySubmittedWhatsNext' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'another'):
           //   ga('send', 'event', [tax], [Agreed]);
            res.redirect(`/${req.version}/recruit/step-1`)
           break;

           case  (confirmTraining == 'recruitHome'):
          //   ga('send', 'event', [tax], [notAgreed]);
            res.redirect(`/${req.version}/recruit/vacancies`)
           break;

           case  (confirmTraining == 'home'):
          //   ga('send', 'event', [tax], [notAgreed]);
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Recruit - use reserved funding
// http://127.0.0.1:3000/version-6/apprentices/add/NonLevyFull/oneAtTime/chooseReserve
router.get('/*/recruit/recruitReserveFundingUse' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
          case  (confirmTraining == 'Aeronautical engineer, Level 2'):
          req.session.data['vacancyName'] = 'Aeronautical engineer apprenticeship'; 
           req.session.data['recruitSearchApp'] = 'Aeronautical engineer'; 
           req.session.data['recruitProviderName'] = 'QA Limited';
           req.session.data['recruitAppStart-day'] = '10';
           req.session.data['recruitAppStart-month'] = 'Sept';
           req.session.data['recruitAppStart-year'] = '2019';
            res.redirect(`/${req.version}/recruit/wholeList`)
           break;

           case  (confirmTraining == 'Mechanical engineer, Level 3'):
             req.session.data['vacancyName'] = 'Mechanical engineer apprenticeship'; 
           req.session.data['recruitSearchApp'] = 'Mechancial engineer'; 
           req.session.data['recruitProviderName'] = 'QA Limited';
           req.session.data['recruitAppStart-day'] = '10';
           req.session.data['recruitAppStart-month'] = 'Sept';
           req.session.data['recruitAppStart-year'] = '2019';
          //   ga('send', 'event', [tax], [notAgreed]);
            res.redirect(`/${req.version}/recruit/wholeList`)
           break;

           case  (confirmTraining == 'Financial Services Administrator, Level 3'):
               req.session.data['vacancyName'] = 'Financial Services Administrator apprenticeship'; 
           req.session.data['recruitSearchApp'] = 'Financial Services Administrator'; 
           req.session.data['recruitProviderName'] = 'QA Limited';
           req.session.data['recruitAppStart-day'] = '10';
           req.session.data['recruitAppStart-month'] = 'Sept';
           req.session.data['recruitAppStart-year'] = '2019';
          //   ga('send', 'event', [tax], [notAgreed]);
            res.redirect(`/${req.version}/recruit/NOTBUILTYET`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})



/// Recruit - use reserved funding
// http://127.0.0.1:3000/version-6/apprentices/add/NonLevyFull/oneAtTime/chooseReserve
router.get('/*/recruit/fromReserveToRecruit' , function (req, res) {

    
          req.session.data['vacancyName'] = 'Aeronautical engineer apprenticeship'; 
           req.session.data['recruitSearchApp'] = 'Aeronautical engineer'; 
           req.session.data['recruitProviderName'] = 'QA Limited';
           req.session.data['recruitAppStart-day'] = '10';
           req.session.data['recruitAppStart-month'] = 'Aug';
           req.session.data['recruitAppStart-year'] = '2019';
            res.redirect(`/${req.version}/recruit/wholeList`)    
})

/// Recruit - use make a commitment from an application
// http://127.0.0.1:3000/version-6/recruit/applications/susanApan
router.get('/*/recruit/applications/fromRecruitDoACommitment' , function (req, res) {
          req.session.data['FirstFirstName'] = 'Susan'; 
          req.session.data['FirstLastName'] = 'Apan'; 
              req.session.data['dob-day'] = '10';
              req.session.data['dob-month'] = 'June';
              req.session.data['dob-year'] = '2001';
              req.session.data['susanApanManageApps'] = 'true'; // this shows susan apan on the manage apprenticeship list
          
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeConfirm`)     
})



/// Recruit > Applications > Rob Edwards > Shortlist
// http://127.0.0.1:3000/version-6/recruit/applications/shortListApplication
router.get('/*/recruit/applications/recruitShortlistVacancyRobEdwards' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'true'):
            req.session.data['robEdwardsShorlist'] = 'true';
            req.session.data['robEdwardsAlertShorlist'] = 'true';
            res.redirect(`/${req.version}/recruit/applications/app1`)
           break;

           case  (confirmTraining == 'false'):
   
            res.redirect(`/${req.version}/recruit/applications/robEdwards`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Recruit > Applications > Rob Edwards > Reject
// http://127.0.0.1:3000/version-6/recruit/applications/shortListApplication
router.get('/*/recruit/applications/recruitRejectVacancyRobEdwards' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'true'):
            req.session.data['robEdwardsReject'] = 'true';
            req.session.data['robEdwardsAlertReject'] = 'true';
            res.redirect(`/${req.version}/recruit/applications/app1`)
           break;

           case  (confirmTraining == 'false'):
   
            res.redirect(`/${req.version}/recruit/applications/robEdwards`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

// =====================================================================
// --------------------------- END OF RECRUIT --------------------------
// =====================================================================


// =====================================================================
// --------------------------- START OF PROVIDER --------------------------
// =====================================================================


/// Provider > Employer > Provider started reg > employer finished it
// http://127.0.0.1:3000/version-6/newregister/providerStarted/finish?
router.get('/*/newregister/providerStarted/providerAddEmployerFinishedEmployer' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'another'):
            // req.session.data['robEdwardsReject'] = 'true';
            // req.session.data['robEdwardsAlertReject'] = 'true';
            res.redirect(`/${req.version}/finance/reserve`)
           break;

           case  (confirmTraining == 'view'):
            res.redirect(`/${req.version}/find`)
           break;

          case  (confirmTraining == 'homepage'):
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})



/// Provider >  Provider started reg > permission from employer
// http://127.0.0.1:3000/version-6/provider/employerAccount/confirmPermission?
router.get('/*/provider/employerAccount/employerApprovalOrNot' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {

           case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/provider/employerAccount/confirm`)
           break;

          case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/provider/employerAccount/stop`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})




/// Recruit > Applications > Rob Edwards > Reject
// http://127.0.0.1:3000/version-6/recruit/applications/shortListApplication
router.get('/*/provider/employerAccount/providerAddEmployerFinished' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'another'):
            // req.session.data['robEdwardsReject'] = 'true';
            // req.session.data['robEdwardsAlertReject'] = 'true';
            res.redirect(`/${req.version}/provider/employerAccount`)
           break;

           case  (confirmTraining == 'view'):
            res.redirect(`/${req.version}/provider/employerAccount/manage`)
           break;

          case  (confirmTraining == 'homepage'):
            res.redirect(`/${req.version}/provider/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Provider > Reserve funding > finished reserving
// http://127.0.0.1:3000/version-6/provider/employerAccount/reserveFunding/reserve/complete
router.get('/*/provider/employerAccount/reserveFunding/reserveMVS/finishedReserveFundingProvider' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'hire'):
          console.log("raa");
            res.redirect(`/${req.version}/provider/employerAccount/reserveFunding/changeReserveMVS/howRecruiting`)
           break;

           case  (confirmTraining == 'reserve'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/provider/employerAccount/reserveFunding/reserveMVS`)
           break;

          case  (confirmTraining == 'view'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/provider/employerAccount/reserveFunding/changeReserveMVS`)
           break;

         case  (confirmTraining == 'homepage'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/provider/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Provider > Reserve funding > how are you recruiting
// http://127.0.0.1:3000/version-6/provider/employerAccount/reserveFunding/changeReserveMVS/howRecruiting
router.get('/*/provider/employerAccount/reserveFunding/changeReserveMVS/reserveHowRecruitingFoundYetProvider' , function (req, res) {
  var recruitType = req.query.recruitType
       switch (true) {
          case  (recruitType == 'foundThem'):
            res.redirect(`/${req.version}/provider/employerAccount/addApprentices/fromReserve/alreadyAccepted`)
           break;
          case  (recruitType == 'findThem'):
            res.redirect(`/${req.version}/recruit/fromReserve`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})




/// Provider >  > add apprentice > choose apprentices to start
// http://127.0.0.1:3000/version-6/provider/employerAccount/addApprentices/fromReserve/alreadyAccepted
router.get('/*/provider/employerAccount/addApprentices/fromReserve/chooseAnApprenticeToStartV3ManageProvider' , function (req, res) {
  var confirmTraining = req.query.acceptedRecruit
       switch (true) {
          case  (confirmTraining == 'Rob Edwards'):
            req.session.data['FirstFirstName'] = 'Rob';
            req.session.data['FirstLastName'] = 'Edwards';

            req.session.data['dob-day'] = '5';
            req.session.data['dob-month'] = 'May';
            req.session.data['dob-year'] = '2000';

            res.redirect(`/${req.version}/provider/employerAccount/addApprentices/nonLevyFull/oneAtTime/apprenticeConfirm`)
           break;

           case  (confirmTraining == 'David Jenkins'):
            req.session.data['FirstFirstName'] = 'David';
            req.session.data['FirstLastName'] = 'Jenkins';

            req.session.data['dob-day'] = '5';
            req.session.data['dob-month'] = 'May';
            req.session.data['dob-year'] = '2000';

            res.redirect(`/${req.version}/provider/employerAccount/addApprentices/nonLevyFull/oneAtTime/apprenticeConfirm`)
           break;

          case  (confirmTraining == 'someoneElse'):
        //  req.session.data['theTraingCourse'] = 'Aeronautical engineer, Level 2';
            res.redirect(`/${req.version}/provider/employerAccount/addApprentices/nonLevyFull/oneAtTime/apprenticeAdd`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Provider >  > add apprentice > choose apprentices to start
// http://127.0.0.1:3000/version-6/provider/employerAccount/addApprentices/nonLevyFull/oneAtTime/alreadyAccepted
router.get('/*/provider/employerAccount/addApprentices/nonLevyFull/oneAtTime/chooseAnApprenticeToStartV6ManageProvider' , function (req, res) {
  var confirmTraining = req.query.acceptedRecruit
       switch (true) {
          case  (confirmTraining == 'Rob Edwards'):
            req.session.data['FirstFirstName'] = 'Rob';
            req.session.data['FirstLastName'] = 'Edwards';

            req.session.data['dob-day'] = '5';
            req.session.data['dob-month'] = 'May';
            req.session.data['dob-year'] = '2000';

            res.redirect(`/${req.version}/provider/employerAccount/addApprentices/nonLevyFull/oneAtTime/apprenticeConfirm`)
           break;

           case  (confirmTraining == 'David Jenkins'):
            req.session.data['FirstFirstName'] = 'David';
            req.session.data['FirstLastName'] = 'Jenkins';

            req.session.data['dob-day'] = '5';
            req.session.data['dob-month'] = 'May';
            req.session.data['dob-year'] = '2000';

            res.redirect(`/${req.version}/provider/employerAccount/addApprentices/nonLevyFull/oneAtTime/apprenticeConfirm`)
           break;

          case  (confirmTraining == 'someoneElse'):
        //  req.session.data['theTraingCourse'] = 'Aeronautical engineer, Level 2';
            res.redirect(`/${req.version}/provider/employerAccount/addApprentices/nonLevyFull/oneAtTime/apprenticeAdd`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Provider > add apprentice > finished adding individual apprentice
// http://127.0.0.1:3000/version-3/apprentices/add/nonLevyFull/oneAtTime/finish?
router.get('/*/provider/employerAccount/addApprentices/nonLevyFull/oneAtTime/addApprenticeAddSingleApprenticeFinishedProvider' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'addAnother'):
            res.redirect(`/${req.version}/provider/employerAccount/addApprentices/nonLevyFull/oneOrBulk`)
           break;

           case  (confirmTraining == 'apprenticeships'):
            res.redirect(`/${req.version}/provider/manage`)
           break;

          case  (confirmTraining == 'homepage'):
            res.redirect(`/${req.version}/provider/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Provider > add apprentice > single or bulk
// http://127.0.0.1:3000/version-6/provider/employerAccount/addApprentices/nonLevyFull/oneOrBulk
router.get('/*/provider/employerAccount/addApprentices/nonLevyFull/oneOrBulkQuestionProvider' , function (req, res) {
  var confirmTraining = req.query.oneOrBulk
       switch (true) {
          case  (confirmTraining == 'one'):
            res.redirect(`/${req.version}/provider/employerAccount/addApprentices/nonLevyFull/oneAtTime/alreadyAccepted`)
           break;

           case  (confirmTraining == 'bulk'):
            res.redirect(`/${req.version}/provider/employerAccount/addApprentices/nonLevyFull/bulkUpload/`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})




// =====================================================================
// --------------------------- END OF PROVIDER STUFF --------------------------
// =====================================================================



/// Employer > Provider Started Registration Finish > Add tax details or postpone
// http://127.0.0.1:3000/version-6/newregister/providerStarted/taxDetails
router.get('/*/newregister/providerStarted/providerStartedEmployerTaxDetails' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/providerStarted/govtgateway`)
           break;

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/providerStarted/changePermissions`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-6/newregister/employerStarted/taxDetails
router.get('/*/newregister/employerStarted/employerStartedEmployerTaxDetails' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/employerStarted/taxDetailsTwo`)
           break;

   
           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/employerStarted/searchOrg`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-7/newregister/employerStarted/taxDetails
router.get('/*/newregister/employerStarted/employerStartedGovGatewayorPensionsReg7' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/employerStarted/govtgateway`)
           break;

  

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/employerStarted/pensionsReg`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-8/newregister/employerStarted/taxDetails
router.get('/*/newregister/employerStarted/employerStartedGovGatewayorPensionsReg' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/employerStarted/allowtaxdetails`)
           break;

  

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/employerStarted/pensionsReg`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})


///// V3 Version
/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-9/newregister/employerStarted/v3/taxDetailsTwo
router.get('/*/newregister/employerStarted/v3/employerStartedGovGatewayorPensionsReg' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/employerStarted/v3/allowtaxdetails`)
           break;

  

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/employerStarted/v3/pensionsReg`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})


///// V3 Version
/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-9/newregister/employerStarted/v3/taxDetailsTwo
router.get('/*/newregister/employerStarted/v3/startTheEmployerJourneyV3' , function (req, res) {
  
            res.redirect(`/${req.version}/newregister/employerStarted/v3/`)
          
})




///// V3 Version
/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-9/newregister/employerStarted/v3/taxDetailsTwo
router.get('/*/newregister/employerStarted/v3employer/employerStartedGovGatewayorPensionsReg' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/employerStarted/v3employer/allowtaxdetails`)
           break;

  

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/employerStarted/v3employer/pensionsReg`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})



/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-8/newregister/employerStarted/april/taxDetailsTwo
router.get('/*/newregister/employerStarted/april/employerStartedGovGatewayorPensionsReg' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/employerStarted/april/allowtaxdetails`)
           break;

  

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/employerStarted/april/pensionsReg`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})


/// V$ Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-9/newregister/employerStarted/v4/insideAccount/getFunds/taxDetailsTwo
router.get('/*/newregister/employerStarted/v4/insideAccount/getFunds/employerStartedGovGatewayorPensionsReg' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/employerStarted/v4/insideAccount/getFunds/allowtaxdetails`)
           break;

  

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/employerStarted/v4/insideAccount/getFunds/pensionsReg`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-6/newregister/employerStarted/taxDetails
router.get('/*/newregister/employerStarted/employerStartedEmployerHaveProvider' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/employerStarted/chooseProvider`)
           break;

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/employerStarted/reserveStart`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > Employer Started Registration  > Reserve, Add, Manage provider permissions
// http://127.0.0.1:3000/version-6/newregister/employerStarted/changePermissions?
router.get('/*/newregister/employerStarted/reserveAddManageProviderPermissionReg' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/employerStarted/permissionTwo`)
           break;

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/employerStarted/permissionTwo`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > Employer Started Registration  > do the reserve thing
// http://127.0.0.1:3000/version-6/newregister/employerStarted/knowDates?whatsNeeded=true
router.get('/*/newregister/employerStarted/whenApprenticeshipWillStartEmployerRegister' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/employerStarted/whenStart/exactDates`)
           break;

           case  (confirmTraining == 'truerough'):
            res.redirect(`/${req.version}/newregister/employerStarted/whenStart/roughDates`)
           break;

            case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/employerStarted/whenStart/finishNoProvider`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


// =====================================================================
// --------------------------- FROM MICROSITE JOURNEY --------------------------
// =====================================================================



/// Employer > From Microsite > provider manage or not
// http://127.0.0.1:3000/version-6/newregister/fromMicro/changePermissions
router.get('/*/newregister/fromMicro/fromMicroProviderAccess' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/fromMicro/knowApprenticeship`)
           break;

            case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/fromMicro/knowApprenticeship`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > From Microsite > know the apprenticeship or not
// http://127.0.0.1:3000/version-6/newregister/fromMicro/knowApprenticeship
router.get('/*/newregister/fromMicro/fromMicroKnowApprentices' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/fromMicro/chooseApp`)
           break;

            case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/fromMicro/knowProvider`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > From Microsite > know the apprenticeship or not
// http://127.0.0.1:3000/version-6/newregister/fromMicro/knowApprenticeship
router.get('/*/newregister/fromMicro/fromMicroChooseApps' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
          case  (confirmTraining == 'Aeronautical engineer, Level 2'):
            res.redirect(`/${req.version}/newregister/fromMicro/knowProvider`)
           break;

            case  (confirmTraining == 'Mechanical engineer, Level 3'):
            res.redirect(`/${req.version}/newregister/fromMicro/knowProvider`)
           break;

            case  (confirmTraining == 'Financial Services Administrator, Level 3'):
            res.redirect(`/${req.version}/newregister/fromMicro/WILLGOTOFAT`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > From Microsite > know the provider or not
// http://127.0.0.1:3000/version-6/newregister/fromMicro/knowProvider
router.get('/*/newregister/fromMicro/fromMicroKnowProvider' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/fromMicro/choosePro`)
           break;

            case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/fromMicro/knowDates`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})



/// Employer > From Microsite > know the provider or not
// http://127.0.0.1:3000/version-6/newregister/fromMicro/choosePro
router.get('/*/newregister/fromMicro/fromMicroChoosePro' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
         case  (confirmTraining == 'providerOne'):
            res.redirect(`/${req.version}/newregister/fromMicro/knowDates`)
           break;

            case  (confirmTraining == 'providerTwo'):
            res.redirect(`/${req.version}/newregister/fromMicro/knowDates`)
           break;

           case  (confirmTraining == 'anotherProvider'):
            res.redirect(`/${req.version}/newregister/fromMicro/WILLGOTOFATPROVIDER`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > From Microsite > know the dates or not
// http://127.0.0.1:3000/version-6/newregister/fromMicro/knowDates
router.get('/*/newregister/fromMicro/fromMicroChooseDates' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
         case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/fromMicro/whenStart/exactDates`)
           break;

            case  (confirmTraining == 'trueRough'):
            res.redirect(`/${req.version}/newregister/fromMicro/whenStart/roughDates`)
           break;

           case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/fromMicro/whenStart/noDates`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > From Microsite > tax details
// http://127.0.0.1:3000/version-6/newregister/fromMicro/taxDetails
router.get('/*/newregister/fromMicro/fromMicroTaxDetails' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/fromMicro/govtgateway`)
           break;

            case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/newregister/fromMicro/knowApprentice`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > From Microsite > know apprentice
// http://127.0.0.1:3000/version-6/newregister/fromMicro/knowApprentice?
router.get('/*/newregister/fromMicro/fromMicroKnowApprentice' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/newregister/fromMicro/apprenticeAdd`)
           break;

            case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > Dans REserve Journey > know course or not
// http://127.0.0.1:3000/version-7/finance/reserve/new/courseKnown?acceptedRecruit=January+2019
router.get('/*/finance/reserve/new/reserveCourseKnownCheck' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
          case  (confirmTraining == 'Yes'):
            res.redirect(`/${req.version}/finance/reserve/new/find/appreticeshipsearch`)
           break;

         case  (confirmTraining == 'No'):
            res.redirect(`/${req.version}/finance/reserve/new/confirmReserveFunding`)
           break;

        default:
            console.log("bork bork bork bork");
            break;
        }
})


/// Employer > start and apprentices, secured funding or not
// http://127.0.0.1:3000/version-7/start/gotReserve
router.get('/*/start/startApprenticeSecureFunding' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/start/chooseReserve`)
           break;

         case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/start/reserve`)
           break;

        default:
            console.log("bork bork bork bork");
            break;
        }
})

/// Employer > start and apprentices, choose funding you want
// http://127.0.0.1:3000/version-7/start/chooseReserve
router.get('/*/start/startApprenticeshipWhichFunding' , function (req, res) {
  var confirmTraining = req.query.funding
  console.log(confirmTraining)
       switch (true) {
          case  (confirmTraining == 'one'):
       //   req.session.data['startApprenticesApprenticeshipName'] = 'An apprenticeship';
          req.session.data['startAppDate'] = '1 May 2019 and 30 July 2019';
            res.redirect(`/${req.version}/start/haveApprenticeship`)
           break;

         case  (confirmTraining == 'two'):
          req.session.data['startApprenticesApprenticeshipName'] = 'Mechanical engineer,Level 3 ';
          req.session.data['startAppDate'] = '1 June 2019 and 31 August 2019';
            res.redirect(`/${req.version}/start/reserve/existingReserveCorrect`)
           break;

          case  (confirmTraining == 'other'):
            res.redirect(`/${req.version}/start/reserve/`)
           break;

        default:
            console.log("bork bork bork bork");
            break;
        }
})


/// Employer > start and apprentices > Have you found a provider yet?
// http://127.0.0.1:3000/version-7/start/haveProvider
router.get('/*/start/startApprenticeshipHaveProvider' , function (req, res) {
  var confirmTraining = req.query.usedService
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/start/chooseProvider`)
           break;

         case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/start/gotReserve`)
           break;

        default:
            console.log("bork bork bork bork");
            break;
        }
})


/// Employer > start apprentices > Have you found the apprentice yet?
// http://127.0.0.1:3000/version-7/start/haveApprentice
router.get('/*/start/startApprenticeshipHaveApprentice' , function (req, res) {
  var confirmTraining = req.query.recruitType
       switch (true) {
          case  (confirmTraining == 'yes'):
            res.redirect(`/${req.version}/start/addApprentice/apprenticeAdd`)
           break;

         case  (confirmTraining == 'no'):
            res.redirect(`/${req.version}/start/wantRecruit`)
           break;

        default:
            console.log("bork bork bork bork");
            break;
        }
})



/// Employer > start apprentices > Finished
// http://127.0.0.1:3000/version-7/start/addApprentice/finish?
router.get('/*/start/addApprentice/addApprenticeAddSingleApprenticeFinished' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'addAnother'):
            res.redirect(`/${req.version}/start`)
           break;

           case  (confirmTraining == 'apprenticeships'):
            res.redirect(`/${req.version}/apprentices/manage`)
           break;

          case  (confirmTraining == 'homepage'):
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > start apprentices > Use RAA to recruit
// http://127.0.0.1:3000/version-7/start/wantRecruit
router.get('/*/start/startApprenticeshipUseRecruit' , function (req, res) {
  var confirmTraining = req.query.recruitType
       switch (true) {
          case  (confirmTraining == 'yes'):
            res.redirect(`/${req.version}/recruit/step-1`)
           break;

         case  (confirmTraining == 'no'):
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;

        default:
            console.log("bork bork bork bork");
            break;
        }
})

/// Employer > start apprentices > have apprenticeship?
// http://127.0.0.1:3000/version-7/start/haveApprenticeship
router.get('/*/start/startApprenticeshipHaveApprenticeshipTraining' , function (req, res) {
  var confirmTraining = req.query.usedService
       switch (true) {
          case  (confirmTraining == 'true'):
            res.redirect(`/${req.version}/start/chooseApp`)
           break;

         case  (confirmTraining == 'false'):
            res.redirect(`/${req.version}/start/haveApprentice`)
           break;

        default:
            console.log("bork bork bork bork");
            break;
        }
})

/// Employer > start apprentices > one or bulk
// http://127.0.0.1:3000/version-7/start/oneOrBulk
router.get('/*/start/startApprenticeshiponeOrBulkQuestion' , function (req, res) {
  var confirmTraining = req.query.oneOrBulk
       switch (true) {
          case  (confirmTraining == 'one'):
            res.redirect(`/${req.version}/start/haveProvider`)
           break;

         case  (confirmTraining == 'bulk'):
            res.redirect(`/${req.version}/start/BORKborkBork`)
           break;

        default:
            console.log("bork bork bork bork");
            break;
        }
})

//Hacky rewrite of numbers to months, don't judge, it works.
// http://127.0.0.1:3000/version-7/start/addApprentice/apprenticeAdd
router.get('/*/start/addApprentice/startApprenticeshipFiddleAndRedirect' , function (req, res) {
  var confirmTraining =  req.session.data['start-date-month'] 
       switch (true) {
        case  (confirmTraining == '1'):
          req.session.data['start-date-month'] = "January"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
        case  (confirmTraining == '2'):
          req.session.data['start-date-month'] = "February"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
        case  (confirmTraining == '3'):
          req.session.data['start-date-month'] = "March"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
        case  (confirmTraining == '4'):
          req.session.data['start-date-month'] = "April"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
        case  (confirmTraining == '5'):
          req.session.data['start-date-month'] = "May"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
        case  (confirmTraining == '6'):
          req.session.data['start-date-month'] = "June"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
        case  (confirmTraining == '7'):
          req.session.data['start-date-month'] = "July"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
       case  (confirmTraining == '8'):
          req.session.data['start-date-month'] = "August"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
       case  (confirmTraining == '9'):
          req.session.data['start-date-month'] = "September"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
      case  (confirmTraining == '10'):
          req.session.data['start-date-month'] = "October"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
      case  (confirmTraining == '11'):
          req.session.data['start-date-month'] = "November"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;
      case  (confirmTraining == '12'):
          req.session.data['start-date-month'] = "December"
            res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
           break;

        default:
            console.log("bork bork bork bork");
            req.session.data['start-date-month'] = ""
             res.redirect(`/${req.version}/start/addApprentice/apprenticeConfirm`)
            break;
        }
})

 
//// AUGUST VERSION
/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-6/newregister/employerStarted/taxDetails
router.get('/*/newregister/employerStarted/employerStartedEmployerWhatYoullNeed' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
              req.session.data['addingPAYE'] = 'true';
            res.redirect(`/${req.version}/newregister/employerStarted/contactDetails`)
           break;

            case  (confirmTraining == 'truthy'):
              req.session.data['addingPAYE'] = 'truthy';
            res.redirect(`/${req.version}/newregister/employerStarted/contactDetails`)
           break;

   
           case  (confirmTraining == 'false'):
            req.session.data['addingPAYE'] = 'false';
            res.redirect(`/${req.version}/newregister/employerStarted/contactDetails`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


//// APRIL Three VERSION
/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-9/newregister/employerStarted/aprilThree/whatyoullneed
router.get('/*/newregister/employerStarted/aprilThree/employerStartedEmployerWhatYoullNeed' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
              req.session.data['addingPAYE'] = 'true';
              req.session.data['showOrgContact'] = false;
            res.redirect(`/${req.version}/newregister/employerStarted/aprilThree/contactDetails`)
           break;

            case  (confirmTraining == 'truthy'):
              req.session.data['addingPAYE'] = 'truthy';
                   req.session.data['showOrgContact'] = false;
            res.redirect(`/${req.version}/newregister/employerStarted/aprilThree/contactDetails`)
           break;

   
           case  (confirmTraining == 'false'):
            req.session.data['addingPAYE'] = 'false';
                 req.session.data['showOrgContact'] = true;
            res.redirect(`/${req.version}/newregister/employerStarted/aprilThree/contactDetails`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

//// APRIL Three VERSION v11
/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-11/newregister/employerStarted/aprilThree/whatyoullneed
router.get('/*/newregister/employerStarted/aprilThree/employerStartedEmployerWhatYoullNeedv11' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
              req.session.data['addingPAYE'] = 'true';
              req.session.data['showOrgContact'] = false;
            res.redirect(`/${req.version}/newregister/employerStarted/aprilThree/allowtaxdetails`)
           break;

            case  (confirmTraining == 'truthy'):
              req.session.data['addingPAYE'] = 'truthy';
                   req.session.data['showOrgContact'] = false;
            res.redirect(`/${req.version}/newregister/employerStarted/aprilThree/contactDetails`)
           break;

   
           case  (confirmTraining == 'false'):
            req.session.data['addingPAYE'] = 'false';
                 req.session.data['showOrgContact'] = true;
            res.redirect("https://marvelapp.com/4gae4fh/screen/54485859")
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})




//// VERSION 2 - THAT ASKS WHAT YOU WANT TO DO WITH THE ACCOUNT - AUGUST VERSION
/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-9/newregister/employerStarted/v2/accountType
router.get('/*/newregister/employerStarted/v4/redirectRoutes' , function (req, res) {
              req.session.data['addingPAYE'] = 'false';
            res.redirect(`/${req.version}/newregister/employerStarted/contactDetails`)
})



//// VERSION 2 - THAT ASKS WHAT YOU WANT TO DO WITH THE ACCOUNT - AUGUST VERSION
/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-9/newregister/employerStarted/v2/accountType
router.get('/*/newregister/employerStarted/v2/whatTypeOfAccount' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          // case  (confirmTraining == 'true'):
          //     req.session.data['addingPAYE'] = 'needToChoose';
          //   res.redirect(`/${req.version}/newregister/employerStarted/contactDetails`)
          //  break;

           case  (confirmTraining == 'true'):
              req.session.data['addingPAYE'] = 'true';
            res.redirect(`/${req.version}/newregister/employerStarted/contactDetails`)
           break;

            case  (confirmTraining == 'truthy'):
              req.session.data['addingPAYE'] = 'truthy';
            res.redirect(`/${req.version}/newregister/employerStarted/contactDetails`)
           break;

   
           case  (confirmTraining == 'false'):
            req.session.data['addingPAYE'] = 'false';
            res.redirect(`/${req.version}/newregister/employerStarted/contactDetails`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})


//// APRIL VERSION
/// Employer > Employer Started Registration  > Add tax details or postpone
// http://127.0.0.1:3000/version-6/newregister/employerStarted/april/whatyoullneed
router.get('/*/newregister/employerStarted/april/employerStartedEmployerWhatYoullNeed' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
              req.session.data['addingPAYE'] = 'true';
            res.redirect(`/${req.version}/newregister/employerStarted/april/contactDetails`)
           break;

   
           case  (confirmTraining == 'false'):
            req.session.data['addingPAYE'] = 'false';
            res.redirect(`/${req.version}/newregister/employerStarted/april/contactDetails`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})

//// v3 VERSION
/// Employer > Employer Started Registration  > Add tax details or postpone
//http://127.0.0.1:3000/version-9/newregister/employerStarted/v3/whatyoullneed
router.get('/*/newregister/employerStarted/v3/employerStartedEmployerWhatYoullNeed' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
              req.session.data['addingPAYE'] = 'true';
            res.redirect(`/${req.version}/newregister/employerStarted/v3/taxDetailsTwo`)
           break;

   
           case  (confirmTraining == 'false'):
            req.session.data['addingPAYE'] = 'false';
            // res.redirect("https://marvelapp.com/4gae4fh/screen/54485859")
            res.redirect("https://marvelapp.com/4gae4fh")

           break;
        default:
            console.log("bork bork bork");
            break;
        }
})

//// v3 VERSION
/// Employer > Employer Started Registration  > Add tax details or postpone
//http://127.0.0.1:3000/version-9/newregister/employerStarted/v3/whatyoullneed
router.get('/*/newregister/employerStarted/v3employer/employerStartedEmployerWhatYoullNeed' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
              req.session.data['addingPAYE'] = 'true';
            res.redirect(`/${req.version}/newregister/employerStarted/v3employer/contactDetails`)
           break;

   
           case  (confirmTraining == 'false'):
            req.session.data['addingPAYE'] = 'false';
            res.redirect(`/${req.version}/newregister/employerStarted/v3employer/contactDetails`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})

/// FEB VERSION
/// Employer > Employer Started Registration  > Add tax details or postpone - FEB VERSION
// http://127.0.0.1:3000/version-8/newregister/employerStarted/feb/whatyoullneed
router.get('/*/newregister/employerStarted/feb/employerStartedEmployerWhatYoullNeedFEB' , function (req, res) {
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
              req.session.data['addingPAYE'] = 'true';
            res.redirect(`/${req.version}/newregister/employerStarted/feb/allowtaxdetails`)
           break;

   
           case  (confirmTraining == 'false'):
            req.session.data['addingPAYE'] = 'false';
            res.redirect(`/${req.version}/newregister/employerStarted/feb/searchOrg`)
           break;
        default:
            console.log("bork bork bork");
            req.session.data['errorPAYE'] = 'true';
               res.redirect(`/${req.version}/newregister/employerStarted/feb/whatyoullneed`)
            break;
        }
})


// =====================================================================
// --------------------------- EPAO End Point Assessor -----------------
// =====================================================================


// More cowboyed stuff for the EPAO!

// WHen the user adds an apprentice, this rewrites the dates and adds up the costs
//Hacky rewrite of numbers to months, don't judge, it works.
// http://127.0.0.1:3000/version-13/EPAO/epaoandcost/apprenticeDetails/add-apprentice
router.get('/*/EPAO/*/apprenticeDetails/addEPAOapprentice' , function (req, res) {
  var confirmTraining =  req.session.data['start-month'] 
  var trainingCost =  parseInt(req.session.data['price'], 10) 
   var epaoCost =  parseInt(req.session.data['agreedEPAOPrice'], 10)

   var epaoTotalCost = trainingCost + epaoCost;

   req.session.data['epaoTotalCost'] = epaoTotalCost


       switch (true) {
        case  (confirmTraining == '1' || confirmTraining == '01'):
          req.session.data['start-month'] = "January"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
        case  (confirmTraining == '2' || confirmTraining == '02'):
          req.session.data['start-month'] = "February"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
        case  (confirmTraining == '3' || confirmTraining == '03'):
          req.session.data['start-month'] = "March"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
        case  (confirmTraining == '4' || confirmTraining == '04'):
          req.session.data['start-month'] = "April"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
        case  (confirmTraining == '5' || confirmTraining == '05'):
          req.session.data['start-month'] = "May"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
        case  (confirmTraining == '6' || confirmTraining == '06'):
          req.session.data['start-month'] = "June"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
        case  (confirmTraining == '7' || confirmTraining == '07'):
          req.session.data['start-month'] = "July"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
       case  (confirmTraining == '8' || confirmTraining == '08'):
          req.session.data['start-month'] = "August"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
       case  (confirmTraining == '9' || confirmTraining == '09'):
          req.session.data['start-month'] = "September"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
      case  (confirmTraining == '10' || confirmTraining == '10'):
          req.session.data['start-month'] = "October"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
      case  (confirmTraining == '11' || confirmTraining == '11'):
          req.session.data['start-month'] = "November"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;
      case  (confirmTraining == '12' || confirmTraining == '12'):
          req.session.data['start-month'] = "December"
            res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
           break;

        default:
            console.log("bork bork bork bork");
            req.session.data['start-month'] = ""
             res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/apprenticeConfirm`)
            break;
        }
})



//// For the version that only shows cots and not the the choice of EPAO - just sets a parameter to not show the EPAO confirm fields
/// EPAO > Enter costs only  > confirm page
//
router.get('/*/EPAO/*/apprenticeDetails/dontShowEPAOConfirmation' , function (req, res) {
    req.session.data['showEPAOConfirm'] = false;
   res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/addEPAOapprentice`)
})


//// For the version that shows both the choice of EPAO and cost
/// EPAO > Enter EPAO and costs  > confirm page

router.get('/*/EPAO/*/apprenticeDetails/showEPAOConfirmation' , function (req, res) {
    req.session.data['showEPAOConfirm'] = true;
   res.redirect(`/${req.version}/EPAO/epaoandcost/apprenticeDetails/addEPAOapprentice`)
})


/// Employer > EPAO commitment > choose to add an epao or not
// http://127.0.0.1:3000/version-13/epao/epaoChoice/epaoOrNot?confirmation=true
router.get('/*/epao/epaoChoice/chooseEPAOorNot' , function (req, res) {
  console.log(req.query.confirmation)
  var confirmTraining = req.query.whatsNeeded
       switch (true) {
          case  (confirmTraining == 'true'):
             req.session.data['showApprenticeBox'] = false;
              req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/epao/epaoChoice/courseComplete`)
           break;

           case  (confirmTraining == 'false'):
             req.session.data['showEPAOConfirm'] = false;
             req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/epao/epaoChoice/apprenticeDetails/add-apprentice`)
           break;
           
        default:
            console.log("bork bork bork bork");
            break;
        }
})

// For the full version that uses the cohort screen. Just adds up the total for that screen
// http://127.0.0.1:3000/version-14/EPAO/fullCommit/apprenticeDetails/add-apprentice?addApprentices=true
router.get('/*/EPAO/*/apprenticeDetails/draftCohortRedirect' , function (req, res) {

// this just adds commas to the total cost, we run it after we have add the epa and training cost together.
     function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                              }

  var trainingCost =  parseInt(req.session.data['price'], 10) 
   var epaoCost =  parseInt(req.session.data['agreedEPAOPrice'], 10)
   var epaoTotalCost = trainingCost + epaoCost;
// run the function that adds commas to the cost
    epaoTotalCost = numberWithCommas(epaoTotalCost)
// add the final cost so we can pull it into the interface
   req.session.data['epaoTotalCost'] = epaoTotalCost

       switch (true) {
        default:
             res.redirect(`/${req.version}/EPAO/fullCommit/apprenticeDetails/draft-cohort`)
            break;
        }
})



/// EPAO > EPAO record an outcome > assessment completed
// http://127.0.0.1:3000/version-14/EPAOOutcomes/complete?
router.get('/*/EPAOOutcomes/EPAOAssessmentChoice' , function (req, res) {
  var confirmTraining = req.query.assessment
       switch (true) {
          case  (confirmTraining == 'yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/EPAOOutcomes/declaration`)
           break;

           case  (confirmTraining == 'partial'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/EPAOOutcomes/partial`)
           break;

          case  (confirmTraining == 'no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/EPAOOutcomes/confirmDidntHappen`)
           break;
           
        default:
            console.log("bork bork bork bork");
            break;
        }
})

/// EPAO > EPAO record an outcome > assessment completed
// http://127.0.0.1:3000/version-14/EPAOOutcomes/complete?
router.get('/*/EPAOPay/EPAOAssessmentChoice' , function (req, res) {
  var confirmTraining = req.query.assessment
       switch (true) {
          case  (confirmTraining == 'yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/EPAOPay/chooseCert`)
           break;

           case  (confirmTraining == 'partial'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/EPAOPay/partial`)
           break;

          case  (confirmTraining == 'gateway'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/EPAOPay/gatewayChoose`)
           break;
           
        default:
            console.log("bork bork bork bork");
            break;
        }
})


/// EPAO > EPAO pay me > have you recorded an outcome
// http://127.0.0.1:3000/version-19/EPAOPay/chooseCert
router.get('/*/EPAOPay/EPAOCertOrNot' , function (req, res) {
  var confirmTraining = req.query.assessment
       switch (true) {
          case  (confirmTraining == 'yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/EPAOPay/recordOutcome/recorded`)
           break;

           case  (confirmTraining == 'no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/EPAOPay/recordOutcome`)
           break;

        default:
            console.log("bork bork bork bork");
            break;
        }
})

//////// START OF RAA ROUTES ///////////////////////////


// Any sign in trigger on RAA will go through here
// http://127.0.0.1:3000/version-20/RAA
router.get('/*/RAA/signInTrigger' , function (req, res) {

// this just adds commas to the total cost, we run it after we have add the epa and training cost together.

   req.session.data['FAALoggedIn'] = true;
  res.redirect(`/${req.version}/RAA/appForm`)
  })



// Any sign out trigger on RAA will go through here
// http://127.0.0.1:3000/version-20/RAA
router.get('/*/RAA/signOutTrigger' , function (req, res) {

// this just adds commas to the total cost, we run it after we have add the epa and training cost together.

   req.session.data['FAALoggedIn'] = false;
  res.redirect(`/${req.version}/RAA/become/guide/showall`)
  })



// Registration trigger RAA will go through here
// http://127.0.0.1:3000/version-20/RAA/moreReg
router.get('/*/RAA/apprenticeshipsearchLog' , function (req, res) {

// this just adds commas to the total cost, we run it after we have add the epa and training cost together.

   req.session.data['FAALoggedIn'] = true;
  res.redirect(`/${req.version}/RAA/apprenticeshipsearch`)
  })


/// FAA search
// http://127.0.0.1:3000/version-22/RAA/reg3/chooseSearch
router.get('/*/RAA/reg3/searchForDifferentApprentices' , function (req, res) {
  var confirmTraining = req.query.assessment
       switch (true) {
          case  (confirmTraining == 'employer'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/RAA/reg3/employerSearch`)
           break;

           case  (confirmTraining == 'job'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/RAA/reg3/jobSearch`)
           break;

            case  (confirmTraining == 'saved'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/RAA/reg3/savedSearch`)
           break;

        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/EPAOPay/arse`)
            break;
        }
})

/// FAA search
// http://127.0.0.1:3000/version-22/RAA/reg6/chooseSearch
router.get('/*/RAA/reg6/searchForDifferentApprenticesv6' , function (req, res) {
  var confirmTraining = req.query.assessment
       switch (true) {
          case  (confirmTraining == 'employer'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/RAA/employerList`)
           break;

           case  (confirmTraining == 'job'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/RAA/searchResults`)
           break;

          case  (confirmTraining == 'keywords'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/RAA/searchResults`)
           break;

            case  (confirmTraining == 'saved'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/RAA/reg6/savedSearch`)
           break;

        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/EPAOPay/arse`)
            break;
        }
})

/// Become an apprentice
// http://127.0.0.1:3000/version-23/RAA/become/guide/allornothing
router.get('/*/RAA/become/guide/guidanceornot' , function (req, res) {
  var confirmTraining = req.query.assessment
       switch (true) {
          case  (confirmTraining == 'employer'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/RAA/become/guide/step-1`)
           break;

           case  (confirmTraining == 'job'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/RAA/become/guide/showall`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/arsebork`)
            break;
        }
})


/// Become an apprentice
// http://127.0.0.1:3000/version-23/RAA/become/guide/showMeLevelThrees
router.get('/*/RAA/become/guide/showMeLevelThrees' , function (req, res) {
  var confirmTraining = req.query.assessment
       switch (true) {
          case  (confirmTraining == 'yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/RAA/reg8/apprenticeshipsearch`)
           break;

           case  (confirmTraining == 'no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/RAA/become/guide/showall`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/RAA/become/guide/showall`)
            break;
        }
})

/// Login or register
// http://127.0.0.1:3000/version-24/RAA/become/guide/register
router.get('/*/RAA/become/guide/register/signorregister' , function (req, res) {
  var confirmTraining = req.query.assessment
       switch (true) {
          case  (confirmTraining == 'employer'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/RAA/become/guide/register/signin`)
           break;

           case  (confirmTraining == 'job'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/RAA/become/guide/register/register`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/RAA/become/guide/showall`)
            break;
        }
})

/// Google or not
// http://127.0.0.1:3000/version-24/RAA/become/guide/register/register
router.get('/*/RAA/become/guide/register/googleornot' , function (req, res) {
  var confirmTraining = req.query.assessment
       switch (true) {
          case  (confirmTraining == 'employer'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/RAA/become/guide/register/google`)
           break;

           case  (confirmTraining == 'job'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/RAA/become/guide/register/emailandpass`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/RAA/become/guide/showall`)
            break;
        }
})


// Set up an account
// http://127.0.0.1:3000/version-20/RAA
router.get('/*/RAA/become/guide/register/registeredLite' , function (req, res) {

// this just adds commas to the total cost, we run it after we have add the epa and training cost together.

   req.session.data['FAALoggedIn'] = true;
  res.redirect(`/${req.version}/RAA/reg8/apprenticeshipsearch`)
  })

// Set up an account
// http://127.0.0.1:3000/version-20/RAA
router.get('/*/RAA/become/guide/register/google/registeredLite' , function (req, res) {

// this just adds commas to the total cost, we run it after we have add the epa and training cost together.

   req.session.data['FAALoggedIn'] = true;
  res.redirect(`/${req.version}/RAA/reg8/apprenticeshipsearch`)
  })



// Sending nav links to correct place
// Home/checklist nav

 router.get('/*/returnToChecklist', function (req, res) {
  res.redirect(`/${req.version}/RAA/become/guide/showall`)
 })

  router.get('/*/*/returnToChecklist', function (req, res) {
  res.redirect(`/${req.version}/RAA/become/guide/showall`)
 })

// Sending nav links to correct place
// My applications link

 router.get('/*/viewMyApplications', function (req, res) {
  res.redirect(`/${req.version}/RAA/myApplications`)
 })

  router.get('/*/*/viewMyApplications', function (req, res) {
  res.redirect(`/${req.version}/RAA/myApplications`)
 })



  /// ethnicity groups split
// http://127.0.0.1:3000/version-24/RAA/appForm/ethnicty
router.get('/*/RAA/appForm/ethnicSplit' , function (req, res) {
  var confirmTraining = req.query.ethnicgroup
       switch (true) {
          case  (confirmTraining == 'asian-or-asian-british'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/RAA/appForm/ethnicAsian`)
           break;

           case  (confirmTraining == 'job'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/RAA/become/guide/register/emailandpass`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/RAA/appForm/check`)
            break;
        }
})

/////////END OF RAA/FAA ROUTES //////////////////////////////
/////////NPQ ROUTES //////////////////////////////
  /// TRN or not
// http://127.0.0.1:3000/version-1/pstart/teacher/TRNCheck

router.get('/*/pstart/teacher/trnOrNot' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/pstart/teacher/details`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/pstart/teacher/aboutTRN`)
           break;


        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/pstart/teacher/aboutTRN`)
            break;
        }
})
  /// Change email address
// http://127.0.0.1:3000/version-1/pstart/teacher/confirmEmail

router.get('/*/pstart/teacher/changeEmailAddress' , function (req, res) {
  var confirmTraining = req.query.emailChange
       switch (true) {
          case  (confirmTraining == 'email-yes'):
             

             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/pstart/teacher/confirmDetails`)
           break;

           case  (confirmTraining == 'email-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/pstart/teacher/changeEmail`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/pstart/teacher/confirmDetails`)
            break;
        }
})

  /// Change details
// http://127.0.0.1:3000/version-1/pstart/teacher/confirmDetails

router.get('/*/pstart/teacher/detailsCorrectOrNot' , function (req, res) {
  var confirmTraining = req.query.detailsCorrect
       switch (true) {
          case  (confirmTraining == 'details-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/pstart/teacher/registerEmailUpdates`)
           break;

           case  (confirmTraining == 'details-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/pstart/teacher/detailsWrong`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/pstart/teacher/details`)
            break;
        }
})

  /// Change  email address
// http://127.0.0.1:3000/version-1/pstart/teacher/confirmDetails

router.get('/*/pstart/teacher/detailsCorrectOrNot' , function (req, res) {

})

 /// TRN or not Teacher starts version
// http://127.0.0.1:3000/version-1/pstart/teacher/TRNCheck

router.get('/*/tstart/trnOrNot' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/details`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/aboutTRN`)
           break;


        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})


 /// TRN or not Teacher starts version2
// http://127.0.0.1:3000/version-2/tstart/TRNCheck
router.get('/*/tstart/trnOrNotTwo' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/namecheck`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/aboutTRN`)
           break;

                  case  (confirmTraining == 'TRN-nai'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/getTRN`)
           break;


        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})

 /// TRN or not Teacher starts version2
// http://127.0.0.1:3000/version-2/tstart/TRNCheck
router.get('/*/sstart/trnOrNotTwo' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/sstart/namecheck`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/sstart/aboutTRN`)
           break;


        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/sstart/aboutTRN`)
            break;
        }
})

 /// Name change or not version2
// http://127.0.0.1:3000/version-2/tstart/namecheck
router.get('/*/tstart/namechecker' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/nameExplain`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/details`)
           break;


        default:
            console.log("bork bork bork bork");
           //     res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})

 /// Name change or not version2
// http://127.0.0.1:3000/version-2/tstart/namecheck
router.get('/*/tstart/namecheckerTwo' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/nameExplain`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/email`)
           break;


        default:
            console.log("bork bork bork bork");
           //     res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})

 /// Name change or not version2
// http://127.0.0.1:3000/version-5/sstart/namecheck
router.get('/*/sstart/namechecker' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/sstart/details`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/sstart/adminNameCheck`)
           break;


        default:
            console.log("bork bork bork bork");
           //     res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})


 /// funding Checker
// http://127.0.0.1:3000/version-5/sstart/fundingCheck
router.get('/*/sstart/fundingchecker' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
          case  (confirmTraining == 'funding-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/sstart/teacherContactDetails`)
           break;

           case  (confirmTraining == 'funding-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/sstart/adminNameCheck`)
           break;


        default:
            console.log("bork bork bork bork b");
           //     res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})

 /// Name change or not version2
// http://127.0.0.1:3000/version-2/tstart/nameExplain
router.get('/*/tstart/nameExplainer' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/details`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/nameNotUpdated`)
           break;

          case  (confirmTraining == 'name-ns'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/detailsMaybe`)
           break;


        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})

 /// Name change or not version2
// http://127.0.0.1:3000/version-2/tstart/nameExplain
router.get('/*/tstart/nameExplainerTwo' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/email`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/nameNotUpdated`)
           break;

          case  (confirmTraining == 'name-ns'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/detailsMaybe`)
           break;


        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})



 /// Current school or not
// http://127.0.0.1:3000/version-2/tstart/confirmSchool?assessment=NPQ+Leading+Teaching
router.get('/version-3/tstart/schoolChecker' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'schoolYes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              req.session.data['school-name'] = "St Mark's Church of England Junior School";
            res.redirect(`/${req.version}/tstart/ethnicty`)
           break;

           case  (confirmTraining == 'schoolNo'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/chooseSchoolPost`)
           break;



        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})

// http://127.0.0.1:3000/version-2/tstart/confirmSchool?assessment=NPQ+Leading+Teaching
router.get('/version-5/tstart/schoolChecker' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'schoolYes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              req.session.data['school-name'] = "St Mark's Church of England Junior School";
            res.redirect(`/${req.version}/tstart/ethnicty`)
           break;

           case  (confirmTraining == 'schoolNo'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/chooseSchoolPost`)
           break;



        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})

 /// Current school or not
// http://127.0.0.1:3000/version-2/tstart/confirmSchool?assessment=NPQ+Leading+Teaching
router.get('/version-2/tstart/schoolChecker' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'schoolYes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              req.session.data['school-name'] = "St Mark's Church of England Junior School";
            res.redirect(`/${req.version}/tstart/chooseNPQ`)
           break;

           case  (confirmTraining == 'schoolNo'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/chooseSchoolPost`)
           break;



        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})


// http://127.0.0.1:3000/version-2/tstart/confirmSchool?assessment=NPQ+Leading+Teaching
router.get('/version-6/tstart/schoolChecker' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'schoolYes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              req.session.data['school-name'] = "St Mark's Church of England Junior School";
            res.redirect(`/${req.version}/tstart/confirmDetails`)
           break;

           case  (confirmTraining == 'schoolNo'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/chooseSchoolPost`)
           break;



        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})

// http://127.0.0.1:3000/version-2/tstart/confirmSchool?assessment=NPQ+Leading+Teaching
router.get('/version-7/tstart/schoolChecker' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'schoolYes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              req.session.data['school-name'] = "St Mark's Church of England Junior School";
            res.redirect(`/${req.version}/tstart/howPaying`)
           break;

           case  (confirmTraining == 'schoolNo'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/chooseSchoolPost`)
           break;



        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})


// http://127.0.0.1:3000/version-8/tstart/confirmNewSchool
router.get('/version-8/tstart/schoolConfirmationChecker' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'schoolYes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
          
            res.redirect(`/${req.version}/tstart/confirmDetails`)
           break;

           case  (confirmTraining == 'schoolNo'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/chooseSchoolPost`)
           break;



        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/confirmDetails`)
            break;
        }
})



// http://127.0.0.1:3000/version-2/tstart/confirmSchool?assessment=NPQ+Leading+Teaching
router.get('/*/tstart/deliveryProviderChecking' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'deliveryNo'):
      
              req.session.data['delveryProvider'] = "Don't know";
            res.redirect(`/${req.version}/tstart/chooseSchoolPost`)
           break;

           case  (confirmTraining == 'deliveryYes'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/chooseDeliveryProvider`)
           break;



        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/aboutTRN`)
            break;
        }
})

 /// Share details with providers
// http://127.0.0.1:3000/version-2/tstart/shareProvider?
router.get('/*/tstart/shareWithProvider' , function (req, res) {
  var confirmTraining = req.query.providerShare
       switch (true) {
          case  (confirmTraining == 'shareYes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             // req.session.data['school-name'] = "St Mark's Church of England Junior School";
            res.redirect(`/${req.version}/tstart/trncheck`)
           break;

           case  (confirmTraining == 'shareNo'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/FIXTHIS`)
           break;



        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/tstart/trncheck`)
            break;
        }
})

  /// ethnicity groups split
// http://127.0.0.1:3000/version-2/tstart/ethnicty?
router.get('/*/tstart/ethnicSplit' , function (req, res) {
  var confirmTraining = req.query.ethnicgroup
       switch (true) {
          case  (confirmTraining == 'asian-or-asian-british'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/tstart/ethnicAsian`)
           break;

           case  (confirmTraining == 'job'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/gender`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/tstart/gender`)
            break;
        }
})



  /// change name or use old nam
// http://127.0.0.1:3000/version-2/tstart/nameNotUpdated
router.get('/*/tstart/nameUpdateOrNot' , function (req, res) {
  var confirmTraining = req.query.DQTorNot
       switch (true) {
          case  (confirmTraining == 'DQTChange'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/tstart/DQTChange`)
           break;

           case  (confirmTraining == 'crackOn'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/details`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/tstart/`)
            break;
        }
})


  /// change name or use old nam
// http://127.0.0.1:3000/version-2/tstart/nameNotUpdated
router.get('/*/tstart/nameUpdateOrNotTwo' , function (req, res) {
  var confirmTraining = req.query.DQTorNot
       switch (true) {
          case  (confirmTraining == 'DQTChange'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/tstart/DQTChange`)
           break;

           case  (confirmTraining == 'crackOn'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/email`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/tstart/`)
            break;
        }
})

  /// smart answers begin
// http://127.0.0.1:3000/version-4/smartAnswers/showPersonalisedGuidance
router.get('/*/smartAnswers/showPersonalisedGuidance' , function (req, res) {
  var confirmTraining = req.query.confirm
       switch (true) {
          case  (confirmTraining == 'yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/smartAnswers/career`)
           break;

           case  (confirmTraining == 'no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/smartAnswers/begin`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/smartAnswers/`)
            break;
        }
})

  /// smart answers begin
// http://127.0.0.1:3000/version-4/smartAnswers/showPersonalisedGuidance
router.get('/*/smartAnswers/careerStage' , function (req, res) {
  var confirmTraining = req.query.confirm
       switch (true) {
          case  (confirmTraining == 'ecf'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
            res.redirect(`/${req.version}/smartAnswers/npq`)
           break;

           case  (confirmTraining == 'npq'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/smartAnswers/npq`)
           break;

                   case  (confirmTraining == 'neither'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/smartAnswers/npq`)
           break;


        default:
            console.log("bork bork bork bork");
             res.redirect(`/${req.version}/smartAnswers/`)
            break;
        }
})

router.get('/*/tstart/npqandproviderornot' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/shareProvider`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/aboutNPQ`)
           break;


        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/pstart/teacher/aboutTRN`)
            break;
        }
})



router.get('/*/tstart/npqasoornot' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/asosupport/npqProviderCheck`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/tstart/npqProviderCheck`)
           break;


        default:
         
                res.redirect(`/${req.version}/tstart/error`)
            break;
        }
})




router.get('/*/tstart/whichNPQRoute' , function (req, res) {
  var assessment = req.query.assessment
       switch (true) {
          case  (assessment == 'NPQ Headship'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqHeadship`)
           break;

          case  (assessment == 'Additional Support Offer for NPQH'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqASO`)
           break;


        default:
            console.log("ar " + assessment);
                res.redirect(`/${req.version}/tstart/chooseProvider`)
            break;
        }
})


router.get('/*/tstart/whichNPQRoute16' , function (req, res) {
  var assessment = req.query.assessment
       switch (true) {
          case  (assessment == 'NPQ Headship'):
             req.session.data['npqHeadshipChoice'] = true;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/qualifyNPQ`)
           break;

          case  (assessment == 'Additional Support Offer for NPQH'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqASO`)
           break;


        default:
            console.log("ar " + assessment);
                res.redirect(`/${req.version}/tstart/qualifyNPQ`)
            break;
        }
})



router.get('/*/tstart/whichNPQRouteTwo' , function (req, res) {
  var assessment = req.query.assessment
       switch (true) {
          case  (assessment == 'NPQ Headship'):
              req.session.data['npqHeadshipChoice'] = true;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/qualifyNPQ`)
           break;

          case  (assessment == 'Additional Support Offer for NPQH'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqASO`)
           break;


        default:
            console.log("ar " + assessment);
                res.redirect(`/${req.version}/tstart/qualifyNPQ`)
            break;
        }
})



router.get('/*/tstart/headChecker' , function (req, res) {
  var assessment = req.query.headChecker
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqAsoCheck`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/trncheck`)
           break;


        default:
            console.log("ar " + assessment);
                res.redirect(`/${req.version}/tstart/chooseProvider`)
            break;
        }
})

router.get('/*/tstart/asonpq' , function (req, res) {
  var assessment = req.query.AsoNPQ
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqASO`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/trncheck`)
           break;


        default:
            console.log("ar " + assessment);
                res.redirect(`/${req.version}/tstart/chooseProvider`)
            break;
        }
})

router.get('/*/tstart/asoheader' , function (req, res) {
  var assessment = req.query.asoHeader
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqASOTwo`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/ASOno`)
           break;


        default:
            console.log("ar " + assessment);
                res.redirect(`/${req.version}/tstart/chooseProvider`)
            break;
        }
})


router.get('/*/tstart/asoheader16' , function (req, res) {
  var assessment = req.query.asoHeader
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqASOTwo`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/ASOSelfOne`)
           break;


        default:
            console.log("ar " + assessment);
                res.redirect(`/${req.version}/tstart/chooseProvider`)
            break;
        }
})

router.get('/*/tstart/npqnotnotnot' , function (req, res) {
  var assessment = req.query.asoHeadTwo
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/trncheck`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/ASOno`)
           break;


        default:
            console.log("ar " + assessment);
                res.redirect(`/${req.version}/tstart/chooseProvider`)
            break;
        }
})

router.get('/*/tstart/npqnotnotnot16' , function (req, res) {
  var assessment = req.query.asoHeadTwo
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/trncheck`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/ASOSelfOne`)
           break;


        default:
            console.log("ar " + assessment);
                res.redirect(`/${req.version}/tstart/chooseProvider`)
            break;
        }
})

router.get('/*/tstart/npqhHeadorNot' , function (req, res) {
  var assessment = req.query.npqhHeadorNot
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqHeadshipTwo`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/chooseProvider`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/chooseProvider`)
            break;
        }
})

router.get('/*/tstart/twoyearsnpqh' , function (req, res) {
  var assessment = req.query.twoyearsnpqh
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/qualifyASO`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             req.session.data['npqhHeadorNot'] = false;
            res.redirect(`/${req.version}/tstart/chooseProvider`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/chooseProvider`)
            break;
        }
})


router.get('/*/tstart/headship13' , function (req, res) {
  var assessment = req.query.head
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqHeadshipTwo`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             req.session.data['npqhHeadorNot'] = false;
            res.redirect(`/${req.version}/tstart/chooseProvider`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/chooseProvider`)
            break;
        }
})

router.get('/*/tstart/aso13' , function (req, res) {
  var assessment = req.query.asoHead
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqASOTwo`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             req.session.data['npqhHeadorNot'] = false;
            res.redirect(`/${req.version}/tstart/ASOno`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/npqASOTwo`)
            break;
        }
})

router.get('/*/tstart/aso15' , function (req, res) {
  var assessment = req.query.asoHead
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/npqASOTwo`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             req.session.data['npqhHeadorNot'] = false;
            res.redirect(`/${req.version}/tstart/ASOSelfOne`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/npqASOTwo`)
            break;
        }
})

router.get('/*/tstart/ASOFundingorNot' , function (req, res) {
  var assessment = req.query.asoGovFunds
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/ASOPay`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             req.session.data['npqhHeadorNot'] = false;
            res.redirect(`/${req.version}/tstart/ASOno`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/npqASOTwo`)
            break;
        }
})

router.get('/*/tstart/ASOPayHow' , function (req, res) {
  var assessment = req.query.asoHowPay
       switch (true) {
          case  (assessment == 'My school or college is covering the cost'):
            res.redirect(`/${req.version}/tstart/chooseProvider`)
           break;

          case  (assessment == 'My trust is paying'):
            res.redirect(`/${req.version}/tstart/chooseProvider`)
           break;

           case  (assessment == 'I am paying'):
            res.redirect(`/${req.version}/tstart/chooseProvider`)
           break;


          case  (assessment == 'My ASO is being paid in another way'):
            res.redirect(`/${req.version}/tstart/chooseProvider`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/error`)
            break;
        }
})

router.get('/*/tstart/ASOPayHow16' , function (req, res) {
  var assessment = req.query.asoHowPay
       switch (true) {
          case  (assessment == 'My school or college is covering the cost'):
            res.redirect(`/${req.version}/tstart/trncheck`)
           break;

          case  (assessment == 'My trust is paying'):
            res.redirect(`/${req.version}/tstart/trncheck`)
           break;

           case  (assessment == 'I am paying'):
            res.redirect(`/${req.version}/tstart/trncheck`)
           break;


          case  (assessment == 'My ASO is being paid in another way'):
            res.redirect(`/${req.version}/tstart/trncheck`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/error`)
            break;
        }
})

router.get('/*/tstart/asoTwo13' , function (req, res) {
  var assessment = req.query.asoHeadTwo
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/qualifyASO`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             req.session.data['npqhHeadorNot'] = false;
            res.redirect(`/${req.version}/tstart/ASOno`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/qualifyASO`)
            break;
        }
})

router.get('/*/tstart/asoTwo15' , function (req, res) {
  var assessment = req.query.asoHeadTwo
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/qualifyASO`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             req.session.data['npqhHeadorNot'] = false;
            res.redirect(`/${req.version}/tstart/ASOSelfOne`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/qualifyASO`)
            break;
        }
})


router.get('/*/tstart/headshipTwo13' , function (req, res) {
  var assessment = req.query.headTwo
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/tstart/qualifyASO`)
           break;

          case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
             req.session.data['npqhHeadorNot'] = false;
            res.redirect(`/${req.version}/tstart/chooseProvider`)
           break;


        default:
                res.redirect(`/${req.version}/tstart/qualifyASO`)
            break;
        }
})


router.get('/*/tstart/schoolCheckerCheck' , function (req, res) {
  var assessment = req.session.data['asoHeadTwo']
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
             res.redirect(`/${req.version}/tstart/chooseProvider`)

           break;

        default:
         
               res.redirect(`/${req.version}/tstart/chooseNPQ`)
            break;
        }
})

router.get('/*/tstart/schoolCheckerCheck16' , function (req, res) {
  var assessment = req.session.data['asoHeader']
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
             res.redirect(`/${req.version}/tstart/chooseProvider`)

           break;

                    case  (assessment == 'No'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
             res.redirect(`/${req.version}/tstart/chooseProvider`)

           break;

        default:
         
               res.redirect(`/${req.version}/tstart/chooseNPQ`)
            break;
        }
})


router.get('/*/tstart/confirmEnding' , function (req, res) {
  var assessment = req.session.data['asoHeadTwo']
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
             res.redirect(`/${req.version}/tstart/ASOfinish`)

           break;

        default:
         
               res.redirect(`/${req.version}/tstart/finish`)
            break;
        }
})


router.get('/*/tstart/confirmEnding13' , function (req, res) {
  var assessment = req.session.data['asoHeadTwo']
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
             res.redirect(`/${req.version}/tstart/confirmDetails`)

           break;

        default:
         
               res.redirect(`/${req.version}/tstart/confirmDetails`)
            break;
        }
})

router.get('/*/tstart/HowPayingorNot' , function (req, res) {
  var assessment = req.session.data['asoHeadTwo']
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
             res.redirect(`/${req.version}/tstart/confirmDetails`)
           break;
        default:
               res.redirect(`/${req.version}/tstart/howPaying`)
            break;
        }
})


router.get('/*/tstart/HowPayingorNot16' , function (req, res) {
  var assessment = req.session.data['asoHeadTwo']
       switch (true) {
          case  (assessment == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
             res.redirect(`/${req.version}/tstart/confirmDetails`)
           break;
        default:
               res.redirect(`/${req.version}/tstart/confirmDetails`)
            break;
        }
})


router.get('/*/payments/ecfOrNPqPayments' , function (req, res) {
  var assessment = req.query.providerName
       switch (true) {
          case  (assessment == 'ECF'):
              req.session.data['ecfOrNot'] = true;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
             res.redirect(`/${req.version}/payments/chooseProvider`)
           break;
        default:
               res.redirect(`/${req.version}/payments/chooseProvider`)
            break;
        }
})

router.get('/*/payments/ecfOrNPQChooser' , function (req, res) {
  var assessment = req.session.data['ecfOrNot']
       switch (true) {
          case  (assessment == true):
          req.session.data['ecfOrNot'] = false;
             // req.session.data['ecfOrNot'] = true;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
             res.redirect(`/${req.version}/payments/ecfBreakdown`)
           break;
        default:
               res.redirect(`/${req.version}/payments/npqList`)
            break;
        }
})

router.get('/*/sandbox/choosy' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
            res.redirect(`/${req.version}/sandbox/npqOne`)
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/sandbox/ecfChoose`)
           break;
                 case  (confirmTraining == 'TRN-nai'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
            res.redirect(`/${req.version}/sandbox/apiOne`)
           break;


        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/pstart/teacher/aboutTRN`)
            break;
        }
})

router.get('/*/sandbox/ecfchoosy' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'TRN-yes'):
             // req.session.data['showApprenticeBox'] = false;
             //  req.session.data['showEPAOConfirm'] = true;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
              res.redirect(`https://ecf-sandbox.london.cloudapps.digital/lead-providers/partnership-guide`)
            
           break;

           case  (confirmTraining == 'TRN-no'):
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
             res.redirect(`/${req.version}/sandbox/ecfOne`)
            
  

        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/pstart/teacher/aboutTRN`)
            break;
        }
})


/////////END OF NPQ ROUTES //////////////////////////////
/////////CPS ROUTES //////////////////////////////

router.get('/*/redaction/routeRedactTaggedMG3' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'Yes'):
             // req.session.data['showApprenticeBox'] = false;
              req.session.data['MG31Redacted'] = true;
              // req.session.data['MG31NotRedacted'] = false;
              // req.session.data['email'] = "jenny@stpaulsschool.ac.uk";
              res.redirect(`tagRedact`)
           break;

           case  (confirmTraining == 'No'):
           req.session.data['MG31Redacted'] = false;
             // req.session.data['showEPAOConfirm'] = false;
             // req.session.data['showApprenticeBox'] = true;
             res.redirect(`tagRedact`)

        default:
            console.log("bork bork bork bork");
                res.redirect(`/${req.version}/pstart/teacher/aboutTRN`)
            break;
        }
})

router.get('/*/redaction/routeRedactTaggedSheLoveMG11' , function (req, res) {
  var confirmTraining = req.query.trn
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['MG11SheMcRedacted'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`tagRedact`)
            
           break;

           case  (confirmTraining == 'No'):
           // req.session.data['MG11SheMcNotRedacted'] = true;
           req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`tagRedact`)
            
        default:
            console.log("bork bork bork bork");
                     req.session.data['MG11SheMcRedacted'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`tagRedact`)
            break;
        }
})


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
              res.redirect(`lossOfPay`)
            
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


router.get('/*/start/lossPayRoute2' , function (req, res) {
  var confirmTraining = req.query.lossPay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['lossPayShow'] = true;
              req.session.data['employmentTypeShow'] = false;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            
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

router.get('/*/start/childcareRoute2' , function (req, res) {
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

router.get('/*/start/petsittingRoute2' , function (req, res) {
  var confirmTraining = req.query.petsitting
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../pet`)
            
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

router.get('/*/start/otherRoute2' , function (req, res) {
  var confirmTraining = req.query.otherexpenses
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['otherShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../receipts`)
            
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


router.get('/*/payyou/paymetypeRoute2' , function (req, res) {
  var confirmTraining = req.query.paymetype
       switch (true) {
          case  (confirmTraining == 'UK bank or building society'):
             // req.session.data['Show'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`ukbank`)
           break;

           case  (confirmTraining == 'Bank outside UK'):
          // req.session.data['other'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`2`)

          case  (confirmTraining == 'Cheque'):
            res.redirect(`3`)
            
        default:
            console.log("bork bork bork bork");
             //   req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`./receipts`)
            break;
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
              res.redirect(`../tasklist`)
   
})



// travel in the tasklist route
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





module.exports = router