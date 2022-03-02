const fs = require("fs");

const fetchNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.txt"));
  } catch (err) {
    return [];
  }
};

const add = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body,
  };
  let flag;
  try {
    if (note.body === "" || note.body === undefined) {
      flag = 2;
    } else {
      notes.forEach((note) => {
        if (note.title === title) {
          flag = 1;
          throw "Break";
        } else {
          flag = 0;
        }
      });
    }
  } catch (e) {
    if (e !== "Break") console.log(e);
  }
  if (!flag) {
    notes.push(note);
    fs.writeFileSync("notes.txt", JSON.stringify(notes));
    console.log(`New Note Created..`);
    logNote(note);
  } else if (flag == 1) {
    console.log("Title already taken!");
  } else if (flag == 2) {
    console.log("Please enter note description.");
  }
};

const remove = (title) => {
  let notes = fetchNotes();
  let flag;
  try {
    notes.forEach((note) => {
      if (note.title === title) {
        flag = 1;

        // filter process
        var filteredNotes = notes.filter((note) => {
          return note.title !== title;
        });
        fs.writeFileSync("notes.txt", JSON.stringify(filteredNotes));
        throw "Done";
      } else {
        flag = 0;
      }
    });
    if (!flag) {
      throw "Break";
    }
  } catch (e) {
    if (e !== "Break" && e !== "Done") {
      console.log(e);
    } else if (e === "Done") {
      console.log("Note Removed.");
    } else if (e === "Break") {
      console.log("Note not found!");
    }
  }
};

const read = (title) => {
  let notes = fetchNotes();
  let filteredNotes = notes.filter((note) => {
    return note.title === title;
  });
  if (filteredNotes.length === 1) {
    logNote(filteredNotes[0]);
  } else {
    console.log("Note not found.");
  }
};

const list = () => {
  console.log("Listing all Notes...");
  let notes = fetchNotes();
  notes.forEach((note) => console.log(note.title));
};

const logNote = (note) => {
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = { add, remove, read, list };
