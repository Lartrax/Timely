import { createStore } from "solid-js/store";


export type user = {
    user_id: string;
    name: string;
    email: string;
    profile_picture: string;
};

export enum page {
    weekView,
    workTimer,
    export,
    archive,
    profile,
}

type store = {
    user: user | null;
    page: page;
}

export const [appState, setAppState] = createStore<store>({
    user: null,
    page: page.weekView
})
