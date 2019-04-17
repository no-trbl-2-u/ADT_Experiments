// TYPE CLASSES

// TODO: Create as a static method?
// TODO: Create in such a way that doesn't rely on classes?

interface PersonEQ {
  eq: (person1: IPerson, person2: IPerson) => boolean
}

interface IPerson {
  name: string;
}

abstract class SameName {
  static eq(person1: IPerson, person2: IPerson): boolean {
    return person1.name === person2.name
  }
}

class Person extends SameName implements IPerson {
  constructor(public name: string){
    super()
  }
} 

let tj = new Person("TJ")
let fred = new Person("Fred")
let tj2 = new Person("TJ")

console.log(Person.eq(tj, tj2))