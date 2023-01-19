import * as roomService from '../data/room.js';

export function preload(param, collection) {
    return async function(ctx, next){
        const id = ctx.params[param];
        
        if(id){
            const data = await roomService.getById(id);
            ctx.data = data;
        }
        next();
    }
}