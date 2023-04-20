const loginButton = document.querySelector('.login-btn');
const login = document.querySelector('.login');
const selected = document.querySelector('.selected');
const dropdown = document.querySelectorAll('.dropdown');
const timer = document.querySelector('#timer');
const dialer2 = document.querySelector('.dialer');


const drop = document.querySelector('.end-icon');
const hold = document.querySelector('.pause-icon');
const contin = document.querySelector('.continue-icon');

let callBtn = document.querySelector(".call");
let phoneNumber = document.getElementById("cv6");
let Numberr = document.getElementById("Numberr")
let FromAddress = document.getElementById("FromAddress")
let cpf = document.getElementById("cv2");
let queue = document.getElementById("queue");
let cti = document.getElementById("cv4");
let cnpj = document.getElementById("cv3");
let ticket = document.getElementById("cv8");
let incall = document.querySelector(".incall");
let phoneShow = document.querySelector(".phonenumber");
let callTimer = document.querySelector("#callTimer");


const titlePhoneNumber = document.getElementById("Tcv6");
const titleCpf = document.getElementById("Tcv2");
const titleQueue = document.getElementById("Tqueue");
const titleCti = document.getElementById("Tcv4");
const titleCnpj = document.getElementById("Tcv3");
const titleTicket = document.getElementById("Tcv8");
const titleDialedNumber = document.getElementById("Tdn");
const titleFromAddress = document.getElementById("Tfa");

let u1;
let p1;
let ramal;

let statusStartTime;
let statusCheckInterval;
let lastUserState;
let lastUserReasonCodeId;
selected.setAttribute('title', selected.innerText);
const storedUsername = localStorage.getItem("username");
const storedPassword = localStorage.getItem("password");

if (storedUsername && storedPassword) {
loginUser(storedUsername, storedPassword);
}

// Adicione uma nova função para atualizar o status do usuário e o tempo
function updateStatus(data) {
// Obtenha o tempo de início do status atual
statusStartTime = new Date(data.getElementsByTagName("stateChangeTime")[0].textContent);

const userState = data.getElementsByTagName("state")[0].textContent;
const userReasonCodeIdElement = data.getElementsByTagName("reasonCodeId")[0];
const userReasonCodeId = userReasonCodeIdElement ? userReasonCodeIdElement.textContent : null;

if (userState !== lastUserState || userReasonCodeId !== lastUserReasonCodeId) {
	const menuList = document.querySelector(".menu-list");
	const options = menuList.querySelectorAll("li");
	let selectedIndex = -1;

	
	for (let i = 0; i < options.length; i++) {
	const option = options[i];
	const id = option.getAttribute("data-id");

	if (id === userReasonCodeId) {
		selectedIndex = i;
		option.classList.add("active");
		selected.innerText = option.innerText;
		selected.setAttribute('title', selected.innerText)
	} else {
		option.classList.remove("active");
	}
	}

	if (userState === "READY") {
	const readyItem = menuList.querySelector('[data-id="ready"]');

	if (readyItem) {
		readyItem.classList.add("active");
	}
	selected.innerText = "Ready";
	selected.setAttribute('title', selected.innerText)
	document.querySelector('.status-color').style.backgroundColor = '#5AF07B'; // Definir a cor de fundo para READY
	incall.style.display = "none"; 
	}else if(userState === "TALKING"){
		callData(u1,p1);
		selected.innerText = userState;
		selected.setAttribute('title', selected.innerText)
		incall.style.display = "block";
		document.querySelector('.status-color').style.backgroundColor = '#cea52f';

	}else if(userState === "HOLD"){
		callData(u1,p1);
		selected.innerText = userState;
		selected.setAttribute('title', selected.innerText)
		incall.style.display = "block";
		document.querySelector('.status-color').style.backgroundColor = '#cea52f';

	} else if (userState === "NOT_READY") {
		incall.style.display = "none";
		if(data.getElementsByTagName("label").length > 0){
			selected.innerText = data.getElementsByTagName("label")[0].textContent;
			selected.setAttribute('title', selected.innerText)
		}else{
			selected.innerText = userState;
			selected.setAttribute('title', selected.innerText)
		}

	document.querySelector('.status-color').style.backgroundColor = '#BA0707';

	} else {	
		selected.innerText = userState;
		selected.setAttribute('title', selected.innerText)
		document.querySelector('.status-color').style.backgroundColor = '#cea52f';
	}

	// Reset o tempo de início do status quando o agente trocar de status
	statusStartTime = new Date();

	// Atualize as informações armazenadas
	lastUserState = userState;
	lastUserReasonCodeId = userReasonCodeId;
}
}
// Atualize a exibição do tempo a cada segundo
setInterval(() => {
	if (statusStartTime) {
		// Calcule a duração do status atual
		const duration = Math.floor((new Date() - statusStartTime) / 1000);
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		timer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
		callTimer.textContent = timer.textContent
	} else {
		timer.textContent = '0:00';
	}
}, 1000);

