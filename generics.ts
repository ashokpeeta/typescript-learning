function getFirstElement<ElementType>(array: ElementType[]): ElementType {
  return array[0];
}

const numbers = [1, 2, 3];
const num = getFirstElement(numbers);

const strings = ["1", "2", "3"];
const str = getFirstElement(strings);

// const de = document.querySelector(".input");
// console.log(de?.value);

const de = document.querySelector<HTMLInputElement>(".input");
console.log(de?.value);

const a = [1, 2, 3];
a.map(() => {}); // map has a generic return value void which will be set based on the value you return

const map = new Map<string, number>();
map.set("key1", 1);

type ApiResponse1 = {
  data: any;
  isError: boolean;
};

const res1: ApiResponse1 = {
  data: {
    name: "Ashok",
    age: 35,
  },
  isError: false,
};

type ApiResponse2<Data> = {
  data: Data;
  isError: boolean;
};

const res2: ApiResponse2<{ name: string; age: number }> = {
  data: {
    name: "Ashok",
    age: 35,
  },
  isError: false,
};

type UserResponse = ApiResponse2<{ name: string; age: number }>;
const res3: UserResponse = {
  data: {
    name: "Peeta",
    age: 35,
  },
  isError: false,
};

// specify default types
type ApiResponse3<Data = { status: number }> = {
  data: Data;
  isError: boolean;
};

const res4: ApiResponse3 = {
  data: {
    status: 200,
  },
  isError: false,
};

// override default types
const res5: ApiResponse3<{ name: string }> = {
  data: {
    name: "Ashok",
  },
  isError: false,
};

// extend objects and defaults
type ApiResponse4<Data extends Object = { status: number }> = {
  data: Data;
  isError: boolean;
};
const res6: ApiResponse4<{ name: string }> = {
  data: {
    name: "Peeta",
  },
  isError: false,
};
