#!/usr/bin/env node

const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎵 Spotify Token Generator\n');

rl.question('Enter your Spotify Client ID: ', (clientId) => {
  rl.question('Enter your Spotify Client Secret: ', (clientSecret) => {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    console.log('\n📋 Follow these steps:\n');
    console.log('1. Go to your Spotify app settings and add this redirect URI:');
    console.log('   http://localhost:3000/api/auth/callback\n');
    
    console.log('2. Visit this URL in your browser (replace YOUR_CLIENT_ID with your actual client ID):');
    console.log(`   https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/api/auth/callback&scope=user-read-currently-playing\n`);
    
    console.log('3. Copy the "code" parameter from the redirect URL\n');
    
    rl.question('4. Paste the code here: ', (code) => {
      console.log('\n5. Run this curl command to get your refresh token:\n');
      console.log(`curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic ${basic}" -d "grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/api/auth/callback" https://accounts.spotify.com/api/token\n`);
      
      console.log('6. Copy the "refresh_token" from the response and add it to your .env.local file\n');
      
      rl.close();
    });
  });
}); 