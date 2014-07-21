var spawn = require('child_process').spawn

function startNpm2es() { 
  var npm2es = spawn(process.execPath, ['./npm2es/bin/npm2es.js',  '--couch=http://localhost:15984/registry', '--es=http://127.0.0.1:9200/npm'])
  npm2es.on('error', function(e){
    console.log('npm2es errored: ' + e) 
  }) 
  npm2es.on('exit', function(code, sig){
    if(code === 0){
      console.log('process exited normally')
      start-g2e()  
    }
    else console.log(sig)
  })
  npm2es.stderr.on('data', function(data){
    console.log('stderr: ' + data)  
  })
  npm2es.stdout.on('data', function(data){ 
    console.log('stdout: ' + data)
  })   
} 

startNpm2es() 

