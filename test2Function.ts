/** outFunc */
function hello() {
  const hello = "hello";

  console.log(hello);

  /** innerFunc */
  function world(world: string) {
    console.log(world);
    return 2;
  }

  /** innerFunc Two */
  function InnerTwo() {
    return 3;
  }

  return hello;
}

export default hello;
