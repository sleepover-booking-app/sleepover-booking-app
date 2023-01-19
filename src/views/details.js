import { deleteById } from '../data/room.js';
import { html, nothing } from '../lib/lit-html.js';


const detailsTemplate = (room, hasUser, isOwner, onDelete) => html`
<h2>${room.name}</h2>
<p>Location: ${room.location}</p>
<p>Beds: ${room.beds}</p>
${hasUser && !isOwner ? html`
<a href="/book/${room.objectId}">Book room</a>
` : nothing}
${isOwner ? html`
<a href="/edit/${room.objectId}">Edit</a>
<a href="javascript:void(0)" @click=${onDelete}>Delete</a>
` : nothing}`;



export async function detailsView(ctx) {
    const id = ctx.params.id;
    const hasUser = Boolean(ctx.user);
    const isOwner = ctx.data?.owner?.objectId === ctx.user?.objectId;

    ctx.render(detailsTemplate(ctx.data, hasUser, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this room?')
        
        if(choice) {
            await deleteById(id);
            ctx.page.redirect('/rooms');
        }
    }

   
}

