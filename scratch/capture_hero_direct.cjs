const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\Asus\\.gemini\\antigravity\\brain\\af6b150b-dd17-4b33-bc84-04fc9f25e61c';

async function run() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9230',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\Asus\\.gemini\\antigravity\\scratch\\chrome-cdp-profile-hero',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  try {
    const listRes = await fetch('http://127.0.0.1:9230/json');
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

    let id = 1;
    function send(method, params = {}) {
      const curId = id++;
      ws.send(JSON.stringify({ id: curId, method, params }));
      return curId;
    }

    await new Promise((resolve) => ws.addEventListener('open', resolve));
    send('Page.enable');
    send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    send('Page.navigate', { url: 'http://localhost:5173/?no_loader=1' });
    await new Promise(r => setTimeout(r, 3500));

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.result && msg.result.data) {
        const outPath = path.join(artifactDir, 'snap_final_desktop_hero_clean.png');
        fs.writeFileSync(outPath, Buffer.from(msg.result.data, 'base64'));
        console.log('Saved snap_final_desktop_hero_clean.png');
        ws.close();
        chrome.kill();
        process.exit(0);
      }
    });

    send('Page.captureScreenshot', { format: 'png' });
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}

run();
