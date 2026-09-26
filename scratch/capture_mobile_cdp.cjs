const { spawn } = require('child_process');
const fs = require('fs');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  'about:blank'
]);

async function run() {
  await new Promise(r => setTimeout(r, 1500));
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

    let id = 1;
    function send(method, params = {}) {
      const curId = id++;
      ws.send(JSON.stringify({ id: curId, method, params }));
      return curId;
    }

    ws.addEventListener('open', () => {
      send('Page.enable');
      send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 1,
        mobile: true
      });
      send('Page.navigate', { url: 'http://localhost:5173/?no_loader=1' });
    });

    ws.addEventListener('message', async (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Page.loadEventFired') {
        await new Promise(r => setTimeout(r, 2000));
        send('Page.captureScreenshot', { format: 'png' });
      }
      if (msg.result && msg.result.data) {
        fs.writeFileSync(
          'C:/Users/Asus/.gemini/antigravity/brain/af6b150b-dd17-4b33-bc84-04fc9f25e61c/snap_mobile_cdp_hero.png',
          Buffer.from(msg.result.data, 'base64')
        );
        console.log('Mobile screenshot saved successfully!');
        ws.close();
        chrome.kill();
        process.exit(0);
      }
    });
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}

run();
