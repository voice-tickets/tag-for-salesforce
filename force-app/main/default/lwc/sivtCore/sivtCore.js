export const SivtCore = function() {};

SivtCore.TENANT = "";
SivtCore.APP_ID = "";
SivtCore.BASE_URL = "https://vt.voicetickets-demo.cloud";

SivtCore.customerCode = "";
SivtCore.customerName = "";
SivtCore.customerKana = "";
SivtCore.user = "";
SivtCore.product = "*";

SivtCore.init = (tenant, appId) => {
    SivtCore.TENANT = tenant && typeof tenant === "string" ? tenant.substring(0, 15) : "demo";
    SivtCore.APP_ID = appId && typeof appId === "string" ? appId : "";
    SivtCore.BASE_URL = `https://${encodeURIComponent(SivtCore.TENANT)}.voicetickets-demo.cloud`;
}

SivtCore.setParams = function (obj) {
    if (typeof obj !== "object") return;

    const setParam  = (obj, key, type, length, initValue) => {
        if (!(key in obj)) return;
        if (typeof obj[key] === type) {
            SivtCore[key] = type === "string" ? obj[key].substring(0, length) : obj[key];
        } else {
            SivtCore[key] = initValue;
        }
    }

    setParam(obj, "customerCode", "string", 255, "");
    setParam(obj, "customerName", "string", 255, "");
    setParam(obj, "customerKana", "string", 255, "");
    setParam(obj, "user", "string", 255, "");
    setParam(obj, "product", "string", 255, "*");
}

SivtCore.getApiHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Voice-Tickets-Token': SivtCore.APP_ID
    }
}

SivtCore.getApiParams = (page, ticketId) => {
    return {
        customerCode: SivtCore.customerCode,
        customerName: SivtCore.customerName,
        customerKana: SivtCore.customerKana,
        user: SivtCore.user,
        product: SivtCore.product,
        page: page || "voice",
        ticketId: ticketId || null
    }
}

SivtCore.healthCheck = async () => {
    const returnValue = { ok: false, status: -1, message: "", data: {} };
    try {
        const apiURL = `${SivtCore.BASE_URL}/api/v1/health_check`
        const headers = SivtCore.getApiHeaders();
        const res = await fetch(apiURL, {
            method: 'GET',
            mode: "cors",
            credentials: "omit",
            referrerPolicy: "strict-origin",
            headers: headers
        });
        returnValue.ok = res.ok;
        returnValue.status = res.status;
        if (!res.ok) {
            returnValue.data = await res.json();
            returnValue.message = returnValue.data.message || "現在 VOICE TICKETS をご利用いただくことができません。";
        }
    } catch(e) {
        console.error(e);
        returnValue.ok = false;
        returnValue.status = 500;
        returnValue.message = `現在 VOICE TICKETS をご利用いただくことができません。`;
        returnValue.data = {};
    }
    return returnValue;
}

SivtCore.transition = async (params) => {
    const healthCheck = await SivtCore.healthCheck();
    if (!healthCheck.ok) return healthCheck;

    const returnValue = { ok: false, status: -1, message: "", data: {} };
    try {
        const apiURL = `${SivtCore.BASE_URL}/api/v1/transition_params`;
        const headers = SivtCore.getApiHeaders();
        const res = await fetch(apiURL, {
            method: 'POST',
            mode: "cors",
            credentials: "omit",
            referrerPolicy: "strict-origin",
            headers: headers,
            body: JSON.stringify(params),
        });
        if (res.ok) {
            returnValue.ok = res.ok;
            returnValue.status = res.status;
            returnValue.data = await res.json();
            if (returnValue.data.id) {
                window.open(`https://vt.voicetickets-demo.cloud?transitionId=${encodeURIComponent(returnValue.data.id)}`);
            } else {
                window.open(`https://vt.voicetickets-demo.cloud`);
            }
        } else {
            returnValue.ok = res.ok;
            returnValue.status = res.status;
            returnValue.data = await res.json();
            returnValue.message = returnValue.data.message || "現在 VOICE TICKETS をご利用いただくことができません。";
        }
    } catch(e) {
        console.error(e);
        returnValue.ok = false;
        returnValue.status = 500;
        returnValue.message = `現在 VOICE TICKETS をご利用いただくことができません。`;
        returnValue.data = {};
    }
    return returnValue;
}

SivtCore.transitionList = async () => {
    const params = SivtCore.getApiParams("voice", null);
    const res = await SivtCore.transition(params);
    return res;
}

SivtCore.transitionEntry = async () => {
    const params = SivtCore.getApiParams("entry", null);
    const res = await SivtCore.transition(params);
    return res;
}

SivtCore.transitionTicket = async (ticketId) => {
    const params = SivtCore.getApiParams("notification", ticketId);
    const res = await SivtCore.transition(params);
    return res;
}

SivtCore.getNotifications = async () => {
    const healthCheck = await SivtCore.healthCheck();
    if (!healthCheck.ok) return healthCheck;

    const returnValue = { ok: false, status: -1, message: "", data: {} };
    try {
        const apiURL = `${SivtCore.BASE_URL}/api/v1/notifications/list`;
        const headers = SivtCore.getApiHeaders();
        const params = SivtCore.getApiParams(null, null);
        const res = await fetch(apiURL, {
            method: 'POST',
            mode: "cors",
            credentials: "omit",
            referrerPolicy: "strict-origin",
            headers: headers,
            body: JSON.stringify(params),
        });
        if (res.ok) {
            returnValue.ok = res.ok;
            returnValue.status = res.status;
            returnValue.data = await res.json();
        } else {
            returnValue.ok = res.ok;
            returnValue.status = res.status;
            returnValue.data = await res.json();
            returnValue.message = returnValue.data.message || "現在 VOICE TICKETS をご利用いただくことができません。";
        }
    } catch(e) {
        console.error(e);
        returnValue.ok = false;
        returnValue.status = 500;
        returnValue.message = `現在 VOICE TICKETS をご利用いただくことができません。`;
        returnValue.data = {};
    }
    return returnValue;
}