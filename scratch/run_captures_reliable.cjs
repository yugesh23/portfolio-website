const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\Asus\\.gemini\\antigravity\\brain\\af6b150b-dd17-4b33-bc84-04fc9f25e61c';

async function captureUrl(url, width, height, isMobile, outFilename) {
  console.log(`Starting capture: ${outFilename} -> ${url}`);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9229',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\Asus\\.gemini\\antigravity\\scratch\\chrome-cdp-profile-2',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  try {
    const listRes = await fetch('http://127.0.0.1:9229/json');
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

    let id = 1;
    function send(method, params = {}) {
      const curId = id++;
      ws.send(JSON.stringify({ id: curId, method, params }));
      return curId;
    }

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        ws.close();
        chrome.kill();
        reject(new Error('Timeout capturing ' + outFilename));
      }, 12000);

      ws.addEventListener('open', () => {
        send('Page.enable');
        send('Emulation.setDeviceMetricsOverride', {
          width,
          height,
          deviceScaleFactor: 1,
          mobile: isMobile
        });
        send('Page.navigate', { url });
      });

      ws.addEventListener('message', async (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Page.loadEventFired') {
          await new Promise(r => setTimeout(r, 2000));
          send('Page.captureScreenshot', { format: 'png' });
        }
        if (msg.result && msg.result.data) {
          clearTimeout(timeout);
          const outPath = path.join(artifactDir, outFilename);
          fs.writeFileSync(outPath, Buffer.from(msg.result.data, 'base64'));
          console.log(`Saved screenshot: ${outFilename}`);
          ws.close();
          chrome.kill();
          resolve();
        }
      });
    });
  } catch (e) {
    console.error(e);
    try { chrome.kill(); } catch (err) {}
  }
}

async function main() {
  await captureUrl('http://localhost:5173/?no_loader=1', 1440, 900, false, 'snap_final_hero_desktop.png');
  await captureUrl('http://localhost:5173/?preview_section=what-i-do', 1440, 900, false, 'snap_final_what_i_do_clean.png');
  await captureUrl('http://localhost:5173/?preview_section=analytics', 1440, 900, false, 'snap_final_analytics_clean.png');
  await captureUrl('http://localhost:5173/?preview_section=simulator', 1440, 900, false, 'snap_final_simulator_clean.png');
  console.log('ALL SECTION CAPTURES COMPLETED!');
  process.exit(0);
}

main();
