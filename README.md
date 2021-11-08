# Gurkensalat

Gurkensalat ([ˈɡʊʁkn̩zaˌlaːt], meaning: cucumber salad) slices Cucumber tests into parts that can be run on multiple machines. No communication between machines is necessary.

## Installation

Install it alongside your existing `@cucumber/cucumber` dependency:

```bash
npm install --save-dev gurkensalat
```

## Quick start

Use `npx`to run:

```bash
npx gurkensalat
```

This will test all the features one by one.

To distribute the features to multiple machines, you must also specify the total number of machines and the index (starting with 0) of the machine where Gurkensalat is running.

To distribute the tests to e.g. 2 machines, run the command below on the first machine:

```bash
npx gurkensalat 2 0
```

And on the second machine:

```bash
npx gurkensalat 2 1
```

## Environment variables

Instead of using parameters, you can also define environment variables:

- `GURKENSALAT_COUNT`: total number of machines
- `GURKENSALAT_INDEX`: index (starting with 0) of current machine

Example for the first of two machines:

```bash
export GURKENSALAT_COUNT=2
export GURKENSALAT_INDEX=0
npx gurkensalat
```

By default, Gurkensalat starts Cucumber via the command `npx cucumber-js`. You can override this command with `GURKENSALAT_COMMAND`. Please note that an option to save the summary log to a file and the name of a feature file is added to this command. Please make sure to forward this information to Cucumber if you use a wrapper script.

```bash
export GURKENSALAT_COMMAND="./wrapper.sh"
npx gurkensalat
# Runs for each feature: ./wrapper.sh --format "summary:<logfile>" <feature file>
```

## How it works

Gurkensalat searches the `features` folder and its subfolders for files with the extension `.feature`. These are the distributed to the given number of machines. All features marked for execution on the current machine are run in sequence.

The summary log is stored next to the feature file. It contains the time needed to test the feature. This information will be used in the future to distribute features more evenly.

If all features have been tested successfully, Gurkensalat returns with exit code `0`. Otherwise, exit code `2` is returned.

## Persist state

The log files are placed alongside the feature files with the extension `.log` instead of `.feature`. Please add them to your source control system. This allows Gurkensalat to take the duration of a feature's test into account when distributing the workload.
