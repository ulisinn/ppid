/**
 * Created by ulrichsinn on 03/16/2015.
 */

class CustomEvent {
    static DATA_LOADED:string = "CustomEvent.DATA_LOADED";
    static CANVAS_LOADED:string = "CustomEvent.CANVAS_LOADED";
    static NAV_CLICK:string = "CustomEvent.NAV_CLICK";
    static PLUS_CLICK:string = "CustomEvent.PLUS_CLICK";
    static CANVAS_BLUR:string = "CustomEvent.CANVAS_BLUR";

    private _type:string = null;
    private _target:string = null;
    private _payload:any = null;

    constructor(t:string, tgt?:any) {
        this._type = t;
        if (tgt) {
            this._target = tgt;
        }
    }

    get type():string {
        return this._type;
    }

    get target():any {
        return this._target;
    }

    set payload(o:any) {
        if (o) {
            this._payload = o;
        }
    }

    get payload():any {
        if (this._payload) {
            return this._payload
        }
        return null;
    }
}

export = CustomEvent;