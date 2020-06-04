import Home from "pages/home";
import MovieDetails from "pages/movieDetails";
import ActorDetails from "pages/actorDetails";

import { IRoute } from "utils/types";

export const homePath = "/home";

const routes: IRoute[] = [
  {
    path: homePath,
    Component: Home,
  },
  {
    path: "/movie_details",
    Component: MovieDetails,
  },
  {
    path: "/actor_details",
    Component: ActorDetails,
  },
];

export default routes;
