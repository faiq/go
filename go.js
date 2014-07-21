var spawn = require('child_process').spawn

function startNpm2es(){
  var npm2es = spawn(process.execPath,['./npm2es/bin/npm2es.js','--couch=http://localhost:15984/registry', '--es=http://127.0.0.1:9200/npm'])

  npm2es.on('error', function(e){
    console.log('npm2es errored with '+ e);
  }) 
  npm2es.on('exit', function (code, signal){ 
    if (code === 0){ 
      console.log(code, signal)
      console.log('npm2es exited normally, starting github2es now')
      startG2ES()
    } 
    if (signal) { console.log('npm2es killed by parent') }  
  })
  npm2es.stdout.on('data', function(data){
    console.log(data) 
  })
  npm2es.stderr.on('data', function(data){
    console.log('stderr: ' + data); 
  })  
}

function startG2ES (){ 
  var github2es = spawn(process.execPath, './github2es/bin/github2es.js', ['-e=http://127.0.0.1:9200/npm','-a=03259061f0f5d7190e00e4d45e5b997014c3be2c'])
  github2es.on('error', function(e){ 
    console.log(e)
    return 
  })
  github2es.on('close', function(code, signal){ 
    console.log(code); 
  })  
} 

startNpm2es(); 
