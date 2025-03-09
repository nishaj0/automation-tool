export interface Trigger {
  id: string;
  name: string;
  description?: string;
  listenType: "WEBHOOK" | "POLLING" | "SCHEDULE";
  handler: (data: any) => void; // TODO: define data type
  pollingInterval?: number; // only for POLLING
}

export interface Actions {
  id: string;
  name: string;
  description?: string;
  handler: (data: any) => Promise<void>; // TODO: define data type
}

export interface App {
  name: string;
  triggers: Trigger[];
  actions: Actions[];
  start: () => Promise<void>;
}
