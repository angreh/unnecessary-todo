const TodoTypes = {
  PERSONAL: "Personal",
  WORK: "Work",
  RELATIONSHIP: "Relationship",
  HOUSE: "House",
  STUDY: "Study",
} as const;
export const TodoTypesValues = Object.values(TodoTypes);
export type TodoTypeType = (typeof TodoTypesValues)[number];

const TodoStatus = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  CANCELED: "Canceled",
} as const;
export const TodoStatusValues = Object.values(TodoStatus);
export type TodoStatusType = (typeof TodoStatusValues)[number];