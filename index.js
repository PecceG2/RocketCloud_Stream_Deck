var fs = require('fs');
const config = require("./config.json");

const Discord = require("discord.js");
const client = new Discord.Client();



/*
#
#	Discord BOT
#
*/
client.on('ready', () => {
  console.log('[DiscordBOT] Started! Ready for all.');
  console.log("[DiscordBOT] User ID as admin: "+config.ADMIN_USERID);
});


client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
    if(newVoiceState.channel && newVoiceState.member.user.id === config.ADMIN_USERID){ // The member connected to a channel.
		isAdminConnected = true;
		adminConnectedChannel = newVoiceState.channel.id;
		adminConnectedServer = newVoiceState.guild.id;
        console.log(`Admin ${newVoiceState.member.user.username} connected to ${newVoiceState.channel.name}.`);
    }else if(oldVoiceState.channel && newVoiceState.member.user.id === config.ADMIN_USERID) { // The member disconnected from a channel.
		isAdminConnected = false;
		adminConnectedServer = false;
        console.log(`Admin ${oldVoiceState.member.user.username} disconnected from ${oldVoiceState.channel.name}.`)
    };
});


client.login(config.BOT_TOKEN);
let isAdminConnected = false;




/*
#
#	New WebServer (Express + Socket IO)
#
*/
const express = require("express");
const path = require("path");
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

http.listen(config.WEBSERVER_PORT, () => {
  console.log('[WebServer] Started on port '+config.WEBSERVER_PORT);
});

// Socket
io.on('connection', (socket) => {
	console.log('[WebSocket] Socket started.');
	socket.on('disconnect', () => {
		console.log('[WebSocket] Socket closed.');
	});
});


//	Index
app.get("/", (request, response) => {
	response.render("index");
});


//	Executer Icons
app.get("/iconExec", (request, response) => {
	let icon = request.query.icon;
	
	switch(icon){
		case "1":
			stopDiscordMusic("406274427953872899");
		break;
		case "2":
			openSoftware("C:\\Users\\pecce\\AppData\\Local\\Discord\\Update.exe", "--processStart Discord.exe");
		break;
		case "3":
			openSoftware("C:\\Program Files\\NVIDIA Corporation\\NVIDIA RTX Voice\\NVIDIA RTX Voice.exe");
		break;
		case "4":
			openSoftware("C:\\Program Files\\obs-studio\\bin\\64bit\\start_obs.bat");
		break;
		case "9":
			openSoftware("C:\\Users\\pecce\\Desktop\\Mineria\\Claymore's Dual Ethereum AMD+NVIDIA GPU Miner v15.0\\Start HiveON.bat");
		break;
		case "10":
			killProcess("EthDcrMiner64.exe");
		break;
		case "11":
			openSoftware("C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\iHopp.ahk");
		break;
		case "12":
			openSoftware("C:\\Users\\pecce\\Desktop\\Counter-Strike Global Offensive.url");
		break;
	}
	
	response.send("OK");
});


//	Discord stop music
async function stopDiscordMusic(discordChatChannelID){
	if(isAdminConnected){
		const channel = client.channels.cache.find(channel => channel.id === discordChatChannelID);
		console.log(channel.guild.id);
		console.log("AND SERVER ID");
		console.log(adminConnectedServer);
		if(channel.guild.id === adminConnectedServer){
			channel.send("-stop");
			console.log("[DiscordBOT] Music stopped.");
		}
	}
}


//	Open Software on NodeJS Server
async function openSoftware(exeDir, args = ""){
	const { exec } = require("child_process");
	let command = "";
	if(args != ""){
		command = '"'+exeDir+'" '+args;
	}else{
		command = '"'+exeDir+'"';
	}
	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
}


//	Kill process on NodeJS Server
async function killProcess(processName){
	const { exec } = require("child_process");
	exec("TASKKILL -F -IM "+processName, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
}


//	PC Status panel
app.get("/status", (request, response) => {
	response.render("status");
});

app.get("/getInfo", (request, response) => {
	if(typeof pcInformation !== 'undefined') {
		response.send(JSON.stringify(pcInformation));
	}else{
		response.send("unknown");
	}
	
});




/*
#
#	Information async updater cron (less cpu usage)
#
*/
let pcInformation = {"cpu_usage": 0, "cpu_temp": 0, "gpu_usage": 0, "gpu_temp": 0, "ram_usage": 0, "ping": 0};
function intervalFunc() {
	var os 	= require('os-utils');	
	
	pcInformation["ram_usage"] = (os.freememPercentage()-1)*(-1);	// RAM
	os.cpuUsage(function(cpuUsagePercent){							// CPU
		pcInformation["cpu_usage"] = cpuUsagePercent;
	});

	getGPUTemperature().then(function(gpuTemp){
		pcInformation["gpu_temp"] = gpuTemp.replace("\r", "").replace("\n", "");
	});
	
	getGPUUsage().then(function(gpuUsage){
		pcInformation["gpu_usage"] = gpuUsage.replace("\r", "").replace("\n", "").replace(" %", "");
	});

	// Ping
	var ping = require ("net-ping");
	var target = "8.8.8.8";
	// Default options
	var options = {
		networkProtocol: ping.NetworkProtocol.IPv4,
		packetSize: 16,
		retries: 1,
		sessionId: (process.pid % 65535),
		timeout: 2000,
		ttl: 128
	};
	var session = ping.createSession (options);
	session.pingHost(target, function(error, target, sent, rcvd) {
		var ms = rcvd - sent;
		if(error) {
			pcInformation["ping"] = "unknown";
		}else{
			pcInformation["ping"] = ms;
		}
	});

	
	io.emit('updateData', {pcInformation: pcInformation});

}
setInterval(intervalFunc, 2000);

// GPU Information
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const gpuTempeturyCommand = 'nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader';
const gpuUsageCommand = 'nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader';

async function getGPUTemperature() {
  try {
	const result = await execAsync(gpuTempeturyCommand);
	return result.stdout;
  } catch (error) {
	console.log('Error during getting GPU temperature');
	return 'unknown';
  }
}

async function getGPUUsage() {
  try {
	const result = await execAsync(gpuUsageCommand);
	return result.stdout;
  } catch(error) {
	console.log('Error during getting GPU usage');
	return 'unknown';
  }
}