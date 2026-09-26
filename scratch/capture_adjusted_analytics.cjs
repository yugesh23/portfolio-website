const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\Asus\\.gemini\\antigravity\\brain\\af6b150b-dd17-4b33-bc84-04fc9f25e61c';

async function capture(url, width, height, isMobile, outFilename) {
  console.log(`Starting capture: ${outFilename}`);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\Asus\\.gemini\\antigravity\\scratch\\chrome-cdp-profile-analytics',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  try {
    const listRes = await fetch('http://127.0.0.1:9232/json');
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
      width,
      height,
      deviceScaleFactor: 1,
      mobile: isMobile
    });

    send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 3000));

    await new Promise((resolve) => {
      ws.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data);
        if (msg.result && msg.result.data) {
          const outPath = path.join(artifactDir, outFilename);
          fs.writeFileSync(outPath, Buffer.from(msg.result.data, 'base64'));
          console.log(`Saved screenshot: ${outFilename}`);
          ws.close();
          chrome.kill();
          resolve();
        }
      });
      send('Page.captureScreenshot', { format: 'png' });
    });
  } catch (e) {
    console.error(e);
    try { chrome.kill(); } catch (err) {}
  }
}

async function main() {
  await capture('http://localhost:5173/?preview_section=analytics', 1440, 900, false, 'snap_adjusted_analytics_desktop.png');
  await capture('http://localhost:5173/?preview_section=analytics', 390, 844, true, 'snap_adjusted_analytics_mobile.png');
  console.log('ALL ANALYTICS CAPTURES COMPLETED!');
  process.exit(0);
}

main();
