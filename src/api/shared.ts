// api/shared.ts
import { v4 as uuidv4 } from "npm:uuid";
export default (modules) => ({ ...modules, uuid: uuidv4 });
