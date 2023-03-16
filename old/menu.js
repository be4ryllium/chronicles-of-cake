function dims() {
	let w = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;
	let h = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

	return [ w, h ];
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function animate(thing, time, top, tleft) {
	let starttime = performance.now();

	let stop = parseInt(thing.style.top, 10);
	let stleft = parseInt(thing.style.left, 10);

	function animframe() {
		let pn = performance.now();
		let frame = pn - starttime;

		if (top != "same") {
			if (stop - top < 0)
				thing.style.top = Math.sin(Math.PI / 2 * (frame / time)) *  (Math.abs(top) + Math.abs(stop)) + stop + "px";
			else
				thing.style.top = Math.sin(Math.PI / 2 * (frame / time)) * -(Math.abs(top) + Math.abs(stop)) + stop + "px";
		}
		if (tleft != "same") {
			if (stop - top < 0)
				thing.style.left = Math.sin(Math.PI / 2 * (frame / time)) * (Math.abs(tleft) + Math.abs(stleft)) + stleft + "px";
			else
				thing.style.left = Math.sin(Math.PI / 2 * (frame / time)) * -(Math.abs(tleft) + Math.abs(stleft)) + stleft + "px";
		}

		if (frame < time) window.requestAnimationFrame(animframe);
	}
	window.requestAnimationFrame(animframe);

	if (tleft != "same")
		thing.style.left = tleft + "px";
	if (top != "same")
		thing.style.top = top + "px";
}

let menu = document.createElement("div");
menu.id = "menu";
document.body.appendChild(menu);

var overflowenabled = false;
var overflowing = false;

let overflowmenu = document.createElement("div");
overflowmenu.id = "overflow";
overflowmenu.style.display = "none";
document.body.appendChild(overflowmenu);

let overflowi = document.createElement("div");
overflowi.id = "overflowi";

overflowi.onclick = function () {
	if (!overflowenabled) {
		overflowenabled = true;
		animate(overflowmenu, 100, 106, "same");
		overflowmenu.style.top = "106px";
	} else {
		animate(overflowmenu, 100, 100 - parseInt(overflowmenu.style.height, 10), "same");
		overflowmenu.style.top = 100 - parseInt(overflowmenu.style.height, 10) + "px";
		overflowenabled = false;
	}
};

menu.appendChild(overflowi);
let overflowimg = document.createElement("img");
overflowimg.src = "sprites/menu/arrow.png";
overflowimg.width = "90";
overflowimg.height = "90";
overflowi.appendChild(overflowimg);

let homec = document.createElement("a");
homec.href = "index.html";
menu.appendChild(homec);
let home = document.createElement("div");
home.id = "home";
homec.appendChild(home);
let homeimg = document.createElement("img");
homeimg.src = "sprites/menu/cocv4.png";
homeimg.width = "90";
homeimg.height = "90";
home.appendChild(homeimg);

let rbxc = document.createElement("a");
rbxc.href = "https://www.roblox.com/groups/9381734/Chronicles-of-Cake#!/about";
rbxc.target = "_blank";
menu.appendChild(rbxc);
let rbx = document.createElement("div");
rbx.id = "rblx";
rbx.className = "sel";
rbx.innerHTML = "Roblox Group";
rbxc.appendChild(rbx);

let discc = document.createElement("a");
discc.href = "https://discord.com/invite/WyB4cHpcaT";
discc.target = "_blank";
menu.appendChild(discc);
let disc = document.createElement("div");
disc.id = "disc";
disc.className = "sel";
disc.innerHTML = "Discord Server";
discc.appendChild(disc);

let authorc = document.createElement("a");
authorc.href = "meet.html";
menu.appendChild(authorc);
let author = document.createElement("div");
author.id = "author";
author.className = "sel";
author.innerHTML = "Meet the Author";
authorc.appendChild(author);

let faqc = document.createElement("a");
faqc.href = "faq.html";
menu.appendChild(faqc);
let faq = document.createElement("div");
faq.id = "faq";
faq.className = "sel";
faq.innerHTML = "FAQ";
faqc.appendChild(faq);

let gamesc = document.createElement("a");
gamesc.href = "games.html";
menu.appendChild(gamesc);
let games = document.createElement("div");
games.id = "games";
games.className = "sel";
games.innerHTML = "Games";
gamesc.appendChild(games);

let divs = [
	rbx, disc, author, faq, games
];

function update() {
	overflowi.style.left = dims()[0] - 101 + "px";
	menu.style.width = dims()[0] - 4 + "px";
	overflowmenu.style.left = dims()[0] - 206 + "px";

	var overflows = 0;
	for (let i = 0; i < divs.length; i++) {
		if (i !== divs.length - 1) {
			if (119 + 176 * i + 152 + 26 + 101 > dims()[0]) {
				overflowmenu.appendChild(divs[i].parentElement);
				overflowing = true;
				divs[i].style.top = (24 + 54) * overflows + 25 + "px";
				overflows += 1;
				divs[i].style.left = 24 + "px";
				divs[i].style.zIndex = 0;
			} else {
				menu.appendChild(divs[i].parentElement);
				divs[i].style.left = 119 + 176 * i + "px";
				divs[i].style.top = "23px";
				overflowing = false;
				divs[i].style.zIndex = 2;
			}
		} else {
			if (123 + 176 * i + 152 + 26 > dims()[0]) {
				overflowmenu.appendChild(divs[i].parentElement);
				overflowing = true;
				divs[i].style.top = (24 + 54) * overflows + 25 + "px";
				overflows += 1;
				divs[i].style.left = 24 + "px";
			} else {
				menu.appendChild(divs[i].parentElement);
				divs[i].style.left = 119 + 176 * i + "px";
				divs[i].style.top = "23px";
				overflowing = false;
			}
        }
	}

	overflowmenu.style.height = (24 + 54) * overflows + 25 + "px";

	if (!overflowenabled)
		overflowmenu.style.top = 100 - parseInt(overflowmenu.style.height, 10) + "px";

	if (!overflowing) {
		overflowi.style.display = "none";
		overflowmenu.style.display = "none";
		overflowenabled = false;
	} else {
		overflowi.style.display = "block";
		overflowmenu.style.display = "block";
    }
}

update();

window.onresize = function() {
	update();
}