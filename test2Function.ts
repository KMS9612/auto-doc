/** outFunc */
export default function hello() {
  const hello = "hello";

  console.log(hello);

  /** innerFunc */
  function world() {
    console.log("world");
  }

  return hello;
}
