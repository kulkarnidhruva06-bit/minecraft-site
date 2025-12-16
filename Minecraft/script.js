const SERVER_IP = "play.cubecraft.net"; // change to your mc.gg later


ctx.stroke();
}


async function checkStatus() {
statusEl.textContent = "Pinging server...";
playerListEl.innerHTML = "";


try {
const res = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
const data = await res.json();


if (!data.online) {
statusEl.textContent = "🔴 Server OFFLINE";
return;
}


statusEl.textContent = "🟢 Server ONLINE (Java)";
playersEl.textContent = `Players: ${data.players.online}/${data.players.max}`;
versionEl.textContent = `Version: ${data.version}`;
motdEl.textContent = `MOTD: ${data.motd.clean.join(" ")}`;


history.push(data.players.online);
if (history.length > 20) history.shift();
drawGraph();


if (data.players.list) {
data.players.list.forEach(p => {
const li = document.createElement("li");
li.innerHTML = `<img src="https://mc-heads.net/avatar/${p}/20" style="vertical-align:middle; margin-right:6px;">${p}`;
playerListEl.appendChild(li);
});
}


} catch {
statusEl.textContent = "⚠️ Error contacting server";
}
}


copyBtn.onclick = () => navigator.clipboard.writeText(ipText);
refreshBtn.onclick = checkStatus;


setInterval(() => {
uptimeEl.textContent = `Uptime: ${formatUptime(Date.now() - startTime)}`;
}, 1000);


setInterval(checkStatus, REFRESH_INTERVAL);
checkStatus();