import { html } from '../lib/lit-html.js';



const homeTemplate = () => html`
<h1>Welcome to Stay & Smile Booking App</h1>
<p>Find accomodation in many locations worldwide <a href="/rooms">Browse catalog</a></p>
<p>Have a room to offer? <a href="">Place it on our platform now.</a></p>`;



export function homeView(ctx) {
    ctx.render(homeTemplate());
}