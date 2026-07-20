// =====================================
// FORMA.IT CLIENT AUTH SYSTEM
// =====================================

const AUTH_API_BASE =
    window.API_BASE ||
    "https://formait-backend.onrender.com";

const AUTH_API = `${AUTH_API_BASE}/api/auth`;

document.addEventListener("DOMContentLoaded", () => {

    updateClientNavbar();

});


// ================================
// NAVBAR STATE
// ================================

function updateClientNavbar(){

    const area = document.getElementById("clientAuthArea");

    if(!area) return;


    const client = JSON.parse(
        localStorage.getItem("client")
    );


    if(client){

        area.innerHTML = `

        <div class="flex items-center gap-3">

            <span class="text-sm text-white font-bold">
                👤 ${client.fullName}
            </span>

            <button
            onclick="clientLogout()"
            class="px-4 py-2 rounded-full bg-red-500 text-white text-xs font-bold">
                Logout
            </button>

        </div>

        `;

    }
    else {


        area.innerHTML = `

        <button
        onclick="openClientLogin()"
        class="px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm font-bold hover:border-blue-500 transition">

        Login

        </button>

        `;

    }

}



// ================================
// OPEN LOGIN
// ================================

function openClientLogin(){

document.body.insertAdjacentHTML(
"beforeend",

`

<div id="clientModal"

class="fixed inset-0 z-[9999] bg-black/80 backdrop-blur flex items-center justify-center">


<div class="w-full max-w-md bg-[#111] border border-zinc-800 rounded-3xl p-8">


<h2 class="text-3xl font-black text-center mb-2">
forma<span class="text-blue-500">.IT</span>
</h2>


<p class="text-center text-zinc-500 mb-8">
Client Portal Login
</p>


<input
id="clientEmail"
type="email"
placeholder="Email"

class="w-full mb-4 p-4 rounded-xl bg-black border border-zinc-800 text-white">


<input
id="clientPassword"
type="password"
placeholder="Password"

class="w-full mb-6 p-4 rounded-xl bg-black border border-zinc-800 text-white">


<button

onclick="clientLogin()"

class="w-full bg-blue-500 text-black py-4 rounded-xl font-black">

LOGIN

</button>


<button

onclick="closeClientModal()"

class="w-full mt-4 text-zinc-500">

Cancel

</button>


</div>


</div>

`

);


}




// ================================
// LOGIN
// ================================

async function clientLogin(){

const email =
document.getElementById("clientEmail").value;


const password =
document.getElementById("clientPassword").value;



try{


const res = await fetch(

`${CLIENT_API}/login`,

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,
password

})

}

);



const data = await res.json();



if(!res.ok){

alert(data.message);

return;

}



localStorage.setItem(
"clientToken",
data.token
);


localStorage.setItem(
"client",
JSON.stringify(data.client)
);



location.reload();



}

catch(err){

console.error(err);

alert("Login failed");

}



}



// ================================
// LOGOUT
// ================================

function clientLogout(){

localStorage.removeItem("clientToken");

localStorage.removeItem("client");


location.reload();

}




function closeClientModal(){

document.getElementById("clientModal")?.remove();

}