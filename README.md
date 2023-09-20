<h2>Motivation</h2>
Unit testing of input elements is not easy, particularly uploading a file. In this repo, I will show how to do it using the testing library.

<h2>Possible Solution</h2>
Actually, you can test upload file in three ways (check, e.g., <a href='https://stackoverflow.com/questions/61104842/react-testing-library-how-to-simulate-file-upload-to-a-input-type-file-e'>here</a>)
<ul>
<li>e2e</li>
<li>mock</li>
<li> Simply use upload of the testing library without any mock</li>
</ul>

<h2>My prefered Solution</h2>
e2e takes a lot of run time, mock adds a lot of code, and you don't get the real behavior. I prefer to simply use it as follows.

```ts

test("upload file via input with type element -> number of grades : 3 appears in ui", async () => {
  const fileName = "grades.csv";
  const csvFilePath = `./data/${fileName}`; // -- relative to the project root
  const data = fs.readFileSync(csvFilePath);
 
  const fileBits = [data.buffer];
 
  const file = new File(fileBits, fileName);
  const inputElem = getCsvInput();

  await userEvent.upload(inputElem, file);

  expect(inputElem.files![0]).toBe(file);
  await waitFor(() => {
	expect(getByRole(root, "status").textContent).toBe(
  	"number of grades : 3"
	);
  });
});
```

<h2>Usage</h2>
run the test

```
npm test
```

run the UI (you have grades file under data directory)

```
npm run dev
```