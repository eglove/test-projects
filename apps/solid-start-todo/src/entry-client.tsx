// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

mount(() => {
  return <StartClient />;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion,ethang/handle-native-error
}, document.querySelector("#app")!);
