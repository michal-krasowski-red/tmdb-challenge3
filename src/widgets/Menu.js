import {Lightning, Router} from 'wpe-lightning-sdk';

export default class Menu extends Lightning.Component {

    static _template() {
        return {
            Items: {
                y: 68,
                flex: {},
                Movies: {
                    type: MenuItem,
                    label: "Movies", id: "movies",
                    onEnter: () => Router.navigate("Movies"),
                },
                Series: {
                    type: MenuItem,
                    label: "Series", id: "tv",
                    onEnter: () => Router.navigate("Series"),
                },
                Exit: {
                    type: MenuItem,
                    label: "Exit", id: "exit",
                    onEnter: () => Router.navigate("Exit"),
                }
            },
            Focus: {
                rect: true, colorLeft: 0xff8ecea2, colorRight: 0xff03b3e4,
                h: 6, y: 128,
                transitions: {
                    alpha: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    w: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            }
        };
    }

    _init() {
        this._index = 0;
    }

    get activeItem() {
        return this.tag("Items").children[this._index];
    }

    _handleDown() {
        Router.restoreFocus();
    }

    _handleLeft() {
        if (this._index > 0) {
            this.setIndex(this._index - 1);
        }
    }

    _handleRight() {
        if (this._index < this.tag("Items").children.length - 1) {
            this.setIndex(this._index + 1);
        }
    }

    _focus() {
        this.tag("Focus").w = 0;
        this.tag("Focus").setSmooth("alpha", 1);

        this.setIndex();
    }

    _unfocus() {
        this.tag("Focus").setSmooth("alpha", 0);
    }

    setIndex(index = this._index) {
        this._index = index;
        this.tag("Focus").patch({
            smooth: {x: this.activeItem.finalX, w: this.activeItem.finalW}
        });

    }

    _handleEnter(){
        this.activeItem.onEnter();
    }

    _getFocused(){
        return this.activeItem;
    }

}

class MenuItem extends Lightning.Component {

    static _template() {
        return {
            flexItem: {marginRight: 40},
            text: {text: "Movies", fontSize: 48, fontFace: "SourceSansPro-Regular"}
        };
    }

    set label(v) {
        this._label = v;

        this.patch({
            text: {text: this._label}
        });
    }

    set id(v) {
        this._id = v;
    }

    get id() {
        return this._id;
    }

}
