# ZhongArt on Next

## How to dev

CMD

```bash
npm run dev
```
chrome :[localhost:3000/](http://localhost:3000/):

递交
```bash
git add . && git commit -m "...." && git push origin master
```



## 输出
在 out 目录
```bash
npm run preexport

//如果递交失败
npm run prestart
npm run preexport
```

> This example requires [Node.js 8](https://nodejs.org/en/download/current/) or a later version.<br>
> (That's for the use of "async await" in the `next.config.js`.)

Install it and run:

```bash
npm install
npm run dev
```

## The idea behind the example

This example show how to export to static HTML files your Next.js application fetching data from an API to generate a dynamic list of pages. This use a custom Express server in development to configure custom routing and then generate a map of pages to export for production.

When trying to run `npm start` it will build and export your pages into the `out` folder and serve them on `localhost:5000`.