loginButton.addEventListener("click", function() {

});


function setLogin(username, password) {
	let ramal = document.querySelector(".ramal").value;
	$.ajax({
		url: "https://sncfinesse1.totvs.com.br/finesse/api/User/"+username,
		type: "PUT",
		headers: {
			"Authorization": "Basic " + btoa(username + ":" + password),
			"Content-Type": "application/xml"
		},
		data: `<User>
		<state>LOGIN</state>
		<extension>${ramal}</extension>
		</User>`,
		success: function() {
			console.log("Login succ");
		},
		error: function(xhr, status, error) {
			console.log("Falha login");
			console.log(ramal);
			console.log(xhr.status);
			console.log(xhr.getResponseHeader("Content-Type"));
		}
	});

}

function loginUser(username, password) {
	$.get({
		url: "https://sncfinesse1.totvs.com.br/finesse/api/User/" + username,
		headers: {
			"Authorization": "Basic " + btoa(username + ":" + password),
		},
		success: function(data) {
			let userState = data.getElementsByTagName("state")[0].textContent;
			u1 = username;
			p1 = password;
			ramal = $(data).find('extension').text();
			if (userState === "LOGOUT") {
				setLogin(username, password);		
			}
			;
			updateStatus(data);

			console.log("Request sucess.");
			login.classList.toggle("close");

			localStorage.setItem("username", username);
			localStorage.setItem("password", password);
			

			callBtn.addEventListener('click', function(){
				let dialNumber = document.getElementById("display").value;
				$.post({
					url: "https://sncfinesse1.totvs.com.br/finesse/api/User/" + username + "/Dialogs",
					headers: {     
						"Authorization": "Basic " + btoa(username + ":" + password),
					},
					dataType: "xml",
					contentType:"application/xml",
					data: `<Dialog>
					<requestedAction>MAKE_CALL</requestedAction>
					<fromAddress>${ramal}</fromAddress>
					<toAddress>${dialNumber}</toAddress>
				</Dialog>`,

					success: function(){
						console.log("Chamada realizada com sucesso.");
					},
					error: function(xhr, status, error){
						console.log("Falha ao encerrar a chamada.");
						console.log(xhr.status);
						console.log(xhr.getResponseHeader("Content-Type"));
					}
				})
			});

			

			statusCheckInterval = setInterval(() => {
				$.get({
					url: "https://sncfinesse1.totvs.com.br/finesse/api/User/" + username,
					headers: {
						"Authorization": "Basic " + btoa(username + ":" + password),
					},
					success: function(data) {
						updateStatus(data);
					},
					error: function(xhr, status, error) {
						console.log("Status Check failed.");
						console.log(xhr.status);	
						console.log(xhr.getResponseHeader("Content-Type"));
					},
					complete: function() {
						console.log("STATUS CHECK DONE");
					},
				});
			}, 1000);
			$.get({
				url: "https://sncfinesse1.totvs.com.br/finesse/api/User/" + username + "/ReasonCodes?category=NOT_READY",
				headers: {
					"Authorization": "Basic " + btoa(username + ":" + password),
				},
				success: function(data) {
					const menuList = document.querySelector(".menu-list");
					menuList.innerHTML = "";

					// Adicionar item "Ready" no início da lista
					const readyItem = document.createElement("li");
					readyItem.textContent = "Ready";
					readyItem.setAttribute("data-id", "ready");
					menuList.appendChild(readyItem);

					const reasonCodes = data.getElementsByTagName("ReasonCode");
					let selectedIndex = -1;

					for (let i = 0; i < reasonCodes.length; i++) {
						const reasonCode = reasonCodes[i];
						const id = reasonCode.getElementsByTagName("id")[0].textContent;
						const label = reasonCode.getElementsByTagName("label")[0].textContent;
						const listItem = document.createElement("li");
						listItem.textContent = label;
						listItem.setAttribute("data-id", id);
						menuList.appendChild(listItem);

						if (id === lastUserReasonCodeId) {
							selectedIndex = i;
							listItem.classList.add("active");
							selected.innerText = label;
						}
					}

					if (lastUserState === "READY") {
						readyItem.classList.add("active");
						selected.innerText = "Ready";
					}

					// Event listeners  
					const options = menuList.querySelectorAll("li");

					dropdown.forEach(dropdown => {
						const select = dropdown.querySelector('.select');
						const caret = dropdown.querySelector('.caret');
						const menu = dropdown.querySelector('.menu');
						const options = dropdown.querySelectorAll('.menu li');

						select.addEventListener('click', () => {
							select.classList.toggle('select-clicked');
							caret.classList.toggle('caret-rotate');
							menu.classList.toggle('menu-open');
							dialer2.classList.remove('opener');
						});

						options.forEach(option => {
							option.addEventListener('click', () => {
								statusStartTime = new Date();

								selected.innerText = option.innerText;
								const optionId = option.getAttribute("data-id");

								select.classList.remove('select-clicked');
								caret.classList.remove('caret-rotate');
								menu.classList.remove('menu-open');
								options.forEach(option => {
									option.classList.remove('active');
								});
								option.classList.add('active');

								if (optionId === "ready") {
									$.ajax({
										url: "https://sncfinesse1.totvs.com.br/finesse/api/User/" + username,
										type: "PUT",
										headers: {
											"Authorization": "Basic " + btoa(username + ":" + password),
											"Content-Type": "application/xml"
										},
										data: `<User><state>READY</state></User>`,
										success: function() {
											console.log("Status changed to READY");
										},
										error: function(xhr, status, error) {
											console.log("Failed to change status to READY");
											console.log(xhr.status);
											console.log(xhr.getResponseHeader("Content-Type"));
										}
									});
								} else {
									$.ajax({
										url: "https://sncfinesse1.totvs.com.br/finesse/api/User/" + username,
										type: "PUT",
										headers: {
											"Authorization": "Basic " + btoa(username + ":" + password),
											"Content-Type": "application/xml"
										},
										data: `<User><state>NOT_READY</state><reasonCodeId>${optionId}</reasonCodeId></User>`,
										success: function() {
											console.log(`Status changed to NOT_READY with reasonCodeId: ${optionId}`);
										},
										error: function(xhr, status, error) {
											console.log(`Failed to change status to NOT_READY with reasonCodeId: ${optionId}`);
											console.log(xhr.status);
											console.log(xhr.getResponseHeader("Content-Type"));
										}
									});
								}
							});
						});
					});

				},
				error: function(xhr, status, error) {
					console.log("Status Request failed.");
					console.log(xhr.status);
					console.log(xhr.getResponseHeader("Content-Type"));
				},
				complete: function() {
					console.log("STATUS DONE");
				},
			});
		},
		error: function(xhr, status, error) {
			console.log("Request failed.");
			console.log(xhr.status);
			console.log(xhr.getResponseHeader("Content-Type"));
			$
		},
		complete: function() {
			console.log("DONE");
		},
	});
}
// Adicione o evento "click" do loginButton
loginButton.addEventListener("click", function () {
let username = document.querySelector(".user").value;
let password = document.querySelector(".password").value;

loginUser(username, password);
});

