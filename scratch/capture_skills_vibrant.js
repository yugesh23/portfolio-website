const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Asus\\.gemini\\antigravity\\brain\\af6b150b-dd17-4b33-bc84-04fc9f25e61c';

async function capture(url, targetSection, outFilename) {
  console.log(`Starting capture for ${outFilename}...`);
  const port = 9226;
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--remote-allow-origins=*',
    '--user-data-dir=C:\\Users\\Asus\\.gemini\\antigravity\\scratch\\chrome-test-profile-skills',
    '--window-size=1440,900',
    '--no-sandbox',
    '--disable-gpu',
    url,
  ]);

  let targetWs = null;
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const data = await res.json();
      if (data && data.length > 0 && data[0].webSocketDebuggerUrl) {
        targetWs = data[0].webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!targetWs) {
    chrome.kill();
    throw new Error('Could not find debugging target');
  }

  const ws = new WebSocket(targetWs);
  let id = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const curId = id++;
      pending.set(curId, { resolve, reject });
      ws.send(JSON.stringify({ id: curId, method, params }));
    });

  await new Promise((r) => (ws.onopen = r));
  await send('Page.enable');
  await send('Runtime.enable');

  await new Promise((r) => setTimeout(r, 2200));

  if (targetSection) {
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('${targetSection}');
        if (el) el.scrollIntoView({ behavior: 'instant' });
      `,
      awaitPromise: true,
    });
    await new Promise((r) => setTimeout(r, 1400));
  }

  const res = await send('Page.captureScreenshot', { format: 'png' });
  const buffer = Buffer.from(res.data, 'base64');
  const outPath = path.join(artifactDir, outFilename);
  fs.writeFileSync(outPath, buffer);
  console.log(`Saved screenshot to ${outPath}`);

  ws.close();
  chrome.kill();
}

async function run() {
  await capture('http://localhost:5173/?no_loader=1', 'skills', 'snap_skills_2d_vibrant.png');
  await capture('http://localhost:5173/?no_loader=1&mode=3d', 'skills', 'snap_skills_3d_vibrant.png');
  console.log('Skills captures completed successfully!');
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
