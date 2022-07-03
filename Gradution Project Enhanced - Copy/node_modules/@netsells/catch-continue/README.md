# CatchContinue

A class to allow you to run segments of code in order, catch errors, and retry
or continue from where an error occured.

## Installation

```bash
yarn add @netsells/catch-continue
```

## Usage

```javascript
import CatchContinue from '@netsells/catch-continue';

async function myFunction() {
    const cc = new CatchContinue();

    cc.add(() => {
        // any thrown error will pause execution
    });

    cc.add(() => {
        return Promise((resolve, reject) => {
            // rejecting the promise will pause execution
        });
    });

    cc.add(async () => {
        await someCode(); // errors thrown or promises rejected will pause execution
    });

    try {
        await cc.run('any', 'arguments'); // Any passed arguments will be passed to the segment functions
    } catch(e) {
        cc.continue(); // will run from the segment after the one which errored

        // OR

        cc.retry(); // will run starting from the failed segment
    }
}
```
