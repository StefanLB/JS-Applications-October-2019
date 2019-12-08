import { partials, getSessionInfo } from "../common.js";
import { get, post, put, del } from "../requester.js";
import { displaySuccess, displayError, validateRegisterForm, validateTrekForm } from '../notifications.js';

export function getCreate(ctx){
    getSessionInfo(ctx);

    this.loadPartials(partials).then(function() {
        this.partial("./templates/treks/create.hbs");
    });
}

export function postCreate(ctx){
    getSessionInfo(ctx);

    const { dateTime, description, imageURL } = ctx.params;
    const organizer = ctx.username;
    const name = ctx.params.location;
    const likes = 0;

    if (validateTrekForm(name, description)){
        post("appdata", "treks", { dateTime, description, imageURL, name, organizer, likes }, "Kinvey")
            .then(() => {
                displaySuccess("Trek created successfully.");
                ctx.redirect("#/");
            })
            .catch(console.error);
    }
}

export function getEdit(ctx){
    getSessionInfo(ctx);

    get("appdata", `treks/${ctx.params.id}`, "Kinvey")
        .then(data => {
            if(data._acl.creator == ctx.userId) {
                ctx.id = ctx.params.id;
                ctx.dateTime = data.dateTime;
                ctx.description = data.description;
                ctx.imageURL = data.imageURL;
                ctx.organizer = data.organizer;
                ctx.likes = data.likes;
                ctx.name = data.name;

                this.loadPartials(partials).then(function () {
                    this.partial("./templates/treks/edit.hbs");
                });
            }
        })
        .catch(console.error);
}

export function postEdit(ctx){
    getSessionInfo(ctx);

    const { dateTime, description, imageURL, location, organizer, likes } = ctx.params;

    get("appdata", `treks/${ctx.params.id}`, "Kinvey")
        .then(data => {
            if(data._acl.creator == ctx.userId){
                data.dateTime = dateTime;
                data.description = description;
                data.imageURL = imageURL;
                data.name = location;
                data.organizer = organizer;
                data.likes = likes;

                if (validateTrekForm(location, description)) {
                    put("appdata", `treks/${ctx.params.id}`, data, "Kinvey")
                        .then(() => {
                            displaySuccess("Trek edited successfully.")
                            ctx.redirect("#/");
                        })
                        .catch(console.error);
                }
            }
        })
        .catch(console.error);
}

export function getDetails(ctx){
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", `treks/${id}`, "Kinvey")
        .then(data => {
            ctx.dateTime = data.dateTime;
            ctx.description = data.description;
            ctx.imageURL = data.imageURL;
            ctx.name = data.name;
            ctx.organizer = data.organizer;
            ctx.id = data._id;
            ctx.likes = data.likes;

            if (data._acl.creator == ctx.userId) {
                ctx.isAuthor = true;
            }

            this.loadPartials(partials).then(function() {
                this.partial("./templates/treks/details.hbs");
            });
        })
        .catch(console.error);
}

export function getDelete(ctx){
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", `treks/${id}`, "Kinvey")
        .then(data => {
            if (data._acl.creator == ctx.userId) {
                del("appdata", `treks/${id}`, "Kinvey")
                    .then(() => {
                        displaySuccess("You closed the trek successfully.")
                        ctx.redirect("#/");
                    })
                    .catch(console.error);
            }
        })
        .catch(console.error);
}

export function getLike(ctx){
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", `treks/${id}`, "Kinvey")
        .then(data => {
            if(data._acl.creator != ctx.userId){
                const { dateTime, description, imageURL, name, organizer } = data;
                const likes = 1 + data.likes;

                put("appdata", `treks/${id}`, { dateTime, description, imageURL, name, organizer, likes }, "Kinvey")
                    .then(() => {
                        displaySuccess("You liked the trek successfully.")
                        ctx.redirect(`#/details/${id}`);
                    })
                    .catch(console.error);
            }
        })
        .catch(console.error);
}
