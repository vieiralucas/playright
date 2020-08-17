// MIT License
//
// Copyright (c) 2020 Iakiv Kramarenko, Alexander Popov
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
import { Stage, stage } from './playright';
import * as driver from 'playwright'
import { Wait } from './wait';
import { Condition, Locator } from './callables';
import { Element } from './element'


/**
 * TODO: consider putting into Playright namespace
 */
export class Elements {
    constructor(
        private readonly find: 
            Locator<driver.ElementHandle<HTMLOrSVGElement>[]>, 
        private readonly options?: ElementsOptions) // TODO: should we just accept Stage here?
    {
        this.find = find;
        this.options = options;
    }

    /**
     * TODO: think on proper name...
     * at? with? in? of? ... etc? 
     */
    when(options: ElementsOptions): Elements {
        return new Elements(this.find, options);
    }

    get wait(): Wait<Elements> {
        return new Wait(this, stage.timeout);
    } // $('.item').wait.for({call})

    /* --- Locating --- */

    /**
     * 
     * @param number_ number of element in elements collection starting from 1
     */
    element(number_: number): Element {
        const collection = this;
        return new Element({
            toString: () => `${collection}[${number_}]`,
            async call() {
                const actual = await collection.find.call();
                if (actual.length < number_) {
                    throw new Error(
                        `Cannot get element of number ${number_} ` +
                        `from elements collection with length ${actual.length}`
                    );
                    // TODO: do we need to print the whole collection here?
                    //       probably with stage option to limit number of 
                    //       elements to log
                }
                return actual[number_-1]
            } 
        })
    }

    get first(): Element {
        return this.element(1);
    }

    // firstBy(condition: Condition<Elements>): Element {
    //     // TODO: implement
    //     return this;
    // }

    by(condition: Condition<Elements>): Elements {
        // TODO: implement
        return this;
    }

    /* --- Assertable --- */

    should(condition: Condition<Elements>): Elements {
        // TODO: implement
        return this;
    }
}

/**
 * TODO: should we narrow all Stage to a smaller group of options
 *       relevant only for the Element contexts?
 * 
 * probably it's good to break things down...
 * we can have separate smaller ElementOptions and then merge them into Stage
 * like stage = {...elementOptions, ...}
 */
export interface ElementsOptions extends Stage {

}