const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const MARKER = fs.existsSync('./marker.txt') ? fs.readFileSync('./marker.txt', 'utf8').trim() : 'none';

console.log(JSON.stringify({
  event: 'BOOT',
  marker: MARKER,
  testStagedVar: process.env.TEST_STAGED_VAR || null,
  gitCommit: process.env.RAILWAY_GIT_COMMIT_SHA || null,
  deployId: process.env.RAILWAY_DEPLOYMENT_ID || null,
  ts: new Date().toISOString()
}));

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    marker: MARKER,
    testStagedVar: process.env.TEST_STAGED_VAR || null,
    gitCommit: process.env.RAILWAY_GIT_COMMIT_SHA || null,
    deployId: process.env.RAILWAY_DEPLOYMENT_ID || null
  }));
}).listen(PORT);
