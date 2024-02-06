# Robot Challenge

> TS implementation of the Toy Robot challenge

## Description

- The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

Create an application that can read in commands of the following form:

```plain
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
MOVE
REPORT
```

- PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
- The origin (0,0) can be considered to be the SOUTH WEST most corner.
- The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.
- MOVE will move the toy robot one unit forward in the direction it is currently facing.
- LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
- REPORT will announce the X,Y and orientation of the robot.
- A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.
- The application must not exit after the first REPORT command, i.e. many REPORT commands can be received per session.
- It is up to you how you exit the application (e.g. exit command, Ctrl-C etc.)
- Provide test data to exercise the application.

## Constraints

The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot.
Any move that would cause the robot to fall must be ignored.

Example Input and Output:

```plain
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH
```

```plain
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST
```

```plain
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
Output: 3,3,NORTH
```

## Deliverables

The source files, the test data and any test code (as well as explanations of how to run everything).

## Expectations

- There is no time limit for the test, you can take as long as you like, but a reasonable thing that most people do is to take a weekend to do it and send the solution back (i.e. turn it around within a week). If you need more time that's fine, just send us a quick message to let us know.
- You're welcome to use whatever language you like, our tech stack is Ruby and Typescript so either one of those would be well regarded, but if you want to use a different language you're welcome to, just make sure we can easily run it (e.g. docker image). It's also worthwhile to make sure that the language you pick (if something other than Ruby or TS) is the best way to showcase your skills. Remember you will be pairing and extending this solution if you get to that part of the interview process.
- The expectation is that you will create a command line application, please don't build a web ui/api etc.
- You will use this coding test as a showcase of your skills as a developer, we should be able to look at this code and learn something about the way you think and about how you solve problems.

We're not just looking for a minimal solution that would solve the problem. We're looking for:

- production quality code
- good OO and/or functional practices
- a solid testing approach
- well thought out naming
- solid error handling
- extensibility/maintainability/\*ility
- good design from a software engineering perspective
- separation of concerns, i.e. low coupling high cohesion
- sensible breakdown of code into files/modules
- use of best practices/idioms when it comes to language, testing etc.
- appropriate use of tools/frameworks
- performant code, i.e. memory/cpu efficient
- etc

Basically treat the coding test as if it's a larger problem, a little bit of over-engineering is likely a good idea.

## Common issues to avoid/think about

- edge case inputs break the application
- a large amount of input data will kill the application/cause it to be slow/cause it to be unresponsive
- it requires a lot of effort to add new commands to the application
- it requires a lot of effort to change the dimensions of the table
- the application is not resilient to changes in the format of the input
- the application is not resilient to changes in the source of the input
- the application is not resilient to changes in the format of the output
- elements of the design clearly violate SOLID (if OO)
- the solution doesn't invert any dependencies
- the solution violates DRY

## Self-assessment checklist

- Does the submission exhibit a good understand of OO and/or functional priniciples
- Does the submission exhibit a solid testing approach (good mix of unit and integration tests etc.)
- Does the submission exhibit well thought out variable/function/class naming
- Does the submission exhibit a solid approach to error handling (can't easily get a stack trace on the command line)
- Does the submission exhibit low coupling/high cohesion
- Is the code easy to read/understand/extend
- Would I be happy to have code of a similar standard in production
- Would I be happy to inherit/modify/extend/maintain code of a similar standard

## Solution

The solution is a CLI application that offers the option to:

- Run in interactive mode (`toy-robot -i`), where you can pass the commands one by one via `stdin`, or
- Read the instructions from a file (`toy-robot -f <file>`)
  And then executes any valid commands received until it gets a `<eof>` or `<sigint>`.

```shell
node ➜ /workspaces/toyrobot-ts (main) $ tree src -I *.test.ts
src
├── index.ts      # Entry point to the cli application.
├── parser.ts     # Parses input (`file` or `stdin`) and converts it to a valid command, and parameter.
├── runner.ts     # Runs commands and updates the robot state accordingly
├── simulation.ts # Defines the initial state (robot position, table size) and available execution modes (file, interactive)
├── types.ts      # Type used across the application
└── util.ts       # Validation and data manipulation utilities
```

### How-To

## Set It Up

This repo uses the [Node (v20) and Typescript (v5)](https://github.com/devcontainers/templates/tree/main/src/typescript-node) [Dev Containers](https://containers.dev/) template.

If you use VS-Code or IntelliJ Idea, you can use their respective plug-in to run the project inside a container. You will also need Docker installed and runing on your machine.

```shell
node ➜ /workspaces/toyrobot-ts (main) $ npm install

up to date, audited 545 packages in 681ms

135 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
node ➜ /workspaces/toyrobot-ts (main) $
```

## Build / Run It

```shell
# Compile
npm run build

# Run
npm run toy-robot # no argument -> display help

node ➜ /workspaces/toyrobot-ts (main) $ npm run toy-robot

> toyrobot-ts@1.0.0 toy-robot
> ts-node src/index.ts

Usage: toy-robot [options]

TS implementation of the Toy Robot challenge.

Options:
  -V, --version       output the version number
  -f, --file <value>  Read instructions from file.
  -i, --interactive   Read instructions from console.
  -h, --help          display help for command

```

[**Note**](https://github.com/tj/commander.js?tab=readme-ov-file#npm-run-script)

> npm run-script
>
> By default, when you call your program using run-script, `npm` will parse any options on the command-line and they will not reach your program. Use `--` to stop the npm option parsing and pass through all the arguments.
>
> The synopsis for [npm run-script](https://docs.npmjs.com/cli/v9/commands/npm-run-script) explicitly shows the `--` for this reason

```shell
node ➜ /workspaces/toyrobot-ts (main) $ npm run toy-robot -- -i

> toyrobot-ts@1.0.0 toy-robot
> ts-node src/index.ts -i

toy-robot> # Use Ctrl+C or Ctrl+D to exit.
```

## Test It

```shell
node ➜ /workspaces/toyrobot-ts (main) $ npm test

.
.
.

---------------|---------|----------|---------|---------|--------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------|---------|----------|---------|---------|--------------------
All files      |   82.01 |    78.04 |   78.26 |   79.67 |
 parser.ts     |      50 |       40 |   28.57 |   44.44 | 17-18,27-64,85,100
 runner.ts     |     100 |      100 |     100 |     100 |
 simulation.ts |     100 |      100 |     100 |     100 |
 types.ts      |     100 |      100 |     100 |     100 |
 util.ts       |     100 |      100 |     100 |     100 |
---------------|---------|----------|---------|---------|--------------------
Test Suites: 3 passed, 3 total
Tests:       2 skipped, 25 passed, 27 total
Snapshots:   0 total
Time:        1.931 s, estimated 4 s
Ran all test suites.

node ➜ /workspaces/toyrobot-ts (main) $
```
