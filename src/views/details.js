import { html, nothing } from '../lib/lit-html.js';
import * as roomService from '../data/room.js';
import * as reservationService from '../data/reservation.js'
import { submitHandler } from '../util.js';


const detailsTemplate = (room, hasUser, isOwner, onDelete, onBook) => html`
<h2>${room.name}</h2>
<p>Location: ${room.location}</p>
<p>Beds: ${room.beds}</p>
${hasUser && !isOwner ? reservationForm(onBook) : nothing}
${isOwner ? html`
<a href="/edit/${room.objectId}">Edit</a>
<a href="javascript:void(0)" @click=${onDelete}>Delete</a>
` : nothing}`;

const reservationForm = (onSubmit) => html`
    <form @submit=${onSubmit}>
    <label>From <input type="date" name="startDate"></label>
    <label>To <input type="date" name="endDate"></label>
    <button>Request reservation</button>
    </form>
`

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const hasUser = Boolean(ctx.user);
    const isOwner = ctx.data?.owner?.objectId === ctx.user?.objectId;

    if(isOwner) {
        const {results: reservations} = await reservationService.getByRoomId(id);
    }

    ctx.render(detailsTemplate(ctx.data, hasUser, isOwner, onDelete, submitHandler(book)));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this room?')
        
        if(choice) {
            await roomService.deleteById(id);
            ctx.page.redirect('/rooms');
        }
    }

    async function book({startDate, endDate}) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if(Number.isNaN(startDate.getDate()) || Number.isNaN(endDate.getDate())){
            return alert ('Invalid date!');
        }

    }

}

