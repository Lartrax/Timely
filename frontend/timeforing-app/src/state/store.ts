import { createStore } from "solid-js/store";


export type user = {
    user_id: string;
    name: string;
    email: string;
    profile_picture: string;
};

type store = {
    user: user | null;
}

export const [appState, setAppState] = createStore<store>({
    user: null,
})

