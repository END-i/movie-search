import { useDispatch } from "utils/context";
import { IType } from "utils/types";

const host = "https://api.themoviedb.org/3/";
const api_key = process.env.REACT_APP_API_KEY;

const addApiKey = (link: string) => {
  const [start, end] = link.split("<<api_key>>");
  return `${start}${api_key}${end}`;
};

export default function (path: string, field: IType) {
  const dispatch = useDispatch();

  const handeleCall = async () => {
    try {
      dispatch("loading", true);
      const url = `${host}${addApiKey(path)}`;
      const req = await fetch(url, { method: "get" });
      const response = await req.json();
      dispatch(field, response);
      dispatch("loading", false);
    } catch (error) {
      dispatch("errors", error);
      dispatch("loading", false);
    }
  };

  return handeleCall;
}
