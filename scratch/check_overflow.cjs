const { spawn } = require('child_process');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--window-size=390,844',
  'http://localhost:5173/?no_loader=1'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2500));
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('5173')) || tabs[0];
    const wsUrl = tab.webSocketDebuggerUrl;
    
    const ws = new WebSocket(wsUrl);
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: `
            (() => {
              const offenders = [];
              const w = window.innerWidth;
              document.querySelectorAll('*').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.right > w + 1) {
                  offenders.push({
                    tag: el.tagName,
                    id: el.id,
                    className: (typeof el.className === 'string' ? el.className : '').slice(0, 80),
                    right: Math.round(rect.right),
                    width: Math.round(rect.width)
                  });
                }
              });
              return {
                windowInnerWidth: window.innerWidth,
                bodyClientWidth: document.body.clientWidth,
                scrollWidth: document.documentElement.scrollWidth,
                offenders: offenders.slice(0, 15)
              };
            })()
          `,
          returnByValue: true
        }
      }));
    });

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === 1) {
        console.log('=== OVERFLOW RESULT ===');
        console.log(JSON.stringify(msg.result.result.value, null, 2));
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
