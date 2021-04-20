import { v4 as uuidv4 } from 'uuid';

import { UniqueID } from './shared/unique-id.base';
import { AggregateRoot } from './shared/aggregate-root.base';
import { AbstractSpecification } from './shared/specificatinon';

class Person extends AggregateRoot {
  constructor(
    _id: UniqueID,
    private readonly _name: string,
    private readonly _age: number,
  ) {
    super(_id);
  }

  get name(): string {
    return this._name;
  }

  get age(): number {
    return this._age;
  }

  static create(name: string, age: number): Person {
    return new Person(UniqueID.create(), name, age);
  }
}

class IsLegalAgeSpec extends AbstractSpecification<Person> {
  public isSatisfiedBy(person: Person): boolean {
    return person.age > 18;
  }
}

class IsNotBoomerSpec extends AbstractSpecification<Person> {
  public isSatisfiedBy(person: Person): boolean {
    return person.age < 40;
  }
}

class IsValidNameSpec extends AbstractSpecification<Person> {
  public isSatisfiedBy(person: Person): boolean {
    return person.name.length >= 3;
  }
}

const guy = Person.create('John', 26);
const isPersonAllowedSpec = new IsLegalAgeSpec()
  .and(new IsValidNameSpec())
  .and(new IsNotBoomerSpec());

console.log(isPersonAllowedSpec.isSatisfiedBy(guy));
console.log(uuidv4());
