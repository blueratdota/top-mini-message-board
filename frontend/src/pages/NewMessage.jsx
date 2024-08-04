import { useState } from "react";

const NewMessage = ({}) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isPostDisabled, setIsPostDisabled] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setIsPostDisabled(true);
    if (content && author) {
      try {
        const body = { author, content };
        const response = await fetch(process.env.VITE_SERVER_NEW, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log(data);
        console.log("submitted");
        window.location.reload();
      } catch (error) {
        console.log("display error.jsx");
      }
    } else {
      alert("A field is empty");
    }
  };
  return (
    <div className="my-8">
      <form
        action="post"
        className="text-center flex flex-col gap-4 text-black"
        onSubmit={onSubmitForm}
      >
        <input
          type="text"
          placeholder="Put name here"
          className="py-1 px-2 rounded"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <textarea
          name="content"
          id="content-id"
          placeholder="Place content here"
          rows={2}
          className="py-1 px-2"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <button
          className="bg-extGreen px-8 py-3 rounded-lg"
          type="submit"
          disabled={isPostDisabled}
        >
          {isPostDisabled ? "Loading" : "Post Message"}
        </button>
      </form>
    </div>
  );
};
export default NewMessage;
