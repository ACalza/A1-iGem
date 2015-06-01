var express = require('express');
var port = process.argv[2];
var app = express();
var morgan = require('morgan');
var colors = require('colors');
var bodyParser = require('body-parser');

var cp = require('child_process');
var mongoose = require('mongoose');


// or use mongolab      
var url = 'mongodb://albert:ass@ds041432.mongolab.com:41432/heroku_app37313258';
//var url = 'mongodb://localhost/dna'
mongoose.connect(url);
var DNASchema = mongoose.Schema({
    'DNA': String,
	'RNA': String
}); 
var DNASeq = mongoose.model('dna', DNASchema);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.get('/', function(req, res) {
	//res.send();
	//});
app.get('/dnas', function(req, res) {
    DNASeq.find(function(err, dnas) {
        if (err) console.error(err);

        res.send(dnas);
    });
});
app.post('/genAA', function(req, res) {
    var dna = req.body.dna;
    var results = {
        output: null,
        errorlog: null,
        exitcode: null
    };

    var genDNAScript = cp.spawn('python3', ['DNA.py', dna]);

    // get stdout
    genDNAScript.stdout.on('data', function(stdout) {
        results.output = stdout.toString();
    });

    // get stderr
    genDNAScript.stderr.on('data', function(stderr) {
        results.errorlog = stderr.toString();
    });

    // script finished
    genDNAScript.on('close', function(code) {
        results.exitcode = code;
		if (code === 0) {
   		 	// success, store sequence in DB
   			var seq = new DNASeq({
      		 	DNA: dna,
       	 	  	RNA: results.output
   	 	   });
			
    	   seq.save(function(err, sequence) {
        	   if (err) 
				   console.error(err);
			   console.log('saved sequence');
    		});
		}

        // Respond on process close
        // otherwise, async problems!
		console.log(results);
        res.send(results);
    }); 
	  
})

app.use(morgan(
    ':method '.magenta + 
    ':url '.green + 
    ':status '.blue +
    ':res[content-length] '.italic.grey + 'bits '.italic.grey 
    + 'sent in ' + ':response-time ms'.grey
));
app.use(express.static('view-controller'));
console.log('Serving content from ' + 'view-controller'.blue);

app.use(morgan('tiny'));

app.listen(port);
console.log('Express server listening on port ' + port);