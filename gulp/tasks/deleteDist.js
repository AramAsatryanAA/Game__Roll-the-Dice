import { deleteAsync } from "del";

export function deleteDist() {
  return deleteAsync(app.path.clean);
}
