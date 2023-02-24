export function TodoItem(id, name, desc, delete_callback) {
  let li = document.createElement("li");
  let details = document.createElement("details");
  let summary = document.createElement("summary");
  let p = document.createElement("p");
  let div = document.createElement("div");
  let edit_btn = document.createElement("button");
  let delete_btn = document.createElement("button");
  let done_btn = document.createElement("button");

  li.dataset.id = id;
  li.id = `todo-${id}`;
  li.classList = [
    "grid grid-rows-2 px-6 py-8 md:py-14 mb-6 rounded-md bg-white font-mono text-black shadow-md shadow-gray-900 place-content-center",
  ];
  details.classList = ["opacity-100"];
  p.classList = ["m-2"];
  div.classList = ["flex space-x-5"];

  edit_btn.type = "button";
  delete_btn.type = "button";
  done_btn.type = "button";

  edit_btn.classList = [
    "bg-blue-300 hover:bg-blue-400 py-1.5 px-3 max-h-12 shadow-md uppercase rounded ",
  ];

  delete_btn.classList = [
    "bg-red-300 hover:bg-red-400 py-1.5 px-3 max-h-12 shadow-md uppercase rounded ",
  ];

  done_btn.classList = [
    "bg-green-300 hover:bg-green-400 py-1.5 px-3 max-h-12 shadow-md uppercase rounded",
  ];

  delete_callback
    ? delete_btn.addEventListener("click", delete_callback(id))
    : console.log("no callback for deleting todos");
  let edit_callback = function (e) {
    let dialog = document.querySelector("dialog");
    document.getElementById("edit-todo-name").value = name;
    document.getElementById("edit-todo-desc").value = desc;
    document.getElementById("modal-overlay").classList.toggle("hidden");
    dialog.open = !dialog.open;
    dialog.dataset.id = id;
  };

  edit_btn.addEventListener("click", edit_callback);

  done_btn.addEventListener("click", (e) => {
    summary.classList.toggle("line-through");
  });

  edit_btn.appendChild(document.createTextNode("Edit"));
  delete_btn.appendChild(document.createTextNode("Delete"));
  done_btn.appendChild(document.createTextNode("Done"));

  div.appendChild(edit_btn);
  div.appendChild(delete_btn);
  div.appendChild(done_btn);

  summary.appendChild(document.createTextNode(name));
  details.appendChild(summary);
  details.appendChild(p.appendChild(document.createTextNode(desc)));

  li.appendChild(details);
  li.appendChild(div);

  return li;
}
