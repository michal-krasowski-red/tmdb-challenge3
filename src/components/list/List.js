import {Lightning} from "wpe-lightning-sdk";
import Item from "../item/Item";

export default class List extends Lightning.Component {
    static _template() {
        return {
            Items: {
                y: 120, forceZIndexContext: true, boundsMargin: [500, 100, 500, 100],
                transitions: {
                    x: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                signals: {
                    updateMetadata: "_updateMetadata",
                }
            },
            Focus: {
                texture: Lightning.Tools.getRoundRect(Item.width+8, Item.height+8, 10, 4, 0xff8ecea2, false, 0xff00ffff),
                alpha: 0,
                x: -7,
                y: 152,
                scale: 1.2,
            },
            Metadata: {
                Title: {
                    x:0, y:0,
                    type: lng.Text,
                    text: {text: "Title placeholder", fontSize: 48, fontFace: "SourceSansPro-Regular"},
                },
                Genre: {
                    x:0, y:50,
                    type: lng.Text,
                    text: {text:"Genre placeholder", fontSize: 24, fontFace: "SourceSansPro-Regular"},
                }
            }
        }
    }

    _init() {
        this._index = 0;
    }

    _handleLeft(){
        this.setIndex(Math.max(0, --this._index));
    }

    _handleRight(){
        this.setIndex(Math.min(++this._index, this.items.length - 1));
    }

    setIndex(idx){
        // store new index
        this._index = idx;

        // update position
        this.tag("Items").setSmooth("x",  idx * -220 );
    }

    set movies(v) {
        // we add an array of object with type: Item
        this.tag("Items").children = v.map((movie, index)=>{
            return {
                type: Item,
                item: movie,
                x: index * (Item.width + Item.offset)
            };
        });
    }

    get items() {
        return this.tag("Items").children;
    }

    get activeItem() {
        return this.items[this._index];
    }

    _getFocused() {
        return this.activeItem;
    }

    _updateMetadata(item) {
        const focusTransitionDuration = 0.5;

        console.log("updateMetadata: "+item.title);
        if (!!item.title) {
            this.tag("Title").patch({text: item.title});
            this.tag("Genre").patch({text: "Genre placeholder"});
            this.tag("Focus").setSmooth("alpha", 1, {duration: focusTransitionDuration});
        } else {
            this.tag("Title").patch({text: ""});
            this.tag("Genre").patch({text: ""});
            this.tag("Focus").setSmooth("alpha", 0, {duration: focusTransitionDuration});

        }
    }
}
