import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addArticle } from "./articleSlice";

export function ArticleList() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  function handleSubmit() {
    const action = addArticle({ title: title, id: id });
    dispatch(action);
    setTitle("");
    setId(null);
  }

  return (
    <>
      <ul>
        {articles.map((el) => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        type="number"
        value={id}
        onChange={(e) => setId(Number.parseInt(e.target.value))}
      />
      <button onClick={handleSubmit}>Add new article</button>
    </>
  );
}
