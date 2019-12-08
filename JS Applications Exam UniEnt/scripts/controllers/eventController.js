import { partials, getSessionInfo } from "../common.js";
import { get, post, put, del } from "../requester.js";

export function getCreate(ctx) {
    getSessionInfo(ctx);

    this.loadPartials(partials).then(function() {
        this.partial("./templates/events/createEvent.hbs");
    });
}

export function postCreate(ctx) {
    getSessionInfo(ctx);

    const { dateTime, description, imageURL, name } = ctx.params;
    const organizer = ctx.username;
    const peopleInterestedIn = 0;

    post("appdata", "events", { dateTime, description, imageURL, name, organizer, peopleInterestedIn }, "Kinvey")
        .then(() => {
            alert("Event successfully created!");
            ctx.redirect("#/");
        })
        .catch(console.error);
}

export function getDetails(ctx) {
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", `events/${id}`, "Kinvey")
        .then(data => {

            ctx.dateTime = data.dateTime;
            ctx.description = data.description;
            ctx.imageURL = data.imageURL;
            ctx.name = data.name;
            ctx.organizer = data.organizer;
            ctx.eventId = data._id;
            ctx.peopleInterestedIn = data.peopleInterestedIn;

            if (data._acl.creator == ctx.userId) {
                ctx.isAuthor = true;
            }

            this.loadPartials(partials).then(function() {
                this.partial("./templates/events/eventDetails.hbs");
            });
        })
        .catch(console.error);

}

export function getEdit(ctx) {
    getSessionInfo(ctx);

    get("appdata", `events/${ctx.params.id}`, "Kinvey")
        .then(data => {
            ctx.eventId = ctx.params.id;
            ctx.dateTime = data.dateTime;
            ctx.description = data.description;
            ctx.imageURL = data.imageURL;
            ctx.name = data.name;
            ctx.organizer = data.organizer;
            ctx.peopleInterestedIn = data.peopleInterestedIn;

            this.loadPartials(partials).then(function() {
                this.partial("./templates/events/editEvent.hbs");
            });
        })
        .catch(console.error);
}

export function postEdit(ctx) {
    getSessionInfo(ctx);

    const { dateTime, description, imageURL, name, organizer, peopleInterestedIn, eventId } = ctx.params;

    get("appdata", `events/${ctx.params.id}`, "Kinvey")
        .then(data => {
            data.dateTime = dateTime;
            data.description = description;
            data.imageURL = imageURL;
            data.name = name;
            data.organizer = organizer;
            data.peopleInterestedIn = peopleInterestedIn;

            put("appdata", `events/${ctx.params.id}`, data, "Kinvey")
                .then(() => {
                    ctx.redirect("#/");
                })
                .catch(console.error);
        })
        .catch(console.error);
}

export function getJoin(ctx) {
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", `events/${id}`, "Kinvey")
        .then(data => {
            const { dateTime, description, imageURL, name, organizer, eventId } = data;
            const peopleInterestedIn = 1 + data.peopleInterestedIn;
            console.log(data);
            console.log(peopleInterestedIn);
            put("appdata", `events/${id}`, { dateTime, description, imageURL, name, organizer, eventId, peopleInterestedIn }, "Kinvey")
                .then(() => {
                    ctx.redirect("#/");
                })
                .catch(console.error);
        })
        .catch(console.error);
}

export function getDelete(ctx) {
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", `events/${id}`, "Kinvey")
        .then(data => {
            if (data._acl.creator == ctx.userId) {
                del("appdata", `events/${id}`, "Kinvey")
                    .then(() => {
                        ctx.redirect("#/");
                    })
                    .catch(console.error);
            }
        })
        .catch(console.error);
}