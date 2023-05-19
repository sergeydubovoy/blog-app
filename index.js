const NUMBER_OF_CHAR_TITLE_EXCEEDED = "Заголовок больше 100 символов";
const NUMBER_OF_CHAR_TEXT_EXCEEDED = "Пост больше 200 символов";
const TITLE_CHAR_LIMIT = 100;
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

publishButtonNode.addEventListener("click", () => {
  const postFromUser = getPostTitle();

  addPost(postFromUser);
  renderPosts();
  clearInputs();
});

const getPostTitle = () => {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;
  return {
    title: title,
    text: text,
  };
};

const addPost = ({ title, text }) => {
  posts.push({
    title: title,
    text: text,
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

postTitleInputNode.addEventListener("input", () => {
  const count = TITLE_CHAR_LIMIT - postTitleInputNode.value.length;
  titleCharCount.textContent = count;

  if (count < 0) {
    postTitleInputNode.value = postTitleInputNode.value.substring(
      0,
      TITLE_CHAR_LIMIT
    );
    titleCharCountWrapper.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
});

postTextInputNode.addEventListener("input", () => {
  const count = postTextInputNode.value.length;
  textCharCount.textContent = count;
});
