import { LightningElement, api } from 'lwc';

export default class SivtNotice extends LightningElement {
  _notice;

  @api get notice(){
    return this._notice;
  }
  set notice(value) {
    this._notice = value;
  }

  handleClose(evt) {
    const event = new CustomEvent('close', {
        detail: evt.detail
    });
    this.dispatchEvent(event);
  }
}