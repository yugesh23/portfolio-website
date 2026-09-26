const { spawn } = require('child_process');
const fs = require('fs');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--disable-gpu',
  'about:blank'
]);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  await sleep(1500);
  try {
    const listRes = await fetch('http://127.0.0.1:9223/json');
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        callbacks.set(curId, resolve);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        cb(msg.result);
      }
    });

    await new Promise((resolve) => ws.addEventListener('open', resolve));

    await send('Page.enable');
    await send('Runtime.enable');

    // 1. Desktop Viewport
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Navigating to desktop page...');
    await send('Page.navigate', { url: 'http://localhost:5173/?no_loader=1' });
    await sleep(3500);

    // Capture Desktop Hero & Nav
    let res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'C:/Users/Asus/.gemini/antigravity/brain/af6b150b-dd17-4b33-bc84-04fc9f25e61c/snap_desktop_hero_clean.png',
      Buffer.from(res.data, 'base64')
    );
    console.log('Desktop hero saved.');

    // Scroll to What I Do
    await send('Runtime.evaluate', {
      expression: 'document.getElementById("what-i-do")?.scrollIntoView({ behavior: "instant", block: "start" })'
    });
    await sleep(1000);
    res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'C:/Users/Asus/.gemini/antigravity/brain/af6b150b-dd17-4b33-bc84-04fc9f25e61c/snap_desktop_whatido_clean.png',
      Buffer.from(res.data, 'base64')
    );
    console.log('Desktop What I Do saved.');

    // Scroll to Analytics
    await send('Runtime.evaluate', {
      expression: 'document.getElementById("analytics-showcase")?.scrollIntoView({ behavior: "instant", block: "start" })'
    });
    await sleep(1000);
    res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'C:/Users/Asus/.gemini/antigravity/brain/af6b150b-dd17-4b33-bc84-04fc9f25e61c/snap_desktop_analytics_clean.png',
      Buffer.from(res.data, 'base64')
    );
    console.log('Desktop Analytics saved.');

    // 2. Mobile Viewport (iPhone 14 / 390x844)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true
    });
    await send('Runtime.evaluate', {
      expression: 'window.scrollTo(0, 0)'
    });
    await sleep(1500);

    res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'C:/Users/Asus/.gemini/antigravity/brain/af6b150b-dd17-4b33-bc84-04fc9f25e61c/snap_mobile_hero_clean.png',
      Buffer.from(res.data, 'base64')
    );
    console.log('Mobile hero saved.');

    ws.close();
    chrome.kill();
    process.exit(0);
  } catch (err) {
    console.error('Error during capture:', err);
    chrome.kill();
    process.exit(1);
  }
}

run();
