export type TabMode = "home" | "search" | "history" | "site" ;

export interface Tab {
    id: string;
    mode: TabMode;
    title: string;
    query: string;
    url: string;
}