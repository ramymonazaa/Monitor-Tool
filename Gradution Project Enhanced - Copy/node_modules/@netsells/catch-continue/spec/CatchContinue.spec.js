import CatchContinue from '../src/index';

describe('CatchContinue', () => {
    let cc;
    let finished;
    let error;
    let promise;
    let args;

    beforeEach(() => {
        cc = new CatchContinue();
        finished = false;
        args = [];
    });

    describe('wrap simple', () => {
        let methods;
        let fooArgs;
        let barArgs;

        class Methods {
            constructor() {
                this.cc = new CatchContinue();
            }

            foo(...args) {
                fooArgs = args;

                return new Promise(r => setTimeout(r, 1));
            }

            bar(...args) {
                barArgs = args;

                return new Promise(r => setTimeout(r, 1));
            }

            async wrap() {
                const wrapper = this.cc.wrap(this);

                wrapper.foo('bar', 8);
                wrapper.bar('bam', 9);
            }

            async run() {
                await this.cc.run();
            }
        }

        beforeEach(() => {
            fooArgs = null;
            barArgs = null;
            methods = new Methods();

            methods.wrap();
        });

        it('can be used to wrap instance methods and delay running them until run called', () => {
            expect(methods.cc.segments).toHaveLength(2);
            expect(fooArgs).toBe(null);
            expect(barArgs).toBe(null);
        });

        describe('when ran', () => {
            beforeEach(async () => {
                await methods.run();
            });

            it('will call the wrapped method with the args supplied', () => {
                expect(fooArgs).toEqual(['bar', 8]);
                expect(barArgs).toEqual(['bam', 9]);
            });
        });
    });

    describe('wrap chainable', () => {
        let methods;
        let fooArgs;
        let barArgs;

        class Methods {
            constructor() {
                this.cc = new CatchContinue();
            }

            foo(...args) {
                fooArgs = args;

                return this;
            }

            bar(...args) {
                barArgs = args;

                return this;
            }

            wrap() {
                this.cc.wrap(this).foo('first args').bar('second', 97);
            }

            async run() {
                await this.cc.run();
            }
        }

        beforeEach(() => {
            fooArgs = null;
            barArgs = null;
            methods = new Methods();

            methods.wrap();
        });

        it('can be used to wrap instance methods and delay running them until run called', () => {
            expect(methods.cc.segments).toHaveLength(1);
            expect(fooArgs).toBe(null);
            expect(barArgs).toBe(null);
        });

        describe('when run', () => {
            beforeEach(async () => {
                await methods.run();
            });

            it('calls each function with their args', () => {
                expect(fooArgs).toEqual(['first args']);
                expect(barArgs).toEqual(['second', 97]);
            });
        });
    });

    describe('add', () => {
        it('will return the segment ID', () => {
            expect(cc.add(() => {})).toBe(0);
            expect(cc.add(() => {})).toBe(1);
            expect(cc.add(() => {})).toBe(2);
        });
    });

    describe('with a single error', () => {
        beforeEach(() => {
            error = new Error('Foo');

            cc.add((...a) => {
                args.push(a);

                const foo = 5;

                return foo;
            });

            cc.add((...a) => {
                args.push(a);

                return new Promise(r => setTimeout(r, 500));
            });

            cc.add((...a) => {
                args.push(a);

                throw error;
            });

            cc.add((...a) => {
                args.push(a);
                finished = true;
            });

            promise = cc.run('foo', 5);
        });

        it('will throw the first error', async () => {
            await expect(promise).rejects.toBe(error);
        });

        describe('after first error', () => {
            beforeEach(async () => {
                await expect(promise).rejects.toBe(error);
            });

            it('calls the first segments with the same args', () => {
                expect(args).toEqual([
                    ['foo', 5],
                    ['foo', 5],
                    ['foo', 5],
                ]);
            });

            describe('after being retried', () => {
                let retryPromise;

                beforeEach(() => {
                    retryPromise = cc.retry();
                });

                it('errors again', async () => {
                    await expect(retryPromise).rejects.toBe(error);
                });

                describe('after erroring', () => {
                    beforeEach(async () => {
                        await expect(retryPromise).rejects.toBe(error);
                    });

                    it('is not finished', () => {
                        expect(finished).toBe(false);
                    });

                    it('calls the segment with the same args again', () => {
                        expect(args).toEqual([
                            ['foo', 5],
                            ['foo', 5],
                            ['foo', 5],
                            ['foo', 5],
                        ]);
                    });
                });
            });

            describe('after being continued', () => {
                beforeEach(async () => {
                    expect(finished).toBe(false);

                    await cc.continue();
                });

                it('can be finished', () => {
                    expect(finished).toBe(true);
                });

                it('calls the remaining segments with the same args', () => {
                    expect(args).toEqual([
                        ['foo', 5],
                        ['foo', 5],
                        ['foo', 5],
                        ['foo', 5],
                    ]);
                });
            });
        });
    });
});
