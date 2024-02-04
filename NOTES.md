# Dev Notes

- [x] use library to handle/create cli scaffolding
- [x] cli options

  - [x] interactive:
    - [ ] read one command at a time (+report?) from input
    - [ ] process command
    - [ ] graceful exit
  - [x] file:
    - [ ] parse file line by line into array/stream
    - [ ] process command from above array/stream
    - [ ] exit when finished

- [ ] commands

  - [ ] place {x,y,f}: vector
  - [ ] move
  - [ ] left
  - [ ] right
  - [ ] report

- [ ] table

  - [ ] dimensions { x = 5, y= 5 }

- [ ] robot

  - [ ] position: vector

- [ ] vector { x: int = -1,y: int = -1,f: direction = undefined }

- [ ] direction: enum { north, south, east, west }
