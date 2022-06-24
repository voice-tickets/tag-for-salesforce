import { LightningElement } from 'lwc';
import { SivtCore } from 'c/sivtCore';

export default class SivtTag extends LightningElement {
    statusCode = "";
    message = "";
    myTickets;

    async handleClickButtonA() {
        SivtCore.init("vt", "656f6dfdac2ec67d7ca4d9917a4ba83b654b51d26ecc03dafbbaa026c16b81c0da970d398e47e8f59233372b6d8e0e0527016a431707d8093862a1934a30a557");
        SivtCore.setParams({
            customerCode: "obpm",
            user: "001"
        });

        var res = await SivtCore.transitionList();
        if (!res.ok) {
            this.statusCode = res.status;
            this.message = res.message;
        }
    }
    
    async handleClickButtonB() {
        SivtCore.init("vt", "656f6dfdac2ec67d7ca4d9917a4ba83b654b51d26ecc03dafbbaa026c16b81c0da970d398e47e8f59233372b6d8e0e0527016a431707d8093862a1934a30a557");
        SivtCore.setParams({
            customerCode: "obpm",
            user: "001"
        });

        var res = await SivtCore.transitionEntry();
        if (!res.ok) {
            this.statusCode = res.status;
            this.message = res.message;
        }
    }

    async handleClickButtonC() {
        SivtCore.init("vt", "656f6dfdac2ec67d7ca4d9917a4ba83b654b51d26ecc03dafbbaa026c16b81c0da970d398e47e8f59233372b6d8e0e0527016a431707d8093862a1934a30a557");
        SivtCore.setParams({
            customerCode: "obpm",
            user: "001"
        });

        var res = await SivtCore.transitionTicket(1);
        if (!res.ok) {
            this.statusCode = res.status;
            this.message = res.message;
        }
    }

    async handleClickButtonD() {
        SivtCore.init("vt", "656f6dfdac2ec67d7ca4d9917a4ba83b654b51d26ecc03dafbbaa026c16b81c0da970d398e47e8f59233372b6d8e0e0527016a431707d8093862a1934a30a557");
        SivtCore.setParams({
            customerCode: "obpm",
            user: "001"
        });
        var res = await SivtCore.getNotifications();
        
        if (res.ok) {
            this.myTickets =  res.data.length ? res.data : null;
            this.message = res.data.length ? null : "新着情報はありません。"
        } else {
            this.statusCode = res.status;
            this.message = res.message;
        }
    }

    handleClearMessage() {
        this.code = "";
        this.message = "";
    }

    handleClearNotice() {
        this.myTickets = undefined;
    }
}