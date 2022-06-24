import { LightningElement, api } from 'lwc';

export default class SivtMessage extends LightningElement {
  _code = "";
  _message = ""

  @api get code(){
    return this._code;
  }
  set code(value) {
    this._code = value;
  }

  @api get message(){
    return this._message;
  }
  set message(value) {
    this._message = value;
  }

  handleClose(evt) {
    const event = new CustomEvent('close', {
        detail: evt.detail
    });
    this.dispatchEvent(event);
  }
}