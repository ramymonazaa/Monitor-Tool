/**
 * Catch, retry or continue code blocks.
 */
class CatchContinue {
    /**
     * Setup the class.
     */
    constructor() {
        this.segments = [];
        this.pointer = 0;
    }

    /**
     * Convert a chained method to a function method and append it to a segment.
     *
     * @private
     * @param {Function} segmentId
     * @returns {Proxy}
     */
    wrapSegment(segmentId) {
        return new Proxy({}, {
            get: (_, prop) => {
                return (...args) => {
                    const wrappedFunc = this.segments[segmentId];

                    this.segments[segmentId] = async () => {
                        const instance = await wrappedFunc();

                        return await instance[prop](...args);
                    };

                    return this.wrapSegment(segmentId);
                };
            },
        });
    }

    /**
     * Same as asyncWrap but wraps the instance in a function.
     *
     * @param {object} instance
     * @returns {Proxy}
     */
    wrap(instance) {
        return new Proxy({}, {
            get: (_, prop) => {
                return (...args) => {
                    const segmentId = this.add(async () => {
                        return await instance[prop](...args);
                    });

                    return this.wrapSegment(segmentId);
                };
            },
        });
    }

    /**
     * Add a segment.
     *
     * @param {Function} func
     * @returns {number}
     */
    add(func) {
        this.segments = [
            ...this.segments,
            func,
        ];

        return this.segments.length - 1;
    }

    /**
     * Run the segments.
     *
     * @param {any[]} args - Arguments to pass to each segment.
     * @throws {any}
     */
    async run(...args) {
        this.args = args;

        for (; this.pointer < this.segments.length; this.pointer++) {
            await this.segments[this.pointer](...this.args);
        }
    }

    /**
     * Retry the failed segment.
     */
    async retry() {
        await this.run(...this.args);
    }

    /**
     * Continue, skipping the failed segment.
     */
    async continue() {
        this.pointer++;

        await this.run(...this.args);
    }
}

export default CatchContinue;
