var Api = "https://todolist-api-nguyenanhvo.herokuapp.com/api/v1/todo";
// https://todolist-api-nguyenanhvo.herokuapp.com/
const postList = document.querySelector(".post-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const descriptionValue = document.getElementById("description-value");
const btnEdit = document.querySelector(".btn");
const updateBtn = document.getElementById("update");

const renderPost = (post) => {
  list.innerHTML = todo.map((td, index) => {
    return `
    <div class="card mt-4 col-md-6 bg-ligt">
    <div class="card-body" data-id=${td._id}>
      <h2 class="card-text">title:</h2>
      <h4 class="card-title">${td.title}</h4>
      <h6>Time:${td.timestamps.createdOn}</h6>
      <h2 class="card-text">Description:</h2>
      <h4 class="card-description">${td.description}</h4>
      <a href="#" class="card-link" id="edit">Sửa</a>
      <a href="#" class="card-link" id="delete">Xóa</a>
    </div>
  </div>
      `;
  });
};

postList.addEventListener("click", (e) => {
  e.preventDefault();
  let delButtonIsPressed = e.target.id == "delete";
  let editButtonIsPressed = e.target.id == "edit";
  let id = e.target.parentElement.dataset.id;
  titleValue.dataset.id = id;
  // delete
  //method DELETE
  if (delButtonIsPressed) {
    fetch(`${Api}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
  // đẩy nội dung sửa lên ô input
  if (editButtonIsPressed) {
    const parent = e.target.parentElement;
    let titleContent = parent.querySelector(".card-title").textContent;
    let descriptionContent =
      parent.querySelector(".card-description").textContent;

    titleValue.value = titleContent;
    descriptionValue.value = descriptionContent;
  }

  // sửa
  // method: Fatch
  btnEdit.addEventListener("submit", () => {
    fetch(`${Api}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleValue.value,
        description: descriptionValue.value,
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });
});

async function getTasks() {
  var a = await (await fetch(Api)).json();
  return a.todos;
}
var todo = await getTasks();
var list = document.querySelector(".post-list");
renderPost();

//creat - insert new todo
//method POST

addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(Api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      description: descriptionValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPost(dataArr);
      location.reload();
    });
  titleValue.value = "";
  descriptionValue.value = "";
});

function updateHandler(e) {
  e.preventDefault();

  let id = titleValue.dataset.id;

  fetch(`${Api}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      description: descriptionValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    });
}

updateBtn.addEventListener("click", updateHandler);
