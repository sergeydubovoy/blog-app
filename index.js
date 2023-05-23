const NUMBER_OF_CHAR_TITLE_EXCEEDED = "Заголовок больше 100 символов";
const NUMBER_OF_CHAR_TEXT_EXCEEDED = "Пост больше 200 символов";
const TITLE_CHAR_LIMIT = 50;
const TEXT_CHAR_LIMIT = 200;
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

const posts = [];

const postTitleInputNode = document.getElementById("postTitleInputNode");
const postTextInputNode = document.getElementById("postTextInputNode");
const publishButtonNode = document.getElementById("publishButtonNode");
const feedList = document.getElementById("feedList");

let titleCharCount = document.getElementById("titleCharCount");
let textCharCount = document.getElementById("textCharCount");
let titleCharCountWrapper = document.getElementById("titleCharCountWrapper");
let textCharCountWrapper = document.getElementById("textCharCountWrapper");

const disableButton = () => {
  publishButtonNode.setAttribute("disabled", "");
};

const initApp = () => {
  titleCharCount.textContent = TITLE_CHAR_LIMIT;
  textCharCount.textContent = TEXT_CHAR_LIMIT;
  disableButton();
};

initApp();

publishButtonNode.addEventListener("click", () => {
  const postFromUser = getPost();

  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;

  if (!title || !text || title.length < 5 || text.length < 5) {
    alert("Заголовок и текст должны быть длинее 5 символов");
    return;
  }

  addPost(postFromUser);
  renderPosts();
  clearInputs();
});

const getPost = () => {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;
  return {
    title: title,
    text: text,
  };
};

const addPost = ({ title, text }) => {
  const currentDate = new Date();

  const createdDate = currentDate
    .toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/ г\.$/, "");
  const createdTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
  const createdDateTime = `${createdDate} ${createdTime}`;

  posts.push({
    title: title,
    text: text,
    created: createdDateTime,
  });
};

const getPosts = () => {
  return posts;
};

const renderPosts = () => {
  const posts = getPosts();

  let postsHTML = "";

  posts.forEach((post) => {
    postsHTML += `
    <div class="post">
        <p class="post__created">${post.created}</p>
        <h3 class="post__title">${post.title}</h3>
        <p class="post__text">${post.text}</p>
    </div>
`;
  });

  feedList.innerHTML = postsHTML;
};

const clearInputs = () => {
  postTitleInputNode.value = "";
  postTextInputNode.value = "";
  titleCharCount.textContent = TITLE_CHAR_LIMIT;
  textCharCount.textContent = TEXT_CHAR_LIMIT;
};

// Старые формулы

// const handleTitleInput = () => {
//   const counterTitle = TITLE_CHAR_LIMIT - postTitleInputNode.value.length;
//   titleCharCount.textContent = counterTitle;

//   if (counterTitle < 0) {
//     publishButtonNode.setAttribute("disabled", "");
//     publishButtonNode.classList.add("button_disabled");
//     titleCharCountWrapper.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
//   } else {
//     publishButtonNode.removeAttribute("disabled", "");
//     publishButtonNode.classList.remove("button_disabled");
//     titleCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
//   }
// };

// postTitleInputNode.addEventListener("input", handleTitleInput);

// const handleTextInput = () => {
//   const counterText = TEXT_CHAR_LIMIT - postTextInputNode.value.length;
//   textCharCount.textContent = counterText;

//   if (counterText < 0) {
//     publishButtonNode.setAttribute("disabled", "");
//     publishButtonNode.classList.add("button_disabled");
//     textCharCountWrapper.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
//   } else {
//     publishButtonNode.removeAttribute("disabled", "");
//     publishButtonNode.classList.remove("button_disabled");
//     textCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
//   }
// };

// postTextInputNode.addEventListener("input", handleTextInput);

// Новая формула объединенная

// const handleInput = () => {
//   const counterTitle = TITLE_CHAR_LIMIT - postTitleInputNode.value.length;
//   const counterText = TEXT_CHAR_LIMIT - postTextInputNode.value.length;

//   titleCharCount.textContent = counterTitle;
//   textCharCount.textContent = counterText;

//   if (counterTitle < 0 || counterText < 0) {
//     publishButtonNode.setAttribute("disabled", "");
//     publishButtonNode.classList.add("button_disabled");

//     if (counterTitle < 0) {
//       titleCharCountWrapper.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
//     } else {
//       titleCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
//     }

//     if (counterText < 0) {
//       textCharCountWrapper.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
//     } else {
//       textCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
//     }
//   } else {
//     publishButtonNode.removeAttribute("disabled", "");
//     publishButtonNode.classList.remove("button_disabled");
//     titleCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
//     textCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
//   }
// };

const handleInput = () => {
  const counterTitle = TITLE_CHAR_LIMIT - postTitleInputNode.value.length;
  const counterText = TEXT_CHAR_LIMIT - postTextInputNode.value.length;

  titleCharCount.textContent = counterTitle;
  textCharCount.textContent = counterText;

  if (counterTitle < 0 || counterText < 0) {
    disableButton();
    toogleTitleClass(counterTitle);
    toogleTextClass(counterText);
  } else {
    enableButton();
  }
};

const toogleTitleClass = (counterTitle) => {
  if (counterTitle < 0) {
    titleCharCountWrapper.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  } else {
    titleCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
};

const toogleTextClass = (counterText) => {
  if (counterText < 0) {
    textCharCountWrapper.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  } else {
    textCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
};

const enableButton = () => {
  publishButtonNode.removeAttribute("disabled", "");
  titleCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  textCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
};

postTitleInputNode.addEventListener("input", handleInput);
postTextInputNode.addEventListener("input", handleInput);