function callData(username,password) {
	$.get({
	url: "https://sncfinesse1.totvs.com.br/finesse/api/User/" + username + "/Dialogs",
	headers: {
		"Authorization": "Basic " + btoa(username + ":" + password),
	},
	success: function (data) {
	
	const callVariable2Value = $(data).find("CallVariable").filter(function() {
	return $(this).find("name").text() === "callVariable2";
	}).find("value").text();
	const callVariable3Value = $(data).find("CallVariable").filter(function() {
		return $(this).find("name").text() === "callVariable3";
		}).find("value").text();
		const callVariable4Value = $(data).find("CallVariable").filter(function() {
		return $(this).find("name").text() === "callVariable4";
		}).find("value").text();
		const callVariable8Value = $(data).find("CallVariable").filter(function() {
		return $(this).find("name").text() === "callVariable8";
		}).find("value").text();
		const callVariable6Value = $(data).find("CallVariable").filter(function() {
		return $(this).find("name").text() === "callVariable6";
		}).find("value").text();
		const queueValue = $(data).find('queueName').text();
		const callId = $(data).find('uri').text();
		const dialedNumber = $(data).find('dialedNumber').text();
		const fromAddress = $(data).find('fromAddress').text();

		checkAndHideIfEmpty(callVariable6Value, phoneNumber, titlePhoneNumber);
		checkAndHideIfEmpty(callVariable2Value, cpf, titleCpf);
		checkAndHideIfEmpty(callVariable3Value, cnpj, titleCnpj);
		checkAndHideIfEmpty(callVariable4Value, cti, titleCti);
		checkAndHideIfEmpty(callVariable8Value, ticket, titleTicket);
		checkAndHideIfEmpty(queueValue, queue, titleQueue);
		checkAndHideIfEmpty(dialedNumber, Numberr, titleDialedNumber);
		checkAndHideIfEmpty(fromAddress, FromAddress, titleFromAddress);

		phoneNumber.textContent = callVariable6Value;		
		phoneShow.textContent = callVariable6Value;	
		cpf.textContent = callVariable2Value;
		cnpj.textContent = callVariable3Value;
		cti.textContent = callVariable4Value;
		ticket.textContent = callVariable8Value;
		queue.textContent = queueValue;
		Numberr.textContent = dialedNumber;
		FromAddress.textContent = fromAddress;

		drop.addEventListener('click', function (){
			$.ajax({
				url: "https://sncfinesse1.totvs.com.br" + callId,
				type: "PUT",
				headers: {
					"Authorization": "Basic " + btoa(username + ":" + password),
					"Content-Type": "application/xml"
				},
				data: `<Dialog>
				<targetMediaAddress>${ramal}</targetMediaAddress>
				<requestedAction>DROP</requestedAction>
				</Dialog>`,
				success: function() {
					console.log("Chamada encerrada com sucesso.");
				},
				error: function(xhr, status, error) {
					console.log("Falha ao encerrar a chamada.");
					console.log(xhr.status);
					console.log(xhr.getResponseHeader("Content-Type"));
				}
			});
		});

		hold.addEventListener('click', function (){
			$.ajax({
				url: "https://sncfinesse1.totvs.com.br" + callId,
				type: "PUT",
				headers: {
					"Authorization": "Basic " + btoa(username + ":" + password),
					"Content-Type": "application/xml"
				},
				data: `<Dialog>
				<targetMediaAddress>${ramal}</targetMediaAddress>
				<requestedAction>HOLD</requestedAction>
				</Dialog>`,
				success: function() {
					console.log("Chamada colocada em espera.");
				},
				error: function(xhr, status, error) {
					console.log("Falha ao colocar a chamada em espera.");
					console.log(xhr.status);
					console.log(xhr.getResponseHeader("Content-Type"));
				}
			});
		});

		hold.addEventListener('click', function (){
			$.ajax({
				url: "https://sncfinesse1.totvs.com.br" + callId,
				type: "PUT",
				headers: {
					"Authorization": "Basic " + btoa(username + ":" + password),
					"Content-Type": "application/xml"
				},
				data: `<Dialog>
				<targetMediaAddress>${ramal}</targetMediaAddress>
				<requestedAction>HOLD</requestedAction>
				</Dialog>`,
				success: function() {
					console.log("Chamada colocada em espera.");
				},
				error: function(xhr, status, error) {
					console.log("Falha ao colocar a chamada em espera.");
					console.log(xhr.status);
					console.log(xhr.getResponseHeader("Content-Type"));
				}
			});
		});

		contin.addEventListener('click', function (){
			$.ajax({
				url: "https://sncfinesse1.totvs.com.br" + callId,
				type: "PUT",
				headers: {
					"Authorization": "Basic " + btoa(username + ":" + password),
					"Content-Type": "application/xml"
				},
				data: `<Dialog>
				<targetMediaAddress>${ramal}</targetMediaAddress>
				<requestedAction>RETRIEVE</requestedAction>
				</Dialog>`,
				success: function() {
					console.log("Chamada colocada em espera.");
				},
				error: function(xhr, status, error) {
					console.log("Falha em continuar a chamada");
					console.log(xhr.status);
					console.log(xhr.getResponseHeader("Content-Type"));
				}
			});
		});
		
	},
	error: function (xhr, status, error) {
		console.log("Failed to get call data.");
		console.log(xhr.status);
		console.log(xhr.getResponseHeader("Content-Type"));
		
	},
	});
}

function checkAndHideIfEmpty(value, contentElement, titleElement) {
	if (value === "") {
		contentElement.style.display = "none";
		titleElement.style.display = "none";
	} else {
		contentElement.style.display = "";
		titleElement.style.display = "";
	}
}

