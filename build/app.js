"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Akeneo {
    constructor(akeneoconnect) {
        this.domain = akeneoconnect.domain;
        this.username = akeneoconnect.username;
        this.password = akeneoconnect.password;
        this.clientid = akeneoconnect.clientid;
        this.secret = akeneoconnect.secret;
        this.cdn = akeneoconnect.cdn;
        this.access_token = '';
        this.refresh_token = '';
        this.auth();
    }
    base64ClientIDSecret() {
        return btoa(this.clientid + ':' + this.secret);
    }
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.domain + "/api/oauth/v1/token", {
                method: 'POST',
                body: JSON.stringify({
                    "username": this.username,
                    "password": this.password,
                    "grant_type": "password"
                }),
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.base64ClientIDSecret(), 'Access-Control-Allow-Origin': '*' }
            });
            if (!(response).ok) {
                console.error("Error");
            }
            else if (response.status >= 400) {
                console.error('HTTP Error: ' + response.status + ' - ' + response.statusText);
            }
            else {
                console.log('passt!');
            }
        });
    }
}
const connect = {
    domain: "https://ziggy.pim.tso.ch",
    username: "buddy_0903",
    password: "1026ed326",
    clientid: "14_kmpo0wlvxog4wwok00o000w0ook8sk00o0o8kc0sw4ccgk4oc",
    secret: "fi8gunyi5748co04oc00044cws4cgcg4os4c0ocok0owgwswg",
    cdn: "https://ziggypimtsoch.sos-ch-dk-2.exoscale-cdn.com/catalog/"
};
// @ts-ignore
let akeneo = new Akeneo(connect);
console.log(akeneo);
