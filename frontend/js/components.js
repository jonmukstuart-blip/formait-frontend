async function loadComponents(){

    try {

        const whatsapp = await fetch("./src/components/whatsapp-button.html");

        if(!whatsapp.ok){
            throw new Error("WhatsApp component failed to load");
        }

        const html = await whatsapp.text();

        document.body.insertAdjacentHTML(
            "beforeend",
            html
        );

        console.log("✅ WhatsApp button injected");

    } catch(error){

        console.error(
            "❌ Component injection error:",
            error
        );

    }

}


document.addEventListener(
    "DOMContentLoaded",
    loadComponents
);