import AddSongFlow from "@/components/add_song/AddSongFlow";
import EditSongRoute from "@/components/add_song/EditSongRoute";
import type { RouteObject } from "react-router";
import ReccoSongRoute from "@/components/add_song/ReccoSongRoute";
import ManualSongRoute from "@/components/add_song/ManualSongRoute";
import SongSearchStepRoute from "@/components/add_song/SongSearchStepRoute";

export const SongFormRoutes: RouteObject[] = [
  {
    path: 'add-song',
    Component: AddSongFlow,
    children: [
      { index: true, Component: SongSearchStepRoute },
      { path: 'new/:songName', Component: ManualSongRoute },
      { path: 'track/:trackId', Component: ReccoSongRoute },
    ],
  },
  { path: 'edit-song/:songId', Component: EditSongRoute },
]