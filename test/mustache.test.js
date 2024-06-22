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

test('List', async () => {
  const helloTemplate = await fs.readFile("./templates/hobbies.mustache")
  .then(data => data.toString())
  const data = Mustache.render(helloTemplate, {
    hobbies:["Coding", "Gaming", "Reading"]
  })
  console.log(data)
  expect(data).toContain("Coding")
  expect(data).toContain("Gaming")
  expect(data).toContain("Reading")
})

test('List Object', async () => {
  const helloTemplate = await fs.readFile("./templates/students.mustache")
  .then(data => data.toString())
  const data = Mustache.render(helloTemplate, {
    students: [{
      name:'Ahmad Fauzan', value: 100
    },
    {
      name: 'Achmad Ravi Firdaus', value:90
    }]
  })
  console.log(data)
  expect(data).toContain("Ahmad Fauzan")
  expect(data).toContain("Achmad Ravi Firdaus")
  expect(data).toContain("100")
  expect(data).toContain("90")
})

test('Function', async () => {
  const parameter = {
   name: 'Ahmad Fauzan',
   upper: () => {
    return (text,render) => {
      return render(text).toUpperCase();
    }
   }
  }
 const data = Mustache.render("Hello {{#upper}}{{name}}{{/upper}}", parameter)
  console.log(data)
  expect(data).toBe("Hello AHMAD FAUZAN")
})

test('Comment', async () => {
  const helloTemplate = await fs.readFile("./templates/comment.mustache")
  .then(data => data.toString())
  const data = Mustache.render(helloTemplate, {
    title: "NodeJs"
  })
  console.log(data)
  expect(data).toContain("NodeJs")
})

test('Partial', async () => {
  const headerTemplate = await fs.readFile("./templates/header.mustache").then(data => data.toString())
  const footerTemplate = await fs.readFile("./templates/footer.mustache").then(data => data.toString())
  const contentTemplate = await fs.readFile("./templates/content.mustache").then(data => data.toString())
  
  const data = Mustache.render(contentTemplate, {
    title: 'Belajar Partial',
    content: 'Ahmad Fauzan'
  },
  {
  header:headerTemplate,
  footer:footerTemplate
  }
)
  console.log(data)
  expect(data).toContain("Belajar Partial")
  expect(data).toContain("Ahmad Fauzan")
  expect(data).toContain("Powered by AF")
})
