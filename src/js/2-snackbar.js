import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "../css/2-snackbar.css";

iziToast.settings({
    class: "toast",
    position: "topRight",
    progressBar: false,
    close: false,
    drag: false,
});
document.querySelector("form.form").addEventListener(
    "submit", e => { 
        e.preventDefault();

        const delay = e.currentTarget.elements['delay'].value;
        const state = e.currentTarget.elements['state'].value;
        const promise = new Promise((resolv, reject) => { 
            setTimeout(() => {
                if (state == 'fulfilled') {
                    resolv(delay);
                } else {
                    reject(delay);
                }   
             }, delay);
        });
        promise.then(
            value => { 
                iziToast.success({message: `✅ Fulfilled promise in ${value}ms`});
            },
            error => { 
                iziToast.error({message: `❌ Rejected promise in ${error}ms`});
            }
        );

        e.currentTarget.reset();
    }
);
