/* ***************************************** */
/* Dynamically sorted if clauses             */
/* ***************************************** */

const fs = require('fs')
var data;
var data = fs.readFileSync('input.txt', 'utf8')

var input = data.split( /[ \r\n]/);

/* In theory the functions A to F and their conditionals can be quite complex */
function A( p ) { }
var [B,C,D,E,F] = [A,A,A,A,A];  
var funcArray = [
    { 'condition': /^A/,  'func':A, 'stat':0  },
    { 'condition': /^B/,  'func':B, 'stat':0  },
    { 'condition': /^C/,  'func':C, 'stat':0  },
    { 'condition': /^D/i, 'func':D, 'stat':0  },
    { 'condition': /^E/i, 'func':E, 'stat':0  },
    { 'condition': /^F/,  'func':F, 'stat':0  },
];

function processInput( headerTxt, input, funcArray ) {
    console.log( headerTxt );
    var tme = Date.now();
    for ( var i in input ) {
        var itm = input[i];
        if ( itm == '/*') cont = true;
        if ( itm == '*/') { cont = false; continue };
        if ( cont || itm == '' ) continue;
        var j=0;
        for ( j =0; j < funcArray.length; j++ ) {
            var fa = funcArray[j];
            for ( delay = 0; delay< 10000; delay++ ) { /* Delay loop for demonstration purpose */ }
            if ( itm.match( fa['condition'] ) ) {
                fa['stat']++;
                fa['func'](itm);
                break;
            }
        }
        if ( j == funcArray.length ) console.log( '==>No match for "' + itm + '" at position: ' + i );
    }
    console.log('Time elapsed:' + ( Date.now() - tme ) );
    console.log( 'The funcArray after processing' );
    console.log( funcArray );
    console.log(  );

}
var tme;
tme = processInput( 'Array of conditions. Unsorted conditions.',  input, funcArray );

funcArray.sort( (a,b) => b.stat - a.stat ); /* most called functions come first */
tme = processInput( 'Array of conditions. Conditions sorted for maximum speed.', input, funcArray );

funcArray.sort( (a,b) => a.stat - b.stat ); /* most called functions come last */
tme = processInput( 'Array of conditions. Conditions sorted for minimum speed.', input, funcArray );

