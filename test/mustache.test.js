import Mustache from "mustache";
import fs from "fs/promises";

test("Menggunakan Mustache", () => {
  const data = Mustache.render("Hello {{name}}", {name:"Fauzan"})
  // Output: Hello Fauzan
  expect(data).toBe("Hello Fauzan")
})

test("Menggunakan Mustache Cache", () => {
  // Di simpan di RAM untuk dicompile dahulu
  Mustache.parse("Hello {{name}}")
  const data = Mustache.render("Hello {{name}}", {name:"Fauzan"})
  // Output: Hello Fauzan
  expect(data).toBe("Hello Fauzan")
})

test("Tags", () => {
  const data = Mustache.render("Hello {{name}}, My hobby is {{{hobby}}}", {
    name:"Fauzan",
    hobby: "<b>Programming</b>"
  })
  // Output: Hello Fauzan
  expect(data).toBe("Hello Fauzan, My hobby is <b>Programming</b>")
})

test("Nested Object", () => {
  const data = Mustache.render("Hello {{person.name}}", {
    person:{
    name:"Fauzan"
    }
  })
  // Output: Hello Fauzan
  expect(data).toBe("Hello Fauzan")
})

test('Mustache File', async () => {
  const helloTemplate = await fs.readFile("./templates/hello.mustache")
  .then(data => data.toString())
  const data = Mustache.render(helloTemplate, {
    title: "Ahmad Fauzan - NodeJs"
  })
  console.log(data)
  expect(data).toContain("Ahmad Fauzan - NodeJs")
})

test('Mustache Sections Not Show', async () => {
  const helloTemplate = await fs.readFile("./templates/hello.mustache")
  .then(data => data.toString())
  const data = Mustache.render(helloTemplate, {})
  console.log(data)
  expect(data).not.toContain("Hello Person")
})

test('Mustache Sections Show', async () => {
  const helloTemplate = await fs.readFile("./templates/person.mustache")
  .then(data => data.toString())
  const data = Mustache.render(helloTemplate, {  
    person: {
    name: "Fauzan"
  }})
  console.log(data)
  expect(data).toContain("Hello Person")
})

test('Sections Data', async () => {
  const helloTemplate = await fs.readFile("./templates/person.mustache")
  .then(data => data.toString())
  const data = Mustache.render(helloTemplate, {  
    person: {
    name: "Fauzan"
  }})
  console.log(data)
  expect(data).toContain("Hello Person Fauzan!")
})

test('Inverted Sections', async () => {
  const helloTemplate = await fs.readFile("./templates/person.mustache")
  .then(data => data.toString())
  const data = Mustache.render(helloTemplate, {})
  console.log(data)
  expect(data).toContain("Hello Guest")
})
