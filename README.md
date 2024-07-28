# auto-document

This Tool detect the Functions, Comments, Parameters and Returns of your node.js project and help document them in doc.html file.

(이 도구는 당신의 Node.js프로젝트의 함수,주석,매개변수,반환을 감지해 doc.html 혹은 doc.md(개발예정)으로 만들어 줍니다.)

You don't need to learn complicated config or How to Use, Just Code and Import One Start Doc

(복잡한 설정이나 사용법을 배울 필요 없이 코딩를 작성 하고 startDoc 하나만 Import하면 됩니다.)

# Installation(설치)

**Warning : This Lib will Support Only ESM**

```
npm install auto-document
```

# How to Use(사용방법)

**Just Write Code and Import startDoc from "auto-document"**

- ## Example
- ```
  import startDoc from "auto-document";
      /** this is Test */
      function test() {
        console.log("this is test");
        return;
      }
    startDoc;
  ```
- ## Start your Project with Node
- ```
  node {your main js file containing startDoc Func}
  ```

- ## Log will write like this
- ```
  ----------Start Auto Documentation----------
  Start Convert test2.js
  ┌─────────┬────────────┬─────────────────┬──────────────┬─────────────┬─────────────┐
  │ (index) │ filePath   │ comment         │ functionName │ params      │ returnValue │
  ├─────────┼────────────┼─────────────────┼──────────────┼─────────────┼─────────────┤
  │ 0       │ 'test2.js' │ 'this is test2' │ 'test2'      │ 'no params' │ 'none'      │
  └─────────┴────────────┴─────────────────┴──────────────┴─────────────┴─────────────┘
  ```

- ## **open doc.html**

  <br>
  <br>

# Config(설정)

> **You dont need to config anything,**<br> **this lib working on default_config,**<br> **i will develop few config option customizing as soon as**

> **아무런 설정도 할 필요가 없습니다! 하지만 사용의 다양성을 위해 몇가지 커스터마이징이 가능한 옵션을 빠른 시일내에 개발 할 예정입니다.**
