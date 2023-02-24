import { TodoItem } from "./components";

main();

function main() {
  let todo_list = document.querySelector("ul");
  let save_btn = document.getElementById("save");
  let edit_btn = document.getElementById("edit");
  edit_btn.addEventListener("click", (e) => {
    e.preventDefault();
    let dialog = document.querySelector("dialog");
    let e_id = dialog.dataset.id;
    edit_todo(e_id)(e);
    dialog.open = !dialog.open;
    document.getElementById("modal-overlay").classList.toggle("hidden");
  });
  let id = 0;
  // add new todo item
  save_btn.addEventListener("click", add_new_todo(id));
  document.getElementById("close-editor").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("modal-overlay").classList.toggle("hidden");
    e.target.parentElement.parentElement.open =
      !e.target.parentElement.parentElement.open;
  });
}

function delete_todo(id) {
  return function (e) {
    document
      .querySelector("ul")
      .removeChild(document.querySelector(`#todo-${id}`));
  };
}

function edit_todo(id) {
  return function (e) {
    let form = new FormData(document.querySelector("#edit-form")); //TODO
    let name = form.get("edit-todo-name");
    let desc = form.get("edit-todo-desc");

    //name cannot be empty handle error here
    if (name == "") {
      console.error("todo name cannot be empty");
      return;
    }

    document
      .getElementById(`todo-${id}`)
      .replaceWith(TodoItem(id, name, desc, delete_todo));
  };
}

function add_new_todo(id) {
  return function (e) {
    e.preventDefault();
    let form = new FormData(document.querySelector("form"));
    let name = form.get("todo-name");
    let desc = form.get("todo-desc");
    desc ? desc : (desc = "no description was set");

    //name cannot be empty handle error here
    if (name == "") {
      console.error("todo name cannot be empty");
      return;
    }
    let todo_list = document.querySelector("ul");
    let item = TodoItem(crypto.randomUUID(), name, desc, delete_todo);
    item.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 25,
        },

        {
          opacity: 50,
        },
        {
          opacity: 75,
        },
        {
          opacity: 100,
        },
      ],
      { duration: 2000, iterations: 1 }
    );
    todo_list.appendChild(item);
    document.getElementById("todo-name").value = "";
    document.getElementById("todo-desc").value = "";
  };
}
