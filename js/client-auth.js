async function loginClient(){

    const email = document.getElementById("clientEmail").value;
    const password = document.getElementById("clientPassword").value;


    if(!email || !password){
        alert("Enter email and password");
        return;
    }


    try {

        const res = await fetch(`${API_BASE}/api/client/login`, {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email,
                password
            })

        });


        const data = await res.json();


        if(!res.ok){

            alert(data.message || "Login failed");
            return;

        }


        // SAVE CLIENT SESSION

        localStorage.setItem(
            "clientToken",
            data.token
        );


        localStorage.setItem(
            "client",
            JSON.stringify(data.client)
        );


        // GO TO CLIENT AREA

        window.location.href="user-inbox.html";


    }

    catch(err){

        console.error(err);
        alert("Server connection failed");

    }

}

async function registerClient() {

    const name = document.getElementById("clientName").value.trim();
    const email = document.getElementById("clientEmail").value.trim();
    const password = document.getElementById("clientPassword").value;
    const confirmPassword = document.getElementById("clientConfirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {
        return alert("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
        return alert("Passwords do not match.");
    }

    try {

        const response = await fetch(`${API_BASE}/api/client/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return alert(data.message);
        }

        alert("Account created successfully!");

        window.location.href = "client-login.html";

    } catch (err) {
        console.error(err);
        alert("Server connection failed.");
    }

}

function togglePassword(id){

const input=document.getElementById(id);

input.type =
input.type==="password"
? "text"
: "password";

}