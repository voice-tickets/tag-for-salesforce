import { LightningElement, api } from 'lwc';
import { SivtCore } from 'c/sivtCore';

export default class SivtNoticeItem extends LightningElement {
  _typeName = "チケット";
  _ticketId = -1;
  _title = "";
  _lastStatus = "";
  _latestStatus = "";
  _statusUp = false;
  _statusDown = false;
  _ticketDelete = false;
  _userCommentAdd = 0;
  _userCommentUpdate = 0;
  _vendorCommentAdd = 0;
  _vendorCommentUpdate = 0;

  @api get typeName(){
    return this._typeName;
  }
  set typeName(value) {
    this._typeName = value;
  }

  @api get ticketId(){
    return this._ticketId;
  }
  set ticketId(value) {
    this._ticketId = value;
  }

  @api get title(){
    return this._title;
  }
  set title(value) {
    this._title = value;
  }

  @api get lastStatus(){
    return this._lastStatus;
  }
  set lastStatus(value) {
    this._lastStatus = value;
  }

  @api get latestStatus(){
    return this._latestStatus;
  }
  set latestStatus(value) {
    this._latestStatus = value;
  }

  @api get statusUp(){
    return this._statusUp;
  }
  set statusUp(value) {
    this._statusUp = value;
  }

  @api get statusDown(){
    return this._statusDown;
  }
  set statusDown(value) {
    this._statusDown = value;
  }

  @api get ticketDelete(){
    return this._ticketDelete;
  }
  set ticketDelete(value) {
    this._ticketDelete = value;
  }

  @api get userCommentAdd(){
    return this._userCommentAdd;
  }
  set userCommentAdd(value) {
    this._userCommentAdd = value;
  }

  @api get userCommentUpdate(){
    return this._userCommentUpdate;
  }
  set userCommentUpdate(value) {
    this._userCommentUpdate = value;
  }

  @api get vendorCommentAdd(){
    return this._vendorCommentAdd;
  }
  set vendorCommentAdd(value) {
    this._vendorCommentAdd = value;
  }

  @api get vendorCommentUpdate() {
    return this._vendorCommentUpdate;
  }
  set vendorCommentUpdate(value) {
    this._vendorCommentUpdate = value;
  }

  @api get comment(){
    return (this._userCommentAdd + this._userCommentUpdate + this._vendorCommentAdd + this._vendorCommentUpdate) > 0;
  }

  @api get statusUpText(){
    return `ステータスが ${this._lastStatus} から ${this._latestStatus} にアップしました。`
  }

  @api get statusDownText(){
    return `ステータスが ${this._lastStatus} から ${this._latestStatus} にダウンしました。`;
  }

  @api get deleteText(){
    return "チケットが削除されました。";
  }

  @api get commentText(){
    const add = this._userCommentAdd + this._vendorCommentAdd;
    const update = this._userCommentUpdate + this._vendorCommentUpdate;
    return `コメントが追記されました (追加 : ${add} 件 / 編集 : ${update} 件)。`;
  }

  async handleClickButtonC() {
    await SivtCore.transitionTicket(this._ticketId);
  }
}