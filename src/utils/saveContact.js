// export const vCard = (name, email, phone,) => `BEGIN:VCARD
// VERSION:3.0
// N:${name}
// TEL;TYPE=CELL:${phone}
// EMAIL:${email}
// END:VCARD`;

import axios from "axios";

import baseUrl from "./config";

// export const saveContact = (name, email, phone) => {
//     const link = document.createElement("a");
//     let vCard1 = vCard(name, email, phone);
//     link.href = "data:text/vcard;charset=utf-8," + encodeURIComponent(vCard1);
//     link.download = `${name}.vcf`;
//     link.click();
//     if (window.innerWidth > 600) {
//         alert("Please open this website or open downlaoded file on mobile to save contact");
//     }
// };

export const vCard = (name, email, phone, company, url) => `BEGIN:VCARD
VERSION:3.0
N:${name}
ORG:${company}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
URL:${url}
END:VCARD`;

export const saveContact = (name, email, phone, company, url) => {
    const link = document.createElement("a");
    let vCard1 = vCard(name, email, phone, company, url);
    link.href = "data:text/vcard;charset=utf-8," + encodeURIComponent(vCard1);
    link.download = `${name}.vcf`;
    link.click();
    if (window.innerWidth > 600) {
        alert("Please open this website or open downloaded file on mobile to save contact");
    }

};
export const saveContactAndNavigate = async (name, email, phone, company, url, urlId) => {
    const link = document.createElement("a");
    let vCard1 = vCard(name, email, phone, company, url);
    link.href = "data:text/vcard;charset=utf-8," + encodeURIComponent(vCard1);
    link.download = `${name}.vcf`;
    link.click();
    if (window.innerWidth > 600) {
        alert("Please open this website or open downloaded file on mobile to save contact");
    }
    const res = await axios.post(`${baseUrl}/increment-taps`, {
        userId: urlId,

    });
    console.log(res);
    // go to exchange-contact page after saving contact with vcf parmater = true
    window.location.href = `/exchange-contact/${urlId}?vcf=true`;

};
export const saveContact2 = async (name, email, phone, company, url, urlId) => {
    const link = document.createElement("a");
    const vCardData = vCard(name, email, phone, company, url);
    link.href = "data:text/vcard;charset=utf-8," + encodeURIComponent(vCardData);
    link.download = `${name}.vcf`;
    link.click();
    if (window.innerWidth > 600) {
        alert("Please open this website or open downloaded file on mobile to save contact");
    }
    // increment taps


    setTimeout(async () => {
        const res = await axios.post(`${baseUrl}/increment-taps`, {
            userId: urlId,

        });
        if (res.status === 200) {
            console.log("taps incremented");
        }
        // if error print error
        else {
            console.log(res);
        }
        window.location.href = `/exchange-contact?userId=${urlId}`;
    }, 200);
};

